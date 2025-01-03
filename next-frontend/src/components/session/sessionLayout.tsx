'use client'
import { Breadcrumb, Layout, theme } from "antd";
import { Content } from "antd/es/layout/layout";

export default function SessionsLayout({ children, breadcrumbs }: Readonly<{children: React.ReactNode; breadcrumbs: {title: string}[]}>){
    const {token} = theme.useToken();

    return (
        <Layout>
            <Breadcrumb
            items={breadcrumbs}
            style={{ margin: '16px 0' }}
          />
          {children}
        </Layout>
    )
}