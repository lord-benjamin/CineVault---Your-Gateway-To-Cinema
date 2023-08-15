
import React,{useState} from 'react'

import "./style.css"

const SwitchTabs = ({data,onTabChange}) => {
    const [selectedTab,setSelectedTab] = useState(0);
    const [left,setLeft] = useState(0);

    const activeTab = (tab,idx) => {
        setLeft(idx*80);
        setTimeout(()=>{
            setSelectedTab(idx);
        },200)
        onTabChange(tab,idx);
    }
    return (
        <div className=' flex items-center justify-between bg-white w-max rounded-full p-1'>
            <div className='flex items-center h-[20px] md:h-[30px] relative w-full'>
                {data?.map((tab,idx)=>(
                    <span 
                        key={idx}
                        className={`font-bebas h-full flex items-center justify-center w-[80px] text-md md:text-xl text-black1 pt-[2px] tracking-wide z-10 cursor-pointer transition-colors duration-300 ${selectedTab===idx ? "text-white" : ""}`}
                        onClick={() => activeTab(tab,idx)} >
                        {tab}
                    </span>
                ))}
                <span className="btn h-[20px] md:h-[30px] w-[80px] rounded-full absolute tab-change" style={{left}} />
            </div>
        </div>
    )
}

export default SwitchTabs