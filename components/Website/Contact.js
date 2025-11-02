"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { HiArrowUpRight } from "react-icons/hi2";
import InputField from "../UiComponents/InputField";
import InputFIeldTextArea from "../UiComponents/InputFIeldTextArea";
import Footer from "./Footer";
import Navbar from "./header/Navbar";
import { serverUrl } from "../../config";
import PrimaryButton4 from "../UiComponents/PrimaryButton4";
import SecondaryButton from "../UiComponents/SecondaryButton";
// import { ToastContainer } from "react-toastify";
import NewToast from "../UiComponents/NewToast";
import Image from "next/image";
import location from "./assets/location.svg";
import validator from "validator";

const Contact = () => {
  // Inside your App component
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [showEmailError, setShowEmailError] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState(false);
  const handleEmailClick = () => {
    window.location.href = "mailto:support@qviq.io";
  };
  // const validateForm = () => {
  //   const newErrors = {};

  //   if (!fullName.trim()) {
  //     newErrors.fullName = "Full Name is required.";
  //   }

  //   if (!email.trim()) {
  //     newErrors.email = "Email is required.";
  //   } else if (!/\S+@\S+\.\S+/.test(email)) {
  //     newErrors.email = "Invalid email format.";
  //   }

  //   if (!message.trim()) {
  //     newErrors.message = "Message is required.";
  //   }

  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };

  const [toast, setToast] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (fullName === "" || email === "" || message === "") {
      setErrors(true);
      //console.log("error");
      return;
    }
    if (fullName !== "" || email !== "" || message !== "") {
      try {
        const response = await axios.post(`${serverUrl}/contactus/post`, {
          fullName,
          email,
          message,
        });
        // Handle success
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 3000);

        // setFullName("");
        // setEmail("");
        // setMessage("");
      } catch (error) {
        console.error(error?.response?.data); // Handle error
      }
    }
  };

  const myRef = useRef(null);
  const scrollToRef = () => {
    const element = myRef.current;

    if (element) {
      element.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };
  useEffect(() => {
    scrollToRef();
  }, []);

  return (
    <div className=" custom-scrollbar Plus-Jakarta-Sans-font-div">
      <Navbar background="#FFFF" thisPage="contact" />
      <div ref={myRef}  className="custom-scrollbar" style={{ height: "100vh", overflowY: "scroll" }}>
        <div className="  flex flex-col sm:flex-row justify-center gap-[20px] px-[20px] py-[72px] md:pt-[165px] text-[16px] leading-[24px] sm:text-[18px] sm:leading-[18px]">
          <div className="p-[32px] w-full md:w-[522px] bg-white rounded-[24px] shadow-[_10px_10px_40px_rgba(_171,_181,_217,_0.08)]">
            <div className="flex items-center gap-[20px] mb-[24px] sm:mb-[28px]">
              <div className="w-[56px] h-[56px] bg-gray-200 rounded-[12px] ">
                <Image
                  className="w-full h-full"
                  src={require("./assets/26 1.png")}
                  alt="email"
                />
              </div>
              <p className="font-[700] sm:text-[24px] sm:leading-[24px] text-[24px] text-[#0A0003] leading-normal">
                Email us
              </p>
            </div>
            <p className="">Our team is here to help</p>
            <p className="font-[700] mt-[6px]  mb-[24px] text-[#0A0003] sm:mb-[28px] ">
              support@qviq.io
            </p>
            <PrimaryButton4
              color="#000000"
              text="Email Us"
              icon={<HiArrowUpRight />}
              onClick={handleEmailClick}
            />
          </div>

          <div className="p-[32px] w-full md:w-[522px] bg-white rounded-[24px] shadow-[_10px_10px_40px_rgba(_171,_181,_217,_0.08)]">
            <div className="flex items-center gap-[20px] mb-[24px] sm:mb-[28px]">
              <div className="w-[56px] h-[56px] bg-gray-200 rounded-[12px]">
                <Image
                  className="w-full h-full"
                  src={require("./assets/1 10.png")}
                  alt="email"
                />
              </div>
              <p className="font-[700] sm:text-[24px] text-[#0A0003] sm:leading-[24px] text-[24px] leading-normal">
                Call us
              </p>
            </div>
            <p className="">Working hours</p>
            <p className="font-[700] my-[6px] text-[16px] ">
              Mon-Fri | 9.00am-5.00pm
            </p>
            <p className="font-[700] text-[16px] ">+91 9717023623</p>
          </div>

          <div className="p-[32px] w-full md:w-[522px] bg-white rounded-[24px] shadow-[_10px_10px_40px_rgba(_171,_181,_217,_0.08)]">
            <div className="flex items-center gap-[20px] mb-[24px] sm:mb-[28px]">
              <div className="w-[56px] h-[56px] bg-gray-200 rounded-[12px]">
                <Image className="w-full h-full" src={location} alt="email" />
              </div>
              <p className="font-[700] sm:text-[24px] text-[#0A0003] sm:leading-[24px] text-[24px] leading-normal">
                Location
              </p>
            </div>
            <p className="">Our Address</p>
            <p className="font-[700] my-[6px] text-[16px] ">
              2-A/3, Kundan mansion,
            </p>
            <p className="font-[700] my-[6px] text-[16px] ">
              Asaf ali road, Daryaganj,
            </p>
            <p className="font-[700] my-[6px] text-[16px] ">Delhi-110002</p>
          </div>
        </div>
        <div
          className="flex flex-col justify-center items-center px-2 xsm:px-[20px] py-[72px] "
          style={{
            background: `url(${
              require("./assets/contact-us-background.png").default.src
            }) no-repeat`,
            backgroundSize: "100% 430px",
          }}
        >
          <div className="flex flex-col justify-center items-center w-full max-w-[750px] lg:max-w-[1064px] bg-white rounded-[24px] shadow-[_10px_10px_40px_rgba(_171,_181,_217,_0.08)]">
            <div className="px-5 py-10 lg:py-[96px] max-w-[592px] w-full">
              <p className="font-[700] sm:text-[40px] sm:leading-[40px] text-[40px] leading-[48px] mb-[28px] sm:mb-[32px] text-center ">
                Get in touch
              </p>
              <p className="text-center font-[400] sm:text-[18px] sm:leading-[18px] text-[18px] leading-[24px]">
                Any questions or concerns? Just write us a message!
              </p>
              <div className="flex flex-col mt-[52px] mb-[40px]">
                <div>
                  <InputField
                    width={"100%"}
                    label="Your Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                  {errors && fullName.length <= 0 ? (
                    <label className="text-[#FE7171] my-1 flex justify-start w-full text-xs h-7">
                      Please, Enter your name
                    </label>
                  ) : (
                    <p className="my-1 h-7">
                     
                    </p>
                  )}
                </div>

                <div>
                  <InputField
                    width={"100%"}
                    label="Your Email"
                    value={email}
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      if (!validator.isEmail(inputValue)) {
                        setShowEmailError("Please, enter a valid email!");
                      } else {
                        setShowEmailError("");
                      }

                      setEmail(e.target.value);
                    }}
                  />
                  {(errors && email.length <= 0) || showEmailError ? (
                    <label className="text-[#FE7171] my-1 flex justify-start w-full text-xs h-7">
                      {showEmailError || "Please, enter a valid email!"}
                    </label>
                  ) : (
                    <p className="my-1 h-7">
                     
                    </p>
                  )}
                </div>
                <div>
                  <InputFIeldTextArea
                    label="Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  {errors && message.length <= 0 ? (
                    <label className="text-[#FE7171] my-1 flex justify-start w-full text-xs h-7">
                      Please, Enter your message
                    </label>
                  ) : (
                    <p className=" my-1 h-7">
                      
                    </p>
                  )}
                </div>
              </div>
              <SecondaryButton
                text="Submit"
                type="submit"
                onClick={handleSubmit}
              />
            </div>
          </div>
        </div>
         {/* <ToastContainer /> */}
        <NewToast open={toast} message={"Message send successfully!"} />
        <Footer />
      </div>
    </div>
  );
};

export default Contact;
