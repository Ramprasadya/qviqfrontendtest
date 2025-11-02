import React from "react";
import HeroProfile from "./HeroProfile";
import BaseTemplate1Mobile from "../ProfileComponentsMobile/BaseTemplates/BaseTemplate1Mobile";

const Template2Mobile = (props) => {
  // console.log("T2M");
  // Button Component Styling
  const buttonStyle =
    "bg-[#283618] hover:bg-[#606C38] text-white rounded-[40px] Proza-Libre-font-div hover:cursor-pointer";
  const modalButtonStyle = buttonStyle.concat(" w-full h-[50px]");

  // Heading Component
  const Heading = (props) => {
    return (
      <h1 className="text-[28px] font-bold flex items-center gap-2 relative text-[#121212] mb-5 Cormorant-Garamond-font-div">
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M10 0L11.4617 6.47109L17.0711 2.92893L13.5289 8.53828L20 10L13.5289 11.4617L17.0711 17.0711L11.4617 13.5289L10 20L8.53828 13.5289L2.92893 17.0711L6.47109 11.4617L0 10L6.47109 8.53828L2.92893 2.92893L8.53828 6.47109L10 0Z"
              fill="#121212"
            />
          </svg>
        </span>
        {props.title}
      </h1>
    );
  };

  // Hero Section
  const heroStyle = {
    background: "#DDA15E",
    header:
      "bg-[#fff] text-[#121212] text-sm Proza-Libre-font-div rounded-[100px] px-9 shadow-[0px_6px_16px_0px_rgba(18,18,18,0.12)]",
    heading:
      "hover:text-[#BC6C25] hover:font-semibold hover:cursor-pointer relative active:scale-95",
    activeHeader: "",
    jobTitle: {
      color: "#121212",
      fontFamily: "Proza Libre, sans-serif",
      fontSize: "16px",
      fontWeight: "600",
    },
    jobDescription: {
      fontSize: "14px",
      color: "#121212",
      fontFamily: "Proza Libre, sans-serif",
    },
  };

  // Apps Section
  const appsStyle = {
    iconType: "ColoredIcons",
    background: "bg-[#283618]",
    app: "w-16 h-16 rounded-full flex items-center justify-center bg-[#606C38] hover:border-2 hover:border-[#FEFAE0] hover:cursor-pointer",
    iconSize:"h-[35px] w-[35px]",
    arrow: "w-8 h-8 absolute -bottom-4 border border-[#DDA15E] text-base",
  };
  const customLinkStyle = {
    linkBg: {
      // boxShadow: "4px 4px 0px 0px #000",
      // border: "1px solid #121212",
      borderRadius: "100px",
    },
    linkImg: { border: "none", borderRadius: "50px" },
    linkFont: ""
  };
  // Products Section
  const templatebg = "#FEFAE0";

  const productStyle = {
    card: "min-w-[238px] max-w-[238px] h-fit max-h-full px-2 pt-2 pb-4 rounded-[16px] bg-[#fff] Proza-Libre-font-div flex flex-col item-start gap-4",
    image: "w-[222px] h-[220px] rounded-t-[12px]",
    title: "text-base font-bold text-[#121212]",
    description: "text-sm font-medium text-[#121212] break-words",
    price: "text-[14px] font-bold text-[#121212]",
  };

  const serviceStyle = {
    card: "min-w-[212px] max-w-[212px] min-h-[240px] max-h-full p-4 rounded-[16px] bg-[#283618] flex flex-col item-start gap-4",
    image: "w-[64px] h-[64px] rounded-xl",
    title:
      "text-xl font-medium italic text-white Cormorant-Garamond-font-div break-words",
    description:
      "text-sm text-[rgba(255,255,255,0.80)] Proza-Libre-font-div break-words",
  };

  //Appointments Section
  const appointmentsStyle = {
    background: "#BC6C25",
    para: {
      color: "#fff",
      fontFamily: "Cormorant Garamond, sans-serif",
      fontSize: "20px",
      fontWeight: "700",
    },
  };

  // Gallery Section
  const galleryStyle = "w-[300px] h-[300px] lg:w-[380px] lg:h-[380px] rounded-[20px]";

  // Videos Section
  const videosStyle = {
    card: {
      borderRadius: "16px",
    },
    title: {
      color: "#121212",
      fontFamily: "Proza Libre, sans-serif",
      fontWeight: "500",
      fontSize: "14px",
    },
  };

  // Resources Section
  const resourceStyle = {
    card: "rounded-[100px] min-w-[104px] max-w-[104px] min-h-[104px] text-center bg-white flex items-center justify-center hover:cursor-pointer Proza-Libre-font-div",
    icon: "text-[#BC6C25] text-base",
    title: "text-[#181818] font-medium text-xs max-w-[80%] break-all",
    hover: {
      card: {
        background: "#BC6C25",
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
      background: "#BC6C25",
      borderRadius: "16px",
      padding: "20px",
    },
    title: {
      fontSize: "20px",
      fontFamily: "Cormorant Garamond, sans-serif",
      fontWeight: "700",
      color: "#fff",
    },
    time: {
      fontSize: "12px",
      fontFamily: "Proza Libre, sans-serif",
      fontWeight: "500",
      color: "#fff",
    },
    point: {
      minWidth: "2px",
      minHeight: "2px",
      borderRadius: "50%",
      backgroundColor: "#fff",
      marginRight: "5px",
    },
    star: {
      fill: "#DDA15E",
    },
  };

  // Reviews Section
  const reviewStyle = {
    card: "bg-white rounded-[20px] text-[#121212] min-w-[317px] max-w-[317px] min-h-full max-h-full flex flex-col gap-4 p-5",
    starColor: "#BC6C25",
    name: "text-sm font-bold Cormorant-Garamond-font-div",
    review: "text-xs Proza-Libre-font-div",
  };
  const reviewStarDivbg = "#283618";

  // Contact Us Button
  const contactBtnStyle = `Proza-Libre flex items-center justify-center gap-2 px-6 !h-[48px] bg-white border-2 border-[#283618] shadow-[0px_6px_16px_0px_rgba(18,18,18,0.12)] rounded-[40px] text-sm font-bold text-[#283618] z-[100] hover:cursor-pointer active:scale-95 duration-200`;
  const innerBtnStyle = {
    icon: "text-[#283618] text-lg",
    text: "text-[#121212] text-xs",
  };
  const closeBtnStyle = "text-[#283618] text-2xl px-[16px]";

  // Modals Style
  const modalStyle = "bg-white text-[#121212] Proza-Libre-font-div";
  const appointmentInactiveBg = "bg-[#DDA15E]";
  const appointmentActiveBg = "bg-[#BC6C25]";
  const appointmentDiv =
    "min-w-[100px] max-w-[100px] flex flex-col gap-1.5 justify-center items-center rounded-lg px-3 py-2 text-xs text-white";

  // Toast Style
  const toastStyle = {
    bg: "#fff",
    border: "1px solid #DDA15E",
    color: "#121212",
    fontFamily: "Proza Libre, sans-serif",
  };

  return (
    <BaseTemplate1Mobile
      //data
      // userName={props.userName}
      data={props.data}
      disable={props.disable}
      qrGoogle={props.qrGoogle}
      //styling
      btntype="1"
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
      appointmentActiveBg={appointmentActiveBg}
      appointmentInactiveBg={appointmentInactiveBg}
      appointmentDiv={appointmentDiv}
      toastStyle={toastStyle}
    />
  );
};

export default Template2Mobile;
