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
        <div className="flex flex-col items-center">
            {/* Button to open modal */}
            <button 
                className="btn bg-teal-500 text-white hover:bg-teal-700 transition-all px-6 py-3 rounded-lg"
                onClick={() => modal?.showModal()}
            >
                Create Your Own Session
            </button>

            <dialog 
                id="modal" 
                className="modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
                style={{ backdropFilter: 'blur(4px)' }}
            >
                <div className="modal-box bg-white rounded-lg shadow-lg p-6 max-w-lg w-full">
                    <form id="form" onSubmit={handleSubmit} className="space-y-4">
                        <h1 className="text-2xl font-bold text-teal-700 mb-4">Create a New Session</h1>
                        
                        <div className="flex flex-col gap-2">
                            <label className="flex flex-col md:flex-row gap-2 items-center">
                                <span className="w-full md:w-1/4 text-teal-700 font-semibold">Session Title:</span>
                                <input 
                                    type="text" 
                                    name="title" 
                                    className="input input-bordered w-full px-3 py-2 border border-teal-300 rounded-lg focus:border-teal-500" 
                                    required 
                                    placeholder="Title of Your Session"
                                />
                            </label>
                            <label className="flex flex-col md:flex-row gap-2 items-center">
                                <span className="w-full md:w-1/4 text-teal-700 font-semibold">Session Description:</span>
                                <textarea 
                                    name="description" 
                                    className="textarea textarea-bordered w-full px-3 py-2 border border-teal-300 rounded-lg focus:border-teal-500" 
                                    placeholder="Describe the primary topic of this session"
                                />
                            </label>
                        </div>

                        <div className="modal-action flex justify-end gap-3 mt-4">
                            <button 
                                form="form" 
                                type="submit" 
                                className="btn bg-teal-500 text-white hover:bg-teal-700 transition-all px-6 py-2 rounded-lg"
                            >
                                Create
                            </button>
                            <button 
                                type="button" 
                                className="btn bg-gray-300 text-gray-700 hover:bg-gray-400 transition-all px-6 py-2 rounded-lg"
                                onClick={() => modal?.close()}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
}
