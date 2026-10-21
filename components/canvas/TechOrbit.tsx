"use client";

import { Suspense, useEffect, useRef, useState, type MutableRefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Decal, Html, Line, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { technologies, moreTech } from "@/lib/data";

const ICONS: Record<string, string> = Object.fromEntries(
  [...technologies, ...moreTech].map((t) => [t.name, t.icon]),
);

/** Three orbits, inner to outer: the front end I lead with, the data and
 *  server layer, then the infrastructure and AI tooling around it. */
const RINGS: { name: string; items: string[]; ring: number; speed: number }[] = [
  { name: "Front end", ring: 0.4, speed: 0.3, items: ["React JS", "TypeScript", "Next.js", "Tailwind CSS", "Redux Toolkit", "JavaScript"] },
  { name: "Back end and data", ring: 0.7, speed: 0.18, items: ["Node JS", "Express", "MongoDB", "PostgreSQL", "Redis", "GraphQL", "Python", "FastAPI"] },
  { name: "Infra and AI", ring: 1, speed: 0.11, items: ["Docker", "Kafka", "Nginx", "git", "Jenkins", "GitHub Actions", "C++", "LangChain", "Gemini API", "HTML 5", "CSS 3"] },
];

const LABEL: Record<string, string> = {
  "React JS": "React",
  "Node JS": "Node.js",
  "HTML 5": "HTML",
  "CSS 3": "CSS",
  git: "Git",
};

type Node = { name: string; ring: number; a0: number; speed: number };
const NODES: Node[] = RINGS.flatMap((r) =>
  r.items.map((name, i) => ({ name, ring: r.ring, a0: (i / r.items.length) * Math.PI * 2 + r.ring * 3, speed: r.speed })),
);

const R3 = 5.4; // outermost orbit radius, world units
const CAM = new THREE.Vector3(0, 6, 11);
const TILT = Math.atan2(CAM.y, CAM.z); // faces the logos toward the camera

/** The same round brick as the original stones: a flat-shaded icosahedron
 *  with the logo as a decal. */
function Brick({ icon, lit }: { icon: string; lit: boolean }) {
  const [map] = useTexture([icon]);
  return (
    <mesh rotation={[-TILT, 0, 0]} scale={lit ? 0.5 : 0.4}>
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial color="#fff8eb" polygonOffset polygonOffsetFactor={-5} flatShading />
      <Decal position={[0, 0, 1]} rotation={[2 * Math.PI, 0, 6.25]} scale={1} map={map} />
    </mesh>
  );
}

function Scene({
  hover,
  setHover,
  hoverRef,
}: {
  hover: number | null;
  setHover: (i: number | null) => void;
  hoverRef: MutableRefObject<number | null>;
}) {
  const { size, camera } = useThree();
  const root = useRef<THREE.Group>(null);
  const balls = useRef<(THREE.Group | null)[]>([]);
  const angles = useRef(NODES.map((n) => n.a0));
  const still = useRef(false);

  useEffect(() => {
    still.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const cam = camera as THREE.PerspectiveCamera;
    const visW = 2 * cam.position.length() * Math.tan(THREE.MathUtils.degToRad(cam.fov / 2)) * (size.width / size.height);
    root.current?.scale.setScalar(Math.min(1.2, (0.94 * visW) / (2 * R3 + 1.4)));

    const t = state.clock.elapsedTime;
    NODES.forEach((n, i) => {
      if (hoverRef.current === null && !still.current) angles.current[i] += dt * n.speed;
      const a = angles.current[i];
      const r = n.ring * R3;
      balls.current[i]?.position.set(Math.cos(a) * r, Math.sin(t * 1.1 + i) * 0.07, Math.sin(a) * r);
    });
  });

  return (
    <group ref={root}>
      <ambientLight intensity={0.7} />
      {/* the sun lights every brick from the middle */}
      <pointLight position={[0, 0.4, 0]} intensity={90} distance={30} color="#ffd9a8" />
      <directionalLight position={[0, 4, 8]} intensity={0.9} />

      {RINGS.map((r) => (
        <Line
          key={r.name}
          points={Array.from({ length: 129 }, (_, k) => {
            const a = (k / 128) * Math.PI * 2;
            return [Math.cos(a) * r.ring * R3, 0, Math.sin(a) * r.ring * R3] as [number, number, number];
          })}
          color="#ffffff"
          opacity={0.16}
          transparent
          lineWidth={1}
        />
      ))}

      {/* core: a small sun */}
      <mesh>
        <sphereGeometry args={[0.62, 48, 48]} />
        <SunMaterial />
      </mesh>

      {NODES.map((n, i) => (
        <group
          key={n.name}
          ref={(g) => {
            balls.current[i] = g;
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            hoverRef.current = i;
            setHover(i);
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            if (hoverRef.current === i) {
              hoverRef.current = null;
              setHover(null);
            }
            document.body.style.cursor = "";
          }}
        >
          <Brick icon={ICONS[n.name]} lit={hover === i} />
          {hover === i && (
            <Html center position={[0, -0.75, 0]} zIndexRange={[20, 0]} style={{ pointerEvents: "none" }}>
              <span className="whitespace-nowrap rounded-md border border-white/10 bg-black/85 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-white">
                {LABEL[n.name] ?? n.name}
              </span>
            </Html>
          )}
        </group>
      ))}
    </group>
  );
}

function SunMaterial() {
  const [map] = useTexture(["/solar/sun.webp"]);
  return <meshBasicMaterial map={map} color="#ffd9b0" />;
}

/** All 25 tools as round bricks on three orbits, in one WebGL scene. */
export default function TechOrbit() {
  const box = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hover, setHover] = useState<number | null>(null);
  const hoverRef = useRef<number | null>(null);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: "250px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={box} className="relative mx-auto mt-6 h-[420px] w-full max-w-6xl sm:h-[640px]" role="group" aria-label="Tools I work with, in orbit">
      {/* glow behind the sun */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full sm:h-[460px] sm:w-[460px]"
        style={{ background: "radial-gradient(circle, rgba(255,170,90,0.42) 0%, rgba(255,140,50,0.16) 28%, transparent 62%)" }}
      />
      <ul className="sr-only">
        {NODES.map((n) => (
          <li key={n.name}>{LABEL[n.name] ?? n.name}</li>
        ))}
      </ul>
      {visible && (
        <Canvas
          frameloop="always"
          dpr={[1, 1.5]}
          camera={{ position: CAM.toArray(), fov: 35 }}
          onCreated={({ camera }) => camera.lookAt(0, 0, 0)}
          gl={{ antialias: true, alpha: true }}
        >
          <Suspense fallback={null}>
            <Scene hover={hover} setHover={setHover} hoverRef={hoverRef} />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
}
