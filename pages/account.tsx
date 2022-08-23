import { doc, getDoc } from "firebase/firestore";
import { getSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Layout from "../components/Layout/Layout";
import { db } from "../serverless/firebase";
// import {ratingDictBuilder, tagsDictBuilder} from "../lib/userDetails";

function account({
    ACsubmissions,
    loggedIn,
    cfhandle,
    user,
    ratingDict,
    tagDict,
    totalSubmissions,
    UniqueProblemCount,
    ContestCount,
}: any) {
    
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

                            <h2 className="text-2xl font-bold mt-10">
                                Personal Details
                            </h2>
                            <p>
                                {user.firstName} {user.lastName}
                            </p>
                            <p>{user.email}</p>
                            <p>
                                {user.city}, {user.country}
                            </p>
                            <p>
                                from <span className="font-bold">{user.organization}</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="w-3/4  h-full p-10">
                    <h1 className="text-4xl font-poppins font-bold">
                        Hey {user.firstName}!
                    </h1>
                    <h2 className="font-poppins">Welcome Back!</h2>

                    <div className="w-full flex  justify-around items-center h-2/5">
                        <div className="py-5 space-y-4 text-lg font-poppins italic">
                            <p>Problems Solved : {ACsubmissions}</p>
                            {/* dis is correct */}
                            <p>Problems Attempted: {UniqueProblemCount}</p>
                            {/* correct count of attempted problems should be higher, some issue here */}

                            <p>Total Submissions: {totalSubmissions}</p>
                            <p>
                                Unsolved Problems:{" "}
                                {UniqueProblemCount - ACsubmissions}
                            </p>
                            {/* <p>Number of contests: {ContestCount}</p> */}
                            {/* not the number of contests taken part in
                            dis is the number of contests from which the user has attempted atleast 1 question */}
                        </div>
                        <div className="w-1/4 h-full grid place-items-center">
                            <div className="h-[200px] w-[200px] bg-primary rounded-full text-white flex items-center justify-center">
                                pie chart of problems
                            </div>
                        </div>
                    </div>

                    <div className="w-full h-3/5 flex flex-col md:flex-row space-x-4 items-center justify-evenly">
                        <div className="h-[90%] w-full md:w-1/2 bg-blue-100 grid place-items-center">
                            Rating of problems
                        </div>
                        <div className="h-[300px] w-[300px] rounded-full bg-blue-100 grid place-items-center">
                            Topics
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
                    organization: json["organization"] || null,
                };
                // workspace
                const submissionsResponse = await fetch(
                    `https://codeforces.com/api/user.status?handle=${cfhandle}`
                );
                json = await submissionsResponse.json();
                json.result?.reverse();
                let problemsList: any[] = [];

                let UniqueProblemCount = 0;
                let ContestCount = 0;
                let SET = new Set(); // unique problems irrespective of their verdict

                json.result?.forEach((problem: any) => {
                    const prob = {
                        id: problem.id || null,
                        contestId: problem.contestId || null,
                        creationTimeSeconds:
                            problem.creationTimeSeconds || null,
                        relativeTimeSeconds:
                            problem.relativeTimeSeconds || null,
                        index: problem.problem?.index || null,
                        name: problem.problem?.name || null,
                        type: problem.problem?.type || null,
                        rating: problem.problem?.rating || null,
                        tags: problem.problem?.tags || ["yet to be decided"],
                        participantType:
                            problem.author?.participantType || null,
                        ghost: problem.author?.ghost || null,
                        startTimeSeconds:
                            problem.author?.startTimeSeconds || null,
                        programmingLanguage:
                            problem.programmingLanguage || null,
                        verdict: problem.verdict || null,
                        testset: problem.testset || null,
                        passedTestCount: problem.passedTestCount || null,
                        timeConsumedMillis: problem.timeConsumedMillis || null,
                        memoryConsumedBytes:
                            problem.memoryConsumedBytes || null,
                    };
                    if (
                        prob.verdict === "OK" &&
                        !problemsList.some((problem: any): boolean => {
                            return (
                                problem.contestId === prob.contestId &&
                                problem.name === prob.name &&
                                problem.verdict === "OK"
                            );
                        })
                    ) {
                        problemsList.push(prob);
                    }
                    
                    let Contest = prob.contestId;
                    let Index = prob.index;

                    // let HASH = Contest.toString() + Index; 
                    let HASH = Index + Contest;
                    
                    SET.add(HASH);

                });

                let ratingDict: any = [];
                for (let i = 0; i < 35 - 8 + 1; i++) ratingDict.push(0);

                let tagDict: any = {};
                let mx = 0;
                let ACsubmissions = 0;
                problemsList.forEach((problem: any) => {
                    if (problem.rating != null) {
                        ratingDict[(problem.rating - 800) / 100]++;
                        ACsubmissions++;
                        mx = Math.max(
                            mx,
                            ratingDict[(problem.rating - 800) / 100]
                        );
                    }
                    problem.tags.forEach((tag: string) => {
                        if (!tagDict[tag]) tagDict[tag] = 1;
                        else tagDict[tag]++;
                    });
                });
                for(let i = 0; i < 35 - 8 + 1; i++){
                    ratingDict[i] /= mx; ratingDict[i] *= 100;
                }

                UniqueProblemCount = SET.size;

                let totalSubmissions = json.result?.length;
                
                return {
                    props: {
                        user,
                        cfhandle,
                        tagDict,
                        ratingDict,
                        totalSubmissions,
                        UniqueProblemCount,
                        ContestCount,
                        ACsubmissions
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
