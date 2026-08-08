import { Skeleton } from "@/shared/components/ui/skeleton";

export default function WatchDetailLoading() {
  return (
    <div className="flex flex-col w-full h-full min-h-screen bg-canvas p-8">
      {/* Header Skeleton */}
      <div className="flex flex-col gap-4 border-b border-hairline pb-6">
        <div className="flex items-center gap-3">
          <Skeleton className="h-6 w-20 rounded-md bg-primary-soft" />
          <Skeleton className="h-4 w-32 rounded-sm bg-primary-soft" />
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <Skeleton className="h-10 w-64 rounded-md bg-primary-soft" />
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-28 rounded-md bg-primary-soft" />
            <Skeleton className="h-10 w-28 rounded-md bg-primary-soft" />
          </div>
        </div>
      </div>

      {/* Tabs Skeleton */}
      <div className="flex gap-4 border-b border-hairline mt-6">
        <Skeleton className="h-10 w-28 rounded-t-md bg-primary-soft" />
        <Skeleton className="h-10 w-28 rounded-t-md bg-primary-soft" />
      </div>

      {/* Content Grid Skeleton (mimics findings/digests timeline) */}
      <div className="flex flex-col gap-6 mt-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-surface border border-hairline p-6 rounded-md flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-24 rounded-sm bg-primary-soft" />
              <Skeleton className="h-5 w-16 rounded-sm bg-primary-soft" />
            </div>
            <Skeleton className="h-6 w-3/4 rounded-md bg-primary-soft" />
            <Skeleton className="h-4 w-full rounded-sm bg-primary-soft" />
            <Skeleton className="h-4 w-5/6 rounded-sm bg-primary-soft" />
            <div className="flex items-center justify-between pt-4 border-t border-hairline mt-2">
              <Skeleton className="h-4 w-40 rounded-sm bg-primary-soft" />
              <Skeleton className="h-6 w-20 rounded-md bg-primary-soft" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
