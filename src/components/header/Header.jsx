import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import "./style.css";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/home-page-logo.png";

const Header = () => {
    const [show, setShow] = useState("top");
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [query, setQuery] = useState("");
    const [showSearch, setShowSearch] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0,0);
    },[location]);

    const controlNav = () => {
        if(window.scrollY > 300){
            if(window.scrollY > lastScrollY && !mobileMenu){
                setShow("hide");
            }
            else{
                setShow("show");
            }
        }
        else{
            setShow("top");
        }
        setLastScrollY(window.scrollY);
    };

    useEffect(()=>{
        window.addEventListener("scroll",controlNav);
        return () => {
            window.removeEventListener("scroll",controlNav);
        };
    },[lastScrollY]);

    const openSearch = () => {
        setMobileMenu(false);
        setShowSearch(true);
    }
    const openMobileMenu = () => {
        setMobileMenu(true);
        setShowSearch(false);
    }

    const navigationHandler = (type) => {
        if(type === "movie"){
            navigate("/explore/movie");
        }
        else{
            navigate("/explore/tv");
        }
        setMobileMenu(false);
    }
    
    const searchQueryHandler = (event) => {
        if ((event.key==="Enter" || event.button===0) && query.length > 0) {
            navigate(`/search/${query}`);
            setTimeout(()=>{
                setShowSearch(false);
            },1000)
            document.querySelectorAll(".inputBox").forEach(box => box.value="");
            setQuery("");
        }
    };

    return (
        <header className={`fixed flex items-center w-full h-[70px] z-50 transition-all duration-500 ${mobileMenu ? "bg-black3" : ""} ${show}`}>
            <ContentWrapper>
                <div className="h-[70px] flex justify-between items-center">
                    <div className="cursor-pointer w-max">
                        <img className="h-[35px] md:h-[50px]" src={logo} alt="logo" onClick={() => navigate("/")} />
                    </div>
                    <ul className={`items-center justify-between md:flex ${mobileMenu ? "flex flex-col absolute top-[70px] left-0 bg-black3 w-full py-4 px-0 border-t border-t-[rgba(255,255,255,0.1)] animate-comeDown" : "hidden"}`}>
                        <li className={`flex text-center justify-center items-center my-0 mx-4 relative text-white font-semibold cursor-pointer hover:text-orange duration-200 ${mobileMenu ? "h-[50px] w-full" : "h-[70px]"}`} onClick={() => navigationHandler("movie")} >Movies</li>
                        <li className={`flex text-center justify-center items-center my-0 mx-4 relative text-white font-semibold cursor-pointer hover:text-orange duration-200 ${mobileMenu ? "h-[50px] w-full" : "h-[70px]"}`} onClick={() => navigationHandler("tv")} >TV Series</li>
                        <li className="h-[70px] hidden md:flex items-center my-0 ml-4 relative text-white font-semibold cursor-pointer hover:text-orange text-lg duration-200"><HiOutlineSearch onClick={openSearch} /></li>
                    </ul>
                    <div className="flex items-center gap-5 md:hidden text-white text-lg">
                        <HiOutlineSearch className="hover:text-orange duration-200 cursor-pointer" onClick={openSearch} />
                        {mobileMenu ? <VscChromeClose className="hover:text-orange duration-200 cursor-pointer" onClick={()=>setMobileMenu(false)} /> : <SlMenu className="hover:text-orange duration-200 cursor-pointer" onClick={openMobileMenu} />}
                    </div>
                </div>
            </ContentWrapper>
            {showSearch && (<div className="absolute w-full h-[60px] bg-white text-black top-[70px] animate-comeDown">
                <ContentWrapper>
                    <div className="flex items-center h-[60px] w-full">
                        <input
                            autoFocus="true"
                            className="inputBox w-full h-full bg-white text-black outline-none py-0 text-sm md:h-[60px] md:text-lg"
                            type="text"
                            placeholder="Search Movies, TV Series or People..."
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyUp={searchQueryHandler}
                        />
                        <VscChromeClose className="hover:text-orange duration-200 text-lg cursor-pointer" onClick={()=>setShowSearch(false)} />
                    </div>
                </ContentWrapper>
            </div>)}
        </header>
    );
};

export default Header;