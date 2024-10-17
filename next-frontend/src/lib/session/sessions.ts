import { springbase } from "../springbase";

export async function getActiveSessions() {
    return await springbase.collection("sessions").getFullList({
        userId: "7acb7a19-1a63-41f0-b0a5-0bc60d34dd48"
    }, false);
}

export async function getSessionInfo(id: string) {
    return await springbase.collection("sessions").getOne(id, {}, false);
}

export async function createNewSession(event: any){
    const formData = new FormData(event.target as HTMLFormElement);

    // Gotta change the userId
    formData.append("userId", "7acb7a19-1a63-41f0-b0a5-0bc60d34dd48");

    // Gotta change the auth to true
    const session = await springbase.collection("sessions").create(formData, false);
    return session;
}

export async function getJoinRequests(sessionId: string){
    return await springbase.collection("sessionrequests").getFullList({
        sessionId: sessionId
    }, false);
}

export async function makeJoinRequest(event: any, sessionId: string){
    const formData = new FormData(event.target as HTMLFormElement);
    formData.append("userId", "7acb7a19-1a63-41f0-b0a5-0bc60d34dd48");
    formData.append("sessionId", sessionId);
    return await springbase.collection("sessionrequests").create(formData, false);
}