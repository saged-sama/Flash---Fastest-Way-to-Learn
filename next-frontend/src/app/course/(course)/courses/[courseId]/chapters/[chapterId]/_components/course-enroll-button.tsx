"use client"

import { Button } from "@/components/ui/button"
import { checkout } from "@/lib/course/checkout"
import { formatPrice, getCurrentUser } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"

interface CourseEnrollButtonProps {
    price: number,
    courseId: string
}

export const CourseEnrollButton = ({
    price,
    courseId
}: CourseEnrollButtonProps) => {
    // const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    
    const handleClick = async () => {
        try {
            setIsLoading(true);

            const response = await checkout(getCurrentUser(), courseId);

            window.location.assign(response.sessionUrl);
        } catch {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
        // router.push(`http://localhost:3000/course/courses/${courseId}/payment?success=1`)
    }

    return (
        <Button
            onClick={handleClick}
            disabled={isLoading}
            size="sm"
            className="w-full md:w-auto">
            Enroll for {formatPrice(price)}
        </Button>
    )
}