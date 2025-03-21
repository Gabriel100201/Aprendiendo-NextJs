"use client";

import { useState } from "react";
import { getServiciosByCategoria } from "@/actions/servicios/getServiciosByCategoria";
import { TableComponent } from "@/components/TableComponent";
import { CardComponent } from "@/components/CardComponent";
import { menu_categoria as Categoria, menu_servicios as Servicio } from "@prisma/client";

export function AlterServicesByCatSection({ categorias }: { categorias: Categoria[] }) {
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [, setSelectedCategoria] = useState<number | null>(null);

  const handleCategoriaClick = async (categoriaId: number) => {
    setSelectedCategoria(categoriaId);
    const servicios = await getServiciosByCategoria(categoriaId);
    setServicios(servicios);
  };

  return (
    <section className="flex gap-5 w-full">
      <CardComponent style={{ width: "50%" }}>
        <TableComponent
          clickable
          columns={["tag", "descripcion"]}
          data={categorias}
          onRowClick={(row) => handleCategoriaClick(row.id_categoria)}
        />
      </CardComponent>

      <CardComponent style={{ width: "50%" }}>
        <TableComponent
          columns={["id", "titulo"]}
          data={servicios}
          placeHolder="Por favor selecciona una categoría"
        />
      </CardComponent>
    </section>
  );
}
