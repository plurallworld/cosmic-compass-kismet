import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { TabBar } from "@/components/jyotish/TabBar";
import { today, planetGlyph, type Planet } from "@/lib/jyotish-data";
import { Send, Sparkles } from "lucide-react";

export const Route = createFileRoute("/chart")({
  head: () => ({
    meta: [
      { title: "Chart · Jyotish" },
      { name: "description", content: "Your natal chart, the eight life dimensions, and a conversation with the sky." },
    ],
  }),
  component: ChartPage,
});

const planets: Planet[] = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn", "Rahu", "Ketu"];

function ChartPage() {
  const [tab, setTab] = useState<"ask" | "dimensions" | "wheel" | "remedies">("ask");
  return (
    <div className="min-h-screen bg-paper pb-24">
      <header className="bg-cosmos text-white">
        <div className="mx-auto max-w-2xl px-5 pt-8 pb-6">
          <div className="text-[11px] uppercase tracking-[0.22em] text-white/60">Deep dive</div>
          <h1 className="mt-1 font-serif text-3xl">✦ Your chart</h1>
          <p className="mt-2 text-sm text-white/70">
            {today.ascendant} rising · {today.mahadasha} Mahadasha / {today.antardasha} Antardasha
          </p>
        </div>
        <div className="mx-auto flex max-w-2xl gap-1 overflow-x-auto px-5 pb-3 text-xs uppercase tracking-[0.15em]">
          {(["ask", "dimensions", "wheel", "remedies"] as const).map((t) => (
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
        {tab === "dimensions" && <Dimensions />}
        {tab === "wheel" && <Wheel />}
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
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {today.dimensions.map((d) => (
        <div key={d.name} className="rounded-2xl border border-border bg-card p-4 shadow-paper">
          <div className="flex items-baseline justify-between">
            <span className="font-serif text-lg text-ink">{d.name}</span>
            <span className="font-serif text-2xl text-ink">{d.score}</span>
          </div>
          <p className="mt-1 text-sm italic text-ink-soft">{d.hint}</p>
        </div>
      ))}
    </div>
  );
}

function Wheel() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-paper">
      <svg viewBox="0 0 320 320" className="mx-auto max-w-sm">
        <circle cx="160" cy="160" r="150" fill="none" stroke="oklch(0.78 0.13 80 / 0.3)" />
        <circle cx="160" cy="160" r="100" fill="none" stroke="oklch(0.78 0.13 80 / 0.2)" />
        {/* 12 houses */}
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
        {planets.slice(0, 7).map((p, i) => {
          const a = (i / 7) * Math.PI * 2 - Math.PI / 2;
          const x = 160 + Math.cos(a) * 60;
          const y = 160 + Math.sin(a) * 60;
          return (
            <text key={p} x={x} y={y} textAnchor="middle" fontSize="18"
              fill="oklch(0.35 0.09 280)" fontFamily="Cormorant Garamond">
              {planetGlyph[p]}
            </text>
          );
        })}
        <circle cx="160" cy="160" r="3" fill="oklch(0.78 0.13 80)" />
      </svg>
      <p className="mt-4 text-center text-sm italic text-ink-soft">
        North Indian style chart · {today.ascendant} ascendant
      </p>
    </div>
  );
}

function Remedies() {
  return (
    <div className="space-y-3">
      {planets.map((p) => (
        <div key={p} className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 shadow-paper">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary font-serif text-2xl text-primary">
            {planetGlyph[p]}
          </div>
          <div className="flex-1">
            <div className="font-serif text-base text-ink">{p}</div>
            <div className="text-xs text-ink-soft">Daily remedy guidance</div>
          </div>
          <button className="text-xs text-primary">Open →</button>
        </div>
      ))}
    </div>
  );
}
