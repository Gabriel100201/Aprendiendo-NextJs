import type { menu_categoria as Categoria } from "@prisma/client"
import type { EntityConfig } from "@/components/crud"

export const categoriasConfig: EntityConfig<Categoria> = {
  name: "Categoría",
  namePlural: "Categorías",
  fields: [
    {
      name: "tag",
      label: "TAG",
      placeholder: "Ingrese el tag de la categoría",
      required: true,
    },
    {
      name: "descripcion",
      label: "DESCRIPCIÓN",
      placeholder: "Ingrese la descripción de la categoría",
      required: true,
    },
  ],
  getDisplayName: (categoria) => categoria.tag || "Categoría sin nombre",
  getIdField: (categoria) => categoria.id_categoria,
  emptyState: {
    tag: "",
    descripcion: "",
  },
}

