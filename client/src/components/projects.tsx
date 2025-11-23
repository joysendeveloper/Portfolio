"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import api from "@/lib/api"
import { Project } from "@/types"
import { Github, ExternalLink } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"

export function Projects() {
    const [projects, setProjects] = useState<Project[]>([])

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await api.get("/projects")
                setProjects(res.data)
            } catch (error) {
                console.error("Failed to fetch projects", error)
            }
        }
        fetchProjects()
    }, [])

    return (
        <section id="projects" className="py-24 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-orange-500/10 rounded-full blur-[150px] -z-10" />

            <div className="container px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="space-y-12"
                >
                    <div className="text-center space-y-4">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500">
                            Featured Works
                        </h2>
                        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                            A showcase of technical challenges and creative solutions
                        </p>
                    </div>

                    <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {projects.length > 0 ? (
                            projects.map((project, index) => (
                                <motion.div
                                    key={project._id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    whileHover={{ y: -10 }}
                                >
                                    <Card className="group flex flex-col bg-white/5 backdrop-blur-sm border border-white/10 overflow-hidden hover:shadow-[0_0_30px_rgba(249,115,22,0.2)] transition-all duration-300">
                                        {/* Image Container */}
                                        <div className="relative aspect-video w-full overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60 z-10" />

                                            {project.imageUrl && project.imageUrl.startsWith('http') ? (
                                                <img
                                                    src={project.imageUrl}
                                                    alt={project.title}
                                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                            ) : (
                                                <div className="h-full w-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                                                    <span className="text-6xl font-bold opacity-10 text-white">{project.title[0]}</span>
                                                </div>
                                            )}

                                            {/* Floating Action Bar */}
                                            <div className="absolute bottom-4 right-4 z-20 flex gap-3 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                                {project.repoUrl && (
                                                    <a
                                                        href={project.repoUrl}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="p-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white hover:text-black transition-colors"
                                                        title="View Code"
                                                    >
                                                        <Github className="h-5 w-5" />
                                                    </a>
                                                )}
                                                {project.demoUrl && (
                                                    <a
                                                        href={project.demoUrl}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="p-2.5 bg-orange-500 rounded-full text-white hover:bg-orange-600 transition-colors shadow-lg"
                                                        title="Live Demo"
                                                    >
                                                        <ExternalLink className="h-5 w-5" />
                                                    </a>
                                                )}
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <CardHeader>
                                            <CardTitle className="text-xl font-bold text-foreground group-hover:text-orange-400 transition-colors">
                                                {project.title}
                                            </CardTitle>
                                            <CardDescription className="text-sm line-clamp-3 leading-relaxed">
                                                {project.description}
                                            </CardDescription>
                                        </CardHeader>

                                        <CardFooter className="mt-auto pt-0">
                                            <div className="flex flex-wrap gap-2">
                                                {project.tags.map((tag) => (
                                                    <span key={tag} className="px-2.5 py-1 text-xs font-medium rounded-md bg-white/5 text-orange-300 border border-white/5">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </CardFooter>
                                    </Card>
                                </motion.div>
                            ))
                        ) : (
                            <p className="col-span-full text-center text-muted-foreground">No projects found.</p>
                        )}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
