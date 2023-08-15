import React from "react";
import { VscChromeClose } from "react-icons/vsc";
import ReactPlayer from "react-player/youtube";

import "./style.css";

const VideoPopup = ({ title, show, setShow, videoId, setVideoId }) => {
    const hidePopup = () => {
        setShow(false);
        setVideoId(null);
    }

    return (
        <div className={`flex justify-center items-center w-full h-full fixed top-0 left-0 z-[100] ${show ? "opacity-1 visible" : "opacity-0 invisible"}`}>
            <div className={`absolute top-0 left-0 w-full h-full transition-opacity duration-400 opacityLayer ${show ? "opacity-1" : "opacity-0"}`} onClick={hidePopup}></div>
            <div className={`relative flex flex-col items-end mx-2 md:mx-0 w-full md:w-1/2 aspect-video bg-black3 transition-transform p-1 sm:p-2 rounded-xl ${show ? "scale-1" : "scale-0"}`}>
                <div className="flex items-center justify-between space-x-2 text-white opacity-75 w-full text-xs sm:text-base mb-1 sm:mb-2 px-1 lg:px-2 rounded-lg">
                    <span className="py-1">{title}</span>
                    <span className="p-1 bg-black rounded-full border border-black hover:border-orange hover:text-orange duration-200 cursor-pointer" onClick={hidePopup} ><VscChromeClose/></span>
                </div>
                {videoId===null ? <div className="flex justify-center items-center italic text-white h-full w-full rounded-lg opacity-50 text-xs md:text-base">No Trailer Found</div> : <ReactPlayer
                    url={`https://www.youtube.com/watch?v=${videoId}`}
                    controls
                    width="100%"
                    height="100%"
                    className="rounded-lg overflow-hidden"
                    // playing={true}
                />}
            </div>
        </div>
    );
};

export default VideoPopup;