import { springbase } from "../springbase";


export async function getPurchase(userId: string, courseId?: string) {
    console.log("User id: ", userId)
    console.log("Course id: ", courseId)

    if (courseId != null) {
        const response = await springbase.collection("purchase").getOne(userId, {courseId}, false);
        console.log("Get purchase response: ", response);
        return response;
    } else {
        const response = await springbase.collection("purchase").getOne(userId, {}, false);
        console.log("Get purchase response: ", response);
        return response;
    }
}
