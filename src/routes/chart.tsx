import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { TabBar } from "@/components/jyotish/TabBar";
import { Transits } from "@/components/jyotish/Transits";
import { DashaTree } from "@/components/jyotish/DashaTree";
import { today, planetGlyph, planetColor, houseMeaning, type Planet } from "@/lib/jyotish-data";
import { Send, Sparkles, ChevronDown } from "lucide-react";

export const Route = createFileRoute("/chart")({
  head: () => ({
    meta: [
      { title: "Chart · Jyotish" },
      { name: "description", content: "Your natal chart, transits, dashas, and a conversation with the sky." },
    ],
  }),
  component: ChartPage,
});

const planets: Planet[] = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn", "Rahu", "Ketu"];
const tabs = ["ask", "wheel", "transits", "dasha", "dimensions", "remedies"] as const;
type Tab = typeof tabs[number];

function ChartPage() {
  const [tab, setTab] = useState<Tab>("ask");
  return (
    <div className="min-h-screen bg-paper pb-24">
      <header className="bg-cosmos text-white">
        <div className="mx-auto max-w-2xl px-5 pt-8 pb-6">
          <div className="text-[11px] uppercase tracking-[0.22em] text-white/60">Deep dive</div>
          <h1 className="mt-1 font-serif text-3xl">✦ Your chart</h1>
          <p className="mt-2 text-sm text-white/70">
            {today.ascendant} rising · Moon in {today.user.moonSign.split(" ")[0]} · {today.user.birthNakshatra} nakshatra
          </p>
          <p className="mt-1 text-xs text-white/50">
            {today.mahadasha} MD / {today.antardasha} AD / {today.pratyantardasha} PD
          </p>
        </div>
        <div className="mx-auto flex max-w-2xl gap-1 overflow-x-auto px-5 pb-3 text-xs uppercase tracking-[0.15em]">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`whitespace-nowrap rounded-full px-3 py-1.5 transition ${
                tab === t ? "bg-gold text-[oklch(0.18_0.06_285)]" : "text-white/60 hover:text-white"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-5 pt-7">
        {tab === "ask" && <AskChart />}
        {tab === "wheel" && <Wheel />}
        {tab === "transits" && <Transits />}
        {tab === "dasha" && <DashaTree />}
        {tab === "dimensions" && <Dimensions />}
        {tab === "remedies" && <Remedies />}
      </main>
      <TabBar />
    </div>
  );
}

function AskChart() {
  const [q, setQ] = useState("");
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-border bg-card p-5 shadow-paper">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-ink-soft">
          <Sparkles className="h-3 w-3" /> The chart sees you
        </div>
        <p className="mt-3 font-serif text-xl leading-snug text-ink">
          "Ankur, what you're carrying right now is real. Saturn doesn't punish — it tests
          foundations. Ask me about a corner of your life and I'll tell you what the sky shows."
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {[
          "Why does work feel heavy?",
          "Is this the time to leave?",
          "What is Venus asking of me?",
          "When will this lift?",
        ].map((p) => (
          <button
            key={p}
            onClick={() => setQ(p)}
            className="rounded-xl border border-border bg-card p-3 text-left text-sm text-ink-soft transition hover:border-primary/40 hover:text-ink shadow-paper"
          >
            {p}
          </button>
        ))}
      </div>

      <div className="sticky bottom-20 rounded-full border border-border bg-card p-1.5 shadow-paper flex items-center gap-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Ask your chart…"
          className="flex-1 bg-transparent px-4 py-2 text-sm text-ink placeholder:text-ink-soft focus:outline-none"
        />
        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function Dimensions() {
  const [open, setOpen] = useState<string | null>(today.dimensions[0]?.name ?? null);
  return (
    <div className="space-y-2">
      {today.dimensions.map((d) => {
        const isOpen = open === d.name;
        return (
          <div key={d.name} className="overflow-hidden rounded-2xl border border-border bg-card shadow-paper">
            <button
              onClick={() => setOpen(isOpen ? null : d.name)}
              className="flex w-full items-center gap-4 p-4 text-left"
            >
              <span
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full font-serif text-base text-white"
                style={{ background: planetColor[d.planet] }}
              >
                {planetGlyph[d.planet]}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="font-serif text-lg text-ink">{d.name}</span>
                  <span className="font-serif text-2xl tabular-nums text-ink">{d.score}</span>
                </div>
                <p className="text-sm italic text-ink-soft">{d.hint}</p>
              </div>
              <ChevronDown className={`h-4 w-4 shrink-0 text-ink-soft transition ${isOpen ? "rotate-180" : ""}`} />
            </button>
            {isOpen && (
              <div className="border-t border-border bg-paper-warm/40 px-4 py-3">
                <p className="text-sm leading-relaxed text-ink">{d.detail}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {d.houses.map((h) => (
                    <span key={h} className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-2 py-1 text-[10px] uppercase tracking-wider text-ink-soft">
                      <span className="font-serif text-xs text-primary">H{h}</span>
                      {houseMeaning[h].split(" · ")[0]}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function Wheel() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-paper">
      <svg viewBox="0 0 320 320" className="mx-auto max-w-sm">
        <circle cx="160" cy="160" r="150" fill="none" stroke="oklch(0.78 0.13 80 / 0.3)" />
        <circle cx="160" cy="160" r="100" fill="none" stroke="oklch(0.78 0.13 80 / 0.2)" />
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
          const x1 = 160 + Math.cos(a) * 100;
          const y1 = 160 + Math.sin(a) * 100;
          const x2 = 160 + Math.cos(a) * 150;
          const y2 = 160 + Math.sin(a) * 150;
          const tx = 160 + Math.cos(a + Math.PI / 12) * 130;
          const ty = 160 + Math.sin(a + Math.PI / 12) * 130;
          return (
            <g key={i}>
              <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="oklch(0.78 0.13 80 / 0.3)" />
              <text x={tx} y={ty} textAnchor="middle" fontSize="11" fill="oklch(0.45 0.02 60)">
                {i + 1}
              </text>
            </g>
          );
        })}
        {today.transits.map((t, i) => {
          const a = ((t.house - 1) / 12) * Math.PI * 2 - Math.PI / 2 + Math.PI / 12 + (i % 3) * 0.18 - 0.18;
          const x = 160 + Math.cos(a) * 70;
          const y = 160 + Math.sin(a) * 70;
          return (
            <g key={t.planet}>
              <circle cx={x} cy={y} r="11" fill={planetColor[t.planet]} opacity="0.9" />
              <text x={x} y={y + 4} textAnchor="middle" fontSize="13" fill="white" fontFamily="Cormorant Garamond">
                {planetGlyph[t.planet]}
              </text>
            </g>
          );
        })}
        <circle cx="160" cy="160" r="3" fill="oklch(0.78 0.13 80)" />
      </svg>
      <p className="mt-4 text-center text-sm italic text-ink-soft">
        North Indian style · {today.ascendant} ascendant · planets shown in transit houses
      </p>
    </div>
  );
}

function Remedies() {
  const remedies: Record<Planet, { gem: string; day: string; charity: string }> = {
    Sun: { gem: "Ruby", day: "Sunday", charity: "Wheat, jaggery to the elderly" },
    Moon: { gem: "Pearl", day: "Monday", charity: "Milk, rice to a mother" },
    Mars: { gem: "Red coral", day: "Tuesday", charity: "Lentils, donate blood" },
    Mercury: { gem: "Emerald", day: "Wednesday", charity: "Green vegetables to students" },
    Jupiter: { gem: "Yellow sapphire", day: "Thursday", charity: "Books, turmeric to a teacher" },
    Venus: { gem: "Diamond", day: "Friday", charity: "White flowers, sweets to a woman" },
    Saturn: { gem: "Blue sapphire", day: "Saturday", charity: "Black sesame, oil to a worker" },
    Rahu: { gem: "Hessonite", day: "Saturday", charity: "Feed a stray dog" },
    Ketu: { gem: "Cat's eye", day: "Tuesday", charity: "Multi-colored cloth to a child" },
  };
  return (
    <div className="space-y-2">
      {planets.map((p) => {
        const r = remedies[p];
        return (
          <div key={p} className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 shadow-paper">
            <div
              className="grid h-12 w-12 shrink-0 place-items-center rounded-full font-serif text-2xl text-white"
              style={{ background: planetColor[p] }}
            >
              {planetGlyph[p]}
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-serif text-base text-ink">{p}</div>
              <div className="text-[11px] text-ink-soft">{r.gem} · {r.day} · {r.charity}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
