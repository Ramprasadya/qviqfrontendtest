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
    <div className={`justify-center items-center flex xl:mt-12 mt-6 ${props.fontFamily}`} style={style}>
      <div className=" w-[260px] xsm:w-[320px] sm:w-[540px] xsm2:w-[390px]    xl:w-[1182px]  bg-[#ffffff] rounded-[16px] p-5 xl:py-10 xl:justify-center xl:items-center xl:flex relative">
        <div className="absolute w-[159px] h-[87px] right-0 bottom-[68px] hidden xl:flex">
          <img src={sideLines}/>
        </div>
        <div className="flex flex-col xsm2:justify-center xsm2:items-center">
          <h1 className="text-[14px] font-bold mb-4 xl:mb-7 xl:text-[20px]">
            Book a one-on-one call
          </h1>
          <div className="flex overflow-scroll xsm2:w-[380px] sm:w-[480px] xl:mb-8 xsm2:mb-3">
            <Calender textcolor={"#121212"} fontFamily={'sans'}/>
            <Calender textcolor={"#121212"} fontFamily={'sans'}/>
            <Calender textcolor={"#121212"} fontFamily={'sans'} />
            <Calender textcolor={"#121212"} fontFamily={'sans'}/>
            <Calender textcolor={"#121212"} fontFamily={'sans'}/>
            <span className="flex xl:hidden">
              <Calender textcolor={"#121212"} fontFamily={'sans'}/>
              <Calender textcolor={"#121212"} fontFamily={'sans'}/>
            </span>
          </div>
          <div className="mt-3 flex flex-col   mb-4 xl:mb-6">
            <label className="text-[12px] font-medium ">
              Full Name
            </label>
            <input
              className="rounded-[8px]  xsm:w-[280px] sm:w-[300px] xl:w-[360px] xsm:h-[48px] h-[35px] border-[1px] border-[#1212125C] "
              type="text"
            />
          </div>
          <div className="flex flex-col  mb-4 xl:mb-6">
            <label className="text-[12px] font-medium ">
              Email
            </label>
            <input
              className="rounded-[8px] xsm:w-[280px] sm:w-[300px] xl:w-[360px] xsm:h-[48px] h-[35px] border-[1px] border-[#1212125C]"
              type="email"
            />
          </div>
          <div className="flex flex-col  mb-5 xl:mb-6">
            <label className="text-[12px] font-medium ">
              Message(Optional)
            </label>
            <input
              className="rounded-[8px] xsm:w-[280px] sm:w-[300px] xl:w-[360px] h-[50px] xsm:h-[85px] border-[1px] border-[#1212125C] "
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
