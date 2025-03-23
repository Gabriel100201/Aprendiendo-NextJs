import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { menu_categoria as Categoria } from "@prisma/client"
import { DeleteCategoriaAlert } from "./delete-categoria-alert"
import { EditCategoriaDialog } from "./edit-categoria-dialog"

type CategoriaBasicInfo = Omit<Categoria, "id_categoria"> & Partial<Pick<Categoria, "id_categoria">>

interface CategoriasTableProps {
  categorias: CategoriaBasicInfo[]
  onCategoriaChange: () => void
}

export function CategoriasTable({ categorias, onCategoriaChange }: CategoriasTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">TAG</TableHead>
          <TableHead>DESCRIPCIÓN</TableHead>
          <TableHead className="w-[120px] text-right">ACCIONES</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categorias.length === 0 ? (
          <TableRow>
            <TableCell colSpan={3} className="py-6 text-muted-foreground text-center">
              No hay categorías disponibles
            </TableCell>
          </TableRow>
        ) : (
          categorias.map((categoria) => (
            <TableRow key={categoria.id_categoria}>
              <TableCell className="font-medium">{categoria.tag}</TableCell>
              <TableCell>{categoria.descripcion}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <EditCategoriaDialog categoria={categoria} onSuccess={onCategoriaChange} />
                  <DeleteCategoriaAlert
                    id={categoria.id_categoria!}
                    name={categoria.tag || ""}
                    onSuccess={onCategoriaChange}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  )
}

