"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, TrendingUp, Utensils, ShoppingBag, Wrench } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export function Hero() {
    const categories = [
        { name: "Restaurants", icon: Utensils },
        { name: "Shopping", icon: ShoppingBag },
        { name: "Services", icon: Wrench },
    ]

    return (
        <section className="relative flex flex-col items-center justify-center min-h-[85vh] overflow-hidden pt-16">
            {/* Background Ambience */}
            <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
            <div className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] animate-blob" />
            <div className="absolute top-1/3 -right-1/4 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[100px] animate-blob animation-delay-2000" />

            <div className="z-10 text-center px-4 max-w-4xl space-y-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Badge variant="outline" className="mb-6 px-4 py-1.5 text-sm border-primary/20 bg-primary/5 backdrop-blur-sm text-foreground/80">
                        <TrendingUp className="mr-2 h-3.5 w-3.5 text-primary" />
                        Voted #1 Review Platform
                    </Badge>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight"
                >
                    Discover & Review <br />
                    <span className="text-gradient-primary">Local Gems</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
                >
                    The community-driven platform to find the best restaurants, shops, and services in your area. Unbiased. Transparent. Beautiful.
                </motion.p>

                <motion.form
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    action="/search"
                    className="flex w-full max-w-lg items-center space-x-2 mx-auto mt-8 glass p-2 rounded-full"
                >
                    <Input
                        name="q"
                        className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 px-6 text-base h-12 placeholder:text-muted-foreground/50"
                        placeholder="What are you looking for?"
                    />
                    <Button type="submit" size="icon" className="rounded-full h-12 w-12 shrink-0 bg-primary hover:bg-primary/90 transition-all duration-300 shadow-[0_0_20px_rgba(var(--primary),0.5)]">
                        <Search className="h-5 w-5" />
                    </Button>
                </motion.form>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex flex-wrap justify-center gap-4 pt-8"
                >
                    {categories.map((cat, i) => (
                        <Link key={cat.name} href={`/search?category=${cat.name}`}>
                            <motion.div
                                whileHover={{ scale: 1.05, y: -5 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex flex-col items-center gap-3 p-5 rounded-2xl glass-card w-32 group cursor-pointer"
                            >
                                <div className="p-3 rounded-full bg-secondary/50 group-hover:bg-primary/20 transition-colors duration-300">
                                    <cat.icon className="h-6 w-6 text-foreground group-hover:text-primary transition-colors duration-300" />
                                </div>
                                <span className="text-sm font-medium">{cat.name}</span>
                            </motion.div>
                        </Link>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
