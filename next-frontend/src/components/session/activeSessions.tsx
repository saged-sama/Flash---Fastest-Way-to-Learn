'use client';
import { springbase } from "@/lib/springbase";
import Link from "next/link";
import { Card, Col, Divider, Row, theme } from "antd";
import { Circle, ListEnd, ListStart, Star, Users } from "lucide-react";
import StarIcon from "../common/elements/buttons/stars/starIcon";
import { getRandomInteger } from "@/lib/utils";
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
            const sess = await getActiveSessions(springbase);
            setSessions(sess);
        }

        getSessions();
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
                    <h1>No sessions available</h1>
                </div>
            }
        </div>
    );
}