'use client'

import { Button, Input } from "antd";
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
        <form className="flex flex-col gap-3 items-center justify-center border rounded-md w-screen h-screen" onSubmit={handleSubmit}>
            <label className="flex flex-col card gap-3 items-center w-3/4">
                <h1 className="text-xl font-bold    ">Test User ID: </h1>
                <Input type="text" placeholder="Enter the test UserID" className="w-1/2" name="userId"/>
            </label>
            <Button type="primary" htmlType="submit">
                Submit
            </Button>
        </form>
    )
}