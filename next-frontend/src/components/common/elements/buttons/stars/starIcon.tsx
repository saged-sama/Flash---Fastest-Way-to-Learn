'use client';
import { Star } from "lucide-react";

export default function StarIcon({ color }: { color: string }) {
    return (
        <Star className="w-4 h-4 animate-pulse"
        style={{ 
            fill: color,
            color: color,
            filter: `drop-shadow(0 0 0.75rem ${color})`
        }}/>
    );
}