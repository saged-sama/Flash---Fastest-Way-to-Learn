'use client';
import { Button, Modal } from "antd";
import { ReactNode, useState } from "react";
import IconStat from "./iconstat";
import UserDet from "../common/userdet";

export default function StarReaction({ icon, stat, color, modalTitle }: { icon: ReactNode; stat: any; color: string, modalTitle: string }) {
    const [reactions, setReactions] = useState<any>(stat);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    }

    const handleCancel = () => {
        setIsModalOpen(false);
    }

    return(
        <>
            <Button onClick={showModal}>
                <IconStat icon={icon} stat={stat.items.length} color={color} />
            </Button>
            <Modal
                title={modalTitle}
                open={isModalOpen}
                onCancel={handleCancel}
                onOk={handleCancel}
                okButtonProps={{ style: { display: "none" } }}
                cancelButtonProps={{ style: { display: "none" } }}
            >
                <div className="flex flex-col gap-2">
                    {stat.items.length > 0 ? stat.items.map((reaction: any) => (
                        <UserDet user={reaction.user} />
                    )):
                        <div>No reactors yet</div> 
                    }
                </div>
            </Modal>
        </>
    )
}