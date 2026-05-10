export default function VegMark({ className = '' }) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-md bg-white/95 p-1 shadow-sm ${className}`}
      aria-label="Veg"
      title="Veg"
    >
      <span className="flex h-5 w-5 items-center justify-center border-2 border-emerald-600 bg-white">
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-600" />
      </span>
    </span>
  )
}
