import { width } from "@mui/system";
import React, { useContext, useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { HiArrowRight } from "react-icons/hi";
import { UserContext } from "../Contexts/context";
import CircularProgressBar from "./CircularProgressBar";
import { serverUrl } from "../../config";
import "./iconTextStyle.css";
import { useRouter } from "next/navigation";
import LeftRightScrollBtn from "../Utils/LeftRightScrollBtn";
import { SafeLocalStorage, getCookie } from "../utils";
import Link from "next/link";
import NewModal from "./NewModal/NewModal";
import PrimaryButton2 from "./PrimaryButton2";
import FreeProModalData from "./FreeProModalData";
import CenterModal from "./NewModal/CenterModal";
import NewToast from "./NewToast";

function useDefaultProps(props) {
  let newProps = { ...props };
  Object.keys(newProps).forEach((key) =>
    newProps[key] === undefined ? delete newProps[key] : {}
  );
  return { ...defaultProps, ...newProps };
}

function ProgressLine(props) {
  props = useDefaultProps(props);
  const [showPro, setShowPro] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [profileimage, setProfileImage] = useState("");
  const [views, setViews] = useState(0);
  const navigate = useRouter();
  const { username, setDummyState,updateCheckVariable } = useContext(UserContext);

  useEffect(()=>{
    setTimeout(() => {
      setShowPro(true);
    }, 5000);
  }),[]

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

  const fetchData = async () => {
    const config = {
      headers: {
        Authorization: "Bearer " + getCookie("jwt_token"),
      },
    };
    try {
      const res = await axios.get(
        `${serverUrl}/connect/getDetail/${props.profile}/${props.type}`,
        config
      );
      if (res.data.length > 0) {
        setProfileImage(res.data[0].profileimage);
        setFirstName(res.data[0].firstName);
        setEmail(res.data[0].email);
        setMobileNumber(res.data[0].mobileNumber);
      }
    } catch (error) {
      //console.log(error);
      navigate.push("/login");
    }
  };
  const fetchViews = async () => {
    const config = {
      headers: {
        Authorization: "Bearer " + getCookie("jwt_token"),
      },
    };
    try {
      const res = await axios.get(
        `${serverUrl}/analytics/unique/${props.profile}`,
        config
      );
      setViews(res.data.length);
    } catch (error) {
      //console.log(error);
      navigate.push("/login");
    }
  };

  useEffect(() => {
    if (username != "") {
      fetchData();
      fetchViews();
    }
  }, [props.dummyState]);

  const [progress, setProgress] = useState(0);
  const [complete, setComplete] = useState(0);
  const [toggleStatesProgress, setToggleStatesProgress] = useState(0);
  const [viewsProgress, setviewsProgress] = useState(0);
  const [basicDetailProgress, setbasicDetailProgress] = useState(0);
  const MAX_PROGRESS = 33.3;

  // useEffect(() => {
  //   let newProgress = 0;
  //   let newToggleStatesProgress = 0;
  //   let newViewsProgress = 0;
  //   let newbasicDetailProgress = 0;
  //   const toggleStatesLength = props.toggleStates.length;
  //   let newComplet = 0;
  //   if (toggleStatesLength <= 5) {
  //     newProgress += toggleStatesLength * 6.66;
  //     newToggleStatesProgress = toggleStatesLength * 20;
  //   } else {
  //     newProgress = MAX_PROGRESS;
  //     newToggleStatesProgress = 100;
  //   }
  //   setToggleStatesProgress(newToggleStatesProgress);
  //   if (views <= 5) {
  //     newProgress += views * 6.66;
  //     newViewsProgress = views * 20;
  //   } else {
  //     newProgress += MAX_PROGRESS;

  //     newViewsProgress = 100;
  //   }
  //   setviewsProgress(newViewsProgress);
  //   if (firstName !== "") {
  //     newProgress += 8.325;
  //     newbasicDetailProgress += 25;
  //   }
  //   if (email !== "") {
  //     newProgress += 8.325;
  //     newbasicDetailProgress += 25;
  //   }
  //   if (profileimage !== "") {
  //     newProgress += 8.325;
  //     newbasicDetailProgress += 25;
  //   }
  //   if (mobileNumber !== "") {
  //     newProgress += 8.325;
  //     newbasicDetailProgress += 25;
  //   }
  //   if (
  //     firstName !== "" &&
  //     email !== "" &&
  //     profileimage !== "" &&
  //     mobileNumber !== ""
  //   ) {
  //     newComplet += 1;
  //   }
  //   if (props.toggleStates.length == 5) {
  //     newComplet += 1;
  //   }

  //   let completeCount = 0;

  //   progressarr.forEach((item) => {
  //     if (item.progress === 100) {
  //       completeCount++;
  //     }
  //   });

  //   if (completeCount === 1) {
  //     setComplete(1);
  //   } else if (completeCount === 2) {
  //     setComplete(2);
  //   } else if (completeCount === 3) {
  //     setComplete(3);
  //   } else {
  //     setComplete(0);
  //   }

  //   if (newProgress >= 98) {
  //     setProgress(100);
  //   }

  //   updateProgressInProfile(newProgress);
  //   setProgress(newProgress);
  //   setbasicDetailProgress(newbasicDetailProgress);
  // }, [props.toggleStates, firstName, email, profileimage, mobileNumber]);

  // dummy progress data
  const progressarr = [
    {
      label: "Profile Information",
      progress: basicDetailProgress,
      desc: "Add your basic details.",
      onClick: () => {
        SafeLocalStorage.setItem("currentComponent", "Profile Information");
        setDummyState((prev) => !prev);
        navigate.push(`/${props.type}/dashboard/${props.profile}`);
      },
    },
    {
      label: "Manage Media",
      progress: toggleStatesProgress,
      desc: "Add up to 5 links to get started.",
      onClick: () => {
        SafeLocalStorage.setItem("currentComponent", "Add & Manage");
        setDummyState((prev) => !prev);
        navigate.push(`/${props.type}/dashboard/${props.profile}`);
      },
    },
    {
      label: "Share Your Profile",
      progress: viewsProgress,
      desc: "Share your profile on socials.",
      onClick: () => {
        setDummyState((prev) => !prev);
        if (props.onDashboard) {
          props.scroller?.current?.scrollTo({
            top: props.scroller?.current?.scrollHeight,
            behavior: "smooth",
          });
        } else {
          props.setShareProfile(true);
        }
      },
    },
  ];

  //

  let newProgress = 100;

  const updateProgressInProfile = (newProgress) => {
    const updateProgressUrl = `${serverUrl}/tapopuser/tapopuser/update-progress/${props.profile}`;
    const data = { progress: newProgress };
    axios
      .patch(updateProgressUrl, data)
      .then((response) => {})
      .catch((error) => {
        console.error("Error updating progress:", error);
      });
  };

  const miniInfoContainer = useRef(null);

  const handleFreePro = () => {
    updateCheckVariable()
    props.setShowMessagePro(true)
    props.setMessagePro("Your Account Upgraded To Pro")
    updateProgressInProfile(newProgress);
    setShowPro(false);
    setTimeout(() => {
      props.setShowMessagePro(false)
    }, 3000);
  };

  return (
    <>
    {
      windowWidth >= 768 ? (
        <NewModal
        onModal={showPro}
        onClick={handleFreePro}
        borderTopWidth="0px"
        marginTop = "0.8rem"
        marginBottom = "-0.3rem"
      >
        <FreeProModalData
          handleFreePro={handleFreePro}
          firstName={props.firstName}
        />
      </NewModal>
      ):(
        <CenterModal
        onModal={showPro}
        onClick={handleFreePro}
        borderTopWidth="0px"
        marginTop = "0.8rem"
        marginBottom = "-0.3rem"
      >
        <FreeProModalData
          handleFreePro={handleFreePro}
          firstName={props.firstName}
        />
      </CenterModal>
      )
    }
      
      
      {/* {props.onDashboard ? (
        <>
          <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-2">
            <div className={`flex-[1.5] w-full flex flex-col gap-2`}>
              {!props.onDashboard && (
                <p className="text-sm md:text-base text-[#817C7C] mb-1 md:mb-2">
                  Edit and set up your QviqSite
                </p>
              )}
              <p className="text-sm text-[#817C7C]">
                You are just {3 - complete} steps away to claim your 1 month{" "}
                <span className="add-icon">PRO Subscription</span> for free.
              </p>

              <p className="pb-[17px] text-sm text-[#817C7C]">
                OR Click here to{" "}
                <Link
                  className="add-icon"
                  style={{ cursor: "pointer" }}
                  href={`/plan/${username}`}
                >
                  Upgrade Right Now
                </Link>
              </p>
              {props.onDashboard && (
                <span className="text-[#1A1A1A] font-medium text-xs">
                  {Math.round(progress)}% complete
                </span>
              )}
              <div
                className="flex items-center gap-3"
                style={{ height: `${props.height}` }}
              >
                <div className="basis-full h-full">
                  <div className="lower rounded-full bg-pBar h-full">
                    <span
                      className="block rounded-full  bg-[linear-gradient(255deg,rgba(251,102,9)0%,rgba(228,8,73)100%)]  h-full"
                      style={{ width: `${progress}%` }}
                    ></span>
                  </div>
                </div>
                {!props.onDashboard && (
                  <p className="mt-[-0.085%] text-xs md:text-sm whitespace-nowrap text-[#817C7C]">
                    {complete} of 3{" "}
                  </p>
                )}
                <br />
              </div>
            </div>
            <div className="add-icon flex-1">
              {props.onDashboard && (
                <button
                  className="w-fit ms-auto flex items-center gap-2 justify-end text-sm"
                  style={{ cursor: "pointer" }}
                  onClick={
                    props.emailVerified === false
                      ? () => {
                          props.setPopUpEmailVerifyOpen(true);
                        }
                      : () => {
                          navigate.push(
                            `/${props.type}/dashboard/${props.profile}`
                          );
                        }
                  }
                >
                  <span>Complete Your Profile</span>{" "}
                  <span className="text-[#fb3909]">
                    <HiArrowRight />
                  </span>
                </button>
              )}
            </div>
          </div>

          {props.onDashboard && (
            <div className="mt-[30px] flex gap-4 h-[93px] w-full md:w-[50vw] lg:w-full xl:w-[40vw] 2xl:w-full overflow-x-scroll">
              {progressarr.map((data, index) => {
                //console.log("data progresser",data)
                return (
                  <div
                    className="border border-[#f3f3f3] cursor-pointer rounded-lg p-3 w-[208px] min-w-[208px] flex justify-center items-center"
                    key={index}
                    onClick={data.onClick}
                  >
                    <div
                      className={`flex gap-3 w-full h-full ${
                        data.progress === 100
                          ? "justify-center items-center"
                          : ""
                      }`}
                    >
                      <div className="w-fit">
                        <CircularProgressBar progress={data.progress} />
                      </div>
                      {data.progress !== 100 ? (
                        <div className="flex flex-col justify-center gap-1">
                          <p className="text-[#1C1C1C] text-sm font-semibold">
                            {data.label}
                          </p>
                          <p className="text-[#817C7C] text-xs w-4/5">
                            {data.desc}
                          </p>
                        </div>
                      ) : (
                        <p className="text-[#1A1A1A] text-sm font-semibold">
                          {data.label}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      ) : (
        <>
          <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-2">
            <div className={`flex-[1.5] w-full flex flex-col gap-2`}>
              <p className="text-sm hidden md:block md:text-base text-[#817C7C] mb-1 md:mb-2">
                Edit and set up your QviqSite
              </p>

              <p className="text-sm hidden md:block text-[#817C7C]">
                You are just {3 - complete} steps away to claim your 1 month{" "}
                <span className="add-icon">PRO Subscription</span> for free.
              </p>

              <p className="pb-[17px] hidden md:block text-sm text-[#817C7C]">
                OR Click here to{" "}
                <Link
                  className="add-icon"
                  style={{ cursor: "pointer" }}
                  href={`/plan/${username}`}
                >
                  Upgrade Right Now
                </Link>
              </p>

              <span className="text-[#1A1A1A] font-medium text-xs">
                {Math.round(progress)}% complete
              </span>
              <div
                className="flex items-center gap-3"
                style={{ height: `${props.height}` }}
              >
                <div className="basis-full h-full">
                  <div className="lower rounded-full bg-pBar h-full">
                    <span
                      className="block rounded-full  bg-[linear-gradient(255deg,rgba(251,102,9)0%,rgba(228,8,73)100%)]  h-full"
                      style={{ width: `${progress}%` }}
                    ></span>
                  </div>
                </div>
                {!props.onDashboard && (
                  <p className="mt-[-0.085%] text-xs md:text-sm whitespace-nowrap text-[#817C7C]">
                    {complete} of 3{" "}
                  </p>
                )}
                <br />
              </div>
            </div>
          </div>

          <div className="hidden md:block relative">
            <div
              className="mt-[30px] flex gap-4 h-[93px] w-full overflow-x-scroll"
              ref={miniInfoContainer}
            >
              {progressarr.map((data, index) => {
                return (
                  <div
                    className="border border-[#f3f3f3] cursor-pointer rounded-lg p-3 w-[208px] min-w-[208px] flex justify-center items-center"
                    key={index}
                    onClick={data.onClick}
                  >
                    <div
                      className={`flex gap-3 w-full h-full ${
                        data.progress === 100
                          ? "justify-center items-center"
                          : ""
                      }`}
                    >
                      <div className="w-fit">
                        <CircularProgressBar progress={data.progress} />
                      </div>
                      {data.progress !== 100 ? (
                        <div className="flex flex-col justify-center gap-1">
                          <p className="text-[#1C1C1C] text-sm font-semibold">
                            {data.label}
                          </p>
                          <p className="text-[#817C7C] text-xs w-4/5">
                            {data.desc}
                          </p>
                        </div>
                      ) : (
                        <p className="text-[#1A1A1A] text-sm font-semibold">
                          {data.label}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <LeftRightScrollBtn
              refrence={miniInfoContainer}
              style={{ border: ".5px solid black" }}
              leftPosition={{ left: "-16px", transform: "translateY(-208%)" }}
              rightPosition={{ right: "-16px", transform: "translateY(-208%)" }}
            />
          </div>
        </>
      )} */}
     
    </>
  );
}

const defaultProps = {
  percent: "30%",
  onDashboard: true,
  height: "6px",
};

export default ProgressLine;
