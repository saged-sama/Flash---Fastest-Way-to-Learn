import SpringBase from "../springbase/springbase";

export async function checkout(springbase: SpringBase, courseId: string) {
    console.log("Doing new checkout");
    console.log("courseId: ", courseId);
    
    // Create a FormData object to send course information
    const formData = new FormData();

    formData.append("courseId", courseId);

    const response = await springbase.collection("stripe_customer").create(formData);
    return response;
}
