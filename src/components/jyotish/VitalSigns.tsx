import { today } from "@/lib/jyotish-data";

function EnergyDial({ value }: { value: number }) {
  const r = 46;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <div className="relative flex flex-col items-center">
      <svg viewBox="0 0 120 120" className="h-32 w-32 -rotate-90">
        <defs>
          <linearGradient id="energyG" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.55 0.22 30)" />
            <stop offset="60%" stopColor="oklch(0.78 0.16 65)" />
            <stop offset="100%" stopColor="oklch(0.88 0.16 85)" />
          </linearGradient>
        </defs>
        <circle cx="60" cy="60" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
        <circle
          cx="60" cy="60" r={r} fill="none"
          stroke="url(#energyG)" strokeWidth="6" strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={offset}
          style={{ filter: "drop-shadow(0 0 8px oklch(0.78 0.16 65 / 0.6))" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-serif text-4xl text-white">{value}</span>
        <span className="text-[10px] uppercase tracking-[0.18em] text-white/55">Energy</span>
      </div>
    </div>
  );
}

function KarmaLotus({ lit, total }: { lit: number; total: number }) {
  const petals = Array.from({ length: total }, (_, i) => i);
  return (
    <div className="relative flex flex-col items-center">
      <svg viewBox="0 0 140 140" className="h-36 w-36">
        <defs>
          <radialGradient id="petalLit" cx="50%" cy="40%">
            <stop offset="0%" stopColor="oklch(0.85 0.15 295)" />
            <stop offset="100%" stopColor="oklch(0.5 0.18 290)" />
          </radialGradient>
        </defs>
        {petals.map((i) => {
          const angle = (360 / total) * i - 90;
          const isLit = i < lit;
          return (
            <g key={i} transform={`rotate(${angle} 70 70)`}>
              <ellipse
                cx="70" cy="32" rx="9" ry="22"
                fill={isLit ? "url(#petalLit)" : "rgba(255,255,255,0.06)"}
                stroke={isLit ? "oklch(0.85 0.15 295 / 0.7)" : "rgba(255,255,255,0.12)"}
                strokeWidth="1"
                style={isLit ? { filter: "drop-shadow(0 0 6px oklch(0.7 0.18 290 / 0.7))" } : {}}
              />
            </g>
          );
        })}
        <circle cx="70" cy="70" r="10" fill="oklch(0.78 0.13 80 / 0.9)"
          style={{ filter: "drop-shadow(0 0 8px oklch(0.78 0.13 80 / 0.6))" }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center pt-3">
        <span className="font-serif text-3xl text-white">{lit}<span className="text-white/40 text-xl">/{total}</span></span>
        <span className="text-[10px] uppercase tracking-[0.18em] text-white/55 mt-0.5">Karma</span>
      </div>
    </div>
  );
}

function SkyPressure({ value, label }: { value: number; label: string }) {
  return (
    <div className="relative flex flex-col items-center justify-center w-32">
      <svg viewBox="0 0 140 90" className="w-32">
        <defs>
          <linearGradient id="pressureG" x1="0" x2="1">
            <stop offset="0%" stopColor="oklch(0.65 0.12 195)" />
            <stop offset="55%" stopColor="oklch(0.78 0.14 90)" />
            <stop offset="100%" stopColor="oklch(0.6 0.22 25)" />
          </linearGradient>
        </defs>
        <path d="M 15 75 A 55 55 0 0 1 125 75" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" strokeLinecap="round" />
        <path d="M 15 75 A 55 55 0 0 1 125 75" fill="none" stroke="url(#pressureG)" strokeWidth="6" strokeLinecap="round"
          strokeDasharray="173"
          strokeDashoffset={173 - (value / 100) * 173}
          style={{ filter: "drop-shadow(0 0 6px oklch(0.6 0.2 25 / 0.45))" }}
        />
        {/* needle */}
        {(() => {
          const a = Math.PI - (value / 100) * Math.PI;
          const x = 70 + Math.cos(a) * 48;
          const y = 75 - Math.sin(a) * 48;
          return <line x1="70" y1="75" x2={x} y2={y} stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.9" />;
        })()}
        <circle cx="70" cy="75" r="3" fill="white" />
      </svg>
      <div className="flex flex-col items-center -mt-2">
        <span className="font-serif text-2xl text-white">{value}</span>
        <span className="text-[10px] uppercase tracking-[0.18em] text-white/55">Sky · {label}</span>
      </div>
    </div>
  );
}

export function VitalSigns() {
  const { energy, karma, pressure, pressureLabel } = today;
  return (
    <div className="flex items-center justify-between gap-4 animate-dawn">
      <EnergyDial value={energy} />
      <KarmaLotus lit={karma.petalsLit} total={karma.petalsTotal} />
      <SkyPressure value={pressure} label={pressureLabel} />
    </div>
  );
}
