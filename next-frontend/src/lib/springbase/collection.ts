import { jwtDecode } from "jwt-decode";
import crud from "./crud";
import { objectToFormData } from "../utils";

function urlSearchParametersFromObject(obj: { [key: string]: any }) {
    return Object.keys(obj).map((key) => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]);
    }).join('&');
}

export default function Collection(collectionName: string, springbaseHandler: Function, initiateWebSocket: Function) {
    const { baseUrl, authStore, clientId, handlers } = springbaseHandler();
    let webSocket: WebSocket | null = null;
    const collectionBaseUrl = baseUrl + "/api/collections/" + collectionName;
    const collectionFileUrl = baseUrl + "/api/files/" + collectionName;

    async function create(data: object | FormData, auth: boolean = true) {
        let headers: any = {
            "Access-Control-Request-Method": "POST"
        };
        if (auth && authStore.isValid) {
            headers = {
                ...headers,
                "Authorization": `Bearer ${authStore.token}`
            }
        }
        return await crud(headers).POST(`${collectionBaseUrl}/records`, data);
    }

    async function update(id: string, data: object, auth: boolean = true) {
        let headers: any = {
            "Access-Control-Request-Method": "PATCH"
        }
        if (auth && authStore.isValid) {
            headers = {
                ...headers,
                "Authorization": `Bearer ${authStore.token}`
            }
        }
        return await crud(headers).PATCH(`${collectionBaseUrl}/records/${id}`, data);
    }

    async function deleteOne(id: string, auth: boolean = true) {
        let headers: any = {
            "Access-Control-Request-Method": "DELETE"
        }
        if (auth && authStore.isValid) {
            headers = {
                ...headers,
                "Authorization": `Bearer ${authStore.token}`
            }
        }
        return await crud(headers).DELETE(`${collectionBaseUrl}/records/${id}`);
    }

    async function getOne(id: string, options?: object, auth: boolean = true) {
        let url = `${collectionBaseUrl}/records/${id}`;
        if (options) {
            url += "?" + urlSearchParametersFromObject(options);
        }
        let headers: any = {
            "Access-Control-Request-Method": "GET"
        }
        if (auth && authStore.isValid) {
            headers = {
                ...headers,
                "Authorization": `Bearer ${authStore.token}`
            }
        }
        return await crud(headers).GET(url);
    }

    async function getList(page: number, perPage: number, options?: any, auth: boolean = true) {
        let url = `${collectionBaseUrl}/records?page=${page}&perPage=${perPage}`;
        if (options) {
            url += "&" + urlSearchParametersFromObject(options);
        }
        let headers: any = {
            "Access-Control-Request-Method": "GET"
        }
        if (auth && authStore.isValid) {
            headers = {
                ...headers,
                "Authorization": `Bearer ${authStore.token}`
            }
        }
        console.log(url, auth, authStore.isValid, authStore.model, headers);
        return await crud(headers).GET(url);
    }

    async function getFullList(options?: any, auth: boolean = true) {
        return await getList(1, 5000, options, auth);
    }

    async function getFirstListItem(filter: string, options?: object, auth: boolean = true) {
        options = { ...options, filter, skipTotal: 1 };
        return (await getList(1, 1, options, auth));
    }

    async function authWithPassword(email: string, password: string) {
        const body =  objectToFormData({ email, password });
        const resp = await crud().POST(`${collectionBaseUrl}/auth-with-password`, body);

        if (!resp || !resp.token) {
            authStore.token = undefined;
            authStore.model = undefined;
            authStore.isValid = false;
            authStore.isAdmin = false;
            return;
        }

        try{
            localStorage.setItem('springbase_auth', resp.token);
        }catch(err){
            console.log("Server");
        }

        authStore.token = resp.token;
        const model: any = jwtDecode(authStore.token as string);
        authStore.model = {
            id: model?.id,
            email: model?.email,
            name: model?.name,
            avatar: model?.avatar,
            username: model?.sub
        }
        authStore.isValid = true;
        authStore.isAdmin = authStore.model?.role === "ADMIN";

        return resp;
    }

    function file(recordId: string, filename: string) {
        return `${collectionFileUrl}/${recordId}/${filename}`;
    }

    async function subscribe(options: {id?: string, action?: string, filter?: string}, callback: Function){
        webSocket = initiateWebSocket();
        async function waitForSocket(){
            return new Promise((resolve, reject) => {
                if(webSocket?.readyState === 1){
                    resolve(true);
                }
                else{
                    setTimeout(() => {
                        resolve(waitForSocket());
                    }, 1000);
                }
            });
        }

        if(webSocket?.readyState !== 1){
            await waitForSocket();
        }

        let context = collectionBaseUrl.replace(baseUrl, "") + "/records";
        if(options.id){
            context += `/${options.id}`;
        }

        console.log("Subscribing to: ", context, webSocket);
        webSocket?.send(JSON.stringify({
            messageType: "subscribe",
            topic: context,
            action: options.action || "create"
        }))
        handlers[`${context} ${options.action || "create"}`] = callback;
    }

    async function unsubscribe(options: {id?: string, action?: string, filter?: string}){
        webSocket = initiateWebSocket();
        async function waitForSocket(){
            return new Promise((resolve, reject) => {
                if(webSocket?.readyState === 1){
                    resolve(true);
                }
                else{
                    setTimeout(() => {
                        resolve(waitForSocket());
                    }, 1000);
                }
            });
        }

        if(webSocket?.readyState !== 1){
            await waitForSocket();
        }

        let context = collectionBaseUrl.replace(baseUrl, "") + "/records";
        if(options.id){
            context += `/${options.id}`;
        }

        console.log("Unsubscribing from: ", context, webSocket);

        webSocket?.send(JSON.stringify({
            messageType: "unsubscribe",
            topic: context,
            action: options.action || "create"
        }));

        console.log("Unsubscribed from: ", context);
        
        if(options.action){
            delete handlers[`${context} ${options.action}`];
        }
        else{
            delete handlers[`${context} read`];
            delete handlers[`${context} create`];
            delete handlers[`${context} update`];
            delete handlers[`${context} delete`];
        }
    }

    return {
        create,
        update,
        deleteOne,
        getOne,
        getList,
        getFullList,
        getFirstListItem,
        authWithPassword,
        file,
        subscribe,
        unsubscribe
    }
}