import React,{useState,useEffect,useRef} from 'react'
import { useParams } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'

// import "./style.css"

import useFetch from '../../../hooks/useFetch'
import SwitchTabs from '../../../components/switchTabs/SwitchTabs'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import MovieCard from '../../../components/movieCard/MovieCard'
import LoadingSpinner from '../../../components/spinner/LoadingSpinner'
import NoResultsFallback from '../../../assets/no-results.png';

const PersonCredit = ({data,loading}) => {
    // const [data,setData] = useState(null);
    // const [pageNo,setPageNo] = useState(1);
    // const [loading,setLoading] = useState(false);
    const headingContainer = useRef();
    const {id} = useParams();
    const perPage = 10;
    const [lastPos,setLastPos] = useState(0)
    
    const [endpoint,setEndpoint] = useState("movie_credits");
    const {data:credits,loading:creditsLoading} = useFetch(`/person/${id}/${endpoint}`);
    // console.log(credits?.cast)
    let casts = credits?.cast;
    let crews = credits?.crew; 
    let res = casts
    // console.log(res);
    // console.log(casts)
    // console.log(crews)

    // console.log(data);
    // console.log(credits);

    const onTypeTabChange = (tab) => {
        setEndpoint(tab==="Movies" ? "movie_credits" : "tv_credits");
    }
    const onCharacterTabChange = (tab) => {
        res = tab==="Cast" ? casts : crews;
    }

    return (
        <div className='min-h-[90vh] '>
            <ContentWrapper>
                <div className='h-full w-full flex flex-col md:flex-row gap-3 justify-between md:items-center mb-5'>
                    <span className='text-3xl md:text-4xl text-white font-bebas tracking-wider' ref={headingContainer}>{`${data?.name}'s`}</span>
                    <div className='flex flex-col sm:flex-row gap-3'>
                        <SwitchTabs data={["Movies","TV Series"]} onTabChange={onTypeTabChange} />
                        <div className='flex gap-3 tracking-wider'>
                            <span className='text-white font-bebas text-lg items-center flex'>as a</span>
                            <SwitchTabs data={["Cast","Crew"]} onTabChange={onCharacterTabChange} />
                        </div>
                    </div>
                </div>
            </ContentWrapper>
            {/* {creditsLoading && <LoadingSpinner initial={true} />} */}
            {!creditsLoading ? (
                <ContentWrapper>
                    {res?.length>0 ? (
                        <div className='flex gap-[10px] md:gap-[20px] mb-10' style={{flexFlow: "row wrap"}}>
                            {res?.map((item,idx) => {
                                {/* console.log(item); */}
                                return (
                                    <MovieCard key={idx} data={item} fromSearch={false} mediaType={`${endpoint==="tv_credits" ? "tv" : "movie"}`} />
                                )
                            })}
                        </div>
                    ) : (
                        <div className='w-full relative flex flex-col items-center justify-center h-[calc(90vh-130px)] md:h-[calc(90vh-200px)] text-white'>
                            <img src={NoResultsFallback} className='h-40 md:h-60' />
                            <h1 className='text-md md:text-2xl opacity-50'>No Results Found</h1>
                        </div>
                    )}
                </ContentWrapper>
            ) : (
                <LoadingSpinner initial={true} />
            )}
        </div>
    )
}

export default PersonCredit