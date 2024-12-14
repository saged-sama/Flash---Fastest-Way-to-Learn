'use client';
import FileUpload from "@/components/course/file-upload";
import { Input, theme } from "antd";

export default function Test(){
    const { token } = theme.useToken();
    return (
        <div className="flex items-center justify-center" style={{
            background: `linear-gradient(to bottom right, ${token.colorPrimaryActive} 0%, ${token.colorPrimaryActive} 0%, #ffffff 100%)`,
            position: "relative",
            minHeight: "100vh",
        }}>
            <FileUpload />
        </div>
    )
}