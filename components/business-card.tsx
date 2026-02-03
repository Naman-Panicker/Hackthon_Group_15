"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StarRating } from "@/components/ui/star-rating"
import { MapPin } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

interface BusinessCardProps {
    business: {
        id: string
        name: string
        category: string
        image: string | null
        address: string
        rating: number
        reviewCount: number
    }
}

export function BusinessCard({ business }: BusinessCardProps) {
    return (
        <Link href={`/business/${business.id}`} className="block h-full">
            <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="h-full"
            >
                <Card className="glass-card hover:shadow-2xl transition-all duration-300 overflow-hidden h-full group relative border-0 ring-1 ring-white/10">
                    
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />

                    <div className="aspect-video relative overflow-hidden bg-muted">
                        {business.image ? (
                            <Image
                                src={business.image}
                                alt={business.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                        ) : (
                            <div className="flex items-center justify-center h-full bg-secondary/50">
                                <span className="text-muted-foreground">No Image</span>
                            </div>
                        )}
                        <div className="absolute top-3 right-3 z-20">
                            <Badge variant="secondary" className="backdrop-blur-md bg-black/50 border-white/10 text-white hover:bg-black/70 transition-colors">
                                {business.category}
                            </Badge>
                        </div>
                    </div>

                    <CardHeader className="pb-2 relative z-20">
                        <div className="flex justify-between items-start">
                            <CardTitle className="text-xl font-bold line-clamp-1 group-hover:text-primary transition-colors">
                                {business.name}
                            </CardTitle>
                        </div>
                        <CardDescription className="flex items-center text-xs mt-1 text-muted-foreground/80">
                            <MapPin className="mr-1 h-3 w-3 text-primary/70" />
                            <span className="line-clamp-1">{business.address}</span>
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="pb-4 relative z-20">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2 bg-secondary/30 px-2 py-1 rounded-md">
                                <StarRating rating={business.rating} size={14} />
                                <span className="text-sm font-semibold text-foreground">{business.rating.toFixed(1)}</span>
                            </div>
                            <span className="text-xs text-muted-foreground font-medium">{business.reviewCount} reviews</span>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </Link>
    )
}
