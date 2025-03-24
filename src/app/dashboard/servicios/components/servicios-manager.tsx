"use client"

import type { menu_servicios as Servicio } from "@prisma/client"
import { getServicios } from "@/actions/servicios/getServicios"
import { addServicio } from "@/actions/servicios/addServicio"
import { updateServicio } from "@/actions/servicios/updateServicio"
import { deleteServicio } from "@/actions/servicios/deleteServicio"
import { serviciosConfig } from "../servicios-categorias"
import { EntityManager } from "@/components/crud"

export function ServiciosManager() {
  return (
    <EntityManager<Servicio>
      config={serviciosConfig}
      fetchItems={getServicios}
      addAction={addServicio}
      updateAction={updateServicio}
      deleteAction={deleteServicio}
      columns={["titulo", "subtitulo", "estado_servicio"]}
    />
  )
}

