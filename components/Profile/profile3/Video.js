import React from 'react'

export default function Video(props){

    const { video, staticvideo } = props;
    
    return(
        <div className='flex justify-center items-center mx-4 flex-col '>
           {video == undefined || (video != undefined ? video.length == 0 : false) ? <> <h1 className='font-bold text-lg mt-12 mb-5 '>Videos</h1>

                <div className='grid grid-cols-3 '>
                   <img src={staticvideo.img1} alt='simage' className='col-span-2 row-span-2 rounded-tl-2xl xsm:w-[255px] xsm:h-[243px] h-[180px] w-[192px]  '/>
                   <img src={staticvideo.img2} alt='simage' className='rounded-tr-2xl xsm:w-[127px] xsm:h-[121px] h-[90px] w-[96px]' />
                   <img src={staticvideo.img3} alt='simage' className=' xsm:w-[127px] xsm:h-[121px] h-[90px] w-[96px]' />
                   <img src={staticvideo.img4} alt='simage' className='rounded-bl-2xl xsm:w-[127px] xsm:h-[121px] h-[90px] w-[96px]'/>
                   <img src={staticvideo.img5} alt='simage' className=' xsm:w-[127px] xsm:h-[121px] h-[90px] w-[96px]'/>
                   <img src={staticvideo.img6} alt='simage' className='rounded-br-2xl xsm:w-[127px] xsm:h-[121px] h-[90px] w-[96px]'/>

                </div>
            </> :
            <>            
                <h1 className='font-bold text-lg mt-12 mb-5 '>Videos</h1>
                <div className='grid grid-cols-3 '>
                    {video[0] != undefined && <img src={video[0].video} alt='simage' className='col-span-2 row-span-2 rounded-tl-2xl xsm:w-[255px] xsm:h-[243px] h-[180px] w-[192px]  '/>}
                    {video[1] != undefined && <img src={video[1].video} alt='simage' className='rounded-tr-2xl xsm:w-[127px] xsm:h-[121px] h-[90px] w-[96px]' />}
                    {video[2] != undefined && <img src={video[2].video} alt='simage' className=' xsm:w-[127px] xsm:h-[121px] h-[90px] w-[96px]' />}
                    {video[3] != undefined && <img src={video[3].video} alt='simage' className='rounded-bl-2xl xsm:w-[127px] xsm:h-[121px] h-[90px] w-[96px]'/>}
                    {video[4] != undefined && <img src={video[4].video} alt='simage' className=' xsm:w-[127px] xsm:h-[121px] h-[90px] w-[96px]'/>}
                    {video[5] != undefined && <img src={video[5].video} alt='simage' className='rounded-br-2xl xsm:w-[127px] xsm:h-[121px] h-[90px] w-[96px]'/>}

                </div>
            </>}
        </div>
    )
}