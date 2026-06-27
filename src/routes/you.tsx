import { createFileRoute } from "@tanstack/react-router";
import { TabBar } from "@/components/jyotish/TabBar";
import { today } from "@/lib/jyotish-data";
import { Flame } from "lucide-react";

export const Route = createFileRoute("/you")({
  head: () => ({
    meta: [
      { title: "You · Jyotish" },
      { name: "description", content: "Your karma history, streaks, soul tier, and friends." },
    ],
  }),
  component: YouPage,
});

function YouPage() {
  const currentTierIdx = today.soulTiers.findIndex((t) => t.name === today.user.soulTier);
  const currentTier = today.soulTiers[currentTierIdx];
  const nextTier = today.soulTiers[currentTierIdx + 1];
  const progress = nextTier
    ? ((today.user.lifetimeKarma - currentTier.at) / (nextTier.at - currentTier.at)) * 100
    : 100;

  const maxBreakdown = Math.max(...today.karmaBreakdown.map((b) => b.points));

  return (
    <div className="min-h-screen bg-paper pb-24">
      <header className="bg-cosmos text-white">
        <div className="mx-auto max-w-2xl px-5 pt-8 pb-8 text-center">
          <div className="text-[11px] uppercase tracking-[0.22em] text-white/60">Soul tier</div>
          <h1 className="mt-2 font-serif text-4xl text-gold">{today.user.soulTier}</h1>
          <p className="mt-1 text-sm text-white/60">
            {today.user.lifetimeKarma.toLocaleString()} lifetime karma
          </p>

          {/* lotus */}
          <svg viewBox="0 0 120 120" className="mx-auto mt-5 h-28 w-28">
            {Array.from({ length: 8 }).map((_, i) => {
              const angle = (360 / 8) * i - 90;
              const lit = i < 3;
              return (
                <g key={i} transform={`rotate(${angle} 60 60)`}>
                  <ellipse
                    cx="60" cy="28" rx="7" ry="18"
                    fill={lit ? "oklch(0.78 0.13 80 / 0.85)" : "rgba(255,255,255,0.08)"}
                    stroke="rgba(255,255,255,0.2)"
                  />
                </g>
              );
            })}
            <circle cx="60" cy="60" r="8" fill="oklch(0.78 0.13 80)" />
          </svg>

          {nextTier && (
            <div className="mx-auto mt-5 max-w-xs">
              <div className="flex justify-between text-[10px] uppercase tracking-wider text-white/50">
                <span>{currentTier.name}</span>
                <span className="text-gold">{today.user.karmaToNextTier} to {nextTier.name}</span>
              </div>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-gradient-to-r from-gold-soft to-gold" style={{ width: `${progress}%` }} />
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-2xl space-y-6 px-5 pt-7">
        <section className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-border bg-card p-4 shadow-paper">
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-ink-soft">
              <Flame className="h-3 w-3 text-gold" /> Awareness streak
            </div>
            <div className="mt-2 font-serif text-3xl text-ink">14<span className="text-base text-ink-soft"> days</span></div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-4 shadow-paper">
            <div className="text-[10px] uppercase tracking-[0.18em] text-ink-soft">Karma streak</div>
            <div className="mt-2 font-serif text-3xl text-ink">9<span className="text-base text-ink-soft"> days</span></div>
          </div>
        </section>

        {/* Tier ladder */}
        <section className="rounded-2xl border border-border bg-card p-5 shadow-paper">
          <h3 className="mb-3 font-serif text-lg text-ink">The path</h3>
          <ol className="space-y-2.5">
            {today.soulTiers.map((t, i) => {
              const reached = today.user.lifetimeKarma >= t.at;
              const current = i === currentTierIdx;
              return (
                <li key={t.name} className="grid grid-cols-[auto_1fr_auto] items-center gap-3">
                  <span className={`grid h-7 w-7 place-items-center rounded-full font-serif text-sm ${
                    current ? "bg-gold text-[oklch(0.18_0.06_285)] shadow-[0_0_12px_oklch(0.78_0.13_80/0.6)]"
                    : reached ? "bg-secondary text-primary"
                    : "border border-border text-ink-soft"
                  }`}>
                    {i + 1}
                  </span>
                  <span className={`font-serif ${current ? "text-ink" : reached ? "text-ink" : "text-ink-soft"}`}>
                    {t.name}
                  </span>
                  <span className="text-xs tabular-nums text-ink-soft">{t.at.toLocaleString()}</span>
                </li>
              );
            })}
          </ol>
        </section>

        {/* Karma by dimension */}
        <section className="rounded-2xl border border-border bg-card p-5 shadow-paper">
          <h3 className="mb-3 font-serif text-lg text-ink">Where your karma flows</h3>
          <ul className="space-y-2.5">
            {today.karmaBreakdown.map((b) => (
              <li key={b.dimension}>
                <div className="mb-1 flex items-baseline justify-between text-sm">
                  <span className="text-ink">{b.dimension}</span>
                  <span className="tabular-nums text-ink-soft">{b.points}</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[oklch(0.62_0.18_290)] to-[oklch(0.78_0.16_295)]"
                    style={{ width: `${(b.points / maxBreakdown) * 100}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="mb-3 font-serif text-lg text-ink">Last 30 days</h3>
          <div className="grid grid-cols-10 gap-1.5 rounded-2xl border border-border bg-card p-4 shadow-paper">
            {[3,1,2,4,2,0,1,3,4,2,1,3,2,4,1,0,2,3,4,2,3,1,4,2,3,4,2,3,4,4].map((intensity, i) => (
              <div
                key={i}
                className="aspect-square rounded-sm"
                style={{
                  background:
                    intensity >= 4 ? "oklch(0.62 0.18 290)" :
                    intensity === 3 ? "oklch(0.78 0.13 80 / 0.8)" :
                    intensity === 2 ? "oklch(0.78 0.13 80 / 0.5)" :
                    intensity === 1 ? "oklch(0.78 0.13 80 / 0.25)" :
                    "oklch(0.9 0.01 75)",
                }}
              />
            ))}
          </div>
        </section>

        <section>
          <h3 className="mb-3 font-serif text-lg text-ink">Recent acts of kindness</h3>
          <ul className="space-y-2">
            {[
              { date: "Today", act: "Called someone you haven't spoken to in a month" },
              { date: "Yesterday", act: "Wrote a note of appreciation to a colleague" },
              { date: "2d ago", act: "Bought coffee for a stranger" },
              { date: "3d ago", act: "Donated clothes you no longer wear" },
            ].map((a) => (
              <li key={a.date} className="flex gap-3 rounded-xl border border-border bg-card p-3 shadow-paper">
                <span className="text-xs uppercase tracking-wider text-ink-soft w-16 shrink-0 pt-0.5">{a.date}</span>
                <span className="text-sm text-ink italic">"{a.act}"</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="mb-3 font-serif text-lg text-ink">Friends</h3>
          <div className="space-y-2">
            {[
              { name: "Priya", tier: "Light Bearer", act: "Wrote to a teacher who shaped them" },
              { name: "Arjun", tier: "Karma Yogi", act: "Helped a neighbor carry groceries" },
            ].map((f) => (
              <div key={f.name} className="rounded-xl border border-border bg-card p-4 shadow-paper">
                <div className="flex items-baseline justify-between">
                  <span className="font-serif text-base text-ink">{f.name}</span>
                  <span className="text-xs text-gold">{f.tier}</span>
                </div>
                <p className="mt-1 text-sm italic text-ink-soft">"{f.act}"</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <TabBar />
    </div>
  );
}
