'use client';

import { useSpringBase } from "@/context/SpringBaseContext";
import { makeJoinRequest } from "@/lib/session/sessions";
import { Button, Modal, Form, Input, message } from "antd";
import { useEffect, useState } from "react";

export default function RequestToJoin({ sessionId }: { sessionId: string }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const { springbase } = useSpringBase();

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        if(!springbase){
            return;
        }
    }, [springbase]);

    const handleSubmit = async () => {
        if (!springbase) {
            return;
        }
        try {
            const values = await form.validateFields();
            const request = await makeJoinRequest(springbase, values, sessionId);
            if (request) {
                message.success("Request created successfully!");
                setIsModalOpen(false);
            } else {
                message.error("There's been a problem while creating the request");
            }
        } catch (error) {
            message.error("Please fill out the form correctly.");
        }
    };

    return (
        <div>
            {/* Button to trigger the modal */}
            <Button type="primary" onClick={showModal}>
                Request a Session
            </Button>

            {/* Modal */}
            <Modal
                title="Make a Request to Join the Session"
                open={isModalOpen}
                onCancel={handleCancel}
                onOk={handleSubmit}
                okText="Make Request"
                cancelText="Cancel"
            >
                <Form form={form} layout="vertical">
                    {/* Description Field */}
                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: "Please provide a description." }]}
                    >
                        <Input.TextArea
                            placeholder="What do you want to talk about?"
                            autoSize={{ minRows: 4 }}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}
