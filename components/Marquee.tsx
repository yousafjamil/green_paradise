/** Endless ribbon of our real service and plant names. Pure CSS, pauses on hover, off for reduced motion. */
export default function Marquee({ items }: { items: string[] }) {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((t) => (
        <li key={t} className="flex items-center whitespace-nowrap">
          <span className="font-display px-7 text-xl font-medium text-ink/55 sm:text-2xl">{t}</span>
          <svg aria-hidden width="14" height="14" viewBox="0 0 24 24" className="text-gold" fill="currentColor"><path d="M12 1l2.6 8.4L23 12l-8.4 2.6L12 23l-2.6-8.4L1 12l8.4-2.6z" /></svg>
        </li>
      ))}
    </ul>
  );
  return (
    <div className="marquee overflow-hidden border-y border-line bg-cream py-5" role="presentation">
      <div className="marquee-track flex w-max">{row(false)}{row(true)}</div>
    </div>
  );
}
