import { useState } from "react";
import { today } from "@/lib/jyotish-data";
import { Sparkles, Check } from "lucide-react";

export function DailyAct() {
  const [done, setDone] = useState(false);
  const { dailyAct, multiplier } = today;
  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-md p-5 animate-dawn"
      style={{ animationDelay: "0.4s" }}
    >
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[oklch(0.78_0.13_80/0.15)] blur-2xl" />
      <div className="relative">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-gold">
          <Sparkles className="h-3 w-3" />
          <span>Today's act · {dailyAct.context}</span>
          {multiplier > 1 && (
            <span className="ml-auto rounded-full bg-[oklch(0.78_0.13_80/0.18)] px-2 py-0.5 text-gold normal-case tracking-normal">
              {multiplier}× karma day
            </span>
          )}
        </div>
        <p className="mt-3 font-serif text-xl leading-snug text-white">
          "{dailyAct.prompt}"
        </p>
        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="text-xs text-white/55">
            +{Math.round(dailyAct.points * multiplier)} karma
          </span>
          <button
            onClick={() => setDone(true)}
            disabled={done}
            className={
              done
                ? "inline-flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-xs font-medium text-[oklch(0.18_0.06_285)]"
                : "inline-flex items-center gap-2 rounded-full border border-gold/60 bg-gold/10 px-4 py-2 text-xs font-medium text-gold transition hover:bg-gold/20"
            }
          >
            {done ? (<><Check className="h-3.5 w-3.5" /> Done · ring filled</>) : "I did this →"}
          </button>
        </div>
      </div>
    </div>
  );
}
