import { springbase } from "@/lib/springbase";
import Link from "next/link";

export default function ActiveSessions({session}: {session: any}) {
    return (
        <div className="card flex-col md:flex-row lg:flex-row flex-1 card-side bg-base-100 shadow-xl p-5 h-96">
            <figure className="md:w-1/2 md:h-full">
                <img
                    src={springbase.collection("users").file(session.owner.id, session.owner.avatar)}
                    className="rounded-md h-full w-full object-cover"
                    alt="Movie" />
            </figure>
            <div className="card-body md:w-1/2 md:h-full">
                <h2 className="card-title">{session.title}</h2>
                <p> Instructor: <span className="text-info">{session.owner.name}</span></p>
                <p className="text-sm">Description: <span>{session.description}</span></p>
                <div className="card-actions justify-end">
                    <Link href={`/sessions/${session.id}`} className="btn btn-success ">View Session</Link>
                </div>
            </div>
        </div>
    )
}
