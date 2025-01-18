import SessionTitle from "./sessionTitle";
import SessionRequests from "./sessionRequests";
import { theme } from "antd";
import CurrentSessionDetails from "./currentSessionDetails";
import SessionReaction from "./sessioniReaction";
import WarningText from "../common/warningText";

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
                    <div className="flex justify-center rounded-md w-2/3" style={containerStyle}>
                    </div>
                    <div className="rounded-md w-1/3 h-full" style={containerStyle}>
                        <CurrentSessionDetails session={session} />
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-3 rounded-md w-1/4">
                <div className="flex gap-3" style={containerStyle}>
                    <WarningText>
                        <h1 className="flex flex-col gap-2">
                            <span>
                                Send Gold Star to show that you liked the session.
                            </span>
                            <span>
                                Send Dark Star to show that you didn't like the session.
                            </span>
                        </h1>                        
                    </WarningText>
                    <SessionReaction session={session} allowReaction={true} />
                </div>
                <div style={containerStyle}>
                    <SessionRequests session={session}/>
                </div>
            </div>
        </div>
    );
}
