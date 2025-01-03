'use client';
import SessionsLayout from "@/components/session/sessionLayout";
import { usePathname } from "next/navigation";

export default function Session(){
    const pathname = usePathname();

    const breadcrumbs = [
        {
            title: "Subscripted",
        },
        {
            title: "Sessions"
        },
        {
            title: pathname.split("/").pop() as string
        }
    ]

    return (
        <SessionsLayout breadcrumbs={breadcrumbs}>
            {/* <SessionSettings /> */}
            <div>

            </div>
        </SessionsLayout>
    )
}