'use client';
import { springbase } from "@/lib/springbase";
import { getCurrentUser, getTimePassedSince } from "@/lib/utils";
import { createRoom, getRoom, getRoomCode } from "@/lib/session/sessions";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Request({request}: {request: any}) {
    const router = useRouter();
    const [timePassed, setTimePassed] = useState<string>(getTimePassedSince(request.createdAt));
    useEffect(() => {
        setInterval(() => {
            setTimePassed(getTimePassedSince(request.createdAt));
        }, 30000);

        if(getCurrentUser() !== request.session.owner.id){
            const ws = springbase.collection("sessionrequests").subscribe();
            ws?.onUpdate(async () => {
                const req = await springbase.collection("sessionrequests").getOne(request.id, {}, false);
                if(req.status === "ACCEPTED"){
                    const modal = document.getElementById("waitingModal") as HTMLDialogElement;
                    modal?.showModal();
                    console.log("Orreh Eine aisi to modal koi?")
                    const room = await getRoom(request.id);
                    if(room){
                        const code = await getRoomCode(room.id);
                        if(code) {
                            router.push(`/sessions/${request.session.id}/room/${code}`);
                        }
                    }
                }
            });
        }
    }, []);

    const accept = async () => {
        const formData = new FormData();
        formData.append("status", "ACCEPTED")
        const sessreq = await springbase.collection("sessionrequests").update(request.id, formData);
        if(sessreq.status === "ACCEPTED"){
            const modal = document.getElementById("waitingModal") as HTMLDialogElement;
            modal?.showModal();
            console.log("Aissala eine modal aya porse");
            const room = await getRoom(request.id);
            if(room){
                const code = await getRoomCode(room.id);
                if(code) {
                    router.push(`/sessions/${request.session.id}/room/${code}`);
                }
            }
        }
    }

    const reject = async () => {
        await springbase.collection("sessionrequests").update(request.id, {
            status: "REJECTED"
        });
    }
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
                {
                    (getCurrentUser() === request.session.owner.id && request.status === "PENDING") ?
                    <div className=" w-full">
                        <div className="ml-auto flex flex-col md:flex-row lg:flex-row ">
                            <button className="btn btn-accent mr-5 w-full md:w-[200px] lg:w-[200px]"
                                onClick={accept}
                            >Accept</button>
                            <button className="btn btn-error w-full md:w-[200px] lg:w-[200px] " onClick={reject}>Reject</button>
                        </div>
                    </div> : <div></div>
                }
            </div>

            <dialog id="waitingModal" className="modal">
                <div className="modal-box">
                    <div className="flex flex-col justify-center gap-2 items-center">
                        <span>Your Session is Starting. Please Wait While We Get the Session Ready</span>
                        <span className="loading loading-bars loading-sm"></span>
                    </div>
                </div>
            </dialog>
        </div>
    )
}
