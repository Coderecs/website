type Props={
    heading: string;
    info: number
}
const Card = (props: Props) => {
    return (
        <div className= "rounded-md hover:bg-[#e1e8f4] p-3 flex flex-col justify-between content-center h-fit w-60">
            <p className="font-poppins mb-2 self-center">{props.heading}</p>
            <h2 className="text-5xl w-min self-center">{props.info}</h2>
        </div>
    )
}
export default Card;