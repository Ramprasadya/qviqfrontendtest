import React, { useContext, useEffect, useState } from "react";

// import "react-toastify/dist/ReactToastify.css";
import { HiOutlineX } from "react-icons/hi";
import { RiMailLine, RiPhoneLine } from "react-icons/ri";
function useDefaultProps(props) {
  let newProps = { ...props };
  Object.keys(newProps).forEach((key) =>
    newProps[key] === undefined ? delete newProps[key] : {}
  );
  return { ...defaultProps, ...newProps };
}
export default function ContactDetails({
  setShowModal5,
  mobileNumber,
  showEmail,
  showMobile,
  email,
  newMobileNumber,
  ...props
}) {
  props = useDefaultProps(props);

  // console.log("ContactDetails ", props.mobileVisibility);

  return (
    <div className="container" style={{ zIndex: "998" }}>
      <div
        className="modal-wrapper bg-[#00000054] backdrop-blur-[20px]"
        style={{ zIndex: "998" }}
      ></div>

      <div
        className={`flex flex-col h-fit bg-white fixed bottom-0 md:bottom-1/2 md:translate-y-1/2 left-1/2 -translate-x-1/2 rounded-t-2xl md:rounded-2xl md:w-[600px] w-full p-5 md:p-8 ${props.modalStyle}`}
        style={{ zIndex: "998" }}
      >
        <div className="flex justify-between items-center py-3 md:p-0">
          <p className="text-lg md:text-xl tracking-normal font-semibold">
            Contact Details
          </p>
          <span
            className="text-2xl logo-fill"
            style={{ cursor: "pointer", padding: "0" }}
            onClick={() => setShowModal5(false)}
          >
            <HiOutlineX />
          </span>
        </div>
        {!email && !mobileNumber && !newMobileNumber ? (
          <p className="mt-6"> No Contact Details Added </p>
        ) : (
          <div className="w-full flex flex-col mt-6">
            {showEmail && email && (
              <div className="w-full flex mb-7">
                <div
                  className={`w-16 h-16 px-6 py-2 bg-[#12121214] ${
                    props.square ? "rounded-[0px]" : "rounded-[20px]"
                  } flex justify-center items-center mr-4`}
                >
                  <RiMailLine size={"24px"} />
                </div>
                <div className="flex flex-col justify-center ">
                  <p className="text-[14px] font-normal">Email</p>
                  <a
                    className="text-[14px] font-bold hover:underline"
                    href={`mailto:${email}`}
                  >
                    {email}
                  </a>
                </div>
              </div>
            )}

            {showMobile &&
              mobileNumber &&
              (props.mobileVisibility === null ||
                props.mobileVisibility === undefined ||
                props.mobileVisibility === false) && (
                <div className="w-full flex mb-7">
                  <div
                    className={`w-16 h-16 px-6 py-2 bg-[#12121214] ${
                      props.square ? "rounded-[0px]" : "rounded-[20px]"
                    } flex justify-center items-center mr-4`}
                  >
                    <RiPhoneLine size={"24px"} />
                  </div>
                  <div className="flex flex-col justify-center ">
                    <p className="text-[14px] font-normal">Phone</p>
                    <a
                      className="text-[14px] font-bold hover:underline"
                      href={`tel:${mobileNumber}`}
                    >
                      {mobileNumber}
                    </a>
                  </div>
                </div>
              )}

            {showMobile &&
              newMobileNumber &&
              (props.mobileVisibility === null ||
                props.mobileVisibility === undefined ||
                props.mobileVisibility === false) && (
                <div className="w-full flex mb-7">
                  <div
                    className={`w-16 h-16 px-6 py-2 bg-[#12121214] ${
                      props.square ? "rounded-[0px]" : "rounded-[20px]"
                    } flex justify-center items-center mr-4`}
                  >
                    <RiPhoneLine size={"24px"} />
                  </div>
                  <div className="flex flex-col justify-center ">
                    <p className="text-[14px] font-normal">Phone</p>
                    <a
                      className="text-[14px] font-bold hover:underline"
                      href={`tel:${newMobileNumber}`}
                    >
                      {newMobileNumber}
                    </a>
                  </div>
                </div>
              )}
          </div>
        )}
      </div>
    </div>
  );
}

const defaultProps = {
  modalStyle: "DM-Sans-font-div",
};
