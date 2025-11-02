import React, { useEffect, useState } from "react";
import "../../Utils/font.css";
import logo from "../../Image/tapopmobile.png";
import centerlogo from "../../Images/tapopLogo.png";
import Image from "next/image";
import localFont from "@next/font/local";
import "./customCardDiv.css";

import cd5_5 from "./cardFrontImages/cd5_5.png";
import cd0_5 from "./cardFrontImages/cd0_5.png";
import cd16_5 from "./cardFrontImages/cd16_5.png";
import cd7_5 from "./cardFrontImages/cd7_5.png";
import cd6_5 from "./cardFrontImages/cd6_5.png";
import cd4_5 from "./cardFrontImages/cd4_5.png";
import cd8_5 from "./cardFrontImages/cd8_5.png";
import cd11_5 from "./cardFrontImages/cd11_5.png";
import cd13_5 from "./cardFrontImages/cd13_5.png";
import cd14_5 from "./cardFrontImages/cd14_5.png";
import cd17_5 from "./cardFrontImages/cd17_5.png";
import cd18_5 from "./cardFrontImages/cd18_5.png";
import cd19_5 from "./cardFrontImages/cd19_5.png";
import cd20_5 from "./cardFrontImages/cd20_5.png";
import cd9_5 from "./cardFrontImages/cd9_5.png";
import cd10_5 from "./cardFrontImages/cd10_5.png";
import cd12_5 from "./cardFrontImages/cd12_5.png";
import cd3_5 from "./cardFrontImages/cd3_5.png";
import cd21_5 from "./cardFrontImages/cd21_5.png";
import cd22_5 from "./cardFrontImages/cd22_5.png";
import cd23_5 from "./cardFrontImages/cd23_5.png";
import cd25_5 from "./cardFrontImages/cd25_5.png";
import cd26_5 from "./cardFrontImages/cd26_5.png";
import cd27_5 from "./cardFrontImages/cd27_5.png";
import gc1_5 from "./cardFrontImages/gc1_5.png";
import gc14_5 from "./cardFrontImages/gc14_5.png";
import gc21_5 from "./cardFrontImages/gc21_5.png";
import mcd22_5 from "./cardFrontImages/mcd22_5.png";
import gc23_5 from "./cardFrontImages/gc23_5.png";
import mcd24_5 from "./cardFrontImages/mcd24_5.png";
import gc15_5 from "./cardFrontImages/gc15_5.png";
import cd25 from "./cardFrontImages/cd25.png";

