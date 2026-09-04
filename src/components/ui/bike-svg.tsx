export function BikeSvg({ className = "", color = "currentColor" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 400 250" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Rear wheel */}
      <circle cx="100" cy="180" r="55" stroke={color} strokeWidth="3" fill="none" />
      <circle cx="100" cy="180" r="48" stroke={color} strokeWidth="1" opacity="0.3" fill="none" />
      <circle cx="100" cy="180" r="5" fill={color} />
      {/* Rear spokes */}
      {[0, 30, 60, 90, 120, 150].map((angle) => (
        <line
          key={`rs-${angle}`}
          x1={100 + Math.cos((angle * Math.PI) / 180) * 5}
          y1={180 + Math.sin((angle * Math.PI) / 180) * 5}
          x2={100 + Math.cos((angle * Math.PI) / 180) * 48}
          y2={180 + Math.sin((angle * Math.PI) / 180) * 48}
          stroke={color}
          strokeWidth="0.8"
          opacity="0.4"
        />
      ))}

      {/* Front wheel */}
      <circle cx="310" cy="180" r="55" stroke={color} strokeWidth="3" fill="none" />
      <circle cx="310" cy="180" r="48" stroke={color} strokeWidth="1" opacity="0.3" fill="none" />
      <circle cx="310" cy="180" r="5" fill={color} />
      {/* Front spokes */}
      {[15, 45, 75, 105, 135, 165].map((angle) => (
        <line
          key={`fs-${angle}`}
          x1={310 + Math.cos((angle * Math.PI) / 180) * 5}
          y1={180 + Math.sin((angle * Math.PI) / 180) * 5}
          x2={310 + Math.cos((angle * Math.PI) / 180) * 48}
          y2={180 + Math.sin((angle * Math.PI) / 180) * 48}
          stroke={color}
          strokeWidth="0.8"
          opacity="0.4"
        />
      ))}

      {/* Frame — diamond */}
      <path
        d="M100 180 L185 100 L310 180 M185 100 L250 100 L310 180 M185 100 L145 180"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Seat tube + seat */}
      <line x1="185" y1="100" x2="175" y2="72" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
      <rect x="165" y="66" width="26" height="6" rx="3" fill={color} />

      {/* Handlebar stem */}
      <line x1="250" y1="100" x2="265" y2="75" stroke={color} strokeWidth="3" strokeLinecap="round" />
      {/* Handlebars */}
      <path d="M255 75 Q265 65 280 72" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M255 75 Q250 68 245 74" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round" />

      {/* Motor hub (e-bike feature) */}
      <circle cx="310" cy="180" r="12" stroke={color} strokeWidth="2" fill="none" />
      <circle cx="310" cy="180" r="8" stroke={color} strokeWidth="1" opacity="0.5" fill="none" />

      {/* Battery pack (on downtube) */}
      <rect x="155" y="128" width="50" height="18" rx="4" stroke={color} strokeWidth="2" fill="none" />
      <line x1="160" y1="133" x2="160" y2="141" stroke={color} strokeWidth="1.5" opacity="0.6" />
      <line x1="165" y1="133" x2="165" y2="141" stroke={color} strokeWidth="1.5" opacity="0.6" />
      <line x1="170" y1="133" x2="170" y2="141" stroke={color} strokeWidth="1.5" opacity="0.6" />

      {/* Chain stay */}
      <line x1="100" y1="180" x2="185" y2="180" stroke={color} strokeWidth="2.5" />
      {/* Chainring */}
      <circle cx="185" cy="180" r="10" stroke={color} strokeWidth="2" fill="none" />
      <circle cx="185" cy="180" r="3" fill={color} />

      {/* Pedal cranks */}
      <line x1="185" y1="170" x2="185" y2="190" stroke={color} strokeWidth="2" strokeLinecap="round" />

      {/* Fender hint */}
      <path d="M80 140 Q100 120 120 140" stroke={color} strokeWidth="1.5" opacity="0.4" fill="none" />
      <path d="M290 140 Q310 120 330 140" stroke={color} strokeWidth="1.5" opacity="0.4" fill="none" />

      {/* Kickstand */}
      <line x1="160" y1="180" x2="150" y2="210" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}
