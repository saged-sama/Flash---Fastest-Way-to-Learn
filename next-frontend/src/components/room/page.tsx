"use client";

import { HMSPrebuilt } from '@100mslive/roomkit-react';

export default function Room({ roomCode, authToken }: { roomCode: string; authToken: string }) {
    return (
        <div style={{ height: '100vh' }}>
            <HMSPrebuilt roomCode="pcy-hmvn-btm" authToken="" />
        </div>
    );
}
