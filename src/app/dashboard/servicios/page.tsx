import { getServiciosByCategoria } from "@/actions/servicios/getServiciosByCategoria";

export default async function ServiciosPage() {
  const servicios = await getServiciosByCategoria(1);
  return (
    <>
      {servicios.map((servicio) => (
        <div key={servicio.resumen}>{servicio.titulo}</div>
      ))}
    </>
  );
}
