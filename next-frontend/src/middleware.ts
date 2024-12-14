import { NextRequest, NextResponse } from "next/server";
import SpringBase from "./lib/springbase/springbase";

export function middleware(req: NextRequest){
    const { pathname } = req.nextUrl;
    
    const token = req.cookies.get("token");
    const springbase = new SpringBase("http://localhost:8080");

    if(token){
        springbase.authStore.loadFromToken(token.value);
    }

    const LoginRequiredPaths = ['/subs'];

    const res = NextResponse.next();

    for(const path of LoginRequiredPaths){
        if(pathname.startsWith(path)){
            if(!springbase.authStore.isValid){
                return NextResponse.redirect(new URL("/auth/login", req.url));
            }
        }
    }

    if(pathname.startsWith("/auth")){
        if(springbase.authStore.isValid){
            const referer = req.headers.get("referer");
            if(referer && referer.startsWith("/auth")){
                return NextResponse.redirect(new URL("/", req.url));
            }
            return NextResponse.redirect(new URL(referer || "/", req.url));
        }
    }
    
    return res;
}

export const config = {
    matcher: [
        "/:path*"
    ]
}