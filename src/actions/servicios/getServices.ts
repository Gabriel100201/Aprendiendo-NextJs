"use server"

import { prisma } from "@/lib/prisma";

export async function getServices() {
  try {
    const services = await prisma.menu_servicios.findMany();
    return services;
  } catch (error) {
    console.log(error);
    return null;
  }
}