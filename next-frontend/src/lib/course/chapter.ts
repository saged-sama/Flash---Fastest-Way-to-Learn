import { springbase } from "../springbase";

export async function createChapter(chapterTitle: string, courseId: string) {
    console.log("Creating new chapter");
    console.log("Chapter title: ", chapterTitle);
    
    // Create a FormData object to send course information
    const formData = new FormData();
    
    // Add course title
    formData.append("title", chapterTitle);
    
    // Gotta change the userId
    formData.append("courseId", courseId);

    // Gotta change the auth to false
    const course = await springbase.collection("chapter").create(formData, false);
    return course;
}

export async function getChapters(courseId: string, published: boolean = false) {
    const options = { courseId, published }; // Add the `published` filter
    const response = await springbase.collection("chapter").getFullList(options, false);
    console.log("Get chapters response: ", response);
    return response || [];
}

export async function getChapter(chapterId: string, nextChapter?: boolean){
    // const userId = getCurrentUser();
    // if (!userId) {
    //     return null;
    // }

    if (nextChapter == null) {
        const chapter = await springbase.collection("chapter").getOne(chapterId, {}, false);
        return chapter;
    } else {
        const chapter = await springbase.collection("chapter").getOne(chapterId, {nextChapter}, false);
        return chapter;
    }

    // if (!course) {
    //     return null;
    // }   
}

export async function deleteChapter(chapterId: string){
    // const userId = getCurrentUser();
    // if (!userId) {
    //     return null;
    // }

    await springbase.collection("chapter").deleteOne(chapterId, false);

    // if (!course) {
    //     return null;
    // }
    
}

export async function updateChapter(chapterData: {
    chapterId: string;
    title?: string;
    description?: string;
    videoFile?: File;
    position?: number;
    isPublished?: boolean;
    isFree?: boolean;
}) {
    console.log("Updating chapter");
    console.log(chapterData.chapterId);
    
    // Create a FormData object to send course information
    const formData = new FormData();
    
    // Append fields if they are provided
    if (chapterData.chapterId) {
        formData.append("id", chapterData.chapterId);
    }

    if (chapterData.title) {
        formData.append("title", chapterData.title);
    }
    
    if (chapterData.description) {
        formData.append("description", chapterData.description);
    }
    
    
    if (chapterData.videoFile) {
        console.log("Video file: ", chapterData.videoFile);
        formData.append("videoFile", chapterData.videoFile);
    }

    if (chapterData.position) {
        formData.append("position", chapterData.position.toString());
    }
    
    if (chapterData.isPublished !== undefined) {
        formData.append("isPublished", chapterData.isPublished.toString());
    }

    if (chapterData.isFree !== undefined) {
        formData.append("isFree", chapterData.isFree.toString());
    }
    
    // Add userId for authentication
    formData.append("chapterId", chapterData.chapterId.toString());

    // Update the course using springbase
    const updatedChapter = await springbase.collection("chapter").update(chapterData.chapterId, formData, false);
    return updatedChapter;
}