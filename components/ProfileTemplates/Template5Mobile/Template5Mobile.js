import React from "react";
import HeroProfile from "./HeroProfile";
import BaseTemplate1Mobile from "../ProfileComponentsMobile/BaseTemplates/BaseTemplate1Mobile";

const Template5Mobile = (props) => {
  //console.log("T5M");
  // Button Component Styling
  const buttonStyle =
    "bg-[#C4FB6D] shadow-[4px_4px_0px_0px_#393E46] hover:shadow-none text-[#393E46] rounded-[40px] Nunito-Sans-font-div hover:cursor-pointer";
  const modalButtonStyle = buttonStyle.concat(" w-full h-[50px]");

  // Heading Component
  const Heading = (props) => {
    return (
      <h1
        className="text-[32px] font-bold w-fit flex items-center gap-3 relative text-[#393E46] mb-7"
        style={{ fontFamily: "Nunito Sans, sans-serif" }}
      >
        {props.title.toUpperCase()}
      </h1>
    );
  };

  // Hero Section
  const heroStyle = {
    background: "#EEEEEE",
    profile:"!h-[276px] !w-[276px]",
    header:
      "bg-[#C4FB6D] text-[#393E46] text-sm Nunito-Sans-font-div px-9 shadow-[4px_4px_0px_0px_#393E46] rounded-[100px]",
    heading: "hover:font-bold hover:cursor-pointer relative active:scale-95",
    activeHeader: "",
    jobTitle: {
      color: "#393E46",
      fontFamily: "Nunito Sans, sans-serif",
      fontSize: "16px",
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
    app: "w-16 h-16 flex items-center justify-center bg-[#FFFFFF] shadow-[3px_3px_0px_0px_#393E46] hover:shadow-none hover:cursor-pointer rounded-[100px]",
    iconSize:"h-[35px] w-[35px]",
    arrow: "w-8 h-8 absolute -bottom-4 text-base text-[#393E46]",
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
    card: "min-w-[238px] max-w-[238px] h-fit max-h-full pt-2 pb-4 bg-transparent text-[#393E46] Nunito-Sans-font-div flex flex-col item-start gap-4",
    image: "w-[222px] h-[220px] rounded-[8px] shadow-[3px_3px_0px_0px_#393E46]",
    title: "text-sm font-extrabold break-words",
    price: "text-base font-extrabold",
  };

  // Services Section
  const serviceStyle = {
    card: "min-w-[212px] max-w-[212px] min-h-[240px] max-h-full p-4 mb-6 shadow-[4px_4px_0px_0px_#C4FB6D] rounded-[16px] bg-[#FFFFFF] text-[#393E46] flex flex-col item-start gap-4 Nunito-Sans-font-div",
    image: "w-[72px] h-[72px] rounded-[100px]",
    title: "text-xl font-medium text-[#393E46] break-words",
    description: "text-sm font-bold break-words",
  };

  //Appointments Section
  const appointmentsStyle = {
    background: "#C4FB6D",
    para: {
      color: "#393E46",
      fontFamily: "Nunito Sans, sans-serif",
      fontSize: "18px",
      fontWeight: "700",
    },
  };
  const appointmentBtn = "bg-[#FFFFFF]";

  // Gallery Section
  const galleryStyle = "w-[152px] min-h-[120px] max-h-[165px] rounded-[20px]";

  // Videos Section
  const videosStyle = {
    card: {
      borderRadius: "12px",
      background: "#FFFFFF",
    },
    title: {
      color: "#393E46",
      fontFamily: "Nunito Sans, sans-serif",
      fontWeight: "500",
      fontSize: "14px",
    },
  };

  // Resources Section
  const resourceStyle = {
    card: "min-w-[104px] max-w-[104px] min-h-[104px] rounded-[120px] mb-2 text-center bg-white flex items-center justify-center shadow-[4px_4px_0px_0px_#C4FB6D] hover:cursor-pointer Nunito-Sans-font-div",
    icon: "text-[#C4FB6D] text-base",
    title: "text-[#393E46] font-medium text-xs max-w-[80%] break-all",
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
      padding: "20px",
      borderRadius: "12px",
    },
    title: {
      fontSize: "20px",
      fontFamily: "Nunito Sans, sans-serif",
      fontWeight: "700",
      color: "#393E46",
    },
    time: {
      fontSize: "12px",
      fontFamily: "Nunito Sans, sans-serif",
      fontWeight: "500",
      color: "#393E46",
    },
    point: {
      minWidth: "2px",
      minHeight: "2px",
      borderRadius: "50%",
      backgroundColor: "#393E46",
      marginRight: "5px",
    },
    star: {
      fill: "#FFFFFF",
    },
  };

  // Reviews Section
  const reviewStyle = {
    card: "bg-white text-[#393E46] min-w-[317px] max-w-[317px] min-h-full max-h-full mb-2 flex flex-col gap-4 p-5 shadow-[4px_4px_0px_0px_#C4FB6D] rounded-[12px] Nunito-Sans-font-div",
    starColor: "#393E46",
    name: "text-sm font-bold",
    review: "text-xs",
  };
  const reviewStarDivbg = "#393E46";

  // Contact Us Button
  const contactBtnStyle =
    "flex items-center justify-center gap-2 px-6 h-[48px] bg-[#FFFFFF] text-[#393E46] text-sm rounded-[40px] shadow-[4px_4px_0px_0px_#393E46] hover:shadow-none font-bold Nunito-Sans-font-div hover:cursor-pointer";
  const innerBtnStyle = {
    btn: "bg-[#FFFFFF] border-none hover:border-none hover:cursor-pointer shadow-[4px_4px_0px_0px_#C4FB6D] hover:shadow-none rounded-[40px]",
    icon: "text-[#393E46] text-lg",
    text: "text-[#393E46] text-xs",
  };
  const closeBtnStyle =
    "text-[#393E46] bg-[#FFFFFF] text-[24px] h-[48px] shadow-[4px_4px_0px_0px_#393E46] px-[18px] rounded-[40px]";

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
    fontSize: "12px",
  };

  // Bottom Section
  const bottomStyle = "rounded-[16px] shadow-[4px_4px_0px_0px_#393E46]";

  return (
    <BaseTemplate1Mobile
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

export default Template5Mobile;
