import { about, contacts, education, identity, technologies } from "@/content/portfolio";
import { Reveal } from "@/components/ui/Reveal";

export function TechScene() {
  return (
    <section className="relative bg-background py-40">
      <div className="mx-auto max-w-6xl px-6 text-center md:px-14">
        <Reveal><p className="eyebrow text-muted-foreground">What I work with</p></Reveal>
        <div className="mx-auto mt-16 flex max-w-4xl flex-wrap justify-center gap-x-10 gap-y-8">
          {technologies.map((t, i) => (
            <Reveal key={t} delay={i * 70}>
              <span className={`font-display ${i % 3 === 0 ? "text-5xl md:text-6xl" : i % 3 === 1 ? "text-3xl text-muted-foreground md:text-4xl" : "text-4xl italic md:text-5xl"}`}>
                {t}
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AboutScene() {
  return (
    <section id="about" className="relative bg-background py-32">
      <div className="mx-auto grid max-w-6xl gap-16 px-6 md:grid-cols-2 md:px-14">
        <Reveal>
          <p className="eyebrow text-muted-foreground">About</p>
          <h2 className="mt-5 font-display text-5xl md:text-6xl">{identity.name}</h2>
          <p className="mt-8 text-sm leading-7 text-muted-foreground">
            {education.degree}<br />{education.college}<br />{education.location}<br />{education.graduating}
          </p>
        </Reveal>
        <Reveal delay={200} className="self-end">
          <p className="font-display text-2xl leading-snug md:text-3xl">{about}</p>
        </Reveal>
      </div>
    </section>
  );
}

export function ContactScene() {
  return (
    <section id="contact" className="relative min-h-screen overflow-hidden">
      <div className="fold-ground absolute inset-0" />
      <div className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <div className="mb-14 h-28 w-28 rotate-45 border border-foreground/30 [box-shadow:inset_0_0_0_14px_var(--background),inset_0_0_0_15px_color-mix(in_oklab,var(--foreground)_25%,transparent)]" />
        <Reveal><h2 className="font-display text-6xl md:text-8xl">Let's build something.</h2></Reveal>
        <Reveal delay={200}>
          <nav className="mt-14 flex flex-wrap justify-center gap-8">
            {contacts.map((c) => (
              <a key={c.label} href={c.href} target="_blank" rel="noreferrer" className="eyebrow border-b border-foreground/40 pb-1 transition-colors hover:border-foreground">
                {c.label}
              </a>
            ))}
          </nav>
        </Reveal>
        <p className="eyebrow absolute bottom-8 text-muted-foreground">© 2026 {identity.name} · Always learning, always building</p>
      </div>
    </section>
  );
}
