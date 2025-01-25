"use client";

import WarningText from '@/components/common/warningText';
import SessionsLayout from '@/components/session/sessionLayout';
import { useSpringBase } from '@/context/SpringBaseContext';
import { springbase } from '@/lib/springbase';
import { objectToFormData } from '@/lib/utils';
import { HMSPrebuilt } from '@100mslive/roomkit-react';
import { Button } from 'antd';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function Home({ params }: { params: any }) {

    const { springbase } = useSpringBase();

    useEffect(() => {
        if(!springbase){
            return;
        }
    }, [springbase]);

    const breadcrumbs = [
        {
            title: "Subscripted",
        },
        {
            title: "Sessions"
        },
        {
            title: "room"
        },
        {
            title: params.roomCode
        }
    ];

    const leaveSession = async() => {
        await springbase?.collection("sessionrequests").update(params.requestId, objectToFormData({
            status: "FINISHED"
        }));
        redirect(`/subs/sessions/${params.id}`);
    }

    return (
        <SessionsLayout breadcrumbs={breadcrumbs}>
            <WarningText>
                <div className='flex justify-between items-center'>
                    <span>
                        You must leave the session before you can join another session.
                    </span>
                    <Button onClick={leaveSession}>
                        Leave Session
                    </Button>
                </div>
            </WarningText>
            <div style={{ height: '80vh' }}>
                <HMSPrebuilt roomCode={params.roomCode} />
            </div>
        </SessionsLayout>
    );
}
