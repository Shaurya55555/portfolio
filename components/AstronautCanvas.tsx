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

    // clamp helper for the position-based tint
    const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

    root.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (!mesh.isMesh) return;

      const geo = mesh.geometry as THREE.BufferGeometry;
      geo.computeVertexNormals();
      geo.computeBoundingBox();
      const bb = geo.boundingBox!;
      const size = new THREE.Vector3();
      bb.getSize(size);

      // The file ships with no materials or UVs and is one merged mesh, so we
      // paint it with vertex colours from position: mostly white suit, with a
      // dark visor zone at the upper front of the head and small accent bands.
      const pos = geo.attributes.position as THREE.BufferAttribute;
      const colors = new Float32Array(pos.count * 3);
      const white = new THREE.Color("#eef1f8");
      const dark = new THREE.Color("#07080f");
      const accent = new THREE.Color("#4468ff");

      const headY = bb.min.y + size.y * 0.6; // above this is the helmet region
      const frontZ = bb.min.z + size.z * 0.55; // toward the camera
      const v = new THREE.Vector3();

      for (let i = 0; i < pos.count; i++) {
        v.fromBufferAttribute(pos, i);
        let c = white;

        // visor: upper + front, near the vertical centre line
        const nx = Math.abs(v.x - (bb.min.x + size.x * 0.5)) / (size.x * 0.5);
        if (v.y > headY && v.z > frontZ && nx < 0.7) {
          const t = clamp01((v.y - headY) / (size.y * 0.4));
          c = white.clone().lerp(dark, 0.35 + 0.6 * t);
        } else if (
          v.y > bb.min.y + size.y * 0.32 &&
          v.y < bb.min.y + size.y * 0.4 &&
          v.z > bb.min.z + size.z * 0.35
        ) {
          // thin accent band around the mid-torso
          c = accent;
        }

        colors[i * 3] = c.r;
        colors[i * 3 + 1] = c.g;
        colors[i * 3 + 2] = c.b;
      }
      geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      mesh.material = new THREE.MeshStandardMaterial({
        vertexColors: true,
        roughness: 0.55,
        metalness: 0.08,
      });
      mesh.castShadow = true;
      mesh.receiveShadow = true;
    });

    return root;
  }, [scene]);

  return <primitive object={prepared} />;
}

function Rig() {
  const g = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (g.current) {
      g.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.35) * 0.45;
    }
  });
  return (
    <group ref={g} scale={2.2}>
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
        camera={{ position: [0, 0.4, 5.2], fov: 34 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={1} />
        <hemisphereLight args={["#eef2ff", "#0b1024", 0.7]} />
        <directionalLight position={[4, 6, 5]} intensity={2.6} />
        <directionalLight position={[-4, 2, 3]} intensity={0.9} color="#cdd8ff" />
        <directionalLight position={[0, 2, -5]} intensity={1.2} color="#4468ff" />
        <Suspense fallback={null}>
          <Float speed={1.4} rotationIntensity={0.12} floatIntensity={0.7}>
            <Rig />
          </Float>
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload(MODEL_URL);
