'use client';

import { theme } from "antd";
import { Content } from "antd/es/layout/layout";
import AntdTable from "../table/antdTable";
import SessionHistoryTable from "./sessionHistoryTable";

export default function SessionHistory() {
    const { token } = theme.useToken();

    return (
        <Content
            style={{
                background: token.colorBgContainer,
                borderRadius: 10,
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "24px",
            }}
        >
            <div className="flex justify-between">    
                <h1 className="text-xl font-bold">Session History</h1>
            </div>
            <div className="overflow-x-auto">    
                <SessionHistoryTable />
            </div>
        </Content>
    );
}