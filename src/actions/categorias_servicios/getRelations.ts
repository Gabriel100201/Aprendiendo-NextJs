"use server"

import { prisma } from "@/lib/prisma";

export async function getRelaciones() {
  try {
    const relaciones = await prisma.menu_serv_cat.findMany({
      include: {
        menu_categoria: true,
        menu_servicios: true
      }
    });

    return relaciones;
  } catch (error) {
    console.error(error);
    return [];
  }
}
