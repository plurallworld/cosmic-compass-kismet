import { today } from "@/lib/jyotish-data";
import { StarField } from "./StarField";
import { VitalSigns } from "./VitalSigns";
import { DailyAct } from "./DailyAct";
import { Flame } from "lucide-react";

const formatter = new Intl.DateTimeFormat("en-US", {
  weekday: "short", month: "short", day: "numeric",
});

export function CosmicHero() {
  return (
    <header className="relative bg-cosmos text-white">
      <StarField count={70} />
      {/* moon glow */}
      <div className="pointer-events-none absolute -top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[oklch(0.85_0.12_85/0.18)] blur-3xl" />
      <div className="relative mx-auto max-w-2xl px-5 pt-8 pb-7">
        <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-white/60">
          <span>{formatter.format(today.date)}</span>
          <span className="flex items-center gap-1.5">
            <Flame className="h-3 w-3 text-gold" />
            Day {today.user.dayNumber} ✦
          </span>
        </div>

        <div className="mt-7">
          <VitalSigns />
        </div>

        <p
          className="mt-7 font-serif text-2xl leading-snug text-white/95 animate-dawn"
          style={{ animationDelay: "0.25s" }}
        >
          {today.user.name}, {today.headline.toLowerCase()}
        </p>

        <div className="mt-6">
          <DailyAct />
        </div>

        <div className="mt-5 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/40">
          <span className="h-px w-8 bg-white/20" />
          <span>scroll · the earth below</span>
          <span className="h-px w-8 bg-white/20" />
        </div>
      </div>
      {/* fade to paper */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-b from-transparent to-paper" />
    </header>
  );
}
