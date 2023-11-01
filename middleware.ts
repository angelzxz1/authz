import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export default async function authMiddleware(request: NextRequest) {
    // Aqui verificamos que sea un path publico
    const publicPaths = [
        "/home",
        "/login",
        "/register",
        "/api/auth/login",
        "/api/auth/register",
    ];

    // Aqui hago mi proceso de verificaion de sesion
    const cookie = cookies();
    const session = cookie.get("token-authz");
    const isPublicPath = publicPaths.includes(request.nextUrl.pathname);
    const path = request.nextUrl.pathname;
    if (session) {
        // Si existe la sesion
        const { exp } = jwt.decode(session.value) as {
            exp: number;
        }; // Decodifico el token para obtener la fecha de expiracion
        if (Date.now() >= exp * 1000) {
            // Si la fecha de expiracion es menor a la fecha actual, o sea, esta expirada
            cookie.delete("token-authz"); // Borro la cookie
            return NextResponse.redirect(new URL("/login", request.url)); // Redirecciono al login
        } else {
            // Si la fecha de expiracion es mayor a la fecha actual, o sea, no esta expirada
            if (isPublicPath) {
                // Si el path es publico
                if (path === "/login" || path === "/register") {
                    // Si el path es login o register
                    return NextResponse.redirect(
                        new URL("/dashboard", request.url)
                    ); // Redirecciono al dashboard
                } else {
                    // Si el path no es login o register
                    return NextResponse.next(); // Continuo con el proceso
                }
            } else {
                // Si el path no es publico
                return NextResponse.next(); // Continuo con el proceso
            }
        }
    } else {
        // Si no existe la sesion
        if (isPublicPath) {
            // Si el path es publico
            return NextResponse.next(); // Continuo con el proceso
        } else {
            // Si el path no es publico
            return NextResponse.redirect(new URL("/login", request.url)); // Redirecciono al login
        }
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
