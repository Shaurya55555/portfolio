"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Center, Environment, Float, Lightformer, useGLTF } from "@react-three/drei";
import { toCreasedNormals } from "three-stdlib";
import * as THREE from "three";

const MODEL_URL = "/models/astronaut.glb";

// Palette. Model orientation: Y up, face toward +Z, rocket nose toward +X,
// flame toward -X, head near (-0.16, 0.61, 0.0). Colours are assigned per
// triangle by where the triangle sits on the merged mesh.
const C_SUIT = new THREE.Color("#f3f5fb");
const C_ROCKET = new THREE.Color("#edeff5");
const C_VISOR = new THREE.Color("#0a0b12");
const C_RED = new THREE.Color("#e5392b");
const C_FLAME = new THREE.Color("#ff9e33");
const C_DARK = new THREE.Color("#20222e");

function classify(x: number, y: number, z: number): THREE.Color {
  if (x < -0.85) return C_FLAME; // exhaust flame
  if (x < -0.73) return C_DARK; // nozzle ring
  if (x > 0.6) return C_RED; // nose cone

  const isAstronaut =
    y > 0.05 && x > -0.5 && x < 0.35 && z > -0.5 && z < 0.5 && y < 0.95;
  if (isAstronaut) {
    const dx = x + 0.16;
    const dy = y - 0.61;
    if (y > 0.42 && z > 0.06 && dx * dx + dy * dy < 0.03) return C_VISOR;
    return C_SUIT;
  }

  if (Math.abs(z) > 0.47) return C_RED; // side fins
  if (x < -0.52 && y > -0.08) return C_RED; // tail fin by the flame
  return C_ROCKET;
}

function Model() {
  const { scene } = useGLTF(MODEL_URL);

  const prepared = useMemo(() => {
    const root = scene.clone(true);

    const mat = new THREE.MeshPhysicalMaterial({
      vertexColors: true,
      roughness: 0.45,
      metalness: 0.0,
      clearcoat: 0.4,
      clearcoatRoughness: 0.4,
      envMapIntensity: 0.7,
    });

    root.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (!mesh.isMesh) return;

      let geo = mesh.geometry as THREE.BufferGeometry;
      if (geo.index) geo = geo.toNonIndexed();
      geo = toCreasedNormals(geo, Math.PI / 5);

      const pos = geo.attributes.position as THREE.BufferAttribute;
      const colors = new Float32Array(pos.count * 3);
      for (let t = 0; t < pos.count; t += 3) {
        const cx = (pos.getX(t) + pos.getX(t + 1) + pos.getX(t + 2)) / 3;
        const cy = (pos.getY(t) + pos.getY(t + 1) + pos.getY(t + 2)) / 3;
        const cz = (pos.getZ(t) + pos.getZ(t + 1) + pos.getZ(t + 2)) / 3;
        const c = classify(cx, cy, cz);
        for (let k = 0; k < 3; k++) {
          colors[(t + k) * 3] = c.r;
          colors[(t + k) * 3 + 1] = c.g;
          colors[(t + k) * 3 + 2] = c.b;
        }
      }
      geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

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
    if (g.current) g.current.rotation.y += delta * 0.26;
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
        <ambientLight intensity={0.6} />
        <hemisphereLight args={["#eef2ff", "#0b1024", 0.5]} />
        <directionalLight position={[4, 6, 5]} intensity={2} />
        <directionalLight position={[-5, 2, 3]} intensity={0.7} color="#cdd8ff" />
        <directionalLight position={[0, 2, -6]} intensity={1.3} color="#4468ff" />

        <Suspense fallback={null}>
          <Environment resolution={256}>
            <Lightformer intensity={2} position={[0, 3, 2]} scale={[6, 3, 1]} color="#ffffff" />
            <Lightformer intensity={1.1} position={[-4, 1, 2]} scale={[3, 4, 1]} color="#cdd8ff" />
            <Lightformer intensity={1} position={[4, 0, 3]} scale={[3, 4, 1]} color="#4468ff" />
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
