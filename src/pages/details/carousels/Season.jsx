import React from "react";

import Carousel from "../../../components/carousel/Carousal";
import useFetch from "../../../hooks/useFetch";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

const Season = ({ id }) => {
    const {data,loading} = useFetch(`/tv/${id}`)

    return (
        <div className="mb-8 md:mb-16">
            <ContentWrapper>
                <div className="text-3xl md:text-4xl text-white font-bebas tracking-wider mb-4">Seasons</div>
            </ContentWrapper>
            <Carousel
                data={data?.seasons}
                loading={loading}
                endpoint="season"
            />
        </div>
    );
};

export default Season;