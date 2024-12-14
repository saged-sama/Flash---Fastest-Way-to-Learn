// import CurrentUserDP from "@/components/common/subsNavbar/currentUserDP";
import Sidebar from "@/components/session/sidebar";

export default function SessionsLayout({ children }: Readonly<{children: React.ReactNode;}>){
    return (
        <html>
            <body>
                <div className="flex w-full h-full">
                    <div className="w-1/6 h-full">
                        <Sidebar />
                    </div>
                    <div className="w-5/6">
                        {/* <CurrentUserDP /> */}
                        {children}
                    </div>
                </div>
            </body>
        </html>
    )

}