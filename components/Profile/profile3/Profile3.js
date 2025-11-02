import React from "react";
import Image from "./Image";
import Video from "./Video";
import Social from "./Social";
import images from "./images";
import simages from "./simages";
import pimages from "./pimages";

export default function Profile3(props) {
  return (
    <div
      className="flex  bg-gray-100  xsm:w-[360px] w-[280px]"
      id="profile"
      style={{ display: "block" }}
    >
      <div className="flex justify-between ">
        <img
          className="h-[26px] w-[22px] ml-[24px] mt-[61px]"
          alt="pimg"
          src={pimages.refresh}
        />
        <img
          alt="pimg"
          className="rounded-full  mt-[81px] xsm:h-[158px] xsm:w-[158px] w-[135px] h-[135px]"
          src={props.profileimage ? props.profileimage : pimages.profileimg}
        />
        <img
          alt="pimg"
          className="h-[26px] w-[22px] mr-[24px] mt-[61px] "
          src={pimages.download}
        />
      </div>

      <h1 className="font-black text-[36px] text-center mt-[32px] mb-[8px] xsm:text-2xl text:xl">
        {props.name ? props.name : "Full Name"}
      </h1>
      <h3 className="text-[16px] text-center font-bold mb-[16px]">
        {props.jobTitle ? props.jobTitle : "Job Title"}
      </h3>
      <h5 className="xsm:text-sm text-[14px] text-center font-medium xsm:mx-4 mx-1">
        {props.description ? props.description : "About Yourself"}
      </h5>

      <Image image={props.images} staticimage={images} />
      <Video videos={props.videos} staticvideo={images} />
      <Social image={simages} pdfs={props.pdfs} apps={props.apps} />

      <div className="flex flex-col justify-center items-center mt-[58px]">
        <h1 className="text-[20px] font-bold mb-[8px]">Contact Details</h1>
        <div className="flex justify-between items-center bg-white mb-[8px] w-[335px] h-[71px] rounded-[12px]">
          <img
            alt="location"
            className="ml-[30px] h-[23.5px] w-[19.68px]"
            src={pimages.location}
          />
          <p className="text-[16px]">
            {props.location ? props.location : "Lorem ipsum dolor sit amet "}
          </p>
          <img
            alt="moreicon"
            className="mr-[30px] h-[8px] w-[4px]"
            src={pimages.arrow}
          />
        </div>
        <div className="flex justify-between items-center bg-white mb-[8px] w-[335px] h-[71px] rounded-[12px]">
          <img
            alt="location"
            className="ml-[30px] h-[23.96px] w-[23.96px]"
            src={pimages.contact}
          />
          <p className="text-[16px]">
            {props.newMobileNumber
              ? props.newMobileNumber
              : "Lorem ipsum dolor sit amet  "}
          </p>
          <img
            alt="moreicon"
            className="mr-[30px] h-[8px] w-[4px]"
            src={pimages.arrow}
          />
        </div>
        <div className="flex justify-between items-center bg-white mb-[8px] w-[335px] h-[71px] rounded-[12px]">
          <img
            alt="location"
            className="ml-[30px] h-[22px] w-[24px]"
            src={pimages.mail}
          />
          <p className="text-[16px]">
            {props.mail ? props.mail : "Lorem ipsum dolor sit amet "}
          </p>
          <img
            alt="moreicon"
            className="mr-[30px] h-[8px] w-[4px]"
            src={pimages.arrow}
          />
        </div>
        <div className="flex justify-between items-center bg-white w-[335px] h-[71px] rounded-[12px]">
          <img
            alt="location"
            className="ml-[30px] h-[12.48px] w-[24px]"
            src={pimages.link}
          />
          <p className="text-[16px]">
            {props.link ? props.link : "Lorem ipsum dolor sit amet"}
          </p>
          <img
            alt="moreicon"
            className="mr-[30px] h-[8px] w-[4px]"
            src={pimages.arrow}
          />
        </div>
      </div>

      <div className="flex justify-center mt-[58px] ">
        <img
          alt="logo"
          src={pimages.logo}
          className="w-[85.24px] mb-[58px] h-[21px]"
        />
      </div>
    </div>
  );
}
