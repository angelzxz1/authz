import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { comparePassword } from "@/lib/hashing";

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();
        const user = await db.user.findUnique({
            where: {
                email: email,
            },
        });
        if (!user) return new NextResponse("NO_EMAIL_FOUND", { status: 404 });
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch)
            return new NextResponse("PASSWORD_NOT_MATCHING", { status: 401 });

        const jsw_secret: string = process.env.JWT_SECRET
            ? process.env.JWT_SECRET
            : "";
        const token = jwt.sign({ id: user.id }, jsw_secret, {
            expiresIn: "1d",
        });
        let session = await db.session.create({
            data: {
                token: token,
                userId: user.id,
            },
        });
        const cookie = cookies();
        cookie.set("token-authz", token, { secure: true });
        return NextResponse.json(session);
    } catch (error) {
        console.log("ERROR_LOGGING_IN: ", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const cookie = cookies();
        const sessionCookie = cookie.get("token-authz");
        if (!sessionCookie)
            return new NextResponse("NO_SESSION_FOUND", { status: 404 });
        const sessionDelete = await db.session.delete({
            where: {
                token: sessionCookie.value,
            },
        });
        if (!sessionDelete)
            return new NextResponse("SESSION_NOT_FOUND", { status: 404 });
        cookie.delete("token-authz");
        return NextResponse.json({ message: "Session deleted" });
    } catch (error) {
        console.log("ERROR_LOGGING_OUT: ", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
