import ActiveSessions from "../../components/session/activeSessions";
import CreateNewSession from "../../components/session/createNewSession";
import { Dot } from "lucide-react";

export default function Session(){
    return (
        <div className="flex flex-col gap-2 w-1/2 h-full">
            <div className="flex justify-between h-full border-b">
                <div className="flex items-center justify-center"> <Dot size={48} color="green"/> Active Sessions</div>
            </div>
            <CreateNewSession />
            <ActiveSessions />
        </div>
    );
}