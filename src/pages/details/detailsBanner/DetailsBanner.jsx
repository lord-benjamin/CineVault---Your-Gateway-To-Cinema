import React,{useState} from 'react'
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import {BiLinkExternal} from "react-icons/bi"
import {BsFillShareFill} from "react-icons/bs"
import { RWebShare } from "react-web-share";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import Genres from "../../../components/genres/Genres";
import CircularRating from '../../../components/circularRating/CircularRating';
import Img from "../../../components/lazyLoadImage/Img.jsx";
import PosterFallback from "../../../assets/no-poster.png";
import { PlayBtn } from '../PlayBtn';
import VideoPopup from '../../../components/videoPopup/VideoPopup';

import "./style.css";

const DetailsBanner = ({video,crew}) => {
    const {mediaType,id} = useParams();
    const {data,loading} = useFetch(`/${mediaType}/${id}`)
    // console.log(data);

    const {url} = useSelector((state) => state.home);

    const _genres = data?.genres?.map((genre) => genre.id);

    const directors = crew?.filter((dir) => dir.job==="Director");
    const writers = crew?.filter((write) => write.job==="Screenplay" || write.job==="Story" || write.job==="Writer")

    const [show,setShow] = useState(false);
    const [videoId,setVideoId] = useState(null);

    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes/60);
        const mins = totalMinutes%60;
        return `${hours}H${mins > 0 ? ` ${mins}M` : ""}`;
    }

    const moneyConvert = (totalMoney) => {
        let num=0;
        let decimal=0;
        if(totalMoney >= 1000000000){
            num = totalMoney/1000000000;
            decimal = num.toFixed(2);
            if(decimal.slice(-2) === "00"){
                return `${decimal.slice(0,-3)} Billion`;
            }
            if(decimal.slice(-1) === "0"){
                return `${decimal.slice(0,-1)} Billion`;
            }
            return `${decimal} Billion`;
        }
        if(totalMoney >= 1000000){
            num = totalMoney/1000000;
            decimal = num.toFixed(2);
            if(decimal.slice(-2) === "00"){
                return `${decimal.slice(0,-3)} Million`;
            }
            if(decimal.slice(-1) === "0"){
                return `${decimal.slice(0,-1)} Million`;
            }
            return `${decimal} Million`;
        }
        if(totalMoney >= 1000){
            num = totalMoney/1000;
            decimal = num.toFixed(2);
            if(decimal.slice(-2) === "00"){
                return `${decimal.slice(0,-3)} Thousand`;
            }
            if(decimal.slice(-1) === "0"){
                return `${decimal.slice(0,-1)} Thousand`;
            }
            return `${decimal} Thousand`;
        }
        return totalMoney;
    }

    return (
        <div className="w-full bg-black1 pt-28 mb-12 md:mb-24 md:pt-36 min-h-[700px] relative">
            {!loading ? (
                <>
                    {!!data && (
                        <React.Fragment>
                            <div className="w-full h-full fixed top-0 left-0 bottom-0 right-0 opacity-10 overflow-hidden backdrop-img">
                                <Img src={url.backdrop + data?.backdrop_path} />
                            </div>
                            <ContentWrapper>
                                <div className="flex relative flex-col gap-4 md:gap-8 md:flex-row">
                                    <div className='flex-shrink-0'>
                                        {data?.poster_path ? (
                                            <Img className="w-full block aspect-[2/3] rounded-[12px] md:max-w-[350px]" src={url.backdrop+data?.poster_path} />
                                        ) : (
                                            <Img className="w-full block aspect-[2/3] rounded-[12px] md:max-w-[350px]" src={PosterFallback} />
                                        )}
                                    </div>
                                    <div className="text-white w-full">
                                        <div className='text-xl md:text-5xl mb-1 md:mb-2'>
                                            {`${data?.title || data?.name}${(data?.release_date || data?.first_air_date) ? " · "+dayjs(data?.release_date || data?.first_air_date).format("YYYY") : ""}`}
                                        </div>
                                        <div className='mb-4 italic opacity-70 text-xs md:text-base'>
                                            {data?.tagline}
                                        </div>
                                        <div className='flex mb-7 genres'>
                                            <Genres data={_genres}></Genres>
                                        </div>
                                        <div className="flex items-center space-x-4 mb-6">
                                            <div className='flex justify-center items-center gap-2'>
                                                <div className='text-md md:text-xl w-[60px] md:w-[80px] h-[60px] md:h-[80px] flex-shrink-0'>
                                                    <CircularRating rating={data?.vote_average.toFixed(1)} />
                                                </div>
                                                {!data?.vote_count ? null : (
                                                    <div className='text-xs text-center md:text-sm font-semibold text-white border-2 border-orange p-1 md:p-2 rounded-md md:rounded-lg uppercase'>
                                                        {data?.vote_count} voted
                                                    </div>
                                                )}
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
                                        <div className='flex lg:flex-row flex-col justify-between lg:items-center mb-6 space-y-3 md:space-y-5 lg:space-y-0'>
                                            {!(data?.homepage && data?.homepage!=="") ? null : (
                                                <div className='hover:text-orange cursor-pointer duration-200 w-max'>
                                                    <a href={data?.homepage} target='_blank' rel='noreferrer'>
                                                        <div className="flex items-center space-x-2 md:space-x-3">
                                                            <span className='text-xl md:text-4xl'><BiLinkExternal/></span>
                                                            <h1 className='text-sm md:text-lg text-center'>{`Visit ${mediaType==="tv" ? "TV Series" : "Movie"} Homepage`}</h1>
                                                        </div>
                                                    </a>
                                                </div>
                                            )}
                                            <div className='hover:text-orange cursor-pointer duration-200 w-max'>
                                                <RWebShare
                                                    data={{
                                                        title:`Share · ${data?.title || data?.name} · CineVault`,
                                                        text: `Just stumbled upon ${data?.title || data?.name} on CineVault, the ultimate movie lover's paradise!🎬
                                                        From comprehensive movie details to in-depth insights, CineVault is a treasure trove for film enthusiasts like me. ✨

                                                        Discover the magic of this ${mediaType==="tv" ? "tv series" : "movie"} at ${window.location.href} 🍿 and explore more on CineVault: https://cinevault-cinema.vercel.app/ 🎥.
                                                        
                                                        Happy exploring! 🚀📽️`,
                                                    }} 
                                                    sites={["facebook","twitter","whatsapp","reddit","telegram","linkedin","mail","copy"]}
                                                >
                                                    <button className='flex items-center space-x-2 md:space-x-3'>
                                                        <span className='text-xl md:text-4xl'><BsFillShareFill/></span>
                                                        <h1 className='text-sm md:text-lg text-center'>Share</h1>
                                                    </button>
                                                </RWebShare>
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
                                        {(data?.status || data?.release_date || data?.runtime || data?.first_air_date) && (
                                            <div className='border-b border-white border-opacity-30 flex items-baseline justify-between space-x-4 py-2 md:py-4 px-0'>
                                                {!data?.status ? null : (
                                                    <div className='flex text-xs md:text-base gap-y-0 gap-x-2' style={{flexFlow: "row wrap"}}>
                                                        <span className='font-bold'>Status:</span>
                                                        <span className='opacity-70'>
                                                            {data?.status}
                                                        </span>
                                                    </div>
                                                )}
                                                {!(data?.release_date || data?.first_air_date) ? null : (
                                                    <div className='flex text-xs md:text-base gap-y-0 gap-x-2' style={{flexFlow: "row wrap"}}>
                                                        <span className='font-bold'>Release Date:</span>
                                                        <span className='opacity-70'>
                                                            {dayjs(data?.release_date || data?.first_air_date).format("D MMMM, YYYY")}
                                                        </span>
                                                    </div>
                                                )}
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
                                        {(mediaType==="tv" && (data?.number_of_seasons || data?.number_of_episodes)) && (
                                            <div className='border-b border-white border-opacity-30 flex items-baseline justify-between space-x-4 py-2 md:py-4 px-0'>
                                                {!data?.number_of_seasons ? null : (
                                                    <div className='flex text-xs md:text-base gap-y-0 gap-x-2' style={{flexFlow: "row wrap"}}>
                                                        <span className='font-bold'>Total Seasons:</span>
                                                        <span className='opacity-70'>
                                                            {data?.number_of_seasons}
                                                        </span>
                                                    </div>
                                                )}
                                                {!data?.number_of_episodes ? null : (
                                                    <div className='flex text-xs md:text-base gap-y-0 gap-x-2' style={{flexFlow: "row wrap"}}>
                                                        <span className='font-bold'>Total Episodes:</span>
                                                        <span className='opacity-70'>
                                                            {data?.number_of_episodes}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                        {data?.spoken_languages?.length>0 && (
                                            <div className='border-b border-white border-opacity-30 flex items-baseline justify-between space-x-4 py-2 md:py-4 px-0'>
                                                <div className='flex text-xs md:text-base gap-y-0 gap-x-2' style={{flexFlow: "row wrap"}}>
                                                    <span className='font-bold'>{data?.spoken_languages?.length===1 ? "Language:" : "Languages:"}</span>
                                                    <span className='opacity-70'>
                                                        {data?.spoken_languages.map((language,idx) => (
                                                            <span key={idx}>
                                                                {language?.english_name}
                                                                {idx!==data?.spoken_languages?.length-1 ? ", " : ""}
                                                            </span>
                                                        ))}
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                        {directors?.length>0 && (
                                            <div className='border-b border-white border-opacity-30 flex items-baseline justify-between space-x-4 py-2 md:py-4 px-0'>
                                                <div className='flex text-xs md:text-base gap-y-0 gap-x-2' style={{flexFlow: "row wrap"}}>
                                                    <span className='font-bold'>{directors?.length===1 ? "Director:" : "Directors:"}</span>
                                                    <span className='opacity-70'>
                                                        {directors.map((director,idx) => (
                                                            <span key={idx}>
                                                                {director?.name}
                                                                {idx!==directors?.length-1 ? ", " : ""}
                                                            </span>
                                                        ))}
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                        {writers?.length>0 && (
                                            <div className='border-b border-white border-opacity-30 flex items-baseline justify-between space-x-4 py-2 md:py-4 px-0'>
                                                <div className='flex text-xs md:text-base gap-y-0 gap-x-2' style={{flexFlow: "row wrap"}}>
                                                    <span className='font-bold'>{writers?.length===1 ? "Writer:" : "Writers:"}</span>
                                                    <span className='opacity-70'>
                                                        {writers.map((writer,idx) => (
                                                            <span key={idx}>
                                                                {writer?.name}
                                                                {idx!==writers?.length-1 ? ", " : ""}
                                                            </span>
                                                        ))}
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                        {data?.created_by?.length>0 && (
                                            <div className='border-b border-white border-opacity-30 flex items-baseline justify-between space-x-4 py-2 md:py-4 px-0'>
                                                <div className='flex text-xs md:text-base gap-y-0 gap-x-2' style={{flexFlow: "row wrap"}}>
                                                    <span className='font-bold'>{data?.created_by?.length===1 ? "Creator:" : "Creators:"}</span>
                                                    <span className='opacity-70'>
                                                        {data?.created_by?.map((creator,idx) => (
                                                            <span key={idx}>
                                                                {creator?.name}
                                                                {idx!==data?.created_by?.length-1 ? ", " : ""}
                                                            </span>
                                                        ))}
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                        {(data?.budget>0 || data?.revenue>0) && (
                                            <div className='border-b border-white border-opacity-30 flex items-baseline justify-between space-x-4 py-2 md:py-4 px-0'>
                                                {data?.budget<=0 ? null : (
                                                    <div className='flex text-xs md:text-base gap-y-0 gap-x-2' style={{flexFlow: "row wrap"}}>
                                                        <span className='font-bold'>Budget:</span>
                                                        <span className='opacity-70'>
                                                            ${moneyConvert(data?.budget)}
                                                        </span>
                                                    </div>
                                                )}
                                                {data?.revenue<=0 ? null : (
                                                    <div className='flex text-xs md:text-base gap-y-0 gap-x-2' style={{flexFlow: "row wrap"}}>
                                                        <span className='font-bold'>Revenue:</span>
                                                        <span className='opacity-70'>
                                                            ${moneyConvert(data?.revenue)}
                                                        </span>
                                                    </div>
                                                )}
                                                {!(data?.budget>0 && data?.revenue>0) ? null : (
                                                    <div className='flex text-xs md:text-base gap-y-0 gap-x-2' style={{flexFlow: "row wrap"}}>
                                                        <span className='font-bold'>Box-Office:</span>
                                                        <span className='opacity-70'>
                                                            {data?.revenue>=data?.budget ? "Hit" : "Flop"}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                        {(data?.production_countries?.length>0 || data?.production_companies?.length>0) && (
                                            <div className='border-b border-white border-opacity-30 flex items-baseline justify-between space-x-4 py-2 md:py-4 px-0'>
                                                {data?.production_countries?.length<=0 ? null : (
                                                    <div className='flex text-xs md:text-base gap-y-0 gap-x-2' style={{flexFlow: "row wrap"}}>
                                                        <span className='font-bold'>{data?.production_countries?.length===1 ? "Production Country:" : "Production Countries:"}</span>
                                                        <span className='opacity-70'>
                                                            {data?.production_countries?.map((country,idx) => (
                                                                <span key={idx}>
                                                                    {country?.name}
                                                                    {idx!==data?.production_countries?.length-1 ? ", " : ""}
                                                                </span>
                                                            ))}
                                                        </span>
                                                    </div>
                                                )}
                                                {data?.production_companies?.length<=0 ? null : (
                                                    <div className='flex text-xs md:text-base gap-y-0 gap-x-2' style={{flexFlow: "row wrap"}}>
                                                        <span className='font-bold'>{data?.production_companies?.length===1 ? "Production Company:" : "Production Companies:"}</span>
                                                        <span className='opacity-70'>
                                                            {data?.production_companies?.map((company,idx) => (
                                                                <span key={idx}>
                                                                    {company?.name}
                                                                    {idx!==data?.production_companies?.length-1 ? ", " : ""}
                                                                </span>
                                                            ))}
                                                        </span>
                                                    </div>
                                                )}
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
                                <div className="w-full md:w-3/4 h-[30px] md:h-[40px] mb-3 rounded-full skeleton"></div>
                                <div className="w-1/2 h-[20px] md:h-[25px] mb-4 rounded-full skeleton"></div>
                                <div className="flex h-[20px] md:h-[25px] space-x-2 mb-6">
                                    <div className="w-[60px] h-full rounded-full skeleton"></div>
                                    <div className="w-[100px] h-full rounded-full skeleton"></div>
                                    <div className="w-[80px] h-full rounded-full skeleton"></div>
                                </div>
                                <div className="flex space-x-3 mb-6">
                                    <div className='flex justify-center items-center gap-2'>
                                        <div className="w-[60px] md:w-[80px] h-[60px] md:h-[80px] rounded-full skeleton"></div>
                                        <div className='w-[60px] md:w-[80px] h-[50px] lg:h-[30px] rounded-md lg:rounded-full skeleton'></div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-[60px] md:w-[80px] h-[60px] md:h-[80px] rounded-full skeleton"></div>
                                        <div className="w-[60px] md:w-[80px] lg:w-[150px] h-[50px] lg:h-[30px] rounded-md lg:rounded-full skeleton"></div>
                                    </div>
                                </div>
                                <div className='flex lg:flex-row flex-col justify-between lg:items-center mb-6 space-y-3 md:space-y-5 lg:space-y-0'>
                                    <div className="w-[250px] h-[25px] md:h-[30px] rounded-full skeleton"></div>
                                    <div className="w-[150px] h-[25px] md:h-[30px] rounded-full skeleton"></div>
                                </div>
                                <div className="w-[150px] h-[25px] md:h-[30px] rounded-full mb-3 skeleton"></div>
                                <div className="w-full h-[20px] md:h-[25px] rounded-full mb-3 skeleton"></div>
                                <div className="w-full h-[20px] md:h-[25px] rounded-full mb-3 skeleton"></div>
                                <div className="w-full h-[20px] md:h-[25px] rounded-full mb-8 skeleton"></div>
                                <div className="w-full h-[20px] md:h-[25px] rounded-full mb-4 skeleton"></div>
                                <div className="w-full h-[20px] md:h-[25px] rounded-full mb-4 skeleton"></div>
                                <div className="w-1/2 md:w-1/3 h-[20px] md:h-[25px] rounded-full mb-4 skeleton"></div>
                                <div className="w-1/2 md:w-1/3 h-[20px] md:h-[25px] rounded-full mb-4 skeleton"></div>
                                <div className="w-2/3 md:w-1/3 h-[20px] md:h-[25px] rounded-full mb-4 skeleton"></div>
                                <div className="w-full h-[20px] md:h-[25px] rounded-full mb-4 skeleton"></div>
                                <div className="w-3/4 h-[20px] md:h-[25px] rounded-full skeleton"></div>
                            </div>
                        </div>
                    </ContentWrapper>
                </div>
            )}
        </div>
    )
}

export default DetailsBanner