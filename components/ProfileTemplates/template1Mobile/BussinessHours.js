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
      <div className="w-[260px] h-[230px] xsm:w-80 xsm:h-[227px]  bg-[#FFFFFF] border-[#121212] border-b-[4px] flex flex-col p-5 rounded-[12px]" style={{background:' linear-gradient(225.75deg, transparent 27px, white 0)'}}>
        <div className="flex justify-between">
          <h1 className="text-[14px] sm:text-[16px]  font-bold  ">
            Business Hours
          </h1>
          <div className="bg-transparent rounded-bl-[14px] h-9 w-[38px] mr-[-20.8px] mt-[-21.6px]  ">
              <img
                src={triangle}
                className="h-[38px] w-[38px] mt-[2px]     "
              />
            </div>
          
        </div>
        <ul className="text-left">
          <li className="text-[12px]   mb-[-8px] ml-5 color-black">
            Mon | 9.00AM - 5.00PM
          </li>
          <li className="text-[12px]   mb-[-8px] ml-5">
            Tue | 9.00AM - 5.00PM
          </li>
          <li className="text-[12px]   mb-[-8px] ml-5">
            Wed | 9.00AM - 5.00PM
          </li>
          <li className="text-[12px]   mb-[-8px] ml-5">
            Thu | 9.00AM - 5.00PM
          </li>
          <li className="text-[12px]   mb-[-8px] ml-5">
            Fri | 9.00AM - 5.00PM
          </li>
          <li className="text-[12px]   mb-[-8px] ml-5">
            Sat | Closed
          </li>
          <li className="text-[12px]    ml-5">
            Sun | Closed
          </li>
        </ul>
      </div>
    </div>
  );
}
