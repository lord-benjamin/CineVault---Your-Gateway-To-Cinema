import React from 'react'

import "./style.css";

const LoadingSpinner = ({initial}) => {
    return (
        <div className={`w-full relative flex items-center justify-center ${initial ? "h-[calc(90vh-130px)] md:h-[calc(90vh-200px)]" : "h-[120px] md:h-[200px]"}`}>
            <div className='rounded-full border-t-2 md:border-t-4 border-r-2 md:border-r-4 border-white w-[30px] md:w-[50px] h-[30px] md:h-[50px] animate-spin'></div>
        </div>
    )
}

export default LoadingSpinner