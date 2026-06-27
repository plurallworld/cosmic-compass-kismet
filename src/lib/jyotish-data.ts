// Mock daily data for Jyotish. In production this would come from server fn.

export type Planet =
  | "Sun" | "Moon" | "Mars" | "Mercury" | "Jupiter"
  | "Venus" | "Saturn" | "Rahu" | "Ketu";

export const planetGlyph: Record<Planet, string> = {
  Sun: "☉", Moon: "☾", Mars: "♂", Mercury: "☿", Jupiter: "♃",
  Venus: "♀", Saturn: "♄", Rahu: "☊", Ketu: "☋",
};

export const planetColor: Record<Planet, string> = {
  Sun: "oklch(0.72 0.18 55)",
  Moon: "oklch(0.85 0.04 230)",
  Mars: "oklch(0.55 0.20 25)",
  Mercury: "oklch(0.68 0.12 145)",
  Jupiter: "oklch(0.72 0.14 75)",
  Venus: "oklch(0.78 0.10 320)",
  Saturn: "oklch(0.42 0.06 280)",
  Rahu: "oklch(0.38 0.08 295)",
  Ketu: "oklch(0.55 0.10 35)",
};

export const houseMeaning: Record<number, string> = {
  1: "Self · body · vitality",
  2: "Wealth · speech · family",
  3: "Effort · siblings · courage",
  4: "Home · mother · heart",
  5: "Creativity · children · mantra",
  6: "Service · debt · obstacles",
  7: "Partners · contracts · the other",
  8: "Hidden · transformation · inheritance",
  9: "Dharma · teacher · long journeys",
  10: "Career · public life · authority",
  11: "Gains · networks · fulfillment",
  12: "Loss · sleep · liberation · the foreign",
};

