import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function NavBar() {
    const { data: session } = useSession();
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
                {!session ? (
                    <button className="text-white" onClick={() => signIn()}>Login</button>
                ) : (
                    <>
                        <Link href={"/account"}>
                            <Image
                                src={session.user?.image!}
                                alt={session.user?.name!}
                                height={50}
                                width={50}
                                className="h-[50px] w-[50px] rounded-full object-contain cursor-pointer"
                            />
                        </Link>
                        <button className="text-white ml-2" onClick={() => signOut()}>Sign Out</button>
                    </>
                )}
            </div>
        </nav>
    );
}
