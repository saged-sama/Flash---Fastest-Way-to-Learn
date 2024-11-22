'use client';
import { springbase } from "@/lib/springbase";
import Link from "next/link";
import { Card, theme } from "antd";
import { Circle, ListEnd, ListStart, Star, Users } from "lucide-react";
import StarIcon from "../common/elements/buttons/stars/starIcon";
import { getRandomInteger } from "@/lib/utils";

export default function ActiveSessions({session}: {session: any}) {
    const { token } = theme.useToken();
    return (
        <Link href={`/subs/sessions/${session?.id}`}>
            <Card>
                <div className="flex flex-col gap-4 h-full w-full">
                    <div className="flex gap-4 border-b pb-3">
                        <img
                            src={springbase.collection("users").file(session?.owner?.id, session?.owner?.avatar)}
                            className="rounded-full w-20 h-20" 
                        />
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-1">
                                <h1 className="font-bold text-xl">{session?.title}</h1>
                                <h1><Circle className="h-2 w-2 fill-black"/></h1>
                                <h1  style={{ color: token?.colorInfo }}>{session?.owner?.name}</h1>
                            </div>
                            <div className="flex flex-col text-xs gap-1">
                                <span className="font-bold">Description:</span>
                                <span>{session?.description}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <StarIcon color="#ffd700" /><span>{getRandomInteger(1, 20)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <StarIcon color="#000000" /><span>{getRandomInteger(1, 5)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Users className="h-4 w-4"/><span>{getRandomInteger(1, 15)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <ListEnd className="h-4 w-4" /><span>{getRandomInteger(1, 5)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <ListStart className="h-4 w-4"/><span>{getRandomInteger(1, 10)}</span>
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