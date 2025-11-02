"use client";
import { serverUrl } from "@/config";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import InputFieldCC from "../UiComponents/countryCodeField";
import InputField from "../UiComponents/InputField";
import ReCAPTCHA from "react-google-recaptcha";
import PrimaryButton2 from "../UiComponents/PrimaryButton2";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { SafeLocalStorage, setCookie } from "../utils";
import NewToast from "../UiComponents/NewToast";
import LoadingAnimation from "../UiComponents/Loading/LoadingAnimation";
import { useRouter } from "next/navigation";

const CreateNewAccount = () => {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberSignUp, setPhoneNumberSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toggleshowPassword, settoggleshowPassword] = useState(false);
  const [validLength, setValidLength] = useState(false);
  const [validUppercase, setValidUppercase] = useState(false);
  const [validNumber, setValidNumber] = useState(false);
  const [validSpecialChar, setValidSpecialChar] = useState(false);
  const [boxVisible, setBoxVisible] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const captchaRef = useRef(null);
  const boxRef = useRef(null);
  const [isVerified, setIsVerified] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [errorFirst, setErrorFirst] = useState("");
  const [errorLast, setErrorLast] = useState("");
  const qrId = null;
  const navigate = useRouter();

  const handleFirstNameChange = (e) => {
    const input = e.target.value;
    const regex = /^[a-zA-Z\s]*$/;

    if (regex.test(input)) {
      if (input.length <= 20) {
        setFirstName(input.trim());
        setErrorFirst("");
      } else {
        setErrorFirst("First name cannot exceed 20 characters.");
      }
    }
  };
  const handleUserName = (e) => {
    const input = e.target.value;
    const regex = /^[a-zA-Z\s]*$/;

    if (regex.test(input)) {
      if (input.length <= 20) {
        setUsername(input.trim());
        setErrorFirst("");
      } else {
        setErrorFirst("First name cannot exceed 20 characters.");
      }
    }
  };
  const handleLastNameChange = (e) => {
    const input = e.target.value;
    const regex = /^[a-zA-Z\s]*$/;

    if (regex.test(input)) {
      if (input.length <= 20) {
        setLastName(input.trim());
        setErrorLast("");
      } else {
        setErrorLast("Last name cannot exceed 20 characters.");
      }
    }
  };

//   useEffect(() => {
//     setCookie("username", searchParams.username, 3);
//     setUsername(searchParams.username);
//     setPhoneNumber(searchParams.phoneNumber ? searchParams.phoneNumber : "");
//     setEmail(searchParams.email ? searchParams.email : "");
//     setFirstName(searchParams.name.split(" ")?.[0]);
//     setLastName(Array.from(searchParams.name.split(" "))?.slice(1)?.join(" "));
//     setPhoneNumberSignUp(searchParams.phoneNumber ? true : false);
//   }, []);

  const isPasswordValid =
    validLength && validUppercase && validNumber && validSpecialChar;

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

  const handlePasswordChange = (e) => {
    setPassword(e.target.value.trim());
    validatePassword(e.target.value.trim());
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value.trim());
  };
  const handleClick = () => {
    setBoxVisible(!boxVisible);
  };
  const handlePhoneNumber = (e) => {
    const newPhoneNumber = e.target.value;
    const numericRegex = /^[0-9]*$/;

    if (numericRegex.test(newPhoneNumber)) {
      setPhoneNumber(newPhoneNumber);
    }
  };

