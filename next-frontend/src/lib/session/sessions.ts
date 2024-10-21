import { springbase } from "../springbase";
import { getCurrentUser } from "../utils";

export async function getActiveSessions() {
    return await springbase.collection("sessions").getFullList({
        userId: getCurrentUser()
    }, false);
}

export async function getSessionInfo(id: string) {
    return await springbase.collection("sessions").getOne(id, {}, false);
}

export async function createNewSession(event: any){
    const formData = new FormData(event.target as HTMLFormElement);

    // Gotta change the userId
    formData.append("userId", getCurrentUser());

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
    formData.append("userId", getCurrentUser());
    formData.append("sessionId", sessionId);
    return await springbase.collection("sessionrequests").create(formData, false);
}

export async function createRoom(sessionRequestId: string){
    const formData = new FormData();
    formData.append("sessionRequestId", sessionRequestId);
    formData.append("userId", getCurrentUser());
    const room = await springbase.collection("rooms").create(formData, false);
    return room;
}

export async function getRoom(sessionRequestId: string){
    return await springbase.collection("rooms").getOne(sessionRequestId, {}, false);
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