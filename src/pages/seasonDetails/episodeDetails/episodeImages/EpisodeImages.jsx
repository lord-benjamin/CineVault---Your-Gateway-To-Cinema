
import React from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";

import "./style.css";

import ContentWrapper from "../../../../components/contentWrapper/ContentWrapper";
import Img from "../../../../components/lazyLoadImage/Img";
import ScreenshotFallback from "../../../../assets/no-screenshot.png";

const EpisodeImages = ({ data, loading }) => {

    const {url} = useSelector((state) => state.home);

    const skIt = () => {
        return (
            <div className="w-[200px] aspect-video flex-shrink-0 md:w-[calc(25%-15px)]">
                <div className="w-full aspect-video rounded-[12px] mb-4 md:mb-6 skeleton"></div>
            </div>
        );
    };

    return (
        <div className="relative mb-8 md:mb-16">
            <ContentWrapper>
                <div className="text-3xl md:text-4xl text-white font-bebas tracking-wider mb-4">Screenshots</div>
                {!loading ? (
                    <div className="videoDiv flex gap-[10px] overflow-x-auto mx-[-20px] py-0 px-[20px] md:gap-[20px] md:m-0 md:p-0">
                    {/* {console.log(data)} */}
                        {data?.length===0 ? <div className="text-white text-sm md:text-base italic opacity-75">No Screenshots</div> : data?.map((image) => {
                            {/* console.log(video) */}
                            let imgUrl = (image?.file_path) ? url.poster+image?.file_path : ScreenshotFallback;
                            return (
                                <div key={image?.id} className="w-[200px] aspect-video flex-shrink-0 md:w-[calc(25%-15px)]" >
                                    <div className="relative mb-2 md:mb-3">
                                        <div className="w-full h-full aspect-video overflow-hidden block rounded-xl transition-all ease-in-out duration-700">
                                            <Img src={imgUrl} />
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <div className="imageDiv flex gap-[10px] overflow-x-auto mx-[-20px] py-0 px-[20px] md:gap-[20px] md:m-0 md:p-0">
                        {skIt()}
                        {skIt()}
                        {skIt()}
                        {skIt()}
                        {skIt()}
                    </div>
                )}
            </ContentWrapper>
        </div>
    );
};

export default EpisodeImages;