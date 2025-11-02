import React, { useEffect, useRef, useState } from "react";
import HeroProfile from "./HeroProfile";
import BaseTemplate1 from "../ProfileComponents/BaseTemplates/BaseTemplate1";

const Template2 = (props) => {
  // Button Component Styling
  const buttonStyle =
    "bg-[#283618] hover:bg-[#606C38] text-white rounded-[40px] Proza-Libre-font-div hover:cursor-pointer";
  const modalButtonStyle = buttonStyle.concat(" w-full h-[50px]");

  // Heading Component
  const Heading = (props) => {
    return (
      <h1 className="text-[52px] font-bold flex items-center gap-3 relative text-[#121212] mb-7 Cormorant-Garamond-font-div">
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="41"
            viewBox="0 0 40 41"
            fill="none"
          >
            <path
              d="M20 0.5L22.9234 13.4422L34.1421 6.35786L27.0578 17.5766L40 20.5L27.0578 23.4234L34.1421 34.6421L22.9234 27.5578L20 40.5L17.0766 27.5578L5.85786 34.6421L12.9422 23.4234L0 20.5L12.9422 17.5766L5.85786 6.35786L17.0766 13.4422L20 0.5Z"
              fill="#121212"
            />
          </svg>
        </span>
        {props.title}
      </h1>
    );
  };

  // Hero Section
  const heroStyle = {
    background: "#DDA15E",
    header:
      "bg-[#fff] text-[#121212] Proza-Libre-font-div rounded-[100px] px-10 shadow-[0px_6px_16px_0px_rgba(18,18,18,0.12)] w-full max-w-[889px]",
    heading:
      "hover:text-[#BC6C25] hover:font-bold hover:cursor-pointer relative active:scale-95",
    activeHeader: "",
    jobTitle: {
      color: "#121212",
      fontFamily: "Proza Libre, sans-serif",
      fontSize: "20px",
      fontWeight: "600",
    },
    jobDescription: {
      color: "#121212",
      fontFamily: "Proza Libre, sans-serif",
    },
  };

  // Apps Section
  const appsStyle = {
    iconType: "ColoredIcons",
    background: "bg-[#283618]",
    app: "w-[120px] h-[120px] rounded-full flex items-center justify-center bg-[#606C38] hover:border-2 hover:border-[#FEFAE0] hover:cursor-pointer",
    arrow: "w-16 h-16 absolute -bottom-8 border border-[#DDA15E] text-2xl",
  };

  const customLinkStyle = {
    linkBg: {
      // boxShadow: "4px 4px 0px 0px #000",
      // border: "1px solid #121212",
      borderRadius: "100px",
    },
    linkImg: { border: "none", borderRadius: "50px" },
    linkFont: ""
  };

  // Products Section
  const templatebg = "#FEFAE0";

  const productStyle = {
    card: "min-w-[281px] max-w-[281px] h-fit max-h-full px-2 pt-2 pb-4 rounded-[16px] bg-[#fff] Proza-Libre-font-div flex flex-col item-start gap-4",
    image: "w-[265px] h-[260px] rounded-t-[12px]",
    title: "text-base font-bold text-[#121212]",
    description: "text-sm font-medium text-[#121212] break-words",
    price: "text-[14px] font-bold text-[#121212]",
  };

  // Services Section
  const serviceStyle = {
    card: "min-w-[281px] max-w-[281px] min-h-[281px] max-h-full p-5 rounded-[20px] bg-[#283618] flex flex-col item-start gap-4",
    image: "w-[72px] h-[72px] rounded-2xl",
    title:
      "text-2xl font-medium italic text-white Cormorant-Garamond-font-div break-words",
    description:
      "text-[rgba(255,255,255,0.80)] Proza-Libre-font-div break-words",
  };

  //Appointments Section
  const appointmentsStyle = {
    background: "#BC6C25",
    para: {
      color: "#fff",
      fontFamily: "Cormorant Garamond, sans-serif",
      fontSize: "32px",
      fontWeight: "700",
    },
  };

  // Gallery Section
  const galleryStyle =
    "w-[300px] h-[300px] lg:w-[380px] lg:h-[380px] rounded-[20px]";

  // Videos Section
  const videosStyle = {
    card: {
      borderRadius: "20px",
    },
    title: {
      color: "#121212",
      fontFamily: "Proza Libre, sans-serif",
      fontWeight: "500",
    },
  };

  // Resources Section
  const resourceStyle = {
    card: "rounded-[100px] min-w-[180px] max-w-[180px] min-h-[180px] text-center bg-white flex items-center justify-center hover:cursor-pointer Proza-Libre-font-div",
    icon: "text-[#BC6C25] text-[28px]",
    title: "text-[#181818] font-medium text-base max-w-[80%] break-all",
    hover: {
      card: {
        background: "#BC6C25",
      },
      icon: {
        color: "#fff",
      },
      title: {
        color: "#fff",
      },
    },
  };

  // Business Hours Section
  const businessHoursStyle = {
    div: {
      background: "#BC6C25",
      borderRadius: "16px",
      padding: "28px",
    },
    title: {
      fontSize: "28px",
      fontFamily: "Cormorant Garamond, sans-serif",
      fontWeight: "700",
      color: "#fff",
    },
    time: {
      fontSize: "16px",
      fontFamily: "Proza Libre, sans-serif",
      fontWeight: "500",
      color: "#fff",
    },
    point: {
      minWidth: "4px",
      minHeight: "4px",
      borderRadius: "50%",
      backgroundColor: "#fff",
      marginRight: "5px",
    },
    star: {
      fill: "#DDA15E",
    },
  };

  // Reviews Section
  const reviewStyle = {
    card: "bg-white rounded-[20px] text-[#121212] min-w-[381px] max-w-[381px] min-h-full max-h-full flex flex-col gap-4 p-6",
    starColor: "#BC6C25",
    name: "text-base font-bold Cormorant-Garamond-font-div",
    review: "text-sm Proza-Libre-font-div",
  };
  const reviewStarDivbg = "#283618";

  // Contact Us Button
  const contactBtnStyle =
    "flex items-center justify-center gap-2 px-10 h-[80px] bg-white border-2 border-[#283618] shadow-[0px_6px_16px_0px_rgba(18,18,18,0.12)] rounded-[40px] text-[16px] font-bold Proza-Libre-font-div text-[#283618] z-[100] hover:cursor-pointer";
  const innerBtnStyle = {
    icon: "text-[#283618] text-xl",
    text: "text-[#121212] text-sm",
  };
  const closeBtnStyle = "text-[#283618] text-2xl px-8";

  // Modals Style
  const modalStyle = "bg-white text-[#121212] Proza-Libre-font-div";
  const appointmentInactiveBg = "bg-[#DDA15E]";
  const appointmentActiveBg = "bg-[#BC6C25]";
  const appointmentDiv =
    "min-w-[100px] max-w-[100px] flex flex-col gap-1.5 justify-center items-center rounded-lg px-3 py-2 text-xs text-white";

  // Toast Style
  const toastStyle = {
    bg: "#fff",
    border: "1px solid #DDA15E",
    color: "#121212",
    fontFamily: "Proza Libre, sans-serif",
    fontSize: "12px",
  };

  return (
    <BaseTemplate1
      //data
      data={props.data}
      disable={props.disable}
      qrGoogle={props.qrGoogle}
      //styling
      btntype="1"
      buttonStyle={buttonStyle}
      Heading={Heading}
      HeroProfile={<HeroProfile />}
      heroStyle={heroStyle}
      appsStyle={appsStyle}
      customLinkStyle={customLinkStyle}
      templatebg={templatebg}
      productStyle={productStyle}
      serviceStyle={serviceStyle}
      appointmentsStyle={appointmentsStyle}
      galleryStyle={galleryStyle}
      videosStyle={videosStyle}
      resourceStyle={resourceStyle}
      businessHoursStyle={businessHoursStyle}
      reviewStyle={reviewStyle}
      reviewStarDivbg={reviewStarDivbg}
      contactBtnStyle={contactBtnStyle}
      innerBtnStyle={innerBtnStyle}
      closeBtnStyle={closeBtnStyle}
      modalStyle={modalStyle}
      modalButtonStyle={modalButtonStyle}
      appointmentActiveBg={appointmentActiveBg}
      appointmentInactiveBg={appointmentInactiveBg}
      appointmentDiv={appointmentDiv}
      toastStyle={toastStyle}
    />
  );
};

export default Template2;
