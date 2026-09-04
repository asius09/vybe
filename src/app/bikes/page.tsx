import { getAvailableBikes } from "@/data/loader";
import { BikesClient } from "@/components/bikes/BikesClient";

export default async function BikesPage() {
  const bikes = await getAvailableBikes();
  return <BikesClient initialBikes={bikes as any} />;
}
