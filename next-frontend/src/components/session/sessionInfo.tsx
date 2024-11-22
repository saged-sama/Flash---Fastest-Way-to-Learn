import { springbase } from "@/lib/springbase";
import { theme } from "antd";
import StarIcon from "../common/elements/buttons/stars/starIcon";
import { ListEnd, ListStart, Settings, Users } from "lucide-react";
import { getRandomInteger } from "@/lib/utils";

export default function SessionInfo({ session }: { session: any }) {
    const { token } = theme.useToken();
    return (
        <div className="flex gap-5">
            <figure className="h-32 w-32">
                <img src={`${springbase.collection("users").file(session.owner.id, session.owner.avatar)}`} alt={`${session.owner.avatar}`} className="w-32 h-32 rounded-xl object-cover" />
            </figure>
            <div className="flex flex-col gap-6 w-full">
                <div className="flex justify-between w-full">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-xl font-bold">{session.title}</h1>
                        <p className="text-sm text-info" style={{ color:  token.colorInfoActive}}>{session.owner.name}</p>
                    </div>
                    <Settings className="w-4 h-4"/>
                </div>
                <p className="text-xs text-wrap">{session.description}</p>
                <div className="flex justify-end gap-5 items-center w-full p-3">
                        <div className="flex items-center gap-2">
                            <StarIcon color="#ffd700" /><span>{getRandomInteger(1, 20)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <StarIcon color="#000000" /><span>{getRandomInteger(1, 5)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Users className="h-4 w-4"/><span>{getRandomInteger(1, 15)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <ListEnd className="h-4 w-4" /><span>{getRandomInteger(1, 5)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <ListStart className="h-4 w-4"/><span>{getRandomInteger(1, 10)}</span>
                        </div>
                    </div>
            </div>
        </div>
    )
}