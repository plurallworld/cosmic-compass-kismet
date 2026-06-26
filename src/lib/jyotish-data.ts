// Mock daily data for Jyotish. In production this would come from server fn.

export type Planet =
  | "Sun" | "Moon" | "Mars" | "Mercury" | "Jupiter"
  | "Venus" | "Saturn" | "Rahu" | "Ketu";

export const planetGlyph: Record<Planet, string> = {
  Sun: "☉", Moon: "☾", Mars: "♂", Mercury: "☿", Jupiter: "♃",
  Venus: "♀", Saturn: "♄", Rahu: "☊", Ketu: "☋",
};

export const today = {
  user: { name: "Ankur", soulTier: "Karma Yogi", lifetimeKarma: 3420, dayNumber: 14 },
  date: new Date(),
  energy: 74,
  karma: { earnedToday: 38, dailyGoal: 100, petalsLit: 3, petalsTotal: 8 },
  pressure: 62,
  pressureLabel: "Moderate",
  multiplier: 1.6,
  dominantPlanet: "Saturn" as Planet,
  mahadasha: "Saturn",
  antardasha: "Venus",
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
    { time: "6:42 am", title: "Brahma Muhurta", quality: "auspicious" as const, note: "Stillness and intention" },
    { time: "10:15 am", title: "Jupiter hora", quality: "peak" as const, note: "Decisions, creative work" },
    { time: "1:30 pm", title: "Rahu kala", quality: "avoid" as const, note: "Avoid new starts" },
    { time: "5:50 pm", title: "Twilight sandhya", quality: "auspicious" as const, note: "Reflection, gratitude" },
  ],
  watching: [
    { area: "Career", status: "Rising tension", trend: "up" as const, note: "10th house activated through Friday." },
    { area: "Relationships", status: "Soft window", trend: "soft" as const, note: "Venus favorable — old bonds revisit." },
    { area: "Health", status: "Hold steady", trend: "flat" as const, note: "6th house pressure easing." },
  ],
  dimensions: [
    { name: "Career", score: 78, hint: "Push, but quietly." },
    { name: "Love", score: 64, hint: "A gentle window opens." },
    { name: "Health", score: 70, hint: "Rest equals recovery." },
    { name: "Wealth", score: 55, hint: "Avoid large moves." },
    { name: "Family", score: 60, hint: "A small kindness lands." },
    { name: "Mind", score: 72, hint: "Clarity returns slowly." },
    { name: "Spirit", score: 81, hint: "Saturn deepens you." },
    { name: "Travel", score: 48, hint: "Hold plans loosely." },
  ],
  intervention: {
    title: "A note on what you're navigating",
    body: "Ankur, you've been in a Saturn Mahadasha for three years now. The slowdown, the feeling that others are moving faster — it isn't evidence that something is wrong with you. Saturn's job is to test whether the structures of your life are built on reality. You are not behind. You are being built.",
  },
};
