"use client";
import React, { useState, useContext, useRef, useEffect } from "react";
import Navbar from "./header/Navbar";
import Footer from "./Footer";
import { serverUrl, clientUrl } from "../../config";
import "../UiComponents/iconTextStyle.css";
import { UserContext } from "../Contexts/context";
import "../ProfileCategory/profile.css";
import Image from "next/image";
import NewModal from "../UiComponents/NewModal/NewModal";
import PrimaryButton2 from "../UiComponents/PrimaryButton2";
import { createQueryString } from "@/components/utils";

import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import TapopLogo from "../Login/assets/Tapop Final Logo Concept 1 2.svg";
import { HiChevronRight, HiOutlineArrowSmRight } from "react-icons/hi";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Carousel3 from "../UiComponents/Carousel3";
import Carousel from "react-simply-carousel";

import Template2Mobile from "../ProfileTemplates/Template2Mobile/Template2Mobile";
import Template3Mobile from "../ProfileTemplates/Template3Mobile/Template3Mobile";
import Template4Mobile from "../ProfileTemplates/Template4Mobile/Template4Mobile";
import Template5Mobile from "../ProfileTemplates/Template5Mobile/Template5Mobile";
import Template6Mobile from "../ProfileTemplates/Template6Mobile/Template6Mobile";
import Template7Mobile from "../ProfileTemplates/Template7Mobile/Template7Mobile";
import {
  Template10Bg,
  Template11Bg,
  Template12Bg,
  Template13Bg,
  Template8Bg,
  Template9Bg,
  Template14Bg,
  Template15Bg,
  Template16Bg,
  Template17Bg,
  Template18Bg,
  Template19Bg,
  Template20Bg,
  Template21Bg,
  Template22Bg,
  Template23Bg,
  Template24Bg,
  Template25Bg,
  Template26Bg,
  Template27Bg,
  Template28Bg,
  Template29Bg,
  Template30Bg,
} from "../ProfileTemplates/TempateBg/MobileTemplateBg";
import Template11Mobile from "../ProfileTemplates/Template11Mobile/Template11Mobile";
import Template29Mobile from "../ProfileTemplates/Template29Mobile/Template29Mobile";
import Template30Mobile from "../ProfileTemplates/Template30Mobile/Template30Mobile";
import Template8Mobile from "../ProfileTemplates/Template8Mobile/Template8Mobile";
import TemplatePreview from "../UiComponents/TemplatePreview";
import { useRouter, useParams } from "next/navigation";
import "../UiComponents/UiStyles.css";
import { IoIosArrowBack } from "react-icons/io";
import { FiEye } from "react-icons/fi";
import PrimaryButton3 from "../UiComponents/PrimaryButton3";
import Link from "next/link";

