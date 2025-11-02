import React, { useState, useEffect, useRef } from "react";
import * as hi from "react-icons/hi";
import * as ri from "react-icons/ri";

import MiniInfoLink from "./MiniInfoLink";
import LeftRightScrollBtn from "../Utils/LeftRightScrollBtn";
function MiniInfo(props) {
  const miniInfoData = [
    {
      id: 2,
      startLogo: <hi.HiOutlineUser />,
      para: "Basic Details",
      endLogo: <ri.RiVipCrownFill />,
      activeEnd: false,
      isActive: props.present,
    },
    {
      id: 1,
      startLogo: <hi.HiLink />,
      para: "Add Links",
      endLogo: <ri.RiVipCrownFill />,
      activeEnd: true,
      isActive: props.present,
    },
    {
      id: 3,
      startLogo: <hi.HiOutlineDocumentAdd />,
      para: "Modules",
      endLogo: <ri.RiVipCrownFill />,
      activeEnd: false,
      isActive: props.present,
    },
    // {
    //     id: 4,
    //     startLogo: <hi.HiQrcode />,
    //     para: "Tapop QR",
    //     endLogo: <ri.RiVipCrownFill />,
    //     activeEnd: false,
    //     isActive: props.present,
    // },
    {
      id: 5,
      startLogo: <hi.HiOutlineTemplate />,
      para: "Templates",
      endLogo: <ri.RiVipCrownFill />,
      activeEnd: false,
      isActive: props.present,
    },
  ];

  const miniInfoDataMd = [
    {
      id: 1,
      startLogo: <hi.HiOutlineUser />,
      para: "Basic Details",
      endLogo: <ri.RiVipCrownFill />,
      activeEnd: false,
      isActive: props.present,
    },
    {
      id: 2,
      startLogo: <hi.HiLink />,
      para: "Add Links",
      endLogo: <ri.RiVipCrownFill />,
      activeEnd: true,
      isActive: props.present,
    },
    {
      id: 3,
      startLogo: <hi.HiOutlineDocumentAdd />,
      para: "Modules",
      endLogo: <ri.RiVipCrownFill />,
      activeEnd: false,
      isActive: props.present,
    },
    // {
    //     id: 4,
    //     startLogo: <hi.HiQrcode />,
    //     para: "Tapop QR",
    //     endLogo: <ri.RiVipCrownFill />,
    //     activeEnd: false,
    //     isActive: props.present,
    // },
    {
      id: 5,
      startLogo: <hi.HiOutlineTemplate />,
      para: "Templates and Designs",
      endLogo: <ri.RiVipCrownFill />,
      activeEnd: false,
      isActive: props.present,
    },
  ];

  const finalArr = miniInfoData.map((info) => (
    <MiniInfoLink
      key={info.id}
      id={info.id}
      startLogo={info.startLogo}
      para={info.para}
      endLogo={info.endLogo}
      active={info.activeEnd}
      isActive={info.isActive}
      current={props.current}
    />
  ));

  const finalArrMd = miniInfoDataMd.map((info) => (
    <MiniInfoLink
      key={info.id}
      id={info.id}
      startLogo={info.startLogo}
      para={info.para}
      endLogo={info.endLogo}
      active={info.activeEnd}
      isActive={info.isActive}
      current={props.current}
    />
  ));

  const miniInfoContainer = useRef(null);

  return (
    <div className="border-b-[0.0625rem] border-t-[0.0625rem] md:border-b-[0px] md:border-t-0 relative ">
      <div
        className="flex md:hidden px-[5px] md:px-6 gap-x-[10px] justify-around md:justify-start md:gap-x-5 relative top-[0.5px]"
        ref={miniInfoContainer}
      >
        {finalArr}
      </div>
      <div
        className="hidden md:flex px-[5px] md:px-6 gap-x-[10px] justify-around md:justify-start md:gap-x-5 overflow-scroll"
        ref={miniInfoContainer}
      >
        {finalArrMd}
      </div>
      <LeftRightScrollBtn
        refrence={miniInfoContainer}
        style={{ border: ".5px solid black" }}
      />
    </div>
  );
}

export default MiniInfo;
