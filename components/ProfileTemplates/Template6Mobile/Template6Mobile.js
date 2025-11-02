import React from "react";
import HeroProfile from "./HeroProfile";
import BaseTemplate1Mobile from "../ProfileComponentsMobile/BaseTemplates/BaseTemplate1Mobile";

const Template6Mobile = (props) => {
  //console.log("T6M");
  // Button Component Styling
  const buttonStyle =
    "bg-[#C6DE41] text-[#071C21] rounded-[14px] scale-[.98] outline outline-0 outline-[#071C21] hover:outline-1 Archivo-Black-font-div hover:cursor-pointer";
  const modalButtonStyle = buttonStyle.concat(" w-full h-[50px]");

  // Heading Component
  const Heading = (props) => {
    return (
      <h1
        className="text-[32px] font-bold w-fit flex items-center gap-3 relative text-[#FFFFFF] mb-7"
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
    header: "bg-[#071C21] text-[#FFFFFF] text-sm Inter-font-div px-9",
    heading:
      "hover:font-semibold hover:cursor-pointer relative active:scale-95 template6-hero-heading-hover",
    activeHeader: "",
    jobTitle: {
      color: "#C6DE41",
      fontFamily: "Inter, sans-serif",
      fontSize: "16px",
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
    app: "w-16 h-16 flex items-center justify-center bg-[#FFFFFF] hover:cursor-pointer rounded-[16px] outline outline-0 outline-[#071C21] hover:outline-1",
    iconSize:"h-[40px] w-[40px]",
    arrow: "w-8 h-8 absolute -bottom-4 text-base text-[#071C21]",
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
    card: "min-w-[238px] max-w-[238px] h-fit max-h-full pt-2 pb-4 bg-transparent text-[rgba(255,255,255,0.90)] Inter-font-div flex flex-col item-start gap-4",
    image: "w-[222px] h-[220px] rounded-t-[12px]",
    title: "text-sm break-words",
    price: "text-base font-bold",
  };

  // Services Section
  const serviceStyle = {
    card: "min-w-[212px] max-w-[212px] min-h-[240px] max-h-full p-4 mb-6 rounded-[16px] bg-[#1C2A2E] flex flex-col item-start gap-4 Inter-font-div",
    image: "w-[72px] h-[72px] rounded-[12px]",
    title: "text-xl font-medium text-[#C6DE41] break-words",
    description: "text-sm text-[rgba(255,255,255,0.90)] break-words",
  };

  //Appointments Section
  const appointmentsStyle = {
    background: "#C6DE41",
    para: {
      color: "#071C21",
      fontFamily: "Inter, sans-serif",
      fontSize: "17px",
      fontWeight: "700",
    },
  };
  const appointmentBtn =
    "!bg-[#FFFFFF] text-[#121212] outline outline-0 outline-[#071C21] hover:outline-1";

  // Gallery Section
  const galleryStyle = "w-[152px] min-h-[120px] max-h-[165px] rounded-[20px]";

  // Videos Section
  const videosStyle = {
    card: {
      borderRadius: "12px",
      background: "rgba(255, 255, 255, 0.90)",
    },
    title: {
      color: "rgba(255, 255, 255, 0.90)",
      fontFamily: "Space Grotesk, sans-serif",
      fontWeight: "500",
      fontSize: "14px",
    },
  };

  // Resources Section
  const resourceStyle = {
    card: "min-w-[104px] max-w-[104px] min-h-[104px] rounded-[20px] text-center bg-[#1C2A2E] flex items-center justify-center hover:cursor-pointer Inter-font-div",
    icon: "text-[#C6DE41] text-base",
    title:
      "text-[rgba(255,255,255,0.90)] font-medium text-xs max-w-[80%] break-all",
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
      padding: "20px",
      borderRadius: "12px",
    },
    title: {
      fontSize: "20px",
      fontFamily: "Inter, sans-serif",
      fontWeight: "700",
      color: "#071C21",
    },
    time: {
      fontSize: "12px",
      fontFamily: "Inter, sans-serif",
      fontWeight: "500",
      color: "#071C21",
    },
    point: {
      minWidth: "2px",
      minHeight: "2px",
      borderRadius: "50%",
      backgroundColor: "#071C21",
      marginRight: "5px",
    },
    star: {
      fill: "rgba(255, 255, 255, 0.60)",
    },
  };

  // Reviews Section
  const reviewStyle = {
    card: "bg-[#1C2A2E] text-[rgba(255,255,255,0.90)] min-w-[317px] max-w-[317px] min-h-full max-h-full flex flex-col gap-4 p-5 rounded-[12px] Inter-font-div",
    starColor: "#C6DE41",
    name: "text-sm font-bold",
    review: "text-xs",
  };
  const reviewStarDivbg = "#C6DE41";

  // Contact Us Button
  const contactBtnStyle =
    "flex items-center justify-center gap-2 px-6 h-[48px] bg-[#1C2A2E] text-[#C6DE41] text-sm rounded-[12px] font-bold Inter-font-div border border-[#C6DE41] hover:cursor-pointer";
  const innerBtnStyle = {
    btn: "bg-[#FFFFFF] border border-[#C6DE41] hover:cursor-pointer rounded-[16px]",
    icon: "text-[#071C21] text-lg",
    text: "text-[#071C21] text-xs",
  };
  const closeBtnStyle =
    "text-[#C6DE41] bg-[#1C2A2E] text-[24px] h-[48px] px-[18px] rounded-[16px] border border-[#C6DE41]";

  // Modals Style
  const modalStyle =
    "!bg-[#1C2A2E] !text-[rgba(255,255,255,0.90)] Inter-font-div";
  const appointmentActiveBg = "bg-[#C6DE41] text-[#071C21] font-medium";
  const appointmentInactiveBg = "bg-[#FFFFFF] text-[rgba(7,28,33,0.60)]";
  const appointmentDiv =
    "min-w-[100px] max-w-[100px] flex flex-col gap-1.5 justify-center items-center px-3 py-2 text-xs rounded-[12px]";

  // Toast Style
  const toastStyle = {
    bg: "#1C2A2E",
    border: "1px solid #C6DE41",
    color: "#FFFFFF",
    fontFamily: "Nunito Sans, sans-serif",
    fontSize: "12px",
  };

  // Bottom Section
  const bottomStyle =
    "rounded-[16px] !bg-[#1C2A2E] !text-[rgba(255,255,255,0.90)] Inter-font-div";

  return (
    <BaseTemplate1Mobile
      //data
      data={props.data}
      disable={props.disable}
      qrGoogle={props.qrGoogle}
      //styling
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
      reviewStyle={reviewStyle}
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

export default Template6Mobile;
