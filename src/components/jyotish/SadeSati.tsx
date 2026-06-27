import { today } from "@/lib/jyotish-data";

export function SadeSati() {
  const s = today.sadeSati;
  if (!s.active) return null;
  return (
    <section className="overflow-hidden rounded-2xl border border-[oklch(0.42_0.06_280/0.3)] bg-gradient-to-br from-[oklch(0.95_0.02_280)] to-card p-5 shadow-paper">
      <div className="flex items-baseline justify-between">
        <div>
          <div className="text-[10px] uppercase tracking-[0.22em] text-ink-soft">Sade Sati · 7.5 year arc</div>
          <h3 className="mt-0.5 font-serif text-xl text-ink">You are in the {s.phase.toLowerCase()}</h3>
        </div>
        <span className="font-serif text-2xl text-[oklch(0.42_0.06_280)]">♄</span>
      </div>

      <div className="mt-4">
        <div className="relative h-2 overflow-hidden rounded-full bg-secondary">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[oklch(0.55_0.08_280)] to-[oklch(0.42_0.06_280)]"
            style={{ width: `${s.percent}%` }}
          />
          {/* phase markers at 33% & 66% */}
          {[33, 66].map((m) => (
            <span key={m} className="absolute top-1/2 h-3 w-px -translate-y-1/2 bg-white/70" style={{ left: `${m}%` }} />
          ))}
        </div>
        <div className="mt-1.5 flex justify-between text-[10px] uppercase tracking-wider text-ink-soft">
          <span>{s.startedAt}</span>
          <span className="text-ink">{s.percent}%</span>
          <span>{s.endsAt}</span>
        </div>
      </div>

      <p className="mt-3 text-sm italic leading-relaxed text-ink-soft">{s.note}</p>
    </section>
  );
}
