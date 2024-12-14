export function GET(){
    const headers = new Headers();
    headers.set("Set-Cookie", `token=; Path=/; SameSite=Strict; HttpOnly; Expires=${new Date(0).toUTCString()};`);

    return new Response(JSON.stringify({
        message: "Success"
    }), { status: 200, headers, statusText: "OK" });
}