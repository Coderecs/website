import Link from "next/link";
import { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

export default function NavBar() {
    const [navbar, setNavbar] = useState(false);
    const toggle = () => {
        setNavbar(!navbar);
    };
    return (
        <nav className="h-[80px] bg-primary flex w-full relative font-poppins justify-between">
            <div className="flex-[0.2]">
                <Link href={"/"}>
                    <img
                        src="/assets/images/coderecs.svg"
                        alt=""
                        className="h-full w-full cursor-pointer"
                    />
                </Link>
            </div>
            <div className="flex-[0.2]  flex items-center justify-center md:pr-4">
                <img
                    src="/assets/images/user.png"
                    alt=""
                    className="h-[50px] w-[50px] rounded-full object-contain"
                />
            </div>
        </nav>
    );
}
