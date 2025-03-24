"use server"

import { prisma } from "@/lib/prisma"
import type { menu_servicios as Servicio } from "@prisma/client"
import { revalidatePath } from "next/cache"

export async function updateServicio(id: number, servicio: Partial<Servicio>) {
  try {
    const updatedServicio = await prisma.menu_servicios.update({
      where: {
        id: id,
      },
      data: {
        id_organismo: servicio.id_organismo,
        titulo: servicio.titulo,
        icono: servicio.icono,
        subtitulo: servicio.subtitulo,
        resumen: servicio.resumen,
        tipo_componente: servicio.tipo_componente,
        id_menu: servicio.id_menu,
        roles: servicio.roles,
        estado_servicio: servicio.estado_servicio,
      },
    })

    revalidatePath("/servicios")
    return { success: true, data: updatedServicio }
  } catch (error) {
    console.log(error)
    return []
  }
}

