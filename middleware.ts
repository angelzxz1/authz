import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers"
import jwt from 'jsonwebtoken'

// This function can be marked `async` if using `await` inside
export default function authMiddleware(request: NextRequest) {
    // Aqui verificamos que sea un path publico
    const publicPaths = ["/home", "/login", "/register", "/api/auth/login"];
    const isPublicPath = publicPaths.includes(request.nextUrl.pathname);
    if (isPublicPath) {
        console.log("isPublicPath: ", isPublicPath);
        return NextResponse.next();
    }
    // Aqui hago mi proceso de verificaion de sesion
    const cookie = cookies()
    const session = cookie.get('token-authz')
    if(!session) return NextResponse.redirect(new URL('/login', request.url))
    
    const {exp} = jwt.decode(session.value) as {exp:number}
    if (Date.now() >= exp * 1000){
        cookie.delete('token-authz')
        return NextResponse.redirect(new URL('/login', request.url))
    }
    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
