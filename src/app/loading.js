import { CanvasManager } from "@/components";
import * as THREE from 'three';
export default function Loading(props) {
    let positions = [];
    let vectors = [];
    const RADIUS = 1;
    const MAX_POINTS = 5000;

    const init = () => {
        for (let i = 0; i < MAX_POINTS; i++) {
            const theta = THREE.MathUtils.randFloatSpread(360);
            const phi = THREE.MathUtils.randFloatSpread(360);

            const x = RADIUS * Math.sin(theta) * Math.cos(phi);
            const y = RADIUS * Math.sin(theta) * Math.sin(phi);
            const z = RADIUS * Math.cos(theta);

            const vec = new THREE.Vector3(x, y, z);
            vectors.push(vec);

            positions.push(x, y, z);
        }

    }
    return (
        <div className="loading w-full h-full">
            <CanvasManager shadows dpr={[1, 2]} camera={{ position: [0, 0, 6], fov: 50, near: 1, far: 1000 }}>

                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />

                <mesh>
                    <bufferGeometry attach="geometry">
                        <bufferAttribute
                            attachObject="attributes-position"
                            count={positions.length / 3}
                            array={new Float32Array(positions)}
                            itemSize={3}
                        />
                    </bufferGeometry>
                    <pointsMaterial attach="material" color="white" size={0.05} />
                </mesh>
            </CanvasManager>
        </div>
    )
}