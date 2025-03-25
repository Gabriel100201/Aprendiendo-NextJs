"use client"

import { useCallback, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { deleteRelacion } from "@/actions/categorias_servicios/deleteRelation"
import { getRelacionesByCategoria } from "@/actions/categorias_servicios/getRelacionesByCategoria"
import { EntityTable } from "@/components/crud/entity-table"
import { serviciosConfig } from "../../servicios/servicios-categorias"
import type { Servicios } from "@/types/servicios"
import type { RelacionCategoriaServicio } from "@/types/categoria_servicio"
import { CardComponent } from "@/components/CardComponent"

interface ServiciosCardProps {
  flexSpace?: 1 | 2 | 3 | 4;
}

export function CategoriaServiciosPanel({flexSpace}: ServiciosCardProps) {
  const searchParams = useSearchParams()
  const categoriaIdParam = searchParams.get("categoria")
  const categoriaId = categoriaIdParam ? parseInt(categoriaIdParam) : null

  const [servicios, setServicios] = useState<Servicios[]>([])
  const [relaciones, setRelaciones] = useState<RelacionCategoriaServicio[]>([])

  const fetchServicios = useCallback(async () => {
    if (!categoriaId) return
    const res = await getRelacionesByCategoria(categoriaId)
    if (res.success && Array.isArray(res.data)) {
      const relacionesTyped = res.data.map((r) => ({
        id_serv_cat: r.id_serv_cat,
        servicio: r.menu_servicios,
      }));      
      setRelaciones(relacionesTyped)
      setServicios(relacionesTyped.map((r) => r.servicio))
    }
  }, [categoriaId])

  const handleUnlink = async (relacionId: number) => {
    await deleteRelacion(relacionId)
    fetchServicios()
  }

  const handleDelete = async (servicioId: number) => {
    const relacion = relaciones.find(r => r.servicio.id === servicioId)
    if (relacion) {
      await handleUnlink(relacion.id_serv_cat)
    }
  }  

  useEffect(() => {
    fetchServicios()
  }, [categoriaId, fetchServicios])

  return (
    <CardComponent style={{ flex: flexSpace || 1 }}>
      {categoriaId ? (
        <EntityTable
          items={servicios}
          config={serviciosConfig}
          onItemChange={fetchServicios}
          deleteAction={handleDelete}
          columns={["titulo", "estado_servicio"]}
        />
      ) : (
        <p className="text-muted-foreground">Seleccioná una categoría para ver sus servicios asociados.</p>
      )}
    </CardComponent>
  )
}
