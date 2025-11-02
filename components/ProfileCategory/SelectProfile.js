"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import SideBar from "../navbar/SideBar";
import Navbar from "../navbar/NavBar";
import axios from "axios";
import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import ExlametaryMark from "./assets/Subtract.svg";
import ProfileCard from "../UiComponents/ProfileCard";
import Createprofilecard from "../UiComponents/Createprofilecard";
import Toast from "../UiComponents/Toast";
import PrimaryButton from "../UiComponents/PrimaryButton";
import { token } from "../Login/Constant";
import { HiOutlineBolt } from "react-icons/hi2";
import { auth } from "../Login/firebaseconfig";
import NewToast from "../UiComponents/NewToast";
import { UserContext } from "../Contexts/context";
import StarterButton from "../UiComponents/StarterButton";
import { serverUrl } from "../../config";
import { clientUrl } from "../../config";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Bowser from "bowser";
import { FaArrowRight } from "react-icons/fa6";
import { CgClose } from "react-icons/cg";
import "./profile.css";
import profileImg from "./assets/profile.svg";
import LeftRightScrollBtn from "../Utils/LeftRightScrollBtn";
import { SafeLocalStorage, getCookie, setCookie } from "../utils";

export default function SelectProfile(props) {
  const navigate = useRouter();
  const profile = props.userName;

  // usertype from context
  const {
    userType,
    userIcon,
    username,
    userFullName,
    userEmail,
    updateCheckVariable,
    checkVariable,
  } = useContext(UserContext);
  // //console.log(userFullName)
  const [profileData, setProfileData] = useState(props.profileData);
  const getData = async (profile, type) => {
    let obj = {};
    try {
      const result = await axios.get(
        `${serverUrl}/getData/data/${type}/${profile}`
      );
      if (
        result.data.customTemplates[0] &&
        Object.keys(result.data.customTemplates[0]).length !== 0
      ) {
        obj.backgroundColor =
          result.data.customTemplates[0].customizedTemplate.backgroundColor;
        obj.buttonStyle =
          result.data.customTemplates[0].customizedTemplate.buttonStyle;
        obj.buttonColor =
          result.data.customTemplates[0].customizedTemplate.buttonColor;
        obj.color1 = result.data.customTemplates[0].customizedTemplate.color1;
        obj.color2 = result.data.customTemplates[0].customizedTemplate.color2;
        obj.bgImage = result.data.customTemplates[0].customizedTemplate.bgImage;
        obj.appIconBg =
          result.data.customTemplates[0].customizedTemplate?.appIconBg;
        obj.customTextColor =
          result.data.customTemplates[0].customizedTemplate?.customTextColor;
        obj.customButtontextColor =
          result.data.customTemplates[0].customizedTemplate?.customButtontextColor;
      }

      const appsObj = result.data.apps;
      const appsArr =
        appsObj !== undefined ? Object.values(appsObj).flat() : [];

      if (
        result.data.user.length === 0 &&
        result.data.img.length === 0 &&
        result.data.videos.length === 0 &&
        result.data.products.length === 0 &&
        result.data.services.length === 0 &&
        result.data.reviews.length === 0 &&
        result.data.businessHours.length === 0 &&
        result.data.pfds.length === 0 &&
        result.data.customLinks.length === 0 &&
        appsArr.length === 0
      ) {
        obj.dummyData = true;
      } else {
        obj.dummyData = false;
      }

      if (result.data.user.length > 0) {
        obj.name =
          result.data.user[0].firstName + " " + result.data.user[0].lastName;
        obj.firstName = result.data.user[0].firstName;
        obj.lastName = result.data.user[0].lastName;
        obj.email = result.data.user[0].email;
        if (result.data.user[0].mobileNumber) {
          obj.mobileNumber =
            "+" +
            result.data.user[0].selectedCode +
            result.data.user[0].mobileNumber;
        }
        if (result.data.user[0].newmobileNumber) {
          obj.newMobileNumber =
            "+" +
            result.data.user[0].selectedCode2 +
            result.data.user[0].newmobileNumber;
        }
        obj.description = result.data.user[0].description;
        obj.companyName = result.data.user[0].companyName;
        obj.profileImage = result.data.user[0].profileimage;
        obj.jobTitle = result.data.user[0].jobTitle;
      } else {
        obj.profileImage = "";
        obj.name = result.data.information[0].name;
        obj.firstName = result.data.information[0].firstName;
        obj.lastName = result.data.information[0].lastName;
      }
      obj.images = result.data.img;
      obj.videos = result.data.videos;
      obj.apps = result.data.apps;
      obj.products = result.data.products;
      obj.services = result.data.services;
      obj.reviews = result.data.reviews;
      obj.businessHours = result.data.businessHours;
      obj.pdfs = result.data.pfds;
      obj.customLinks = result.data.customLinks;
      obj.availability = result.data.availability;
    } catch (error) {
      //console.log(error);
      navigate.push("/login");
    }
    return obj;
  };

  const fetchProfile = async () => {
    const config = {
      headers: {
        Authorization: "Bearer " + getCookie("jwt_token"),
      },
    };
    try {
      const { data } = await axios.get(
        `${serverUrl}/profile/profile/${profile}`,
        config
      );
      let profileWithData = [];
      for (let i = 0; i < data.length; i++) {
        const obj = await {
          ...data[i],
          ...(await getData(profile, data[i]._id)),
        };
        profileWithData.push(obj);
      }
      setProfileData(profileWithData);
    } catch (error) {
      // Handle error here, e.g. redirect to an error page
      //console.log(error?.response);
      navigate.push("/login");
    }
  };
  const [record, setRecord] = useState(props.data.record);
  const [pro, setPro] = useState(props.data.pro);
  const [starter, setStarter] = useState(props.data.starter);
  const [basic, setBasic] = useState(props.data.basic);
  const [emailVerified, setemailVerified] = useState(props.data.emailVerified);
  const [id, setId] = useState(props.data.id);
  const [email, setEmail] = useState(props.data.email);
  const [name, setName] = useState(props.data.name);
  const [progress, setProgress] = useState(0);
  const [userBasic, setUserBasic] = useState(false);
  const fetchData = async () => {
    const config = {
      headers: {
        Authorization: "Bearer " + getCookie("jwt_token"),
      },
    };
    try {
      const res = await axios.get(
        `${serverUrl}/getUser/getUser/${profile}`,
        config
      );
      setRecord(res.data);
      // SafeLocalStorage.setItem(profile, JSON.stringify(res.data));
      setEmail(res.data[0].email);
      setName(res.data[0].name);

      setPro(res.data[0].pro);
      setStarter(res.data[0].starter);
      setBasic(res.data[0].basic);
      setId(res.data[0]._id);
      setemailVerified(res.data[0].emailVerified);
      setProgress(res.data[0].progress);
      setUserBasic(res.data[0].basic);
    } catch (error) {
      //console.log(error);
      navigate.push("/login");
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchData();
  }, [checkVariable]);

  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");

  // const toggleToast = (shared) => {
  //   setShowToast(!showToast);
  //   if (shared) {
  //     setShowActDeact("Activated");
  //   } else {
  //     setShowActDeact("Deactivated");
  //   }
  // };
  function handleResend() {
    try {
      auth.sendSignInLinkToEmail(email, {
        url: `${clientUrl}/verifyemail/${id}`,
        handleCodeInApp: true,
        displayName: "Jane Q. User",
      });

      SafeLocalStorage.setItem("emailForSignIn", email);
      setShowToast(true);
      setMessage("Sign-in link sent!");
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (error) {
      setShowToast(true);
      setMessage(`Error sending sign-in link`);
      //console.log(error.message);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
  }

  const [userId, setUserId] = useState("");

  useEffect(() => {
    if (username != "") {
      (async () => {
        try {
          const ipResponse = await axios.get("https://ipapi.co/json/");
          const ipData = ipResponse.data;
          await axios.post(`${serverUrl}/analytics/activeUsers`, {
            ip: ipData.ip,
            country: ipData.country_name,
            countryCode: ipData.country_code,
            state: ipData.region,
            city: ipData.city,
            browser: Bowser.getParser(
              window.navigator.userAgent
            ).getBrowserName(),
            platform: navigator.platform,
            profile: profile,
            device: Bowser.getParser(window.navigator.userAgent).getPlatform()
              .type,
          });
        } catch (err) {
          //console.log(err);
        }
      })();
      (async () => {
        if (SafeLocalStorage.getItem("rememberMe") != "true") {
          return;
        }
        try {
          const config = {
            headers: {
              Authorization: "Bearer " + getCookie("jwt_token"),
            },
          };
          const { data } = await axios.get(
            `${serverUrl}/tapopuser/refreshToken/${profile}/${"6d"}`,
            config
          );
          if (data.refreshRequired == true) {
            setCookie("jwt_token", data.token, 6);
            token.value = data.token;
            SafeLocalStorage.setItem("user", JSON.stringify(data.user));
            SafeLocalStorage.setItem("loginStatus", true);
            updateCheckVariable();
          }
        } catch (err) {
          //console.log(err);
        }
      })();
    }
  }, [username]);

  const [showAD, setShowAD] = useState(true);

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

  const [profileIndex, setProfileIndex] = useState(0);

  useEffect(() => {
    const index = profileData.findIndex((obj) => obj.shared === true);

    if (index !== -1) {
      setProfileIndex(index);
    } else {
      setProfileIndex(0);
    }
  }, [profileData]);

  // Ad modal settings

  const DISMISS_KEY = "dismissTime";
  const DISMISS_DURATION = 24 * 60 * 60 * 1000;
  useEffect(() => {
    const dismissTime = SafeLocalStorage.getItem(DISMISS_KEY);

    if (dismissTime) {
      const currentTime = new Date().getTime();
      const timePassed = currentTime - parseInt(dismissTime, 10);
      if (timePassed < DISMISS_DURATION) {
        setShowAD(false);
      }
    }
  }, []);

  const handleDismiss = () => {
    const currentTime = new Date().getTime();
    SafeLocalStorage.setItem(DISMISS_KEY, currentTime);
    setShowAD(false);
  };

  return (
    <>
      <div className="  flex h-screen w-full first-container">
        <div className="h-full">
          <SideBar profile={profile} userId={userId} />
        </div>
        {/* <ToastContainer /> */}

        <div className=" custom-scrollbar main-profile-div w-full overflow-y-auto bg-[#FAFAFA] overflow-x-hidden">
          <Navbar
            text={`Hello, ${name}!`}
            button={
              userType === "Basic" ? (
                <PrimaryButton
                  icon={<HiOutlineBolt />}
                  text="Upgrade"
                  onClick={() => {
                    navigate.push(`/plan/${username}`);
                  }}
                />
              ) : (
                <StarterButton />
              )
            }
            showBack={false}
          />
          {emailVerified === false && (
            <div className="max-w-full min-h-[80px] my-2 md:my-6 bg-[#FFF3F3] rounded-[12px] border-[1px] border-[#FFE2E2] mx-2 xsm:mx-5 sm:mx-6 flex items-center">
              <div className="flex gap-4 w-full px-3 sm:px-6 py-3 md:py-0">
                <Image
                  src={ExlametaryMark}
                  alt="ExlametaryMark"
                  className="w-[20px] h-18px] hidden md:block"
                />

                <div className="text-[#CF2828] flex flex-col gap-0 poppins">
                  <p className="font-medium text-[12px] sm:text-[14px] ">
                    To publish your Qviq profile, please verify your account by
                    clicking the link sent to your inbox - {email}
                  </p>
                  <p
                    onClick={handleResend}
                    className="text-[12px] sm:text-[14px] font-semibold leading-[22px] underline decoration-[1.5px] decoration-[#e09494] underline-offset-1 "
                    style={{ cursor: "pointer" }}
                  >
                    Resend Verification Link
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="p-[1.2rem] sm:p-[1.5rem] flex flex-col gap-[20px]">
            {showAD && (
              <div className="adCard relative overflow-hidden w-full sm:h-[184px] rounded-[16px] p-[18px] sm:p-[26px] flex flex-col justify-center gap-[16px]">
                <div className="w-full z-[2] flex flex-row justify-between">
                  <p className="max-w-[423px] w-[85%] text-[14px] sm:text-[20px] font-[600] text-white">
                    Simplify your networking journey with our customisable Smart
                    NFC Cards!
                  </p>
                  <CgClose
                    onClick={() => setShowAD(false)}
                    className="text-white text-[20px] font-[800] bg-[#ffffff30] p-[5px] w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] rounded-full flex sm:hidden cursor-pointer"
                  />
                </div>

                <div className="flex flex-row items-center gap-[8px] z-[3]">
                  <button
                    onClick={() => navigate.push("/qviqtap")}
                    className="bg-white pr-[18px] sm:pr-[22px] pl-[20px] sm:pl-[24px] py-[10px] sm:py-[12px] flex flex-row items-center gap-[8px] rounded-full hover:pr-[10px] hover:sm:pr-[14px] hover:gap-[16px] transition-[400ms] cursor-pointer active:scale-[95%]"
                  >
                    <p className="text-[12px] sm:text-[16px] xsm:text-[14px] font-[600]">
                      Explore smart cards
                    </p>
                    <FaArrowRight />
                  </button>

                  <button
                    onClick={handleDismiss}
                    className="px-[20px] sm:px-[24px] py-[10px] sm:py-[12px] text-white text-[16px] font-[600] sm:flex hidden cursor-pointer"
                  >
                    Dismiss
                  </button>
                </div>

                <Image
                  src={require("./assets/cards.svg")}
                  alt="cards"
                  className="absolute bottom-0 right-[-40px] sm:right-0 xsm:right-[-20px] sm:h-[90%] h-[80%] w-fit z-[1]"
                />
                <Image
                  src={require("./assets/Group 96.svg")}
                  alt="cards"
                  className="absolute top-0 right-0 sm:flex hidden h-full w-fit z-0"
                />
                <Image
                  src={require("./assets/Group 95.svg")}
                  alt="cards"
                  className="absolute bottom-0 left-0 sm:left-0 h-full w-fit z-0"
                />
              </div>
            )}
            {profileData?.length === 0 && (
              <Createprofilecard
                basic={basic}
                starter={starter}
                profileData={profileData}
                profile={profile}
              />
            )}
          </div>

          {profileData.length !== 0 && (
            <h1 className="px-[1.2rem] pb-2 sm:px-[1.5rem] text-[16px] sm:text-[20px] font-[600]">
              Your Qviq-sites
            </h1>
          )}

          {/* {profileData.length !== 0 && (
            <div className="relative mx-[1.2rem] sm:mx-[1.5rem]">
              <div
                className="flex flex-col gap-5 md:gap-6 !overflow-scroll"
                ref={profileRef}
              >
                <div className="flex flex-row items-center gap-[12px] min-w-[500px] w-full bg-[#F3F3F3] p-[8px] rounded-[16px]">
                  {profileData.map((info, index) => (
                    <div
                      className={`flex flex-row items-center gap-[16px] bg-white p-[12px] w-full min-w-[50px] rounded-[12px] cursor-pointer active:scale-95 hover:shadow-md`}
                      style={{ transition: "300ms" }}
                      onClick={() => {
                        setProfileIndex(index);
                      }}
                    >
                      <Image
                        src={profileImg}
                        className={`${
                          profileIndex === index ? "opacity-100" : "opacity-50"
                        }`}
                      />
                      <p
                        className={`text-[16px] ${
                          profileIndex === index
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
          )} */}

          {profileData[profileIndex] && (
            <ProfileCard
              userBasic={userBasic}
              progress={progress}
              profileIndex={profileIndex}
              setProfileIndex={setProfileIndex}
              setUserId={setUserId}
              active={!profileData[profileIndex].shared && !pro}
              cardtype={profileData[profileIndex].type}
              // profileIndex={profileIndex}
              name={userFullName}
              email={userEmail}
              id={profileData[profileIndex]._id}
              profile={profile}
              profileData={profileData}
              currentProfileData={profileData[profileIndex]}
              setProfileData={setProfileData}
              shared={profileData[profileIndex].shared}
              access={profileData[profileIndex].access}
              emailVerified={emailVerified}
              setMessage={(message) => setMessage(message)}
              setShowToast={(showToast) => setShowToast(showToast)}
              outsideClick={true}
              popUp={true}
              handleResend={handleResend}
            />
          )}
        </div>
      </div>

      <NewToast open={showToast} message={message} />
    </>
  );
}
