"use client"

import * as React from "react"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { submitReview } from "@/app/actions"

export function ReviewForm({ businessId }: { businessId: string }) {
    const [rating, setRating] = React.useState(0)
    const [hover, setHover] = React.useState(0)
    const [comment, setComment] = React.useState("")
    const [isSubmitting, setIsSubmitting] = React.useState(false)

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (rating === 0) return alert("Please select a rating")

        setIsSubmitting(true)

        const formData = new FormData()
        formData.append("businessId", businessId)
        formData.append("rating", rating.toString())
        formData.append("text", comment)

        try {
            await submitReview(formData)
            alert("Review submitted for approval!")
            setRating(0)
            setComment("")
        } catch (error) {
            console.error(error)
            alert("Failed to submit review")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-6 border rounded-lg glass-card backdrop-blur-sm">
            <h3 className="text-lg font-semibold">Write a Review</h3>

            <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium">Rating</label>
                <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            className="focus:outline-none transition-transform hover:scale-110"
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHover(star)}
                            onMouseLeave={() => setHover(0)}
                        >
                            <Star
                                className={cn(
                                    "h-8 w-8 transition-colors",
                                    star <= (hover || rating)
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "fill-transparent text-muted-foreground"
                                )}
                            />
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">Your Experience</label>
                <textarea
                    className="flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Tell us about your visit..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                />
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Submitting..." : "Submit Review"}
            </Button>
        </form>
    )
}
