import Link from "next/link";

export default function NavBar() {
    return (
        <nav className="h-[80px] bg-primary flex w-full relative font-poppins justify-between">
            <div className="flex-[0.2] flex justify-start">
                <Link href={"/"}>
                    <img
                        src="/assets/images/coderecs.svg"
                        alt=""
                        className="h-full cursor-pointer ml-[10px] mt-[10px]"
                    />
                </Link>
            </div>
            <div className="flex-[0.2]  flex items-center md:pr-4 justify-end">
                <img
                    src="/assets/images/hottie.jpg"
                    alt=""
                    className="h-[50px] w-[50px] rounded-full object-contain"
                />
            </div>
        </nav>
    );
}
