import { today, planetGlyph } from "@/lib/jyotish-data";
import { Sunrise, Sunset, Moon } from "lucide-react";

export function Panchanga() {
  const p = today.panchanga;
  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-paper">
      <div className="flex items-center justify-between border-b border-border px-5 py-3">
        <div>
          <div className="text-[10px] uppercase tracking-[0.22em] text-ink-soft">Panchanga · today</div>
          <div className="mt-0.5 font-serif text-lg text-ink">{p.vara.name} · {planetGlyph[p.vara.planet]} {p.vara.planet}'s day</div>
        </div>
        <MoonGlyph phase={p.moonPhase} />
      </div>

      <div className="grid grid-cols-2 divide-x divide-y divide-border sm:grid-cols-4 sm:divide-y-0">
        <Limb label="Tithi" name={p.tithi.name} sub={`${p.tithi.paksha} · ${p.tithi.percent}%`} note={p.tithi.note} />
        <Limb label="Nakshatra" name={p.nakshatra.name} sub={`Pada ${p.nakshatra.pada} · ${p.nakshatra.until}`} note={p.nakshatra.note} />
        <Limb label="Yoga" name={p.yoga.name} sub="auspicious" note={p.yoga.note} />
        <Limb label="Karana" name={p.karana.name} sub="trade · negotiate" note={p.karana.note} />
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-border bg-paper-warm/50 px-5 py-2.5 text-[11px] text-ink-soft">
        <span className="flex items-center gap-1.5"><Sunrise className="h-3.5 w-3.5" />{p.sunrise}</span>
        <span className="flex items-center gap-1.5"><Sunset className="h-3.5 w-3.5" />{p.sunset}</span>
        <span className="flex items-center gap-1.5"><Moon className="h-3.5 w-3.5" />{p.moonrise} → {p.moonset}</span>
      </div>
    </section>
  );
}

function Limb({ label, name, sub, note }: { label: string; name: string; sub: string; note: string }) {
  return (
    <div className="px-4 py-3">
      <div className="text-[9px] uppercase tracking-[0.2em] text-ink-soft">{label}</div>
      <div className="mt-1 font-serif text-base text-ink">{name}</div>
      <div className="text-[10px] uppercase tracking-wider text-ink-soft">{sub}</div>
      <p className="mt-1.5 text-[11px] leading-snug italic text-ink-soft">{note}</p>
    </div>
  );
}

function MoonGlyph({ phase }: { phase: number }) {
  // phase 0..1; render as a circle with a shadow overlay
  const r = 16;
  const offset = (1 - phase * 2) * r; // simple terminator
  return (
    <svg viewBox="-20 -20 40 40" className="h-9 w-9">
      <defs>
        <radialGradient id="moonG" cx="0.3" cy="0.3" r="0.9">
          <stop offset="0%" stopColor="oklch(0.95 0.02 80)" />
          <stop offset="100%" stopColor="oklch(0.78 0.06 80)" />
        </radialGradient>
      </defs>
      <circle r={r} fill="url(#moonG)" stroke="oklch(0.85 0.04 80)" strokeWidth="0.5" />
      <circle r={r} cx={offset} fill="oklch(0.18 0.06 285)" />
    </svg>
  );
}
