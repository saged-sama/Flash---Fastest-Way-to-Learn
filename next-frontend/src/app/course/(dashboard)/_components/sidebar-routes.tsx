"use client";

import { BarChart, Compass, Layout, List } from "lucide-react";
import { SidebarItem } from "./sidebar-item";
import { usePathname } from "next/navigation";

const guestRoutes = [
    {
        icon: Layout,
        label: "Dashboard",
        href: "/course",
    },
    {
        icon: Compass,
        label: "Explore",
        href: "/course/search",
    },
]

const teacherRoutes = [
    {
        icon: List,
        label: "Courses",
        href: "/course/teacher/courses",
    },
    {
        icon: BarChart,
        label: "Analytics",
        href: "/course/teacher/analytics",
    },
]

export const SidebarRoutes = () => {
    const pathname = usePathname()
    const isTeacherPage = pathname?.startsWith("/course/teacher")
    const routes = isTeacherPage ? teacherRoutes : guestRoutes

    return (
        <div className="flex flex-col w-full">
            {routes.map((route) => (
                <SidebarItem 
                    key={route.href}
                    icon={route.icon}
                    label={route.label}
                    href={route.href}
                />
            ))}
        </div>
    )
}