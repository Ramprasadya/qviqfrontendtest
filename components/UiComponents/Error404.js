"use client";
import React, { useEffect } from "react";
import Navbar from "../Website/header/Navbar";
import PrimaryButton2 from "./PrimaryButton2";
import text from "../Images/404.png";
import errorimg from "../Images/errorimg.png";
import { clientUrl, hostname } from "../../config";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Error404() {
  const navigate = useRouter();
  useEffect(() => {
      window.location.host !== hostname &&
      window.location.replace(`${clientUrl}/err`);
    
  }, []);

  return (
    <div
      className="pb-[160px]"
      style={{
        background: " linear-gradient(262deg, #FB6609 0%, #E40849 100%)",
      }}
    >
      <div className="min-h-[110px]">
        <Navbar background="#FFFF" />
      </div>

      <div className=" bg-white z-50 mx-4 flex flex-col justify-center p-[20px] md:ml-[20px] md:mt-[32px] md:mr-[20px] md:rounded-[40px] items-center lg:mx-[60px]  lg:mb-[84px] lg:pb-[80px] lg:rounded-[40px] rounded-[40px]   ">
        <div className="flex justify-center  md:mt-[80px] xl:ml-[60px] lg:mb-[39px]  xl:mr-[15px] flex-col-reverse lg:flex-row items-center">
          <div className="flex flex-col justify-center lg:ml-[25px] lg:justify-normal lg:items-start items-center  ">
            <h1 className=" xsm:text-[25px]  xl:text-[40px] mt-[16px] text-[23px] lg:text-[28px] mb-[16px] font-black lg:text-left md:text-[30px] text-center flex justify-center sm:text-[28px] color-[#1A1A1A]">
              Oopsie-daisy! :( <br />
              Looks like we've hit <br className="block sm:hidden" /> a snag
            </h1>
            <p className="xsm:text-[12px] lg:text-[24px]  lg:text-left mb-[55px] text-center font-semibold color-[#1A1A1A] xl:text-[24px] md:text-[15px] sm:text-[16px]">
              We're sorry, but the page you're looking for
              <br className="hidden xsm:block" /> cannot be found
            </p>

            <div className="hidden md:w-[340px] lg:w-[356px] lg:block sm:w-[356px]  h-[48px] xsm:w-[270px]">
              <PrimaryButton2
                width={"100%"}
                text={"Back to Home"}
                onClick={() => {
                  navigate.push("/");
                }}
              />
            </div>
          </div>
          <div className="md:h-[300px] md:w-[550px] lg:ml-[20px] lg:w-[480px] md:mt-[-20px] lg:h-[290px] xl:ml-[35px] lg:mr-[15px] xl:w-[587px] xl:h-[369px]  w-[224px] h-[140.22px] sm:h-[220px] sm:w-[400px] sm:mt-[20px] relative flex justify-center ">
            <Image
              alt="error img"
              className="absolute max-w-full max-h-full sm:h-[120px] lg:h-[140px] lg:w-[290px]  md:h-[150px] md:w-[340px] xl:w-[350px] xl:h-[169px] sm:mr-[5px] sm:w-[250px] "
              src={text}
            />
            <Image
              alt="error img"
              className="absolute max-w-full max-h-full md:mt-[45px] lg:mt-[39px] mt-[25px] lg:h-[340px] lg:w-[480px] md:h-[340px] md:w-[640px] sm:h-[220px] sm:w-[400px] mr-[19px] xl:w-[587px] xl:h-[369px] sm:mt-[39px]"
              src={errorimg}
            />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center lg:items-start rounded-[20px] color-[#1A1A1A] xl:w-[1120px]  color-[#1A1A1A]  font-medium  lg:-[820px]  bg-[#FCE6ED]  lg:py-[32px] lg:px-[34px]  p-[20px]">
          <p className="mb-[28px]  md:mt-[20px]  lg:text-[20px] font-[500] text-[12px]   lg:mb-[20px]  sm:text-[14px]">
            It seems like you may have entered the wrong URL, or the page you
            are trying to access may <br /> have been moved, deleted, or never
            existed in the first place.
          </p>
          <div className="block lg:hidden sm:h-[55px]flex  items-center sm:w-[320px]  h-[48px] xsm:w-[270px]">
            <PrimaryButton2
              text={"Back to Home"}
              width={"100%"}
              onClick={() => {
                navigate.push("/");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
