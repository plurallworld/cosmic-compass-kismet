import { today } from "@/lib/jyotish-data";

export function SignalGrid() {
  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-serif text-lg text-ink">Signals by area</h3>
        <span className="text-[10px] uppercase tracking-[0.18em] text-ink-soft">
          Eight dimensions
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {today.dimensions.map((d) => (
          <div key={d.name} className="rounded-xl border border-border bg-card p-3 shadow-paper">
            <div className="flex items-baseline justify-between">
              <span className="text-xs uppercase tracking-wider text-ink-soft">{d.name}</span>
              <span className="font-serif text-lg text-ink">{d.score}</span>
            </div>
            <div className="mt-2 h-1 rounded-full bg-secondary overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${d.score}%`,
                  background: "linear-gradient(90deg, oklch(0.62 0.18 290), oklch(0.78 0.13 80))",
                }}
              />
            </div>
            <p className="mt-2 text-xs italic text-ink-soft">{d.hint}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
