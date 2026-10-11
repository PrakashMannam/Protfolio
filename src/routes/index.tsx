import { createFileRoute } from "@tanstack/react-router";
import { FoldScene } from "@/components/scenes/FoldScene";
import { ArchitectureScene } from "@/components/scenes/ArchitectureScene";
import { MiniRedisScene } from "@/components/scenes/MiniRedisScene";
import { AboutScene, ContactScene, TechScene } from "@/components/scenes/ClosingScenes";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Prakash Mannam — Java Backend Engineer" },
      { name: "description", content: "Prakash Mannam builds backend systems and full-stack products with Java, Spring Boot, and React." },
      { property: "og:title", content: "Prakash Mannam — Java Backend Engineer" },
      { property: "og:description", content: "The Impossible Fold — an interactive portfolio of Prakash Mannam." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="overflow-x-clip">
      <FoldScene />
      <ArchitectureScene />
      <MiniRedisScene />
      <TechScene />
      <AboutScene />
      <ContactScene />
    </main>
  );
}
