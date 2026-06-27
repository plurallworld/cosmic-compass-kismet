import { today, planetGlyph } from "@/lib/jyotish-data";

export function NakshatraCard() {
  const n = today.panchanga.nakshatra;
  return (
    <section className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-[oklch(0.18_0.06_285)] to-[oklch(0.25_0.08_290)] p-5 text-white shadow-paper">
      <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-gold/20 blur-3xl" />
      <div className="relative">
        <div className="flex items-baseline justify-between">
          <div className="text-[10px] uppercase tracking-[0.22em] text-white/50">Moon's nakshatra · #{n.number}/27</div>
          <span className="font-serif text-base text-gold">{planetGlyph[n.ruler]} {n.ruler}</span>
        </div>
        <h3 className="mt-1 font-serif text-3xl text-gold">{n.name}</h3>
        <div className="mt-0.5 text-xs text-white/60">Pada {n.pada} · {n.gana} gana · {n.until}</div>

        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <Field label="Deity" value={n.deity} />
          <Field label="Symbol" value={n.symbol} />
        </div>

        <p className="mt-4 text-sm italic leading-relaxed text-white/80">{n.note}</p>
      </div>
    </section>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[9px] uppercase tracking-[0.2em] text-white/40">{label}</div>
      <div className="mt-0.5 font-serif text-base text-white/95">{value}</div>
    </div>
  );
}
