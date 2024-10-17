'use client';

import { getSessionInfo } from "@/lib/session/sessions";
import { useEffect, useState } from "react";
import SessionInfo from "@/components/session/sessionInfo";
import SessionRequests from "@/components/session/sessionRequests";
import { springbase } from "@/lib/springbase";

export default function Sessions({params}: {params: any}){
    const [session, setSession] = useState<any>(null);

    useEffect(() => {
        const getCurrentSessionInfoF = async () => {
            const sess = await getSessionInfo(params.id);
            setSession(sess);
        }

        getCurrentSessionInfoF();
    }, [])

    if(!session){
        return (
            <div>
                Loading...
            </div>
        )
    }
    return (
        <div className="flex flex-col items-center gap-10 p-5">
            <div className="w-3/5 p-3 border-b">
                <SessionInfo session={session}/>
            </div>

            <div className="flex items-center justify-center w-3/5 p-3">
                Some Stats and Other Stuff. Will add later.
            </div>

            <div className="w-3/5 p-3">
                <SessionRequests session={session}/>
            </div>
        </div>
    );
}