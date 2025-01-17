'use client';
import { Divider, theme } from "antd";
import { useEffect, useState } from "react";
import { useSpringBase } from "@/context/SpringBaseContext";
import { getActiveSessions } from "@/lib/session/sessions";
import SessionInfo from "./sessionInfo";

export default function ActiveSessions({ title }: { title: string }) {
    const { token } = theme.useToken();
    const [sessions, setSessions] = useState<any>([]);
    const { springbase } = useSpringBase();

    useEffect(() => {
        if(!springbase){
            return;
        }

        const getSessions = async () => {
            const sess = await getActiveSessions(springbase, title === "Scheduled" ? {
                filter: `state="SCHEDULED"`
            } : {
                filter: `state="STARTED"`
            });
            setSessions(sess);
        }

        springbase.collection("sessions").subscribe({
            action: "create"
        }, getSessions);
        
        getSessions();

        return () => {
            console.log("Here we are now: ", springbase);
            springbase.collection("sessions").unsubscribe({
                action: "create"
            });
        }
    }, [springbase]);

    const style = {
        background: token["red-10"],
        padding: "8px 0"
    }
    
    return (
        <div>
            <Divider orientation="left" style={{marginTop: 0}}>{title}({sessions?.length || 0})</Divider>
            {
                sessions && sessions?.length ? 
                <div className="grid grid-cols-3 gap-2">
                    {sessions?.map((session: any) => (
                        <SessionInfo session={session} key={session.id} />
                    ))}
                </div>
                :
                <div>
                    <h1>No '<b><i>{title}</i></b>' sessions</h1>
                </div>
            }
        </div>
    );
}