import type { NextPage } from "next";
import { getSession } from "next-auth/react";
import Dashboard from "../components/Home/Dashboard";
import Layout from "../components/Layout/Layout";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../serverless/firebase";
import LandingPage from "../components/Home/LandingPage";

const Home: NextPage = ({ loggedIn, cfhandle, userRating }: any) => {
    return (
        <Layout title="Coderecs">
            {loggedIn ? <Dashboard rating={userRating} /> : <LandingPage />}
        </Layout>
    );
};

export default Home;

export async function getServerSideProps(context: any) {
    try {
        const { req } = context;
        const session = await getSession({ req });
        if (session) {
            const docRef = doc(db, "codeforces", session.user?.email!);
            const userCFHandle = (await getDoc(docRef)).data()?.handle;
            const userRating = (
                await (
                    await fetch(
                        `https://codeforces.com/api/user.info?handles=${userCFHandle}`
                    )
                ).json()
            )["result"][0]["rating"];
            if (userCFHandle) {
                return {
                    props: {
                        cfhandle: userCFHandle,
                        loggedIn: true,
                        userRating: userRating > 800 ? Math.floor(Number(userRating)/100)*100 : 800,
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
    };
}
