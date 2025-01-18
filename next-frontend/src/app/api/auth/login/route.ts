import SpringBase from "@/lib/springbase/springbase";

export async function POST(req: Request) {
    const { email, password, url } = await req.json();

    const springbase = new SpringBase(process.env.backend_api_url || "http://localhost:8080");
  
    const res = await springbase.collection("users").authWithPassword(email, password);
    if(res && res.token){
        const headers = new Headers();
        headers.set("Set-Cookie", `token=${res.token}; Path=/; SameSite=Strict; HttpOnly;`);
        return new Response(JSON.stringify({
            message: "Success",
            token: res.token
        }), { status: 200, headers, statusText: "OK" });
    }

    return new Response("Failed", { status: 401 });
  }
  