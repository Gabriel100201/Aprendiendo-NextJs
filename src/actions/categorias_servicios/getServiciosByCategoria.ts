"use server"

import { prisma } from "@/lib/prisma";

export async function getServiciosByCategoria(id_categoria: number) {
  try {
    const servicios = await prisma.menu_serv_cat.findMany({
      where: { id_categoria },
      include: {
        menu_servicios: true
      }
    });

    // Si querés devolver solo los servicios directamente:
    const serviciosResult = servicios.map((relacion) => relacion.menu_servicios);

    return { success: true, data: serviciosResult };
  } catch (error) {
    console.error(error);
    return { success: false, error: "No se pudieron obtener los servicios" };
  }
}
