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
        className={`mt-6 xl:mt-12 w-full flex gap-4 overflow-scroll xl:w-[1182px]`}
        style={{ scrollBehavior: "smooth" }}
        ref={VideoContainerRef}
      >
        {videos === undefined ||
        (videos != undefined ? videos.length == 0 : false) ? (
          <>
            <div className="relative flex flex-col ">
              <div className="w-80 h-[178px] xl:w-[560px] xl:h-[320px] rounded-[20px] mb-3 flex   ">
                <img
                  className="w-full h-full rounded-[20px] object-cover"
                  src={image1}
                />
              </div>
              <p className="text-[14px] xl:hidden block font-medium   ">
                Title of the video goes here. This can be a two line text
              </p>
              <div className="absolute top-[70px] left-[150px] xl:top-[110px] xl:left-[270px] w-10 h-10 xl:w-[72px] xl:h-[72px] p-2 xl:p-5 justify-center items-center rounded-[40px] backdrop-[10px] bg-[#FFFFFF4D] text-white text-center ">
                <div className="items-center justify-center flex w-full h-full p-1 xl:w-8 xl:h-8">
                  <HiPlay />
                </div>
              </div>
            </div>
            <div className="relative flex flex-col">
              <div className="w-80 h-[178px] xl:w-[560px] xl:h-[320px] rounded-[20px] mb-3 flex ">
                <img
                  className="w-full h-full rounded-[20px] object-cover"
                  src={image1}
                />
              </div>
              <p className="text-[14px] xl:hidden block font-medium ">
                Title of the video goes here. This can be a two line text
              </p>
              <div className="absolute top-[70px] left-[150px] xl:top-[110px] xl:left-[270px] w-10 h-10 xl:w-[72px] xl:h-[72px] p-2 xl:p-5 justify-center items-center rounded-[40px] backdrop-[10px] bg-[#FFFFFF4D] text-white text-center ">
                <div className="items-center justify-center flex w-full h-full p-1 xl:w-8 xl:h-8">
                  <HiPlay />
                </div>
              </div>
            </div>
            <div className="relative flex flex-col">
              <div className="w-80 h-[178px] xl:w-[560px] xl:h-[320px] rounded-[20px] mb-3 flex ">
                <img
                  className="w-full h-full rounded-[20px] object-cover"
                  src={image1}
                />
              </div>
              <p className="text-[14px] xl:hidden block font-medium ">
                Title of the video goes here. This can be a two line text
              </p>
              <div className="absolute top-[70px] left-[150px] xl:top-[110px] xl:left-[270px] w-10 h-10 xl:w-[72px] xl:h-[72px] p-2 xl:p-5 justify-center items-center rounded-[40px] backdrop-[10px] bg-[#FFFFFF4D] text-white text-center ">
                <div className="items-center justify-center flex w-full h-full p-1 xl:w-8 xl:h-8">
                  <HiPlay />
                </div>
              </div>
            </div>
            <div className="relative flex flex-col">
              <div className="w-80 h-[178px] xl:w-[560px] xl:h-[320px] rounded-[20px] mb-3 flex ">
                <img
                  className="w-full h-full rounded-[20px] object-cover"
                  src={image1}
                />
              </div>
              <p className="text-[14px] xl:hidden block font-medium ">
                Title of the video goes here. This can be a two line text
              </p>
              <div className="absolute top-[70px] left-[150px] xl:top-[110px] xl:left-[270px] w-10 h-10 xl:w-[72px] xl:h-[72px] p-2 xl:p-5 justify-center items-center rounded-[40px] backdrop-[10px] bg-[#FFFFFF4D] text-white text-center ">
                <div className="items-center justify-center flex w-full h-full p-1 xl:w-8 xl:h-8">
                  <HiPlay />
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {videos.map((video, index) => {
              
              return (
                <div className="relative flex flex-col " key={index}>
                  <div className="w-80 h-[178px] xl:w-[560px] xl:h-[320px] rounded-[20px] mb-3 flex   ">
                    <iframe
                      src={`https://www.youtube.com/embed/${video.userName}`}
                      title="YouTube video player"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen
                      className="w-full h-full rounded-[20px]"
                    ></iframe>
                  </div>
                  <p className="text-[14px] xl:hidden block font-medium   ">
                    Title of the video goes here. This can be a two line text
                  </p>
                </div>
              );
            })}
          </>
        )}
      </div>
      <div className="absolute w-full xl:bottom-[176px] bottom-[150px]">
        <div className="relative z-50  w-full">
          <LeftRightScrollBtn
            refrence={VideoContainerRef}
            classStyle='absolute p-1 rounded-full bg-white text-xl shadow-[0_2px_8px_0_rgba(171,181,217,0.14)] xl:p-5 sm:p-3 p-2 border-[2px] border-[#121212] '

            // left={"left-[-16px] xl:left-[-30px] sm:left-[-20px]"}
            // right={"right-[-16px] sm:right-[-17px] xl:right-[-30px]"}

            scrollLength={600}
          />
        </div>
      </div>
    </div>
  );
}
