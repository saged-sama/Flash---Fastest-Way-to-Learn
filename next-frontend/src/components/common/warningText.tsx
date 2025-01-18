import { ReactNode } from "react";

export default function WarningText({ children }: { children: ReactNode }) {
    return (
        <p className="bg-orange-100 p-3 rounded-md text-sm text-start m-1">
            {children}
        </p>
    )
}