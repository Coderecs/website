import { GoLink } from "react-icons/go";
import { Question } from "../../typings/Question";

function Tile({ problem, contest, link }: Question) {
    return (
        <div className="w-full bg-white rounded-md hover:bg-[#F5F5F5]">
            <a href={link} target="_blank" referrerPolicy="no-referrer">
                <div className="w-full p-4 h-[140px] relative shadow-xl ">
                    <p className="font-poppins font-[500]">{problem}</p>
                    <p className="font-poppins font-[400] text-sm">{contest}</p>
                    <p className="bottom-3 right-3 absolute">
                        <GoLink />
                    </p>
                </div>
            </a>
        </div>
    );
}

export default Tile;
