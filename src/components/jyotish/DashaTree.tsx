import { today, planetGlyph, planetColor } from "@/lib/jyotish-data";

export function DashaTree() {
  const d = today.dashaTree;
  return (
    <section className="rounded-2xl border border-border bg-card p-5 shadow-paper">
      <header className="mb-4 flex items-baseline justify-between">
        <h3 className="font-serif text-lg text-ink">Dasha · what's running</h3>
        <span className="text-[10px] uppercase tracking-[0.2em] text-ink-soft">Vimshottari</span>
      </header>

      <Layer level="Mahadasha" planet={d.maha.planet} start={d.maha.start} end={d.maha.end} percent={d.maha.percent} />
      <div className="ml-5 mt-2 border-l-2 border-dashed border-border pl-4">
        <Layer level="Antardasha" planet={d.antar.planet} start={d.antar.start} end={d.antar.end} percent={d.antar.percent} />
        <div className="ml-5 mt-2 border-l-2 border-dashed border-border pl-4">
          <Layer
            level="Pratyantardasha"
            planet={d.pratyantar.planet}
            start={d.pratyantar.start}
            end={d.pratyantar.end}
            percent={d.pratyantar.percent}
          />
        </div>
      </div>

      <div className="mt-5 border-t border-border pt-4">
        <div className="text-[10px] uppercase tracking-[0.2em] text-ink-soft">Upcoming shifts</div>
        <ul className="mt-2 space-y-1.5">
          {d.upcoming.map((u) => (
            <li key={u.at} className="flex items-center justify-between text-sm">
              <span className="text-ink">
                {u.level}: <span className="text-ink-soft">{u.from}</span> →{" "}
                <span className="font-serif text-base text-primary">{u.to}</span>
              </span>
              <span className="text-xs text-ink-soft">{u.at}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Layer({
  level, planet, start, end, percent,
}: { level: string; planet: keyof typeof planetGlyph; start: string; end: string; percent: number }) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <span
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full font-serif text-lg text-white"
          style={{ background: planetColor[planet] }}
        >
          {planetGlyph[planet]}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-2">
            <span className="font-serif text-base text-ink">{planet} <span className="text-[10px] uppercase tracking-wider text-ink-soft">{level}</span></span>
            <span className="text-[10px] uppercase tracking-wider text-ink-soft">{start.slice(0,7)} → {end.slice(0,7)}</span>
          </div>
          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full"
              style={{ width: `${percent}%`, background: planetColor[planet] }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
