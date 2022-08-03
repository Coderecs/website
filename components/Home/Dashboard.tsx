import { Question } from "../../typings/Question";
import Tile from "./Tile";
function Dashboard() {
    const questions = [
        {
            problem: "Problem name",
            contest: "Contest Id",
            link: "https://codeforces.com/",
        },
        {
            problem: "Problem name",
            contest: "Contest Id",
            link: "https://codeforces.com/",
        },
        {
            problem: "Problem name",
            contest: "Contest Id",
            link: "https://codeforces.com/",
        },
        {
            problem: "Problem name",
            contest: "Contest Id",
            link: "https://codeforces.com/",
        },
        {
            problem: "Problem name",
            contest: "Contest Id",
            link: "https://codeforces.com/",
        },
        {
            problem: "Problem name",
            contest: "Contest Id",
            link: "https://codeforces.com/",
        },
        {
            problem: "Problem name",
            contest: "Contest Id",
            link: "https://codeforces.com/",
        },
        {
            problem: "Problem name",
            contest: "Contest Id",
            link: "https://codeforces.com/",
        },
        {
            problem: "Problem name",
            contest: "Contest Id",
            link: "https://codeforces.com/",
        },
        {
            problem: "Problem name",
            contest: "Contest Id",
            link: "https://codeforces.com/",
        },
        {
            problem: "Problem name",
            contest: "Contest Id",
            link: "https://codeforces.com/",
        },
        {
            problem: "Problem name",
            contest: "Contest Id",
            link: "https://codeforces.com/",
        },
    ];
    return (
        <div className="w-full h-full relative overflow-scroll scrollbar-hide before:h-[300px] before:bg-primary before:content-[''] before:w-full before:absolute before:top-0 before:left-0 before:-z-10">
            <div className="absolute top-10 right-0 -z-[5] h-60">
                <img
                    src="/assets/images/banner1.png"
                    alt=""
                    className="h-full object-cover"
                />
            </div>
            <div className="bottom-40 left-0 -z-[5] h-60 absolute">
                <img
                    src="/assets/images/banner2.png"
                    alt=""
                    className="h-full object-cover"
                />
            </div>
            <div className="w-[70%] h-full mx-auto py-5 px-10">
                <h1 className="font-poppins text-lg text-white">
                    Recommended Problems
                </h1>
                <p className="text-white text-sm font-light hidden md:inline-flex">Following problems are recommended according to the previous performance on codeforces</p>
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-5 py-10 ">
                    {questions.map((question: Question) => {
                        const { problem, contest, link } = question;
                        return (
                            <Tile
                                problem={problem}
                                contest={contest}
                                link={link}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
