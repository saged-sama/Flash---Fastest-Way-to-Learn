import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ConfigProvider } from "antd";
import { cookies } from "next/headers";
import { SpringBaseProvider } from "@/context/SpringBaseContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Flash",
  description: "Generated by create next app",
  icons: {
    icon: "/images/flash.png",
    shortcut: "/images/flash.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const token = cookies().get("token")?.value;

  return (
    <SpringBaseProvider token={token}>
        <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#fa8c16",
            colorInfo: "#13c2c2",
            colorSuccess: "#52c41a",
            colorError: "#fa541c",
            colorLink: "#722ed1",
            fontSize: 15
          }
        }}
      >
        <html lang="en">
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            {children}
          </body>
        </html>
      </ConfigProvider>
    </SpringBaseProvider>
  );
}
