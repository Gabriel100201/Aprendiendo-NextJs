import fs from "fs";
import path from "path";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

async function main() {
  console.log("🌱 Seeding database...");

  // Leer el archivo JSON
  const filePath = path.join(__dirname, "seedData.json");
  const rawData = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(rawData);

  // Encriptar contraseñas
  for (const user of data.usuarios) {
    user.password = await bcrypt.hash(user.password, 10);
  }

  // Insertar datos en la base de datos
  await prisma.menu_categoria.createMany({
    data: data.menu_categoria,
    skipDuplicates: true
  });

  await prisma.menu_organismo.createMany({
    data: data.menu_organismo,
    skipDuplicates: true
  });

  await prisma.menu_servicios.createMany({
    data: data.menu_servicios,
    skipDuplicates: true
  });

  await prisma.usuarios.createMany({
    data: data.usuarios,
    skipDuplicates: true
  });

  await prisma.menu_serv_cat.createMany({
    data: data.menu_serv_cat,
    skipDuplicates: true
  });

  console.log("✅ Seeding completed!");
}

// Ejecutar seeding
main()
  .catch((error) => {
    console.error("❌ Error en el seeding:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
