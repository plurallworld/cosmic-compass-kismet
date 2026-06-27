import { today } from "@/lib/jyotish-data";

const palette: Record<"auspicious" | "peak" | "avoid" | "neutral", string> = {
  auspicious: "bg-[oklch(0.78_0.13_80/0.18)] text-[oklch(0.45_0.13_80)] ring-[oklch(0.78_0.13_80/0.4)]",
  peak: "bg-[oklch(0.62_0.18_290/0.15)] text-[oklch(0.45_0.18_290)] ring-[oklch(0.62_0.18_290/0.4)]",
  avoid: "bg-[oklch(0.55_0.2_25/0.12)] text-[oklch(0.5_0.2_25)] ring-[oklch(0.55_0.2_25/0.4)]",
  neutral: "bg-secondary text-ink-soft ring-border",
};

export function MuhurtaTimeline() {
  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-serif text-lg text-ink">Muhurta · windows of the day</h3>
      </div>
      <div className="relative">
        <div className="absolute left-3 top-2 bottom-2 w-px bg-border" />
        <ul className="space-y-3">
          {today.muhurta.map((m) => (
            <li key={m.time} className="relative pl-9">
              <span className={`absolute left-1.5 top-2 h-3 w-3 rounded-full ring-2 ${palette[m.quality]}`} />
              <div className="rounded-xl border border-border bg-card p-3 shadow-paper">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-serif text-base text-ink">{m.title}</span>
                  <span className="text-xs tabular-nums text-ink-soft">{m.time}</span>
                </div>
                <p className="text-xs text-ink-soft">{m.note}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
