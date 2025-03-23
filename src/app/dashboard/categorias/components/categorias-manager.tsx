/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { CategoriaBasicInfo } from "@/types/categorias"
import { getCategorias } from "@/actions/categorias/getCategorias"
import { toast } from "sonner"
import { CategoriasTable } from "./categorias-table"
import { AddCategoriaDialog } from "./add-categoria-dialog"
import { CardComponent } from "@/components/CardComponent"

export function CategoriasManager() {
  const [categorias, setCategorias] = useState<CategoriaBasicInfo[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchCategorias = async () => {
    setIsLoading(true)
    try {
      const data = await getCategorias()
      setCategorias(data)
    } catch (error) {
      toast.error("No se pudieron cargar las categorías", {
        description: "Ocurrió un error al intentar obtener las categorías",
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCategorias()
  }, [])

  return (
    <CardComponent >
      <CardHeader className="bg-white border-b">
        <CardTitle className="font-semibold text-xl">Gestión de Categorías</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium text-lg">Listado de categorías</h3>
          <AddCategoriaDialog onSuccess={fetchCategorias} />
        </div>

        {isLoading ? (
          <div className="py-8 text-muted-foreground text-center">Cargando categorías...</div>
        ) : (
          <CategoriasTable categorias={categorias} onCategoriaChange={fetchCategorias} />
        )}
      </CardContent>
    </CardComponent>
  )
}

