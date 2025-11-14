"use client";
import react, { useState, useContext, useEffect } from "react";
import axios from "axios";
import SideBar from "../navbar/SideBar";
import NavBar from "../navbar/NavBar";
import banner from "./Banner2.png";
import ProtagLarge from "../UiComponents/ProtagLarge";
import modalBanner from "./modalImage.png";
import {
  HiOutlineDocumentDuplicate,
  HiExclamationCircle,
  HiArrowSmRight,
} from "react-icons/hi";

import { HiOutlineBolt } from "react-icons/hi2";
import PrimaryButton2 from "../UiComponents/PrimaryButton2";
import "./customDomain.css";
import InputField from "../UiComponents/InputField";
import PrimaryButton from "../UiComponents/PrimaryButton";
import NewModal from "../UiComponents/NewModal/NewModal";
import NewModal3 from "../UiComponents/NewModal/Newmodal3";
// import { useNavigate, useParams } from "react-router-dom";
import { useRouter, useParams } from "next/navigation";
import { UserContext } from "../Contexts/context";
import { serverUrl } from "../../config";
import Image from "next/image";
import NewToast from "../UiComponents/NewToast";
import { userNameList } from "../userNameList";
import { getCookie } from "../utils";


const CustomDomain = () => {
  // add disabled property prop to the button according to state change
  const [customDomain, setCustomDomain] = useState("");
  // state for modal
  const [showModal, setShowModal] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const profile = useParams().userName;
  const [updateProfile, setUpdateProfile] = useState(profile);

  const [showMessage, setShowtMessage] = useState(false);
  const [message, setMessage] = useState("");

  // const navigate = useNavigate();
  const router = useRouter();
  const navigate = (page) => {
    router.push(page);
  };
  // state for username alert
  const [showAlert1, setShowALert1] = useState(false);
  const [showAlert2, setShowALert2] = useState(false);
  const [alert1Msg, setAlert1Msg] = useState("");
  const { userType } = useContext(UserContext);
  function handleModal() {
    setShowModal((prev) => !prev);
  }

  const fetchProfileData = async () => {
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
    } catch (error) {
      //console.log(error?.response);
      navigate("/login");
    }
  };
  useEffect(() => {
    fetchProfileData();
  }, []);

  async function handleUserNameUpdate() {
    if (updateProfile === "") {
      setAlert1Msg("Please enter a username.");
      setShowALert1(true);
      setTimeout(() => {
        setShowALert1(false);
        setAlert1Msg("");
      }, 3000);
      return;
    } else if (updateProfile === profile) {
      setAlert1Msg("Please enter a different username.");
      setShowALert1(true);
      setTimeout(() => {
        setShowALert1(false);
        setAlert1Msg("");
      }, 3000);
      return;
    } else if (userNameList.includes(updateProfile)) {
      setAlert1Msg("Please enter a different username.");
      setShowALert1(true);
      setTimeout(() => {
        setShowALert1(false);
        setAlert1Msg("");
      }, 3000);
      return;
    }
    // Check if the any letter of updateProfile is capitalized
    if (/[A-Z]/.test(updateProfile)) {
      setAlert1Msg("Avoid using capital latters.");
      setShowALert1(true);
      setTimeout(() => {
        setShowALert1(false);
        setAlert1Msg("");
      }, 3000);
      return;
    }

    if (
      updateProfile === "" ||
      /^[wW]+$/.test(updateProfile) ||
      /^\d+$/.test(updateProfile)
    ) {
      setAlert1Msg("Please enter a different username.");
      setShowALert1(true);
      setTimeout(() => {
        setShowALert1(false);
        setAlert1Msg("");
      }, 3000);
      return;
    }

    try {
      const response = await fetch(
        `${serverUrl}/tapopuser/updateProfile/${profile}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getCookie("jwt_token"),
          },
          body: JSON.stringify({ updateProfile }),
        }
      );

      const data = await response.json();
      if (data.error) {
        setAlert1Msg("This username is not available. Please try another one.");
        setShowALert1(true);
        setTimeout(() => {
          setShowALert1(false);
          setAlert1Msg("");
        }, 3000);
      } else {
        setShowALert1(false);
        setAlert1Msg("");
        navigate(`/customdomain/${updateProfile}`);
        setMessage("user name saved successfully");
        setShowtMessage(true);
        setTimeout(() => {
          setShowtMessage(false);
        }, 3000);
      }
    } catch (error) {
      console.error(error);
    }
  }

  // usertype from context
  const { copyToClipboard } = useContext(UserContext);

  // return only numbers and characters
  const giveOnlyNumNChar = (e) => {
    const regex = /^[a-zA-Z0-9]*$/;
    const isValid = regex.test(e.target.value);
    if (isValid) {
      setUpdateProfile(e.target.value.toLowerCase());
    }
  };

  const [pricingData, setPricingData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${serverUrl}/admin/pricing`);
        setPricingData(response.data.pro.monthly);
      } catch (error) {
        console.error("Error fetching pricing data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex h-screen w-full first-container">
      <div className="h-full">
        <SideBar />
      </div>
      <div className="w-full overflow-y-auto">
        <NavBar text="Custom Domain" />
        <NewModal
          text="Upgrade to PRO"
          onModal={showModal}
          onClick={setShowModal}
        >
          <Image src={modalBanner} alt="modal banner" className="pt-6" />
          <p className="py-8 text-cGrey">
            By becoming a pro member, you can expand your network, unlock and
            add more media links, and analyse your profile visits and audience.
          </p>

          <ul className="mx-4">
            <li>Unlock additional media links and add them to your profile.</li>
            <li>
              You can include multiple custom links, pdf files, and additional
              images.
            </li>

            <li>
              Add appointment slots and receive appointments through your
              profile.
            </li>
            <li>Domain customization</li>

            <li>Get more Templates & Themes for your profiles</li>
            <li>Multiple Qviq profiles can be created and managed.</li>
          </ul>
          <div className="flex justify-center items-center py-6">
            <PrimaryButton2
              text={`Get PRO Plan at ₹${pricingData}`}
              icon={<HiArrowSmRight />}
              color="linear-gradient(225deg, #FB6609 0%, #E40849 100%)"
            />
          </div>
        </NewModal>
        {/* Domain settings  */}
        <div className="domain px-2 sm:px-4">
          <Image
            className="banner mt-8 sm:mt-[54px]"
            src={banner}
            alt="domain banner"
          />
          <div className="d-second px-2 sm:px-8 py-7 mt-10">
            <div className="flex items-center justify-between">
              <h1 className=" font-medium text-lg">Domain Settings</h1>
              <NewModal3
                text="Upgrade to PRO"
                onModal={showModal3}
                onClick={setShowModal3}
              >
                <Image
                  src={modalBanner}
                  alt="modal banner"
                  className="pt-[48px]"
                />
                <p className="mt-[24px] sm:mt[32px] text-[#817C7C] text-[14px] sm:text-[16px] font-[500] leading-[22px] sm:leading-[24px]">
                  By becoming a pro member, you can expand your network, unlock
                  and add more media links, and analyse your profile visits and
                  audience.
                </p>

                <div className="py-[32px]">
                  <div className="flex flex-row justify-start items-center py-[5px]">
                    <div
                      className="w-[8px] h-[8px] rounded-full"
                      style={{
                        background:
                          "linear-gradient(285deg, #FB6609 0%, #E40849 100%)",
                      }}
                    ></div>
                    <div className="w-[100%] pl-[16px] text-[14px] sm:text-[16px] font-[500] leading-[22px] sm:leading-[24px]">
                      Unlock additional media links and add them to your
                      profile.
                    </div>
                  </div>
                  <div className="flex flex-row justify-start items-center py-[5px]">
                    <div
                      className="w-[8px] h-[8px] rounded-full"
                      style={{
                        background:
                          "linear-gradient(285deg, #FB6609 0%, #E40849 100%)",
                      }}
                    ></div>
                    <div className="w-[100%] pl-[16px] text-[14px] sm:text-[16px] font-[500] leading-[22px] sm:leading-[24px]">
                      You can include multiple custom links, pdf files, and
                      additional images.
                    </div>
                  </div>
                  <div className="flex flex-row justify-start items-center py-[5px]">
                    <div
                      className="w-[8px] h-[8px] rounded-full"
                      style={{
                        background:
                          "linear-gradient(285deg, #FB6609 0%, #E40849 100%)",
                      }}
                    ></div>
                    <div className="w-[100%] pl-[16px] text-[14px] sm:text-[16px] font-[500] leading-[22px] sm:leading-[24px]">
                      Add appointment slots and receive appointments through
                      your profile.
                    </div>
                  </div>
                  <div className="flex flex-row justify-start items-center py-[5px]">
                    <div
                      className="w-[8px] h-[8px] rounded-full"
                      style={{
                        background:
                          "linear-gradient(285deg, #FB6609 0%, #E40849 100%)",
                      }}
                    ></div>
                    <div className="w-[100%] pl-[16px] text-[14px] sm:text-[16px] font-[500] leading-[22px] sm:leading-[24px]">
                      Domain customization
                    </div>
                  </div>
                  <div className="flex flex-row justify-start items-center py-[5px]">
                    <div
                      className="w-[8px] h-[8px] rounded-full"
                      style={{
                        background:
                          "linear-gradient(285deg, #FB6609 0%, #E40849 100%)",
                      }}
                    ></div>
                    <div className="w-[100%] pl-[16px] text-[14px] sm:text-[16px] font-[500] leading-[22px] sm:leading-[24px]">
                      Get more Templates & Themes for your profiles
                    </div>
                  </div>
                  <div className="flex flex-row justify-start items-center py-[5px]">
                    <div
                      className="w-[8px] h-[8px] rounded-full"
                      style={{
                        background:
                          "linear-gradient(285deg, #FB6609 0%, #E40849 100%)",
                      }}
                    ></div>
                    <div className="w-[100%] pl-[16px] text-[14px] sm:text-[16px] font-[500] leading-[22px] sm:leading-[24px]">
                      Multiple Qviq profiles can be created and managed.
                    </div>
                  </div>
                </div>
              </NewModal3>
              {userType != "Pro" && (
                <button
                  onClick={setShowModal3}
                  type="button"
                  className="pro-tag-large text-white font-medium rounded-full hover:cursor-default"
                >
                  Pro
                </button>
              )}
            </div>
            <p className="pt-6 text-sm text-cGrey font-medium">
              Choose your own username to personalise your link.
            </p>

            <p className="pt-8 mb-3">Your Qviq Username</p>
            <div className="flex items-center">
              <input
                type="text"
                name=""
                className="domain-ip"
                placeholder="johndoe"
                value={updateProfile}
                onChange={(e) => {
                  giveOnlyNumNChar(e);
                }}
              />
            </div>

            {showAlert1 && (
              <div
                style={{ color: "#CF2828" }}
                className=" text-sm flex items-center gap-1 pt-4"
              >
                <HiExclamationCircle />
                {alert1Msg}
              </div>
            )}

            <div className="flex flex-wrap items-center pt-6">
              <span className="text-cGrey font-medium">
                Your Qviq link will be : &nbsp;
              </span>
              <span className="font-medium" style={{ wordBreak: "break-all" }}>
                https://{updateProfile}.qviqfrontendtest.vercel.app
              </span>
              <span
                onClick={() => {
                  copyToClipboard(`https://${updateProfile}.qviqfrontendtest.vercel.app`);
                }}
                className="text-xl ml-2 hover:cursor-pointer active:scale-90 duration-100"
                title="Copy Link"
              >
                <HiOutlineDocumentDuplicate />
              </span>
            </div>

            <div className="pt-8">
              <PrimaryButton2
                text="Save Changes"
                isDisabled={
                  /^[wW]+$/.test(updateProfile) ||
                  updateProfile === "www" ||
                  updateProfile === ""
                    ? true
                    : false
                }
                color={
                  /^[wW]+$/.test(updateProfile) ||
                  updateProfile === "www" ||
                  updateProfile === ""
                    ? "#F7B2C7"
                    : "linear-gradient(225deg, #FB6609 0%, #E40849 100%)"
                }
                onClick={handleUserNameUpdate}
              />
            </div>
          </div>
        </div>
      </div>
      <NewToast open={showMessage} message={message} />
    </div>
  );
};

export default CustomDomain;
