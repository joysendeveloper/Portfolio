"use client";

import { useEffect, useRef } from "react";
import { createNoise3D } from "simplex-noise";

export default function WavyBackground({
    children,
    className,
    containerClassName,
    colors,
    waveWidth,
    backgroundFill,
    blur = 10,
    speed = "fast",
    waveOpacity = 0.5,
    ...props
}: {
    children?: React.ReactNode;
    className?: string;
    containerClassName?: string;
    colors?: string[];
    waveWidth?: number;
    backgroundFill?: string;
    blur?: number;
    speed?: "slow" | "fast";
    waveOpacity?: number;
    [key: string]: any;
}) {
    const noise = createNoise3D();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationIdRef = useRef<number>();

    const getSpeed = () => {
        switch (speed) {
            case "slow":
                return 0.001;
            case "fast":
                return 0.002;
            default:
                return 0.001;
        }
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let w = (canvas.width = window.innerWidth);
        let h = (canvas.height = window.innerHeight);
        let nt = 0;

        const waveColors = colors ?? [
            "#8b5cf6",
            "#a855f7",
            "#c084fc",
            "#d8b4fe",
            "#e9d5ff",
        ];

        const drawWave = (n: number) => {
            nt += getSpeed();
            for (let i = 0; i < n; i++) {
                ctx.beginPath();
                ctx.lineWidth = waveWidth || 50;
                ctx.strokeStyle = waveColors[i % waveColors.length];
                for (let x = 0; x < w; x += 5) {
                    const y = noise(x / 800, 0.3 * i, nt) * 100;
                    ctx.lineTo(x, y + h * 0.5);
                }
                ctx.stroke();
                ctx.closePath();
            }
        };

        const render = () => {
            ctx.fillStyle = backgroundFill || "rgb(0, 0, 0)";
            ctx.globalAlpha = waveOpacity || 0.5;
            ctx.fillRect(0, 0, w, h);
            drawWave(5);
            animationIdRef.current = requestAnimationFrame(render);
        };

        const handleResize = () => {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
        };

        window.addEventListener("resize", handleResize);
        render();

        return () => {
            window.removeEventListener("resize", handleResize);
            if (animationIdRef.current) {
                cancelAnimationFrame(animationIdRef.current);
            }
        };
    }, [colors, waveWidth, backgroundFill, blur, speed, waveOpacity, noise]);

    return (
        <div
            className={`h-screen flex flex-col items-center justify-center ${containerClassName}`}
            {...props}
        >
            <canvas
                className="absolute inset-0 z-0"
                ref={canvasRef}
                id="canvas"
                style={{
                    filter: `blur(${blur}px)`,
                }}
            />
            <div className={`relative z-10 ${className}`}>{children}</div>
        </div>
    );
}
