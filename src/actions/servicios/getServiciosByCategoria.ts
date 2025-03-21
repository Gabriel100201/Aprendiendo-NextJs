"use server";
import { prisma } from "@/lib/prisma";
import { menu_servicios as Servicio } from "@prisma/client";

export async function getServiciosByCategoria(categoriaId: number): Promise<Servicio[]> {
  const idServicios = await prisma.menu_serv_cat.findMany({
    where: { id_categoria: categoriaId }
  });

  const servicios = await prisma.menu_servicios.findMany({
    where: { id: { in: idServicios.map(servicio => servicio.id_servicio!) } }
  });

  return servicios;
}