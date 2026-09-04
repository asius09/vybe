import { getAvailableBikes } from "@/data/loader";
import { BikesClient } from "@/components/bikes/BikesClient";

export default function BikesPage() {
  const bikes = getAvailableBikes();
  return <BikesClient initialBikes={bikes} />;
}
