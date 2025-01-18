import SpringBase from "../springbase/springbase";
import { getCurrentUser, objectToFormData } from "../utils";

export async function getActiveSessions(springbase: SpringBase, options: { filter?: string, sort?: string, skipTotal?: boolean }, page: number, perPage: number) {
    return (await springbase.collection("sessions").getList(page, perPage, options));
}

export async function getSessionInfo(springbase: SpringBase, id: string) {
    return await springbase.collection("sessions").getOne(id, {}, true);
}

export async function createNewSession(springbase: SpringBase, formData: FormData){

    console.log("Creating new session");
    console.log(formData.get("title"));
    console.log(formData.get("description"));
    // Gotta change the userId
    formData.append("userId", getCurrentUser(springbase));

    // Gotta change the auth to true
    const session = await springbase.collection("sessions").create(formData, true);
    return session;
}

export async function getJoinRequests(springbase: SpringBase, session: any, status?: string){
    return await springbase.collection("sessionrequests").getList(1, 3, {
        filter: `session.id="${session.id}"` + (status != "" ? ` && status="${status}"` : ""),
        sort: "createdAt"
    }, true);
}

export async function makeJoinRequest(springbase: SpringBase, data: any, session: any){
    const formData = objectToFormData(data);
    formData.append("session", session);
    return await springbase.collection("sessionrequests").create(formData, true);
}

export async function createRoom(springbase: SpringBase, sessionRequestId: string){
    const formData = new FormData();
    formData.append("sessionRequestId", sessionRequestId);
    formData.append("userId", getCurrentUser(springbase));
    const room = await springbase.collection("rooms").create(formData, true);
    return room;
}

export async function getRoom(springbase: SpringBase, sessionRequestId: string){
    return await springbase.collection("rooms").getOne(sessionRequestId, {}, true);
}

export async function getRoomCode(springbase: SpringBase, roomId: string){
    try{
        const resp = await fetch("http://localhost:8080/api/collections/rooms/records/roomdata/" + roomId + `?userId=${getCurrentUser(springbase)}`, 
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${springbase.authStore.token}`
                }
            }      
        );
        const { code, authToken } = await resp.json();

        localStorage.setItem("roomAuthToken", authToken);
        return code;
    } catch(err){
        console.log(err);
    }
}

export async function getRoomAuthToken(springbase: SpringBase, roomCode: string){
    try{
        const resp = await fetch("http://localhost:8080/api/collections/rooms/records/room-auth-token/" + roomCode + `?userId=${getCurrentUser(springbase)}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${springbase.authStore.token}`
                }
            }
        );
        const { authToken } = await resp.json();
        return authToken;
    } catch(err){
        console.log(err);
    }
}
