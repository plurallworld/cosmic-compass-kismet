import { today, planetGlyph, planetColor, houseMeaning } from "@/lib/jyotish-data";
import { RotateCcw, Sparkles } from "lucide-react";

export function Transits() {
  return (
    <section className="rounded-2xl border border-border bg-card p-5 shadow-paper">
      <header className="mb-3 flex items-baseline justify-between">
        <h3 className="font-serif text-lg text-ink">Sky right now</h3>
        <span className="text-[10px] uppercase tracking-[0.2em] text-ink-soft">live transits</span>
      </header>
      <ul className="divide-y divide-border">
        {today.transits.map((t) => (
          <li key={t.planet} className="grid grid-cols-[auto_1fr_auto] items-center gap-3 py-2.5">
            <div
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full font-serif text-lg text-white"
              style={{ background: planetColor[t.planet] }}
            >
              {planetGlyph[t.planet]}
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-baseline gap-x-2">
                <span className="font-serif text-base text-ink">{t.planet}</span>
                <span className="text-xs text-ink-soft">{t.sign} · {t.deg.toFixed(1)}°</span>
                {t.retro && (
                  <span className="inline-flex items-center gap-0.5 rounded-full bg-destructive/10 px-1.5 py-0.5 text-[9px] uppercase tracking-wider text-destructive">
                    <RotateCcw className="h-2.5 w-2.5" />R
                  </span>
                )}
                {t.recent && !t.retro && (
                  <span className="inline-flex items-center gap-0.5 rounded-full bg-gold-soft/40 px-1.5 py-0.5 text-[9px] uppercase tracking-wider text-ink">
                    <Sparkles className="h-2.5 w-2.5" />ingress
                  </span>
                )}
              </div>
              <p className="truncate text-[11px] italic text-ink-soft">{t.note}</p>
            </div>
            <div className="text-right">
              <div className="font-serif text-xl text-primary">H{t.house}</div>
              <div className="text-[9px] uppercase tracking-wider text-ink-soft">{houseMeaning[t.house].split(" · ")[0]}</div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
