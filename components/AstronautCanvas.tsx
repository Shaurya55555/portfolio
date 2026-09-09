"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Center, Environment, Float, Lightformer, useGLTF } from "@react-three/drei";
import { toCreasedNormals } from "three-stdlib";
import * as THREE from "three";

const MODEL_URL = "/models/astronaut.glb";

function Model() {
  const { scene } = useGLTF(MODEL_URL);

  const prepared = useMemo(() => {
    const root = scene.clone(true);

    // The upload is a single merged mesh with no materials, textures or UVs.
    // Give it creased normals (keeps hard edges crisp, smooths curves) and one
    // clean toy-plastic material so it reads as a premium white figure.
    const mat = new THREE.MeshPhysicalMaterial({
      color: "#eef1f8",
      roughness: 0.42,
      metalness: 0.0,
      clearcoat: 0.5,
      clearcoatRoughness: 0.35,
      envMapIntensity: 0.7,
    });

    root.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (!mesh.isMesh) return;
      let geo = mesh.geometry as THREE.BufferGeometry;
      if (geo.index) geo = geo.toNonIndexed();
      geo = toCreasedNormals(geo, Math.PI / 5);
      mesh.geometry = geo;
      mesh.material = mat;
    });

    return root;
  }, [scene]);

  return <primitive object={prepared} />;
}

function Rig() {
  const g = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (g.current) g.current.rotation.y += delta * 0.28;
  });
  return (
    <group ref={g} scale={0.82}>
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
        camera={{ position: [0, 0.1, 5.6], fov: 32 }}
        gl={{ alpha: true, antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
      >
        <ambientLight intensity={0.55} />
        <hemisphereLight args={["#eef2ff", "#0b1024", 0.5]} />
        <directionalLight position={[4, 6, 5]} intensity={2.1} castShadow />
        <directionalLight position={[-5, 2, 3]} intensity={0.7} color="#cdd8ff" />
        <directionalLight position={[0, 2, -6]} intensity={1.4} color="#4468ff" />

        <Suspense fallback={null}>
          <Environment resolution={256}>
            <Lightformer intensity={2} position={[0, 3, 2]} scale={[6, 3, 1]} color="#ffffff" />
            <Lightformer intensity={1.2} position={[-4, 1, 2]} scale={[3, 4, 1]} color="#cdd8ff" />
            <Lightformer intensity={1} position={[4, 0, 3]} scale={[3, 4, 1]} color="#4468ff" />
            <Lightformer intensity={0.6} position={[0, -3, 1]} scale={[6, 3, 1]} color="#8ea0d8" />
          </Environment>

          <Float speed={1.2} rotationIntensity={0.08} floatIntensity={0.5}>
            <Rig />
          </Float>
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload(MODEL_URL);
