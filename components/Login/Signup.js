"use client";
import React, { useState, useEffect, useRef, useContext } from "react";
import firebase from "firebase/compat/app";
import { RecaptchaVerifier } from "firebase/auth";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import axios from "axios";
import { auth } from "./firebaseconfig";
import Google from "./assets/Google.svg";
import Mobile from "./assets/Mobile.svg";
import Linkedin from "./assets/linkedin.svg";
import LeftArrow from "./assets/leftArrow.svg";
import InputField from "../UiComponents/InputField";
import PrimaryButton2 from "../UiComponents/PrimaryButton2";
import SecondaryButtonLogoCustom from "../UiComponents/SecondaryButtonLogoCustom";
import "../UiComponents/iconTextStyle.css";
import "../UiComponents/UiStyles.css";
import { HiCheckCircle, HiXCircle } from "react-icons/hi";
import NewToast from "../UiComponents/NewToast";
import { serverUrl } from "../../config";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { userNameList } from "../userNameList";
import NewModal from "../UiComponents/NewModal/NewModal";
import SecondaryButton from "../UiComponents/SecondaryButton";
import InputFieldCC from "../UiComponents/countryCodeField";
import {
  createQueryString,
  deleteCookie,
  SafeLocalStorage,
} from "@/components/utils";
import Navbar from "./Navbar";
import PrimaryButton from "../UiComponents/PrimaryButton";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import "./signup.css";
import OtpInput from "react-otp-input";
import LoadingAnimation from "../UiComponents/Loading/LoadingAnimation";
// import qs from 'qs';

