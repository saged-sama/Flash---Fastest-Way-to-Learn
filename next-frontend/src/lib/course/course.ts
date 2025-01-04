import SpringBase from "../springbase/springbase";

export async function createCourse(springbase: SpringBase ,courseTitle: string) {
    console.log("Creating new course");
    console.log("Course title: ", courseTitle);
    
    // Create a FormData object to send course information
    const formData = new FormData();
    
    // Add course title
    formData.append("title", courseTitle);

    // Gotta change the auth to false
    const course = await springbase.collection("course").create(formData);
    return course;
}

export async function updateCourse(springbase: SpringBase, courseId: string, courseData: {
    title?: string, 
    description?: string, 
    price?: number, 
    categoryId?: string,
    imageFile?: File,
    isPublished?: boolean
}) {
    console.log("Updating course");
    console.log("courseId: ", courseId);
    console.log("courseData: ", courseData);
    
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

    // Update the course using springbase
    const updatedCourse = await springbase.collection("course").update(courseId, formData);
    return updatedCourse;
}

export async function getCourse(springbase: SpringBase, courseId: string){
    const course = await springbase.collection("course").getOne(courseId, {});
    console.log("Get course response: ", course)
    
    return course;
}

export async function getCourses(springbase: SpringBase, published: boolean = false, userId?: boolean, categoryId?: string, title?: string) {
    console.log("Getting courses by users");
    if (userId) {
        const courses = await springbase.collection("course").getFullList({userId, published});
        console.log("1. Get courses response: ", courses);
        return courses;
    }
    else if (categoryId != null && title == null) {
        const courses = await springbase.collection("course").getFullList({published, categoryId});
        console.log("2. Get courses response: ", courses);
        return courses;
    } else if (categoryId == null && title != null) {
        const courses = await springbase.collection("course").getFullList({published, title});
        console.log("3. Get courses response: ", courses);
        return courses;
    } else if (categoryId != null && title != null) {
        const courses = await springbase.collection("course").getFullList({published, categoryId, title});
        console.log("4. Get courses response: ", courses);
        return courses;
    } else {
        const courses = await springbase.collection("course").getFullList({published});
        console.log("5. Get courses response: ", courses);
        return courses;
    }
}

export async function deleteCourse(springbase: SpringBase, courseId: string){

    const course = await springbase.collection("course").deleteOne(courseId);
    
    return course;
}
