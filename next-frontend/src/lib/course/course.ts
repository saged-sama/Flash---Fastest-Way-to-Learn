import SpringBase from "../springbase/springbase";
import { getCurrentUser } from "../utils"; // Assuming you have a utility function to get current user

export async function createCourse(springbase: SpringBase ,courseTitle: string) {
    console.log("Creating new course");
    console.log("Course title: ", courseTitle);
    
    // Create a FormData object to send course information
    const formData = new FormData();
    
    // Add course title
    formData.append("title", courseTitle);
    
    // // Gotta change the userId
    // formData.append("userId", getCurrentUser());

    // Gotta change the auth to false
    const course = await springbase.collection("course").create(formData);
    return course;
}

export async function updateCourse(courseId: string, courseData: {
    title?: string, 
    description?: string, 
    price?: number, 
    categoryId?: string,
    imageFile?: File,
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
    
    if (courseData.imageFile) {
        console.log("Image file: ", courseData.imageFile)
        formData.append("imageFile", courseData.imageFile);
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
    console.log("Get course response: ", course)

    // if (!course) {
    //     return null;
    // }
    
    return course;
}

export async function getCourses(published: boolean = false, userId?: string, categoryId?: string, title?: string) {
    console.log("Getting courses by users");
    if (userId) {
        const courses = await springbase.collection("course").getFullList({userId, published}, false);
        console.log("1. Get courses response: ", courses);
        return courses;
    }
    else if (categoryId != null && title == null) {
        const courses = await springbase.collection("course").getFullList({published, categoryId}, false);
        console.log("2. Get courses response: ", courses);
        return courses;
    } else if (categoryId == null && title != null) {
        const courses = await springbase.collection("course").getFullList({published, title}, false);
        console.log("3. Get courses response: ", courses);
        return courses;
    } else if (categoryId != null && title != null) {
        const courses = await springbase.collection("course").getFullList({published, categoryId, title}, false);
        console.log("4. Get courses response: ", courses);
        return courses;
    } else {
        const courses = await springbase.collection("course").getFullList({published}, false);
        console.log("5. Get courses response: ", courses);
        return courses;
    }
}

export async function deleteCourse(courseId: string){
    // const userId = getCurrentUser();
    // if (!userId) {
    //     return null;
    // }

    const course = await springbase.collection("course").delete(courseId, false);

    // if (!course) {
    //     return null;
    // }
    
    return course;
}
