import { today } from "@/lib/jyotish-data";

export function InterventionCard() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-[oklch(0.62_0.18_290/0.25)] bg-gradient-to-br from-[oklch(0.95_0.03_290)] to-[oklch(0.92_0.04_75)] p-6 shadow-paper">
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[oklch(0.62_0.18_290/0.12)] blur-3xl" />
      <div className="relative">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[oklch(0.45_0.18_290)]">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[oklch(0.62_0.18_290)]" />
          <span>A note on what you're navigating</span>
        </div>
        <p className="mt-3 font-serif text-lg leading-snug text-ink">
          "{today.intervention.body}"
        </p>
        <button className="mt-4 text-xs font-medium text-[oklch(0.45_0.18_290)] underline-offset-4 hover:underline">
          Read your Saturn story →
        </button>
      </div>
    </section>
  );
}
