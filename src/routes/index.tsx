import { createFileRoute } from "@tanstack/react-router";
import { FoldScene } from "@/components/scenes/FoldScene";
import { WorkScene } from "@/components/scenes/WorkScene";
import { ArchitectureScene } from "@/components/scenes/ArchitectureScene";
import { AboutScene, ContactScene, TechScene } from "@/components/scenes/ClosingScenes";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Prakash Mannam — Java Backend Engineer" },
      { name: "description", content: "Prakash Mannam builds backend systems and full-stack products with Java, Spring Boot, and React." },
      { property: "og:title", content: "Prakash Mannam — Java Backend Engineer" },
      { property: "og:description", content: "The Impossible Fold — an interactive portfolio of Prakash Mannam." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="overflow-x-clip">
      <FoldScene />
      <WorkScene />
      <ArchitectureScene />
      <TechScene />
      <AboutScene />
      <ContactScene />
    </main>
  );
}
