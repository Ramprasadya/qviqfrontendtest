"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../header/Navbar";
import PrimaryButton3 from "../../UiComponents/PrimaryButton3";
import logo from "../../Images/tapopLogo.png";
import {
  HiArrowUpRight,
  HiCheck,
  HiChevronDown,
  HiChevronLeft,
  HiChevronRight,
  HiChevronUp,
} from "react-icons/hi2";
import { HiOutlineArrowSmRight, HiOutlinePlusCircle } from "react-icons/hi";
import PrimaryButton2 from "../../UiComponents/PrimaryButton2";
import Footer from "../Footer";
import { useContext } from "react";
import { UserContext } from "../../Contexts/context";
import Carousel from "../../UiComponents/Carousel";
import Carousel2 from "../../UiComponents/Carousel2";
import Feature from "./Feature";
import InfiniteSlider from "./InfiniteSlider";
import "../../UiComponents/iconTextStyle.css";
import SecondaryButton from "../../UiComponents/SecondaryButton";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function HomePage() {
  const [cart, setCart] = useState([]);
  const [faq1, setfaq1] = useState(true);
  const [faq2, setfaq2] = useState(false);
  const [faq3, setfaq3] = useState(false);
  const [faq4, setfaq4] = useState(false);
  const [faq5, setfaq5] = useState(false);
  const [faq6, setfaq6] = useState(false);
  const [showText1, setShowText1] = useState(true);
  const [showText2, setShowText2] = useState(false);
  const [showText3, setShowText3] = useState(false);
  const [phone1, setphone1] = useState(false);
  const [phone2, setphone2] = useState(false);
  const [phone3, setphone3] = useState(false);
  const [phone4, setphone4] = useState(false);
  const [phone5, setphone5] = useState(false);
  const [phone6, setphone6] = useState(false);
  const [phone7, setphone7] = useState(false);
  const [phone8, setphone8] = useState(false);
  const [phone9, setphone9] = useState(false);
  const navigate = useRouter();
  const { username } = useContext(UserContext);

  const [windowWidth, setWindowWidth] = useState(0);
  useEffect(() => {
    // Update the windowWidth state when the window is resized
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    handleResize();

    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleshowText1 = () => {
    setShowText1(true);
    setShowText2(false);
    setShowText3(false);
  };
  const handleshowText2 = () => {
    setShowText1(false);
    setShowText2(true);
    setShowText3(false);
  };
  const handleshowText3 = () => {
    setShowText1(false);
    setShowText2(false);
    setShowText3(true);
  };

  const featureData = [
    <div className="flex justify-center">
      <div className="relative w-[320px] sm:w-[413px] sm:h-[370px] h-[340px] lg:h-[388px] bg-[#ffffff] shadow-[_10px_10px_40px_rgba(_171,_181,_217,_0.08)] px-[24px] sm:px-[40px] pt-[95px] sm:pt-[122px] lg:pt-[142px] rounded-[20px] mt-[96px] sm:mt-[95px] mb-[24px] sm:mb-[48px] flex flex-col items-center justify-start">
        <div className="w-[167px] h-[1px] bg-[#A19D9F]"></div>
        <div className="absolute flex justify-center w-full left-[-10px] top-[-60px] sm:top-[-100px] z-5">
          <Image
            className="h-[150px] w-auto sm:h-[215px] lg:h-[240px] md:h-[255px]"
            src={require("../assets/cube.png")}
            alt="cube"
          />
        </div>
        <p className="text-left text-[18px] sm:text-[24px] font-[700] leading-[22px] sm:leading-[38px] text-[#0A0003] w-[100%] mt-[32px] sm:mt-[36px]">
          Fully customizable
        </p>
        <p className="text-[14px] sm:text-[16px] font-[400] leading-[22px] sm:leading-[28px] text-[#0A0003] mt-[20px]">
          Customize your quicksite to match your brand's colors & style. Add
          your logo, images, and other custom elements to make your quicksite
          stand out.
        </p>
      </div>
    </div>,
    <div className="flex justify-center">
      <div className="relative  w-[320px] sm:w-[413px] sm:h-[370px] h-[340px] lg:h-[388px] bg-[#ffffff] shadow-[_10px_10px_40px_rgba(_171,_181,_217,_0.08)] px-[24px] pt-[95px] sm:pt-[122px] lg:pt-[142px] sm:px-[40px] rounded-[20px] mt-[95px] mx-[12px] flex flex-col items-center justify-start">
        <div className="w-[167px] h-[1px] bg-[#A19D9F]"></div>
        <div className="absolute flex justify-center w-full left-0 top-[-60px] sm:top-[-95px]">
          <Image
            className="h-[150px] w-auto sm:h-[200px] lg:h-[220px] md:h-[250px]"
            src={require("../assets/homechain2.png")}
            alt="cube"
          />
        </div>
        <p className="text-left w-[100%] text-[18px] sm:text-[24px] font-[700] leading-[22px] sm:leading-[38px] text-[#0A0003] mt-[36px]">
          Qviq link store
        </p>
        <p className="text-[14px] sm:text-[16px] font-[400] leading-[22px] sm:leading-[28px] text-[#0A0003] mt-[20px]">
          With Qviq link store, users can quickly add multiple links to their
          quick-sites without the need to individually search and add each link
          themselves.
        </p>
      </div>
    </div>,
    <div className="flex justify-center">
      <div className="relative  w-[320px] sm:w-[413px] sm:h-[370px] h-[340px] lg:h-[388px] bg-[#ffffff] shadow-[_10px_10px_40px_rgba(_171,_181,_217,_0.08)] px-[40px] pt-[95px] sm:pt-[122px] lg:pt-[142px] rounded-[20px] mt-[95px] mx-[12px] flex flex-col items-center justify-start">
        <div className="w-[167px] h-[1px] bg-[#A19D9F]"></div>
        <div className="absolute flex justify-center w-full left-0 top-[-60px] sm:top-[-80px]">
          <Image
            className="h-[160px] w-auto sm:h-[200px] lg:h-[220px] md:h-[230px]"
            src={require("../assets/homerocket2.png")}
            alt="cube"
          />
        </div>
        <p className="text-left w-[100%] text-[18px] sm:text-[24px] font-[700] leading-[22px] sm:leading-[38px] text-[#0A0003] mt-[36px]">
          360° Instant sharing
        </p>
        <p className="text-[14px] sm:text-[16px] font-[400] leading-[22px] sm:leading-[28px] text-[#0A0003] mt-[20px]">
          Share your quicksite instantly with anyone, anywhere using Qviq’s NFC
          devices, QR codes, or profile links.
        </p>
      </div>
    </div>,
    <div className="flex justify-center">
      <div className="relative  w-[320px] sm:w-[413px] sm:h-[370px] h-[340px] lg:h-[388px] bg-[#ffffff] shadow-[_10px_10px_40px_rgba(_171,_181,_217,_0.08)] px-[40px] pt-[95px] sm:pt-[122px] lg:pt-[142px] rounded-[20px] mt-[95px] mx-[12px] flex flex-col items-center justify-start">
        <div className="w-[167px] h-[1px] bg-[#A19D9F]"></div>
        <div className="absolute flex justify-center w-full left-0 top-[-60px] sm:top-[-110px]">
          <Image
            className="h-[160px] w-auto sm:h-[220px] lg:h-[250px]"
            src={require("../assets/homeshowcase.png")}
            alt="cube"
          />
        </div>
        <p className="text-left w-[100%] text-[18px] sm:text-[24px] font-[700] leading-[22px] sm:leading-[38px] text-[#0A0003] mt-[36px]">
          Showcase your products and services
        </p>
        <p className="text-[14px] sm:text-[16px] font-[400] leading-[22px] sm:leading-[28px] text-[#0A0003] mt-[20px]">
          Use your quicksite to showcase your products and services and promote
          them to your audience.
        </p>
      </div>
    </div>,
    <div className="flex justify-center">
      <div className="relative  w-[320px] sm:w-[413px] sm:h-[370px] h-[340px] lg:h-[388px] bg-[#ffffff] shadow-[_10px_10px_40px_rgba(_171,_181,_217,_0.08)] px-[40px] pt-[95px] sm:pt-[122px] lg:pt-[142px] rounded-[20px] mt-[95px] mx-[12px] flex flex-col items-center justify-start">
        <div className="w-[167px] h-[1px] bg-[#A19D9F]"></div>
        <div className="absolute flex justify-center w-full left-0 top-[-60px] sm:top-[-120px]">
          <Image
            className="h-[160px] w-auto sm:h-[220px] lg:h-[262px]"
            src={require("../assets/homepay.png")}
            alt="cube"
          />
        </div>
        <p className="text-left w-[100%] text-[18px] sm:text-[24px] font-[700] leading-[22px] sm:leading-[38px] text-[#0A0003] mt-[36px]">
          Accept payments and donations
        </p>
        <p className="text-[14px] sm:text-[16px] font-[400] leading-[22px] sm:leading-[28px] text-[#0A0003] mt-[20px]">
          Easily add payment & crypto links to your quicksite to accept payments
          & donations from your customers & followers.
        </p>
      </div>
    </div>,
    <div className="flex justify-center">
      <div className="relative  w-[320px] sm:w-[413px] sm:h-[370px] h-[340px] lg:h-[388px] bg-[#ffffff] shadow-[_10px_10px_40px_rgba(_171,_181,_217,_0.08)] px-[40px] pt-[95px] sm:pt-[122px] lg:pt-[142px] rounded-[20px] mt-[95px] mx-[12px] flex flex-col items-center justify-start">
        <div className="w-[167px] h-[1px] bg-[#A19D9F]"></div>
        <div className="absolute flex justify-center w-full left-0 top-[-60px] sm:top-[-125px]">
          <Image
            className="h-[160px] w-auto sm:h-[265px]"
            src={require("../assets/homecalender.png")}
            alt="cube"
          />
        </div>
        <p className="text-left w-[100%] text-[18px] sm:text-[24px] font-[700] leading-[22px] sm:leading-[38px] text-[#0A0003] mt-[36px]">
          Schedule appointments
        </p>
        <p className="text-[14px] sm:text-[16px] font-[400] leading-[22px] sm:leading-[28px] text-[#0A0003] mt-[20px]">
          Use your quicksite to schedule appointments with your clients and
          followers.
        </p>
      </div>
    </div>,
  ];

  // for feature 2
  const webFeatureData = [
    <div className="min-w-[200vw] flex md:flex-col md:min-w-[100vw] Plus-Jakarta-Sans-font-div ">
      <div className="min-w-[100vw] flex flex-col md:flex-row items-center">
        <div className="bg-[#E40849] min-w-full md:min-w-[50%] h-[350px] xsm2:h-[380px] md:h-[400px] lg:h-[480px] xl:h-[500px] 2xl:h-[592px] flex flex-col justify-end items-center">
          <Image
            className="h-full w-auto"
            src={require("../assets/feature1.png")}
            alt="connections"
          />
        </div>
        <div className="flex flex-col justify-center items-start min-w-full sm:min-w-[50%] h-[350px] xsm2:h-[380px] md:h-[400px] lg:h-[480px] p-5  md:p-8 lg:p-10 2xl:p-20">
          <p className="font-[800] text-[#0A0003] text-lg xsm:text-[24px] leading-[48px] lg:text-3xl xl:text-[40px] xl:leading-[64px] mb-[16px] sm:mb-5 lg:mb-[28px]">
            Grow your real network effortlessly
          </p>
          <div className="flex flex-col gap-2 lg:gap-4">
            <div className="flex gap-5">
              <div className="w-2 h-2 rounded-full bg-black mt-4" />
              <p className="w-[100%] font-medium text-xs xsm:text-sm sm:text-lg lg:text-2xl">
                Get all your connections at one place.
              </p>
            </div>
            <div className="flex gap-5 mb-2 lg:mb-4">
              <div className="w-2 h-2 rounded-full bg-black mt-4" />
              <p className="w-[100%] font-medium text-xs xsm:text-sm sm:text-lg lg:text-2xl">
                Two way contact sharing.
              </p>
            </div>
            <div className="flex gap-5 mb-2 lg:mb-4">
              <div className="w-2 h-2 rounded-full bg-black mt-4" />
              <p className="w-[100%] font-medium text-xs xsm:text-sm sm:text-lg lg:text-2xl">
                Make meaningful connections.
              </p>
            </div>
            <div className="flex gap-5 mb-4 lg:mb-6">
              <div className="w-2 h-2 rounded-full bg-black mt-4" />
              <p className="w-[100%] font-medium text-xs xsm:text-sm sm:text-lg lg:text-2xl">
                Download your potential contacts directly to your phone.
              </p>
            </div>
          </div>
          {username === "" && (
            <SecondaryButton
              onClick={() => navigate.push("/signup")}
              width="fit-content"
              height={"56px"}
              text="Start Your Free Trial"
              icon=<svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="21"
                className="h-5 w-5"
                viewBox="0 0 20 21"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2 10.5C2 10.0858 2.33579 9.75 2.75 9.75L15.3401 9.75L13.2397 7.7996C12.9361 7.51775 12.9186 7.0432 13.2004 6.73966C13.4823 6.43613 13.9568 6.41856 14.2603 6.70041L17.7603 9.95041C17.9132 10.0923 18 10.2915 18 10.5C18 10.7086 17.9132 10.9077 17.7603 11.0496L14.2603 14.2996C13.9568 14.5815 13.4823 14.5639 13.2004 14.2603C12.9186 13.9568 12.9361 13.4823 13.2397 13.2004L15.3401 11.25L2.75 11.25C2.33579 11.25 2 10.9142 2 10.5Z"
                  fill="url(#paint0_linear_2880_4731)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_2880_4731"
                    x1="18"
                    y1="6.5"
                    x2="1.08181"
                    y2="11.1826"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#FB6609" />
                    <stop offset="1" stopColor="#E40849" />
                  </linearGradient>
                </defs>
              </svg>
            />
          )}
        </div>
      </div>
      <div className="min-w-[100vw] flex flex-col-reverse md:flex-row items-center">
        <div className="flex flex-col justify-center items-start min-w-full md:min-w-[50%] h-[350px] xsm2:h-[380px] md:h-[400px] lg:h-[480px] p-5 md:p-8 lg:p-10 2xl:p-20">
          <p className="font-[800] text-lg xsm:text-[24px] leading-[32px] lg:text-3xl xl:text-[40px] xl:leading-[48px] mb-[16px] sm:mb-5 lg:mb-[28px]">
            Hassle-free appointment scheduling
          </p>
          <div className="flex flex-col gap-2 lg:gap-4 mb-[20px]">
            <div className="flex gap-5">
              <div className="w-2 h-2 rounded-full bg-black mt-4" />
              <p className="w-[100%] font-medium text-xs xsm:text-sm sm:text-lg lg:text-2xl">
                Allow prospects to book appointments directly through your
                Qviqsite.
              </p>
            </div>
            <div className="flex gap-5 mb-2 lg:mb-4">
              <div className="w-2 h-2 rounded-full bg-black mt-4" />
              <p className="w-[100%] font-medium text-xs xsm:text-sm sm:text-lg lg:text-2xl">
                Simple dashboard to manage all your appointments.
              </p>
            </div>
            <div className="flex gap-5 mb-2 lg:mb-4">
              <div className="w-2 h-2 rounded-full bg-black mt-4" />
              <p className="w-[100%] font-medium text-xs xsm:text-sm sm:text-lg lg:text-2xl">
                Manage your available slots easily.
              </p>
            </div>
            {/* <div className="flex gap-5 mb-6 lg:mb-10">
              <div className="w-2 h-2 rounded-full bg-black mt-4" />
              <p className="w-[100%] font-medium text-xs xsm:text-sm sm:text-lg lg:text-2xl">
                Accept or Decline according to your convenience.
              </p>
            </div> */}
          </div>
          {username === "" && (
            <SecondaryButton
              onClick={() => navigate.push("/signup")}
              width="fit-content"
              height={"56px"}
              text="Start Your Free Trial"
              icon=<svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="21"
                className="h-5 w-5"
                viewBox="0 0 20 21"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2 10.5C2 10.0858 2.33579 9.75 2.75 9.75L15.3401 9.75L13.2397 7.7996C12.9361 7.51775 12.9186 7.0432 13.2004 6.73966C13.4823 6.43613 13.9568 6.41856 14.2603 6.70041L17.7603 9.95041C17.9132 10.0923 18 10.2915 18 10.5C18 10.7086 17.9132 10.9077 17.7603 11.0496L14.2603 14.2996C13.9568 14.5815 13.4823 14.5639 13.2004 14.2603C12.9186 13.9568 12.9361 13.4823 13.2397 13.2004L15.3401 11.25L2.75 11.25C2.33579 11.25 2 10.9142 2 10.5Z"
                  fill="url(#paint0_linear_2880_4731)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_2880_4731"
                    x1="18"
                    y1="6.5"
                    x2="1.08181"
                    y2="11.1826"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#FB6609" />
                    <stop offset="1" stopColor="#E40849" />
                  </linearGradient>
                </defs>
              </svg>
            />
          )}
        </div>
        <div className="bg-[#FB6609] min-w-full md:min-w-[50%] h-[350px] xsm2:h-[380px] md:h-[400px] lg:h-[480px] xl:h-[500px] 2xl:h-[592px] flex flex-col justify-end items-center">
          <Image
            className="h-full  w-auto"
            src={require("../assets/feature2.png")}
            alt="connections"
          />
        </div>
      </div>
    </div>,
    <div className="min-w-[200vw] flex md:flex-col md:min-w-[100vw] Plus-Jakarta-Sans-font-div ">
      <div className="min-w-[100vw] flex flex-col md:flex-row items-center">
        <div className="bg-[#5C53F9] min-w-full md:min-w-[50%] h-[350px] xsm2:h-[380px] md:h-[400px] lg:h-[480px] xl:h-[500px] 2xl:h-[592px] flex flex-col justify-end items-center">
          <Image
            className="h-full w-auto"
            src={require("../assets/feature3.png")}
            alt="connections"
          />
        </div>
        <div className="flex flex-col justify-center items-start min-w-full sm:min-w-[50%] h-[350px] xsm2:h-[380px] md:h-[400px] lg:h-[480px] p-5 md:p-8 lg:p-10 2xl:p-20">
          <p className="font-[900] text-lg xsm:text-[24px] leading-[32px] lg:text-3xl xl:text-[40px] xl:leading-[64px] mb-[16px] sm:mb-5 lg:mb-[28px]">
            Showcase your Offerings
          </p>
          <div className="flex flex-col gap-2 lg:gap-4">
            <div className="flex gap-5">
              <div className="w-2 h-2 rounded-full bg-black mt-4" />
              <p className="w-[100%] font-medium text-xs xsm:text-sm sm:text-lg lg:text-2xl">
                Display your products with images, description & Prices.
              </p>
            </div>
            <div className="flex gap-5 mb-2 lg:mb-4">
              <div className="w-2 h-2 rounded-full bg-black mt-4" />
              <p className="w-[100%] font-medium text-xs xsm:text-sm sm:text-lg lg:text-2xl">
                Get inquiries directly on your WhatsApp.
              </p>
            </div>
            <div className="flex gap-5 mb-2 lg:mb-4">
              <div className="w-2 h-2 rounded-full bg-black mt-4" />
              <p className="w-[100%] font-medium text-xs xsm:text-sm sm:text-lg lg:text-2xl">
                Attract potential customers.
              </p>
            </div>
            <div className="flex gap-5 mb-6 lg:mb-8">
              <div className="w-2 h-2 rounded-full bg-black mt-4" />
              <p className="w-[100%] font-medium text-xs xsm:text-sm sm:text-lg lg:text-2xl">
                Increase your sales
              </p>
            </div>
          </div>
          {username === "" && (
            <SecondaryButton
              onClick={() => navigate.push("/signup")}
              width="fit-content"
              height={"56px"}
              text="Start Your Free Trial"
              icon=<svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="21"
                className="h-5 w-5"
                viewBox="0 0 20 21"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2 10.5C2 10.0858 2.33579 9.75 2.75 9.75L15.3401 9.75L13.2397 7.7996C12.9361 7.51775 12.9186 7.0432 13.2004 6.73966C13.4823 6.43613 13.9568 6.41856 14.2603 6.70041L17.7603 9.95041C17.9132 10.0923 18 10.2915 18 10.5C18 10.7086 17.9132 10.9077 17.7603 11.0496L14.2603 14.2996C13.9568 14.5815 13.4823 14.5639 13.2004 14.2603C12.9186 13.9568 12.9361 13.4823 13.2397 13.2004L15.3401 11.25L2.75 11.25C2.33579 11.25 2 10.9142 2 10.5Z"
                  fill="url(#paint0_linear_2880_4731)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_2880_4731"
                    x1="18"
                    y1="6.5"
                    x2="1.08181"
                    y2="11.1826"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#FB6609" />
                    <stop offset="1" stopColor="#E40849" />
                  </linearGradient>
                </defs>
              </svg>
            />
          )}
        </div>
      </div>
      <div className="min-w-[100vw] flex flex-col-reverse md:flex-row items-center">
        <div className="flex flex-col justify-center items-start min-w-full h-[350px] xsm2:h-[380px] md:h-[400px] lg:h-[480px] sm:min-w-[50%] p-5 md:p-8 lg:p-10 2xl:p-20">
          <p className="font-[900] text-lg xsm:text-[24px] leading-[32px] lg:text-3xl xl:text-[40px] xl:leading-[64px] mb-[16px] sm:mb-5 lg:mb-[28px]">
            Monitor your performance, Understand your audience
          </p>
          <div className="flex flex-col gap-2 lg:gap-4">
            <div className="flex gap-5">
              <div className="w-2 h-2 rounded-full bg-black mt-4" />
              <p className="w-[100%] font-medium text-xs xsm:text-sm sm:text-lg lg:text-2xl">
                Monitor your qviqsite traffic.
              </p>
            </div>
            <div className="flex gap-5 mb-2 lg:mb-4">
              <div className="w-2 h-2 rounded-full bg-black mt-4" />
              <p className="w-[100%] font-medium text-xs xsm:text-sm sm:text-lg lg:text-2xl">
                Track Highest & lowest performing links.
              </p>
            </div>
            {/* <div className="flex gap-5 mb-2 lg:mb-4">
              <div className="w-2 h-2 rounded-full bg-black mt-4" />
              <p className="w-[100%] font-medium text-xs xsm:text-sm sm:text-lg lg:text-2xl">
                Make data-driven decisions.
              </p>
            </div> */}
            <div className="flex gap-5 mb-6 lg:mb-10">
              <div className="w-2 h-2 rounded-full bg-black mt-4" />
              <p className="w-[100%] font-medium text-xs xsm:text-sm sm:text-lg lg:text-2xl">
                Interactive and informative Analytics dashboard.
              </p>
            </div>
          </div>
          {username === "" && (
            <SecondaryButton
              onClick={() => navigate.push("/signup")}
              width="fit-content"
              height={"56px"}
              text="Start Your Free Trial"
              icon=<svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="21"
                className="h-5 w-5"
                viewBox="0 0 20 21"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2 10.5C2 10.0858 2.33579 9.75 2.75 9.75L15.3401 9.75L13.2397 7.7996C12.9361 7.51775 12.9186 7.0432 13.2004 6.73966C13.4823 6.43613 13.9568 6.41856 14.2603 6.70041L17.7603 9.95041C17.9132 10.0923 18 10.2915 18 10.5C18 10.7086 17.9132 10.9077 17.7603 11.0496L14.2603 14.2996C13.9568 14.5815 13.4823 14.5639 13.2004 14.2603C12.9186 13.9568 12.9361 13.4823 13.2397 13.2004L15.3401 11.25L2.75 11.25C2.33579 11.25 2 10.9142 2 10.5Z"
                  fill="url(#paint0_linear_2880_4731)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_2880_4731"
                    x1="18"
                    y1="6.5"
                    x2="1.08181"
                    y2="11.1826"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#FB6609" />
                    <stop offset="1" stopColor="#E40849" />
                  </linearGradient>
                </defs>
              </svg>
            />
          )}
        </div>
        <div className="bg-[#692B04] min-w-full md:min-w-[50%] h-[350px] xsm2:h-[380px] md:h-[400px] lg:h-[480px] xl:h-[500px] 2xl:h-[592px] flex flex-col justify-end items-center">
          <Image
            className="h-full w-auto"
            src={require("../assets/feature4.png")}
            alt="connections"
          />
        </div>
      </div>
    </div>,
  ];

  const mobileFeatureData = [
    <div className="min-w-[100vw] flex flex-col md:flex-row items-center">
      <div className="bg-[#E40849] min-w-full md:min-w-[50%] h-[300px] xsm2:h-[350px] md:h-[400px] lg:h-[450px] xl:h-[500px] 2xl:h-[592px] flex flex-col justify-end items-center">
        <Image
          className="h-[300px] w-auto xsm2:h-[350px] md:h-[400px] lg:h-[450px] xl:h-[500px] 2xl:h-[592px]"
          src={require("../assets/feature1.png")}
          alt="connections"
        />
      </div>

      <div className="flex flex-col justify-center items-start min-w-full sm:min-w-[50%] h-[400px] p-5 md:p-8 lg:p-10 2xl:p-20 mt-[10px]">
        <p className="font-[900] text-lg xsm:text-[24px] leading-[32px] lg:text-3xl xl:text-[40px] xl:leading-[64px] mb-[16px] sm:mb-5 lg:mb-[28px]">
          Grow your real network effortlessly
        </p>
        <div className="flex flex-col gap-5 lg:gap-6 mb-[40px]">
          <div className="flex gap-5">
            <div className="w-2 h-2 rounded-full bg-black mt-4" />
            <p className="w-[100%] font-medium text-xs xsm:text-sm sm:text-lg lg:text-2xl">
              Get all your connections at one place.
            </p>
          </div>
          <div className="flex gap-5  lg:mb-10">
            <div className="w-2 h-2 rounded-full bg-black mt-4" />
            <p className="w-[100%] font-medium text-xs xsm:text-sm sm:text-lg lg:text-2xl">
              Two way contact sharing.
            </p>
          </div>
          <div className="flex gap-5  lg:mb-10">
            <div className="w-2 h-2 rounded-full bg-black mt-4" />
            <p className="w-[100%] font-medium text-xs xsm:text-sm sm:text-lg lg:text-2xl">
              Make meaningful connections.
            </p>
          </div>
          <div className="flex gap-5 lg:mb-10">
            <div className="w-2 h-2 rounded-full bg-black mt-4" />
            <p className="w-[100%] font-medium text-xs xsm:text-sm sm:text-lg lg:text-2xl">
              Download your potential contacts directly to your phone.
            </p>
          </div>
        </div>
        {username === "" && (
          // <div className="flex justify-center items-center w-full" >
          <SecondaryButton
            onClick={() => navigate.push("/signup")}
            width="fit-content"
            height={"56px"}
            text="Start Your Free Trial"
            // icon=<svg
            //   xmlns="http://www.w3.org/2000/svg"
            //   width="20"
            //   height="21"
            //   className="h-5 w-5"
            //   viewBox="0 0 20 21"
            //   fill="none"
            // >
            //   <path
            //     fillRule="evenodd"
            //     clipRule="evenodd"
            //     d="M2 10.5C2 10.0858 2.33579 9.75 2.75 9.75L15.3401 9.75L13.2397 7.7996C12.9361 7.51775 12.9186 7.0432 13.2004 6.73966C13.4823 6.43613 13.9568 6.41856 14.2603 6.70041L17.7603 9.95041C17.9132 10.0923 18 10.2915 18 10.5C18 10.7086 17.9132 10.9077 17.7603 11.0496L14.2603 14.2996C13.9568 14.5815 13.4823 14.5639 13.2004 14.2603C12.9186 13.9568 12.9361 13.4823 13.2397 13.2004L15.3401 11.25L2.75 11.25C2.33579 11.25 2 10.9142 2 10.5Z"
            //     fill="url(#paint0_linear_2880_4731)"
            //   />
            //   <defs>
            //     <linearGradient
            //       id="paint0_linear_2880_4731"
            //       x1="18"
            //       y1="6.5"
            //       x2="1.08181"
            //       y2="11.1826"
            //       gradientUnits="userSpaceOnUse"
            //     >
            //       <stop stopColor="#FB6609" />
            //       <stop offset="1" stopColor="#E40849" />
            //     </linearGradient>
            //   </defs>
            // </svg>
          />
          // {/* </div> */}
        )}
      </div>
    </div>,

    <div className="min-w-[100vw] flex flex-col-reverse mb-16 md:flex-row items-center">
      <div className="flex flex-col justify-center items-start min-w-full md:min-w-[50%] h-[400px] p-5 md:p-8 lg:p-10 2xl:p-20 mt-[10px]">
        <p className="font-[900] text-lg xsm:text-[24px] leading-[32px] lg:text-3xl xl:text-[40px] xl:leading-[48px] mb-[16px] sm:mb-5 lg:mb-[28px]">
          Hassle-free appointment scheduling
        </p>
        <div className="flex flex-col gap-5 lg:gap-6 mb-[40px]">
          <div className="flex gap-5">
            <div className="w-2 h-2 rounded-full bg-black mt-4" />
            <p className="w-[100%] font-medium text-xs xsm:text-sm sm:text-lg lg:text-2xl">
              Allow prospects to book appointments directly through your
              Qviqsite.
            </p>
          </div>
          <div className="flex gap-5 lg:mb-10">
            <div className="w-2 h-2 rounded-full bg-black mt-4" />
            <p className="w-[100%] font-medium text-xs xsm:text-sm sm:text-lg lg:text-2xl">
              Simple dashboard to manage all your appointments.
            </p>
          </div>
          <div className="flex gap-5  lg:mb-10">
            <div className="w-2 h-2 rounded-full bg-black mt-4" />
            <p className="w-[100%] font-medium text-xs xsm:text-sm sm:text-lg lg:text-2xl">
              Manage your available slots easily.
            </p>
          </div>
          {/* <div className="flex gap-5  lg:mb-10">
            <div className="w-2 h-2 rounded-full bg-black mt-4" />
            <p className="w-[100%] font-medium text-xs xsm:text-sm sm:text-lg lg:text-2xl">
              Accept or Decline according to your convenience.
            </p>
          </div> */}
        </div>
        {username === "" && (
          //  <div className="flex justify-center items-center w-full" >
          <SecondaryButton
            onClick={() => navigate.push("/signup")}
            width="fit-content"
            height={"56px"}
            text="Start Your Free Trial"
            // icon=<svg
            //   xmlns="http://www.w3.org/2000/svg"
            //   width="20"
            //   height="21"
            //   className="h-5 w-5"
            //   viewBox="0 0 20 21"
            //   fill="none"
            // >
            //   <path
            //     fillRule="evenodd"
            //     clipRule="evenodd"
            //     d="M2 10.5C2 10.0858 2.33579 9.75 2.75 9.75L15.3401 9.75L13.2397 7.7996C12.9361 7.51775 12.9186 7.0432 13.2004 6.73966C13.4823 6.43613 13.9568 6.41856 14.2603 6.70041L17.7603 9.95041C17.9132 10.0923 18 10.2915 18 10.5C18 10.7086 17.9132 10.9077 17.7603 11.0496L14.2603 14.2996C13.9568 14.5815 13.4823 14.5639 13.2004 14.2603C12.9186 13.9568 12.9361 13.4823 13.2397 13.2004L15.3401 11.25L2.75 11.25C2.33579 11.25 2 10.9142 2 10.5Z"
            //     fill="url(#paint0_linear_2880_4731)"
            //   />
            //   <defs>
            //     <linearGradient
            //       id="paint0_linear_2880_4731"
            //       x1="18"
            //       y1="6.5"
            //       x2="1.08181"
            //       y2="11.1826"
            //       gradientUnits="userSpaceOnUse"
            //     >
            //       <stop stopColor="#FB6609" />
            //       <stop offset="1" stopColor="#E40849" />
            //     </linearGradient>
            //   </defs>
            // </svg>
          />
          // {/* </div> */}
        )}
      </div>

      <div className="bg-[#FB6609] min-w-full md:min-w-[50%] h-[300px] xsm2:h-[350px] md:h-[400px] lg:h-[450px] xl:h-[500px] 2xl:h-[592px] flex flex-col justify-end items-center">
        <Image
          className="h-[300px] w-auto xsm2:h-[350px] md:h-[400px] lg:h-[450px] xl:h-[500px] 2xl:h-[592px]"
          src={require("../assets/feature2.png")}
          alt="connections"
        />
      </div>
    </div>,

    <div className="min-w-[100vw] flex flex-col md:flex-row items-center">
      <div className="bg-[#5C53F9] min-w-full md:min-w-[50%] h-[300px] xsm2:h-[350px] md:h-[400px] lg:h-[450px] xl:h-[500px] 2xl:h-[592px] flex flex-col justify-end items-center">
        <Image
          className="h-[300px] w-auto xsm2:h-[350px] md:h-[400px] lg:h-[450px] xl:h-[500px] 2xl:h-[592px]"
          src={require("../assets/feature3.png")}
          alt="connections"
        />
      </div>

      <div className="flex flex-col justify-center items-start min-w-full sm:min-w-[50%] h-[400px] p-5 md:p-8 lg:p-10 2xl:p-20 mt-[10px]">
        <p className="font-[900] text-lg xsm:text-[24px] leading-[32px] lg:text-3xl xl:text-[40px] xl:leading-[64px] mb-[16px] sm:mb-5 lg:mb-[28px]">
          Showcase your Offerings
        </p>
        <div className="flex flex-col gap-5 lg:gap-6 mb-[40px]">
          <div className="flex gap-5">
            <div className="w-2 h-2 rounded-full bg-black mt-4" />
            <p className="w-[100%] font-medium text-xs xsm:text-sm sm:text-lg lg:text-2xl">
              Display your products with images, description & Prices.
            </p>
          </div>
          <div className="flex gap-5  lg:mb-10">
            <div className="w-2 h-2 rounded-full bg-black mt-4" />
            <p className="w-[100%] font-medium text-xs xsm:text-sm sm:text-lg lg:text-2xl">
              Get inquiries directly on your WhatsApp.
            </p>
          </div>
          <div className="flex gap-5  lg:mb-10">
            <div className="w-2 h-2 rounded-full bg-black mt-4" />
            <p className="w-[100%] font-medium text-xs xsm:text-sm sm:text-lg lg:text-2xl">
              Attract potential customers.
            </p>
          </div>
          <div className="flex gap-5  lg:mb-10">
            <div className="w-2 h-2 rounded-full bg-black mt-4" />
            <p className="w-[100%] font-medium text-xs xsm:text-sm sm:text-lg lg:text-2xl">
              Increase your sales
            </p>
          </div>
        </div>
        {username === "" && (
          //  <div className="flex justify-center items-center w-full" >
          <SecondaryButton
            onClick={() => navigate.push("/signup")}
            width="fit-content"
            height={"56px"}
            text="Start Your Free Trial"
            // icon=<svg
            //   xmlns="http://www.w3.org/2000/svg"
            //   width="20"
            //   height="21"
            //   className="h-5 w-5"
            //   viewBox="0 0 20 21"
            //   fill="none"
            // >
            //   <path
            //     fillRule="evenodd"
            //     clipRule="evenodd"
            //     d="M2 10.5C2 10.0858 2.33579 9.75 2.75 9.75L15.3401 9.75L13.2397 7.7996C12.9361 7.51775 12.9186 7.0432 13.2004 6.73966C13.4823 6.43613 13.9568 6.41856 14.2603 6.70041L17.7603 9.95041C17.9132 10.0923 18 10.2915 18 10.5C18 10.7086 17.9132 10.9077 17.7603 11.0496L14.2603 14.2996C13.9568 14.5815 13.4823 14.5639 13.2004 14.2603C12.9186 13.9568 12.9361 13.4823 13.2397 13.2004L15.3401 11.25L2.75 11.25C2.33579 11.25 2 10.9142 2 10.5Z"
            //     fill="url(#paint0_linear_2880_4731)"
            //   />
            //   <defs>
            //     <linearGradient
            //       id="paint0_linear_2880_4731"
            //       x1="18"
            //       y1="6.5"
            //       x2="1.08181"
            //       y2="11.1826"
            //       gradientUnits="userSpaceOnUse"
            //     >
            //       <stop stopColor="#FB6609" />
            //       <stop offset="1" stopColor="#E40849" />
            //     </linearGradient>
            //   </defs>
            // </svg>
          />
          // {/* </div> */}
        )}
      </div>
    </div>,

    <div className="min-w-[100vw] flex flex-col-reverse  md:flex-row items-center">
      <div className="flex flex-col justify-center items-start min-w-full h-[400px] sm:min-w-[50%] p-5 md:p-8 lg:p-10 2xl:p-20 mt-[10px]">
        <p className="font-[900] text-lg xsm:text-[24px] leading-[32px] lg:text-3xl xl:text-[40px] xl:leading-[64px] mb-[16px] sm:mb-5 lg:mb-[28px]">
          Monitor your performance, Understand your audience
        </p>
        <div className="flex flex-col gap-5 lg:gap-6 mb-[40px] ">
          <div className="flex gap-5">
            <div className="w-2 h-2 rounded-full bg-black mt-4" />
            <p className="w-[100%] font-medium text-xs xsm:text-sm sm:text-lg lg:text-2xl">
              Monitor your qviqsite traffic.
            </p>
          </div>
          <div className="flex gap-5  lg:mb-10">
            <div className="w-2 h-2 rounded-full bg-black mt-4" />
            <p className="w-[100%] font-medium text-xs xsm:text-sm sm:text-lg lg:text-2xl">
              Track Highest & lowest performing links.
            </p>
          </div>
          {/* <div className="flex gap-5 lg:mb-10">
            <div className="w-2 h-2 rounded-full bg-black mt-4" />
            <p className="w-[100%] font-medium text-xs xsm:text-sm sm:text-lg lg:text-2xl">
              Make data-driven decisions.
            </p>
          </div> */}
          <div className="flex gap-5  lg:mb-10">
            <div className="w-2 h-2 rounded-full bg-black mt-4" />
            <p className="w-[100%] font-medium text-xs xsm:text-sm sm:text-lg lg:text-2xl">
              Interactive and informative Analytics dashboard.
            </p>
          </div>
        </div>
        {username === "" && (
          //  <div className="flex justify-center items-center w-full" >
          <SecondaryButton
            onClick={() => navigate.push("/signup")}
            width="fit-content"
            height={"56px"}
            text="Start Your Free Trial"
            // icon=<svg
            //   xmlns="http://www.w3.org/2000/svg"
            //   width="20"
            //   height="21"
            //   className="h-5 w-5"
            //   viewBox="0 0 20 21"
            //   fill="none"
            // >
            //   <path
            //     fillRule="evenodd"
            //     clipRule="evenodd"
            //     d="M2 10.5C2 10.0858 2.33579 9.75 2.75 9.75L15.3401 9.75L13.2397 7.7996C12.9361 7.51775 12.9186 7.0432 13.2004 6.73966C13.4823 6.43613 13.9568 6.41856 14.2603 6.70041L17.7603 9.95041C17.9132 10.0923 18 10.2915 18 10.5C18 10.7086 17.9132 10.9077 17.7603 11.0496L14.2603 14.2996C13.9568 14.5815 13.4823 14.5639 13.2004 14.2603C12.9186 13.9568 12.9361 13.4823 13.2397 13.2004L15.3401 11.25L2.75 11.25C2.33579 11.25 2 10.9142 2 10.5Z"
            //     fill="url(#paint0_linear_2880_4731)"
            //   />
            //   <defs>
            //     <linearGradient
            //       id="paint0_linear_2880_4731"
            //       x1="18"
            //       y1="6.5"
            //       x2="1.08181"
            //       y2="11.1826"
            //       gradientUnits="userSpaceOnUse"
            //     >
            //       <stop stopColor="#FB6609" />
            //       <stop offset="1" stopColor="#E40849" />
            //     </linearGradient>
            //   </defs>
            // </svg>
          />
          // </div>
        )}
      </div>

      <div className="bg-[#692B04] min-w-full md:min-w-[50%] h-[300px] xsm2:h-[350px] md:h-[400px] lg:h-[450px] xl:h-[500px] 2xl:h-[592px] flex flex-col justify-end items-center">
        <Image
          className="h-[300px] w-auto xsm2:h-[350px] md:h-[400px] lg:h-[450px] xl:h-[500px] 2xl:h-[592px]"
          src={require("../assets/feature4.png")}
          alt="connections"
        />
      </div>
    </div>,
  ];

  return (
    <div
      className="bg-[#ffffff] Plus-Jakarta-Sans-font-div custom-scrollbar"
      style={{ overflowX: "hidden" }}
    >
      <Navbar
        background="#0a0003cc"
        usedIn="homepage"
        color="#ffff"
        logo={logo}
      />
      <div
        className="flex flex-col items-center justify-center pt-[28px] md:pt-[148px] px-[20px] w-full relative bg-[#0A0003]"
        style={{ zIndex: "0" }}
      >
        <div
          className="absolute z-0 rounded-full bg-[#736CED] xl:w-[530px] xl:h-[829px] lg:w-[430px] lg:h-[729px] md:w-[370px] md:h-[629px] w-[173px] h-[271px] top-[47.625%] md:top-[30rem] lg:top-[27rem] sm:blur-[250px] sm:h-[371px] sm:w-[273px] sm:top-[26rem] blur-[94.39083862304688px]"
          style={{ transform: "rotate(-90deg)", zIndex: "0" }}
        />
        <p
          className="max-w-full text-center text-[32px] font-[800] leading-[120%] sm:text-[64px] sm:font-[800] sm:leading-[130%] text-[#FAFAFA] "
          style={{ zIndex: "2" }}
        >
          Create your professional
          <span className="text-linear-gradient text-[32px] font-[800] leading-[120%] sm:text-[64px] sm:font-[800] sm:leading-[130%]">
            &nbsp;online presence
          </span>
          <br /> in a flash
        </p>

        <p
          className="max-w-full sm:w-[684px] text-center text-[16px] font-[400] leading-[24px] sm:text-[22px] sm:font-[400] sm:leading-[32px] text-[#FFFFFFB8] mt-[28px] mb-[32px] sm:mb-[52px]"
          style={{ zIndex: "2" }}
        >
          Stand out from the crowd & make a lasting impression with your unique
          digital presence.
        </p>
        {username === "" && (
          <PrimaryButton3
            onClick={() => navigate.push("/signup")}
            text="Start Your Free Trial"
            width="auto"
            padding="13px 23px 15px 24px"
            className="Plus-Jakarta-Sans-font-div h-[48px] sm:h-[56px] text-center  text-[16px] font-[900] leading-[20px] sm:text-[18px] sm:font-[700] sm:leading-[20px] text-[#ffffff]"
          />
        )}
        <div className="flex justify-center gap-1 sm:gap-4 xsm2:px-1 sm:mb-[64px] mb-[32.77px] mt-[32px] sm:mt-[0px]">
          <Image
            src={require("../assets/heroelement/Element (x).png")}
            alt="Image"
            className="max-w-full h-auto"
            style={{ zIndex: "1" }}
          />
        </div>
      </div>

      <div className="relative flex flex-col pt-[64px] pb-[64px] lg:pb-0 sm:pt-[64px] sm:mb-24 lg:mb-0 px-[20px]  xl:px-[80px] 2xl:px-[80px] w-full  bg-[#ffffff]">
        <div className="flex items-center justify-between md:mb-6 bg-[#ffffff]">
          <div className="font-[700] sm:font-[800] text-[24px] sm:text-[40px] leading-[120%] sm:leading-[120%] text-[#0A0003] pb-[0px] sm:pb-[32px] ml-[0px] md:ml-[40px] sm:ml-[0px] bg-[#ffffff]">
            Transform your business <br />
            with our tools
          </div>
          <div className="hidden md:block">
            {username === "" && (
              <SecondaryButton
                onClick={() => navigate.push("/signup")}
                height={"56px"}
                text="Start Your Free Trial"
                className="mt-[18px] sm:mt-[0px]"
                icon=<svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="21"
                  className="h-5 w-5"
                  viewBox="0 0 20 21"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2 10.5C2 10.0858 2.33579 9.75 2.75 9.75L15.3401 9.75L13.2397 7.7996C12.9361 7.51775 12.9186 7.0432 13.2004 6.73966C13.4823 6.43613 13.9568 6.41856 14.2603 6.70041L17.7603 9.95041C17.9132 10.0923 18 10.2915 18 10.5C18 10.7086 17.9132 10.9077 17.7603 11.0496L14.2603 14.2996C13.9568 14.5815 13.4823 14.5639 13.2004 14.2603C12.9186 13.9568 12.9361 13.4823 13.2397 13.2004L15.3401 11.25L2.75 11.25C2.33579 11.25 2 10.9142 2 10.5Z"
                    fill="url(#paint0_linear_2880_4731)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_2880_4731"
                      x1="18"
                      y1="6.5"
                      x2="1.08181"
                      y2="11.1826"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#FB6609" />
                      <stop offset="1" stopColor="#E40849" />
                    </linearGradient>
                  </defs>
                </svg>
              />
            )}
          </div>
        </div>

        {/* Feature  */}
        <div className="max-w-[100vw] mb-[38px] sm:mb-[38px]  relative bg-[#ffffff]">
          {/* <Feature infinite={true} /> */}
          <Carousel2 data={featureData} infinite={true} dots={false} />
        </div>

        <div className="md:hidden w-full max-w-[360px] self-center">
          {username === "" && (
            <SecondaryButton
              onClick={() => navigate.push("/signup")}
              width={"100%"}
              height={"56px"}
              text="Start Your Free Trial"
              icon=<svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="21"
                className="h-5 w-5"
                viewBox="0 0 20 21"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2 10.5C2 10.0858 2.33579 9.75 2.75 9.75L15.3401 9.75L13.2397 7.7996C12.9361 7.51775 12.9186 7.0432 13.2004 6.73966C13.4823 6.43613 13.9568 6.41856 14.2603 6.70041L17.7603 9.95041C17.9132 10.0923 18 10.2915 18 10.5C18 10.7086 17.9132 10.9077 17.7603 11.0496L14.2603 14.2996C13.9568 14.5815 13.4823 14.5639 13.2004 14.2603C12.9186 13.9568 12.9361 13.4823 13.2397 13.2004L15.3401 11.25L2.75 11.25C2.33579 11.25 2 10.9142 2 10.5Z"
                  fill="url(#paint0_linear_2880_4731)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_2880_4731"
                    x1="18"
                    y1="6.5"
                    x2="1.08181"
                    y2="11.1826"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#FB6609" />
                    <stop offset="1" stopColor="#E40849" />
                  </linearGradient>
                </defs>
              </svg>
            />
          )}
        </div>
      </div>

      {/* How it Work section  */}
      {/* Desktop  */}
      <div>
        {windowWidth > 768 ? (
          <div className=" flex w-full ">
            <div className=" relative md:w-1/2  lg:w-[48%] xl:w-[49%] bg-[#0A0003] ">
              <div
                className={`absolute ${
                  showText1
                    ? "top-[13rem]"
                    : showText2
                    ? "top-[20rem]"
                    : showText3
                    ? "top-[29rem]"
                    : ""
                } right-[-38px] z-10 drop-shadow-[0px_4px_8px_rgba(0,0,0,0.25)]  `}
              >
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="76"
                    height="76"
                    viewBox="0 0 76 76"
                    fill="none"
                    className="rounded-[50px]"
                    style={{
                      filter: "dropShadow(0px 4px 8px rgba(0, 0, 0, 0.25))",
                    }}
                  >
                    <g filter="url(#filter0_d_4130_16393)">
                      <g filter="url(#filter1_d_4130_16393)">
                        <circle cx="38" cy="34" r="26" fill="#0A0003" />
                        <circle cx="38" cy="34" r="25.5" stroke="#A7A7A7" />
                      </g>
                      <g filter="url(#filter2_d_4130_16393)">
                        <circle cx="37.5" cy="33.5" r="14.5" fill="white" />
                      </g>
                    </g>
                    <defs>
                      <filter
                        id="filter0_d_4130_16393"
                        x="4"
                        y="4"
                        width="68"
                        height="68"
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                      >
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          result="hardAlpha"
                        />
                        <feOffset dy="4" />
                        <feGaussianBlur stdDeviation="4" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                        />
                        <feBlend
                          mode="normal"
                          in2="BackgroundImageFix"
                          result="effect1_dropShadow_4130_16393"
                        />
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="effect1_dropShadow_4130_16393"
                          result="shape"
                        />
                      </filter>
                      <filter
                        id="filter1_d_4130_16393"
                        x="0"
                        y="0"
                        width="76"
                        height="76"
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                      >
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          result="hardAlpha"
                        />
                        <feOffset dy="4" />
                        <feGaussianBlur stdDeviation="6" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.48 0"
                        />
                        <feBlend
                          mode="normal"
                          in2="BackgroundImageFix"
                          result="effect1_dropShadow_4130_16393"
                        />
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="effect1_dropShadow_4130_16393"
                          result="shape"
                        />
                      </filter>
                      <filter
                        id="filter2_d_4130_16393"
                        x="19"
                        y="17"
                        width="37"
                        height="37"
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                      >
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          result="hardAlpha"
                        />
                        <feOffset dy="2" />
                        <feGaussianBlur stdDeviation="2" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"
                        />
                        <feBlend
                          mode="normal"
                          in2="BackgroundImageFix"
                          result="effect1_dropShadow_4130_16393"
                        />
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="effect1_dropShadow_4130_16393"
                          result="shape"
                        />
                      </filter>
                    </defs>
                  </svg>
                </span>
              </div>

              <div className="text-[#FAFAFA] font-[700] text-[40px] w-[356px] md:ml-4 xl:ml-[80px] mt-[60px] leading-[56px] ">
                Dive into a realm of networking
              </div>
              <div className="flex flex-col justify-center  md:ml-4 xl:ml-[80px] ">
                <div className="mt-8 ">
                  <div
                    className={`md:w-[350px] lg:w-[400px] xl:w-[494px] p-[32px] flex flex-col border-[rgba(255,255,255,0.12)]  ${
                      showText1
                        ? "rounded-l-[24px] rounded-b-[24px]  border-[1px] "
                        : "border-b-[1px] "
                    } bg-[rgba(10,0,3,0.30)]`}
                    style={{ backdropFilter: "blur(10px)" }}
                  >
                    <div
                      className="flex gap-[16px] items-center self-stretch  "
                      onClick={handleshowText1}
                      style={{ cursor: "pointer" }}
                    >
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="32"
                          height="32"
                          viewBox="0 0 32 32"
                          fill="none"
                        >
                          <path
                            d="M28.9749 3.02513C27.6081 1.65829 25.392 1.65829 24.0252 3.02513L22.4823 4.568L27.432 9.51775L28.9749 7.97487C30.3417 6.60804 30.3417 4.39196 28.9749 3.02513Z"
                            fill={`${
                              showText1
                                ? "url(#paint0_linear_4158_16427)"
                                : "#ffffff80"
                            }`}
                          />
                          <path
                            d="M26.0178 10.932L21.0681 5.98222L4.86695 22.1833C4.04456 23.0057 3.44004 24.0201 3.10802 25.1347L2.04164 28.7145C1.93682 29.0664 2.03328 29.4475 2.29292 29.7071C2.55256 29.9667 2.93361 30.0632 3.28551 29.9584L6.86537 28.892C7.97999 28.56 8.99433 27.9554 9.81671 27.1331L26.0178 10.932Z"
                            fill={`${
                              showText1
                                ? "url(#paint1_linear_4158_16427)"
                                : "#ffffff80"
                            }`}
                          />
                          <defs>
                            <linearGradient
                              id="paint0_linear_4158_16427"
                              x1="30"
                              y1="2"
                              x2="-1.2759"
                              y2="6.32823"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop
                                stopColor={`${
                                  showText1 ? "#FB6609" : "#ffffff80"
                                }`}
                              />
                              <stop
                                offset="1"
                                stopColor={`${
                                  showText1 ? "#E40849" : "#ffffff80"
                                }`}
                              />
                            </linearGradient>
                            <linearGradient
                              id="paint1_linear_4158_16427"
                              x1="30"
                              y1="2"
                              x2="-1.2759"
                              y2="6.32823"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop
                                stopColor={`${
                                  showText1 ? "#FB6609" : "#ffffff80"
                                }`}
                              />
                              <stop
                                offset="1"
                                stopColor={`${
                                  showText1 ? "#E40849" : "#ffffff80"
                                }`}
                              />
                            </linearGradient>
                          </defs>
                        </svg>
                      </span>
                      <p
                        className={` ${
                          showText1 ? "add-icon" : "text-[#ffffff80]"
                        } text-[24px] leading-[33.6px] font-[700] `}
                      >
                        Sign Up & Customise
                      </p>
                    </div>
                    {showText1 && (
                      <div className="ml-[48px] text-[16px] font-[400] leading-[25.6px] md:w-[200px] lg:w-[300px] xl:w-[374px]  text-[#FAFAFA]">
                        Start by creating your Qviq account, choose a template
                        that suits your style, customize it by adding your
                        personal details, bio, contact details, & links to your
                        social media profiles.
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-8 ">
                  <div
                    className={` md:w-[350px] lg:w-[400px] xl:w-[494px] p-[32px] flex flex-col border-[rgba(255,255,255,0.12)]  ${
                      showText2
                        ? "rounded-l-[24px] rounded-b-[24px]  border-[1px] "
                        : "border-b-[1px] "
                    } bg-[rgba(10,0,3,0.30)]`}
                    style={{ backdropFilter: "blur(10px)" }}
                  >
                    <div
                      className="flex gap-[16px] items-center self-stretch  "
                      onClick={handleshowText2}
                      style={{ cursor: "pointer" }}
                    >
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="32"
                          height="32"
                          viewBox="0 0 32 32"
                          fill="none"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M21 6C21 3.79086 22.7909 2 25 2C27.2091 2 29 3.79086 29 6C29 8.20914 27.2091 10 25 10C23.8578 10 22.8282 9.52099 22.1002 8.75498L10.8719 14.9929C10.9555 15.3151 11 15.6527 11 16C11 16.3473 10.9555 16.6849 10.8719 17.0071L22.1002 23.245C22.8282 22.479 23.8578 22 25 22C27.2091 22 29 23.7909 29 26C29 28.2091 27.2091 30 25 30C22.7909 30 21 28.2091 21 26C21 25.6527 21.0445 25.3151 21.1281 24.9929L9.89984 18.755C9.17179 19.521 8.14223 20 7 20C4.79086 20 3 18.2091 3 16C3 13.7909 4.79086 12 7 12C8.14223 12 9.17179 12.479 9.89984 13.245L21.1281 7.0071C21.0445 6.68489 21 6.34727 21 6Z"
                            fill={`${
                              showText2
                                ? "url(#paint0_linear_4158_15448)"
                                : "#ffffff80"
                            }`}
                          />
                          <defs>
                            <linearGradient
                              id="paint0_linear_4158_15448"
                              x1="29"
                              y1="2"
                              x2="-0.117282"
                              y2="5.74168"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop
                                stopColor={`${
                                  showText2 ? "#FB6609" : "#ffffff80"
                                }`}
                              />
                              <stop
                                offset="1"
                                stopColor={`${
                                  showText2 ? "#E40849" : "#ffffff80"
                                }`}
                              />
                            </linearGradient>
                          </defs>
                        </svg>
                      </span>
                      <p
                        className={` ${
                          showText2 ? "add-icon" : "text-[#ffffff80]"
                        } text-[24px] leading-[33.6px] font-[700] `}
                      >
                        {" "}
                        Share
                      </p>
                    </div>
                    {showText2 && (
                      <div className="ml-[48px] text-[16px] font-[400] leading-[25.6px] md:w-[200px] lg:w-[300px] xl:w-[374px]  text-[#FAFAFA]">
                        With your Qviqsite ready, it's time to share it with the
                        world. QR Code, Smart Cards, Custom Links, Custom Domain
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-8 mb-[64px] ">
                  <div
                    className={`md:w-[350px] lg:w-[400px] xl:w-[494px] p-[32px] flex flex-col border-[rgba(255,255,255,0.12)]  ${
                      showText3
                        ? "rounded-l-[24px] rounded-b-[24px]  border-[1px] "
                        : "border-b-[1px] "
                    } bg-[rgba(10,0,3,0.30)]`}
                    style={{ backdropFilter: "blur(10px)" }}
                  >
                    <div
                      className="flex gap-[16px] items-center self-stretch  "
                      onClick={handleshowText3}
                      style={{ cursor: "pointer" }}
                    >
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="32"
                          height="32"
                          viewBox="0 0 32 32"
                          fill="none"
                        >
                          <path
                            d="M6 8.5C6 5.46243 8.46243 3 11.5 3C14.5376 3 17 5.46243 17 8.5C17 11.5376 14.5376 14 11.5 14C8.46243 14 6 11.5376 6 8.5Z"
                            fill="url(#paint0_linear_4158_3743)"
                          />
                          <path
                            d="M19 11.5C19 9.01472 21.0147 7 23.5 7C25.9853 7 28 9.01472 28 11.5C28 13.9853 25.9853 16 23.5 16C21.0147 16 19 13.9853 19 11.5Z"
                            fill="url(#paint1_linear_4158_3743)"
                          />
                          <path
                            d="M2 25.5C2 20.2533 6.25329 16 11.5 16C16.7467 16 21 20.2533 21 25.5V25.5034C21 25.5565 20.9995 25.6098 20.9986 25.6626C20.9928 26.0073 20.8099 26.3246 20.5146 26.5025C17.8809 28.0882 14.7954 29 11.5 29C8.20457 29 5.11906 28.0882 2.48541 26.5025C2.19008 26.3246 2.00716 26.0073 2.00137 25.6626C2.00046 25.6085 2 25.5543 2 25.5Z"
                            fill="url(#paint2_linear_4158_3743)"
                          />
                          <path
                            d="M22.9998 25.5042C22.9998 25.5683 22.9992 25.6325 22.9981 25.6962C22.9905 26.1477 22.8816 26.5837 22.6876 26.9759C22.9563 26.9919 23.2271 27 23.4998 27C25.6274 27 27.6427 26.5071 29.4352 25.6283C29.7646 25.4669 29.9791 25.1381 29.9942 24.7716C29.9979 24.6815 29.9998 24.5909 29.9998 24.5C29.9998 20.9101 27.0896 18 23.4998 18C22.5045 18 21.5615 18.2237 20.7183 18.6235C22.1513 20.5415 22.9998 22.9217 22.9998 25.5V25.5042Z"
                            fill={`${
                              showText3
                                ? "url(#paint3_linear_4158_3743)"
                                : "#ffffff80"
                            }`}
                          />
                          <defs>
                            <linearGradient
                              id="paint0_linear_4158_3743"
                              x1="29.9998"
                              y1="3"
                              x2="-1.18227"
                              y2="7.64715"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop
                                stopColor={`${
                                  showText3 ? "#FB6609" : "#ffffff80"
                                }`}
                              />
                              <stop
                                offset="1"
                                stopColor={`${
                                  showText3 ? "#E40849" : "#ffffff80"
                                }`}
                              />
                            </linearGradient>
                            <linearGradient
                              id="paint1_linear_4158_3743"
                              x1="29.9998"
                              y1="3"
                              x2="-1.18227"
                              y2="7.64715"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop
                                stopColor={`${
                                  showText3 ? "#FB6609" : "#ffffff80"
                                }`}
                              />
                              <stop
                                offset="1"
                                stopColor={`${
                                  showText3 ? "#E40849" : "#ffffff80"
                                }`}
                              />
                            </linearGradient>
                            <linearGradient
                              id="paint2_linear_4158_3743"
                              x1="29.9998"
                              y1="3"
                              x2="-1.18227"
                              y2="7.64715"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop
                                stopColor={`${
                                  showText3 ? "#FB6609" : "#ffffff80"
                                }`}
                              />
                              <stop
                                offset="1"
                                stopColor={`${
                                  showText3 ? "#E40849" : "#ffffff80"
                                }`}
                              />
                            </linearGradient>
                            <linearGradient
                              id="paint3_linear_4158_3743"
                              x1="29.9998"
                              y1="3"
                              x2="-1.18227"
                              y2="7.64715"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop
                                stopColor={`${
                                  showText3 ? "#FB6609" : "#ffffff80"
                                }`}
                              />
                              <stop
                                offset="1"
                                stopColor={`${
                                  showText3 ? "#E40849" : "#ffffff80"
                                }`}
                              />
                            </linearGradient>
                          </defs>
                        </svg>
                      </span>
                      <p
                        className={` ${
                          showText3 ? "add-icon" : "text-[#ffffff80]"
                        } text-[24px] leading-[33.6px] font-[700] `}
                      >
                        {" "}
                        Connect & Manage
                      </p>
                    </div>
                    {showText3 && (
                      <div className="ml-[48px] text-[16px] font-[400] leading-[25.6px] md:w-[200px] lg:w-[300px] xl:w-[374px]  text-[#FAFAFA]">
                        You can easily edit and update your site as needed &
                        monitor your performance. Whether it's adding new links
                        or changing contact details, Qviq makes it simple.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {showText1 && (
              <div className=" md:w-1/2 lg:w-[52%] xl:w-[55%] bg-[#FD4D26] flex justify-center">
                <Image
                  className="w-[451.216px] h-[511px] mt-[120px]   "
                  src={require("../assets/howitwork1.png")}
                  alt="howitwork"
                />
              </div>
            )}
            {showText2 && (
              <div className="md:w-1/2 lg:w-[52%] xl:w-[55%] flex justify-center bg-[#736CED] ">
                <Image
                  className="w-[748px] h-[636px] my-[78px]  "
                  src={require("../assets/howitwork2.png")}
                  alt="howitwork"
                />
              </div>
            )}
            {showText3 && (
              <div className="md:w-1/2 lg:w-[52%] xl:w-[55%] bg-[#C6DE41] flex justify-center">
                <Image
                  className="w-[690px] h-[388px] mt-[15rem]  mb-[78px]   "
                  src={require("../assets/howitwork3.png")}
                  alt="login"
                />
              </div>
            )}
          </div>
        ) : (
          <div className="bg-[#0A0003] w-full ">
            <div className="mx-[20px]">
              <div className="flex flex-col">
                <div className=" w-[230px] xsm:w-[320px] my-[40px] text-center sm:ml-[8rem] xsm2:ml-[3rem] ">
                  <p className=" text-[24px] font-[700] leading-[32px] flex items-center justify-center text-[#FFF] ">
                    Dive into a realm of networking{" "}
                  </p>
                </div>
                <div className="mt-4">
                  <div className="bg-[#FD4D26] w-full rounded-[16px] flex justify-center ">
                    <Image
                      className="w-[155.409px] sm:w-[255.409px] sm:h-[276px] mt-4  h-[176px]  "
                      src={require("../assets/howitwork1.png")}
                      alt="Image"
                    />
                  </div>
                  <div className="mt-4 xsm2:ml-[3rem] sm:ml-[8rem] ">
                    <div className="flex">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="25"
                          viewBox="0 0 24 25"
                          fill="none"
                        >
                          <path
                            d="M21.7312 2.76884C20.706 1.74372 19.044 1.74372 18.0189 2.76884L16.8617 3.926L20.574 7.63831L21.7312 6.48116C22.7563 5.45603 22.7563 3.79397 21.7312 2.76884Z"
                            fill="url(#paint0_linear_4142_55286)"
                          />
                          <path
                            d="M19.5134 8.69897L15.801 4.98666L3.65021 17.1375C3.03342 17.7543 2.58003 18.515 2.33101 19.351L1.53123 22.0359C1.45261 22.2998 1.52496 22.5856 1.71969 22.7803C1.91442 22.9751 2.2002 23.0474 2.46413 22.9688L5.14902 22.169C5.98499 21.92 6.74574 21.4666 7.36253 20.8498L19.5134 8.69897Z"
                            fill="url(#paint1_linear_4142_55286)"
                          />
                          <defs>
                            <linearGradient
                              id="paint0_linear_4142_55286"
                              x1="22.5"
                              y1="2"
                              x2="-0.956928"
                              y2="5.24617"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="#FB6609" />
                              <stop offset="1" stopColor="#E40849" />
                            </linearGradient>
                            <linearGradient
                              id="paint1_linear_4142_55286"
                              x1="22.5"
                              y1="2"
                              x2="-0.956928"
                              y2="5.24617"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="#FB6609" />
                              <stop offset="1" stopColor="#E40849" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </span>
                      <p className="add-icon ml-4 text-[18px] font-[800] leading-[25.2px] ">
                        Sign Up & Customise
                      </p>
                    </div>
                    <div className="ml-[40px] mb-[36px] w-[200px] xsm:w-[280px] ">
                      <p className="text-[14px] font-[400]  mt-4 leading-[22px]  text-[#FFFF] ">
                        {" "}
                        Start by creating your Qviq account, choose a template
                        that suits your style, customize it by adding your
                        personal details, bio, contact details, & links to your
                        social media profiles.
                      </p>
                    </div>
                  </div>
                  <div className="bg-[rgba(255,255,255,0.24)] w-full sm:mx-[20px] h-[1px] "></div>
                </div>
                <div className="mt-[36px]">
                  <div className="bg-[#736CED] w-full rounded-[16px] flex justify-center ">
                    <Image
                      className="w-[221.107px] sm:w-[321.107px] sm:h-[288px] mt-4  h-[188px]  "
                      src={require("../assets/howitwork2.png")}
                      alt="Image"
                    />
                  </div>
                  <div className="mt-4 xsm2:ml-[3rem] sm:ml-[8rem] ">
                    <div className="flex">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="25"
                          viewBox="0 0 24 25"
                          fill="none"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M15.75 5C15.75 3.34315 17.0931 2 18.75 2C20.4069 2 21.75 3.34315 21.75 5C21.75 6.65685 20.4069 8 18.75 8C17.8933 8 17.1212 7.64074 16.5751 7.06624L8.15392 11.7447C8.21665 11.9863 8.25 12.2395 8.25 12.5C8.25 12.7605 8.21665 13.0137 8.15392 13.2553L16.5751 17.9338C17.1212 17.3593 17.8933 17 18.75 17C20.4069 17 21.75 18.3431 21.75 20C21.75 21.6569 20.4069 23 18.75 23C17.0931 23 15.75 21.6569 15.75 20C15.75 19.7395 15.7833 19.4863 15.8461 19.2447L7.42488 14.5662C6.87885 15.1407 6.10667 15.5 5.25 15.5C3.59315 15.5 2.25 14.1569 2.25 12.5C2.25 10.8431 3.59315 9.5 5.25 9.5C6.10667 9.5 6.87885 9.85926 7.42488 10.4338L15.8461 5.75532C15.7833 5.51367 15.75 5.26045 15.75 5Z"
                            fill="url(#paint0_linear_4224_9408)"
                          />
                          <defs>
                            <linearGradient
                              id="paint0_linear_4224_9408"
                              x1="21.75"
                              y1="2"
                              x2="-0.0879617"
                              y2="4.80626"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="#FB6609" />
                              <stop offset="1" stopColor="#E40849" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </span>
                      <p className="add-icon ml-4 text-[18px] font-[800] leading-[25.2px] ">
                        Share
                      </p>
                    </div>
                    <div className="ml-[40px] mb-[36px] w-[200px] xsm:w-[280px] ">
                      <p className="text-[14px] font-[400]  mt-4 leading-[22px]  text-[#FFFF] ">
                        {" "}
                        With your Qviqsite ready, it's time to share it with the
                        world. QR Code, Smart Cards, Custom Links, Custom Domain
                      </p>
                    </div>
                  </div>
                  <div className="bg-[rgba(255,255,255,0.24)] w-full sm:mx-[20px] h-[1px] "></div>
                </div>
                <div className="mt-[36px]">
                  <div className="bg-[#C6DE41] w-full rounded-[16px] flex justify-center ">
                    <Image
                      className="w-[254.44px] sm:w-[354.44px] sm:h-[243px] mt-4  h-[143px]  "
                      src={require("../assets/howitwork3.png")}
                      alt="Image"
                    />
                  </div>
                  <div className="mt-4 xsm2:ml-[3rem] sm:ml-[8rem] ">
                    <div className="flex">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="25"
                          viewBox="0 0 24 25"
                          fill="none"
                        >
                          <path
                            d="M4.5 6.875C4.5 4.59683 6.34683 2.75 8.625 2.75C10.9032 2.75 12.75 4.59683 12.75 6.875C12.75 9.15317 10.9032 11 8.625 11C6.34683 11 4.5 9.15317 4.5 6.875Z"
                            fill="url(#paint0_linear_4224_7737)"
                          />
                          <path
                            d="M14.25 9.125C14.25 7.26104 15.761 5.75 17.625 5.75C19.489 5.75 21 7.26104 21 9.125C21 10.989 19.489 12.5 17.625 12.5C15.761 12.5 14.25 10.989 14.25 9.125Z"
                            fill="url(#paint1_linear_4224_7737)"
                          />
                          <path
                            d="M1.5 19.625C1.5 15.69 4.68997 12.5 8.625 12.5C12.56 12.5 15.75 15.69 15.75 19.625V19.6276C15.75 19.6674 15.7496 19.7074 15.749 19.7469C15.7446 20.0054 15.6074 20.2435 15.3859 20.3768C13.4107 21.5661 11.0966 22.25 8.625 22.25C6.15343 22.25 3.8393 21.5661 1.86406 20.3768C1.64256 20.2435 1.50537 20.0054 1.50103 19.7469C1.50034 19.7064 1.5 19.6657 1.5 19.625Z"
                            fill="url(#paint2_linear_4224_7737)"
                          />
                          <path
                            d="M17.2498 19.6281C17.2498 19.6762 17.2494 19.7244 17.2486 19.7722C17.2429 20.1108 17.1612 20.4378 17.0157 20.732C17.2172 20.7439 17.4203 20.75 17.6248 20.75C19.2206 20.75 20.732 20.3803 22.0764 19.7213C22.3234 19.6002 22.4843 19.3536 22.4957 19.0787C22.4984 19.0111 22.4998 18.9432 22.4998 18.875C22.4998 16.1826 20.3172 14 17.6248 14C16.8784 14 16.1711 14.1678 15.5387 14.4676C16.6135 15.9061 17.2498 17.6912 17.2498 19.625V19.6281Z"
                            fill="url(#paint3_linear_4224_7737)"
                          />
                          <defs>
                            <linearGradient
                              id="paint0_linear_4224_7737"
                              x1="22.4998"
                              y1="2.75"
                              x2="-0.886705"
                              y2="6.23536"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="#FB6609" />
                              <stop offset="1" stopColor="#E40849" />
                            </linearGradient>
                            <linearGradient
                              id="paint1_linear_4224_7737"
                              x1="22.4998"
                              y1="2.75"
                              x2="-0.886705"
                              y2="6.23536"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="#FB6609" />
                              <stop offset="1" stopColor="#E40849" />
                            </linearGradient>
                            <linearGradient
                              id="paint2_linear_4224_7737"
                              x1="22.4998"
                              y1="2.75"
                              x2="-0.886705"
                              y2="6.23536"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="#FB6609" />
                              <stop offset="1" stopColor="#E40849" />
                            </linearGradient>
                            <linearGradient
                              id="paint3_linear_4224_7737"
                              x1="22.4998"
                              y1="2.75"
                              x2="-0.886705"
                              y2="6.23536"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="#FB6609" />
                              <stop offset="1" stopColor="#E40849" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </span>
                      <p className="add-icon ml-4 text-[18px] font-[800] leading-[25.2px] ">
                        Connect & Manage
                      </p>
                    </div>
                    <div className="ml-[40px] mb-[36px] w-[200px] mt-4 xsm:w-[280px] ">
                      <p className="text-[14px] font-[400] leading-[22px]  text-[#FFFF] ">
                        {" "}
                        You can easily edit and update your site as needed &
                        monitor your performance. Whether it's adding new links
                        or changing contact details, Qviq makes it simple.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* How it Work section  */}
      {/* Mobile  */}

      {/* horizontal infinite scroll animation */}
      <div className="flex flex-col py-16 relative overflow-hidden justify-center  mb-[64px] sm:mb-24  mt-[64px] sm:mt-24 lg:mt-[80px] w-full bg-[#0A0003]">
        <div
          className="h-[157px] blur-[38px] w-[189px] left-[2rem] xsm:left-[5rem] xsm2:left-[9rem] sm:left-[12rem] top-[-80px] md:w-[489px] sm2:blur-[120px] md:h-[489px] absolute xl:left-[530px] lg:left-[19rem] sm2:h-[289px] sm2:w-[300px] sm2:top-[-200px] sm2:left-[10rem] md:left-[10rem] md:top-[-322px] rounded-[600px] "
          style={{
            transform: "rotate(-90deg)",
            background:
              "linear-gradient(210deg, rgba(228, 8, 73, 0.80) 39.19%, rgba(251, 102, 9, 0.80) 78.88%)",
          }}
        ></div>
        <p className="font-[800] text-[24px] md:text-[48px] z-30 text-[#fff] leading-[32px] sm:text-4xl lg:text-[48px] lg:leading-[64px] self-center text-center">
          Discover the magic of qviqsites
        </p>
        <InfiniteSlider></InfiniteSlider>
      </div>

      {/* Feature 2 */}
      <div className="relative w-full hidden md:block bg-white z-10 mb-[64px] sm:mb-24 ">
        <Carousel
          data={webFeatureData}
          infinite={true}
          autoplay={true}
          dots={false}
        ></Carousel>
      </div>

      <div className="relative w-full md:hidden bg-white z-20">
        <Carousel
          data={mobileFeatureData}
          infinite={true}
          autoplay={false}
          dots={false}
          top="41%"
        ></Carousel>
      </div>

      {/* Cards section  */}

      {/* <div className="relative overflow-hidden flex flex-col justify-center items-center p-[20px] py-[40px] md:pt-[70px]  bg-[#0A0003] z-0">
        <div
          className="absolute top-[0%] sm:top-[-0%] right-[0%] sm:right-[0%] w-[129px] h-[126px] sm:w-[314px] sm:h-[306px] rounded-full z-0 blur-[50px] sm:blur-[100px]"
          style={{
            transform: "rotate(-30deg)",
            background:
              "linear-gradient(262deg, rgba(92, 83, 249, 0.80) 18.09%, rgba(228, 8, 73, 0.80) 45.37%, rgba(251, 102, 9, 0.80) 91.87%)",
          }}
        ></div>

        <div
          className="absolute bottom-[0%] sm:bottom-[-0%] left-[30%] sm:left-[40%] w-[145.285px] h-[276.661px] sm:w-[267px] sm:h-[508.441px] rounded-full z-0 blur-[68.43167877197266px] sm:blur-[100px]"
          style={{
            background:
              "linear-gradient(267deg, rgba(228, 8, 73, 0.80) 19.78%, rgba(251, 102, 9, 0.80) 98.35%)",
            transform: "rotate(-113.851deg)",
          }}
        ></div>

        <Image
          className="absolute max-w-none z-0 w-[950px] sm:w-[930px] md:w-[108%] bottom-[0%] left-[0%] sm:left-[-20%] md:left-[-5%]"
          src={require("../assets/strings.png")}
          alt="strings"
        />

       

        <p className="relative text-center text-white text-[28px] sm:text-[48px] font-[700] sm:font-[800] tracking-[-0.96px] leading-[32px] sm:leading-[120%] z-2">
          The Best Tool to Network Offline with Confidence
        </p>

        <p className="relative mt-[24px] mb-[28px] sm:mt-[40px] sm:mb-[48px] text-[#ffffffcc] text-center text-[14px] sm:text-[22px] font-[400] sm:font-[400] leading-[22px] sm:leading-[38px]  z-2">
          Just Tap, share & connect! Its that easy with our NFC smart cards &
          other tools.
        </p>
        <PrimaryButton3
          // onClick={() => navigate.push("/products")}
          height="55px"
          width="391"
          padding="7px 32px 8px 32px"
          text="Explore Qviq Smart Cards"
          fontSize="18px"
          fontWeight="600"
          // className="h-[48px] sm:h[64px]"
        />
        <Image
          className="h-[234px] md:h-[422px] z-20 mt-[32px]"
          src={require("../assets/credit cards.png")}
          alt="phone"
        />
      </div> */}

      {/* How to create a Qviq-site? */}

      <div className="my-20 bg-[#0A0003]  p-[48px] relative overflow-hidden flex flex-col md:flex-row justify-around items-center">
        <div className="flex flex-col gap-[48px]">
          <div className="text-[24px] text-[#FFF] font-[700]">
            How to create a Qviq-site?
          </div>
          <div>
            <Image
              className="lg:w-[559px] lg:h-[384px] md3:w-[400px] md3:h-[250px] md:h-[235px] md:w-[270px] "
              src={require("../assets/Group.png")}
              alt="design"
            ></Image>
          </div>
          {username === "" && (
            <PrimaryButton3
              onClick={() => navigate.push("/signup")}
              text="Start Your Free Trial"
              width="224px"
              padding="13px 23px 15px 24px"
              className="Plus-Jakarta-Sans-font-div h-[48px] sm:h-[56px] text-center  text-[16px] font-[900] leading-[20px] sm:text-[18px] sm:font-[700] sm:leading-[20px] text-[#ffffff]"
            />
          )}
        </div>
        <div className="absolute z-0 md:right-[5rem] lg:right-[4rem] xl:right-[10rem] rounded-[483px] bg-[rgba(178,132,238,0.49)] xl:w-[335px] xl:h-[483px] lg:w-[335px] lg:h-[429px] md:w-[270px] md:h-[329px] w-[173px] h-[271px] top-[62%] md:top-[5rem] lg:top-[5rem] sm:blur-[100px] sm:h-[371px] sm:w-[373px] sm:top-[35rem] blur-[51.8px]" />
        <div className="z-10">
          <Image
            className="lg:w-[374px] lg:h-[423px] mt-5 md:mt-0 md3:w-[280px] md3:h-[323px] md:h-[280px] md:w-[230px] w-auto h-[245px]"
            src={require("../assets/Frame.png")}
            alt="design"
          ></Image>
        </div>
      </div>

      {/* <div className="flex flex-col md:flex-row items-center py-16  sm:pt-24  px-5 xl:px-20 w-full">
        <div className="w-4/5 md:w-1/2 md:h-[400px] lg:h-[475px] xl:h-[576px]">
          <Image
            src={require("../assets/testimonial.png")}
            alt="Image"
            className="w-full h-full"
          />
        </div>

        
        <div className="md:w-1/2">
          <p className="font-[500] text-[14px] sm:text-[18px] leading-[20px] text-[#817C7C]">
            Testimonials
          </p>
          <p className="font-[600] text-[16px] leading-[24px] md:text-[20px] md:leading-[30px] xl:text-[24px] xl:leading-[38px] text-[#1a1a1a] mt-[32px] mb-[20px] sm:my-[36px]">
            "Looked at our past email marketing efforts, helped boil down the
            focus, and provided the SEO keywords that can be targeted to market
            to relevant clients. Super helpful mentor always. Do book a call
            with him, he blows everything right off the bat!"
          </p>
          <p className="font-[800] text-[18px] leading-[24px] text-[#1a1a1a]">
            John Doe
          </p>
          <p className="font-[400] text-[18px] leading-[24px] text-[#1a1a1a]">
            Content creator
          </p>
          <div className="flex gap-3 sm:gap-6 md:gap-[54px] items-center mt-[40px]">
          </div>
        </div>
      </div> */}

      <div className="flex flex-col items-center justify-center w-full px-3 pt-16  sm:pt-24 xsm:px-[20px]">
        <p className="font-[800] text-[24px] leading-[32px] sm:text-[48px] sm:leading-[64px] text-center text-[#0A0003]">
          Frequently asked questions
        </p>
        <div className="w-full sm:max-w-[750px] mt-6 xsm:mt-[52px] sm:mt-[60px] font-[700] text-[16px] leading-[24px] sm:text-[24px] sm:leading-[32px]">
          <div className="px-3 py-5 xsm:p-[20px] sm:pb-[36px] border-b-[1px] border-[#0A0003] sm:mt-[42px]">
            <div
              onClick={() => {
                setfaq1(!faq1);
                setfaq5(false);
                setfaq4(false);
                setfaq3(false);
                setfaq2(false);
                setfaq6(false);
              }}
              className="flex cursor-pointer items-center leading-[32px] justify-between sm:px-[36px]"
            >
              <p className="w-[629px]">How do I create a Qviqsite for free?</p>

              {faq1 ? (
                <button>
                  <HiChevronUp />
                </button>
              ) : (
                <button>
                  <HiChevronDown />
                </button>
              )}
            </div>
            {faq1 && (
              <div className="mt-[42px] font-[400] px-[20px] sm:px-[36px] text-[16px] ">
                <p>
                  Sign up for a free Qviq account. Choose a template and start
                  customizing your Qviqsite with your information and content.
                  It's a hassle-free process.
                </p>
                {/* <ul className="ml-[20px]">
                  <li>
                    {" "}
                    magna ultricies vitae. Arcu porttitor dui ornare urna id sit
                    integer.
                  </li>
                  <li>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Optio magnam nisi harum!
                  </li>
                  <li>
                    consectetur convallis aenean nibh nibh mattis. Ut ultrices
                    ultrices dignissim amet in.
                  </li>
                </ul> */}
              </div>
            )}
          </div>

          {/* <div className="px-3 py-5 xsm:p-[20px] sm:pb-[36px] border-b-[1px] border-[#0A0003] sm:mt-[42px]">
            <div
              onClick={() => setfaq2(!faq2)}
              className="flex cursor-pointer items-center justify-between sm:px-[36px]  "
            >
              <p className="w-[629px]">What are Qviq Smart Cards?</p>
              {faq2 ? (
                <button>
                  <HiChevronUp />
                </button>
              ) : (
                <button>
                  <HiChevronDown />
                </button>
              )}
            </div>
            {faq2 && (
              <div className="mt-[42px] font-[400] px-[20px] sm:px-[36px] text-[16px] leading-[24px]">
                <p>
                  Qviq Smart Cards are NFC-enabled cards that can be used to
                  share your qviqsite offline. When you tap a Smart Card on an
                  NFC enabled smartphone, it instantly opens your Qviqsite on
                  their browser. They're a modern and convenient way to share
                  your contact information and create connections on the go. The
                  Perfect tool to network offline.
                </p>
                
              </div>
            )}
          </div> */}

          <div className="px-3 py-5 xsm:p-[20px] sm:pb-[36px] border-b-[1px] border-[#0A0003] sm:mt-[42px]">
            <div
             onClick={() => {
              setfaq3(!faq3);
              setfaq5(false);
              setfaq4(false);
              setfaq6(false);
              setfaq2(false);
              setfaq1(false);
            }}
              className="flex cursor-pointer items-center justify-between sm:px-[36px] "
            >
              <p className="w-[629px]"> Can I edit my Qviqsite later?</p>
              {faq3 ? (
                <button>
                  <HiChevronUp />
                </button>
              ) : (
                <button>
                  <HiChevronDown />
                </button>
              )}
            </div>
            {faq3 && (
              <div className="mt-[42px] font-[400] px-[20px] sm:px-[36px] text-[16px] leading-[24px]">
                <p>
                  Absolutely! Qviq offers an intuitive editor that lets you make
                  changes to your Qviqsite anytime. Keep it up to date with your
                  latest accomplishments and information.
                </p>
                {/* <ul className="ml-[20px]">
                  <li>
                    {" "}
                    magna ultricies vitae. Arcu porttitor dui ornare urna id sit
                    integer.
                  </li>
                  <li>
                    A placerat molestie dictum lectus eget lacus duis. Odio at
                    egestas cras
                  </li>
                  <li>
                    consectetur convallis aenean nibh nibh mattis. Ut ultrices
                    ultrices dignissim amet in.
                  </li>
                </ul> */}
              </div>
            )}
          </div>

          <div className="px-3 py-5 xsm:p-[20px] sm:pb-[36px] border-b-[1px] border-[#0A0003] sm:mt-[42px]">
            <div
              onClick={() => {
                setfaq4(!faq4);
                setfaq5(false);
                setfaq6(false);
                setfaq3(false);
                setfaq2(false);
                setfaq1(false);
              }}
              className="flex cursor-pointer items-center justify-between sm:px-[36px] "
            >
              <p className="w-[629px]">Is my data safe with Qviq?</p>
              {faq4 ? (
                <button>
                  <HiChevronUp />
                </button>
              ) : (
                <button>
                  <HiChevronDown />
                </button>
              )}
            </div>
            {faq4 && (
              <div className="mt-[42px] font-[400] px-[20px] sm:px-[36px] text-[16px] leading-[24px]">
                <p>
                  Your data security is our top priority. Qviq uses
                  industry-standard security measures to protect your
                  information. You can network with confidence.
                </p>
                {/* <ul className="ml-[20px]">
                  <li>
                    {" "}
                    magna ultricies vitae. Arcu porttitor dui ornare urna id sit
                    integer.
                  </li>
                  <li>
                    A placerat molestie dictum lectus eget lacus duis. Odio at
                    egestas cras
                  </li>
                  <li>
                    consectetur convallis aenean nibh nibh mattis. Ut ultrices
                    ultrices dignissim amet in.
                  </li>
                </ul> */}
              </div>
            )}
          </div>

          <div className="px-3 py-5 xsm:p-[20px] sm:pb-[36px] border-b-[1px] border-[#0A0003] sm:mt-[42px]">
            <div
             onClick={() => {
              setfaq5(!faq5);
              setfaq6(false);
              setfaq4(false);
              setfaq3(false);
              setfaq2(false);
              setfaq1(false);
            }}
              className="flex cursor-pointer items-center justify-between sm:px-[36px] "
            >
              <p className="w-[629px]">
                {" "}
                How can I track my Qviqsite's performance?
              </p>
              {faq5 ? (
                <button>
                  <HiChevronUp />
                </button>
              ) : (
                <button>
                  <HiChevronDown />
                </button>
              )}
            </div>
            {faq5 && (
              <div className="mt-[42px] font-[400] px-[20px] sm:px-[36px] text-[16px] leading-[24px]">
                <p>
                  Qviq provides detailed analytics to help you understand how
                  your Qviqsite is performing. You can see how many people have
                  visited, what content they interact with, and more.
                </p>
                {/* <ul className="ml-[20px]">
                  <li>
                    {" "}
                    magna ultricies vitae. Arcu porttitor dui ornare urna id sit
                    integer.
                  </li>
                  <li>
                    A placerat molestie dictum lectus eget lacus duis. Odio at
                    egestas cras
                  </li>
                  <li>
                    consectetur convallis aenean nibh nibh mattis. Ut ultrices
                    ultrices dignissim amet in.
                  </li>
                </ul> */}
              </div>
            )}
          </div>

          <div className="px-3 py-5 xsm:p-[20px] sm:pb-[36px] border-b-[1px] border-[#0A0003] sm:mt-[42px]">
            <div
              onClick={() => {
                setfaq6(!faq6);
                setfaq5(false);
                setfaq4(false);
                setfaq3(false);
                setfaq2(false);
                setfaq1(false);
              }}
              className="flex cursor-pointer items-center justify-between sm:px-[36px] "
            >
              <p className="w-[629px]"> Can I use Qviq on mobile devices?</p>
              {faq6 ? (
                <button>
                  <HiChevronUp />
                </button>
              ) : (
                <button>
                  <HiChevronDown />
                </button>
              )}
            </div>
            {faq6 && (
              <div className="mt-[42px] font-[400] px-[20px] sm:px-[36px] text-[16px] leading-[24px]">
                <p>
                  Yes, Qviq is designed to be a mobile-first platform. You can
                  access and manage your Qviqsite from your smartphone, tablet,
                  or computer, making it easy to stay connected on the go.
                </p>
                {/* <ul className="ml-[20px]">
                  <li>
                    {" "}
                    magna ultricies vitae. Arcu porttitor dui ornare urna id sit
                    integer.
                  </li>
                  <li>
                    A placerat molestie dictum lectus eget lacus duis. Odio at
                    egestas cras
                  </li>
                  <li>
                    consectetur convallis aenean nibh nibh mattis. Ut ultrices
                    ultrices dignissim amet in.
                  </li>
                </ul> */}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-[32px] overflow-hidden w-full h-[100px] sm:h-[118px] bg-[linear-gradient(262deg,rgba(251,102,9)0%,rgba(228,8,73)100%)]  text-white mt-[60px] sm:mt-[96px]">
        <div className="flex shrink-0 align-middle justify-between gap-[32px] animate-marquee">
          <p className="font-[500] text-[20px] sm:text-[24px] leading-[36px] min-w-fit">
            Create your online presence with Qviq
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-[42px]"
            width="11"
            height="28"
            viewBox="0 0 11 28"
            fill="none"
          >
            <path
              d="M7.59803 6.83513C9.33131 6.83513 10.7364 5.43204 10.7364 3.70126C10.7364 1.97047 9.33131 0.567383 7.59803 0.567383C5.86475 0.567383 4.45966 1.97047 4.45966 3.70126C4.45966 5.43204 5.86475 6.83513 7.59803 6.83513Z"
              fill="white"
            />
            <path
              d="M1.31169 27.0375L4.60899 20.1322C4.61696 20.1155 4.62056 20.0971 4.61947 20.0786C4.61838 20.0602 4.61262 20.0423 4.60274 20.0266C4.59286 20.011 4.57917 19.9981 4.56296 19.9892C4.54674 19.9803 4.52853 19.9756 4.51002 19.9756H0.553258C0.46553 19.9756 0.379063 19.9547 0.300992 19.9148C0.22292 19.8748 0.155481 19.8169 0.104235 19.7458C0.052989 19.6747 0.0194039 19.5925 0.00625319 19.5058C-0.00689754 19.4192 0.000760849 19.3307 0.0285976 19.2477L3.82431 7.9279C3.84036 7.88028 3.86707 7.83694 3.9024 7.80117C3.93773 7.7654 3.98076 7.73813 4.02821 7.72144C4.07567 7.70474 4.12631 7.69906 4.17629 7.70482C4.22627 7.71058 4.27428 7.72763 4.31668 7.75468C5.2992 8.37441 6.43768 8.70299 7.5998 8.70224C8.20271 8.70258 8.80231 8.61316 9.37881 8.43693C9.68034 8.34483 9.93114 8.67638 9.75519 8.9371L5.8034 14.7925C5.79226 14.809 5.78581 14.8282 5.78476 14.848C5.7837 14.8678 5.78808 14.8876 5.79741 14.9051C5.80675 14.9227 5.82069 14.9374 5.83774 14.9476C5.85479 14.9578 5.87431 14.9633 5.89421 14.9633H10.3242C10.4279 14.9632 10.5296 14.9922 10.6176 15.047C10.7055 15.1019 10.7763 15.1803 10.8218 15.2734C10.8672 15.3665 10.8856 15.4705 10.8747 15.5735C10.8638 15.6765 10.8241 15.7744 10.7602 15.8559L1.77604 27.3248C1.57242 27.5831 1.17015 27.3337 1.31169 27.0375Z"
              fill="white"
            />
          </svg>
          <p className="font-[500] text-[20px] sm:text-[24px] leading-[36px] min-w-fit">
            Create your online presence with Qviq
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-[42px]"
            width="11"
            height="28"
            viewBox="0 0 11 28"
            fill="none"
          >
            <path
              d="M7.59803 6.83513C9.33131 6.83513 10.7364 5.43204 10.7364 3.70126C10.7364 1.97047 9.33131 0.567383 7.59803 0.567383C5.86475 0.567383 4.45966 1.97047 4.45966 3.70126C4.45966 5.43204 5.86475 6.83513 7.59803 6.83513Z"
              fill="white"
            />
            <path
              d="M1.31169 27.0375L4.60899 20.1322C4.61696 20.1155 4.62056 20.0971 4.61947 20.0786C4.61838 20.0602 4.61262 20.0423 4.60274 20.0266C4.59286 20.011 4.57917 19.9981 4.56296 19.9892C4.54674 19.9803 4.52853 19.9756 4.51002 19.9756H0.553258C0.46553 19.9756 0.379063 19.9547 0.300992 19.9148C0.22292 19.8748 0.155481 19.8169 0.104235 19.7458C0.052989 19.6747 0.0194039 19.5925 0.00625319 19.5058C-0.00689754 19.4192 0.000760849 19.3307 0.0285976 19.2477L3.82431 7.9279C3.84036 7.88028 3.86707 7.83694 3.9024 7.80117C3.93773 7.7654 3.98076 7.73813 4.02821 7.72144C4.07567 7.70474 4.12631 7.69906 4.17629 7.70482C4.22627 7.71058 4.27428 7.72763 4.31668 7.75468C5.2992 8.37441 6.43768 8.70299 7.5998 8.70224C8.20271 8.70258 8.80231 8.61316 9.37881 8.43693C9.68034 8.34483 9.93114 8.67638 9.75519 8.9371L5.8034 14.7925C5.79226 14.809 5.78581 14.8282 5.78476 14.848C5.7837 14.8678 5.78808 14.8876 5.79741 14.9051C5.80675 14.9227 5.82069 14.9374 5.83774 14.9476C5.85479 14.9578 5.87431 14.9633 5.89421 14.9633H10.3242C10.4279 14.9632 10.5296 14.9922 10.6176 15.047C10.7055 15.1019 10.7763 15.1803 10.8218 15.2734C10.8672 15.3665 10.8856 15.4705 10.8747 15.5735C10.8638 15.6765 10.8241 15.7744 10.7602 15.8559L1.77604 27.3248C1.57242 27.5831 1.17015 27.3337 1.31169 27.0375Z"
              fill="white"
            />
          </svg>
          <p className="font-[500] text-[20px] sm:text-[24px] leading-[36px] min-w-fit">
            Create your online presence with Qviq
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-[42px]"
            width="11"
            height="28"
            viewBox="0 0 11 28"
            fill="none"
          >
            <path
              d="M7.59803 6.83513C9.33131 6.83513 10.7364 5.43204 10.7364 3.70126C10.7364 1.97047 9.33131 0.567383 7.59803 0.567383C5.86475 0.567383 4.45966 1.97047 4.45966 3.70126C4.45966 5.43204 5.86475 6.83513 7.59803 6.83513Z"
              fill="white"
            />
            <path
              d="M1.31169 27.0375L4.60899 20.1322C4.61696 20.1155 4.62056 20.0971 4.61947 20.0786C4.61838 20.0602 4.61262 20.0423 4.60274 20.0266C4.59286 20.011 4.57917 19.9981 4.56296 19.9892C4.54674 19.9803 4.52853 19.9756 4.51002 19.9756H0.553258C0.46553 19.9756 0.379063 19.9547 0.300992 19.9148C0.22292 19.8748 0.155481 19.8169 0.104235 19.7458C0.052989 19.6747 0.0194039 19.5925 0.00625319 19.5058C-0.00689754 19.4192 0.000760849 19.3307 0.0285976 19.2477L3.82431 7.9279C3.84036 7.88028 3.86707 7.83694 3.9024 7.80117C3.93773 7.7654 3.98076 7.73813 4.02821 7.72144C4.07567 7.70474 4.12631 7.69906 4.17629 7.70482C4.22627 7.71058 4.27428 7.72763 4.31668 7.75468C5.2992 8.37441 6.43768 8.70299 7.5998 8.70224C8.20271 8.70258 8.80231 8.61316 9.37881 8.43693C9.68034 8.34483 9.93114 8.67638 9.75519 8.9371L5.8034 14.7925C5.79226 14.809 5.78581 14.8282 5.78476 14.848C5.7837 14.8678 5.78808 14.8876 5.79741 14.9051C5.80675 14.9227 5.82069 14.9374 5.83774 14.9476C5.85479 14.9578 5.87431 14.9633 5.89421 14.9633H10.3242C10.4279 14.9632 10.5296 14.9922 10.6176 15.047C10.7055 15.1019 10.7763 15.1803 10.8218 15.2734C10.8672 15.3665 10.8856 15.4705 10.8747 15.5735C10.8638 15.6765 10.8241 15.7744 10.7602 15.8559L1.77604 27.3248C1.57242 27.5831 1.17015 27.3337 1.31169 27.0375Z"
              fill="white"
            />
          </svg>
          <p className="font-[500] text-[20px] sm:text-[24px] leading-[36px] min-w-fit">
            Create your online presence with Qviq
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-[42px]"
            width="11"
            height="28"
            viewBox="0 0 11 28"
            fill="none"
          >
            <path
              d="M7.59803 6.83513C9.33131 6.83513 10.7364 5.43204 10.7364 3.70126C10.7364 1.97047 9.33131 0.567383 7.59803 0.567383C5.86475 0.567383 4.45966 1.97047 4.45966 3.70126C4.45966 5.43204 5.86475 6.83513 7.59803 6.83513Z"
              fill="white"
            />
            <path
              d="M1.31169 27.0375L4.60899 20.1322C4.61696 20.1155 4.62056 20.0971 4.61947 20.0786C4.61838 20.0602 4.61262 20.0423 4.60274 20.0266C4.59286 20.011 4.57917 19.9981 4.56296 19.9892C4.54674 19.9803 4.52853 19.9756 4.51002 19.9756H0.553258C0.46553 19.9756 0.379063 19.9547 0.300992 19.9148C0.22292 19.8748 0.155481 19.8169 0.104235 19.7458C0.052989 19.6747 0.0194039 19.5925 0.00625319 19.5058C-0.00689754 19.4192 0.000760849 19.3307 0.0285976 19.2477L3.82431 7.9279C3.84036 7.88028 3.86707 7.83694 3.9024 7.80117C3.93773 7.7654 3.98076 7.73813 4.02821 7.72144C4.07567 7.70474 4.12631 7.69906 4.17629 7.70482C4.22627 7.71058 4.27428 7.72763 4.31668 7.75468C5.2992 8.37441 6.43768 8.70299 7.5998 8.70224C8.20271 8.70258 8.80231 8.61316 9.37881 8.43693C9.68034 8.34483 9.93114 8.67638 9.75519 8.9371L5.8034 14.7925C5.79226 14.809 5.78581 14.8282 5.78476 14.848C5.7837 14.8678 5.78808 14.8876 5.79741 14.9051C5.80675 14.9227 5.82069 14.9374 5.83774 14.9476C5.85479 14.9578 5.87431 14.9633 5.89421 14.9633H10.3242C10.4279 14.9632 10.5296 14.9922 10.6176 15.047C10.7055 15.1019 10.7763 15.1803 10.8218 15.2734C10.8672 15.3665 10.8856 15.4705 10.8747 15.5735C10.8638 15.6765 10.8241 15.7744 10.7602 15.8559L1.77604 27.3248C1.57242 27.5831 1.17015 27.3337 1.31169 27.0375Z"
              fill="white"
            />
          </svg>
        </div>
        <div className="flex shrink-0 align-middle justify-between gap-[32px] animate-marquee">
          <p className="font-[500] text-[20px] sm:text-[24px] leading-[36px] min-w-fit">
            Create your online presence with Qviq
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-[42px]"
            width="11"
            height="28"
            viewBox="0 0 11 28"
            fill="none"
          >
            <path
              d="M7.59803 6.83513C9.33131 6.83513 10.7364 5.43204 10.7364 3.70126C10.7364 1.97047 9.33131 0.567383 7.59803 0.567383C5.86475 0.567383 4.45966 1.97047 4.45966 3.70126C4.45966 5.43204 5.86475 6.83513 7.59803 6.83513Z"
              fill="white"
            />
            <path
              d="M1.31169 27.0375L4.60899 20.1322C4.61696 20.1155 4.62056 20.0971 4.61947 20.0786C4.61838 20.0602 4.61262 20.0423 4.60274 20.0266C4.59286 20.011 4.57917 19.9981 4.56296 19.9892C4.54674 19.9803 4.52853 19.9756 4.51002 19.9756H0.553258C0.46553 19.9756 0.379063 19.9547 0.300992 19.9148C0.22292 19.8748 0.155481 19.8169 0.104235 19.7458C0.052989 19.6747 0.0194039 19.5925 0.00625319 19.5058C-0.00689754 19.4192 0.000760849 19.3307 0.0285976 19.2477L3.82431 7.9279C3.84036 7.88028 3.86707 7.83694 3.9024 7.80117C3.93773 7.7654 3.98076 7.73813 4.02821 7.72144C4.07567 7.70474 4.12631 7.69906 4.17629 7.70482C4.22627 7.71058 4.27428 7.72763 4.31668 7.75468C5.2992 8.37441 6.43768 8.70299 7.5998 8.70224C8.20271 8.70258 8.80231 8.61316 9.37881 8.43693C9.68034 8.34483 9.93114 8.67638 9.75519 8.9371L5.8034 14.7925C5.79226 14.809 5.78581 14.8282 5.78476 14.848C5.7837 14.8678 5.78808 14.8876 5.79741 14.9051C5.80675 14.9227 5.82069 14.9374 5.83774 14.9476C5.85479 14.9578 5.87431 14.9633 5.89421 14.9633H10.3242C10.4279 14.9632 10.5296 14.9922 10.6176 15.047C10.7055 15.1019 10.7763 15.1803 10.8218 15.2734C10.8672 15.3665 10.8856 15.4705 10.8747 15.5735C10.8638 15.6765 10.8241 15.7744 10.7602 15.8559L1.77604 27.3248C1.57242 27.5831 1.17015 27.3337 1.31169 27.0375Z"
              fill="white"
            />
          </svg>
          <p className="font-[500] text-[20px] sm:text-[24px] leading-[36px] min-w-fit">
            Create your online presence with Qviq
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-[42px]"
            width="11"
            height="28"
            viewBox="0 0 11 28"
            fill="none"
          >
            <path
              d="M7.59803 6.83513C9.33131 6.83513 10.7364 5.43204 10.7364 3.70126C10.7364 1.97047 9.33131 0.567383 7.59803 0.567383C5.86475 0.567383 4.45966 1.97047 4.45966 3.70126C4.45966 5.43204 5.86475 6.83513 7.59803 6.83513Z"
              fill="white"
            />
            <path
              d="M1.31169 27.0375L4.60899 20.1322C4.61696 20.1155 4.62056 20.0971 4.61947 20.0786C4.61838 20.0602 4.61262 20.0423 4.60274 20.0266C4.59286 20.011 4.57917 19.9981 4.56296 19.9892C4.54674 19.9803 4.52853 19.9756 4.51002 19.9756H0.553258C0.46553 19.9756 0.379063 19.9547 0.300992 19.9148C0.22292 19.8748 0.155481 19.8169 0.104235 19.7458C0.052989 19.6747 0.0194039 19.5925 0.00625319 19.5058C-0.00689754 19.4192 0.000760849 19.3307 0.0285976 19.2477L3.82431 7.9279C3.84036 7.88028 3.86707 7.83694 3.9024 7.80117C3.93773 7.7654 3.98076 7.73813 4.02821 7.72144C4.07567 7.70474 4.12631 7.69906 4.17629 7.70482C4.22627 7.71058 4.27428 7.72763 4.31668 7.75468C5.2992 8.37441 6.43768 8.70299 7.5998 8.70224C8.20271 8.70258 8.80231 8.61316 9.37881 8.43693C9.68034 8.34483 9.93114 8.67638 9.75519 8.9371L5.8034 14.7925C5.79226 14.809 5.78581 14.8282 5.78476 14.848C5.7837 14.8678 5.78808 14.8876 5.79741 14.9051C5.80675 14.9227 5.82069 14.9374 5.83774 14.9476C5.85479 14.9578 5.87431 14.9633 5.89421 14.9633H10.3242C10.4279 14.9632 10.5296 14.9922 10.6176 15.047C10.7055 15.1019 10.7763 15.1803 10.8218 15.2734C10.8672 15.3665 10.8856 15.4705 10.8747 15.5735C10.8638 15.6765 10.8241 15.7744 10.7602 15.8559L1.77604 27.3248C1.57242 27.5831 1.17015 27.3337 1.31169 27.0375Z"
              fill="white"
            />
          </svg>
          <p className="font-[500] text-[20px] sm:text-[24px] leading-[36px] min-w-fit">
            Create your online presence with Qviq
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-[42px]"
            width="11"
            height="28"
            viewBox="0 0 11 28"
            fill="none"
          >
            <path
              d="M7.59803 6.83513C9.33131 6.83513 10.7364 5.43204 10.7364 3.70126C10.7364 1.97047 9.33131 0.567383 7.59803 0.567383C5.86475 0.567383 4.45966 1.97047 4.45966 3.70126C4.45966 5.43204 5.86475 6.83513 7.59803 6.83513Z"
              fill="white"
            />
            <path
              d="M1.31169 27.0375L4.60899 20.1322C4.61696 20.1155 4.62056 20.0971 4.61947 20.0786C4.61838 20.0602 4.61262 20.0423 4.60274 20.0266C4.59286 20.011 4.57917 19.9981 4.56296 19.9892C4.54674 19.9803 4.52853 19.9756 4.51002 19.9756H0.553258C0.46553 19.9756 0.379063 19.9547 0.300992 19.9148C0.22292 19.8748 0.155481 19.8169 0.104235 19.7458C0.052989 19.6747 0.0194039 19.5925 0.00625319 19.5058C-0.00689754 19.4192 0.000760849 19.3307 0.0285976 19.2477L3.82431 7.9279C3.84036 7.88028 3.86707 7.83694 3.9024 7.80117C3.93773 7.7654 3.98076 7.73813 4.02821 7.72144C4.07567 7.70474 4.12631 7.69906 4.17629 7.70482C4.22627 7.71058 4.27428 7.72763 4.31668 7.75468C5.2992 8.37441 6.43768 8.70299 7.5998 8.70224C8.20271 8.70258 8.80231 8.61316 9.37881 8.43693C9.68034 8.34483 9.93114 8.67638 9.75519 8.9371L5.8034 14.7925C5.79226 14.809 5.78581 14.8282 5.78476 14.848C5.7837 14.8678 5.78808 14.8876 5.79741 14.9051C5.80675 14.9227 5.82069 14.9374 5.83774 14.9476C5.85479 14.9578 5.87431 14.9633 5.89421 14.9633H10.3242C10.4279 14.9632 10.5296 14.9922 10.6176 15.047C10.7055 15.1019 10.7763 15.1803 10.8218 15.2734C10.8672 15.3665 10.8856 15.4705 10.8747 15.5735C10.8638 15.6765 10.8241 15.7744 10.7602 15.8559L1.77604 27.3248C1.57242 27.5831 1.17015 27.3337 1.31169 27.0375Z"
              fill="white"
            />
          </svg>
          <p className="font-[500] text-[20px] sm:text-[24px] leading-[36px] min-w-fit">
            Create your online presence with Qviq
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-[42px]"
            width="11"
            height="28"
            viewBox="0 0 11 28"
            fill="none"
          >
            <path
              d="M7.59803 6.83513C9.33131 6.83513 10.7364 5.43204 10.7364 3.70126C10.7364 1.97047 9.33131 0.567383 7.59803 0.567383C5.86475 0.567383 4.45966 1.97047 4.45966 3.70126C4.45966 5.43204 5.86475 6.83513 7.59803 6.83513Z"
              fill="white"
            />
            <path
              d="M1.31169 27.0375L4.60899 20.1322C4.61696 20.1155 4.62056 20.0971 4.61947 20.0786C4.61838 20.0602 4.61262 20.0423 4.60274 20.0266C4.59286 20.011 4.57917 19.9981 4.56296 19.9892C4.54674 19.9803 4.52853 19.9756 4.51002 19.9756H0.553258C0.46553 19.9756 0.379063 19.9547 0.300992 19.9148C0.22292 19.8748 0.155481 19.8169 0.104235 19.7458C0.052989 19.6747 0.0194039 19.5925 0.00625319 19.5058C-0.00689754 19.4192 0.000760849 19.3307 0.0285976 19.2477L3.82431 7.9279C3.84036 7.88028 3.86707 7.83694 3.9024 7.80117C3.93773 7.7654 3.98076 7.73813 4.02821 7.72144C4.07567 7.70474 4.12631 7.69906 4.17629 7.70482C4.22627 7.71058 4.27428 7.72763 4.31668 7.75468C5.2992 8.37441 6.43768 8.70299 7.5998 8.70224C8.20271 8.70258 8.80231 8.61316 9.37881 8.43693C9.68034 8.34483 9.93114 8.67638 9.75519 8.9371L5.8034 14.7925C5.79226 14.809 5.78581 14.8282 5.78476 14.848C5.7837 14.8678 5.78808 14.8876 5.79741 14.9051C5.80675 14.9227 5.82069 14.9374 5.83774 14.9476C5.85479 14.9578 5.87431 14.9633 5.89421 14.9633H10.3242C10.4279 14.9632 10.5296 14.9922 10.6176 15.047C10.7055 15.1019 10.7763 15.1803 10.8218 15.2734C10.8672 15.3665 10.8856 15.4705 10.8747 15.5735C10.8638 15.6765 10.8241 15.7744 10.7602 15.8559L1.77604 27.3248C1.57242 27.5831 1.17015 27.3337 1.31169 27.0375Z"
              fill="white"
            />
          </svg>
        </div>
      </div>

      <Footer />
    </div>
  );
}
