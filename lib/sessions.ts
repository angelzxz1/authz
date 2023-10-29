import jwt from "jsonwebtoken";
import { db } from "./db";

export const SessionVerifier = (token: string) => {
    try {
        const secret = process.env.JWT_SECRET ? process.env.JWT_SECRET : "";
        const payload = jwt.verify(token, secret);
    } catch (error) {
        console.log("Error verifying session: ", error);
    }
};

interface SessionCreatorProps {
    id: number;
    email: string;
}

export const SessionCreator = async ({ id, email }: SessionCreatorProps) => {
    try {
        const secret = process.env.JWT_SECRET ? process.env.JWT_SECRET : "";
        const token = jwt.sign(
            {
                email,
            },
            secret,
            {
                expiresIn: process.env.JWT_EXPIRES_IN,
            }
        );
        console.log("token: ", token);
        const session = await db.session.create({
            data: {
                userId: id,
                token: token,
            },
        });
        return session;
    } catch (error) {
        console.log("Error creating session: ", error);
    }
};
