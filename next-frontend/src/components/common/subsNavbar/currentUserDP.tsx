'use client';

// import useLocalStorage from "@/hooks/useLocalStorage";
import { springbase } from "@/lib/springbase";
// import { User } from "lucide-react";

export default function CurrentUserDP(){
    // const springBaseAuth = useLocalStorage("springbase_auth");
    
    // if(springBaseAuth){
        const currentUser = springbase.authStore.model;
        console.log(currentUser);
        return (
            <img src={springbase.collection("users").file(currentUser.id, currentUser.avatar)} alt={currentUser.name} className="w-40 h-40 rounded-full object-cover" />
        );
    // }

    // return (
    //     <div className="w-40 h-40 rounded-full bg-gray-300">
    //         <User />
    //     </div>
    // );
}