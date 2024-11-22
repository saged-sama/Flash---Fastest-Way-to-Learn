import React, { MouseEventHandler } from "react";
import { Button } from "./button";

const FilledButton: React.FC<ButtonProps> = ({
    type,
    label,
    onClick
}) =>{
    return (
        <Button type={type} label={label} bgcolor="teal-500" textcolor="white" onClick={onClick} rounded="none" hover="bg-teal-600"/>
    )
}

export { FilledButton };