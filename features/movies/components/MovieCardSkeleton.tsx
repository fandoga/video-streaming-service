import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function MovieCardSkeleton() {
  return (
    <div className="group flex flex-col">
      <div className="relative aspect-[6/9] w-full">
        <Skeleton className="w-full h-full rounded-md" />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-3">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  );
}
