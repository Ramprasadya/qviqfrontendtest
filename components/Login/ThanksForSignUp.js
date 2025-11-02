import React from "react";
import PrimaryButton2 from "../UiComponents/PrimaryButton2";

const ThanksForSignUp = () => {
  return (
    <div>
      <div className="h-screen w-screen">
        <div className="flex h-full justify-between">
          <div className="w-full h-[80vh]">
            <img
              className="h-[32px] sm:h-[40px] mt-[32px] ml-[20px] sm:mt-[48px] sm:ml-[78px]"
              src={require("../Images/TapopLogoBlack.png")}
              alt="logo"
            />

            <div className=" w-full h-full flex flex-col items-center self-center justify-between md:justify-start px-[20px] mt-[44px] sm:mt-[64px]">
              <div className="">
                <p className=" hidden sm:block text-[#817C7C] text-[20px] leading-[28px]">
                  You’re almost there!
                </p>
                <p className=" sm:mt-0 text-[28px] font-[700] leading-[42px] sm:text-[48px] sm:leading-[56px] mb-[8px] sm:mb-[20px]">
                  Thanks for signing up!
                </p>
                <p className="font-[500] text-[14px] leading-[22px] sm:text-[20px] sm:leading-[28px]  text-[#817C7C]">
                  To verify your email, click on the link sent to your inbox:
                </p>
                <p className="text-[#1a1a1a] font-[600] text-[14px] leading-[22px] sm:text-[20px] sm:leading-[28px]  mb-[40px]">
                  {" "}
                  johndoe123@example.com
                </p>
              </div>
              <PrimaryButton2 text="Continue to Qviq" />
            </div>
          </div>

          <div className="hidden md:flex flex-col justify-center items-center bg-[#2A3C24] min-w-[30%]">
            {/* <img className='w-full h-full' src={require('./Frame 52.jpg')} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThanksForSignUp;
