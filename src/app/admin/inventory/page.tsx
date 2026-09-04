import { getAllBikes } from "@/data/loader";
import { InventoryClient } from "@/components/admin/InventoryClient";

export default function AdminInventoryPage() {
  const bikes = getAllBikes();
  return <InventoryClient initialBikes={bikes} />;
}
