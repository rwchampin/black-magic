"use client"
import { Title, Navigation } from '@/components'
import dynamic from 'next/dynamic';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useEffect, useRef, useMemo, useCallback } from 'react';
import * as THREE from 'three';

export default function Page() {
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

  const DynamicNavigation = dynamic(() => import('@/components/Navigation.js'), {
    ssr: false,
  });
  return (
    <>
      {/* <Title>Ryan The Developer</Title> */}
      {/* <DynamicNavigation />  */}
    <PerspectiveCamera makeDefault position={[0, 0, 5]} 
    fov={75}
    aspect={2}
    near={0.1}
    far={1000}

    />
        <OrbitControls />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
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
                vertexShader: `
                  attribute vec3 velocity;
                  attribute vec3 previousPosition;
                  
                  varying vec3 vPreviousPosition;
                  
                  void main() {
                    vPreviousPosition = previousPosition;
                    vec4 mvPosition = modelViewMatrix * vec4(position + velocity * 0.1, 1.0);
                    gl_PointSize = 3.0 * (300.0 / -mvPosition.z);
                    gl_Position = projectionMatrix * mvPosition;
                  }
                `,
                fragmentShader: `
                varying vec3 vPreviousPosition;

void main() {
  // Calculate the distance between the current fragment and the center of the point
  float distance = length(gl_PointCoord - vec2(0.5));

  // Discard fragments outside the circular shape
  if (distance > 0.5) discard;

  // Calculate the opacity based on the distance
  float opacity = 1.0 - distance;

  // Calculate the squish factor based on the velocity
  vec2 velocity = normalize(vec2(vPreviousPosition.x - gl_PointCoord.x, vPreviousPosition.y - gl_PointCoord.y));
  float squish = length(velocity);

  // Add a trail effect based on the velocity
  float trailOpacity = clamp(1.0 - squish, 0.0, 1.0);
  opacity *= trailOpacity;

  // Modify the shape of the particle using the squish factor
  vec2 modifiedPosition = gl_PointCoord;
  modifiedPosition.y *= squish;

  // Set the color to black with the adjusted opacity
  gl_FragColor = vec4(0.0, 0.0, 0.0, opacity);
}

                `,
                transparent: true,
                depthWrite: false,
              },
            ]}
            vertexColors={false}
          />
        </points>
            <DynamicNavigation />
    </>
  );
}



