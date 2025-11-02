import React from "react";
import BaseTemplate4 from "../ProfileComponents/BaseTemplates/BaseTemplate4";
import BaseTemplate5 from "../ProfileComponents/BaseTemplates/BaseTemplate5";

const Template30 = (props) => {
  // Button Component Styling
  const buttonStyle =
    "bg-[linear-gradient(87.72deg,_#033CCE_-1.09%,_#769BFC_101.95%)] text-[#FFF] rounded-full DM-Sans-font-div hover:cursor-pointer h-[56px] w-[262px]";
  const modalButtonStyle = buttonStyle.concat(" h-[50px]");

  // Template Background
  const templatebg = `${props.mainbg !== undefined ? props.mainbg.color : ""}`;

  // Hero Section
  const heroStyle = {
    div: `${props.mainfg}`,
    profilePic: "rounded-full",
    fullName: "text-[28px] font-[800] text-[#033CCE]",
    jobTitle: "text-xl text-[#121212Cc]",
    jobDescription: "text-xl text-[#121212]",
  };

  // Apps Section
  const appsStyle = {
    iconType: `${
      (props.mainbg !== undefined ? props.mainbg.secondaryColor : "") ===
      "#FFFFFF"
        ? "WhiteIcons"
        : "BlackIcons"
    }`,
    background: "bg-transparent",
    app: `w-[132px] h-[132px] rounded-[30px] flex items-center justify-center backdrop-blur-[0px]`,
    arrow:
      "w-16 h-16 absolute -bottom-20 text-2xl !bg-white !text-[#2a5cde] shadow-md",
  };

  // Heading Section
  const headerStyle = {
    div: "rounded-[100px] bg-[#FFFFFF] text-[#121212] DM-Sans-font-div",
    heading: "text-xl h-[80px] flex items-center",
  };

  // Products Section

  const productStyle = {
    card: "min-w-[280px] max-w-[280px]  max-h-full p-[10px] rounded-[16px] bg-[#ffffff] text-[#121212] DM-Sans-font-div flex flex-col item-start gap-4",
    image: "w-[280px] h-[280px] rounded-[16px]",
    title: "text-[22px] font-bold text-[#121212",
    description: "text-base text-[#121212b3] break-words",
    price: "text-[16px] font-bold text-[#121212]",
  };

  // Services Section
  const serviceStyle = {
    card: "flex flex-col justify-start items-center min-w-[280px] max-w-[280px] min-h-[280px] max-h-full p-6 rounded-[16px] text-[#121212] DM-Sans-font-div gap-4",
    image: "w-[64px] h-[64px] rounded-[12px]",
    title: "text-base font-bold text-[#121212] break-words",
    description: "text-base text-[#121212b3] break-words",
  };

  //Appointments Section
  // const appointmentsStyle = {
  //   div: "DM-Sans-font-div text-[#121212] font-medium bg-[#FFFFFF] py-10 rounded-[16px]",
  //   heading: "font-bold text-base",
  //   active: {
  //     div: "border border-[#121212] w-[94px] h-[84px] rounded-[16px]",
  //     header: "bg-[#121212] text-[#FFFFFF] text-sm h-[26px] rounded-t-[16px]",
  //   },
  //   inactive: {
  //     div: "border border-[rgba(18,18,18,0.50)] w-[94px] h-[84px] rounded-[16px]",
  //     header:
  //       "bg-[rgba(18,18,18,0.50)] text-[#FFFFFF] text-sm h-[26px] rounded-t-[16px]",
  //   },
  //   para: "text-sm text-center py-2",
  // };


  const fillColor = props.star ? props.star : "#FDADA6";

  const appointmentsStyle = {
    radiusColor: "#033CCE",
    radius : "20px",
    star:{
      fill: ""
    },
    background: "#FFF",
    para: {
      color: "#121212",
      fontFamily: "DM Sans, sans-serif",
      fontSize: "32px",
      fontWeight: "500",
    },
  };
  
  // Videos Section
  const videosStyle = {
    card: {
      borderRadius: "20px",
    },
    title: {
      color: "#121212",
      fontFamily: "DM Sans, sans-serif",
      fontWeight: "700",
    },
  };

  // Resources Section
  const resourceStyle = {
    div: "grid grid-cols-2 gap-5",
    wordlimit: 25,
    card: "flex items-center h-[65px] px-6 rounded-full bg-[#FFFFFfDc] DM-Sans-font-div hover:border-none duration-200 hover:cursor-pointer",
    icon: "text-[#000000] text-xl",
    title: "text-[#121212] font-medium text-base",
    arrow: "text-[#121212] text-[24px]",
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
    div: "flex flex-col justify-center items-center w-[582px] bg-[#FFFFFF]  text-[#121212] rounded-[40px] p-10 DM-Sans-font-div relative border-t-4 border-solid border-blue-500 border-opacity-50",
    title: "text-xl font-bold mb-5 text-[#121212]",
    time: "text-base text-[#121212]",
    point: "w-1 h-1 rounded-full bg-[#121212] mr-2",
    star: {
      fill: "#121212",
    },
  };

  // Reviews Section
  const reviewStyle = {
    card: " flex flex-col justify-center items-center rounded-[20px] text-[#121212] min-w-[381px] max-w-[381px] min-h-full max-h-full flex flex-col gap-4 p-6",
    starColor: "#033CCECC",
    name: "text-[#121212] mb-[8px] font-bold DM-Sans-font-div",
    review: "text-[#121212] DM-Sans-font-div",
  };
  const reviewStarDivbg = templatebg;

  // Gallery Section
  const galleryStyle = {
    heading: "text-[32px] font-bold text-[#121212] DM-Sans-font-div mb-[45px]",
    image: `w-[300px] h-[300px] lg:w-[380px] lg:h-[380px] rounded-[20px] bg-[#cccccc]`,
  };

  // Contact Us Button
  const contactBtnStyle =
    "flex items-center justify-center gap-2 px-4 h-[80px] bg-[#427AFF] border border-[#FFFFFF] backdrop-blur-[5px] shadow-[0px_8px_20px_0px_rgba(3,60,206,0.32)] rounded-full text-[16px] font-bold DM-Sans-font-div text-[#ffffff] z-[100] hover:cursor-pointer";
  const innerBtnStyle = {
    btn: "!bg-[#FFFFFF] backdrop-blur-0",
    icon: `text-[#033CCE] text-base`,
    text: "!text-[#121212] text-base font-bold",
  };
  const closeBtnStyle =
    "text-[#ffffff] text-[24px] rounded-[20px] bg-[#427AFF] border border-[#FFFFFF] shadow-[0px_8px_20px_0px_rgba(18,18,18,0.32)] backdrop-blur-[14px] px-8";

  // Modals Style
  const modalStyle = "bg-[#272727] text-[#121212] DM-Sans-font-div";
  const appointmentInactiveBg = "bg-[#DDA15E]";
  const appointmentActiveBg = "bg-[#BC6C25]";
  const appointmentDiv =
    "min-w-[100px] max-w-[100px] flex flex-col gap-1.5 justify-center items-center rounded-lg px-3 py-2 text-xs text-white";

  // Toast Style
  const toastStyle = {
    bg: "#121212",
    border: "1px solid #FFFFFF",
    color: "#FFFFFF",
    fontFamily: "DM Sans, sans-serif",
    fontSize: "12px",
  };

  return (
    <BaseTemplate5
      //data
      data={props.data}
      disable={props.disable}
      qrGoogle={props.qrGoogle}
      //styling
      buttonStyle={buttonStyle}
      heroStyle={heroStyle}
      appsStyle={appsStyle}
      templatebg={templatebg}
      headerStyle={headerStyle}
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

export default Template30;
