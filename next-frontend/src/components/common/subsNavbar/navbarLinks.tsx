import Link from "next/link";

export default function NavbarLinks({ children, href, className }: Readonly<{children: React.ReactNode; href: string; className: string;}>){
    return (
        <Link href={href} className={className}>
            {children}
        </Link>
    )
}