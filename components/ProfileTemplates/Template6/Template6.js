import React, { useEffect, useRef, useState } from "react";
import HeroProfile from "./HeroProfile";
import BaseTemplate1 from "../ProfileComponents/BaseTemplates/BaseTemplate1";

const Template6 = (props) => {
  // Button Component Styling
  
  const buttonStyle =
    "bg-[#C6DE41] text-[#071C21] rounded-[16px] scale-[.98] outline outline-0 outline-[#071C21] hover:outline-1 Archivo-Black-font-div hover:cursor-pointer";
  const modalButtonStyle = buttonStyle.concat(" w-full h-[50px]");

  // Heading Component
  const Heading = (props) => {
    return (
      <h1
        className="text-[52px] font-bold w-fit flex items-center gap-3 relative text-[#FFFFFF] mb-7"
        style={{ fontFamily: "Archivo Black, sans-serif" }}
      >
        {props.title}
        <span className="absolute bottom-0 w-1/2 h-1 rounded-md bg-[#C6DE41] drop-shadow-[0px_2px_8px_rgba(198,222,65,0.60)]" />
      </h1>
    );
  };

  // Hero Section
  const heroStyle = {
    background: "#071C21",
    header: "bg-[#071C21] text-[#FFFFFF] w-full max-w-[890px]",
    heading:
      "hover:font-semibold hover:cursor-pointer relative active:scale-95 template6-hero-heading-hover",
    activeHeader: "",
    jobTitle: {
      color: "#C6DE41",
      fontFamily: "Inter, sans-serif",
      fontSize: "20px",
      fontWeight: "600",
    },
    jobDescription: {
      color: "#FFFFFF",
      fontFamily: "Inter, sans-serif",
    },
  };

  // Apps Section
  const appsStyle = {
    iconType: "BlackIcons",
    background: "bg-[#C6DE41]",
    app: "w-[120px] h-[120px] flex items-center justify-center bg-[#FFFFFF] hover:cursor-pointer rounded-[20px] outline outline-0 outline-[#071C21] hover:outline-1",
    arrow: "w-16 h-16 absolute -bottom-8 text-2xl text-[#071C21]",
  };
  const customLinkStyle = {
    linkBg: {
      // boxShadow: "4px 4px 0px 0px #000",
      // border: "1px solid #121212",
      borderRadius: "8px",
    },
    linkImg: { border: "none", borderRadius: "4px" },
    linkFont: ""
  };
  // Products Section
  const templatebg = "#071C21";

  const productStyle = {
    card: "min-w-[281px] max-w-[281px] h-fit max-h-full pt-2 pb-4 bg-transparent text-[rgba(255,255,255,0.90)] Inter-font-div flex flex-col item-start gap-4",
    image: "w-[265px] h-[260px] rounded-t-[16px]",
    title: "text-sm break-words",
    price: "text-base font-bold",
  };

  // Services Section
  const serviceStyle = {
    card: "min-w-[281px] max-w-[281px] min-h-[281px] max-h-full p-5 mb-6 rounded-[20px] bg-[#1C2A2E] flex flex-col item-start gap-4 Inter-font-div",
    image: "w-[72px] h-[72px] rounded-[16px]",
    title: "text-2xl font-bold text-[#C6DE41] break-words",
    description: "text-[rgba(255,255,255,0.90)] break-words",
  };

  //Appointments Section
  const appointmentsStyle = {
    background: "#C6DE41",
    para: {
      color: "#071C21",
      fontFamily: "Inter, sans-serif",
      fontSize: "32px",
      fontWeight: "700",
    },
  };
  const appointmentBtn =
    "!bg-[#FFFFFF] text-[#121212] outline outline-0 outline-[#071C21] hover:outline-1";

  // Gallery Section
  const galleryStyle =
    "w-[300px] h-[300px] lg:w-[380px] lg:h-[380px] rounded-[24px]";

  // Videos Section
  const videosStyle = {
    card: {
      borderRadius: "16px",
      background: "rgba(255, 255, 255, 0.90)",
    },
    title: {
      color: "rgba(255, 255, 255, 0.90)",
      fontFamily: "Space Grotesk, sans-serif",
      fontWeight: "500",
    },
  };

  // Resources Section
  const resourceStyle = {
    card: "min-w-[180px] max-w-[180px] min-h-[180px] rounded-[16px] text-center bg-[#1C2A2E] flex items-center justify-center hover:cursor-pointer Inter-font-div",
    icon: "text-[#C6DE41] text-[28px]",
    title:
      "text-[rgba(255,255,255,0.90)] font-medium text-base max-w-[80%] break-all",
    hover: {
      card: {
        border: "1px solid #C6DE41",
      },
      icon: {
        color: "#C6DE41",
      },
      title: {
        color: "rgba(255, 255, 255, 0.90)",
      },
    },
  };

  // Business Hours Section
  const businessHoursStyle = {
    div: {
      background: "#C6DE41",
      padding: "28px",
      borderRadius: "16px",
    },
    title: {
      fontSize: "28px",
      fontFamily: "Inter, sans-serif",
      fontWeight: "700",
      color: "#071C21",
    },
    time: {
      fontSize: "16px",
      fontFamily: "Inter, sans-serif",
      fontWeight: "500",
      color: "#071C21",
    },
    point: {
      minWidth: "4px",
      minHeight: "4px",
      borderRadius: "50%",
      backgroundColor: "#071C21",
      marginRight: "5px",
    },
    star: {
      fill: "rgba(255, 255, 255, 0.60)",
    },
  };

  // Reviews Section
  const reviewsStyle = {
    card: "bg-[#1C2A2E] text-[rgba(255,255,255,0.90)] min-w-[381px] max-w-[381px] min-h-full max-h-full flex flex-col gap-4 p-6 rounded-[16px] Inter-font-div",
    starColor: "#C6DE41",
    name: "text-base font-bold",
    review: "text-sm",
  };
  const reviewStarDivbg = "#C6DE41";

  // Contact Us Button
  const contactBtnStyle =
    "flex items-center justify-center gap-2 px-10 h-[80px] bg-[#1C2A2E] text-[#C6DE41] text-[16px] rounded-[16px] font-bold Inter-font-div border border-[#C6DE41] hover:cursor-pointer";
  const innerBtnStyle = {
    btn: "bg-[#FFFFFF] border border-[#C6DE41] hover:cursor-pointer rounded-[20px]",
    icon: "text-[#071C21] text-xl",
    text: "text-[#071C21] text-sm",
  };
  const closeBtnStyle =
    "text-[#C6DE41] bg-[#1C2A2E] text-[24px] px-[30px] h-[70px] rounded-[16px] border border-[#C6DE41]";

  // Modals Style
  const modalStyle =
    "!bg-[#1C2A2E] !text-[rgba(255,255,255,0.90)] Inter-font-div";
  const appointmentActiveBg = "bg-[#C4FB6D] text-[#071C21] font-medium";
  const appointmentInactiveBg = "bg-[#FFFFFF] text-[rgba(7,28,33,0.60)]";
  const appointmentDiv =
    "min-w-[100px] max-w-[100px] flex flex-col gap-1.5 justify-center items-center px-3 py-2 text-xs rounded-[16px]";

  // Toast Style
  const toastStyle = {
    bg: "#1C2A2E",
    border: "1px solid #C6DE41",
    color: "#FFFFFF",
    fontFamily: "Nunito Sans, sans-serif",
  };

  // Bottom Section
  const bottomStyle =
    "rounded-[20px] !bg-[#1C2A2E] !text-[rgba(255,255,255,0.90)] Inter-font-div";

  return (
    <BaseTemplate1
      //data
      data={props.data}
      disable={props.disable}
      qrGoogle={props.qrGoogle}
      //styling
      // btntype={props.type}
      btntype="15"
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
      reviewStyle={reviewsStyle}
      reviewStarDivbg={reviewStarDivbg}
      contactBtnStyle={contactBtnStyle}
      innerBtnStyle={innerBtnStyle}
      closeBtnStyle={closeBtnStyle}
      modalStyle={modalStyle}
      modalButtonStyle={modalButtonStyle}
      appointmentBtn={appointmentBtn}
      appointmentActiveBg={appointmentActiveBg}
      appointmentInactiveBg={appointmentInactiveBg}
      appointmentDiv={appointmentDiv}
      toastStyle={toastStyle}
      bottomStyle={bottomStyle}
    />
  );
};

export default Template6;
