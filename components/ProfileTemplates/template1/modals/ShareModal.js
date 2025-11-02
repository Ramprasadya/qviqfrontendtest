import React, { useCallback, useEffect, useRef, useState } from "react";
import { HiChevronDown, HiChevronUp, HiOutlineX } from "react-icons/hi";
import line from "../../../Images/Line.png";
import Tapop from "../../images/logo2.png";
import axios from "axios";
import QrCodeWithLogo from "qrcode-with-logos";
import { FaFacebookMessenger, FaRegCopy } from "react-icons/fa";
import {
  FacebookIcon,
  LinkedinIcon,
  TelegramIcon,
  PinterestIcon,
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  PinterestShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  WhatsappIcon,
  XIcon,
  EmailShareButton,
  EmailIcon,
} from "react-share";
import Button from "../../ProfileComponents/Button/Button";
import { serverUrl } from "../../../../config";
import { clientUrl } from "../../../../config";
import Toast from "../../../UiComponents/Toast";
import Image from "next/image";
import NewModal from "@/components/UiComponents/NewModal/NewModal";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import InputFieldCC from "@/components/UiComponents/countryCodeField";
import LeftRightScrollBtn from "@/components/Utils/LeftRightScrollBtn";
import { useRouter } from "next/navigation";
import Link from "next/link";
import BgImg from "./ShareImg.svg";

import "../../../qr.css";
import QRCodeStyling from "qr-code-styling";
import MobileNumberField from "@/components/UiComponents/MobileNumberField";
import { getCountryCallingCode } from "libphonenumber-js";
import flags from "react-phone-number-input/flags";
import {
  isIOS,
  isAndroid,
  isDesktop,
  isChrome,
  isFirefox,
  isSafari,
} from "react-device-detect";

function useDefaultProps(props) {
  let newProps = { ...props };
  Object.keys(newProps).forEach((key) =>
    newProps[key] === undefined ? delete newProps[key] : {}
  );
  return { ...defaultProps, ...newProps };
}

const ShareOnMessengerButton = ({ message }) => {
  const encodedMessage = encodeURIComponent(message);
  const messengerUrl = `https://www.facebook.com/dialog/send?link=&app_id=YOUR_APP_ID&redirect_uri=YOUR_REDIRECT_URI&quote=${encodedMessage}`;

  const handleClick = () => {
    window.open(messengerUrl, "_blank");
  };

  return <button onClick={handleClick}>Share on Messenger</button>;
};

