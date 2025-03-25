import { menu_servicios } from "@prisma/client";

type Servicios = menu_servicios;
type ServiciosBasicInfo = Omit<Servicios, "id_servicio"> & Partial<Pick<Servicios, "id_servicio">>;

export { Servicios, ServiciosBasicInfo };