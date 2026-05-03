"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

export default function Avatar({
  pointer,
}: {
  pointer: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const head = useRef<THREE.Group>(null);
  const body = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (head.current) {
      const tx = THREE.MathUtils.clamp(pointer.current.x, -1, 1);
      const ty = THREE.MathUtils.clamp(pointer.current.y, -1, 1);
      head.current.rotation.y = THREE.MathUtils.damp(head.current.rotation.y, tx * 0.28, 4, 0.016);
      head.current.rotation.x = THREE.MathUtils.damp(head.current.rotation.x, -ty * 0.14, 4, 0.016);
    }
    if (body.current) {
      body.current.position.y = Math.sin(t * 1.1) * 0.014;
      body.current.rotation.z = Math.sin(t * 0.5) * 0.01;
    }
  });

  // ── Color palette ───────────────────────────────────────────────
  const skin       = "#e8a878";
  const skinDark   = "#c87c50";
  const skinRosy   = "#e87060";
  const hair       = "#241008";
  const sweater    = "#e8a018";   // mustard yellow
  const sweaterDk  = "#c88010";
  const pants      = "#12121e";   // black
  const shoes      = "#f0ede5";   // cream white sneakers
  const shoeSole   = "#d8d4cc";
  const shoeDetail = "#c8c4bc";
  const glass      = "#1a1820";   // dark glasses frame
  const bp         = "#c8a870";   // backpack tan
  const bpDk       = "#a08448";   // backpack shadow
  const sclera     = "#f8f2ec";
  const iris       = "#231208";
  const white      = "#ffffff";
  // ────────────────────────────────────────────────────────────────

  return (
    <group ref={body} position={[0, 0.08, 0]}>

      {/* Ground shadow */}
      <mesh rotation-x={-Math.PI / 2} position={[0, -1.88, 0]}>
        <circleGeometry args={[1.05, 64]} />
        <meshBasicMaterial color="#000" transparent opacity={0.08} />
      </mesh>

      {/* Accent ring */}
      <mesh rotation-x={-Math.PI / 2} position={[0, -1.82, 0]}>
        <ringGeometry args={[0.88, 0.96, 96]} />
        <meshStandardMaterial color="#6b4eff" emissive="#6b4eff" emissiveIntensity={0.55} />
      </mesh>

      {/* ══════════════════════════════
          BACKPACK  (behind torso)
         ══════════════════════════════ */}
      <group position={[0, -0.14, -0.42]}>
        {/* Main bag */}
        <RoundedBox args={[0.62, 0.78, 0.3]} radius={0.09} smoothness={6}>
          <meshStandardMaterial color={bp} roughness={0.72} />
        </RoundedBox>
        {/* Top handle */}
        <mesh position={[0, 0.44, 0.08]}>
          <torusGeometry args={[0.075, 0.022, 8, 16, Math.PI]} />
          <meshStandardMaterial color={bpDk} roughness={0.7} />
        </mesh>
        {/* Front pocket */}
        <RoundedBox args={[0.46, 0.3, 0.06]} radius={0.06} smoothness={4} position={[0, -0.16, 0.16]}>
          <meshStandardMaterial color={bpDk} roughness={0.75} />
        </RoundedBox>
        {/* Pocket zip line */}
        <mesh position={[0, -0.02, 0.2]}>
          <capsuleGeometry args={[0.008, 0.38, 4, 6]} />
          <meshStandardMaterial color="#888" roughness={0.5} metalness={0.3} />
        </mesh>
        {/* Straps */}
        {([-0.2, 0.2] as const).map((sx) => (
          <mesh key={sx} position={[sx, 0.22, 0.17]} rotation={[0.18, 0, sx < 0 ? 0.08 : -0.08]}>
            <capsuleGeometry args={[0.038, 0.58, 6, 8]} />
            <meshStandardMaterial color={bpDk} roughness={0.7} />
          </mesh>
        ))}
      </group>

      {/* ══════════════════════════════
          TORSO — yellow sweater
         ══════════════════════════════ */}
      <group position={[0, -0.12, 0]}>
        <RoundedBox args={[0.98, 0.92, 0.62]} radius={0.18} smoothness={8}>
          <meshStandardMaterial color={sweater} roughness={0.62} metalness={0.02} />
        </RoundedBox>
        {/* Sweater belly highlight */}
        <mesh position={[0, -0.05, 0.3]} scale={[0.55, 0.65, 0.2]}>
          <sphereGeometry args={[0.38, 14, 14]} />
          <meshStandardMaterial color="#f5bb30" roughness={0.7} transparent opacity={0.4} />
        </mesh>
        {/* White collar shirt underneath */}
        <mesh position={[0, 0.46, 0.22]}>
          <cylinderGeometry args={[0.1, 0.135, 0.14, 22]} />
          <meshStandardMaterial color="#f8f5f0" roughness={0.85} />
        </mesh>
        {/* Ribbed cuffs hint at wrist */}
        {([-0.58, 0.58] as const).map((cx) => (
          <mesh key={cx} position={[cx + (cx < 0 ? -0.04 : 0.04), -0.44, 0.06]}>
            <torusGeometry args={[0.14, 0.025, 8, 20]} />
            <meshStandardMaterial color={sweaterDk} roughness={0.65} />
          </mesh>
        ))}
      </group>

      {/* ══════════════════════════════
          ARMS
         ══════════════════════════════ */}
      {([-1, 1] as const).map((s) => (
        <group key={s} position={[s * 0.6, 0.02, 0]}>
          {/* Shoulder cap */}
          <mesh scale={[0.82, 0.9, 0.78]}>
            <sphereGeometry args={[0.25, 22, 22]} />
            <meshStandardMaterial color={sweater} roughness={0.62} />
          </mesh>
          {/* Upper arm */}
          <mesh position={[s * 0.04, -0.3, 0.04]} rotation={[0.12, 0, s * 0.1]}>
            <capsuleGeometry args={[0.17, 0.42, 8, 14]} />
            <meshStandardMaterial color={sweater} roughness={0.62} />
          </mesh>
          {/* Forearm (skin — hands in pocket pose, angled slightly forward) */}
          <mesh position={[s * 0.06, -0.72, 0.1]} rotation={[-0.08, 0, s * 0.06]}>
            <capsuleGeometry args={[0.14, 0.32, 8, 12]} />
            <meshStandardMaterial color={skin} roughness={0.52} />
          </mesh>
          {/* Hand near hip pocket */}
          <mesh position={[s * 0.08, -0.94, 0.14]} scale={[0.88, 0.72, 0.66]}>
            <sphereGeometry args={[0.14, 18, 18]} />
            <meshStandardMaterial color={skin} roughness={0.5} />
          </mesh>
        </group>
      ))}

      {/* ══════════════════════════════
          NECK
         ══════════════════════════════ */}
      <mesh position={[0, 0.35, 0]}>
        <cylinderGeometry args={[0.12, 0.145, 0.22, 22]} />
        <meshStandardMaterial color={skin} roughness={0.55} />
      </mesh>

      {/* ══════════════════════════════
          LEGS — black pants
         ══════════════════════════════ */}
      {([-1, 1] as const).map((s) => (
        <group key={s} position={[s * 0.2, -0.94, 0]}>
          {/* Thigh */}
          <mesh scale={[1, 1, 0.9]}>
            <capsuleGeometry args={[0.185, 0.5, 10, 18]} />
            <meshStandardMaterial color={pants} roughness={0.72} />
          </mesh>
          {/* Shin */}
          <mesh position={[0, -0.72, 0.02]} scale={[1, 1, 0.86]}>
            <capsuleGeometry args={[0.155, 0.5, 10, 18]} />
            <meshStandardMaterial color={pants} roughness={0.72} />
          </mesh>
          {/* Ankle cuff */}
          <mesh position={[0, -1.08, 0.02]}>
            <cylinderGeometry args={[0.16, 0.155, 0.06, 18]} />
            <meshStandardMaterial color={pants} roughness={0.7} />
          </mesh>
          {/* Sneaker */}
          <group position={[s * 0.01, -1.26, 0.08]}>
            {/* Main shoe body */}
            <RoundedBox args={[0.28, 0.18, 0.5]} radius={0.07} smoothness={6}>
              <meshStandardMaterial color={shoes} roughness={0.48} />
            </RoundedBox>
            {/* Sole */}
            <RoundedBox args={[0.3, 0.06, 0.52]} radius={0.04} smoothness={4} position={[0, -0.1, 0]}>
              <meshStandardMaterial color={shoeSole} roughness={0.55} />
            </RoundedBox>
            {/* Toe cap */}
            <mesh position={[0, 0.01, 0.22]} scale={[0.9, 0.65, 0.42]}>
              <sphereGeometry args={[0.16, 14, 14]} />
              <meshStandardMaterial color={shoes} roughness={0.45} />
            </mesh>
            {/* Lace line */}
            <mesh position={[0, 0.07, 0.02]}>
              <capsuleGeometry args={[0.006, 0.22, 4, 6]} />
              <meshStandardMaterial color={shoeDetail} roughness={0.6} />
            </mesh>
          </group>
        </group>
      ))}

      {/* ══════════════════════════════
          HEAD
         ══════════════════════════════ */}
      <group ref={head} position={[0, 0.98, 0]}>

        {/* Main head — big round cartoon sphere */}
        <mesh scale={[1, 1.04, 0.97]}>
          <sphereGeometry args={[0.58, 52, 52]} />
          <meshStandardMaterial color={skin} roughness={0.46} metalness={0.01} />
        </mesh>

        {/* Chubby cheeks */}
        {([-1, 1] as const).map((s) => (
          <mesh key={s} position={[s * 0.36, -0.1, 0.44]} scale={[0.68, 0.52, 0.22]}>
            <sphereGeometry args={[0.25, 18, 18]} />
            <meshStandardMaterial color={skin} roughness={0.48} />
          </mesh>
        ))}

        {/* Rosy cheek blush */}
        {([-1, 1] as const).map((s) => (
          <mesh key={s} position={[s * 0.36, -0.12, 0.47]} scale={[0.72, 0.5, 0.18]}>
            <sphereGeometry args={[0.22, 16, 16]} />
            <meshStandardMaterial color={skinRosy} roughness={0.6} transparent opacity={0.38} />
          </mesh>
        ))}

        {/* ── HAIR ── short, neat, dark brown */}
        {/* Top dome */}
        <mesh position={[0, 0.26, -0.02]} scale={[1.07, 0.74, 1.04]}>
          <sphereGeometry args={[0.6, 40, 40, 0, Math.PI * 2, 0, Math.PI * 0.58]} />
          <meshStandardMaterial color={hair} roughness={0.7} />
        </mesh>
        {/* Side left */}
        <mesh position={[-0.46, 0.04, -0.04]} scale={[0.38, 0.84, 0.86]}>
          <sphereGeometry args={[0.5, 24, 24]} />
          <meshStandardMaterial color={hair} roughness={0.7} />
        </mesh>
        {/* Side right */}
        <mesh position={[0.46, 0.04, -0.04]} scale={[0.38, 0.84, 0.86]}>
          <sphereGeometry args={[0.5, 24, 24]} />
          <meshStandardMaterial color={hair} roughness={0.7} />
        </mesh>
        {/* Back volume */}
        <mesh position={[0, 0.06, -0.5]} scale={[0.96, 0.8, 0.44]}>
          <sphereGeometry args={[0.6, 24, 24]} />
          <meshStandardMaterial color={hair} roughness={0.7} />
        </mesh>
        {/* Front fringe */}
        <mesh position={[0.1, 0.5, 0.36]} rotation={[0.72, 0.12, -0.22]}>
          <capsuleGeometry args={[0.062, 0.2, 8, 10]} />
          <meshStandardMaterial color={hair} roughness={0.65} />
        </mesh>
        <mesh position={[-0.06, 0.52, 0.38]} rotation={[0.68, -0.08, 0.14]}>
          <capsuleGeometry args={[0.052, 0.15, 8, 10]} />
          <meshStandardMaterial color={hair} roughness={0.65} />
        </mesh>

        {/* ── EARS ── */}
        {([-1, 1] as const).map((s) => (
          <mesh key={s} position={[s * 0.59, -0.05, 0.02]} scale={[0.36, 0.54, 0.28]}>
            <sphereGeometry args={[0.3, 18, 18]} />
            <meshStandardMaterial color={skin} roughness={0.55} />
          </mesh>
        ))}

        {/* ── EYEBROWS ── */}
        {([-0.17, 0.17] as const).map((x) => (
          <mesh
            key={x}
            position={[x, 0.27, 0.52]}
            rotation={[0.08, 0, x > 0 ? -0.22 : 0.22]}
          >
            <capsuleGeometry args={[0.024, 0.22, 6, 8]} />
            <meshStandardMaterial color={hair} roughness={0.58} />
          </mesh>
        ))}

        {/* ── GLASSES ── circular, dark frames */}
        {/* Left lens ring */}
        <mesh position={[-0.175, 0.12, 0.535]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.1, 0.026, 14, 36]} />
          <meshStandardMaterial color={glass} roughness={0.38} metalness={0.25} />
        </mesh>
        {/* Right lens ring */}
        <mesh position={[0.175, 0.12, 0.535]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.1, 0.026, 14, 36]} />
          <meshStandardMaterial color={glass} roughness={0.38} metalness={0.25} />
        </mesh>
        {/* Nose bridge */}
        <mesh position={[0, 0.1, 0.538]} rotation={[0, 0, Math.PI / 2]}>
          <capsuleGeometry args={[0.013, 0.05, 6, 8]} />
          <meshStandardMaterial color={glass} roughness={0.38} metalness={0.25} />
        </mesh>
        {/* Left temple arm */}
        <mesh position={[-0.3, 0.12, 0.46]} rotation={[0, 0.48, Math.PI / 2]}>
          <capsuleGeometry args={[0.01, 0.28, 6, 8]} />
          <meshStandardMaterial color={glass} roughness={0.38} metalness={0.25} />
        </mesh>
        {/* Right temple arm */}
        <mesh position={[0.3, 0.12, 0.46]} rotation={[0, -0.48, Math.PI / 2]}>
          <capsuleGeometry args={[0.01, 0.28, 6, 8]} />
          <meshStandardMaterial color={glass} roughness={0.38} metalness={0.25} />
        </mesh>
        {/* Lens tint fill */}
        {([-0.175, 0.175] as const).map((lx) => (
          <mesh key={lx} position={[lx, 0.12, 0.529]} rotation={[Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.096, 28]} />
            <meshStandardMaterial color="#cce8ff" transparent opacity={0.22} roughness={0.05} />
          </mesh>
        ))}

        {/* ── EYES ── big cartoon eyes */}
        {([-0.175, 0.175] as const).map((x) => (
          <group key={x} position={[x, 0.12, 0.48]}>
            {/* Sclera */}
            <mesh scale={[1, 0.98, 0.55]}>
              <sphereGeometry args={[0.092, 26, 26]} />
              <meshStandardMaterial color={sclera} roughness={0.18} />
            </mesh>
            {/* Iris */}
            <mesh position={[0, 0, 0.055]} scale={[1, 1, 0.24]}>
              <sphereGeometry args={[0.062, 22, 22]} />
              <meshStandardMaterial color={iris} roughness={0.28} />
            </mesh>
            {/* Pupil */}
            <mesh position={[0, 0, 0.076]} scale={[1, 1, 0.16]}>
              <sphereGeometry args={[0.04, 18, 18]} />
              <meshStandardMaterial color="#040404" roughness={0.25} />
            </mesh>
            {/* Highlight */}
            <mesh position={[0.024, 0.028, 0.092]}>
              <sphereGeometry args={[0.014, 8, 8]} />
              <meshStandardMaterial color={white} emissive={white} emissiveIntensity={3} />
            </mesh>
          </group>
        ))}

        {/* ── NOSE ── small cute button */}
        <mesh position={[0, -0.04, 0.545]} scale={[0.78, 0.72, 0.55]}>
          <sphereGeometry args={[0.065, 18, 18]} />
          <meshStandardMaterial color={skinDark} roughness={0.55} />
        </mesh>

        {/* ── MOUTH — happy smile ── */}
        <mesh position={[0, -0.22, 0.525]} rotation={[0, 0, Math.PI]}>
          <torusGeometry args={[0.09, 0.018, 10, 22, Math.PI * 0.68]} />
          <meshStandardMaterial color="#8a3020" roughness={0.52} />
        </mesh>
        {/* Lower lip */}
        <mesh position={[0, -0.28, 0.52]} scale={[1.05, 0.52, 0.42]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#d08878" roughness={0.5} transparent opacity={0.65} />
        </mesh>
      </group>

      {/* ── Floating accents ── */}
      <Float speed={1.6} rotationIntensity={0.4} floatIntensity={0.9}>
        <mesh position={[1.6, 0.6, 0.3]}>
          <icosahedronGeometry args={[0.13, 0]} />
          <meshStandardMaterial color="#6b4eff" emissive="#6b4eff" emissiveIntensity={0.45} />
        </mesh>
      </Float>
      <Float speed={1.2} rotationIntensity={0.5} floatIntensity={1.0}>
        <mesh position={[-1.45, 0.5, 0.15]} rotation={[0.3, 0.2, 0]}>
          <torusGeometry args={[0.16, 0.038, 16, 48]} />
          <meshStandardMaterial color="#00c4d9" emissive="#00c4d9" emissiveIntensity={0.45} />
        </mesh>
      </Float>
      <Float speed={0.9} rotationIntensity={0.3} floatIntensity={0.7}>
        <mesh position={[1.2, -0.5, 0.4]}>
          <octahedronGeometry args={[0.14]} />
          <meshStandardMaterial color="#ff7a45" emissive="#ff7a45" emissiveIntensity={0.35} />
        </mesh>
      </Float>
    </group>
  );
}
