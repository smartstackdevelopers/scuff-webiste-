"use client";

import * as React from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

interface ParticleBurstProps {
  active?: number;
  count?: number;
  color?: string;
}

export function ParticleBurst({
  active = 0,
  count = 48,
  color = "#48C84D",
}: ParticleBurstProps) {
  const pointsRef = React.useRef<THREE.Points>(null);
  const velocities = React.useMemo(() => {
    const arr: THREE.Vector3[] = [];
    for (let i = 0; i < count; i++) {
      arr.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 2.4,
          (Math.random() - 0.5) * 2.4,
          (Math.random() - 0.5) * 1.2
        )
      );
    }
    return arr;
  }, [count]);

  const geometry = React.useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(count * 3), 3)
    );
    return geo;
  }, [count]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    const attr = pointsRef.current.geometry.attributes
      .position as THREE.BufferAttribute;
    const strength = Math.max(0, Math.min(1, active));

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const v = velocities[i];
      attr.array[i3] += v.x * delta * strength * 1.6;
      attr.array[i3 + 1] += v.y * delta * strength * 1.6;
      attr.array[i3 + 2] += v.z * delta * strength * 1.2;

      if (strength < 0.05) {
        attr.array[i3] *= 0.92;
        attr.array[i3 + 1] *= 0.92;
        attr.array[i3 + 2] *= 0.92;
      }
    }
    attr.needsUpdate = true;

    const mat = pointsRef.current.material as THREE.PointsMaterial;
    mat.opacity = THREE.MathUtils.lerp(mat.opacity, strength * 0.85, 0.12);
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        color={color}
        size={0.045}
        transparent
        opacity={0}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
