import Collection from "./collection";
import AuthStore from "./authStore";

export default class SpringBase{
    public baseUrl: string;
    public authStore: AuthStore;

    constructor (baseUrl: string) {
        this.baseUrl = baseUrl;
        this.authStore = new AuthStore();
    }

    collection(collectionName: string) {
        return new Collection(this.baseUrl, collectionName, this.authStore);
    }
}
