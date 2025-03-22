"use server"

import { prisma } from "@/lib/prisma";
import { menu_categoria as Categoria } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function addCategoria(categoria: Omit<Categoria, "id_categoria">) {
  try {
    const newCategoria = await prisma.menu_categoria.create({
      data: {
        tag: categoria.tag,
        descripcion: categoria.descripcion
      }
    });
    revalidatePath("/categorias")
    return { success: true, data: newCategoria }; 
  } catch (error) {
    console.log(error);
    return [];
  }
}