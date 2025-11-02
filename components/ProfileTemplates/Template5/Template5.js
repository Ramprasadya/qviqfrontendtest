import React, { useEffect, useRef, useState } from "react";
import HeroProfile from "./HeroProfile";
import BaseTemplate1 from "../ProfileComponents/BaseTemplates/BaseTemplate1";

const Template5 = (props) => {
  // Button Component Styling
  const buttonStyle =
    "bg-[#C4FB6D] shadow-[4px_4px_0px_0px_#393E46] hover:shadow-none text-[#393E46] rounded-[100px] Nunito-Sans-font-div hover:cursor-pointer";
  const modalButtonStyle = buttonStyle.concat(" w-full h-[50px]");

  // Heading Component
  const Heading = (props) => {
    return (
      <h1
        className="text-[52px] font-bold w-fit flex items-center gap-3 relative text-[#393E46] mb-7"
        style={{ fontFamily: "Nunito Sans, sans-serif" }}
      >
        {props.title.toUpperCase()}
      </h1>
    );
  };

  // Hero Section
  const heroStyle = {
    background: "#EEEEEE",
    header:
      "bg-[#C4FB6D] text-[#393E46] Nunito-Sans-font-div px-10 shadow-[4px_4px_0px_0px_#393E46] rounded-[100px] w-full max-w-[890px]",
    heading: "hover:font-bold hover:cursor-pointer relative active:scale-95",
    activeHeader: "",
    jobTitle: {
      color: "#393E46",
      fontFamily: "Nunito Sans, sans-serif",
      fontSize: "20px",
      fontWeight: "600",
    },
    jobDescription: {
      color: "#393E46",
      fontFamily: "Nunito Sans, sans-serif",
    },
  };

  // Apps Section
  const appsStyle = {
    iconType: "BlackIcons",
    background: "bg-[#C4FB6D]",
    app: "w-[120px] h-[120px] flex items-center justify-center bg-[#FFFFFF] shadow-[3px_3px_0px_0px_#393E46] hover:shadow-none hover:cursor-pointer rounded-full",
    arrow: "w-16 h-16 absolute -bottom-8 text-2xl text-[#393E46]",
  };
  const customLinkStyle = {
    linkBg: {
      boxShadow: "4px 4px 0px 0px #393E46",
      // border: "1px solid rgba(18, 18, 18, 0.04)",
      borderRadius: "100px",
    },
    linkImg: { border: "none", borderRadius: "100px" },
    linkFont: ""
  };
  // Products Section
  const templatebg = "#EEEEEE";

  const productStyle = {
    card: "min-w-[281px] max-w-[281px] h-fit max-h-full pt-2 pb-4 bg-transparent text-[#393E46] Nunito-Sans-font-div flex flex-col item-start gap-4",
    image:
      "w-[265px] h-[260px] rounded-[12px] shadow-[3px_3px_0px_0px_#393E46]",
    title: "text-sm font-extrabold break-words",
    price: "text-base font-extrabold",
  };

  // Services Section
  const serviceStyle = {
    card: "min-w-[281px] max-w-[281px] min-h-[281px] max-h-full p-5 mb-6 shadow-[4px_4px_0px_0px_#C4FB6D] rounded-[20px] bg-[#FFFFFF] text-[#393E46] flex flex-col item-start gap-4 Nunito-Sans-font-div",
    image: "w-[72px] h-[72px] rounded-full",
    title: "text-2xl font-bold text-[#393E46] break-words",
    description: "font-bold break-words",
  };

  //Appointments Section
  const appointmentsStyle = {
    background: "#C4FB6D",
    para: {
      color: "#393E46",
      fontFamily: "Nunito Sans, sans-serif",
      fontSize: "32px",
      fontWeight: "700",
    },
  };
  const appointmentBtn = "bg-[#FFFFFF]";

  // Gallery Section
  const galleryStyle =
    "w-[300px] h-[300px] lg:w-[380px] lg:h-[380px] rounded-[24px]";

  // Videos Section
  const videosStyle = {
    card: {
      borderRadius: "16px",
      background: "#FFFFFF",
    },
    title: {
      color: "#393E46",
      fontFamily: "Nunito Sans, sans-serif",
      fontWeight: "500",
    },
  };

  // Resources Section
  const resourceStyle = {
    card: "min-w-[180px] max-w-[180px] min-h-[180px] rounded-full mb-2 text-center bg-white flex items-center justify-center shadow-[4px_4px_0px_0px_#C4FB6D] hover:cursor-pointer Nunito-Sans-font-div",
    icon: "text-[#C4FB6D] text-[28px]",
    title: "text-[#393E46] font-medium text-base max-w-[80%] break-all",
    hover: {
      card: {
        background: "#C4FB6D",
      },
      icon: {
        color: "#393E46",
      },
      title: {
        color: "#393E46",
      },
    },
  };

  // Business Hours Section
  const businessHoursStyle = {
    div: {
      background: "#C4FB6D",
      padding: "28px",
      borderRadius: "16px",
    },
    title: {
      fontSize: "28px",
      fontFamily: "Nunito Sans, sans-serif",
      fontWeight: "700",
      color: "#393E46",
    },
    time: {
      fontSize: "16px",
      fontFamily: "Nunito Sans, sans-serif",
      fontWeight: "500",
      color: "#393E46",
    },
    point: {
      minWidth: "4px",
      minHeight: "4px",
      borderRadius: "50%",
      backgroundColor: "#393E46",
      marginRight: "5px",
    },
    star: {
      fill: "#FFFFFF",
    },
  };

  // Reviews Section
  const reviewsStyle = {
    card: "bg-white text-[#393E46] min-w-[381px] max-w-[381px] min-h-full max-h-full mb-2 flex flex-col gap-4 p-6 shadow-[4px_4px_0px_0px_#C4FB6D] rounded-[16px] Nunito-Sans-font-div",
    starColor: "#393E46",
    name: "text-base font-bold",
    review: "text-sm",
  };
  const reviewStarDivbg = "#393E46";

  // Contact Us Button
  const contactBtnStyle =
    "flex items-center justify-center gap-2 px-10 h-[80px] bg-[#FFFFFF] text-[#393E46] text-[16px] rounded-[40px] shadow-[4px_4px_0px_0px_#393E46] hover:shadow-none font-bold Nunito-Sans-font-div hover:cursor-pointer";
  const innerBtnStyle = {
    btn: "bg-[#FFFFFF] border-none hover:border-none hover:cursor-pointer shadow-[4px_4px_0px_0px_#C4FB6D] hover:shadow-none rounded-[40px]",
    icon: "text-[#393E46] text-xl",
    text: "text-[#393E46] text-sm",
  };
  const closeBtnStyle =
    "text-[#393E46] bg-[#FFFFFF] text-[24px] px-[30px] h-[70px] shadow-[4px_4px_0px_0px_#393E46] rounded-full";

  // Modals Style
  const modalStyle = "bg-white text-[#393E46] Nunito-Sans-font-div";
  const appointmentActiveBg = "bg-[#C4FB6D] border border-[#C4FB6D] font-bold";
  const appointmentInactiveBg = "bg-[#FFFFFF] border border-[#C4FB6D]";
  const appointmentDiv =
    "min-w-[100px] max-w-[100px] flex flex-col gap-1.5 justify-center items-center px-3 py-2 text-xs text-[#393E46] rounded-[6px]";

  // Toast Style
  const toastStyle = {
    bg: "#FFFFFF",
    border: "1px solid #121212",
    color: "#121212",
    fontFamily: "Nunito Sans, sans-serif",
    boxShadow: "4px 4px 0px 0px #393E46",
  };

  // Bottom Section
  const bottomStyle = "rounded-[20px] shadow-[4px_4px_0px_0px_#393E46]";

  return (
    <BaseTemplate1
      //data
      data={props.data}
      disable={props.disable}
      qrGoogle={props.qrGoogle}
      //styling
      btntype="14"
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

export default Template5;
