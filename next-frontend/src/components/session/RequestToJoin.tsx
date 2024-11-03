'use client';

import { makeJoinRequest } from "@/lib/session/sessions";
import { useEffect, useState } from "react";

export default function RequestToJoin({ sessionId }: { sessionId: string }) {
    const [modal, setModal] = useState<HTMLDialogElement | null>(null);

    useEffect(() => {
        const modalElement = document.getElementById("modal") as HTMLDialogElement;
        setModal(modalElement);
    }, []);

    async function handleSubmit(event: any) {
        event.preventDefault();
        const request = await makeJoinRequest(event, sessionId);
        if (request) {
            modal?.close();
        } else {
            alert("There's been a problem while creating the request.");
        }
    }

    return (
        <div className="flex flex-col items-center">
            {/* Button to open modal */}
            <button 
                className="btn bg-teal-500 text-white hover:bg-teal-700 transition-all px-6 py-3 rounded-lg"
                onClick={() => modal?.showModal()}
            >
                Request to Join
            </button>

            {/* Modal */}
            <dialog 
                id="modal" 
                className="modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
                style={{ backdropFilter: 'blur(4px)' }}
            >
                <div className="modal-box bg-white rounded-lg shadow-lg p-6 max-w-lg w-full">
                    <form id="form" onSubmit={handleSubmit} className="space-y-4">
                        <h1 className="text-2xl font-bold text-teal-700 mb-4">Request to Join the Session</h1>
                        
                        <div className="flex flex-col gap-2">
                            <label className="flex flex-col md:flex-row gap-2 items-center">
                                <span className="w-full md:w-1/4 text-teal-700 font-semibold">Description:</span>
                                <textarea 
                                    name="description" 
                                    className="textarea textarea-bordered w-full px-3 py-2 border border-teal-300 rounded-lg focus:border-teal-500 min-h-[100px]" 
                                    placeholder="Describe your reason for joining this session"
                                    required
                                ></textarea>
                            </label>
                        </div>

                        <div className="modal-action flex justify-end gap-3 mt-4">
                            <button 
                                form="form" 
                                type="submit" 
                                className="btn bg-teal-500 text-white hover:bg-teal-700 transition-all px-6 py-2 rounded-lg"
                            >
                                Submit Request
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
