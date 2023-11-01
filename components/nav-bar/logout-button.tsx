"use client";

import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";

export const LogOutButton = () => {
    const router = useRouter();
    const logOut = async () => {
        try {
            const response = await axios.delete("/api/auth/login");
            console.log(response);
            router.refresh();
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Button
            variant="outline"
            className="bg-transparent border-0"
            onClick={logOut}
        >
            <LogOut />
        </Button>
    );
};
