"use client";

import { Suspense, useEffect, useRef, type MutableRefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Center, Environment, Lightformer, useGLTF } from "@react-three/drei";
import * as THREE from "three";

const MODEL_URL = "/models/astronaut.glb";

function Model() {
  const { scene } = useGLTF(MODEL_URL);
  return <primitive object={scene} />;
}

type Refs = {
  scroll: MutableRefObject<number>;
  pointer: MutableRefObject<{ x: number; y: number }>;
};

function Flyer({ scroll, pointer }: Refs) {
  const g = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const grp = g.current;
    if (!grp) return;
    const t = state.clock.elapsedTime;
    const s = scroll.current; // 0..1 down the page

    // roam the right side of the hero; rise up and out of frame once the
    // visitor scrolls past it
    grp.position.x = 1.2 + Math.sin(t * 0.15) * 1.9 + Math.cos(t * 0.06) * 0.4;
    grp.position.y = 0.1 + Math.sin(t * 0.22) * 1.15 + s * 7.5;
    grp.position.z = Math.sin(t * 0.12) * 0.5;

    // continuous 3D tumble + easing tilt toward the cursor
    grp.rotation.y += delta * 0.42;
    grp.rotation.x = THREE.MathUtils.lerp(
      grp.rotation.x,
      -pointer.current.y * 0.25 + 0.05,
      0.045,
    );
    grp.rotation.z = THREE.MathUtils.lerp(
      grp.rotation.z,
      pointer.current.x * 0.2,
      0.045,
    );
  });

  return (
    <group ref={g}>
      <Center>
        <group scale={0.72}>
          <Model />
        </group>
      </Center>
    </group>
  );
}

export default function AstronautCanvas({ className = "" }: { className?: string }) {
  const scroll = useRef(0);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scroll.current = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    };
    const onMove = (e: MouseEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div className={className}>
      <Canvas
        dpr={[1, 1.6]}
        camera={{ position: [0, 0, 9], fov: 34 }}
        gl={{ alpha: true, antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
      >
        <ambientLight intensity={0.7} />
        <hemisphereLight args={["#eef2ff", "#0b1024", 0.5]} />
        <directionalLight position={[4, 6, 5]} intensity={2.2} />
        <directionalLight position={[-5, 2, 3]} intensity={0.9} color="#cdd8ff" />
        <directionalLight position={[0, 2, -6]} intensity={1.1} color="#4468ff" />

        <Suspense fallback={null}>
          <Environment resolution={256}>
            <Lightformer intensity={2} position={[0, 3, 2]} scale={[6, 3, 1]} color="#ffffff" />
            <Lightformer intensity={1.1} position={[-4, 1, 2]} scale={[3, 4, 1]} color="#cdd8ff" />
            <Lightformer intensity={1} position={[4, 0, 3]} scale={[3, 4, 1]} color="#4468ff" />
          </Environment>

          <Flyer scroll={scroll} pointer={pointer} />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload(MODEL_URL);
