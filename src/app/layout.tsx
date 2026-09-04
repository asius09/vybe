import type { Metadata } from "next";
import { Syne, Inter } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "VYBE Bikes — Find Your Next Ride",
  description:
    "Modern used e-bike marketplace and repair service. Browse, compare, and buy quality used e-bikes.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${syne.variable} ${inter.variable} overscroll-none`}>
      <body className="min-h-screen bg-background font-body antialiased">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-100 focus:rounded-card focus:bg-lime focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-asphalt focus:outline-none">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
