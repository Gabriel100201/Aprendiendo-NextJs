"use server"

import { prisma } from "@/lib/prisma"

export async function getRelacionesByCategoria(id_categoria: number) {
  try {
    const relaciones = await prisma.menu_serv_cat.findMany({
      where: { id_categoria },
      include: { menu_servicios: true }
    })

    return { success: true, data: relaciones }
  } catch (error) {
    console.error(error)
    return { success: false, error: "Error al obtener servicios relacionados" }
  }
}
