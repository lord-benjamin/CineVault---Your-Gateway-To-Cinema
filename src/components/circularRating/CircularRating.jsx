import React from 'react'
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import "./style.css"

const CircularRating = ({rating}) => {
    return (
        <div className="rounded-full relative circularRating">
            <CircularProgressbar
                value={rating}
                maxValue={10}
                styles={buildStyles({
                    pathColor: rating<2 ? "#FF0000" : rating<4 ? "#FFA500" : rating<6 ? "#FFFF00" : rating<8 ? "#9ACD32" : "#00FF00"
                })}
            />
            <p className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 font-bold text-white'>{rating}</p>
        </div>
    )
}

export default CircularRating