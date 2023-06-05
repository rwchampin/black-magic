"use client";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import React, { useEffect, useRef } from 'react';

const Page = () => {

    const canvas = useRef(null);
    const createAnimation = () => {

        let renderer, scene, camera;
        let controls;
        let particles;

        let rad = 250, til = 1, num = 5;
        let alph = 0.9, pov = 100;
        let maxZ = pov - 2, cnt = til - 1;
        let spX = 0.1, spY = 0.1, spZ = 0.1;
        let grav = -0, psz = 5;
        let xMid = 0, yMid = 0, zMid = -3 - rad;
        let dth = -750, ang = 0;
        let sp = (2 * Math.PI) / 360;

       let mouse = new THREE.Vector2();
       let mouseOver = false;
        function init() {

            scene = new THREE.Scene();
            scene.background = new THREE.Color(0xffffff);

            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.z = 500;
            camera.lookAt(0, 0, 0);

            renderer = new THREE.WebGLRenderer({
                canvas: canvas.current,
                antialias: true

            });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setClearColor(0xffffff, 1);


            controls = new OrbitControls(camera, renderer.domElement);

            particles = new THREE.Group();

            const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
            scene.add(ambientLight);
            scene.add(particles);

            let mouse = new THREE.Vector2();

             

             window.addEventListener('mousemove', (event) => {

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

               mouseOver = true;
             }, false);
             
             window.addEventListener('mouseout', (event) => {
               mouseOver = false;
             }, false);
        }

        function animate() {
            requestAnimationFrame(animate);


            // calculate objects intersecting the picking ray
           
            // particles animation code here...
            cnt++;
            if (cnt >= til) {
                cnt = 0;
                for (let i = 0; i < num; i++) {
                    let theta = Math.random() * 2 * Math.PI;
                    let phi = Math.acos(Math.random() * 2 - 1);
                    let _x = rad * Math.sin(phi) * Math.cos(theta);
                    let _y = rad * Math.sin(phi) * Math.sin(theta);
                    let _z = rad * Math.cos(phi);

                    let geometry = new THREE.BufferGeometry();
                    let vertices = [];

                    vertices.push(_x, _y, _z);
                    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

                    let material = new THREE.PointsMaterial({ color: 0x000000, size: 5 });
                    let particle = new THREE.Points(geometry, material);

                    particle.position.set(0.005 * _x, 0.002 * _y, 0.002 * _z);
                    particles.add(particle);

                    // additional properties...
                    particle.a = 120;
                    particle.b = 120;
                    particle.c = 460;
                    particle.va = 0;
                    particle.vb = alph;
                    particle.vc = 0;
                    particle.rem = 120 + Math.random() * 20;
                    particle.mvX = 0;
                    particle.mvY = grav;
                    particle.mvZ = 0;
                }
            }

            // remove out of bound particles
            for (let i = particles.children.length - 1; i >= 0; i--) {
                let p = particles.children[i];
                if (p.position.z > maxZ) {
                    particles.remove(p);
                }
            }

            // rotate particles
            ang = ang + sp + 2 * Math.PI;
            let sin = Math.sin(ang);
            let cos = Math.cos(ang);
            particles.children.forEach(p => {
                // convert particle position to window coordinates
    let vector = p.position.clone().project(camera);
    vector.x = (vector.x + 1) / 2 * window.innerWidth;
    vector.y = -(vector.y - 1) / 2 * window.innerHeight;

    // calculate distance between particle and mouse
    let dx = mouse.x - vector.x;
    let dy = mouse.y - vector.y;
    let distance = Math.sqrt(dx * dx + dy * dy);

    // if the mouse is over the canvas and the distance is less than a certain value, repel the particle
    if (mouseOver && distance < 100) { // adjust this value as needed
      let forceDirection = new THREE.Vector3(dx, dy, 0).normalize().multiplyScalar(5); // adjust scalar value as needed
      p.position.add(forceDirection);
    }
    // else, move the particle back to its original position
    else {
      let forceDirection = p.originalPosition.clone().sub(p.position).normalize().multiplyScalar(5); // adjust scalar value as needed
      p.position.add(forceDirection);
    }
            });
                
            renderer.render(scene, camera);
            controls.update();
        }
        init();
        animate(); 
        window.addEventListener('resize', function() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        }, false);

    }


   

    useEffect(() => {
        createAnimation();
    }, []);
    
    return (
        <canvas ref={canvas} id="canvas"></canvas>
    );
}

export default Page;