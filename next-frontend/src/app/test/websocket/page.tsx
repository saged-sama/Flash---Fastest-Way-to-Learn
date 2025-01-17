'use client';

import Link from "next/link";
import { useEffect, useState } from "react";

export default function WebSocket(){
    let variable = 0;

    useEffect(() => {
        const init = () => {
            variable = 1;
        }

        init();

        return () => {
            console.log('cleanup');
            console.log(variable);
        }
    }, []);

    // useEffect(() => {
        
        console.log(variable);

    // }, [variable]);

    return (
        <>Hello
            <Link href={"/test"}>Test</Link>
        </>
    )
}
