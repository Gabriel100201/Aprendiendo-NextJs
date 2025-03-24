"use server"

import { prisma } from "@/lib/prisma"

export async function getServicios() {
  try {
    const servicios = await prisma.menu_servicios.findMany({
      orderBy: {
        id: "asc",
      },
    })
    return servicios
  } catch (error) {
    console.log(error)
    return []
  }
}

