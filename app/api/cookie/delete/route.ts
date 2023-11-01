import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const cookie = cookies();
        cookie.delete("token-authz");
        cookie.delete("token");
        cookie.delete("token-553da526-960f-4fba-9f2a-2effdc2878b6");
        console.log("Removed cookies");
        return NextResponse.json({ message: "All good!" });
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
