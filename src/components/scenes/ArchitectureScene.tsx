import { useState } from "react";
import { campusCoders } from "@/content/portfolio";
import { Reveal } from "@/components/ui/Reveal";

export function ArchitectureScene() {
  const [active, setActive] = useState<number | null>(null);
  const layers = campusCoders.layers;

  return (
    <section className="relative bg-background py-40">
      <div className="mx-auto max-w-5xl px-6 md:px-14">
        <Reveal>
          <p className="eyebrow text-muted-foreground">Inside Campus Coders</p>
          <h3 className="mt-4 font-display text-4xl md:text-5xl">How a request travels.</h3>
          <p className="mt-3 text-xs text-muted-foreground">Hover or tap a layer.</p>
        </Reveal>
        <div className="relative mt-20 flex flex-col items-center" style={{ perspective: "1200px" }}>
          <div className="absolute inset-y-0 left-1/2 w-px bg-gradient-to-b from-transparent via-foreground/25 to-transparent" />
          {layers.map((l, i) => {
            const on = active === i;
            return (
              <Reveal key={l.name} delay={i * 100} className="relative my-2 w-full">
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(on ? null : i)}
                  aria-expanded={on}
                  className="glass-panel mx-auto block rounded-sm px-8 text-left transition-all duration-500"
                  style={{
                    width: `${on ? 92 : 86 - i * 6}%`,
                    transform: on ? "rotateX(0deg) translateZ(30px)" : "rotateX(38deg)",
                    paddingTop: on ? 28 : 20,
                    paddingBottom: on ? 28 : 20,
                  }}
                >
                  <span className="flex items-center justify-between gap-4">
                    <span className="eyebrow text-muted-foreground">0{i + 1}</span>
                    <span className="font-display text-2xl md:text-3xl">{l.name}</span>
                    <span className="eyebrow text-muted-foreground">{i < layers.length - 1 ? "↓" : "■"}</span>
                  </span>
                  <span
                    className="block overflow-hidden text-center text-sm text-muted-foreground transition-all duration-500"
                    style={{ maxHeight: on ? 60 : 0, opacity: on ? 1 : 0, marginTop: on ? 12 : 0 }}
                  >
                    {l.note}
                  </span>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
