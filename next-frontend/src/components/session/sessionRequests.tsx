'use client';
import Request from "@/components/session/Request"
import { getJoinRequests } from "@/lib/session/sessions";
import { useEffect, useState } from "react";
import RequestToJoin from "@/components/session/RequestToJoin";
import { springbase } from "@/lib/springbase";
import { getCurrentUser } from "@/lib/utils";
import { Button } from "antd";

export default function SessionRequests({ session }: { session: any }) {
    const [requests, setRequests] = useState<any[]>([]);

    useEffect(() => {
        try {
            const getReqs = async () => {
                const reqs = await getJoinRequests(session.id);
                setRequests(reqs);
            }

            const wsocket = springbase.collection("sessionrequests").subscribe();
            wsocket?.onCreate(async() => {
                await getReqs();
            });

            wsocket?.onUpdate(async() => {
                console.log("Update");
                await getReqs();
            });

            getReqs();
        } catch (err) {
            console.log(err);
        }
    }, []);

    return (
        <div className="flex flex-col items-center w-full">
            <div className="flex justify-between items-end w-full p-3 border-b">
                <h1 className='text-sm font-extrabold text-center'>Total Requests : {requests.length}</h1>
                {
                    session.owner.id !== getCurrentUser() || true ?
                        <RequestToJoin sessionId={session.id} /> : <div></div>
                }
            </div>
            <div className="flex justify-end w-full gap-1 py-1">
                <Button type="primary">All</Button>
                <Button>Finished</Button>
                <Button>Rejected</Button>
            </div>
            {requests.length === 0 ?
                <div className="flex justify-center items-center w-full h-96">
                    <h1 className="font-bold text-center">[No Requests Yet]</h1>
                </div> :

                <div className="flex flex-col w-full items-start text-left gap-5 p-3">
                    {
                        requests.map((req, index) => {
                            // return <div></div>
                            return <Request key={index} request={req} />
                        })
                    }
                </div>
            }
        </div>
    )
} 
