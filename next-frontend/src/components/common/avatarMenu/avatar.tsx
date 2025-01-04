'use client';

import { useSpringBase } from "@/context/SpringBaseContext";
import { useEffect, useState } from "react";

export default function Avatar() {
    const { springbase } = useSpringBase();
    const [ avatar, setAvatar ] = useState<string>();

    useEffect(() => {
        if(!springbase) return;

        if(springbase.authStore.isValid){
            setAvatar(springbase.collection("users").file(springbase.authStore.model.id, springbase.authStore.model.avatar))
        }else{
            setAvatar("/images/avatar.png");
        }
    }, [springbase])

    return (
        <div className="flex items-center space-x-3">
            <img src={avatar} alt="avatar" className="w-10 h-10 rounded-full" />
            <i className="fa fa-angle-down text-gray-500"></i>
        </div>
    );
}