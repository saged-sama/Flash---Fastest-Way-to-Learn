import Collection from "./collection";
import AuthStore from "./authStore";

function handleMessage(clientId: string, event: MessageEvent, handlers: {[key: string]: Function}) {
    const data = JSON.parse(event.data);
    const topic = data.topic;
    const action = data.action;

    if(topic === "default"){
        const clId = data.clientId;
        if(clId){
            clientId = clId;
        }
    }
    else{
        handlers[topic + " " + action]?.call(data.message);
    }
}

export default class SpringBase{
    private baseUrl: string;
    public authStore: AuthStore;
    private webSocketUrl: string;
    private webSocket: WebSocket | null;
    private handlers: {[key: string]: Function} = {};
    private clientId: string;

    constructor (baseUrl: string) {
        if(baseUrl.endsWith("/")){
            baseUrl = baseUrl.slice(0, -1);
        }
        this.baseUrl = baseUrl;
        this.webSocketUrl = baseUrl.replace("http", "ws") + "/ws";
        this.authStore = new AuthStore();
        this.clientId = crypto.randomUUID();
        this.webSocket = null;
    }

    collection(collectionName: string) {
        return Collection(collectionName, this.handleThis.bind(this), this.initiateWebSocket.bind(this));
    }

    private handleThis() {
        return this;
    }

    private initiateWebSocket() {
        if(!this.webSocket){
            if(this.authStore.isValid){
                this.clientId = this.authStore.model.id;
            }
            this.webSocket = new WebSocket(this.webSocketUrl + "?clientId=" + this.clientId);
    
            if(!this.webSocket){
                console.error("Websocket Start Failed!!");
                return;
            }
    
            this.webSocket.onopen = () => {
                console.log("WebSocket is connected");
            }
    
            this.webSocket.onclose = () => {
                console.log("WebSocket is disconnected");
            }
    
            this.webSocket.onerror = (error) => {
                console.error("WebSocket error: ", error);
            }
    
            this.webSocket.onmessage = (event) => {
                handleMessage(this.clientId, event, this.handlers);
            }
        }
    }

    close(){
        if(this.webSocket){
            this.webSocket.close();
        }

        this.webSocket = null;

        this.authStore.token = undefined;
        this.authStore.model = undefined;
        this.authStore.isValid = false;
        this.authStore.isAdmin = false;
    }
}
