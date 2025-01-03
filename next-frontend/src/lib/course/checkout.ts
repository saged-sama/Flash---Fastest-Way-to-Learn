import { springbase } from "../springbase";

export async function checkout(userId: string, courseId: string) {
    console.log("Doing new checkout");
    console.log("courseId: ", courseId);
    console.log("userId: ", userId);
    
    // Create a FormData object to send course information
    const formData = new FormData();

    // Add course id
    formData.append("courseId", courseId);

    // Gotta change the userId
    formData.append("userId", userId);


    // Gotta change the auth to false
    const response = await springbase.collection("stripe_customer").create(formData, false);
    return response;
}
