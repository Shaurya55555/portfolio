"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Decal, Float, Html, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { technologies, moreTech } from "@/lib/data";

const ALL = [...technologies, ...moreTech];

const LABEL: Record<string, string> = {
  "React JS": "React",
  "Node JS": "Node.js",
  "HTML 5": "HTML",
  "CSS 3": "CSS",
  git: "Git",
};

const SP = 2.5; // grid spacing, world units

/** The same floating round brick as the original stones: a flat-shaded
 *  icosahedron with the logo as a decal. */
function Brick({ icon, name, x, y }: { icon: string; name: string; x: number; y: number }) {
  const [map] = useTexture([icon]);
  const [hover, setHover] = useState(false);
  return (
    <group position={[x, y, 0]}>
      <Float speed={1.75} rotationIntensity={1} floatIntensity={1.2}>
        <mesh
          scale={hover ? 1.12 : 1}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHover(true);
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            setHover(false);
            document.body.style.cursor = "";
          }}
        >
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial color="#fff8eb" polygonOffset polygonOffsetFactor={-5} flatShading />
          <Decal position={[0, 0, 1]} rotation={[2 * Math.PI, 0, 6.25]} scale={1} map={map} />
        </mesh>
      </Float>
      {hover && (
        <Html center position={[0, -1.45, 0]} zIndexRange={[20, 0]} style={{ pointerEvents: "none" }}>
          <span className="whitespace-nowrap rounded-md border border-white/10 bg-[#0b0b0d] px-2.5 py-1 text-[12px] font-medium text-white">
            {LABEL[name] ?? name}
          </span>
        </Html>
      )}
    </group>
  );
}

function Grid({ cols }: { cols: number }) {
  const { size, camera } = useThree();
  const cam = camera as THREE.PerspectiveCamera;
  const visW = 2 * cam.position.z * Math.tan(THREE.MathUtils.degToRad(cam.fov / 2)) * (size.width / size.height);
  const scale = Math.min(1.4, (0.98 * visW) / (cols * SP));
  const rows = Math.ceil(ALL.length / cols);

  return (
    <group scale={scale}>
      <ambientLight intensity={0.25} />
      <directionalLight position={[0, 0, 0.05]} />
      <directionalLight position={[2, 3, 6]} intensity={1.6} />
      {ALL.map((t, i) => {
        const row = Math.floor(i / cols);
        const inRow = row === rows - 1 ? ALL.length - row * cols : cols; // centre the last row
        const col = i - row * cols;
        const x = (col - (inRow - 1) / 2) * SP;
        const y = ((rows - 1) / 2 - row) * SP;
        return <Brick key={t.name} icon={t.icon} name={t.name} x={x} y={y} />;
      })}
    </group>
  );
}

/** All the tools as the original floating round bricks, in one WebGL scene. */
export default function TechBricks() {
  const box = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setWidth(el.clientWidth));
    ro.observe(el);
    setWidth(el.clientWidth);
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: "300px" });
    io.observe(el);
    return () => {
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  const cols = width >= 1000 ? 9 : width >= 640 ? 7 : 4;
  const rows = Math.ceil(ALL.length / cols);
  const height = width ? Math.round(rows * (width / cols) * 0.98) : 420;

  return (
    <div ref={box} className="relative mx-auto mt-10 w-full max-w-6xl" style={{ height }} role="group" aria-label="Tools I work with">
      <ul className="sr-only">
        {ALL.map((t) => (
          <li key={t.name}>{LABEL[t.name] ?? t.name}</li>
        ))}
      </ul>
      {visible && width > 0 && (
        <Canvas
          frameloop="always"
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 14], fov: 35 }}
          gl={{ antialias: true, alpha: true }}
        >
          <Suspense fallback={null}>
            <Grid cols={cols} />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
}
