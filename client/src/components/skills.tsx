"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import api from "@/lib/api"
import { Skill } from "@/types"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

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

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    }

    return (
        <section id="skills" className="py-24 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[100px] -z-10" />

            <div className="container px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="space-y-12"
                >
                    <div className="text-center space-y-4">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-500">
                            Technical Arsenal
                        </h2>
                        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                            Tools and technologies I use to bring ideas to life
                        </p>
                    </div>

                    <motion.div
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
                    >
                        {skills.length > 0 ? (
                            skills.map((skill) => (
                                <motion.div
                                    key={skill._id}
                                    variants={item}
                                    whileHover={{
                                        scale: 1.05,
                                        rotate: 2,
                                        boxShadow: "0 0 20px rgba(139, 92, 246, 0.3)"
                                    }}
                                >
                                    <Card className="h-full flex flex-col items-center justify-center bg-white/5 backdrop-blur-md border-white/10 shadow-lg overflow-hidden group relative">
                                        {/* Hover Gradient Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                        <CardHeader className="items-center pb-2 z-10">
                                            <CardTitle className="text-lg font-bold group-hover:text-purple-400 transition-colors">{skill.name}</CardTitle>
                                            <CardDescription className="text-xs uppercase tracking-wider">{skill.category}</CardDescription>
                                        </CardHeader>

                                        <CardContent className="w-full pb-6 z-10">
                                            <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                                                <motion.div
                                                    className="bg-gradient-to-r from-purple-500 to-blue-500 h-full rounded-full"
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${skill.level}%` }}
                                                    transition={{ duration: 1, delay: 0.2 }}
                                                />
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))
                        ) : (
                            <p className="col-span-full text-center text-muted-foreground">No skills found. Add some via the admin dashboard.</p>
                        )}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}
