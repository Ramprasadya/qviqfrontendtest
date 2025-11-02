"use client";
import React, { useState, useEffect, useRef, useContext } from "react";
import firebase from "firebase/compat/app";
import { RecaptchaVerifier } from "firebase/auth";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { FacebookAuthProvider } from "firebase/auth";
import { Button } from "reactstrap";
// import {useLocation } from "react-router-dom";
import { useLocation } from "react";
import Link from "next/link";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import { auth } from "./firebaseconfig";
import Google from "./assets/Google.svg";
import Mobile from "./assets/Mobile.svg";
import Whatsapp from "./assets/Whatsapp.svg";
import LeftArrow from "./assets/leftArrow.svg";
import InputField from "../UiComponents/InputField";
import PrimaryButton2 from "../UiComponents/PrimaryButton2";
import SecondaryButtonLogoCustom from "../UiComponents/SecondaryButtonLogoCustom";
import "../UiComponents/iconTextStyle.css";
import "../UiComponents/UiStyles.css";
import {
  HiCheckCircle,
  HiInformationCircle,
  HiOutlineChevronLeft,
  HiOutlineEye,
  HiExclamationCircle,
  HiOutlineEyeOff,
  HiXCircle,
} from "react-icons/hi";
import NewToast from "../UiComponents/NewToast";
import { serverUrl } from "../../config";
import { clientUrl } from "../../config";
import { first } from "lodash";
import { UserContext } from "../Contexts/context";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { userNameList } from "../userNameList";
import NewModal from "../UiComponents/NewModal/NewModal";
import SecondaryButton from "../UiComponents/SecondaryButton";
import InputFieldCC from "../UiComponents/countryCodeField";
import {
  SafeLocalStorage,
  createQueryString,
  setCookie,
} from "@/components/utils";

// function SignInWithGoogle() {
//   const navigate = useNavigate();

//   const signInWithGoogle = () => {
//     const provider = new firebase.auth.GoogleAuthProvider();
//     auth
//       .signInWithPopup(provider)
//       .then((result) => {
//         const user = result.user;
//         fetch(`${serverUrl}/tapopuser/check-email/${user.email}`)
//           .then((res) => res.json())
//           .then((data) => {
//             if (data.exists) {
//               navigate("/login");
//             } else {
//               navigate("/username", {
//                 state: { name: user.displayName, email: user.email },
//               });
//             }
//           })
//           .catch((error) => {
//             //console.log(error);
//           });
//       })
//       .catch((error) => {
//         //console.log(error);
//       });
//   };

//   return (
//     <div>
//       <Button onClick={signInWithGoogle}>Sign up with google</Button>
//     </div>
//   );
// }

