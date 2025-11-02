import React from 'react'
import { HiCheckCircle } from 'react-icons/hi';

const CircularProgressBar = (props) => {
    const style = {
        cx: 17,
        cy: 17,
        r: 15,
        strokeDasharray: 100,
        strokeDashoffset: 0,
        strokeWidth: 2,
        stroke: '#F3F3F3',
        fill: 'none',
    }
    const progress = props.progress || 0;
    const arcLength = Math.PI * 2 * style.r;
    const arcOffset = arcLength * ((100 - progress) / 100);

    return (
        <div className='w-9 h-9 relative'>
            {progress !== 100 ?
                <>
                    <svg className="w-full h-full">
                        <circle className="track" style={{ ...style }} />
                        <circle className="indicator" style={{ ...style, stroke: '#FE7171', strokeDasharray: arcLength, strokeDashoffset: arcOffset }} />
                    </svg>
                    <span className='absolute w-full h-full flex justify-center items-center top-0 text-[10px] text-[#FE7171] font-semibold'>{progress}%</span>
                </> :
                <span className='text-[#12A26E] text-4xl'>
                    <HiCheckCircle/>
                </span>
            }
        </div>
    )
}

export default CircularProgressBar
