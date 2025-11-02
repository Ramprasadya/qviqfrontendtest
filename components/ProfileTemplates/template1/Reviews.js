import React, { useState, useRef, useEffect } from "react";
import image1 from "../images/image1.jpg";
import triangle from "../images/triangle.png";
import LeftRightScrollBtn from "../../Utils/LeftRightScrollBtn";
import { RiQuillPenLine, RiStarFill, RiStarLine } from "react-icons/ri";
import {
  HiOutlineChevronDown,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlinePencilAlt,
} from "react-icons/hi";
export default function Reviews(props) {
  const setShowModal3=props.setShowModal3;

  const style = {
    width: props.width,
    background: props.color,
    color: props.textcolor,
    height: props.height,
    padding:props.padding,
    
  }
  const VideoContainerRef = useRef(null);

  return (
    <div className={`relative flex flex-col justify-center items-center mt-6 xl:mt-12 w-full ${props.fontFamily}`} style={style}>
      <div
        className={`grid grid-flow-col xl:flex gap-4 xl:gap-5 mb-[46px] overflow-scroll w-full  `}
        ref={VideoContainerRef}
      >
        <div className="w-80  h-[227px]  border-b-[4px] border-black  rounded-tr-[40px]  bg-[#FFFFFF]  flex flex-col p-5 xl:p-6 rounded-[12px] xl:w-[381px] xl:h-[226px]  relative " style={{background:' linear-gradient(225.75deg, transparent 27px, white 0)'}}>
          <div className="flex justify-between">
            <div className="flex mb-4">
              <img
                className="w-9 h-9 sm:h-11 sm:w-11  rounded-[40px] border-[1px] mr-2 border-[#12121233]"
                src={image1}
              />
              <div>
                <h1 className="text-[14px] xl:text-[16px] sm:text-[15px] text-center font-bold ">
                  Jasper Sloan
                </h1>
                <div className="flex">
                  <RiStarFill size={"14px"} /> <RiStarFill size={"14px"} />
                  <RiStarFill size={"14px"} /> <RiStarFill size={"14px"} />
                  <RiStarLine size={"14px"} />
                </div>
              </div>
            </div>

            <div className="bg-transparent rounded-bl-[14px] h-9 w-[38px] mr-[-20.5px] mt-[-22.6px] xl:mr-[-25.9px] 2xl:mt-[-27.5px] xl:mt-[-25.5px] xl:w-[43px] xl:h-[43px] ">
              <img
                src={triangle}
                className="h-[38px] w-[38px] mt-[2px] xl:mt-0  xl:w-[43px] xl:h-[43px]  "
              />
            </div>
          </div>
          <p className="text-[12px] sm:text-[13px] xl:text-[16px] w-[280px] xl:w-[333px] ">
            Al-Balad is essentially Jeddah old town. It was once surrounded by a
            wall, but now only the gates re. Al-Balad is essentially Jeddah old
            town. It was once surrounded by a wall, but now only the gates re
          </p>
        </div>
        <div className="w-80  h-[227px]  border-b-[4px] border-black  rounded-tr-[40px]  bg-[#FFFFFF]  flex flex-col p-5 xl:p-6 rounded-[12px] xl:w-[381px] xl:h-[226px]  relative " style={{background:' linear-gradient(225.75deg, transparent 27px, white 0)'}}>
          <div className="flex justify-between">
            <div className="flex mb-4">
              <img
                className="w-9 h-9 sm:h-11 sm:w-11  rounded-[40px] border-[1px] mr-2 border-[#12121233]"
                src={image1}
              />
              <div>
                <h1 className="text-[14px] xl:text-[16px] sm:text-[15px] text-center font-bold ">
                  Jasper Sloan
                </h1>
                <div className="flex">
                  <RiStarFill size={"14px"} /> <RiStarFill size={"14px"} />
                  <RiStarFill size={"14px"} /> <RiStarFill size={"14px"} />
                  <RiStarLine size={"14px"} />
                </div>
              </div>
            </div>

            <div className="bg-transparent rounded-bl-[14px] h-9 w-[38px] mr-[-20.5px] mt-[-22.6px] xl:mr-[-25.9px] 2xl:mt-[-27.5px] xl:mt-[-25.5px] xl:w-[43px] xl:h-[43px] ">
              <img
                src={triangle}
                className="h-[38px] w-[38px] mt-[2px] xl:mt-0  xl:w-[43px] xl:h-[43px]  "
              />
            </div>
          </div>
          <p className="text-[12px] sm:text-[13px] xl:text-[16px] w-[280px] xl:w-[333px] ">
            Al-Balad is essentially Jeddah old town. It was once surrounded by a
            wall, but now only the gates re. Al-Balad is essentially Jeddah old
            town. It was once surrounded by a wall, but now only the gates re
          </p>
        </div>
        <div className="w-80  h-[227px]  border-b-[4px] border-black  rounded-tr-[40px]  bg-[#FFFFFF]  flex flex-col p-5 xl:p-6 rounded-[12px] xl:w-[381px] xl:h-[226px]  relative " style={{background:' linear-gradient(225.75deg, transparent 27px, white 0)'}}>
          <div className="flex justify-between">
            <div className="flex mb-4">
              <img
                className="w-9 h-9 sm:h-11 sm:w-11  rounded-[40px] border-[1px] mr-2 border-[#12121233]"
                src={image1}
              />
              <div>
                <h1 className="text-[14px] xl:text-[16px] sm:text-[15px] text-center font-bold ">
                  Jasper Sloan
                </h1>
                <div className="flex">
                  <RiStarFill size={"14px"} /> <RiStarFill size={"14px"} />
                  <RiStarFill size={"14px"} /> <RiStarFill size={"14px"} />
                  <RiStarLine size={"14px"} />
                </div>
              </div>
            </div>

            <div className="bg-transparent rounded-bl-[14px] h-9 w-[38px] mr-[-20.5px] mt-[-22.6px] xl:mr-[-25.9px] 2xl:mt-[-27.5px] xl:mt-[-25.5px] xl:w-[43px] xl:h-[43px] ">
              <img
                src={triangle}
                className="h-[38px] w-[38px] mt-[2px] xl:mt-0  xl:w-[43px] xl:h-[43px]  "
              />
            </div>
          </div>
          <p className="text-[12px] sm:text-[13px] xl:text-[16px] w-[280px] xl:w-[333px] ">
            Al-Balad is essentially Jeddah old town. It was once surrounded by a
            wall, but now only the gates re. Al-Balad is essentially Jeddah old
            town. It was once surrounded by a wall, but now only the gates re
          </p>
        </div>
        <div className="w-80  h-[227px]  border-b-[4px] border-black  rounded-tr-[40px]  bg-[#FFFFFF]  flex flex-col p-5 xl:p-6 rounded-[12px] xl:w-[381px] xl:h-[226px]  relative " style={{background:' linear-gradient(225.75deg, transparent 27px, white 0)'}}>
          <div className="flex justify-between">
            <div className="flex mb-4">
              <img
                className="w-9 h-9 sm:h-11 sm:w-11  rounded-[40px] border-[1px] mr-2 border-[#12121233]"
                src={image1}
              />
              <div>
                <h1 className="text-[14px] xl:text-[16px] sm:text-[15px] text-center font-bold ">
                  Jasper Sloan
                </h1>
                <div className="flex">
                  <RiStarFill size={"14px"} /> <RiStarFill size={"14px"} />
                  <RiStarFill size={"14px"} /> <RiStarFill size={"14px"} />
                  <RiStarLine size={"14px"} />
                </div>
              </div>
            </div>

            <div className="bg-transparent rounded-bl-[14px] h-9 w-[38px] mr-[-20.5px] mt-[-22.6px] xl:mr-[-25.9px] 2xl:mt-[-27.5px] xl:mt-[-25.5px] xl:w-[43px] xl:h-[43px] ">
              <img
                src={triangle}
                className="h-[38px] w-[38px] mt-[2px] xl:mt-0  xl:w-[43px] xl:h-[43px]  "
              />
            </div>
          </div>
          <p className="text-[12px] sm:text-[13px] xl:text-[16px] w-[280px] xl:w-[333px] ">
            Al-Balad is essentially Jeddah old town. It was once surrounded by a
            wall, but now only the gates re. Al-Balad is essentially Jeddah old
            town. It was once surrounded by a wall, but now only the gates re
          </p>
        </div>
        
       
        
      </div>

      <div className="flex w-[260px] xsm:w-80 max-w-[380px] h-14  xl:h-[72px]  bg-[#FFFFFF] border-[#121212] border-r-[4px] border-b-[4px] rounded-[16px] justify-center items-center xsm:p-[18px] p-3 xl:py-[13px xl:px-4 ">
        <button className="text-[14px] xl:text-[16px] sm:text-[15px] text-center font-bold  flex" onClick={()=>setShowModal3(true)}>
          Write a review{" "}
          <div className="ml-2">
            <RiQuillPenLine size={"20px"} />
          </div>
        </button>
      </div>
      
      <div className="absolute w-full xl:bottom-[240px] bottom-[200px]">
        <div className="relative z-50  w-full">
          <LeftRightScrollBtn
            refrence={VideoContainerRef}
            classStyle='absolute p-1 rounded-full bg-white text-xl shadow-[0_2px_8px_0_rgba(171,181,217,0.14)] xl:p-5 sm:p-3 p-2 border-[2px] border-[#121212] '

            // left={"left-[-16px] xl:left-[-30px] sm:left-[-25px]"}
            // right={"right-[-16px] sm:right-[-25px] xl:right-[-30px]"}
            scrollLength={600}
          />
        </div>
        </div>
      
    </div>
  );
}
