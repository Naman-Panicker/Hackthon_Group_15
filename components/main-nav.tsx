"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export function MainNav() {
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <header
            className={cn(
                "fixed top-0 z-50 w-full transition-all duration-300",
                scrolled
                    ? "border-b border-white/10 bg-background/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60"
                    : "bg-transparent border-transparent"
            )}
        >
            <div className="container flex h-16 max-w-screen-2xl items-center mx-auto px-4 justify-between">
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center space-x-2 group">
                        <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-primary transition-colors">
                            Crowd<span className="text-primary">Review</span>
                        </span>
                    </Link>
                    <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                        <Link
                            href="/search"
                            className="transition-colors hover:text-primary text-foreground/80"
                        >
                            Browse
                        </Link>
                        <Link
                            href="/business/register"
                            className="transition-colors hover:text-primary text-foreground/80"
                        >
                            For Business
                        </Link>
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    <Link href="/admin/dashboard">
                        <Button variant="ghost" size="sm" className="hidden md:flex hover:bg-white/10 hover:text-primary">Admin</Button>
                    </Link>
                    <Link href="/search">
                        <Button size="sm" className="bg-white/10 hover:bg-white/20 text-white border border-white/10 backdrop-blur-sm rounded-full px-6 transition-all hover:scale-105">
                            Get Started
                        </Button>
                    </Link>
                </div>
            </div>
        </header>
    )
}
