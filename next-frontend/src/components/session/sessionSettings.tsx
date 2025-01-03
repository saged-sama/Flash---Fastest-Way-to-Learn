'use client';
import { useSpringBase } from "@/context/SpringBaseContext";
import { Form, Image, Input, message, Select } from "antd";
import { useEffect, useState } from "react";
import Setting from "../common/settings/setting";
import SettingsComponent from "../common/settings/settingsComponent";
import { ImageUp } from "lucide-react";
import { objectToFormData } from "@/lib/utils";

export default function SessionSettings(){
    const [settings, setSettings] = useState<any>();
    const { springbase } = useSpringBase();
    const [change, setChange] = useState(false);
    const [form] = Form.useForm();
    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        if(!springbase){
            return;
        }

        const getSettings = async () => {
            const response = await springbase.collection("sessionsettings").getFullList();
            if(response){
                setSettings(response[0]);
            }
        }

        getSettings();

    }, [springbase]);

    const handleChange = () => {
        setChange(!change);
    }

    const updateSettings = async(values: any) => {
        values = { ...values, sessionBannerFile: file };
        if(file === null){
            delete values.sessionBannerFile;
        }
        const resp = await springbase?.collection("sessionsettings").update(settings.id, objectToFormData(values));
        if(resp){
            setSettings(resp);
        }
        setFile(null);
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            form.submit();
        }, 2000);

        return () => clearTimeout(timer);
    }, [change]);

    if(settings){
        return (
            <Form form={form} className="flex flex-col gap-5" onFinish={updateSettings} initialValues={settings || {}}>
                <SettingsComponent title="General Settings" settings={[
                    <Setting key="session-banner" title="Session Banner" input={(
                        <Form.Item name="sessionBannerFile">
                            <label className="relative">
                                
                                <Image
                                    src={
                                        settings?.sessionBanner ? springbase?.collection("sessionsettings").file(settings?.id, settings?.sessionBanner) :
                                            "https://fastly.picsum.photos/id/7/4728/3168.jpg?hmac=c5B5tfYFM9blHHMhuu4UKmhnbZoJqrzNOP9xjkV4w3o"
                                    }
                                    alt="Session Banner"
                                    width={200}
                                    height={200}
                                    preview={false}
                                    className="border rounded-md cursor-pointer"
                                />

                                <div className="hidden">
                                    <input
                                        type="file"
                                        onChange={(e: any) => {
                                            setFile(e.target.files[0]);
                                            handleChange();
                                        }}
                                        accept="image/*"
                                    />
                                </div>
                            </label>
                        </Form.Item>
                    )} description="A banner image for your sessions. It will be displayed on every session page. You can change it when surfacing"/>,
                ]}>

                </SettingsComponent>
                <SettingsComponent title="Owner" settings={[
                    <Setting key="about-owner" title="About Session Owner" input={(
                        <Form.Item name="aboutSessionOwner">
                            <Input  onChange={handleChange} type="text" placeholder="About Yourself" value={settings?.aboutSessionOwner || ""}/>
                        </Form.Item>
                    )} description="A short description about yourself, mainly the interests you wanna discuss. This will help find session takers. It will be displayed on every session page. You can change it when surfacing"/>
                ]} />

                <SettingsComponent title="Scheduled Sessions" settings={[
                    <Setting 
                        key="session-behavior" 
                        title="Scheduled Session Start Behavior" 
                        input={
                            <Form.Item name="scheduledSessionBehavior">
                                <Select onChange={handleChange}  value={settings ? settings.scheduledSessionBehavior : "AUTOMATIC"} options={[
                                    {
                                        value: "AUTOMATIC",
                                        label: "Start automatically"
                                    },
                                    {
                                        value: "ASK",
                                        label: "Always ask before starting"
                                    }
                                ]} />
                            </Form.Item>
                        } 
                        description="Choose how you want to start your scheduled sessions. When selected as 'Start Automatically', your session will start automatically at the scheduled time. When selected as 'Always ask before starting', you will be asked to start the session when the scheduled time arrives, in this case it'll be similar to surfacing"
                    />,
                    <Setting 
                        key="notification-time" 
                        title="Get Notified of Schedule Before" 
                        input={
                            <Form.Item name="notifyScheduledSessionBefore">
                                <Input  onChange={handleChange} type="number" placeholder="eg: 5 Minutes" value={settings?.notifyScheduledSessionBefore || ""} />
                            </Form.Item>
                        }
                        description="Must be in Minutes!! Get notified of your scheduled session before the specified time in case you forget. The notification will always be sent as notification in the website. This cannot be turned off. You can also enable emailed notification below"
                    />,
                    <Setting 
                        key="email-notification" 
                        title="Emailed Notification" 
                        input={
                            <Form.Item name="notifyThroughEmail">
                                <Select onChange={handleChange}  value={settings ? settings.notifyThroughEmail : true} options={[
                                    { value: true, label: "Enabled" },
                                    { value: false, label: "Disabled" },
                                ]} />
                            </Form.Item>
                        }
                        description="Enable or disable emailed notification for your scheduled sessions. It is recommended to enable this feature to get notified of your scheduled sessions"
                    />
                ]} />

                <SettingsComponent title="Session Participants" settings={[
                    <Setting 
                        key="max-participants" 
                        title="Maximum Allowed Participants per Room" 
                        input={
                            <Form.Item name="maximumAllowedParticipantsPerRoom">
                                <Input  onChange={handleChange} type="number" placeholder="eg: 5" max={5} min={1} value={settings?.maximumAllowedParticipantsPerRoom || ""} />
                            </Form.Item>
                        } 
                        description="Set the maximum number of participants allowed in a room. This will help you manage the number of participants in each room. The maximum number of participants allowed is 5. You can change it while surfacing"
                    />,
                    <Setting 
                        key="view-waiting-list" 
                        title="Participants can View Waiting List" 
                        input={
                            <Form.Item name="canViewWaitingList">
                                <Select onChange={handleChange}  value={settings ? settings.canViewWaitingList : true} options={[
                                    { value: true, label: "Allowed" },
                                    { value: false, label: "Disallowed" },
                                ]} />
                            </Form.Item>
                        }
                        description="If allowed, participants can view the waiting list of the session. If disallowed, participants cannot view the waiting list of the session. It is recommended to allow this feature to let participants know their position in the waiting list"
                    />,
                    <Setting 
                        key="view-participants-list" 
                        title="Participants can View Participants List" 
                        input={
                            <Form.Item name="canViewParticipantsList">
                                <Select onChange={handleChange}  value={settings ? settings.canViewParticipantsList : true} options={[
                                    { value: true, label: "Allowed" },
                                    { value: false, label: "Disallowed" },
                                ]} />
                            </Form.Item>
                        }
                        description="If allowed, participants can view the participants list of the session. If disallowed, participants cannot view the participants list of the session. It is recommended to allow this feature to let participants know who are participating in the session"
                    />,
                    <Setting 
                        key="view-current-room-participants" 
                        title="Participants can View Current Room Participants" 
                        input={
                            <Form.Item name="canViewCurrentSessionParticipants">
                                <Select onChange={handleChange}  value={settings ? settings.canViewCurrentSessionParticipants : true} options={[
                                    { value: true, label: "Allowed" },
                                    { value: false, label: "Disallowed" },
                                ]} />
                            </Form.Item>
                        }
                        description="If allowed, participants can view the current participants in the room. If disallowed, participants cannot view the current participants in the room. It is recommended to allow this feature to let participants know who are in the room"
                    />,
                    <Setting 
                        key="display-session-statistics" 
                        title="Display Session Statistics" 
                        input={
                            <Form.Item name="displaySessionStatistics">
                                <Select onChange={handleChange}  value={settings ? settings.displaySessionStatistics : true} options={[
                                    { value: true, label: "Allowed" },
                                    { value: false, label: "Disallowed" },
                                ]} />
                            </Form.Item>
                        }
                        description="If allowed, participants can view the session statistics. If disallowed, participants cannot view the session statistics. You will always be able to see the session statistics"
                    />
                ]} />
            </Form>
        )
    }

    return (
        <div>
            Loading...
        </div>
    )
}