const Templates = ({searchParams}) => {
  const navigate = useRouter();

  const { username } = useContext(UserContext);
  const [template, setTemplate] = useState("template1");
  const [templateIndex, setTemplateIndex] = useState();
  const [templatePreview, setTemplatePreview] = useState(false);

  useEffect(()=>{
    if(searchParams.templateIndex && !isNaN(parseInt(searchParams.templateIndex)) && parseInt(searchParams.templateIndex) < templatesArray.length){
      setTemplateIndex(parseInt(searchParams.templateIndex));
      setTemplatePreview(true);
    }
  },[]);

  useEffect(()=>{
    if(templatePreview){
      document.body.style.overflow = "hidden"
    }else{
      document.body.style.overflow = "auto"
    }
  })

  const templatesArray = [
    {
      type: "template1",
      template: <Template2Mobile disable={true} />,
      thumbnail: require("../ProfileTemplates/images/thumbnail/temp (1).png")
        .default.src,
    },
    {
      type: "template2",
      template: <Template7Mobile disable={true} blur={true} />,
      thumbnail: require("../ProfileTemplates/images/thumbnail/temp (17).png")
        .default.src,
    },
    {
      type: "template3",
      template: (
        <Template8Mobile disable={true} mainbg={Template27Bg} square={false} />
      ),
      thumbnail: require("../ProfileTemplates/images/thumbnail/temp (15).png")
        .default.src,
    },
    {
      type: "template4",
      template: (
        <Template11Mobile
          disable={true}
          mainbg={Template11Bg}
          mainfg={`bg-[#F5775BBc]`}
        />
      ),
      thumbnail: require("../ProfileTemplates/images/thumbnail/temp (6).png")
        .default.src,
    },
    {
      type: "template5",
      template: (
        <Template7Mobile disable={true} mainbg={Template10Bg} square={false} />
      ),
      thumbnail: require("../ProfileTemplates/images/thumbnail/temp (16).png")
        .default.src,
    },
    {
      type: "template6",
      template: <Template4Mobile disable={true} />,
      thumbnail: require("../ProfileTemplates/images/thumbnail/temp (3).png")
        .default.src,
    },
    {
      type: "template7",
      template: (
        <Template11Mobile
          disable={true}
          mainbg={Template13Bg}
          mainfg={`bg-[#B284EEBc]`}
        />
      ),
      thumbnail: require("../ProfileTemplates/images/thumbnail/temp (8).png")
        .default.src,
    },
    {
      type: "template8",
      template: (
        <Template7Mobile disable={true} mainbg={Template20Bg} square={false} />
      ),
      thumbnail: require("../ProfileTemplates/images/thumbnail/temp (19).png")
        .default.src,
    },
    {
      type: "template9",
      template: <Template5Mobile disable={true} />,
      thumbnail: require("../ProfileTemplates/images/thumbnail/temp (4).png")
        .default.src,
    },

    {
      type: "template10",
      template: (
        <Template8Mobile disable={true} mainbg={Template24Bg} square={false} />
      ),
      thumbnail: require("../ProfileTemplates/images/thumbnail/temp (11).png")
        .default.src,
    },
    {
      type: "template11",
      template: (
        <Template7Mobile disable={true} mainbg={Template8Bg} square={false} />
      ),
      thumbnail: require("../ProfileTemplates/images/thumbnail/temp (18).png")
        .default.src,
    },
    {
      type: "template12",
      template: (
        <Template11Mobile
          disable={true}
          mainbg={Template12Bg}
          mainfg={"bg-[#C7E356Bc]"}
        />
      ),
      thumbnail: require("../ProfileTemplates/images/thumbnail/temp (7).png")
        .default.src,
    },
    {
      type: "template13",
      template: <Template3Mobile disable={true} />,
      thumbnail: require("../ProfileTemplates/images/thumbnail/temp (2).png")
        .default.src,
    },
    {
      type: "template14",
      template: (
        <Template7Mobile disable={true} mainbg={Template9Bg} blur={true} />
      ),
      thumbnail: require("../ProfileTemplates/images/thumbnail/temp (29).png")
        .default.src,
    },
    {
      type: "template15",
      template: (
        <Template29Mobile
          disable={true}
          mainbg={Template29Bg}
          mainfg={"bg-[#141414E5]"}
        />
      ),
      thumbnail: require("../ProfileTemplates/images/thumbnail/temp (9).png")
        .default.src,
    },
    {
      type: "template16",
      template: (
        <Template7Mobile disable={true} mainbg={Template14Bg} square={false} />
      ),
      thumbnail: require("../ProfileTemplates/images/thumbnail/temp (20).png")
        .default.src,
    },
    {
      type: "template17",
      template: (
        <Template7Mobile disable={true} mainbg={Template15Bg} square={false} />
      ),
      thumbnail: require("../ProfileTemplates/images/thumbnail/temp (22).png")
        .default.src,
    },
    {
      type: "template18",
      template: (
        <Template8Mobile disable={true} mainbg={Template26Bg} square={false} />
      ),
      thumbnail: require("../ProfileTemplates/images/thumbnail/temp (12).png")
        .default.src,
    },
    {
      type: "template19",
      template: <Template6Mobile disable={true} />,
      thumbnail: require("../ProfileTemplates/images/thumbnail/temp (5).png")
        .default.src,
    },
    {
      type: "template20",
      template: (
        <Template7Mobile disable={true} mainbg={Template16Bg} square={false} />
      ),
      thumbnail: require("../ProfileTemplates/images/thumbnail/temp (24).png")
        .default.src,
    },
    {
      type: "template21",
      template: (
        <Template8Mobile disable={true} mainbg={Template28Bg} square={false} />
      ),
      thumbnail: require("../ProfileTemplates/images/thumbnail/temp (13).png")
        .default.src,
    },
    {
      type: "template22",
      template: (
        <Template30Mobile
          disable={true}
          mainbg={Template30Bg}
          mainfg={"bg-[#ffffff]"}
        />
      ),
      thumbnail: require("../ProfileTemplates/images/thumbnail/temp (10).png")
        .default.src,
    },
    {
      type: "template23",
      template: (
        <Template7Mobile disable={true} mainbg={Template17Bg} square={false} />
      ),
      thumbnail: require("../ProfileTemplates/images/thumbnail/temp (26).png")
        .default.src,
    },
    {
      type: "template24",
      template: (
        <Template8Mobile disable={true} mainbg={Template25Bg} square={false} />
      ),
      thumbnail: require("../ProfileTemplates/images/thumbnail/temp (14).png")
        .default.src,
    },

    {
      type: "template25",
      template: (
        <Template7Mobile disable={true} mainbg={Template18Bg} square={false} />
      ),
      thumbnail: require("../ProfileTemplates/images/thumbnail/temp (21).png")
        .default.src,
    },
    {
      type: "template26",
      template: (
        <Template7Mobile disable={true} mainbg={Template19Bg} square={false} />
      ),
      thumbnail: require("../ProfileTemplates/images/thumbnail/temp (23).png")
        .default.src,
    },

    {
      type: "template27",
      template: (
        <Template7Mobile disable={true} mainbg={Template21Bg} square={false} />
      ),
      thumbnail: require("../ProfileTemplates/images/thumbnail/temp (25).png")
        .default.src,
    },
    {
      type: "template28",
      template: (
        <Template7Mobile disable={true} mainbg={Template22Bg} square={false} />
      ),
      thumbnail: require("../ProfileTemplates/images/thumbnail/temp (27).png")
        .default.src,
    },
    {
      type: "template29",
      template: (
        <Template7Mobile disable={true} mainbg={Template23Bg} square={false} />
      ),
      thumbnail: require("../ProfileTemplates/images/thumbnail/temp (28).png")
        .default.src,
    },
  ];

  return (
    <div className="Plus-Jakarta-Sans-font-div bg-white first-container overflow-hidden ">
      <Navbar background="#FFFF" thisPage="templates" />

      <div className="h-fit w-full md:pt-[96px] mt-[0px] xl:px-[80px] px-[20px] bg-white flex flex-col justify-start items-center">
        <div className="font-[700] w-full text-[24px] xsm:text-[28px] sm:text-[36px] lg:text-[48px] text-center md:mt-[56px] mt-[16px]">
          Connect, Share, Impress: <br /> Qviqsite templates at your fingertips!
        </div>

        <div className="max-w-[668px] w-full text-[#817C7C] font-[600] text-[14px] sm:text-[16px] md:text-[20px] text-center md:mt-[48px] mt-[24px]">
          Explore our mobile-responsive templates designed to maximize
          your link-sharing potential. Easily organize and showcase your
          content, social profiles, and more in one convenient hub.
        </div>

        <div className="h-fit w-[100%] max-w-[1440px] mt-[36px] md:mt-[40px] mb-32 z-0 flex flex-wrap justify-center items-center gap-x-[26px] gap-y-[40px] sm:gap-x-[40px] sm:gap-y-[50px]">
          {templatesArray.map((item, index) => (
            <div
              key={index}
              className="flex flex-col justify-center items-center relative group transition-opacity-[300ms]"
              style={{ transition: "300ms" }}
            >
              {/* Clickable template cards */}
              <button
                onClick={() => setTemplate(item.type)}
                className="relative w-[132px] custom2:w-[152px] sm:w-[240px] custom:w-[270px] 
          h-[325px] custom2:h-[374px] sm:h-[590px] custom:h-[665px]
          overflow-hidden rounded-[18px] sm:rounded-[26px] flex flex-col justify-start items-center
          hover:scale-[101%] hover:shadow-lg"
                style={{
                  // outline:
                  //   template === item.type
                  //     ? "3px solid rgba(26,26,26,0.6)"
                  //     : "1px solid #E8E8E8",
                  background:
                    template === item.type ? "rgba(26,26,26,0.6)" : "#E8E8E8",
                  transition: "300ms",
                }}
              >
                <Image
                  priority={true}
                  className="w-full m-0"
                  src={item.thumbnail}
                  property
                  width={270}
                  height={664}
                  quality={50}
                  alt="template image"
                />

                {/* Conditional rendering of "View Template" button */}
                {/* <div
                  className="absolute flex sm:hidden flex-col justify-center items-center top-0 right-0 mt-[10px] mr-[10px] z-[2] w-[32px] h-[32px] rounded-full text-[20px] text-black bg-white"
                  onClick={() => {
                    setTemplatePreview(true);
                    setTemplateIndex(index);
                  }}
                  style={{
                    transition: "300ms",
                    // transform: "translate(-50%, -50%)",
                    boxShadow: "0 0 15px #00000040",
                    border: "1px solid #00000040"
                  }}
                >
                  <FiEye />
                </div> */}
                <Link
                  className="absolute flex sm:hidden flex-col justify-center items-center top-0 right-0 mt-[10px] mr-[10px] z-[2] w-[32px] h-[32px] rounded-full text-[20px] text-black bg-white"
                  onClick={() => {
                    setTemplatePreview(true);
                    setTemplateIndex(index);
                  }}
                  style={{
                    transition: "300ms",
                    // transform: "translate(-50%, -50%)",
                    boxShadow: "0 0 15px #00000040",
                    border: "1px solid #00000040"
                  }}
                  scroll={false}
                  href={`/templates?templateIndex=${index}`}
                >
                  <FiEye />
                </Link>

                <div
                  className="absolute sm:top-[50%] bottom-0 left-[50%] z-[2] w-full h-fit flex flex-col justify-center items-center gap-[20px]"
                  style={{
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  {!username && (
                    <div
                      className="relative z-[1] overflow-hidden flex flex-col items-center justify-center sm:w-[60%] px-[12px] sm:px-[20px] custom2:px-[12px] custom:px-[24px] py-[6px] sm:py-[8px] custom2:py-[6px] custom:py-[10px] rounded-[64px] font-semibold text-center text-[10px] sm:text-[12px] custom2:text-[12px] custom:text-[14px] sm:opacity-0 group-hover:sm:opacity-100 hover:shadow-lg transition-opacity-[300ms] "
                      onClick={() => navigate.push("/signup")}
                      style={{
                        transition: "300ms",
                        boxShadow: "0 0 15px #000000a1",
                      }}
                    >
                      <p className="z-[1] text-linear-gradient">
                        Create Qviqsite
                      </p>
                      <div
                        className="bg-white absolute z-[0] top-[50%] left-[50%] w-full h-full"
                        style={{
                          transform: "translate(-50%, -50%)",
                        }}
                      ></div>
                    </div>
                  )}
            
                  {/* <div
                    className="sm:flex hidden flex-col items-center justify-center w-[60%] px-[18px] sm:px-[20px] custom2:px-[18px] custom:px-[24px] py-[6px] sm:py-[8px] custom2:py-[6px] custom:py-[10px] border-[2px] border-white rounded-[64px] bg-[#00000052] font-semibold text-center text-[10px] text-white sm:text-[12px] custom2:text-[12px] custom:text-[14px] opacity-0 group-hover:opacity-100 hover:shadow-lg transition-opacity-[300ms]"
                    onClick={() => {
                      setTemplatePreview(true);
                      setTemplateIndex(index);
                    }}
                    style={{
                      border: "2px solid #fff",
                      transition: "300ms",
                    }}
                  >
                    View Template
                  </div> */}
                  <Link
                    className="sm:flex hidden flex-col items-center justify-center w-[60%] px-[18px] sm:px-[20px] custom2:px-[18px] custom:px-[24px] py-[6px] sm:py-[8px] custom2:py-[6px] custom:py-[10px] border-[2px] border-white rounded-[64px] bg-[#00000052] font-semibold text-center text-[10px] text-white sm:text-[12px] custom2:text-[12px] custom:text-[14px] opacity-0 group-hover:opacity-100 hover:shadow-lg transition-opacity-[300ms]"
                    onClick={() => {
                      setTemplatePreview(true);
                      setTemplateIndex(index);
                    }}
                    style={{
                      border: "2px solid #fff",
                      transition: "300ms",
                    }}
                    scroll={false}
                    href={`/templates?templateIndex=${index}`}
                  >
                    View Template
                  </Link>
                </div>

                <div
                  className="absolute sm:flex hidden top-0 right-0 w-full h-full m-0 opacity-0 group-hover:opacity-100 transition-opacity-[300ms]"
                  style={{
                    background: "#000000bb",
                    transition: "300ms",
                  }}
                ></div>
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex py-[28px] px-[20px] md:pl-[80px] bg-[#0A0003] relative overflow-hidden mt-[64px] md:mt-[124px]">
        <div>
          <div className="font-[900] w-[16rem] flex flex-col text-base sm:w-full xsm2:text-[20px] leading-[28px] md:text-[30px] md:leading-[36px]  lg:text-[40px] lg:leading-[64px] text-white  pb-8">
            <p> Still need help? </p>
            <p className=" max-w-[61rem] lg:w-[61rem] md:w-[26rem]">
              Our team is happy to assist you
            </p>
          </div>
          <PrimaryButton3
            text="Contact Us"
            icon={<HiChevronRight />}
            onClick={() => {
              navigate.push("/contact");
            }}
          />
        </div>
        <div>
          <div className=" h-[140px] w-[143px] top-12 right-4 blur-[50px] md:w-[283px] xsm2:top-12 relative 2xl:left-0 xl:left-0 lg:right-[21rem] md:right-[-3rem] sm:right-[-1rem] sm:top-[5rem] sm:h-[276px] rounded-[283px] bg-[linear-gradient(210deg,rgba(228,8,73,0.80)39.19%,rgba(251,102,9,0.80)78.88%)] md:blur-[120px]"></div>
          <Image
            className="h-[266px] w-[267px] bottom-[-120px] right-[-4rem] lg:h-[787px] lg:w-[787px] xl:left-[53vw] absolute lg:left-[30rem]  md:left-[25rem]   sm:h-[34rem] sm:w-[34rem] sm:top-[2rem]  lg:top-[-3rem]  xsm2:h-[26rem] xsm2:w-[23rem] xsm2:left-[10rem] xsm2:top-0  xsm:h-[20rem] xsm:left-[7rem] xsm:top-[3.5rem] "
            src={require("./assets/Saly-7.png")}
            alt="phone"
          />
        </div>
      </div>

      <Footer />

      {templatePreview && (
        <TemplatePreview
          setTemplatePreview={setTemplatePreview}
          templateIndex={templateIndex}
        />
      )}
    </div>
  );
};

export default Templates;
