import React from "react";
import { RiInstagramLine } from "react-icons/ri";
import { RiYoutubeLine } from "react-icons/ri";
import { RiTwitterLine } from "react-icons/ri";
import { RiSpotifyLine } from "react-icons/ri";
import { RiLinkedinBoxFill } from "react-icons/ri";
import { RiWhatsappLine } from "react-icons/ri";
import { RiFacebookBoxFill } from "react-icons/ri";
import { RiRedditLine } from "react-icons/ri";
import instagram from "../images/instagram.png";
import youtube from "../images/youtube.png";
import twitter from "../images/twitter.png";

export default function SocialLinks(props) {
  const apps = props.apps;
  const fill = props.fill;
  const iconType = props.iconType;

  return (
    <>
      <div className="flex  justify-center items-center  gap-x-2 xsm:gap-x-4  mb-[20px] sans  ">
        {(
          apps != undefined
            ? apps.social != undefined
              ? apps.social.filter((app) => {
                  return app.isOn;
                }).length != 0
                ? false
                : true
              : true
            : true
        ) ? (
          <>
            <div className="flex-col justify-center items-center">
              <div className="flex  justify-center items-center gap-x-2 xsm:gap-x-4">
                <div className=" w-[56px] h-[56px] xsm:w-[96px] xsm:h-[96px] p-[32px]  justify-center items-center  rounded-[20px] backdrop-blur-[10px] bg-[#FFFFFF4D] border-t-[2px] border-l-[2px] border-r-[2px] border-white flex ">
                  <span className={`${props.size} text-[${fill}]`}>
                    <RiYoutubeLine fill={fill} />
                  </span>
                </div>

                <div className=" w-[56px] h-[56px] xsm:w-[96px] xsm:h-[96px] p-[32px]  justify-center items-center  rounded-[20px] backdrop-blur-[10px] bg-[#FFFFFF4D] border-t-[2px] border-l-[2px] border-r-[2px] border-white flex ">
                  <span className={`${props.size} text-[${fill}]`}>
                    <RiYoutubeLine fill={fill} />
                  </span>
                </div>

                <div className=" w-[56px] h-[56px] xsm:w-[96px] xsm:h-[96px] p-[32px]  justify-center items-center  rounded-[20px] backdrop-blur-[10px] bg-[#FFFFFF4D] border-t-[2px] border-l-[2px] border-r-[2px] border-white flex ">
                  <span className={`${props.size} text-[${fill}]`}>
                    <RiFacebookBoxFill fill={fill} />
                  </span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-wrap   justify-center items-center gap-2">
            {apps.social.map((app, index) => {
              return (
                <div
                  className=" w-[56px] h-[56px] xsm:w-[96px] xsm:h-[96px] p-[32px] flex justify-center items-center  rounded-[20px] backdrop-blur-[10px] bg-[#FFFFFF4D] border-t-[2px] border-l-[2px] border-r-[2px] border-white  "
                  key={index}
                >
                  <img
                    className="xl:w-11 xl:h-11 xsm:w-8 xsm:h-8 "
                    src={require(`../../Logos/TemplateLogos/${iconType}/${app.platform
                      .toLowerCase()
                      .split(" ")
                      .join("")}.svg`).default.src}
                  />
                </div>
              );
            })}
            {apps.blog.map((app, index) => {
              return (
                <div
                  className=" w-[56px] h-[56px] xsm:w-[96px] xsm:h-[96px] p-[32px] flex justify-center items-center  rounded-[20px] backdrop-blur-[10px] bg-[#FFFFFF4D] border-t-[2px] border-l-[2px] border-r-[2px] border-white  "
                  key={index}
                >
                  <img
                    className="xl:w-11 xl:h-11 xsm:w-8 xsm:h-8 "
                    src={require(`../../Logos/TemplateLogos/${iconType}/${app.platform
                      .toLowerCase()
                      .split(" ")
                      .join("")}.svg`).default.src}
                  />
                </div>
              );
            })}
            {apps.music.map((app, index) => {
              return (
                <div
                  className=" w-[56px] h-[56px] xsm:w-[96px] xsm:h-[96px] p-[32px] flex justify-center items-center  rounded-[20px] backdrop-blur-[10px] bg-[#FFFFFF4D] border-t-[2px] border-l-[2px] border-r-[2px] border-white  "
                  key={index}
                >
                  <img
                    className="xl:w-11 xl:h-11 xsm:w-8 xsm:h-8 "
                    src={require(`../../Logos/TemplateLogos/${iconType}/${app.platform
                      .toLowerCase()
                      .split(" ")
                      .join("")}.svg`).default.src}
                  />
                </div>
              );
            })}
            {apps.crypto.map((app, index) => {
              return (
                <div
                  className=" w-[56px] h-[56px] xsm:w-[96px] xsm:h-[96px] p-[32px] flex justify-center items-center  rounded-[20px] backdrop-blur-[10px] bg-[#FFFFFF4D] border-t-[2px] border-l-[2px] border-r-[2px] border-white  "
                  key={index}
                >
                  <img
                    className="xl:w-11 xl:h-11 xsm:w-8 xsm:h-8 "
                    src={require(`../../Logos/TemplateLogos/${iconType}/${app.platform
                      .toLowerCase()
                      .split(" ")
                      .join("")}.svg`).default.src}
                  />
                </div>
              );
            })}
            {apps.ecommerce.map((app, index) => {
              return (
                <div
                  className=" w-[56px] h-[56px] xsm:w-[96px] xsm:h-[96px] p-[32px] flex justify-center items-center  rounded-[20px] backdrop-blur-[10px] bg-[#FFFFFF4D] border-t-[2px] border-l-[2px] border-r-[2px] border-white  "
                  key={index}
                >
                  <img
                    className="xl:w-11 xl:h-11 xsm:w-8 xsm:h-8 "
                    src={require(`../../Logos/TemplateLogos/${iconType}/${app.platform
                      .toLowerCase()
                      .split(" ")
                      .join("")}.svg`).default.src}
                  />
                </div>
              );
            })}
            {apps.other.map((app, index) => {
              return (
                <div
                  className=" w-[56px] h-[56px] xsm:w-[96px] xsm:h-[96px] p-[32px] flex justify-center items-center  rounded-[20px] backdrop-blur-[10px] bg-[#FFFFFF4D] border-t-[2px] border-l-[2px] border-r-[2px] border-white  "
                  key={index}
                >
                  <img
                    className="xl:w-11 xl:h-11 xsm:w-8 xsm:h-8 "
                    src={require(`../../Logos/TemplateLogos/${iconType}/${app.platform
                      .toLowerCase()
                      .split(" ")
                      .join("")}.svg`).default.src}
                  />
                </div>
              );
            })}
            {apps.payment.map((app, index) => {
              return (
                <div
                  className=" w-[56px] h-[56px] xsm:w-[96px] xsm:h-[96px] p-[32px] flex justify-center items-center  rounded-[20px] backdrop-blur-[10px] bg-[#FFFFFF4D] border-t-[2px] border-l-[2px] border-r-[2px] border-white  "
                  key={index}
                >
                  <img
                    className="xl:w-11 xl:h-11 xsm:w-8 xsm:h-8 "
                    src={require(`../../Logos/TemplateLogos/${iconType}/${app.platform
                      .toLowerCase()
                      .split(" ")
                      .join("")}.svg`).default.src}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
