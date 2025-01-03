export default function SubsLayout({
    children
}: Readonly<{children: React.ReactNode;}>){
    return (
        <html>
            <body>
                {children}
            </body>
        </html>
    )
}