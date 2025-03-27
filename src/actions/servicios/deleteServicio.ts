"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function deleteServicio(id: number) {
  try {
    await prisma.menu_serv_cat.deleteMany({
      where: {
        id_servicio: id,
      },
    });
    
    const deletedServicio = await prisma.menu_servicios.delete({
      where: {
        id: id,
      },
    })

    revalidatePath("/servicios")
    return { success: true, data: deletedServicio }
  } catch (error) {
    console.log(error)
    return []
  }
}

