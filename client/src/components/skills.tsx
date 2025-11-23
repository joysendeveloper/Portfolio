"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import api from "@/lib/api"
import { Skill } from "@/types"

export function Skills() {
    const [skills, setSkills] = useState<Skill[]>([])

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const res = await api.get("/skills")
                setSkills(res.data)
            } catch (error) {
                console.error("Failed to fetch skills", error)
            }
        }
        fetchSkills()
    }, [])

    return (
        <section id="skills" className="py-24 relative">
            <div className="container px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="space-y-12"
                >
                    <div className="text-center space-y-4">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">Skills</h2>
                        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">My technical expertise</p>
                    </div>
                    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                        {skills.length > 0 ? (
                            skills.map((skill, index) => (
                                <motion.div
                                    key={skill._id}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                    viewport={{ once: true }}
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    className="flex flex-col items-center justify-center p-6 rounded-xl bg-gradient-to-br from-background to-muted border border-white/5 shadow-lg hover:shadow-purple-500/20 transition-all group"
                                >
                                    <span className="text-lg font-bold group-hover:text-purple-500 transition-colors">{skill.name}</span>
                                    <span className="text-sm text-muted-foreground mt-2">{skill.category}</span>
                                    <div className="w-full bg-secondary h-1.5 rounded-full mt-4 overflow-hidden">
                                        <motion.div
                                            className="bg-gradient-to-r from-purple-500 to-blue-500 h-full rounded-full"
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${skill.level}%` }}
                                            transition={{ duration: 1, delay: 0.5 }}
                                        />
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <p className="col-span-full text-center text-muted-foreground">No skills found. Add some via the admin dashboard.</p>
                        )}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
