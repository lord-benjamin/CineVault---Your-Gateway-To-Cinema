import React from 'react'
import { useSelector } from 'react-redux';

const Genres = ({data}) => {
    const {genres} = useSelector((state) => state.home);

    return (
        <div className='relative flex flex-wrap justify-end gap-2 allGenres'>
            {data?.map((genre)=>{
                if(!genres[genre]?.name){
                    return;
                }
                return (
                    <div key={genre} className='bg-orange py-[2px] px-2 text-xs rounded-full text-white whitespace-nowrap'>
                        {genres[genre]?.name}
                    </div>
                )
            })}
        </div>
    )
}

export default Genres