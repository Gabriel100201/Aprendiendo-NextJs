"use server"

import { prisma } from "@/lib/prisma"

export async function addServicioToCategoria(servicioId: number, categoriaId: number) {
  try {
    await prisma.menu_serv_cat.create({
      data: {
        id_categoria: categoriaId,
        id_servicio: servicioId
      }
    })
  } catch (error) {
    console.log(error)
  }
}