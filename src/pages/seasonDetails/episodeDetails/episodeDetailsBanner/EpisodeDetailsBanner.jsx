import React,{useState} from 'react'
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import ContentWrapper from "../../../../components/contentWrapper/ContentWrapper.jsx";
import useFetch from '../../../../hooks/useFetch';
import CircularRating from '../../../../components/circularRating/CircularRating.jsx';
import Img from "../../../../components/lazyLoadImage/Img.jsx";
import PosterFallback from "../../../../assets/no-poster.png"

// import "./style.css";

const EpisodeDetailsBanner = () => {
    const {tvId,seasonNumber,episodeNumber} = useParams();
    const {data,loading} = useFetch(`/tv/${tvId}/season/${seasonNumber}/episode/${episodeNumber}`)
    // console.log(data);

    const {url} = useSelector((state) => state.home);

    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes/60);
        const mins = totalMinutes%60;
        return `${hours}H${mins > 0 ? ` ${mins}M` : ""}`;
    }

    return (
        <div className='w-full bg-black1 pt-28 mb-12 md:mb-16 md:pt-36 min-h-[700px] relative'>
            {!loading ? (
                <>
                    {!!data && (
                        <React.Fragment>
                            <ContentWrapper>
                                <div className="flex relative flex-col gap-4 md:gap-8 md:flex-row">
                                    <div className='flex-shrink-0'>
                                        {data?.still_path ? (
                                            <Img className="w-full block aspect-[2/3] rounded-[12px] md:max-w-[350px]" src={url.profile+data?.still_path} />
                                        ) : (
                                            <Img className="w-full block aspect-[2/3] rounded-[12px] md:max-w-[350px]" src={PosterFallback} />
                                        )}
                                    </div>
                                    <div className="text-white w-full">
                                        <div className='text-xl md:text-5xl mb-4 md:mb-8'>
                                            {`${data?.title || data?.name}${(data?.release_date || data?.air_date) ? " · "+dayjs(data?.release_date || data?.air_date).format("YYYY") : ""}`}
                                        </div>
                                        <div className="flex items-center space-x-4 mb-6">
                                            <div className='text-md md:text-xl w-[60px] md:w-[80px] h-[60px] md:h-[80px] flex-shrink-0'>
                                                <CircularRating rating={data?.vote_average.toFixed(1)} />
                                            </div>
                                        </div>
                                        {data?.overview && (
                                            <div className='mb-4 md:mb-6'>
                                                <div className='text-md md:text-xl mb-2 md:mb-1'>Overview</div>
                                                <div className='text-xs md:text-sm opacity-70 text-justify'>
                                                    {data?.overview}
                                                </div>
                                            </div>
                                        )}
                                        {(data?.season_number || data?.episode_number || data?.runtime) && (
                                            <div className='border-b border-white border-opacity-30 flex items-baseline justify-between space-x-4 py-2 md:py-4 px-0'>
                                                <div className='flex text-xs md:text-base gap-y-0 gap-x-2' style={{flexFlow: "row wrap"}}>
                                                    <span className='font-bold'>Season:</span>
                                                    <span className='opacity-70'>
                                                        {data?.season_number}
                                                    </span>
                                                </div>
                                                <div className='flex text-xs md:text-base gap-y-0 gap-x-2' style={{flexFlow: "row wrap"}}>
                                                    <span className='font-bold'>Episode:</span>
                                                    <span className='opacity-70'>
                                                        {data?.episode_number}
                                                    </span>
                                                </div>
                                                {!data?.runtime ? null : (
                                                    <div className='flex text-xs md:text-base gap-y-0 gap-x-2' style={{flexFlow: "row wrap"}}>
                                                        <span className='font-bold'>Runtime:</span>
                                                        <span className='opacity-70'>
                                                            {toHoursAndMinutes(data?.runtime)}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                        {!data?.air_date ? null : (
                                            <div className='border-b border-white border-opacity-30 flex items-baseline justify-between space-x-4 py-2 md:py-4 px-0'>
                                                <div className='flex text-xs md:text-base gap-y-0 gap-x-2' style={{flexFlow: "row wrap"}}>
                                                    <span className='font-bold'>Release Date:</span>
                                                    <span className='opacity-70'>
                                                        {dayjs(data?.air_date).format("D MMMM, YYYY")}
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </ContentWrapper>
                        </React.Fragment>
                    )}
                </>
            ) : (
                <div className="flex relative flex-col md:flex-row gap-4 md:gap-8">
                    <ContentWrapper>
                        <div className='h-full w-full flex flex-col md:flex-row gap-8'>
                        <div className="flex-shrink-0 w-full block rounded-[12px] aspect-[2/3] md:max-w-[350px] skeleton"></div>
                            <div className="w-full">
                                <div className="w-full md:w-3/4 h-[30px] md:h-[40px] mb-4 md:mb-8 rounded-full skeleton"></div>
                                <div className="w-[60px] md:w-[80px] h-[60px] md:h-[80px] mb-4 md:mb-8 rounded-full skeleton"></div>
                                <div className="w-[150px] h-[25px] md:h-[30px] rounded-full mb-3 skeleton"></div>
                                <div className="w-full h-[20px] md:h-[25px] rounded-full mb-3 skeleton"></div>
                                <div className="w-full h-[20px] md:h-[25px] rounded-full mb-3 skeleton"></div>
                                <div className="w-full h-[20px] md:h-[25px] rounded-full mb-8 skeleton"></div>
                                <div className="w-full h-[20px] md:h-[25px] rounded-full mb-4 skeleton"></div>
                                <div className="w-1/2 h-[20px] md:h-[25px] rounded-full mb-4 skeleton"></div>
                            </div>
                        </div>
                    </ContentWrapper>
                </div>
            )}
        </div>
    )
}

export default EpisodeDetailsBanner
