import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export function GET() {
    return NextResponse.json({ message: "test" });
}
