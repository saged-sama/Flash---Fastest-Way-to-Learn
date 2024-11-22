import React, { MouseEventHandler } from "react";

const Button: React.FC<ButtonProps> = ({
    type,
    label,
    onClick,
    hover,
    rounded,
    bgcolor,
    textcolor
}) =>{
    return (
        <button 
            onClick={onClick}
            type={type}
            className={`hover:${hover} rounded-${rounded} bg-${bgcolor} py-2 px-6 text-${textcolor}`}>
        {label}
        </button>
    )
}

export { Button };