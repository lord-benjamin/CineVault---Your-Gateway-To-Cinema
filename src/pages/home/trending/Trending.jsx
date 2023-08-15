import React,{useState} from 'react'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper.jsx'
import "../style.css"
import SwitchTabs from '../../../components/switchTabs/SwitchTabs.jsx'
import Carousel from '../../../components/carousel/Carousal.jsx';

import useFetch from '../../../hooks/useFetch.jsx'

const Trending = () => {
    const [endpoint,setEndpoint] = useState("day"); 

    const {data,loading} = useFetch(`/trending/all/${endpoint}`);

    const onTabChange = (tab) => {
        setEndpoint(tab==="Day" ? "day" : "week");
    }

    return (
        <div className='relative mb-12 md:mb-24'>
            <ContentWrapper>
                <div className='h-full w-full flex justify-between items-center mb-5'>
                    <span className='text-3xl md:text-4xl text-white font-bebas tracking-wider'>Trending</span>
                    <SwitchTabs data={["Day","Week"]} onTabChange={onTabChange} />
                </div>
            </ContentWrapper>
            <Carousel data={data?.results} loading={loading} />
        </div>
    )
}

export default Trending