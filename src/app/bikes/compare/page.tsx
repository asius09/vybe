import { Suspense } from "react";
import { getAvailableBikes } from "@/data/loader";
import { CompareClient } from "@/components/bikes/CompareClient";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function ComparePage() {
  const bikes = getAvailableBikes();
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Suspense fallback={<div className="mx-auto max-w-6xl px-5 py-20 text-center text-muted-foreground">Loading...</div>}>
        <CompareClient allBikes={bikes} />
      </Suspense>
      <Footer />
    </div>
  );
}
