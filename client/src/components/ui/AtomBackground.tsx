"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function AtomParticles(props: any) {
    const ref = useRef<THREE.Points>(null!);
    const { mouse, viewport } = useThree();

    // Generate random particle positions
    const count = 600; // Increased density
    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const r = 10 + Math.random() * 5; // Radius of the atom cloud with some variation
            // eslint-disable-next-line react-compiler/react-compiler
            const theta = 2 * Math.PI * Math.random();
            const phi = Math.acos(2 * Math.random() - 1);

            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.sin(phi) * Math.sin(theta);
            const z = r * Math.cos(phi);

            pos[i * 3] = x;
            pos[i * 3 + 1] = y;
            pos[i * 3 + 2] = z;
        }
        return pos;
    }, [count]);

    useFrame((state, delta) => {
        if (ref.current) {
            // Basic rotation
            ref.current.rotation.x -= delta / 15;
            ref.current.rotation.y -= delta / 20;

            // Mouse interaction
            // Map mouse coordinates (-1 to 1) to world space roughly
            const mouseX = (state.mouse.x * viewport.width) / 2;
            const mouseY = (state.mouse.y * viewport.height) / 2;

            // Apply a subtle "look at" or tilt effect based on mouse
            ref.current.rotation.x += (state.mouse.y * 0.1 - ref.current.rotation.x) * delta;
            ref.current.rotation.y += (state.mouse.x * 0.1 - ref.current.rotation.y) * delta;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={positions} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color="#8b5cf6" // Violet/Purple to match the theme
                    size={0.12} // Slightly smaller for higher density
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </Points>
        </group>
    );
}

export default function AtomBackground() {
    return (
        <div className="absolute inset-0 z-0 bg-background">
            <Canvas camera={{ position: [0, 0, 20], fov: 60 }}>
                <fog attach="fog" args={['#000', 10, 40]} /> {/* Fade out distant particles */}
                <AtomParticles />
            </Canvas>
        </div>
    );
}
