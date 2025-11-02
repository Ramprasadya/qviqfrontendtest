import React, { useContext, useState, useRef, useEffect } from "react";
import {
  HiOutlineChevronDown,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlinePencilAlt,
} from "react-icons/hi";

import Axios from "axios";
import LeftRightScrollBtn from "../../Utils/LeftRightScrollBtn";
import { UserContext } from "../../Contexts/context";
import image1 from "../images/image1.jpg";

import { HiPlay } from "react-icons/hi2";


export default function Videos(props) {
  const videos = props.videos;

  const style = {
    width: props.width,
    background: props.color,
    color: props.textcolor,
    height: props.height,
    padding: props.padding,
  };

  const VideoContainerRef = useRef(null);

  return (
    <div
      className={`relative flex justify-center items-center w-full ${props.fontFamily}`}
      style={style}
    >
      <div
        className={`mt-6 xl:mt-12 w-full flex gap-4 overflow-scroll `}
        style={{ scrollBehavior: "smooth" }}
        ref={VideoContainerRef}
      >
        {videos === undefined ||
        (videos != undefined ? videos.length == 0 : false) ? (
          <>
            <div className="relative flex flex-col text-left ">
              <div className="w-80 h-[178px] rounded-[20px] mb-3 flex   ">
                <img
                  className="w-full h-full rounded-[20px] object-cover"
                  src={image1}
                />
              </div>
              <p className="text-[14px]  block font-medium   ">
                Title of the video goes here. This can be a two line text
              </p>
              <div className="absolute top-[70px] left-[150px]  w-10 h-10  p-2  justify-center items-center rounded-[40px] backdrop-[10px] bg-[#FFFFFF4D] text-white text-center ">
                <div className="items-center justify-center flex w-full h-full p-1 ">
                  <HiPlay />
                </div>
              </div>
            </div>
            <div className="relative flex flex-col text-left">
              <div className="w-80 h-[178px]  rounded-[20px] mb-3 flex ">
                <img
                  className="w-full h-full rounded-[20px] object-cover"
                  src={image1}
                />
              </div>
              <p className="text-[14px]  block font-medium ">
                Title of the video goes here. This can be a two line text
              </p>
              <div className="absolute top-[70px] left-[150px]  w-10 h-10  p-2  justify-center items-center rounded-[40px] backdrop-[10px] bg-[#FFFFFF4D] text-white text-center ">
                <div className="items-center justify-center flex w-full h-full p-1 ">
                  <HiPlay />
                </div>
              </div>
            </div>
            <div className="relative flex flex-col text-left">
              <div className="w-80 h-[178px]  rounded-[20px] mb-3 flex ">
                <img
                  className="w-full h-full rounded-[20px] object-cover"
                  src={image1}
                />
              </div>
              <p className="text-[14px]  block font-medium ">
                Title of the video goes here. This can be a two line text
              </p>
              <div className="absolute top-[70px] left-[150px]  w-10 h-10  p-2  justify-center items-center rounded-[40px] backdrop-[10px] bg-[#FFFFFF4D] text-white text-center ">
                <div className="items-center justify-center flex w-full h-full p-1 ">
                  <HiPlay />
                </div>
              </div>
            </div>
            <div className="relative flex flex-col text-left">
              <div className="w-80 h-[178px]  rounded-[20px] mb-3 flex ">
                <img
                  className="w-full h-full rounded-[20px] object-cover"
                  src={image1}
                />
              </div>
              <p className="text-[14px]  block font-medium ">
                Title of the video goes here. This can be a two line text
              </p>
              <div className="absolute top-[70px] left-[150px]  w-10 h-10  p-2  justify-center items-center rounded-[40px] backdrop-[10px] bg-[#FFFFFF4D] text-white text-center ">
                <div className="items-center justify-center flex w-full h-full p-1 ">
                  <HiPlay />
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {videos.map((video, index) => {
              return (
                <div className="relative flex flex-col text-left " key={index}>
                  <div className="w-80 h-[178px]  rounded-[20px] mb-3 flex   ">
                    <iframe
                      src={`https://www.youtube.com/embed/${video.userName}`}
                      title="YouTube video player"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen
                      className="w-full h-full rounded-[20px]"
                    ></iframe>
                  </div>
                  <p className="text-[14px]  block font-medium   ">
                    Title of the video goes here. This can be a two line text
                  </p>
                </div>
              );
            })}
          </>
        )}
      </div>
      <div className="absolute w-full  bottom-[140px]">
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
