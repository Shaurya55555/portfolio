"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Center, Environment, Float, Lightformer, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

// Original design, generic astronaut-on-a-rocket. Every part is a primitive
// with its own material.
const WHITE = "#f4f6fb";
const WHITE_DK = "#e0e4f0";
const RING = "#c7cee4";
const VISOR = "#05060d";
const RED = "#e23b2f";
const RED_DK = "#b02c22";
const BLUE = "#2f9fe0";
const ACCENT = "#4468ff";
const NOZZLE = "#20232e";
const FLAME_O = "#ff7a1a";
const FLAME_Y = "#ffd23a";

function Rocket() {
  return (
    <group position={[0, -0.62, 0]}>
      {/* body */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <capsuleGeometry args={[0.52, 1.5, 20, 36]} />
        <meshStandardMaterial color={WHITE} roughness={0.4} />
      </mesh>
      {/* red band */}
      <mesh position={[-0.55, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.53, 0.53, 0.36, 36]} />
        <meshStandardMaterial color={RED} roughness={0.45} />
      </mesh>

      {/* nose cone (+X) */}
      <mesh position={[1.28, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <coneGeometry args={[0.52, 0.8, 36]} />
        <meshStandardMaterial color={RED} roughness={0.45} />
      </mesh>

      {/* nozzle (-X) */}
      <mesh position={[-1.18, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.42, 0.3, 0.34, 28]} />
        <meshStandardMaterial color={NOZZLE} roughness={0.5} metalness={0.4} />
      </mesh>

      {/* exhaust flame */}
      <mesh position={[-1.5, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <coneGeometry args={[0.34, 0.8, 24]} />
        <meshStandardMaterial color={FLAME_O} emissive={FLAME_O} emissiveIntensity={1.4} toneMapped={false} />
      </mesh>
      <mesh position={[-1.42, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <coneGeometry args={[0.2, 0.5, 20]} />
        <meshStandardMaterial color={FLAME_Y} emissive={FLAME_Y} emissiveIntensity={1.6} toneMapped={false} />
      </mesh>

      {/* fins around the tail */}
      {[0, 1, 2, 3].map((i) => (
        <mesh
          key={i}
          rotation={[(i * Math.PI) / 2, 0, 0]}
          position={[-0.85, 0, 0]}
        >
          <mesh position={[0, 0.42, 0]} rotation={[0, 0, 0.35]}>
            <boxGeometry args={[0.55, 0.5, 0.06]} />
            <meshStandardMaterial color={RED} roughness={0.45} />
          </mesh>
        </mesh>
      ))}

      {/* porthole window on +Z */}
      <mesh position={[0.15, 0, 0.5]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.05, 28]} />
        <meshStandardMaterial color={RED_DK} roughness={0.45} />
      </mesh>
      <mesh position={[0.15, 0, 0.53]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.04, 28]} />
        <meshStandardMaterial color={BLUE} roughness={0.15} metalness={0.2} emissive={BLUE} emissiveIntensity={0.2} />
      </mesh>
    </group>
  );
}

function AstronautBody() {
  const screenTex = useMemo(() => {
    if (typeof document === "undefined") return null;
    const c = document.createElement("canvas");
    c.width = 256;
    c.height = 160;
    const ctx = c.getContext("2d");
    if (!ctx) return null;
    ctx.fillStyle = "#0a1024";
    ctx.fillRect(0, 0, 256, 160);
    ctx.fillStyle = "#9db8ff";
    ctx.font = "bold 84px ui-monospace, monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("</>", 128, 88);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  return (
    <group position={[0.05, 0.16, 0.12]}>
      {/* backpack */}
      <RoundedBox args={[0.8, 0.9, 0.36]} radius={0.12} smoothness={4} position={[0, 0.42, -0.34]}>
        <meshStandardMaterial color={WHITE_DK} roughness={0.55} />
      </RoundedBox>

      {/* torso, slightly reclined */}
      <group rotation={[-0.12, 0, 0]}>
        <mesh position={[0, 0.34, 0]}>
          <capsuleGeometry args={[0.32, 0.5, 18, 30]} />
          <meshStandardMaterial color={WHITE} roughness={0.4} />
        </mesh>
        {[-1, 1].map((s) => (
          <mesh key={s} position={[s * 0.34, 0.56, 0]}>
            <sphereGeometry args={[0.16, 24, 24]} />
            <meshStandardMaterial color={WHITE} roughness={0.4} />
          </mesh>
        ))}
        {/* belt + buckle */}
        <mesh position={[0, 0.06, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.32, 0.045, 12, 32]} />
          <meshStandardMaterial color={NOZZLE} roughness={0.55} />
        </mesh>
        <mesh position={[0, 0.06, 0.31]}>
          <boxGeometry args={[0.14, 0.11, 0.05]} />
          <meshStandardMaterial color={RED} emissive={RED} emissiveIntensity={0.25} />
        </mesh>
        {/* chest lights */}
        {[-0.09, 0.02, 0.13].map((x, i) => (
          <mesh key={i} position={[x, 0.4, 0.29]}>
            <boxGeometry args={[0.045, 0.045, 0.02]} />
            <meshStandardMaterial color={i === 1 ? ACCENT : "#9db8ff"} emissive={i === 1 ? ACCENT : "#9db8ff"} emissiveIntensity={0.8} />
          </mesh>
        ))}
        {/* neck ring */}
        <mesh position={[0, 0.74, 0.02]}>
          <cylinderGeometry args={[0.2, 0.2, 0.12, 24]} />
          <meshStandardMaterial color={RING} roughness={0.45} metalness={0.2} />
        </mesh>
        {/* helmet */}
        <mesh position={[0, 1.08, 0.02]}>
          <sphereGeometry args={[0.4, 44, 44]} />
          <meshStandardMaterial color={WHITE} roughness={0.32} />
        </mesh>
        <mesh position={[0, 1.05, 0.14]}>
          <torusGeometry args={[0.29, 0.045, 14, 36]} />
          <meshStandardMaterial color={WHITE} roughness={0.4} />
        </mesh>
        <mesh position={[0, 1.05, 0.15]}>
          <sphereGeometry args={[0.29, 40, 40]} />
          <meshStandardMaterial color={VISOR} roughness={0.05} metalness={0.6} />
        </mesh>
        <mesh position={[-0.1, 1.15, 0.4]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        <mesh position={[0.02, 1.1, 0.42]}>
          <sphereGeometry args={[0.024, 14, 14]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        {/* antenna */}
        <mesh position={[0.2, 1.42, -0.05]} rotation={[0, 0, -0.3]}>
          <cylinderGeometry args={[0.012, 0.012, 0.22, 8]} />
          <meshStandardMaterial color={RING} />
        </mesh>
        <mesh position={[0.26, 1.53, -0.05]}>
          <sphereGeometry args={[0.045, 16, 16]} />
          <meshStandardMaterial color={ACCENT} emissive={ACCENT} emissiveIntensity={1.3} />
        </mesh>

        {/* right arm raised in a wave */}
        <group position={[0.36, 0.52, 0.02]} rotation={[0, 0, -1.35]}>
          <mesh position={[0, 0.26, 0]}>
            <capsuleGeometry args={[0.11, 0.4, 12, 20]} />
            <meshStandardMaterial color={WHITE} roughness={0.4} />
          </mesh>
          <mesh position={[0, 0.52, 0]}>
            <sphereGeometry args={[0.13, 22, 22]} />
            <meshStandardMaterial color={WHITE} roughness={0.38} />
          </mesh>
        </group>

        {/* left arm resting forward onto the laptop */}
        <group position={[-0.36, 0.5, 0.06]} rotation={[-1.15, 0, 0.2]}>
          <mesh position={[0, -0.26, 0]}>
            <capsuleGeometry args={[0.11, 0.4, 12, 20]} />
            <meshStandardMaterial color={WHITE} roughness={0.4} />
          </mesh>
          <mesh position={[0, -0.5, 0.02]}>
            <sphereGeometry args={[0.13, 22, 22]} />
            <meshStandardMaterial color={WHITE} roughness={0.38} />
          </mesh>
        </group>
      </group>

      {/* legs, bent forward over the rocket (sitting) */}
      {[-1, 1].map((s) => (
        <group key={s} position={[s * 0.17, 0.0, 0]}>
          {/* thigh forward */}
          <mesh position={[0, -0.06, 0.22]} rotation={[Math.PI / 2, 0, 0]}>
            <capsuleGeometry args={[0.13, 0.3, 12, 20]} />
            <meshStandardMaterial color={WHITE} roughness={0.4} />
          </mesh>
          {/* knee */}
          <mesh position={[0, -0.08, 0.42]}>
            <sphereGeometry args={[0.14, 20, 20]} />
            <meshStandardMaterial color={WHITE} roughness={0.4} />
          </mesh>
          {/* shin down */}
          <mesh position={[0, -0.34, 0.44]}>
            <capsuleGeometry args={[0.12, 0.3, 12, 20]} />
            <meshStandardMaterial color={WHITE} roughness={0.4} />
          </mesh>
          {/* boot */}
          <RoundedBox args={[0.22, 0.16, 0.34]} radius={0.06} smoothness={4} position={[0, -0.56, 0.5]}>
            <meshStandardMaterial color={WHITE_DK} roughness={0.45} />
          </RoundedBox>
        </group>
      ))}

      {/* laptop on the lap */}
      <group position={[-0.02, -0.12, 0.5]} rotation={[0.2, 0, 0]}>
        <RoundedBox args={[0.72, 0.045, 0.46]} radius={0.02} smoothness={3}>
          <meshStandardMaterial color="#2c3450" roughness={0.5} metalness={0.25} />
        </RoundedBox>
        <group position={[0, 0.22, -0.22]} rotation={[-0.5, 0, 0]}>
          <RoundedBox args={[0.72, 0.44, 0.035]} radius={0.02} smoothness={3}>
            <meshStandardMaterial color="#1b2138" roughness={0.5} />
          </RoundedBox>
          <mesh position={[0, 0, 0.027]}>
            <planeGeometry args={[0.62, 0.34]} />
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

function Rig() {
  const spin = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (spin.current) {
      const t = state.clock.elapsedTime;
      spin.current.rotation.y = Math.sin(t * 0.32) * 0.55;
      spin.current.rotation.z = Math.sin(t * 0.45) * 0.02;
    }
  });
  return (
    <group ref={spin}>
      <group scale={0.92}>
        <Center>
          <Rocket />
          <AstronautBody />
        </Center>
      </group>
    </group>
  );
}

export default function AstronautCanvas({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0.3, 6], fov: 34 }}
        gl={{ alpha: true, antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
      >
        <ambientLight intensity={0.7} />
        <hemisphereLight args={["#eef2ff", "#0b1024", 0.6]} />
        <directionalLight position={[4, 6, 5]} intensity={2.3} />
        <directionalLight position={[-5, 2, 3]} intensity={0.8} color="#cdd8ff" />
        <directionalLight position={[0, 2, -6]} intensity={1.3} color={ACCENT} />

        <Suspense fallback={null}>
          <Environment resolution={256}>
            <Lightformer intensity={2} position={[0, 3, 2]} scale={[6, 3, 1]} color="#ffffff" />
            <Lightformer intensity={1.1} position={[-4, 1, 2]} scale={[3, 4, 1]} color="#cdd8ff" />
            <Lightformer intensity={1} position={[4, 0, 3]} scale={[3, 4, 1]} color={ACCENT} />
          </Environment>

          <Float speed={1.1} rotationIntensity={0.06} floatIntensity={0.5}>
            <Rig />
          </Float>
        </Suspense>
      </Canvas>
    </div>
  );
}
