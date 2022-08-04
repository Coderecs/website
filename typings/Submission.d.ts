import { Problem } from "./Problem";

export interface Submission {
    id: number,
    problem: Problem,
    verdict: string,
    programmingLanguage: string,
    creationTimeSeconds: number,
    relativeTimeSeconds: number
}