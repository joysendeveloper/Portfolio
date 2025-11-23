"use client"

import { useEffect, useState } from "react"
import api from "@/lib/api"
import { Skill } from "@/types"
import { Trash2, Plus } from "lucide-react"

export default function AdminSkillsPage() {
    const [skills, setSkills] = useState<Skill[]>([])
    const [formData, setFormData] = useState({
        name: "",
        category: "",
        level: 50,
    })

    const fetchSkills = async () => {
        try {
            const res = await api.get("/skills")
            setSkills(res.data)
        } catch (error) {
            console.error("Failed to fetch skills", error)
        }
    }

    useEffect(() => {
        fetchSkills()
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await api.post("/skills", formData)
            setFormData({ name: "", category: "", level: 50 })
            fetchSkills()
        } catch (error) {
            console.error("Failed to create skill", error)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure?")) return
        try {
            await api.delete(`/skills/${id}`)
            fetchSkills()
        } catch (error) {
            console.error("Failed to delete skill", error)
        }
    }

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold">Manage Skills</h1>

            <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-4 rounded-lg border bg-card p-6 shadow-sm">
                    <h2 className="text-xl font-semibold">Add New Skill</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="text-sm font-medium">Name</label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Category</label>
                            <input
                                type="text"
                                required
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                placeholder="Frontend, Backend, etc."
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Level (1-100)</label>
                            <input
                                type="number"
                                min="1"
                                max="100"
                                required
                                value={formData.level}
                                onChange={(e) => setFormData({ ...formData, level: parseInt(e.target.value) })}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            />
                        </div>
                        <button
                            type="submit"
                            className="flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                        >
                            <Plus className="mr-2 h-4 w-4" /> Add Skill
                        </button>
                    </form>
                </div>

                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Existing Skills</h2>
                    <div className="space-y-2">
                        {skills.map((skill) => (
                            <div
                                key={skill._id}
                                className="flex items-center justify-between rounded-md border bg-card p-4 shadow-sm"
                            >
                                <div>
                                    <p className="font-medium">{skill.name}</p>
                                    <p className="text-sm text-muted-foreground">{skill.category} - {skill.level}%</p>
                                </div>
                                <button
                                    onClick={() => handleDelete(skill._id)}
                                    className="rounded-md p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/50"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        ))}
                        {skills.length === 0 && <p className="text-muted-foreground">No skills found.</p>}
                    </div>
                </div>
            </div>
        </div>
    )
}
