'use client';
import { theme } from "antd";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { token } = theme.useToken();

  return (
    <div
      style={{
        background: `linear-gradient(to bottom right, ${token.colorPrimaryActive} 0%, ${token.colorPrimaryActive} 0%, #ffffff 100%)`, 
        position: "relative",
        minHeight: "100vh",
      }}
    >
      <div className="flex items-center justify-center h-screen relative z-10"
        style={{ 
          // position: "absolute",
          // transform: "translateY(50%)",
          animation: "floatIn 2s ease-out forwards",
          transition: "all 3s",
          padding: "0 20px"
         }}
      >
        {children}
      </div>
    </div>
  );
}
