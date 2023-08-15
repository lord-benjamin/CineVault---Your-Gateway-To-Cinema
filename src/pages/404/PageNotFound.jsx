import React from 'react'
import "./style.css";
import ContentWrapper from '../../components/contentWrapper/ContentWrapper';
import NoResultsFallback from '../../assets/no-results.png'

const PageNotFound = () => {
    return (
        <div className='min-h-[90vh] pt-[130px]'>
            <ContentWrapper>
                <div className='w-full relative flex flex-col items-center justify-center h-[calc(90vh-130px)] md:h-[calc(90vh-200px)] text-white'>
                    <img src={NoResultsFallback} className='h-40 md:h-60' />
                    <h1 className='text-md md:text-2xl opacity-50'>404 : Page Not Found</h1>
                </div>
            </ContentWrapper>
        </div>
    )
}

export default PageNotFound