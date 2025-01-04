import SpringBase from "../springbase/springbase";


export async function getCategories(springbase: SpringBase) {
    const response = await springbase.collection("category").getFullList({});
    console.log("Get categories response: ", response);
    return response;
}

export async function getCategory(springbase: SpringBase, categoryId: string) {
    const response = await springbase.collection("category").getOne(categoryId, {});
    console.log("Get categories response: ", response);
    return response;
}
