import SpringBase from "../springbase/springbase";

export async function createChapter(springbase: SpringBase, chapterTitle: string, courseId: string) {
    console.log("Creating new chapter");
    console.log("Chapter title: ", chapterTitle);
    
    const formData = new FormData();
    
    formData.append("title", chapterTitle);
    
    formData.append("courseId", courseId);

    const course = await springbase.collection("chapter").create(formData);
    return course;
}

export async function getChapters(springbase: SpringBase, courseId: string, published: boolean = false) {
    const options = { courseId, published }; // Add the `published` filter
    const response = await springbase.collection("chapter").getFullList(options);
    console.log("Get chapters response: ", response);
    return response || [];
}

export async function getChapter(springbase: SpringBase, chapterId: string, nextChapter?: boolean){
    if (nextChapter == null) {
        const chapter = await springbase.collection("chapter").getOne(chapterId, {});
        return chapter;
    } else {
        const chapter = await springbase.collection("chapter").getOne(chapterId, {nextChapter});
        return chapter;
    } 
}

export async function deleteChapter(springbase: SpringBase, chapterId: string){
    await springbase.collection("chapter").deleteOne(chapterId);   
}

export async function updateChapter(springbase: SpringBase, courseId: string, chapterData: {
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
    
    formData.append("chapterId", chapterData.chapterId);
    formData.append("courseId", courseId);

    // Update the course using springbase
    const updatedChapter = await springbase.collection("chapter").update(chapterData.chapterId, formData);
    return updatedChapter;
}
