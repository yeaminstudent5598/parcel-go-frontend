import { Skeleton } from "@/components/ui/skeleton";

export const TableSkeleton = ({ rows = 5 }: { rows?: number }) => {
  return (
    <div className="w-full space-y-4">
      <div className="flex items-center space-x-4 px-2">
        <Skeleton className="h-10 w-full" />
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center space-x-4 px-2">
          <Skeleton className="h-12 w-full" />
        </div>
      ))}
    </div>
  );
};