export default function Signup({ searchParams }) {
  const navigate = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [toggleshowPassword, settoggleshowPassword] = useState(false);
  const [showFullName, setShowFullName] = useState(false);
  const [isVerified, setIsVerified] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [validLength, setValidLength] = useState(false);
  const [validUppercase, setValidUppercase] = useState(false);
  const [validNumber, setValidNumber] = useState(false);
  const [validSpecialChar, setValidSpecialChar] = useState(false);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value.trim());
    validatePassword(e.target.value.trim());
  };

  const validatePassword = (value) => {
    const lengthRegex = /^.{8,}$/;
    const uppercaseRegex = /^(?=.*[A-Z])/;
    const numberRegex = /^(?=.*\d)/;
    const specialCharRegex = /^(?=.*[@#$!])/;

    setValidLength(lengthRegex.test(value));
    setValidUppercase(uppercaseRegex.test(value));
    setValidNumber(numberRegex.test(value));
    setValidSpecialChar(specialCharRegex.test(value));
  };
  const isPasswordValid =
    validLength && validUppercase && validNumber && validSpecialChar;

  const handleEmailChange = (e) => {
    setEmail(e.target.value.trim());
  };

  const [isBoxVisible, setBoxVisible] = useState(false);
  const boxRef = useRef(null);

  const handleClick = () => {
    setBoxVisible(!isBoxVisible);
  };

  const handleOutsideClick = (event) => {
    if (boxRef.current && !boxRef.current.contains(event.target)) {
      setBoxVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  // const location = useSearchParams();
  // //console.log("Location", location )
  // const qrId = location.state && location.state.id;

  // // from which page the user is redirected to signup page
  // const fromPage =
  //   location.state !== undefined && location.state !== null
  //     ? location.state.fromPage !== undefined
  //       ? location.state.fromPage
  //       : "admin"
  //     : "admin";

  // const redirectToLogin = () => {
  //   if (fromPage == "cart") {
  //     navigate.push("/login", { state: { fromPage: fromPage } });
  //   }
  //   if (fromPage == "pricing") {
  //     navigate.push("/login", { state: { fromPage: fromPage } });
  //   } else {
  //     navigate.push("/login", { state: { qrId: qrId } });
  //   }
  // };
  const qrId = searchParams.id;
  const fromPage = searchParams.fromPage || "admin";

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
      setShowPassword(true);
    } else {
      alert("Please enter a valid email address.");
    }
  };
  const captchaRef = useRef(null);
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    const inputVal = await e.target[0].value;
    const token = captchaRef.current.getValue();
    captchaRef.current.reset();

    await axios
      .post(`${serverUrl}/tapopuser/reCaptchaPost`, { inputVal, token })
      .then((res) => {
        if (res.data == "Human") {
          const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/;
          if (regex.test(password)) {
            setShowPassword(false);
            setShowFullName(true);
          } else if (password.length < 8) {
            setMessage("Please enter a password with at least 8 characters.");
            setShowMessage(true);
            setTimeout(() => {
              setShowMessage(false);
            }, 3000);

            // alert("Please enter a password with at least 8 characters.");
          } else if (!validUppercase) {
            setMessage("Please include one Uppercase");
            setShowMessage(true);
            setTimeout(() => {
              setShowMessage(false);
            }, 3000);
          } else if (!validNumber) {
            setMessage("Please include Number ");
            setShowMessage(true);
            setTimeout(() => {
              setShowMessage(false);
            }, 3000);
          } else if (!validSpecialChar) {
            setMessage("Please enter Special Char");
            setShowMessage(true);
            setTimeout(() => {
              setShowMessage(false);
            }, 3000);
          } else {
          }
        }
      })
      .catch((error) => {
        //console.log(error);
      });
  };

  const handleRecaptchaChange = (value) => {
    setIsVerified(true);
  };

  const [VerifyUsername, setVerifyUsername] = useState(false);

  const handleUserNameChange = async (e) => {
    const value = e.target.value.trim();
    const regex = /^[a-zA-Z0-9]*$/;
    const isValid = regex.test(value);
    const checkCapital = /[A-Z]/.test(value);
    if (checkCapital) {
      setMessage("Avoid using capital latters.");
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
        setMessage("");
      }, 3000);
      return;
    } else if (isValid) {
      setUserName(value);

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

  const handleFullNameSubmit = async (e) => {
    e.preventDefault();
    if (firstName.trim() !== "" && lastName.trim() !== "") {
      try {
        const response = await fetch(
          `${serverUrl}/tapopuser/tapopuser/${userName}`
        );
        const { exists } = await response.json();
        if (exists) {
          setMessage(
            "Username already exists. Please choose a different username."
          );
          setShowMessage(true);
          setTimeout(() => {
            setShowMessage(false);
          }, 3000);
          // alert("Username already exists. Please choose a different username.");
          return;
        }
      } catch (error) {
        console.error(error);
        alert("Error checking username. Please try again later.");
        return;
      }

      VerifyUsername &&
        fetch(`${serverUrl}/tapopuser/tapopuser/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: userName,
            password: password,
            email: email,
            name: firstName + " " + lastName,
            firstName: firstName,
            lastName: lastName,
            emailVerified: phoneNumberSignUp,
            qrId: qrId,
            mobileNumber: phoneNumberSignUp ? "91" + phoneNumber : null,
            signUpMethod: phoneNumberSignUp ? "phonenumber" : "customemail",
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.error) {
              //console.log(data.error);
              setMessage("userName or email already exists.");
              setShowMessage(true);
              setTimeout(() => {
                setShowMessage(false);
              }, 3000);
            } else {
              setCookie("jwt_token", data.token, 3);
              SafeLocalStorage.setItem("user", JSON.stringify(data.user));
              SafeLocalStorage.setItem("loginStatus", true);
              if (!phoneNumberSignUp) {
                try {
                  auth.sendSignInLinkToEmail(email, {
                    url: `${clientUrl}/verifyemail/${data.user._id}`,
                    // URL where the user should be redirected after verifying the email
                    handleCodeInApp: true,
                  });
                  SafeLocalStorage.setItem("emailForSignIn", email);
                  // alert("Sign-in link sent!");
                  setMessage("Sign-in link sent!");
                  setShowMessage(true);
                  setTimeout(() => {
                    setShowMessage(false);
                  }, 3000);

                  setTimeout(() => {
                    setShowPassword(true);
                  }, 1000);
                } catch (error) {
                  setMessage(`Error sending sign-in link: ${error.message}`);
                  setShowMessage(true);
                  setTimeout(() => {
                    setShowMessage(false);
                  }, 3000);
                  // alert(`Error sending sign-in link: ${error.message}`);
                }
              }
              setTimeout(() => {
                navigate.push(
                  `/plan/${userName}?` +
                    createQueryString(
                      ["fromsignup", "fromPage"],
                      [true, fromPage]
                    )
                );
                handleQr(userName);
              }, 1000);
            }
          })
          .catch((error) => console.error(error));
    } else {
      setMessage("Please enter your full name.");
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
      // alert("Please enter your full name.");
    }
  };
  const handleBackToEmail = (e) => {
    e.preventDefault();
    setEmail("");
    setShowPassword(false);
  };

  const handleBackToPassword = (e) => {
    e.preventDefault();
    setPassword("");
    setShowFullName(false);
    setShowPassword(true);
  };
  const QR = async (e) => {
    await axios(`${serverUrl}/person/post/${userName}`);
  };

  const signInWithGoogle = () => {
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
                "/login?" + createQueryString(["fromPage"], [fromPage])
              );
            } else {
              navigate.push(
                "/username?" +
                  createQueryString(
                    ["name", "email", "frompage", "id"],
                    [user.displayName, user.email, fromPage, qrId]
                  )
              );
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

  const [confirmationResult, setConfirmationResult] = useState({});
  const [reCaptchaVerifier, setReCaptchaVerifier] = useState();
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [phoneNumberSignUp, setPhoneNumberSignUp] = useState(false);
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
                  "/login?" + createQueryString(["fromPage"], [fromPage])
                );
              } else {
                setShowPassword(true);
                setPhoneNumberSignUp(true);
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
          setShowMessage(true);
          setTimeout(() => {
            setShowMessage(false);
            setMessage("");
          }, 2000);
        });
    }
  };

  const [editNumber, setEditNumber] = useState(true);
  useEffect(() => {
    if (!showPhoneModal && !editNumber) {
      setEditNumber(true);
    }
  }, [showPhoneModal]);

  return (
    <div className="w-screen h-screen">
      {/* **************************** tapop Logo *********************************** */}

      <div className="w-full h-screen flex flex-row justify-between bg-[#FFFFFF] font-poppins overflow-hidden">
        {/* *************************** * left div *********************************** */}

        <div className="w-full h-full flex flex-col items-center overflow-scroll  ">
          <div className="w-full h-[55px] sm:h-[75px] flex flex-col items-start justify-start pt-[15px] pl-3 lg:pl-10 xl:pl-[2rem]">
            <Image
              className="h-full w-auto"
              src={require("./assets/Tapop Final Logo Concept 1 2.svg").default}
              alt="logo"
            />
          </div>

          {showFullName ? (
            <div className="items-center flex flex-col ">
              <div className="relative mt-[15px] lg:mt-[25px] w-[73px] h-[28px] flex justify-center items-center gap-1 md:ml-[-34rem] sm:ml-[-20rem] xsm:ml-[-18rem] ml-[-15rem] ">
                <Image
                  className="w-[16px] h-[16px]"
                  onClick={handleBackToPassword}
                  style={{ cursor: "pointer" }}
                  src={LeftArrow}
                  alt="LeftArrow"
                />
                <button className="add-icon" onClick={handleBackToPassword}>
                  Back
                </button>
              </div>

              <div className="p-[20px] sm:p-0">
                <h1 className="text-[20px] sm:text-[28px] md:text-[38px] lg:text-[48px] font-bold w-full md:w-[550px] lg:w-[630px] h-[42px] lg:h-[56px] mt-[15px] lg:mt-[20px]">
                  A few more details
                </h1>

                <p className=" h-[44px] lg:h-[28px]  md:mt-[12px] normal sm:w-[320px] md:w-auto font-medium text-[14px] md:text-[20px] leading-[28px] text-[#817C7C] ">
                  Create your Qviq username & enter your full name.
                </p>

                <form
                  onSubmit={handleFullNameSubmit}
                  className="md:mt-0 h-auto w-full md:w-[500px] lg:w-[592px] flex flex-col "
                >
                  <div className="mt-[36px]">
                    <InputField
                      isDisabled={!phoneNumber}
                      label="Your Email"
                      type="email"
                      placeholder="johndoe1@example.com"
                      value={email}
                      onChange={handleEmailChange}
                      width="100%"
                    />
                  </div>
                  <div className="relative mt-[36px]">
                    <div className="flex w-full items-end">
                      <InputField
                        label="Username"
                        type="text"
                        placeholder="johndoe123"
                        value={userName}
                        onChange={handleUserNameChange}
                        width="100%"
                        borderRadius={"8px 0 0 8px"}
                      />
                      <div
                        className={`rounded-e-lg border border-[rgb(223,219,216)] px-4 h-[43.6px] flex items-center text-xl ${
                          VerifyUsername ? "text-[#12A26E]" : "text-[#CF2828]"
                        } bg-white`}
                      >
                        {VerifyUsername ? <HiCheckCircle /> : <HiXCircle />}
                      </div>
                    </div>

                    <p className="text-[12px] text-gray-500 ml-[15px] mt-[2px] ">
                      This username will be used for sharing your profile{" "}
                    </p>
                  </div>
                  <div className="mt-[36px]">
                    <InputField
                      label="First Name"
                      type="text"
                      placeholder="John"
                      value={firstName}
                      onChange={(e) => {
                        setFirstName(e.target.value.trim());
                      }}
                      width="100%"
                    />
                  </div>
                  <div className="mt-[36px]">
                    <InputField
                      label="Last Name"
                      type="text"
                      placeholder="Doe"
                      value={lastName}
                      onChange={(e) => {
                        setLastName(e.target.value.trim());
                      }}
                      width="100%"
                    />
                  </div>

                  <div className="mt-[44px]">
                    <PrimaryButton2
                      type="submit"
                      text="Continue"
                      width="100%"
                      isDisabled={
                        /^[wW]+$/.test(userName) ||
                        userName === "www" ||
                        !VerifyUsername ||
                        userName === "" ||
                        firstName === "" ||
                        lastName === "" ||
                        email === ""
                          ? true
                          : false
                      }
                      color={
                        /^[wW]+$/.test(userName) ||
                        userName === "www" ||
                        !VerifyUsername ||
                        userName === "" ||
                        firstName === "" ||
                        lastName === "" ||
                        email === ""
                          ? "#FFD0D0"
                          : "linear-gradient(225deg, #FB6609 0%, #E40849 100%)"
                      }
                      textColor="white"
                    />
                  </div>
                </form>
              </div>
            </div>
          ) : showPassword ? (
            <div className="items-center flex   flex-col !p-4 ">
              <div className="relative w-[73px] h-[28px] mt-[30px] lg:mt-[40px] xsm:ml-[-16rem] ml-[-12rem] md:ml-[-28rem] lg:ml-[-33rem]   flex justify-center items-center gap-1 ">
                <Image
                  className="w-[16px] h-[16px]"
                  style={{ cursor: "pointer" }}
                  onClick={handleBackToEmail}
                  src={LeftArrow}
                  alt="LeftArrow"
                />
                <button className="add-icon" onClick={handleBackToEmail}>
                  Back
                </button>
              </div>

              <h1 className=" relative text-[20px] sm:text-[28px] md:text-[38px] lg:text-[48px] font-bold mt-[10px] md:mt-[15px] md:ml-[-10rem] lg:ml-[-10rem] sm:ml-[-5rem] xsm2:ml-[-8rem] xsm:ml-[-7rem] lg:mt-[20px] -ml-[6rem]">
                Enter a password
              </h1>

              <p className="relative  sm:w-[320px] lg:w-[509px] h-[44px] lg:h-[28px] mt-[8px] lg:mt-[12px] lg:ml-[-5rem] md:ml-[-11rem] sm:ml-0 normal  font-medium text-[14px] md:text-[20px] xsm2:ml-8 ml-0 xsm:ml-[1rem] leading-[28px] text-[#817C7C] ">
                Create a strong password for your Qviq account.
              </p>

              <form
                onSubmit={handlePasswordSubmit}
                className="mt-[36px] lg:mt-[44px] h-auto w-[270px] xsm:w-[300px] sm:w-[320px] md:w-[500px] lg:w-[592px] flex flex-col "
              >
                <div className="relative">
                  <InputField
                    label="Password"
                    type={toggleshowPassword ? "text" : "password"}
                    placeholder="Create password"
                    value={password}
                    onChange={handlePasswordChange}
                    width="100%"
                    onClick={handleClick}
                  />
                  <span
                    className="absolute right-2 top-[53%] text-gray-600 text-xl hover:cursor-pointer"
                    onClick={() => settoggleshowPassword(!toggleshowPassword)}
                  >
                    {!toggleshowPassword ? (
                      <HiOutlineEyeOff />
                    ) : (
                      <HiOutlineEye />
                    )}
                  </span>
                  {isBoxVisible && !isPasswordValid && (
                    <div
                      ref={boxRef}
                      className="absolute top-14 md:top-20 left-0 md:left-[-4rem] xl:left-[-6.5rem] w-full md:w-[397px] h-auto p-5 md:p-6 text-xs [@media(max-width:350px)]:scale-[.8] [@media(max-width:350px)]:left-[-8px] text-[#1A1A1A] bg-white rounded-xl"
                      style={{
                        zIndex: "4",
                        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <div
                        className="w-fit border-b-[3px] pb-3"
                        style={{ borderBottomColor: "red" }}
                      >
                        <p className="font-semibold">
                          Your password must include:
                        </p>
                      </div>
                      <ul className="ms-4 md:ms-5 mt-3 alphanumericbox-ul">
                        {!validLength ? <li>At least 8 characters</li> : ""}
                        {!validUppercase ? (
                          <li>At least 1 uppercase letter(A-Z)</li>
                        ) : (
                          ""
                        )}
                        {!validNumber ? <li>At least 1 number(0-9)</li> : ""}
                        {!validSpecialChar ? (
                          <li>At least 1 special character(@, #, $...)</li>
                        ) : (
                          ""
                        )}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="mt-[36px] w-[100%]">
                  <ReCAPTCHA
                    sitekey="6Ld0qUAoAAAAADFFNjoS3PZkm-gf80ljZmGI2unF"
                    onChange={handleRecaptchaChange}
                    ref={captchaRef}
                    className="w-[100%] h-[79px] flex justify-between gap-x-[105px] "
                  />
                </div>

                <div className="mt-[44px]">
                  <PrimaryButton2
                    type="submit"
                    text="Continue"
                    width="100%"
                    isDisabled={!isPasswordValid}
                    color={
                      !isPasswordValid
                        ? "#F7B2C7"
                        : "linear-gradient(225deg, #FB6609 0%, #E40849 100%)"
                    }
                    textColor="white"
                  />
                </div>
              </form>
            </div>
          ) : (
            <div className="flex flex-col item-center p-4 md:mt-[-5rem] justify-center items-center gap-[20px] ">
              <h1 className="text-[23px] xsm:text-[28px] md:text-[38px] lg:text-[48px] font-bold w-full text-left h-[42px]  lg:h-[56px]  mt-[20px] md:mt-[100px] lg:mt-[104px] relative">
                Create your account
              </h1>
              <p className=" xsm:w-[320px] md:w-[460px] lg:w-[558px] h-[44px] lg:h-[28px] mt-[8px] lg:mt-[12px] normal font-medium text-[14px] md:text-[16px] lg:text-[20px] leading-[28px] text-[#817C7C] md:-ml-8 ">
                Enter your details to get started with your Qviq profile.
              </p>

              <form
                onSubmit={handleEmailSubmit}
                className=" mt-[36px] lg:mt-[44px] h-auto xsm:w-[320px] md:w-[500px] lg:w-[592px] flex flex-col gap-[10px]"
              >
                <SecondaryButtonLogoCustom
                  text="Continue with Google"
                  img={Google}
                  icon=""
                  onClick={signInWithGoogle}
                  height="50px"
                  width="100%"
                />

                <SecondaryButtonLogoCustom
                  className="mt-2"
                  text="Continue with Mobile"
                  img={Mobile}
                  icon=""
                  onClick={() => {
                    setShowPhoneModal(true);
                  }}
                  height="50px"
                  width="100%"
                />

                {/* <div className="flex items-center my-4">
                  <hr className="flex-grow border-t border-[#817C7C] mx-4" />
                  <span className="text-[#817C7C]">OR</span>
                  <hr className="flex-grow border-t border-[#817C7C] mx-4" />
                </div>
                <InputField
                  label="Your Email"
                  type="email"
                  placeholder="johndoe1@example.com"
                  value={email}
                  onChange={handleEmailChange}
                  width="100%"
                /> */}
                <p className="xxsm:w-[100%] sm:w-[320px] md:w-[537px]  h-[66px] md:h-[44px] mt-6 md:mt-[40px] normal font-medium text-[14px] leading-[22px] text-[#817C7C] ">
                  By clicking create account you agree to Qviq's Terms &
                  conditions and Privacy Policy
                </p>

                {/* <div className="flex flex-col gap-y-[20px] mt-[20px] md:mt-[43px]">
                  <PrimaryButton2
                    type="submit"
                    text="Create Account"
                    isDisabled={email === "" ? true : false}
                    color={
                      email === ""
                        ? "#F7B2C7"
                        : "linear-gradient(225deg, #FB6609 0%, #E40849 100%)"
                    }
                    textColor="white"
                  />
                </div> */}
                {/*<SignInWithGoogle /> */}

                <div className="flex flex-row justify-center items-center mt-[15px] lg:mt-[50px] xxsm:items-start mb-[50px]">
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
              </form>
            </div>
          )}
        </div>

        <div className="lg:w-1/2 w-0 flex flex-col justify-start items-center bg-[#BC6C25]">
          <Image
            className="w-[90%]  mt-[10rem] "
            src={require("./assets/SignupRightContainer.png")}
            alt="SignupRightContainer"
          />
        </div>
      </div>
      <NewToast open={showMessage} message={message} />

      {showPhoneModal && (
        <NewModal
          text="Sign Up with mobile number"
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
                  value={otp}
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
                    isDisabled={otp.length === 0 ? true : false}
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

      <div ref={recaptchaWrapperRef} className="relative z-[9999]">
        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
}
