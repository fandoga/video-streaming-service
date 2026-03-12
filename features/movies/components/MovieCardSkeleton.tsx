import { Card, CardHeader } from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";
import React from "react";

export default function MovieCardSkeleton() {
  return (
    <Card className="relative w-full pt-0 overflow-hidden">
      <Skeleton className="aspect-[6/9] w-full" />
      <div>
        <CardHeader>
          <Skeleton className="h-3 w-2/3" />
          <Skeleton className="h-3 w-1/2" />
        </CardHeader>
      </div>
    </Card>
  );
}
