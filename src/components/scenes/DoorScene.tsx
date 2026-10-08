import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroWorld from "@/assets/hero-world.jpg";
import figure from "@/assets/figure.png";
import { identity } from "@/content/portfolio";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

/**
 * Scroll-scrubbed door sequence.
 * One GSAP timeline animates five CSS variables on the section
 * (--intro, --walk, --open, --through, --zoom). Every visual layer
 * derives its transform/opacity from those variables, so scrubbing
 * backwards reverses the whole story for free.
 */
export function DoorScene() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.set(el, { "--intro": 1, "--walk": 0, "--open": 0, "--through": 0, "--zoom": 0 });
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: { trigger: el, start: "top top", end: "bottom bottom", scrub: 0.8 },
          })
          .to(el, { "--intro": 0, duration: 1.6 }, 0)
          .to(el, { "--walk": 1, duration: 5, ease: "power1.inOut" }, 0.3)
          .to(el, { "--open": 1, duration: 2.4, ease: "power2.out" }, 2.8)
          .to(el, { "--through": 1, duration: 1.6 }, 5.3)
          .to(el, { "--zoom": 1, duration: 3.6, ease: "power2.in" }, 5.6);
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative h-[420vh] motion-reduce:h-screen" aria-label="Introduction">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div
          className="absolute inset-0 will-change-transform"
          style={{ transform: "scale(calc(1 + var(--walk) * 0.12 + var(--zoom) * 5))", transformOrigin: "50% 46%" }}
        >
          <img src={heroWorld} alt="" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-night opacity-0 transition-opacity duration-700 dark:opacity-55" />

          {/* Doorway */}
          <div
            className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-[78%]"
            style={{ width: "clamp(90px, 9vw, 150px)", aspectRatio: "1 / 2.1", perspective: "900px" }}
          >
            <div className="door-light absolute -inset-[60%] rounded-full blur-2xl" style={{ opacity: "calc(0.25 + var(--open) * 0.75)" }} />
            <div className="door-light absolute inset-0" style={{ opacity: "calc(0.15 + var(--open))" }} />
            <div className="absolute -inset-[3px] border border-glass-edge" />
            <div className="door-leaf absolute inset-0 origin-left" style={{ transform: "rotateY(calc(var(--open) * -82deg))" }} />
            <div className="door-light absolute left-0 top-full h-[70%] w-full blur-md" style={{ transform: "scaleY(-1)", opacity: "calc(0.15 + var(--open) * 0.5)" }} />
          </div>

          {/* Figure */}
          <img
            src={figure}
            alt="A figure walking toward the doorway"
            width={640}
            height={1280}
            className="pointer-events-none absolute left-1/2 w-auto max-w-none will-change-transform"
            style={{
              height: "38vh",
              bottom: "calc(2vh + var(--walk) * 44vh)",
              transform: "translateX(-50%) scale(calc(1 - var(--walk) * 0.82))",
              transformOrigin: "50% 100%",
              opacity: "calc(1 - var(--through))",
              filter: "drop-shadow(0 18px 18px oklch(0.3 0.03 260 / 0.25))",
            }}
          />
        </div>

        {/* Light flood → next world */}
        <div className="door-light absolute inset-0" style={{ opacity: "calc(var(--zoom) * var(--zoom))" }} />
        <div className="absolute inset-0 bg-background" style={{ opacity: "calc(max(0, var(--zoom) - 0.7) * 3.3)" }} />

        <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-6 py-8 md:px-14 md:py-10">
          <span className="font-display text-2xl tracking-tight">PM</span>
          <div className="flex items-center gap-6 md:gap-10">
            <nav className="eyebrow hidden gap-10 text-muted-foreground sm:flex" style={{ opacity: "var(--intro)" }}>
              <a href="#work" className="hover:text-foreground">Work</a>
              <a href="#about" className="hover:text-foreground">About</a>
              <a href="#contact" className="hover:text-foreground">Contact</a>
            </nav>
            <ThemeToggle />
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 flex flex-col justify-between px-6 pb-8 pt-28 md:px-14 md:pb-10" style={{ opacity: "var(--intro)" }}>
          <span />
          <div className="max-w-xl" style={{ transform: "translateY(calc((1 - var(--intro)) * -40px))" }}>
            <p className="eyebrow text-muted-foreground">{identity.roles.join(" · ")}</p>
            <h1 className="mt-5 font-display text-6xl leading-[0.92] tracking-tight md:text-8xl">
              Prakash<br />Mannam
            </h1>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">{identity.statement}</p>
          </div>
          <div className="flex items-end justify-between">
            <span className="eyebrow text-muted-foreground">{identity.location}</span>
            <span className="eyebrow flex items-center gap-3 text-muted-foreground">
              Scroll to enter
              <span className="block h-10 w-px bg-foreground/40" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
