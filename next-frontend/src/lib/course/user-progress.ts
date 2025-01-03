import { springbase } from "../springbase";

export async function updateUserProgress(userId: string, chapterId: string, isCompleted: boolean) {
    console.log("Creating new user progress");
    console.log("Chapter id: ", chapterId);
    console.log("User id: ", userId);
    console.log("isCompleted: ", isCompleted);
    
    // Create a FormData object to send course information
    const formData = new FormData();

    // Gotta change the userId
    formData.append("userId", userId);

    formData.append("chapterId", chapterId)
    
    formData.append("isCompleted", isCompleted.toString());

    const userProgress = await springbase.collection("user_progress").update(userId, formData, false);
    
    console.log("Updated user progress: ", userProgress);
    
    return userProgress;
}

export async function getCompletedChapters(userId: string, publishedChapterIds: string[]) {
    console.log("Getting completed chapters by users");
        const chapters = await springbase.collection("user_progress").getFullList({userId, publishedChapterIds}, false);
        console.log("Get completed chapters response: ", chapters);
        return chapters || [];
}

export async function getUserProgress(userId: string, chapterId: string){
    // const userId = getCurrentUser();
    // if (!userId) {
    //     return null;
    // }

    const course = await springbase.collection("user_progress").getOne(userId, {chapterId}, false);

    // if (!course) {
    //     return null;
    // }
    
    return course;
}
