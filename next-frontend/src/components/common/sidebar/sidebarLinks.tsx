'use client';

import { theme } from 'antd';
import Link from 'next/link';
import React, { useState } from 'react';

interface SidebarLinksProps {
    href: string;
    isActive: boolean;
    className?: string;
    children: React.ReactNode;
}

const SidebarLinks: React.FC<SidebarLinksProps> = ({ href, isActive, className, children }) => {
    const { token } = theme.useToken();

    const [hover, setHover] = useState(false);

    const style = "px-3 py-3 rounded-md" + className;

    if(isActive){
        return (
            <Link href={href} className={style} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{ 
                backgroundColor: hover ? token.colorPrimaryBg : token.colorPrimaryBgHover,
            }}>
                {children}
            </Link>
        );
    }
    else{
        return(
            <Link href={href} className={style} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{ 
                backgroundColor: hover ? token.colorPrimaryBg : "",
            }}>
                {children}
            </Link>
        )
    }
}

export default SidebarLinks;