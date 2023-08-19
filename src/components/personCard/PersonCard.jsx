import React from 'react'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux/es/hooks/useSelector'

import "./style.css";

import Img from '../lazyLoadImage/Img'
import CastFallback from '../../assets/no-photo.png';

const PersonCard = ({data}) => {
    const {url} = useSelector((state) => state.home);
    const navigate = useNavigate();
    let imgUrl = data?.profile_path ? url.profile+data?.profile_path : CastFallback;
    return (
        <div
        onClick={() => navigate(`/person/${data?.id}`)}
        className="w-[calc(50%-5px)] cursor-pointer sm:w-[calc(33.33%-6.66px)] md:w-[calc(25%-15px)] lg:w-[calc(20%-16px)] flex-shrink-0 mb-2 md:mb-5 hover:scale-95 duration-200">
            <div className="photo-block relative w-full aspect-[2/3] bg-cover bg-center flex items-end justify-between p-[10px]">
                <Img src={imgUrl} />
            </div>
            <div className="text-white flex flex-col mt-2 md:mt-4">
                <span className="text-sm sm:text-base md:text-lg mb-0 md:mb-1 name">
                    {data?.name}
                </span>
                {/* <span className="text-[10px] sm:text-[12px] md:text-[15px] opacity-50 leading-5">
                    {dayjs(data?.birthday).format("YYYY")} - {`${data?.deathday ? dayjs(data?.deathday).format("YYYY") : "Current"}`}
                </span> */}
                
            </div>
        </div>
    )
}

export default PersonCard