"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Center, Float, useGLTF } from "@react-three/drei";
import * as THREE from "three";

const MODEL_URL = "/models/astronaut.glb";

function Model() {
  const { scene } = useGLTF(MODEL_URL);

  const prepared = useMemo(() => {
    const root = scene.clone(true);
    // The file ships with no materials, textures or UVs and is one merged mesh,
    // so it can only take a single clean material. Normals are computed so it
    // lights properly.
    const mat = new THREE.MeshStandardMaterial({
      color: "#eef1f8",
      roughness: 0.5,
      metalness: 0.05,
    });
    root.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (!mesh.isMesh) return;
      mesh.geometry.computeVertexNormals();
      mesh.material = mat;
    });
    return root;
  }, [scene]);

  return <primitive object={prepared} />;
}

function Rig() {
  const g = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (g.current) {
      g.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.5;
    }
  });
  return (
    <group ref={g} scale={0.85}>
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
        flat
        dpr={[1, 2]}
        camera={{ position: [0, 0, 5.6], fov: 32 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={1} />
        <hemisphereLight args={["#eef2ff", "#0b1024", 0.7]} />
        <directionalLight position={[4, 6, 5]} intensity={2.6} />
        <directionalLight position={[-4, 2, 3]} intensity={0.9} color="#cdd8ff" />
        <directionalLight position={[0, 2, -5]} intensity={1.2} color="#4468ff" />
        <Suspense fallback={null}>
          <Float speed={1.3} rotationIntensity={0.1} floatIntensity={0.6}>
            <Rig />
          </Float>
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload(MODEL_URL);
