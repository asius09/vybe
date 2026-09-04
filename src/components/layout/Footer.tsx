import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-asphalt text-warm-white">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <span className="font-heading text-xl font-extrabold">VYBE</span>
            <p className="mt-4 text-sm text-warm-white/50">
              Curated used e-bikes. Inspected, serviced, ready to ride.
            </p>
          </div>

          <div>
            <h4 className="font-heading text-sm font-bold">Shop</h4>
            <ul className="mt-3 space-y-2">
              <li><Link href="/bikes" className="text-sm text-warm-white/50 hover:text-warm-white transition-colors">All Bikes</Link></li>
              <li><Link href="/bikes?category=city" className="text-sm text-warm-white/50 hover:text-warm-white transition-colors">City</Link></li>
              <li><Link href="/bikes?category=commuter" className="text-sm text-warm-white/50 hover:text-warm-white transition-colors">Commuter</Link></li>
              <li><Link href="/bikes?category=mountain" className="text-sm text-warm-white/50 hover:text-warm-white transition-colors">Mountain</Link></li>
              <li><Link href="/bikes?category=folding" className="text-sm text-warm-white/50 hover:text-warm-white transition-colors">Folding</Link></li>
              <li><Link href="/bikes?category=cargo" className="text-sm text-warm-white/50 hover:text-warm-white transition-colors">Cargo</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-sm font-bold">Services</h4>
            <ul className="mt-3 space-y-2">
              <li><Link href="/repairs" className="text-sm text-warm-white/50 hover:text-warm-white transition-colors">Repairs</Link></li>
              <li><Link href="/sell" className="text-sm text-warm-white/50 hover:text-warm-white transition-colors">Sell Your Bike</Link></li>
              <li><Link href="/contact" className="text-sm text-warm-white/50 hover:text-warm-white transition-colors">Book a Service</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-sm font-bold">Contact</h4>
            <ul className="mt-3 space-y-2">
              <li className="text-sm text-warm-white/50">Delhi, India</li>
              <li className="text-sm text-warm-white/50">+91 93154 05304</li>
              <li className="text-sm text-warm-white/50">itsmeasius@gmail.com</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-warm-white/10 pt-8 flex flex-col items-center justify-between gap-4 text-xs text-warm-white/30 md:flex-row">
          <p>&copy; {new Date().getFullYear()} VYBE Bikes. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/design-system" className="hover:text-warm-white transition-colors">Design System</Link>
            <Link href="/admin/inventory" className="hover:text-warm-white transition-colors">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
