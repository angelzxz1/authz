import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();
    } catch (error) {
        console.log("ERROR_CREATE_SESSION: ", error);
    }
}
