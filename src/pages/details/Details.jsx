import React from 'react'
import { useParams } from 'react-router-dom';
import "./style.css";

import useFetch from '../../hooks/useFetch';
import DetailsBanner from './detailsBanner/DetailsBanner.jsx';
import Cast from './cast/Cast.jsx';
import VideoSection from './videos/VideoSection.jsx';
import Similar from './carousels/Similar.jsx';
import Recommendation from './carousels/Recommendation.jsx';

const Details = () => {
    const {mediaType,id} = useParams();
    const {data: videos,loading: videosLoading} = useFetch(`/${mediaType}/${id}/videos`)
    const {data: credits,loading: creditsLoading} = useFetch(`/${mediaType}/${id}/credits`)
    
    let trailer = 0;
    for(let i=0; i<videos?.results?.length; ++i){
        if(videos?.results?.[i]?.name?.includes("Trailer") && videos?.results?.[i]?.type === "Trailer"){
            trailer = i;
            break;
        }
        if(videos?.results?.[i]?.type === "Trailer"){
            trailer = i;
        }
    }

    return (
        <div>
            <DetailsBanner video={videos?.results?.[trailer]} crew={credits?.crew} />
            <Cast data={credits?.cast} loading={creditsLoading} />
            <VideoSection data={videos} loading={videosLoading}/>
            <Similar mediaType={mediaType} id={id} />
            <Recommendation mediaType={mediaType} id={id} />
        </div>
    )
}

export default Details