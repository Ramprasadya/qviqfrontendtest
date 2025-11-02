import React from "react";
import Calender from "./Calender";
import sideLines from '../images/sideLines.png'

export default function Appointents(props) {
  const style = {
    width: props.width,
    background: props.color,
    color: props.textcolor,
    height: props.height,
    padding:props.padding,
    
  }
  return (
    <div className={`justify-center items-center flex  mt-6 ${props.fontFamily}`} style={style}>
      <div className=" w-[260px] xsm:w-[320px] bg-[#ffffff] rounded-[16px] p-5 relative">
        
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-[14px] font-bold mb-4 ">
            Book a one-on-one call
          </h1>
          <div className="flex overflow-scroll w-[240px] xsm:w-[280px] ">
            <Calender textcolor={"#121212"} fontFamily={'sans'}/>
            <Calender textcolor={"#121212"} fontFamily={'sans'}/>
            <Calender textcolor={"#121212"} fontFamily={'sans'} />
            <Calender textcolor={"#121212"} fontFamily={'sans'}/>
            <Calender textcolor={"#121212"} fontFamily={'sans'}/>
            <span className="flex ">
              <Calender textcolor={"#121212"} fontFamily={'sans'}/>
              <Calender textcolor={"#121212"} fontFamily={'sans'}/>
            </span>
          </div>
          <div className="mt-3 flex flex-col   mb-4 ">
            <label className="text-[12px] font-medium ">
              Full Name
            </label>
            <input
              className="rounded-[8px]  w-[240px] xsm:w-[280px]  xsm:h-[48px] h-[35px] border-[1px] border-[#1212125C] "
              type="text"
            />
          </div>
          <div className="flex flex-col  mb-4 ">
            <label className="text-[12px] font-medium ">
              Email
            </label>
            <input
              className="rounded-[8px] w-[240px] xsm:w-[280px]  xsm:h-[48px] h-[35px] border-[1px] border-[#1212125C]"
              type="email"
            />
          </div>
          <div className="flex flex-col  mb-5 ">
            <label className="text-[12px] font-medium ">
              Message(Optional)
            </label>
            <input
              className="rounded-[8px] w-[240px] xsm:w-[280px]  h-[50px] xsm:h-[85px] border-[1px] border-[#1212125C] "
              type="text"
            />
          </div>
          <div className="w-full flex justify-center items-center">
            <button className="w-[81px] h-9   border-[#121212] border-r-[4px] border-b-[4px] rounded-[8px] font-bold text-[14px]">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
