"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Float, PerspectiveCamera, Environment } from "@react-three/drei"
import { useRef, useState } from "react"
import * as THREE from "three"

function FloatingShape(props: any) {
    const meshRef = useRef<THREE.Mesh>(null)
    const [hovered, setHover] = useState(false)

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * 0.2
            meshRef.current.rotation.y += delta * 0.3
        }
    })

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <mesh
                {...props}
                ref={meshRef}
                onPointerOver={() => setHover(true)}
                onPointerOut={() => setHover(false)}
                scale={hovered ? 1.2 : 1}
            >
                <icosahedronGeometry args={[1, 0]} />
                <meshStandardMaterial
                    color={hovered ? "#hotpink" : "#6366f1"}
                    roughness={0.3}
                    metalness={0.8}
                />
            </mesh>
        </Float>
    )
}

export function HeroScene() {
    return (
        <div className="h-full w-full absolute top-0 left-0 -z-10">
            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 5]} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <FloatingShape position={[2, 0, 0]} />
                <FloatingShape position={[-2, 1, -1]} scale={0.8} />
                <FloatingShape position={[0, -2, -2]} scale={1.2} />
                <Environment preset="city" />
            </Canvas>
        </div>
    )
}
