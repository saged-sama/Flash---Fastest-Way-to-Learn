"use client";

import SessionsLayout from '@/components/session/sessionLayout';
import { HMSPrebuilt } from '@100mslive/roomkit-react';

export default function Home({ params }: { params: any }) {

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

    return (
        <SessionsLayout breadcrumbs={breadcrumbs}>
            <div style={{ height: '80vh' }}>
                <HMSPrebuilt roomCode={params.roomCode} />
            </div>
        </SessionsLayout>
    );
}
