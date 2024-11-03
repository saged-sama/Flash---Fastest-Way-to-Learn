import { springbase } from "@/lib/springbase";
import Link from "next/link";

export default function ActiveSessions({ session }: { session: any }) {
    return (
        <div className="card flex flex-col md:flex-row bg-white shadow-lg rounded-lg p-5 h-auto md:h-96 transition-transform transform hover:scale-105">
            <figure className="md:w-1/2 md:h-full">
                <img
                    // src={springbase.collection("users").file(session.owner.id, session.owner.avatar)}
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXJr-fGkiy1DE5A0JNOkcmCNGcXuQXdzENZA&s"
                    className="rounded-lg h-48 w-full md:h-full object-cover"
                    alt="Session Image"
                />
            </figure>
            <div className="card-body md:w-1/2 flex flex-col justify-between p-4">
                <h2 className="card-title text-3xl font-bold text-teal-700">{session.title}</h2>
                <p className="text-gray-600 mt-2 mb-1">
                    <span className="font-semibold text-xl">Instructors:</span> 
                    <span className="text-teal-500 ml-1">{session.owner.name}</span>
                </p>
                <p className="text-gray-700 text-xl">
                    <span className="font-semibold">Description:</span> {session.description}
                </p>
                <div className="card-actions mt-4 flex justify-end">
                    <Link href={`/sessions/${session.id}`} passHref>
                        <p className="btn bg-teal-500 text-white hover:bg-teal-700 transition-all">
                            View Session
                        </p>
                    </Link>
                </div>
            </div>
        </div>
    );
}
