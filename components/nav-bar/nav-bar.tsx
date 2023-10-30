import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { Button } from "../ui/button";

const publicLinks = [
    {
        name: "Home",
        path: "/",
    },
    {
        name: "About",
        path: "/about",
    },
    {
        name: "Contact",
        path: "/contact",
    },
];
const privateLinks = [];

export const NavBar = () => {
    return (
        <nav className="fixed top-0 w-full flex justify-center p-2">
            <div className="flex w-5/6">
                <div className="w-1/6 flex gap-4">
                    {publicLinks.map((link, i) => {
                        return (
                            <Link href={link.path} key={i + link.name}>
                                {link.name}
                            </Link>
                        );
                    })}
                </div>
                <div className="w-4/6"></div>
                <div className="w-1/6 flex justify-end gap-4">
                    <Button>
                        <Link href="/login">Login</Link>
                    </Button>
                    <Button>
                        <Link href="/register">Register</Link>
                    </Button>
                    <ModeToggle />
                </div>
            </div>
        </nav>
    );
};
