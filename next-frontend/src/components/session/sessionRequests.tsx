'use client';
import Request from "@/components/request/Request";
import { getJoinRequests } from "@/lib/session/sessions";
import { useEffect, useState } from "react";
import RequestToJoin from "@/components/session/RequestToJoin";
import { springbase } from "@/lib/springbase";
import { getCurrentUser } from "@/lib/utils";

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
        <div className="flex flex-col items-center w-full max-w-5xl mx-auto p-4 bg-white shadow-lg rounded-lg">
            <div className="flex flex-col md:flex-row justify-between items-center w-full p-4 border-b border-gray-300">
                <h1 className='text-2xl md:text-3xl font-extrabold text-center text-teal-600'>
                    Total Requests: {requests.length}
                </h1>
                {session.owner.id !== getCurrentUser() && (
                    <div className="mt-3 md:mt-0">
                        <RequestToJoin sessionId={session.id} />
                    </div>
                )}
            </div>
            {requests.length === 0 ? (
                <div className="flex justify-center items-center w-full h-96">
                    <h1 className="text-2xl font-semibold text-center text-teal-600">No Requests Yet</h1>
                </div>
            ) : (
                <div className="flex flex-col w-full items-start gap-5 p-4">
                    {requests.map((req, index) => (
                        <Request key={index} request={req} />
                    ))}
                </div>
            )}
        </div>
    );
}