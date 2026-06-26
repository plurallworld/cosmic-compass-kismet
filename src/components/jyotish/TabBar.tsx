import { Link, useRouterState } from "@tanstack/react-router";
import { Home, User } from "lucide-react";

const tabs = [
  { to: "/", label: "Today", icon: Home },
  { to: "/chart", label: "Chart", icon: null, glyph: "✦" },
  { to: "/you", label: "You", icon: User },
] as const;

export function TabBar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-paper-warm/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-2xl items-center justify-around px-4 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        {tabs.map((t) => {
          const active = pathname === t.to;
          const isCenter = t.to === "/chart";
          return (
            <Link
              key={t.to}
              to={t.to}
              className={`flex flex-1 flex-col items-center gap-0.5 py-1.5 transition ${
                active ? "text-ink" : "text-ink-soft hover:text-ink"
              }`}
            >
              {isCenter ? (
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-full font-serif text-xl transition ${
                    active
                      ? "bg-cosmos text-gold shadow-cosmos"
                      : "bg-secondary text-ink"
                  }`}
                >
                  {t.glyph}
                </span>
              ) : (
                t.icon && <t.icon className="h-5 w-5" strokeWidth={1.6} />
              )}
              <span className="text-[10px] uppercase tracking-[0.15em]">{t.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
