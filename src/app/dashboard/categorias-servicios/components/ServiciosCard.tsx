import { CardComponent } from "@/components/CardComponent";
import { TableComponent } from "@/components/TableComponent";
import { menu_servicios as Servicio } from "@prisma/client";

interface ServiciosCardProps {
  servicios: Servicio[];
  selectedCategoria: number | null;
  flexSpace?: 1 | 2 | 3 | 4;
}

export const ServiciosCard = ({
  servicios,
  selectedCategoria,
  flexSpace,
}: ServiciosCardProps) => {
  return (
    <CardComponent style={{ flex: flexSpace || 1 }}>
      {selectedCategoria && (
        <>
          <TableComponent
            columns={["id", "titulo"]}
            data={servicios}
            placeHolder="No hay servicios asociados"
          />
        </>
      )}
      {!selectedCategoria && (
        <div className="py-4 text-gray-500 text-center">
          Seleccione una categoría
        </div>
      )}
    </CardComponent>
  );
};
