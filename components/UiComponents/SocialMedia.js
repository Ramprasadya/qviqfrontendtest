import React from "react";

import { HiOutlinePlusCircle } from "react-icons/hi";

// function starts here
function SocialMedia(props) {
  return (
    <div className="relative w-full min-w-[250px] min-[640px]:max-w-[300px] lg:max-w-[350px] 2xl:max-w-full h-[64px] rounded-[12px] mb-[8px] gap-[8px] p-[16px] bg-[#FFFFFF] shadow-md flex justify-between hover:cursor-pointer" onClick={props.onClick}>
      <div className="flex items-center gap-x-2">
        <img src={props.img} alt="social-logo" className="w-10" />
        <p>{props.text}</p>
      </div>

      <div className="flex items-center gap-x-2 text-pink1 font-medium">
        <span className="cursor-pointer font-semibold">
          <HiOutlinePlusCircle />
        </span>
        <p className="text-sm">Add</p>
      </div>
    </div>
  );
}

export default SocialMedia;
