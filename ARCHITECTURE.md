# Portfolio architecture

## Structure
- `src/content/portfolio.ts` — all copy, project data, links (single source of truth).
- `src/components/scenes/*` — one component per story scene (Door, Campus, Architecture, MiniRedis, Tech/About/Contact).
- `src/components/ui/*` — small reusable UI (Reveal, ThemeToggle).
- `src/lib/miniredis-sim.ts` — in-browser MiniRedis command simulation (service layer).
- `src/hooks/use-theme.ts` — theme state + pre-paint init script.

## The Impossible Fold (scenes 01–02)
- `FoldScene` is 380vh tall with a sticky, full-screen layer. One GSAP ScrollTrigger maps scroll to progress 0..1.
- Progress goes two places: a ref read every frame by the 3D sculpture, and a CSS variable `--p` that drives the typography reveals.
- `fold/Sculpture.tsx` (React Three Fiber, lazy-loaded client-only): N thin glass panels sit on a Möbius loop — each panel turns by half its loop angle, so the strip has one side and its panels pass through each other.
- As progress grows, each panel blends (position lerp + quaternion slerp, staggered) from its loop pose into a receding stack of layers — the interior looks deeper than the object. One interior panel carries the real Campus Coders screenshot and moves forward.
- A floor shadow is a square that rotates against the loop: a shadow that contradicts its object.
- Everything is a pure function of progress, so scrolling up reverses it. Damping smooths motion; reduced-motion disables damping and idle rotation. Phones get fewer panels and a smaller object.

## MiniRedis terminal
Browsers can't open raw TCP sockets, so the terminal runs a local simulation of PING/SET/GET and is labeled "Simulated in browser". Going live means replacing `execute()` with a call to an HTTP adapter that forwards commands to the Java TCP server. Each command animates the request path Client → TCP → Server Socket → Parser → Store → Response.

## Theme
Light/dark via a `.dark` class on `<html>`. An inline head script applies the saved choice (or the system preference) before first paint; the toggle saves to localStorage.
