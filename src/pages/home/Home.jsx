import React from 'react'
import "./style.css";

import HeroBanner from './heroBanner/HeroBanner.jsx';
import Trending from './trending/Trending.jsx';
import Popular from './popular/Popular.jsx';
import TopRated from './topRated/TopRated.jsx';
import Upcoming from './upcoming/Upcoming.jsx';
import NowPlaying from './nowPlaying/NowPlaying';

const Home = () => {
    return (
        <div>
            <HeroBanner/>
            <NowPlaying/>
            <Trending/>
            <Popular/>
            <TopRated/>
            <Upcoming/>
        </div>
    )
}

export default Home