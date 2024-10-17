'use client';

import { makeJoinRequest } from "@/lib/session/sessions";
import { useEffect, useState } from "react";

export default function RequesToJoin({ sessionId }: { sessionId: string }) {
    const [modal, setModal] = useState(null as HTMLDialogElement | null);

    useEffect(() => {
        setModal(document.getElementById("modal") as HTMLDialogElement);
    }, []);

    async function handleSubmit(event: any) {
        event.preventDefault();
        const request = await makeJoinRequest(event, sessionId);
        if(request){
            modal?.close();
        }
        else{
            alert("There's been a problem while creating the request");
        }
    }
    if(!modal){
        <div>Loading</div>
    }
    return (
        <div>
            <button className="btn btn-warning" onClick={() => {
                modal?.showModal();
            }}> Request a Session </button> : <div></div>

            <dialog id="modal" className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <div className="flex flex-col gap-3">
                        <h1 className="font-bold text-xl">Make a Request to Join the Session</h1>
                        <form id="form" className="form form-bordered p-2" onSubmit={handleSubmit}>
                            <label className="flex items-start gap-3">
                                <span className="label w-1/5">Description</span>
                                <textarea name="description" className="textarea textarea-bordered w-4/5 min-h-40" placeholder="What do you wanna talk about?"></textarea>
                            </label>
                        </form>
                    </div>
                    <div className="modal-action">
                        <button className="btn btn-success" form="form" type="submit">
                            Make Request
                        </button>
                        <form method="dialog">
                            <button className="btn">Cancel</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
}