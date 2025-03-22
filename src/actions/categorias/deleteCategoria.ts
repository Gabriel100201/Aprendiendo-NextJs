"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function deleteCategoria(id: number) {
  try {
    const deletedCategoria = await prisma.menu_categoria.delete({
      where: {
        id_categoria: id
      }
    })
    revalidatePath("/categorias")
    return { success: true, data: deletedCategoria }
  } catch (error) {
    console.log(error)
    return []
  }
}
