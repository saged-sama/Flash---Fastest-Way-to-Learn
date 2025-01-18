'use client';

import { Star } from "lucide-react";
import IconStat from "./iconstat";
import StarReaction from "./starReaction";

export default function DarkStar({ sessionReactions }: { sessionReactions: any }) {
    const darkStarReactions = {
        ...sessionReactions,
        items: sessionReactions.items.filter((reaction: any) => reaction.reaction === "DARKSTAR")
    }
    return (
        <StarReaction
            icon={<Star className="w-4 h-4"
            style={{ textShadow: "2px" }}/>} 
            stat={darkStarReactions} color="#000000"
            modalTitle="Dark Star Reactions"
        />
    )

}