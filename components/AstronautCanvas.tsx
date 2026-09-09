"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, RoundedBox } from "@react-three/drei";
import type { Group } from "three";

function Astronaut() {
  const spin = useRef<Group>(null);
  useFrame((_, delta) => {
    if (spin.current) spin.current.rotation.y += delta * 0.4;
  });

  const statusColors = ["#4dd07a", "#ffb454", "#ff5c5c"] as const;

  return (
    <group ref={spin} position={[0, -0.15, 0]} scale={1.1}>
      {/* life-support backpack */}
      <RoundedBox
        args={[1.5, 1.75, 0.6]}
        radius={0.16}
        smoothness={4}
        position={[0, 0.35, -0.5]}
      >
        <meshStandardMaterial color="#cdd3e6" roughness={0.72} metalness={0.05} />
      </RoundedBox>

      {/* torso */}
      <mesh position={[0, 0.25, 0]}>
        <capsuleGeometry args={[0.6, 0.7, 12, 24]} />
        <meshStandardMaterial color="#eef1fb" roughness={0.5} metalness={0.05} />
      </mesh>

      {/* hips */}
      <mesh position={[0, -0.3, 0]}>
        <capsuleGeometry args={[0.5, 0.16, 10, 20]} />
        <meshStandardMaterial color="#e6eaf6" roughness={0.55} />
      </mesh>

      {/* chest control module */}
      <RoundedBox
        args={[0.64, 0.46, 0.14]}
        radius={0.04}
        smoothness={4}
        position={[0, 0.4, 0.5]}
      >
        <meshStandardMaterial color="#dfe4f4" roughness={0.6} />
      </RoundedBox>
      <mesh position={[0, 0.48, 0.59]}>
        <boxGeometry args={[0.28, 0.15, 0.02]} />
        <meshStandardMaterial color="#0b1330" emissive="#1c2f66" emissiveIntensity={0.55} />
      </mesh>
      {statusColors.map((c, i) => (
        <mesh key={c} position={[-0.17 + i * 0.17, 0.31, 0.59]}>
          <boxGeometry args={[0.08, 0.08, 0.03]} />
          <meshStandardMaterial color={c} emissive={c} emissiveIntensity={0.75} />
        </mesh>
      ))}

      {/* neck ring */}
      <mesh position={[0, 0.9, 0]}>
        <cylinderGeometry args={[0.32, 0.32, 0.16, 24]} />
        <meshStandardMaterial color="#c3cbe6" roughness={0.6} metalness={0.2} />
      </mesh>

      {/* helmet */}
      <mesh position={[0, 1.38, 0]}>
        <sphereGeometry args={[0.5, 40, 40]} />
        <meshStandardMaterial color="#f2f4fc" roughness={0.3} metalness={0.1} />
      </mesh>
      {/* black visor */}
      <mesh position={[0, 1.35, 0.17]}>
        <sphereGeometry args={[0.44, 40, 40]} />
        <meshStandardMaterial
          color="#05060d"
          roughness={0.12}
          metalness={0.55}
          envMapIntensity={0.4}
        />
      </mesh>

      {/* antenna */}
      <mesh position={[0, 1.96, -0.12]}>
        <cylinderGeometry args={[0.02, 0.02, 0.22, 8]} />
        <meshStandardMaterial color="#c3cbe6" />
      </mesh>
      <mesh position={[0, 2.08, -0.12]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color="#4468ff" emissive="#4468ff" emissiveIntensity={1.1} />
      </mesh>

      {/* arms */}
      {[-1, 1].map((s) => (
        <group
          key={s}
          position={[s * 0.72, 0.42, 0.02]}
          rotation={[0.6, 0, s * 0.16]}
        >
          <mesh>
            <capsuleGeometry args={[0.19, 0.64, 10, 18]} />
            <meshStandardMaterial color="#e9edfa" roughness={0.5} />
          </mesh>
          <mesh position={[0, -0.52, 0.12]}>
            <sphereGeometry args={[0.2, 20, 20]} />
            <meshStandardMaterial color="#f4f6fc" roughness={0.45} />
          </mesh>
        </group>
      ))}

      {/* legs */}
      {[-1, 1].map((s) => (
        <group key={s} position={[s * 0.26, -0.66, 0]}>
          <mesh>
            <capsuleGeometry args={[0.22, 0.62, 10, 18]} />
            <meshStandardMaterial color="#eef1fb" roughness={0.5} />
          </mesh>
          <RoundedBox
            args={[0.32, 0.22, 0.46]}
            radius={0.08}
            smoothness={4}
            position={[0, -0.5, 0.12]}
          >
            <meshStandardMaterial color="#e0e5f4" roughness={0.55} />
          </RoundedBox>
        </group>
      ))}
    </group>
  );
}

export default function AstronautCanvas({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0.35, 6], fov: 34 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.7} />
        <hemisphereLight args={["#e6ecff", "#0a0e1c", 0.6]} />
        <directionalLight position={[4, 6, 5]} intensity={2.4} />
        <directionalLight position={[-5, 1, -2]} intensity={0.8} color="#4468ff" />
        <Suspense fallback={null}>
          <Float speed={1.6} rotationIntensity={0.3} floatIntensity={0.9}>
            <Astronaut />
          </Float>
        </Suspense>
      </Canvas>
    </div>
  );
}
