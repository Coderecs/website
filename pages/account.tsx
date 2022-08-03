import { doc, getDoc } from "firebase/firestore";
import { getSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Layout from "../components/Layout/Layout";
import { db } from "../serverless/firebase";

function account({ loggedIn, cfhandle, user }: any) {
    return (
        <Layout>
          <Head>
            <title>
              {cfhandle} - Coderecs
            </title>
          </Head>
            <div className="flex bg-secondary">
                <div>
                    <Image src={`${user.titlePhoto}`} className="w-[250px]" height={250} width={250} />
                    <div className="flex">
                        <a href={`https://codeforces.com/profile/${cfhandle}`}>
                            {" "}
                            {/* make this color dynamic */}
                            <p className="p-[7px]  text-blue-700 font-bold text-[15px]">
                                {user.firstName} {user.lastName}
                            </p>{" "}
                        </a>
                        <img
                            className="h-[12px] mt-[11px]"
                            src="/assets/images/Codeforces_logo.svg.png"
                        />
                    </div>
                </div>
                <div>
                    <p className="text-[40px] pl-8 pt-2 bg-heading font-poppins">
                        Hey {user.firstName} !
                    </p>
                    <p className="pl-8">
                        {" "}
                        Here is what is new while you were away
                    </p>

                    <div className="flex absolute">
                        <div className="w-[600px] bg-blue-300 h-[300px] m-[30px] mr-[0px] rounded-md shadow-xl">
                            bar graph from chrome extension : number of problems
                            vs rating (solved)
                        </div>
                        <div className="w-[500px] bg-blue-300 h-[300px] m-[30px] rounded-md shadow-xl">
                            pie chart showing number of problems solved
                            corresponding to particular tag
                        </div>
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
                        cfhandle
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
          destination: '/',
          permanent: false
        }
    };
}
