"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

function Astronaut() {
  const sway = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (sway.current) {
      const t = state.clock.elapsedTime;
      sway.current.rotation.y = Math.sin(t * 0.4) * 0.4;
      sway.current.rotation.z = Math.sin(t * 0.55) * 0.02;
    }
  });

  const screenTex = useMemo(() => {
    if (typeof document === "undefined") return null;
    const c = document.createElement("canvas");
    c.width = 320;
    c.height = 200;
    const ctx = c.getContext("2d");
    if (!ctx) return null;
    ctx.fillStyle = "#0a1024";
    ctx.fillRect(0, 0, 320, 200);
    ctx.fillStyle = "#9db8ff";
    ctx.font = "bold 108px ui-monospace, monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("</>", 160, 108);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  const suit = (
    <meshStandardMaterial color="#f4f6fd" roughness={0.45} metalness={0} />
  );

  return (
    <group ref={sway} position={[0, -0.25, 0]} scale={0.92} rotation={[0.05, 0, 0]}>
      {/* backpack */}
      <RoundedBox
        args={[0.86, 1.12, 0.4]}
        radius={0.12}
        smoothness={4}
        position={[0, 0.5, -0.42]}
      >
        <meshStandardMaterial color="#e4e8f6" roughness={0.55} />
      </RoundedBox>

      {/* torso (slim) */}
      <mesh position={[0, 0.42, 0]}>
        <capsuleGeometry args={[0.4, 0.82, 14, 28]} />
        {suit}
      </mesh>

      {/* waist belt */}
      <mesh position={[0, 0.02, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.4, 0.055, 10, 28]} />
        <meshStandardMaterial color="#2a3358" roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.02, 0.4]}>
        <boxGeometry args={[0.16, 0.13, 0.06]} />
        <meshStandardMaterial color="#4468ff" emissive="#4468ff" emissiveIntensity={0.35} />
      </mesh>

      {/* chest square */}
      <mesh position={[0, 0.6, 0.38]}>
        <boxGeometry args={[0.17, 0.17, 0.05]} />
        <meshStandardMaterial color="#ff5c5c" emissive="#ff5c5c" emissiveIntensity={0.3} />
      </mesh>

      {/* neck ring */}
      <mesh position={[0, 0.9, 0]}>
        <cylinderGeometry args={[0.24, 0.24, 0.14, 24]} />
        <meshStandardMaterial color="#d7dcee" roughness={0.5} metalness={0.15} />
      </mesh>

      {/* helmet */}
      <mesh position={[0, 1.28, 0]}>
        <sphereGeometry args={[0.44, 40, 40]} />
        {suit}
      </mesh>
      {/* visor frame */}
      <mesh position={[0, 1.24, 0.14]}>
        <torusGeometry args={[0.32, 0.05, 12, 30]} />
        <meshStandardMaterial color="#f4f6fd" roughness={0.4} />
      </mesh>
      {/* black glass visor */}
      <mesh position={[0, 1.24, 0.15]}>
        <sphereGeometry args={[0.32, 36, 36]} />
        <meshStandardMaterial color="#05060d" roughness={0.08} metalness={0.65} />
      </mesh>
      {/* visor glare */}
      <mesh position={[-0.12, 1.34, 0.42]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* antenna */}
      <mesh position={[0.16, 1.66, -0.06]} rotation={[0, 0, -0.3]}>
        <cylinderGeometry args={[0.015, 0.015, 0.24, 8]} />
        <meshStandardMaterial color="#c3cbe6" />
      </mesh>
      <mesh position={[0.22, 1.78, -0.06]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="#4468ff" emissive="#4468ff" emissiveIntensity={1.2} />
      </mesh>

      {/* arms bent forward to hold the laptop */}
      {[-1, 1].map((s) => (
        <group
          key={s}
          position={[s * 0.44, 0.6, 0.06]}
          rotation={[-1.12, 0, s * 0.14]}
        >
          <mesh position={[0, -0.3, 0]}>
            <capsuleGeometry args={[0.135, 0.5, 10, 18]} />
            {suit}
          </mesh>
          <mesh position={[0, -0.62, 0]}>
            <sphereGeometry args={[0.15, 20, 20]} />
            <meshStandardMaterial color="#ffffff" roughness={0.4} />
          </mesh>
        </group>
      ))}

      {/* legs (slim, close) */}
      {[-1, 1].map((s) => (
        <group key={s} position={[s * 0.18, -0.5, 0]}>
          <mesh>
            <capsuleGeometry args={[0.16, 0.66, 10, 18]} />
            {suit}
          </mesh>
          <RoundedBox
            args={[0.26, 0.18, 0.42]}
            radius={0.07}
            smoothness={4}
            position={[0, -0.52, 0.09]}
          >
            <meshStandardMaterial color="#e4e8f6" roughness={0.5} />
          </RoundedBox>
        </group>
      ))}

      {/* laptop */}
      <group position={[0, 0.02, 0.62]} rotation={[0.12, 0, 0]}>
        <RoundedBox args={[0.98, 0.05, 0.62]} radius={0.02} smoothness={3}>
          <meshStandardMaterial color="#2c3450" roughness={0.5} metalness={0.2} />
        </RoundedBox>
        <group position={[0, 0.28, -0.28]} rotation={[-0.5, 0, 0]}>
          <RoundedBox args={[0.98, 0.56, 0.04]} radius={0.02} smoothness={3}>
            <meshStandardMaterial color="#1b2138" roughness={0.5} />
          </RoundedBox>
          <mesh position={[0, 0, 0.03]}>
            <planeGeometry args={[0.86, 0.46]} />
            {screenTex ? (
              <meshBasicMaterial map={screenTex} toneMapped={false} />
            ) : (
              <meshBasicMaterial color="#0a1024" toneMapped={false} />
            )}
          </mesh>
        </group>
      </group>
    </group>
  );
}

export default function AstronautCanvas({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas
        flat
        dpr={[1, 2]}
        camera={{ position: [0, 0.15, 6], fov: 34 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.95} />
        <hemisphereLight args={["#eef2ff", "#0b1024", 0.7]} />
        <directionalLight position={[4, 6, 5]} intensity={2.6} />
        <directionalLight position={[-4, 2, 3]} intensity={0.8} color="#cdd8ff" />
        <directionalLight position={[0, 3, -5]} intensity={1.1} color="#4468ff" />
        <Suspense fallback={null}>
          <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.8}>
            <Astronaut />
          </Float>
        </Suspense>
      </Canvas>
    </div>
  );
}
