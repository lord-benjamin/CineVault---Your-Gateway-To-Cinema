import React from "react";

import Carousel from "../../../components/carousel/Carousal";
import useFetch from "../../../hooks/useFetch";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

const Similar = ({ mediaType, id }) => {
    const { data, loading } = useFetch(`/${mediaType}/${id}/similar`);

    const heading = mediaType === "tv" ? "Similar TV Series" : "Similar Movies";

    return (
        <div className="mb-8 md:mb-16">
            <ContentWrapper>
                <div className="text-3xl md:text-4xl text-white font-bebas tracking-wider mb-4">{heading}</div>
            </ContentWrapper>
            {data?.results?.length===0 ? <ContentWrapper><div className="text-white text-sm md:text-base italic opacity-75">{`No ${heading}`}</div></ContentWrapper> : <Carousel
                data={data?.results}
                loading={loading}
                endpoint={mediaType}
            />}
        </div>
    );
};

export default Similar;