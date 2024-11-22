'use client';

import { springbase } from "@/lib/springbase";
import { getCurrentUser, getTimePassedSince } from "@/lib/utils";
import { createRoom, getRoom, getRoomCode } from "@/lib/session/sessions";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Modal, Typography, Avatar, Space, message } from "antd";
import { Check, X } from "lucide-react";

const { Text, Paragraph } = Typography;

export default function Request({ request }: { request: any }) {
    console.log(request);
    const router = useRouter();
    const [timePassed, setTimePassed] = useState<string>(getTimePassedSince(request.createdAt));
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimePassed(getTimePassedSince(request.createdAt));
        }, 30000);

        if (getCurrentUser() !== request.session.owner.id) {
            const ws = springbase.collection("sessionrequests").subscribe();
            ws?.onUpdate(async () => {
                const req = await springbase.collection("sessionrequests").getOne(request.id, {}, false);
                if (req.status === "ACCEPTED") {
                    setIsModalOpen(true);
                    console.log("Orreh Eine aisi to modal koi?");
                    const room = await getRoom(request.id);
                    if (room) {
                        const code = await getRoomCode(room.id);
                        if (code) {
                            router.push(`/subs/sessions/${request.session.id}/room/${code}`);
                        }
                    }
                }
            });
        }

        return () => clearInterval(interval); // Cleanup on component unmount
    }, []);

    const accept = async () => {
        const formData = new FormData();
        formData.append("status", "ACCEPTED");
        const sessreq = await springbase.collection("sessionrequests").update(request.id, formData);
        if (sessreq.status === "ACCEPTED") {
            message.success("Request accepted successfully!");
            setIsModalOpen(true);
            const room = await getRoom(request.id);
            if (room) {
                const code = await getRoomCode(room.id);
                if (code) {
                    router.push(`/subs/sessions/${request.session.id}/room/${code}`);
                }
            }
        }
    };

    const reject = async () => {
        await springbase.collection("sessionrequests").update(request.id, {
            status: "REJECTED",
        });
        message.info("Request rejected.");
    };

    return (
        <div className="w-full p-4 border rounded-md flex flex-col lg:flex-row gap-5">
            {/* User Avatar */}
            <Avatar
                size={64}
                src={springbase.collection("users").file(request.user.id, request.user.avatar)}
            />

            <div className="flex justify-between w-full">
                <div className="flex flex-col gap-1">
                    {/* User Info */}
                    <div className="flex gap-1">
                        <h1 className="font-bold">Requested By: </h1>
                        <h1 className="">{request.user.name}</h1>
                    </div>
                    <h1 className="mt-2">{request.description}</h1>

                    {/* Time and Status */}
                    <div className="flex w-full gap-4 mt-2 text-xs">
                        <h1>Created: {timePassed}</h1>
                        <h1>Status: {request.status}</h1>
                    </div>
                </div>

                {/* Accept/Reject Buttons */}
                {getCurrentUser() === request.session.owner.id && request.status === "PENDING" && (
                    <div className="mt-4 flex gap-2">
                        <Button type="primary" onClick={accept}>
                            <Check className="w-4 h-4 font-bold" />
                        </Button>
                        <Button danger onClick={reject}>
                            <X className="w-4 h-4"/>
                        </Button>
                    </div>
                )}
            </div>

            {/* Modal */}
            <Modal
                title="Please Wait"
                open={isModalOpen}
                footer={null}
                closable={false}
            >
                <div className="text-center">
                    <Paragraph>Your session is starting. Please wait while we get it ready.</Paragraph>
                    <div className="mt-2">
                        <div className="ant-spin-dot ant-spin-dot-spin">
                            <span className="ant-spin-dot-item" />
                            <span className="ant-spin-dot-item" />
                            <span className="ant-spin-dot-item" />
                            <span className="ant-spin-dot-item" />
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
