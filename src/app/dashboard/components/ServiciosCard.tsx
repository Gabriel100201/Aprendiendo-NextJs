import { CardComponent } from "@/components/CardComponent";
import { TableComponent } from "@/components/TableComponent";
import { menu_servicios as Servicio } from "@prisma/client";
interface ServiciosCardProps {
  servicios: Servicio[];
}

export const ServiciosCard = ({ servicios }: ServiciosCardProps) => {
  return (
    <CardComponent style={{ width: "50%" }}>
      <TableComponent
        columns={["id", "titulo"]}
        data={servicios}
        placeHolder="Por favor selecciona una categoría"
      />
    </CardComponent>
  );
};
