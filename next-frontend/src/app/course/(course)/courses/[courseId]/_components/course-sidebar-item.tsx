"use client"

import { cn } from "@/lib/utils";
import { CheckCircle, Lock, PlayCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface CourseSidebarItemProps {
    label: string;
    id: string;
    isCompleted: boolean;
    courseId: string;
    isLocked: boolean;
}

export const CourseSidebarItem = ({
    label,
    id,
    isCompleted,
    courseId,
    isLocked
}: CourseSidebarItemProps) => {
    const pathname = usePathname();
    const router = useRouter();

    const [isActive, setIsActive] = useState(false);
    const [Icon, setIcon] = useState<React.ElementType>(PlayCircle); // Default icon

    useEffect(() => {
        // Update the active state based on pathname
        setIsActive(pathname?.includes(id) || false);

        console.log("Chapter label: ",label)
        console.log("isLocked: ", isLocked)

        // Update the icon based on the isLocked and isCompleted states
        if (isLocked) {
            setIcon(Lock);
        } else if (isCompleted) {
            setIcon(CheckCircle);
        } else {
            setIcon(PlayCircle);
        }
    }, [pathname, id, isCompleted, isLocked]); // Dependencies on pathname, id, isCompleted, and isLocked

    const onClick = () => {
        router.push(`/course/courses/${courseId}/chapters/${id}`);
    }

    return (
        <button
            onClick={onClick}
            type="button"
            className={cn(
                "flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",
                isActive && "text-slate-700 bg-slate-200/20 hover:bg-slate-200/20 hover:text-slate-700",
                isCompleted && "text-emerald-700 hover:text-emerald-700",
                isCompleted && isActive && "bg-emerald-200/20",
            )}
        >
            <div className="flex items-center gap-x-2 py-4">
                <Icon
                    size={22}
                    className={cn(
                        "text-slate-500",
                        isActive && "text-slate-700",
                        isCompleted && "text-emerald-700"
                    )}
                />
                {label}
            </div>
            <div className={cn(
                "ml-auto opacity-0 border-2 border-slate-700 h-full transition-all",
                isActive && "opacity-100",
                isCompleted && "border-emerald-700"
            )} />
        </button>
    )
}
