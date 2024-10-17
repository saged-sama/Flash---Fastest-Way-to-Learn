'use client';
import ActiveSession from "@/components/activeSession/activeSessions";
import { springbase } from "@/lib/springbase";
import { useEffect, useState } from "react";
import CreateNewSession from "@/components/session/createNewSession";
import { getActiveSessions } from "@/lib/session/sessions";

export default function Active() {

    const [activeSessions, setActiveSessions] = useState([]);

    useEffect(() => {
        try{
            const pageInit = async() => {
                const sess = await getActiveSessions();
                setActiveSessions(sess);
            }
    
            const wsocket = springbase.collection("sessions").subscribe();
            wsocket?.onCreate(async() => {
                const sess = await getActiveSessions();
                setActiveSessions(sess);
            });
    
            pageInit();
        }catch(err){
            console.log(err);
        }
    }, []);

    return (
        <div className="flex flex-col justify-center items-center gap-10 p-10">
            <div className="flex items-center justify-center gap-5">
                <h1 className="text-6xl text-center "> Active Sessions </h1>
                {/* Blinking green signal */}
                <div className="w-4 h-4 bg-green-500 rounded-full animate-blink "></div>
            </div>

            <CreateNewSession />

            <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-5">
                {
                    activeSessions.map((item: any) => (
                        <ActiveSession session={item} key={item.id}></ActiveSession>
                    ))
                }
            </div>

        </div>
    );
}
