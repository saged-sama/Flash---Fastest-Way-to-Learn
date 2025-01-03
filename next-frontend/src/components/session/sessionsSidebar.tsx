'use client';

import { ClusterOutlined, HistoryOutlined, SettingOutlined } from "@ant-design/icons";
import Sidebar from "../common/sidebar/sidebar";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SessionsSidebar() {
    const [path, setPath] = useState<string>("/subs/sessions");
    const router = useRouter();

    const items = [
        {
            key: "/subs/sessions",
            label: "Sessions",
            icon: <ClusterOutlined />
        },
        {
            key: "/subs/sessions/history",
            label: "Session History",
            icon: <HistoryOutlined />
        },
        {
            key: "/subs/sessions/settings",
            label: "Settings",
            icon: <SettingOutlined />
        }
    ]

    const onClick = (e: any) => {
        setPath(e.key);
        router.push(e.key);
    }

    return (
        <Sidebar items={items} onClick={onClick} />
    )
}