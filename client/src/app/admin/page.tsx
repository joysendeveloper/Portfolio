export default function AdminDashboard() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Welcome to your portfolio admin panel.</p>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-lg border bg-card p-6 shadow-sm">
                    <h3 className="font-semibold">Skills</h3>
                    <p className="text-sm text-muted-foreground">Manage your technical skills</p>
                </div>
                <div className="rounded-lg border bg-card p-6 shadow-sm">
                    <h3 className="font-semibold">Experience</h3>
                    <p className="text-sm text-muted-foreground">Update your work history</p>
                </div>
                <div className="rounded-lg border bg-card p-6 shadow-sm">
                    <h3 className="font-semibold">Projects</h3>
                    <p className="text-sm text-muted-foreground">Showcase your latest work</p>
                </div>
            </div>
        </div>
    )
}
