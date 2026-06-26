import { today } from "@/lib/jyotish-data";
import { TrendingUp, Minus, Heart } from "lucide-react";

const trendIcon = {
  up: <TrendingUp className="h-4 w-4 text-[oklch(0.55_0.18_30)]" />,
  soft: <Heart className="h-4 w-4 text-[oklch(0.62_0.18_290)]" />,
  flat: <Minus className="h-4 w-4 text-ink-soft" />,
};

export function Watching() {
  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-serif text-lg text-ink">Watching</h3>
        <span className="text-[10px] uppercase tracking-[0.18em] text-ink-soft">
          Active threads
        </span>
      </div>
      <div className="grid gap-2 sm:grid-cols-3">
        {today.watching.map((w) => (
          <div key={w.area} className="rounded-xl border border-border bg-card p-4 shadow-paper">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-ink-soft">{w.area}</span>
              {trendIcon[w.trend]}
            </div>
            <div className="mt-1 font-serif text-base text-ink">{w.status}</div>
            <p className="mt-1 text-xs leading-relaxed text-ink-soft">{w.note}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
