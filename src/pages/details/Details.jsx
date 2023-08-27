import React from 'react'
import { useParams } from 'react-router-dom';

import useFetch from '../../hooks/useFetch';
import DetailsBanner from './detailsBanner/DetailsBanner.jsx';
import WatchProviders from '../../components/watchProviders/WatchProviders.jsx';
import Cast from './cast/Cast.jsx';
import Season from './carousels/Season.jsx';
import PosterSection from './images/PosterSection';
import ImageSection from './images/ImageSection';
import VideoSection from './videos/VideoSection.jsx';
import Similar from './carousels/Similar.jsx';
import Recommendation from './carousels/Recommendation.jsx';

const Details = () => {
    const {mediaType,id} = useParams();
    const {data,loading} = useFetch(`/${mediaType}/${id}`)
    const {data: images,loading: imagesLoading} = useFetch(`/${mediaType}/${id}/images`)
    const {data: videos,loading: videosLoading} = useFetch(`/${mediaType}/${id}/videos`)
    const {data: credits,loading: creditsLoading} = useFetch(`/${mediaType}/${id}/credits`)
    const {data: watch,loading:watchLoading} = useFetch(`/${mediaType}/${id}/watch/providers`);

    // console.log(data);
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
            <WatchProviders data={watch?.results} loading={watchLoading} heading={mediaType==="tv" ? "Where to Watch this TV Series" : "Where to Watch this Movie"} />
            <Cast data={credits?.cast} loading={creditsLoading} />
            {(mediaType==="tv") ? <Season id={id}/> : null}
            <PosterSection data={images?.posters} loading={imagesLoading}/>
            <ImageSection data={images?.backdrops} loading={imagesLoading}/>
            <VideoSection data={videos} loading={videosLoading}/>
            <Similar mediaType={mediaType} id={id} />
            <Recommendation mediaType={mediaType} id={id} />
        </div>
    )
}

export default Details