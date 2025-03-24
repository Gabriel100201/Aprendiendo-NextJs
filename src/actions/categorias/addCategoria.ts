"use server"

import { prisma } from "@/lib/prisma";
import { menu_categoria as Categoria } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function addCategoria(data: Partial<Categoria>) {
  try {
    const newCategoria = await prisma.menu_categoria.create({
      data: {
        tag: data.tag,
        descripcion: data.descripcion
      }
    });
    revalidatePath("/categorias")
    return { success: true, data: newCategoria }; 
  } catch (error) {
    console.log(error);
    return [];
  }
}