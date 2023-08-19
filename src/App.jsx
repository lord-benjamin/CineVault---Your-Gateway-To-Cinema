import {useState,useEffect} from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import {fetchDataFromApi} from "./utils/api.js";
import { useSelector, useDispatch } from 'react-redux'
import {getApiConfiguration, getGenres} from "./store/homeSlice.js"

import Header from "./components/header/Header.jsx";
import Footer from "./components/footer/Footer.jsx";
import Home from "./pages/home/Home.jsx";
import Details from "./pages/details/Details.jsx";
import SeasonDetails from "./pages/seasonDetails/SeasonDetails.jsx";
import EpisodeDetails from "./pages/seasonDetails/episodeDetails/EpisodeDetails.jsx";
import Person from "./pages/person/Person.jsx";
import Explore from "./pages/explore/Explore.jsx";
import SearchResult from "./pages/searchResult/SearchResult.jsx";
import PageNotFound from "./pages/404/PageNotFound.jsx";

function App() {
  const dispatch = useDispatch();
  const {url} = useSelector((state) => state.home);

  useEffect(()=>{
    fetchApiConfig();
    genresCall();
  },[]);
  const fetchApiConfig = ()=>{
    fetchDataFromApi("/configuration")
    .then((res)=>{
      // console.log(res);
      const url = {
        backdrop: res?.images?.secure_base_url + "original",
        poster:  res?.images?.secure_base_url + "original",
        profile: res?.images?.secure_base_url + "original"
      }
      dispatch(getApiConfiguration(url));
    })
  }

  const genresCall = async() => {
    let promises = [];
    let endpoints = ["movie","tv"];
    let allGenres = {};

    endpoints.forEach((endpoint)=>{
      promises.push(fetchDataFromApi(`/genre/${endpoint}/list`));
    })

    const data = await Promise.all(promises);
    data?.map(({genres})=>{
      return genres?.map((item) => (allGenres[item?.id] = item))
    })
    dispatch(getGenres(allGenres));
  }

  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/:mediaType/:id" element={<Details/>} />
        <Route path="/tv/:tvId/season/:seasonNumber" element={<SeasonDetails/>}></Route>
        <Route path="/tv/:tvId/season/:seasonNumber/episode/:episodeNumber" element={<EpisodeDetails/>}></Route>
        <Route path="/person/:id" element={<Person/>} />
        <Route path="/search/:query" element={<SearchResult/>} />
        <Route path="/explore/:mediaType" element={<Explore/>} />
        <Route path="*" element={<PageNotFound/>} />
      </Routes>
      <Footer/>
    </BrowserRouter> 
  )
}

export default App
