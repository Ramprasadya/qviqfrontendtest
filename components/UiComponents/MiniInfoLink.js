import React, { useState } from "react";
import { SafeLocalStorage } from "../utils";
const MiniInfoLink = (props) => {
  // console.log(props);
  const handleClick = () => {
    SafeLocalStorage.setItem("currentComponent", props.para);
  };

  return (
    <>
      <button
        onClick={() => {
          props.current(props.para);
          handleClick();
        }}
        className="hidden md:flex miniInfo items-center gap-3 rounded-lg hover:text-black min-w-max"
        style={{
          background: "#FFFFFF",
          boxShadow:
            props.isActive === props.para &&
            "0px 2px 16px rgba(167, 167, 167, 0.14)",
          border:
            props.isActive === props.para
              ? "2px solid #817C7C"
              : "1px solid #E8E8E8",
        }}
      >
        <span
          className={` ${
            props.isActive === props.para
              ? " bg-[linear-gradient(255deg,rgba(251,102,9)0%,rgba(228,8,73)100%)]"
              : "bg-black"
          } text-white p-1 rounded-lg`}
        >
          {props.startLogo}
        </span>
        <p className="text-base font-medium">{props.para}</p>
        {props.active && (
          <span className="text-yellow-400 ps-4">{props.endLogo}</span>
        )}
      </button>
      <button
        onClick={() => {
          props.current(props.para);
          handleClick();
        }}
        className={`relative flex md:hidden items-center gap-3 px-1 py-3 hover:text-black min-w-max z-10 ${
          props.isActive === props.para
            ? "before:content-[''] before:absolute before:left-0 before:right-0 before:h-[3px] before:bg-gradient-to-r before:from-[#fb6609] before:to-[#e40849] before:bottom-[0] z-10"
            : ""
        }`}
        // style={{
        //   background: "#FFFFFF",
        //   boxShadow:
        //     props.isActive === props.para &&
        //     "0px 2px 16px rgba(167, 167, 167, 0.14)",
        //   border: props.isActive === props.para ? "2px solid #817C7C" : "1px solid #E8E8E8"
        // }}
      >
        {/* <span
        className={` ${props.isActive === props.para ? " bg-[linear-gradient(255deg,rgba(251,102,9)0%,rgba(228,8,73)100%)]" : "bg-black"
          } text-white p-1 rounded-lg`}
      >
        {props.startLogo}
      </span> */}
        <p
          className={`text-[13px] ${
            props.isActive === props.para
              ? "font-[500] text-transparent bg-clip-text"
              : "font-[400] text-black"
          }`}
          style={{
            backgroundImage:
              props.isActive === props.para
                ? "linear-gradient(225deg, #FB6609 0%, #E40849 100%)"
                : "none",
          }}
        >
          {props.para}
        </p>
        {/* {props.active && <span className="text-yellow-400 ps-4">{props.endLogo}</span>} */}
      </button>
    </>
  );
};

export default MiniInfoLink;
