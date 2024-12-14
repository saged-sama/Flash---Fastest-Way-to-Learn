'use client';
import { useEffect, useState } from "react";

export default function useLocalStorage(key: string) {
    const [storedValue, setStoredValue] = useState(() => {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    });

    useEffect(() => {
        const handleLocalStorageChange = async () => {
            const value = localStorage.getItem(key);
            setStoredValue(value ? JSON.parse(value) : null);
        };

        window.addEventListener("storage", handleLocalStorageChange);

        return () => {
            window.removeEventListener("storage", handleLocalStorageChange);
        };
    }, [key]);

    return storedValue;
}