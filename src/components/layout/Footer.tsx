import Link from "next/link";
import { Zap, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-asphalt text-warm-white">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
                <Zap className="h-5 w-5" fill="#151515" strokeWidth={0} />
              </div>
              <span className="font-heading text-xl font-extrabold">VYBE</span>
            </div>
            <p className="mt-4 text-sm text-warm-white/60">
              Modern used e-bike marketplace. Find your next ride with
              confidence.
            </p>
          </div>

          {/* Browse */}
          <div>
            <h4 className="font-heading text-sm font-bold">Browse</h4>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/bikes" className="text-sm text-warm-white/60 hover:text-lime transition-colors">
                  All Bikes
                </Link>
              </li>
              <li>
                <Link href="/bikes?type=city" className="text-sm text-warm-white/60 hover:text-lime transition-colors">
                  City Bikes
                </Link>
              </li>
              <li>
                <Link href="/bikes?type=folding" className="text-sm text-warm-white/60 hover:text-lime transition-colors">
                  Folding Bikes
                </Link>
              </li>
              <li>
                <Link href="/bikes?type=cargo" className="text-sm text-warm-white/60 hover:text-lime transition-colors">
                  Cargo Bikes
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading text-sm font-bold">Services</h4>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/repairs" className="text-sm text-warm-white/60 hover:text-lime transition-colors">
                  All Repairs
                </Link>
              </li>
              <li>
                <Link href="/sell" className="text-sm text-warm-white/60 hover:text-lime transition-colors">
                  Sell Your Bike
                </Link>
              </li>
              <li>
                <Link href="/repairs" className="text-sm text-warm-white/60 hover:text-lime transition-colors">
                  Battery Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-sm font-bold">Contact</h4>
            <ul className="mt-3 space-y-3">
              <li className="flex items-center gap-2 text-sm text-warm-white/60">
                <MapPin className="h-4 w-4 shrink-0" />
                Delhi, India
              </li>
              <li className="flex items-center gap-2 text-sm text-warm-white/60">
                <Phone className="h-4 w-4 shrink-0" />
                +91 93154 05304
              </li>
              <li className="flex items-center gap-2 text-sm text-warm-white/60">
                <Mail className="h-4 w-4 shrink-0" />
                itsmeasius@gmail.com
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 border-t border-warm-white/10 pt-8 flex flex-col items-center justify-between gap-4 text-xs text-warm-white/40 md:flex-row">
          <p>&copy; {new Date().getFullYear()} VYBE Bikes. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/design-system" className="hover:text-lime transition-colors">
              Design System
            </Link>
            <Link href="/admin/inventory" className="hover:text-lime transition-colors">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
