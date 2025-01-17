'use client';
import { springbase } from "@/lib/springbase";
import { Image } from "antd";
import UserDet from "../common/userdet";

export default function SessionTitle({settings, session}: {settings: any, session: any}){

    return (
        <div className="flex gap-4">
            <Image src={springbase.collection("sessionsettings").file(settings.id, settings.sessionBanner)} className="rounded-md object-cover" width={100}/>
            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <h1 className="font-bold text-xl">{session.title}</h1>
                    <UserDet user={session.owner}/>
                </div>
                <div className="text-sm">
                    {session.description}
                </div>
            </div>
        </div>
    )
}