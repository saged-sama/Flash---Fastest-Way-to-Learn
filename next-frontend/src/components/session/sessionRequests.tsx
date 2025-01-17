'use client';
import Request from "@/components/session/Request"
import { getJoinRequests } from "@/lib/session/sessions";
import { useEffect, useState } from "react";
import RequestToJoin from "@/components/session/RequestToJoin";
import { getCurrentUser } from "@/lib/utils";
import { Button } from "antd";
import { useSpringBase } from "@/context/SpringBaseContext";
import SpringBase from "@/lib/springbase/springbase";

export default function SessionRequests({ session }: { session: any }) {
    const [requests, setRequests] = useState<any[]>([]);
    const { springbase } = useSpringBase();
    const [status, setStatus] = useState<string>("");

    const getReqs = async () => {
        if(!springbase) return;
        const reqs = await getJoinRequests(springbase, session, status);
        setRequests(reqs.items);
    }

    useEffect(() => {
        if(!springbase){
            return;
        }
        try {

            springbase.collection("sessionrequests").subscribe({
                action: "create"
            }, getReqs);

            springbase.collection("sessionrequests").subscribe({
                action: "update"
            }, getReqs);

            getReqs();
        } catch (err) {
            console.log(err);
        }

        return () => {
            springbase.collection("sessionrequests").unsubscribe({
                action: "create"
            });

            springbase.collection("sessionrequests").unsubscribe({
                action: "update"
            });
        }
    }, [springbase]);

    useEffect(() => {
        getReqs();
    }, [status]);

    return (
        <div className="flex flex-col items-center w-full">
            <div className="flex justify-between items-end w-full p-3 border-b">
                <h1 className='text-sm font-extrabold text-center'>Total Requests : {requests?.length}</h1>
                {
                    session?.owner.id !== getCurrentUser(springbase as SpringBase) ?
                        <RequestToJoin sessionId={session?.id} /> : <div></div>
                }
            </div>
            <div className="flex justify-end w-full gap-1 py-1">
                <Button type={status === "" ? "primary" : "default"} onClick={()=>setStatus("")}>All</Button>
                <Button type={status === "PENDING" ? "primary" : "default"} onClick={()=>setStatus("PENDING")}>Pending</Button>
                <Button type={status === "FINISHED" ? "primary" : "default"} onClick={()=>setStatus("FINISHED")}>Finished</Button>
                {/* <Button type={status === "ACCEPTED" ? "primary" : "default"} onClick={()=>setStatus("ACCEPTED")}>Running</Button> */}
            </div>
            {(requests && requests?.length === 0) ?
                <div className="flex justify-center items-center w-full h-96">
                    <h1 className="font-bold text-center">[No Requests Yet]</h1>
                </div> :

                <div className="flex flex-col w-full items-start text-left gap-2 p-3 max-h-96 overflow-y-auto">
                    {
                        requests?.map((req, index) => {
                            // return <div></div>
                            return <Request key={index} request={req} />
                        })
                    }
                </div>
            }
        </div>
    )
} 
