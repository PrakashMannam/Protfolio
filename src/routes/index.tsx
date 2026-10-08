import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, type ReactNode } from "react";
import { DoorScene } from "@/components/DoorScene";
import campusWorld from "@/assets/campus-world.jpg";
import redisWorld from "@/assets/redis-world.jpg";
import heroWorld from "@/assets/hero-world.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Prakash Mannam — Java Backend Engineer" },
      {
        name: "description",
        content:
          "Prakash Mannam builds backend systems and full-stack products with Java, Spring Boot, and React.",
      },
      { property: "og:title", content: "Prakash Mannam — Java Backend Engineer" },
      {
        property: "og:description",
        content: "Step through the doorway into the work of Prakash Mannam.",
      },
    ],
  }),
  component: Index,
});

function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("reveal-in");
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ animationDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

const CC_LINKS = [
  { label: "Live", href: "https://campuscoders-theta.vercel.app" },
  { label: "GitHub", href: "https://github.com/PrakashMannam/Campuscoders" },
  { label: "API Docs", href: "https://campuscoders-backend-production.up.railway.app/swagger-ui.html" },
];

const LAYERS = ["React", "REST API", "Spring Security", "Application Logic", "JPA / Hibernate", "MySQL"];
const FLOW = ["TCP", "Socket", "Command", "Memory", "Response"];
const TECH = [
  "Java", "Spring Boot", "Spring Security", "React", "MySQL", "JPA / Hibernate",
  "JavaScript", "JUnit", "Docker", "Networking", "DSA",
];

