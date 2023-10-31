import { cookies } from "next/headers";
import jwt from "jsonwebtoken";


const isTokenExpired = (token: string) => {
    const {exp} = jwt.decode(token) as {exp: number};
    return Date.now() >= exp * 1000;
}

const AboutPage = () => {
    const cookie = cookies();
    cookie.getAll();
    return (
        <div className="">
            About Page
            <div className="">
                {cookie.getAll().map((c) => {
                    return (
                        <div className="flex gap-2 border pt-4" key={c.name}>
                            <div className="overflow-auto">name: {c.name}</div>
                            <div className="overflow-auto">Expired?: {isTokenExpired(c.value)?"Yes":"No"}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
export default AboutPage;
