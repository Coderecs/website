import React from "react";
import { signIn, getSession, getProviders } from "next-auth/react";
import { SiGithub, SiGoogle } from "react-icons/si";
import { url } from "../../lib/url";
import Head from "next/head";

export default function Login({ providers, callbackUrl }: any) {
    return (
        <main className="flex flex-col items-center h-screen space-y-8 justify-center text-black">
            <Head>
                <title>Sign In | Coderecs</title>
            </Head>
            <div className="flex flex-col items-center space-y-5">
                <img
                    src="/assets/images/coderecs.png"
                    alt="microsoft logo"
                    className="w-32 h-32"
                />
                <div className="text-3xl">
                    <p className="inline"> Sign in to </p>
                    <p className="font-bold text-primary inline">Coderecs</p>
                </div>
            </div>
            <div className="p-5 flex flex-col space-y-5">
                <div className="flex flex-col space-y-4">
                    <button
                        className="bg-primary font-semibold text-white text-base px-3 py-2 hover:opacity-90 focus:outline-none focus:ring-2 ring-blue-300 flex flex-row items-center justify-center rounded-lg"
                        onClick={() =>
                            signIn(providers.google.id, { callbackUrl })
                        }
                    >
                        <SiGoogle className="text-white w-5 h-5 mr-2" />
                        Sign in with Google
                    </button>
                    <button
                        className="bg-primary font-semibold text-white text-base px-3 py-2 hover:opacity-90 focus:outline-none focus:ring-2 ring-blue-300 flex flex-row items-center justify-center rounded-lg"
                        onClick={() =>
                            signIn(providers.github.id, { callbackUrl })
                        }
                    >
                        <SiGithub className="text-white w-5 h-5 mr-2" />
                        Sign in with Github
                    </button>
                </div>
            </div>
        </main>
    );
}

export async function getServerSideProps(context: any) {
    try {
        const { req } = context;
        const session = await getSession({ req });
        if (session) {
            return {
                redirect: {
                    destination: "/",
                    permanent: false,
                },
            };
        }
    } catch (e) {
        console.error(e);
    }

    const providers = await getProviders();

    return {
        props: { providers, callbackUrl: `${url.client}` },
    };
}
