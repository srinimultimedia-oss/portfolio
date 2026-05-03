"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
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
      head.current.rotation.y = THREE.MathUtils.damp(head.current.rotation.y, tx * 0.3, 4, 0.016);
      head.current.rotation.x = THREE.MathUtils.damp(head.current.rotation.x, -ty * 0.18, 4, 0.016);
    }
    if (body.current) {
      body.current.position.y = Math.sin(t * 1.2) * 0.018 - 0.05;
      body.current.rotation.z = Math.sin(t * 0.55) * 0.012;
    }
  });

  const skin = "#d4956a";
  const skinMid = "#c07850";
  const skinLight = "#e8b58a";
  const hairCol = "#1a0e0e";
  const shirtCol = "#2a3a6e";
  const shirtLight = "#3a4e88";
  const accent = "#6b4eff";
  const accent2 = "#00c4d9";
  const white = "#ffffff";
  const irisCol = "#3b2510";
  const scleraCol = "#f8f4f0";

  return (
    <group ref={body} position={[0, -0.2, 0]}>
      {/* Ground shadow */}
      <mesh rotation-x={-Math.PI / 2} position={[0, -1.58, 0]}>
        <circleGeometry args={[1.25, 64]} />
        <meshBasicMaterial color="#000" transparent opacity={0.1} />
      </mesh>

      {/* Accent plinth ring */}
      <mesh rotation-x={-Math.PI / 2} position={[0, -1.52, 0]}>
        <ringGeometry args={[1.02, 1.12, 96]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.6} />
      </mesh>

      {/* ── TORSO ── */}
      {/* Main body - tapered capsule shape */}
      <group position={[0, -0.52, 0]}>
        {/* Upper chest */}
        <mesh scale={[1, 1, 0.72]}>
          <capsuleGeometry args={[0.44, 0.7, 12, 24]} />
          <meshStandardMaterial color={shirtCol} roughness={0.65} metalness={0.08} />
        </mesh>
        {/* Shirt collar opening */}
        <mesh position={[0, 0.55, 0.28]}>
          <cylinderGeometry args={[0.12, 0.16, 0.22, 24]} />
          <meshStandardMaterial color="#e8e4dc" roughness={0.85} />
        </mesh>
        {/* Shirt collar band */}
        <mesh position={[0, 0.62, 0.26]}>
          <torusGeometry args={[0.14, 0.025, 12, 32, Math.PI * 1.1]} />
          <meshStandardMaterial color="#c0bbb2" roughness={0.8} />
        </mesh>
        {/* Subtle chest highlight */}
        <mesh position={[0, 0.1, 0.38]} scale={[0.6, 0.7, 0.2]}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial color={shirtLight} roughness={0.7} transparent opacity={0.5} />
        </mesh>
      </group>

      {/* ── SHOULDERS & ARMS ── */}
      {([-1, 1] as const).map((s) => (
        <group key={s} position={[s * 0.55, -0.18, 0]}>
          {/* Shoulder ball */}
          <mesh scale={[0.9, 1, 0.85]}>
            <sphereGeometry args={[0.26, 24, 24]} />
            <meshStandardMaterial color={shirtCol} roughness={0.65} />
          </mesh>
          {/* Upper arm */}
          <mesh position={[s * 0.08, -0.38, 0]} rotation={[0, 0, s * 0.15]}>
            <capsuleGeometry args={[0.19, 0.52, 8, 16]} />
            <meshStandardMaterial color={shirtCol} roughness={0.65} />
          </mesh>
          {/* Forearm */}
          <mesh position={[s * 0.14, -0.88, 0.04]} rotation={[0.1, 0, s * 0.12]}>
            <capsuleGeometry args={[0.16, 0.44, 8, 16]} />
            <meshStandardMaterial color={skin} roughness={0.55} />
          </mesh>
          {/* Hand */}
          <mesh position={[s * 0.2, -1.22, 0.08]} scale={[0.9, 0.75, 0.65]}>
            <sphereGeometry args={[0.16, 20, 20]} />
            <meshStandardMaterial color={skin} roughness={0.5} />
          </mesh>
          {/* Thumb stub */}
          <mesh
            position={[s * 0.32, -1.2, 0.1]}
            rotation={[0.3, 0, s * 0.8]}
            scale={[0.7, 0.7, 0.7]}
          >
            <capsuleGeometry args={[0.05, 0.1, 6, 8]} />
            <meshStandardMaterial color={skin} roughness={0.5} />
          </mesh>
        </group>
      ))}

      {/* ── NECK ── */}
      <mesh position={[0, 0.24, 0]}>
        <cylinderGeometry args={[0.13, 0.16, 0.28, 24]} />
        <meshStandardMaterial color={skin} roughness={0.55} />
      </mesh>

      {/* ── HEAD ── */}
      <group ref={head} position={[0, 0.82, 0]}>
        {/* Cranium — natural ellipsoid */}
        <mesh scale={[1, 1.1, 0.95]}>
          <sphereGeometry args={[0.5, 48, 48]} />
          <meshStandardMaterial color={skin} roughness={0.48} metalness={0.02} />
        </mesh>

        {/* Cheeks — subtle width at jaw level */}
        {([-1, 1] as const).map((s) => (
          <mesh key={s} position={[s * 0.3, -0.18, 0.24]} scale={[0.55, 0.52, 0.45]}>
            <sphereGeometry args={[0.38, 20, 20]} />
            <meshStandardMaterial color={skinLight} roughness={0.5} transparent opacity={0.6} />
          </mesh>
        ))}

        {/* Chin */}
        <mesh position={[0, -0.44, 0.12]} scale={[0.6, 0.38, 0.55]}>
          <sphereGeometry args={[0.38, 20, 20]} />
          <meshStandardMaterial color={skin} roughness={0.5} />
        </mesh>

        {/* ── HAIR ── */}
        {/* Main hair dome */}
        <mesh position={[0, 0.22, -0.02]} scale={[1.04, 0.76, 1.0]}>
          <sphereGeometry args={[0.56, 36, 36, 0, Math.PI * 2, 0, Math.PI * 0.58]} />
          <meshStandardMaterial color={hairCol} roughness={0.75} />
        </mesh>
        {/* Left side hair */}
        <mesh position={[-0.42, 0.02, -0.06]} scale={[0.42, 0.85, 0.82]}>
          <sphereGeometry args={[0.46, 24, 24]} />
          <meshStandardMaterial color={hairCol} roughness={0.75} />
        </mesh>
        {/* Right side hair */}
        <mesh position={[0.42, 0.02, -0.06]} scale={[0.42, 0.85, 0.82]}>
          <sphereGeometry args={[0.46, 24, 24]} />
          <meshStandardMaterial color={hairCol} roughness={0.75} />
        </mesh>
        {/* Back hair volume */}
        <mesh position={[0, 0.05, -0.45]} scale={[0.92, 0.78, 0.4]}>
          <sphereGeometry args={[0.58, 24, 24]} />
          <meshStandardMaterial color={hairCol} roughness={0.75} />
        </mesh>
        {/* Front fringe piece 1 */}
        <mesh position={[0.12, 0.44, 0.32]} rotation={[0.7, 0.15, -0.25]}>
          <capsuleGeometry args={[0.065, 0.2, 8, 10]} />
          <meshStandardMaterial color={hairCol} roughness={0.7} />
        </mesh>
        {/* Front fringe piece 2 */}
        <mesh position={[-0.08, 0.46, 0.34]} rotation={[0.65, -0.1, 0.15]}>
          <capsuleGeometry args={[0.055, 0.15, 8, 10]} />
          <meshStandardMaterial color={hairCol} roughness={0.7} />
        </mesh>

        {/* ── EARS ── */}
        {([-1, 1] as const).map((s) => (
          <group key={s} position={[s * 0.51, -0.06, 0.02]}>
            {/* Outer ear lobe shape */}
            <mesh scale={[0.38, 0.58, 0.28]}>
              <sphereGeometry args={[0.3, 18, 18]} />
              <meshStandardMaterial color={skin} roughness={0.55} />
            </mesh>
            {/* Inner concha */}
            <mesh position={[s * 0.03, 0.02, 0.02]} scale={[0.22, 0.35, 0.16]}>
              <sphereGeometry args={[0.24, 14, 14]} />
              <meshStandardMaterial color={skinMid} roughness={0.6} />
            </mesh>
          </group>
        ))}

        {/* ── EYEBROWS ── */}
        {([-0.155, 0.155] as const).map((x) => (
          <mesh
            key={x}
            position={[x, 0.2, 0.44]}
            rotation={[0.1, 0, x > 0 ? -0.22 : 0.22]}
          >
            <capsuleGeometry args={[0.022, 0.18, 6, 8]} />
            <meshStandardMaterial color={hairCol} roughness={0.65} />
          </mesh>
        ))}

        {/* ── EYES ── */}
        {([-0.16, 0.16] as const).map((x) => (
          <group key={x} position={[x, 0.08, 0.44]}>
            {/* Eye socket shadow */}
            <mesh position={[0, 0, -0.01]} scale={[1.05, 0.95, 0.3]}>
              <sphereGeometry args={[0.115, 20, 20]} />
              <meshStandardMaterial color={skinMid} roughness={0.6} />
            </mesh>
            {/* Sclera (white of eye) */}
            <mesh scale={[1, 0.88, 0.55]}>
              <sphereGeometry args={[0.1, 24, 24]} />
              <meshStandardMaterial color={scleraCol} roughness={0.25} />
            </mesh>
            {/* Iris */}
            <mesh position={[0, 0, 0.048]} scale={[1, 1, 0.28]}>
              <sphereGeometry args={[0.062, 20, 20]} />
              <meshStandardMaterial color={irisCol} roughness={0.35} />
            </mesh>
            {/* Pupil */}
            <mesh position={[0, 0, 0.072]} scale={[1, 1, 0.18]}>
              <sphereGeometry args={[0.036, 16, 16]} />
              <meshStandardMaterial color="#050505" roughness={0.4} />
            </mesh>
            {/* Specular highlight */}
            <mesh position={[0.024, 0.022, 0.085]}>
              <sphereGeometry args={[0.012, 8, 8]} />
              <meshStandardMaterial color={white} emissive={white} emissiveIntensity={2} />
            </mesh>
            {/* Eyelid crease (top) */}
            <mesh position={[0, 0.07, 0.04]} rotation={[0.4, 0, 0]} scale={[0.9, 0.3, 0.5]}>
              <sphereGeometry args={[0.1, 12, 12]} />
              <meshStandardMaterial color={skin} roughness={0.5} transparent opacity={0.9} />
            </mesh>
          </group>
        ))}

        {/* ── NOSE ── */}
        {/* Bridge */}
        <mesh position={[0, 0, 0.47]} scale={[0.35, 0.9, 0.3]}>
          <capsuleGeometry args={[0.06, 0.16, 8, 10]} />
          <meshStandardMaterial color={skin} roughness={0.55} />
        </mesh>
        {/* Tip / bulb */}
        <mesh position={[0, -0.1, 0.5]} scale={[0.9, 0.8, 0.7]}>
          <sphereGeometry args={[0.068, 18, 18]} />
          <meshStandardMaterial color={skinMid} roughness={0.55} />
        </mesh>
        {/* Nostrils */}
        {([-0.06, 0.06] as const).map((nx) => (
          <mesh key={nx} position={[nx, -0.14, 0.47]} scale={[0.6, 0.5, 0.45]}>
            <sphereGeometry args={[0.055, 12, 12]} />
            <meshStandardMaterial color={skinMid} roughness={0.6} />
          </mesh>
        ))}

        {/* ── MOUTH ── */}
        {/* Upper lip */}
        <mesh position={[0, -0.25, 0.454]} scale={[1, 0.55, 0.38]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="#b8705a" roughness={0.55} />
        </mesh>
        {/* Lower lip */}
        <mesh position={[0, -0.3, 0.458]} scale={[1.05, 0.62, 0.42]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="#c07868" roughness={0.5} />
        </mesh>
        {/* Smile — subtle arc */}
        <mesh position={[0, -0.268, 0.462]} rotation={[0, 0, Math.PI]}>
          <torusGeometry args={[0.055, 0.011, 8, 16, Math.PI * 0.65]} />
          <meshStandardMaterial color="#7a3028" roughness={0.6} />
        </mesh>
        {/* Philtrum indent */}
        <mesh position={[0, -0.196, 0.464]} scale={[0.4, 0.5, 0.3]}>
          <sphereGeometry args={[0.055, 10, 10]} />
          <meshStandardMaterial color={skinMid} roughness={0.6} />
        </mesh>
      </group>

      {/* ── FLOATING ACCENTS ── */}
      <Float speed={1.6} rotationIntensity={0.4} floatIntensity={0.8}>
        <mesh position={[1.4, 0.4, 0.4]}>
          <icosahedronGeometry args={[0.15, 0]} />
          <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.4} />
        </mesh>
      </Float>
      <Float speed={1.2} rotationIntensity={0.6} floatIntensity={1.1}>
        <mesh position={[-1.3, 0.8, 0.2]} rotation={[0.4, 0.3, 0]}>
          <torusGeometry args={[0.18, 0.04, 16, 64]} />
          <meshStandardMaterial color={accent2} emissive={accent2} emissiveIntensity={0.4} />
        </mesh>
      </Float>
      <Float speed={1.0} rotationIntensity={0.3} floatIntensity={0.7}>
        <mesh position={[1.1, -0.6, 0.5]}>
          <octahedronGeometry args={[0.16]} />
          <meshStandardMaterial color="#ff7a45" emissive="#ff7a45" emissiveIntensity={0.3} />
        </mesh>
      </Float>
    </group>
  );
}
