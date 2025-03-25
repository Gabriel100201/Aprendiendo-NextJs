"use server"

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateRelacion(id_relacion: number, id_categoria: number, id_servicio: number) {
  try {
    const updated = await prisma.menu_serv_cat.update({
      where: {
        id_serv_cat: id_relacion
      },
      data: {
        id_categoria,
        id_servicio
      }
    });

    revalidatePath("/categorias-servicios");
    return { success: true, data: updated };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Error al actualizar la relación" };
  }
}
