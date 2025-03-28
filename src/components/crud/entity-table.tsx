/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { EditEntityDialog } from "./edit-entity-dialog"
import { DeleteEntityAlert } from "./delete-entity-alert"
import type { EntityConfig, EstadoColors } from "./types";

interface EntityTableProps<T> {
  items: T[];
  config: EntityConfig<T>;
  onItemChange: () => void;
  updateAction?: (id: number, data: Partial<T>) => Promise<unknown>;
  deleteAction?: (id: number) => Promise<unknown>;
  columns?: string[];
}

const colorClasses: Record<EstadoColors, string> = {
  red: "bg-red-200 text-red-800",
  green: "bg-green-200 text-green-800",
  yellow: "bg-yellow-200 text-yellow-800",
  blue: "bg-blue-200 text-blue-800",
};

export function EntityTable<T>({
  items,
  config,
  onItemChange,
  updateAction,
  deleteAction,
  columns,
}: EntityTableProps<T>) {
  const tableColumns =
    columns ||
    config.fields
      .filter((field) => field.type !== "textarea")
      .slice(0, 3)
      .map((field) => field.name);

  const estadoColumn = config.fields.find((field) => field?.estadoColumn?.name);
  const estadoColumnInfo = estadoColumn?.estadoColumn;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {tableColumns.map((column) => {
            const field = config.fields.find((f) => f.name === column);
            return (
              <TableHead
                key={column}
                className={column === tableColumns[0] ? "w-[200px]" : ""}
              >
                {field?.label || column.toUpperCase()}
              </TableHead>
            );
          })}
          <TableHead className="w-[120px] text-right">ACCIONES</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={tableColumns.length + 1}
              className="py-6 text-muted-foreground text-center"
            >
              No hay {config.namePlural.toLowerCase()} disponibles
            </TableCell>
          </TableRow>
        ) : (
          items.map((item) => (
            <TableRow
              key={String(
                config.getIdField?.(item) ??
                  (item as any).id ??
                  (item as any).id_categoria
              )}
            >
              {tableColumns.map((column) => {
                const isEstado = column === estadoColumn?.name;
                const estadoValue = (item as any)[column];
                const estadoColor = estadoColumnInfo?.values.find(
                  (v) => v.label === estadoValue
                )?.color;
                const estadoClass = estadoColor
                  ? colorClasses[estadoColor]
                  : "";

                return (
                  <TableCell
                    key={column}
                    className={column === tableColumns[0] ? "font-medium" : ""}
                  >
                    {isEstado ? (
                      <span
                        className={`${estadoClass} px-2 py-1 rounded-md text-xs`}
                      >
                        {estadoValue.toUpperCase()}
                      </span>
                    ) : (
                      estadoValue
                    )}
                  </TableCell>
                );
              })}
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  {updateAction && (
                    <EditEntityDialog
                      item={item}
                      config={config}
                      onSuccess={onItemChange}
                      updateAction={updateAction}
                    />
                  )}
                  {deleteAction && (
                    <DeleteEntityAlert
                      item={item}
                      config={config}
                      onSuccess={onItemChange}
                      deleteAction={deleteAction}
                    />
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
