import React, { useEffect, useRef, useState } from "react";
import HeroProfile from "./HeroProfile";
import BaseTemplate1 from "../ProfileComponents/BaseTemplates/BaseTemplate1";

const Template3 = (props) => {
  // Button Component Styling
  const buttonStyle =
    "bg-[#736CED] hover:bg-[#9F9FED] text-[#FEF9FF] Quattrocento-Sans-font-div hover:cursor-pointer";
  const modalButtonStyle = buttonStyle.concat(" w-full h-[50px]");

  // Heading Component
  const Heading = (props) => {
    return (
      <h1
        className="text-[52px] font-bold flex items-center gap-3 relative text-[#736CED] mb-7"
        style={{ fontFamily: "Playfair Display, sans-serif" }}
      >
        {props.title}
      </h1>
    );
  };

  // Hero Section
  const heroStyle = {
    background: "#F2DFD7",
    header:
      "bg-[#FEF9FF] text-[#736CED] Quattrocento-Sans-font-div px-10 shadow-[0px_6px_16px_0px_rgba(115,108,237,0.10)] w-full max-w-[830px]",
    heading:
      "hover:cursor-pointer relative active:scale-95 template3-hero-heading-hover",
    activeHeader: "",
    jobTitle: {
      color: "#736CED",
      fontFamily: "Quattrocento Sans, sans-serif",
      fontSize: "20px",
      fontWeight: "600",
    },
    jobDescription: {
      color: "#121212",
      fontFamily: "Quattrocento Sans, sans-serif",
    },
  };

  // Apps Section
  const appsStyle = {
    iconType: "WhiteIcons",
    background: "bg-[#D4C1EC]",
    app: "w-[120px] h-[120px] flex items-center justify-center bg-[#736CED] hover:bg-[#9F9FED] hover:cursor-pointer",
    arrow:
      "w-16 h-16 absolute -bottom-8 text-2xl shadow-[0px_6px_16px_0px_rgba(115,108,237,0.10)] text-[#736CED]",
  };
  const customLinkStyle = {
    linkBg: {
      // boxShadow: " 0px 4px 12px 0px rgba(178, 186, 216, 0.16)",
      border: "1px solid #D4C1EC",
      // borderRadius: "100px",
    },
    linkImg: { 
      border: "none", 
    // borderRadius: "5px" 
  },
  linkFont: "text-[#736CED]"
  };
  // Products Section
  const templatebg = "#FEF9FF";

  const productStyle = {
    card: "min-w-[281px] max-w-[281px] h-fit max-h-full pt-2 pb-4 rounded-[16px] bg-transparent text-[#736CED] Quattrocento-Sans-font-div flex flex-col item-start gap-4",
    image: "w-[265px] h-[260px]",
    title: "text-sm font-extrabold break-words",
    price: "text-base font-extrabold",
  };

  // Services Section
  const serviceStyle = {
    card: "min-w-[281px] max-w-[281px] min-h-[281px] max-h-full p-5 rounded-[20px] bg-[#F2DFD7] text-[#736CED] flex flex-col item-start gap-4",
    image: "w-[72px] h-[72px] rounded-2xl",
    title: "text-2xl font-bold Playfair-Display-font-div break-words",
    description: "font-bold Quattrocento-Sans-font-div break-words",
  };

  //Appointments Section
  const appointmentsStyle = {
    background: "#9F9FED",
    para: {
      color: "#fff",
      fontFamily: "Playfair Display, sans-serif",
      fontSize: "32px",
      fontWeight: "700",
    },
  };
  const appointmentBtn = "hover:bg-[#fff] hover:text-[#736CED]";

  // Gallery Section
  const galleryStyle = "w-[300px] h-[300px] lg:w-[380px] lg:h-[380px]";

  // Videos Section
  const videosStyle = {
    card: {
      borderRadius: "0",
    },
    title: {
      color: "#736CED",
      fontFamily: "Quattrocento Sans, sans-serif",
      fontWeight: "500",
    },
  };

  // Resources Section
  const resourceStyle = {
    card: "border-t-2 border-[#9F9FED] min-w-[180px] max-w-[180px] min-h-[180px] text-center bg-white flex items-center justify-center hover:cursor-pointer Quattrocento-Sans-font-div",
    icon: "text-[#736CED] text-[28px]",
    title: "text-[#736CED] font-medium text-base max-w-[80%] break-all",
    hover: {
      card: {
        background: "#736CED",
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
      background: "#F2DFD7",
      padding: "28px",
    },
    title: {
      fontSize: "28px",
      fontFamily: "Playfair Display, sans-serif",
      fontWeight: "700",
      color: "#736CED",
    },
    time: {
      fontSize: "16px",
      fontFamily: "Quattrocento Sans, sans-serif",
      fontWeight: "500",
      color: "#736CED",
    },
    point: {
      minWidth: "4px",
      minHeight: "4px",
      borderRadius: "50%",
      backgroundColor: "#736CED",
      marginRight: "5px",
    },
    star: {
      fill: "#D4C1EC",
    },
  };

  // Reviews Section
  const reviewsStyle = {
    card: "bg-white border-t-2 border-[#D4C1EC] text-[#736CED] min-w-[381px] max-w-[381px] min-h-full max-h-full flex flex-col gap-4 p-6",
    starColor: "#D4C1EC",
    name: "text-base font-bold Playfair-Display-font-div",
    review: "text-sm Quattrocento-Sans-font-div",
  };
  const reviewStarDivbg = "#736CED";

  // Contact Us Button
  const contactBtnStyle =
    "flex items-center justify-center gap-2 px-10 h-[80px] bg-[#736CED] hover:bg-[#9F9FED] border-2 border-[#D4C1EC] text-[16px] font-bold Quattrocento-Sans-font-div text-[#FEF9FF]  bottom-16  z-[100] hover:cursor-pointer";
  const innerBtnStyle = {
    btn: "bg-[#FFFFFF] border-none hover:bg-[#FFFFFF] hover:border-none hover:cursor-pointer",
    icon: "bg-[#FFFFFF] text-[#736CED] text-xl",
    text: "bg-[#FFFFFF] text-[#736CED] text-sm",
  };
  const closeBtnStyle =
    "text-[#FEF9FF] bg-[#736CED] text-3xl px-8 h-[70px] border-none";

  // Modals Style
  const modalStyle =
    "bg-white text-[#736CED] !rounded-[0px] Playfair-Display-font-div";
  const appointmentActiveBg = "bg-[#F2DFD7]";
  const appointmentInactiveBg = "bg-[#F2DFD7] opacity-60";
  const appointmentDiv =
    "min-w-[100px] max-w-[100px] flex flex-col gap-1.5 justify-center items-center px-3 py-2 text-xs text-white";

  // Toast Style
  const toastStyle = {
    bg: "#FEF9FF",
    border: "1px solid #736CED",
    color: "#736CED",
    fontFamily: "Quattrocento Sans, sans-serif",
    boxShadow: "0px 6px 16px 0px rgba(115, 108, 237, 0.10)",
  };

  return (
    <BaseTemplate1
      //data
      data={props.data}
      disable={props.disable}
      qrGoogle={props.qrGoogle}
      //styling
      btntype="12"
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
      square={true}
    />
  );
};

export default Template3;
