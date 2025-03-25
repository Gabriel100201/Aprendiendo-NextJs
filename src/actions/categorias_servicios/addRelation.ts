"use server"

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addRelacion(id_categoria: number, id_servicio: number) {
  try {
    const relacion = await prisma.menu_serv_cat.create({
      data: {
        id_categoria,
        id_servicio
      }
    });

    revalidatePath("/categorias-servicios");
    return { success: true, data: relacion };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Error al crear la relación" };
  }
}
