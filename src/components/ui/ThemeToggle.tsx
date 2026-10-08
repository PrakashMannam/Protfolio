import { useTheme } from "@/hooks/use-theme";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const dark = theme === "dark";
  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      className="glass-panel relative h-7 w-14 rounded-full transition-colors"
    >
      <span
        className="absolute top-1 h-5 w-5 rounded-full bg-foreground transition-transform duration-500"
        style={{ transform: dark ? "translateX(30px)" : "translateX(4px)" }}
      />
    </button>
  );
}
