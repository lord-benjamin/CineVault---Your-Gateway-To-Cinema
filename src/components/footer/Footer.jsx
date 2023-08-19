
import React,{useState} from "react";
import {FaFacebookF,FaInstagram,FaLinkedin} from "react-icons/fa";
import {AiFillGithub} from "react-icons/ai";
import { useNavigate } from "react-router-dom";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/home-page-logo.png"; 

const Footer = () => {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const navigationHandler = (type) => {
        if(type === "movie"){
            navigate("/explore/movie");
        }
        else{
            navigate("/explore/tv");
        }
    }

    const searchQueryHandler = (event) => {
        if ((event.key==="Enter" || event.button===0) && query.length > 0) {
            navigate(`/search/${query}`);
            document.querySelectorAll(".inputBox").forEach(box => box.value="");
            setQuery("");
        }
    }

    let d = new Date();

    return (
        <footer className="py-6 bg-black3 z-50">
            <ContentWrapper>
                <div className="flex flex-col md:flex-row justify-between text-white z-50">
                    <div className="flex flex-col items-center md:items-start w-full md:w-1/2 space-y-3 mb-5 md:mb-0 z-50">
                        <div className="cursor-pointer w-max">
                            <img className="h-[35px] md:h-[50px]" src={logo} alt="logo" onClick={() => navigate("/")} />
                        </div>
                        <p className="opacity-75 text-xs md:text-sm text-center md:text-justify">Welcome to CineVault, your ultimate movie database hub. Discover an extensive collection of films, and tv series, from timeless classics to the latest releases. Immerse yourself in comprehensive film details, trailer, and official videos. Our platform offers personalized recommendations for an unparalleled cinematic experience. Unveil the mesmerizing world of cinema and embark on a captivating journey with CineVault.</p>
                    </div>
                    <div className="flex flex-col w-full md:w-1/2 space-y-3 items-center md:items-end z-50">
                        <ul className="flex flex-row md:flex-col items-end w-full md:w-auto">
                            <li className="flex justify-center md:justify-end w-full items-center h-[40px] my-0 relative text-white font-semibold cursor-pointer hover:text-orange duration-200" onClick={() => navigationHandler("movie")} >Movies</li>
                            <li className="flex justify-center md:justify-end w-full items-center h-[40px] my-0 relative text-white font-semibold cursor-pointer hover:text-orange duration-200" onClick={() => navigationHandler("tv")} >TV Series</li>
                        </ul>
                        <div className="flex items-center w-full md:w-11/12 text-xs md:text-sm">
                            <input
                                className="inputBox flex-1 h-[30px] md:h-[40px] px-2 md:px-5 bg-white text-black outline-none rounded-l-lg"
                                type="text"
                                placeholder="Search Movies, TV Series or People..."
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyUp={searchQueryHandler}
                            />
                            <button className="btn w-[80px] md:w-[100px] h-[30px] md:h-[40px] rounded-r-lg cursor-pointer" onClick={searchQueryHandler}>Search</button>
                        </div>
                    </div>
                </div>
                <hr className="border border-white w-full my-7 opacity-20 rounded-full z-50" />
                <div className="flex flex-col md:flex-row justify-between items-center text-white opacity-75 text-sm space-y-3 md:space-y-0 z-50">
                    <p className="text-center md:text-left z-50">© {d.getFullYear()} CineVault. All Rights Reserved. Designed and Developed by Dhruv Arora</p>
                    <div className="flex space-x-5 text-lg z-50">
                        <a href="https://www.facebook.com/profile.php?id=100076975973927" target="_blank" rel="noreferrer"><span className="w-10 h-10 bg-black rounded-full flex items-center justify-center cursor-pointer border-black hover:text-orange hover:border-orange border duration-200"><FaFacebookF /></span></a>
                        <a href="https://www.instagram.com/dhruv_a_26" target="_blank" rel="noreferrer"><span className="w-10 h-10 bg-black rounded-full flex items-center justify-center cursor-pointer border-black hover:text-orange hover:border-orange border duration-200"><FaInstagram /></span></a>
                        <a href="https://github.com/lord-benjamin" target="_blank" rel="noreferrer"><span className="w-10 h-10 bg-black rounded-full flex items-center justify-center cursor-pointer border-black hover:text-orange hover:border-orange border duration-200"><AiFillGithub /></span></a>
                        <a href="https://www.linkedin.com/in/dhruv-arora-legit" target="_blank" rel="noreferrer"><span className="w-10 h-10 bg-black rounded-full flex items-center justify-center cursor-pointer border-black hover:text-orange hover:border-orange border duration-200"><FaLinkedin /></span></a>
                    </div>
                </div>
            </ContentWrapper>
        </footer>
    );
};

export default Footer;