import { GetLeaderboardResponse } from "@/api/match/match.types";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

const getRankStyles = (value: number) => {
  switch (value) {
    case 1:
      return "bg-yellow-100 text-yellow-700";
    case 2:
      return "bg-gray-100 text-gray-700";
    case 3:
      return "bg-amber-100 text-amber-700";
    default:
      return "bg-gray-50 text-gray-600";
  }
};

export const columns: ColumnDef<GetLeaderboardResponse["data"][number]>[] = [
  {
    accessorKey: "rank",
    header: "Rank",
    cell: ({ getValue }) => {
      const value = getValue() as number;
      const rankStyles = getRankStyles(value);

      return (
        <div
          className={cn(
            "flex items-center justify-center size-8 rounded-full",
            rankStyles,
          )}
        >
          {value}
        </div>
      );
    },
  },
  {
    accessorKey: "firstName",
    header: "Name",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center size-10 rounded-full bg-gray-400 uppercase">
          {row.original.firstName.slice(0, 1) +
            row.original.lastName.slice(0, 1)}
        </div>
        <span>{row.original.firstName + " " + row.original.lastName}</span>
      </div>
    ),
  },
  {
    accessorKey: "totalPredictions",
    header: "Predictions",
    cell: ({ getValue }) => <span className="text-gray-500">{getValue()}</span>,
  },
  {
    accessorKey: "exactCount",
    header: "Exact",
    cell: ({ getValue }) => (
      <span className="text-green-500">{getValue()}</span>
    ),
  },
  {
    accessorKey: "differenceCount",
    header: "Diff",
    cell: ({ getValue }) => (
      <span className="text-yellow-500">{getValue()}</span>
    ),
  },
  {
    accessorKey: "outcomeCount",
    header: "Outcome",
    cell: ({ getValue }) => (
      <span className="text-yellow-500">{getValue()}</span>
    ),
  },
  {
    accessorKey: "totalPoints",
    header: "Points",
  },
];
