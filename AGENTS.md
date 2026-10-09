<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Site copy/data lives only in src/content/portfolio.ts; scenes render it. Why: one place to edit facts.
- Scroll-driven scenes animate CSS variables via a GSAP ScrollTrigger timeline; layers derive styles from those vars. Why: reversible, GPU-cheap, easy to explain.
