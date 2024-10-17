'use client';
import { springbase } from "@/lib/springbase";
import { getTimePassedSince } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function Request({request}: {request: any}) {
    const [timePassed, setTimePassed] = useState<string>(getTimePassedSince(request.createdAt));
    useEffect(() => {
        setInterval(() => {
            setTimePassed(getTimePassedSince(request.createdAt));
        }, 30000)
    }, [])
    return (
        <div className="hero-content flex-col items-start lg:flex-row gap-10 rounded-md border w-full">
            <img
                src={springbase.collection("users").file(request.user.id, request.user.avatar)}
                className=" rounded-full md:h-40 w-40 object-cover" />
            <div className="w-full">
                <h1 className="text-xl font-bold text-center md:text-center lg:text-start ">Requested By: <span className="text-accent">{request.user.name}</span></h1>
                <p className="py-6 w-1/2">
                    {request.description}
                </p>
                <div className="flex items-center gap-5 text-xs">
                    <p className="text-xs"> Created: {timePassed}</p>
                    <p className="text-xs flex gap-1 items-center"> Current Status: {request.status}
                    {/* <div className="w-2 h-2 ml-4 bg-green-500 rounded-full animate-blink mt-1 "></div> */}
                    {/* {request.status === "Ongoing" && (  
                        <div className="w-2 h-2 ml-4 bg-green-500 rounded-full animate-blink mt-1"></div>
                    )}

                    {request.status === "PENDING" && (
                        <div className="ml-2">
                            <MdOutlinePendingActions className="text-blue-400" />
                        </div>
                    )}

                    {request.status === "ACCEPTED" && (
                        <div className="ml-2">
                            <IoMdDoneAll className="text-green-600" />
                        </div>

                    )} */}
                    </p>
                </div>
                <div className=" w-full">
                    {/* Push buttons to the right with ml-auto */}
                    <div className="ml-auto flex flex-col md:flex-row lg:flex-row ">
                        <button className="btn btn-accent mr-5 w-full md:w-[200px] lg:w-[200px] ">Accept</button>
                        <button className="btn btn-error w-full md:w-[200px] lg:w-[200px] ">Decline</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
