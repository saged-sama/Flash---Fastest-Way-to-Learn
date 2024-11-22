'use client';
import { springbase } from "@/lib/springbase";
import Link from "next/link";
import { Card, theme } from "antd";
import { Circle } from "lucide-react";

export default function ActiveSessions({session}: {session: any}) {
    const { token } = theme.useToken();
    return (
        <Link href={`/subs/sessions/${session?.id}`}>
            <Card>
                <div className="flex flex-col h-full w-full">
                    <div className="flex gap-4">
                        <img
                            src={springbase.collection("users").file(session?.owner?.id, session?.owner?.avatar)}
                            className="rounded-full w-20 h-20" 
                        />
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-1">
                                <h1 className="font-bold text-xl">{session?.title}</h1>
                                <h1><Circle className="h-2 w-2 fill-black"/></h1>
                                <h1  style={{ color: token?.colorInfo }}>{session?.owner?.name}</h1>
                            </div>
                            <div className="flex flex-col text-sm gap-1">
                                <span className="font-bold">Description:</span>
                                <span>{session?.description}</span>
                            </div>
                        </div>    
                    </div>
                </div>
            </Card>
        </Link>
    )
}

{/* <div className="card flex-col md:flex-row lg:flex-row flex-1 card-side bg-base-100 shadow-xl p-5 h-96">
<figure className="md:w-1/2 md:h-full">
    <img
        src={springbase.collection("users").file(session.owner.id, session.owner.avatar)}
        className="rounded-md h-full w-full object-cover"
        alt="Movie" />
</figure>
<div className="card-body md:w-1/2 md:h-full">
    <h2 className="card-title">{session.title}</h2>
    <p> Instructor: <span className="text-info">{session.owner.name}</span></p>
    <p className="text-sm">Description: <span>{session.description}</span></p>
    <div className="card-actions justify-end">
        <Link href={`/sessions/${session.id}`} className="btn btn-success ">View Session</Link>
    </div>
</div>
</div> */}