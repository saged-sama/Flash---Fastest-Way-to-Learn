import SpringBase from "../springbase/springbase";
import { getCurrentUser } from "../utils";

export async function getActiveSessions(springbase: SpringBase) {
    return await springbase.collection("sessions").getFullList({
        userId: getCurrentUser()
    }, true);
}

export async function getSessionInfo(springbase: SpringBase, id: string) {
    return await springbase.collection("sessions").getOne(id, {}, true);
}

export async function createNewSession(springbase: SpringBase, formData: FormData){

    console.log("Creating new session");
    console.log(formData.get("title"));
    console.log(formData.get("description"));
    // Gotta change the userId
    formData.append("userId", getCurrentUser());

    // Gotta change the auth to true
    const session = await springbase.collection("sessions").create(formData, true);
    return session;
}

export async function getJoinRequests(springbase: SpringBase, sessionId: string){
    return await springbase.collection("sessionrequests").getFullList({
        sessionId: sessionId
    }, true);
}

export async function makeJoinRequest(springbase: SpringBase, event: any, sessionId: string){
    const formData = new FormData(event.target as HTMLFormElement);
    formData.append("userId", getCurrentUser());
    formData.append("sessionId", sessionId);
    return await springbase.collection("sessionrequests").create(formData, true);
}

export async function createRoom(springbase: SpringBase, sessionRequestId: string){
    const formData = new FormData();
    formData.append("sessionRequestId", sessionRequestId);
    formData.append("userId", getCurrentUser());
    const room = await springbase.collection("rooms").create(formData, true);
    return room;
}

export async function getRoom(springbase: SpringBase, sessionRequestId: string){
    return await springbase.collection("rooms").getOne(sessionRequestId, {}, true);
}

export async function getRoomCode(roomId: string){
    try{
        const resp = await fetch("http://localhost:8080/api/collections/rooms/records/roomdata/" + roomId + `?userId=${getCurrentUser()}`);
        const { code, authToken } = await resp.json();

        localStorage.setItem("roomAuthToken", authToken);
        return code;
    } catch(err){
        console.log(err);
    }
}

export async function getRoomAuthToken(roomCode: string){
    const authT = localStorage.getItem("roomAuthToken");
    if(authT){
        return authT;
    }
    try{
        const resp = await fetch("http://localhost:8080/api/collections/rooms/records/room-auth-token/" + roomCode + `?userId=${getCurrentUser()}`);
        const { authToken } = await resp.json();
        return authToken;
    } catch(err){
        console.log(err);
    }
}
