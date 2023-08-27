import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector';
import Select from 'react-select';

import useFetch from '../../hooks/useFetch';
import ContentWrapper from '../contentWrapper/ContentWrapper'
import SwitchTabs from '../switchTabs/SwitchTabs';
import Img from '../lazyLoadImage/Img';
import LoadingSpinner from '../spinner/LoadingSpinner';
import NoResultsFallback from '../../assets/no-results.png';
import LogoFallback from '../../assets/no-logo.png';

const WatchProviders = ({data,loading,heading}) => {
    const {data:countries,loading:countriesLoading} = useFetch(`/configuration/countries`);
    const { url } = useSelector((state) => state.home);
    const [watchOption,setWatchOption] = useState("flatrate")
    const [countryCode,setCountryCode] = useState("");
    const [country,setCountry] = useState("");
    // console.log(data?.["AT"]);

    const [res,setRes] = useState({})

    const onTabChange = (tab) => {
        if(tab==="Stream"){
            setWatchOption("flatrate");
        }
        else if(tab==="Rent"){
            setWatchOption("rent");
        }
        else{
            setWatchOption("buy");
        }
    }

    var countryOptions = [];
    countries?.forEach((country) => {
        countryOptions.push({"label":country?.english_name,"value":country?.iso_3166_1});
    })

    const onChange = (selectedOption) => {
        if(!selectedOption){
            setCountryCode("")
            setCountry("");
            setRes({});
        }
        else{
            setCountryCode(selectedOption?.value);
            setCountry(selectedOption?.label);
            setRes(data?.[selectedOption?.value]);
        }
    }

    return (
        <div className="relative mb-8 md:mb-16">
            <ContentWrapper>
                <div className='h-full w-full flex flex-col md:flex-row justify-between md:items-center mb-8 gap-2'>
                    <span className='text-3xl md:text-4xl text-white font-bebas tracking-wider mb-2 md:mb-0'>{heading}</span>
                    <div className='flex flex-col items-center md:flex-row gap-2'>
                        <Select
                            name="countries"
                            // value={sortBy}
                            options={countryOptions}
                            onChange={onChange}
                            isClearable={true}
                            placeholder="Choose Country"
                            className="react-select-container w-full flex-shrink-0 md:w-[300px] z-20"
                            classNamePrefix="react-select"
                        />
                        <SwitchTabs data={["Stream","Rent","Buy"]} onTabChange={onTabChange} />
                    </div>
                </div>
                {!loading ? (
                    <React.Fragment>
                        {countryCode!=="" ? (
                            <React.Fragment>
                                {(res && res?.[watchOption]) ? (
                                    <div className='flex justify-center gap-x-[10px] md:gap-x-[20px] gap-y-[20px]' style={{flexFlow: "row wrap"}}>
                                        {res?.[watchOption]?.map((platform,idx) => {
                                            let logoUrl = platform?.logo_path ? url.profile+platform?.logo_path : LogoFallback;
                                            return (
                                                <div key={idx} className='flex flex-col items-center w-[calc(33.33%-6.66px)] sm:w-[calc(25%-7.5px)] md:w-[calc(20%-16px)] lg:w-[calc(16.66%-16.66px)] xl:w-[calc(14.286%-17.143px)] flex-shrink-0 gap-3'>
                                                    <div className='h-16 w-16 md:h-20 md:w-20 rounded-2xl overflow-hidden'>
                                                        <Img src={logoUrl} />
                                                    </div>
                                                    <p className='text-white text-center leading-4 opacity-80 text-xs md:text-base'>{platform?.provider_name}</p>
                                                </div>
                                            )
                                        })}
                                    </div>
                                ) : (
                                    <div className='w-full relative flex flex-col items-center justify-center h-40 md:h-50 text-white'>
                                        <img src={NoResultsFallback} className='h-20 md:h-40' />
                                        <h1 className='text-sm md:text-xl text-center opacity-50'>{`Not Available for ${watchOption==="flatrate" ? "Streaming" : (watchOption==="rent" ? "Rent" : "Purchasing")} in ${country}`}</h1>
                                    </div>
                                )}
                            </React.Fragment>
                        ) : (
                            <div className='w-full relative flex flex-col items-center justify-center h-40 md:h-50 text-white'>
                                <img src={NoResultsFallback} className='h-20 md:h-40' />
                                <h1 className='text-sm md:text-xl opacity-50'>Choose Country</h1>
                            </div>
                        )}
                    </React.Fragment>
                ) : (
                    <LoadingSpinner/>
                )}
            </ContentWrapper>
        </div>
    )
}

export default WatchProviders