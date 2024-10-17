import { jwtDecode } from "jwt-decode";
import type AuthStore from "./authStore";
import crud from "./crud";

function urlSearchParametersFromObject(obj: { [key: string]: any }) {
    return Object.keys(obj).map((key) => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]);
    }).join('&');
}

export default class Collection{
    private collectionName: string;
    private baseurl: string;
    private fileurl: string;
    private authStore: AuthStore;
    private webSocketUrl: string;
    private ws: WebSocket | undefined;

    constructor (baseUrl: string, collectionName: string, authStore: AuthStore){
        if(baseUrl.endsWith("/")){
            baseUrl = baseUrl.slice(0, -1);
        }
        this.collectionName = collectionName;
        this.authStore = authStore;
        this.baseurl = baseUrl + "/api/collections/" + this.collectionName;
        this.fileurl = baseUrl + "/api/files/" + this.collectionName;
        this.webSocketUrl = baseUrl.replace("http", "ws") + "/ws/" + this.collectionName;
        this.ws = undefined;
    }

    async create(data: object | FormData, auth: boolean = true){
        let headers: any = {
            "Access-Control-Request-Method": "POST"
        };
        if(auth && this.authStore.isValid){
            headers["Authorization"] = `Bearer ${this.authStore.token}`;
        }
        // console.log(headers, data);
        return await crud(headers).POST(`${this.baseurl}/records`, data);
    }

    async update(id: string, data: object, auth: boolean = true){
        let headers: any = {
            "Access-Control-Request-Method": "PATCH"
        }
        if(auth && this.authStore.isValid){
            headers["Authorization"] = `Bearer ${this.authStore.token}`;
        }
        return await crud(headers).PATCH(`${this.baseurl}/records/${id}`, data);
    }

    async delete(id: string, auth: boolean = true){
        let headers: any = {
            "Access-Control-Request-Method": "PATCH"
        }
        if(auth && this.authStore.isValid){
            headers["Authorization"] = `Bearer ${this.authStore.token}`;
        }
        return await crud(headers).DELETE(`${this.baseurl}/records/${id}`);
    }

    async getOne(id: string, options?: object, auth: boolean = true){
        let url = `${this.baseurl}/records/${id}`;
        if(options){
            url += "?" + urlSearchParametersFromObject(options);
        }
        let headers: any = {
            "Access-Control-Request-Method": "GET"
        }
        if(auth && this.authStore.isValid){
            headers["Authorization"] = `Bearer ${this.authStore.token}`;
        }
        return await crud(headers).GET(url);
    }

    async getList(page: number, perPage: number, options?: object, auth: boolean = true){
        let url = `${this.baseurl}/records?page=${page}&perPage=${perPage}`;
        if(options){
            url += "&" + urlSearchParametersFromObject(options);
        }
        let headers: any = {
            "Access-Control-Request-Method": "GET"
        }
        if(auth && this.authStore.isValid){
            headers["Authorization"] = `Bearer ${this.authStore.token}`;
        }
        return await crud(headers).GET(url);
    }

    async getFullList(options?: object, auth: boolean = true){
        return await this.getList(1, 5000, options, auth);
    }

    async getFirstListItem(filter: string, options?: object, auth: boolean = true){
        options = { ...options, filter, skipTotal: 1 };
        return (await this.getList(1, 1, options, auth));
    }

    subscribe() {
        try{
            this.ws = new WebSocket(this.webSocketUrl);
            const eventHandlers = {
                create: new Function(),
                update: new Function(),
                delete: new Function(),
            };

            const onCreate = (func: Function) => {
                eventHandlers.create = func;
            }
            
            const onUpdate = (func: Function) => {
                eventHandlers.update = func;
            }

            const onDelete = (func: Function) => {
                eventHandlers.delete = func;
            }

            this.ws.onmessage = (event) => {
                const data = event.data;
                
                switch(data){
                    case "create":
                        eventHandlers?.create();
                        break;
                    case "update":
                        eventHandlers?.update();
                        break;
                    case "delete":
                        eventHandlers?.delete();
                        break;
                    default:
                        break;
                }
            }
            
            return {
                onCreate,
                onUpdate,
                onDelete,
            };
        }catch(err){
            console.log(err);
        }
    }

    unsubscribe() {
        this.ws?.close();
    }

    async authWithPassword(email: string, password: string){
        const resp = await crud().POST(`${this.baseurl}/auth-with-password`, { email, password });
        if(!resp){
            this.authStore.token = undefined;
            this.authStore.model = undefined;
            this.authStore.isValid = false;
            this.authStore.isAdmin = false;
        }
        localStorage.setItem("springbase_auth", resp.access_token);

        this.authStore.token = resp.access_token;
        const model: any = jwtDecode(this.authStore.token as string);
        this.authStore.model = {
            id: model?.userId,
            email: model?.sub,
            role: model?.authorities,
        }
        this.authStore.isValid = true;
        this.authStore.isAdmin = this.authStore.model?.role === "ADMIN";

        return resp.springbase_auth;
    }

    file(recordId: string, filename: string){
        return `${this.fileurl}/${recordId}/${filename}`;
    }
}