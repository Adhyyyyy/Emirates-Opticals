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
} from "@tanstack/react-table";
import { 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  SlidersHorizontal,
  ChevronDown,
  Trash2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { useRouter } from "next/navigation";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey: string;
  onDeleteSelected?: (selectedIds: string[]) => Promise<void>;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
  onDeleteSelected,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = React.useState({});
  const [isDeleting, setIsDeleting] = React.useState(false);
  const router = useRouter();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  });

  const handleBulkDelete = async () => {
    const selectedRows = table.getFilteredSelectedRowModel().rows;
    const selectedIds = selectedRows.map((row: any) => (row.original as any).id);

    if (selectedIds.length === 0) return;

    if (confirm(`Execute bulk deletion protocol? This will remove ${selectedIds.length} selected assets from the global catalog.`)) {
      setIsDeleting(true);
      try {
        if (onDeleteSelected) {
          await onDeleteSelected(selectedIds);
        }
        table.resetRowSelection();
        router.refresh();
      } catch (err) {
        console.error("Bulk delete error:", err);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Table Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4 bg-white border border-black/5 px-6 py-4 rounded-2xl w-full max-w-lg group focus-within:border-brand-gold transition-all shadow-xl shadow-black/[0.02]">
          <Search className="w-4 h-4 text-brand-charcoal/20 group-focus-within:text-brand-gold" />
          <input
            placeholder={`Search ${searchKey}...`}
            value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn(searchKey)?.setFilterValue(event.target.value)
            }
            className="bg-transparent border-none outline-none text-[11px] font-bold uppercase tracking-widest w-full placeholder:text-black/10"
          />
        </div>

        <div className="flex items-center gap-3">
          {onDeleteSelected && table.getFilteredSelectedRowModel().rows.length > 0 && (
            <LuxuryButton 
              onClick={handleBulkDelete}
              disabled={isDeleting}
              className="bg-red-50 hover:bg-red-100 text-red-600 px-6 py-4 text-[10px] uppercase tracking-widest flex items-center gap-2 border border-red-200 shadow-md font-bold transition-all duration-300"
            >
              <Trash2 className="w-3.5 h-3.5" />
              {isDeleting ? "Deleting..." : `Delete Selected (${table.getFilteredSelectedRowModel().rows.length})`}
            </LuxuryButton>
          )}
          <LuxuryButton variant="outline" className="px-6 py-4 text-[10px] uppercase tracking-widest bg-white">
            <SlidersHorizontal className="w-3.5 h-3.5 mr-2" />
            Display Options
          </LuxuryButton>
        </div>
      </div>

      {/* The Data Grid */}
      <div className="bg-white border border-black/5 rounded-[2rem] overflow-hidden shadow-2xl shadow-black/[0.03]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="border-b border-black/5 bg-brand-pearl/20">
                  {headerGroup.headers.map((header) => {
                    return (
                      <th key={header.id} className="px-10 py-8 text-[10px] font-bold uppercase tracking-[0.3em] text-brand-charcoal/40">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-black/5">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="hover:bg-brand-pearl/10 transition-all duration-500 group data-[state=selected]:bg-brand-gold/5"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-10 py-8">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="h-64 text-center">
                    <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-charcoal/20">No Protocol Data Available</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="px-10 py-8 bg-brand-pearl/10 border-t border-black/5 flex items-center justify-between">
          <div className="text-[10px] font-bold uppercase tracking-widest text-brand-charcoal/30">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="p-2 hover:bg-white rounded-lg disabled:opacity-30 transition-all"
            >
              <ChevronLeft className="w-4 h-4 text-brand-charcoal" />
            </button>
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-charcoal">
              Page {table.getState().pagination.pageIndex + 1}
            </span>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="p-2 hover:bg-white rounded-lg disabled:opacity-30 transition-all"
            >
              <ChevronRight className="w-4 h-4 text-brand-charcoal" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
