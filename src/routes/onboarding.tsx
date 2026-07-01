import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { StarField } from "@/components/jyotish/StarField";
import { planetGlyph, today } from "@/lib/jyotish-data";
import {
  ArrowRight,
  Sparkles,
  Loader2,
  Check,
  Send,
  Lock,
  Gem,
  Flame,
  HandHeart,
} from "lucide-react";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Begin · Jyotish" },
      { name: "description", content: "Generate your Vedic chart and meet your cosmic dashboard." },
    ],
  }),
  component: Onboarding,
});

const ONBOARDING_KEY = "jyotish.onboarded.v1";

type Step =
  | "welcome"
  | "birth"
  | "generating"
  | "kundali"
  | "divisional"
  | "personality"
  | "dimensions"
  | "weather"
  | "remedy"
  | "scores"
  | "chat"
  | "paywall"
  | "done";

const stepOrder: Step[] = [
  "welcome", "birth", "generating", "kundali", "divisional",
  "personality", "dimensions", "weather", "remedy", "scores",
  "chat", "paywall", "done",
];

function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("welcome");
  const [birth, setBirth] = useState({ name: "", date: "1995-04-12", time: "05:24", place: "Varanasi, India" });

  const idx = stepOrder.indexOf(step);
  const next = () => setStep(stepOrder[Math.min(idx + 1, stepOrder.length - 1)]);
  const back = () => setStep(stepOrder[Math.max(idx - 1, 0)]);

  useEffect(() => {
    if (step === "done") {
      if (typeof window !== "undefined") localStorage.setItem(ONBOARDING_KEY, "1");
      navigate({ to: "/" });
    }
  }, [step, navigate]);

  // auto-advance generating
  useEffect(() => {
    if (step !== "generating") return;
    const t = setTimeout(() => setStep("kundali"), 3400);
    return () => clearTimeout(t);
  }, [step]);

  return (
    <div className="relative min-h-screen bg-cosmos text-paper overflow-hidden">
      <StarField />
      {/* progress */}
      {step !== "welcome" && step !== "done" && (
        <div className="fixed top-0 left-0 right-0 z-40 h-1 bg-white/5">
          <div
            className="h-full bg-gradient-to-r from-amber-300 via-rose-300 to-indigo-300 transition-all duration-500"
            style={{ width: `${((idx) / (stepOrder.length - 2)) * 100}%` }}
          />
        </div>
      )}

      <div className="relative z-10 mx-auto flex min-h-screen max-w-xl flex-col px-6 pb-10 pt-14">
        {step === "welcome" && <Welcome onNext={next} />}
        {step === "birth" && <BirthForm birth={birth} setBirth={setBirth} onNext={next} />}
        {step === "generating" && <Generating name={birth.name || "friend"} />}
        {step === "kundali" && <KundaliReveal name={birth.name || "friend"} onNext={next} />}
        {step === "divisional" && <Divisional onNext={next} />}
        {step === "personality" && <Personality name={birth.name || "friend"} onNext={next} />}
        {step === "dimensions" && <Dimensions onNext={next} />}
        {step === "weather" && <Weather onNext={next} />}
        {step === "remedy" && <Remedy onNext={next} />}
        {step === "scores" && <Scores onNext={next} />}
        {step === "chat" && <ChatTeaser onNext={next} />}
        {step === "paywall" && <Paywall onDone={() => setStep("done")} />}

        {step !== "welcome" && step !== "generating" && step !== "paywall" && step !== "done" && (
          <button
            onClick={back}
            className="mt-6 self-start text-[11px] uppercase tracking-[0.2em] text-paper/40 hover:text-paper/70"
          >
            ← back
          </button>
        )}
      </div>
    </div>
  );
}

/* ─────────── 1. Welcome ─────────── */
function Welcome({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center text-center">
      <div className="mb-6 text-5xl">✦</div>
      <div className="text-[10px] uppercase tracking-[0.3em] text-paper/50">Jyotish</div>
      <h1 className="mt-3 font-serif text-4xl leading-tight">
        The stars set the conditions.
        <br />
        <span className="italic text-amber-200/90">You write the story.</span>
      </h1>
      <p className="mt-6 max-w-sm text-sm text-paper/60">
        In the next 3 minutes we'll compute your Vedic chart, read your personality from the sky
        of your birth, and show you the three vital signs that shape your day.
      </p>
      <button
        onClick={onNext}
        className="mt-10 inline-flex items-center gap-2 rounded-full bg-paper px-6 py-3 text-sm font-medium text-cosmos"
      >
        Begin the reading <ArrowRight className="h-4 w-4" />
      </button>
      <div className="mt-4 text-[10px] uppercase tracking-[0.2em] text-paper/30">
        Takes ~3 minutes · No account yet
      </div>
    </div>
  );
}

