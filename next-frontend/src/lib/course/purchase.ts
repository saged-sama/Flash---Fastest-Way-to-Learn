import SpringBase from "../springbase/springbase";

export async function getPurchase(springbase: SpringBase, courseId?: string) {
    console.log("Course id: ", courseId)

    const userId = springbase.authStore.model.id;

    if (courseId != null) {
        const response = await springbase.collection("purchase").getOne(userId, {courseId});
        console.log("Get purchase response: ", response);
        return response;
    } else {
        const response = await springbase.collection("purchase").getOne(userId, {});
        console.log("Get purchase response: ", response);
        return response;
    }
}
