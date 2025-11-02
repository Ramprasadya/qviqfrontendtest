import React from "react";
import triangle from "../images/triangle.png";

export default function BussinesHours(props) {

  const style = {
    width: props.width,
    background: props.color,
    color: props.textcolor,
    height: props.height,
    padding:props.padding,
    
  }
  return (
    <div className={`flex flex-col mt-[24px] mb-[-16px] xl:mt-12 justify-center items-center ${props.fontFamily}`} style={style}>
      <div className="w-[260px] h-[230px] xsm:w-80 xsm:h-[227px] sm:w-96 xsm2:w-[340px] sm:h-[291px] xl:w-[582px] xl:h-[340px]  bg-[#FFFFFF] border-[#121212] border-b-[4px] flex flex-col p-5 xl:p-10 rounded-[12px]" style={{background:' linear-gradient(225.75deg, transparent 27px, white 0)'}}>
        <div className="flex justify-between">
          <h1 className="text-[14px] sm:text-[16px] xl:text-[20px] font-bold  ">
            Business Hours
          </h1>
          <div className="bg-transparent rounded-bl-[14px] h-9 w-[38px] mr-[-20.8px] mt-[-21.6px]  xl:mr-[-67.8px] xl:mt-[-41.6px] xl:h-[66px] xl:w-[68px] ">
              <img
                src={triangle}
                className="h-[38px] w-[38px] mt-[2px] xl:mt-0  xl:h-[43px] xl:w-[43px]  "
              />
            </div>
          {/* <div className="bg-[#F5775B] rounded-bl-[14px] h-9 w-[38px] mr-[-23.8px] mt-[-21.6px] xl:h-[66px] xl:w-[68px]   xl:mr-[-41.8px] xl:mt-[-41.6px]">
            <img src={triangle} className="h-9 w-9 xl:h-[66px] xl:w-[68px] " />
          </div> */}
        </div>
        <ul>
          <li className="text-[12px] sm:text-[14px] xl:text-[16px]  mb-[-8px] ml-5 color-black">
            Mon | 9.00AM - 5.00PM
          </li>
          <li className="text-[12px] sm:text-[14px] xl:text-[16px]  mb-[-8px] ml-5">
            Tue | 9.00AM - 5.00PM
          </li>
          <li className="text-[12px] sm:text-[14px] xl:text-[16px]  mb-[-8px] ml-5">
            Wed | 9.00AM - 5.00PM
          </li>
          <li className="text-[12px] sm:text-[14px] xl:text-[16px]  mb-[-8px] ml-5">
            Thu | 9.00AM - 5.00PM
          </li>
          <li className="text-[12px] sm:text-[14px] xl:text-[16px]  mb-[-8px] ml-5">
            Fri | 9.00AM - 5.00PM
          </li>
          <li className="text-[12px] sm:text-[14px] xl:text-[16px]  mb-[-8px] ml-5">
            Sat | Closed
          </li>
          <li className="text-[12px] sm:text-[14px] xl:text-[16px]   ml-5">
            Sun | Closed
          </li>
        </ul>
      </div>
    </div>
  );
}
