import React, { useState, useEffect, useRef } from "react";
import "./UiStyles.css";
// import "react-toastify/dist/ReactToastify.css";
import ConfirmationPopUp from "./MobileView/ConfirmationPopUp";
import axios from "axios";
import Preview from "./Preview";
import NewToast from "./NewToast";
import { useContext } from "react";
import { UserContext } from "../Contexts/context";
import { HiLockClosed } from "react-icons/hi";
import { hostname, serverUrl } from "../../config";
import ShareModal from "../ProfileTemplates/template1/modals/ShareModal";
import { RiLock2Line, RiShareBoxFill } from "react-icons/ri";
import { useRouter, usePathname } from "next/navigation";
import Iphone from "./Iphone";
import { LuCopy, LuPencil } from "react-icons/lu";
import PrimaryButton from "./PrimaryButton";
import { MdDone, MdOutlineRemoveRedEye } from "react-icons/md";
import { FiEye } from "react-icons/fi";
import { IoWarningOutline } from "react-icons/io5";
import PrimaryButton2 from "./PrimaryButton2";
import SecondaryButton from "./SecondaryButton";
import { getCookie } from "../utils";
import profileImg from "../../components/ProfileCategory/assets/profile.svg";
import LeftRightScrollBtn from "../Utils/LeftRightScrollBtn";
import Image from "next/image";
import ShareModalDownload from "../ProfileTemplates/template1/modals/ShareModalDownload";
import {
  isIOS,
  isAndroid,
  isDesktop,
  isChrome,
  isFirefox,
  isSafari,
} from "react-device-detect";

