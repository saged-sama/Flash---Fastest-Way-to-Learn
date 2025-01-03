'use client';

import { springbase } from "@/lib/springbase";
import { theme } from "antd";
import StarIcon from "../common/elements/buttons/stars/starIcon";
import { ListEnd, ListStart, Settings, Star, Users } from "lucide-react";
import { getRandomInteger } from "@/lib/utils";
import { useSpringBase } from "@/context/SpringBaseContext";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function SessionInfo({ session }: { session: any }) {
    const { token } = theme.useToken();
    const [settings, setSettings] = useState<any>();
    const { springbase } = useSpringBase();

    useEffect(() => {
        if(!springbase){
            return;
        }

        const getSettings = async () => {
            const settings = await springbase.collection("sessionsettings").getFullList();

            if(settings){
                console.log(settings);
                setSettings(settings[0]);
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

                <div className="flex flex-col items-end gap-4">
                    <div className="flex gap-3">
                        <div className="text-xs flex gap-2">
                            <span style={{ color: "#ffd700" }}><Star className="w-4 h-4" /></span>
                            <h1>12</h1>
                        </div>
                        <div className="text-xs flex gap-2" style={{ color: "#000000" }}>
                            <span style={{ color: "#000000" }}><Star className="w-4 h-4" style={{ textShadow: "2px" }}/></span>
                            <h1>12</h1>
                        </div>
                    </div>
                    <div className="text-xs flex gap-2">
                        <Users className="w-4 h-4"/>
                        <h1>12</h1>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-4 w-full">
                <Link href={`/subs/sessions/${session.id}`} className="flex flex-col gap-1">
                    <h1 className="text-lg font-bold">{session.title}</h1>
                    <p className="text-xs text-wrap">{session.description}</p>
                </Link>
                <Link href={`/user/${session.owner.id}`} className="flex gap-1 text-sm text-info hover:border hover:p-2 rounded-md" style={{ color:  token.colorInfoActive}}>
                    <img src={springbase?.collection("users").file(session.owner.id, session.owner.avatar)} alt={session.owner.name} className="rounded-full w-5 h-5 object:covers"/>
                    <span>{session.owner.name}</span>
                </Link>
            </div>
        </div>
    )
}