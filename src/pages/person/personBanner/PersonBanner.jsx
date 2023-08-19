import React,{useState} from 'react'
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import {BiLinkExternal} from "react-icons/bi"

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper.jsx";
import useFetch from '../../../hooks/useFetch';
import Img from "../../../components/lazyLoadImage/Img.jsx";
import CastFallback from "../../../assets/no-photo.png"

// import "./style.css";

const PersonBanner = () => {
    const {id} = useParams();
    const {data,loading} = useFetch(`/person/${id}`)
    const {data: movies,loading: moviesLoading} = useFetch(`/person/${id}/movie_credits`)
    // console.log(movies);

    const {url} = useSelector((state) => state.home);

    const genders = {
        0: "Not Specified",
        1: "Female",
        2: "Male",
        3: "Non-Binary"
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
                                        {data?.profile_path ? (
                                            <Img className="w-full block aspect-[2/3] rounded-[12px] md:max-w-[350px]" src={url.profile+data?.profile_path} />
                                        ) : (
                                            <Img className="w-full block aspect-[2/3] rounded-[12px] md:max-w-[350px]" src={CastFallback} />
                                        )}
                                    </div>
                                    <div className="text-white w-full">
                                        <div className='text-xl md:text-5xl mb-1 md:mb-2'>
                                            {data?.name}
                                        </div>
                                        {!(data?.birthday && data?.birthday!=="") ? <div className='h-4'></div> : (
                                            <div className='mb-4 italic opacity-70 text-xs md:text-base'>
                                                {dayjs(data?.birthday).format("YYYY")} - {`${data?.deathday ? dayjs(data?.deathday).format("YYYY") : "Current"}`}
                                            </div>
                                        )}
                                        {!(data?.homepage && data?.homepage!=="") ? null : (
                                            <div className='hover:text-orange cursor-pointer mb-6 duration-200 w-max'>
                                                <a href={data?.homepage} target='_blank' rel='noreferrer'>
                                                    <div className="flex items-center space-x-2 md:space-x-3">
                                                        <span className='text-3xl md:text-4xl'><BiLinkExternal/></span>
                                                        <h1 className='text-sm md:text-lg text-center'>Visit Person Homepage</h1>
                                                    </div>
                                                </a>
                                            </div>
                                        )}
                                        {!(data?.biography && data?.biography!=="") ? null : (
                                            <div className='mb-4 md:mb-6'>
                                                <div className='text-md md:text-xl mb-2 md:mb-1'>About</div>
                                                <div className='text-xs md:text-sm opacity-70 text-justify'>
                                                    {data?.biography}
                                                </div>
                                            </div>
                                        )}
                                        {(data?.birthday && data?.birthday!=="") && (
                                            <div className='border-b border-white border-opacity-30 flex items-baseline justify-between space-x-4 py-2 md:py-4 px-0'>
                                                {!data?.birthday ? null : (
                                                    <div className='flex text-xs md:text-base gap-y-0 gap-x-2' style={{flexFlow: "row wrap"}}>
                                                        <span className='font-bold'>Birthday:</span>
                                                        <span className='opacity-70'>
                                                            {dayjs(data?.birthday).format("D MMMM, YYYY")}
                                                        </span>
                                                    </div>
                                                )}
                                                <div className='flex text-xs md:text-base gap-y-0 gap-x-2' style={{flexFlow: "row wrap"}}>
                                                    <span className='font-bold'>Deathday:</span>
                                                    <span className='opacity-70'>
                                                        {`${data?.deathday ? dayjs(data?.deathday).format("D MMMM, YYYY") : "Alive"}`}
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                        {!((data?.place_of_birth && data?.place_of_birth!=="") || (data?.gender)) ? null : (
                                            <div className='border-b border-white border-opacity-30 flex items-baseline justify-between space-x-4 py-2 md:py-4 px-0'>
                                                {!(data?.place_of_birth && data?.place_of_birth!=="") ? null : (
                                                    <div className='flex text-xs md:text-base gap-y-0 gap-x-2' style={{flexFlow: "row wrap"}}>
                                                        <span className='font-bold'>Place of Birth:</span>
                                                        <span className='opacity-70'>
                                                            {data?.place_of_birth}
                                                        </span>
                                                    </div>
                                                )}
                                                {!data?.gender ? null : (
                                                    <div className='flex text-xs md:text-base gap-y-0 gap-x-2' style={{flexFlow: "row wrap"}}>
                                                        <span className='font-bold'>Gender:</span>
                                                        <span className='opacity-70'>
                                                            {genders[data?.gender]}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                        {(data?.known_for_department && data?.known_for_department!=="") && (
                                            <div className='border-b border-white border-opacity-30 flex items-baseline justify-between space-x-4 py-2 md:py-4 px-0'>
                                                <div className='flex text-xs md:text-base gap-y-0 gap-x-2' style={{flexFlow: "row wrap"}}>
                                                    <span className='font-bold'>Department:</span>
                                                    <span className='opacity-70'>
                                                        {data?.known_for_department}
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
                                <div className="w-full md:w-3/4 h-[30px] md:h-[40px] mb-3 rounded-full skeleton"></div>
                                <div className="w-1/3 md:1/4 h-[20px] md:h-[25px] mb-4 rounded-full skeleton"></div>
                                <div className="w-[250px] h-[25px] md:h-[30px] rounded-full mb-6 skeleton"></div>
                                <div className="w-[150px] h-[25px] md:h-[30px] rounded-full mb-3 skeleton"></div>
                                <div className="w-full h-[20px] md:h-[25px] rounded-full mb-3 skeleton"></div>
                                <div className="w-full h-[20px] md:h-[25px] rounded-full mb-3 skeleton"></div>
                                <div className="w-full h-[20px] md:h-[25px] rounded-full mb-3 skeleton"></div>
                                <div className="w-full h-[20px] md:h-[25px] rounded-full mb-8 skeleton"></div>
                                <div className="w-full h-[20px] md:h-[25px] rounded-full mb-4 skeleton"></div>
                                <div className="w-full h-[20px] md:h-[25px] rounded-full mb-4 skeleton"></div>
                                <div className="w-1/3 md:w-1/4 h-[20px] md:h-[25px] rounded-full mb-4 skeleton"></div>
                            </div>
                        </div>
                    </ContentWrapper>
                </div>
            )}
        </div>
    )
}

export default PersonBanner