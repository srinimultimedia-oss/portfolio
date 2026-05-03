"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, ContactShadows, Sparkles } from "@react-three/drei";
import { Suspense, useEffect, useRef } from "react";
import * as THREE from "three";
import Avatar from "./Avatar";

function CameraRig() {
  useFrame(({ camera, pointer, clock }) => {
    const t = clock.elapsedTime;
    const tx = pointer.x * 0.5;
    const ty = pointer.y * 0.25 + Math.sin(t * 0.4) * 0.04;
    camera.position.x = THREE.MathUtils.damp(camera.position.x, tx, 2, 0.016);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, ty, 2, 0.016);
    camera.lookAt(0, 0, 0);
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
      camera={{ position: [0, 0.3, 4.8], fov: 34 }}
      className="!absolute inset-0"
    >
      <color attach="background" args={["#fafaf8"]} />
      <fog attach="fog" args={["#fafaf8", 9, 20]} />

      {/* Bright ambient for a clean light look */}
      <ambientLight intensity={1.0} color="#fff8f2" />

      {/* Key light — warm sunlight from upper right */}
      <directionalLight
        castShadow
        position={[4, 7, 5]}
        intensity={2.8}
        color="#fff5e8"
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={0.5}
        shadow-camera-far={20}
      />

      {/* Fill light — cool from left */}
      <directionalLight position={[-4, 2, 3]} intensity={0.9} color="#d8eeff" />

      {/* Rim / accent lights */}
      <pointLight position={[-2.5, 3, 1.5]} intensity={0.6} color="#a08fff" />
      <pointLight position={[2.5, -1, 2]} intensity={0.4} color="#00c4d9" />

      <Suspense fallback={null}>
        <Avatar pointer={pointer} />
        <Sparkles count={28} scale={[6, 4, 4]} size={1.4} speed={0.2} opacity={0.25} color="#6b4eff" />
        <Environment preset="apartment" />
        <ContactShadows
          position={[0, -1.88, 0]}
          opacity={0.28}
          scale={6}
          blur={3}
          far={3}
          color="#8888aa"
        />
      </Suspense>

      <CameraRig />
    </Canvas>
  );
}