const ProfileCard = (props) => {
  const navigate = useRouter();

  const [popUpDeleteOpen, setPopUpDeleteOpen] = useState(false);
  const [popUpActivateOpen, setPopUpActivateOpen] = useState(false);
  const [popUpDeactivateOpen, setPopUpDeactivateOpen] = useState(false);
  const [popUpEmailVerifyOpen, setPopUpEmailVerifyOpen] = useState(false);
  const [showMessage, setShowtMessage] = useState(false);
  const [message, setMessage] = useState("");

  const backgroundColor = props?.currentProfileData?.backgroundColor;
  const buttonStyle = props?.currentProfileData?.buttonStyle;
  const buttonColor = props?.currentProfileData?.buttonColor;
  const color1 = props?.currentProfileData?.color1;
  const color2 = props?.currentProfileData?.color2;
  const bgImage = props?.currentProfileData?.bgImage;
  const appIconBg = props?.currentProfileData?.appIconBg;
  const customTextColor = props?.currentProfileData?.customTextColor;
  const customButtontextColor =
    props?.currentProfileData?.customButtontextColor;

  //Dropdown menu
  const dropdownRef = useRef(null);
  const svgButtonRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  //close dropdown menu when clicked outside
  useEffect(() => {
    if (props.outsideClick ? props.outsideClick : false) {
      document.addEventListener("click", (e) => {
        if (dropdownRef.current !== null && svgButtonRef.current !== null) {
          if (
            isDropdownOpen &&
            !dropdownRef.current.contains(e.target) &&
            !svgButtonRef.current.contains(e.target)
          ) {
            setIsDropdownOpen(false);
          }
        }
      });
    }
  }, [isDropdownOpen]);

  const [showPreview, setShowPreview] = useState(false);
  const profileImage = props?.currentProfileData?.profileImage;
  const name = props?.currentProfileData?.name;
  const firstName = props?.currentProfileData?.firstName;
  const lastName = props?.currentProfileData?.lastName;
  const email = props?.currentProfileData?.email;
  const mobileNumber = props?.currentProfileData?.mobileNumber;
  const newMobileNumber = props?.currentProfileData?.newMobileNumber;
  const description = props?.currentProfileData?.description;
  const companyName = props?.currentProfileData?.companyName;
  const images = props?.currentProfileData?.images;
  const videos = props?.currentProfileData?.videos;
  const apps = props?.currentProfileData?.apps;
  const productSwitch = props?.currentProfileData?.productSwitch;
  const serviceSwitch = props?.currentProfileData?.serviceSwitch;
  const logoSwitch = props?.currentProfileData?.logoSwitch;
  const reviewSwitch = props?.currentProfileData?.reviewSwitch;
  const reviewButtonSwitch = props?.currentProfileData?.reviewButtonSwitch;
  const businessHoursSwitch = props?.currentProfileData?.businessHoursSwitch;
  const productLabel = props?.currentProfileData?.productLabel;
  const serviceLabel = props?.currentProfileData?.serviceLabel;
  const reviewLabel = props?.currentProfileData?.reviewLabel;
  const businessHoursLabel = props?.currentProfileData?.businessHoursLabel;
  const products = props?.currentProfileData?.products;
  const services = props?.currentProfileData?.services;
  const reviews = props?.currentProfileData?.reviews;
  const businessHours = props?.currentProfileData?.businessHours;
  const jobTitle = props?.currentProfileData?.jobTitle;
  const pdfs = props?.currentProfileData?.pdfs;
  const customLinks = props?.currentProfileData?.customLinks;
  const dummyData = props?.currentProfileData?.dummyData;
  const [shareProfile, setShareProfile] = useState(false);
  const [QRdownload, setQRdownload] = useState(false);
  const leadCapture = props?.currentProfileData?.leadCapture;
  const quickSelect = props?.currentProfileData?.quickSelect;
  const availabilityLabel = props?.currentProfileData?.availabilityLabel;
  const availabilitySwitch = props?.currentProfileData?.availabilitySwitch;
  const availability = props?.currentProfileData?.availability;
  const percentage = Math.round(props?.progress);
  const basic = props?.userBasic;
  const [dummyState, setDummyState] = useState(0);
  const type = props?.currentProfileData?.type;
  const activeTemplateName = props?.currentProfileData?.activeTemplateName;
  const profileRef = useRef(null);

  const leftPos = {
    left: "2px",
    top: "50%",
    transform: "translateY(-50%)",
  };
  const rightPos = {
    right: "2px",
    top: "50%",
    transform: "translateY(-50%)",
  };

  async function handleShareProfile() {
    setShareProfile(true);
  }
  async function handleDelete(id) {
    await fetch(`${serverUrl}/profile/${props.profile}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + getCookie("jwt_token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: props.profile }),
    })
      .then(() => {
        props.setMessage(`${props.cardtype} card deleted`);
        props.setShowToast(true);
        setTimeout(() => {
          props.setShowToast(false);
        }, 3000);
      })
      .catch((error) => {
        // console.log(error);
      });

    const newRecords = props.profileData.filter((el) => el._id !== id);
    props.setProfileData(newRecords);
    updateCheckVariable();
  }

  const { profileData } = props;
  const previouslySharedProfile = profileData.find((el) => el.shared === true);
  async function handleActivate(id) {
    // if (previouslySharedProfile) {
    //   const confirmation = window.confirm(
    //     `You have previously shared the profile with ID ${previouslySharedProfile.type}. Do you want to unshare it?`
    //   );
    //   if (confirmation) {
    //     await handleDeactivate(previouslySharedProfile._id);
    //   } else {
    //     return;
    //   }
    // }

    try {
      await fetch(`${serverUrl}/profile/shared/${props.profile}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ shared: true }),
      }).then(() => {
        props.setMessage(`${props.cardtype} card activated`);
        props.setShowToast(true);
        setTimeout(() => {
          props.setShowToast(false);
        }, 3000);
      });
      // Update the UI immediately
      const newRecords = props.profileData.map((el) => {
        if (el._id === id) {
          el.shared = true;
        } else {
          el.shared = false; // Unshare any previously shared profile
        }
        return el;
      });
      props.setProfileData(newRecords);
    } catch (err) {
      console.error(err);
    }
    updateCheckVariable();
  }

  async function handleDeactivate(id) {
    await fetch(`${serverUrl}/profile/shared/${props.profile}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ shared: false }),
    }).then(() => {
      props.setMessage(`${props.cardtype} card deactivated`);
      props.setShowToast(true);
      setTimeout(() => {
        props.setShowToast(false);
      }, 3000);
    });
    const newRecords = props.profileData.map((el) => {
      if (el._id === id) {
        el.shared = false;
      }
      return el;
    });
    props.setProfileData(newRecords);
    updateCheckVariable();
  }

  // console.log(props.profile);

  const handlePreview = () => {
    // const type = props.cardtype;
    // console.log(type);
    // const newUrl = `http://${props.profile}.${hostname}/${type}`;
    // window.location.href = newUrl;
    setShowPreview(true);
  };

  // capitalize the first letter of a string
  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  // import data from context
  const { updateCheckVariable, quickSelectContext, leadCaptureContext } =
    useContext(UserContext);

  props.setUserId(`/${props.id}/dashboard/${props.profile}`);

  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [isSmallScreen1, setIsSmallScreen1] = useState(false);
  const [isSmallScreen2, setIsSmallScreen2] = useState(false);

  useEffect(() => {
    const mediaQuery1 = window.matchMedia("(min-width: 360px)");
    const mediaQuery2 = window.matchMedia("(max-width: 359px)");

    const handleMediaQueryChange = (event) => {
      setIsSmallScreen1(event.matches);
    };
    const handleMediaQueryChange2 = (event) => {
      setIsSmallScreen2(event.matches);
    };

    mediaQuery1.addEventListener("change", handleMediaQueryChange);
    mediaQuery2.addEventListener("change", handleMediaQueryChange2);

    handleMediaQueryChange(mediaQuery1);
    handleMediaQueryChange2(mediaQuery2);

    return () => {
      mediaQuery1.removeEventListener("change", handleMediaQueryChange);
      mediaQuery2.removeEventListener("change", handleMediaQueryChange2);
    };
  }, []);

  return (
    <div
      className={`flex flex-row ${
        isIOS ? "pb-[8.2rem]" : "pb-[4.2rem]"
      } pl-[1.2rem] pr-[1.2rem] sm:pl-[1.5rem] sm:pb-[1.5rem] sm:pr-[1.5rem]`}
      style={{ gap: windowWidth > 1100 ? "32px" : "0px", transition: "500ms" }}
    >
      <div className="flex flex-col gap-5 md:gap-6 w-full">
        {profileData.length !== 0 && (
          <div className="relative">
            <div
              className="flex flex-col gap-5 md:gap-6 !overflow-scroll"
              ref={profileRef}
            >
              <div
                className={`flex flex-row items-center gap-[12px] ${
                  profileData.length == 1 ? "hidden" : "min-w-[500px]"
                } w-full bg-[#F3F3F3] p-[8px] rounded-[16px]`}
              >
                {profileData.map((info, index) => (
                  <div
                    className={`flex flex-row items-center gap-[16px] bg-white p-[12px] w-full min-w-[50px] rounded-[12px] cursor-pointer active:scale-95 hover:shadow-md`}
                    style={{ transition: "300ms" }}
                    key={index}
                    onClick={() => {
                      props.setProfileIndex(index);
                    }}
                  >
                    <Image
                      alt="profileImg"
                      src={profileImg}
                      className={`${
                        props.profileIndex === index
                          ? "opacity-100"
                          : "opacity-50"
                      }`}
                    />
                    <p
                      className={`text-[16px] ${
                        props.profileIndex === index
                          ? "text-black font-[600]"
                          : "text-[#817C7C] font-[500]"
                      }`}
                    >
                      Profile {index + 1}
                    </p>
                  </div>
                ))}
              </div>
              <LeftRightScrollBtn
                refrence={profileRef}
                style={{
                  border: "1px solid black",
                  fontSize: "16px",
                  color: "black",
                }}
                scrollLength={200}
                leftPosition={leftPos}
                rightPosition={rightPos}
              />
            </div>
          </div>
        )}

        <div className="profile-card p-[16px] !h-[370px] xsm1:!h-auto sm:p-[24px] flex flex-col sm:flex-row justify-start sm:justify-between gap-[16px] w-full relative bg-[#fff] overflow-hidden">
          <div className="flex sm:hidden flex-row justify-between w-full">
            {props.shared ? (
              <div className="bg-[#E0FBF1] rounded-full py-[4px] px-[8px] flex flex-row justify-center items-center gap-[5px]">
                <MdDone className="text-[#12A26E] text-[16px] font-[800]" />
                <p className="text-[#12A26E] text-[12px] font-[600]">
                  Currently Shared
                </p>
              </div>
            ) : (
              <div className="bg-[#FFE2E2] rounded-full py-[4px] px-[8px] flex flex-row justify-center items-center gap-[5px]">
                <IoWarningOutline className="text-[#CF2828] text-[16px] font-[800]" />
                <p className="text-[#CF2828] text-[12px] font-[600]">
                  Inactive
                </p>
              </div>
            )}

            {props.access ? (
              <div className="p-0" style={{ display: "inherit" }}>
                <button
                  onClick={() => {
                    setIsDropdownOpen(!isDropdownOpen);
                  }}
                  ref={svgButtonRef}
                  disabled={!props.access}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                    />
                  </svg>
                </button>

                <div
                  className={`dropdown-menu ${
                    isDropdownOpen ? "block" : "hidden"
                  }`}
                  ref={dropdownRef}
                  style={{ top: "45px", right: "10px" }}
                >
                  <ul>
                    {props.shared ? (
                      <>
                        {!props.popUp ? (
                          <li
                            onClick={() => {
                              !props.active &&
                                handleDeactivate(props.id, props.shared);
                            }}
                          >
                            Deactivate
                          </li>
                        ) : (
                          <>
                            <li
                              onClick={() => {
                                !props.active && setPopUpDeleteOpen(false);
                                !props.active && setPopUpActivateOpen(false);
                                !props.active && setPopUpDeactivateOpen(true);
                              }}
                            >
                              Deactivate
                            </li>
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        <li
                          onClick={() => {
                            !props.active && setPopUpDeleteOpen(false);
                            setPopUpActivateOpen(true);
                            !props.active && setPopUpDeactivateOpen(false);
                            !props.active && setIsDropdownOpen(false);
                          }}
                        >
                          {" "}
                          Activate
                        </li>
                      </>
                    )}

                    {
                      <>
                        {!props.popUp ? (
                          <li
                            onClick={() =>
                              !props.active && handleDelete(props.id)
                            }
                          >
                            Delete
                          </li>
                        ) : (
                          <>
                            <li
                              onClick={() => {
                                !props.active && setPopUpDeleteOpen(true);
                                !props.active && setPopUpActivateOpen(false);
                                !props.active && setPopUpDeactivateOpen(false);
                              }}
                            >
                              Delete
                            </li>
                            <ConfirmationPopUp
                              open={popUpDeleteOpen}
                              setOpen={setPopUpDeleteOpen}
                              title={`Delete Qviq ${props.cardtype} Card?`}
                              description={`Are you sure that you want to delete your Qviq ${props.cardtype} card profile? Your profile will be permanently deleted, and you will be unable to recover it.`}
                              buttonText={"Delete Profile"}
                              onClick={() => handleDelete(props.id)}
                            />
                          </>
                        )}
                      </>
                    }
                  </ul>
                </div>
              </div>
            ) : (
              <div className="p-0 text-black text-xl">
                <RiLock2Line />
              </div>
            )}
          </div>
          {/* Background Progress bar  */}
          {/* <div
            className="w-[70px] h-[70px] sm:min-w-[108px] sm:w-fit sm:h-[108px] rounded-full flex items-center justify-center relative"
            style={
              basic && percentage !== 100
                ? { 
                    background: `conic-gradient(#E40849 0deg, #FB6609 ${
                      percentage * 3.6
                    }deg, #FFFFFF ${percentage * 3.6}deg)`,
                    transform: "scaleX(-1) scaleY(-1)",
                  }
                : { transform: "scaleX(-1) scaleY(-1)" }
            }
          > */}
          <div
            className="w-[62px] h-[62px] sm:min-w-[100px] sm:w-fit sm:h-[100px] rounded-full"
            // style={{ transform: "scaleX(-1) scaleY(-1)" }}
          >
            <img
              src={
                profileImage === ""
                  ? require("../ProfileTemplates/images/image11.jpg").default
                      .src
                  : profileImage
              }
              alt=""
              className="w-[62px] h-[62px] sm:w-[100px] sm:h-[100px] rounded-full object-cover"
            />
          </div>

          {/* Profile progress bar  */}

          {/* {basic && percentage != 100 && (
              <div
                className="absolute sm:top-[-13px] top-[-4px] w-[33px] h-[22px] sm:w-[41px] sm:h-[32px] rounded-[16px] flex items-center justify-center"
                style={{
                  transform: "scaleX(-1) scaleY(-1)",
                  background: "linear-gradient(225deg, #fb6609, #e40849)",
                }}
              >
                <p className="text-white text-[12px] font-[600]">
                  {percentage}%
                </p>
              </div>
            )} */}
          {/* </div> */}

          <div className="main w-full h-fit flex flex-col justify-between">
            <div className={`data flex-col gap-[20px] w-full`}>
              <div className="">
                <div className="flex flex-row justify-between w-full">
                  <p className="text-[16px] sm:text-[20px] font-[600]">
                    {name}
                  </p>

                  <div className="hidden sm:flex flex-row gap-[10px]">
                    {props.shared ? (
                      <div className="bg-[#E0FBF1] rounded-full py-[8px] px-[14px] flex flex-row justify-center items-center gap-[5px]">
                        <MdDone className="text-[#12A26E] text-[16px] font-[800]" />
                        <p className="text-[#12A26E] text-[12px] font-[600]">
                          Currently Shared
                        </p>
                      </div>
                    ) : (
                      <div className="bg-[#FFE2E2] rounded-full py-[8px] px-[14px] flex flex-row justify-center items-center gap-[5px]">
                        <IoWarningOutline className="text-[#CF2828] text-[16px] font-[800]" />
                        <p className="text-[#CF2828] text-[12px] font-[600]">
                          Inactive
                        </p>
                      </div>
                    )}

                    {props.access ? (
                      <div className="p-0" style={{ display: "inherit" }}>
                        <button
                          onClick={() => {
                            setIsDropdownOpen(!isDropdownOpen);
                          }}
                          ref={svgButtonRef}
                          disabled={!props.access}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                            />
                          </svg>
                        </button>

                        <div
                          className={`dropdown-menu ${
                            isDropdownOpen ? "block" : "hidden"
                          }`}
                          ref={dropdownRef}
                          style={{ top: "45px", right: "10px" }}
                        >
                          <ul>
                            {props.shared ? (
                              <>
                                {!props.popUp ? (
                                  <li
                                    onClick={() => {
                                      !props.active &&
                                        handleDeactivate(
                                          props.id,
                                          props.shared
                                        );
                                    }}
                                  >
                                    Deactivate
                                  </li>
                                ) : (
                                  <>
                                    <li
                                      onClick={() => {
                                        !props.active &&
                                          setPopUpDeleteOpen(false);
                                        !props.active &&
                                          setPopUpActivateOpen(false);
                                        !props.active &&
                                          setPopUpDeactivateOpen(true);
                                      }}
                                    >
                                      Deactivate
                                    </li>
                                    <ConfirmationPopUp
                                      open={popUpDeactivateOpen}
                                      setOpen={setPopUpDeactivateOpen}
                                      title={`Deactivate Qviq ${props.cardtype} Card?`}
                                      description={`Are you sure you want to deactivate your Qviq ${props.cardtype} card profile? You can activate your profile anytime.`}
                                      buttonText={"Deactivate"}
                                      onClick={() =>
                                        !props.active &&
                                        handleDeactivate(props.id, props.shared)
                                      }
                                    />
                                  </>
                                )}
                              </>
                            ) : (
                              <>
                                <li
                                  onClick={() => {
                                    !props.active && setPopUpDeleteOpen(false);
                                    setPopUpActivateOpen(true);
                                    !props.active &&
                                      setPopUpDeactivateOpen(false);
                                    !props.active && setIsDropdownOpen(false);
                                    // console.log("ggwp");
                                  }}
                                >
                                  {" "}
                                  Activate
                                </li>
                                <ConfirmationPopUp
                                  open={popUpActivateOpen}
                                  setOpen={setPopUpActivateOpen}
                                  title={`Activate Qviq ${props.cardtype} Card?`}
                                  description={
                                    previouslySharedProfile
                                      ? `You have previously shared the profile with ID ${previouslySharedProfile.type}. Do you want to unshare it?`
                                      : `Are you sure you want to activate your Qviq ${props.cardtype} card profile?`
                                  }
                                  buttonText={"Activate"}
                                  onClick={() =>
                                    handleActivate(props.id, props.shared)
                                  }
                                />
                              </>
                            )}

                            {
                              <>
                                {!props.popUp ? (
                                  <li
                                    onClick={() =>
                                      !props.active && handleDelete(props.id)
                                    }
                                  >
                                    Delete
                                  </li>
                                ) : (
                                  <>
                                    <li
                                      onClick={() => {
                                        !props.active &&
                                          setPopUpDeleteOpen(true);
                                        !props.active &&
                                          setPopUpActivateOpen(false);
                                        !props.active &&
                                          setPopUpDeactivateOpen(false);
                                      }}
                                    >
                                      Delete
                                    </li>
                                    <ConfirmationPopUp
                                      open={popUpDeleteOpen}
                                      setOpen={setPopUpDeleteOpen}
                                      title={`Delete Qviq ${props.cardtype} Card?`}
                                      description={`Are you sure that you want to delete your Qviq ${props.cardtype} card profile? Your profile will be permanently deleted, and you will be unable to recover it.`}
                                      buttonText={"Delete Profile"}
                                      onClick={() => handleDelete(props.id)}
                                    />
                                  </>
                                )}
                              </>
                            }
                          </ul>
                        </div>
                      </div>
                    ) : (
                      <div className="p-0 text-black text-xl">
                        <RiLock2Line />
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col justify-start mt-2">
                  <p
                    className="text-[#817C7C] text-[14px] sm:text-[16px] font-[500] overflow-hidden whitespace-pre-line break-words "
                    // style={{
                    //   fontSize: email?.length > 62 ? "0.8rem" : "inherit",
                    // }}
                  >
                    {email}
                  </p>
                  <p className="text-[#817C7C] text-[14px] sm:text-[16px] font-[500]">
                    {mobileNumber === "" ? props.mobilenumber : mobileNumber}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-[20px] sm:w-[335px] w-full mb-[4px]">
                <div className="flex flex-col xsm1:flex-row gap-[10px] xsm3:gap-[16px] h-[35px] sm:h-[40px]">
                  {props.shared ? (
                    <PrimaryButton
                      width="100%"
                      text="Edit Profile"
                      icon={<LuPencil />}
                      onClick={
                        props.emailVerified === false
                          ? () => {
                              setPopUpEmailVerifyOpen(true);
                            }
                          : () => {
                              navigate.push(
                                `/${props.id}/dashboard/${props.profile}`
                              );
                            }
                      }

                      // onClick={
                      //   props.emailVerified === false
                      //     ? () => {
                      //         !props.active && setPopUpEmailVerifyOpen(true);
                      //       }
                      //     : props.access === false
                      //     ? () => {
                      //         !props.active && navigate.push(`/plan/${props.profile}`);
                      //       }
                      //     : () => {
                      //         !props.active &&
                      //           navigate.push(
                      //             `/${props.id}/dashboard/${props.profile}`
                      //           );
                      //       }
                      // }
                    />
                  ) : (
                    <SecondaryButton
                      modify={true}
                      width="100%"
                      text="Edit Profile"
                      className="!p-[10px] xsm:p-0"
                      icon={<LuPencil />}
                      onClick={
                        props.emailVerified === false
                          ? () => {
                              setPopUpEmailVerifyOpen(true);
                            }
                          : () => {
                              navigate.push(
                                `/${props.id}/dashboard/${props.profile}`
                              );
                            }
                      }
                    />
                  )}
                  <SecondaryButton
                    modify={true}
                    width="100%"
                    text="Preview"
                    onClick={props.access ? handlePreview : null}
                    icon={<FiEye />}
                  />
                </div>

                <div className="xsm1:mt-0 mt-[4rem] ">
                  {!props.shared && (
                    <PrimaryButton
                      width="100%"
                      text="Activate this Qviq-site"
                      icon={<MdDone className="text-[22px]" />}
                      onClick={() => setPopUpActivateOpen(true)}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {props.shared && (
          <div
            className="bg-white w-full rounded-[20px] flex flex-col gap-[18px] p-[24px]"
            style={{ boxShadow: "0px 4px 20px 1px rgba(171, 181, 217, 0.16)" }}
          >
            <div className="flex flex-row justify-between items-center w-full h-fit">
              <h1 className="text-[16px] font-[500]">Share your Qviqsite</h1>
              <button
                className="bg-[#FAFAFA] rounded-full w-[48px] h-[48px] flex flex-col justify-center items-center text-[20px]"
                onClick={!props.active ? handleShareProfile : undefined}
              >
                <RiShareBoxFill />
              </button>
            </div>

            <div className=" flex flex-col gap-[10px]">
              <div
                className="py-[8px] pr-[12px] pl-[12px] rounded-[12px] w-[100%] flex flex-row  justify-between items-center bg-[#FAFAFA]"
                onClick={() => {
                  navigator.clipboard.writeText(
                    `https://${props.profile}.qviqfrontendtest.vercel.app`
                  );
                }}
                // bg-[#FAFAFA]
              >
                <p className="text-[14px] font-[500]">
                  {props.profile}.qviqfrontendtest.vercel.app
                </p>
                {isSmallScreen1 && (
                  <button
                    className="xsm1:h-[40px] h-[35px] xsm1:w-fit w-full rounded-full  py-[12px] pr-[24px] pl-[20px] flex flex-row items-center justify-center gap-[6px] text-white bg-black"
                    onClick={() => {
                      setShowtMessage(true);
                      setMessage("Copied");
                      navigator.clipboard.writeText(
                        `https://${props.profile}.qviqfrontendtest.vercel.app`
                      );
                      setTimeout(() => {
                        setShowtMessage(false);
                        setMessage("");
                      }, 3000);
                    }}
                  >
                    <LuCopy />
                    <p className="text-[14px] font-[600]">Copy</p>
                  </button>
                )}
              </div>
              {isSmallScreen2 && (
                <button
                  className="xsm1:h-[40px] h-[35px]  w-full rounded-full  py-[12px] pr-[24px] pl-[20px] flex flex-row items-center justify-center gap-[6px] text-white bg-black"
                  onClick={() => {
                    setShowtMessage(true);
                    setMessage("Copied");
                    navigator.clipboard.writeText(
                      `https://${props.profile}.qviqfrontendtest.vercel.app`
                    );
                    setTimeout(() => {
                      setShowtMessage(false);
                      setMessage("");
                    }, 3000);
                  }}
                >
                  <LuCopy />
                  <p className="text-[14px] font-[600]">Copy</p>
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="min-w-[20rem] w-fit hidden lg1:block">
        <Iphone
          usedIn="myAccount"
          // toggleStates={toggleStates}
          profile={props.profile}
          template={props.id}
          templateName={props.cardtype}
          backgroundColor={backgroundColor}
          buttonStyle={buttonStyle}
          buttonColor={buttonColor}
          // fontColor={fontColor}
          color1={color1}
          color2={color2}
          bgImage={bgImage}
          appIconBg={appIconBg}
          customTextColor={customTextColor}
          customButtontextColor={customButtontextColor}
          data={{
            username: props.profile,
            templateId: props.id,
            dummyData: dummyData,
            name: name,
            firstName: firstName,
            lastName: lastName,
            email: email,
            mobileNumber: mobileNumber,
            newMobileNumber: newMobileNumber,
            jobDescription: description,
            companyName: companyName,
            jobTitle: jobTitle,
            pimage: profileImage,
            images: images,
            videos: videos,
            apps: apps,
            productSwitch: productSwitch,
            serviceSwitch: serviceSwitch,
            logoSwitch: logoSwitch,
            reviewSwitch: reviewSwitch,
            businessHoursSwitch: businessHoursSwitch,
            reviewButtonSwitch: reviewButtonSwitch,
            productLabel: productLabel,
            serviceLabel: serviceLabel,
            reviewLabel: reviewLabel,
            businessHoursLabel: businessHoursLabel,
            products: products,
            services: services,
            reviews: reviews,
            businessHours: businessHours,
            pdfs: pdfs,
            customLinks: customLinks,
            quickSelect: quickSelect,
            leadCapture: leadCapture,
            availabilitySwitch: availabilitySwitch,
            availabilityLabel: availabilityLabel,
            availability: availability,
          }}
        />
      </div>

      {/* Email Verification Pop Up */}
      <ConfirmationPopUp
        open={popUpEmailVerifyOpen}
        setOpen={setPopUpEmailVerifyOpen}
        title={`Email Verification`}
        description={[
          `To publish your Qviq profile, please verify your account by clicking the link sent to your mail`,
          <b key={0}> {props.email} </b>,
          ".",
        ]}
        cancelBtn={false}
        buttonText={"Resend Verification Link"}
        onClick={() => {
          !props.active && props.handleResend();
          !props.active && setPopUpEmailVerifyOpen(false);
        }}
      />

      <Preview
        templateType={props.cardtype}
        setShowPreview={setShowPreview}
        open={showPreview}
        backgroundColor={backgroundColor}
        buttonStyle={buttonStyle}
        buttonColor={buttonColor}
        color1={color1}
        color2={color2}
        bgImage={bgImage}
        appIconBg={appIconBg}
        customTextColor={customTextColor}
        customButtontextColor={customButtontextColor}
        data={{
          username: props.profile,
          templateId: props.id,
          dummyData: dummyData,
          name: name,
          firstName: firstName,
          lastName: lastName,
          email: email,
          mobileNumber: mobileNumber,
          newMobileNumber: newMobileNumber,
          jobDescription: description,
          companyName: companyName,
          jobTitle: jobTitle,
          pimage: profileImage,
          images: images,
          videos: videos,
          apps: apps,
          productSwitch: productSwitch,
          serviceSwitch: serviceSwitch,
          logoSwitch: logoSwitch,
          reviewSwitch: reviewSwitch,
          businessHoursSwitch: businessHoursSwitch,
          reviewButtonSwitch: reviewButtonSwitch,
          productLabel: productLabel,
          serviceLabel: serviceLabel,
          reviewLabel: reviewLabel,
          businessHoursLabel: businessHoursLabel,
          products: products,
          services: services,
          reviews: reviews,
          businessHours: businessHours,
          pdfs: pdfs,
          customLinks: customLinks,
          quickSelect: quickSelect,
          leadCapture: leadCapture,
          availabilitySwitch: availabilitySwitch,
          availabilityLabel: availabilityLabel,
          availability: availability,
        }}
      />

      <ConfirmationPopUp
        open={popUpDeactivateOpen}
        setOpen={setPopUpDeactivateOpen}
        title={`Deactivate Qviq ${props.cardtype} Card?`}
        description={`Are you sure you want to deactivate your Qviq ${props.cardtype} card profile? You can activate your profile anytime.`}
        buttonText={"Deactivate"}
        onClick={() =>
          !props.active && handleDeactivate(props.id, props.shared)
        }
      />

      <ConfirmationPopUp
        open={popUpActivateOpen}
        setOpen={setPopUpActivateOpen}
        title={`Activate Qviq ${props.cardtype} Card?`}
        description={
          previouslySharedProfile
            ? `You have previously shared the profile with ID ${previouslySharedProfile.type}. Do you want to unshare it?`
            : `Are you sure you want to activate your Qviq ${props.cardtype} card profile?`
        }
        buttonText={"Activate"}
        onClick={() => handleActivate(props.id, props.shared)}
      />

      {shareProfile && (
        <ShareModal
          username={props.profile}
          firstName={firstName}
          usedIn="outsideTemplate"
          profileImage={
            profileImage === ""
              ? require("../ProfileTemplates/images/image11.jpg").default.src
              : profileImage
          }
          setShowModal1={setShareProfile}
          type={props.id}
          square={false}
          setQRdownload={setQRdownload}
        />
      )}

      {QRdownload && (
        <ShareModalDownload
          QRdownload={QRdownload}
          setQRdownload={setQRdownload}
          username={props.profile}
          firstName={firstName}
          usedIn="outsideTemplate"
          profileImage={
            profileImage === ""
              ? require("../ProfileTemplates/images/image11.jpg").default.src
              : profileImage
          }
          setShowModal1={setShareProfile}
          type={props.id}
          square={false}
        />
      )}

      {showMessage && <NewToast open={showMessage} message={message} />}
    </div>
  );
};

export default ProfileCard;
