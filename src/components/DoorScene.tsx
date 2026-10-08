import { useEffect, useRef } from "react";
import heroWorld from "@/assets/hero-world.jpg";
import figure from "@/assets/figure.png";

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const seg = (p: number, s: number, e: number) => clamp((p - s) / (e - s));
const ease = (t: number) => 1 - Math.pow(1 - t, 3);

export function DoorScene() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      const r = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const p = clamp(-r.top / total);
      const walk = ease(seg(p, 0.05, 0.55));
      const open = ease(seg(p, 0.3, 0.55));
      const through = seg(p, 0.55, 0.72);
      const zoom = ease(seg(p, 0.6, 0.95));
      el.style.setProperty("--walk", String(walk));
      el.style.setProperty("--open", String(open));
      el.style.setProperty("--through", String(through));
      el.style.setProperty("--zoom", String(zoom));
      el.style.setProperty("--intro", String(1 - seg(p, 0, 0.18)));
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={root} className="relative h-[420vh]" aria-label="Introduction">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* World — camera pushes into the doorway */}
        <div
          className="absolute inset-0 will-change-transform"
          style={{
            transform: "scale(calc(1 + var(--walk) * 0.12 + var(--zoom) * 5))",
            transformOrigin: "50% 46%",
          }}
        >
          <img
            src={heroWorld}
            alt=""
            width={1920}
            height={1088}
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* Doorway */}
          <div
            className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-[78%]"
            style={{ width: "clamp(90px, 9vw, 150px)", aspectRatio: "1 / 2.1", perspective: "900px" }}
          >
            <div
              className="door-light absolute -inset-[60%] rounded-full blur-2xl"
              style={{ opacity: "calc(0.25 + var(--open) * 0.75)" }}
            />
            <div
              className="door-light absolute inset-0"
              style={{ opacity: "calc(0.15 + var(--open))" }}
            />
            <div className="absolute -inset-[3px] border border-glass-edge shadow-[var(--shadow-glass)]" />
            <div
              className="door-leaf absolute inset-0 origin-left"
              style={{ transform: "rotateY(calc(var(--open) * -82deg))" }}
            />
            {/* Reflection on glass floor */}
            <div
              className="door-light absolute left-0 top-full h-[70%] w-full opacity-40 blur-md"
              style={{ transform: "scaleY(-1)", opacity: "calc(0.15 + var(--open) * 0.5)" }}
            />
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
              transform:
                "translateX(-50%) scale(calc(1 - var(--walk) * 0.82))",
              transformOrigin: "50% 100%",
              opacity: "calc(1 - var(--through))",
              filter: "drop-shadow(0 18px 18px oklch(0.3 0.03 260 / 0.25))",
            }}
          />
        </div>

        {/* Light flood */}
        <div
          className="door-light absolute inset-0"
          style={{ opacity: "calc(var(--zoom) * var(--zoom))" }}
        />
        <div className="absolute inset-0 bg-background" style={{ opacity: "calc(max(0, var(--zoom) - 0.7) * 3.3)" }} />

        {/* Intro typography */}
        <div
          className="pointer-events-none absolute inset-0 flex flex-col justify-between px-6 py-8 md:px-14 md:py-10"
          style={{ opacity: "var(--intro)" }}
        >
          <header className="pointer-events-auto flex items-center justify-between">
            <span className="font-display text-2xl tracking-tight">PM</span>
            <nav className="eyebrow flex gap-6 text-muted-foreground md:gap-10">
              <a href="#work" className="hover:text-foreground">Work</a>
              <a href="#about" className="hover:text-foreground">About</a>
              <a href="#contact" className="hover:text-foreground">Contact</a>
            </nav>
          </header>

          <div className="max-w-xl" style={{ transform: "translateY(calc((1 - var(--intro)) * -40px))" }}>
            <p className="eyebrow text-muted-foreground">Java Backend Engineer · Full-Stack Developer</p>
            <h1 className="mt-5 font-display text-6xl leading-[0.92] tracking-tight md:text-8xl">
              Prakash
              <br />
              Mannam
            </h1>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
              I build backend systems and full-stack products with Java, Spring Boot, and React.
            </p>
          </div>

          <div className="flex items-end justify-between">
            <span className="eyebrow text-muted-foreground">Ongole, Andhra Pradesh</span>
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
