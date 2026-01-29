import { Skeleton } from "@/components/ui/skeleton";

export default function MoviePlayerSkeleton() {
  return (
    <div className="mx-auto w-full max-w-6xl pb-20">
      {/* Селектор качества */}
      {/* <div className="mb-2 flex justify-end gap-2">
        <Skeleton className="h-6 w-16" />
        <div className="inline-flex gap-1 rounded-md bg-zinc-900/80 p-1">
          <Skeleton className="h-6 w-12 rounded" />
          <Skeleton className="h-6 w-12 rounded" />
        </div>
      </div> */}

      {/* Плеер */}
      <div className="aspect-video w-full">
        <Skeleton className="h-full w-full rounded-lg" />
      </div>
    </div>
  );
}
