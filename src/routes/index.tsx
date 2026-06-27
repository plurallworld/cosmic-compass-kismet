import { createFileRoute } from "@tanstack/react-router";
import { CosmicHero } from "@/components/jyotish/CosmicHero";
import { TabBar } from "@/components/jyotish/TabBar";
import { Panchanga } from "@/components/jyotish/Panchanga";
import { NakshatraCard } from "@/components/jyotish/NakshatraCard";
import { Watching } from "@/components/jyotish/Watching";
import { PrescriptionCard } from "@/components/jyotish/PrescriptionCard";
import { MuhurtaTimeline } from "@/components/jyotish/MuhurtaTimeline";
import { DashaTree } from "@/components/jyotish/DashaTree";
import { SadeSati } from "@/components/jyotish/SadeSati";
import { WeeklyForecast } from "@/components/jyotish/WeeklyForecast";
import { SignalGrid } from "@/components/jyotish/SignalGrid";
import { InterventionCard } from "@/components/jyotish/InterventionCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Today · Jyotish" },
      { name: "description", content: "Your daily vital signs — Energy, Karma, Sky Pressure. The stars set the conditions; you write the story." },
    ],
  }),
  component: Today,
});

function Today() {
  return (
    <div className="min-h-screen bg-paper pb-24">
      <CosmicHero />
      <main className="mx-auto max-w-2xl space-y-7 px-5 pt-7">
        <Panchanga />
        <NakshatraCard />
        <Watching />
        <PrescriptionCard />
        <MuhurtaTimeline />
        <InterventionCard />
        <DashaTree />
        <SadeSati />
        <WeeklyForecast />
        <SignalGrid />
      </main>
      <TabBar />
    </div>
  );
}