function Index() {
  return (
    <main className="overflow-x-hidden">
      <DoorScene />

      {/* SCENE 03 — Campus Coders */}
      <section id="work" className="relative min-h-screen">
        <img src={campusWorld} alt="" loading="lazy" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/30 to-background/0" />
        <div className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-16 px-6 py-32 md:grid-cols-[1fr_1.2fr] md:px-14">
          <Reveal>
            <p className="eyebrow text-muted-foreground">01 — Project</p>
            <h2 className="mt-5 font-display text-6xl leading-[0.95] md:text-8xl">Campus<br />Coders</h2>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
              A student-led DSA &amp; community platform.
            </p>
            <div className="mt-10 flex flex-wrap gap-6">
              {CC_LINKS.map((l) => (
                <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="eyebrow border-b border-foreground/40 pb-1 transition-colors hover:border-foreground">
                  {l.label} ↗
                </a>
              ))}
            </div>
          </Reveal>
          <Reveal delay={200} className="float-slow">
            <a href={CC_LINKS[0].href} target="_blank" rel="noreferrer" className="glass-panel block overflow-hidden rounded-xl [transform:perspective(1400px)_rotateY(-12deg)_rotateX(4deg)]">
              <div className="flex items-center gap-2 border-b border-glass-edge px-4 py-3">
                <span className="h-2 w-2 rounded-full bg-foreground/20" />
                <span className="h-2 w-2 rounded-full bg-foreground/20" />
                <span className="h-2 w-2 rounded-full bg-foreground/20" />
                <span className="ml-3 text-[11px] text-muted-foreground">campuscoders-theta.vercel.app</span>
              </div>
              <div className="relative aspect-[16/10] bg-background/40">
                <iframe
                  src={CC_LINKS[0].href}
                  title="Campus Coders live interface"
                  loading="lazy"
                  className="pointer-events-none absolute left-0 top-0 h-[200%] w-[200%] origin-top-left scale-50 border-0"
                />
              </div>
            </a>
          </Reveal>
        </div>
      </section>

      {/* SCENE 04 — Architecture */}
      <section className="relative bg-background py-40">
        <div className="mx-auto max-w-5xl px-6 md:px-14">
          <Reveal>
            <p className="eyebrow text-muted-foreground">Inside Campus Coders</p>
            <h3 className="mt-4 font-display text-4xl md:text-5xl">How a request travels.</h3>
          </Reveal>
          <div className="relative mt-24 flex flex-col items-center" style={{ perspective: "1200px" }}>
            <div className="absolute inset-y-0 left-1/2 w-px bg-gradient-to-b from-transparent via-foreground/25 to-transparent" />
            {LAYERS.map((l, i) => (
              <Reveal key={l} delay={i * 120} className="relative my-3 w-full">
                <div
                  className="glass-panel mx-auto flex items-center justify-between rounded-sm px-8 py-6"
                  style={{ width: `${88 - i * 9}%`, transform: "rotateX(38deg)" }}
                >
                  <span className="eyebrow text-muted-foreground">0{i + 1}</span>
                  <span className="font-display text-2xl md:text-3xl">{l}</span>
                  <span className="eyebrow text-muted-foreground">↓</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SCENE 05 — MiniRedis */}
      <section className="relative min-h-screen bg-night text-night-foreground">
        <div className="h-40 bg-gradient-to-b from-background to-night" />
        <div className="relative">
          <img src={redisWorld} alt="" loading="lazy" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-b from-night via-night/20 to-night" />
          <div className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-16 px-6 py-32 md:grid-cols-2 md:px-14">
            <Reveal>
              <p className="eyebrow text-moon">02 — Project</p>
              <h2 className="mt-5 font-display text-6xl md:text-8xl">MiniRedis</h2>
              <p className="mt-6 max-w-sm text-sm leading-relaxed text-night-foreground/70">
                An in-memory database and networking experiment built in Java.
              </p>
              <div className="mt-14 flex flex-wrap items-center gap-3">
                {FLOW.map((f, i) => (
                  <span key={f} className="flex items-center gap-3">
                    <span className="glass-night rounded-sm px-4 py-2 text-xs tracking-widest">{f}</span>
                    {i < FLOW.length - 1 && <span className="text-moon/60">→</span>}
                  </span>
                ))}
              </div>
            </Reveal>
            <Reveal delay={250} className="float-slow">
              <div className="glass-night rounded-lg p-8 font-mono text-sm leading-7" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                <p><span className="text-moon/60">127.0.0.1:6379&gt;</span> PING</p>
                <p className="text-moon">+PONG</p>
                <p className="mt-3"><span className="text-moon/60">127.0.0.1:6379&gt;</span> SET name prakash</p>
                <p className="text-moon">+OK</p>
                <p className="mt-3"><span className="text-moon/60">127.0.0.1:6379&gt;</span> GET name</p>
                <p className="text-moon">prakash</p>
                <p className="mt-3"><span className="text-moon/60">127.0.0.1:6379&gt;</span> <span className="caret">▍</span></p>
              </div>
            </Reveal>
          </div>
        </div>
        <div className="h-40 bg-gradient-to-b from-night to-background" />
      </section>

      {/* SCENE 06 — Technologies */}
      <section className="relative bg-background py-40">
        <div className="mx-auto max-w-6xl px-6 text-center md:px-14">
          <Reveal>
            <p className="eyebrow text-muted-foreground">What I work with</p>
          </Reveal>
          <div className="mx-auto mt-16 flex max-w-4xl flex-wrap justify-center gap-x-10 gap-y-8">
            {TECH.map((t, i) => (
              <Reveal key={t} delay={i * 70}>
                <span className={`font-display ${i % 3 === 0 ? "text-5xl md:text-6xl" : i % 3 === 1 ? "text-3xl md:text-4xl text-muted-foreground" : "text-4xl md:text-5xl italic"}`}>
                  {t}
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SCENE 07 — About */}
      <section id="about" className="relative bg-background py-32">
        <div className="mx-auto grid max-w-6xl gap-16 px-6 md:grid-cols-2 md:px-14">
          <Reveal>
            <p className="eyebrow text-muted-foreground">About</p>
            <h2 className="mt-5 font-display text-5xl md:text-6xl">Prakash Mannam</h2>
            <p className="mt-8 text-sm leading-7 text-muted-foreground">
              B.Tech — Computer Science &amp; Engineering<br />
              QIS College of Engineering and Technology<br />
              Ongole, Andhra Pradesh<br />
              Graduating 2027
            </p>
          </Reveal>
          <Reveal delay={200} className="self-end">
            <p className="font-display text-2xl leading-snug md:text-3xl">
              I'm drawn to what happens beneath the interface — APIs, databases, and the systems that hold them together.
              I learn by building, and turn that understanding into working software.
            </p>
          </Reveal>
        </div>
      </section>

      {/* SCENE 08 — Ending */}
      <section id="contact" className="relative min-h-screen overflow-hidden">
        <img src={heroWorld} alt="" loading="lazy" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/40 to-background" />
        <div className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
          <div className="door-light mb-12 h-40 w-20 border border-glass-edge opacity-80" />
          <Reveal>
            <h2 className="font-display text-6xl md:text-8xl">Let's build something.</h2>
          </Reveal>
          <Reveal delay={200}>
            <nav className="mt-14 flex flex-wrap justify-center gap-8">
              {[
                ["GitHub", "https://github.com/PrakashMannam"],
                ["LinkedIn", "https://www.linkedin.com/"],
                ["Codolio", "https://codolio.com/"],
                ["Email", "mailto:hello@example.com"],
                ["Resume", "#"],
              ].map(([l, h]) => (
                <a key={l} href={h} target="_blank" rel="noreferrer" className="eyebrow border-b border-foreground/40 pb-1 transition-colors hover:border-foreground">
                  {l}
                </a>
              ))}
            </nav>
          </Reveal>
          <p className="eyebrow absolute bottom-8 text-muted-foreground">© 2026 Prakash Mannam · Always learning, always building</p>
        </div>
      </section>
    </main>
  );
}
