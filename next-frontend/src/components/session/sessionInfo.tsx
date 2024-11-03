import { springbase } from "@/lib/springbase";

export default function SessionInfo({ session }: { session: any }) {
    return (
        <div className="flex flex-col md:flex-row items-center md:items-start gap-5 p-4 bg-white shadow-md rounded-lg max-w-4xl mx-auto">
            <figure className="h-32 w-32 md:h-40 md:w-40 flex-shrink-0">
                <img 
                   // src={`${springbase.collection("users").file(session.owner.id, session.owner.avatar)}`} 
                   src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXJr-fGkiy1DE5A0JNOkcmCNGcXuQXdzENZA&s"
            
                    alt={`${session.owner.avatar}`} 
                    className="w-full h-full rounded-full object-cover" 
                />
            </figure>
            <div className="flex flex-col gap-3 text-center md:text-left">
                <h1 className="text-xl md:text-2xl font-bold text-teal-800">{session.title}</h1>
                <p className="text-md md:text-lg text-teal-600 font-medium">{session.owner.name}</p>
                <p className="text-sm md:text-base text-gray-600">{session.description}</p>
            </div>
        </div>
    );
}
