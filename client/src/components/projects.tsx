"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import api from "@/lib/api"
import { Project } from "@/types"
import { Github, ExternalLink } from "lucide-react"

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
        <section id="projects" className="py-24">
            <div className="container px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="space-y-12"
                >
                    <div className="text-center space-y-4">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-600">Projects</h2>
                        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">Some of my recent work</p>
                    </div>
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {projects.length > 0 ? (
                            projects.map((project, index) => (
                                <motion.div
                                    key={project._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    whileHover={{ y: -10 }}
                                    className="group relative overflow-hidden rounded-xl border bg-card shadow-lg hover:shadow-2xl transition-all"
                                >
                                    <div className="aspect-video w-full overflow-hidden bg-muted relative">
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center gap-4">
                                            {project.repoUrl && (
                                                <a href={project.repoUrl} target="_blank" rel="noreferrer" className="p-2 bg-white rounded-full text-black hover:scale-110 transition-transform">
                                                    <Github className="h-6 w-6" />
                                                </a>
                                            )}
                                            {project.demoUrl && (
                                                <a href={project.demoUrl} target="_blank" rel="noreferrer" className="p-2 bg-white rounded-full text-black hover:scale-110 transition-transform">
                                                    <ExternalLink className="h-6 w-6" />
                                                </a>
                                            )}
                                        </div>
                                        <div className="h-full w-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center text-muted-foreground">
                                            {project.imageUrl && project.imageUrl.startsWith('http') ? (
                                                <img src={project.imageUrl} alt={project.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                            ) : (
                                                <span className="text-4xl font-bold opacity-20">{project.title[0]}</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="p-6 space-y-4">
                                        <h3 className="text-xl font-bold group-hover:text-orange-500 transition-colors">{project.title}</h3>
                                        <p className="text-muted-foreground line-clamp-3 text-sm">{project.description}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {project.tags.map((tag) => (
                                                <span key={tag} className="px-2 py-1 text-xs font-medium rounded-md bg-secondary text-secondary-foreground">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
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
