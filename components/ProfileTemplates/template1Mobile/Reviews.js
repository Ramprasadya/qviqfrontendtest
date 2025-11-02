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
    <div className={`relative flex flex-col justify-center items-center mt-6  w-full ${props.fontFamily}`} style={style}>
      <div
        className={`grid grid-flow-col gap-4 mb-[46px] overflow-scroll w-full  `}
        ref={VideoContainerRef}
      >
        <div className="w-80  h-[227px] text-left border-b-[4px] border-black  rounded-tr-[40px]  bg-[#FFFFFF]  flex flex-col p-5 rounded-[12px]   relative " style={{background:' linear-gradient(225.75deg, transparent 27px, white 0)'}}>
          <div className="flex justify-between">
            <div className="flex mb-4">
              <img
                className="w-9 h-9   rounded-[40px] border-[1px] mr-2 border-[#12121233]"
                src={image1}
              />
              <div>
                <h1 className="text-[14px]  text-center font-bold ">
                  Jasper Sloan
                </h1>
                <div className="flex">
                  <RiStarFill size={"14px"} /> <RiStarFill size={"14px"} />
                  <RiStarFill size={"14px"} /> <RiStarFill size={"14px"} />
                  <RiStarLine size={"14px"} />
                </div>
              </div>
            </div>

            <div className="bg-transparent rounded-bl-[14px] h-9 w-[38px] mr-[-20.5px] mt-[-22.6px]  ">
              <img
                src={triangle}
                className="h-[38px] w-[38px] mt-[2px]   "
              />
            </div>
          </div>
          <p className="text-[12px] w-[280px] ">
            Al-Balad is essentially Jeddah old town. It was once surrounded by a
            wall, but now only the gates re. Al-Balad is essentially Jeddah old
            town. It was once surrounded by a wall, but now only the gates re
          </p>
        </div>
        <div className="w-80  h-[227px] text-left  border-b-[4px] border-black  rounded-tr-[40px]  bg-[#FFFFFF]  flex flex-col p-5 rounded-[12px]   relative " style={{background:' linear-gradient(225.75deg, transparent 27px, white 0)'}}>
          <div className="flex justify-between">
            <div className="flex mb-4">
              <img
                className="w-9 h-9   rounded-[40px] border-[1px] mr-2 border-[#12121233]"
                src={image1}
              />
              <div>
                <h1 className="text-[14px]  text-center font-bold ">
                  Jasper Sloan
                </h1>
                <div className="flex">
                  <RiStarFill size={"14px"} /> <RiStarFill size={"14px"} />
                  <RiStarFill size={"14px"} /> <RiStarFill size={"14px"} />
                  <RiStarLine size={"14px"} />
                </div>
              </div>
            </div>

            <div className="bg-transparent rounded-bl-[14px] h-9 w-[38px] mr-[-20.5px] mt-[-22.6px]  ">
              <img
                src={triangle}
                className="h-[38px] w-[38px] mt-[2px]   "
              />
            </div>
          </div>
          <p className="text-[12px] w-[280px] ">
            Al-Balad is essentially Jeddah old town. It was once surrounded by a
            wall, but now only the gates re. Al-Balad is essentially Jeddah old
            town. It was once surrounded by a wall, but now only the gates re
          </p>
        </div>
        <div className="w-80  h-[227px] text-left border-b-[4px] border-black  rounded-tr-[40px]  bg-[#FFFFFF]  flex flex-col p-5 rounded-[12px]   relative " style={{background:' linear-gradient(225.75deg, transparent 27px, white 0)'}}>
          <div className="flex justify-between">
            <div className="flex mb-4">
              <img
                className="w-9 h-9   rounded-[40px] border-[1px] mr-2 border-[#12121233]"
                src={image1}
              />
              <div>
                <h1 className="text-[14px]  text-center font-bold ">
                  Jasper Sloan
                </h1>
                <div className="flex">
                  <RiStarFill size={"14px"} /> <RiStarFill size={"14px"} />
                  <RiStarFill size={"14px"} /> <RiStarFill size={"14px"} />
                  <RiStarLine size={"14px"} />
                </div>
              </div>
            </div>

            <div className="bg-transparent rounded-bl-[14px] h-9 w-[38px] mr-[-20.5px] mt-[-22.6px]  ">
              <img
                src={triangle}
                className="h-[38px] w-[38px] mt-[2px]   "
              />
            </div>
          </div>
          <p className="text-[12px] w-[280px] ">
            Al-Balad is essentially Jeddah old town. It was once surrounded by a
            wall, but now only the gates re. Al-Balad is essentially Jeddah old
            town. It was once surrounded by a wall, but now only the gates re
          </p>
        </div>
        <div className="w-80  h-[227px] text-left  border-b-[4px] border-black  rounded-tr-[40px]  bg-[#FFFFFF]  flex flex-col p-5 rounded-[12px]   relative " style={{background:' linear-gradient(225.75deg, transparent 27px, white 0)'}}>
          <div className="flex justify-between">
            <div className="flex mb-4">
              <img
                className="w-9 h-9   rounded-[40px] border-[1px] mr-2 border-[#12121233]"
                src={image1}
              />
              <div>
                <h1 className="text-[14px]  text-center font-bold ">
                  Jasper Sloan
                </h1>
                <div className="flex">
                  <RiStarFill size={"14px"} /> <RiStarFill size={"14px"} />
                  <RiStarFill size={"14px"} /> <RiStarFill size={"14px"} />
                  <RiStarLine size={"14px"} />
                </div>
              </div>
            </div>

            <div className="bg-transparent rounded-bl-[14px] h-9 w-[38px] mr-[-20.5px] mt-[-22.6px]  ">
              <img
                src={triangle}
                className="h-[38px] w-[38px] mt-[2px]   "
              />
            </div>
          </div>
          <p className="text-[12px] w-[280px] ">
            Al-Balad is essentially Jeddah old town. It was once surrounded by a
            wall, but now only the gates re. Al-Balad is essentially Jeddah old
            town. It was once surrounded by a wall, but now only the gates re
          </p>
        </div>
        
        
       
        
      </div>

      <div className="flex w-[260px] xsm:w-80  h-14 text-left   bg-[#FFFFFF] border-[#121212] border-r-[4px] border-b-[4px] rounded-[16px] justify-center items-center xsm:p-[18px]   ">
        <button className="text-[14px] text-center font-bold  flex" onClick={()=>setShowModal3(true)}>
          Write a review{" "}
          <div className="ml-2">
            <RiQuillPenLine size={"20px"} />
          </div>
        </button>
      </div>
      
      <div className="absolute w-full  bottom-[200px]">
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
