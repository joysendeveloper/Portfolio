export function Footer() {
    return (
        <footer className="border-t py-6 md:py-0">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-4 md:px-8">
                <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                    Built with Next.js, Tailwind CSS, and Three.js.
                </p>
                <div className="flex items-center gap-4">
                    <a href="https://github.com" target="_blank" rel="noreferrer" className="text-sm font-medium hover:underline underline-offset-4">
                        GitHub
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-sm font-medium hover:underline underline-offset-4">
                        LinkedIn
                    </a>
                </div>
            </div>
        </footer>
    )
}
