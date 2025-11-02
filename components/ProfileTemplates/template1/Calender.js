import React from "react";
import { HiCheck, HiCheckCircle } from "react-icons/hi";
export default function Calender(props) {
  const style = {
    width: props.width,
    background: props.color,
    color: props.textcolor,
    height: props.height,
    padding:props.padding,
    
  }
  return (

    <>
      <div className={`flex flex-col mr-3 ${props.fontFamily}`} style={style}>
        <div className="xsm:w-[85px] xsm:h-[24px] w-[70px] h-[25px] px-2 justify-center items-center flex bg-[#121212] text-white rounded-tl-[8px] rounded-tr-[8px]">
          <HiCheckCircle />
          <h1 className="text-[12px] xsm:ml-2 ml-1">Mon</h1>
        </div>
        <div className="xsm:w-[85px] w-[70px]  flex flex-col px-2 py-3 border-[1px] border-[#121212] rounded-br-[8px] rounded-bl-[8px] justify-center items-center">
          <h1 className="xsm:text-[12px] text-[11px] font-medium">
            12 june 23
          </h1>
          <h1 className="xsm:text-[12px] text-[11px] font-medium">10:00 AM</h1>
        </div>
      </div>
    </>
  );
}
