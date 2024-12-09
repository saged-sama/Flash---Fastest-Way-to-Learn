import { springbase } from "../springbase";
import { getCurrentUser } from "../utils"; // Assuming you have a utility function to get current user

export async function createCourse(courseTitle: string) {
    try {
        // Create a FormData object to send course information
        const formData = new FormData();
        
        // Add course title
        formData.append("title", courseTitle);
        
        // Get current user and add as owner
        const currentUserId = getCurrentUser();
        formData.append("ownerId", currentUserId);

        // Use the courses collection to create a new course
        // The second parameter 'false' means no authentication is required for this request
        const course = await springbase.collection("courses").create(formData, false);
        
        return course;
    } catch (error) {
        console.error("Error creating course:", error);
        throw error;
    }
}
