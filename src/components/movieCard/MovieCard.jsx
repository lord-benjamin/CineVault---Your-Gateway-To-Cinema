import React from 'react'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux/es/hooks/useSelector'

import "./style.css";

import Img from '../lazyLoadImage/Img'
import CircularRating from '../circularRating/CircularRating';
import Genres from '../genres/Genres';
import PosterFallback from '../../assets/no-poster.png';

const MovieCard = ({data,fromSearch,mediaType}) => {
    const {url} = useSelector((state) => state.home);
    const navigate = useNavigate();
    const posterUrl = data?.poster_path ? url.poster+data?.poster_path : PosterFallback;

    return (
        <div
        onClick={() => navigate(`/${data?.media_type || mediaType}/${data?.id}`)}
        className="w-[calc(50%-5px)] cursor-pointer sm:w-[calc(33.33%-6.66px)] md:w-[calc(25%-15px)] lg:w-[calc(20%-16px)] flex-shrink-0 mb-2 md:mb-5 hover:scale-95 duration-200">
            <div className="poster-block relative w-full aspect-[2/3] bg-cover bg-center flex items-end justify-between p-[10px]">
                <Img src={posterUrl} />
                {!fromSearch && (
                    <React.Fragment>
                        <div className="w-[30px] h-[30px] sm:w-[50px] sm:h-[50px] relative top-[25px] sm:top-[30px] text-[9px] sm:text-sm flex-shrink-0 outerRatingDiv">
                            <CircularRating rating={data?.vote_average?.toFixed(1)} />
                        </div>
                        <div className="hidden sm:flex">
                            <Genres data={data?.genre_ids?.slice(0,2)} />
                        </div>
                    </React.Fragment>
                )}
            </div>
            <div className={`text-white flex flex-col ${!fromSearch ? "mt-6 md:mt-8" : "mt-2 md:mt-4"}`}>
                <span className="text-sm sm:text-base md:text-lg mb-0 md:mb-1 title">
                    {data?.title || data?.name}
                </span>
                <span className="text-[10px] sm:text-[12px] md:text-[15px] opacity-50 leading-5">
                    {dayjs(data?.release_date || data?.first_air_date).format("MMM D, YYYY")}
                </span>
            </div>
        </div>
    )
}

export default MovieCard