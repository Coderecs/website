import { doc, getDoc } from "firebase/firestore";
import { getSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Layout from "../components/Layout/Layout";
import { db } from "../serverless/firebase";

function account({ loggedIn, cfhandle, user }: any) {
    return (
        <Layout>
            <div className="w-full h-full flex flex-col lg:flex-row overflow-y-scroll scrollbar-hide pb-10">
                <Head>
                    <title>{cfhandle} - Coderecs</title>
                </Head>
                <div className="w-full lg:w-1/4  h-full flex flex-col py-4">
                    <div className="flex-[0.3]  flex items-center justify-center">
                        <Image
                            src={user.titlePhoto}
                            height={200}
                            width={200}
                            className="rounded-full"
                        />
                    </div>
                    <div className="flex-[0.7] flex flex-col pl-20 py-8">
                        <div className=" flex-1 lg:p-4">
                            <p className="font-poppins text-2xl">
                                {user.handle}
                            </p>
                            {/* color: dynamic */}
                            <p className="font-bold text-sm">{user.rank}</p>

                            <p className="text-lg">
                                Rating:{" "}
                                <span className="font-bold">{user.rating}</span>
                            </p>
                            <p className="text-lg">
                                Max Rating:{" "}
                                <span className="font-bold">
                                    {user.maxRating}
                                </span>{" "}
                                ({user.maxRank})
                            </p>

                            <h2 className="text-2xl font-bold underline mt-10">
                                Personal Details
                            </h2>
                            <p>
                                {user.firstName} {user.lastName}
                            </p>
                            <p>{user.email}</p>
                            <p>
                                {user.city}, {user.country}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="w-3/4  h-full p-10">
                    <h1 className="text-4xl font-poppins font-extrabold">
                        Hello {user.firstName}!
                    </h1>
                    <h2 className="font-poppins font-light">Welcome Back!</h2>

                    <div className="w-full flex  justify-around items-center h-2/5">
                        <div className="py-5 space-y-4 text-lg font-poppins italic">
                            <p>Problems Solved : 69</p>
                            <p>Problems Attempted: 72</p>
                            <p>Unsolved Problems: 3</p>
                            <p>Number of contests: 12</p>
                        </div>
                        <div className="w-1/4 h-full grid place-items-center">
                            <div className="h-[200px] w-[200px] bg-primary rounded-full text-white flex items-center justify-center">
                                pie chart of problems
                            </div>
                        </div>
                    </div>

                    <div className="w-full h-3/5 flex flex-col md:flex-row space-x-4 items-center justify-evenly">
                        <div className="h-[90%] w-full md:w-1/2 bg-blue-100 grid place-items-center">Rating of problems</div>
                        <div className="h-[300px] w-[300px] rounded-full bg-blue-100 grid place-items-center">Topics</div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default account;

export async function getServerSideProps(context: any) {
    try {
        const { req } = context;
        const session = await getSession({ req });
        if (session) {
            const docRef = doc(db, "codeforces", session.user?.email || "a");
            const userCFHandle = await getDoc(docRef);

            if (userCFHandle.data()) {
                const cfhandle = userCFHandle.data()?.handle;
                const res = await fetch(
                    `https://codeforces.com/api/user.info?handles=${cfhandle}`
                );

                let json = await res.json();
                json = json["result"][0];

                const user = {
                    handle: json["handle"] || null,
                    email: json["email"] || null,
                    firstName: json["firstName"] || null,
                    lastName: json["lastName"] || null,
                    country: json["country"] || null,
                    city: json["city"] || null,
                    rating: json["rating"] || null,
                    rank: json["rank"] || null,
                    maxRank: json["maxRank"] || null,
                    maxRating: json["maxRating"] || null,
                    titlePhoto: json["titlePhoto"] || null,
                };

                return {
                    props: {
                        user,
                        cfhandle,
                    },
                };
            } else {
                return {
                    redirect: {
                        destination: "/auth/cfhandle",
                        permanent: false,
                    },
                };
            }
        }
    } catch (e) {
        console.error(e);
    }

    return {
        props: {
            loggedIn: false,
        },
        redirect: {
            destination: "/",
            permanent: false,
        },
    };
}
