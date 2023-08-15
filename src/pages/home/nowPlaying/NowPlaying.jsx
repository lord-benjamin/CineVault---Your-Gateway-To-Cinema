import React,{useState} from 'react'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper.jsx'
import "../style.css"
import SwitchTabs from '../../../components/switchTabs/SwitchTabs.jsx'
import Carousel from '../../../components/carousel/Carousal.jsx';

import useFetch from '../../../hooks/useFetch.jsx'

const NowPlaying = () => {
    const {data,loading} = useFetch(`/movie/now_playing`);

    return (
        <div className='relative mb-12 md:mb-24'>
            <ContentWrapper>
                <div className='h-full w-full flex justify-between items-center mb-5'>
                    <span className='text-3xl md:text-4xl text-white font-bebas tracking-wider'>Currently in Theatres</span>
                </div>
            </ContentWrapper>
            <Carousel data={data?.results} loading={loading} endpoint="movie"/>
        </div>
    )
}

export default NowPlaying