"use server"

import { prisma } from "@/lib/prisma";

export async function getCategorias() {
  try {
    const categorias = await prisma.menu_categoria.findMany();
    return categorias;
  } catch (error) {
    console.log(error);
    return [];
  }
}