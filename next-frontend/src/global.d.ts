import { MouseEventHandler } from "react";

declare global {
    interface ButtonProps {
        type: "button" | "submit" | "reset";
        label: string;
        onClick?: MouseEventHandler<HTMLButtonElement>;
        hover?: string;
        rounded?: string;
        bgcolor?: string;
        textcolor?: string;
    }

    type MenuItem = Required<MenuProps>["items"][number];
}

export {};