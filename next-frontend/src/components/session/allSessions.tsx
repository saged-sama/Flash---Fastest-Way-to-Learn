'use client';
import { Input, Layout, Tabs, theme } from "antd";
import Search from "antd/es/input/Search";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import ActiveSessions from "./activeSessions";
import Surface from "./surface";
import Schedules from "./schedules";

export default function AllSessions(){
    const { token } = theme.useToken();

    const onSearch = (value: string) => {
        console.log(value);
    }

    return (
        <Content
            className="site-layout-background"
            style={{
                background: token.colorBgContainer,
                padding: 24,
                margin: 0,
                minHeight: 280,
                borderRadius: token.borderRadiusLG
            }}
        >
            <Layout 
                style={{
                    background: token.colorBgContainer,
                    borderRadius: token.borderRadiusLG
                }}
            >
                <Header style={{ background: token.colorBgContainer }}>
                    <Search placeholder="Search Sessions" onSearch={onSearch} enterButton />
                </Header>
                <Layout style={{ background: token.colorBgContainer }}>
                    <Content style={{
                        background: token.colorBgContainer,
                        paddingTop: 0,
                        paddingRight: 10,
                        margin: 0,
                    }}>
                        <div className="flex flex-col gap-10">
                            <ActiveSessions title="Running"/>
                            <ActiveSessions title="Scheduled"/>
                        </div>
                    </Content>
                    <Sider width={400} style={{ 
                        padding: "10px",
                        background: token.colorBgContainer,
                        borderRadius: token.borderRadiusLG
                    }} className="h-full border">
                        <Tabs
                            defaultActiveKey="shedules"
                            type="card"
                            items={[
                                {
                                    label: "Schedules",
                                    key: "schedules",
                                    children: <Schedules />
                                },
                                {
                                    label: "Surface",
                                    key: "surface",
                                    children: <Surface />
                                }
                            ]}
                        />
                    </Sider>
                </Layout>
            </Layout>
        </Content>
    )
}