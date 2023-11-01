// "use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { cookies } from "next/headers";
import DeleteButton from "./delete-button";

const DashboardPage = () => {
    const cookie = cookies();
    return (
        <div className="flex flex-col">
            <div className="flex flex-wrap gap-4">
                {cookie.getAll().map((item, index) => {
                    return (
                        <div key={index} className="overflow-auto">
                            {item.name}
                        </div>
                    );
                })}
            </div>
            <div className="">
                <DeleteButton />
            </div>
        </div>
    );
};
export default DashboardPage;

// token
// token-553da526-960f-4fba-9f2a-2effdc2878b6
// token-authz
