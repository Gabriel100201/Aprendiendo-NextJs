import { prisma } from "@/lib/prisma";

export async function getOrganismosOptions() {
  const organismos = await prisma.menu_organismo.findMany({
    select: {
      id_organismo: true,
      organismo: true,
    },
    orderBy: {
      organismo: 'asc',
    }
  });

  return organismos.map((org) => ({
    value: org.id_organismo,
    label: org.organismo || `Organismo #${org.id_organismo}`,
  }));
}
