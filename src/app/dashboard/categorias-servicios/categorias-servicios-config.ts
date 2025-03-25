import type { EntityConfig } from "@/components/crud"
import type { menu_servicios as Servicio } from "@prisma/client"

export const servicio: EntityConfig<Servicio> = {
  name: "Servicio",
  namePlural: "Servicios",
  getIdField: (item) => item.id,
  fields: [
    { name: "titulo", label: "Título", type: "text" },
    { name: "subtitulo", label: "Subtítulo", type: "text" },
    { name: "estado_servicio", label: "Estado", type: "text" }
  ],
  emptyState: {
    titulo: "",
    subtitulo: "",
    estado_servicio: "",
  },
  getDisplayName: (servicio) => servicio.titulo || "Servicio sin título",
}