
import React, { useState } from "react";

import "./style.css";

import ContentWrapper from "../../../../components/contentWrapper/ContentWrapper";
import { PlayBtn } from "../../PlayBtn.jsx";
import VideoPopup from "../../../../components/videoPopup/VideoPopup";
import Img from "../../../../components/lazyLoadImage/Img";
import ThumbnailFallback from "../../../../assets/no-thumbnail.png";

const EpisodeVideos = ({ data, loading }) => {
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);
    const [title, setTitle] = useState("");

    const skIt = () => {
        return (
            <div className="w-[200px] aspect-video flex-shrink-0 md:w-[calc(25%-15px)]">
                <div className="w-full aspect-video rounded-[12px] mb-4 md:mb-6 skeleton"></div>
                <div className="w-3/4 h-[20px] md:h-[25px] rounded-full mb-3 skeleton"></div>
            </div>
        );
    };

    return (
        <div className="relative mb-8 md:mb-16">
            <ContentWrapper>
                <div className="text-3xl md:text-4xl text-white font-bebas tracking-wider mb-4">Videos</div>
                {!loading ? (
                    <div className="videoDiv flex gap-[10px] overflow-x-auto mx-[-20px] py-0 px-[20px] md:gap-[20px] md:m-0 md:p-0">
                    {/* {console.log(data)} */}
                        {data?.results?.length===0 ? <div className="text-white text-sm md:text-base italic opacity-75">No Videos</div> : data?.results?.map((video) => {
                            {/* console.log(video) */}
                            let imgUrl = (video?.key) ? "https://img.youtube.com/vi/"+video?.key+"/hqdefault.jpg" : ThumbnailFallback;
                            return (
                                <div key={video?.id} className="w-[200px] aspect-video flex-shrink-0 md:w-[calc(25%-15px)] cursor-pointer playbtn" onClick={() => {
                                    setVideoId(video?.key)
                                    setShow(true)
                                    setTitle(video?.name)
                                }}>
                                    <div className="relative mb-2 md:mb-3">
                                        <div className="w-full h-full aspect-video overflow-hidden block rounded-xl transition-all ease-in-out duration-700">
                                            <Img src={imgUrl} />
                                        </div>
                                        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40px] md:w-[60px] h-[40px] md:h-[60px] rounded-full'>
                                            <PlayBtn/>
                                        </div>
                                    </div>
                                    <div className="text-white text-xs md:text-base name">
                                        {video?.name}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <div className="videoDiv flex gap-[10px] overflow-x-auto mx-[-20px] py-0 px-[20px] md:gap-[20px] md:m-0 md:p-0">
                        {skIt()}
                        {skIt()}
                        {skIt()}
                        {skIt()}
                        {skIt()}
                    </div>
                )}
            </ContentWrapper>
            <VideoPopup
                title={title}
                show={show}
                setShow={setShow}
                videoId={videoId}
                setVideoId={setVideoId}
            />
        </div>
    );
};

export default EpisodeVideos;