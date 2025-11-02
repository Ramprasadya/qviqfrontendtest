"use client";
import React, { useState, useRef, useEffect, useContext } from "react";
// import { Link, useLocation } from "react-router-dom";
import { useRouter } from "next/navigation";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { auth } from "./firebaseconfig";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import TapopLogo from "./assets/Tapop Final Logo Concept 1 2.svg";
import QuestionMark from "./assets/question-mark-circle.svg";
import Google from "./assets/Google.svg";
import Mobile from "./assets/Mobile.svg";
import Lock from "./assets/lock-closed.svg";
import MailIcon from "./assets/mail-line.svg";
import { LuEyeOff, LuEye } from "react-icons/lu";

import LeftArrow from "./assets/leftArrow.svg";
import InputField from "../UiComponents/InputField";
import PrimaryButton2 from "../UiComponents/PrimaryButton2";
import SecondaryButtonLogoCustom from "../UiComponents/SecondaryButtonLogoCustom";
import "./login.css";
import "../UiComponents/iconTextStyle.css";
import { token } from "./Constant";
import NewToast from "../UiComponents/NewToast";
import { HiOutlineChevronLeft } from "react-icons/hi";
import { clientUrl, hostname, serverUrl } from "../../config";
import Image from "next/image";
import Link from "next/link";
import { RecaptchaVerifier } from "firebase/auth";
import NewModal from "../UiComponents/NewModal/NewModal";
import SecondaryButton from "../UiComponents/SecondaryButton";
import PrimaryButton3 from "../UiComponents/PrimaryButton3";
import PrimaryButton4 from "../UiComponents/PrimaryButton4";
import InputFieldCC from "../UiComponents/countryCodeField";
import { UserContext } from "../Contexts/context";
import { SafeLocalStorage, createQueryString, setCookie } from "@/components/utils";
import validator from "validator";

