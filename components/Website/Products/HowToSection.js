"use client";
import React, { useEffect, useState } from "react";
import svg4 from "./images/Group4.svg";
import svg7 from "./images/R img 2.svg";
import svg8 from "./images/R img 3.svg";
import Image from "next/image";

export default function HowToSection() {
  const [clickedBtn, setClickedBtn] = useState("android");

  const [btnClicked, setBtnClicked] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      // Switch to the next section based on the current active section
      if (!btnClicked) {
        switch (clickedBtn) {
          case "android":
            setClickedBtn("ios");
            break;
          case "ios":
            setClickedBtn("qr");
            break;
          case "qr":
            setClickedBtn("android");
            break;
          default:
            break;
        }
      }
    }, 5000); // 15 seconds interval

    return () => clearInterval(interval);
  }, [clickedBtn]);

  const handleButtonClick = (buttonValue) => {
    setBtnClicked(true);
    setClickedBtn(buttonValue);
  };

  return (
    <div className="w-full h-fit flex md:flex-row flex-col">
      <div className="md:w-[60%] w-full lg:px-[80px] md:px-[40px] px-[20px] md:py-[72px] py-[40px] flex flex-col items-start gap-[28px] sm:gap-[48px] bg-[#0A0003]">
        <p className="md:max-w-[504px] w-full md:text-left text-center text-[#fafafa] sm:text-[40px] text-[24px] font-[700]">
          How to activate Qviq Tap smart card?
        </p>

        <div className="flex flex-row sm:gap-[20px] gap-[8px] overflow-scroll sm:w-full w-[90vw] ">
          <button
            className={`rounded-full sm:px-[20px] px-[16px] sm:text-[16px] text-[14px] font-[500] text-center ${
              clickedBtn !== "android" &&
              "hover:!border-white hover:!border-[1px] hover:!border-solid active:scale-[90%]"
            } transition-[300ms] ${
              clickedBtn === "android" ? "text-black bg-white" : "text-white"
            }`}
            style={{
              border: `${
                clickedBtn === "android" ? "none" : "1px solid #817C7C"
              }`,
              whiteSpace: "nowrap",
            }}
            onClick={() => handleButtonClick("android")}
          >
            Android mobile
          </button>
          <button
            className={`rounded-full sm:px-[20px] px-[16px] sm:text-[16px] text-[14px] font-[500] text-center ${
              clickedBtn !== "ios" &&
              "hover:!border-white hover:!border-[1px] hover:!border-solid active:scale-[90%]"
            } transition-[300ms] ${
              clickedBtn === "ios" ? "text-black bg-white" : "text-white"
            }`}
            style={{
              border: `${
                clickedBtn === "ios" ? "none" : "1px solid #817C7C"
              }`,
              whiteSpace: "nowrap",
            }}
            onClick={() => handleButtonClick("ios")}
          >
            iOS - iphone
          </button>
          <button
            className={`sm:h-[48px] h-[40px] rounded-full sm:px-[20px] px-[16px] sm:text-[16px] text-[14px] font-[500] text-center ${
              clickedBtn !== "qr" &&
              "hover:!border-white hover:!border-[1px] hover:!border-solid active:scale-[90%]"
            } transition-[300ms] ${
              clickedBtn === "qr" ? "text-black bg-white" : "text-white"
            }`}
            style={{
              border: `${clickedBtn === "qr" ? "none" : "1px solid #817C7C"}`,
              whiteSpace: "nowrap",
            }}
            onClick={() => handleButtonClick("qr")}
          >
            Using QR code
          </button>
        </div>

        {clickedBtn === "android" && (
          <div className="w-full h-[264px] rounded-[16px] p-[16px] md:hidden flex flex-col justify-center items-center bg-[#FB6609] relative">
            <Image
              priority={true}
              alt="image"
              src={svg4}
              className="w-auto h-full "
            />
          </div>
        )}
        {clickedBtn === "ios" && (
          <div className="w-full h-[264px] rounded-[16px] p-[16px] md:hidden flex flex-col justify-center items-center bg-[#E40849] relative">
            <Image
              priority={true}
              alt="image"
              src={svg7}
              className="w-auto h-full "
            />
          </div>
        )}
        {clickedBtn === "qr" && (
          <div className="w-full h-[264px] rounded-[16px] p-[16px] md:hidden flex flex-col justify-center items-center bg-[#FAFAFA] relative">
            <Image
              priority={true}
              alt="image"
              src={svg8}
              className="w-auto h-full "
            />
          </div>
        )}

        {clickedBtn === "android" && (
          <div className="w-full flex flex-col sm:gap-[40px] gap-[20px]">
            <p className="sm:text-[20px] text-[14px] font-[500] text-[#DFDBD8]">
              Steps to activate Qviq smart card on Android device:
            </p>

            <div className="w-full h-full flex flex-row gap-[12px]">
              <div className="flex flex-col justify-around md:items-center items-stretch">
                <div className="w-[32px] h-[32px] flex flex-col justify-center items-center">
                  <div className="w-[32px] h-[32px] text-white text-[10px] font-[800] bg-[#FB6609] rounded-full flex flex-col justify-center items-center">
                    1
                  </div>
                </div>

                <div
                  className="h-full md:w-1 w-1/2"
                  style={{ borderRight: "1px dashed #FB6609" }}
                ></div>

                <div className="w-[32px] h-[32px] flex flex-col justify-center items-center">
                  <div className="w-[32px] h-[32px] text-white text-[10px] font-[800] bg-[#FB6609] rounded-full flex flex-col justify-center items-center">
                    2
                  </div>
                </div>

                <div
                  className="h-full md:w-1 w-1/2"
                  style={{ borderRight: "1px dashed #FB6609" }}
                ></div>

                <div className="w-[32px] h-[32px] flex flex-col justify-center items-center">
                  <div className="w-[32px] h-[32px] text-white text-[10px] font-[800] bg-[#FB6609] rounded-full flex flex-col justify-center items-center">
                    3
                  </div>
                </div>

                <div
                  className="h-full md:w-1 w-1/2"
                  style={{ borderRight: "1px dashed #FB6609" }}
                ></div>

                <div className="w-[32px] h-[32px] flex flex-col justify-center items-center">
                  <div className="w-[32px] h-[32px] text-white text-[10px] font-[800] bg-[#FB6609] rounded-full flex flex-col justify-center items-center">
                    4
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-around sm:gap-[40px] gap-[32px]">
                <p className="text-[#FAFAFA] sm:text-[16px] text-[14px] sm:font-[600] font-[500]">
                  Enable NFC from the notification bar/settings
                </p>
                <p className="text-[#FAFAFA] sm:text-[16px] text-[14px] sm:font-[600] font-[500]">
                  Tap your Qviq card on the back middle or upper back side of
                  your smartphone
                </p>
                <p className="text-[#FAFAFA] sm:text-[16px] text-[14px] sm:font-[600] font-[500]">
                  Follow the link & Sign up if you are a new user or login if
                  you already have a Qviq account
                </p>
                <p className="text-[#FAFAFA] sm:text-[16px] text-[14px] sm:font-[600] font-[500]">
                  Create a Qviqsite, Boom! Your Qviq card is ready to share
                </p>
              </div>
            </div>
          </div>
        )}
        {clickedBtn === "ios" && (
          <div className="w-full flex flex-col sm:gap-[40px] gap-[20px]">
            <p className="sm:text-[20px] text-[14px] font-[500] text-[#DFDBD8]">
              Steps to activate Qviq smart card on Iphone:
            </p>

            <div className="w-full h-full flex flex-row gap-[12px]">
              <div className="flex flex-col justify-around md:items-center items-stretch">
                <div className="w-[32px] h-[32px] flex flex-col justify-center items-center">
                  <div className="w-[32px] h-[32px] text-white text-[10px] font-[800] bg-[#E40849] rounded-full flex flex-col justify-center items-center">
                    1
                  </div>
                </div>
                <div
                  className="h-full md:w-1 w-1/2"
                  style={{ borderRight: "1px dashed #E40849" }}
                ></div>
                <div className="w-[32px] h-[32px] flex flex-col justify-center items-center">
                  <div className="w-[32px] h-[32px] text-white text-[10px] font-[800] bg-[#E40849] rounded-full flex flex-col justify-center items-center">
                    2
                  </div>
                </div>
                <div
                  className="h-full md:w-1 w-1/2"
                  style={{ borderRight: "1px dashed #E40849" }}
                ></div>
                <div className="w-[32px] h-[32px] flex flex-col justify-center items-center">
                  <div className="w-[32px] h-[32px] text-white text-[10px] font-[800] bg-[#E40849] rounded-full flex flex-col justify-center items-center">
                    3
                  </div>
                </div>
                <div
                  className="h-full md:w-1 w-1/2"
                  style={{ borderRight: "1px dashed #E40849" }}
                ></div>
                <div className="w-[32px] h-[32px] flex flex-col justify-center items-center">
                  <div className="w-[32px] h-[32px] text-white text-[10px] font-[800] bg-[#E40849] rounded-full flex flex-col justify-center items-center">
                    4
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-around sm:gap-[40px] gap-[32px]">
                <p className="text-[#FAFAFA] sm:text-[16px] text-[14px] sm:font-[600] font-[500]">
                  iPhone models XR & later have NFC enabled by default, while
                  for iPhone 8 and X, you must enable NFC in settings.
                </p>
                <p className="text-[#FAFAFA] sm:text-[16px] text-[14px] sm:font-[600] font-[500]">
                  Tap your Qviq card on the Upper front or back side of your
                  iPhone
                </p>
                <p className="text-[#FAFAFA] sm:text-[16px] text-[14px] sm:font-[600] font-[500]">
                  Follow the link & Sign up if you are a new user or login if
                  you already have a Qviq account
                </p>
                <p className="text-[#FAFAFA] sm:text-[16px] text-[14px] sm:font-[600] font-[500]">
                  Create a Qviqsite, Boom! Your Qviq card is ready to share
                </p>
              </div>
            </div>
          </div>
        )}
        {clickedBtn === "qr" && (
          <div className="w-full flex flex-col sm:gap-[40px] gap-[20px]">
            <p className="sm:text-[20px] text-[14px] font-[500] text-[#DFDBD8]">
              Steps to activate Qviq smart card using QR code:
            </p>

            <div className="w-full h-full flex flex-row gap-[12px]">
              <div className="flex flex-col justify-around md:items-center items-stretch">
                <div className="w-[32px] h-[32px] flex flex-col justify-center items-center">
                  <div className="w-[32px] h-[32px] text-black text-[10px] font-[800] bg-[#fff] rounded-full flex flex-col justify-center items-center">
                    1
                  </div>
                </div>
                <div
                  className="h-full md:w-1 w-1/2"
                  style={{ borderRight: "1px dashed #fff" }}
                ></div>
                <div className="w-[32px] h-[32px] flex flex-col justify-center items-center">
                  <div className="w-[32px] h-[32px] text-black text-[10px] font-[800] bg-[#fff] rounded-full flex flex-col justify-center items-center">
                    2
                  </div>
                </div>
                <div
                  className="h-full md:w-1 w-1/2"
                  style={{ borderRight: "1px dashed #fff" }}
                ></div>
                <div className="w-[32px] h-[32px] flex flex-col justify-center items-center">
                  <div className="w-[32px] h-[32px] text-black text-[10px] font-[800] bg-[#fff] rounded-full flex flex-col justify-center items-center">
                    3
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-around sm:gap-[40px] gap-[32px]">
                <p className="text-[#FAFAFA] sm:text-[16px] text-[14px] sm:font-[600] font-[500]">
                  Scan the QR Code on your Qviq card with Google lens or Camera
                  app in case of iPhone
                </p>
                <p className="text-[#FAFAFA] sm:text-[16px] text-[14px] sm:font-[600] font-[500]">
                  Follow the link & Sign up if you are a new user or login if
                  you already have a Qviq account
                </p>
                <p className="text-[#FAFAFA] sm:text-[16px] text-[14px] sm:font-[600] font-[500]">
                  Create a Qviqsite, Boom! Your Qviq card is ready to share
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {clickedBtn === "android" && (
        <div className="w-[40%] px-[80px] py-[72px] md:flex hidden flex-col justify-center items-center bg-[#FB6609] relative">
          <Image
            priority={true}
            alt="image"
            src={svg4}
            className="w-auto h-full "
          />
        </div>
      )}
      {clickedBtn === "ios" && (
        <div className="w-[40%] px-[80px] py-[72px] md:flex hidden flex-col justify-center items-center bg-[#E40849] relative">
          <Image
            priority={true}
            alt="image"
            src={svg7}
            className="w-auto h-full "
          />
        </div>
      )}
      {clickedBtn === "qr" && (
        <div className="w-[40%] px-[80px] py-[72px] md:flex hidden flex-col justify-center items-center bg-[#FAFAFA] relative">
          <Image
            priority={true}
            alt="image"
            src={svg8}
            className="w-auto h-full "
          />
        </div>
      )}
    </div>
  );
}
