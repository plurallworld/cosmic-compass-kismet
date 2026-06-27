import { today } from "@/lib/jyotish-data";

const TODAY_INDEX = 4;

export function WeeklyForecast() {
  const max = 100;
  return (
    <section className="rounded-2xl border border-border bg-card p-5 shadow-paper">
      <header className="mb-4 flex items-baseline justify-between">
        <h3 className="font-serif text-lg text-ink">The week ahead</h3>
        <div className="flex gap-3 text-[10px] uppercase tracking-wider text-ink-soft">
          <Legend dot="oklch(0.78 0.16 65)" label="Energy" />
          <Legend dot="oklch(0.62 0.18 290)" label="Karma" />
          <Legend dot="oklch(0.55 0.2 25)" label="Pressure" />
        </div>
      </header>

      <div className="flex h-32 items-end justify-between gap-2">
        {today.weekly.map((d, i) => {
          const isToday = i === TODAY_INDEX;
          return (
            <div key={d.day} className="flex flex-1 flex-col items-center gap-1.5">
              <div className="flex h-full w-full items-end justify-center gap-0.5">
                <Bar value={d.energy} max={max} color="oklch(0.78 0.16 65)" highlight={isToday} />
                <Bar value={d.karma} max={max} color="oklch(0.62 0.18 290)" highlight={isToday} />
                <Bar value={d.pressure} max={max} color="oklch(0.55 0.2 25 / 0.7)" highlight={isToday} />
              </div>
              <span className={`text-[10px] uppercase tracking-wider ${isToday ? "font-semibold text-ink" : "text-ink-soft"}`}>
                {d.day}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Bar({ value, max, color, highlight }: { value: number; max: number; color: string; highlight: boolean }) {
  return (
    <div
      className="w-1.5 rounded-sm transition-all"
      style={{
        height: `${(value / max) * 100}%`,
        background: color,
        opacity: highlight ? 1 : 0.55,
        boxShadow: highlight ? `0 0 8px ${color}` : "none",
      }}
    />
  );
}

function Legend({ dot, label }: { dot: string; label: string }) {
  return (
    <span className="flex items-center gap-1">
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: dot }} />
      {label}
    </span>
  );
}
