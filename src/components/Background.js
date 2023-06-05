import { useEffect } from 'react';
import * as THREE from 'three';

export const Background = () => {


        const geometry = new THREE.PlaneGeometry(100, 32, 32);
        const material = new THREE.MeshBasicMaterial({ color: 0x000000 });
        const plane = new THREE.Mesh(geometry, material);
        plane.position.set(0,0,0)

        return plane;
}