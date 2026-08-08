import { Skeleton } from "@/shared/components/ui/skeleton";

export default function WatchesLoading() {
  return (
    <div className="flex w-full gap-8 relative items-start p-8">
      {/* Main dashboard skeleton */}
      <div className="flex-1 min-w-0 flex flex-col gap-8">
        {/* Header Greeting Skeleton */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-48 rounded-md bg-primary-soft" />
          <Skeleton className="h-6 w-24 rounded-md bg-primary-soft" />
        </div>

        {/* Statistics Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-surface border border-hairline p-6 rounded-md flex flex-col gap-2">
              <Skeleton className="h-4 w-24 rounded-sm bg-primary-soft" />
              <Skeleton className="h-8 w-16 rounded-md bg-primary-soft mt-1" />
              <Skeleton className="h-3 w-32 rounded-sm bg-primary-soft mt-2" />
            </div>
          ))}
        </div>

        {/* Filters and Search Bar Skeleton */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between border-t border-b border-hairline py-4">
          <Skeleton className="h-10 w-full sm:w-72 rounded-sm bg-primary-soft" />
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <Skeleton className="h-10 w-24 rounded-md bg-primary-soft" />
            <Skeleton className="h-10 w-10 rounded-md bg-primary-soft" />
            <Skeleton className="h-10 w-10 rounded-md bg-primary-soft" />
          </div>
        </div>

        {/* Watch Cards Grid Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[1, 2, 4, 5].map((i) => (
            <div key={i} className="bg-surface border border-hairline p-6 rounded-md flex flex-col gap-4">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-6 w-3/4 rounded-md bg-primary-soft" />
                  <Skeleton className="h-4 w-1/2 rounded-sm bg-primary-soft" />
                </div>
                <Skeleton className="h-6 w-12 rounded-sm bg-primary-soft shrink-0" />
              </div>
              <div className="flex flex-wrap gap-2">
                <Skeleton className="h-5 w-16 rounded-sm bg-primary-soft" />
                <Skeleton className="h-5 w-20 rounded-sm bg-primary-soft" />
              </div>
              <div className="border-t border-hairline pt-4 flex items-center justify-between text-xs mt-auto">
                <Skeleton className="h-4 w-28 rounded-sm bg-primary-soft" />
                <Skeleton className="h-4 w-20 rounded-sm bg-primary-soft" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
