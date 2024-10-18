'use client'

import { useRouter } from "next/navigation";

export default function TesterUesr() {
    const router = useRouter();

    const handleSubmit = async(event: any) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const userId: string | null = formData.get("userId") as string | null;
        if(userId){
            localStorage.setItem("userId", userId);
            router.push("/");
        }
        else{
            alert("Something is wrong");
        }
    }

    return (
        <form className="flex flex-col items-center justify-center border rounded-md w-screen h-screen" onSubmit={handleSubmit}>
            <label className="flex card gap-3 items-center w-3/4">
                <h1 className="text-2xl">Test User ID: </h1>
                <input type="text" placeholder="Enter the test UserID" className="input input-bordered shadow-md shadow-blue-300 input-md w-1/2" name="userId"/>
            </label>
            <button>
                Submit
            </button>
        </form>
    )
}