'use client';
import { useEffect, useState } from "react";
import ActiveSessions from "./activeSessions";
import { getActiveSessions } from "@/lib/session/sessions";
import { useSpringBase } from "@/context/SpringBaseContext";

export default function SessionsGrid(){
    const [activeSessions, setActiveSessions] = useState<Array<any>>(new Array());
    const { springbase } = useSpringBase();

    useEffect(() => {
        if (!springbase) return;

        try {
            const pageInit = async () => {
                const sess = await getActiveSessions(springbase);
                if (sess) {
                    setActiveSessions(sess);
                }
            }

            const socketSub = springbase.collection("sessions").subscribe();

            pageInit();
        } catch (err) {
            console.log(err);
        }
    }, [springbase]);

    if(!activeSessions){
        return (
            <div>
                Yo Wait...
            </div>
        )
    }
    return (
        <div className="container mx-auto grid grid-cols-2 lg:grid-cols-4 gap-5 py-5">
            {
                activeSessions.map((item, index) => (
                    <ActiveSessions session={item} key={index} />
                ))
            }
        </div>
    )
}