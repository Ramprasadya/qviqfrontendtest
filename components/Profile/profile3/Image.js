import React from 'react'

export default function Image(props) {

    const { image, staticimage } = props;

    return (
        
        <div className='flex justify-center items-center mx-4 flex-col '>
            {image === undefined || (image != undefined ? image.length == 0 : false) ? <> <h1 className='font-bold text-lg mt-12 mb-5 '>Images</h1>
                <div className='grid grid-cols-3 '>
                    <img src={staticimage.img1} alt='simage' className='col-span-2 row-span-2 rounded-tl-2xl xsm:w-[255px] xsm:h-[243px] h-[180px] w-[192px]  ' />
                    <img src={staticimage.img2} alt='simage' className='rounded-tr-2xl xsm:w-[127px] xsm:h-[121px] h-[90px] w-96px]' />
                    <img src={staticimage.img3} alt='simage' className=' xsm:w-[127px] xsm:h-[121px] h-[90px] w-[96px]' />
                    <img src={staticimage.img4} alt='simage' className='rounded-bl-2xl xsm:w-[127px] xsm:h-[121px] h-[90px] w-[96px]' />
                    <img src={staticimage.img5} alt='simage' className=' xsm:w-[127px] xsm:h-[121px] h-[90px] w-[96px]' />
                    <img src={staticimage.img6} alt='simage' className='rounded-br-2xl xsm:w-[127px] xsm:h-[121px] h-[90px] w-[96px]' />

                </div>                
            </> :
                <>            
                    <h1 className='font-bold text-lg mt-12 mb-5 '>Images</h1>
                    <div className='grid grid-cols-3 '>
                        {image[0] != undefined && <img src={image[0].image} alt='simage' className='col-span-2 row-span-2 rounded-tl-2xl xsm:w-[255px] xsm:h-[243px] h-[180px] w-[192px]  ' />}
                        {image[1] != undefined && <img src={image[1].image} alt='simage' className='rounded-tr-2xl xsm:w-[127px] xsm:h-[121px] h-[90px] w-96px]' />}
                        {image[2] != undefined && <img src={image[2].image} alt='simage' className=' xsm:w-[127px] xsm:h-[121px] h-[90px] w-[96px]' />}
                        {image[3] != undefined && <img src={image[3].image} alt='simage' className='rounded-bl-2xl xsm:w-[127px] xsm:h-[121px] h-[90px] w-[96px]' />}
                        {image[4] != undefined && <img src={image[4].image} alt='simage' className=' xsm:w-[127px] xsm:h-[121px] h-[90px] w-[96px]' />}
                        {image[5] != undefined && <img src={image[5].image} alt='simage' className='rounded-br-2xl xsm:w-[127px] xsm:h-[121px] h-[90px] w-[96px]' />}

                    </div>
                </>}
        </div>
    )
}