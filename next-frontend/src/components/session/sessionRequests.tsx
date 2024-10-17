'use client';
import Request from "@/components/request/Request"
import { getJoinRequests } from "@/lib/session/sessions";
import { useEffect, useState } from "react";
import RequestToJoin from "@/components/session/RequestToJoin";
import { springbase } from "@/lib/springbase";

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

            getReqs();
        } catch (err) {
            console.log(err);
        }
    }, []);

    return (
        <div className="flex flex-col items-center w-full">
            <div className="flex justify-between items-end w-full p-3 border-b">
                <h1 className='text-xl font-extrabold text-center'>Total Request : {requests.length}</h1>
                {
                    session.owner.id !== "7acb7a19-1a63-41f0-b0a5-0bc60d34dd48" ?
                        // <button className="btn btn-warning"> Request a Session </button> : <div></div>
                        <RequestToJoin sessionId={session.id} /> : <div></div>
                }
            </div>
            {requests.length === 0 ?
                <div className="flex justify-center items-center w-full h-96">
                    <h1 className="text-2xl font-bold text-center">No Requests Yet</h1>
                </div> :

                <div className="flex flex-col w-full items-start text-left gap-5 p-3">
                    {
                        requests.map((req) => {
                            // return <div></div>
                            return <Request key={req.id} request={req} />
                        })
                    }
                </div>
            }
        </div>
    )
} 
