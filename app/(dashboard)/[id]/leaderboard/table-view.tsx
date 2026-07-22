import { useMemo, FC } from "react";
import Link from "next/link";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
} from "@tanstack/react-table";
import { Trophy, ArrowRight } from "lucide-react";
import { Statistic } from "@/api/common.types";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface TableViewProps {
  data: Array<Statistic>;
  tournamentId: string;
  currentUser?: string;
}

export const TableView: FC<TableViewProps> = ({
  data,
  tournamentId,
  currentUser,
}) => {
  const columns = useMemo<ColumnDef<Statistic>[]>(
    () => [
      {
        accessorKey: "rank",
        header: "Rank",
        cell: ({ row }) => {
          const rank = row.original.rank;
          return (
            <div
              className={cn(
                "flex items-center justify-center size-9 rounded-lg font-bold text-sm border shrink-0 shadow-inner",
                rank === 1 &&
                  "bg-amber-500/15 text-amber-400 border-amber-500/40",
                rank === 2 &&
                  "bg-slate-300/15 text-slate-200 border-slate-300/40",
                rank === 3 &&
                  "bg-amber-700/15 text-amber-500 border-amber-600/40",
                rank > 3 && "bg-brand-card text-text-muted border-brand-border",
              )}
            >
              {rank <= 3 ? <Trophy className="size-4" /> : `#${rank}`}
            </div>
          );
        },
      },
      {
        accessorKey: "player",
        header: "Player",
        cell: ({ row }) => {
          const item = row.original;
          const fullName = `${item.firstName} ${item.lastName}`.trim();
          return (
            <div className="flex flex-col min-w-0">
              <span className="font-bold text-white text-sm leading-tight">
                {fullName}
              </span>
              <span className="text-xs text-gray-400 font-normal mt-0.5">
                {item.totalPredictions} predictions
              </span>
            </div>
          );
        },
      },
      {
        accessorKey: "totalPoints",
        header: "Points",
        cell: ({ row }) => (
          <span className="text-base font-bold text-emerald-400">
            {row.original.totalPoints} pts
          </span>
        ),
      },
      {
        accessorKey: "exactCount",
        header: () => <span>Exact (3pts)</span>,
        cell: ({ row }) => (
          <span className="text-emerald-400">{row.original.exactCount}</span>
        ),
      },
      {
        accessorKey: "differenceCount",
        header: () => <span>Diff (2pts)</span>,
        cell: ({ row }) => (
          <span className="text-sky-400">{row.original.differenceCount}</span>
        ),
      },
      {
        accessorKey: "outcomeCount",
        header: () => <span>Outcome (1pt)</span>,
        cell: ({ row }) => (
          <span className="text-amber-400">{row.original.outcomeCount}</span>
        ),
      },
      {
        id: "actions",
        header: () => <span className="flex justify-end px-3">Action</span>,
        cell: ({ row }) => {
          const item = row.original;
          return (
            <div className="flex justify-end">
              <Button
                variant="ghost"
                size="sm"
                className="flex h-8 px-3 text-xs text-text-muted hover:text-white hover:bg-brand-card transition-colors rounded-md"
              >
                <Link
                  href={`/${tournamentId}/predictions?userId=${item.userId}`}
                  className="flex items-center gap-1"
                >
                  <span>Predictions</span>
                  <ArrowRight className="size-3.5" />
                </Link>
              </Button>
            </div>
          );
        },
      },
    ],
    [tournamentId],
  );

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto rounded-md bg-brand-container">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="hover:bg-transparent border-brand-border"
            >
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="text-white font-semibold">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => {
            const isCurrentUser = currentUser === row.original.userId;

            return (
              <TableRow
                key={row.id}
                className={cn(
                  isCurrentUser &&
                    "[&>td]:bg-emerald-500/10 hover:[&>td]:bg-emerald-500/15",
                )}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="py-3 text-white font-medium text-sm"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
