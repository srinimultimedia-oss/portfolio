"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

/**
 * Procedural stylized character — friendly, slightly futuristic.
 * Built from primitives so no external GLB/FBX assets are required.
 *
 * Replace this with a Ready Player Me / Mixamo / custom Blender export
 * via useGLTF when you have the rigged model ready.
 */
export default function Avatar({
  pointer,
}: {
  pointer: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const head = useRef<THREE.Group>(null);
  const eyes = useRef<THREE.Group>(null);
  const body = useRef<THREE.Group>(null);
  const visor = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    // Look-at: eyes & head subtly track pointer
    if (head.current) {
      const tx = THREE.MathUtils.clamp(pointer.current.x, -1, 1);
      const ty = THREE.MathUtils.clamp(pointer.current.y, -1, 1);
      head.current.rotation.y = THREE.MathUtils.damp(head.current.rotation.y, tx * 0.45, 4, 0.016);
      head.current.rotation.x = THREE.MathUtils.damp(head.current.rotation.x, -ty * 0.25, 4, 0.016);
    }
    if (eyes.current) {
      eyes.current.position.x = THREE.MathUtils.damp(
        eyes.current.position.x,
        pointer.current.x * 0.04,
        6,
        0.016,
      );
      eyes.current.position.y = THREE.MathUtils.damp(
        eyes.current.position.y,
        1.18 + -pointer.current.y * 0.04,
        6,
        0.016,
      );
    }

    // Idle breathing
    if (body.current) {
      body.current.position.y = Math.sin(t * 1.3) * 0.025 - 0.05;
      body.current.rotation.z = Math.sin(t * 0.6) * 0.02;
    }
  });

  const skin = "#f1cdb1";
  const accent = "#7c5cff";
  const accent2 = "#22e3ff";
  const cloth = "#0f1020";

  return (
    <group ref={body} position={[0, -0.3, 0]}>
      {/* Shadow disc */}
      <mesh rotation-x={-Math.PI / 2} position={[0, -1.55, 0]}>
        <circleGeometry args={[1.4, 64]} />
        <meshBasicMaterial color="#000" transparent opacity={0.35} />
      </mesh>

      {/* Plinth ring */}
      <mesh rotation-x={-Math.PI / 2} position={[0, -1.5, 0]}>
        <ringGeometry args={[1.05, 1.18, 96]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={1.4} />
      </mesh>

      {/* Torso */}
      <RoundedBox args={[1.05, 1.25, 0.7]} radius={0.18} smoothness={6} position={[0, -0.55, 0]}>
        <meshStandardMaterial color={cloth} roughness={0.6} metalness={0.15} />
      </RoundedBox>

      {/* Chest emblem */}
      <mesh position={[0, -0.4, 0.36]}>
        <circleGeometry args={[0.11, 32]} />
        <meshStandardMaterial color={accent2} emissive={accent2} emissiveIntensity={1.3} />
      </mesh>

      {/* Shoulders / arms (stubs) */}
      {[-1, 1].map((s) => (
        <group key={s} position={[s * 0.65, -0.3, 0]}>
          <mesh>
            <sphereGeometry args={[0.22, 24, 24]} />
            <meshStandardMaterial color={cloth} roughness={0.6} />
          </mesh>
          <mesh position={[s * 0.05, -0.45, 0]} rotation-z={s * 0.12}>
            <capsuleGeometry args={[0.18, 0.65, 8, 16]} />
            <meshStandardMaterial color={cloth} roughness={0.6} />
          </mesh>
          {/* Hand */}
          <mesh position={[s * 0.13, -0.95, 0.05]}>
            <sphereGeometry args={[0.16, 16, 16]} />
            <meshStandardMaterial color={skin} roughness={0.5} />
          </mesh>
        </group>
      ))}

      {/* Neck */}
      <mesh position={[0, 0.18, 0]}>
        <cylinderGeometry args={[0.13, 0.16, 0.22, 24]} />
        <meshStandardMaterial color={skin} roughness={0.6} />
      </mesh>

      {/* Head */}
      <group ref={head} position={[0, 0.55, 0]}>
        <RoundedBox args={[0.95, 1.0, 0.95]} radius={0.32} smoothness={8}>
          <meshStandardMaterial color={skin} roughness={0.5} metalness={0.02} />
        </RoundedBox>

        {/* Hair cap */}
        <mesh position={[0, 0.32, 0]}>
          <sphereGeometry args={[0.55, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2.1]} />
          <meshStandardMaterial color="#1a1320" roughness={0.55} />
        </mesh>

        {/* Hair tuft */}
        <mesh position={[0.18, 0.55, 0.25]} rotation={[0.4, 0.3, -0.2]}>
          <coneGeometry args={[0.12, 0.22, 12]} />
          <meshStandardMaterial color="#1a1320" />
        </mesh>

        {/* AR Visor */}
        <mesh ref={visor} position={[0, 0.05, 0.45]}>
          <RoundedBox args={[0.78, 0.22, 0.14]} radius={0.07} smoothness={6}>
            <MeshTransmissionMaterial
              backside
              samples={6}
              thickness={0.35}
              roughness={0.05}
              transmission={1}
              ior={1.35}
              chromaticAberration={0.04}
              anisotropy={0.2}
              distortion={0.2}
              distortionScale={0.4}
              temporalDistortion={0.05}
              color={accent2}
            />
          </RoundedBox>
        </mesh>

        {/* Eyes (visible behind visor as glow) */}
        <group ref={eyes} position={[0, 1.18, 0.46]} scale={0.45}>
          {[-0.18, 0.18].map((x) => (
            <mesh key={x} position={[x, -1.05, 0]}>
              <sphereGeometry args={[0.04, 16, 16]} />
              <meshStandardMaterial color={accent2} emissive={accent2} emissiveIntensity={3} />
            </mesh>
          ))}
        </group>

        {/* Mouth */}
        <mesh position={[0, -0.25, 0.48]} rotation-z={Math.PI / 8}>
          <torusGeometry args={[0.07, 0.012, 8, 24, Math.PI]} />
          <meshStandardMaterial color="#3a2230" />
        </mesh>

        {/* Ear */}
        {[-1, 1].map((s) => (
          <mesh key={s} position={[s * 0.5, 0, 0]}>
            <sphereGeometry args={[0.07, 16, 16]} />
            <meshStandardMaterial color={skin} />
          </mesh>
        ))}
      </group>

      {/* Floating tools — orbiting accents */}
      <Float speed={1.6} rotationIntensity={0.4} floatIntensity={0.8}>
        <mesh position={[1.4, 0.4, 0.4]}>
          <icosahedronGeometry args={[0.16, 0]} />
          <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.6} />
        </mesh>
      </Float>
      <Float speed={1.2} rotationIntensity={0.6} floatIntensity={1.1}>
        <mesh position={[-1.3, 0.9, 0.2]} rotation={[0.4, 0.3, 0]}>
          <torusGeometry args={[0.18, 0.04, 16, 64]} />
          <meshStandardMaterial color={accent2} emissive={accent2} emissiveIntensity={0.7} />
        </mesh>
      </Float>
      <Float speed={1.0} rotationIntensity={0.3} floatIntensity={0.7}>
        <mesh position={[1.1, -0.6, 0.5]}>
          <boxGeometry args={[0.22, 0.22, 0.22]} />
          <meshStandardMaterial color="#fff" emissive="#ff9d6e" emissiveIntensity={0.4} />
        </mesh>
      </Float>
    </group>
  );
}
