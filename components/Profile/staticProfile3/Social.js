import React from "react";

export default function Social(props) {
  const { image } = props;
  return (
    <div className="flex flex-col justify-center items-center mx-[16px] my-2 ">
      <div className="grid grid-cols-2 gap-[8px] mt-11 justify-center  w-full ">
        <div className="  flex justify-center  items-center bg-purple-500 rounded-2xl h-[100px]  w-full">
          {" "}
          <img
            alt="socialimages"
            className="w-[39px] h-[39px]"
            src={image.insta}
          />
        </div>
        <div className="  flex justify-center items-center bg-black rounded-2xl h-[100px]  w-full   ">
          {" "}
          <img
            alt="socialimages"
            className="w-[39px] h-[39px]"
            src={image.tiktok}
          />
        </div>
        <div className="  flex justify-center items-center bg-red-700 rounded-2xl h-[100px]  w-full ">
          {" "}
          <img
            alt="socialimages"
            className="w-[39px] h-[39px]"
            src={image.ytube2}
          />
        </div>
        <div className="  flex justify-center items-center bg-yellow-300 rounded-2xl h-[100px]  w-full  ">
          {" "}
          <img
            alt="socialimages"
            className="w-[39px] h-[39px]"
            src={image.snap2}
          />
        </div>
      </div>

      <h1 className="mt-12 xsm:mb-12 font-bold">Social Links</h1>

      <div className="grid grid-cols-2 gap-[8px]  justify-center  w-full ">
        <div className="  flex justify-center  items-center bg-white rounded-2xl h-[100px]  w-full">
          {" "}
          <img
            alt="socialimages"
            className=" h-[39px] w-[39px]"
            src={image.git}
          />
        </div>
        <div className="  flex justify-center items-center bg-white rounded-2xl h-[100px]  w-full   ">
          {" "}
          <img
            alt="socialimages"
            className=" h-[39px] w-[39px]"
            src={image.tiktok}
          />
        </div>
        <div className="  flex justify-center items-center bg-white rounded-2xl h-[100px]  w-full ">
          {" "}
          <img
            alt="socialimages"
            className=" h-[39px] w-[39px]"
            src={image.ytube}
          />
        </div>
        <div className="  flex justify-center items-center bg-white rounded-2xl h-[100px]  w-full  ">
          {" "}
          <img
            alt="socialimages"
            className=" h-[39px] w-[39px]"
            src={image.snap}
          />
        </div>
      </div>

      <h1 className="mt-12 mb-12 font-bold">PDF'S</h1>

      <div className="grid grid-cols-2 gap-[8px] justify-center  w-full ">
        <div className="  flex flex-col justify-center  items-center bg-white rounded-2xl h-[100px]  w-full">
          <img
            alt="socialimages"
            className=" h-[43px] w-[33px]"
            src={image.pdf}
          />
          <h1 className="text-[10px] mt-3.5 font-medium ">My Catalogue</h1>
        </div>
        <div className="  flex flex-col justify-center items-center bg-white rounded-2xl h-[100px]  w-full   ">
          <img
            alt="socialimages"
            className=" h-[43px] w-[33px]"
            src={image.pdf}
          />
          <h1 className="text-[10px] mt-3.5 font-medium ">Resume</h1>
        </div>
        <div className="  flex flex-col justify-center items-center bg-white rounded-2xl h-[100px] mb-1 w-full ">
          <img
            alt="socialimages"
            className=" h-[43px] w-[33px]"
            src={image.pdf}
          />
          <h1 className="text-[10px] mt-3.5 font-medium ">My Portfolio</h1>
        </div>
        <div className="  flex flex-col justify-center items-center bg-white rounded-2xl h-[100px] mb-1  w-full  ">
          <img
            alt="socialimages"
            className=" h-[43px] w-[33px]"
            src={image.pdf}
          />
          <h1 className="text-[10px] mt-3.5 font-medium ">Upcoming Projects</h1>
        </div>
      </div>
    </div>
  );
}
