import campusWorld from "@/assets/campus-world.jpg";
import { campusCoders } from "@/content/portfolio";
import { Reveal } from "@/components/ui/Reveal";

export function CampusScene() {
  return (
    <section id="work" className="relative min-h-screen">
      <img src={campusWorld} alt="" loading="lazy" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/30 to-background" />
      <div className="absolute inset-0 bg-night opacity-0 transition-opacity duration-700 dark:opacity-50" />
      <div className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-16 px-6 py-32 md:grid-cols-[1fr_1.2fr] md:px-14">
        <Reveal>
          <p className="eyebrow text-muted-foreground">01 — Project</p>
          <h2 className="mt-5 font-display text-6xl leading-[0.95] md:text-8xl">Campus<br />Coders</h2>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">{campusCoders.tagline}</p>
          <div className="mt-10 flex flex-wrap gap-6">
            {campusCoders.links.map((l) => (
              <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="eyebrow border-b border-foreground/40 pb-1 transition-colors hover:border-foreground">
                {l.label} ↗
              </a>
            ))}
          </div>
        </Reveal>
        <Reveal delay={200} className="float-slow">
          <a href={campusCoders.live} target="_blank" rel="noreferrer" className="glass-panel block overflow-hidden rounded-xl transition-transform duration-700 [transform:perspective(1400px)_rotateY(-12deg)_rotateX(4deg)] hover:[transform:perspective(1400px)_rotateY(-4deg)_rotateX(2deg)]">
            <div className="flex items-center gap-2 border-b border-glass-edge px-4 py-3">
              <span className="h-2 w-2 rounded-full bg-foreground/20" />
              <span className="h-2 w-2 rounded-full bg-foreground/20" />
              <span className="h-2 w-2 rounded-full bg-foreground/20" />
              <span className="ml-3 text-[11px] text-muted-foreground">campuscoders-theta.vercel.app</span>
            </div>
            <div className="relative aspect-[16/10] bg-background/40">
              <iframe
                src={campusCoders.live}
                title="Campus Coders live interface"
                loading="lazy"
                className="pointer-events-none absolute left-0 top-0 h-[200%] w-[200%] origin-top-left scale-50 border-0"
              />
            </div>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
