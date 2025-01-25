'use client';

import { getCurrentUser, getTimePassedSince, objectToFormData } from "@/lib/utils";
import { getRoom, getRoomCode } from "@/lib/session/sessions";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Modal, Typography, Avatar, message, theme } from "antd";
import { Check, X } from "lucide-react";
import { useSpringBase } from "@/context/SpringBaseContext";

const { Paragraph } = Typography;

export default function Request({ request }: { request: any }) {
    const { token } = theme.useToken();
    const { springbase } = useSpringBase();
    const router = useRouter();
    const [timePassed, setTimePassed] = useState<string>(getTimePassedSince(request.createdAt));
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if(!springbase) return;
        const interval = setInterval(() => {
            setTimePassed(getTimePassedSince(request.createdAt));
        }, 30000);

        if (springbase.authStore.model.id === request.user.id) {
            console.log("Subscribing to session requests");
            springbase.collection("sessionrequests").subscribe({
                id: request.id,
                action: "update",
            }, () => {});
        }

        return () => {
            clearInterval(interval);
            springbase.collection("sessionrequests").unsubscribe({
                action: "update",
            });
        };
    }, [springbase]);

    const accept = async () => {
        if(!springbase) return;
        const req = {...request, status: "ACCEPTED"};
        const sessreq = await springbase.collection("sessionrequests").update(request.id, objectToFormData(req));
        if (sessreq.status === "ACCEPTED") {
            message.success("Request accepted successfully!");
            setIsModalOpen(true);
            const room = await getRoom(springbase, request.id);
            if (room) {
                const code = await getRoomCode(springbase, room.id);
                if (code) {
                    router.push(`/subs/sessions/${request.session.id}/request/${request.id}/room/${code}`);
                }
            }
        }
    };

    const reject = async () => {
        await springbase?.collection("sessionrequests").update(request.id, {
            status: "REJECTED",
        });
        message.info("Request rejected.");
    };
    
    return (
        <div className="w-full p-4 border rounded-md flex flex-col lg:flex-row gap-5">
            {/* User Avatar */}
            <Avatar
                size={32}
                src={springbase?.collection("users").file(request.user.id, request.user.avatar)}
            />

            <div className="flex flex-col justify-between w-full">
                <div className="flex flex-col gap-1">
                    {/* User Info */}
                    <div className="flex gap-1">
                        <h1 className="font-bold" style={{
                            color: token.colorPrimary
                        }}>{request.user.name}</h1>
                    </div>
                    <h1 className="mt-2">{request.description}</h1>

                    {/* Time and Status */}
                    <div className="flex w-full gap-4 mt-2 text-xs">
                        <h1>Requested: {timePassed}</h1>
                        <h1>Status: {request.status}</h1>
                    </div>
                </div>

                {/* Accept/Reject Buttons */}
                {springbase?.authStore.model.id === request.session.owner.id && request.status === "PENDING" && (
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
