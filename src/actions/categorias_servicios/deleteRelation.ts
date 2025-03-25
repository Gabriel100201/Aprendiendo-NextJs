"use server"

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteRelacion(id_relacion: number) {
  try {
    await prisma.menu_serv_cat.delete({
      where: {
        id_serv_cat: id_relacion
      }
    });

    revalidatePath("/categorias-servicios");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Error al eliminar la relación" };
  }
}
