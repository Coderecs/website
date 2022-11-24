import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./CSS/styles.css";
import "./CSS/Info.css";
import { Pagination, Navigation } from "swiper";
import Card from "./Card";
type Props={
    heading: string;
    info: number
}

function Charts(props: Props[]) {
    let x = 0;
    return (
        <Swiper
            pagination={{
                type: "fraction",
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper"
            // material ui defaults
        >
            {props.map((put)=>{
                // pass in unique key prop to avoid re-rendering
                // render the info inside the slider
                return(<SwiperSlide key={x++}><div className="Info_text"><Card {...put}/></div></SwiperSlide>)
            })}
        </Swiper>
        
    )
}
export default Charts; 