export const today = {
  user: {
    name: "Ankur",
    soulTier: "Karma Yogi",
    nextTier: "Light Bearer",
    lifetimeKarma: 3420,
    karmaToNextTier: 580,
    dayNumber: 14,
    moonSign: "Vrishchika (Scorpio)",
    sunSign: "Mithuna (Gemini)",
    birthNakshatra: "Anuradha",
  },
  date: new Date(),
  energy: 74,
  karma: { earnedToday: 38, dailyGoal: 100, petalsLit: 3, petalsTotal: 8 },
  pressure: 62,
  pressureLabel: "Moderate",
  multiplier: 1.6,
  dominantPlanet: "Saturn" as Planet,
  mahadasha: "Saturn",
  antardasha: "Venus",
  pratyantardasha: "Mercury",
  ascendant: "Scorpio",
  headline: "A good day to push on what you've been building.",
  dailyAct: {
    context: "Your Venus is strong today",
    prompt: "Call someone you haven't spoken to in over a month. The connection matters more than you know.",
    points: 20,
  },
  prescriptions: {
    governs: "Saturn" as Planet,
    mantra: { sanskrit: "Om Sham Shanaishcharaya Namah", note: "108 repetitions, or 10 min timer" },
    frequency: { hz: 174, label: "Grounding" },
    meditation: { style: "Vipassana / noting", note: "Observe what arises without changing it." },
    colors: [
      { name: "Navy", hex: "#1e2a4a" },
      { name: "Black", hex: "#0d0d12" },
    ],
    explanation: "Structure and depth — signal seriousness to yourself and others.",
  },
  peak: { primary: "10:15 – 11:15 am", secondary: "2:30 – 3:30 pm", planet: "Jupiter" as Planet },
  muhurta: [
    { time: "4:48 am", title: "Brahma Muhurta", quality: "auspicious" as const, note: "The hour before dawn — set the day's seed." },
    { time: "6:42 am", title: "Sunrise · Sun hora", quality: "auspicious" as const, note: "Stillness, intention, mantra." },
    { time: "10:15 am", title: "Jupiter hora", quality: "peak" as const, note: "Decisions, creative work, signing." },
    { time: "1:30 pm", title: "Rahu kala", quality: "avoid" as const, note: "Avoid new starts and signed commitments." },
    { time: "2:30 pm", title: "Venus hora", quality: "peak" as const, note: "Conversations, repair, beauty work." },
    { time: "5:50 pm", title: "Twilight sandhya", quality: "auspicious" as const, note: "Reflection, gratitude, light a lamp." },
    { time: "8:24 pm", title: "Saturn hora", quality: "neutral" as const, note: "Slow, structural work. Plan tomorrow." },
  ],
  watching: [
    { area: "Career", status: "Rising tension", trend: "up" as const, note: "10th house activated through Friday — visibility increases." },
    { area: "Relationships", status: "Soft window", trend: "soft" as const, note: "Venus favorable — old bonds revisit and want closure." },
    { area: "Health", status: "Hold steady", trend: "flat" as const, note: "6th house pressure easing. Hydrate. Sleep early." },
    { area: "Finances", status: "Steady", trend: "flat" as const, note: "2nd lord stable. Avoid large speculative moves until Mercury direct." },
  ],
  dimensions: [
    { name: "Career", score: 78, hint: "Push, but quietly.", houses: [10, 6], planet: "Saturn" as Planet,
      detail: "Saturn in the 10th asks for steady, visible work. Avoid shortcuts. What you build now compounds for years." },
    { name: "Love", score: 64, hint: "A gentle window opens.", houses: [7, 5], planet: "Venus" as Planet,
      detail: "Venus aspects the 5th — romance, art, play. Existing partnerships feel softer; new meetings carry karma from before." },
    { name: "Health", score: 70, hint: "Rest equals recovery.", houses: [1, 6], planet: "Moon" as Planet,
      detail: "Moon waxing in Scorpio — emotional sensitivity high. Sleep before 11pm. Avoid heavy food at night." },
    { name: "Wealth", score: 55, hint: "Avoid large moves.", houses: [2, 11], planet: "Jupiter" as Planet,
      detail: "Mercury retrograde affects contracts. Review numbers; defer big purchases ~6 days." },
    { name: "Family", score: 60, hint: "A small kindness lands.", houses: [4, 2], planet: "Moon" as Planet,
      detail: "4th house active — call your mother. Old family wounds can soften with one honest sentence." },
    { name: "Mind", score: 72, hint: "Clarity returns slowly.", houses: [3, 5], planet: "Mercury" as Planet,
      detail: "Mercury retrograde — review, re-write, re-read. Insight arrives in the second pass, not the first." },
    { name: "Spirit", score: 81, hint: "Saturn deepens you.", houses: [9, 12], planet: "Jupiter" as Planet,
      detail: "9th lord strong. A teaching or text will find you. Note the words that arrive twice today." },
    { name: "Travel", score: 48, hint: "Hold plans loosely.", houses: [3, 12], planet: "Mars" as Planet,
      detail: "Short trips fine; long-distance carries friction. Confirm bookings twice." },
  ],
  intervention: {
    title: "A note on what you're navigating",
    body: "Ankur, you've been in a Saturn Mahadasha for three years now. The slowdown, the feeling that others are moving faster — it isn't evidence that something is wrong with you. Saturn's job is to test whether the structures of your life are built on reality. You are not behind. You are being built.",
  },

  // ────────────── Layer 2: Panchanga (Vedic almanac) ──────────────
  panchanga: {
    tithi: { name: "Shukla Saptami", number: 7, paksha: "Shukla" as const, percent: 62,
      quality: "Mitra" as const, note: "Bright fortnight — momentum builds." },
    nakshatra: {
      name: "Anuradha", number: 17, pada: 2,
      deity: "Mitra (god of friendship)",
      symbol: "Lotus · staff",
      ruler: "Saturn" as Planet,
      gana: "Deva" as const,
      note: "Devotion ripens. Old friendships return. Good for sustained effort, poor for impulsive starts.",
      until: "until 9:42 pm",
    },
    yoga: { name: "Siddhi", note: "Accomplishment — work begun now completes." },
    karana: { name: "Vanija", note: "Trade, exchange, negotiation favored." },
    vara: { name: "Shanivara", planet: "Saturn" as Planet, note: "Saturn's day — discipline, service, ancestors." },
    sunrise: "6:42 am",
    sunset: "5:50 pm",
    moonrise: "11:08 am",
    moonset: "11:14 pm",
    moonPhase: 0.62, // 0..1 waxing
  },

  // ────────────── Layer 2: Transits ──────────────
  transits: [
    { planet: "Sun" as Planet, sign: "Gemini", house: 8, deg: 12.4, retro: false, recent: false,
      note: "Sun in 8th — research, depth, hidden gains." },
    { planet: "Moon" as Planet, sign: "Scorpio", house: 1, deg: 18.2, retro: false, recent: true,
      note: "Moon over ascendant — you feel everything double." },
    { planet: "Mars" as Planet, sign: "Cancer", house: 9, deg: 4.1, retro: false, recent: true,
      note: "Debilitated Mars — patience with teachers." },
    { planet: "Mercury" as Planet, sign: "Taurus", house: 7, deg: 22.9, retro: true, recent: false,
      note: "Retrograde in 7th — re-read every contract." },
    { planet: "Jupiter" as Planet, sign: "Taurus", house: 7, deg: 8.6, retro: false, recent: false,
      note: "Jupiter expands the 7th — meaningful partners arrive." },
    { planet: "Venus" as Planet, sign: "Gemini", house: 8, deg: 28.0, retro: false, recent: false,
      note: "Venus in 8th — intimacy as alchemy." },
    { planet: "Saturn" as Planet, sign: "Aquarius", house: 4, deg: 15.3, retro: false, recent: false,
      note: "Saturn through 4th — restructure home and heart." },
    { planet: "Rahu" as Planet, sign: "Pisces", house: 5, deg: 9.1, retro: true, recent: false,
      note: "Rahu in 5th — obsession around creativity / a child." },
    { planet: "Ketu" as Planet, sign: "Virgo", house: 11, deg: 9.1, retro: true, recent: false,
      note: "Ketu cuts ties in friend networks — release what's done." },
  ],

  // ────────────── Layer 2: Dasha tree (running periods) ──────────────
  dashaTree: {
    maha: { planet: "Saturn" as Planet, start: "2022-04-11", end: "2041-04-11", percent: 22 },
    antar: { planet: "Venus" as Planet, start: "2025-04-02", end: "2028-06-02", percent: 38 },
    pratyantar: { planet: "Mercury" as Planet, start: "2026-05-18", end: "2026-09-24", percent: 28 },
    upcoming: [
      { level: "Antardasha" as const, from: "Venus", to: "Sun", at: "Jun 2028" },
      { level: "Mahadasha" as const, from: "Saturn", to: "Mercury", at: "Apr 2041" },
    ],
  },

  // ────────────── Layer 3: Sade Sati & Kantaka Shani ──────────────
  sadeSati: {
    active: true,
    phase: "Peak (2nd phase)" as const,
    startedAt: "Jan 2023",
    endsAt: "Mar 2026",
    percent: 64,
    note: "Saturn transits over your moon sign — the deep work years. Not punishment; sculpting.",
  },

  // ────────────── Layer 3: Weekly forecast ──────────────
  weekly: [
    { day: "Mon", energy: 58, karma: 24, pressure: 70 },
    { day: "Tue", energy: 62, karma: 30, pressure: 68 },
    { day: "Wed", energy: 70, karma: 42, pressure: 64 },
    { day: "Thu", energy: 66, karma: 36, pressure: 66 },
    { day: "Fri", energy: 74, karma: 38, pressure: 62 }, // today
    { day: "Sat", energy: 78, karma: 50, pressure: 54 },
    { day: "Sun", energy: 72, karma: 44, pressure: 58 },
  ],

  // ────────────── Layer 3: Soul tier ladder ──────────────
  soulTiers: [
    { name: "Seeker", at: 0 },
    { name: "Wayfarer", at: 500 },
    { name: "Karma Yogi", at: 2000 },
    { name: "Light Bearer", at: 4000 },
    { name: "Bodhisattva", at: 8000 },
    { name: "Rishi", at: 16000 },
  ],

  // ────────────── Layer 3: Karma breakdown by dimension ──────────────
  karmaBreakdown: [
    { dimension: "Family", points: 880 },
    { dimension: "Service", points: 720 },
    { dimension: "Friends", points: 540 },
    { dimension: "Strangers", points: 480 },
    { dimension: "Self-discipline", points: 460 },
    { dimension: "Earth", points: 340 },
  ],
};

// Stable formatted date (avoids SSR/client locale hydration mismatch).
export function formatJyotishDate(d: Date) {
  const weekdays = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${weekdays[d.getUTCDay()]}, ${months[d.getUTCMonth()]} ${d.getUTCDate()}`;
}
