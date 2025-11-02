import React from "react";
import BaseTemplate2Mobile from "../ProfileComponentsMobile/BaseTemplates/BaseTemplate2Mobile";
function useDefaultProps(props){
  let newProps = {...props};
  Object.keys(newProps).forEach(key => newProps[key] === undefined ? delete newProps[key] : {});
  return {...defaultProps,...newProps};
}
const Template8Mobile = (props) => {props = useDefaultProps(props);
  // profile is rounded or square
  const square = props.square;
  //console.log("T8M");
  // Button Component Styling
  const buttonStyle = `bg-[#FFFFFF] text-[#121212] text-sm shadow-[4px_4px_0px_0px_#121212] hover:shadow-none duration-200 border border-[#121212] font-bold mb-1 Plus-Jakarta-Sans-font-div hover:cursor-pointer 
    rounded-none
  }`;
  const modalButtonStyle = buttonStyle.concat(" w-full h-[50px]");

  // Heading Component
  const headingStyle = {
    active:
      "text-[#121212] font-extrabold text-xl flex flex-col items-center relative Plus-Jakarta-Sans-font-div",
    inactive: "text-[#121212] text-base Plus-Jakarta-Sans-font-div",
  };
  const activeHeadingElement = (
    <span className="absolute left-1/2 -translate-x-1/2 top-[25px]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="11"
        height="11"
        viewBox="0 0 11 11"
        fill="none"
      >
        <path
          d="M5.5 0L6.30395 3.5591L9.38909 1.61091L7.4409 4.69605L11 5.5L7.4409 6.30395L9.38909 9.38909L6.30395 7.4409L5.5 11L4.69605 7.4409L1.61091 9.38909L3.5591 6.30395L0 5.5L3.5591 4.69605L1.61091 1.61091L4.69605 3.5591L5.5 0Z"
          fill="#121212"
        />
      </svg>
    </span>
  );

  // Hero Section
  const heroStyle = {
    div: `rounded-[20px] bg-[#ffff] backdrop-blur-[18px] Plus-Jakarta-Sans-font-div ${
      square ? "rounded-b-none" : "rounded-b-[20px]"
    }`,
    border: "border-2 border-black",
    color: "black",
    textColor: "text-[#121212]",
    fullName: "text-[#121212] font-bold text-[24px]",
    profilePic: "rounded-[140px] border border-[#FFF]",
    jobTitle: "text-base text-[#121212]",
    jobDescription: "text-[#121212] text-sm",
  };

  // Apps Section
  const appsStyle = {
    noOfApps: 10,
    iconType: "WhiteIcons",
    hoverIconType: "BlackIcons",
    background: `bg-[#FFF] backdrop-blur-[18px] ${
      square ? "rounded-none" : "rounded-[20px]"
    }`,
    div: "!max-w-[280px] gap-5 !px-1",
    app: `w-[52px] h-[52px] flex items-center justify-center bg-[#121212] shadow-[2px_2px_0px_0px_rgba(255,255,255,0.60)] hover:cursor-pointer hover:bg-[#FFFFFF] ${
      square ? "rounded-none" : "rounded-full"
    }`,
    iconSize:"h-[30px] w-[30px]",
    arrow: "w-6 h-6 absolute bottom-[-10px] text-base !bg-[#121212] text-white",
  };
  const customLinkStyle = {
    linkMainBg: `bg-white ${square ? "rounded-[0px]" : "rounded-[20px]"}`,
    linkBg: {
      boxShadow: `${square && "4px 4px 0px 0px #121212"}`,
      border: "1px solid #121212",
      borderRadius: `${square ? "0px" : "100px"}`,
    },
    linkImg: { border: "none", borderRadius: "100px" },
    linkFont: "",
  };
  // Products Section
  const bodyStyle = `bg-[#FFFFFF] Jakarta-Sans-font-div ${
    square ? "rounded-none" : "rounded-[20px]"
  }`;
  const scrollBtnStyle = {
    boxShadow: "2px 2px 0px 0px #121212",
  };

  const productStyle = {
    card: "min-w-[220px] max-w-[220px] h-fit max-h-full bg-transparent text-[#121212] flex flex-col item-start gap-3 Plus-Jakarta-Sans-font-div",
    image: `w-[220px] h-[220px] ${square ? "rounded-none" : "rounded-[12px]"}`,
    title: "text-base font-bold",
    description: "text-base break-words",
    price: "text-base font-bold",
  };

  // Services Section
  const serviceStyle = {
    card: `min-w-[212px] max-w-[212px] min-h-[230px] max-h-full p-4 bg-[#FFFFFF] text-[#121212] flex flex-col item-start gap-3 border border-[#121212] shadow-[4px_4px_0px_0px_#121212] mb-1 Plus-Jakarta-Sans-font-div ${
      square ? "rounded-none" : "rounded-[20px]"
    }`,
    image: `w-[64px] h-[64px] ${square ? "rounded-none" : "rounded-[12px]"}`,
    title: "text-sm font-bold",
    description: "text-sm",
  };

  //Appointments Section
  // const appointmentsStyle = {
  //   div: "Plus-Jakarta-Sans-font-div text-[#121212] font-medium",
  //   heading: "font-bold text-sm",
  //   active: {
  //     div: `border border-[#121212] w-[85px] h-[76px] ${
  //       square ? "rounded-none" : "rounded-[12px]"
  //     }`,
  //     header: `bg-[#121212] text-[#FFFFFF] text-xs h-[26px] ${
  //       square ? "rounded-none" : "rounded-t-[12px]"
  //     }`,
  //   },
  //   inactive: {
  //     div: `border border-[rgba(18,18,18,0.50)] w-[85px] h-[76] ${
  //       square ? "rounded-none" : "rounded-[12px]"
  //     }`,
  //     header: `bg-[rgba(18,18,18,0.50)] text-[#FFFFFF] text-xs h-[26px] ${
  //       square ? "rounded-none" : "rounded-t-[12px]"
  //     }`,
  //   },
  //   para: "text-xs text-center py-2",
  // };

  //Appointments Section
  const appointmentsStyle = {
    star: {
      fill: "#ffaa19",
    },
    para: {
      color: "#fff",
      fontFamily: "Plus Jakarta Sans",
      fontSize: "20px",
      fontWeight: "500",
    },
  };

  // Business Hours Section
  const businessHoursStyle = {
    div: {
      background: "#FFFFFF",
      padding: "20px",
      border: "1px solid #121212",
      // boxShadow: "4px 4px 0px 0px #121212",
      fontFamily: "Plus Jakarta Sans",
      color: "#121212",
      borderRadius: props.square ? "0px" : "20px",
    },
    title: {
      fontSize: "14px",
      fontWeight: "700",
    },
    time: {
      fontSize: "12px",
    },
    point: {
      minWidth: "2px",
      minHeight: "2px",
      borderRadius: "50%",
      backgroundColor: "#121212",
      marginRight: "5px",
    },
    star: {
      fill: "transparent",
    },
  };

  // Gallery Section
  const galleryStyle = `bg-[#D9D9D9] min-w-[100px] min-h-[110px] max-h-[160px] ${
    square ? "rounded-none" : "rounded-[20px]"
  }`;

  // Videos Section
  const videosStyle = {
    card: {
      background: "#D9D9D9",
      width: "280px",
      height: "168px",
      borderRadius: props.square ? "0px" : "20px",
    },
    title: {
      color: "#121212",
      fontFamily: "Plus Jakarta Sans, sans-serif",
      fontWeight: "500",
      fontSize: "14px",
    },
  };

  // Resources Section
  const resourceStyle = {
    div: "grid grid-cols-1 gap-4",
    wordlimit: 12,
    card: `flex items-center h-[56px] px-[18px] border border-[#121212] shadow-[4px_4px_0px_0px_#121212] Plus-Jakarta-Sans-font-div hover:shadow-none duration-200 hover:cursor-pointer ${
      square ? "rounded-none" : "rounded-full"
    }`,
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

  // Reviews Section
  const reviewsStyle = {
    card: `text-[#121212] border border-[#121212] mb-1 shadow-[4px_4px_0px_0px_#121212] Plus-Jakarta-Sans-font-div min-w-[280px] max-w-[280px] min-h-full max-h-full flex flex-col gap-4 p-5 ${
      square ? "rounded-none" : "rounded-[20px]"
    }`,
    starColor: "#121212",
    name: "text-sm font-bold",
    review: "text-xs",
  };
  const reviewStarDivbg = "#121212";

  // Contact Us Button
  const contactBtnStyle = `flex items-center justify-center gap-2 px-6 h-[48px] bg-[rgba(0,0,0,0.20)] backdrop-blur-[18px] text-[#FFFFFF] text-sm font-bold Plus-Jakarta-Sans-font-div border border-[#FFFFFF] hover:cursor-pointer ${
    square ? "rounded-none" : "rounded-full overflow-hidden"
  }`;
  const innerBtnStyle = {
    btn: "!bg-[#FFFFFF] border border-[#121212] shadow-[4px_4px_0px_0px_#121212] hover:cursor-pointer",
    icon: "text-[#121212] text-xl",
    text: "text-[#121212] text-sm",
  };
  const closeBtnStyle =
    "text-[#FDFFFF] bg-[rgba(0,0,0,0.20)] backdrop-blur-[18px] !text-[24px] !px-4 h-[48px]";

  // Modals Style
  // const modalStyle = `!text-[#121212] ${
  //   square ? "!rounded-none" : "!rounded-t-[16px]"
  // } Plus-Jakarta-Sans-font-div`;
  const modalStyle =
    "bg-white text-[#121212] !rounded-[0px] Plus-Jakarta-Sans-font-div";
  const appointmentActiveBg = "bg-[#F2DFD7]";
  const appointmentInactiveBg = "bg-[#F2DFD7] opacity-60";
  const appointmentDiv =
    "min-w-[100px] max-w-[100px] flex flex-col gap-1.5 justify-center items-center px-3 py-2 text-xs text-white";

  // Toast Style
  const toastStyle = {
    bg: "#FFFFFF",
    border: "1px solid #121212",
    color: "#121212",
    fontFamily: "Plus Jakarta Sans, sans-serif",
    boxShadow: "0px 6px 16px 0px rgba(115, 108, 237, 0.10)",
    borderRadius: props.square ? "0px" : "12px",
  };

  // Bottom Section
  const bottomStyle = `!bg-[#121212] !text-[#FFFFFF] !mb-0 Plus-Jakarta-Sans-font-div ${
    square ? "!rounded-none" : "!rounded-[20px]"
  }`;

  return (
    <BaseTemplate2Mobile
      //data
      data={props.data}
      mainbg={props.mainbg}
      disable={props.disable}
      qrGoogle={props.qrGoogle}
      //styling
      btntype="22"
      buttonStyle={buttonStyle}
      headingStyle={headingStyle}
      activeHeadingElement={activeHeadingElement}
      heroStyle={heroStyle}
      appsStyle={appsStyle}
      customLinkStyle={customLinkStyle}
      bodyStyle={bodyStyle}
      scrollBtnStyle={scrollBtnStyle}
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
      toastStyle={toastStyle}
      bottomStyle={bottomStyle}
      square={square}
      appointmentActiveBg={appointmentActiveBg}
      appointmentInactiveBg={appointmentInactiveBg}
      appointmentDiv={appointmentDiv}
    />
  );
};

const defaultProps = {
  square: true,
};

export default Template8Mobile;
