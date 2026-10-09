# Portfolio architecture

## Structure
- `src/content/portfolio.ts` — all copy, project data, links (single source of truth).
- `src/components/scenes/*` — one component per story scene (Door, Campus, Architecture, MiniRedis, Tech/About/Contact).
- `src/components/ui/*` — small reusable UI (Reveal, ThemeToggle).
- `src/lib/miniredis-sim.ts` — in-browser MiniRedis command simulation (service layer).
- `src/hooks/use-theme.ts` — theme state + pre-paint init script.

## Door sequence (scroll → story)
- The section is 420vh tall; its inner layer is `position: sticky`, so the viewport stays pinned while you scroll.
- One GSAP timeline with ScrollTrigger (`scrub`) animates five CSS variables on the section: `--intro`, `--walk`, `--open`, `--through`, `--zoom`.
- Every layer computes transform/opacity from those variables in CSS `calc()` (figure scale/position, door leaf `rotateY`, camera `scale` toward the doorway, light flood).
- Because scroll position maps directly to timeline progress, scrolling up reverses everything automatically.
- Only transform/opacity animate (GPU-friendly). `gsap.matchMedia` skips the timeline under `prefers-reduced-motion`.

## Why no Three.js
The door is a CSS 3D transform (perspective + rotateY) over a painted environment. It runs well on phones and avoids a WebGL scene for a single object.

## MiniRedis terminal
Browsers can't open raw TCP sockets, so the terminal runs a local simulation of PING/SET/GET and is labeled "Simulated in browser". Going live means replacing `execute()` with a call to an HTTP adapter that forwards commands to the Java TCP server. Each command animates the request path Client → TCP → Server Socket → Parser → Store → Response.

## Theme
Light/dark via a `.dark` class on `<html>`. An inline head script applies the saved choice (or the system preference) before first paint; the toggle saves to localStorage.
