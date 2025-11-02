import React, { useCallback, useContext, useState } from "react";
import { HiChevronDown, HiChevronUp, HiOutlineX } from "react-icons/hi";
import QR from "../../images/qr.png";
import line from "../../../Images/Line.png";
import { UserContext } from "../../../Contexts/context";
import { QRCode } from "react-qrcode-logo";
import Tapop from "../../images/logo2.png";
import { useEffect } from "react";
import axios from "axios";
import QrCodeWithLogo from "qrcode-with-logos";
import { HiArrowDownTray } from "react-icons/hi2";
import {
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  PinterestIcon,
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  PinterestShareButton,
} from "react-share";
import { serverUrl } from "../../../../config";
import { clientUrl } from "../../../../config";
import Image from "next/image";

export default function ShareModal({ setShowModal1, type }) {
  const username = useContext(UserContext);
  const profile = username.username;
  const [qr, setQr] = useState(true);
  const [other, setOther] = useState(false);
  const [shareVia, setshareVia] = useState(false);
  const [share, setshare] = useState(true);
  const [Email, setemail] = useState(false);
  const [Whatsapp, setWhatsapp] = useState(false);
  const [color, setbackendColor] = useState("black");
  const [img, setImage] = useState(Tapop?.src);
  const getQRcode = async () => {
    try {
      const res = await axios.get(`${serverUrl}/person/get/${profile}`);
      if (res.data == null) {
      } else if (res.data === "error") {
      } else {
        setbackendColor(res.data[0].colour);
        if (res.data[0].image != "") {
          setImage(res.data[0].image);
        }
      }
    } catch (error) {
      //console.log(error);
    }
  };
  useEffect(() => {
    getQRcode();
  }, []);
  const downloadQR = () => {
    const qrcode = new QrCodeWithLogo({
      content: `${clientUrl}/qrscan/${type}/${profile}`,
      width: 380,
      // download: true,
      logo: {
        src: img,
        logoRadius: "50",
        logoSize: "0.18",
        bgColor: "#FFFFFF",
      },
      nodeQrCodeOptions: { color: { dark: color } },
    });

    // qrcode.toImage().then(() => {
    //   qrcode.downloadImage("Qviq QR");
    // });
  };
  const [phoneNumber, setPhoneNumber] = useState("");
  const sharelink = `http://${profile}.qviq.io`;

  const handleSendClick = () => {
    if (phoneNumber) {
      const whatsappLink = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
        sharelink
      )}`;
      window.open(whatsappLink, "_blank");
    }
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };
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

  const handleEscape = useCallback((event) => {
    if (event.key === "Escape") {
      setshareVia(!shareVia);
      setshare(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleEscape, false);

    return () => {
      document.removeEventListener("keydown", handleEscape, false);
    };
  }, [handleEscape]);

  return (
    <div className="container sans " style={{ zIndex: "998" }}>
      <div
        className="modal-wrapper bg-[#00000054] backdrop-blur-[20px]"
        style={{ zIndex: "998" }}
      ></div>

      <div
        className="flex flex-col  bg-white fixed bottom-0 md:bottom-1/2 md:translate-y-1/2 left-1/2 -translate-x-1/2 h-fit rounded-t-2xl md:rounded-2xl md:w-[600px] w-full p-2"
        style={{ zIndex: "998", height: "fit-content" }}
      >
        <div className="flex justify-between items-center px-3 py-3 xsm:px-5 xsm:py-2 md:p-4">
          <p className=" md:text-xl text-black text-[24px] tracking-normal font-bold">
            Share
          </p>
          <span
            className="text-2xl text-black logo-fill"
            style={{ cursor: "pointer", padding: "0" }}
            onClick={() => setShowModal1(false)}
          >
            <HiOutlineX />
          </span>
        </div>
        {shareVia && (
          <div className=" mb-6 md:mb-0 flex  justify-center items-center">
            <div className="justify-center items-center flex p-4 gap-y-4 gap-x-8  flex-wrap">
              <FacebookShareButton
                url={sharelink}
                quote={"ayush"}
                hashtag={"#rightforu"}
              >
                <FacebookIcon size={60} borderRadius={12} />
              </FacebookShareButton>

              <LinkedinShareButton
                url={sharelink}
                quote={"ayush"}
                hashtag={"#rightforu"}
              >
                <LinkedinIcon size={60} borderRadius={12} />
              </LinkedinShareButton>

              <TwitterShareButton
                url={sharelink}
                quote={"ayush"}
                hashtag={"#rightforu"}
              >
                <TwitterIcon size={60} borderRadius={12} />
              </TwitterShareButton>
              <PinterestShareButton
                url={sharelink}
                media={sharelink}
                quote={"ayush"}
                hashtag={"#rightforu"}
              >
                <PinterestIcon size={60} borderRadius={12} />
              </PinterestShareButton>
            </div>
          </div>
        )}
        {share && (
          <div className="mx-3 xsm:mx-5 md:mx-6 border-t h-full overflow-auto ">
            <h2 className="text-[14px]  mb-3 font-medium text-[#12121299] xl:mt-8 mt-[15px]">
              Copy your URL and share with anyone
            </h2>
            <div className="flex justify-between items-center h-fit break-all  bg-[#12121214] rounded-lg px-1 [@media(min-width:300px)]:px-3 py-2.5 mb-6 md:mb-8">
              <p className="text-[12px] text-[#121212CC] font-medium">
                https://{profile}.qviq.io
              </p>
              <button
                className="text-[#121212CC] font-bold text-[14px] underline"
                onClick={() => {
                  navigator.clipboard.writeText(`https://${profile}.qviq.io`);
                }}
              >
                Copy
              </button>
            </div>

            <div className="mt-8">
              <span
                className={`mr-[18px] text-[14px] text-[${
                  qr ? "#121212" : "#121212B2"
                }] font-[${qr ? "bold" : "medium "}]`}
                onClick={() => {
                  setQr(true);
                  setOther(false);
                  setemail(false);
                  setWhatsapp(false);
                }}
                style={{ cursor: "pointer" }}
              >
                QR Code
              </span>
              <span
                className={`text-[14px] font-[${
                  other ? "bold" : "medium"
                }] text-[${other ? "#121212" : "#121212B2"}] `}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setQr(false);
                  setOther(true);
                  setemail(false);
                  setWhatsapp(false);
                }}
              >
                Other
              </span>
            </div>

            {other && (
              <div className="mt-6">
                <div className=" mb-6 flex justify-between">
                  <h1
                    className="text-[16px] font-medium text-[#121212]"
                    onClick={() => {
                      setQr(false);
                      setemail(false);
                      setWhatsapp(true);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    Whatsapp{" "}
                  </h1>{" "}
                  {Whatsapp ? <HiChevronUp /> : <HiChevronDown />}
                </div>
                {Whatsapp && (
                  <div className="mt-4">
                    <div className="text-[12px] mb-3 font-medium text-[#12121299] w-80">
                      Enter Whatsapp number with country code to share the
                      profile
                    </div>
                    <div className="mb-2 text-[12px] font-medium text-[#121212] ">
                      Whatsapp Mobile Number
                    </div>
                    <div className="flex items-center">
                      <input
                        className="w-[245px] h-[48px] border-[1px] border-[#121212] rounded-[8px] mr-2 p-2 text-[14px]"
                        value={phoneNumber}
                        placeholder="Enter Your  Number"
                        onChange={handlePhoneNumberChange}
                      />
                      <button
                        className="rounded-[8px] border border-r-[4px] text-[14px] font-bold text-[#121212] border-[#121212] bg-[#ffffff] border-b-[4px] w-[67px] h-[36px] text-center "
                        onClick={handleSendClick}
                      >
                        send
                      </button>
                    </div>
                  </div>
                )}
                <hr className="mb-6 mt-6" />
                <div className=" mb-6 flex justify-between">
                  <h1
                    className="text-[16px] font-medium text-[#121212]"
                    onClick={() => {
                      setQr(false);
                      setemail(true);
                      setWhatsapp(false);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    Email{" "}
                  </h1>{" "}
                  {Email ? <HiChevronUp /> : <HiChevronDown />}
                </div>
                {Email && (
                  <div className="mt-4 ">
                    <div className="text-[12px] mb-3 font-medium text-[#12121299] w-80">
                      Enter an Email address
                    </div>
                    <div className="mb-2 text-[12px] font-medium text-[#121212] ">
                      Email Address
                    </div>
                    <div className="flex items-center">
                      <input
                        className="w-[245px] h-[48px] border-[1px] border-[#121212] rounded-[8px] mr-2 p-2 text-[14px]"
                        placeholder="Enter Your Email"
                        value={email}
                        onChange={handleEmailChange}
                      />
                      <button
                        className="rounded-[8px] border border-r-[4px] text-[14px] font-bold text-[#121212] border-[#121212] bg-[#ffffff] border-b-[4px] w-[67px] h-[36px] text-center "
                        onClick={handleSendClickEmail}
                      >
                        send
                      </button>
                    </div>
                  </div>
                )}
                <hr className="mb-6 mt-6" />
              </div>
            )}

            {qr && (
              <div className="w-full flex flex-col justify-center items-center mt-5">
                <div className="text-[14px] font-medium text-[#12121299]">
                  Scan the QR code
                </div>
                <div className="border-[2px] border-[#121212] p-2 rounded-[12px] mt-2 mb-2">
                  {" "}
                  <QRCode
                    value={`${clientUrl}/qrscan/${type}/${profile}`}
                    // ref={qrCodeRef}
                    logoImage={img}
                    fgColor={color}
                    ecLevel="Q"
                    removeQrCodeBehindLogo="2"
                    size="180"
                    logoWidth="29"
                    logoHeight="29"
                    logoOpacity="3"
                    logoPaddingStyle="circle"
                    logoPadding="3"
                  />
                </div>

                <div
                  className="text-[14px] font-medium text-[#12121299]"
                  onClick={downloadQR}
                  style={{ cursor: "pointer" }}
                >
                  Download
                </div>
              </div>
            )}
            <div className="mt-8 mb-8 flex w-full justify-center items-center">
              <span>
                <Image alt="line" src={line} />
              </span>
              <h1 className=" mx-[10px] "> OR </h1>
              <span>
                <Image alt="line" src={line} />
              </span>{" "}
            </div>

            <div className="mt-6 mb-[24px] xl:w-[520px] xl:h-[72px] flex w-full justify-center items-center ">
              <button
                className="rounded-[8px] border-r-[8px] text-[14px] font-bold text-[#121212] border-[#121212] bg-[#ffffff] border-b-[8px] h-[72px] text-center w-full  "
                onClick={() => {
                  setshareVia(!shareVia);
                  setshare(false);
                }}
              >
                Share via
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
