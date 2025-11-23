"use client"

import { useEffect, useState } from "react"
import api from "@/lib/api"
import { Experience } from "@/types"
import { Trash2, Plus } from "lucide-react"

export default function AdminExperiencePage() {
    const [experiences, setExperiences] = useState<Experience[]>([])
    const [formData, setFormData] = useState({
        company: "",
        role: "",
        startDate: "",
        endDate: "",
        description: "",
        technologies: "",
    })

    const fetchExperiences = async () => {
        try {
            const res = await api.get("/experiences")
            setExperiences(res.data)
        } catch (error) {
            console.error("Failed to fetch experiences", error)
        }
    }

    useEffect(() => {
        fetchExperiences()
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const payload = {
                ...formData,
                technologies: formData.technologies.split(",").map((t) => t.trim()),
                endDate: formData.endDate || null,
            }
            await api.post("/experiences", payload)
            setFormData({
                company: "",
                role: "",
                startDate: "",
                endDate: "",
                description: "",
                technologies: "",
            })
            fetchExperiences()
        } catch (error) {
            console.error("Failed to create experience", error)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure?")) return
        try {
            await api.delete(`/experiences/${id}`)
            fetchExperiences()
        } catch (error) {
            console.error("Failed to delete experience", error)
        }
    }

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold">Manage Experience</h1>

            <div className="grid gap-8 lg:grid-cols-2">
                <div className="space-y-4 rounded-lg border bg-card p-6 shadow-sm">
                    <h2 className="text-xl font-semibold">Add New Experience</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium">Company</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.company}
                                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium">Role</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.role}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium">Start Date</label>
                                <input
                                    type="date"
                                    required
                                    value={formData.startDate}
                                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium">End Date (Leave empty if current)</label>
                                <input
                                    type="date"
                                    value={formData.endDate}
                                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                />
                            </div>
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
                            <label className="text-sm font-medium">Technologies (comma separated)</label>
                            <input
                                type="text"
                                value={formData.technologies}
                                onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                placeholder="React, Node.js, MongoDB"
                            />
                        </div>
                        <button
                            type="submit"
                            className="flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                        >
                            <Plus className="mr-2 h-4 w-4" /> Add Experience
                        </button>
                    </form>
                </div>

                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Existing Experience</h2>
                    <div className="space-y-4">
                        {experiences.map((exp) => (
                            <div
                                key={exp._id}
                                className="flex items-start justify-between rounded-md border bg-card p-4 shadow-sm"
                            >
                                <div>
                                    <h3 className="font-bold">{exp.role}</h3>
                                    <p className="text-primary">{exp.company}</p>
                                    <p className="text-xs text-muted-foreground">
                                        {new Date(exp.startDate).toLocaleDateString()} -{" "}
                                        {exp.endDate ? new Date(exp.endDate).toLocaleDateString() : "Present"}
                                    </p>
                                </div>
                                <button
                                    onClick={() => handleDelete(exp._id)}
                                    className="rounded-md p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/50"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        ))}
                        {experiences.length === 0 && <p className="text-muted-foreground">No experience found.</p>}
                    </div>
                </div>
            </div>
        </div>
    )
}
