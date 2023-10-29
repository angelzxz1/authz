import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export default function authMiddleware(request: NextRequest) {
    // Aqui verificamos que sea un path publico
    const publicPaths = ["/home", "/login", "/register"];
    const isPublicPath = publicPaths.includes(request.nextUrl.pathname);
    if (isPublicPath) {
        console.log("isPublicPath: ", isPublicPath);
        return NextResponse.next();
    }
    // Aqui hago mi proceso de verificaion de sesion
    const cookies = request.cookies;
    console.log("cookies: ", cookies);
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
