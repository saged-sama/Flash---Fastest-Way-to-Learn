'use client';
import SessionsSidebar from "@/components/session/sessionsSidebar";
import { Layout, theme } from "antd";
import { Footer, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { SidebarRoutes } from "./sidebar-routes";
import { Sidebar } from "./sidebar";

export default function SessionsLayout({ children }: Readonly<{children: React.ReactNode;}>){

    const { token } = theme.useToken();

    return (
        <Layout>
            <Layout style={{ background: token.colorBgContainer, borderRadius: token.borderRadiusLG, minHeight: '80vh' }}>
                <Sider style={{
                    background: token.colorBgContainer,
                }} width={300} className="py-3">
                    <Sidebar />
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    {children}
                </Layout>
            </Layout>
            <Footer style={{ textAlign: 'center' }}>Flash - Fastest Way to Learn©2021 Created by Team Flash</Footer>
        </Layout>
    )
}