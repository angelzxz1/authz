import { db } from "./db";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export const initUser = async () => {
    const cookie = cookies();
    const session = cookie.get("token-authz");
    if (!session) return null;
    const { id } = jwt.decode(session.value) as {
        id: string;
    };
    const user = await db.user.findUnique({
        where: {
            id: id,
        },
    });
    return user;
};
