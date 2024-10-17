import { springbase } from "@/lib/springbase";

export default function SessionInfo({ session }: { session: any }) {
    return (
        <div className="flex gap-5">
            <figure className="h-40 w-40">
                <img src={`${springbase.collection("users").file(session.owner.id, session.owner.avatar)}`} alt={`${session.owner.avatar}`} className="w-full h-full rounded-full object-cover" />
            </figure>
            <div className="flex flex-col gap-3">
                <h1 className="text-2xl font-bold">{session.title}</h1>
                <p className="text-lg text-info">{session.owner.name}</p>
                <p className="text-sm text-wrap">{session.description}</p>
            </div>
        </div>
    )
}