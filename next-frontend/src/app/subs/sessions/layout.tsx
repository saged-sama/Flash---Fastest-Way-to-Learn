import SessionsLayout from "@/components/session/layoutForSessionsDir";

export default function Layout({ children }: Readonly<{children: React.ReactNode;}>){

    return (
        <SessionsLayout>
            {children}
        </SessionsLayout>
    )
}