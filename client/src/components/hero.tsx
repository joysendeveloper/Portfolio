"use client"

import { HeroScene } from "./3d/hero-scene"
import Link from "next/link"
import { motion } from "framer-motion"

export function Hero() {
    return (
        <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
            {/* Background Image */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-30 dark:opacity-20"
                style={{ backgroundImage: 'url("/hero-bg.png")' }}
            />

            {/* Overlay Gradient */}
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-background/50 to-background" />

            <HeroScene />

            <div className="container px-4 md:px-6 relative z-10 flex flex-col items-center text-center space-y-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-4"
                >
                    <h1 className="text-5xl font-extrabold tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 animate-gradient-x">
                        Creative Developer
                    </h1>
                    <p className="mx-auto max-w-[700px] text-muted-foreground md:text-2xl font-light">
                        Building digital experiences with <span className="text-foreground font-medium">code</span> and <span className="text-foreground font-medium">creativity</span>.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="flex flex-col sm:flex-row gap-4"
                >
                    <Link
                        href="#projects"
                        className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-8 text-sm font-medium text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                        View Work
                    </Link>
                    <Link
                        href="#contact"
                        className="inline-flex h-12 items-center justify-center rounded-full border border-input bg-background/50 backdrop-blur-sm px-8 text-sm font-medium shadow-sm transition-all hover:bg-accent hover:text-accent-foreground hover:scale-105 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                        Contact Me
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}
