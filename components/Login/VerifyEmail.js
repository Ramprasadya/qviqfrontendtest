"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { serverUrl } from "../../config";
import logo from "../Images/TapopLogoBlack.png";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";

function VerifyEmail() {
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState(null);
  const id = useParams().userId;

  const navigate = useRouter();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(
          `${serverUrl}/tapopuser/verifyemail/${id}`
        );
        setIsVerified(true);
        setError(null);
      } catch (err) {
        setError(err.message);
      }
    };

    verifyEmail();
  }, [id]);

  // Redirect to login page
  const handleLoginPage = () => {
    navigate.push("/login");
  };
  // Redirect automatic on login page after 5 seconds
  const TimeOut = () => {
    setTimeout(() => {
      handleLoginPage();
    }, 5000);
  };

  return (
    <div>
      {isVerified &&
        (TimeOut(),
        (
          <div className="flex justify-between p-[10px] xsm:p-[20px] md:p-[0px] min-h-screen">
            <div className="absolute sm:ml-[20px]  mt-[32px] xl:ml-[78px] md:ml-[38px] xsm:mt-[32px] md:mt-[48px]">
              <Image
                alt="logo"
                className="xsm:w-[123.47px] xsm:h-[59px] sm:w-[120px] sm:h-[56px] md:w-[122.34px] md:h-[58px] w-[95px] h-[46px]"
                src={logo}
              />
            </div>
            <div className="flex flex-col items-center sm:place-items-start  justify-between  sm:justify-center ">
              <div className="sm:ml-[70px] md:ml-[100px] xl:ml-[205px] xsm:mt-[108px] md:mt-[0px] mt-[90px]  ">
                <h1 className="text-[22px]  xsm2:text-center sm:text-left lg:text-[34px] sm:mt-[10px] md:mt-[8px] xsm:text-[28px] xsm:mb-[8px] md:text-[38px] xl:text-[48px]  font-bold ">
                  Email verified. Please sign in.{" "}
                  <h1 className="hidden sm:inline">!</h1>
                </h1>
              </div>
              <div className="sm:mt-[50px]  xl:ml-[205px] sm:ml-[70px] md:ml-[100px] md:mt-[56px]  ">
                <button
                  type="button"
                  className="btn-primary text-white font-medium rounded-full flex h-[48px] w-[250px] xsm:w-[320px] sm:w-[450px] md:w-[500px] lg:w-[392px] xl:w-[592px]"
                  onClick={handleLoginPage}
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
                  <p className="">Login to Continue</p>
                </button>
              </div>
            </div>
            <div className="xl:w-[480px] lg:w-[430px] h-[100vh] bg-[#1B250F] lg:flex hidden lg:ml-[10px] xl:ml-[0px] justify-center items-center">
              <img
                className=" w-[404.091px] h-[494.132px] "
                src={
                  require("./assets/EmailVarifiedRightContainer.png").default
                    .src
                }
              />
            </div>
          </div>
        ))}
      {error && <p>{error}</p>}
    </div>
  );
}

export default VerifyEmail;
