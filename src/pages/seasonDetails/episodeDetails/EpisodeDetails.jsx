import React from 'react'
import { useParams } from 'react-router-dom';

import useFetch from '../../../hooks/useFetch.jsx';
import EpisodeDetailsBanner from "./episodeDetailsBanner/EpisodeDetailsBanner.jsx";
import EpisodeImages from './episodeImages/EpisodeImages.jsx';
import EpisodeVideos from './episodeVideos/EpisodeVideos.jsx';
import Cast from "./carousels/Cast.jsx";

const EpisodeDetails = () => {
    const {tvId,seasonNumber,episodeNumber} = useParams();
    const {data,loading} = useFetch(`/tv/${tvId}/season/${seasonNumber}/episode/${episodeNumber}`)
    const {data: images,loading: imagesLoading} = useFetch(`/tv/${tvId}/season/${seasonNumber}/episode/${episodeNumber}/images`)
    const {data: videos,loading: videosLoading} = useFetch(`/tv/${tvId}/season/${seasonNumber}/episode/${episodeNumber}/videos`)
    // console.log(data);

    return (
        <div>
            <EpisodeDetailsBanner/>
            <EpisodeImages data={images?.stills} loading={imagesLoading} />
            <EpisodeVideos data={videos} loading={videosLoading} />
            <Cast heading="Guest Stars" data={data?.guest_stars} loading={loading} />
            <Cast heading="Crew" data={data?.crew} loading={loading} />
        </div>
    )
}

export default EpisodeDetails