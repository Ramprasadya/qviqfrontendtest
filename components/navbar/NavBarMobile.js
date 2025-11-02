import React, { useContext, useEffect, useRef, useState } from "react";
import * as hi from "react-icons/hi";
import * as hi2 from "react-icons/hi2";
import logo from "../Image/tapopmobile.png";
import { UserContext } from "../Contexts/context";
import SidebarMobile from "./SidebarMobile";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const NavbarMobile = (props) => {
  const { username } = useContext(UserContext);
  const profile = { profile: useParams().userName };
  const navigate = useRouter();
  const { notifications, markAllAsRead } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dropdownNotificationRef = useRef(null);
  const dropdownNotificationIconRef = useRef(null);

  // sidebar
  const sideBarToggleButtonRef = useRef(null);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const sideBarToggle = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  // close dropdown when clicked outside
  useEffect(() => {
    const pageClickEvent = (e) => {
      if (
        dropdownNotificationRef.current !== null &&
        !dropdownNotificationRef.current.contains(e.target) &&
        dropdownNotificationIconRef.current !== null &&
        !dropdownNotificationIconRef.current.contains(e.target)
      ) {
        setIsModalOpen(!isModalOpen);
      }
    };
    if (isModalOpen) {
      window.addEventListener("click", pageClickEvent);
    }
    return () => {
      window.removeEventListener("click", pageClickEvent);
    };
  }, [isModalOpen]);

  return (
    <div
      className={`flex flex-col sticky top-0 min-h-[${
        props.text ? "104px" : "64px"
      }] max-h-[120px] p-3 pe-1 xsm:pe-3 pb-2 w-screen bg-white md:hidden`}
      style={{ zIndex: "997" }}
    >
      <div className="flex items-center">
        <Link href={`/selectprofile/${profile.profile}`}>
          <Image alt="logo"  src={logo} className="w-16" />
        </Link>
        <div className="ms-auto flex items-center gap-2 xsm:gap-3">
          <div>{props.button}</div>
          <div
            className="w-[32px] h-[32px] flex justify-center items-center"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setIsModalOpen(!isModalOpen);
            }}
            ref={dropdownNotificationIconRef}
          >
            <span className="text-xl relative text-[#1A1A1A]">
              <hi.HiOutlineBell />
              {notifications.length > 0 && (
                <span className="absolute top-0 right-0 bg-[#F54040] w-2 h-2 rounded-full border border-[#fafafa]" />
              )}
            </span>
          </div>
          <div
            className="w-[32px] h-[32px] flex justify-center items-center"
            style={{ cursor: "pointer" }}
            onClick={sideBarToggle}
            ref={sideBarToggleButtonRef}
          >
            <span className="text-xl">
              <hi2.HiBars3 />
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-end py-2 flex-1">
        {props.showBack && (
          <span
            className=" text-black text-[22px]"
            onClick={() => {
              navigate.push(`/selectprofile/${profile.profile}`);
            }}
            style={{ cursor: "pointer" }}
          >
            <hi.HiChevronLeft />
          </span>
        )}
        {props.text && (
          <div className="flex flex-row items-center gap-2 pl-2">
            <h1
              className={`${
                props.showBack ? "text-sm font-semibold" : "text-lg font-medium"
              }`}
            >
              {props.text}
            </h1>
            {props.number !== undefined ? (
              <div className="w-[35px] h-[28px] bg-[#1A1A1A] text-white flex justify-center items-center rounded-full text-sm font-semibold">
                {props.number}
              </div>
            ) : (
              ""
            )}
          </div>
        )}
      </div>

      {/* Notification Modal */}
      <div
        className={`dropdown-menu ${
          isModalOpen ? "block" : "hidden"
        } max-w-[calc(100%-20px)] xsm2:max-w-[400px] !right-[10px] xsm2:!right-[14px]`}
        ref={dropdownNotificationRef}
        style={{
          top: "65px",
          zIndex: "999",
          width: "100%",
          borderRadius: "16px",
          border: "2px solid #f3f3f3",
          padding: "0",
        }}
      >
        <div className="absolute top-[-14px] right-[50px] w-0 h-0 border-l-[10px] border-r-[10px] border-b-[15px] border-l-transparent border-r-transparent border-white"></div>
        <div className="flex justify-between items-center px-3 xsm2:px-5 py-4 border-b border-[#f3f3f3]">
          <h1 className="text-sm xsm:text-base font-semibold">
            Your Notifications
          </h1>
          {notifications.length > 0 && (
            <p
              className="text-xs xsm:text-sm font-medium text-linear-gradient hover:cursor-pointer active:scale-95 duration-150"
              onClick={()=>{markAllAsRead()}}
            >
              Mark all as read
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 px-0 py-4 xsm2:p-4">
          {notifications.length > 0 ? (
            <>
              {notifications.map((notification,index) => {
                return (
                  <div
                    className="flex items-center gap-3 p-3 pr-6 relative hover:cursor-pointer hover:bg-[#F3F3F3] rounded-xl"
                    onClick={() => {
                      // navigate.push(`/connectTable/${profile}`);
                      markAllAsRead(notification);
                    }}
                    key={index}
                  >
                    <div className="w-8 h-8 p-2 rounded-full border border-[#f3f3f3]">
                      <hi2.HiUsers />
                    </div>
                    <p className="text-xs xsm:text-sm text-[#1a1a1a]">
                      {notification.message}
                    </p>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="8"
                        height="8"
                        viewBox="0 0 8 8"
                        fill="none"
                      >
                        <circle
                          cx="4"
                          cy="4"
                          r="4"
                          fill="url(#paint0_linear_2293_22481)"
                        />
                        <defs>
                          <linearGradient
                            id="paint0_linear_2293_22481"
                            x1="8"
                            y1="4.87956e-07"
                            x2="-0.935972"
                            y2="1.23664"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="#FB6609" />
                            <stop offset="1" stopColor="#E40849" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <p className="text-sm text-[#817C7C] px-3">
              You have no new notifications
            </p>
          )}
        </div>
      </div>
      <SidebarMobile
        sideBarToggle={sideBarToggle}
        isSideBarOpen={isSideBarOpen}
        sideBarToggleButtonRef={sideBarToggleButtonRef}
      />
    </div>
  );
};

export default NavbarMobile;