//   const fromPage =
//     searchParams.fromPage !== undefined ? searchParams.fromPage : "admin";
const handleQr = (e) => {
    const res = axios.post(`${serverUrl}/person/post/${e}`);
  };

  const handleFullNameSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    // const inputVal = await e.target[0].value;
    // const token = captchaRef.current.getValue();
    // captchaRef.current.reset();

    // await axios
    //   .post(`${serverUrl}/tapopuser/reCaptchaPost`, { inputVal, token })
    //   .then((res) => {
    //     if (res.data == "Human") {
    //       const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/;
    //       if (regex.test(password)) {
    //       } else if (password.length < 8) {
    //         setMessage("Please enter a password with at least 8 characters.");
    //         setShowMessage(true);
    //         setTimeout(() => {
    //           setShowMessage(false);
    //         }, 3000);

    //         // alert("Please enter a password with at least 8 characters.");
    //       } else if (!validUppercase) {
    //         setMessage("Please include one Uppercase");
    //         setShowMessage(true);
    //         setTimeout(() => {
    //           setShowMessage(false);
    //         }, 3000);
    //       } else if (!validNumber) {
    //         setMessage("Please include Number ");
    //         setShowMessage(true);
    //         setTimeout(() => {
    //           setShowMessage(false);
    //         }, 3000);
    //       } else if (!validSpecialChar) {
    //         setMessage("Please enter Special Char");
    //         setShowMessage(true);
    //         setTimeout(() => {
    //           setShowMessage(false);
    //         }, 3000);
    //       } else {
    //       }
    //     }
    //   })
    //   .catch((error) => {
    //     //console.log(error);
    //   });

    if (firstName.trim() !== "" && lastName.trim() !== "") {
      try {
        const response = await fetch(
          `${serverUrl}/tapopuser/tapopuser/${username}`
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

      fetch(`${serverUrl}/tapopuser/tapopuser/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
          email: email,
          name: firstName + " " + lastName,
          firstName: firstName,
          lastName: lastName,
          emailVerified: true,
          qrId: qrId,
          mobileNumber: phoneNumber !== "" ? phoneNumber : null,
          signUpMethod: phoneNumberSignUp ? "phonenumber" : "google",
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
            setLoading(false);
          } else {
            setCookie("jwt_token", data.token, 3);
            SafeLocalStorage.setItem("user", JSON.stringify(data.user));
            SafeLocalStorage.setItem("loginStatus", true);
            SafeLocalStorage.setItem("phoneNumber", phoneNumber);
            setTimeout(() => {
              setLoading(false);
              navigate.push(
                `/selectprofile/${username}?`
              );

              handleQr(username);
            }, 1000);
          }
        })
        .catch((error) => {
          setLoading(false);
          console.error(error);
        });
    } else {
      setLoading(false);
      setMessage("Please enter your full name.");
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
      // alert("Please enter your full name.");
    }
  };

  return (
    <>
    <div className="w-full justify-center flex" >
      <form
        className="xsm:px-[32px] px-[10px] max-w-[492px] w-full flex flex-col justify-start items-center smd:gap-[40px] gap-[28px] bg-white p-[32px] rounded-[20px] h-full overflow-y-scroll"
        onSubmit={(e) => {
          handleFullNameSubmit(e);
        }}
      >
        <p className="max-w-[482px] w-full smd:text-[40px] text-[24px] font-[700] text-[#0A0003] text-center">
          Create your account
        </p>

        <div className="max-w-[428px] w-full flex flex-col justify-start items-center smd:gap-[28px] gap-[24px]">
          <div className="w-full">
            <InputField
              className="h-[56px] font-[500]"
              label="UserName"
              type="text"
              placeholder="username"
              value={username}
              onChange={handleUserName}
              width="100%"
            />
            {errorFirst && (
              <p className="text-red-500 text-sm mt-2">{errorFirst}</p>
            )}
          </div>
          <div className="w-full">
            <InputField
              className="h-[56px] font-[500]"
              label="First Name"
              type="text"
              placeholder="John"
              value={firstName}
              onChange={handleFirstNameChange}
              width="100%"
            />
            {errorFirst && (
              <p className="text-red-500 text-sm mt-2">{errorFirst}</p>
            )}
          </div>

          <div className="w-full">
            <InputField
              className="h-[56px] font-[500]"
              label="Last Name"
              type="text"
              placeholder="Doe"
              value={lastName}
              onChange={handleLastNameChange}
              width="100%"
            />
            {errorLast && (
              <p className="text-red-500 text-sm mt-2">{errorLast}</p>
            )}
          </div>

          <div className="w-full">
            <InputField
              className="h-[56px] font-[500]"
            //   isDisabled={!phoneNumberSignUp}
              label="Email"
              type="email"
              placeholder="johndoe1@example.com"
              value={email}
              onChange={handleEmailChange}
              width="100%"
            />
          </div>
          <div className="w-full">
            <InputFieldCC
              label="Phone Number"
            //   isDisabled={phoneNumberSignUp}
              type="mobile"
              name="mobile"
              placeholder="9876543210"
              value={phoneNumber}
              onChange={handlePhoneNumber}
              width="100%"
              height="40px"
            />
          </div>

          <div className="w-full relative">
            <InputField
              className="h-[56px] font-[500]"
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
              {!toggleshowPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
            </span>

            {boxVisible && !isPasswordValid && (
              <div
                ref={boxRef}
                className="absolute top-20 left-0 w-full md:w-[397px] h-auto p-5 md:p-6 text-xs text-[#1A1A1A] bg-white rounded-xl"
                style={{
                  zIndex: "4",
                  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div
                  className="w-fit border-b-[3px] pb-3"
                  style={{ borderBottomColor: "red" }}
                >
                  <p className="font-semibold">Your password must include:</p>
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
        </div>

        {/* <div className="w-full flex flex-col justify-start items-center gap-[24px]">
          <ReCAPTCHA
            sitekey="6Ld0qUAoAAAAADFFNjoS3PZkm-gf80ljZmGI2unF"
            onChange={handleRecaptchaChange}
            ref={captchaRef}
            className="sm:scale-[100%] scale-[80%]"
          />

          <p className="max-w-[482px] w-full text-[16px] font-[500] text-center text-[#817C7C]">
            By clicking create account you agree to Tapop's{" "}
            <a>Terms & conditions</a> and <a>Privacy Policy</a>
          </p>
        </div> */}

        <div className="w-full h-[56px]">
          <PrimaryButton2
            type="submit"
            text="Continue"
            width="100%"
            height="100%"
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
      <NewToast open={showMessage} message={message} />
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
    </>
  );
};

export default CreateNewAccount;
