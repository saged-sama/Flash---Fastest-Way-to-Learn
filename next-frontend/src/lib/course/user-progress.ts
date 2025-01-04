import SpringBase from "../springbase/springbase";

export async function updateUserProgress(springbase: SpringBase, chapterId: string, isCompleted: boolean) {
    console.log("Creating new user progress");
    console.log("Chapter id: ", chapterId);
    console.log("isCompleted: ", isCompleted);

    const userId = springbase.authStore.model.id;
    
    // Create a FormData object to send course information
    const formData = new FormData();

    // Gotta change the userId
    formData.append("userId", userId);

    formData.append("chapterId", chapterId)
    
    formData.append("isCompleted", isCompleted.toString());

    const userProgress = await springbase.collection("user_progress").update(userId, formData);
    
    console.log("Updated user progress: ", userProgress);
    
    return userProgress;
}

export async function getCompletedChapters(springbase: SpringBase, publishedChapterIds: string[]) {
    console.log("Getting completed chapters by users");
        const chapters = await springbase.collection("user_progress").getFullList({publishedChapterIds});
        console.log("Get completed chapters response: ", chapters);
        return chapters || [];
}

export async function getUserProgress(springbase: SpringBase, chapterId: string){
    const userId = springbase.authStore.model.id;
    console.log("User id: ", userId);
    const userProgress = await springbase.collection("user_progress").getOne(userId, {chapterId});
    console.log("Received userProgress: ", userProgress);
    return userProgress;
}
