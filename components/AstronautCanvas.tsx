"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Center, Environment, Float, Lightformer, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

/**
 * Original procedural astronaut, built from primitives so every part carries
 * its own crisp material. White EVA suit, black glass visor, blue accents.
 */

const WHITE = "#f4f6fb";
const WHITE_DK = "#dfe3f0";
const RING = "#c9d0e6";
const DARK = "#141824";
const BLUE = "#4468ff";
const BLUE_SOFT = "#9db8ff";

function Astronaut() {
  const spin = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (spin.current) {
      const t = state.clock.elapsedTime;
      // gentle sway so the laptop stays toward the viewer
      spin.current.rotation.y = Math.sin(t * 0.35) * 0.5;
      spin.current.rotation.z = Math.sin(t * 0.5) * 0.02;
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
    ctx.fillStyle = BLUE_SOFT;
    ctx.font = "bold 104px ui-monospace, monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("</>", 160, 112);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  return (
    <group ref={spin} position={[0, -0.1, 0]}>
      {/* backpack */}
      <RoundedBox args={[0.92, 1.06, 0.42]} radius={0.13} smoothness={4} position={[0, 0.5, -0.4]}>
        <meshStandardMaterial color={WHITE_DK} roughness={0.55} />
      </RoundedBox>
      <RoundedBox args={[0.5, 0.24, 0.16]} radius={0.05} smoothness={3} position={[0, 0.02, -0.5]}>
        <meshStandardMaterial color={RING} roughness={0.5} metalness={0.2} />
      </RoundedBox>

      {/* torso */}
      <mesh position={[0, 0.42, 0]}>
        <capsuleGeometry args={[0.36, 0.62, 18, 32]} />
        <meshStandardMaterial color={WHITE} roughness={0.42} />
      </mesh>

      {/* shoulder pads */}
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * 0.38, 0.7, 0]}>
          <sphereGeometry args={[0.18, 24, 24]} />
          <meshStandardMaterial color={WHITE} roughness={0.42} />
        </mesh>
      ))}

      {/* waist ring + buckle */}
      <mesh position={[0, 0.08, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.36, 0.05, 14, 36]} />
        <meshStandardMaterial color={DARK} roughness={0.55} />
      </mesh>
      <mesh position={[0, 0.08, 0.35]}>
        <boxGeometry args={[0.16, 0.12, 0.06]} />
        <meshStandardMaterial color={BLUE} emissive={BLUE} emissiveIntensity={0.35} />
      </mesh>

      {/* chest module */}
      <RoundedBox args={[0.4, 0.3, 0.12]} radius={0.03} smoothness={3} position={[0, 0.46, 0.34]}>
        <meshStandardMaterial color={WHITE_DK} roughness={0.5} />
      </RoundedBox>
      {[-0.1, 0, 0.1].map((x, i) => (
        <mesh key={i} position={[x, 0.42, 0.41]}>
          <boxGeometry args={[0.05, 0.05, 0.02]} />
          <meshStandardMaterial
            color={i === 1 ? BLUE : BLUE_SOFT}
            emissive={i === 1 ? BLUE : BLUE_SOFT}
            emissiveIntensity={0.8}
          />
        </mesh>
      ))}

      {/* neck ring */}
      <mesh position={[0, 0.86, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.14, 28]} />
        <meshStandardMaterial color={RING} roughness={0.45} metalness={0.25} />
      </mesh>

      {/* helmet */}
      <mesh position={[0, 1.24, 0]}>
        <sphereGeometry args={[0.44, 48, 48]} />
        <meshStandardMaterial color={WHITE} roughness={0.32} />
      </mesh>
      {/* visor frame */}
      <mesh position={[0, 1.21, 0.12]}>
        <torusGeometry args={[0.32, 0.05, 16, 40]} />
        <meshStandardMaterial color={WHITE} roughness={0.4} />
      </mesh>
      {/* black glass visor */}
      <mesh position={[0, 1.21, 0.13]}>
        <sphereGeometry args={[0.32, 44, 44]} />
        <meshStandardMaterial color="#05060d" roughness={0.05} metalness={0.6} />
      </mesh>
      {/* glares */}
      <mesh position={[-0.12, 1.32, 0.4]}>
        <sphereGeometry args={[0.055, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0, 1.26, 0.42]}>
        <sphereGeometry args={[0.026, 14, 14]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* antenna */}
      <mesh position={[0.2, 1.6, -0.05]} rotation={[0, 0, -0.32]}>
        <cylinderGeometry args={[0.013, 0.013, 0.24, 8]} />
        <meshStandardMaterial color={RING} />
      </mesh>
      <mesh position={[0.26, 1.72, -0.05]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color={BLUE} emissive={BLUE} emissiveIntensity={1.3} />
      </mesh>

      {/* arms bent forward to the laptop */}
      {[-1, 1].map((s) => (
        <group key={s} position={[s * 0.42, 0.58, 0.04]} rotation={[-1.05, 0, s * 0.12]}>
          <mesh position={[0, -0.28, 0]}>
            <capsuleGeometry args={[0.12, 0.44, 14, 22]} />
            <meshStandardMaterial color={WHITE} roughness={0.42} />
          </mesh>
          <mesh position={[0, -0.52, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.115, 0.028, 10, 22]} />
            <meshStandardMaterial color={RING} roughness={0.45} />
          </mesh>
          <mesh position={[0, -0.6, 0.03]}>
            <sphereGeometry args={[0.135, 24, 24]} />
            <meshStandardMaterial color={WHITE} roughness={0.38} />
          </mesh>
        </group>
      ))}

      {/* legs */}
      {[-1, 1].map((s) => (
        <group key={s} position={[s * 0.17, -0.48, 0]}>
          <mesh>
            <capsuleGeometry args={[0.15, 0.58, 14, 22]} />
            <meshStandardMaterial color={WHITE} roughness={0.42} />
          </mesh>
          <mesh position={[0, -0.02, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.15, 0.024, 10, 22]} />
            <meshStandardMaterial color={RING} roughness={0.45} />
          </mesh>
          <RoundedBox args={[0.24, 0.18, 0.4]} radius={0.07} smoothness={4} position={[0, -0.48, 0.09]}>
            <meshStandardMaterial color={WHITE_DK} roughness={0.45} />
          </RoundedBox>
        </group>
      ))}

      {/* laptop */}
      <group position={[0, 0.2, 0.52]} rotation={[0.16, 0, 0]}>
        <RoundedBox args={[0.9, 0.05, 0.56]} radius={0.02} smoothness={3}>
          <meshStandardMaterial color="#2c3450" roughness={0.5} metalness={0.25} />
        </RoundedBox>
        <group position={[0, 0.26, -0.26]} rotation={[-0.5, 0, 0]}>
          <RoundedBox args={[0.9, 0.52, 0.04]} radius={0.02} smoothness={3}>
            <meshStandardMaterial color="#1b2138" roughness={0.5} />
          </RoundedBox>
          <mesh position={[0, 0, 0.031]}>
            <planeGeometry args={[0.78, 0.42]} />
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
  return (
    <group scale={1.15}>
      <Center>
        <Astronaut />
      </Center>
    </group>
  );
}

export default function AstronautCanvas({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0.2, 5.4], fov: 32 }}
        gl={{ alpha: true, antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
      >
        <ambientLight intensity={0.7} />
        <hemisphereLight args={["#eef2ff", "#0b1024", 0.6]} />
        <directionalLight position={[4, 6, 5]} intensity={2.3} />
        <directionalLight position={[-5, 2, 3]} intensity={0.8} color="#cdd8ff" />
        <directionalLight position={[0, 2, -6]} intensity={1.3} color={BLUE} />

        <Suspense fallback={null}>
          <Environment resolution={256}>
            <Lightformer intensity={2} position={[0, 3, 2]} scale={[6, 3, 1]} color="#ffffff" />
            <Lightformer intensity={1.1} position={[-4, 1, 2]} scale={[3, 4, 1]} color="#cdd8ff" />
            <Lightformer intensity={1} position={[4, 0, 3]} scale={[3, 4, 1]} color={BLUE} />
          </Environment>

          <Float speed={1.2} rotationIntensity={0.08} floatIntensity={0.6}>
            <Rig />
          </Float>
        </Suspense>
      </Canvas>
    </div>
  );
}
