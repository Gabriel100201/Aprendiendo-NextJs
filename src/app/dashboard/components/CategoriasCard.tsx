import { CardComponent } from "@/components/CardComponent";
import { TableComponent } from "@/components/TableComponent";
import { menu_categoria as Categoria } from "@prisma/client";

interface CategoriaCardProps {
  categorias: Categoria[];
  selectedCategoria: number | null;
  handleCategoriaClick: (categoriaId: number) => void;
}

export const CategoriasCard = ({ categorias, selectedCategoria, handleCategoriaClick }: CategoriaCardProps) => {
  return (
    <CardComponent style={{ width: "50%", padding: "1rem" }}>
      <TableComponent
        clickable
        columns={["tag", "descripcion"]}
        data={categorias}
        onRowClick={(row) => handleCategoriaClick(row.id_categoria)}
        placeHolder="No hay categorías disponibles"
        selectedCategoria={selectedCategoria}
      />
    </CardComponent>
  );
};
