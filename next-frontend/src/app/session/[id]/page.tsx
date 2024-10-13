'use client';

import SessionRequestTile from "../../../components/session/sessionRequestTile";
import { useEffect, useState } from "react";

export default function Session() {
    const [requests, setRequests] = useState([]);

    // const webSocket = new WebSocket("ws://localhost:8080");

    // webSocket.onopen = () => {
    //     sendMessageToServer("Active");
    // }

    // webSocket.onmessage = (event) => {
    //     handleMessageFromServer(event.data);
    // }

    // function sendMessageToServer(message: string){
    //     webSocket.send(message);
    // }

    // function handleMessageFromServer(message: string){
    //     console.log(message);
    // }

    useEffect(() => {

        return () => {
            // webSocket.close();
        }
    }, []);

    return (
        <div className="flex flex-col">
            <div className="flex flex-col gap-2 justify-center">
                {requests.map((request: any, index) => {
                    return (
                        <SessionRequestTile request={request}/>
                    );
                })}
            </div>
        </div>
    )
}