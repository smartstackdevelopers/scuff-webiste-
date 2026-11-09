"use client";

import * as React from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

interface AlloyWheelProps {
  scratched?: number;
  spinSpeed?: number;
  position?: [number, number, number];
  scale?: number;
}

function createSpokeGeometry(spokeCount = 10) {
  const group = new THREE.Group();

  const rim = new THREE.Mesh(
    new THREE.TorusGeometry(1.05, 0.08, 16, 64),
    new THREE.MeshStandardMaterial({
      color: "#1a1a1a",
      metalness: 0.95,
      roughness: 0.25,
    })
  );
  group.add(rim);

  const outerLip = new THREE.Mesh(
    new THREE.TorusGeometry(1.12, 0.035, 12, 64),
    new THREE.MeshStandardMaterial({
      color: "#c5c9cf",
      metalness: 1,
      roughness: 0.15,
      envMapIntensity: 1.4,
    })
  );
  group.add(outerLip);

  const barrel = new THREE.Mesh(
    new THREE.CylinderGeometry(0.95, 0.95, 0.55, 48, 1, true),
    new THREE.MeshStandardMaterial({
      color: "#0a0a0a",
      metalness: 0.85,
      roughness: 0.4,
      side: THREE.DoubleSide,
    })
  );
  barrel.rotation.x = Math.PI / 2;
  group.add(barrel);

  const hub = new THREE.Mesh(
    new THREE.CylinderGeometry(0.22, 0.22, 0.18, 32),
    new THREE.MeshStandardMaterial({
      color: "#d4d7db",
      metalness: 1,
      roughness: 0.12,
    })
  );
  hub.rotation.x = Math.PI / 2;
  group.add(hub);

  const centerCap = new THREE.Mesh(
    new THREE.CircleGeometry(0.14, 32),
    new THREE.MeshStandardMaterial({
      color: "#48C84D",
      metalness: 0.6,
      roughness: 0.25,
      emissive: "#48C84D",
      emissiveIntensity: 0.25,
    })
  );
  centerCap.position.z = 0.1;
  group.add(centerCap);

  for (let i = 0; i < spokeCount; i++) {
    const angle = (i / spokeCount) * Math.PI * 2;
    const spoke = new THREE.Mesh(
      new THREE.BoxGeometry(0.12, 0.82, 0.08),
      new THREE.MeshStandardMaterial({
        color: "#b8bcc2",
        metalness: 1,
        roughness: 0.18,
      })
    );
    spoke.position.x = Math.cos(angle) * 0.48;
    spoke.position.y = Math.sin(angle) * 0.48;
    spoke.rotation.z = angle + Math.PI / 2;
    group.add(spoke);

    const cutFace = new THREE.Mesh(
      new THREE.BoxGeometry(0.045, 0.78, 0.02),
      new THREE.MeshStandardMaterial({
        color: "#f2f3f5",
        metalness: 1,
        roughness: 0.08,
      })
    );
    cutFace.position.copy(spoke.position);
    cutFace.position.z = 0.05;
    cutFace.rotation.z = spoke.rotation.z;
    group.add(cutFace);
  }

  const tire = new THREE.Mesh(
    new THREE.TorusGeometry(1.28, 0.22, 18, 64),
    new THREE.MeshStandardMaterial({
      color: "#111111",
      metalness: 0.15,
      roughness: 0.85,
    })
  );
  group.add(tire);

  return group;
}

export function AlloyWheel({
  scratched = 0,
  spinSpeed = 1.2,
  position = [0, 0, 0],
  scale = 1,
}: AlloyWheelProps) {
  const groupRef = React.useRef<THREE.Group>(null);
  const scratchRef = React.useRef<THREE.Mesh>(null);
  const wheel = React.useMemo(() => createSpokeGeometry(10), []);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.z -= delta * spinSpeed;
    }
    if (scratchRef.current) {
      const mat = scratchRef.current.material as THREE.MeshStandardMaterial;
      mat.opacity = THREE.MathUtils.lerp(mat.opacity, scratched * 0.55, 0.08);
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <primitive object={wheel} />
      <mesh ref={scratchRef} position={[0.35, -0.2, 0.12]} rotation={[0, 0, 0.4]}>
        <planeGeometry args={[0.55, 0.08]} />
        <meshStandardMaterial
          color="#6b7280"
          metalness={0.9}
          roughness={0.55}
          transparent
          opacity={0}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh position={[0.15, 0.35, 0.13]} rotation={[0, 0, -0.6]}>
        <planeGeometry args={[0.35, 0.04]} />
        <meshStandardMaterial
          color="#9ca3af"
          metalness={0.85}
          roughness={0.6}
          transparent
          opacity={scratched * 0.4}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}
