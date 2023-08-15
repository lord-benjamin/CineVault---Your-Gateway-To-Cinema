import React, { useRef } from "react";
import {FaAngleLeft, FaAngleRight} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";
import CircularRating from "../circularRating/CircularRating.jsx";
import Genres from "../genres/Genres.jsx";

import "./style.css";

const Carousal = ({data,loading,endpoint}) => {
    const carouselContainer = useRef();
    const {url} = useSelector((state) => state.home);
    const navigate = useNavigate();
    const skIt = () => {
        return (
            <div className="w-[125px] md:w-[calc(25%-15px)] lg:w-[calc(20%-16px)] flex-shrink-0">
                <div className="rounded-[12px] w-full aspect-[2/3] skeleton"></div>
                <div className="flex flex-col mt-6 md:mt-8">
                    <div className="w-full h-[20px] mb-3 rounded-full skeleton"></div>
                    <div className="w-1/2 h-[20px] rounded-full skeleton"></div>
                </div>
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
        <div>
            <ContentWrapper>
                <div className="w-full h-full relative">
                    <div className="w-12 h-full absolute top-0 left-0 z-10 bg-black1 bg-opacity-0 hover:bg-opacity-80 hidden md:flex flex-col justify-center items-center duration-200 cursor-pointer" onClick={() => navigation("left")}>
                        <FaAngleLeft className="text-4xl text-white" />
                        {/* <div></div> */}
                    </div>
                    <div className="w-12 h-full absolute top-0 right-0 z-10 bg-black1 bg-opacity-0 hover:bg-opacity-80 hidden md:flex flex-col justify-center items-center duration-200 cursor-pointer" onClick={() => navigation("right")}>
                        <FaAngleRight className="text-4xl text-white" />
                        {/* <div></div> */}
                    </div>
                    {!loading ? (
                        <div className="carouselDiv flex gap-[10px] overflow-y-hidden mx-[-20px] py-0 px-[20px] md:gap-[20px]  md:m-0 md:p-0" ref={carouselContainer} >
                            {data?.map((item)=>{
                                const posterUrl = item?.poster_path ? url.poster+item?.poster_path : PosterFallback;
                                return (
                                    <div
                                    key={item?.id}
                                    onClick={() => navigate(`/${item?.media_type || endpoint}/${item?.id}`)}
                                    className="w-[125px] cursor-pointer md:w-[calc(25%-15px)] lg:w-[calc(20%-16px)] flex-shrink-0  hover:scale-95 duration-200">
                                        <div className="poster-block relative w-full aspect-[2/3] bg-cover bg-center flex items-end justify-between p-[10px]">
                                            <Img src={posterUrl} />
                                            <div className="w-[30px] h-[30px] md:w-[50px] md:h-[50px] relative top-[25px] md:top-[30px] text-[9px] md:text-sm flex-shrink-0 outerRatingDiv">
                                                <CircularRating rating={item?.vote_average?.toFixed(1)} />
                                            </div>
                                            <div className="hidden md:flex">
                                                <Genres data={item?.genre_ids?.slice(0,2)} />
                                            </div>
                                        </div>
                                        <div className="text-white flex flex-col mt-6 md:mt-8">
                                            <span className="text-sm md:text-xl mb-0 md:mb-1 title">
                                                {item?.title || item?.name}
                                            </span>
                                            <span className="text-[10px] md:text-[15px] opacity-50 leading-5">
                                                {dayjs(item?.release_date || item?.first_air_date).format("MMM D, YYYY")}
                                            </span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    ) : (
                        <div className="carouselDiv flex gap-[10px] overflow-y-hidden mx-[-20px] py-0 px-[20px] md:gap-[20px] md:overflow-hidden md:m-0 md:p-0">
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
    )
}

export default Carousal