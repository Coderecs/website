import { doc, getDoc } from "firebase/firestore";
import { getSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Layout from "../components/Layout/Layout";
import DailyActivityChart from "../components/Profile/DailyActivityChart";
import RatingsChart from "../components/Profile/RatingsChart";
import TagsChart from "../components/Profile/TagsChart";
import { db } from "../serverless/firebase";
import { GetServerSideProps } from 'next'
import Card from "../components/Home/Card";
// swiper importsS
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";

function account({
    ACsubmissions,
    cfhandle,
    user,
    ratingDict,
    tagDict,
    totalSubmissions,
    UniqueProblemCount,
    SerialMap,
}: any) {
    return (
        <Layout>
            <div className="w-full h-full flex flex-col lg:flex-row overflow-y-scroll scrollbar-hide pb-10">
                <Head>
                    <title>{cfhandle} - Coderecs</title>
                </Head>
                <div className="w-full lg:w-1/4  h-full flex flex-col py-4">
                    <div className="flex-[0.3] flex items-center justify-center">
                        <Image
                            src={user.titlePhoto}
                            height={200}
                            width={200}
                            className="rounded-full"
                            alt={user.name}
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
                                from{" "}
                                <span className="font-bold">
                                    {user.organization}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="w-3/4 h-fit p-10 mb-5">
                    <h1 className="text-4xl font-poppins font-bold">
                        Hey {user.firstName}!
                    </h1>
                    <h2 className="font-poppins">Welcome Back!</h2>

                    <div className="w-full flex pt-3 pb-3 justify-between">
                        <Card
                            heading="Problems Solved"
                            info={ACsubmissions}
                        />
                        <Card
                            heading="Problems Attempted"
                            info={UniqueProblemCount}
                        />
                        <Card
                            heading="Total Submissions"
                            info={totalSubmissions}
                        />
                        <Card
                            heading="Unsolved Problems"
                            info={UniqueProblemCount - ACsubmissions}
                        />
                    </div>
                    <div className="w-[95%] space-y-7">
                        <h1 className="text-xl text-right">Swipe to see your analytics</h1>
                        <Swiper
                            pagination={{
                                type: "fraction",
                            }}
                            navigation={true}
                            modules={[Pagination, Navigation]}
                            className="mySwiper"
                        // material ui defaults
                        >
                            <SwiperSlide>
                                <div className="w-full bg-primary py-12 px-12 rounded-xl flex flex-col">
                                    <RatingsChart ratings={ratingDict} />
                                    <h2 className="text-center text-white text-2xl font-popp">Questions solved as per rating</h2>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="w-[70%] flex flex-col p-8">
                                    <TagsChart tags={tagDict} />
                                    <h2 className="text-center text-black text-2xl font-popp">Questions solved as per tags</h2>
                                </div>
                            </SwiperSlide>
                            
                            <SwiperSlide>
                                <div className="w-full bg-primary py-12 px-12 rounded-xl flex flex-col space-y-4">
                                    <DailyActivityChart activity={SerialMap} />
                                    <h2 className="text-center text-white font-popp text-2xl">Your last 10 active days</h2>
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default account;

export const getServerSideProps: GetServerSideProps = async (context) => {
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

                let LatestSubmissions = new Map<string, number>(); // number of submissions corresponding to a date in DD-MM-YYYY format (type : string)

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

                    // getting the date of submission

                    let date = new Date(prob.creationTimeSeconds * 1000); // converting unix time to milliseconds.

                    let year = date.getUTCFullYear();
                    let day = date.getDate();
                    let month = date.getMonth() + 1;

                    let dateString =
                        String(day) +
                        " / " +
                        String(month) +
                        " / " +
                        String(year);

                    if (LatestSubmissions.has(dateString))
                        LatestSubmissions.set(
                            dateString,
                            LatestSubmissions.get(dateString)! + 1
                        );
                    else LatestSubmissions.set(dateString, 1);
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

                for (let i = 35 - 8; i >= 0; i--) {
                    if (ratingDict[i] == 0) ratingDict.pop();
                    else break;
                }

                UniqueProblemCount = SET.size;

                let totalSubmissions = json.result?.length;
                // let LatestSubMap = JSON.stringify(LatestSubmissions);
                let temp = Array.from(LatestSubmissions.entries());
                let arr = Array();
                for (let i = temp.length - 10; i < temp.length; i++)
                    arr[i - (temp.length - 10)] = temp[i];

                let SerialMap = JSON.stringify(arr);
                // console.log(user);
                return {
                    props: {
                        user,
                        cfhandle,
                        tagDict,
                        ratingDict,
                        totalSubmissions,
                        UniqueProblemCount,
                        ContestCount,
                        ACsubmissions,
                        SerialMap,
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
