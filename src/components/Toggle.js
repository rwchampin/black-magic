"use client"
import { useEffect, useRef, useState } from "react"
import { useThree, useFrame } from "@react-three/fiber"
import * as THREE from 'three'
import gsap from 'gsap'

export const Toggle = () => {
    const [isToggled, setIsToggled] = useState(false)
    const { scene, camera, gl } = useThree()
   
    useEffect(() => {
        const secondaryScene = new THREE.Scene()
        const secondarySizes = { width: 108, height: 68 }
        const renderTarget = new THREE.WebGLRenderTarget(secondarySizes.width, secondarySizes.height, {
            minFilter: THREE.LinearFilter,
            magFilter: THREE.NearestFilter,
            format: THREE.RGBAFormat,
            type: THREE.UnsignedByteType,
        })
    
        const planeGeometry = new THREE.PlaneGeometry(secondarySizes.width, secondarySizes.height)
        const planeMaterial = new THREE.MeshBasicMaterial({
            map: renderTarget.texture,
            transparent: true,
        })
        const targetPlane = new THREE.Mesh(planeGeometry, planeMaterial)
        targetPlane.position.set(0, 0, 0)
        primaryScene.add(targetPlane)
        const secondaryCamera = new THREE.PerspectiveCamera(45, renderTarget.width / renderTarget.height, 0.1, 100)
        secondaryCamera.position.set(targetPlane.position.x, targetPlane.position.y, targetPlane.position.z + 1)
        const { preference } = $colorMode
    
    
        const color = new THREE.Color()
        const { to } = gsap
    
        const backgroundColor = '#F4F4F8'
        const dotColor = '#AAAAB7'
        const activeColor = '#36363C'
    
        document.querySelectorAll('.switch').forEach((toggle) => {
            const input = toggle.querySelector('input')
            input?.setAttribute('checked', isToggled.value ? 'checked' : '')
            const mouseX = 0
            const mouseY = 0

            secondaryCamera.position.z = 120

            const rectangle = new THREE.Shape()
            roundedRect(rectangle, -36, -20, 72, 40, 20)

            const backgroundShape = new THREE.ExtrudeGeometry(rectangle, {
                curveSegments: 20,
                depth: 2,
                bevelEnabled: true,
                bevelSegments: 20,
                steps: 12,
                bevelSize: 6,
                bevelThickness: 6,
            })

            const background = new THREE.Mesh(backgroundShape, new THREE.MeshPhongMaterial({
                color: color.clone().set(backgroundColor),
                shininess: 40,
            }))
            background.receiveShadow = true
            background.castShadow = true
            secondaryScene.add(secondaryCamera, background)

            const dotShape = new THREE.SphereGeometry(14, 32, 32)

            const sphere = new THREE.Mesh(dotShape, new THREE.MeshPhongMaterial({
                color: color.clone().set(dotColor),
                shininess: 10,
            }))
            sphere.castShadow = true

            secondaryScene.add(sphere)

            dotShape.translate(-16, 0, 24)
            sphere.scale.set(0.8, 0.8, 0.8)

            secondaryScene.add(directionLight(0.1, 0, 0, 100))
            secondaryScene.add(directionLight(0.9, 0, 80, 30))
            secondaryScene.add(directionLight(0.2, 0, -80, 60))
            secondaryScene.add(directionLight(0.3, -120, -120, -1))
            secondaryScene.add(directionLight(0.3, 120, -120, -1))

            secondaryScene.add(new THREE.AmbientLight(0x626267))

            // renderer2.domElement.addEventListener('pointermove', (e) => {
            //   mouseX = (e.clientX - e.target.getBoundingClientRect().left - e.target.offsetWidth / 2) * -0.8
            //   mouseY = (e.clientY - e.target.getBoundingClientRect().top - e.target.offsetHeight / 2) * -0.8
            // }, false)

            // renderer2.domElement.addEventListener('pointerleave', (e) => {
            //   mouseX = 0
            //   mouseY = 0
            // }, false)

            // renderer2.domElement.addEventListener('pointerdown', (e) => {
            //   to(background.position, {
            //     z: -4,
            //     duration: 0.15,
            //   })
            // })

            // renderer2.domElement.addEventListener('pointerup', (e) => {
            //   to(background.position, {
            //     z: 0,
            //     duration: 0.15,
            //   })
            // })

            input.addEventListener('change', (e) => {
                const value = e.target.checked

                const c = value === true ? 'dark' : 'light'
                $setColorMode(c)
                const hex = c === 'dark' ? 0x000000 : 0xFFFFFF
                const clr = color.clone().set(hex)
                // renderer.setClearColor(clr)
                // scene.background = clr
                renderer.render(secondaryScene, secondaryCamera)
                if (input.checked) {
                    to(sphere.scale, {
                        x: 0.9,
                        y: 0.9,
                        z: 0.9,
                        duration: 0.6,
                        ease: 'elastic.out(1, .75)',
                    })
                    to(sphere.position, {
                        x: 26,
                        z: 4,
                        duration: 0.6,
                        ease: 'elastic.out(1, .75)',
                    })
                    const newColor = new THREE.Color(activeColor)
                    to(sphere.material.color, {
                        r: newColor.r,
                        g: newColor.g,
                        b: newColor.b,
                        duration: 0.3,
                    })
                    return
                }
                to(sphere.scale, {
                    x: 0.8,
                    y: 0.8,
                    z: 0.8,
                    duration: 0.6,
                    ease: 'elastic.out(1, .75)',
                })
                to(sphere.position, {
                    x: 0,
                    z: 0,
                    duration: 0.6,
                    ease: 'elastic.out(1, .75)',
                })
                const newColor = new THREE.Color(dotColor)
                to(sphere.material.color, {
                    r: newColor.r,
                    g: newColor.g,
                    b: newColor.b,
                    duration: 0.3,
                })
            })

            const render = () => {
                renderer.setRenderTarget(renderTarget)
                renderer.render(secondaryScene, secondaryCamera)
                renderer.setRenderTarget(null)
                secondaryCamera.position.x += (mouseX - secondaryCamera.position.x) * 0.25
                secondaryCamera.position.y += (-mouseY - secondaryCamera.position.y) * 0.25
            }
            gsap.ticker.add(render)
        })

        function roundedRect(ctx, x, y, width, height, radius) {
            ctx.moveTo(x, y + radius)
            ctx.lineTo(x, y + height - radius)
            ctx.quadraticCurveTo(x, y + height, x + radius, y + height)
            ctx.lineTo(x + width - radius, y + height)
            ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius)
            ctx.lineTo(x + width, y + radius)
            ctx.quadraticCurveTo(x + width, y, x + width - radius, y)
            ctx.lineTo(x + radius, y)
            ctx.quadraticCurveTo(x, y, x, y + radius)
        }

        function directionLight(opacity, x, y, z, color = 0xFFFFFF) {
            const light = new THREE.DirectionalLight(color, opacity)
            light.position.set(x, y, z)
            light.castShadow = true

            const d = 4000
            light.shadow.camera.left = -d
            light.shadow.camera.right = d
            light.shadow.camera.top = d * 0.25
            light.shadow.camera.bottom = -d

            light.shadow.mapSize.width = 1024
            light.shadow.mapSize.height = 1024

            return light
        }
    }, [])




    return (

        <label className="switch">
            <input type="checkbox" checked="checked"/>
        </label>

    )
}
 