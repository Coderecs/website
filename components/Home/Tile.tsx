import { GoLink } from "react-icons/go"
function Tile() {
    const problem = "A charmi loves momina";
    const contest = "#803 Div. 2";
    const link = "https://codeforces.com";
    return (
        <div className="w-[15%] rounded-md p-[7px] h-[140px] relative shadow-xl hover:bg-[#F5F5F5]">
            <a href={link}>
                <p className="font-poppins font-[500]">{problem}</p>
                <p className="font-poppins font-[400]">{contest}</p>
                <p className="bottom-3 right-3 absolute"><GoLink /></p>
            </a>
        </div>
    )
}

export default Tile