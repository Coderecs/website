import Tile from "./Tile"
function Dashboard() {
    return (
        <div className=' w-full h-full'>
            <div className='bg-primary h-[35%] '>
                <img className="h-[100%] object-cover ml-auto" src="/assets/images/banner.png" alt="" />
            </div>
            <Tile />
            <div>
                <img className="h-[350px]" src='/assets/images/Work_7.jpg' />
            </div>
        </div>
    )
}

export default Dashboard