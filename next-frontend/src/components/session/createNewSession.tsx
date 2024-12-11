'use client';
import { createNewSession } from "@/lib/session/sessions";
import { Button, Form, Input, Modal } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { theme } from "antd";

const { useToken } = theme;

export default function CreateNewSession() {
    const { token } = useToken();
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const router = useRouter();

    const showModal = () => {
        setOpen(true);
    };

    const closeModal = () => {
        setOpen(false);
    }

    const handleSubmit = async () => {
        const form = document.getElementById("sessionCreationForm") as HTMLFormElement;
        setConfirmLoading(true);
        const session = await createNewSession(new FormData(form));
        setConfirmLoading(false);
        setOpen(false);
        router.push(`/sessions/${session.id}`);
    }
    
    return (
        <div className="flex flex-col">
            <Button type="default" onClick={showModal}>
                Surface
            </Button>
            <Modal
                title="Surface and Give Sessions"
                open={open}
                confirmLoading={confirmLoading}
                onCancel={closeModal}
                footer={[
                    <Button key="surface" type="primary" onClick={handleSubmit}>Surface</Button>,
                    <Button key="cancel" type="default" onClick={closeModal}>Cancel</Button>
                ]}
            >
                <div style={{ backgroundColor: token.colorWarning, padding: "10px"}}>
                    <p>Surfacing will make you visible to everyone. Interested party will then be able to request you for a session.</p>
                </div>
                <form id="sessionCreationForm" className="flex flex-col gap-4 py-2">
                    <label className="flex gap-4">
                        <h1>Title:</h1>
                        {/* <div className="flex flex-col gap-2 w-full"> */}
                            <Input name="title" placeholder="Session Space Tilte" />
                            {/* <p className="text-xs">Your session space will be visible to others with this Title</p> */}
                        {/* </div> */}
                    </label>
                    <label className="flex gap-4 items-start">
                        <h2>Description:</h2>
                        <Input.TextArea name="description" placeholder="Describe What Topic You're Interested to Give Sessions on" />
                    </label>
                </form>
            </Modal>
        </div>
  );
}