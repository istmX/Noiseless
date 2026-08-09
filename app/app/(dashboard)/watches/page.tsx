import { getWatches } from "./actions";
import { AllWatchesList } from "./components/AllWatchesList";

export default async function WatchesPage() {
  const watches = await getWatches();

  return (
    <div className="flex flex-col gap-6 w-full min-h-full">
      <AllWatchesList watches={watches} />
    </div>
  );
}
