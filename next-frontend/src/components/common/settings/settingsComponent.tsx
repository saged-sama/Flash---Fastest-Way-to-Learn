'use client';

import { theme } from "antd";
import { Content } from "antd/es/layout/layout";
import React from "react";

export default function SettingsComponent({ title, settings }: Readonly<{ title: string, settings: React.ReactNode[] }>) {
    const { token } = theme.useToken();
    return (
        <div className="flex flex-col gap-2">
            <h1 className="font-bold text-xl">{title}</h1>
            <Content
                style={{
                    margin: 0,
                    background: token.colorBgContainer,
                    borderRadius: token.borderRadiusLG,
                    height: "10%"
                }}
            >
                {settings}
            </Content>
        </div>
    );
}