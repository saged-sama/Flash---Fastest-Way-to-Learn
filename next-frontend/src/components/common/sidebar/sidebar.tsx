'use client';

import { Menu, MenuProps } from "antd";
import { usePathname } from "next/navigation";

export default function Sidebar({ items, onClick }: { items: MenuItem[], onClick: MenuProps["onClick"] }) {
    const currentPath = usePathname();

    const handleClick = (e: any) => {
        if (!onClick) return;
        return onClick(e);
    }

    return (
        <Menu onClick={handleClick} selectedKeys={[currentPath]} mode="vertical" items={items} className="h-full"/>
    )

}