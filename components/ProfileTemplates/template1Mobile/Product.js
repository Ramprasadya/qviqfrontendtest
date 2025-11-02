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
    <div className={`relative flex justify-center w-full  items-center ${props.fontFamily}`}  style={style}>
 
      <div
        className={`flex overflow-scroll mt-6  w-full gap-3  items-center  `}
        style={{ scrollBehavior: "smooth" }}
        ref={VideoContainerRef}
      >
        {products  === undefined || (products != undefined ? products.length == 0 : false) ? (
           
          <>
            <div className="text-left">
              <div className="w-[222px] h-[222px]  mb-[12px] ">
                <img
                  alt="img1"
                  className="w-full h-full   rounded-[12px]"
                  src={image4}
                />
              </div>
              <div className=" mb-3  text-[14px]  font-medium  w-[222px]">
                Product name goes here. It can be a two line text
              </div>
              <div className="mb-3  text-[16px]  font-bold ">
                $299
              </div>
              <div className="text-[14px]  font-bold  ">
                <button className="border-b-[4px] py-2 px-2 xsm:py-[13px] xsm:px-4   border-r-[4px] bg-[#ffffff] rounded-[8px]  border-[#121212]">
                  Buy Now
                </button>
              </div>
            </div>
            <div className="text-left">
              <div className="w-[222px] h-[222px]  mb-3 ">
                <img
                  alt="img1"
                  className="w-full h-full   rounded-[12px]"
                  src={image4}
                />
              </div>
              <div className=" mb-3  text-[14px]  font-medium  w-[222px]">
                Product name goes here. It can be a two line text
              </div>
              <div className="mb-3  text-[16px]  font-bold ">
                $299
              </div>
              <div className="text-[14px]  font-bold  ">
                <button className="border-b-[4px] py-2 px-2 xsm:py-[13px] xsm:px-4   border-r-[4px] bg-[#ffffff] rounded-[8px]  border-[#121212]">
                  Buy Now
                </button>
              </div>
            </div>
            <div className="text-left">
              <div className="w-[222px] h-[222px]  mb-3 ">
                <img
                  alt="img1"
                  className="w-full h-full   rounded-[12px]"
                  src={image4}
                />
              </div>
              <div className=" mb-3  text-[14px]  font-medium  w-[222px]">
                Product name goes here. It can be a two line text
              </div>
              <div className="mb-3  text-[16px]  font-bold ">
                $299
              </div>
              <div className="text-[14px]  font-bold  ">
                <button className="border-b-[4px] py-2 px-2 xsm:py-[13px] xsm:px-4   border-r-[4px] bg-[#ffffff] rounded-[8px]  border-[#121212]">
                  Buy Now
                </button>
              </div>
            </div>
            <div className="text-left">
              <div className="w-[222px] h-[222px]  mb-3 ">
                <img
                  alt="img1"
                  className="w-full h-full   rounded-[12px]"
                  src={image4}
                />
              </div>
              <div className=" mb-3  text-[14px]  font-medium  w-[222px]">
                Product name goes here. It can be a two line text
              </div>
              <div className="mb-3  text-[16px]  font-bold ">
                $299
              </div>
              <div className="text-[14px]  font-bold  ">
                <button className="border-b-[4px] py-2 px-2 xsm:py-[13px] xsm:px-4   border-r-[4px] bg-[#ffffff] rounded-[8px]  border-[#121212]">
                  Buy Now
                </button>
              </div>
            </div>
            <div className="text-left">
              <div className="w-[222px] h-[222px]  mb-3 ">
                <img
                  alt="img1"
                  className="w-full h-full   rounded-[12px]"
                  src={image4}
                />
              </div>
              <div className=" mb-3  text-[14px]  font-medium  w-[222px]">
                Product name goes here. It can be a two line text
              </div>
              <div className="mb-3  text-[16px]  font-bold ">
                $299
              </div>
              <div className="text-[14px]  font-bold  ">
                <button className="border-b-[4px] py-2 px-2 xsm:py-[13px] xsm:px-4   border-r-[4px] bg-[#ffffff] rounded-[8px]  border-[#121212]">
                  Buy Now
                </button>
              </div>
            </div>
            <div className="text-left">
              <div className="w-[222px] h-[222px]  mb-3 ">
                <img
                  alt="img1"
                  className="w-full h-full   rounded-[12px]"
                  src={image4}
                />
              </div>
              <div className=" mb-3  text-[14px]  font-medium  w-[222px]">
                Product name goes here. It can be a two line text
              </div>
              <div className="mb-3  text-[16px]  font-bold ">
                $299
              </div>
              <div className="text-[14px]  font-bold  ">
                <button className="border-b-[4px] py-2 px-2 xsm:py-[13px] xsm:px-4   border-r-[4px] bg-[#ffffff] rounded-[8px]  border-[#121212]">
                  Buy Now
                </button>
              </div>
            </div>
            <div className="text-left">
              <div className="w-[222px] h-[222px]  mb-3 ">
                <img
                  alt="img1"
                  className="w-full h-full   rounded-[12px]"
                  src={image4}
                />
              </div>
              <div className=" mb-3  text-[14px]  font-medium  w-[222px]">
                Product name goes here. It can be a two line text
              </div>
              <div className="mb-3  text-[16px]  font-bold ">
                $299
              </div>
              <div className="text-[14px]  font-bold  ">
                <button className="border-b-[4px] py-2 px-2 xsm:py-[13px] xsm:px-4   border-r-[4px] bg-[#ffffff] rounded-[8px]  border-[#121212]">
                  Buy Now
                </button>
              </div>
            </div>
          </>
        ):(<>
            {products.map((item,index) => {return(
            <div className="text-left" key={index}>
              <div className="w-[222px] h-[222px]  mb-[12px] ">
                <img
                  alt="img1"
                  className="w-full h-full   rounded-[12px]"
                  src={image4}
                />
              </div>
              <div className=" mb-3  text-[14px]  font-medium  w-[222px]">
                Product name goes here. It can be a two line text
              </div>
              <div className="mb-3  text-[16px]  font-bold ">
                $299
              </div>
              <div className="text-[14px]  font-bold  ">
                <button className="border-b-[4px] py-2 px-2 xsm:py-[13px] xsm:px-4   border-r-[4px] bg-[#ffffff] rounded-[8px]  border-[#121212]">
                  Buy Now
                </button>
              </div>
            </div>)
          })}
        
        </>)}
      </div>

      <div className="absolute w-full  bottom-[260px]">
        <div className="relative z-50  w-full">
          <LeftRightScrollBtn
            refrence={VideoContainerRef}
            classStyle='absolute p-1 rounded-full bg-white text-xl shadow-[0_2px_8px_0_rgba(171,181,217,0.14)]  p-2 border-[2px] border-[#121212] '

            // left={" xsm:left-[-16px] left-[-10px]"}
            // right={" xsm:right-[-16px] right-[-10px] "}

            scrollLength={300}
          />
        </div>
      </div>
    </div>
  );
}
