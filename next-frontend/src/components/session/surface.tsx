'use client';
import { useEffect, useState } from "react";
import { Button, Form, Image, Input } from "antd";
import { useSpringBase } from "@/context/SpringBaseContext";
import { objectToFormData } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function Surface() {
    const [ settings, setSettings ] = useState<any>(null);
    const { springbase } = useSpringBase();
    const [form] = Form.useForm();
    const [timeoutId, setTimeoutId] = useState<any>(null);
    const router = useRouter();

    const [file, setFile] = useState<any>(null);

    useEffect(() => {
        if(!springbase) return;

        const getSettings = async() => {
            const response = await springbase.collection("sessionsettings").getFullList();
            if(response){
                setSettings(response[0]);
            }
        }

        getSettings();

    }, [springbase]);

    useEffect(() => {
        if(!file) return;

        const uploadFile = async() => {
            const response = await springbase?.collection("sessionsettings").update(settings?.id, objectToFormData({ sessionBannerFile: file }));
            if(response){
                setSettings(response);
            }
        }
        uploadFile();

    }, [file]);

    const handleFinish = async(values: any) => {
        clearTimeout(timeoutId);

        setTimeoutId(setTimeout(async() => {
            const resp = await springbase?.collection("sessions").create(objectToFormData(values));
            if(resp){
                router.push(`/subs/sessions/${resp.id}`);
            }
        }, 1000));
    }

    if(settings) return (
        <Form form={form} onFinish={handleFinish}>
            <div className="flex justify-between">
                <Form.Item>
                    <label className="relative">
                        <Image
                            src={
                                settings?.sessionBanner ? springbase?.collection("sessionsettings").file(settings?.id, settings?.sessionBanner) :
                                    "https://fastly.picsum.photos/id/7/4728/3168.jpg?hmac=c5B5tfYFM9blHHMhuu4UKmhnbZoJqrzNOP9xjkV4w3o"
                            }
                            alt="Session Banner"
                            width={180}
                            height={180}
                            preview={false}
                            className="border rounded-md cursor-pointer object-cover"
                        />

                        <div className="hidden">
                            <input
                                type="file"
                                onChange={(e: any) => {
                                    setFile(e.target.files[0]);
                                }}
                                accept="image/*"
                            />
                        </div>
                    </label>
                </Form.Item>
                
                <div className="flex flex-col items-end w-full px-3">    
                    <Image src="/images/whale.png" alt="whale" width={50} height={50} preview={false}/>
                    <Button
                        htmlType="submit"
                        type="primary"
                        className="w-full"
                        onClick={() => {
                            form?.submit();
                        }}
                    >Surface Now</Button>
                    <p className="bg-orange-100 p-3 rounded-md text-sm text-start m-1">
                        Surfacing will make you visible to everybody else
                    </p>
                </div>
            </div>
            <Form.Item rules={[{ required: true,
                message: "You need a title for your sessions"
             }]} name="title">
                <div>
                    <h1 className="font-bold">Session Title</h1>
                    <Input
                        placeholder="Session Title"
                        onChange={(e) => {
                            console.log(e.target.value);
                        }}
                    />
                </div>
            </Form.Item>
            <Form.Item name="description" rules={[{ required: true, message: "You need a description for your session" }]}>
                <div>
                    <h1 className="font-bold">Session Description</h1>
                    <Input.TextArea
                        placeholder="Describe the topic of your session"
                        autoSize={{ minRows: 3 }}
                    />
                </div>
            </Form.Item>
        </Form>
    )

    return (
        <></>
    )
}