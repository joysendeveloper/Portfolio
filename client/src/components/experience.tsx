"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import api from "@/lib/api"
import { Experience } from "@/types"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export function ExperienceSection() {
    const [experiences, setExperiences] = useState<Experience[]>([])

    useEffect(() => {
        const fetchExperiences = async () => {
            try {
                const res = await api.get("/experiences")
                setExperiences(res.data)
            } catch (error) {
                console.error("Failed to fetch experiences", error)
            }
        }
        fetchExperiences()
    }, [])

    return (
        <section id="experience" className="py-24 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] -z-10" />

            <div className="container px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="space-y-16"
                >
                    <div className="text-center space-y-4">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-500">
                            Professional Journey
                        </h2>
                        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                            Building impactful solutions across the industry
                        </p>
                    </div>

                    <div className="relative max-w-4xl mx-auto">
                        {/* Vertical Timeline Line */}
                        <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/0 via-emerald-500/50 to-emerald-500/0 md:-translate-x-1/2" />

                        <div className="space-y-12">
                            {experiences.length > 0 ? (
                                experiences.map((exp, index) => (
                                    <motion.div
                                        key={exp._id}
                                        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.6, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                        className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                                            }`}
                                    >
                                        {/* Timeline Dot */}
                                        <div className="absolute left-[-5px] md:left-1/2 top-0 w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] md:-translate-x-1/2 z-10" />

                                        {/* Spacer for Desktop Layout */}
                                        <div className="hidden md:block flex-1" />

                                        {/* Content Card */}
                                        <div className="flex-1 ml-6 md:ml-0">
                                            <Card className="relative bg-white/5 backdrop-blur-sm border-white/10 hover:border-emerald-500/30 transition-colors group">
                                                {/* Arrow */}
                                                <div className={`absolute top-0 w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent 
                                                    ${index % 2 === 0
                                                        ? "left-[-10px] border-r-[10px] border-r-white/10 md:left-auto md:right-[-10px] md:border-r-0 md:border-l-[10px] md:border-l-white/10"
                                                        : "left-[-10px] border-r-[10px] border-r-white/10"
                                                    }`}
                                                />

                                                <CardHeader className="pb-4">
                                                    <div className="flex items-center justify-between flex-wrap gap-2">
                                                        <CardTitle className="text-xl text-foreground group-hover:text-emerald-400 transition-colors">
                                                            {exp.role}
                                                        </CardTitle>
                                                        <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full border border-emerald-500/20">
                                                            {new Date(exp.startDate).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })} -{" "}
                                                            {exp.endDate ? new Date(exp.endDate).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : "Present"}
                                                        </span>
                                                    </div>
                                                    <CardDescription className="text-lg font-medium">{exp.company}</CardDescription>
                                                </CardHeader>

                                                <CardContent className="space-y-4">
                                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                                        {exp.description}
                                                    </p>

                                                    <div className="flex flex-wrap gap-2">
                                                        {exp.technologies.map((tech) => (
                                                            <span key={tech} className="px-2.5 py-1 text-xs font-medium rounded-md bg-white/5 text-emerald-300 border border-white/5 hover:bg-emerald-500/10 transition-colors">
                                                                {tech}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <p className="text-center text-muted-foreground">No experience found.</p>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
