'use client';

import { useSpringBase } from "@/context/SpringBaseContext";
import { getTimePassedSince } from "@/lib/utils";
import { useEffect, useState } from "react";
import Request from "./Request";
import Link from "next/link";
import { getRoom, getRoomCode } from "@/lib/session/sessions";

export default function CurrentSessionDetails({ session }: { session: any}){
    const [currentSession, setCurrentSession] = useState<any>(null);
    const { springbase } = useSpringBase();
    const [ timePassed, setTimePassed ] = useState<string>((""));
    const [roomCode, setRoomCode] = useState<string>("");
    const [intv, setIntv] = useState<any>(null);

    useEffect(() => {
        if(!springbase) return;

        const getCurrentSession = async () => {
            const sess = await springbase.collection("sessionrequests").getList(1, 1, {
                filter: `session.id=${session.id} && status="ACCEPTED"`
            });

            if(sess.items[0].user.id === springbase.authStore.model.id){
                const room = await getRoom(springbase, sess.items[0].id);
                if(room){
                    const rCode = await getRoomCode(springbase, room.id);
                    if(rCode){
                        setRoomCode(rCode);
                    }
                }
            }
            setCurrentSession(sess.items[0]);
            if(sess.items[0]){
                const terval = setInterval(() => {
                    setTimePassed(getTimePassedSince(sess.items[0].createdAt));
                }, 1000);
                setIntv(terval);
            }
        }

        getCurrentSession();

        return () => {
            clearInterval(intv);
        }

    }, [springbase]);

    if(!currentSession) return (
        <div className="flex items-center justify-center h-full">
            <h1>There is no session running currently</h1>
        </div>
    );

    return (
        <div className="flex items-center justify-center w-2/3 flex-col gap-2">
            <div className="flex justify-between w-full">
                <h1 className="font-bold">Current Room:</h1>
                <h1><span className="font-bold">Started:</span> {timePassed}</h1>
            </div>
            <Link className="w-full" href={springbase?.authStore.model.id === currentSession.user.id ? `/subs/sessions/${session.id}/room/${roomCode}` : `/subs/sessions/${session.id}`}>    
                <Request request={currentSession}/>
            </Link>
        </div>
    );
}