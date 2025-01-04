'use client';

import SpringBase from "@/lib/springbase/springbase";
import { createContext, useContext, useState, useEffect } from "react";

interface SpringBaseContextProps {
    springbase: SpringBase | null;
}

const SpringBaseContext = createContext<SpringBaseContextProps>({ springbase: null });

export const SpringBaseProvider = ({ children, token }: { children: React.ReactNode, token: string | null | undefined }) => {
    const [springbase, setSpringBase] = useState<SpringBase | null>(null);
    
    useEffect(() => {
        if (token) {
            const springInstance = new SpringBase("http://localhost:8080");
            springInstance.authStore.loadFromToken(token);
            setSpringBase(springInstance);  // This will only run once or when token changes
        }

        return () => {
            springbase?.close();
        }
    }, [token]);  // Only re-run when token changes

    return (
        <SpringBaseContext.Provider value={{ springbase }}>
            {children}
        </SpringBaseContext.Provider>
    );
}

export const useSpringBase = () => {
    const context = useContext(SpringBaseContext);
    if (context === undefined) {
        throw new Error('useSpringBase must be used within a SpringBaseProvider');
    }
    return context;
}
