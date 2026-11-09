"use client";

import * as React from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { AlloyWheel } from "@/components/3d/alloy-wheel";
import { ParticleBurst } from "@/components/3d/particle-burst";

export interface WheelSceneState {
  progress: number;
  scratched: number;
  particles: number;
  spinSpeed: number;
}

interface SceneInnerProps {
  state: WheelSceneState;
}

function CameraRig({ progress }: { progress: number }) {
  const { camera } = useThree();

  useFrame(() => {
    const targetZ = THREE.MathUtils.lerp(7.5, 4.2, Math.min(progress * 1.4, 1));
    const targetX = THREE.MathUtils.lerp(0.4, -0.2, progress);
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.06);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.06);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

function SceneInner({ state }: SceneInnerProps) {
  const groupRef = React.useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    const p = state.progress;

    // Approach from right, cross center, exit left
    const x = THREE.MathUtils.lerp(4.8, -5.2, p);
    const z = THREE.MathUtils.lerp(-2.2, 1.6, Math.min(p * 1.35, 1));
    const y = Math.sin(p * Math.PI) * 0.18;
    const rotY = THREE.MathUtils.lerp(0.55, -0.35, p);

    groupRef.current.position.set(x, y, z);
    groupRef.current.rotation.y = rotY;
    groupRef.current.rotation.x = 0.18;
  });

  return (
    <>
      <CameraRig progress={state.progress} />
      <color attach="background" args={["#050505"]} />
      <fog attach="fog" args={["#050505", 6, 16]} />

      <ambientLight intensity={0.35} />
      <directionalLight
        position={[4, 6, 4]}
        intensity={1.35}
        color="#ffffff"
        castShadow
      />
      <spotLight
        position={[-3, 4, 2]}
        intensity={1.8}
        color="#48C84D"
        angle={0.45}
        penumbra={0.7}
      />
      <pointLight position={[2, -1, 3]} intensity={0.6} color="#7DFF82" />

      <group ref={groupRef}>
        <AlloyWheel
          scratched={state.scratched}
          spinSpeed={state.spinSpeed}
          scale={1.15}
        />
        <ParticleBurst active={state.particles} />
      </group>

      <ContactShadows
        position={[0, -1.35, 0]}
        opacity={0.55}
        scale={14}
        blur={2.4}
        far={5}
        color="#000000"
      />

      <Environment preset="city" environmentIntensity={0.55} />
    </>
  );
}

interface HeroWheelCanvasProps {
  state: WheelSceneState;
  className?: string;
}

export function HeroWheelCanvas({ state, className }: HeroWheelCanvasProps) {
  return (
    <div className={className}>
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0.4, 0.2, 7.5], fov: 42, near: 0.1, far: 40 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ width: "100%", height: "100%" }}
      >
        <SceneInner state={state} />
      </Canvas>
    </div>
  );
}
