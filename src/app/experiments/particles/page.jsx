"use client";
import { Canvas } from "@react-three/fiber";
import { Backdrop, Points, OrbitControls } from "@react-three/drei";
const CustomGeometryParticles = () => {
    const particlesPosition = [
      /* ... */
    ];
  
    return (
      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particlesPosition.length / 3}
            array={particlesPosition}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.015}
          color="#5786F5"
          sizeAttenuation
          depthWrite={false}
        />
      </points>
    );
  };
export default function Page() {
    const MAX_PARTICLES = 1000;

    const positions = []
        for (let i = 0; i < MAX_PARTICLES; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos((Math.random() * 2) - 1);

            const x = Math.sin(phi) * Math.cos(theta);
            const y = Math.sin(phi) * Math.sin(theta);
            const z = Math.cos(phi);

            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;
        }

    return (
        <Canvas>
            <OrbitControls />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
             
            <Backdrop sides={'BackSide'} />
            </Canvas>
    )
}