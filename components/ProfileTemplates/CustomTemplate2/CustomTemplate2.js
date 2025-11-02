import React, { useEffect, useState } from "react";
import CustomBase2 from "../ProfileComponents/BaseTemplates/CustomBase2";
function useDefaultProps(props) {
  let newProps = { ...props };
  Object.keys(newProps).forEach((key) =>
    newProps[key] === undefined ? delete newProps[key] : {}
  );
  return { ...defaultProps, ...newProps };
}
const CustomTemplate2 = (props) => {
  props = useDefaultProps(props);
  // profile is rounded or square
  const square = props.square;

  // Button Component Styling
  const buttonStyle =
    "bg-[#FFFFFF] text-[#121212] border border-black border-solid border-r-[6px] border-b-[6px] hover:border-r-[1px] hover:border-b-[1px] DM-Sans-font-div hover:cursor-pointer";
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
        // border: "1px solid black",
        // boxShadow: "2px 2px 0px 2px #000000",
      },
    },
    {
      type: "hard_btn_12",
      style: {
        background: `${props.btncolor}`,
        color: `${props.customButtontextColor}`,
        borderRadius: "12px",
        // border: "1px solid black",
        // boxShadow: "2px 2px 0px 2px #000000",
      },
    },
    {
      type: "hard_btn_64",
      style: {
        background: `${props.btncolor}`,
        color: `${props.customButtontextColor}`,
        borderRadius: "64px",
        // border: "1px solid black",
        // boxShadow: "2px 2px 0px 2px #000000",
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

  // Heading Component
  const headingStyle = {
    active:
      "text-[#121212] font-extrabold text-[28px] flex flex-col items-center relative Plus-Jakarta-Sans-font-div",
    inactive: "text-[#121212] text-xl Plus-Jakarta-Sans-font-div",
  };
  const activeHeadingElement = (
    <span className="absolute left-1/2 -translate-x-1/2 top-[37px]">
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
    div: `rounded-t-[500px] rounded-b-[20px] bg-[rgba(0,0,0,0.20)] backdrop-blur-[18px] Plus-Jakarta-Sans-font-div w-[720px] h-[fit-content] min-h-[320px] flex flex-col items-center relative
    ${square ? "rounded-b-none" : "rounded-b-[20px]"}`,
    fullName: "text-[#FFFFFF] font-bold text-[28px]",
    profilePic: "rounded-[140px] border border-[#FFFFFF]",
    jobTitle: "text-xl text-[rgba(255,255,255,0.80)]",
    jobDescription: "text-[#FFFFFF] text-lg",
  };

  // Apps Section
  const appsStyle = {
    noOfApps: 10,
    iconType: "WhiteIcons",
    hoverIconType: "BlackIcons",
    background: `bg-[rgba(0,0,0,0.20)] backdrop-blur-[18px] ${
      square ? "rounded-none" : "rounded-[24px]"
    }`,
    div: "!px-[92px]",
    app: `w-[88px] h-[88px] flex items-center justify-center bg-[#121212] shadow-[4px_4px_0px_0px_rgba(255,255,255,0.60)] hover:cursor-pointer hover:bg-[#FFFFFF] ${
      square ? "rounded-none" : "rounded-full"
    }`,
    arrow: "w-12 h-12 absolute -bottom-8 text-2xl !bg-[#121212] text-white",
  };
  const customLinkStyle = {
    linkMainBg: "bg-[rgba(0,0,0,0.20)] backdrop-blur-[18px] rounded-[20px]",
    linkBg: {
      boxShadow: "4px 4px 0px 0px #121212",
      border: "1px solid #121212",
      borderRadius: "10px",
    },
    linkImg: { border: "none", borderRadius: "5px" },
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
    card: "min-w-[280px] max-w-[280px] h-fit max-h-full bg-white p-2 text-[#121212] flex flex-col item-start gap-4 Plus-Jakarta-Sans-font-div",
    image: `w-[280px] h-[280px] ${square ? "rounded-none" : "rounded-[16px]"}`,
    title: "text-base font-bold",
    description: "text-base break-words",
    price: "text-base font-bold",
  };

  // Services Section
  const serviceStyle = {
    card: `min-w-[280px] max-w-[280px] min-h-[230px] max-h-full p-5 bg-[#FFFFFF] text-[#121212] flex flex-col item-start gap-4 border border-[#121212] shadow-[4px_4px_0px_0px_#121212] mb-1 Plus-Jakarta-Sans-font-div ${
      square ? "rounded-none" : "rounded-[24px]"
    }`,
    image: `w-[72px] h-[72px] ${square ? "rounded-none" : "rounded-[16px]"}`,
    title: "text-base font-bold break-words",
    description: "text-base break-words",
  };

  //Appointments Section
  // const appointmentsStyle = {
  //   div: "Plus-Jakarta-Sans-font-div text-[#121212] font-medium",
  //   heading: "font-bold text-base",
  //   active: {
  //     div: `border border-[#121212] w-[94px] h-[84px] ${
  //       square ? "rounded-none" : "rounded-[16px]"
  //     }`,
  //     header: `bg-[#121212] text-[#FFFFFF] text-sm h-[26px] ${
  //       square ? "rounded-none" : "rounded-t-[16px]"
  //     }`,
  //   },
  //   inactive: {
  //     div: `border border-[rgba(18,18,18,0.50)] w-[94px] h-[84px] ${
  //       square ? "rounded-none" : "rounded-[16px]"
  //     }`,
  //     header: `bg-[rgba(18,18,18,0.50)] text-[#FFFFFF] text-sm h-[26px] ${
  //       square ? "rounded-none" : "rounded-t-[16px]"
  //     }`,
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
      fontWeight: "700",
    },
  };

  // Business Hours Section
  const businessHoursStyle = {
    div: {
      background: "#FFFFFF",
      padding: "24px",
      border: "1px solid #121212",
      boxShadow: "4px 4px 0px 0px #121212",
      fontFamily: "Plus Jakarta Sans",
      color: "#121212",
      borderRadius: props.square ? "0px" : "24px",
    },
    title: {
      fontSize: "18px",
      fontWeight: "700",
    },
    time: {
      fontSize: "16px",
    },
    point: {
      minWidth: "4px",
      minHeight: "4px",
      borderRadius: "50%",
      backgroundColor: "#121212",
      marginRight: "5px",
    },
    star: {
      fill: "transparent",
    },
  };

  // Gallery Section
  const galleryStyle = {
    heading: "text-[32px] font-bold text-[#121212] DM-Sans-font-div mb-[45px]",
    image: `w-[300px] h-[300px] lg:w-[380px] lg:h-[380px] rounded-[20px] bg-[#cccccc]`,
  };

  // Videos Section
  const videosStyle = {
    card: {
      background: "#D9D9D9",
      borderRadius: props.square ? "0px" : "20px",
    },
    title: {
      color: "#121212",
      fontFamily: "Plus Jakarta Sans, sans-serif",
      fontWeight: "500",
    },
  };

  // Resources Section
  const resourceStyle = {
    div: "grid grid-cols-2 gap-5",
    wordlimit: 25,
    card: `flex items-center h-[64px] px-[18px] border border-[#121212] shadow-[4px_4px_0px_0px_#121212] Plus-Jakarta-Sans-font-div hover:shadow-none duration-200 hover:cursor-pointer ${
      square ? "rounded-none" : "rounded-full"
    }`,
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

  // Reviews Section
  const reviewsStyle = {
    card: `text-[#121212] border border-[#121212] mb-1 shadow-[4px_4px_0px_0px_#121212] Plus-Jakarta-Sans-font-div min-w-[381px] max-w-[381px] min-h-full max-h-full flex flex-col gap-4 p-6 ${
      square ? "rounded-none" : "rounded-[24px]"
    }`,
    starColor: "#121212",
    name: "text-base font-bold",
    review: "text-sm",
  };
  const reviewStarDivbg = "#121212";

  // Contact Us Button
  const contactBtnStyle = `flex items-center justify-center gap-2 px-10 h-[80px] bg-[rgba(0,0,0,0.20)] backdrop-blur-[18px] text-[#FFFFFF] text-[16px] font-bold Plus-Jakarta-Sans-font-div border border-black border-solid border-r-[6px] border-b-[6px] hover:border-r-[1px] hover:border-b-[1px] hover:cursor-pointer ${
    square ? "rounded-none" : "rounded-full overflow-hidden"
  }`;
  const innerBtnStyle = {
    btn: "hover:cursor-pointer",
    icon: "text-[#121212] text-xl",
    text: "text-[#121212] text-sm",
  };
  const closeBtnStyle =
    "text-[#FDFFFF] bg-[rgba(0,0,0,0.20)] backdrop-blur-[18px] text-[24px] px-[30px] h-[70px]";

  // Modals Style
  const modalStyle = `!text-[#121212] ${
    square ? "!rounded-none" : "!rounded-[20px]"
  } Plus-Jakarta-Sans-font-div`;

  // Toast Style
  const toastStyle = {
    bg: "#FFFFFF",
    border: "1px solid #121212",
    color: "#121212",
    fontFamily: "Plus Jakarta Sans, sans-serif",
    boxShadow: "0px 6px 16px 0px rgba(115, 108, 237, 0.10)",
    borderRadius: props.square ? "0px" : "16px",
  };

  // Bottom Section
  const bottomStyle = `!bg-[#121212] !text-[#FFFFFF] !mb-0 Plus-Jakarta-Sans-font-div ${
    square ? "!rounded-none" : "!rounded-t-[16px]"
  }`;

  return (
    <CustomBase2
      //data
      data={props.data}
      mainbg={props.mainbg}
      disable={props.disable}
      //styling
      btntype="2"
      customBtn={customBtn}
      customTextColor={props.customTextColor}
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
    />
  );
};

const defaultProps = {
  square: true,
};

export default CustomTemplate2;
