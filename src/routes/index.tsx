import { createFileRoute } from "@tanstack/react-router";
import { DoorScene } from "@/components/scenes/DoorScene";
import { CampusScene } from "@/components/scenes/CampusScene";
import { ArchitectureScene } from "@/components/scenes/ArchitectureScene";
import { MiniRedisScene } from "@/components/scenes/MiniRedisScene";
import { AboutScene, ContactScene, TechScene } from "@/components/scenes/ClosingScenes";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Prakash Mannam — Java Backend Engineer" },
      { name: "description", content: "Prakash Mannam builds backend systems and full-stack products with Java, Spring Boot, and React." },
      { property: "og:title", content: "Prakash Mannam — Java Backend Engineer" },
      { property: "og:description", content: "Step through the doorway into the work of Prakash Mannam." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="overflow-x-clip">
      <DoorScene />
      <CampusScene />
      <ArchitectureScene />
      <MiniRedisScene />
      <TechScene />
      <AboutScene />
      <ContactScene />
    </main>
  );
}
