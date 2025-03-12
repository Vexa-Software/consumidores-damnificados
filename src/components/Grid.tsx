"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  Row,
} from "@tanstack/react-table";
import { toast } from 'react-toastify';
import { Button } from "../components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Timestamp } from "firebase/firestore";

interface Item {
  id: string;
  titulo: string;
  descripcion: string;
  fecha: Timestamp | string;
  imagen?: string;
}

interface DataTableDemoProps {
  data: Item[];
  onEdit: (item: Item) => void;
  onDelete: (id: string) => void;
  storageKey: string;
}

export function DataTableDemo({ data, onEdit, onDelete, storageKey }: DataTableDemoProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const abrirImagen = (url: string) => {
    if (url) {
      window.open(url, '_blank');
    } else {
      toast.info("No hay imagen disponible para este item");
    }
  };

  const columns: ColumnDef<Item>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "titulo",
      header: "Título",
      cell: ({ row }) => <div className="capitalize min-w-[100%] max-w-[200px] ">{row.getValue("titulo")}</div>,
    },
    {
      accessorKey: "descripcion",
      header: "Descripción",
      cell: ({ row }) => {
        const descripcion = row.getValue("descripcion") as string;
        const textoLimitado = descripcion.length > 250 
          ? `${descripcion.substring(0, 250)}...` 
          : descripcion;
        return (
          <div className="min-w-[100%] w-[100px] sm:w-[170px] xl:w-[300px] max-w-[300px] h-full flex items-center justify-center text-center">
            {textoLimitado}
          </div>
        );
      },
    },
    {
      accessorKey: "fecha",
      header: "Fecha",
      cell: ({ row }) => <div className="text-center min-w-[150px] w-[100%]">{row.getValue("fecha")}</div>,
    },
    ...(storageKey === "noticias"
      ? [
        {
          accessorKey: "imagen",
          header: "Imagen",
          cell: ({ row }: { row: Row<Item> }) => {
            const imagen = row.getValue("imagen") as string;
            return (
              <div className="text-center">
                {imagen ? (
                  <Button
                    variant="outline"
                    className="bg-sky-500 text-white text-xs py-1 px-2"
                    onClick={() => abrirImagen(imagen)}
                  >
                    Ver imagen
                  </Button>
                ) : (
                  <span className="text-gray-400 text-sm">Sin imagen</span>
                )}
              </div>
            );
          },
        },
      ]
      : []),
    {
      id: "actions",
      header: "Acciones",
      enableHiding: false,
      cell: ({ row }) => {
        const item = row.original;
        return (
          <div className="flex flex-col justify-between gap-2">
            <Button variant="outline" className="bg-yellow-500 text-white" onClick={() => onEdit(item)}>
              Editar
            </Button>
            <Button variant="outline" className="bg-red-500 text-white" onClick={() => onDelete(item.id)}>
              Eliminar
            </Button>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex flex-col items-start gap-2 py-4">
        <label htmlFor="titulo" className="mr-2">Buscar por título:</label>
        <Input
          placeholder="Buscar por título..."
          value={(table.getColumn("titulo")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("titulo")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No hay resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} de{" "}
          {table.getFilteredRowModel().rows.length} filas seleccionadas.
        </div>
        <div className="space-x-2">
          <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            Anterior
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  );
}
