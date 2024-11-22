'use client';
import ActiveSession from "@/components/session/activeSessions";
import { springbase } from "@/lib/springbase";
import { useEffect, useState } from "react";
import CreateNewSession from "@/components/session/createNewSession";
import { getActiveSessions } from "@/lib/session/sessions";
import { green } from "@ant-design/colors";

export default function Active() {

    const [activeSessions, setActiveSessions] = useState<Array<any>>(new Array());

    useEffect(() => {
        try{
            const pageInit = async() => {
                const sess = await getActiveSessions();
                if(sess){
                    setActiveSessions(sess);
                }
            }
    
            const wsocket = springbase.collection("sessions").subscribe();
            wsocket?.onCreate(async() => {
                const sess = await getActiveSessions();
                if(sess){
                    setActiveSessions(sess);
                }
            });
    
            pageInit();
        }catch(err){
            console.log(err);
        }
    }, []);

    if(!activeSessions){
        return (
            <div>
                Yo Wait...
            </div>
        )
    }

    return (
        <div className="flex flex-col justify-center items-center px-5 w-full">
            <div className="flex items-center justify-between w-full p-2 border-b">
                <h1>Active Sessions</h1>
                <CreateNewSession />
            </div>

            <div className="container mx-auto grid grid-cols-2 lg:grid-cols-4 gap-5 py-5">
                {
                    activeSessions.map((item, index) => (
                        <ActiveSession session={item} key={index}></ActiveSession>
                    ))
                }
            </div>

        </div>
    );
}