/* ─────────── 2. Birth details ─────────── */
function BirthForm({
  birth, setBirth, onNext,
}: {
  birth: { name: string; date: string; time: string; place: string };
  setBirth: (b: typeof birth) => void;
  onNext: () => void;
}) {
  return (
    <div className="flex flex-1 flex-col justify-center">
      <div className="text-[10px] uppercase tracking-[0.3em] text-paper/50">Step 1 · Birth data</div>
      <h2 className="mt-3 font-serif text-3xl">Tell me the exact moment you arrived.</h2>
      <p className="mt-2 text-sm text-paper/60">
        The Vedic chart is a photograph of the sky at your first breath. Even 4 minutes changes the ascendant.
      </p>

      <div className="mt-8 space-y-4">
        <Field label="Your name">
          <input
            value={birth.name}
            onChange={(e) => setBirth({ ...birth, name: e.target.value })}
            placeholder="Ankur"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-paper placeholder:text-paper/30 focus:border-amber-200/50 focus:outline-none"
          />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Date of birth">
            <input
              type="date"
              value={birth.date}
              onChange={(e) => setBirth({ ...birth, date: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-paper focus:border-amber-200/50 focus:outline-none"
            />
          </Field>
          <Field label="Time (24h)">
            <input
              type="time"
              value={birth.time}
              onChange={(e) => setBirth({ ...birth, time: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-paper focus:border-amber-200/50 focus:outline-none"
            />
          </Field>
        </div>
        <Field label="Place of birth">
          <input
            value={birth.place}
            onChange={(e) => setBirth({ ...birth, place: e.target.value })}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-paper focus:border-amber-200/50 focus:outline-none"
          />
        </Field>
      </div>

      <button
        onClick={onNext}
        disabled={!birth.name}
        className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-paper px-6 py-3 text-sm font-medium text-cosmos disabled:opacity-40"
      >
        Generate my kundali <Sparkles className="h-4 w-4" />
      </button>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="mb-1.5 text-[10px] uppercase tracking-[0.2em] text-paper/50">{label}</div>
      {children}
    </label>
  );
}

/* ─────────── 3. Generating ─────────── */
function Generating({ name }: { name: string }) {
  const lines = [
    "Locating your birth coordinates…",
    "Casting the Rashi chart (D1)…",
    "Deriving the Navamsa (D9)…",
    "Deriving the Dashamsa (D10)…",
    "Placing 9 grahas across 12 bhavas…",
    "Reading the moment you arrived.",
  ];
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => Math.min(n + 1, lines.length - 1)), 520);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="flex flex-1 flex-col items-center justify-center text-center">
      <div className="relative h-40 w-40">
        <div className="absolute inset-0 animate-spin rounded-full border border-amber-200/20" style={{ animationDuration: "6s" }} />
        <div className="absolute inset-3 animate-spin rounded-full border border-rose-200/20" style={{ animationDuration: "9s", animationDirection: "reverse" }} />
        <div className="absolute inset-6 animate-spin rounded-full border border-indigo-200/30" style={{ animationDuration: "12s" }} />
        <div className="absolute inset-0 flex items-center justify-center font-serif text-3xl">✦</div>
      </div>
      <div className="mt-8 font-serif text-xl">Drawing your sky, {name}…</div>
      <div className="mt-4 h-6 text-sm text-paper/60">{lines[i]}</div>
    </div>
  );
}

/* ─────────── 4. Kundali reveal ─────────── */
function KundaliReveal({ name, onNext }: { name: string; onNext: () => void }) {
  return (
    <div className="flex flex-1 flex-col justify-center">
      <div className="text-[10px] uppercase tracking-[0.3em] text-paper/50">Your kundali · Rashi D1</div>
      <h2 className="mt-3 font-serif text-3xl">Here is the sky you were born under.</h2>
      <p className="mt-2 text-sm text-paper/60">
        This is your <span className="text-amber-200">Rashi chart</span> — the main map. Every house is
        a room in your life; every planet a resident who shapes it.
      </p>
      <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
        <NorthChart />
        <div className="mt-3 grid grid-cols-3 gap-2 text-[11px]">
          <Legend g="Asc" v="Scorpio" />
          <Legend g="Moon" v="Scorpio · 1H" />
          <Legend g="Sun" v="Gemini · 8H" />
          <Legend g="Saturn" v="Aquarius · 4H" />
          <Legend g="Jupiter" v="Taurus · 7H" />
          <Legend g="Venus" v="Gemini · 8H" />
        </div>
      </div>
      <p className="mt-4 text-sm text-paper/70 italic">
        "{name}, you were born with the Moon in Anuradha — the star of devoted friendship."
      </p>
      <NextBtn onNext={onNext} label="Show me the divisional charts" />
    </div>
  );
}

function Legend({ g, v }: { g: string; v: string }) {
  return (
    <div className="rounded-lg border border-white/5 bg-white/[0.02] px-2 py-1.5">
      <div className="text-[9px] uppercase tracking-wider text-paper/40">{g}</div>
      <div className="text-paper/90">{v}</div>
    </div>
  );
}

function NorthChart() {
  return (
    <svg viewBox="0 0 200 200" className="w-full">
      <rect x="10" y="10" width="180" height="180" fill="none" stroke="oklch(0.85 0.05 80 / 0.4)" />
      <line x1="10" y1="10" x2="190" y2="190" stroke="oklch(0.85 0.05 80 / 0.4)" />
      <line x1="190" y1="10" x2="10" y2="190" stroke="oklch(0.85 0.05 80 / 0.4)" />
      <line x1="100" y1="10" x2="10" y2="100" stroke="oklch(0.85 0.05 80 / 0.4)" />
      <line x1="10" y1="100" x2="100" y2="190" stroke="oklch(0.85 0.05 80 / 0.4)" />
      <line x1="100" y1="190" x2="190" y2="100" stroke="oklch(0.85 0.05 80 / 0.4)" />
      <line x1="190" y1="100" x2="100" y2="10" stroke="oklch(0.85 0.05 80 / 0.4)" />
      {[
        { x: 100, y: 55, l: "Asc ☾" },
        { x: 55, y: 100, l: "♄" },
        { x: 100, y: 145, l: "♃" },
        { x: 145, y: 100, l: "☉ ♀" },
        { x: 55, y: 55, l: "♂" },
        { x: 145, y: 55, l: "☿" },
      ].map((p, i) => (
        <text key={i} x={p.x} y={p.y} textAnchor="middle" fontSize="11" fill="oklch(0.9 0.1 80)">
          {p.l}
        </text>
      ))}
    </svg>
  );
}

/* ─────────── 5. Divisional charts D1/D9/D10 ─────────── */
function Divisional({ onNext }: { onNext: () => void }) {
  const charts = [
    { code: "D1", name: "Rashi", meaning: "The overall you — body, life, main themes.", color: "amber-200" },
    { code: "D9", name: "Navamsa", meaning: "Your spouse, dharma, and second half of life.", color: "rose-200" },
    { code: "D10", name: "Dashamsa", meaning: "Career, public status, what you build.", color: "indigo-200" },
    { code: "D7", name: "Saptamsa", meaning: "Children, creative offspring.", color: "emerald-200" },
    { code: "D12", name: "Dwadasamsa", meaning: "Parents, ancestry, inherited karma.", color: "orange-200" },
  ];
  return (
    <div className="flex flex-1 flex-col justify-center">
      <div className="text-[10px] uppercase tracking-[0.3em] text-paper/50">Divisional charts · Vargas</div>
      <h2 className="mt-3 font-serif text-3xl">One birth. Sixteen skies.</h2>
      <p className="mt-2 text-sm text-paper/60">
        Vedic astrology zooms into your Rashi chart 16 different ways. Each zoom answers a different question.
      </p>
      <div className="mt-6 space-y-2.5">
        {charts.map((c) => (
          <div key={c.code} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white/5 font-serif text-sm text-amber-100">
              {c.code}
            </div>
            <div className="flex-1">
              <div className="text-sm text-paper">{c.name}</div>
              <div className="text-xs text-paper/50">{c.meaning}</div>
            </div>
          </div>
        ))}
      </div>
      <NextBtn onNext={onNext} label="Read my personality" />
    </div>
  );
}

/* ─────────── 6. Personality (chat-style) ─────────── */
function Personality({ name, onNext }: { name: string; onNext: () => void }) {
  const bubbles = useMemo(() => [
    `${name}, your ascendant is Scorpio — you carry a still surface with deep undertow.`,
    "Moon in Anuradha means loyalty is your love language. You'd rather have three real friends than three hundred.",
    "Sun in the 8th house — you were built to see what others don't say aloud.",
    "Mercury retrograde at birth: you don't think in straight lines. You think in returns.",
    "Saturn strong: life will ask you to build slowly. Nothing given fast will last long.",
  ], [name]);
  const [shown, setShown] = useState(0);
  useEffect(() => {
    if (shown >= bubbles.length) return;
    const t = setTimeout(() => setShown((s) => s + 1), 900);
    return () => clearTimeout(t);
  }, [shown, bubbles.length]);

  return (
    <div className="flex flex-1 flex-col">
      <div className="text-[10px] uppercase tracking-[0.3em] text-paper/50">Your personality · read from the chart</div>
      <h2 className="mt-3 font-serif text-3xl">How the sky drew you.</h2>
      <div className="mt-6 space-y-3">
        {bubbles.slice(0, shown).map((b, i) => (
          <div key={i} className="animate-in fade-in slide-in-from-bottom-2 rounded-2xl rounded-tl-sm border border-white/10 bg-white/[0.05] p-4 text-sm text-paper/90">
            {b}
          </div>
        ))}
        {shown < bubbles.length && (
          <div className="flex items-center gap-1.5 px-2 text-paper/40">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-paper/40" />
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-paper/40" style={{ animationDelay: "0.2s" }} />
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-paper/40" style={{ animationDelay: "0.4s" }} />
          </div>
        )}
      </div>
      {shown >= bubbles.length && <NextBtn onNext={onNext} label="Show impact on my life" />}
    </div>
  );
}

/* ─────────── 7. Dimensions ─────────── */
function Dimensions({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-1 flex-col justify-center">
      <div className="text-[10px] uppercase tracking-[0.3em] text-paper/50">Your 8 dimensions</div>
      <h2 className="mt-3 font-serif text-3xl">Where your chart is strong. Where it asks for care.</h2>
      <p className="mt-2 text-sm text-paper/60">
        Every planet influences a life area. Here's your baseline chart-strength across the eight.
      </p>
      <div className="mt-6 space-y-2.5">
        {today.dimensions.map((d) => (
          <div key={d.name}>
            <div className="flex items-baseline justify-between text-sm">
              <span className="text-paper/90">{d.name}</span>
              <span className="font-serif text-paper/70">{d.score}</span>
            </div>
            <div className="mt-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${d.score}%`,
                  background: "linear-gradient(90deg, oklch(0.72 0.16 300), oklch(0.85 0.14 80))",
                }}
              />
            </div>
            <p className="mt-0.5 text-[11px] italic text-paper/40">{d.hint}</p>
          </div>
        ))}
      </div>
      <NextBtn onNext={onNext} label="What's happening right now?" />
    </div>
  );
}

/* ─────────── 8. Weather (current transits impact) ─────────── */
function Weather({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-1 flex-col justify-center">
      <div className="text-[10px] uppercase tracking-[0.3em] text-paper/50">Right now · Live sky</div>
      <h2 className="mt-3 font-serif text-3xl">You've entered a Saturn season.</h2>
      <p className="mt-2 text-sm text-paper/60">
        Since Jan 2023 you're inside <span className="text-amber-200">Sade Sati</span> — Saturn's 7.5-year
        pass over your moon. Not punishment. Sculpting.
      </p>
      <div className="mt-6 space-y-3">
        <Impact k="Mahadasha" v="Saturn · 22% in" tone="rose" />
        <Impact k="Antardasha" v="Venus (soft window)" tone="amber" />
        <Impact k="Mercury" v="Retrograde in 7H — re-read every contract" tone="indigo" />
        <Impact k="Jupiter" v="Expanding your 7H — meaningful partners" tone="emerald" />
      </div>
      <p className="mt-5 text-sm italic text-paper/70">
        "This is the year the old shape breaks so a real one can be built."
      </p>
      <NextBtn onNext={onNext} label="What do I do about it?" />
    </div>
  );
}

function Impact({ k, v, tone }: { k: string; v: string; tone: string }) {
  const map: Record<string, string> = {
    rose: "border-rose-200/30 bg-rose-500/10",
    amber: "border-amber-200/30 bg-amber-500/10",
    indigo: "border-indigo-200/30 bg-indigo-500/10",
    emerald: "border-emerald-200/30 bg-emerald-500/10",
  };
  return (
    <div className={`rounded-xl border p-3 ${map[tone]}`}>
      <div className="text-[10px] uppercase tracking-widest text-paper/50">{k}</div>
      <div className="mt-0.5 text-sm text-paper">{v}</div>
    </div>
  );
}

/* ─────────── 9. Remedy ─────────── */
function Remedy({ onNext }: { onNext: () => void }) {
  const items = [
    { icon: <Flame className="h-4 w-4" />, k: "Mantra", v: "Om Sham Shanaishcharaya Namah · 108×" },
    { icon: <Gem className="h-4 w-4" />, k: "Stone", v: "Blue Sapphire (Neelam) — test 3 days first" },
    { icon: <HandHeart className="h-4 w-4" />, k: "Karma act", v: "Feed a stranger on Saturdays" },
    { icon: <Sparkles className="h-4 w-4" />, k: "Colors", v: "Navy · Black — signal depth" },
    { icon: <Check className="h-4 w-4" />, k: "Frequency", v: "174 Hz — grounding" },
  ];
  return (
    <div className="flex flex-1 flex-col justify-center">
      <div className="text-[10px] uppercase tracking-[0.3em] text-paper/50">Your remedy set · Upaya</div>
      <h2 className="mt-3 font-serif text-3xl">Small acts. Steady sky.</h2>
      <p className="mt-2 text-sm text-paper/60">
        Vedic remedies aren't magic — they're daily gestures that align your inner state with the planet in question.
      </p>
      <div className="mt-6 space-y-2">
        {items.map((it, i) => (
          <div key={i} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-200/10 text-amber-200">{it.icon}</div>
            <div className="flex-1">
              <div className="text-[10px] uppercase tracking-widest text-paper/50">{it.k}</div>
              <div className="text-sm text-paper">{it.v}</div>
            </div>
          </div>
        ))}
      </div>
      <NextBtn onNext={onNext} label="Show me my daily scores" />
    </div>
  );
}

/* ─────────── 10. Scores intro ─────────── */
function Scores({ onNext }: { onNext: () => void }) {
  const scores = [
    { k: "Energy", v: 74, sub: "Your Prana today. Rise + push windows.", from: "oklch(0.78 0.16 55)" },
    { k: "Karma", v: 38, sub: "Points earned by today's acts. Goal 100.", from: "oklch(0.72 0.14 300)" },
    { k: "Sky Pressure", v: 62, sub: "How hard the cosmos is squeezing.", from: "oklch(0.65 0.18 25)" },
  ];
  return (
    <div className="flex flex-1 flex-col justify-center">
      <div className="text-[10px] uppercase tracking-[0.3em] text-paper/50">Your three vital signs</div>
      <h2 className="mt-3 font-serif text-3xl">Every day, three numbers.</h2>
      <p className="mt-2 text-sm text-paper/60">
        Not a horoscope. A dashboard. You check it like weather — and act with it.
      </p>
      <div className="mt-6 space-y-3">
        {scores.map((s) => (
          <div key={s.k} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <div className="flex items-baseline justify-between">
              <div className="text-[10px] uppercase tracking-widest text-paper/60">{s.k}</div>
              <div className="font-serif text-3xl" style={{ color: s.from }}>{s.v}</div>
            </div>
            <div className="mt-2 h-1.5 rounded-full bg-white/5 overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${s.v}%`, background: s.from }} />
            </div>
            <p className="mt-2 text-xs text-paper/50">{s.sub}</p>
          </div>
        ))}
      </div>
      <NextBtn onNext={onNext} label="Open my chart chat" />
    </div>
  );
}

/* ─────────── 11. Chat teaser ─────────── */
function ChatTeaser({ onNext }: { onNext: () => void }) {
  const [q, setQ] = useState("");
  return (
    <div className="flex flex-1 flex-col justify-center">
      <div className="text-[10px] uppercase tracking-[0.3em] text-paper/50">Ask your chart · unlocked next</div>
      <h2 className="mt-3 font-serif text-3xl">Talk to your kundali.</h2>
      <p className="mt-2 text-sm text-paper/60">
        Any question — a job, a person, a decision — answered against your real chart, not a generic sun sign.
      </p>

      <div className="mt-6 space-y-3">
        {["Should I take the Bangalore offer?", "Is this the right person?", "When will Sade Sati ease?"].map((s) => (
          <div key={s} className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-paper/70">
            {planetGlyph.Saturn} <span className="italic">"{s}"</span>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] p-2 pl-4">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Ask your chart…"
          className="flex-1 bg-transparent text-sm text-paper placeholder:text-paper/40 focus:outline-none"
          onFocus={onNext}
        />
        <button
          onClick={onNext}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-200 text-cosmos"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
      <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-paper/40">
        <Lock className="h-3 w-3" /> requires membership · continue
      </div>
    </div>
  );
}

/* ─────────── 12. Paywall (UPI Autopay ₹1/mo) ─────────── */
function Paywall({ onDone }: { onDone: () => void }) {
  return (
    <div className="flex flex-1 flex-col justify-center">
      <div className="text-[10px] uppercase tracking-[0.3em] text-paper/50">Membership · introductory</div>
      <h2 className="mt-3 font-serif text-3xl">
        <span className="text-amber-200">₹1</span> / month.
        <br />Cancel anytime.
      </h2>
      <p className="mt-2 text-sm text-paper/60">
        Your first month is basically free — we want you to see the daily loop actually work before you decide.
      </p>

      <div className="mt-6 rounded-2xl border border-amber-200/30 bg-gradient-to-b from-amber-200/10 to-transparent p-5">
        <div className="text-[10px] uppercase tracking-widest text-amber-200">Included</div>
        <ul className="mt-3 space-y-2 text-sm">
          {[
            "Daily Energy · Karma · Sky Pressure",
            "Unlimited chart chat (ask anything)",
            "Live Panchanga, Muhurta, Transits",
            "Personalized remedies + reminders",
            "Sade Sati & Dasha tracking",
          ].map((f) => (
            <li key={f} className="flex items-center gap-2 text-paper/90">
              <Check className="h-4 w-4 text-amber-200" /> {f}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.04] p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-paper">UPI Autopay</div>
            <div className="text-[11px] text-paper/50">via Google Play · GPay · PhonePe · Paytm</div>
          </div>
          <div className="flex gap-1.5 text-[10px] font-medium">
            <span className="rounded bg-white/10 px-1.5 py-0.5">UPI</span>
            <span className="rounded bg-white/10 px-1.5 py-0.5">▶ Play</span>
          </div>
        </div>
      </div>

      <button
        onClick={onDone}
        className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-amber-200 px-6 py-3.5 text-sm font-semibold text-cosmos"
      >
        <Loader2Idle /> Start · ₹1/month with UPI Autopay
      </button>
      <button
        onClick={onDone}
        className="mt-2 text-[11px] uppercase tracking-widest text-paper/40 hover:text-paper/70"
      >
        Continue without membership (limited)
      </button>
      <p className="mt-4 text-[10px] leading-relaxed text-paper/40">
        Introductory pricing for first 3 months. After that, ₹149/month unless cancelled. Manage subscription
        anytime from Google Play → Subscriptions.
      </p>
    </div>
  );
}

function Loader2Idle() {
  return <Sparkles className="h-4 w-4" />;
}

/* ─────────── shared ─────────── */
function NextBtn({ onNext, label }: { onNext: () => void; label: string }) {
  return (
    <button
      onClick={onNext}
      className="mt-8 inline-flex items-center justify-center gap-2 self-start rounded-full bg-paper px-5 py-2.5 text-sm font-medium text-cosmos"
    >
      {label} <ArrowRight className="h-4 w-4" />
    </button>
  );
}
