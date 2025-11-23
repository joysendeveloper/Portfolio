"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { LayoutDashboard, Code, Briefcase, FolderGit2, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()
    const router = useRouter()
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
        const token = localStorage.getItem("token")
        if (!token && pathname !== "/admin/login") {
            router.push("/admin/login")
        }
    }, [pathname, router])

    if (!isMounted) return null

    if (pathname === "/admin/login") {
        return <>{children}</>
    }

    const navItems = [
        { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
        { name: "Skills", href: "/admin/skills", icon: Code },
        { name: "Experience", href: "/admin/experience", icon: Briefcase },
        { name: "Projects", href: "/admin/projects", icon: FolderGit2 },
    ]

    return (
        <div className="flex min-h-screen">
            <aside className="w-64 border-r bg-muted/30 hidden md:block">
                <div className="flex h-14 items-center border-b px-6 font-bold">
                    Admin Panel
                </div>
                <nav className="space-y-1 p-4">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                                pathname === item.href ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                            )}
                        >
                            <item.icon className="h-4 w-4" />
                            {item.name}
                        </Link>
                    ))}
                    <button
                        onClick={() => {
                            localStorage.removeItem("token")
                            router.push("/admin/login")
                        }}
                        className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-red-500 transition-colors hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/50"
                    >
                        <LogOut className="h-4 w-4" />
                        Logout
                    </button>
                </nav>
            </aside>
            <main className="flex-1 overflow-y-auto p-8">
                {children}
            </main>
        </div>
    )
}
