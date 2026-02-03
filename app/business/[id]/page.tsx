import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/ui/star-rating";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Globe, Star, User } from "lucide-react";
import Image from "next/image";
import { PrismaClient } from "@prisma/client";
import { ReviewForm } from "@/components/review-form";
import { notFound } from "next/navigation";

const prisma = new PrismaClient();


export const dynamic = 'force-dynamic'

async function getBusiness(id: string) {
    const business = await prisma.business.findUnique({
        where: { id: id }, 
  
        include: {
            reviews: {
                where: { status: "APPROVED" },
                include: { user: true },
                orderBy: { createdAt: "desc" }
            }
        }
    });
    return business;
}

export default async function BusinessPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    let business = await getBusiness(id);

    if (!business) {
        
        const all = await prisma.business.findMany({ include: { reviews: { include: { user: true } } } });
        // Simple mapping for demo:
        if (id === "1") business = all.find(b => b.name.includes("Coffee")) || null;
        else if (id === "2") business = all.find(b => b.name.includes("Boutique")) || null;
        else if (id === "3") business = all.find(b => b.name.includes("Tech")) || null;
        else business = all[0];
    }

    if (!business) return notFound();

    return (
        <div className="min-h-screen pb-20">
            {/* Hero Header */}
            <div className="relative h-[300px] md:h-[400px] w-full">
                {business.image && (
                    <Image
                        src={business.image}
                        alt={business.name}
                        fill
                        className="object-cover"
                        priority
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                <div className="absolute bottom-0 left-0 p-8 container mx-auto">
                    <Badge className="mb-2">{business.category}</Badge>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{business.name}</h1>
                    <div className="flex items-center text-white/90 gap-4 text-sm md:text-base">
                        <span className="flex items-center"><MapPin className="mr-1 h-4 w-4" /> {business.address}</span>
                        <span className="flex items-center"><Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" /> {business.rating.toFixed(1)} ({business.reviewCount} reviews)</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="md:col-span-2 space-y-8">
                    <section>
                        <h2 className="text-2xl font-semibold mb-4">About</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            {business.description}
                        </p>
                    </section>

                    <section>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-semibold">Reviews</h2>
                        </div>

                        <div className="mb-8">
                            <ReviewForm businessId={business.id} />
                        </div>

                        <div className="space-y-4">
                            {business.reviews.length === 0 && (
                                <p className="text-muted-foreground">No reviews yet. Be the first!</p>
                            )}
                            {business.reviews.map(review => (
                                <Card key={review.id} className="glass-card">
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                                                    <User className="h-4 w-4" />
                                                </div>
                                                <span className="font-semibold">{review.user.name}</span>
                                            </div>
                                            <span className="text-sm text-muted-foreground">
                                                {new Date(review.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <StarRating rating={review.rating} size={14} className="mb-2" />
                                        <p className="text-sm md:text-base">{review.text}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Contact Info</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-3">
                                <MapPin className="h-5 w-5 text-muted-foreground" />
                                <span>{business.address}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="h-5 w-5 text-muted-foreground" />
                                <span>(555) 123-4567</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Globe className="h-5 w-5 text-muted-foreground" />
                                <span className="text-indigo-400 cursor-pointer">website.com</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
