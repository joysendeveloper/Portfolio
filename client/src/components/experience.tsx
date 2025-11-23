"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import api from "@/lib/api"
import { Experience } from "@/types"

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
        <section id="experience" className="py-24 bg-muted/30 relative">
            <div className="container px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="space-y-12"
                >
                    <div className="text-center space-y-4">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-green-600">Experience</h2>
                        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">My professional journey</p>
                    </div>
                    <div className="space-y-8 max-w-4xl mx-auto">
                        {experiences.length > 0 ? (
                            experiences.map((exp, index) => (
                                <motion.div
                                    key={exp._id}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="relative pl-8 border-l-2 border-emerald-500/30 group"
                                >
                                    <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-emerald-500 group-hover:scale-125 transition-transform" />
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                                        <h3 className="text-2xl font-bold group-hover:text-emerald-500 transition-colors">{exp.role}</h3>
                                        <span className="text-sm font-mono text-muted-foreground bg-secondary px-2 py-1 rounded">
                                            {new Date(exp.startDate).toLocaleDateString()} -{" "}
                                            {exp.endDate ? new Date(exp.endDate).toLocaleDateString() : "Present"}
                                        </span>
                                    </div>
                                    <h4 className="text-lg font-semibold text-foreground/80 mb-4">{exp.company}</h4>
                                    <p className="text-muted-foreground mb-6 leading-relaxed">{exp.description}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {exp.technologies.map((tech) => (
                                            <span key={tech} className="px-3 py-1 text-xs font-medium rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <p className="text-center text-muted-foreground">No experience found.</p>
                        )}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
