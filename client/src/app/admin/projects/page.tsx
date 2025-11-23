"use client"

import { useEffect, useState } from "react"
import api from "@/lib/api"
import { Project } from "@/types"
import { Trash2, Plus } from "lucide-react"

export default function AdminProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([])
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        imageUrl: "",
        tags: "",
        demoUrl: "",
        repoUrl: "",
    })

    const fetchProjects = async () => {
        try {
            const res = await api.get("/projects")
            setProjects(res.data)
        } catch (error) {
            console.error("Failed to fetch projects", error)
        }
    }

    useEffect(() => {
        fetchProjects()
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const payload = {
                ...formData,
                tags: formData.tags.split(",").map((t) => t.trim()),
            }
            await api.post("/projects", payload)
            setFormData({
                title: "",
                description: "",
                imageUrl: "",
                tags: "",
                demoUrl: "",
                repoUrl: "",
            })
            fetchProjects()
        } catch (error) {
            console.error("Failed to create project", error)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure?")) return
        try {
            await api.delete(`/projects/${id}`)
            fetchProjects()
        } catch (error) {
            console.error("Failed to delete project", error)
        }
    }

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold">Manage Projects</h1>

            <div className="grid gap-8 lg:grid-cols-2">
                <div className="space-y-4 rounded-lg border bg-card p-6 shadow-sm">
                    <h2 className="text-xl font-semibold">Add New Project</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="text-sm font-medium">Title</label>
                            <input
                                type="text"
                                required
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Description</label>
                            <textarea
                                required
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Image URL</label>
                            <input
                                type="text"
                                required
                                value={formData.imageUrl}
                                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                placeholder="https://example.com/image.png"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Tags (comma separated)</label>
                            <input
                                type="text"
                                value={formData.tags}
                                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                placeholder="React, Next.js, Three.js"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium">Demo URL</label>
                                <input
                                    type="text"
                                    value={formData.demoUrl}
                                    onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium">Repo URL</label>
                                <input
                                    type="text"
                                    value={formData.repoUrl}
                                    onChange={(e) => setFormData({ ...formData, repoUrl: e.target.value })}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                        >
                            <Plus className="mr-2 h-4 w-4" /> Add Project
                        </button>
                    </form>
                </div>

                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Existing Projects</h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                        {projects.map((project) => (
                            <div
                                key={project._id}
                                className="relative rounded-md border bg-card p-4 shadow-sm"
                            >
                                <h3 className="font-bold truncate">{project.title}</h3>
                                <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{project.description}</p>
                                <button
                                    onClick={() => handleDelete(project._id)}
                                    className="absolute top-2 right-2 rounded-md p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/50"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        ))}
                        {projects.length === 0 && <p className="col-span-full text-muted-foreground">No projects found.</p>}
                    </div>
                </div>
            </div>
        </div>
    )
}
