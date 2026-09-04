import { getAllBikes } from "@/lib/inventory/neon-repository";
import { InventoryClient } from "@/components/admin/InventoryClient";

export default async function AdminInventoryPage() {
  const bikes = await getAllBikes();
  return <InventoryClient initialBikes={bikes as any} />;
}
