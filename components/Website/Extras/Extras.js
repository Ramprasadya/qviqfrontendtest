"use client";
import React from "react";
import Privacy from "./Privacy";
import Refund from "./Refund";
import Term from "./Term";
import logo1 from "../../Images/TapopLogoBlack.png";
import { useRouter } from "next/navigation";
import Shipping from "./Shipping";
import { IoIosArrowForward } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import "./ExtraStyle.css";
import Image from "next/image";
import "../../CustomDomain/customDomain.css";
import Link from "next/link";

export default function Extras(props) {
  const router = useRouter();
  const navigate = (page) => {
    router.push(page);
  };

  return (
    <div className="flex flex-row bg-white overflow-hidden">
      <div className="h-screen xsm2:w-[400px] w-[100px] xsm2:text-[16px] text-[12px] flex flex-col items-start gap-[40px] xsm2:p-[20px] p-[10px] font-[500] text-gray-500">
        <Image
          onClick={() => {
            navigate("/");
          }}
          className="xsm2:h-[4.5rem] h-auto w-auto hover:cursor-pointer mb-[10px] mr-[4px]"
          src={logo1}
          alt="logo"
        />

        <Link
          className={`pageBtn ${
            props.page === "Privacy" && "font-[700] text-black"
          } text-left flex flex-row items-center`}
          href={"/privacy-policy"}
        >
          Privacy Policy{" "}
          <IoIosArrowForward
            style={{
              transform: props.page === "Privacy" && "translateX(0)",
              opacity: props.page === "Privacy" && "1",
            }}
            className={`opacity-0 pageArrow mt-[2px] ml-[5px]`}
          />
        </Link>
        <Link
          className={`pageBtn ${
            props.page === "Refund" && "font-[700] text-black"
          } text-left flex flex-row items-center`}
          href={"/refund-policy"}
        >
          Refund Policy{" "}
          <IoIosArrowForward
            style={{
              transform: props.page === "Refund" && "translateX(0)",
              opacity: props.page === "Refund" && "1",
            }}
            className={`opacity-0 pageArrow mt-[2px] ml-[5px]`}
          />
        </Link>
        <Link
          className={`pageBtn ${
            props.page === "Term" && "font-[700] text-black"
          } text-left flex flex-row items-center`}
          href={"/term-and-conditions"}
        >
          Term and Conditions{" "}
          <IoIosArrowForward
            style={{
              transform: props.page === "Term" && "translateX(0)",
              opacity: props.page === "Term" && "1",
            }}
            className={`opacity-0 pageArrow mt-[2px] ml-[5px]`}
          />
        </Link>
        {/* <button
          className={`pageBtn ${
            props.page === "Shipping" && "font-[700] text-black"
          } text-left flex flex-row items-center`}
          onClick={() => {
            navigate("/shipping-and-delivery-policy");
          }}
        >
          Shipping and Delivery Policy{" "}
          <IoIosArrowForward
            style={{
              transform: props.page === "Shipping" && "translateX(0)",
              opacity: props.page === "Shipping" && "1",
            }}
            className={`opacity-0 pageArrow mt-[2px] ml-[5px]`}
          />
        </button> */}
      </div>

      <div className="w-full h-screen">
        <div className="w-[50px] float-right flex flex-row justify-end  px-[20px] py-[10px]">
          <button
            onClick={() => {
              navigate("/");
            }}
          >
            <RxCross2 className="font-[700] text-[32px]" />
          </button>
        </div>
        <div className="w-full h-full overflow-y-scroll">
          {/* {props.page === "Shipping" && <Shipping />} */}
          {props.page === "Privacy" && <Privacy />}
          {props.page === "Refund" && <Refund />}
          {props.page === "Term" && <Term />}
        </div>
      </div>
    </div>
  );
}
