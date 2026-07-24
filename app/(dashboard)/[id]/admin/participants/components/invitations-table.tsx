import { FC } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GetParticipantsOverviewResponse } from "@/lib/api/tournament/tournaments.types";
import dayjs from "dayjs";

interface PendingInvitationsTableProps {
  data: GetParticipantsOverviewResponse["data"]["pendingInvitations"];
}

export const PendingInvitationsTable: FC<PendingInvitationsTableProps> = ({
  data,
}) => {
  const columns: ColumnDef<
    GetParticipantsOverviewResponse["data"]["pendingInvitations"][number]
  >[] = [
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "createdAt",
      header: "Send At",
      cell: ({ row }) =>
        dayjs(row.original.createdAt).format("MMM DD, YYYY - HH:mm"),
    },
    {
      accessorKey: "expiresAt",
      header: "Expires At",
      cell: ({ row }) =>
        dayjs(row.original.expiresAt).format("MMM DD, YYYY - HH:mm"),
    },
  ];

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
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className="py-3 font-normal text-sm">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
