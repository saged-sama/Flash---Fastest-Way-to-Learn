'use client';

import { useSpringBase } from "@/context/SpringBaseContext";
import { useEffect, useState } from "react";
import Link from "next/link";
import UserDet from "../common/userdet";
import SessionReaction from "./sessioniReaction";

export default function SessionInfo({ session }: { session: any }) {
    const [ settings, setSettings ] = useState<any>();
    const { springbase } = useSpringBase();

    useEffect(() => {
        if(!springbase){
            return;
        }

        const getSettings = async () => {
            console.log("Session: ", session.owner.id);
            const settings = await springbase.collection("sessionsettings").getOne(session.owner.id);

            if(settings){
                console.log(settings);
                setSettings(settings);
            }
        }
        getSettings();
    }, [springbase]);

    return (
        <div className="flex flex-col gap-5 border p-3 transition-all duration-1000 ease-in-out">
            <div className="flex justify-between">
                <Link href={`/subs/sessions/${session.id}`}>
                    <figure className="h-20 w-20">
                        <img src={`${springbase?.collection("sessionsettings").file(settings?.id, settings?.sessionBanner)}`} alt={`${session.title}`} className="w-20 h-20 rounded-xl object-cover" />
                    </figure>
                </Link>

                <SessionReaction session={session} allowReaction={false} />
            </div>
            <div className="flex flex-col gap-4 w-full">
                <Link href={`/subs/sessions/${session.id}`} className="flex flex-col gap-1">
                    <h1 className="text-lg font-bold">{session.title}</h1>
                    <p className="text-xs text-wrap">{session.description}</p>
                </Link>
                <UserDet user={session.owner}/>
            </div>
        </div>
    )
}