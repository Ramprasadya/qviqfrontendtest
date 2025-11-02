"use client";
import React, { useState, useEffect } from "react";
import { getCookie, setCookie } from "../utils";
import { HiOutlineX } from "react-icons/hi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import cookies from "./cookies.svg";
import Image from "next/image";
import { BsCheckLg } from "react-icons/bs";
import { IoCheckmark } from "react-icons/io5";


export default function CookieModal() {
  const [showCookieModal, setShowCookieModal] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [timer, setTimer] = useState(0);

  const [checkCookie, setCheckCookie] = useState(false);

  useEffect(() => {
    if (!getCookie("CookieConsent")) {
      setShowCookieModal(true);
      setTimer(20);
    }
  }, []);

  useEffect(() => {
    if (timer > 0) {
      if (getCookie("CookieConsent")) {
        setShowAdvanced(false);
        setShowCookieModal(false);
        setTimer(0);
      } else {
        setTimeout(() => {
          setTimer(timer - 1);
          if (timer == 1) {
            setShowAdvanced(true);
          }
        }, 1000);
      }
    }
  }, [timer]);

  function setCookie(name, value, daysToExpire) {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + daysToExpire);

    const cookieValue =
      encodeURIComponent(value) +
      (daysToExpire ? `; expires=${expirationDate.toUTCString()}` : "");
    document.cookie = `${name}=${cookieValue}; path=/`;
  }

  const handleAccept = async () => {
    setCookie("CookieConsent", true, 20);
    setShowAdvanced(false);
    setShowCookieModal(false);
  };

  return (
    <>
      {showCookieModal ? (
        <>
          {!showAdvanced ? (
            <div
              className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-white  flex md:flex-row flex-col items-center md:gap-[42px] gap-[12px] w-[90vw] md:w-[75vw] h-fit z-[999]  px-[20px] py-[14px] md:px-[40px] md:py-[23px] rounded-[16px] md:rounded-[20px]"
              style={{ boxShadow: "0 2px 10px #00000029" }}
            >
              <div className="w-full gap-[28px] flex flex-row items-center">
                <Image
                  className="h-[22px] md:h-[48px] w-auto"
                  src={cookies}
                  alt="cookies"
                />

                <h1 className="md:text-[20px] text-[9px] font-[500]">
                  Qviq uses cookies to deliver and enhance the quality of its
                  services and to analyze traffic.
                </h1>
              </div>

              <div className="md:w-fit w-full flex md:flex-col lg2:flex-row flex-row justify-between md:gap-[15px] lg:gap-[32px] gap-[20px]">
                <button
                  className="flex flex-col justify-center items-center rounded-full md:text-[16px] text-[10px] h-[29px] md:h-[43px] md:w-[141px]  w-full lg:px-[26px] lg:py-[16px] border-[1px] px-[23px] py-[11px] font-[500] text-black hover:bg-black hover:text-white"
                  onClick={() => setShowAdvanced(true)}
                >
                  Advanced
                </button>

                <button
                  className="flex flex-col justify-center items-center bg-black md:text-[16px] text-[10px] font-[500] h-[29px] md:h-[43px] md:w-[141px] w-full text-white lg:px-[26px] lg:py-[16px] px-[23px] py-[11px] rounded-full"
                  onClick={handleAccept}
                >
                  Accept
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="fixed overflow-hidden top-0 left-0 bg-black opacity-30 h-screen w-screen z-[999]"></div>

              <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[80vh] h-fit overflow-y-scroll w-[85vw] max-w-[718px] bg-white rounded-[20px] md:rounded-[40px] flex flex-col items-center p-[20px] py-[24px] md:py-[40px] md:p-[40px] z-[999]">
                <div className="flex flex-row justify-between w-full md:pb-[32px] pb-[16px]">
                  <h1 className="text-[20px] md:text-[36px] font-[700]">
                    Cookie Settings
                  </h1>

                  <HiOutlineX
                    onClick={() => setShowCookieModal(false)}
                    className="text-2xl text-black hover:scale-110 logo-fill"
                    style={{ cursor: "pointer" }}
                  />
                </div>

                <p className="text-[12px] md:text-[20px] font-[500] md:pb-[40px] pb-[22px]">
                  We use cookies to give you the best experience on our website.
                  You can choose which cookies you want to allow down below.
                </p>
                <div
                  className={`flex flex-row justify-between items-center ${
                    showDropdown
                      ? "md:pb-[28px] pb-[12px]"
                      : "md:pb-[40px] pb-[32px]"
                  } w-full`}
                >
                  <div className="flex flex-row items-center gap-[7px]">
                    <p className="font-[600] md:text-[24px] text-[14px]">
                      Necessary Cookies
                    </p>

                    {showDropdown ? (
                      <IoIosArrowUp
                        className="md:text-[24px] text-[16] cursor-pointer"
                        onClick={() => setShowDropdown((prev) => !prev)}
                      />
                    ) : (
                      <IoIosArrowDown
                        className="md:text-[24px] text-[16] cursor-pointer"
                        onClick={() => setShowDropdown((prev) => !prev)}
                      />
                    )}
                  </div>

                  <div
                    className="w-[18px] md:w-[30px] h-[18px] md:h-[30px] rounded-[4px] md:rounded-[6px] flex flex-col justify-center items-center overflow-hidden"
                    style={{ outline: "1px solid black" }}
                    // onClick={() => setCheckCookie((prev) => !prev)}
                  >
                    {/* {checkCookie && ( */}
                    <IoCheckmark className="text-[16px] md:text-[22px] text-black" />
                    {/* )} */}
                  </div>
                </div>
                <p
                  className={`text-[10px] md:pb-[52px] pb-[32px] md:text-[20px] ${
                    showDropdown ? "block" : "hidden"
                  }`}
                >
                  These cookies are necessary for the website to function and
                  cannot be switched off in our systems. They are usually only
                  set in response to actions made by you that account to a
                  request for services, such as setting your privacy.
                  preferences, logging in (JWT token). You can set your browser
                  to block or alert you about these cookies, but some parts of
                  The site will then not work. We also store cookies from
                  Google to analyze and meta-traffic behavior.
                </p>
                <div className="flex flex-col w-full justify-center items-center text-[14px] md:text-[20px]">
                  <button
                    className="bg-black md:mb-[20px] mb-[10px] md:text-[24px] text-[12px] w-full text-white px-3 py-2 rounded-[62px]"
                    onClick={handleAccept}
                  >
                    Accept
                  </button>

                  <p className="text-center md:text-[16px] text-[10px]">
                    By clicking “Accept”, you agree Qviq can store cookies on
                    your device.
                  </p>
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
}
