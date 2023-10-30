import { cookies } from "next/headers";

const AboutPage = () => {
    const cookie = cookies();
    cookie.getAll();
    return (
        <div className="">
            About Page
            <div className="">
                {cookie.getAll().map((c) => {
                    return (
                        <div className="flex gap-2 border pt-4">
                            <div className="">name: {c.name}</div>
                            <div className="bg-red-800">value: {c.value}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
export default AboutPage;
