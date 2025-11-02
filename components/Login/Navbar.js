import React, { useState, useContext, useEffect } from "react";
import "../UiComponents/iconTextStyle.css";
import "../UiComponents/UiStyles.css";
import logo1 from "../Images/TapopLogoBlack.png";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { createQueryString } from "../utils";

const Navbar = (props) => {
  const navigate = useRouter();

  let background = props.background;

  let color = props.color;
  let logo = props.logo;

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

  return (
    <div
      className={`flex fixed top-0 left-0 w-full items-center py-[16px] text-[${color}] ${
        props.usedIn === "hideLogin" ? "justify-center" : "justify-between"
      } ${
        windowHeight > 700
          ? "smd:h-[96px] h-[80px] smd:px-[80px] px-[20px]"
          : "h-[80px] px-[20px]"
      }`}
      style={{
        background: background,
        // backdropFilter: "blur(20px)",
        zIndex: "997",
      }}
    >
      <Image
        priority={true}
        onClick={() => {
          navigate.push("/");
        }}
        className={`${
          windowHeight > 700 ? "smd:h-[50px] h-[30px]" : "h-[30px]"
        } w-auto hover:cursor-pointer`}
        src={logo ? logo : logo1}
        alt="logo"
      />

      {props.usedIn === "signup" && (
        <div className="flex gap-2 lg:gap-5">
          <Link
            className={`flex items-center justify-center font-[700] rounded-[100px] border-[#FB6609] ${
              windowHeight > 700
                ? "smd:text-[18px] text-[16px] smd:w-[113px] w-[84px] smd:h-[56px] h-[48px] smd:border-[3px] border-[2px]"
                : "text-[16px] w-[84px] h-[48px] border-[2px]"
            }`}
            href={
              "/login?" +
              createQueryString(
                ["qrId", "fromPage"],
                [props.qrId, props.fromPage]
              )
            }
          >
            <span className={`${color ? "text-[white]" : "add-icon"}`}>
              Login
            </span>
          </Link>
        </div>
      )}
      {props.usedIn === "login" && (
        <div className="flex gap-2 lg:gap-5">
          <Link
            className={`flex items-center justify-center font-[700] rounded-[100px] border-[#FB6609] px-[30px] ${
              windowHeight > 700
                ? "smd:text-[18px] text-[16px] smd:w-[120px] w-[90px] smd:h-[56px] h-[48px] smd:border-[3px] border-[2px]"
                : "text-[16px] w-[90px] h-[48px] border-[2px]"
            }`}
            href={
              "/signup?" +
              createQueryString(
                ["id", "fromPage"],
                [props.qrId, props.fromPage]
              )
            }
          >
            <span className={`${color ? "text-[white]" : "add-icon"}`}>
              Signup
            </span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
