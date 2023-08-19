import React from "react";

import Carousel from "../../../components/carousel/Carousal";
import useFetch from "../../../hooks/useFetch";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

const Episode = ({ id,seasonNumber }) => {
    const {data,loading} = useFetch(`/tv/${id}/season/${seasonNumber}`)
    
    return (
        <div className="mb-8 md:mb-16">
            <ContentWrapper>
                <div className="text-3xl md:text-4xl text-white font-bebas tracking-wider mb-4">Episodes</div>
            </ContentWrapper>
            <Carousel
                data={data?.episodes}
                loading={loading}
                endpoint="episode"
            />
        </div>
    );
};

export default Episode