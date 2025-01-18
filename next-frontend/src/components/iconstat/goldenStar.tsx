'use client';

import { Star } from "lucide-react";
import IconStat from "./iconstat";
import StarReaction from "./starReaction";

export default function GoldenStar({ sessionReactions }: { sessionReactions: any }) {
    const goldenStarReactions = {
        ...sessionReactions,
        items: sessionReactions.items.filter((reaction: any) => reaction.reaction === "GOLDSTAR")
    }
    return (
        <StarReaction
            icon={<Star className="w-4 h-4" 
            style={{ textShadow: "2px" }}/>} 
            stat={goldenStarReactions} color="#ffd700"
            modalTitle="Golden Star Reactions"
        />
    )

}