export default function ShareModal({
  setShowModal1,
  setQRdownload,
  dummyState,
  type,
  usedIn,
  ...props
}) {
  props = useDefaultProps(props);

  const profile = props.username;
  const firstName = props.firstName;
  const profileImage = props.profileImage;
  const [qr, setQr] = useState(true);
  const [other, setOther] = useState(false);
  const [shareVia, setshareVia] = useState(true);
  const [share, setshare] = useState(true);
  // const [Email, setemail] = useState(false);
  // const [Whatsapp, setWhatsapp] = useState(false);
  const [color, setbackendColor] = useState("#000000");
  const [img, setImage] = useState(Tapop?.src);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [openQR, setOpenQR] = useState(false);
  const qrCodeRef = useRef(null);
  const navigate = useRouter();

  // const getQRcode = async () => {
  //   try {
  //     const res = await axios.get(`${serverUrl}/person/get/${profile}`);
  //     if (res.data == null) {
  //     } else if (res.data === "error") {
  //     } else {
  //       setbackendColor(res.data[0].colour);
  //       if (res.data[0].image != "") {
  //         setImage(res.data[0].image);
  //       }
  //     }
  //   } catch (error) {
  //     //console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   getQRcode();
  // }, []);
  // const showQrCodeFunction = () => {
  //   const qrcode = new QrCodeWithLogo({
  //     content: `${clientUrl}/qrscan/${type}/${profile}`,
  //     width: 400,
  //     image: qrCodeRef.current,
  //     logo: {
  //       src: img,
  //       logoSize: 0.25,
  //       bgColor: "#FFFFFF",
  //       borderColor: "#FFFFFF",
  //       borderSize: 0.06,
  //       borderRadius: 0,
  //     },
  //     nodeQrCodeOptions: {
  //       color: { dark: color },
  //       errorCorrectionLevel: "Q",
  //       margin: 3,
  //     },
  //   });

  //   // qrcode.toImage().then(() => {});
  // };
  // useEffect(() => {
  //   if (qrCodeRef && qrCodeRef.current && type !== "") {
  //     showQrCodeFunction();
  //   }
  // }, [qrCodeRef, color, openQR, img, type, qr]);
  // const downloadQR = () => {
  //   const qrcode = new QrCodeWithLogo({
  //     content: `${clientUrl}/qrscan/${type}/${profile}`,
  //     width: 720,
  //     logo: {
  //       src: img,
  //       logoSize: 0.22,
  //       bgColor: "#FFFFFF",
  //       borderColor: "#FFFFFF",
  //       borderSize: 0.06,
  //       borderRadius: 0,
  //     },
  //     nodeQrCodeOptions: {
  //       color: { dark: color },
  //       errorCorrectionLevel: "Q",
  //       margin: 3,
  //     },
  //   });

  //   qrcode.downloadImage(`${profile} Qviq QR`);
  //   setToastMessage("QR code downloaded successfully");
  //   setShowToast(true);
  //   setTimeout(() => {
  //     setShowToast(false);
  //     setToastMessage("");
  //   }, 1500);
  //   // qrcode.toImage().then(() => {
  //   // });
  // };

  const [countryCode, setCountryCode] = useState("91");
  const [phoneNumber, setPhoneNumber] = useState("");
  const sharelink = `https://${profile}.qviq.io`;

  // const handlePhoneNumberChange = (e) => {
  //   const inputValue = e.target.value;
  //   setPhoneNumber(inputValue);
  //   //console.log(e.target.value);
  // };
  const [email, setEmail] = useState("");

  const handleSendClickEmail = () => {
    if (email) {
      const subject = "My Qviq";
      const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(sharelink)}`;
      window.location.href = mailtoLink;
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const SocialHandleRef = useRef(null);

  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // ---------------------------------

  const [QRcolor, setQRcolor] = useState("#000000");
  const [QRlogo, setQRlogo] = useState(Tapop?.src);
  const [urlData, setUrlData] = useState(
    `${clientUrl}/qrscan/${type}/${profile}`
  );

  const qrCodeOptions = {
    width: 720,
    height: 720,
    margin: 40,
    dotsOptions: {
      color: QRcolor,
      type: "rounded",
    },
    imageOptions: {
      hideBackgroundDots: true,
      crossOrigin: "anonymous",
      margin: 20,
      imageSize: 0.5,
    },
    backgroundOptions: {
      round: 0.04,
      color: "#fff",
    },
    data: urlData,
    image: QRlogo,
  };

  const qrCode = new QRCodeStyling(qrCodeOptions);

  const QRref = useRef(null);

  // To get the person data from backend
  const getQRcode = async () => {
    try {
      const res = await axios.get(`${serverUrl}/person/get/${profile}`);

      //console.log(res.data[0].colour);

      if (res.data[0].image != "" && res.data[0].colour != "") {
        qrCode.append(QRref.current);
      }

      if (res.data == null) {
        // navigate.push('/nodata')
      } else if (res.data === "error") {
        //console.log("there was an error");
      } else {
        setbackendColor(res.data[0].colour);
        setQRcolor(res.data[0].colour);
        if (res.data[0].image != "") {
          setQRlogo(res.data[0].image);
        }
      }
    } catch (error) {
      //console.log(error);
    }
  };

  useEffect(() => {
    qrCode.append(QRref.current);
  }, []);

  useEffect(() => {
    qrCode.append(QRref.current);
    //console.log(urlData, QRlogo, QRcolor);
  }, [dummyState, QRcolor, QRlogo, urlData]);

  useEffect(() => {
    qrCode.update({
      data: urlData,
      image: QRlogo,
      dotsOptions: {
        color: QRcolor,
      },
    });
  }, [QRcolor, QRlogo, urlData]);

  const onDownloadClick = () => {
    qrCode.download({
      extension: "png",
    });
  };

  //  Redendering the component at once
  useEffect(() => {
    getQRcode();
  }, [dummyState]);

  // -------------------------

  const [selectedCountry, setSelectedCountry] = useState("IN");
  const [mobileNumber, setMobileNumber] = useState("");
  const [selectedCode, setSelectedCode] = useState(91);
  const [errorMessage, setErrorMessage] = useState("");

  const renderFlag = () => {
    const CountryFlag = flags[selectedCountry];
    return (
      <CountryFlag className="react-phone-number-input__icon h-[18px] w-[36px]" />
    );
  };

  const handleCodeChange = (country) => {
    setSelectedCountry(country.isoCode);
    setSelectedCode(getCountryCallingCode(country.isoCode));
  };

  const handlePhoneNumberChange = (event) => {
    const newPhoneNumber = event.target.value;
    const numericRegex = /^[0-9]*$/;

    if (numericRegex.test(newPhoneNumber)) {
      setMobileNumber(event.target.value);
      setErrorMessage("");
    } else {
      setErrorMessage("Please enter a valid value");
    }
  };

  const handleSendClick = () => {
    if (mobileNumber) {
      const whatsappLink = `https://api.whatsapp.com/send?phone=${selectedCode}${mobileNumber}&text=${encodeURIComponent(
        `Please check this qviqsite ${sharelink}`
      )}`;
      window.open(whatsappLink, "_blank");
    }
  };

  const handleEscape = useCallback((event) => {
    if (event.key === "Escape") {
      setShowModal1(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleEscape, false);

    return () => {
      document.removeEventListener("keydown", handleEscape, false);
    };
  }, [handleEscape]);

  return (
    <div className="container" style={{ zIndex: "998" }}>
      <div
        className="modal-wrapper bg-[#00000054] backdrop-blur-[20px]"
        style={{ zIndex: "998" }}
      ></div>
      <div
        className={`flex flex-col md:w-[600px] w-full h-fit max-h-[85vh] px-[15px] xsm:px-[20px] sm:px-[30px] pt-[10px] xsm:pt-[20px] pb-[20px] bg-white fixed bottom-0 md:bottom-1/2 md:translate-y-1/2 left-1/2 -translate-x-1/2 rounded-t-[20px] rounded-b-none md:rounded-[20px] overflow-scroll ${props.modalStyle}`}
        style={{ zIndex: "998" }}
      >
        <div className="flex justify-between items-center">
          <p className="text-[20px] sm:text-[28px] font-[600]">Share</p>

          <HiOutlineX
            className="text-[20px] sm:text-[28px]"
            style={{ cursor: "pointer", padding: "0" }}
            onClick={() => setShowModal1(false)}
          />
        </div>

        {share && (
          <div
            className={`max-h-[80vh] h-fit overflow-y-scroll overflow-x-hidden pt-[10px] xsm:pt-[20px] ${
              isIOS ? "pb-[60px]" : "pb-[30px]"
            } sm:pb-[20px]`}
          >
            <div className="mb-[24px] sm:mb-[32px] h-[120px] xsm:h-[150px] md:h-[200px] bg-[#121212] rounded-[10px] sm:rounded-[20px] flex flex-row items-center justify-center relative z-[0]">
              <Image
                alt="profile"
                src={BgImg}
                height={326}
                width={720}
                className="absolute rotate-[5deg] sm:rotate-[0deg] md:rotate-[2deg] scale-[130%] sm:scale-[100%] md:scale-[120%] top-[-5%] sm:top-[-50%] md:top-[-22%] left-[16%] z-[0]"
              />

              <div
                className="w-1/3 h-full flex gap-[4px] flex-col justify-center items-center z-[1]"
                onClick={() => setQRdownload(true)}
              >
                <div
                  className="qrDiv h-[52px] w-[52px] md:w-[100px] md:h-[100px] xsm:h-[70px] xsm:w-[70px] cursor-pointer rounded-[4px] mt-[15px]"
                  ref={QRref}
                />

                <p className="text-white text-[8px] md:text-[16px] xsm:text-[11px] font-[400]">
                  Click to open
                </p>
              </div>

              <div className="w-1/3 h-full flex flex-col justify-center items-center overflow-hidden z-[1]">
                <img
                  className="object-cover border-[3px] md:border-[6px] border-white rounded-full md:w-[150px] md:h-[150px] xsm:w-[100px] xsm:h-[100px] w-[60px] h-[60px]"
                  src={profileImage}
                  alt="profile"
                />
              </div>
              <div className="text-white w-1/3 h-full flex flex-col items-center justify-center gap-[8px] md:gap-[12px] break-all pr-[10px] z-[1]">
                <p className="text-[12px] md:text-[20px] xsm:text-[14px] text-center  font-[600]">
                  {profile}.qviq.io <br />
                </p>

                <p className="text-[12px] xsm:text-[14px] md:text-[16px] text-center font-[500]">
                  {firstName}
                </p>
              </div>
            </div>

            <div className="flex flex-row justify-around w-full f-fit z-[10] relative">
              <p
                className={`md:text-[20px] xsm:text-[16px] text-[14px] pb-[8px] xsm:pb-[12px] md:pb-[16px] text-center w-[50%] text-[${
                  shareVia ? "#121212" : "#908A8A"
                }] font-[${shareVia ? "500" : "400"}]`}
                // pb-[8px] xsm:pb-[14px] md:pb-[16px]
                onClick={() => {
                  // setQr(true);
                  setOther(false);
                  // setemail(false);
                  // setWhatsapp(false);
                  setshareVia(true);
                }}
                style={{
                  cursor: "pointer",
                  borderBottom: `${
                    shareVia ? "3px solid #121212" : "3px solid #908A8A"
                  }`,
                }}
              >
                Share via
              </p>
              <p
                className={`md:text-[20px] xsm:text-[16px] text-[14px] pb-[8px] xsm:pb-[12px] md:pb-[16px] text-center  w-[50%] text-[${
                  other ? "#121212" : "#908A8A"
                }] font-[${other ? "500" : "400"}]`}
                style={{
                  cursor: "pointer",
                  borderBottom: `${
                    other ? "3px solid #121212" : "3px solid #908A8A"
                  }`,
                }}
                onClick={() => {
                  // setQr(false);
                  setOther(true);
                  // setemail(false);
                  // setWhatsapp(false);
                  setshareVia(false);
                }}
              >
                WhatsApp
              </p>
            </div>

            {other && (
              <div className="xsm:mb-[12px] md:mb-[32px] mb-[12px]">
                <h1 className="mt-[24px] md:text-[20px] xsm:text-[16px] text-[12px] font-medium">
                  Whatsapp{" "}
                </h1>{" "}
                {
                  <div className="mt-[12px]">
                    <div className="mb-[8px] md:text-[16px] xsm:text-[14px] text-[10px] text-[#666666] font-medium ">
                      Whatsapp Mobile No.
                    </div>
                    <div className="flex gap-[12px] pr-[5px] items-center">
                      {/* <InputFieldCC
                        noFlag={windowWidth < 400 ? true : false}
                        customStyle={`!bg-[#f5f5f5] ${
                          props.square ? "rounded-[0px]" : "rounded-[8px]"
                        }`}
                        customFlag={`!border-none !text-[10px] xsm:!h-[41px] !h-[30px] md:!h-[48px] !w-[50px] xsm:!w-fit xsm:!text-[15px] !py-auto `}
                        customNumberHolder={`!border-l-2 !border-r-0 !border-t-0 md:!text-[16px] !text-[12px] xsm:!text-[14px] !border-b-0 !bg-[#f5f5f5] !w-full md:!h-[48px] xsm:!h-[41px] !h-[30px] `}
                        type="mobile"
                        name="mobile"
                        placeholder="Enter mobile no"
                        value={phoneNumber}
                        onChange={handlePhoneNumberChange}
                      /> */}

                      <div className="mobile-number-div w-full flex flex-col">
                        <MobileNumberField
                          mobileNumber={mobileNumber}
                          setMobileNumber={setMobileNumber}
                          handlePhoneNumberChange={handlePhoneNumberChange}
                          codeChange={handleCodeChange}
                          flagChange={renderFlag}
                          code={selectedCode}
                          // setSelectedCode={setSelectedCode}
                          country={selectedCountry}
                          setSelectedCountry={setSelectedCountry}
                        />
                      </div>

                      <div className="flex justify-center items-center ">
                        {props.usedIn === "outsideTemplate" ? (
                          <button
                            className="py-[2px] xsm:h-[41px] xsm:w-[81px] md:h-[48px] md:w-[162px] h-[30px] w-[60px] xsm:text-[14px] text-[10px] sm:py-[8px] sm:px-[5px] md:py-[8px] md:px-[6px] px-[2px] rounded-none border hover:!shadow-none active:scale-[90%]"
                            style={{
                              boxShadow: "black 3px 3px 0px 1px",
                              border: "1px solid black",
                              transition: "300ms",
                            }}
                            onClick={handleSendClick}
                          >
                            Send
                          </button>
                        ) : (
                          <Button
                            // style={props.buttonStyle}
                            style={` ${props.buttonStyle} !py-[2px] xsm:!h-[41px] xsm:!w-[81px] xsm:!text-[14px] md:!text-[16px] md:!h-[48px] md:!w-[162px] !h-[30px] !w-[60px] !text-[10px] sm:!py-[8px] sm:!px-[5px] md:!py-[8px] md:!px-[6px] !px-[2px] active:scale-[90%]`}
                            // style={{
                            //   boxShadow: "black 3px 3px 0px 1px",
                            //   border: "1px solid black",
                            //   transition: "300ms",
                            // }}
                            text={"Send"}
                            onClick={handleSendClick}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                }
                <h1 className="mt-[24px] md:text-[20px] xsm:text-[16px] text-[12px] font-medium">
                  Email{" "}
                </h1>{" "}
                {/* {Email ? <HiChevronUp /> : <HiChevronDown />} */}
                {/* </div> */}
                {
                  <div className="mt-[12px]">
                    <div className="md:text-[16px] xsm:text-[14px] text-[10px] text-[#666666] mb-[8px] font-medium">
                      Enter Email address
                    </div>

                    <div className="flex justify-between  gap-[12px] pr-[5px] items-center">
                      <input
                        className={`mobile-number-div xsm:!h-[41px] md:h-[48px] w-full focus:border-[2px] outline-none  ${
                          props.square ? "rounded-[0px]" : "rounded-[8px]"
                        } p-2 text-[12px] xsm:text-[14px] md:!text-[16px] text-[#121212]`}
                        placeholder="Enter Your Email"
                        value={email}
                        onChange={handleEmailChange}
                      />
                      <div className="flex justify-center items-center ">
                        {props.usedIn === "outsideTemplate" ? (
                          <button
                            className="py-[2px] xsm:h-[41px] xsm:w-[81px] md:h-[48px] md:w-[162px] h-[30px] w-[60px] xsm:text-[14px] text-[10px] sm:py-[8px] sm:px-[5px] md:py-[8px] md:px-[6px] px-[2px] rounded-none border hover:!shadow-none active:scale-[90%]"
                            style={{
                              boxShadow: "black 3px 3px 0px 1px",
                              border: "1px solid black",
                              transition: "300ms",
                            }}
                            onClick={handleSendClickEmail}
                          >
                            Send
                          </button>
                        ) : (
                          <Button
                            // style={props.buttonStyle}
                            style={` ${props.buttonStyle} !py-[2px] xsm:!h-[41px] xsm:!w-[81px] xsm:!text-[14px] md:!text-[16px] md:!h-[48px] md:!w-[162px] !h-[30px] !w-[60px] !text-[10px] sm:!py-[8px] sm:!px-[5px] md:!py-[8px] md:!px-[6px] !px-[2px] active:scale-[90%]`}
                            // style={{
                            //   boxShadow: "black 3px 3px 0px 1px",
                            //   border: "1px solid black",
                            //   transition: "300ms",
                            // }}
                            text={"Send"}
                            onClick={handleSendClickEmail}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                }
              </div>
            )}
            {shareVia && (
              <h2 className="md:text-[20px] xsm:text-[16px] text-[14px] mb-[10px] mt-[20px] xsm:mb-[16px] xsm:mt-[24px]  md:mb-[16px] font-medium md:mt-[40px]">
                Page Link
              </h2>
            )}
            {shareVia && (
              <div
                className={`flex justify-between items-center xsm:h-[40px] h-[30px] md:h-[49px] bg-[#12121214] ${
                  props.square ? "rounded-[0px]" : "rounded-[8px]"
                } pl-[12px]`}
              >
                <p className="md:text-[16px] xsm:text-[14px] text-[12px] font-medium">
                  https://{profile}.qviq.io
                </p>
                <button
                  className="pr-[10px]"
                  onClick={() => {
                    navigator.clipboard.writeText(`https://${profile}.qviq.io`);
                  }}
                >
                  <FaRegCopy className=" w-[20px] md:w-[24px] md:h-[24px]" />
                </button>
              </div>
            )}
            {shareVia && (
              <h2 className="md:text-[20px] xsm:text-[16px] text-[14px] mb-[10px] xsm:mb-[16px] md:mb-[16px]  mt-[20px] xsm:mt-[24px] font-medium md:mt-[40px]">
                Share profile via
              </h2>
            )}
            {shareVia && (
              <div className="mb-[12px] flex justify-start w-full items-center overflow-x-scroll">
                <div
                  className="flex flex-row md:justify-between justify-center items-center md:py-4 md:gap-x-[1.2rem] xsm:gap-x-[1rem] gap-[1rem] flex-nowrap "
                  ref={SocialHandleRef}
                >
                  <div className="flex flex-col justify-center xsm:gap-[8px] md:gap-[12px] gap-[4px]  items-center">
                    <FacebookShareButton
                      url={sharelink}
                      quote={"ayush"}
                      hashtag={"#rightforu"}
                    >
                      <FacebookIcon
                        className=" w-[30px] h-[30px] xsm:w-[38px] xsm:h-[38px] md:w-[55px] md:h-[55px]"
                        borderRadius={100}
                      />
                    </FacebookShareButton>
                    <p className="md:text-[14px] xsm:text-[13px] text-[11px]">
                      facebook
                    </p>
                  </div>
                  <div className="flex flex-col justify-center xsm:gap-[8px] md:gap-[12px] gap-[4px] items-center">
                    <LinkedinShareButton
                      url={sharelink}
                      quote={"ayush"}
                      hashtag={"#rightforu"}
                    >
                      <LinkedinIcon
                        className=" w-[30px] h-[30px] xsm:w-[38px] xsm:h-[38px] md:w-[55px] md:h-[55px]"
                        borderRadius={100}
                      />
                    </LinkedinShareButton>
                    <p className="md:text-[14px] xsm:text-[13px] text-[11px]">
                      Linkedin
                    </p>
                  </div>
                  <div className="flex flex-col justify-center xsm:gap-[8px] md:gap-[12px] gap-[4px]  items-center">
                    <TwitterShareButton
                      url={sharelink}
                      quote={"ayush"}
                      hashtag={"#rightforu"}
                    >
                      <XIcon
                        className=" w-[30px] h-[30px] xsm:w-[38px] xsm:h-[38px] md:w-[55px] md:h-[55px]"
                        borderRadius={100}
                      />
                    </TwitterShareButton>
                    <p className="md:text-[14px] xsm:text-[13px] text-[11px]">
                      Twitter
                    </p>
                  </div>

                  <div className="flex flex-col justify-center xsm:gap-[8px] md:gap-[12px] gap-[4px]  items-center">
                    <PinterestShareButton
                      url={sharelink}
                      media={sharelink}
                      quote={"ayush"}
                      hashtag={"#rightforu"}
                    >
                      <PinterestIcon
                        className=" w-[30px] h-[30px] xsm:w-[38px] xsm:h-[38px] md:w-[55px] md:h-[55px]"
                        round={true}
                        borderRadius={100}
                      />
                    </PinterestShareButton>
                    <p className="md:text-[14px] xsm:text-[13px] text-[11px]">
                      Pinterest
                    </p>
                  </div>

                  <div className="flex flex-col justify-center xsm:gap-[8px] md:gap-[12px] gap-[4px]  items-center">
                    <WhatsappShareButton
                      url={sharelink}
                      media={sharelink}
                      quote={"qviq"}
                      hashtag={"#rightforu"}
                    >
                      <WhatsappIcon
                        className=" w-[30px] h-[30px] xsm:w-[38px] xsm:h-[38px] md:w-[55px] md:h-[55px]"
                        round={true}
                        borderRadius={100}
                      />
                    </WhatsappShareButton>
                    <p className="md:text-[14px] xsm:text-[13px] text-[11px]">
                      Whatsapp
                    </p>
                  </div>

                  <div className="flex flex-col justify-center xsm:gap-[8px] md:gap-[12px] gap-[4px]  items-center">
                    <TelegramShareButton
                      url={sharelink}
                      media={sharelink}
                      quote={"qviq"}
                      hashtag={"#rightforu"}
                    >
                      <TelegramIcon
                        className=" w-[30px] h-[30px] xsm:w-[38px] xsm:h-[38px] md:w-[55px] md:h-[55px]"
                        round={true}
                        borderRadius={100}
                      />
                    </TelegramShareButton>
                    <p className="md:text-[14px] xsm:text-[13px] text-[11px]">
                      Telegram
                    </p>
                  </div>

                  <div className="flex flex-col justify-center xsm:gap-[8px] md:gap-[12px] gap-[4px]  items-center">
                    <EmailShareButton
                      url={sharelink}
                      media={sharelink}
                      quote={"qviq"}
                      hashtag={"#rightforu"}
                    >
                      <EmailIcon
                        className=" w-[30px] h-[30px] xsm:w-[38px] xsm:h-[38px] md:w-[55px] md:h-[55px]"
                        round={true}
                        borderRadius={100}
                      />
                    </EmailShareButton>
                    <p className="md:text-[14px] xsm:text-[13px] text-[11px]">
                      Email
                    </p>
                  </div>

                  {/* <div className="flex flex-col justify-center xsm:gap-[8px] md:gap-[12px] gap-[4px]  items-center">
                    <ShareOnMessengerButton message={sharelink} />
                    <p className="md:text-[14px] xsm:text-[13px] text-[11px]">
                      Messenger
                    </p>
                  </div> */}
                </div>
                {/* <LeftRightScrollBtn
                    refrence={SocialHandleRef}
                    style={{
                      border: "1px solid black",
                      fontSize: "16px",
                      color: "black",
                    }}
                    scrollLength={380}
                    leftPosition={leftPos}
                    rightPosition={rightPos}
                  /> */}
              </div>
            )}

            {usedIn == "profile" && (
              <>
                <p className="border-[#BDBDBD] border-b-2 border-dashed xsm:mt-[8px]"></p>
                <div className="flex flex-col justify-center items-center">
                  <div className="md:my-[25px] mt-[20px] mb-[24px] flex flex-col justify-center items-center">
                    <h1 className="md:text-[20px] xsm:text-[16px] text-[14px]">
                      Create your own qviq profile
                    </h1>
                    <p className="md:text-[16px] xsm:txt-[14px] text-[12px] text-[#A6A6A6] font-thin">
                      It’s free! yeah you heard it right
                    </p>
                  </div>
                  <div className="px-[5px] w-full">
                    {props.usedIn === "outsideTemplate" ? (
                      <Link href="https://qviq.io/templates">
                        <button
                          className="py-[2px] xsm:h-[41px]  md:h-[48px]  h-[30px] w-full xsm:text-[14px] text-[10px] sm:py-[8px] sm:px-[5px] md:py-[8px] md:px-[6px] px-[2px] rounded-none border hover:!shadow-none active:scale-[90%]"
                          style={{
                            boxShadow: "black 3px 3px 0px 1px",
                            border: "1px solid black",
                            transition: "300ms",
                          }}
                        >
                          Explore qviq
                        </button>
                      </Link>
                    ) : (
                      <Link href="https://qviq.io/templates">
                        <Button
                          style={`${props.buttonStyle} !w-full md:!py-[15px] !py-[8px] !px-[25px]  active:scale-[90%]`}
                          // style={{
                          //   boxShadow: "black 3px 3px 0px 1px",
                          //   border: "1px solid black",
                          //   transition: "300ms",
                          // }}

                          text={"Explore qviq"}
                        />
                      </Link>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {showToast && (
        <div
          className="w-[96%] max-w-[500px] flex justify-center items-center fixed bottom-10 left-1/2 -translate-x-1/2"
          style={{ zIndex: "999" }}
        >
          <Toast text={toastMessage} backgroundColor={"#121212"} />
        </div>
      )}
    </div>
  );
}

const defaultProps = {
  modalStyle: "DM-Sans-font-div",
  buttonStyle:
    "rounded-[8px] border-r-[8px] border-b-[8px] border-[#121212] bg-[#FFFFFF] text-[#121212] w-full hover:cursor-pointer",
};
