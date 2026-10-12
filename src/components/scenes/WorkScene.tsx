import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { campusCoders, campusCodersMeta, miniRedis, selectedWork } from "@/content/portfolio";
import { createMiniRedisSim } from "@/lib/miniredis-sim";
import { Reveal } from "@/components/ui/Reveal";
import campusUi from "@/assets/campus-ui.jpg";

const PROMPT = "127.0.0.1:6379>";
type Line = { cmd: string; out: string; ok: boolean };
const SEED: Line[] = [
  { cmd: "PING", out: "+PONG", ok: true },
  { cmd: "SET name prakash", out: "+OK", ok: true },
  { cmd: "GET name", out: "prakash", ok: true },
];

/** Decorative glass shards echoing the hero sculpture. Pure CSS, aria-hidden. */
function Shards({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute ${className}`} style={{ perspective: "900px" }}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="shard absolute rounded-[2px]"
          style={{
            width: 90 + i * 30,
            height: 150 + i * 40,
            left: i * 34,
            top: i * 18,
            transform: `rotateY(${-38 + i * 14}deg) rotateZ(${-8 + i * 7}deg)`,
          }}
        />
      ))}
    </div>
  );
}

function Pill({ children }: { children: string }) {
  return <span className="rounded-full border border-foreground/15 bg-background/60 px-4 py-1.5 text-xs text-foreground/80">{children}</span>;
}

function TextLink({ href, children }: { href: string; children: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="eyebrow border-b border-foreground/40 pb-1 transition-colors hover:border-foreground">
      {children} ↗
    </a>
  );
}

function Terminal() {
  const sim = useMemo(() => {
    const s = createMiniRedisSim();
    s.execute("SET name prakash");
    return s;
  }, []);
  const [lines, setLines] = useState<Line[]>(SEED);
  const [input, setInput] = useState("");
  const [step, setStep] = useState(-1);
  const timers = useRef<number[]>([]);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [lines]);

  function submit(e: FormEvent) {
    e.preventDefault();
    const cmd = input.trim();
    if (!cmd) return;
    setInput("");
    const res = sim.execute(cmd);
    timers.current.forEach(clearTimeout);
    timers.current = [];
    const n = miniRedis.path.length;
    for (let i = 0; i < n; i++) timers.current.push(window.setTimeout(() => setStep(i), i * 170));
    timers.current.push(window.setTimeout(() => setLines((l) => [...l.slice(-12), { cmd, out: res.output, ok: res.ok }]), (n - 1) * 170));
    timers.current.push(window.setTimeout(() => setStep(-1), n * 170 + 900));
  }

  return (
    <div className="overflow-hidden rounded-lg border border-moon/20 bg-night text-night-foreground shadow-[var(--shadow-glass)]">
      <div className="flex items-center gap-2 border-b border-moon/15 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-night-foreground/25" />
        <span className="h-2.5 w-2.5 rounded-full bg-night-foreground/25" />
        <span className="h-2.5 w-2.5 rounded-full bg-night-foreground/25" />
        <span className="ml-auto text-[11px] text-night-foreground/50">MiniRedis — Terminal (simulated in browser)</span>
      </div>
      <div className="grid gap-0 md:grid-cols-[1.1fr_1fr]">
        <div className="min-w-0 p-5 font-mono text-[13px] leading-6">
          <div ref={logRef} className="max-h-56 overflow-y-auto pr-2">
            {lines.map((l, i) => (
              <div key={i} className="mb-1.5">
                <p className="truncate"><span className="text-moon/50">{PROMPT}</span> {l.cmd}</p>
                <p className={`break-words ${l.ok ? "text-moon" : "text-destructive"}`}>{l.out}</p>
              </div>
            ))}
          </div>
          <form onSubmit={submit} className="mt-1 flex items-center gap-2">
            <label htmlFor="redis-cmd" className="shrink-0 text-moon/50">{PROMPT}</label>
            <input
              id="redis-cmd"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="SET city ongole"
              autoComplete="off"
              spellCheck={false}
              className="min-w-0 flex-1 bg-transparent text-night-foreground placeholder:text-night-foreground/30 focus:outline-none"
            />
          </form>
          <p className="mt-3 text-[11px] text-night-foreground/40">Supports PING, SET, GET — mirrors the server locally.</p>
        </div>
        <div className="border-t border-moon/15 p-5 md:border-l md:border-t-0">
          <p className="eyebrow text-moon/70">Request path</p>
          <ol className="mt-4 grid grid-cols-2 gap-2">
            {miniRedis.path.map((p, i) => {
              const on = step === i;
              const passed = step > i;
              return (
                <li
                  key={p}
                  className="rounded-sm border px-3 py-2 text-center text-[11px] tracking-wider transition-all duration-300"
                  style={{
                    borderColor: on ? "var(--moon)" : "color-mix(in oklab, var(--moon) 25%, transparent)",
                    boxShadow: on ? "0 0 24px -6px var(--moon)" : undefined,
                    opacity: on || passed ? 1 : 0.65,
                  }}
                >
                  <span className="mr-1 text-moon/50">{i + 1}</span> {p}
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}

export function WorkScene() {
  return (
    <section id="work" className="relative overflow-hidden bg-background py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-14">
        {/* Intro */}
        <Reveal>
          <div className="grid gap-8 border-b border-foreground/10 pb-14 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="eyebrow text-muted-foreground">{selectedWork.label}</p>
              <h2 className="mt-4 font-display text-6xl leading-none md:text-8xl">{selectedWork.title}</h2>
            </div>
            <div className="max-w-xs">
              <p className="text-sm leading-6 text-muted-foreground">{selectedWork.intro}</p>
              <p className="eyebrow mt-5 inline-block rounded-full border border-foreground/15 px-3 py-1 text-muted-foreground">All projects · 02</p>
            </div>
          </div>
        </Reveal>

        {/* Campus Coders */}
        <article className="relative grid gap-12 py-20 lg:grid-cols-[0.9fr_1.3fr] lg:items-center">
          <Reveal>
            <p className="eyebrow text-muted-foreground">01</p>
            <p className="eyebrow mt-6 inline-block rounded-full bg-secondary px-3 py-1 text-muted-foreground">{campusCodersMeta.category}</p>
            <h3 className="mt-5 font-display text-5xl md:text-6xl">{campusCoders.title}</h3>
            <p className="mt-2 text-lg">{campusCoders.tagline}</p>
            <p className="mt-5 max-w-md text-sm leading-6 text-muted-foreground">{campusCoders.summary}</p>
            <div className="mt-7 flex flex-wrap gap-2">{campusCodersMeta.tech.map((t) => <Pill key={t}>{t}</Pill>)}</div>
            <div className="mt-9 flex flex-wrap gap-7">
              {campusCoders.links.map((l) => <TextLink key={l.label} href={l.href}>{l.label}</TextLink>)}
            </div>
          </Reveal>
          <Reveal delay={200} className="relative">
            <Shards className="-left-10 -top-10 hidden md:block" />
            <a href={campusCoders.live} target="_blank" rel="noreferrer" className="group relative block overflow-hidden rounded-lg border border-foreground/10 bg-card shadow-[var(--shadow-glass)]">
              <div className="flex items-center gap-2 border-b border-foreground/10 px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
                <span className="ml-3 truncate rounded-sm bg-secondary px-3 py-0.5 text-[11px] text-muted-foreground">campuscoders-theta.vercel.app</span>
              </div>
              <img src={campusUi} alt="Campus Coders live app" loading="lazy" className="block w-full transition-transform duration-700 group-hover:scale-[1.015]" />
            </a>
          </Reveal>
        </article>

        {/* MiniRedis */}
        <article className="relative grid gap-12 border-t border-foreground/10 py-20 lg:grid-cols-[0.9fr_1.3fr] lg:items-center">
          <Reveal>
            <p className="eyebrow text-muted-foreground">02</p>
            <p className="eyebrow mt-6 inline-block rounded-full bg-secondary px-3 py-1 text-muted-foreground">{miniRedis.category}</p>
            <h3 className="mt-5 font-display text-5xl md:text-6xl">{miniRedis.title}</h3>
            <p className="mt-2 text-lg">{miniRedis.tagline}</p>
            <p className="mt-5 max-w-md text-sm leading-6 text-muted-foreground">{miniRedis.summary}</p>
            <div className="mt-7 flex flex-wrap gap-2">{miniRedis.tech.map((t) => <Pill key={t}>{t}</Pill>)}</div>
          </Reveal>
          <Reveal delay={200} className="relative min-w-0">
            <Shards className="-right-6 -bottom-12 hidden md:block opacity-70" />
            <div className="relative"><Terminal /></div>
          </Reveal>
        </article>
      </div>
    </section>
  );
}
