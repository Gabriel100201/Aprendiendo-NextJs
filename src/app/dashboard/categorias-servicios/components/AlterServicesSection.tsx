"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getServiciosByCategoria } from "@/actions/servicios/getServiciosByCategoria";
import {
  menu_categoria as Categoria,
  menu_servicios as Servicio,
} from "@prisma/client";
import { getCategorias } from "@/actions/categorias/getCategorias";
import { ServiciosCard } from "./ServiciosCard";
import { CategoriasCard } from "./CategoriasCard";

export function AlterServicesSection() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [selectedCategoria, setSelectedCategoria] = useState<
    Categoria["id_categoria"] | null
  >(null);

  useEffect(() => {
    const fetchCategorias = async () => {
      const categorias = await getCategorias();
      setCategorias(categorias);
    };
    fetchCategorias();
  }, []);

  useEffect(() => {
    const categoriaFromUrl = searchParams.get("categoria");
    if (categoriaFromUrl) {
      const categoriaId = parseInt(categoriaFromUrl);
      setSelectedCategoria(categoriaId);
      getServiciosByCategoria(categoriaId).then(setServicios);
    } else {
      setSelectedCategoria(null);
      setServicios([]);
    }
  }, [searchParams]);

  const handleCategoriaClick = async (categoriaId: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("categoria", categoriaId.toString());
    router.push(`?${params.toString()}`, { scroll: false });
    setSelectedCategoria(categoriaId);
    const servicios = await getServiciosByCategoria(categoriaId);
    setServicios(servicios);
  };

  return (
    <section className="flex gap-5 w-full">
      <CategoriasCard
        flexSpace={1}
        categorias={categorias}
        selectedCategoria={selectedCategoria}
        handleCategoriaClick={handleCategoriaClick}
      />
      <ServiciosCard
        flexSpace={2}
        servicios={servicios}
        selectedCategoria={selectedCategoria}
      />
    </section>
  );
}
