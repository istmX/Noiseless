import { getWatches } from "./actions";
import { WatchList } from "./components/WatchList";
import { WatchesPageHeader } from "./components/WatchesPageHeader";

export default async function WatchesPage() {
  const watches = await getWatches();

  return (
    <div className="relative flex flex-col w-full max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16 min-h-screen">
      <WatchesPageHeader hasWatches={watches.length > 0} />
      
      <div className="relative z-10 mt-4">
        <WatchList watches={watches} />
      </div>
    </div>
  );
}
