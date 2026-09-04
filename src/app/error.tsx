"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Zap, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-5">
      <div className="flex flex-col items-center text-center">
        {/* Logo */}
        <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary shadow-vybe-lime">
          <Zap className="h-8 w-8" fill="#151515" strokeWidth={0} />
        </div>

        {/* Error Icon */}
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-coral/10">
          <span className="font-heading text-2xl font-extrabold text-coral">
            !
          </span>
        </div>

        {/* Message */}
        <h1 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
          Something went wrong
        </h1>
        <p className="mt-3 max-w-md text-muted-foreground">
          An unexpected error occurred. Please try again or head back to the
          homepage.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button onClick={reset}>
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
          <Button asChild variant="outline">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
