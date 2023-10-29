import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export function GET() {
    const cookieStore = cookies();
    const cookie = cookieStore.set("token", "token", { secure: true });
    return NextResponse.json({ cookie });
}
