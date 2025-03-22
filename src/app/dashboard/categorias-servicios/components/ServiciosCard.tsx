import { CardComponent } from "@/components/CardComponent";
import { TableComponent } from "@/components/TableComponent";
import { menu_servicios as Servicio } from "@prisma/client";
interface ServiciosCardProps {
  servicios: Servicio[];
  flexSpace?: 1 | 2 | 3 | 4;
}

export const ServiciosCard = ({ servicios, flexSpace }: ServiciosCardProps) => {
  return (
    <CardComponent style={{flex: flexSpace || 1}}>
      <TableComponent
        columns={["id", "titulo"]}
        data={servicios}
        placeHolder="Por favor selecciona una categoría"
      />
    </CardComponent>
  );
};
