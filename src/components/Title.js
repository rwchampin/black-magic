"use client";
import { extend } from "@react-three/fiber"
import { FontLoader } from "three/examples/jsm/loaders/FontLoader"
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry"   
import { Text } from "@react-three/drei"

extend({ TextGeometry })
export const Title = ({title}) => {
    const font = new FontLoader().load('/heavenly.typeface.json')
    // const font = new FontLoader().load('/fonts/helvetiker_regular.typeface.json')
    return (
        <mesh>
            <textGeometry attach="geometry" args={[title, {font, size: 1, height: 1}]}/>
        </mesh>
    )
}