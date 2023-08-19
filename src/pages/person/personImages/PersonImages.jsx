import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// import "./style.css";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Img from "../../../components/lazyLoadImage/Img";
import CastFallback from "../../../assets/no-photo.png";

const PersonImages = ({ data, loading }) => {
    const { url } = useSelector((state) => state.home);
    const navigate = useNavigate();

    const skIt = () => {
        return (
            <div>
                <div className="w-[125px] md:w-[175px] h-[200px] md:h-[300px] rounded-2xl mb-4 md:mb-6 skeleton"></div>
            </div>
        );
    }

    return (
        <div className="relative mb-8 md:mb-16">
            <ContentWrapper>
                <div className="text-3xl md:text-4xl text-white font-bebas tracking-wider mb-4">Photos</div>
                {!loading ? (
                    <div className="castDiv flex gap-[20px] overflow-y-hidden overflow-x-scroll mx-[-20px] py-0 px-[20px] md:m-0 md:p-0">
                        {data?.length===0 ? <div className="text-white text-sm md:text-base italic opacity-75">No Photos</div> : data?.map((item,idx) => {
                            let imgUrl = item?.file_path ? url.profile+item?.file_path : CastFallback
                            return (
                                <div key={idx} className="text-center text-white max-w-min cursor-pointer hover:scale-95 duration-200" onClick={() => navigate(`/person/${item?.id}`)}>
                                    <div className="profile-img w-[125px] md:w-[175px] h-[200px] md:h-[300px] rounded-2xl mb-4 md:mb-6 overflow-hidden">
                                        <Img src={imgUrl} />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <div className="castDiv flex gap-[20px] overflow-y-hidden overflow-x-scroll mx-[-20px] py-0 px-[20px] md:m-0 md:p-0">
                        {skIt()}
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

export default PersonImages;