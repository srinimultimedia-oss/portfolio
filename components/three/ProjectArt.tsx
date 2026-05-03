"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const palette: Record<string, string> = {
  violet: "#6b4eff",
  cyan: "#00c4d9",
  peach: "#ff7a45",
  lime: "#84cc16",
};

function Blob({ color, seed }: { color: string; seed: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime + seed;
    ref.current.rotation.x = t * 0.18;
    ref.current.rotation.y = t * 0.22;
  });

  return (
    <Float speed={1.3} rotationIntensity={0.4} floatIntensity={0.7}>
      <mesh ref={ref} scale={1.25}>
        <icosahedronGeometry args={[1, 6]} />
        <MeshDistortMaterial
          color={color}
          roughness={0.25}
          metalness={0.3}
          distort={0.45}
          speed={1.2}
        />
      </mesh>
    </Float>
  );
}

export default function ProjectArt({ accent, seed }: { accent: keyof typeof palette; seed: number }) {
  const color = useMemo(() => palette[accent] ?? palette.violet, [accent]);
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 3.4], fov: 38 }}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0"
    >
      <color attach="background" args={["#f3f2ee"]} />
      <ambientLight intensity={1.0} color="#fff8f2" />
      <directionalLight position={[3, 4, 5]} intensity={2.0} color="#fff0e0" />
      <pointLight position={[-3, -2, 2]} intensity={0.8} color={color} />
      <Blob color={color} seed={seed} />
    </Canvas>
  );
}
