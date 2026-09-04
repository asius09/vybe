import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Zap, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-5">
      <div className="flex flex-col items-center text-center">
        {/* Logo */}
        <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary shadow-vybe-lime">
          <Zap className="h-8 w-8" fill="#151515" strokeWidth={0} />
        </div>

        {/* 404 */}
        <h1 className="font-heading text-8xl font-extrabold text-foreground/10 md:text-9xl">
          404
        </h1>

        {/* Message */}
        <h2 className="mt-4 font-heading text-3xl font-bold text-foreground md:text-4xl">
          Page not found
        </h2>
        <p className="mt-3 max-w-md text-muted-foreground">
          This page doesn&apos;t exist or has been moved. Let&apos;s get you
          back on track.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/bikes">
              <Search className="h-4 w-4" />
              Browse Bikes
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
