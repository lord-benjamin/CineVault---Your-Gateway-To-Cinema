
import React, {useRef} from "react";
import {FaAngleLeft, FaAngleRight} from "react-icons/fa";
import { useSelector } from "react-redux/es/hooks/useSelector";

import "./style.css";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Img from "../../../components/lazyLoadImage/Img";
import PosterFallback from "../../../assets/no-poster.png";

const PosterSection = ({ data, loading }) => {
    const carouselContainer = useRef();

    const {url} = useSelector((state) => state.home);

    const skIt = () => {
        return (
            <div className="w-[125px] md:w-[calc(25%-15px)] lg:w-[calc(20%-16px)] flex-shrink-0">
                <div className="rounded-[12px] w-full aspect-[2/3] skeleton"></div>\
            </div>
        )
    }

    const navigation = (direction)=>{
        const container = carouselContainer.current;
        const scrollAmount = direction==="left" ? container.scrollLeft-(container.offsetWidth+20) : container.scrollLeft+(container.offsetWidth+20);
        container.scrollTo({
            left: scrollAmount,
            behavior: "smooth",
        })
    }

    return (
        <div className="relative mb-8 md:mb-16">
            <ContentWrapper>
                <div className="text-3xl md:text-4xl text-white font-bebas tracking-wider mb-4">Posters</div>
                <div className="w-full h-full relative">
                    {data?.length!==0 && <div>
                        <div className="w-12 h-full absolute top-0 left-0 z-10 bg-black1 bg-opacity-0 hover:bg-opacity-80 hidden md:flex flex-col justify-center items-center duration-200 cursor-pointer" onClick={() => navigation("left")}>
                            <FaAngleLeft className="text-4xl text-white" />
                        </div>
                        <div className="w-12 h-full absolute top-0 right-0 z-10 bg-black1 bg-opacity-0 hover:bg-opacity-80 hidden md:flex flex-col justify-center items-center duration-200 cursor-pointer" onClick={() => navigation("right")}>
                            <FaAngleRight className="text-4xl text-white" />
                        </div>
                    </div>}
                    {!loading ? (
                        <div className="imageDiv flex gap-[10px] overflow-x-auto mx-[-20px] py-0 px-[20px] md:gap-[20px] md:m-0 md:p-0" ref={carouselContainer}>
                        {/* {console.log(data)} */}
                            {data?.length===0 ? <div className="text-white text-sm md:text-base italic opacity-75">No Posters</div> : data?.map((image,idx) => {
                                {/* console.log(video) */}
                                let imgUrl = (image?.file_path) ? url.poster+image?.file_path : PosterFallback;
                                return (
                                    <div key={idx} className="poster-block relative w-[125px] md:w-[calc(25%-15px)] lg:w-[calc(20%-16px)] flex-shrink-0 aspect-[2/3] bg-cover bg-center flex items-end justify-between p-[10px]">
                                        <Img src={imgUrl} />
                                    </div>
                                )
                            })}
                        </div>
                    ) : (
                        <div className="imageDiv flex gap-[10px] overflow-x-auto mx-[-20px] py-0 px-[20px] md:gap-[20px] md:m-0 md:p-0">
                            {skIt()}
                            {skIt()}
                            {skIt()}
                            {skIt()}
                            {skIt()}
                            {skIt()}
                        </div>
                    )}
                </div>
            </ContentWrapper>
        </div>
    );
};

export default PosterSection;