import * as React from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { HiOutlineX } from "react-icons/hi";
import InputField from "../UiComponents/InputField";
import PrimaryButton2 from "../UiComponents/PrimaryButton2";
import TertiaryButton from "../UiComponents/TertiaryButton";
import { serverUrl } from "../../config";
import Axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import MobileNumberField from "../UiComponents/MobileNumberField";
import flags from "react-phone-number-input/flags";
import { getCountryCallingCode, getCountries } from "libphonenumber-js";
import { Country } from "country-state-city";
import { getCookie } from "../utils";
import Switch from "react-switch";
import CenterModal from "../UiComponents/NewModal/CenterModal";
import NewToast from "../UiComponents/NewToast";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Edit({
  setLabel,
  setLink,
  label,
  userName,
  platform,
  link,
  open,
  setOpen,
  id,
  profile,
  setToggleStates,
  toggleStates,
  setDummyState,
  highlight,
  handleHighlighted,
  idx,
  videoBox = false,
  animation,
  setAnimation,
  handleHighlightedApp,
  appIndex,
  showMessage,
  setShowMessage,
  message,
  setMessage,
}) {
  //   const handleClickOpen = () => {
  //     setOpen(true);
  //   };
  const navigate = useRouter();
  const [label1, setLabel1] = React.useState(label);
  const [link1, setLink1] = React.useState(userName);

  const [mobileNumber, setMobileNumber] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("IN");
  const [selectedCode, setSelectedCode] = useState(91);
  const [isChecked, setIsChecked] = useState(false);
  const [animation1, setAnimation1] = useState(animation);
  const [highlightModal, setHighlightModal] = useState(false);

  const handleToggle = (value) => {
    setIsChecked(value);

    if (value) {
      if (!animation1 || animation1 === "") {
        setHighlightModal(true);
      }
    } else {
      setAnimation1(""); // reset animation
      handleSaveAnimationStatus("", false); // update DB
      // setOpen(false)
    }
  };

  const animations = [
    // "none",
    "bounce",
    "jello",
    "wobble",
    "pulse",
    "shake",
    "tada",
  ];

  const fetchData = async () => {
    const config = {
      headers: {
        Authorization: "Bearer " + getCookie("jwt_token"),
      },
    };
    try {
      const { data } = await Axios.get(
        `${serverUrl}/record/appsData/${profile}/${id}`,
        config
      );
      setLabel1(data.label);
      setLink1(data.userName);
      setAnimation1(data?.animation);
      setIsChecked(data?.anistatus === true || data?.anistatus === "true");
      console.log(data);
    } catch (error) {
      // console.log(error?.response?.data?.error);
      navigate.push("/login");
    }
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  const [cleanedLink, setCleanedLink] = useState();

  useEffect(() => {
    if (videoBox) {
      const youtubeRegex =
        /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?/]+)/;
      const match = link1?.match(youtubeRegex);
      setCleanedLink(match ? match[1] : link1);
    } else {
      setCleanedLink(link1);
    }
  }, [link1, videoBox]);

  const handleClose = () => {
    setOpen(false);
  };

  async function handleSaveID() {
    try {
      const response = await fetch(
        `${serverUrl}/record/record/updateLink/${profile}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getCookie("jwt_token"),
          },
          body: JSON.stringify({
            name: profile,
            id: id,
            label: label1,
            userName: cleanedLink,
            platform: platform,
            animation: animation1,
            anistatus: Boolean(isChecked), //  latest value of isChecked
          }),
        }
      );

      if (response.ok) {
        setDummyState((prevState) => prevState + 1);
        setOpen(false);
      } else {
        console.error("Failed to update link");
      }
    } catch (error) {
      console.error("Failed to update link:", error);
    }
  }
  async function handleSaveAnimationStatus(newAnimation, newIsChecked) {
    try {
      const response = await fetch(
        `${serverUrl}/record/record/updateAnimation/${profile}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getCookie("jwt_token"),
          },
          body: JSON.stringify({
            name: profile,
            id: id,
            animation: newAnimation || "", // default to empty if undefined
            anistatus: Boolean(newIsChecked), // ensure it's boolean
          }),
        }
      );

      if (response.ok) {
        setDummyState((prevState) => prevState + 1);
        console.log("Animation status updated successfully");
      } else {
        console.error("Failed to update animation status");
      }
    } catch (error) {
      console.error("Error updating animation status:", error);
    }
  }

  // const [highlighted, setHighlighted] = React.useState("");

  // const handleHighlighted = (index, value) => {
  //   const newToggleStates = [...toggleStates];
  //   newToggleStates[index].highlighted = value;
  //   setToggleStates(newToggleStates);
  //   setHighlighted(value);
  //   saveToggleState1(index, value); // Save the toggle state to MongoDB
  // };

  // const saveToggleState1 = (index, value) => {
  //   fetch(`${serverUrl}/record/toggleHighlight/${toggleStates[index]._id}`, {
  //     method: "PUT",
  //     body: JSON.stringify({ highlighted: value, name: profile }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  // };

  // ===================

  const handleCodeChange = (country) => {
    setSelectedCountry(country.isoCode);
    setSelectedCode(getCountryCallingCode(country.isoCode));
  };

  const countries = Country.getAllCountries();

  function getIsoCodeByPhoneCode(phoneCode) {
    for (let i = 0; i < countries.length; i++) {
      if (countries[i].phonecode === phoneCode) {
        return countries[i].isoCode;
      }
    }
    return null;
  }

  useEffect(() => {
    if (id) {
      setMobileNumber(userName);
      setSelectedCode(highlight);
      setSelectedCountry(getIsoCodeByPhoneCode(highlight));
    }
  }, [id]);

  const handlePhoneNumberChange = (event) => {
    const newPhoneNumber = event.target.value;
    const numericRegex = /^[0-9]*$/;

    if (numericRegex.test(newPhoneNumber)) {
      setLink1(`${event.target.value}`);
      setMobileNumber(event.target.value);
    } else {
    }
  };

  const renderFlag = () => {
    const CountryFlag = flags[selectedCountry];
    return (
      <CountryFlag className="react-phone-number-input__icon h-[18px] w-[36px]" />
    );
  };

  let logo = undefined;
  try {
    logo = require(`./logos/${platform.toLowerCase().split(" ").join("")}.png`)
      ?.default?.src;
  } catch (err) {
    // console.log(err);
  }

  return (
    <div>
      <Dialog
        PaperProps={{
          style: { borderRadius: 24, overflow: "visible" },
        }}
        open={open}
        TransitionComponent={Transition}
        onClose={handleClose}
        maxWidth="100%"
      >
        <div className="w-screen md:w-[640px] h-fit px-5 md:px-6 py-6 fixed left-0 bottom-0 md:relative bg-[#FFFFFF] rounded-t-2xl md:rounded-2xl font-poppons">
          <div className="w-full normal text-[20px] leading-[28px] text-[#1A1A1A] font-semibold flex justify-between items-center">
            <p className="text-lg md:text-xl font-semibold">
              Connect {platform}
            </p>
            <HiOutlineX onClick={handleClose} style={{ cursor: "pointer" }} />
          </div>

          <div className="w-full h-[1px] mt-3 md:mt-[24px] bg-[#F3F3F3] "></div>

          <div className="w-full h-fit mt-[24px] mb-[60px] sm:mb-[0px] flex-col justify-center items-center">
            {platform != "" ? (
              <>
                {!videoBox ? (
                  <div className="flex flex-col gap-3 items-center">
                    <div
                      className={`w-20 h-20 ${
                        isChecked && animation1
                      } overflow-hidden rounded-full`}
                    >
                      <img
                        className="rounded-full scale-[1.07]"
                        src={logo}
                        alt=""
                      />
                    </div>
                    <p className="font-semibold text-[18px] text-center">
                      {platform}
                    </p>
                  </div>
                ) : (
                  <div className="flex justify-center w-full">
                    <div className="h-[167px] xsm:h-[210px] w-full sm:w-[309px] sm:h-[167px] bg-cGrey rounded-xl">
                      <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${userName}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Embedded youtube"
                        className="rounded-xl"
                      />
                    </div>
                  </div>
                )}
              </>
            ) : (
              ""
            )}

            <div className="flex flex-col gap-6 items-center mt-4 md:mt-[24px] md:flex-row md:justify-between md:items-start">
              <div className="flex-1 w-full">
                <InputField
                  label="Label"
                  value={label1}
                  onChange={(event) => setLabel1(event.target.value)}
                  width="100%"
                  placeholder={platform}
                />
              </div>
              <div className="flex-1 w-full">
                {platform.includes("Whatsapp") ? (
                  <>
                    <label className="label-field">Mobile Number</label>
                    <div className="mobile-number-div w-full flex flex-col">
                      <MobileNumberField
                        mobileNumber={mobileNumber}
                        setMobileNumber={setMobileNumber}
                        handlePhoneNumberChange={handlePhoneNumberChange}
                        code={selectedCode} // Pass selected country code to MobileNumberField
                        flagChange={renderFlag} // Placeholder for flag rendering, you can customize it
                        codeChange={handleCodeChange} // Update selected country code
                        country={selectedCountry}
                        setSelectedCountry={setSelectedCountry}
                      />
                    </div>
                  </>
                ) : (
                  <InputField
                    label="Link"
                    value={link1}
                    onChange={(e) => setLink1(e.target.value)}
                    width="100%"
                    placeholder="link"
                  />
                )}
              </div>
            </div>

            <div className="mt-[34px] flex flex-col gap-y-4 ">
              <div className="flex items-center justify-end gap-x-4 ">
                <p>Highlight Your Link</p>

                <Switch
                  checked={isChecked}
                  onChange={handleToggle}
                  onColor="#12A26E"
                  offColor="#A7A7A7"
                  checkedIcon={false}
                  uncheckedIcon={false}
                  width={44}
                  height={24}
                />
                <div
                  className="dots-icon"
                  onClick={() => {
                    if (isChecked) {
                      setHighlightModal(true);
                    }
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-more-vertical"
                  >
                    <circle cx="12" cy="12" r="1"></circle>
                    <circle cx="12" cy="5" r="1"></circle>
                    <circle cx="12" cy="19" r="1"></circle>
                  </svg>
                  <div
                    className="dropdown-menu"
                    style={{
                      display: "none",
                      top: "55px",
                      width: "236px",
                      zIndex: 990,
                    }}
                  ></div>
                </div>
              </div>
              <div className="flex justify-between md:justify-end gap-2">
                <div className="flex-1 md:flex-none">
                  <TertiaryButton
                    width="100%"
                    height="48px"
                    onClick={handleClose}
                    text="Cancel"
                  ></TertiaryButton>
                </div>
                <div className="flex-1 md:flex-none  ">
                  <PrimaryButton2
                    width="100%"
                    textColor={label1 === "" || link1 === "" ? "white" : ""}
                    height="48px"
                    isDisabled={label1 === "" || link1 === ""}
                    color={
                      label1 === "" || link1 === ""
                        ? "#FFD0D0"
                        : "linear-gradient(225deg, #FB6609 0%, #E40849 100%)"
                    }
                    onClick={() => {
                      handleSaveID(); // ✅ triggers save using latest isChecked
                      if (
                        platform.includes("Whatsapp") &&
                        selectedCode !== highlight
                      ) {
                        handleHighlighted(idx, selectedCode);
                      }
                    }}
                    text="Save"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <CenterModal
          onModal={highlightModal}
          onClick={() => {
            setHighlightModal(false);
            if (animation1 == "") {
              setIsChecked(false);
            }
          }}
          borderTopWidth="0px"
          marginTop="0.8rem"
          marginBottom="-0.3rem"
          text="Animate this link"
        >
          <div className="grid grid-cols-3 sm2:ml-12 gap-4 md:gap-8 lg:gap-12  p-4 bg-white shadow-lg rounded-xl w-full max-w-md">
            {animations.map((anim, index) => {
              const isSelected = animations.indexOf(animation1) === index;

              return (
                <button
                  key={anim}
                  onClick={() => {
                    setAnimation1(anim);
                    setShowMessage(true);
                    setMessage("Link animation updated");
                    setTimeout(() => {
                      setShowMessage(false);
                    }, 3000);
                    handleSaveAnimationStatus(anim, isChecked);
                    setHighlightModal(false);
                    setOpen(false);
                  }}
                  className={`h-12 rounded-md border font-semibold text-sm transition-all flex items-center justify-center
        ${anim !== "none" ? anim : ""}
        ${
          isSelected
            ? "border-2 border-amber-500 bg-black text-white"
            : "bg-gray-200 hover:bg-black hover:text-white"
        }
      `}
                >
                  {anim.toUpperCase()}
                </button>
              );
            })}
          </div>
        </CenterModal>
      </Dialog>
    </div>
  );
}
const defaultProps = {
  videoBox: false,
};
