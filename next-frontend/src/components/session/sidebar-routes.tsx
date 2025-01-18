"use client";

import { BarChart, Compass, Layout, List, Settings } from "lucide-react";
import { SidebarItem } from "./sidebar-item";
import { usePathname } from "next/navigation";

const routes = [
    {
        icon: Layout,
        label: "Sessions",
        href: "/subs/sessions",
    },
    {
        icon: Compass,
        label: "Session History",
        href: "/subs/sessions/history",
    },
    {
        icon: Settings,
        label: "Session Settings",
        href: "/subs/sessions/settings",
    }
]

export const SidebarRoutes = () => {
    const pathname = usePathname()
    const isTeacherPage = pathname?.startsWith("/course/teacher");

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