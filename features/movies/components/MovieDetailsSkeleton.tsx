import { Skeleton } from "@/components/ui/skeleton";

export default function MovieDetailsSkeleton() {
  return (
    <div className="p-4 pb-20">
      <div className="mb-4 flex gap-4">
        {/* Постер */}
        <div className="mb-4 h-[350px] w-1/4">
          <Skeleton className="h-full w-full rounded-md" />
        </div>

        {/* Информация о фильме */}
        <div className="w-full space-y-4">
          {/* Заголовок */}
          <div className="space-y-2">
            <Skeleton className="h-10 w-3/4" />
          </div>

          {/* Описание */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>

          {/* Жанры */}
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-8 w-20 rounded-full" />
            <Skeleton className="h-8 w-24 rounded-full" />
            <Skeleton className="h-8 w-16 rounded-full" />
          </div>

          {/* Метаданные */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-28" />
          </div>
        </div>
      </div>
    </div>
  );
}
