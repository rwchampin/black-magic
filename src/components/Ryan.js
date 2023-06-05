import { useEffect, useRef, useState } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrthographicCamera, Plane, Sphere } from '@react-three/drei';
import { useSpring } from "@react-spring/core";
import * as THREE from 'three';

export const Ryan = () => {
    const follower = useRef();
    const plane = useRef();
    const light = useRef();
    const { viewport, scene, gl, mouse } = useThree();
    const { camera } = useThree();
    const raycaster = useRef(new THREE.Raycaster());
 
    useEffect(() => {

        camera.position.z = 3
    }, [])

    useFrame(() => {
        // if (active) {
        raycaster.current.setFromCamera(mouse, camera); // Replace { x: 0, y: 0 } with your mouse coordinates
        const intersects = raycaster.current.intersectObjects([plane.current]);

        if (intersects.length > 0) {
            // Handle intersection
            console.log(intersects[0].point)
            const intersection = intersects[0];
            follower.current.position.x = intersection.point.x;
            follower.current.position.y = intersection.point.y;
            follower.current.position.z = 1

            light.current.position.x = intersection.point.x;
            light.current.position.y = intersection.point.y;
            light.current.position.z = 1
        }
    })

    return (
        <>
           <OrthographicCamera
        makeDefault
        zoom={1}
        top={viewport.height / 2}
        bottom={-viewport.height / 2}
        left={-viewport.width / 2}
        right={viewport.width / 2}
        near={.1}
        far={1000}
        position={[0, 0, 3]}
      />
            <Sphere ref={follower} args={[.1, 16, 16]} position={[0,0,0]}>
                <meshBasicMaterial attach="material" color="blue" />
                <spotLight castShadow color={0x00ff00} ref={light} intensity={1} position={[0, 0, 0]} />
            </Sphere>
            <Plane receiveShadow ref={plane} args={[10, 10]} side={THREE.DoubleSide} position={[0, 0,0]}>
                <meshBasicMaterial attach="material" side={THREE.DoubleSide} color="red" />
            </Plane>
        </>
    )
}