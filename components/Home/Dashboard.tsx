/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { Question } from "../../typings/Question";
import Tile from "./Tile";
function Dashboard({ rating }: { rating: number }) {
    const [questions, setQuestions] = useState<Question[]>([]);
    function shuffle(array: any[]) {
        let currentIndex = array.length, randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex != 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        return array;
    }
    const getData = async () => {
        const res = await fetch("data/data.json");
        const json = await res.json();

        const ques = json["questions"].map((question: any) => {
            const ans = {
                problem: question.name,
                contestId: question.contestId,
                rating: question.rating,
                link: `https://codeforces.com/problemset/problem/${question.contestId}/${question.index}`,
            };
            return ans;
        });
        // 12 questions
        // 1 - X, 2 - X+100, 6- X+200, 2* [X+300], 1*[X+400]
        const same = ques.filter((qu: Question) => qu.rating === rating);
        const plus100 = ques.filter((qu: Question) => qu.rating === rating - 100);
        const plus200 = ques.filter((qu: Question) => qu.rating === rating - 200);
        const plus300 = ques.filter((qu: Question) => qu.rating === rating - 300);
        const plus400 = ques.filter((qu: Question) => qu.rating === rating - 400);

        console.log(same)

        const Ques = [];
        for (let i = 0; i < 12; i++) {
            if (i == 0) {
                Ques.push(same[Math.floor(Math.random() * 200)]);
            }
            else if (i < 3) {
                Ques.push(plus100[Math.floor(Math.random() * 200)]);
            }
            else if (i < 8) {
                Ques.push(plus200[Math.floor(Math.random() * 200)]);
            }
            else if (i < 10) {
                Ques.push(plus300[Math.floor(Math.random() * 200)]);
            }
            else {
                Ques.push(plus400[Math.floor(Math.random() * 200)]);
            }
        }
        setQuestions(shuffle(Ques));
    };

    useEffect(() => {
        getData();
    }, []);

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
                <p className="text-white text-sm font-light hidden md:inline-flex">
                    Following problems are recommended according to the previous
                    performance on codeforces
                </p>
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-5 py-10 ">
                    {
                        questions.map((question: Question, i) => {
                            if (!question) return null;
                            const { problem, contest, link, rating } = question;
                            return (
                                <Tile
                                    key={i}
                                    problem={problem}
                                    contest={contest}
                                    link={link}
                                    rating={rating}
                                />
                            );
                        })}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
