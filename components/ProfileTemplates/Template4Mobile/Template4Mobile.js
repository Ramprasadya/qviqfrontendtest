import React from "react";
import HeroProfile from "./HeroProfile";
import BaseTemplate1Mobile from "../ProfileComponentsMobile/BaseTemplates/BaseTemplate1Mobile";

const Template4Mobile = (props) => {
  //console.log("T4M");
  // Button Component Styling
  const buttonStyle =
    "bg-[#00C2C2] hover:shadow-[0px_8px_24px_0px_rgba(0,194,194,0.24)] text-[#FEF9FF] rounded-[6px] Space-Grotesk-font-div hover:cursor-pointer";
  const modalButtonStyle = buttonStyle.concat(" w-full h-[50px]");

  // Heading Component
  const Heading = (props) => {
    return (
      <h1
        className="text-[32px] font-bold w-fit flex items-center gap-3 relative text-[#121212] mb-7"
        style={{ fontFamily: "Space Grotesk, sans-serif" }}
      >
        {props.title}
        <span className="absolute bottom-0 w-1/2 h-1 rounded-md bg-[#00C2C2] drop-shadow-[0px_2px_8px_rgba(0,210,198,0.60)]" />
      </h1>
    );
  };

  // Hero Section
  const heroStyle = {
    background: "#FFFFFF",
    header:
      "bg-[#FFFFFF] text-[#121212] text-sm Space-Grotesk-font-div px-9 shadow-[0px_6px_16px_0px_rgba(178,186,216,0.20)] rounded-[20px]",
    heading:
      "hover:font-bold hover:cursor-pointer relative active:scale-95 template4-hero-heading-hover",
    activeHeader: "",
    jobTitle: {
      color: "#00C2C2",
      fontFamily: "Space Grotesk, sans-serif",
      fontSize: "16px",
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
    app: "w-[74px] h-[74px] flex items-center justify-center bg-[#FFFFFF] hover:border hover:border-[#00C2C2] hover:cursor-pointer rounded-[12px]",
    iconSize:"h-[36.36px] w-[36.36px]",
    arrow:
      "w-8 h-8 absolute -bottom-4 text-base shadow-[0px_6px_16px_0px_rgba(178,186,216,0.20)] text-[#00C2C2]",
    div:"!gap-[8px]"
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
    card: "min-w-[238px] max-w-[238px] h-fit max-h-full pt-2 pb-4 bg-transparent text-[#121212] Space-Grotesk-font-div flex flex-col item-start gap-4",
    image: "w-[222px] h-[220px] rounded-[8px]",
    title: "text-sm font-extrabold break-words",
    price: "text-base font-extrabold",
  };

  // Services Section
  const serviceStyle = {
    card: "min-w-[212px] max-w-[212px] min-h-[240px] max-h-full p-4 mb-6 shadow-[0px_6px_24px_0px_rgba(178,186,216,0.20)] rounded-[16px] bg-[#FFFFFF] text-[#121212] flex flex-col item-start gap-4 Space-Grotesk-font-div",
    image: "w-[72px] h-[72px] rounded-2xl",
    title: "text-xl font-medium text-[#00C2C2] break-words",
    description: "text-sm font-bold break-words",
  };

  //Appointments Section
  const appointmentsStyle = {
    background: "#00C2C2",
    para: {
      color: "#fff",
      fontFamily: "Space Grotesk, sans-serif",
      fontSize: "18px",
      fontWeight: "700",
    },
  };
  const appointmentBtn =
    "bg-[#FFFFFF] text-[rgb(18,18,18)] hover:bg-[#00C2C2] hover:text-[#FFFFFF] hover:outline outline-[#FFFFFF]";

  // Gallery Section
  const galleryStyle = "w-[152px] min-h-[120px] max-h-[165px] rounded-[12px]";

  // Videos Section
  const videosStyle = {
    card: {
      borderRadius: "12px",
      background: "#F5FFFF",
    },
    title: {
      color: "#121212",
      fontFamily: "Space Grotesk, sans-serif",
      fontWeight: "500",
      fontSize: "14px",
    },
  };

  // Resources Section
  const resourceStyle = {
    card: "border-2 border-[#00C2C2] min-w-[104px] max-w-[104px] min-h-[104px] rounded-[20px] text-center bg-white flex items-center justify-center hover:cursor-pointer Space-Grotesk-font-div",
    icon: "text-[#00C2C2] text-base",
    title: "text-[#00C2C2] font-medium text-xs max-w-[80%] break-all",
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
      padding: "20px",
      borderRadius: "12px",
    },
    title: {
      fontSize: "20px",
      fontFamily: "Space Grotesk, sans-serif",
      fontWeight: "700",
      color: "#FFFFFF",
    },
    time: {
      fontSize: "12px",
      fontFamily: "Space Grotesk, sans-serif",
      fontWeight: "500",
      color: "#FFFFFF",
    },
    point: {
      minWidth: "2px",
      minHeight: "2px",
      borderRadius: "50%",
      backgroundColor: "#FFFFFF",
      marginRight: "5px",
    },
    star: {
      fill: "#ffffff99",
    },
  };

  // Reviews Section
  const reviewStyle = {
    card: "bg-white text-[#121212] min-w-[317px] max-w-[317px] min-h-full max-h-full flex flex-col gap-4 p-5 mb-4 shadow-[0px_8px_24px_0px_rgba(178,186,216,0.20)] rounded-[12px] Space-Grotesk-font-div",
    starColor: "#00C2C2",
    name: "text-sm font-bold",
    review: "text-xs",
  };
  const reviewStarDivbg = "#00C2C2";

  // Contact Us Button
  const contactBtnStyle =
    "flex items-center justify-center gap-2 px-6 h-[48px] hover:shadow-[0px_8px_24px_0px_rgba(0,194,194,0.24)] bg-[#FFFFFF] text-[#00C2C2] text-sm border border-[#00C2C2] rounded-[6px] font-bold Space-Grotesk-font-div hover:cursor-pointer";
  const innerBtnStyle = {
    btn: "bg-[#FFFFFF] border-none hover:border-none hover:cursor-pointer rounded-[6px]",
    icon: "text-[#00C2C2] text-lg",
    text: "text-[#121212] text-xs",
  };
  const closeBtnStyle =
    "text-[#00C2C2] bg-[#FFFFFF] text-2xl h-[48px] border border-[#00C2C2]";

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
    fontSize: "12px",
  };

  // Bottom Section
  const bottomStyle = "border border-[#00C2C2] rounded-[16px]";

  return (
    <BaseTemplate1Mobile
      //data
      data={props.data}
      disable={props.disable}
      qrGoogle={props.qrGoogle}
      //styling
      btntype="13"
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

export default Template4Mobile;
