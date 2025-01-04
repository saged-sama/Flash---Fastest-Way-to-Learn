'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({ href, children }: Readonly<{ href: string; children: React.ReactNode; }>) {
    const pathname = usePathname();

    return (
        <li>
            <Link href={href} className={"font-medium hover:text-orange-500 transition duration-300" + (pathname === href ? " text-orange-500" : "")}>
                {children}
            </Link>
        </li>
    );
}