function useDefaultProps(props) {
  let newProps = { ...props };
  Object.keys(newProps).forEach((key) =>
    newProps[key] === undefined ? delete newProps[key] : {}
  );
  return { ...defaultProps, ...newProps };
}
const CustomizedCardFront = (props) => {
  props = useDefaultProps(props);
  const data = props.data;
  const product = props.product;

  const width = props.width
    ? props.width
    : window.screen.width > 768
    ? "324px"
    : "232px";
  const height = props.height
    ? props.height
    : window.screen.width > 768
    ? "204px"
    : "133px";
  const blurdiv = props.blurdiv
    ? props.blurdiv
    : window.screen.width > 768
    ? "135px"
    : "90px";

  let fontColor = product?.color;
  if (props.color === "silverImages") {
    fontColor = "#000000";
  } else if (props.color === "goldImages") {
    fontColor = "#000000";
  } else if (props.color === "blackImages") {
    fontColor = "#FFFFFF";
  } else if (props.color === "roseImages") {
    fontColor = "#FFFFFF";
  }

  const categoryStateMap = {
    "Cat A": {
      cardHeight: "324px",
      cardWidth: "204px",
      overAllContX: "center",
      overAllContY: "center",
      minContHeight: "134px",
      minContWidth: "164px",
      logoPos: "center",
      contPos: "center",
      paddingX: "20px",
      nameMinHeight: "32px",
      logoHeight: "48px",
      gapLC: "32px",
      textAlign: "center",
      nameFontSize: "24px",
      designationFontSize: "14px",
      innerPadding: "0px",
      topMargin: "0px",
      leftMargin: "0px",
      contGap: "8px",
      logoTop: "0px",
    },
    "Cat B": {
      cardHeight: "324px",
      cardWidth: "204px",
      overAllContX: "between",
      overAllContY: "center",
      minContHeight: "324px",
      minContWidth: "164px",
      logoPos: "center",
      contPos: "center",
      paddingX: "20px",
      nameMinHeight: "32px",
      logoHeight: "48px",
      gapLC: "0px",
      textAlign: "center",
      nameFontSize: "30px",
      designationFontSize: "15px",
      innerPadding: "0px",
      topMargin: "0px",
      leftMargin: "0px",
      contGap: "8px",
      logoTop: "36px",
    },
    "Cat C": {
      cardHeight: "324px",
      cardWidth: "204px",
      overAllContX: "center",
      overAllContY: "center",
      minContHeight: "136px",
      minContWidth: "170px",
      logoPos: "start",
      contPos: "start",
      paddingX: "0px",
      nameMinHeight: "32px",
      logoHeight: "48px",
      gapLC: "6px",
      textAlign: "start",
      nameFontSize: "24px",
      designationFontSize: "15px",
      innerPadding: "12px",
      topMargin: "115px",
      leftMargin: "12px",
      contGap: "8px",
      logoTop: "0px",
    },
    "Cat D": {
      cardWidth: "324px",
      cardHeight: "204px",
      overAllContX: "center",
      overAllContY: "center",
      minContHeight: "122px",
      minContWidth: "268px",
      logoPos: "center",
      contPos: "center",
      paddingX: "28px",
      nameMinHeight: "32px",
      logoHeight: "48px",
      gapLC: "28px",
      textAlign: "center",
      nameFontSize: "23px",
      designationFontSize: "16px",
      innerPadding: "0px",
      topMargin: "0px",
      leftMargin: "0px",
      contGap: "8px",
      logoTop: "0px",
    },
    "Cat E": {
      cardWidth: "324px",
      cardHeight: "204px",
      overAllContX: "start",
      overAllContY: "center",
      minContHeight: "119px",
      minContWidth: "172px",
      logoPos: "center",
      contPos: "start",
      paddingX: "24px",
      nameMinHeight: "32px",
      logoHeight: "48px",
      gapLC: "14px",
      textAlign: "start",
      nameFontSize: "29px",
      designationFontSize: "14px",
      innerPadding: "0px",
      topMargin: "0px",
      leftMargin: "0px",
      contGap: "8px",
      logoTop: "0px",
    },
    "Cat F": {
      cardWidth: "324px",
      cardHeight: "204px",
      overAllContX: "end",
      overAllContY: "center",
      minContHeight: "136px",
      minContWidth: "172px",
      logoPos: "center",
      contPos: "end",
      paddingX: "28px",
      nameMinHeight: "32px",
      logoHeight: "48px",
      gapLC: "14px",
      textAlign: "end",
      nameFontSize: "29px",
      designationFontSize: "14px",
      innerPadding: "0px",
      topMargin: "14.5px",
      leftMargin: "0px",
      contGap: "8px",
      logoTop: "0px",
    },
  };

  const defaultCategory = {
    cardHeight: "324px",
    cardWidth: "204px",
    overAllContX: "center",
    overAllContY: "center",
    minContHeight: "134px",
    minContWidth: "164px",
    logoPos: "center",
    contPos: "center",
    paddingX: "20px",
    nameMinHeight: "32px",
    logoHeight: "48px",
    gapLC: "32px",
    textAlign: "center",
    nameFontSize: "24px",
    designationFontSize: "14px",
    innerPadding: "0px",
    topMargin: "0px",
    leftMargin: "0px",
    contGap: "8px",
    logoTop: "0px",
  };

  const [cat, setCat] = useState(
    categoryStateMap[product.category] || defaultCategory
  );
  const fontStyle = product?.nameFontStyle;
  // console.log(product?.nameFontStyle);
  const designationStyle = product?.designationFontStyle;

  // const [frontImage, setFrontImage] = useState();

  // useEffect(() => {
  //   if (
  //     props.newFrontImage ===
  //     "https://firebasestorage.googleapis.com/v0/b/qviqaccess.appspot.com/o/images%2F1711526796925-Cpq0NEZWEy-Front.png?alt=media&token=056a7914-888c-4784-8677-fbeb50fe580d"
  //   ) {
  //     setFrontImage(cd5_5);
  //   } else if (
  //     product?.[props.color][3] ===
  //     "https://firebasestorage.googleapis.com/v0/b/qviqaccess.appspot.com/o/images%2Fcd0_5.png?alt=media&token=a8863e3b-9888-4ec9-a7d1-f78db24e0ea1"
  //   ) {
  //     setFrontImage(cd0_5);
  //   }
  // }, []);

  const [fontSize, setFontSize] = useState(cat.nameFontSize);
  useEffect(() => {
    setFontSize(props.fontSize);
  }, [props.fontSize]);

  return (
    <div
      className="customCardDiv"
      // className="card"
      ref={props.ref}
      style={{
        height: `${props.horizontal ? "204px" : "324px"}`,
        width: `${props.horizontal ? "324px" : "204px"}`,
      }}
    >
      {
        data.logo !== "" && (
          <Image
            alt="logo"
            className="logo"
            height={48}
            width={48}
            src={props.logoData}
            style={props.logoStyle}
          />
        )
        // : (
        //   <div style={props.logoStyle} className="h-[48px] w-[48]">
        //     <svg
        //       width="40"
        //       height="40"
        //       viewBox="0 0 40 40"
        //       fill={fontColor}
        //       xmlns="http://www.w3.org/2000/svg"
        //     >
        //       <path
        //         d="M22.3831 11.9243C24.2952 11.9243 25.8452 10.3743 25.8452 8.46217C25.8452 6.55006 24.2952 5 22.3831 5C20.471 5 18.9209 6.55006 18.9209 8.46217C18.9209 10.3743 20.471 11.9243 22.3831 11.9243Z"
        //         fill={fontColor}
        //       />
        //       <path
        //         d="M15.447 34.2427L19.0845 26.6139C19.0933 26.5955 19.0973 26.5752 19.0961 26.5548C19.0949 26.5344 19.0885 26.5146 19.0776 26.4974C19.0667 26.4801 19.0516 26.4659 19.0337 26.456C19.0158 26.4461 18.9957 26.441 18.9753 26.441H14.6103C14.5136 26.441 14.4182 26.4179 14.332 26.3738C14.2459 26.3296 14.1715 26.2657 14.115 26.1871C14.0585 26.1086 14.0214 26.0177 14.0069 25.922C13.9924 25.8263 14.0008 25.7286 14.0315 25.6368L18.2189 13.1312C18.2366 13.0786 18.266 13.0307 18.305 12.9912C18.344 12.9517 18.3915 12.9215 18.4438 12.9031C18.4962 12.8846 18.552 12.8784 18.6072 12.8847C18.6623 12.8911 18.7153 12.9099 18.762 12.9398C19.8459 13.6245 21.1019 13.9875 22.3839 13.9866C23.049 13.987 23.7105 13.8882 24.3464 13.6935C24.6791 13.5918 24.9558 13.9581 24.7616 14.2461L20.4021 20.7149C20.3899 20.7331 20.3827 20.7543 20.3816 20.7762C20.3804 20.7981 20.3852 20.82 20.3955 20.8393C20.4058 20.8587 20.4212 20.8749 20.44 20.8863C20.4588 20.8976 20.4804 20.9035 20.5023 20.9035H25.3893C25.5038 20.9034 25.6159 20.9355 25.713 20.9961C25.81 21.0567 25.8881 21.1434 25.9383 21.2462C25.9884 21.3491 26.0086 21.4639 25.9966 21.5777C25.9846 21.6915 25.9408 21.7996 25.8703 21.8897L15.9593 34.5601C15.7347 34.8454 15.2909 34.5699 15.447 34.2427Z"
        //         fill={fontColor}
        //       />
        //     </svg>
        //   </div>
        // )
      }

      <div className="content" style={props.contentStyle}>
        <div className="name" style={props.userNameStyle}>
          {data.name}
        </div>
        <div className="designation" style={props.designationStyle}>
          {data.designation}
        </div>
      </div>

      {/* <div className="absolute rounded-[12px] overflow-hidden"> */}
      <Image
        alt="card front"
        className="cardFront"
        src={props.newFrontImage}
        height={props.horizontal ? 204 : 324}
        width={props.horizontal ? 324 : 204}
      />

      {/* <Image
                width={parseInt(cat.cardWidth)}
                height={parseInt(cat.cardHeight)}
                src={product?.[props.color][3]}
              /> */}
      {/* </div> */}

      {/* <div
        className="absolute h-full w-full"
        style={{
          display: "flex",
          alignItems: cat?.overAllContY,
          justifyContent: cat?.overAllContX,
          padding: cat.paddingX,
        }}
      >
        <div
          className="flex justify-center items-center"
          style={{ width: cat.minContWidth, height: cat.minContHeight }}
        >
          {product.material === "metal" &&
          product.material === "pvc" &&
          !product.hasLogo ? (
            <div>
              <div className="w-full h-full flex justify-center ">
                <div
                  style={
                    {
                      // position: "absolute",
                      // display: "flex",
                      // flexDirection: "column",
                      // gap: "2.5rem",
                      // width: cat ? cat.contWidth : "auto",
                      // height: "54px",
                      // top: cat ? cat.contMTop : "auto",
                      // left: cat ? cat.contMLeft : "auto",
                      // justifyContent: cat.isStartLogo
                      //   ? "flex-start"
                      //   : cat.isEndLogo
                      //   ? "flex-end"
                      //   : "center",
                      // alignItems: cat.isStartLogo
                      //   ? "flex-start"
                      //   : cat.isEndLogo
                      //   ? "flex-end"
                      //   : "center",
                    }
                  }
                >
                  <div className="flex flex-col ">
                    <div
                      className=" text-xs md:text-lg"
                      style={{
                        fontFamily: fontStyle,
                        color: fontColor,
                        fontSize: data.name.length < 15 ? cat.fontSize : "22px",
                      }}
                    >
                      {data.name}
                    </div>
                    <div
                      className={` text-[10px] md:text-sm`}
                      style={{
                        fontFamily: designationStyle,
                        color: fontColor,
                        fontSize: cat.designationFontSize,
                      }}
                    >
                      {data.designation}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              {!data.centerlogo ? (
                <div
                  style={{
                    gap: cat.gapLC,
                    padding: cat.innerPadding,
                    marginTop: cat.topMargin,
                    marginLeft: cat.leftMargin,
                    width: cat.minContWidth,
                    height: cat.minContHeight,
                    alignItems: cat?.overAllContY,
                    justifyContent: cat?.overAllContX,
                  }}
                  className="w-full flex flex-col justify-between"
                >
                  {product.hasLogo && (
                    <div
                      className="min-w-[172px]"
                      style={{
                        marginTop: cat.logoTop,
                        height: cat.logoHeight,
                        display: "flex",
                        justifyContent: cat.logoPos,
                        alignItems: cat.logoPos,
                      }}
                    >
                      {data.logo !== "" ? (
                        <Image
                          // src={data.logo}
                          src={props.logoData}
                          alt=""
                          className="h-[48px] z-30 "
                          width={48}
                          height={48}
                        />
                      ) : (
                        <svg
                          width="40"
                          height="40"
                          viewBox="0 0 40 40"
                          fill={fontColor}
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M22.3831 11.9243C24.2952 11.9243 25.8452 10.3743 25.8452 8.46217C25.8452 6.55006 24.2952 5 22.3831 5C20.471 5 18.9209 6.55006 18.9209 8.46217C18.9209 10.3743 20.471 11.9243 22.3831 11.9243Z"
                            fill={fontColor}
                          />
                          <path
                            d="M15.447 34.2427L19.0845 26.6139C19.0933 26.5955 19.0973 26.5752 19.0961 26.5548C19.0949 26.5344 19.0885 26.5146 19.0776 26.4974C19.0667 26.4801 19.0516 26.4659 19.0337 26.456C19.0158 26.4461 18.9957 26.441 18.9753 26.441H14.6103C14.5136 26.441 14.4182 26.4179 14.332 26.3738C14.2459 26.3296 14.1715 26.2657 14.115 26.1871C14.0585 26.1086 14.0214 26.0177 14.0069 25.922C13.9924 25.8263 14.0008 25.7286 14.0315 25.6368L18.2189 13.1312C18.2366 13.0786 18.266 13.0307 18.305 12.9912C18.344 12.9517 18.3915 12.9215 18.4438 12.9031C18.4962 12.8846 18.552 12.8784 18.6072 12.8847C18.6623 12.8911 18.7153 12.9099 18.762 12.9398C19.8459 13.6245 21.1019 13.9875 22.3839 13.9866C23.049 13.987 23.7105 13.8882 24.3464 13.6935C24.6791 13.5918 24.9558 13.9581 24.7616 14.2461L20.4021 20.7149C20.3899 20.7331 20.3827 20.7543 20.3816 20.7762C20.3804 20.7981 20.3852 20.82 20.3955 20.8393C20.4058 20.8587 20.4212 20.8749 20.44 20.8863C20.4588 20.8976 20.4804 20.9035 20.5023 20.9035H25.3893C25.5038 20.9034 25.6159 20.9355 25.713 20.9961C25.81 21.0567 25.8881 21.1434 25.9383 21.2462C25.9884 21.3491 26.0086 21.4639 25.9966 21.5777C25.9846 21.6915 25.9408 21.7996 25.8703 21.8897L15.9593 34.5601C15.7347 34.8454 15.2909 34.5699 15.447 34.2427Z"
                            fill={fontColor}
                          />
                        </svg>
                      )}
                    </div>
                  )}
                  <div
                    className=" min-w-[172px]"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: cat.contPos,
                      alignItems: cat.contPos,
                      textAlign: cat.textAlign,
                      width: product.category === "Cat B" && "204px",
                      height: product.category === "Cat B" && "111px",
                    }}
                  >
                    <div
                      className="flex flex-col  "
                      style={{
                        gap: cat.contGap,
                      }}
                    >
                      <div
                        className={` text-xs md:text-lg `}
                        style={{
                          fontFamily: fontStyle,
                          color: fontColor,
                          textAlign: cat.textAlign,
                          fontSize: `${
                            props.fontSize ? fontSize : cat.nameFontSize
                          }`,
                        }}
                      >
                        {data.name}
                      </div>
                      <div
                        className={` text-[10px] md:text-sm`}
                        style={{
                          fontFamily: designationStyle,
                          color: fontColor,
                          fontSize: cat.designationFontSize,
                        }}
                      >
                        {data.designation}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[45px] h-[12px] md:w-[90px] md:h-[24px]">
                  <img src={centerlogo} alt="" />
                </div>
              )}
            </div>
          )}
        </div>
      </div> */}
    </div>
  );
};

const defaultProps = {
  data: {
    cardColor: "#1A1A1A",
    name: "Your Name",
    designation: "Your Designation",
    fontStyle: "Raleway",
    designationStyle: "Raleway",
    fontColor: "#FFFFFF",
    designationColor: "#d7be57",
    logo: "",
    centerlogo: false,
  },
};

export default CustomizedCardFront;
