import React,{useState} from 'react'
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import VideoPopup from '../../../components/videoPopup/VideoPopup.jsx';
import { PlayBtn } from '../PlayBtn.jsx';
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper.jsx";
import useFetch from '../../../hooks/useFetch';
import CircularRating from '../../../components/circularRating/CircularRating.jsx';
import Img from "../../../components/lazyLoadImage/Img.jsx";
import PosterFallback from "../../../assets/no-poster.png"

const SeasonDetailsBanner = ({video}) => {
    const {tvId,seasonNumber} = useParams();
    const {data,loading} = useFetch(`/tv/${tvId}/season/${seasonNumber}`)
    console.log(data);

    const {url} = useSelector((state) => state.home);

    const [show,setShow] = useState(false);
    const [videoId,setVideoId] = useState(null);

    return (
        <div className='w-full bg-black1 pt-28 mb-12 md:mb-16 md:pt-36 min-h-[700px] relative'>
            {!loading ? (
                <>
                    {!!data && (
                        <React.Fragment>
                            <ContentWrapper>
                                <div className="flex relative flex-col gap-4 md:gap-8 md:flex-row">
                                    <div className='flex-shrink-0'>
                                        {data?.poster_path ? (
                                            <Img className="w-full block aspect-[2/3] rounded-[12px] md:max-w-[350px]" src={url.profile+data?.poster_path} />
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
                                            <div className='flex items-center space-x-3 cursor-pointer playbtn' onClick={() => {
                                                setShow(true)
                                                setVideoId(video.key)
                                            }}>
                                                <div className='w-[60px] md:w-[80px] h-[60px] md:h-[80px] rounded-full'>
                                                    <PlayBtn/>
                                                </div>
                                                <span className='text-md md:text-xl transition-all duration-700 ease-in-out text'>Watch Trailer</span>
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
                                        {(data?.season_number || data?.episodes?.length>0) && (
                                            <div className='border-b border-white border-opacity-30 flex items-baseline justify-between space-x-4 py-2 md:py-4 px-0'>
                                                <div className='flex text-xs md:text-base gap-y-0 gap-x-2' style={{flexFlow: "row wrap"}}>
                                                    <span className='font-bold'>Season:</span>
                                                    <span className='opacity-70'>
                                                        {data?.season_number}
                                                    </span>
                                                </div>
                                                {data?.episodes?.length<=0 ? null : (
                                                    <div className='flex text-xs md:text-base gap-y-0 gap-x-2' style={{flexFlow: "row wrap"}}>
                                                        <span className='font-bold'>Total Episodes:</span>
                                                        <span className='opacity-70'>
                                                            {data?.episodes?.length}
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
                                <VideoPopup
                                    title={`${data?.title || data?.name} Trailer`}
                                    show={show}
                                    setShow={setShow}
                                    videoId={videoId}
                                    setVideoId={setVideoId}
                                />
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
                                <div className="flex space-x-4 mb-6">
                                    <div className="w-[60px] md:w-[80px] h-[60px] md:h-[80px] rounded-full skeleton"></div>
                                    <div className="flex items-center space-x-3">
                                        <div className="w-[60px] md:w-[80px] h-[60px] md:h-[80px] rounded-full skeleton"></div>
                                        <div className="w-[100px] md:w-[150px] h-[25px] md:h-[30px] rounded-full skeleton"></div>
                                    </div>
                                </div>
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

export default SeasonDetailsBanner