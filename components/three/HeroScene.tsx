"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, ContactShadows, Sparkles } from "@react-three/drei";
import { Suspense, useEffect, useRef } from "react";
import * as THREE from "three";
import Avatar from "./Avatar";

function CameraRig() {
  useFrame(({ camera, pointer, clock }) => {
    const t = clock.elapsedTime;
    const tx = pointer.x * 0.6;
    const ty = pointer.y * 0.3 + Math.sin(t * 0.4) * 0.05;
    camera.position.x = THREE.MathUtils.damp(camera.position.x, tx, 2, 0.016);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, ty, 2, 0.016);
    camera.lookAt(0, -0.1, 0);
  });
  return null;
}

export default function HeroScene() {
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <Canvas
      shadows
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0.2, 4.6], fov: 35 }}
      className="!absolute inset-0"
    >
      <color attach="background" args={["#06060a"]} />
      <fog attach="fog" args={["#06060a", 6, 14]} />

      <ambientLight intensity={0.35} />
      <directionalLight
        castShadow
        position={[3, 5, 4]}
        intensity={1.4}
        color="#ffffff"
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight position={[-3, 2, 2]} intensity={1.2} color="#7c5cff" />
      <pointLight position={[3, -2, 1.5]} intensity={0.8} color="#22e3ff" />

      <Suspense fallback={null}>
        <Avatar pointer={pointer} />
        <Sparkles count={40} scale={[6, 4, 4]} size={2} speed={0.3} opacity={0.4} color="#22e3ff" />
        <Environment preset="city" />
        <ContactShadows
          position={[0, -1.85, 0]}
          opacity={0.55}
          scale={6}
          blur={2.4}
          far={3}
        />
      </Suspense>

      <CameraRig />
    </Canvas>
  );
}
