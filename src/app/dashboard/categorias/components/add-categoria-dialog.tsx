/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
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
import { CategoriaBasicInfo } from "@/types/categorias"
import { CategoriaForm } from "./categoria-form"
import { addCategoria } from "@/actions/categorias/addCategoria"

interface AddCategoriaDialogProps {
  onSuccess: () => void
}

export function AddCategoriaDialog({ onSuccess }: AddCategoriaDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<Partial<CategoriaBasicInfo>>({ tag: "", descripcion: "" })

  const handleSubmit = async () => {
    if (!formData.tag || !formData.descripcion) return

    setIsLoading(true)
    try {
      const result = await addCategoria({
        tag: formData.tag,
        descripcion: formData.descripcion,
      })

      if (Array.isArray(result)) {
        toast.error("Error al crear categoría", {
          description: "No se pudo crear la categoría",
        })
      } else {
        toast.success("Categoría creada", {
          description: "La categoría se ha creado correctamente",
        })
        setFormData({ tag: "", descripcion: "" })
        onSuccess()
        setIsOpen(false)
      }
    } catch (error) {
      toast.error("Error al crear categoría", {
        description: "Ocurrió un error al crear la categoría",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="sm" className="flex items-center gap-1">
          <Plus className="w-4 h-4" />
          <span>Agregar categoría</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Agregar nueva categoría</DialogTitle>
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
            {isLoading ? "Guardando..." : "Guardar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

