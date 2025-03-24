import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { EditEntityDialog } from "./edit-entity-dialog"
import { DeleteEntityAlert } from "./delete-entity-alert"
import type { EntityConfig } from "./types"

interface EntityTableProps<T> {
  items: T[]
  config: EntityConfig<T>
  onItemChange: () => void
  updateAction: (id: number, data: Partial<T>) => Promise<unknown>
  deleteAction: (id: number) => Promise<unknown>
  columns?: string[]
}

export function EntityTable<T>({
  items,
  config,
  onItemChange,
  updateAction,
  deleteAction,
  columns,
}: EntityTableProps<T>) {
  // Determine which fields to show as columns
  const tableColumns =
    columns ||
    config.fields
      .filter((field) => field.type !== "textarea")
      .slice(0, 3)
      .map((field) => field.name)

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {tableColumns.map((column) => {
            const field = config.fields.find((f) => f.name === column)
            return (
              <TableHead key={column} className={column === tableColumns[0] ? "w-[200px]" : ""}>
                {field?.label || column.toUpperCase()}
              </TableHead>
            )
          })}
          <TableHead className="w-[120px] text-right">ACCIONES</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.length === 0 ? (
          <TableRow>
            <TableCell colSpan={tableColumns.length + 1} className="py-6 text-muted-foreground text-center">
              No hay {config.namePlural.toLowerCase()} disponibles
            </TableCell>
          </TableRow>
        ) : (
          items.map((item) => (
            <TableRow key={String(config.getIdField(item))}>
              {tableColumns.map((column) => (
                <TableCell key={column} className={column === tableColumns[0] ? "font-medium" : ""}>
                  {(item as never)[column]}
                </TableCell>
              ))}
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <EditEntityDialog item={item} config={config} onSuccess={onItemChange} updateAction={updateAction} />
                  <DeleteEntityAlert item={item} config={config} onSuccess={onItemChange} deleteAction={deleteAction} />
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  )
}

