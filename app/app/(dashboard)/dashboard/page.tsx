import { getWatches } from "../watches/actions";
import { WatchList } from "../watches/components/WatchList";

export default async function DashboardPage() {
  const watches = await getWatches();

  return (
    <div className="relative flex flex-col w-full max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16 min-h-screen bg-canvas">
      <div className="relative z-10">
        <WatchList watches={watches} />
      </div>
    </div>
  );
}
