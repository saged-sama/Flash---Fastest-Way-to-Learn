import { springbase } from "../springbase";

export async function getCategories() {
    const response = await springbase.collection("category").getFullList({}, false);
    console.log("Get categories response: ", response);
    return response;
}

export async function getCategory(categoryId: string) {
    const response = await springbase.collection("category").getOne(categoryId, {}, false);
    console.log("Get categories response: ", response);
    return response;
}