import React from 'react'
import Image from './Image'
import Video from './Video'
import Social from './Social'
import images from './images'
import simages from './simages'
import pimages from './pimages'
const name ='Lindsey Philips';
const title='Social Media Influencer';
const desc='Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis exercitationem est animi eaque illum autem, aspernatur sapiente   similique aliquam. Commodi.'






export default function Profile(props){

    return(
        <div className='flex  bg-gray-100   w-[235.8px]' id='profile' style={{display:'block'} }>
               <div className='flex justify-between '>                    
                        <img className='h-[26px] w-[22px] ml-[15px] mt-[61px]' alt='pimg' src={pimages.refresh} />                                        
                        <img alt='pimg' className='rounded-full  mt-[81px]  w-[135px] h-[135px]' src={pimages.profileimg}/>                   
                        <img alt='pimg' className='h-[26px] w-[22px] mr-[24px] mt-[61px] ' src={pimages.download}/>                    
               </div>

                      <h1 className='font-black  text-center mt-[32px] mb-[8px]  text-[20px]'>{name}</h1>
                      <h3 className='text-[16px] text-center font-bold mb-[16px]'>{title}</h3>
                      <h5 className='text-[14px] text-center font-medium  mx-1'>{desc}</h5>
                      
               <Image image={images}/>
               <Video image={images}/>
               <Social image={simages}/>
               
               <div className='flex flex-col justify-center items-center mt-[58px]'>
                   <h1 className='text-[20px] font-bold mb-[8px]'>Contact Details</h1>
                   <div className='flex justify-between items-center bg-white mb-[8px] w-[205px] h-[61px] rounded-[12px]'>
                        <img alt='location' className='ml-[30px] h-[14.5px] w-[10.68px]' src={pimages.location}/>
                        <p className='text-[12px]'>Lorem ipsum dolor  </p>
                        <img alt='moreicon' className='mr-[30px] h-[8px] w-[4px]' src={pimages.arrow}/>
                   </div>
                   <div className='flex justify-between items-center bg-white mb-[8px] w-[205px] h-[61px] rounded-[12px]'>
                        <img alt='location' className='ml-[30px] h-[13.96px] w-[14.96px]' src={pimages.contact}/>
                        <p className='text-[12px]'>Lorem ipsum dolor   </p>
                        <img alt='moreicon' className='mr-[30px] h-[8px] w-[4px]' src={pimages.arrow}/>
                   </div>
                   <div className='flex justify-between items-center bg-white mb-[8px] w-[205px] h-[61px] rounded-[12px]'>
                        <img alt='location' className='ml-[30px] h-[12px] w-[14px]' src={pimages.mail}/>
                        <p className='text-[12px]'>Lorem ipsum dolor  </p>
                        <img alt='moreicon' className='mr-[30px] h-[8px] w-[4px]' src={pimages.arrow}/>
                   </div>
                   <div className='flex justify-between items-center bg-white w-[205px] h-[61px] rounded-[12px]'>
                        <img alt='location' className='ml-[30px] h-[8.48px] w-[14px]' src={pimages.link}/>
                        <p className='text-[12px]'>Lorem ipsum dolor </p>
                        <img alt='moreicon' className='mr-[30px] h-[8px] w-[4px]' src={pimages.arrow}/>
                   </div>
               </div>

               <div className='flex justify-center mt-[58px] '>
                 <img alt='logo' src={pimages.logo}  className='w-[85.24px] mb-[58px] h-[21px]'/>
               </div>

        </div>
    )
}