import { springbase } from "@/lib/springbase";
import { theme } from "antd";
import Link from "next/link";

export default function UserDet({user}: {user: any}){
    const { token } = theme.useToken();

    return (
        <Link href={`/user/${user.id}`} className="flex gap-1 text-sm text-info hover:border hover:p-2 rounded-md" style={{ color:  token.colorInfoActive}}>
            <img src={springbase?.collection("users").file(user.id, user.avatar)} alt={user.name} className="rounded-full w-5 h-5 object:covers"/>
            <span>{user.name}</span>
        </Link>
    )
}