export default function Signup({ searchParams }) {
  useEffect(() => {
    deleteCookie("username");
    deleteCookie("templateId");
    deleteCookie("profile_added");
  }, []);

  // //console.log("searchParams",searchParams.get('accessToken'))

  const navigate = useRouter();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [clicked, setClicked] = useState(false);
  const [fullName, setFullName] = useState("");
  const [isLoading, setLoading] = useState(false);
  const qrId = searchParams.id;
  const fromPage = searchParams.fromPage || "admin";

  // if(searchParams?.accessToken){
  //   setLoading(true)
  // }

  const redirectToLogin = () => {
    if (fromPage === "cart" || fromPage === "pricing") {
      navigate.push("/login?" + createQueryString(["fromPage"], [fromPage]));
    } else {
      navigate.push("/login?" + createQueryString(["qrId"], [qrId]));
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (emailRegex.test(email)) {
      try {
        const response = await fetch(
          `${serverUrl}/tapopuser/check-email/${email}`
        );
        const { exists } = await response.json();
        if (exists) {
          setShowMessage(!showMessage);
          setMessage("Email already exists. Please choose a different email");
          setTimeout(() => {
            setShowMessage(false);
          }, 2000);

          // alert("Email already exists. Please choose a different email.");
          return;
        }
      } catch (error) {
        console.error(error);
        alert("Error checking Email. Please try again later.");
        return;
      }
    } else {
      alert("Please enter a valid email address.");
    }
  };

  const [VerifyUsername, setVerifyUsername] = useState(false);

  const [inputClicked, setInputClicked] = useState(false);

  const handleUserNameChange = async (e) => {
    setInputClicked(true);

    const value = e.target.value.toLowerCase().trim();
    const regex = /^[a-zA-Z0-9]*$/;
    const isValid = regex.test(value);
    const checkCapital = /[A-Z]/.test(value);
    if (isValid) {
      setUserName(value);
      SafeLocalStorage.setItem("userName1", value);
      if (value === "" || /^[wW]+$/.test(value) || /^\d+$/.test(value)) {
        setVerifyUsername(false);
      } else if (userNameList.includes(value)) {
        setVerifyUsername(false);
        setMessage("Please enter a different username.");
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
          setMessage("");
        }, 3000);
        return;
      } else {
        try {
          const response = await fetch(
            `${serverUrl}/tapopuser/tapopuser/${value}`
          );
          const { exists } = await response.json();

          if (exists) {
            setVerifyUsername(false);
          } else {
            setVerifyUsername(true);
          }
        } catch (error) {
          //console.log(error);
        }
      }
    }
  };

  const handleQr = (e) => {
    const res = axios.post(`${serverUrl}/person/post/${e}`);
  };

  const QR = async (e) => {
    await axios(`${serverUrl}/person/post/${userName}`);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    const provider = new firebase.auth.GoogleAuthProvider();
    auth
      .signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        fetch(`${serverUrl}/tapopuser/check-email/${user.email}`)
          .then((res) => res.json())
          .then((data) => {
            if (data.exists) {
              setMessage("Account already exists. Please login.");
              setShowMessage(true);
              setTimeout(() => {
                setShowMessage(false);
                setMessage("");
              }, 2000);
              navigate.push(
                "/login?" +
                  createQueryString(["fromPage", "qrId"], [fromPage, qrId])
              );
            } else {
              navigate.push(
                "/username?" +
                  createQueryString(
                    ["name", "email", "username", "frompage", "id"],
                    [user.displayName, user.email, userName, fromPage, qrId]
                  )
              );
            }
            setLoading(false);
          })
          .catch((error) => {
            setLoading(false);
            //console.log(error);
          });
      })
      .catch((error) => {
        setLoading(false);
        //console.log(error);
      });
  };

  const [confirmationResult, setConfirmationResult] = useState({});
  const [reCaptchaVerifier, setReCaptchaVerifier] = useState();
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [timer, setTimer] = useState(0);
  const [otp, setOTP] = useState("");
  const recaptchaWrapperRef = useRef(null);

  const handlePhoneNumber = (e) => {
    const newPhoneNumber = e.target.value;
    const numericRegex = /^[0-9]*$/;

    if (numericRegex.test(newPhoneNumber)) {
      setPhoneNumber(newPhoneNumber);
    }
  };

  useEffect(() => {
    if (timer == 0) return;
    const id = setTimeout(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearTimeout(id);
  }, [timer]);

  const signUpWithPhoneNumber = () => {
    setTimer(60);
    if (reCaptchaVerifier && recaptchaWrapperRef) {
      reCaptchaVerifier.clear();
      recaptchaWrapperRef.current.innerHTML = `<div id="recaptcha-container"></div>`;
    }
    const newRecaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
      }
    );
    setReCaptchaVerifier(newRecaptchaVerifier);
    auth
      .signInWithPhoneNumber("+91" + phoneNumber, newRecaptchaVerifier)
      .then((confirmationResult) => {
        setConfirmationResult(confirmationResult);
        setMessage("OTP Sent");
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
        }, 3000);
      })
      .catch((err) => {
        //console.log(err);
        setMessage("Unable to Send OTP, Try Again Later!");
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
        }, 3000);
      });
  };
  const confirmCode = () => {
    setLoading(true);
    if (confirmationResult && confirmationResult.confirm) {
      confirmationResult
        .confirm(otp)
        .then((result) => {
          const user = result.user;
          fetch(
            `${serverUrl}/tapopuser/checkPhoneNumber/${user.phoneNumber.replace(
              "+",
              ""
            )}`
          )
            .then((res) => res.json())
            .then((data) => {
              if (data.exists) {
                setMessage("Account already exists. Please login.");
                setShowMessage(true);
                setTimeout(() => {
                  setShowMessage(false);
                  setMessage("");
                }, 2000);
                navigate.push(
                  "/login?" +
                    createQueryString(["fromPage", "qrId"], [fromPage, qrId])
                );
              } else {
                navigate.push(
                  "/username?" +
                    createQueryString(
                      ["fromPage", "name", "phoneNumber", "username", "id"],
                      [fromPage, fullName, phoneNumber, userName, qrId]
                    )
                );
              }
              setLoading(false);
            })
            .catch((error) => {
              setLoading(false);
              //console.log(error);
            });
          setShowPhoneModal(false);
          setOtpModal(false);
        })
        .catch((err) => {
          //console.log(err);
          setLoading(false);
          setMessage("Wrong OTP!");
          setShowMessage(true);
          setTimeout(() => {
            setShowMessage(false);
            setMessage("");
          }, 2000);
        });
    }
  };

  const [editNumber, setEditNumber] = useState(true);
  const [otpModal, setOtpModal] = useState(false);

  useEffect(() => {
    if (!showPhoneModal && !editNumber) {
      setEditNumber(true);
    }
  }, [showPhoneModal]);

  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLinkedInLogin = async () => {
    try {
      const response = await axios.get(
        `${serverUrl}/tapopuser/linkedin/signup`
      );
      if (response.data) {
        window.location.href = response.data;
      }
    } catch (error) {
      console.error("Error redirecting to LinkedIn auth:", error);
    }
  };

  // const code  =  searchParams?.code
  // //console.log(code)

  useEffect(() => {
    const accessToken = searchParams?.accessToken;
    const userDetailsStr = searchParams?.userDetails;
    const errorParam = searchParams?.error;

    if (accessToken || userDetailsStr || errorParam) {
      setLoading(true);
      setClicked(true);
    }

    if (errorParam) {
      setError(decodeURIComponent(errorParam));
      setLoading(false);
    } else if (accessToken && userDetailsStr) {
      try {
        const userDetails = JSON.parse(userDetailsStr);
        setUserData(userDetails);
        fetch(`${serverUrl}/tapopuser/check-email/${userDetails.profile.email}`)
          .then((res) => res.json())
          .then((data) => {
            if (data.exists) {
              setMessage("Account already exists. Please login.");
              setShowMessage(true);
              setTimeout(() => {
                setShowMessage(false);
                setMessage("");
              }, 2000);
              navigate.push(
                "/login?" +
                  createQueryString(["fromPage", "qrId"], [fromPage, qrId])
              );
            } else {
              // Redirect to username page
              setTimeout(() => {
                navigate.push(
                  "/username?" +
                    createQueryString(
                      ["name", "email", "username", "frompage", "id"],
                      [
                        userDetails.profile.name,
                        userDetails.profile.email,
                        userName1,
                        fromPage,
                        qrId,
                      ]
                    )
                );
              }, 3000);
            }
          });
      } catch (e) {
        setError("Failed to parse user details");
        setLoading(false);
      }
    }
  }, [searchParams, navigate]);

  // useEffect(() => {
  //   // setLoading(true)
  //   const accessToken = searchParams?.accessToken
  //   const userDetailsStr = searchParams?.userDetails
  //   const errorParam = searchParams?.error

  //   if (errorParam) {
  //     setError(decodeURIComponent(errorParam));
  //   } else if (accessToken && userDetailsStr) {
  //     try {
  //       const userDetails = JSON.parse(userDetailsStr);
  //       setUserData(userDetails);

  //     } catch (e) {
  //       setError('Failed to parse user details');
  //     }
  //   }
  // }, [searchParams]);

  let userName1 = SafeLocalStorage.getItem("userName1");
  // //console.log(userName1);

  // useEffect(() => {
  //   if (userData) {
  //     navigate.push(
  //       "/username?" +
  //         createQueryString(
  //           ["name", "email", "username", "frompage", "id"],
  //           [userData.profile.name, userData.profile.email, userName1, fromPage, qrId]
  //         )
  //     );
  //   }
  // }, [userData, navigate, userName, fromPage, qrId]);

  // useEffect(() => {
  //   if (!code) return;

  //   const getAccessToken = async () => {
  //     try {
  //       const { data } = await axios.post(`${serverUrl}/tapopuser/linkedin/token`, { code });
  //       //console.log('Access Token:', data.accessToken);

  //     } catch (error) {
  //       console.error('Error getting access token:', error);
  //     }
  //   };

  //   getAccessToken();
  // }, [code]); // Add code to dependency array

  return (
    <div className="flex flex-col w-screen h-screen">
      {!clicked && (
        <div className="w-full h-screen flex flex-col justify-start items-center bg-[#FFFFFF] font-poppins overflow-hidden">
          <Navbar
            fromPage={
              fromPage === "cart" || fromPage === "pricing" ? fromPage : null
            }
            qrId={qrId}
            usedIn="signup"
            background={windowHeight > 730 ? "white" : "transparent"}
          />
          <div className="w-full h-full flex flex-col justify-center items-center gap-[20px] xsm:px-[20px] px-[5px] pt-[80px]">
            <p
              className={`font-[500] text-center text-[#0A0003] ${
                windowHeight > 700
                  ? "smd:text-[20px] text-[16px]"
                  : "text-[16px]"
              }`}
            >
              Create your free username
            </p>

            <form
              className={`relative flex flex-col justify-center items-end ${
                windowHeight > 700
                  ? "smd:h-[102px] smd:w-[652px] h-[64px] w-full"
                  : "h-[64px] smd:w-[476px] w-full"
              }`}
              style={{ transition: "300ms" }}
              onSubmit={() => {
                setClicked(true);
                searchParams.userName = userName;
              }}
            >
              {inputClicked && (
                <div
                  className={`absolute z-[3] w-full smd:pl-[24px] pl-[10px]
                ${
                  /^[wW]+$/.test(userName) ||
                  userName === "www" ||
                  !VerifyUsername ||
                  userName === ""
                    ? "text-[#CF2828]"
                    : "text-[#12A26E]"
                }`}
                >
                  {/^[wW]+$/.test(userName) ||
                  userName === "www" ||
                  !VerifyUsername ||
                  userName === "" ? (
                    <HiXCircle className="w-[24px] h-[24px]" />
                  ) : (
                    <HiCheckCircle className="w-[24px] h-[24px]" />
                  )}
                </div>
              )}

              <input
                className={`z-[4] rounded-full focus:outline-none font-[700] bg-transparent smd:py-[34px] py-[20px] smd:pl-[56px] pl-[36px] smd:pr-[98px] pr-[60px] ${
                  windowHeight > 700
                    ? "text-[16px] smd:text-[26px] smd:h-[102px] smd:w-[652px] h-[64px] w-full"
                    : "text-[16px] h-[64px] smd:w-[476px] w-full"
                }`}
                value={userName}
                onChange={handleUserNameChange}
              />
              <input
                className={`absolute z-[2] rounded-full focus:outline-none font-[700] smd:py-[34px] py-[20px] smd:pl-[56px] pl-[36px] smd:pr-[98px] pr-[60px] ${
                  windowHeight > 700
                    ? "text-[16px] smd:text-[26px] smd:h-[102px] smd:w-[652px] h-[64px] w-full"
                    : "text-[16px] h-[64px] smd:w-[476px] w-full"
                } ${userName.length > 30 ? "bg-[#FAFAFA]" : "bg-transparent"}`}
              />

              {userName.length < 31 && (
                <>
                  <input
                    className={`absolute z-[1] bg-transparent rounded-full focus:outline-none font-[700] text-[transparent] smd:py-[34px] py-[20px] smd:pl-[56px] pl-[36px] smd:pr-[98px] pr-[60px] ${
                      windowHeight > 700
                        ? "text-[16px] smd:text-[26px] smd:h-[102px] smd:w-[652px] h-[64px] w-full"
                        : "text-[16px] h-[64px] smd:w-[476px] w-full"
                    }`}
                    placeholder={userName ? userName : "Your username"}
                  />
                  <input
                    className={`blackInput absolute z-[0] bg-[#FAFAFA] rounded-full focus:outline-none font-[700] text-[transparent] smd:py-[34px] py-[20px] smd:pl-[56px] pl-[36px] smd:pr-[98px] pr-[60px] ${
                      windowHeight > 700
                        ? "text-[16px] smd:text-[26px] smd:h-[102px] smd:w-[652px] h-[64px] w-full"
                        : "text-[16px] h-[64px] smd:w-[476px] w-full"
                    }`}
                    placeholder={
                      `${userName ? userName : "Your username"}` + ".qviq.io"
                    }
                  />
                </>
              )}

              <PrimaryButton
                // onClick={() => {
                //   setClicked(true);
                //   searchParams.userName = userName;
                // }}
                type="submit"
                text=""
                icon={<IoIosArrowForward className="text-[26px]" />}
                className={`!absolute z-[5] ${
                  windowHeight > 700
                    ? "h-[40px] w-[40px] smd:h-[70px] smd:w-[70px] m-[12px] smd:m-[16px]"
                    : "smd:h-[48px] h-[40px] w-[40px] m-[12px]"
                }`}
                isDisabled={
                  /^[wW]+$/.test(userName) ||
                  userName === "www" ||
                  !VerifyUsername ||
                  userName === ""
                    ? true
                    : false
                }
                color={
                  /^[wW]+$/.test(userName) ||
                  userName === "www" ||
                  !VerifyUsername ||
                  userName === ""
                    ? "#FFD0D0"
                    : "linear-gradient(225deg, #FB6609 0%, #E40849 100%)"
                }
              />
            </form>

            <div className="flex flex-row justify-center items-center mt-[15px]  xxsm:items-start mb-[50px]">
              <p className="font-semibold text-[12px] sm:text-[16px] text-[#817C7C] leading-[24px] ">
                Already have an account?
              </p>
              <div style={{ cursor: "pointer" }} onClick={redirectToLogin}>
                {" "}
                <p className="ml-1 text-[12px]  add-icon font-semibold sm:text-[16px] leading-[24px]">
                  Login
                </p>
              </div>
            </div>
          </div>

          <div
            className={`relative flex flex-col justify-end items-center bg-[#7D46D7] w-full ${
              windowHeight > 730
                ? "h-[80%] max-h-[449px]"
                : "h-[40%] max-h-[449px]"
            }`}
            style={{ transition: "300ms" }}
          >
            <Image
              className="absolute top-[50%] left-[50%] h-[110%]"
              style={{ transform: "translate(-50%, -70%)" }}
              src={require("./assets/Profile Mockup.svg")}
              alt="Profile"
            />
          </div>
        </div>
      )}

      {clicked && (
        <div
          className={`w-full px-[20px] h-screen flex flex-col justify-between items-center bg-[#FFFFFF] font-poppins overflow-y-scroll gap-[32px]`}
        >
          <Navbar usedIn="signup" background="white" />

          <div
            className={`w-full h-full flex flex-col justify-start items-center ${
              windowHeight > 700
                ? "gap-[48px] smd:pt-[204px] pt-[132px]"
                : "smd:gap-[48px] gap-[32px] pt-[118px]"
            }`}
          >
            <p className="w-full h-[56px] flex flex-col justify-end items-center smd:text-[40px] text-[22px] font-[700] text-[#0A0003] text-center">
              Create your account
            </p>

            <p className="max-w-[451px] w-full smd:text-[16px] text-[14px] font-[500] text-center text-[#817C7C]">
              By clicking create account you agree to Tapop's{" "}
              <a
                className="underline"
                href="https://qviq.io/term-and-conditions"
              >
                Terms & conditions
              </a>{" "}
              and{" "}
              <a className="underline" href="https://qviq.io/privacy-policy">
                Privacy Policy
              </a>
            </p>

            <form
              // onSubmit={handleEmailSubmit}
              className="h-auto max-w-[482px] w-full flex flex-col gap-[20px]"
            >
              <SecondaryButtonLogoCustom
                classStyle="hover:border-[1px] hover:border-[#817C7C] hover:scale-[104%] max-w-[482px]"
                text="Continue with Google"
                img={Google}
                icon=""
                onClick={signInWithGoogle}
                height="64px"
                width="100%"
              />

              {/* <SecondaryButtonLogoCustom
                classStyle="hover:border-[1px] hover:border-[#817C7C] hover:scale-[104%] max-w-[482px]"
                text="Continue with Linkedin"
                img={Linkedin}
                icon=""
                onClick={handleLinkedInLogin}
                height="64px"
                width="100%"
              /> */}

              <SecondaryButtonLogoCustom
                classStyle="hover:border-[1px] hover:border-[#817C7C] hover:scale-[104%] max-w-[482px]"
                text="Continue with Mobile"
                img={Mobile}
                icon=""
                onClick={() => {
                  setShowPhoneModal(true);
                }}
                height="64px"
                width="100%"
              />
            </form>
          </div>

          <p className="max-w-[451px] w-full text-[12px] smd:text-[14px] text-[#817C7C] text-center mb-[40px]">
            This site is protected by reCAPTCHA and the{" "}
            <a className="underline" href="https://policies.google.com/privacy">
              Google Privacy Policy
            </a>{" "}
            and{" "}
            <a className="underline" href="https://policies.google.com/terms">
              Terms of Service
            </a>{" "}
            apply.
          </p>
        </div>
      )}

      <NewToast open={showMessage} message={message} />

      {showPhoneModal && (
        <NewModal
          text={"Sign up with mobile number"}
          onModal={showPhoneModal}
          onClick={setShowPhoneModal}
        >
          <form className="w-full flex flex-col justify-start items-center gap-[16px] py-[32px]">
            <p className="w-full text-[14px] font-[600] text-[#817C7C] text-left">
              Please enter your mobile number. <br /> We will send a one time
              password(OTP) to verify your mobile number.
            </p>

            <div className="w-full">
              <InputFieldCC
                label="Mobile Number"
                type="mobile"
                name="mobile"
                placeholder="9876543210"
                value={phoneNumber}
                onChange={handlePhoneNumber}
                width="100%"
                height="50px"
              />
            </div>

            <div className="w-full h-[50px] sm:mt-[30px] sm:mb-0 mb-[30px]">
              <PrimaryButton2
                isDisabled={phoneNumber.length === 0 ? true : false}
                onClick={() => {
                  signUpWithPhoneNumber();
                  setEditNumber(false);
                  setOtpModal(true);
                }}
                text="Send OTP"
                width="100%"
                height="100%"
              />
            </div>
          </form>
        </NewModal>
      )}

      {otpModal && (
        <NewModal
          text={"Verify your mobile number"}
          onModal={otpModal}
          onClick={setOtpModal}
        >
          <div className="w-full h-fit flex flex-col justify-start items-center gap-[28px] pb-[50px] sm:px-[10px]">
            <p className="text-sm mt-[20px] text-left w-full">
              Please enter the 6-digit OTP sent to your mobile number ending
              with **** {phoneNumber.slice(6)}
            </p>
            <div className="w-full">
              <button
                className="text-[#FB6609] text-sm"
                onClick={() => {
                  setShowPhoneModal(true);
                  setOtpModal(false);
                }}
              >
                Edit your phone number
              </button>
            </div>
            {/* <InputField
              label="Enter OTP Here"
              type="number"
              name="number"
              placeholder="# # # &nbsp; # # #"
              value={otp}
              onChange={(e) => setOTP(e.target.value)}
              width="100%"
              align="center"
            /> */}
            <div className="flex flex-col w-full">
              <label htmlFor="myInput" className="label-field">
                Enter OTP Here
              </label>
              <OtpInput
                value={otp}
                onChange={setOTP}
                numInputs={6}
                // renderSeparator={<span>-</span>}
                renderInput={(props) => (
                  <input
                    {...props}
                    id="myInput"
                    type="number"
                    name="number"
                    className="sm:w-[56px] xsm:w-[48px] w-[35px] sm:h-[56px] xsm:h-[48px] h-[35px]"
                    style={{
                      marginRight: "4px",
                      border: "1px solid #DFDBD8",
                      padding: "0.563em 0.875em",
                      outline: "none",
                      borderRadius: "8px",
                      backgroundColor: "#fff",
                      color: "#1A1A1A",
                      textAlign: "center",
                      fontSize: "14px",
                      fontWeight: "700",
                    }}
                  />
                )}
              />
            </div>
            <p className="text-nowrap text-sm mt-1 text-left w-full text-opacity-80">
              Didn't Receive an OTP?{" "}
              <button
                className=" text-[#FB6609]"
                onClick={signUpWithPhoneNumber}
              >
                Resend OTP
              </button>
            </p>
            <div className="flex justify-around items-center gap-2 text-nowrap w-full">
              <PrimaryButton2
                isDisabled={otp.length === 0 ? true : false}
                onClick={confirmCode}
                text="Verify & Proceed"
                width="100%"
              />
            </div>
          </div>
        </NewModal>
      )}

      <div ref={recaptchaWrapperRef} className="relative z-[9999]">
        <div id="recaptcha-container"></div>
      </div>

      {isLoading && (
        <>
          <div className="absolute top-0 left-0 flex flex-col justify-center items-center w-full h-full bg-black/30 z-[9999]">
            <div className="flex flex-col justify-center relative items-center w-[3rem] h-[3rem]">
              <img
                src={require("../Image/Tapop logo black.png").default.src}
                alt=""
                className="object-contain"
              />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex justify-center items-center">
              <LoadingAnimation />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
