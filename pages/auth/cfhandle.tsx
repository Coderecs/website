import { addDoc, doc, setDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { db } from "../../serverless/firebase";

function cfhandle() {
    const [handle, setHandle] = useState("");
    const router = useRouter();
    const { data: session } = useSession();
    const submitHandle = async () => {
        if (!handle) {
            return;
        }
        await setDoc(
            doc(db, "codeforces", session?.user?.email || "a"),
            {
                handle,
            },
            {
                merge: true,
            }
        );
        router.push("/");
    };
    return (
        <Layout>
          <Head>
            <title>Enter your Handle | Coderecs</title>
          </Head>
            <div className="h-full w-full grid place-items-center">
                <div className="h-[50%] w-[40%] bg-primary rounded-xl p-5 relative">
                    <h1 className="text-center text-2xl text-white absolute top-10 left-1/2 -translate-x-[50%]">
                        Enter your{" "}
                        <a
                            href="https://codeforces.com/"
                            className="text-heading"
                        >
                            codeforces
                        </a>{" "}
                        handle
                    </h1>
                    <input
                        type="text"
                        value={handle}
                        onChange={(e) => setHandle(e.target.value)}
                        className="w-[70%] px-3 py-2 rounded-lg outline-none absolute top-1/2 left-1/2 -translate-x-[50%]"
                    />
                    <button
                        onClick={submitHandle}
                        className="absolute bottom-10 left-1/2 -translate-x-[50%] bg-white px-4 py-2 rounded-md"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </Layout>
    );
}

export default cfhandle;
