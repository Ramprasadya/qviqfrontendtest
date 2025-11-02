import React from 'react'

export default function Video(props){

    const {image}=props;
    
    return(
        <div className='flex justify-center items-center mx-4 flex-col '>
           <h1 className='font-bold text-lg mt-12 mb-5 '>Videos</h1>

           <div className='grid grid-cols-3 '>
                   <img src={image.img1} alt='simage' className='col-span-2 row-span-2 rounded-tl-2xl  h-[156px] w-[168px]  '/>
                   <img src={image.img2} alt='simage' className='rounded-tr-2xl  h-[78px] w-[84px]' />
                   <img src={image.img3} alt='simage' className='  h-[78px] w-[84px]' />
                   <img src={image.img4} alt='simage' className='rounded-bl-2xl  h-[78px] w-[84px]'/>
                   <img src={image.img5} alt='simage' className='   h-[78px] w-[84px]'/>
                   <img src={image.img6} alt='simage' className='rounded-br-2xl   h-[78px] w-[84px]'/>

            </div>

        </div>
    )
}