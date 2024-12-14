import SpringBase from "@/lib/springbase/springbase";

export async function POST(req: Request){
    const user = await req.formData();

    const springbase = new SpringBase("http://localhost:8080");
    const res = await springbase.collection("users").create(user);

    if(res){
        return new Response(JSON.stringify(res), { status: 200, statusText: "OK" });
    }

    return new Response("Failed", { status: 401 });
}