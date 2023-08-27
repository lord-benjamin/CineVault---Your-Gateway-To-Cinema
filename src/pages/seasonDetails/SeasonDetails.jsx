import React from 'react'
import { useParams } from 'react-router-dom';
// import "./style.css";

import useFetch from '../../hooks/useFetch';
import SeasonDetailsBanner from './seasonDetailsBanner/SeasonDetailsBanner';
import WatchProviders from '../../components/watchProviders/WatchProviders';
import SeasonImages from './seasonImages/SeasonImages';
import SeasonVideos from './seasonVideos/SeasonVideos';
import Episode from './carousels/Episode';

const SeasonDetails = () => {
    const {tvId,seasonNumber} = useParams();
    const {data: images,loading: imagesLoading} = useFetch(`/tv/${tvId}/season/${seasonNumber}/images`)
    const {data: videos,loading: videosLoading} = useFetch(`/tv/${tvId}/season/${seasonNumber}/videos`)
    const {data: watch,loading: watchLoading} = useFetch(`/tv/${tvId}/season/${seasonNumber}/watch/providers`);

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
            <SeasonDetailsBanner video={videos?.results?.[trailer]} />
            <WatchProviders data={watch?.results} loading={watchLoading} heading="Where to Watch this Season" />
            <SeasonImages data={images?.posters} loading={imagesLoading} />
            <SeasonVideos data={videos} loading={videosLoading} />
            <Episode id={tvId} seasonNumber={seasonNumber} />
        </div>
    )
}

export default SeasonDetails