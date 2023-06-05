
import { Vector3 } from 'three'
import { useEffect, useRef } from 'react'
import { ParticlesRise } from '@/components'
import { useFrame, useThree, Canvas } from '@react-three/fiber'
import { useGLTF, SpotLight, useDepthBuffer } from '@react-three/drei'

export default function Home() {

 
  return (
  
      <ParticlesRise />
    
   
  )
}



function Scene() {
  // This is a super cheap depth buffer that only renders once (frames: 1 is optional!), which works well for static scenes
  // Spots can optionally use that for realism, learn about soft particles here: http://john-chapman-graphics.blogspot.com/2013/01/good-enough-volumetrics-for-spotlights.html
  const depthBuffer = useDepthBuffer({ frames: 1 })
  // const { nodes, materials } = useGLTF('/tits.glb')

  return (
    <>
      <MovingSpot depthBuffer={depthBuffer} color="#0c8cbf" position={[3, 3, 2]} />
      <MovingSpot depthBuffer={depthBuffer} color="#b00c3f" position={[1, 3, 0]} />
      {/* <mesh position={[0, -1.03, 0]} castShadow receiveShadow geometry={nodes.Developer.geometry} material={materials['Default OBJ.001']} dispose={null} /> 
      <mesh receiveShadow position={[0, -1, 0]} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[50, 50]} />
        <meshPhongMaterial />
      </mesh> */}

    </>
  )
}

function MovingSpot({ vec = new Vector3(), ...props }) {
  const light = useRef()
  const viewport = useThree((state) => state.viewport)
  useFrame((state) => {
    light.current.target.position.lerp(vec.set((state.mouse.x * viewport.width) / 2, (state.mouse.y * viewport.height) / 2, 0), 0.1)
    light.current.target.updateMatrixWorld()
  })
  return <SpotLight castShadow ref={light} penumbra={1} distance={6} angle={0.35} attenuation={5} anglePower={4} intensity={2} {...props} />
}
