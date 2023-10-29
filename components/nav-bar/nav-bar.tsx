import { ModeToggle } from "./mode-toggle";

export const NavBar = () => {
    return (
        <nav className="fixed top-0 w-full flex items-center">
            <div className="flex w-5/6">
                <div className="w-1/6"></div>
                <div className="w-4/6"></div>
                <div className="w-1/6 flex justify-end">
                    <ModeToggle />
                </div>
            </div>
        </nav>
    );
};
