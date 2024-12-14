import CreateNewSession from "@/components/session/createNewSession";
import SessionsGrid from "@/components/session/sessionsGrid";

export default function Active() {
    return (
        <div className="flex flex-col justify-center items-center px-5 w-full">
            <div className="flex items-center justify-between w-full p-2 border-b">
                <h1>Active Sessions</h1>
                <CreateNewSession />
            </div>
            <SessionsGrid />
        </div>
    );
}
