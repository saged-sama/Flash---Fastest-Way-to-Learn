'use client';
import FileUpload from "@/components/course/file-upload";
import { useSpringBase } from "@/context/SpringBaseContext";
import { Input, theme } from "antd";
import Link from "next/link";
import { useEffect } from "react";

export default function Test(){
    const { springbase } = useSpringBase();
    useEffect(() => {
        if(!springbase) return;

        async function getData() {
            console.log(await springbase?.collection("sessionrequests").getFullList());
        }

        getData();

    }, [springbase]);
    const { token } = theme.useToken();
    return (
        <div className="flex items-center justify-center" style={{
            background: `linear-gradient(to bottom right, ${token.colorPrimaryActive} 0%, ${token.colorPrimaryActive} 0%, #ffffff 100%)`,
            position: "relative",
            minHeight: "100vh",
        }}>
            <FileUpload />
            <Link href="/test/websocket">WebSocket</Link>
        </div>
    )
}