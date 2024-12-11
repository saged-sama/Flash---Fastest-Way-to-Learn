import { springbase } from "../springbase";

export async function getCategories() {
    const response = await springbase.collection("category").getList(1, 1000, {}, true); // Set a high `perPage` value
    console.log("Get categories response: ", response);
    return response;
}

