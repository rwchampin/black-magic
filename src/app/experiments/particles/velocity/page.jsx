
"use client";
import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import * as THREE from "three";

// Custom shader material
const vertexShader = `
  attribute vec3 velocity;
  varying vec3 vVelocity;

  void main() {
      vVelocity = velocity;
      vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
      gl_PointSize = 100.0;
      gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  varying vec3 vVelocity;

  void main() {
      gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
  }
`;

const Particles = ({ numParticles }) => {
  const pointsRef = useRef();

  const positions = useMemo(() => {
    const temp = [];
    for (let i = 0; i < numParticles; i++) {
      temp.push(0, 0, 0);
    }
    return new Float32Array(temp);
  }, [numParticles]);

  const velocities = useMemo(() => {
    const temp = [];
    for (let i = 0; i < numParticles; i++) {
      const velocity = new THREE.Vector3(
        Math.random() - 0.5,
        Math.random() - 0.5,
        Math.random() - 0.5
      ).normalize();

      velocity.multiplyScalar(Math.random() * 0.01);

      temp.push(velocity.x, velocity.y, velocity.z);
    }

    return new Float32Array(temp);
  }, [numParticles]);

  useFrame((state, delta) => {
    // Update shader material time uniform every frame
    // pointsRef.current.material.uniforms.time.value = state.clock.elapsedTime;
  });

  return (
//     <points ref={pointsRef}>
//     <sphereGeometry args={[1, 48, 48]} />
//     <pointsMaterial color="#5786F5" size={0.015} sizeAttenuation />
//   </points>
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
          normalized={false}
        />
      </bufferGeometry>
      <pointsMaterial color={0xff0000} size={.01} />
    </points>
  );
};

export default function Page() {
  return (
    <Canvas camera={{ position: [0, 0, 1],fov: 65, near: .1, far:1000 }}>
      <OrbitControls autoRotate />
    
      <ambientLight intensity={0.5} />
      <Particles numParticles={10000} />
    </Canvas>
  )
}
