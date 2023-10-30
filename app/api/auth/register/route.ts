import { db } from "@/lib/db";
import { hashPassword } from "@/lib/hashing";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { email, password, name } = await req.json();
        const user = await db.user.findUnique({
            where:{
                email:email
            }
        })
        if(user) return new NextResponse("EMAIL_TAKEN", { status: 409 });
        const hasedPassword = await hashPassword(password); 
        const newUser = await db.user.create({
            data:{
                email:email,
                password:hasedPassword,
                name: name
            }
        })
        
        return NextResponse.json(newUser);
    } catch (error) {
        console.log("ERROR_REGISTERING: ", error);
        return new NextResponse("Internal Error", { status: 500 }); 
    }
}