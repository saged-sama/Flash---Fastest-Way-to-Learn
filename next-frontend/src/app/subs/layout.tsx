import Navbar from "@/components/common/header/Navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Flash | Live Sessions",
    description: "Get Live Sessions from Experts"
}

export default function SubsLayout({
    children
}: Readonly<{children: React.ReactNode;}>){
    return (
        <html>
            <body>
                {children}
            </body>
        </html>
    )
}