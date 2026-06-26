import { useState } from "react";
import { today, planetGlyph } from "@/lib/jyotish-data";
import { ChevronDown, Music2, Waves, Brain, Shirt, Sun } from "lucide-react";

export function PrescriptionCard() {
  const [open, setOpen] = useState(false);
  const p = today.prescriptions;
  return (
    <section className="rounded-2xl border border-border bg-card shadow-paper">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-3 p-5 text-left"
      >
        <div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-ink-soft">
            Today's prescriptions · {planetGlyph[p.governs]} {p.governs} governs
          </div>
          <h3 className="font-serif text-xl mt-1 text-ink">{p.mantra.sanskrit}</h3>
          <div className="mt-2 flex items-center gap-2">
            {p.colors.map((c) => (
              <div key={c.name} className="flex items-center gap-1.5">
                <span
                  className="h-5 w-5 rounded-full ring-1 ring-black/10"
                  style={{ background: c.hex }}
                />
                <span className="text-xs text-ink-soft">{c.name}</span>
              </div>
            ))}
          </div>
        </div>
        <ChevronDown
          className={`h-5 w-5 text-ink-soft transition ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="border-t border-border px-5 pb-5 pt-4 space-y-4 text-sm">
          <Row icon={<Music2 className="h-4 w-4" />} label="Mantra">
            <div className="font-serif text-base text-ink">{p.mantra.sanskrit}</div>
            <div className="text-ink-soft mt-0.5">{p.mantra.note}</div>
            <button className="mt-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              ▶ 10-min timer
            </button>
          </Row>
          <Row icon={<Waves className="h-4 w-4" />} label={`Frequency · ${p.frequency.hz} Hz`}>
            <div className="text-ink-soft">{p.frequency.label}</div>
          </Row>
          <Row icon={<Brain className="h-4 w-4" />} label="Meditation">
            <div className="text-ink">{p.meditation.style}</div>
            <div className="text-ink-soft mt-0.5">{p.meditation.note}</div>
          </Row>
          <Row icon={<Shirt className="h-4 w-4" />} label="Colors today">
            <div className="text-ink-soft italic">"{p.explanation}"</div>
          </Row>
          <Row icon={<Sun className="h-4 w-4" />} label="Peak energy">
            <div className="text-ink">{today.peak.primary}</div>
            <div className="text-ink-soft mt-0.5">
              {today.peak.planet} hora · your mind is clearest now
            </div>
          </Row>
        </div>
      )}
    </section>
  );
}

function Row({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3">
      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary text-ink-soft">
        {icon}
      </div>
      <div className="flex-1">
        <div className="text-[10px] uppercase tracking-[0.18em] text-ink-soft">{label}</div>
        <div className="mt-1">{children}</div>
      </div>
    </div>
  );
}
