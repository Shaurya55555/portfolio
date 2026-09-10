"use client";

import { Suspense, useEffect, useRef, type MutableRefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Center, Environment, Lightformer, useGLTF } from "@react-three/drei";
import * as THREE from "three";

const MODEL_URL = "/models/astronaut.glb";

type Control = {
  px: number; // cursor x, -1..1
  py: number; // cursor y, -1..1
  grabbed: boolean;
  ry: number; // drag-accumulated yaw
  rx: number; // drag-accumulated pitch
  scroll: number; // 0..1 down the page
};

function Model() {
  const { scene } = useGLTF(MODEL_URL);
  return <primitive object={scene} />;
}

function Flyer({ ctl }: { ctl: MutableRefObject<Control> }) {
  const g = useRef<THREE.Group>(null);
  const tumble = useRef(0);

  useFrame((state, delta) => {
    const grp = g.current;
    if (!grp) return;
    const t = state.clock.elapsedTime;
    const c = ctl.current;

    // roam the right side of the hero; rise out of frame on scroll; nudge
    // toward the cursor
    grp.position.x = 1.2 + Math.sin(t * 0.15) * 1.9 + Math.cos(t * 0.06) * 0.4 + c.px * 0.6;
    grp.position.y = 0.1 + Math.sin(t * 0.22) * 1.1 + c.scroll * 7.5 + c.py * 0.4;
    grp.position.z = Math.sin(t * 0.12) * 0.45;

    // yaw: auto tumble + cursor sweep + drag, drag decays once released
    if (!c.grabbed) {
      tumble.current += delta * 0.4;
      c.ry *= 0.96;
      c.rx *= 0.96;
    }
    grp.rotation.y = tumble.current + c.ry + (c.grabbed ? 0 : c.px * 0.5);

    const targetX = 0.05 + c.rx + (c.grabbed ? 0 : -c.py * 0.28);
    const targetZ = c.grabbed ? 0 : c.px * 0.14;
    grp.rotation.x = THREE.MathUtils.lerp(grp.rotation.x, targetX, 0.12);
    grp.rotation.z = THREE.MathUtils.lerp(grp.rotation.z, targetZ, 0.12);
  });

  return (
    <group ref={g}>
      <Center>
        <group scale={0.86}>
          <Model />
        </group>
      </Center>
    </group>
  );
}

export default function AstronautCanvas({ className = "" }: { className?: string }) {
  const ctl = useRef<Control>({
    px: 0,
    py: 0,
    grabbed: false,
    ry: 0,
    rx: 0,
    scroll: 0,
  });

  useEffect(() => {
    let last: { x: number; y: number } | null = null;

    const inZone = (x: number, y: number) =>
      ctl.current.scroll < 0.3 &&
      x > window.innerWidth * 0.4 &&
      y > 90 &&
      y < window.innerHeight * 0.95;

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      ctl.current.scroll = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    };
    const onMove = (e: PointerEvent) => {
      ctl.current.px = (e.clientX / window.innerWidth) * 2 - 1;
      ctl.current.py = -((e.clientY / window.innerHeight) * 2 - 1);
      if (ctl.current.grabbed && last) {
        ctl.current.ry += (e.clientX - last.x) * 0.008;
        ctl.current.rx += (e.clientY - last.y) * 0.008;
        last = { x: e.clientX, y: e.clientY };
      }
    };
    const onDown = (e: PointerEvent) => {
      if (inZone(e.clientX, e.clientY)) {
        ctl.current.grabbed = true;
        last = { x: e.clientX, y: e.clientY };
      }
    };
    const onUp = () => {
      ctl.current.grabbed = false;
      last = null;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
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

          <Flyer ctl={ctl} />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload(MODEL_URL);
