import React, { useContext, useEffect, useRef, useState } from "react";
import * as hi from "react-icons/hi";
import * as hi2 from "react-icons/hi2";
import StarterButton from "../UiComponents/StarterButton";
import NavbarMobile from "./NavBarMobile";
import "../UiComponents/iconTextStyle.css";
import axios from "axios";
import { UserContext } from "../Contexts/context";
import { serverUrl } from "../../config";
import useOutsideClick from "../Utils/useOutsideClick";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { getCookie } from "../utils";

function useDefaultProps(props) {
  let newProps = { ...props };
  Object.keys(newProps).forEach((key) =>
    newProps[key] === undefined ? delete newProps[key] : {}
  );
  return { ...defaultProps, ...newProps };
}
// return function starts here
function Navbar(props) {
  props = useDefaultProps(props);
  const navigate = useRouter();
  const dropdownRef = useRef(null);
  const dropdownNotificationRef = useRef(null);
  const profilePicRef = useRef(null);
  const notificationRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);
  // data from context
  const { username, checkVariable, userFirstName, userSignOut } =
    useContext(UserContext);
  const profile = { profile: useParams().userName };

  const [notifications, setNotifications] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const config = {
          headers: {
            Authorization: "Bearer " + getCookie("jwt_token"),
          },
        };
        const response = await axios.get(
          `${serverUrl}/tapopuser/getNotifications/${profile.profile}`,
          config
        );

        const newObj =
          response.data.length == 0 ? [] : response.data[0].notificationArr;
        setNotifications(newObj);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
    if (username !== "") {
      fetchNotification();
    }
  }, [username]);

  const markAllAsRead = async (notification) => {
    try {
      // Reset the notification count in the state
      const config = {
        headers: {
          Authorization: "Bearer " + getCookie("jwt_token"),
        },
      };
      const response = await axios.get(
        `${serverUrl}/tapopuser/clearNotifications/${username}`,
        config
      );
      setNotifications([]);
      setIsModalOpen(false);
      if (notification.type == "plan_expiry")
        navigate.push(`/plan/${username}`);
      if (notification.type == "new_connection")
        navigate.push(`/connectTable/${username}`);
      if (notification.type == "new_meeting") {
        navigate.push(
          `/appointement/${username}?month=${notification.month}&year=${notification.year}&meetId=${notification.meetId}&filter=1`
        );
      }
    } catch (error) {
      console.error("Error resetting notifications:", error);
    }
  };

  useOutsideClick(dropdownNotificationRef, () => {
    if (isModalOpen) setIsModalOpen(false);
  });

  // close dropdown when clicked outside
  useEffect(() => {
    const pageClickEvent = (e) => {
      if (
        dropdownRef.current !== null &&
        !dropdownRef.current.contains(e.target) &&
        profilePicRef.current !== null &&
        !profilePicRef.current.contains(e.target)
      ) {
        setShowDropdown(!showDropdown);
      }
    };
    if (showDropdown) {
      window.addEventListener("click", pageClickEvent);
    }
    return () => {
      window.removeEventListener("click", pageClickEvent);
    };
  }, [showDropdown]);

  // profile image
  const [type, setType] = useState("");
  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        `${serverUrl}/profile/profiletype/${profile.profile}`
      );
      if (res.data.length !== 0) {
        setType(res.data[0]._id);
      } else {
        setType("");
      }
    } catch (error) {
      //console.log(error?.response);
    }
  };
  useEffect(() => {
    fetchProfile();
  }, [checkVariable]);

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const getData = async () => {
    const config = {
      headers: {
        Authorization: "Bearer " + getCookie("jwt_token"),
      },
    };
    try {
      const { data } = await axios.get(
        `${serverUrl}/connect/getDetail/${profile.profile}/${type}`,
        config
      );
      if (data.length !== 0) {
        setImage(data[0].profileimage);
        setName(data[0].firstName);
      } else {
        setImage("");
        setName("");
      }
    } catch (error) {
      //console.log(error?.response?.data?.error);
      navigate.push("/login");
    }
  };
  useEffect(() => {
    if (type) {
      getData();
    } else {
      setImage("");
      setName("");
    }
  }, [type, checkVariable]);

  const handleLogout = () => {
    userSignOut();
  };

  return (
    <>
      {/* Navbar for mobile view */}
      <NavbarMobile
        button={props.button}
        text={props.text}
        showBack={props.showBack}
        number={props.number}
        notifications={notifications}
        markAllAsRead={markAllAsRead}
      />

      {/* Navbar for desktop view */}
      <nav className="hidden md:flex justify-between relative bg-white">
        {/* hamburger menu  */}

        <div className="flex items-center flex-1">
          {props.showBack && (
            <button
              className="arrow text-black"
              onClick={() => {
                navigate.push(`/selectprofile/${profile.profile}`);
              }}
              style={{ cursor: "pointer" }}
            >
              <hi.HiChevronLeft />
            </button>
          )}
          <h1 className="pl-2 text-base font-semibold hover:text-black">
            {props.text}
          </h1>
        </div>

        <div className="flex items-center justify-end gap-5 flex-1 ">
          {props.button}

          {/* <Link> */}
          <div
            className=" bg-[#fafafa] rounded-full w-[48px] h-[48px] flex justify-center items-center"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setIsModalOpen(!isModalOpen);
            }}
            ref={dropdownNotificationRef}
          >
            <span className="text-xl relative text-[#817C7C]">
              <hi.HiOutlineBell />
              {notifications.length > 0 && (
                <span className="absolute top-0 right-0 bg-[#F54040] w-2 h-2 rounded-full border border-[#fafafa]" />
              )}
            </span>
          </div>

          {/* Notification Modal */}
          <div
            className={`dropdown-menu ${isModalOpen ? "block" : "hidden"}`}
            style={{
              top: "80px",
              right: "1.5rem",
              zIndex: "999",
              width: "100%",
              maxWidth: "440px",
              borderRadius: "16px",
              border: "2px solid #f3f3f3",
              padding: "0",
            }}
          >
            <div className="absolute top-[-14px] right-[82px] w-0 h-0 border-l-[10px] border-r-[10px] border-b-[15px] border-l-transparent border-r-transparent border-white"></div>
            <div className="flex justify-between items-center px-5 py-4 border-b border-[#f3f3f3]">
              <h1 className="font-semibold">Your Notifications</h1>
              {notifications.length > 0 && (
                <p
                  className="text-sm font-medium text-linear-gradient hover:cursor-pointer active:scale-95 duration-150"
                  onClick={() => {
                    markAllAsRead();
                  }}
                >
                  Mark all as read
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2 p-4">
              {notifications.length > 0 ? (
                <>
                  {notifications.map((notification, index) => {
                    return (
                      <div
                        className="flex items-center gap-3 p-3 pr-6 relative hover:cursor-pointer hover:bg-[#F3F3F3] rounded-xl"
                        onClick={() => {
                          markAllAsRead(notification);
                        }}
                        key={index}
                      >
                        <div className="w-8 h-8 p-2 rounded-full border border-[#f3f3f3]">
                          <hi2.HiUsers />
                        </div>
                        <p className="text-sm text-[#1a1a1a]">
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
                <p className="text-sm text-[#817C7C]">
                  You have no new notifications
                </p>
              )}
            </div>
            {/* <ul>
                <li
                  style={{ padding: "5px 10px" }}
                  onClick={markAllAsRead}
                >
                  <Link
                    className="flex gap-3 items-center px-2.5 py-2 w-full h-full"
                    to={`/connectTable/${profile.profile}`}
                  >
                    <span className="font-semibold" ref={notificationRef}>
                      {notifications.length > 0
                        ? `${latestConnect} + ${
                            notifications.length - 1
                          } New Connections`
                        : "0 New Connection"}
                    </span>
                  </Link>
                </li>
              </ul> */}
          </div>

          {/* </Link> */}
          <div className="h-12 rounded-full w-12 cursor-pointer">
            <img
              src={
                image
                  ? image
                  : require("../ProfileTemplates/images/image1.jpg").default.src
              }
              alt="profile-pic"
              className="h-12 rounded-full w-12  "
              onClick={() => setShowDropdown(!showDropdown)}
              ref={profilePicRef}
            />
            <div
              className={`dropdown-menu ${showDropdown ? "block" : "hidden"}`}
              ref={dropdownRef}
              style={{
                top: "75px",
                right: "1.5rem",
                width: "240px",
                zIndex: "999",
              }}
            >
              <ul>
                <li style={{ padding: "5px 10px" }}>
                  <img
                    src={
                      image
                        ? image
                        : require("../ProfileTemplates/images/image1.jpg")
                            .default.src
                    }
                    alt="profile-pic"
                    className="h-12 w-12 rounded-full flex "
                  />
                  <span className="font-semibold">
                    {name ? name : userFirstName}
                  </span>
                </li>
                <hr className="my-2" />
                <li style={{ padding: "0" }}>
                  <Link
                    className="flex gap-3 items-center px-2.5 py-2 w-full h-full"
                    href={`/myaccount/${profile.profile}`}
                  >
                    <span className="text-lg">
                      <hi.HiOutlineUserCircle />
                    </span>{" "}
                    Account Settings
                  </Link>
                </li>
                <li style={{ padding: "0" }}>
                  <Link
                    className="flex gap-3 items-center px-2.5 py-2 w-full h-full"
                    href={`/managesubscription/${profile.profile}`}
                  >
                    {" "}
                    <span className="text-lg">
                      <hi.HiOutlineCurrencyDollar />{" "}
                    </span>{" "}
                    Manage Subscription
                  </Link>
                </li>
                <hr className="my-2" />
                <li style={{ padding: "0" }}>
                  <Link
                    className="flex gap-3 items-center px-2.5 py-2 w-full h-full"
                    href={`/contact`}
                  >
                    {" "}
                    <span className="text-lg">
                      <hi.HiOutlinePhone />{" "}
                    </span>{" "}
                    Help Center
                  </Link>
                </li>
                <li className="add-icon" style={{ padding: "0" }}>
                  <Link
                    className="flex gap-3 items-center px-2.5 py-2 w-full h-full"
                    href={"/login"}
                    onClick={handleLogout}
                  >
                    {" "}
                    <span className="text-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mt-[2px]"
                        width="18"
                        height="18"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M3 4.25C3 3.00736 4.00736 2 5.25 2H10.75C11.9926 2 13 3.00736 13 4.25V6.25C13 6.66421 12.6642 7 12.25 7C11.8358 7 11.5 6.66421 11.5 6.25V4.25C11.5 3.83579 11.1642 3.5 10.75 3.5H5.25C4.83579 3.5 4.5 3.83579 4.5 4.25V15.75C4.5 16.1642 4.83579 16.5 5.25 16.5H10.75C11.1642 16.5 11.5 16.1642 11.5 15.75V13.75C11.5 13.3358 11.8358 13 12.25 13C12.6642 13 13 13.3358 13 13.75V15.75C13 16.9926 11.9926 18 10.75 18H5.25C4.00736 18 3 16.9926 3 15.75V4.25Z"
                          fill="#fb3909"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M6 10C6 9.58579 6.33579 9.25 6.75 9.25H16.2955L15.2483 8.30747C14.9404 8.03038 14.9154 7.55616 15.1925 7.24828C15.4696 6.94039 15.9438 6.91543 16.2517 7.19253L18.7517 9.44253C18.9098 9.58476 19 9.78738 19 10C19 10.2126 18.9098 10.4152 18.7517 10.5575L16.2517 12.8075C15.9438 13.0846 15.4696 13.0596 15.1925 12.7517C14.9154 12.4438 14.9404 11.9696 15.2483 11.6925L16.2955 10.75H6.75C6.33579 10.75 6 10.4142 6 10Z"
                          fill="#CF2828"
                        />
                      </svg>{" "}
                    </span>{" "}
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* <span className="text-black text-2xl p-2 inline-block cursor-pointer ">
          <fa.FaBars />
        </span> */}
      </nav>
    </>
  );
}

const defaultProps = {
  button: <StarterButton />,
  text: "Set up your qviq profile",
  showBack: true,
};

export default Navbar;
