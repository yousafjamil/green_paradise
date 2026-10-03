/** Endless ribbon of our real service and plant names. Pure CSS, pauses on hover, off for reduced motion. */
export default function Marquee({ items }: { items: string[] }) {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((t) => (
        <li key={t} className="flex items-center whitespace-nowrap">
          <span className="font-display px-8 text-xl font-medium sm:text-2xl">{t}</span>
          <span aria-hidden className="size-1.5 rounded-full bg-leaf" />
        </li>
      ))}
    </ul>
  );
  return (
    <div className="marquee overflow-hidden bg-forest py-5 text-white" role="presentation">
      <div className="marquee-track flex w-max">{row(false)}{row(true)}</div>
    </div>
  );
}
