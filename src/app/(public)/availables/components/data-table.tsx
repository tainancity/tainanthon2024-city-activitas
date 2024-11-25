'use client';

import { InputHTMLAttributes, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <Input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      {...props}
    />
  );
}

export function DataTable<TData, TValue>({
  columns,
  data,
  query: urlQuery,
}: DataTableProps<TData, TValue>) {
  const [type, setType] = useState<string | null>(urlQuery?.type ?? null);

  const [columnFilters, setColumnFilters] = useState([
    { id: 'type', value: type },
  ]);

  useEffect(() => {
    setColumnFilters((prevFilters) => {
      if (!type || type === 'all') {
        return prevFilters.filter((filter) => filter.id !== 'type');
      }

      const existingTypeFilter = prevFilters.find(
        (filter) => filter.id === 'type'
      );
      if (existingTypeFilter) {
        return prevFilters.map((filter) =>
          filter.id === 'type'
            ? { id: 'type', value: type }
            : { id: filter.id, value: filter.value }
        );
      } else {
        return [...prevFilters, { id: 'type', value: type }];
      }
    });
  }, [type]);

  const [globalFilter, setGlobalFilter] = useState<string>(urlQuery?.q || '');

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter,
      columnFilters,
    },
  });

  const router = useRouter();

  return (
    <>
      <div className="flex items-center gap-4 py-4">
        <Tabs defaultValue="all" value={type || 'all'}>
          <TabsList>
            <TabsTrigger value="all" onClick={() => setType('all')}>
              全部
            </TabsTrigger>
            <TabsTrigger value="建物" onClick={() => setType('建物')}>
              建物
            </TabsTrigger>
            <TabsTrigger value="土地" onClick={() => setType('土地')}>
              土地
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <DebouncedInput
          value={globalFilter ?? ''}
          onChange={(value) => setGlobalFilter(String(value))}
          placeholder="搜尋"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  onClick={() => {
                    router.push(`/availables/${row.original.id}`);
                  }}
                  key={row.original.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className="cursor-pointer"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          上一頁
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          下一頁
        </Button>
      </div>
    </>
  );
}
