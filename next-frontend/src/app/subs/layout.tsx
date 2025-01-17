import Header from "@/components/common/header/Header";

export default function SubsLayout({
    children
}: Readonly<{children: React.ReactNode;}>){
    return (
        <html>
            <body>
                <Header />
                {children}
            </body>
        </html>
    )
}