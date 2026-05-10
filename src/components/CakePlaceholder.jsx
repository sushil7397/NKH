// Renders the cake's photo when `image` is provided, otherwise a tasteful
// SVG illustration coloured from the cake's `tint` / `accent` palette.

export default function CakePlaceholder({
  image,
  tint = '#3E2723',
  accent = '#D4AF37',
  label = '',
  className = '',
}) {
  if (image) {
    return (
      <div className={`relative w-full overflow-hidden bg-chocolate-50 ${className}`}>
        <img
          src={image}
          alt={label}
          loading="lazy"
          className="w-full h-full object-cover"
          onError={(e) => {
            // graceful fallback to SVG if the image fails to load
            e.currentTarget.style.display = 'none'
          }}
        />
      </div>
    )
  }

  const initials = label
    .split(' ')
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      style={{ background: `linear-gradient(135deg, ${tint} 0%, ${tint}E6 60%, #1c1210 100%)` }}
    >
      <svg
        viewBox="0 0 200 200"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full opacity-90"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="topGloss" cx="50%" cy="20%" r="60%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx="100" cy="170" rx="92" ry="14" fill="#000" opacity="0.2" />
        <rect x="35" y="110" width="130" height="55" rx="10" fill={tint} />
        <rect x="35" y="110" width="130" height="10" fill={accent} opacity="0.85" />
        <path
          d="M40 120 Q 55 145 70 122 Q 85 148 100 122 Q 115 148 130 122 Q 145 148 160 120 L 160 130 L 40 130 Z"
          fill={accent}
          opacity="0.9"
        />
        <rect x="60" y="65" width="80" height="50" rx="8" fill={tint} />
        <rect x="60" y="65" width="80" height="8" fill={accent} opacity="0.9" />
        <rect x="92" y="48" width="4" height="18" fill={accent} />
        <rect x="104" y="48" width="4" height="18" fill={accent} />
        <circle cx="94" cy="46" r="3" fill="#FFB344" />
        <circle cx="106" cy="46" r="3" fill="#FFB344" />
        <circle cx="50" cy="100" r="2" fill={accent} />
        <circle cx="80" cy="100" r="2" fill="#fff" opacity="0.7" />
        <circle cx="120" cy="100" r="2" fill={accent} />
        <circle cx="150" cy="100" r="2" fill="#fff" opacity="0.7" />
        <rect x="0" y="0" width="200" height="200" fill="url(#topGloss)" />
      </svg>

      {initials && (
        <div className="absolute top-3 right-3 text-[10px] tracking-widest font-semibold text-cream/80 bg-black/30 backdrop-blur px-2 py-1 rounded-full">
          {initials}
        </div>
      )}
    </div>
  )
}
