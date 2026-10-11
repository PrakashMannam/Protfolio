import { useEffect, useMemo, useRef, useState, type MutableRefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Edges, Environment, Lightformer, useTexture } from "@react-three/drei";
import * as THREE from "three";
import campusUi from "@/assets/campus-ui.jpg";

/**
 * THE IMPOSSIBLE FOLD — the central sculpture.
 *
 * N thin glass panels sit on a Möbius loop: each panel is rotated by half
 * its angle around the loop, so the strip has one surface and no
 * consistent inside/outside. Panels overlap and pass through each other.
 *
 * `progress` (0..1, written by GSAP ScrollTrigger) blends every panel from
 * its loop pose to a layered "unfolded" pose. One interior panel carries
 * the real Campus Coders interface and moves forward to become the reveal.
 * Everything is a pure function of progress, so scrolling up reverses it.
 */

type Props = { progress: MutableRefObject<number>; reduced: boolean };

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const smooth = (t: number) => t * t * (3 - 2 * t);

function useIsDark() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const el = document.documentElement;
    const read = () => setDark(el.classList.contains("dark"));
    read();
    const mo = new MutationObserver(read);
    mo.observe(el, { attributes: true, attributeFilter: ["class"] });
    return () => mo.disconnect();
  }, []);
  return dark;
}

