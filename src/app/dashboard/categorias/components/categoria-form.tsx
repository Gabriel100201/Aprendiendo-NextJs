"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import type { menu_categoria as Categoria } from "@prisma/client"

interface CategoriaFormProps {
  initialData: Partial<Categoria>
  isLoading: boolean
  onChange: (data: Partial<Categoria>) => void
}

export function CategoriaForm({ initialData, isLoading, onChange }: CategoriaFormProps) {
  const [formData, setFormData] = useState<Partial<Categoria>>(initialData)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const updatedData = { ...formData, [name]: value }
    setFormData(updatedData)
    onChange(updatedData)
  }

  return (
    <div className="gap-4 grid py-4">
      <div className="gap-2 grid">
        <label htmlFor="tag" className="font-medium text-sm">
          TAG
        </label>
        <Input
          id="tag"
          name="tag"
          value={formData.tag || ""}
          onChange={handleChange}
          placeholder="Ingrese el tag de la categoría"
          disabled={isLoading}
        />
      </div>
      <div className="gap-2 grid">
        <label htmlFor="descripcion" className="font-medium text-sm">
          DESCRIPCIÓN
        </label>
        <Input
          id="descripcion"
          name="descripcion"
          value={formData.descripcion || ""}
          onChange={handleChange}
          placeholder="Ingrese la descripción de la categoría"
          disabled={isLoading}
        />
      </div>
    </div>
  )
}

