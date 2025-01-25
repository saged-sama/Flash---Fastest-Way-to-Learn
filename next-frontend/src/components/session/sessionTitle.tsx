'use client';
import { Button, Image } from "antd";
import UserDet from "../common/userdet";
import { useSpringBase } from "@/context/SpringBaseContext";
import { useEffect } from "react";
import Link from "next/link";
import { objectToFormData } from "@/lib/utils";

export default function SessionTitle({settings, session}: {settings: any, session: any}){
    const { springbase } = useSpringBase();
    
    useEffect(() => {
        if(!springbase){
            return;
        }

        console.log("Session Title", session);
        console.log(springbase?.authStore.model.id);

    }, [springbase]);

    const endSession = async() => {
        if(!springbase){
            return;
        }

        const sess = await springbase.collection("sessions").update(session.id, objectToFormData({
            ...session,
            state: "ENDED"
        }));

        if(sess){
            console.log("Session ended successfully");
            const redirect = document.getElementById("redirect");
            redirect?.click();
        }
    }

    if(!session || !settings || !springbase){
        return <div>Loading...</div>
    }

    return (
        <div className="flex justify-between gap-4">
            <div className="flex gap-4">
                <Image src={springbase?.collection("sessionsettings").file(settings.id, settings.sessionBanner)} className="rounded-md object-cover" width={100}/>
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
            {
                (springbase?.authStore.model.id === session?.owner?.id) && (
                    <Button type="primary" onClick={endSession}>
                        End Session
                    </Button>
                )
            }
            <Link href={"/subs/sessions"} id="redirect" className="hidden"></Link>
        </div>
    )
}