import React, { useState, useRef, useEffect } from "react";
import {
  HiOutlineChevronDown,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlinePencilAlt,
} from "react-icons/hi";
import image4 from "../images/image4.jpg";
import LeftRightScrollBtn from "../../Utils/LeftRightScrollBtn";
export default function Product(props) {
  const products=props.products
  const VideoContainerRef = useRef(null);

  const style = {
    width: props.width,
    background: props.color,
    color: props.textcolor,
    height: props.height,
    padding:props.padding,
    
  }
  
  return (
    <div className={`relative flex justify-center w-full xl:w-[1182px]  items-center ${props.fontFamily}`}  style={style}>
 
      <div
        className={`flex overflow-scroll mt-6 xl:mt-12 w-full gap-3 xl:gap-5 items-center  `}
        style={{ scrollBehavior: "smooth" }}
        ref={VideoContainerRef}
      >
        {products  === undefined || (products != undefined ? products.length == 0 : false) ? (
           
          <>
            <div>
              <div className="w-[222px] h-[222px] xl:w-[280px] xl:h-[278px] mb-[12px] xl:mb-4">
                <img
                  alt="img1"
                  className="w-full h-full xl:rounded-[15.135px]  rounded-[12px]"
                  src={image4}
                />
              </div>
              <div className=" mb-3 xl:mb-4 text-[14px] xl:text-[16px] font-medium  w-[222px]">
                Product name goes here. It can be a two line text
              </div>
              <div className="mb-3 xl:mb-4 text-[16px] xl:text-[22px] font-bold ">
                $299
              </div>
              <div className="text-[14px] xl:text-[17.658px] font-bold  ">
                <button className="border-b-[4px] py-2 px-2 xsm:py-[13px] xsm:px-4 xl:px-6 xl:py-[22p]  border-r-[4px] bg-[#ffffff] rounded-[8px]  border-[#121212]">
                  Buy Now
                </button>
              </div>
            </div>
            <div>
              <div className="w-[222px] h-[222px] xl:w-[280px] xl:h-[278px] mb-3 xl:mb-4">
                <img
                  alt="img1"
                  className="w-full h-full xl:rounded-[15.135px]  rounded-[12px]"
                  src={image4}
                />
              </div>
              <div className=" mb-3 xl:mb-4 text-[14px] xl:text-[16px] font-medium  w-[222px]">
                Product name goes here. It can be a two line text
              </div>
              <div className="mb-3 xl:mb-4 text-[16px] xl:text-[22px] font-bold ">
                $299
              </div>
              <div className="text-[14px] xl:text-[17.658px] font-bold  ">
                <button className="border-b-[4px] py-2 px-2 xsm:py-[13px] xsm:px-4 xl:px-6 xl:py-[22p]  border-r-[4px] bg-[#ffffff] rounded-[8px]  border-[#121212]">
                  Buy Now
                </button>
              </div>
            </div>
            <div className="">
              <div className="w-[222px] h-[222px] xl:w-[280px] xl:h-[278px] mb-3 xl:mb-4">
                <img
                  alt="img1"
                  className="w-full h-full xl:rounded-[15.135px]  rounded-[12px]"
                  src={image4}
                />
              </div>
              <div className=" mb-3 xl:mb-4 text-[14px] xl:text-[16px] font-medium  w-[222px]">
                Product name goes here. It can be a two line text
              </div>
              <div className="mb-3 xl:mb-4 text-[16px] xl:text-[22px] font-bold ">
                $299
              </div>
              <div className="text-[14px] xl:text-[17.658px] font-bold  ">
                <button className="border-b-[4px] py-2 px-2 xsm:py-[13px] xsm:px-4 xl:px-6 xl:py-[22p]  border-r-[4px] bg-[#ffffff] rounded-[8px]  border-[#121212]">
                  Buy Now
                </button>
              </div>
            </div>
            <div className=" ">
              <div className="w-[222px] h-[222px] xl:w-[280px] xl:h-[278px] mb-3 xl:mb-4">
                <img
                  alt="img1"
                  className="w-full h-full xl:rounded-[15.135px]  rounded-[12px]"
                  src={image4}
                />
              </div>
              <div className=" mb-3 xl:mb-4 text-[14px] xl:text-[16px] font-medium  w-[222px]">
                Product name goes here. It can be a two line text
              </div>
              <div className="mb-3 xl:mb-4 text-[16px] xl:text-[22px] font-bold ">
                $299
              </div>
              <div className="text-[14px] xl:text-[17.658px] font-bold  ">
                <button className="border-b-[4px] py-2 px-2 xsm:py-[13px] xsm:px-4 xl:px-6 xl:py-[22p]  border-r-[4px] bg-[#ffffff] rounded-[8px]  border-[#121212]">
                  Buy Now
                </button>
              </div>
            </div>
            <div className=" ">
              <div className="w-[222px] h-[222px] xl:w-[280px] xl:h-[278px] mb-3 xl:mb-4">
                <img
                  alt="img1"
                  className="w-full h-full xl:rounded-[15.135px]  rounded-[12px]"
                  src={image4}
                />
              </div>
              <div className=" mb-3 xl:mb-4 text-[14px] xl:text-[16px] font-medium  w-[222px]">
                Product name goes here. It can be a two line text
              </div>
              <div className="mb-3 xl:mb-4 text-[16px] xl:text-[22px] font-bold ">
                $299
              </div>
              <div className="text-[14px] xl:text-[17.658px] font-bold  ">
                <button className="border-b-[4px] py-2 px-2 xsm:py-[13px] xsm:px-4 xl:px-6 xl:py-[22p]  border-r-[4px] bg-[#ffffff] rounded-[8px]  border-[#121212]">
                  Buy Now
                </button>
              </div>
            </div>
            <div className="">
              <div className="w-[222px] h-[222px] xl:w-[280px] xl:h-[278px] mb-3 xl:mb-4">
                <img
                  alt="img1"
                  className="w-full h-full xl:rounded-[15.135px]  rounded-[12px]"
                  src={image4}
                />
              </div>
              <div className=" mb-3 xl:mb-4 text-[14px] xl:text-[16px] font-medium  w-[222px]">
                Product name goes here. It can be a two line text
              </div>
              <div className="mb-3 xl:mb-4 text-[16px] xl:text-[22px] font-bold ">
                $299
              </div>
              <div className="text-[14px] xl:text-[17.658px] font-bold  ">
                <button className="border-b-[4px] py-2 px-2 xsm:py-[13px] xsm:px-4 xl:px-6 xl:py-[22p]  border-r-[4px] bg-[#ffffff] rounded-[8px]  border-[#121212]">
                  Buy Now
                </button>
              </div>
            </div>
            <div className="">
              <div className="w-[222px] h-[222px] xl:w-[280px] xl:h-[278px] mb-3 xl:mb-4">
                <img
                  alt="img1"
                  className="w-full h-full xl:rounded-[15.135px]  rounded-[12px]"
                  src={image4}
                />
              </div>
              <div className=" mb-3 xl:mb-4 text-[14px] xl:text-[16px] font-medium  w-[222px]">
                Product name goes here. It can be a two line text
              </div>
              <div className="mb-3 xl:mb-4 text-[16px] xl:text-[22px] font-bold ">
                $299
              </div>
              <div className="text-[14px] xl:text-[17.658px] font-bold  ">
                <button className="border-b-[4px] py-2 px-2 xsm:py-[13px] xsm:px-4 xl:px-6 xl:py-[22p]  border-r-[4px] bg-[#ffffff] rounded-[8px]  border-[#121212]">
                  Buy Now
                </button>
              </div>
            </div>
          </>
        ):(<>
            {products.map((item,index) => {return(
            <div key={index}>
              <div className="w-[222px] h-[222px] xl:w-[280px] xl:h-[278px] mb-[12px] xl:mb-4">
                <img
                  alt="img1"
                  className="w-full h-full xl:rounded-[15.135px]  rounded-[12px]"
                  src={image4}
                />
              </div>
              <div className=" mb-3 xl:mb-4 text-[14px] xl:text-[16px] font-medium  w-[222px]">
                Product name goes here. It can be a two line text
              </div>
              <div className="mb-3 xl:mb-4 text-[16px] xl:text-[22px] font-bold ">
                $299
              </div>
              <div className="text-[14px] xl:text-[17.658px] font-bold  ">
                <button className="border-b-[4px] py-2 px-2 xsm:py-[13px] xsm:px-4 xl:px-6 xl:py-[22p]  border-r-[4px] bg-[#ffffff] rounded-[8px]  border-[#121212]">
                  Buy Now
                </button>
              </div>
            </div>)
          })}
        
        </>)}
      </div>

      <div className="absolute w-full xl:bottom-[320px] bottom-[260px]">
        <div className="relative z-50  w-full">
          <LeftRightScrollBtn
            refrence={VideoContainerRef}
            classStyle='absolute p-1 rounded-full bg-white text-xl shadow-[0_2px_8px_0_rgba(171,181,217,0.14)] xl:p-5 sm:p-3 p-2 border-[2px] border-[#121212] '
            // left={"left-[-16px] xl:left-[-30px] sm:left-[-25px]"}
            // right={"right-[-16px] sm:right-[-25px] xl:right-[-30px]"}
            
            // leftPosition='-30px'
            // rightPosition='-30px'
            scrollLength={600}
          />
        </div>
      </div>
    </div>
  );
}
