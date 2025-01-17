'use client';
import SessionsLayout from "@/components/session/sessionLayout";
import SessionPage from "@/components/session/sessionPage";
import { useSpringBase } from "@/context/SpringBaseContext";
import { objectToFormData } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Session() {
    const pathname = usePathname();
    const [session, setSession] = useState<any>(null);
    const [settings, setSettings] = useState<any>(null);
    const { springbase } = useSpringBase();
    // let participant: any = null;

    const getSession = async () => {
        const sess = await springbase?.collection("sessions").getOne(pathname.split("/").pop() as string);
        const sett = await springbase?.collection("sessionsettings").getOne(sess.owner.id);
        // const part = await springbase?.collection("sessionparticipants").create(objectToFormData({
        //     sessionId: sess.id,
        //     userId: springbase?.authStore.model?.id,
        //     status: "ENTERED"
        // }));
        setSession(sess);
        setSettings(sett);
        // participant = part;
    };

    // const removeParticipant = async () => {
    //     console.log(participant);
    //     if(!participant) return;
    //     await springbase?.collection("sessionparticipants").update(participant.id, objectToFormData({
    //         status: "EXITED"
    //     }));
    // };

    useEffect(() => {
        if (!springbase) {
            return;
        }

        getSession();

        springbase.collection("sessions").subscribe({
            id: pathname.split("/").pop() as string,
            action: "update"
        }, getSession);

        return () => {
            // console.log("cleanup");
            // console.log(participant);
            // removeParticipant();

            springbase.collection("sessions").unsubscribe({
                id: pathname.split("/").pop() as string,
                action: "update"
            });
        };
    }, [springbase]); // Added dependencies

    const breadcrumbs = [
        {
            title: "Subscripted",
        },
        {
            title: "Sessions"
        },
        {
            title: session?.title || "Loading..."
        }
    ];

    if (!session || !settings) {
        return (
            <SessionsLayout breadcrumbs={breadcrumbs}>
                <div>
                    Loading...
                </div>
            </SessionsLayout>
        );
    }

    return (
        <SessionsLayout breadcrumbs={breadcrumbs}>
            {/* <SessionSettings /> */}
            <SessionPage session={session} settings={settings} />
        </SessionsLayout>
    );
}
