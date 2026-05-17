// Hand-drawn 3-tier celebration cake. Pure SVG — no external assets.
// Colours are pulled from the site's Tailwind palette (wine / gold / cream /
// chocolate) so the illustration sits naturally inside the About hero band.

function Rose({ x, y, size = 30, palette = 'pink', rotate = 0 }) {
  const p =
    palette === 'pink'
      ? {
          outer: 'url(#rose-pink-grad)',
          mid: '#E89BAD',
          inner: '#9C4A60',
          highlight: '#FCCEDB',
        }
      : {
          outer: 'url(#rose-ivory-grad)',
          mid: '#F2DEB0',
          inner: '#A8854A',
          highlight: '#FFF6D9',
        }
  const s = size / 30
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${s})`}>
      {/* Outer bloom */}
      <ellipse cx="0" cy="0" rx="30" ry="32" fill={p.outer} />
      {/* Petal highlights */}
      <path
        d="M -24 -8 Q -32 8 -18 22 Q -6 18 -4 4 Q -14 -4 -24 -8 Z"
        fill={p.highlight}
        opacity="0.7"
      />
      <path
        d="M 24 -8 Q 32 8 18 22 Q 6 18 4 4 Q 14 -4 24 -8 Z"
        fill={p.highlight}
        opacity="0.7"
      />
      <path
        d="M 0 -28 Q -16 -22 -12 -6 Q 0 -10 12 -6 Q 16 -22 0 -28 Z"
        fill={p.highlight}
        opacity="0.55"
      />
      {/* Inner bud */}
      <circle cx="0" cy="0" r="13" fill={p.mid} />
      <circle cx="-3" cy="-3" r="4" fill={p.highlight} opacity="0.6" />
      <circle cx="0" cy="0" r="6" fill={p.inner} />
    </g>
  )
}

function Leaf({ x, y, rotate = 0, scale = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}>
      <path
        d="M 0 0 Q 18 -14 28 0 Q 18 14 0 0 Z"
        fill="url(#leaf-grad)"
        stroke="#4F7C46"
        strokeWidth="0.6"
      />
      <path d="M 2 0 L 24 0" stroke="#3E5F38" strokeWidth="0.7" opacity="0.6" />
    </g>
  )
}

export default function AboutCakeIllustration({ className = '' }) {
  return (
    <svg
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Three-tier celebration cake with cream frosting, hand-piped pearls, gold filigree, and pink and ivory roses"
    >
      <defs>
        {/* Background warm gradient */}
        <radialGradient id="about-bg" cx="50%" cy="38%" r="80%">
          <stop offset="0%" stopColor="#FEF8E6" />
          <stop offset="55%" stopColor="#F4DDD4" />
          <stop offset="100%" stopColor="#4A1F23" stopOpacity="0.7" />
        </radialGradient>

        {/* Frosting */}
        <linearGradient id="frosting" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFCEC" />
          <stop offset="55%" stopColor="#F2DEB0" />
          <stop offset="100%" stopColor="#C8A86A" />
        </linearGradient>

        {/* Wooden cake board */}
        <linearGradient id="board" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#7A4C2F" />
          <stop offset="50%" stopColor="#52280F" />
          <stop offset="100%" stopColor="#2E1606" />
        </linearGradient>

        {/* Wine ribbon */}
        <linearGradient id="ribbon" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#A82F3D" />
          <stop offset="50%" stopColor="#8B1F2A" />
          <stop offset="100%" stopColor="#5D1018" />
        </linearGradient>

        {/* Gold */}
        <linearGradient id="gold-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F4DA73" />
          <stop offset="50%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#8E6F1C" />
        </linearGradient>

        {/* Rose gradients */}
        <radialGradient id="rose-pink-grad" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#FCCEDB" />
          <stop offset="60%" stopColor="#E89BAD" />
          <stop offset="100%" stopColor="#9C4A60" />
        </radialGradient>
        <radialGradient id="rose-ivory-grad" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#FFF6D9" />
          <stop offset="55%" stopColor="#F2DEB0" />
          <stop offset="100%" stopColor="#A8854A" />
        </radialGradient>

        {/* Leaves */}
        <linearGradient id="leaf-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#8FB87E" />
          <stop offset="100%" stopColor="#4F7C46" />
        </linearGradient>

        {/* Soft glow under cake */}
        <radialGradient id="under-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FBE2A8" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#FBE2A8" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Background */}
      <rect width="800" height="600" fill="url(#about-bg)" />

      {/* Subtle warm halo behind cake */}
      <circle cx="400" cy="340" r="320" fill="url(#under-glow)" />

      {/* Counter shadow strip */}
      <rect x="0" y="540" width="800" height="60" fill="#2A1408" opacity="0.18" />

      {/* Cake shadow */}
      <ellipse cx="400" cy="558" rx="280" ry="14" fill="#000" opacity="0.4" />

      {/* Wooden cake board */}
      <ellipse cx="400" cy="552" rx="290" ry="24" fill="url(#board)" />
      <ellipse cx="400" cy="544" rx="290" ry="22" fill="url(#board)" />
      <ellipse
        cx="400"
        cy="544"
        rx="260"
        ry="16"
        fill="none"
        stroke="#291205"
        strokeWidth="1.5"
        opacity="0.6"
      />

      {/* ── BOTTOM TIER ───────────────────────────────────────────────── */}
      <g>
        {/* Side */}
        <rect x="180" y="380" width="440" height="160" rx="3" fill="url(#frosting)" />
        {/* Dripping fondant accent */}
        <path
          d="M 180 386
             q 14 18 28 0 q 14 18 28 0 q 14 18 28 0 q 14 18 28 0
             q 14 18 28 0 q 14 18 28 0 q 14 18 28 0 q 14 18 28 0
             q 14 18 28 0 q 14 18 28 0 q 14 18 28 0 q 14 18 28 0
             q 14 18 28 0 q 14 18 28 0 q 14 18 28 0 q 14 18 28 0
             V 380 H 180 Z"
          fill="#F2DEB0"
          opacity="0.55"
        />
        {/* Top edge ellipse */}
        <ellipse cx="400" cy="380" rx="220" ry="14" fill="#FFFCEC" stroke="#D9BC7A" strokeWidth="1" />
        {/* Gold dotted band */}
        <g fill="url(#gold-grad)" stroke="#7C5E13" strokeWidth="0.4">
          {Array.from({ length: 19 }).map((_, i) => (
            <circle key={i} cx={206 + i * 21} cy="525" r="4.5" />
          ))}
        </g>
        {/* Bigger gold filigree dots */}
        <g fill="url(#gold-grad)">
          <circle cx="260" cy="495" r="3" />
          <circle cx="320" cy="510" r="3" />
          <circle cx="480" cy="510" r="3" />
          <circle cx="540" cy="495" r="3" />
        </g>
        {/* Pearl border at top edge */}
        <g fill="#FFFCEC" stroke="#D9BC7A" strokeWidth="0.6">
          {Array.from({ length: 23 }).map((_, i) => (
            <circle key={i} cx={186 + i * 19.2} cy="378" r="5.2" />
          ))}
        </g>
      </g>

      {/* ── MIDDLE TIER ───────────────────────────────────────────────── */}
      <g>
        <rect x="270" y="252" width="260" height="133" rx="2" fill="url(#frosting)" />
        {/* Vertical ruffles */}
        {Array.from({ length: 13 }).map((_, i) => (
          <line
            key={i}
            x1={282 + i * 20}
            y1="256"
            x2={282 + i * 20}
            y2="383"
            stroke="#E5C97D"
            strokeWidth="0.6"
            opacity="0.45"
          />
        ))}
        {/* Top edge */}
        <ellipse cx="400" cy="252" rx="130" ry="10" fill="#FFFCEC" stroke="#D9BC7A" strokeWidth="1" />
        {/* Wine ribbon */}
        <rect x="270" y="320" width="260" height="22" fill="url(#ribbon)" />
        <rect x="270" y="320" width="260" height="2" fill="#FCCEDB" opacity="0.5" />
        <rect x="270" y="340" width="260" height="2" fill="#000" opacity="0.3" />
        {/* Ribbon tails */}
        <path d="M 270 342 L 260 366 L 280 354 Z" fill="#6E1620" />
        <path d="M 530 342 L 540 366 L 520 354 Z" fill="#6E1620" />
        {/* Gold buckle / bow */}
        <path
          d="M 380 318 L 400 312 L 420 318 L 415 346 L 400 339 L 385 346 Z"
          fill="url(#gold-grad)"
          stroke="#6E5012"
          strokeWidth="0.8"
        />
        <circle cx="400" cy="331" r="6" fill="url(#gold-grad)" stroke="#6E5012" strokeWidth="0.8" />
        {/* Pearl border at top edge */}
        <g fill="#FFFCEC" stroke="#D9BC7A" strokeWidth="0.5">
          {Array.from({ length: 14 }).map((_, i) => (
            <circle key={i} cx={276 + i * 19} cy="250" r="4.2" />
          ))}
        </g>
      </g>

      {/* ── TOP TIER ──────────────────────────────────────────────────── */}
      <g>
        <rect x="320" y="140" width="160" height="118" rx="2" fill="url(#frosting)" />
        {/* Top edge */}
        <ellipse cx="400" cy="140" rx="80" ry="8" fill="#FFFCEC" stroke="#D9BC7A" strokeWidth="1" />
        {/* Gold scrollwork */}
        <path
          d="M 340 178 Q 360 168 380 178 T 420 178 T 460 178"
          stroke="url(#gold-grad)"
          strokeWidth="2.5"
          fill="none"
        />
        <path
          d="M 340 222 Q 360 212 380 222 T 420 222 T 460 222"
          stroke="url(#gold-grad)"
          strokeWidth="2.5"
          fill="none"
        />
        {/* Filigree dots in between */}
        <g fill="url(#gold-grad)">
          <circle cx="360" cy="200" r="2" />
          <circle cx="380" cy="206" r="2.2" />
          <circle cx="400" cy="200" r="2.4" />
          <circle cx="420" cy="206" r="2.2" />
          <circle cx="440" cy="200" r="2" />
        </g>
        {/* Pearl border at top edge */}
        <g fill="#FFFCEC" stroke="#D9BC7A" strokeWidth="0.5">
          {Array.from({ length: 9 }).map((_, i) => (
            <circle key={i} cx={326 + i * 19} cy="138" r="3.6" />
          ))}
        </g>
      </g>

      {/* ── GOLD CROWN TOPPER ─────────────────────────────────────────── */}
      <g transform="translate(400 108)">
        <path
          d="M -28 32 L -22 4 L -10 24 L 0 -12 L 10 24 L 22 4 L 28 32 Z"
          fill="url(#gold-grad)"
          stroke="#6E5012"
          strokeWidth="1.2"
        />
        <circle cx="-22" cy="4" r="3.2" fill="url(#gold-grad)" stroke="#6E5012" strokeWidth="0.8" />
        <circle cx="0" cy="-12" r="4" fill="url(#gold-grad)" stroke="#6E5012" strokeWidth="0.8" />
        <circle cx="22" cy="4" r="3.2" fill="url(#gold-grad)" stroke="#6E5012" strokeWidth="0.8" />
      </g>

      {/* ── LEAVES (rendered before roses so they peek out) ───────────── */}
      <Leaf x={250} y={320} rotate={-30} scale={1.1} />
      <Leaf x={300} y={320} rotate={150} scale={0.9} />
      <Leaf x={465} y={228} rotate={20} scale={0.9} />
      <Leaf x={502} y={235} rotate={-160} scale={0.8} />
      <Leaf x={518} y={465} rotate={-20} scale={1.1} />
      <Leaf x={560} y={470} rotate={170} scale={0.9} />
      <Leaf x={278} y={478} rotate={200} scale={0.95} />
      <Leaf x={235} y={485} rotate={20} scale={0.85} />
      <Leaf x={355} y={400} rotate={-10} scale={0.7} />

      {/* ── ROSES ─────────────────────────────────────────────────────── */}
      {/* Large pink on left of middle tier */}
      <Rose x={272} y={312} size={36} palette="pink" rotate={-8} />
      {/* Cascade pink near base of middle tier */}
      <Rose x={344} y={392} size={26} palette="pink" rotate={12} />
      {/* Ivory at top-right of middle tier */}
      <Rose x={490} y={232} size={32} palette="ivory" rotate={6} />
      {/* Pink bottom-right of bottom tier */}
      <Rose x={540} y={462} size={34} palette="pink" rotate={-10} />
      {/* Ivory bottom-left of bottom tier */}
      <Rose x={258} y={472} size={32} palette="ivory" rotate={14} />
      {/* Small pink up at base of top tier */}
      <Rose x={395} y={272} size={18} palette="pink" />

      {/* ── GOLD DUST ─────────────────────────────────────────────────── */}
      <g fill="url(#gold-grad)" opacity="0.7">
        <circle cx="160" cy="300" r="1.5" />
        <circle cx="640" cy="260" r="1.5" />
        <circle cx="100" cy="430" r="1.4" />
        <circle cx="690" cy="490" r="1.6" />
        <circle cx="430" cy="490" r="1.4" />
        <circle cx="345" cy="288" r="1.4" />
        <circle cx="565" cy="358" r="1.5" />
        <circle cx="148" cy="500" r="1.5" />
        <circle cx="220" cy="200" r="1.3" />
        <circle cx="600" cy="180" r="1.3" />
      </g>

      {/* ── FALLEN PETALS NEAR BOARD ──────────────────────────────────── */}
      <g>
        <ellipse cx="140" cy="582" rx="16" ry="6" fill="#F4B5C5" transform="rotate(-15 140 582)" />
        <ellipse cx="218" cy="586" rx="11" ry="5" fill="#FCCEDB" transform="rotate(35 218 586)" />
        <ellipse cx="304" cy="582" rx="9" ry="4" fill="#FBE9C9" transform="rotate(-10 304 582)" />
        <ellipse cx="498" cy="582" rx="10" ry="4" fill="#F4B5C5" transform="rotate(20 498 582)" />
        <ellipse cx="592" cy="586" rx="13" ry="5" fill="#FBE9C9" transform="rotate(-25 592 586)" />
        <ellipse cx="660" cy="582" rx="15" ry="6" fill="#FCCEDB" transform="rotate(18 660 582)" />
      </g>
    </svg>
  )
}
