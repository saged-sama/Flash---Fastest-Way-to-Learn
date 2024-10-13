'use client';
import { useRouter } from "next/navigation";

export default function CreateNewSession() {
    const router = useRouter();

    async function createNewSession(){
        'use client';
        let sessionId = "1234";
        // Create a new session
        router.push(`/session/${sessionId}`);
    }

    return (
        <div className="flex flex-col">
            <button onClick={createNewSession}>
                Create New
            </button>
        </div>
  );
}