function Fold({ progress, reduced, count }: Props & { count: number }) {
  const group = useRef<THREE.Group>(null);
  const panels = useRef<(THREE.Mesh | null)[]>([]);
  const screen = useRef<THREE.Mesh>(null);
  const shadow = useRef<THREE.Mesh>(null);
  const eased = useRef(0);
  const dark = useIsDark();
  const tex = useTexture(campusUi);
  tex.colorSpace = THREE.SRGBColorSpace;
  const { viewport } = useThree();
  const wide = viewport.aspect > 1;
  const hero = Math.floor(count / 2);

  const poses = useMemo(() => {
    const R = 1.25;
    return Array.from({ length: count }, (_, i) => {
      const a = (i / count) * Math.PI * 2;
      const loopPos = new THREE.Vector3(Math.cos(a) * R, Math.sin(a * 2) * 0.18, Math.sin(a) * R);
      const loopRot = new THREE.Euler(0, -a + Math.PI / 2, a / 2, "YXZ");
      const k = i - (count - 1) / 2;
      const layerPos = new THREE.Vector3(-0.9 + i * 0.09, 0.05 - i * 0.02, -0.6 - i * 0.28); void k;
      const layerRot = new THREE.Euler(-0.08, 0.55, 0.04, "YXZ");
      return {
        loopPos, loopQ: new THREE.Quaternion().setFromEuler(loopRot),
        layerPos, layerQ: new THREE.Quaternion().setFromEuler(layerRot),
      };
    });
  }, [count]);

  const tmpV = useMemo(() => new THREE.Vector3(), []);
  const tmpQ = useMemo(() => new THREE.Quaternion(), []);
  const heroPos = useMemo(() => new THREE.Vector3(), []);
  const heroQ = useMemo(() => new THREE.Quaternion().setFromEuler(new THREE.Euler(-0.04, -0.28, 0, "YXZ")), []);

  useFrame((state, rawDelta) => {
    const dt = Math.min(rawDelta, 0.05);
    const target = progress.current;
    eased.current = reduced ? target : THREE.MathUtils.damp(eased.current, target, 6, dt);
    const p = eased.current;
    const unfold = smooth(clamp((p - 0.12) / 0.5)); // loop → layers
    const reveal = smooth(clamp((p - 0.5) / 0.4)); // hero panel forward

    if (group.current) {
      const idle = reduced ? 0 : state.clock.elapsedTime * 0.12;
      group.current.rotation.y = (idle + p * Math.PI * 1.1) * (1 - unfold) + unfold * 0;
      group.current.rotation.x = 0.35 * (1 - unfold) + 0.05;
      group.current.position.x = wide ? THREE.MathUtils.lerp(0.9, 1.35, unfold) : 0;
      group.current.position.y = wide ? 0 : THREE.MathUtils.lerp(0.5, 0.9, unfold);
    }

    heroPos.set(wide ? -0.4 : 0, wide ? 0 : -0.1, 1.1);
    poses.forEach((pose, i) => {
      const m = panels.current[i];
      if (!m) return;
      const stagger = clamp(unfold * 1.35 - (i / count) * 0.35);
      tmpV.lerpVectors(pose.loopPos, pose.layerPos, stagger);
      tmpQ.slerpQuaternions(pose.loopQ, pose.layerQ, stagger);
      if (i === hero) {
        tmpV.lerp(heroPos, reveal);
        tmpQ.slerp(heroQ, reveal);
        m.scale.setScalar(1 + reveal * (wide ? 0.6 : 0.4));
      } else {
        const fade = 1 - reveal * 0.55;
        (m.material as THREE.MeshPhysicalMaterial).opacity = (dark ? 0.16 : 0.22) * fade;
      }
      m.position.copy(tmpV);
      m.quaternion.copy(tmpQ);
    });

    if (screen.current) {
      (screen.current.material as THREE.MeshBasicMaterial).opacity = smooth(clamp((p - 0.42) / 0.3));
    }
    // Contradicting shadow: a square that rotates against the loop.
    if (shadow.current) {
      shadow.current.rotation.z = -(group.current?.rotation.y ?? 0) * 1.5 + Math.PI / 4;
      const s = THREE.MathUtils.lerp(1.6, 2.6, unfold);
      shadow.current.scale.set(s, s, 1);
      (shadow.current.material as THREE.MeshBasicMaterial).opacity = (dark ? 0.35 : 0.12) * (1 - reveal * 0.7);
    }
  });

  const glass = dark ? "#9aa6b8" : "#f4efe6";
  const edge = dark ? "#c9d4e6" : "#6b6459";

  return (
    <>
      <mesh ref={shadow} position={[wide ? 0.9 : 0, -1.75, 0]} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial color={dark ? "#000000" : "#3a342c"} transparent depthWrite={false} />
      </mesh>
      <group ref={group}>
        {poses.map((_, i) => (
          <mesh key={i} ref={(m) => { panels.current[i] = m; }}>
            <boxGeometry args={[1.05, 1.5, 0.02]} />
            <meshPhysicalMaterial
              color={glass}
              transparent
              opacity={0.22}
              roughness={0.08}
              metalness={0.1}
              clearcoat={1}
              clearcoatRoughness={0.1}
              reflectivity={0.9}
              side={THREE.DoubleSide}
              depthWrite={false}
            />
            <Edges threshold={15} color={edge} />
            {i === hero && (
              <mesh ref={screen} position={[0, 0, 0.012]}>
                <planeGeometry args={[1.0, 0.625]} />
                <meshBasicMaterial map={tex} transparent opacity={0} toneMapped={false} />
              </mesh>
            )}
          </mesh>
        ))}
      </group>
    </>
  );
}

export default function Sculpture({ progress, reduced }: Props) {
  const [count, setCount] = useState(14);
  useEffect(() => {
    if (window.innerWidth < 700) setCount(9);
  }, []);
  return (
    <Canvas dpr={[1, 1.75]} camera={{ position: [0, 0.2, 5.2], fov: 38 }} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 5, 4]} intensity={1.4} />
      <Environment resolution={64}>
        <Lightformer intensity={2.2} position={[0, 4, 2]} scale={[8, 3, 1]} />
        <Lightformer intensity={1.2} position={[-4, 0, -2]} rotation-y={Math.PI / 2} scale={[10, 1.5, 1]} />
        <Lightformer intensity={0.8} color="#ffe9cc" position={[4, -1, 1]} rotation-y={-Math.PI / 2} scale={[6, 2, 1]} />
      </Environment>
      <Fold progress={progress} reduced={reduced} count={count} />
    </Canvas>
  );
}
