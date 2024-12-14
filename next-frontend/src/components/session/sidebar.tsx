'use client';
import { usePathname } from "next/navigation";
import SidebarLinks from "../common/sidebar/sidebarLinks";
import { Boxes, Settings2, SquareChartGantt } from "lucide-react";

export default function Sidebar(){
    const currentPath = usePathname();

    return (
        <div className="relative flex flex-col py-3 border-r outline-inset-4 h-full" >
            <SidebarLinks href="/subs/sessions" isActive={currentPath === "/subs/sessions"}>
                <h1 className="flex items-center gap-2"> <Boxes /> Sessions</h1>
            </SidebarLinks>
            <SidebarLinks href="/subs/sessions/sessionHistory" isActive={currentPath === "/subs/sessions/sessionHistory"}>
                <h1 className="flex items-center gap-2"> <SquareChartGantt /> Session History</h1>
            </SidebarLinks>
            <SidebarLinks href="/subs/sessions/settings" isActive={currentPath === "/subs/sessions/settings"}>
                <h1 className="flex items-center gap-2"> <Settings2 /> Session Settings</h1>
            </SidebarLinks>
        </div>
    )
}