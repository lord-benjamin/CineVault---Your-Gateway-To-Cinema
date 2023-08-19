import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./style.css";
import Img from "../../../components/lazyLoadImage/Img.jsx";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper.jsx";

import useFetch from "../../../hooks/useFetch";

const HeroBanner = () => {
    const [background, setBackground] = useState("");
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const {url} = useSelector((state) => state.home);
    const {data,loading} = useFetch("/movie/upcoming");

    useEffect(()=>{
        const bg = url.backdrop + data?.results[Math.floor(Math.random()*20)]?.backdrop_path;
        setBackground(bg);
    },[data])

    const searchQueryHandler = (event) => {
        if ((event.key==="Enter" || event.button===0) && query.length > 0) {
            navigate(`/search/${query}`);
            document.querySelectorAll(".inputBox").forEach(box => box.value="");
            setQuery("");
        }
    };

    return (
        <div className="flex items-center relative w-full h-[450px] bg-black1 md:h-[700px]">
            {!loading && <div className="w-full h-full absolute top-0 left-0 opacity-50 overflow-hidden">
                <Img src={background} />
            </div>}
            
            <div className="opacity-layer"></div>
            
            <ContentWrapper>
                <div className="flex flex-col items-center text-white text-center relative max-w-[1200px] my-0 mx-auto">
                    <span className="text-[45px] tracking-widest font-bebas md:text-8xl">CineVault: Explore Cinema</span>
                    <span className="text-sm font-medium my-2 mb-4 md:mb-6 md:text-xl">
                    Unveil cinematic wonders, embark on an exhilarating movie odyssey today!
                    </span>
                    <div className="flex items-center w-full md:w-3/4">
                        <input
                            className="inputBox flex-1 text-xs md:text-lg h-[35px] md:h-[50px] p-4 md:p-6 bg-white text-black outline-none rounded-l-full"
                            type="text"
                            placeholder="Search Movies, TV Series or People..."
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyUp={searchQueryHandler}
                        />
                        <button className="btn w-[70px] md:w-[150px] h-[35px] md:h-[50px] text-xs md:text-lg rounded-r-full cursor-pointer" onClick={searchQueryHandler}>Search</button>
                    </div>
                </div>
            </ContentWrapper>
        </div>
    );
};

export default HeroBanner;