export default function LoginPage({ searchParams }) {
  const qrId = searchParams.qrId;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgotPassword, setForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetCodeSent, setResetCodeSent] = useState(false);
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showMessage, setShowtMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [bg, setBg] = useState("#FFD0D0");
  const [rememberMe, setRememberMe] = useState(true);
  const [timer, setTimer] = useState(0);
  const navigate = useRouter();

  const { updateCheckVariable } = useContext(UserContext);

  // from which page the user is redirected to login page
  // const location = useLocation();
  const fromPage =
    searchParams.fromPage !== undefined ? searchParams.fromPage : "admin";
  const redirectToSignUp = () => {
    if (fromPage === "cart") {
      navigate.push("/signup?" + createQueryString(["fromPage"], [fromPage]));
    } else {
      navigate.push("/signup");
    }
  };

  // OTP
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  const handleOtpChange = (e, index) => {
    const newOtp = [...otp];
    newOtp[index] = e.target.value;

    setOtp(newOtp);

    if (e.target.value !== "") {
      if (index === otp.length - 1) {
        inputRefs.current[index].blur();
      } else {
        inputRefs.current[index + 1].focus();
      }
    } else {
      if (index !== 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "") {
      if (index !== 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };
  const [confirmationResult, setConfirmationResult] = useState({});
  const [reCaptchaVerifier, setReCaptchaVerifier] = useState();
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verifyOTP, setOTP] = useState("");
  const [showResetPhoneModal, setShowResetPhoneModal] = useState(false);
  const [passwordLoginModal, setPasswordLoginModal] = useState(false);

  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredMobile, setEnteredMobile] = useState("");

  const recaptchaWrapperRef = useRef(null);

  const handlePhoneNumber = (e) => {
    const newPhoneNumber = e.target.value;
    const numericRegex = /^[0-9]*$/;

    if (numericRegex.test(newPhoneNumber)) {
      setPhoneNumber(newPhoneNumber);
      setEnteredMobile(newPhoneNumber);
      setEmail(newPhoneNumber);
    } else {
      setEmail("");
    }
  };

  const handlePasswordLoginNumber = () => {
    setPasswordLoginModal(true);
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
        setMessage("OTP Sent!");
        setShowtMessage(true);
        setTimeout(() => {
          setShowtMessage(false);
        }, 3000);
      })
      .catch((err) => {
        //console.log(err);
        setMessage("Unable to Send OTP, Try Again Later!");
        setShowtMessage(true);
        setTimeout(() => {
          setShowtMessage(false);
        }, 3000);
      });
  };
  const confirmCode = () => {
    if (confirmationResult && confirmationResult.confirm) {
      confirmationResult
        .confirm(verifyOTP)
        .then((result) => {
          const user = result.user;
          fetch(
            `${serverUrl}/tapopuser/signinwithphonenumber/${user.phoneNumber.replace(
              "+",
              ""
            )}/${qrId}`
          )
            .then((res) => res.json())
            .then((data) => {
              if (data.error) {
                setMessage(data.error);
                setShowtMessage(true);
                setTimeout(() => {
                  setShowtMessage(false);
                }, 3000);
              } else if (data.exists) {
                setCookie("jwt_token", data.token, 3);
                token.value = data.token;
                SafeLocalStorage.setItem("user", JSON.stringify(data.user));
                SafeLocalStorage.setItem("loginStatus", true);
                SafeLocalStorage.setItem("rememberMe", rememberMe);
                updateCheckVariable();
                setMessage("Welcome");
                setShowtMessage(true);
                setTimeout(() => {
                  setShowtMessage(false);
                }, 3000);

                if (fromPage === "cart") {
                  navigate.push("/address");
                } else if (fromPage === "pricing") {
                  navigate.push(
                    `/plan/${data.user.userName}?` +
                      createQueryString(["fromPage"], [fromPage])
                  );
                } else if (
                  fromPage != undefined &&
                  fromPage != null &&
                  /\/devices\//.test(fromPage)
                ) {
                  navigate.push(fromPage);
                } else {
                  if (forgotPassword) {
                    navigate.push(`/myaccount/${data.user.userName}`);
                  } else {
                    navigate.push(`/selectprofile/${data.user.userName}`);
                  }
                }
              } else {
                // User does not exist
                setMessage("User does not exist");
                setShowtMessage(true);
                setTimeout(() => {
                  setShowtMessage(false);
                }, 3000);
              }
            })
            .catch((error) => {
              //console.log(error);
            });
          setShowPhoneModal(false);
        })
        .catch((err) => {
          //console.log(err);
          setMessage("Wrong OTP!");
          setShowtMessage(true);
          setTimeout(() => {
            setShowtMessage(false);
          }, 3000);
        });
    }
  };

  const handleResetPhone = async (userPhoneNumber) => {
    setTimer(60);
    if (reCaptchaVerifier && recaptchaWrapperRef) {
      reCaptchaVerifier.clear();
      recaptchaWrapperRef.current.innerHTML = `<div id="recaptcha-container"></div>`;
    }
    const newReCaptcha = new RecaptchaVerifier(auth, "recaptcha-container", {
      size: "invisible",
    });
    setReCaptchaVerifier(newReCaptcha);
    setShowResetPhoneModal(true);
    auth
      .signInWithPhoneNumber("+" + userPhoneNumber, newReCaptcha)
      .then((confirmationResult) => {
        setConfirmationResult(confirmationResult);
        setMessage("OTP Sent!");
        setShowtMessage(true);
        setTimeout(() => {
          setShowtMessage(false);
        }, 3000);
      })
      .catch((err) => {
        //console.log(err);
        setMessage("Unable to Send OTP, Try Again Later!");
        setShowtMessage(true);
        setTimeout(() => {
          setShowtMessage(false);
        }, 3000);
      });
  };

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    // provider.setCustomParameters({prompt:"select_account"});
    auth
      .signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        fetch(`${serverUrl}/tapopuser/signinwithgoogle/${user.email}/${qrId}`)
          .then((res) => res.json())
          .then((data) => {
            if (data.error) {
              setMessage(data.error);
              setShowtMessage(true);
              setTimeout(() => {
                setShowtMessage(false);
              }, 3000);
            } else if (data.exists) {
              // User exists
              // // User does not exist
              // SafeLocalStorage.setItem("jwt", data.token);
              // token.value = data.token;
              // SafeLocalStorage.setItem("user", JSON.stringify(data.user));
              // SafeLocalStorage.setItem("loginStatus", true);
              // //console.log(data.user.userName);
              // setMessage("Welcome");
              // setShowtMessage(true);
              // setTimeout(() => {
              //   setShowtMessage(false);
              // }, 3000);
              // const newUrl = `${clientUrl}/selectprofile/${data.user.userName}`;
              // window.location.href = newUrl;
              // //console.log("User exist");
              // toast.success("Welcome");
              setCookie("jwt_token", data.token, 3);
              token.value = data.token;
              SafeLocalStorage.setItem("user", JSON.stringify(data.user));
              SafeLocalStorage.setItem("loginStatus", true);
              SafeLocalStorage.setItem("rememberMe", rememberMe);
              updateCheckVariable();
              setMessage("Welcome");
              setShowtMessage(true);
              setTimeout(() => {
                setShowtMessage(false);
              }, 3000);

              if (fromPage === "cart") {
                navigate.push("/address");
              } else if (fromPage === "pricing") {
                navigate.push(
                  `/plan/${data.user.userName}?` +
                    createQueryString(["fromPage"], [fromPage])
                );
              } else if (
                fromPage != undefined &&
                fromPage != null &&
                /\/devices\//.test(fromPage)
              ) {
                navigate.push(fromPage);
              } else {
                navigate.push(`/selectprofile/${data.user.userName}`);
              }
            } else {
              // User does not exist
              setMessage("User does not exist");
              setShowtMessage(true);
              setTimeout(() => {
                setShowtMessage(false);
              }, 3000);
            }
          })
          .catch((error) => {
            //console.log(error);
          });
      })
      .catch((error) => {
        //console.log(error);
      });
  };

  function toggleShowPassword() {
    setShowPassword(!showPassword);
  }
  async function onSignin(e) {
    e.preventDefault();
    const response = await fetch(`${serverUrl}/tapopuser/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.includes("@") ? email : null,
        phoneNumber: email.includes("@") ? null : "91" + email,
        password,
        qrId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          // toast.error(data.error);
          setMessage(data.error);
          setShowtMessage(true);
          setTimeout(() => {
            setShowtMessage(false);
          }, 3000);
        } else {
          setCookie("jwt_token", data.token, 3);
          SafeLocalStorage.setItem("user", JSON.stringify(data.user));
          SafeLocalStorage.setItem("loginStatus", true);
          SafeLocalStorage.setItem("rememberMe", rememberMe);
          updateCheckVariable();
          // toast.success(data.message);
          setMessage(data.message);
          setShowtMessage(true);
          setTimeout(() => {
            setShowtMessage(false);
          }, 3000);
          // If the response includes a redirect URL, redirect to that URL
          if (data.redirectUrl) {
            window.location.href = data.redirectUrl;
          } else {
            if (fromPage === "cart") {
              navigate.push("/address");
            } else if (fromPage === "pricing") {
              navigate.push(
                `/plan/${data.user.userName}?` +
                  createQueryString(["fromPage"], [fromPage])
              );
            } else if (
              fromPage != undefined &&
              fromPage != null &&
              /\/devices\//.test(fromPage)
            ) {
              navigate.push(fromPage);
            } else {
              navigate.push(`/selectprofile/${data.user.userName}`);
            }
            // const dataToSend = {
            //   jwt: data.token,
            // };
            // window.parent.postMessage(
            //   dataToSend,
            //   `http://${data.user.userName}.${hostname}`
            // );
          }
        }
      })
      .catch((err) => console.log(err));
  }

  async function onSendResetCode(e) {
    e.preventDefault();
    if (!resetEmail.includes("@")) {
      fetch(`${serverUrl}/tapopuser/checkPhoneNumber/${resetEmail}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.exists) {
            handleResetPhone(resetEmail);
          } else {
            setMessage("User Not Found!");
            setShowtMessage(true);
            setTimeout(() => {
              setShowtMessage(false);
            }, 3000);
          }
        })
        .catch((error) => {
          //console.log(error);
        });
      return;
    }
    const response = await fetch(
      `${serverUrl}/tapopuser/tapopuser/sendresetcode`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: resetEmail,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          // toast.error(data.error);
          setMessage(data.error);
          setShowtMessage(true);
          setTimeout(() => {
            setShowtMessage(false);
          }, 3000);
        } else {
          // toast.success(data.message);
          setMessage("Recovery code sent to your email");
          setShowtMessage(true);
          setTimeout(() => {
            setShowtMessage(false);
          }, 3000);
          setResetCodeSent(true);
        }
      });
  }

  async function onResetPassword(e) {
    e.preventDefault();
    const response = await fetch(`${serverUrl}/tapopuser/resetpassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: resetEmail,
        resetCode: otp.join(""),
        newPassword,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          // toast.error(data.error);
          setMessage(data.error);
          setShowtMessage(true);
          setTimeout(() => {
            setShowtMessage(false);
          }, 3000);
        } else {
          // toast.success(data.message);
          handleBackBtn();
          setMessage(data.message);
          setShowtMessage(true);
          setTimeout(() => {
            setShowtMessage(false);
          }, 3000);
        }
      });
  }

  const handleBackBtn = () => {
    setForgotPassword(false);
    setResetCodeSent(false);
    setResetEmail("");
    setNewPassword("");
    otp.forEach((ele, index) => {
      setOtp((otp) => {
        otp[index] = "";
        return otp;
      });
      if (inputRefs !== undefined) {
        if (
          inputRefs.current !== null &&
          inputRefs.current[index] !== undefined &&
          inputRefs.current[index] !== null
        ) {
          inputRefs.current[index].value = "";
        }
      }
    });
  };

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

  const [editNumber, setEditNumber] = useState(true);
  useEffect(() => {
    if (!showPhoneModal && !editNumber) {
      setEditNumber(true);
    }
  }, [showPhoneModal]);

  const [inputType, setInputType] = useState("email");

  return (
    <div className="w-screen h-screen ">
      {/* **************************** tapop Logo *********************************** */}

      <div className="parent_container ">
        {/* *************************** * left div *********************************** */}

        <div className=" w-full lg:w-[960px] xl:w-full h-full flex flex-col items-center overflow-scroll">
          <div className="w-full h-[55px] sm:h-[75px] flex flex-col items-start justify-start pt-[15px] pl-3 lg:pl-10 xl:pl-[2rem]">
            <Image className="h-full w-auto" src={TapopLogo} alt="logo" />
          </div>

          {/* Login Page */}
          {!forgotPassword ? (
            <div className="main_container item-start item-start gap-1">
              <h1
                className="first_heading text-[28px] md:text-[38px] lg:text-[48px] font-bold  w-[226px] 
                md:w-[388px] lg:w-[388px] h-[42px]  lg:h-[56px] sm:mt-[30px] md:mt-[50px]  lg:mt-[70px] mt-[1.5rem] relative"
              >
                {/* {fromPage === "cart" && (
                  <Link
                    to={"/cart"}
                    className="flex items-center gap-1.5 absolute -top-4 xsm:-top-3 sm:-top-5 md:-top-6 lg:-top-9 text-sm font-medium hover:cursor-pointer text-[#F54040]"
                  >
                    <HiOutlineChevronLeft /> Back
                  </Link>
                )} */}
                Welcome back!
              </h1>
              <p className=" w-full lg:w-[204px] h-[20px] lg:h-[28px] mt-1 md:mt-[8px] lg:mt-[12px] normal font-medium text-[14px] md:text-[20px] leading-[28px] text-[#817C7C]">
                Login to your Qviq.
              </p>

              <form
                onSubmit={onSignin}
                className="form_container mt-[36px] lg:mt-[44px] h-auto w-[320px] md:w-[500px] lg:w-[592px] flex flex-col gap-[10px] sm:gap-[20px]"
              >
                <SecondaryButtonLogoCustom
                  text="Continue with Google"
                  img={Google}
                  icon=""
                  height="50px"
                  width="100%"
                  onClick={signInWithGoogle}
                />

                <SecondaryButtonLogoCustom
                  text="Continue with Mobile"
                  img={Mobile}
                  icon=""
                  onClick={() => {
                    setShowPhoneModal(true);
                  }}
                  height="50px"
                  width="100%"
                />

                <div className="flex items-center my-4">
                  <hr className="flex-grow border-t-[2px] border-[#d6d6d6] mx-4" />
                  <span className="text-[#7e7e7e] font-[500]">OR</span>
                  <hr className="flex-grow border-t-[2px] border-[#d6d6d6] mx-4" />
                </div>

                <SecondaryButtonLogoCustom
                  text="Login with Password"
                  img={Lock}
                  icon=""
                  onClick={handlePasswordLoginNumber}
                  height="50px"
                  width="100%"
                />
                <div className="w-full flex flex-row items-center justify-start ml-4 gap-2 text-sm">
                  <input
                    type="checkbox"
                    onChange={(e) => setRememberMe(e.target.checked)}
                    checked={rememberMe}
                    className="cursor-pointer"
                  />
                  <p>Remember Me On This Device</p>
                </div>
                <div className="flex gap-x-1 justify-center items-center w-[155px] h-[28px] cursor-pointer mt-[5px]">
                  <p
                    onClick={() => setForgotPassword(true)}
                    className="font-medium normal leading-[22px] add-icon "
                    style={{ cursor: "pointer" }}
                  >
                    Forgot Password
                  </p>
                  <Image
                    className="add-icon"
                    onClick={() => setForgotPassword(true)}
                    style={{ cursor: "pointer" }}
                    src={QuestionMark}
                    alt="QuestionMark"
                  />
                </div>

                <div className="forget_container flex flex-row justify-center items-center  text-[14px] lg:text-[16px] font-semibold mb-[50px] leading-[24px] mt-[15px] lg:mt-[50px]">
                  <p className="text-[#817C7C] ">
                    Don't have an account with us?
                  </p>
                  <Link
                    href={"/signup"}
                    style={{ cursor: "pointer" }}
                    onClick={(e) => {
                      e.preventDefault();
                      redirectToSignUp();
                    }}
                  >
                    {" "}
                    <p className="ml-1 add-icon">Sign Up</p>
                  </Link>
                </div>
              </form>
            </div>
          ) : (
            <div className=" items-center">
              {/* ****************************************  reset password ******************************************** */}

              {/* ************************************* Enter your password and otp ***************************************** */}
              {resetCodeSent ? (
                <div>
                  <div
                    className="relative -ml-3 md:ml-0 w-[73px] h-[28px] flex justify-center items-center gap-1 mt-12  md:mt-[3rem] lg:mt-[5rem] "
                    onClick={handleBackBtn}
                  >
                    <Image
                      className="w-[16px] h-[16px]"
                      style={{ cursor: "pointer" }}
                      src={LeftArrow}
                      alt="LeftArrow"
                    />
                    <button className="add-icon">Back</button>
                  </div>

                  <div className=" relative top-[28px]  ">
                    <h1 className="text-[16px] sm:text-[22px] md:text-[38px] lg:text-[48px] font-bold w-full md:w-[550px] lg:w-[630px] h-full lg:h-[56px] ">
                      Enter Your New Password
                    </h1>
                    <p className="w-full h-auto lg:h-[28px] mt-1 sm:mt-2 md:mt-0 lg:mt-[12px] normal font-medium text-[14px] sm:text-[20px] leading-[28px] text-[#817C7C] ">
                      Enter otp and new password
                    </p>

                    <form
                      onSubmit={onResetPassword}
                      className="mt-[36px] lg:mt-[44px] h-auto w-full md:w-[500px] lg:w-[592px] flex flex-col "
                    >
                      <div className="flex flex-col">
                        <label htmlFor="myInput" className="label-field">
                          Enter the code sent to your Email
                        </label>
                        <div className="flex gap-x-3 w-full ">
                          {otp.map((digit, index) => (
                            <input
                              ref={(ref) => (inputRefs.current[index] = ref)}
                              type="text"
                              maxLength={1}
                              className="border border-[#DFDBD8] text-center h-[40px] w-[30px] sm:w-[40px] bg-[#FFFFFF] rounded-[8px]"
                              value={digit}
                              onChange={(e) => handleOtpChange(e, index)}
                              onKeyDown={(e) => handleKeyDown(e, index)}
                              key={index}
                            />
                          ))}
                        </div>
                      </div>

                      {/* <p>OTP Entered - {otp.join("")}</p> */}

                      <div className="relative mt-[20px] sm:mt-[36px]">
                        <InputField
                          label="Enter new password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter new password"
                          onChange={(event) =>
                            setNewPassword(event.target.value.trim())
                          }
                          value={newPassword}
                          width="100%"
                        />
                        <Image
                          src={Eye}
                          alt="eye"
                          className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600 mt-[36.5px]"
                          style={{ cursor: "pointer" }}
                          checked={showPassword}
                          onClick={toggleShowPassword}
                        />
                      </div>

                      <div className="flex flex-col justify-around mt-[36px] md:mt-[40px] ">
                        <PrimaryButton2
                          type="submit"
                          text="Change Password"
                          isDisabled={newPassword === "" ? true : false}
                          color={
                            newPassword === ""
                              ? "#F7B2C7"
                              : "linear-gradient(225deg, #FB6609 0%, #E40849 100%)"
                          }
                          textColor="white"
                          width="100%"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              ) : (
                <div>
                  <div
                    className="relative -ml-3 md:ml-[140px] w-[73px] h-[28px] flex justify-center items-center gap-1 mt-12  md:mt-[3rem] lg:mt-[3rem] "
                    onClick={handleBackBtn}
                  >
                    <Image
                      className="w-[16px] h-[16px]"
                      style={{ cursor: "pointer" }}
                      src={LeftArrow}
                      alt="LeftArrow"
                    />
                    <button className="add-icon">Back</button>
                  </div>

                  <div className=" mb-[156px] mt-[40px] relative lg:!top-[6rem]  md:mx-[156px]">
                    <h1 className="text-[20px] md:text-[38px] lg:text-[48px] font-bold  w-full md:w-[450px] lg:w-[515px] h-[42px]  lg:h-[56px]  mt-[08px] lg:mt-[-108px]">
                      Reset Your Password
                    </h1>
                    <p className=" w-full lg:w-[260px] h-[20px] lg:h-[28px] mt-[8px] lg:mt-[12px] normal font-medium text-[16px] sm:text-[20px] leading-[28px] text-[#817C7C]">
                      Enter your email address or phone number
                    </p>

                    <form
                      onSubmit={onSendResetCode}
                      className="form_container mt-[36px] lg:mt-[44px] h-auto w-full md:w-[500px] lg:w-[592px] flex flex-col "
                    >
                      <InputField
                        label="Your Email or Phone Number"
                        type="text"
                        placeholder="johndoe1@email.com or 919876543210"
                        onChange={(event) =>
                          setResetEmail(event.target.value.trim())
                        }
                        value={resetEmail}
                        width="100%"
                        height="48px"
                      />

                      <div className="flex flex-col justify-around mt-[36px] md:mt-[40px] ">
                        <PrimaryButton2
                          type="submit"
                          text="Reset Password"
                          isDisabled={resetEmail === "" ? true : false}
                          color={
                            resetEmail === ""
                              ? "#F7B2C7"
                              : "linear-gradient(225deg, #FB6609 0%, #E40849 100%)"
                          }
                          textColor="white"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}
           {/* <ToastContainer /> */}
        </div>
      </div>

      <NewToast open={showMessage} message={message} />

      {passwordLoginModal && (
        <NewModal
          text="Log In with Password"
          onModal={passwordLoginModal}
          onClick={setPasswordLoginModal}
        >
          <form
            onSubmit={onSignin}
            className="flex flex-col pt-[30px] pb-[60px] sm:pb-[30px] gap-4 items-center justify-center"
          >
            <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-[10px] mb-[15px]">
              <SecondaryButtonLogoCustom
                border={inputType == "email" ? "4px solid #cccccc" : ""}
                text="Continue with Email"
                img={MailIcon}
                icon=""
                onClick={() => setInputType("email")}
                height="50px"
                width="100%"
              />

              <p>OR</p>

              <SecondaryButtonLogoCustom
                border={inputType == "mobile" ? "4px solid #cccccc" : ""}
                text="Continue with Mobile"
                img={Mobile}
                icon=""
                onClick={() => setInputType("mobile")}
                height="50px"
                width="100%"
              />
            </div>

            {inputType == "email" ? (
              <InputField
                label="Your Email"
                type="text"
                name="text"
                placeholder="johndoe@email.com"
                value={enteredEmail}
                onChange={(event) => {
                  const inputValue = event.target.value
                  if (!validator.isEmail(inputValue)){
                    setEmail("Please, enter a valid email!");
                  }else {
                    setEmail("");
                  }
                  
                  setEnteredEmail(inputValue.trim());
                }}
                width="100%"
              />
            ) : (
              <InputFieldCC
                label="Mobile Number"
                type="mobile"
                name="mobile"
                placeholder="9876543210"
                value={enteredMobile}
                onChange={(e) => {
                  handlePhoneNumber(e);
                }}
                width="100%"
              />
            )}
            {/* {email ? <label className="text-[#FE7171] text-[14px]">{email}</label>:""} */}

            <div className="relative mt-[20px] md:mt-[26px] w-full">
              <InputField
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(event) => setPassword(event.target.value.trim())}
                width="100%"
              />

              {showPassword ? (
                <LuEye
                  className="absolute inset-y-0 right-[15px] flex items-center mt-[36.5px] text-[20px]"
                  style={{ cursor: "pointer" }}
                  checked={showPassword}
                  onClick={toggleShowPassword}
                />
              ) : (
                <LuEyeOff
                  className="absolute inset-y-0 right-[15px] flex items-center mt-[36.5px] text-[20px]"
                  style={{ cursor: "pointer" }}
                  checked={showPassword}
                  onClick={toggleShowPassword}
                />
              )}
            </div>

            <div className="flex gap-y-[20px] flex-col justify-around mt-[28px] w-full mb-[10px] sm:mb-[0px]">
              <PrimaryButton2
                type="submit"
                text="Login"
                isDisabled={email === "" || password === "" ? true : false}
                color={
                  email === "" || password === ""
                    ? "#F7B2C7"
                    : "linear-gradient(225deg, #FB6609 0%, #E40849 100%)"
                }
                textColor="white"
              />
            </div>
          </form>
        </NewModal>
      )}
      {showPhoneModal && (
        <NewModal
          text="Log In with mobile number"
          onModal={showPhoneModal}
          onClick={setShowPhoneModal}
        >
          <div className="flex flex-col pt-[30px] pb-[60px] sm:pb-[30px] gap-4 items-center justify-center">
            {editNumber ? (
              <div className="w-full h-fit flex flex-col justify-start items-end gap-[28px] pb-[20px] px-[10px]">
                <InputFieldCC
                  label="Enter Phone Number"
                  type="mobile"
                  name="mobile"
                  placeholder="9876543210"
                  value={phoneNumber}
                  onChange={handlePhoneNumber}
                  width="100%"
                  height="40px"
                />
                <PrimaryButton2
                  isDisabled={phoneNumber.length === 0 ? true : false}
                  onClick={() => {
                    signUpWithPhoneNumber();
                    setEditNumber(false);
                  }}
                  text="Send OTP"
                  width="100%"
                />
              </div>
            ) : (
              <div className="w-full h-fit flex flex-col justify-start items-center gap-[28px] pb-[20px] px-[10px]">
                <InputField
                  label="Enter OTP"
                  type="number"
                  name="number"
                  placeholder="# # # &nbsp; # # #"
                  value={verifyOTP}
                  onChange={(e) => setOTP(e.target.value)}
                  width="100%"
                  align="center"
                />
                <div className="flex justify-around items-center gap-2 text-nowrap">
                  <SecondaryButton
                    isDisabled={timer !== 0 ? true : false}
                    onClick={signUpWithPhoneNumber}
                    text={`Resend OTP ${timer == 0 ? "" : `0:${timer} sec`}`}
                    width="100%"
                  />
                  <PrimaryButton2
                    isDisabled={verifyOTP.length === 0 ? true : false}
                    onClick={confirmCode}
                    text="Submit"
                    width="100%"
                  />
                </div>
              </div>
            )}
          </div>
        </NewModal>
      )}
      {showResetPhoneModal && (
        <NewModal
          text="Reset Password"
          onModal={showResetPhoneModal}
          onClick={setShowResetPhoneModal}
        >
          <div className="flex flex-col pt-[30px] pb-[60px] sm:pb-[30px] gap-4 items-center justify-center">
            <div className="w-full h-[130px] flex flex-col justify-start items-center gap-3">
              <InputField
                label="Enter OTP"
                type="number"
                name="number"
                placeholder="# # # &nbsp; # # #"
                value={verifyOTP}
                onChange={(e) => setOTP(e.target.value)}
                width="100%"
                align="center"
              />
              <div className="flex justify-around items-center gap-2 text-nowrap">
                <SecondaryButton
                  isDisabled={timer !== 0 ? true : false}
                  onClick={handleResetPhone}
                  text={`Resend OTP ${timer == 0 ? "" : `0:${timer} sec`}`}
                  width="100%"
                />
                <PrimaryButton2
                  isDisabled={verifyOTP.length === 0}
                  onClick={confirmCode}
                  text="Submit"
                  width="100%"
                />
              </div>
            </div>
          </div>
        </NewModal>
      )}
      <div ref={recaptchaWrapperRef} className="relative z-[9999]">
        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
}
