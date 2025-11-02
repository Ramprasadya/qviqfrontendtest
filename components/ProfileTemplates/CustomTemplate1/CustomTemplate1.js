import React, { useEffect, useState } from "react";
import CustomBase1 from "../ProfileComponents/BaseTemplates/CustomBase1";

const CustomTemplate1 = (props) => {
  // Button Component Styling
  const buttonStyle =
    "bg-[#FFFFFF] text-[#121212] border border-black border-solid border-r-[6px] border-b-[6px] hover:border-r-[1px] hover:border-b-[1px] DM-Sans-font-div  hover:cursor-pointer";
  const modalButtonStyle = buttonStyle.concat(" w-full h-[50px]");

  const [customBtn, setCustomBtn] = useState({});

  const btnStyleObj = [
    // no decoration
    {
      type: "filled_btn_0",
      style: {
        background: `${props.btncolor}`,
        color: `${props.customButtontextColor}`,
        border: "none",
        borderRadius: "0px",
      },
    },
    {
      type: "filled_btn_12",
      style: {
        background: `${props.btncolor}`,
        color: `${props.customButtontextColor}`,
        border: "none",
        borderRadius: "12px",
      },
    },
    {
      type: "filled_btn_64",
      style: {
        background: `${props.btncolor}`,
        color: `${props.customButtontextColor}`,
        border: "none",
        borderRadius: "64px",
      },
    },

    // simple border
    {
      type: "outline_btn_0",
      style: {
        background: `${props.btncolor}`,
        color: `${props.customButtontextColor}`,
        border: "1px solid black",
        borderRadius: "0px",
      },
    },
    {
      type: "outline_btn_12",
      style: {
        background: `${props.btncolor}`,
        color: `${props.customButtontextColor}`,
        border: "1px solid black",
        borderRadius: "12px",
      },
    },
    {
      type: "outline_btn_64",
      style: {
        background: `${props.btncolor}`,
        color: `${props.customButtontextColor}`,
        border: "1px solid black",
        borderRadius: "64px",
      },
    },

    // soft shadow with no border
    {
      type: "soft_btn_0",
      style: {
        background: `${props.btncolor}`,
        color: `${props.customButtontextColor}`,
        border: "none",
        borderRadius: "0px",
        boxShadow: "2px 2px 8px rgba(0, 0, 0, 0.3)",
      },
    },
    {
      type: "soft_btn_12",
      style: {
        background: `${props.btncolor}`,
        color: `${props.customButtontextColor}`,
        border: "none",
        borderRadius: "12px",
        boxShadow: "2px 2px 8px rgba(0, 0, 0, 0.3)",
      },
    },
    {
      type: "soft_btn_64",
      style: {
        background: `${props.btncolor}`,
        color: `${props.customButtontextColor}`,
        border: "none",
        borderRadius: "64px",
        boxShadow: "2px 2px 8px rgba(0, 0, 0, 0.3)",
      },
    },

    // border with shadow
    {
      type: "hard_btn_0",
      style: {
        background: `${props.btncolor}`,
        color: `${props.customButtontextColor}`,
        borderRadius: "0px",
      },
    },
    {
      type: "hard_btn_12",
      style: {
        background: `${props.btncolor}`,
        color: `${props.customButtontextColor}`,
        borderRadius: "12px",
      },
    },
    {
      type: "hard_btn_64",
      style: {
        background: `${props.btncolor}`,
        color: `${props.customButtontextColor}`,
        borderRadius: "64px",
      },
    },
  ];

  useEffect(() => {
    // setCustomBtn(btnStyleObj[0].style);
    for (let i = 0; i < btnStyleObj.length; i++) {
      if (props.btnstyle === btnStyleObj[i].type) {
        setCustomBtn(btnStyleObj[i].style);
      }
    }
  }, [props.btnstyle, props.btncolor]);

  // Template Background
  const color1 = props.color1;
  const color2 = props.color2;

  const templatebg = `${
    props.mainbg
      ? props.mainbg
      : `linear-gradient(180deg, ${props.color1}, ${props.color2})`
  }`;

  // Hero Section
  const heroStyle = {
    div: `${
      props.mainbg
        ? `${props.mainbg}Bc`
        : `linear-gradient(180deg, ${color1}, ${color2})`
    }`,
    profilePic: "rounded-full",
    fullName: "text-[28px] font-bold text-white",
    jobTitle: "text-xl text-[rgba(255,255,255,0.80)] italic",
    jobDescription: "text-xl text-white",
  };

  // Apps Section
  const appsStyle = {
    iconType: `${
      (props.mainbg !== undefined ? props.mainbg.secondaryColor : "") ===
      "#FFFFFF"
        ? "WhiteIcons"
        : "BlackIcons"
    }`,
    background: `${
      props.appIconBg !== ""
        ? props.appIconBg
        : props.mainbg
        ? `${props.mainbg}Bc`
        : `linear-gradient(180deg, ${color1}, ${color2})`
    }`,
    app: `w-[132px] h-[132px] rounded-[30px] flex items-center justify-center backdrop-blur-[5px]`,
    arrow: `w-16 h-16 absolute -bottom-20 text-2xl !bg-[rgba(255,255,255,0.30)] !text-[${
      props.mainbg !== undefined && props.mainbg.secondaryColor
    }]`,
  };

  // Heading Section
  const headerStyle = {
    div: "rounded-[20px] border border-[#121212] bg-[#FFFFFF] text-[#121212] DM-Sans-font-div",
    heading: "text-xl h-[80px] flex items-center",
  };

  // Products Section

  const productStyle = {
    card: "min-w-[280px] max-w-[280px] h-fit max-h-full rounded-[16px] bg-white p-2 text-[#121212] DM-Sans-font-div flex flex-col item-start gap-4",
    image: "w-[280px] h-[280px] rounded-[16px]",
    title: "text-base font-medium break-words",
    price: "text-[22px] font-bold",
  };

  // Services Section
  const serviceStyle = {
    card: "min-w-[280px] max-w-[280px] min-h-[280px] max-h-full p-6 rounded-[16px] text-[#121212] DM-Sans-font-div bg-[#FFFFFF] border-[#121212] border-r-[8px] border-b-[8px] flex flex-col item-start gap-4",
    image: "w-[64px] h-[64px] rounded-[12px]",
    title: "text-base font-bold break-words",
    description: "text-base break-words",
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

  const appointmentsStyle = {
    star: {
      fill: "#ffaa19",
    },
    para: {
      color: "#fff",
      fontFamily: "Plus Jakarta Sans",
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
    card: "flex items-center h-[72px] px-6 border-r-[8px] border-b-[8px] border-[#121212] rounded-[12px] bg-[#FFFFFF] DM-Sans-font-div hover:border-none duration-200 hover:cursor-pointer",
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
    div: "w-[582px] bg-[#FFFFFF] text-[#121212] border-[4px] border-[#121212] rounded-s-[40px] rounded-br-[40px] p-10 DM-Sans-font-div relative",
    title: "text-xl font-bold mb-5",
    time: "text-base font-medium",
    point: "w-1 h-1 rounded-full bg-[#121212] mr-2",
    star: {
      fill: "#DDA15E",
    },
  };

  // Reviews Section
  const reviewStyle = {
    card: "bg-white rounded-[20px] text-[#121212] border-[3px] border-[#121212] min-w-[381px] max-w-[381px] min-h-full max-h-full flex flex-col gap-4 p-6",
    starColor: "#121212",
    name: "text-base font-bold DM-Sans-font-div",
    review: "text-base DM-Sans-font-div",
  };
  const reviewStarDivbg = templatebg;

  // Gallery Section
  const galleryStyle = {
    heading: "text-[32px] font-bold text-[#121212] DM-Sans-font-div mb-[45px]",
    image: `w-[300px] h-[300px] lg:w-[380px] lg:h-[380px] rounded-[20px] bg-[#cccccc]`,
  };

  // Contact Us Button
  const contactBtnStyle =
    "flex items-center justify-center gap-2 !px-8  h-[80px] bg-[rgba(255,255,255,0.50)] border border-black border-solid border-r-[6px] border-b-[6px] hover:border-r-[1px] hover:border-b-[1px] rounded-[20px] backdrop-blur-[10px] text-[16px] font-bold DM-Sans-font-div text-[#121212] z-[100] hover:cursor-pointer";
  const innerBtnStyle = {
    btn: "",
    icon: `!text-[${
      props.mainbg !== undefined ? props.mainbg.color : ""
    }] text-base`,
    text: "!text-[#121212] text-base font-bold",
  };
  const closeBtnStyle =
    "text-[#121212] text-[24px] rounded-[20px] bg-[rgba(255,255,255,0.50)] border border-[#FFFFFF] shadow-[0px_8px_20px_0px_rgba(18,18,18,0.32)] backdrop-blur-[14px] px-8";

  // Modals Style
  const modalStyle = "bg-white text-[#121212] DM-Sans-font-div";
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
    <CustomBase1
      //data
      data={props.data}
      disable={props.disable}
      //styling
      btntype="3"
      fontColor={props.fontColor}
      customTextColor={props.customTextColor}
      customBtn={customBtn}
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

export default CustomTemplate1;
