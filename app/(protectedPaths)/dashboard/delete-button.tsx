"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";

const DeleteButton = () => {
    const router = useRouter();
    const deleteCookie = async () => {
        try {
            await axios.get("/api/cookie/delete");
            console.log("All good!");
            router.refresh();
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Button onClick={deleteCookie}>
            <Trash color="red" />
        </Button>
    );
};

export default DeleteButton;
