"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

const suit = { color: "#f5f7fe", roughness: 0.5, metalness: 0 } as const;

function Astronaut() {
  const sway = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (sway.current) {
      const t = state.clock.elapsedTime;
      sway.current.rotation.y = Math.sin(t * 0.4) * 0.38;
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
    ctx.fillText("</>", 160, 110);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  return (
    <group ref={sway} position={[0, -0.15, 0]} rotation={[0.04, 0, 0]}>
      {/* life-support backpack */}
      <RoundedBox args={[0.9, 1.1, 0.42]} radius={0.12} smoothness={4} position={[0, 0.5, -0.42]}>
        <meshStandardMaterial {...suit} color="#e6eaf7" roughness={0.55} />
      </RoundedBox>

      {/* torso */}
      <mesh position={[0, 0.4, 0]}>
        <capsuleGeometry args={[0.37, 0.66, 16, 32]} />
        <meshStandardMaterial {...suit} />
      </mesh>

      {/* shoulder pads */}
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * 0.4, 0.7, 0]}>
          <sphereGeometry args={[0.19, 24, 24]} />
          <meshStandardMaterial {...suit} />
        </mesh>
      ))}

      {/* waist belt + buckle */}
      <mesh position={[0, 0.06, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.37, 0.05, 12, 32]} />
        <meshStandardMaterial color="#2a3358" roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.06, 0.36]}>
        <boxGeometry args={[0.16, 0.13, 0.06]} />
        <meshStandardMaterial color="#ff5c5c" emissive="#ff5c5c" emissiveIntensity={0.25} />
      </mesh>

      {/* chest square */}
      <mesh position={[0, 0.6, 0.34]}>
        <boxGeometry args={[0.16, 0.16, 0.05]} />
        <meshStandardMaterial color="#4468ff" emissive="#4468ff" emissiveIntensity={0.4} />
      </mesh>

      {/* neck ring */}
      <mesh position={[0, 0.86, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.13, 24]} />
        <meshStandardMaterial color="#d7dcee" roughness={0.5} metalness={0.15} />
      </mesh>

      {/* helmet */}
      <mesh position={[0, 1.22, 0]}>
        <sphereGeometry args={[0.42, 44, 44]} />
        <meshStandardMaterial {...suit} roughness={0.35} />
      </mesh>
      {/* visor frame */}
      <mesh position={[0, 1.19, 0.13]}>
        <torusGeometry args={[0.31, 0.045, 14, 34]} />
        <meshStandardMaterial {...suit} roughness={0.4} />
      </mesh>
      {/* black glass visor */}
      <mesh position={[0, 1.19, 0.14]}>
        <sphereGeometry args={[0.31, 40, 40]} />
        <meshStandardMaterial color="#05060d" roughness={0.06} metalness={0.7} />
      </mesh>
      {/* two visor glares */}
      <mesh position={[-0.12, 1.3, 0.4]}>
        <sphereGeometry args={[0.055, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh position={[-0.02, 1.24, 0.42]}>
        <sphereGeometry args={[0.028, 14, 14]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* antenna */}
      <mesh position={[0.18, 1.6, -0.04]} rotation={[0, 0, -0.32]}>
        <cylinderGeometry args={[0.014, 0.014, 0.24, 8]} />
        <meshStandardMaterial color="#c3cbe6" />
      </mesh>
      <mesh position={[0.24, 1.72, -0.04]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="#4468ff" emissive="#4468ff" emissiveIntensity={1.3} />
      </mesh>

      {/* arms bent forward onto the laptop */}
      {[-1, 1].map((s) => (
        <group key={s} position={[s * 0.42, 0.58, 0.04]} rotation={[-1.0, 0, s * 0.12]}>
          <mesh position={[0, -0.28, 0]}>
            <capsuleGeometry args={[0.125, 0.44, 12, 20]} />
            <meshStandardMaterial {...suit} />
          </mesh>
          <mesh position={[0, -0.52, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.12, 0.03, 10, 20]} />
            <meshStandardMaterial color="#d7dcee" roughness={0.5} />
          </mesh>
          <mesh position={[0, -0.6, 0.02]}>
            <sphereGeometry args={[0.14, 22, 22]} />
            <meshStandardMaterial color="#ffffff" roughness={0.4} />
          </mesh>
        </group>
      ))}

      {/* legs */}
      {[-1, 1].map((s) => (
        <group key={s} position={[s * 0.17, -0.5, 0]}>
          <mesh>
            <capsuleGeometry args={[0.15, 0.6, 12, 20]} />
            <meshStandardMaterial {...suit} />
          </mesh>
          <mesh position={[0, -0.02, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.15, 0.025, 10, 20]} />
            <meshStandardMaterial color="#d7dcee" roughness={0.5} />
          </mesh>
          <RoundedBox args={[0.24, 0.18, 0.4]} radius={0.07} smoothness={4} position={[0, -0.5, 0.09]}>
            <meshStandardMaterial {...suit} color="#e6eaf7" />
          </RoundedBox>
        </group>
      ))}

      {/* laptop */}
      <group position={[0, 0.2, 0.5]} rotation={[0.14, 0, 0]}>
        <RoundedBox args={[0.92, 0.05, 0.58]} radius={0.02} smoothness={3}>
          <meshStandardMaterial color="#2c3450" roughness={0.5} metalness={0.25} />
        </RoundedBox>
        <group position={[0, 0.27, -0.27]} rotation={[-0.52, 0, 0]}>
          <RoundedBox args={[0.92, 0.54, 0.04]} radius={0.02} smoothness={3}>
            <meshStandardMaterial color="#1b2138" roughness={0.5} />
          </RoundedBox>
          <mesh position={[0, 0, 0.031]}>
            <planeGeometry args={[0.8, 0.44]} />
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
        camera={{ position: [0, 0.35, 5.4], fov: 32 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={1} />
        <hemisphereLight args={["#eef2ff", "#0b1024", 0.7]} />
        <directionalLight position={[4, 6, 5]} intensity={2.6} />
        <directionalLight position={[-4, 2, 3]} intensity={0.9} color="#cdd8ff" />
        <directionalLight position={[0, 2, -5]} intensity={1.2} color="#4468ff" />
        <Suspense fallback={null}>
          <Float speed={1.5} rotationIntensity={0.12} floatIntensity={0.7}>
            <Astronaut />
          </Float>
        </Suspense>
      </Canvas>
    </div>
  );
}
