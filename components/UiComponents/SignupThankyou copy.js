"use client";
import React, { useEffect, useState } from "react";
import rightcontent from "../Images/Right_content.png";
import logo from "../Images/TapopLogoBlack.png";
import { HiOutlineArrowSmRight } from "react-icons/hi";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../Contexts/context";
import { useRouter } from "next/navigation";
import Image from "next/image";
import "./UiStyles.css";

export default function SignupThankyou({ searchParams }) {
  const fromPage =
    searchParams.fromPage !== undefined ? searchParams.fromPage : "admin";

  const navigate = useRouter();
  const { username, userEmail } = useContext(UserContext);
  function handleOnClick() {
    if (fromPage === "cart") {
      navigate.push("/address");
    } else {
      navigate.push(`/selectprofile/${username}`);
    }
  }
  return (
    <div className="flex justify-between p-[10px] xsm:p-[20px] md:p-[0px] min-h-screen">
      <div
        className="absolute 
      md:mt-[32px] xsm:mt-[8px] mt-[15px] 
      sm:ml-[20px] xl:ml-[78px] md:ml-[38px]"
      >
        <Image
          alt="logo"
          className="xsm:w-[123.47px] xsm:h-[52px] sm:w-[120px] sm:h-[50px] md:w-[122.34px] md:h-[52px] w-[95px] h-[42px]"
          src={logo}
        />
      </div>

      <div className="flex flex-col items-center gap-[40px] sm:place-items-start md:mt-[152px]">
        <div className="sm:ml-[70px] md:ml-[100px] xl:ml-[205px] xsm:mt-[108px] md:mt-[0px] mt-[90px]  ">
          <h1 className="text-[18px] text-[#817C7C] ">You're almost there!</h1>
          <h1 className="text-[22px]  xsm2:text-center sm:text-left lg:text-[34px] sm:mt-[10px] md:mt-[8px] xsm:text-[28px] xsm:mb-[8px] md:text-[38px] xl:text-[48px]  font-bold ">
            Thanks for signing up <h1 className="hidden sm:inline">!</h1>
          </h1>
          {/* <p className="mt-[8px] sm:mt-[10px] xsm2:text-center sm:text-left  xsm:text-[14px] lg:mt-[12px] normal font-medium text-[16px] sm:text-[18px]  text-[#817C7C]">
            To verify your email, click on the link sent to your inbox:
            <br className="hidden md:block " />{" "}
            <span className="text-[#1A1A1A] font-medium">{userEmail}</span>
          </p> */}
        </div>

        <div className="sm:mt-[50px]  xl:ml-[205px] sm:ml-[70px] md:ml-[100px] md:mt-[56px]  ">
          <button
            type="button"
            className="btn-primary text-white font-medium rounded-full flex h-[48px] w-[250px] xsm:w-[320px] sm:w-[450px] md:w-[500px] lg:w-[392px] xl:w-[592px]"
            onClick={handleOnClick}
            style={{
              // width: "592px",
              height: "48px",
              display: "flex",
              justifyContent: "center",
              gap: "1px",
              alignItems: "center",
              cursor: "pointer",
            }}
            text="Get Starter Plan"
          >
            <p className="">Continue to Edit Profile</p>
            <span className="btn-logo">
              <HiOutlineArrowSmRight />
            </span>
          </button>
        </div>
      </div>
      <div className="xl:w-[480px] lg:w-[430px] h-[100vh] bg-[#C6DE41] lg:flex hidden lg:ml-[10px] xl:ml-[0px] justify-center items-center">
        <Image
          alt="Right"
          className=" w-[404.091px] h-[494.132px] "
          src={rightcontent}
        />
      </div>
    </div>
  );
}
