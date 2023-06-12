"use client"
import fragment from '@/shaders/points/fragment.glsl';
import vertex from '@/shaders/points/vertex.glsl';
import { Canvas, useFrame } from '@react-three/fiber';
import { useEffect, useRef, useMemo, useCallback } from 'react';
import * as THREE from 'three';

export default function Points(params) {
  const vectors = useRef([]);
  const count = 10000;
  const positions = useMemo(() => new Float32Array(count * 3), [count]);
  const velocities = useMemo(() => new Float32Array(count * 3), [count]);
  const previousPositions = useMemo(() => new Float32Array(count * 3), [count]);
  const pointsRef = useRef();
  const radius = 1;

  // Initialize particles
  for (let i = 0; i < count; i++) {
    const phi = Math.random() * Math.PI * 2; // Random angle around the sphere
    const theta = Math.random() * Math.PI; // Random vertical angle

    const x = Math.sin(theta) * Math.cos(phi) * radius;
    const y = Math.sin(theta) * Math.sin(phi) * radius;
    const z = Math.cos(theta) * radius;
    const speed = Math.random() * 0.05;

    const particle = {
      position: new THREE.Vector3(x, y, z),
      previousPosition: new THREE.Vector3(x, y, z),
      velocity: new THREE.Vector3(0, 0, 0),
      speed: speed,
      phi: phi,
      theta: theta,
    };

    vectors.current.push(particle);

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
  }

  const particlesPosition = useCallback(() => {
    for (let i = 0; i < vectors.current.length; i++) {
      const particle = vectors.current[i];
      particle.previousPosition.copy(particle.position);
      particle.phi += particle.speed; // Update the angle around the sphere

      // Update the coordinate values
      particle.position.x = Math.sin(particle.theta) * Math.cos(particle.phi) * radius;
      particle.position.y = Math.sin(particle.theta) * Math.sin(particle.phi) * radius;
      particle.position.z = Math.cos(particle.theta) * radius;

      particle.velocity.subVectors(particle.position, particle.previousPosition);

      positions[i * 3] = particle.position.x;
      positions[i * 3 + 1] = particle.position.y;
      positions[i * 3 + 2] = particle.position.z;

      velocities[i * 3] = particle.velocity.x;
      velocities[i * 3 + 1] = particle.velocity.y;
      velocities[i * 3 + 2] = particle.velocity.z;

      previousPositions[i * 3] = particle.previousPosition.x;
      previousPositions[i * 3 + 1] = particle.previousPosition.y;
      previousPositions[i * 3 + 2] = particle.previousPosition.z;
    }

    pointsRef.current.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    pointsRef.current.geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
    pointsRef.current.geometry.setAttribute('previousPosition', new THREE.BufferAttribute(previousPositions, 3));

  }, [positions, previousPositions, radius,velocities, vectors]);

  const vectorsRef = useRef(vectors);

  useFrame(() => {
    particlesPosition();
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.geometry.attributes.velocity.needsUpdate = true;
    pointsRef.current.geometry.attributes.previousPosition.needsUpdate = true;
  });

 
  return (

 
        <points ref={pointsRef}>
          <bufferGeometry>
            <bufferAttribute attach="position" count={count} array={positions} itemSize={3} />
            <bufferAttribute attach="velocity" count={count} array={velocities} itemSize={3} />
            <bufferAttribute attach="previousPosition" count={count} array={previousPositions} itemSize={3} />
          </bufferGeometry>
          <shaderMaterial
            attach="material"
            args={[
              {
                vertexShader: vertex,
                fragmentShader: fragment,
                transparent: true,
                depthWrite: false,
              },
            ]}
            vertexColors={false}
          />
        </points>
           
  );
}



