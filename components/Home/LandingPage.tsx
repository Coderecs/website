import { signIn } from "next-auth/react";
import React from "react";

function LandingPage() {
    return (
        <div className="h-full w-full relative">
            <div className="h-2/5 w-4/5 mx-auto flex items-center flex-col justify-center space-y-3">
                <h1 className="font-poppins text-6xl">
                    Your <span className="text-primary">Coding</span> Recommeder
                </h1>
                <p className="font-poppins text-xl text-center">
                    Customized recommendations to solve problems on{" "}
                    <span className="text-primary">codeforces.com</span> based
                    on previous performance and submissions.
                </p>
            </div>
            <div className="hidden lg:inline-block absolute top-28 right-0">
                <img
                    src="/assets/images/landing1.svg"
                    className="h-[400px] object-cover -z-10"
                    alt=""
                />
            </div>
            <div className="p-10">
                <p className="font-poppins">To continue this journey with us.....</p>
                <button className="bg-primary text-white px-2 py-2 rounded-md" onClick={()=>signIn()}>Sign Up now!</button>
            </div>
        </div>
    );
}

export default LandingPage;
