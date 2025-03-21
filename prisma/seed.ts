async function main() {
  const bcrypt = await import("bcrypt");
  const { prisma } = await import("@/lib/prisma");

  console.log("🌱 Seeding database...");

  const hashedPassword1 = await bcrypt.hash("123456", 10);
  const hashedPassword2 = await bcrypt.hash("abcdef", 10);

  await prisma.menu_categoria.createMany({
    data: [
      { id_categoria: 1, tag: "comida", descripcion: "Categoría de comida" },
      { id_categoria: 2, tag: "bebidas", descripcion: "Categoría de bebidas" },
    ],
    skipDuplicates: true,
  });

  await prisma.menu_organismo.createMany({
    data: [
      { id_organismo: 1, organismo: "Gobierno" },
      { id_organismo: 2, organismo: "Privado" },
    ],
    skipDuplicates: true,
  });

  await prisma.menu_servicios.createMany({
    data: [
      {
        id: 1,
        id_organismo: 1,
        titulo: "Licencias de conducir",
        icono: "🚗",
        subtitulo: "Renovación y emisión de licencias",
        resumen: "Trámite para obtener tu licencia",
        tipo_componente: "formulario",
        id_menu: "menu-1",
        roles: "usuario,admin",
        estado_servicio: "activo",
      },
      {
        id: 2,
        id_organismo: 2,
        titulo: "Pago de impuestos",
        icono: "💰",
        subtitulo: "Declaración y pago de impuestos",
        resumen: "Proceso de pago online",
        tipo_componente: "web",
        id_menu: "menu-2",
        roles: "usuario",
        estado_servicio: "activo",
      },
    ],
    skipDuplicates: true,
  });

  await prisma.usuarios.createMany({
    data: [
      {
        id: 1,
        nombre: "Juan Pérez",
        mail: "juan@example.com",
        password: hashedPassword1,
      },
      {
        id: 2,
        nombre: "Ana Gómez",
        mail: "ana@example.com",
        password: hashedPassword2,
      },
    ],
    skipDuplicates: true,
  });

  console.log("✅ Seeding completed!");

  await prisma.menu_serv_cat.createMany({
    data: [
      { id_categoria: 1, id_servicio: 1 },
      { id_categoria: 2, id_servicio: 2 },
    ],
    skipDuplicates: true,
  });
}

main()
  .catch((error) => {
    console.error("❌ Error en el seeding:", error);
    process.exit(1);
  })
  .finally(async () => {
    const { prisma } = await import("@/lib/prisma");
    await prisma.$disconnect();
  });
