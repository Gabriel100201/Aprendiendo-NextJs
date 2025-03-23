/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState, useEffect } from "react"
import { Pencil } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import type { menu_categoria as Categoria } from "@prisma/client"
import { CategoriaForm } from "./categoria-form"
import { updateCategoria } from "@/actions/categorias/updateCategoria"

type CategoriaBasicInfo = Omit<Categoria, "id_categoria"> & Partial<Pick<Categoria, "id_categoria">>

interface EditCategoriaDialogProps {
  categoria: CategoriaBasicInfo
  onSuccess: () => void
}

export function EditCategoriaDialog({ categoria, onSuccess }: EditCategoriaDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<Partial<Categoria>>({
    tag: categoria.tag,
    descripcion: categoria.descripcion,
  })

  useEffect(() => {
    if (isOpen) {
      setFormData({
        tag: categoria.tag,
        descripcion: categoria.descripcion,
      })
    }
  }, [isOpen, categoria])

  const handleSubmit = async () => {
    if (!categoria.id_categoria || !formData.tag || !formData.descripcion) return

    setIsLoading(true)
    try {
      const result = await updateCategoria(categoria.id_categoria, {
        tag: formData.tag,
        descripcion: formData.descripcion,
      })

      if (Array.isArray(result)) {
        toast.error("Error al actualizar categoría", {
          description: "No se pudo actualizar la categoría",
        })
      } else {
        toast.success("Categoría actualizada", {
          description: "La categoría se ha actualizado correctamente",
        })
        onSuccess()
        setIsOpen(false)
      }
    } catch (error) {
      toast.error("Error al actualizar categoría", {
        description: "Ocurrió un error al actualizar la categoría",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Pencil className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Editar categoría</DialogTitle>
        </DialogHeader>
        <CategoriaForm initialData={formData} isLoading={isLoading} onChange={setFormData} />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" size="sm" disabled={isLoading}>
              Cancelar
            </Button>
          </DialogClose>
          <Button
            type="submit"
            size="sm"
            onClick={handleSubmit}
            disabled={!formData.tag || !formData.descripcion || isLoading}
          >
            {isLoading ? "Actualizando..." : "Actualizar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

