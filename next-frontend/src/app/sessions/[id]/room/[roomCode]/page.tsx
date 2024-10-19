"use client";

import { HMSPrebuilt } from '@100mslive/roomkit-react';

export default function Home({ params }: { params: any }) {

    return (
        <div style={{ height: '100vh' }}>
            <HMSPrebuilt roomCode={params.roomCode} />
        </div>
    );
}
