import React, { useContext, useEffect, useState } from "react";

// import "react-toastify/dist/ReactToastify.css";
import { HiOutlineX } from "react-icons/hi";
import { RiMailLine, RiPhoneLine } from "react-icons/ri";

export default function ContactDetails({ setShowModal5, mobileNumber, email }) {
  console.log("ContactDetails mobile", props.mobileVisibility);

  return (
    <div className="container sans " style={{ zIndex: "998" }}>
      <div
        className="modal-wrapper bg-[#00000054] backdrop-blur-[20px]"
        style={{ zIndex: "998" }}
      ></div>

      <div
        className="flex flex-col  bg-white fixed bottom-0 md:bottom-1/2 md:translate-y-1/2 left-1/2 -translate-x-1/2 h-fit rounded-t-2xl md:rounded-2xl md:w-[600px] w-full px-5 py-8"
        style={{ zIndex: "998", height: "fit-content" }}
      >
        <div className="flex justify-between items-center px-3 py-3 xsm:px-5 xsm:py-2 md:p-4">
          <p className="text-lg md:text-xl text-black tracking-normal font-semibold">
            Contact Details
          </p>
          <span
            className="text-2xl text-black logo-fill"
            style={{ cursor: "pointer", padding: "0" }}
            onClick={() => setShowModal5(false)}
          >
            <HiOutlineX />
          </span>
        </div>
        <div className="w-full flex flex-col mt-6">
          <div className="w-full flex mb-7">
            <div className="w-16 h-16 px-6 py-2 bg-[#12121214] rounded-[20px] flex justify-center items-center mr-4">
              <RiMailLine size={"24px"} />
            </div>
            <div className="flex flex-col justify-center ">
              <p className="text-[14px] font-normal text-[#000000]">Email</p>
              <p className="text-[14px] font-bold text-[#000000]">
                {email ? email : "johndoe@gmail.com"}
              </p>
            </div>
          </div>
          {(props.mobileVisibility === null ||
            props.mobileVisibility === undefined ||
            props.mobileVisibility === false) && (
            <div className="w-full flex mb-7">
              <div className="w-16 h-16 px-6 py-2 bg-[#12121214] rounded-[20px] flex justify-center items-center mr-4">
                <RiPhoneLine size={"24px"} />
              </div>
              <div className="flex flex-col justify-center ">
                <p className="text-[14px] font-normal text-[#000000]">Phone</p>
                <p className="text-[14px] font-bold text-[#000000]">
                  +91 {mobileNumber ? mobileNumber : " 1234567890"}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
