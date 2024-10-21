'use client';
import { createNewSession } from "@/lib/session/sessions";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CreateNewSession() {
    const router = useRouter();
    const [modal, setModal] = useState<HTMLDialogElement | null>(null);

    useEffect(() => {
        const modal = document.getElementById('modal') as HTMLDialogElement;
        setModal(modal);
    }, []);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const session = await createNewSession(e);
        router.push(`/sessions/${session.id}`);
    }

    
    return (
        <div className="flex flex-col">
            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            <button className="btn btn-accent" onClick={()=> modal?.showModal()}>Create Your Own Session</button>
            <dialog id="modal" className="modal">
            <div className="modal-box w-11/12 max-w-5xl" >
                <form id="form" onSubmit={handleSubmit}>
                    <h1 className="font-bold">
                        Create a New Session
                    </h1>
                    <div className="flex flex-col gap-3 p-3 pb-0">
                        <label className="flex gap-3 w-full">
                            <h1 className="w-2/6">Session Title:</h1>
                            <input type="text" name="title" className="input input-bordered w-full" required placeholder="Title of Your Session"/>
                        </label>
                        <label className="flex gap-3 w-full">
                            <h1 className="w-2/6">Session Description:</h1>
                            <textarea name="Description" className="textarea textarea-bordered w-full" placeholder="Describe the primary topic of this session"></textarea>
                        </label>
                    </div>
                </form>
                <div className="modal-action">
                    <button form="form" type="submit" className="btn btn-success">
                        Create
                    </button>
                    <form method="dialog">
                        {/* if there is a button, it will close the modal */}
                        <button className="btn btn-neutral">Cancel</button>
                    </form>
                </div>
            </div>
            </dialog>
        </div>
  );
}