import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import redisWorld from "@/assets/redis-world.jpg";
import { miniRedis } from "@/content/portfolio";
import { createMiniRedisSim } from "@/lib/miniredis-sim";
import { Reveal } from "@/components/ui/Reveal";

type Line = { cmd: string; out: string; ok: boolean };
const PROMPT = "127.0.0.1:6379>";
const SEED: Line[] = [
  { cmd: "PING", out: "+PONG", ok: true },
  { cmd: "SET name prakash", out: "+OK", ok: true },
  { cmd: "GET name", out: "prakash", ok: true },
];

export function MiniRedisScene() {
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

  function animatePath(done: () => void) {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    const n = miniRedis.path.length;
    for (let i = 0; i < n; i++) timers.current.push(window.setTimeout(() => setStep(i), i * 180));
    timers.current.push(window.setTimeout(done, (n - 1) * 180));
    timers.current.push(window.setTimeout(() => setStep(-1), n * 180 + 900));
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    const cmd = input.trim();
    if (!cmd) return;
    setInput("");
    const res = sim.execute(cmd);
    animatePath(() => setLines((l) => [...l.slice(-12), { cmd, out: res.output, ok: res.ok }]));
  }

  return (
    <section className="relative bg-night text-night-foreground">
      <div className="h-40 bg-gradient-to-b from-background to-night" />
      <div className="relative">
        <img src={redisWorld} alt="" loading="lazy" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-b from-night via-night/20 to-night" />
        <div className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-16 px-6 py-32 lg:grid-cols-[1fr_1.1fr_auto] md:px-14">
          <Reveal>
            <p className="eyebrow text-moon">02 — Project</p>
            <h2 className="mt-5 font-display text-6xl md:text-8xl">MiniRedis</h2>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-night-foreground/70">{miniRedis.tagline}.</p>
          </Reveal>

          <Reveal delay={200}>
            <div className="glass-night rounded-lg p-6 font-mono text-sm leading-7">
              <div className="mb-4 flex items-center justify-between">
                <span className="eyebrow text-moon/70">Terminal</span>
                <span className="eyebrow rounded-full border border-moon/30 px-3 py-1 text-[0.6rem] text-moon/70">Simulated in browser</span>
              </div>
              <div ref={logRef} className="max-h-64 overflow-y-auto pr-2">
                {lines.map((l, i) => (
                  <div key={i} className="mb-2">
                    <p><span className="text-moon/50">{PROMPT}</span> {l.cmd}</p>
                    <p className={l.ok ? "text-moon" : "text-destructive"}>{l.out}</p>
                  </div>
                ))}
              </div>
              <form onSubmit={submit} className="mt-2 flex items-center gap-2">
                <label htmlFor="redis-cmd" className="text-moon/50">{PROMPT}</label>
                <input
                  id="redis-cmd"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="try: SET city ongole"
                  autoComplete="off"
                  spellCheck={false}
                  className="min-w-0 flex-1 bg-transparent text-night-foreground placeholder:text-night-foreground/30 focus:outline-none"
                />
              </form>
              <p className="mt-4 text-[11px] leading-5 text-night-foreground/40">
                Supports PING, SET, GET. Browsers can't open TCP sockets, so this mirrors the server's behavior locally.
              </p>
            </div>
          </Reveal>

          <Reveal delay={350}>
            <ol className="flex flex-row flex-wrap gap-3 lg:flex-col lg:items-stretch">
              {miniRedis.path.map((p, i) => {
                const on = step === i;
                const passed = step > i;
                return (
                  <li key={p} className="flex items-center gap-3 lg:flex-col lg:gap-2">
                    <span
                      className="glass-night rounded-sm px-4 py-2 text-center text-xs tracking-widest transition-all duration-300"
                      style={{
                        transform: on ? "scale(1.08)" : "scale(1)",
                        borderColor: on ? "var(--moon)" : undefined,
                        boxShadow: on ? "0 0 30px -4px var(--moon)" : undefined,
                        opacity: on || passed ? 1 : 0.6,
                      }}
                    >
                      {p}
                    </span>
                    {i < miniRedis.path.length - 1 && <span className="text-moon/40 lg:rotate-90">→</span>}
                  </li>
                );
              })}
            </ol>
          </Reveal>
        </div>
      </div>
      <div className="h-40 bg-gradient-to-b from-night to-background" />
    </section>
  );
}
