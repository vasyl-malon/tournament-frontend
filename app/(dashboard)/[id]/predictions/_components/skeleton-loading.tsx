import { Skeleton } from "@/components/ui/skeleton";

export const PredictionsSkeletonLoading = () => (
  <div className="flex flex-col gap-y-10">
    <Skeleton className="w-full h-32 rounded-md" />
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 w-full">
      {new Array(5).fill(null).map((_, index) => (
        <Skeleton key={index} className="w-full h-40 rounded-md" />
      ))}
    </div>
    <Skeleton className="w-full h-60 rounded-md" />
    <Skeleton className="w-full h-80 rounded-md" />
  </div>
);
