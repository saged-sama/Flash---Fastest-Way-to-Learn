'use client';
import { theme } from "antd";

export default function Layout({ children }: { children: React.ReactNode }) {
    const { token } = theme.useToken();
  return (
    <body style={{ backgroundColor:  token.colorPrimaryActive}}>
        <div className="flex items-center justify-center h-screen">
            {children}
        </div>
    </body>
  );
}