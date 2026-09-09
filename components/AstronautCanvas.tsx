"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Center, Environment, Float, Lightformer, useGLTF } from "@react-three/drei";
import type { Group } from "three";

const MODEL_URL = "/models/astronaut.glb";

function Model() {
  const { scene } = useGLTF(MODEL_URL);
  return <primitive object={scene} />;
}

function Rig() {
  const spin = useRef<Group>(null);
  useFrame((state) => {
    if (spin.current) {
      const t = state.clock.elapsedTime;
      spin.current.rotation.y = Math.sin(t * 0.32) * 0.55;
      spin.current.rotation.z = Math.sin(t * 0.45) * 0.02;
    }
  });
  return (
    <group ref={spin}>
      <Center>
        <Model />
      </Center>
    </group>
  );
}

export default function AstronautCanvas({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0.2, 5.4], fov: 34 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.65} />
        <hemisphereLight args={["#eef2ff", "#0b1024", 0.5]} />
        <directionalLight position={[4, 6, 5]} intensity={2.1} />
        <directionalLight position={[-5, 2, 3]} intensity={0.8} color="#cdd8ff" />
        <directionalLight position={[0, 2, -6]} intensity={1} color="#4468ff" />

        <Suspense fallback={null}>
          <Environment resolution={256}>
            <Lightformer intensity={2} position={[0, 3, 2]} scale={[6, 3, 1]} color="#ffffff" />
            <Lightformer intensity={1.1} position={[-4, 1, 2]} scale={[3, 4, 1]} color="#cdd8ff" />
            <Lightformer intensity={1} position={[4, 0, 3]} scale={[3, 4, 1]} color="#4468ff" />
          </Environment>

          <Float speed={1.1} rotationIntensity={0.06} floatIntensity={0.5}>
            <Rig />
          </Float>
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload(MODEL_URL);
