export function GET() {
    const headers = new Headers();
    headers.set("Set-Cookie", `token=; Path=/; SameSite=Strict; HttpOnly; Expires=${new Date(0).toUTCString()};`);
    headers.set("Location", "/");

    return new Response(null, { status: 307, headers });
}