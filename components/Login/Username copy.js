"use client";
import React, { useRef, useState } from "react";
import axios from "axios";
import { serverUrl } from "../../config";
import PrimaryButton2 from "../UiComponents/PrimaryButton2";
import InputField from "../UiComponents/InputField";
import {
  HiCheckCircle,
  HiOutlineEye,
  HiOutlineEyeOff,
  HiXCircle,
} from "react-icons/hi";
import NewToast from "../UiComponents/NewToast";
import { useRouter } from "next/navigation";
import {
  SafeLocalStorage,
  createQueryString,
  setCookie,
} from "@/components/utils";

function UsernamePage({ searchParams }) {
  const navigate = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [toggleshowPassword, settoggleshowPassword] = useState(false);
  const [validLength, setValidLength] = useState(false);
  const [validUppercase, setValidUppercase] = useState(false);
  const [validNumber, setValidNumber] = useState(false);
  const [validSpecialChar, setValidSpecialChar] = useState(false);
  const [boxVisible, setBoxVisible] = useState(false);
  const [VerifyUsername, setVerifyUsername] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const qrId = searchParams.id;

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

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    validatePassword(e.target.value);
  };

  const handleUsernameChange = async (e) => {
    const regex = /^[a-zA-Z0-9]*$/;
    const isValid = regex.test(e.target.value);
    const checkCapital = /[A-Z]/.test(e.target.value);
    if (checkCapital) {
      setMessage("Avoid using capital latters.");
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
        setMessage("");
      }, 3000);
      return;
    } else if (isValid) {
      setUsername(e.target.value);
      if (e.target.value === "") {
        setVerifyUsername(false);
      } else {
        try {
          const response = await fetch(
            `${serverUrl}/tapopuser/tapopuser/${e.target.value}`
          );
          const { exists } = await response.json();

          if (exists) {
            setVerifyUsername(false);
          } else {
            setVerifyUsername(true);
          }
        } catch (error) {}
      }
    }
  };

  const fromPage =
    searchParams.fromPage !== undefined ? searchParams.fromPage : "admin";

  const handleSubmit = async (event) => {
    event.preventDefault();
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;

    if (password.length < 8 || !password.match(passwordRegex)) {
      alert(
        "Password should have at least 8 characters, 1 upper case, 1 lower case, and 1 special character"
      );
      return;
    }

    handleQr(username);
    // If username doesn't exist, create a new user
    fetch(`${serverUrl}/tapopuser/tapopuser/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        email: searchParams.email,
        name: searchParams.name,
        firstName: searchParams.name.split(" ")[0],
        lastName: searchParams.name.split(" ").slice(1).join(" "),
        qrId: qrId,
        emailVerified: true,
        signUpMethod: "google",
      }),
    })
      .then((response) => response.json())

      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setCookie("jwt_token", data.token, 3);
          SafeLocalStorage.setItem("user", JSON.stringify(data.user));
          SafeLocalStorage.setItem("loginStatus", true);

          navigate.push(
            `/plan/${username}?` + createQueryString(["fromPage"], [fromPage])
          );
        }
      })
      .catch((error) => console.error(error));
  };

  const handleQr = (e) => {
    const res = axios.post(`${serverUrl}/person/post/${e}`);
  };

  return (
    <div className="flex w-full h-full">
      <img
        className="absolute mt-[32px] lg:mt-[48px] ml-3 xsm:ml-5 lg:ml-[78px] w-[123.34] md:w-[140px] lg:w-[154.56px] h-[32px] md:h-[37px] lg:h-[40px]"
        src={require("./assets/Tapop Final Logo Concept 1 2.svg").default.src}
        alt="logo"
      />
      <div className="w-full h-full flex justify-center">
        <div className="w-full md:max-w-[550px] lg:max-w-[630px] p-3 xsm:p-5">
          <h1 className="text-[20px] xsm:text-[28px] md:text-[38px] lg:text-[48px] font-bold w-full mt-[100px] lg:mt-[150px]">
            A few more details
          </h1>
          <p className="md:mt-[12px] normal font-medium text-sm md:text-lg lg:text-xl leading-[28px] text-[#817C7C] ">
            Create your Qviq username & password
          </p>
          <form
            onSubmit={handleSubmit}
            className="md:mt-0 h-auto w-full flex flex-col gap-9"
          >
            <div className="relative mt-[36px]">
              <div className="flex w-full items-end">
                <InputField
                  label="Username"
                  type="text"
                  placeholder="johndoe123"
                  value={username}
                  onChange={handleUsernameChange}
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
            </div>
            <div className="relative">
              <InputField
                label="Password"
                type={toggleshowPassword ? "text" : "password"}
                placeholder="********"
                value={password}
                onChange={handlePasswordChange}
                width="100%"
                onMouseEnter={() => setBoxVisible(true)}
                onMouseLeave={() => setBoxVisible(false)}
              />
              <span
                className="absolute right-2 top-[53%] text-gray-600 text-xl hover:cursor-pointer"
                onClick={() => settoggleshowPassword(!toggleshowPassword)}
              >
                {!toggleshowPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
              </span>
              {boxVisible && !isPasswordValid && (
                <div
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

            <div className="mt-2">
              <PrimaryButton2
                type="submit"
                text="Continue"
                width="100%"
                isDisabled={
                  username === "" || password === "" || !isPasswordValid
                }
                color={
                  username === "" || password === "" || !isPasswordValid
                    ? "#F7B2C7"
                    : "linear-gradient(225deg, #FB6609 0%, #E40849 100%)"
                }
                textColor="white"
              />
            </div>
          </form>
        </div>
      </div>
      <div className="hidden md:block min-w-[360px] max-w-[360px] xl:min-w-[480px] xl:max-w-[480px] h-full bg-[#BC6C25]">
        <img
          src={require("./assets/loginsideimg.svg").default.src}
          className="w-full h-full"
          alt=""
        />
      </div>
      <NewToast open={showMessage} message={message} />
    </div>
  );
}

export default UsernamePage;
