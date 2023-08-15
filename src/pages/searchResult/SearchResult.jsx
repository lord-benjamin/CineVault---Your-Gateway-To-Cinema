import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'

import "./style.css"

import { fetchDataFromApi } from '../../utils/api'
import ContentWrapper from '../../components/contentWrapper/ContentWrapper'
import MovieCard from '../../components/movieCard/MovieCard'
import LoadingSpinner from '../../components/spinner/LoadingSpinner'
import NoResultsFallback from '../../assets/no-results.png';

const SearchResult = () => {
    const [data,setData] = useState(null);
    const [pageNo,setPageNo] = useState(1);
    const [loading,setLoading] = useState(false);
    const {query} = useParams();

    const fetchInitialData = () => {
        setLoading(true);
        fetchDataFromApi(`/search/multi?query=${query}&page=${pageNo}`)
        .then((res) => {
            setData(res);
            setPageNo((prev) => prev + 1);
            setLoading(false);
        })
    }

    const fetchNextPageData = () => {
        fetchDataFromApi(`/search/multi?query=${query}&page=${pageNo}`)
        .then((res) => {
            if(data?.results){
                setData({...data,results: [...data.results,...res.results]})
            }
            else{
                setData(res);
            }
            setPageNo((prev) => prev + 1);
        })
    }

    useEffect(() => {
        setPageNo(1);
        fetchInitialData();
    },[query])

    return (
        <div className='min-h-[90vh] pt-[90px] md:pt-[130px]'>
            {loading && <LoadingSpinner initial={true} />}
            {!loading && (
                <ContentWrapper>
                    {data?.results?.length>0 ? (
                        <>
                            <div className='text-white text-sm md:text-xl mb-4 md:mb-8'>
                                {`Search ${data?.total_results===1 ? "Result" : "Results"} for`}
                                <span className="font-bold">{` '${query}'`}</span>
                            </div>
                            <InfiniteScroll
                                className='flex gap-[10px] md:gap-[20px] mb-10'
                                style={{flexFlow: "row wrap"}}
                                dataLength={data?.results?.length || []}
                                next={fetchNextPageData}
                                hasMore={pageNo <= data?.total_pages}
                                loader={<LoadingSpinner/>}
                            >
                                {data?.results?.map((item,idx) => {
                                    if(item?.media_type==="person"){
                                        return;
                                    }
                                    return (
                                        <MovieCard key={idx} data={item} />
                                    )
                                })}
                            </InfiniteScroll>
                        </>
                    ) : (
                        <div className='w-full relative flex flex-col items-center justify-center h-[calc(90vh-130px)] md:h-[calc(90vh-200px)] text-white'>
                            <img src={NoResultsFallback} className='h-40 md:h-60' />
                            <h1 className='text-md md:text-2xl opacity-50'>No Results Found</h1>
                        </div>
                    )}
                </ContentWrapper>
            )}
        </div>
    )
}

export default SearchResult