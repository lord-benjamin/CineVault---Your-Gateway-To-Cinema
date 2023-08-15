import React, { useState , useEffect } from 'react'
import { useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import Select from 'react-select';

import "./style.css";

import useFetch from '../../hooks/useFetch';
import { fetchDataFromApi } from '../../utils/api';
import ContentWrapper from '../../components/contentWrapper/ContentWrapper';
import MovieCard from '../../components/movieCard/MovieCard';
import LoadingSpinner from '../../components/spinner/LoadingSpinner';
import NoResultsFallback from '../../assets/no-results.png';

let filters = {};

const sortbyData = [
    // { label: "Title (A-Z)", value: "original_title.asc" },
    // { label: "Title (Z-A)", value: "original_title.desc" },
    { label: "Most Popular", value: "popularity.desc" },
    { label: "Least Popular", value: "popularity.asc" },
    { label: "More Rating", value: "vote_average.desc" },
    { label: "Less Rating", value: "vote_average.asc" },
    { label: "Latest", value: "primary_release_date.desc" },
    { label: "Earliest", value: "primary_release_date.asc" },
];

const Explore = () => {
    const [data,setData] = useState(null);
    const [pageNo,setPageNo] = useState(1);
    const [loading,setLoading] = useState(false);
    const [genres,setGenres] = useState(null);
    const [sortBy,setSortBy] = useState(null);
    const {mediaType} = useParams();

    const {data: genresData} = useFetch(`/genre/${mediaType}/list`);

    const fetchInitialData = () => {
        setLoading(true);
        fetchDataFromApi(`/discover/${mediaType}`,filters)
        .then((res) => {
            setData(res);
            setPageNo((prev) => prev + 1);
            setLoading(false);
        })
    }

    const fetchNextPageData = () => {
        fetchDataFromApi(`/discover/${mediaType}?page=${pageNo}`,filters)
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
        filters = {};
        setData(null);
        setPageNo(1);
        setSortBy(null);
        setGenres(null);
        fetchInitialData();
    },[mediaType])

    const onChange = (selectedItems,action) => {
        if(action.name === "sortBy"){
            setSortBy(selectedItems);
            if(action.action !== "clear"){
                filters.sort_by = selectedItems.value;
            }
            else{
                delete filters.sort_by;
            }
        }
        if(action.name === "genres"){
            setGenres(selectedItems);
            if(action.action !== "clear"){
                let genreId = selectedItems.map((genre) => genre.id);
                genreId = JSON.stringify(genreId).slice(1,-1);
                filters.with_genres = genreId;
            }
            else{
                delete filters.with_genres;
            }
        }
        setPageNo(1);
        fetchInitialData();
    }

    return (
        <div className='min-h-[90vh] pt-[90px] md:pt-[130px]'>
            <ContentWrapper>
                <div className='flex justify-between items-start md:items-center mb-4 md:mb-8 flex-col md:flex-row'>
                    <div className='text-white text-3xl md:text-5xl font-bebas mb-2 md:mb-0'>
                        {mediaType==="tv" ? "Explore TV Series" : "Explore Movies"}
                    </div>
                    <div className='flex gap-[10px] flex-col md:flex-row w-full md:w-auto'>
                        <Select
                            isMulti
                            name="genres"
                            value={genres}
                            closeMenuOnSelect={false}
                            options={genresData?.genres}
                            getOptionLabel={(option) => option.name}
                            getOptionValue={(option) => option.id}
                            onChange={onChange}
                            placeholder="Filter by Genres"
                            className="react-select-container w-full md:max-w-[500px] md:min-w-[250px]"
                            classNamePrefix="react-select"
                        />
                        <Select
                            name="sortBy"
                            value={sortBy}
                            options={sortbyData}
                            onChange={onChange}
                            isClearable={true}
                            placeholder="Sort By"
                            className="react-select-container w-full flex-shrink-0 md:w-[230px]"
                            classNamePrefix="react-select"
                        />
                    </div>
                </div>
                {loading && <LoadingSpinner initial={true} />}
                {!loading && (
                    <>
                        {data?.results?.length>0 ? (
                            <InfiniteScroll
                                className="flex gap-[10px] md:gap-[20px] mb-10"
                                style={{flexFlow: "row wrap"}}
                                dataLength={data?.results?.length || []}
                                next={fetchNextPageData}
                                hasMore={pageNo <= data?.total_pages}
                                loader={<LoadingSpinner/>}
                            >
                                {data?.results?.map((item,idx) => {
                                    if(item?.media_type === "person"){
                                        return;
                                    }
                                    return (
                                        <MovieCard key={idx} data={item} fromSearch={false} mediaType={mediaType} />
                                    )
                                })}
                            </InfiniteScroll>
                        ) : (
                            <div className='w-full relative flex flex-col items-center justify-center h-[calc(90vh-130px)] md:h-[calc(90vh-200px)] text-white'>
                                <img src={NoResultsFallback} className='h-40 md:h-60' />
                                <h1 className='text-md md:text-2xl opacity-50'>Nothing to Explore</h1>
                            </div>
                        )}
                    </>
                )}
            </ContentWrapper>
        </div>
    )
}

export default Explore