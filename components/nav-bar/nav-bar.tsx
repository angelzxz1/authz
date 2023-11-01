import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { Button } from "../ui/button";
import { initUser } from "@/lib/init-user";
import axios from "axios";
import { NextResponse } from "next/server";
import { LogOutButton } from "./logout-button";

type LinksArrayType = {
    name: string;
    path: string;
};

const publicLinks: LinksArrayType[] = [
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
const privateLinks: LinksArrayType[] = [
    {
        name: "Dashboard",
        path: "/dashboard",
    },
    {
        name: "Add",
        path: "/about",
    },
    {
        name: "Edit Profile",
        path: "/edit-profile",
    },
];

export const NavBar = async () => {
    const user = await initUser();

    return (
        <nav className="fixed top-0 w-full flex justify-center p-2">
            <div className="flex w-5/6">
                <div className="w-1/6 flex gap-4">
                    {user
                        ? privateLinks.map((link, i) => {
                              return (
                                  <Link href={link.path} key={i + link.name}>
                                      {link.name}
                                  </Link>
                              );
                          })
                        : publicLinks.map((link, i) => {
                              return (
                                  <Link href={link.path} key={i + link.name}>
                                      {link.name}
                                  </Link>
                              );
                          })}
                </div>
                <div className="w-4/6"></div>
                <div className="w-1/6 flex justify-end gap-4">
                    {user ? (
                        <LogOutButton />
                    ) : (
                        <>
                            <Button>
                                <Link href="/login">Login</Link>
                            </Button>
                            <Button>
                                <Link href="/register">Register</Link>
                            </Button>
                        </>
                    )}

                    <ModeToggle />
                </div>
            </div>
        </nav>
    );
};
