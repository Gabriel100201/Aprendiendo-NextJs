import type { ServiciosBasicInfo } from "@/types/servicios";
import type { EntityConfig } from "@/components/crud";

export const serviciosConfig: EntityConfig<ServiciosBasicInfo> = {
  name: "Servicio",
  namePlural: "Servicios",
  fields: [
    {
      name: "titulo",
      label: "Título",
      placeholder: "Ingrese el título del servicio",
      required: true,
    },
    {
      name: "subtitulo",
      label: "Subtítulo",
      placeholder: "Ingrese el subtítulo del servicio",
    },
    {
      name: "icono",
      label: "Icono",
      placeholder: "Nombre del icono (ej: user, home, etc.)",
      type: "icon",
    },
    {
      name: "resumen",
      label: "Resumen",
      placeholder: "Ingrese un resumen del servicio",
      type: "textarea",
    },
    {
      name: "id_organismo",
      label: "ID Organismo",
      placeholder: "Ingrese el ID del organismo",
      type: "number",
    },
    {
      name: "tipo_componente",
      label: "Tipo de Componente",
      placeholder: "Ingrese el tipo de componente",
    },
    {
      name: "id_menu",
      label: "ID Menú",
      placeholder: "Ingrese el ID del menú",
    },
    {
      name: "roles",
      label: "Roles",
      placeholder: "Ingrese los roles permitidos",
    },
    {
      name: "estado_servicio",
      label: "Estado",
      placeholder: "Ingrese el estado del servicio",
      type: "select",
      options: [
        { value: "activo", label: "Activo" },
        { value: "inactivo", label: "Inactivo" },
        { value: "mantenimiento", label: "En mantenimiento" },
      ],
    },
  ],
  getDisplayName: (servicio) => servicio.titulo || "Servicio sin título",
  getIdField: (servicio) => servicio.id,
  emptyState: {
    titulo: "",
    subtitulo: "",
    icono: "",
    resumen: "",
    id_organismo: undefined,
    tipo_componente: "",
    id_menu: "",
    roles: "",
    estado_servicio: "activo",
  },
};
