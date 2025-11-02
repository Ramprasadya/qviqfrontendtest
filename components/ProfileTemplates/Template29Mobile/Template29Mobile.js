import React from "react";
import BaseTemplate4Mobile from "../ProfileComponentsMobile/BaseTemplates/BaseTemplate4Mobile";

const Template29Mobile = (props) => {
  //console.log("T29");
  // Button Component Styling
  const buttonStyle =
    "bg-[#FFFFFF] text-[#121212] rounded-full border-r-[4px] border-b-[4px] border-[#636363] DM-Sans-font-div hover:border-none hover:cursor-pointer";
  const modalButtonStyle = buttonStyle.concat(" h-[50px]");

  // Template Background
  const templatebg = `${props.mainbg !== undefined ? props.mainbg.color : ""}`;

  // Hero Section
  const heroStyle = {
    div: `${props.mainfg}`,
    profilePic: "rounded-full",
    fullName: "text-xl font-bold text-white",
    jobTitle: "text-sm text-[rgba(255,255,255,0.80)] italic",
    jobDescription: "text-sm text-white",
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
    app: `w-[85px] h-[85px] xsm1:w-[93px] xsm1:h-[93px] rounded-[18px] flex items-center justify-center backdrop-blur-[5px] ${props.mainfg}`,
    arrow: `w-8 h-8 absolute -bottom-12 text-xl !bg-[rgba(255,255,255,0.30)] !text-[${
      props.mainbg !== undefined && props.mainbg.secondaryColor
    }]`,
  };

  // Heading Section
  const headerStyle = {
    div: "rounded-full border-[2px] border-[#636363] bg-[#FFFFFF] text-[#121212] DM-Sans-font-div",
    heading: "text-sm h-[52px] flex items-center",
  };

  // Products Section

  const productStyle = {
    card: "min-w-[220px] max-w-[220px] max-h-full p-[8px] rounded-[12px] bg-[#272727] text-[#121212] DM-Sans-font-div flex flex-col item-start gap-3",
    image: "w-[220px] h-[220px] rounded-[12px]",
    title: "text-base font-bold text-[#ffffffEc]",
    description: "text-sm text-[#ffffffEc] break-words",
    price: "text-[14px] font-bold text-[#ffffffEc]",
  };

  // Services Section
  const serviceStyle = {
    card: "flex flex-col justify-start items-center min-w-[220px] max-w-[220px] min-h-[220px] max-h-full p-4 rounded-[16px] text-[#121212] DM-Sans-font-div bg-[#272727] gap-3",
    image: "w-[64px] h-[64px] rounded-[12px]",
    title: "text-sm font-bold text-[#ffffffEc] break-words",
    description: "text-sm text-[#ffffffEc] break-words",
  };

  //Appointments Section
  // const appointmentsStyle = {
  //   div: "DM-Sans-font-div text-[#121212] font-medium bg-[#FFFFFF] p-10 rounded-[16px]",
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
    radius : "20px",
    star:{
      fill: fillColor
    },
    background: "#272727",
    para: {
      color: "#fff",
      fontFamily: "DM Sans, sans-serif",
      fontSize: "16px",
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
    div: "grid gap-4",
    wordlimit: 25,
    card: "flex items-center h-[56px] px-4 border-r-[4px] border-b-[4px] border-[#636363] rounded-full bg-[#FFFFFFDc] DM-Sans-font-div hover:border-none duration-200 hover:cursor-pointer",
    icon: "text-[#000000] text-xl",
    title: "text-[#121212] font-medium text-sm",
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
    div: "flex flex-col justify-center items-center w-full bg-[#FFFFFF] text-[#121212] rounded-[20px] p-5 DM-Sans-font-div relative",
    title: "text-sm font-bold mb-2 text-[#ffffffDf]",
    time: "text-xs text-[#ffffffDf]",
    point: "w-1 h-1 rounded-full bg-[#ffffffDf] mr-2",
    star: {
      fill: "#DDA15E",
    },
  };

  // Reviews Section
  const reviewStyle = {
    card: "flex flex-col justify-center items-center rounded-[20px] text-[#121212] border-[2px] border-[#121212] min-w-[320px] max-w-[320px] min-h-full max-h-full flex flex-col gap-4 p-5",
    starColor: "white",
    name: "text-[#ffffffDf] mb-[8px] font-bold DM-Sans-font-div",
    review: "text-[#ffffffAf] DM-Sans-font-div",
  };
  const reviewStarDivbg = templatebg;

  // Gallery Section
  const galleryStyle = {
    heading: "text-lg font-bold text-[#ffffff] DM-Sans-font-div mb-6",
    image: `rounded-[20px] bg-[#cccccc]`,
  };

  // Contact Us Button
  const contactBtnStyle =
    "flex items-center justify-center gap-2  h-[80px] bg-[rgba(255,255,255,0.50)] border border-[#FFFFFF] shadow-[0px_8px_20px_0px_rgba(18,18,18,0.32)] rounded-full backdrop-blur-[10px] text-[16px] font-bold DM-Sans-font-div text-[#121212] z-[100] hover:cursor-pointer px-8";
  const innerBtnStyle = {
    btn: "!bg-[#FFFFFF] backdrop-blur-0",
    icon: `!text-[${
      props.mainbg !== undefined ? props.mainbg.color : "#121212"
    }] text-base`,
    text: "!text-[#121212] text-base font-bold",
  };
  const closeBtnStyle =
    "text-[#121212] text-[24px] rounded-[20px] bg-[rgba(255,255,255,0.50)] border border-[#FFFFFF] shadow-[0px_8px_20px_0px_rgba(18,18,18,0.32)] backdrop-blur-[14px] px-8";

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
    <BaseTemplate4Mobile
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

export default Template29Mobile;
