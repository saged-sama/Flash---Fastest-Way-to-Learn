import { springbase } from "../springbase";
import { getCurrentUser } from "../utils"; // Assuming you have a utility function to get current user

export async function createCourse(courseTitle: string) {
    console.log("Creating new course");
    console.log("Course title: ", courseTitle);
    
    // Create a FormData object to send course information
    const formData = new FormData();
    
    // Add course title
    formData.append("title", courseTitle);
    
    // Gotta change the userId
    formData.append("userId", getCurrentUser());

    // Gotta change the auth to false
    const course = await springbase.collection("course").create(formData, false);
    return course;
}

export async function updateCourse(courseId: string, courseData: {
    title?: string, 
    description?: string, 
    price?: number, 
    categoryId?: string,
    imageUrl?: string,
    isPublished?: boolean
}) {
    console.log("Updating course");
    console.log(courseId);
    
    // Create a FormData object to send course information
    const formData = new FormData();
    
    // Append fields if they are provided
    if (courseData.title) {
        formData.append("title", courseData.title);
    }
    
    if (courseData.description) {
        formData.append("description", courseData.description);
    }
    
    if (courseData.price !== undefined) {
        formData.append("price", courseData.price.toString());
    }
    
    if (courseData.categoryId) {
        formData.append("categoryId", courseData.categoryId);
    }
    
    if (courseData.imageUrl) {
        formData.append("imageUrl", courseData.imageUrl);
    }
    
    if (courseData.isPublished !== undefined) {
        formData.append("isPublished", courseData.isPublished.toString());
    }
    
    // Add userId for authentication
    formData.append("userId", getCurrentUser());

    // Update the course using springbase
    const updatedCourse = await springbase.collection("course").update(courseId, formData, false);
    return updatedCourse;
}

export async function getCourse(courseId: string){
    // const userId = getCurrentUser();
    // if (!userId) {
    //     return null;
    // }

    const course = await springbase.collection("course").getOne(courseId, {}, false);

    // if (!course) {
    //     return null;
    // }
    
    return course;
}
