import SessionTitle from "./sessionTitle";
import SessionRequests from "./sessionRequests";
import { theme } from "antd";

export default function SessionPage({ session, settings }: { session: any; settings: any }) {
    const { token } = theme.useToken();

    const containerStyle = {
        background: token.colorBgContainer,
        padding: 10
    };

    return (
        <div className="flex gap-3 rounded-md w-full">
            <div className="flex flex-col gap-3 rounded-md w-3/4">
                <div style={containerStyle}>
                    <SessionTitle session={session} settings={settings} />
                </div>
                <div className="flex gap-3">
                    <div className="rounded-md w-2/3 h-full" style={containerStyle}>
                        
                    </div>
                    <div className="rounded-md w-1/3 h-full" style={containerStyle}>
                        <SessionRequests session={session}/>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-3 rounded-md w-1/4">
                <div style={containerStyle}>

                </div>
                <div style={containerStyle}>

                </div>
            </div>
        </div>
    );
}
