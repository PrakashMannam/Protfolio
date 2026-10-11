import { useTheme } from "@/hooks/use-theme";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const dark = theme === "dark";
  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      className="relative h-7 w-14 shrink-0 rounded-full border border-foreground/25 transition-colors"
    >
      <span
        className="absolute left-0 top-[3px] h-5 w-5 rounded-full bg-foreground transition-transform duration-500"
        style={{ transform: dark ? "translateX(31px)" : "translateX(3px)" }}
      />
    </button>
  );
}
