import React, { useEffect, useRef, useState } from "react";
import HeroProfile from "./HeroProfile";
import BaseTemplate1 from "../ProfileComponents/BaseTemplates/BaseTemplate1";

const Template4 = (props) => {
  // Button Component Styling
  const buttonStyle =
    "bg-[#00C2C2] hover:shadow-[0px_8px_24px_0px_rgba(0,194,194,0.24)] text-[#FEF9FF] rounded-[6px] Space-Grotesk-font-div hover:cursor-pointer";
  const modalButtonStyle = buttonStyle.concat(" w-full h-[50px]");

  // Heading Component
  const Heading = (props) => {
    return (
      <h1
        className="text-[52px] font-bold w-fit flex items-center gap-3 relative text-[#121212] mb-7"
        style={{ fontFamily: "Space Grotesk, sans-serif" }}
      >
        {props.title}
        <span className="absolute bottom-0 w-1/2 h-1.5 rounded-md bg-[#00C2C2] drop-shadow-[0px_2px_8px_rgba(0,210,198,0.60)]" />
      </h1>
    );
  };

  // Hero Section
  const heroStyle = {
    background: "#FFFFFF",
    header:
      "bg-[#FFFFFF] text-[#121212] Space-Grotesk-font-div px-10 shadow-[0px_8px_24px_0px_rgba(178,186,216,0.20)] rounded-[100px] w-full max-w-[890px]",
    heading:
      "hover:font-bold hover:cursor-pointer relative active:scale-95 template4-hero-heading-hover",
    activeHeader: "",
    jobTitle: {
      color: "#00C2C2",
      fontFamily: "Space Grotesk, sans-serif",
      fontSize: "20px",
      fontWeight: "600",
    },
    jobDescription: {
      color: "#121212",
      fontFamily: "Space Grotesk, sans-serif",
    },
  };

  // Apps Section
  const appsStyle = {
    iconType: "ColoredIcons",
    background: "bg-[#E5E5E5]",
    app: "w-[120px] h-[120px] flex items-center justify-center bg-[#FFFFFF] rounded-[16px] hover:border hover:border-[#00C2C2] hover:cursor-pointer",
    arrow:
      "w-16 h-16 absolute -bottom-8 text-2xl shadow-[0px_8px_24px_0px_rgba(178,186,216,0.20)] text-[#00C2C2]",
  };
  const customLinkStyle = {
    linkBg: {
      boxShadow: " 0px 4px 12px 0px rgba(178, 186, 216, 0.16)",
      border: "2px solid rgba(18, 18, 18, 0.04)",
      borderRadius: "8px",
    },
    linkImg: { border: "none", borderRadius: "4px" },
    linkFont: ""
  };
  // Products Section
  const templatebg = "#FFFFFF";

  const productStyle = {
    card: "min-w-[281px] max-w-[281px] h-fit max-h-full pt-2 pb-4 bg-transparent text-[#121212] Space-Grotesk-font-div flex flex-col item-start gap-4",
    image: "w-[265px] h-[260px] rounded-[12px]",
    title: "text-sm font-extrabold break-words",
    price: "text-base font-extrabold",
  };

  // Services Section
  const serviceStyle = {
    card: "min-w-[281px] max-w-[281px] min-h-[281px] max-h-full p-5 mb-6 shadow-[0px_6px_24px_0px_rgba(178,186,216,0.20)] rounded-[20px] bg-[#FFFFFF] text-[#121212] flex flex-col item-start gap-4 Space-Grotesk-font-div",
    image: "w-[72px] h-[72px] rounded-2xl",
    title: "text-2xl font-bold text-[#00C2C2] break-words",
    description: "font-bold break-words",
  };

  //Appointments Section
  const appointmentsStyle = {
    background: "#00C2C2",
    para: {
      color: "#fff",
      fontFamily: "Space Grotesk, sans-serif",
      fontSize: "32px",
      fontWeight: "700",
    },
  };
  const appointmentBtn =
    "bg-[#FFFFFF] text-[rgb(18,18,18)] hover:bg-[#00C2C2] hover:text-[#FFFFFF] hover:outline outline-[#FFFFFF]";

  // Gallery Section
  const galleryStyle =
    "w-[300px] h-[300px] lg:w-[380px] lg:h-[380px] rounded-[16px]";

  // Videos Section
  const videosStyle = {
    card: {
      borderRadius: "16px",
      background: "#F5FFFF",
    },
    title: {
      color: "#121212",
      fontFamily: "Space Grotesk, sans-serif",
      fontWeight: "500",
    },
  };

  // Resources Section
  const resourceStyle = {
    card: "border-2 border-[#00C2C2] min-w-[180px] max-w-[180px] min-h-[180px] rounded-[20px] text-center bg-white flex items-center justify-center hover:cursor-pointer Space-Grotesk-font-div",
    icon: "text-[#00C2C2] text-[28px]",
    title: "text-[#00C2C2] font-medium text-base max-w-[80%] break-all",
    hover: {
      card: {
        background: "#00C2C2",
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
      background: "#00C2C2",
      padding: "28px",
      borderRadius: "16px",
    },
    title: {
      fontSize: "28px",
      fontFamily: "Space Grotesk, sans-serif",
      fontWeight: "700",
      color: "#FFFFFF",
    },
    time: {
      fontSize: "16px",
      fontFamily: "Space Grotesk, sans-serif",
      fontWeight: "500",
      color: "#FFFFFF",
    },
    point: {
      minWidth: "4px",
      minHeight: "4px",
      borderRadius: "50%",
      backgroundColor: "#FFFFFF",
      marginRight: "5px",
    },
    star: {
      fill: "#ffffff99",
    },
  };

  // Reviews Section
  const reviewsStyle = {
    card: "bg-white text-[#121212] min-w-[381px] max-w-[381px] min-h-full max-h-full mb-4 flex flex-col gap-4 p-6 shadow-[0px_8px_24px_0px_rgba(178,186,216,0.20)] rounded-[16px] Space-Grotesk-font-div",
    starColor: "#00C2C2",
    name: "text-base font-bold",
    review: "text-sm",
  };
  const reviewStarDivbg = "#00C2C2";

  // Contact Us Button
  const contactBtnStyle =
    "flex items-center justify-center gap-2 px-10 h-[80px] bg-[#FFFFFF] text-[#00C2C2] text-[16px] border border-[#00C2C2] hover:shadow-[0px_8px_24px_0px_rgba(0,194,194,0.24)] rounded-[6px] font-bold Space-Grotesk-font-div hover:cursor-pointer";
  const innerBtnStyle = {
    btn: "bg-[#FFFFFF] border-none hover:border-none hover:cursor-pointer rounded-[6px]",
    icon: "text-[#00C2C2] text-xl",
    text: "text-[#121212] text-sm",
  };
  const closeBtnStyle =
    "text-[#00C2C2] bg-[#FFFFFF] text-[24px] px-8 h-[70px] border border-[#00C2C2]";

  // Modals Style
  const modalStyle = "bg-white text-[#00C2C2] Space-Grotesk-font-div";
  const appointmentActiveBg = "bg-[#00C2C2]";
  const appointmentInactiveBg = "bg-[#00C2C2] opacity-60";
  const appointmentDiv =
    "min-w-[100px] max-w-[100px] flex flex-col gap-1.5 justify-center items-center px-3 py-2 text-xs text-white rounded-[6px]";

  // Toast Style
  const toastStyle = {
    bg: "#FEF9FF",
    border: "1px solid #00C2C2",
    color: "#121212",
    fontFamily: "Space Grotesk, sans-serif",
    boxShadow: "0px 6px 16px 0px rgba(115, 108, 237, 0.10)",
  };

  // Bottom Section
  const bottomStyle = "border-2 border-[#00C2C2] rounded-[20px]";

  return (
    <BaseTemplate1
      //data
      data={props.data}
      disable={props.disable}
      qrGoogle={props.qrGoogle}
      btntype="13"
      //styling
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

export default Template4;
