"use server"

import { prisma } from "@/lib/prisma"
import { menu_categoria as Categoria } from "@prisma/client"
import { revalidatePath } from "next/cache"

export async function updateCategoria(id: number, categoria: Omit<Categoria, "id_categoria">) {
  try {
    const updatedCategoria = await prisma.menu_categoria.update({
      where: {
        id_categoria: id
      },
      data: {
        tag: categoria.tag,
        descripcion: categoria.descripcion
      }
    })
    revalidatePath("/categorias")
    return { success: true, data: updatedCategoria }
  } catch (error) {
    console.log(error)
    return []
  }
}
