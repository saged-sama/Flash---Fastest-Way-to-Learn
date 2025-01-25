'use client';
import { useSpringBase } from "@/context/SpringBaseContext";
import { Star, Users } from "lucide-react";
import { useEffect, useState } from "react";
import GoldenStar from "../iconstat/goldenStar";
import DarkStar from "../iconstat/darkStar";
import { Button } from "antd";
import { objectToFormData } from "@/lib/utils";

export default function SessionReaction({ session, allowReaction }: { session: any, allowReaction: boolean }) {
    const { springbase } = useSpringBase();
    const [ sessionReactions, setSessionReactions ] = useState<any>(null);
    
    const getSessionReactions = async() => {
        if(!springbase){
            return;
        }
        const sr = await springbase.collection("sessionreactions").getList(1, 50, {
            filter: `session.id="${session.id}"`,
            skipTotal: false
        });
        setSessionReactions(sr);
    }

    useEffect(() => {
        if(!springbase){
            return;
        }

        getSessionReactions();

        springbase.collection("sessionreactions").subscribe({
            action: "create"
        }, getSessionReactions);

        springbase.collection("sessionreactions").subscribe({
            action: "delete"
        }, getSessionReactions);

        return () => {
            springbase.collection("sessionreactions").unsubscribe({
                action: "create"
            });

            springbase.collection("sessionreactions").unsubscribe({
                action: "delete"
            });
        }
    }, [springbase]);

    if(!sessionReactions){
        return <div>Loading...</div>
    }

    const sendStar = async (reaction: string) => {
        if (!springbase) {
            return;
        }
        await springbase.collection("sessionreactions").create(objectToFormData({
            sessionId: session.id,
            userId: springbase.authStore.model.id,
            reaction: reaction,
        }));
    };
    

    return (
        <div className="flex flex-col items-end gap-4">
            <div className={"flex gap-3 " + (allowReaction ? "flex-col" : "flex-row")}>
                <div className="flex gap-2">    
                    <GoldenStar sessionReactions={sessionReactions} />
                    {allowReaction && <Button type="primary" onClick={() => sendStar("GOLDSTAR")}>Gold Star</Button>}
                </div>
                <div className="flex gap-2">
                    <DarkStar sessionReactions={sessionReactions} />
                    {allowReaction && <Button type="default" onClick={() => sendStar("DARKSTAR")}>Dark Star</Button>}
                </div>
            </div>
            {/* <div className="text-xs flex gap-2">
                <Users className="w-4 h-4"/>
                <h1>12</h1>
            </div> */}
        </div>
    )
}