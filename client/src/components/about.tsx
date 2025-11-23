"use client"

import { motion } from "framer-motion"

export function About() {
    return (
        <section id="about" className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-background via-purple-500/5 to-background -z-10" />
            <div className="container px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center text-center space-y-6"
                >
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                        About Me
                    </h2>
                    <p className="mx-auto max-w-[800px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed leading-8">
                        I am a passionate developer with a knack for building <span className="text-foreground font-semibold">beautiful</span> and <span className="text-foreground font-semibold">functional</span> web applications.
                        With a strong foundation in both frontend and backend technologies, I strive to create seamless user experiences.
                        I love learning new tools and frameworks to stay ahead in the ever-evolving tech landscape.
                    </p>
                </motion.div>
            </div>
        </section>
    )
}
