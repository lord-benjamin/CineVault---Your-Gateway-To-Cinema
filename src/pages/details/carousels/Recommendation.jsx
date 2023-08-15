import React from "react";

import Carousel from "../../../components/carousel/Carousal";
import useFetch from "../../../hooks/useFetch";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

const Recommendation = ({ mediaType, id }) => {
    const { data, loading } = useFetch(`/${mediaType}/${id}/recommendations`);

    return (
        <div className="mb-8 md:mb-16">
            <ContentWrapper>
                <div className="text-3xl md:text-4xl text-white font-bebas tracking-wider mb-4">Recommendations</div>
            </ContentWrapper>
            {data?.results?.length===0 ? <ContentWrapper><div className="text-white text-sm md:text-base italic opacity-75">No Recommendations</div></ContentWrapper> : <Carousel
                data={data?.results}
                loading={loading}
                endpoint={mediaType}
            />}
        </div>
    );
};

export default Recommendation;