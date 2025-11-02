import React, { useContext, useEffect, useState } from "react";
import PrimaryButton2 from "../UiComponents/PrimaryButton2";
import axios from "axios";
import InputField from "../UiComponents/InputField";
import Alert from "./Alert";
import { UserContext } from "../Contexts/context";
import { serverUrl } from "../../config";
import { HiChevronLeft } from "react-icons/hi";

import MobileNumberField from "../UiComponents/MobileNumberField";
import flags from "react-phone-number-input/flags";
import { getCountryCallingCode } from "libphonenumber-js";
import { getCookie } from "../utils";
import Switch from "react-switch";
import CenterModal from "../UiComponents/NewModal/CenterModal";

const DialogInBuilt = (props) => {
  const { profile, type, open, handleClose, pro } = props;
  const {
    inBuiltDialogPlatform,
    updateCheckVariable,
    dummyState,
    setDummyState,
  } = useContext(UserContext);
  const [openAlert, setOpenAlert] = useState(false);
  const [userName, setUserName] = useState("");
  const [label, setLabel] = useState(inBuiltDialogPlatform);

  const [mobileNumber, setMobileNumber] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("IN");
  const [selectedCode, setSelectedCode] = useState(91);

  //Handle highlighted switch
  const [highlighted, setHighlighted] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [highlightModal, setHighlightModal] = useState(false);
  const [animation, setAnimation] = useState("");

  const handleToggle = (value) => {
    setIsChecked(value); // Always update the switch state
    if (value) {
      setHighlightModal(true);
    }
  };
  // console.log(isChecked);

  const animations = [
    // "none",
    "bounce",
    "jello",
    "wobble",
    "pulse",
    "shake",
    "tada",
  ];

  const handleSave = () => {
    props.setLoading(true);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + getCookie("jwt_token"),
      },
    };
    var formData = new FormData();
    formData.append("name", profile);
    formData.append("platform", inBuiltDialogPlatform);
    formData.append("userName", userName);
    formData.append("label", label);
    formData.append("type", type);
    formData.append("highlighted", selectedCode);
    formData.append("animation", animation);
    formData.append("anistatus", isChecked);
    console.log(isChecked);

    axios
      .put(
        `${serverUrl}/record/record/${pro ? "add" : "addbasic"}/${profile}`,
        formData,
        config
      )
      .then((response) => {
        const newToggleStates = [...props.toggleStates];
        newToggleStates.push(response.data);
        props.setToggleStates(newToggleStates);
        props.setMessage("Link added successfully");
        props.setShowtMessage(true);
        setTimeout(() => {
          props.setShowtMessage(false);
        }, 3000);
        props.setLoading(false);
      })
      .catch((error) => {
        //console.log(error);
        props.setLoading(false);
        setOpenAlert(true);
      });
    updateCheckVariable();
    // setDummyState(!dummyState);
    props.setDummyState((prevState) => prevState + 1);
    handleClose();
  };

  //Capitalize the first letter of the platform name
  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  // Individual placeholder for each platform
  const placeholderArray = [
    {
      platform: "Whatsapp",
      placeholder: "Type your number with country code",
    },
    {
      platform: "Whatsapp Business",
      placeholder: "Type your number with country code",
    },
    {
      platform: "Facebook",
      placeholder: "Paste your Link",
    },
    {
      platform: "Google Map",
      placeholder: "Paste your Link",
    },
    {
      platform: "Google Drive",
      placeholder: "Paste your Link",
    },
    {
      platform: "Google Notes",
      placeholder: "Paste your Link",
    },
    {
      platform: "Spotify",
      placeholder: "Paste your Link",
    },
    {
      platform: "Gaana",
      placeholder: "Paste your Link",
    },
    {
      platform: "Gaana",
      placeholder: "Paste your Link",
    },
    {
      platform: "Apple Music",
      placeholder: "Paste your Link",
    },
    {
      platform: "Amazon Music",
      placeholder: "Paste your Link",
    },
    {
      platform: "Audio",
      placeholder: "Paste your Link",
    },
    {
      platform: "SoundCloud",
      placeholder: "Paste your Link",
    },
    {
      platform: "Apple Podcasts",
      placeholder: "Paste your Link",
    },
    {
      platform: "Saavan",
      placeholder: "Paste your Link",
    },
    {
      platform: "Wynk",
      placeholder: "Paste your Link",
    },
    {
      platform: "Tidal",
      placeholder: "Paste your Link",
    },
    {
      platform: "Website",
      placeholder: "Paste your Link",
    },
    {
      platform: "Swiggy",
      placeholder: "Paste your Link",
    },
    {
      platform: "Zomato",
      placeholder: "Paste your Link",
    },
    {
      platform: "Google Reviews",
      placeholder: "Paste your Link",
    },
    {
      platform: "GSTIN",
      placeholder: "Paste your GSTIN link",
    },
    {
      platform: "Calendely",
      placeholder: "Paste your Link",
    },
    {
      platform: "Google Play",
      placeholder: "Paste your app Link",
    },
    {
      platform: "Apple Store",
      placeholder: "Paste your Link",
    },
    {
      platform: "Email",
      placeholder: "Paste your email address",
    },
    {
      platform: "Facetime",
      placeholder: "Paste your Link",
    },
    {
      platform: "Gmail",
      placeholder: "Paste your gamil account",
    },
    {
      platform: "Yahoo Mail",
      placeholder: "Paste your yahoo Link",
    },
    {
      platform: "Outlook",
      placeholder: "Paste your outlook  Link",
    },
    {
      platform: "Bloggers Spot",
      placeholder: "Paste your Link",
    },
    {
      platform: "Weebly",
      placeholder: "Paste your Link",
    },
    {
      platform: "Wordpress",
      placeholder: "Paste your Link",
    },
    {
      platform: "Medium",
      placeholder: "Paste your Link",
    },
    {
      platform: "Ghost",
      placeholder: "Paste your Link",
    },
    {
      platform: "Tumblr",
      placeholder: "Paste your Link",
    },
    {
      platform: "Gaana",
      placeholder: "Paste your Link",
    },
    {
      platform: "Joomla",
      placeholder: "Paste your Link",
    },
    {
      platform: "Flipkart",
      placeholder: "Paste your Link",
    },
    {
      platform: "Amazon",
      placeholder: "Paste your Link",
    },
    {
      platform: "Shopify",
      placeholder: "Paste your Link",
    },
    {
      platform: "Meesho",
      placeholder: "Paste your Link",
    },
    {
      platform: "Indiamart",
      placeholder: "Paste your Link",
    },
    {
      platform: "Coutloot",
      placeholder: "Paste your Link",
    },
    {
      platform: "Google Pay",
      placeholder: "Paste your upi ID ",
    },
    {
      platform: "PhonePe",
      placeholder: "Paste your upi ID ",
    },
    {
      platform: "Paytm",
      placeholder: "Paste your upi ID ",
    },
    {
      platform: "Amazon Pay",
      placeholder: "Paste your upi ID ",
    },
    {
      platform: "BHIM UPI",
      placeholder: "Paste your upi ID ",
    },
    {
      platform: "Bitcoin Wallet",
      placeholder: "Enter your wallet address ",
    },
    {
      platform: "Ethereum",
      placeholder: "Enter your wallet address ",
    },
    {
      platform: "Tether",
      placeholder: "Enter your wallet address ",
    },
    {
      platform: "Solana",
      placeholder: "Enter your wallet address ",
    },
    {
      platform: "Binance",
      placeholder: "Enter your wallet address ",
    },
    {
      platform: "Opensea",
      placeholder: "Enter your wallet address ",
    },
    {
      platform: "TradingView",
      placeholder: "Enter your wallet address ",
    },
  ];

  const [inputPlaceholder, setInputPlaceholder] = useState(
    "Type your username or paste link"
  );

  useEffect(() => {
    placeholderArray.forEach((item) => {
      if (item.platform === inBuiltDialogPlatform) {
        setInputPlaceholder(item.placeholder);
      }
    });
  }, [inBuiltDialogPlatform]);

  // gives favicon url
  const getImgUrl = (item) => {
    if (item !== undefined) {
      if (!item.startsWith("http://") && !item.startsWith("https://")) {
        item = "https://" + item;
      }
      let url = `https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${item}&size=256`;
      return url;
    }
  };

  // ===================

  const handlePhoneNumberChange = (event) => {
    const newPhoneNumber = event.target.value;
    const numericRegex = /^[0-9]*$/;

    if (numericRegex.test(newPhoneNumber)) {
      setUserName(`${event.target.value}`);
      setMobileNumber(event.target.value);
    } else {
      // Handle invalid input
    }
  };

  const renderFlag = () => {
    const CountryFlag = flags[selectedCountry];
    return (
      <CountryFlag className="react-phone-number-input__icon h-[18px] w-[36px]" />
    );
  };

  const handleCodeChange = (country) => {
    setSelectedCountry(country.isoCode);
    setSelectedCode(getCountryCallingCode(country.isoCode));
  };

  return (
    <>
      <Alert open={openAlert} setOpen={setOpenAlert} />
      <div
        className={`${
          open ? "flex" : "hidden"
        } flex-col items-center gap-8 md:gap-11 h-full`}
        style={{ zIndex: "998" }}
      >
        <div className="flex flex-col self-start">
          <h1
            className="font-semibold flex gap-1 items-center"
            style={{ cursor: "pointer" }}
            onClick={handleClose}
          >
            <span className="text-2xl" style={{ padding: "0" }}>
              <HiChevronLeft />
            </span>
            <span className="text-base md:text-lg" style={{ padding: "0" }}>
              Add {capitalize(inBuiltDialogPlatform)} Link
            </span>
          </h1>
          <h3 className="text-sm text-[#817C7C] ps-7 pt-2">
            Edit or add new account
          </h3>
        </div>

        <div className="flex flex-col w-full h-full sm:w-2/3 lg:w-1/2 gap-8 justify-between md:justify-normal">
          <div className="flex flex-col gap-8">
            <div>
              <div className="flex justify-center mb-5 md:mb-6 ">
                <div
                  className={`overflow-hidden ${
                    isChecked && animation
                  } w-12 h-12 rounded-full`}
                >
                  {inBuiltDialogPlatform === "Website" ? (
                    <>
                      {userName !== "" ? (
                        <img
                          src={getImgUrl(userName)}
                          alt=""
                          className="w-full h-full"
                        />
                      ) : (
                        <img
                          src={require(`./logos/website.png`).default.src}
                          alt=""
                          className="scale-[1.07]"
                        />
                      )}
                    </>
                  ) : (
                    <img
                      src={
                        require(`./logos/${inBuiltDialogPlatform
                          .toLowerCase()
                          .split(" ")
                          .join("")}.png`).default.src
                      }
                      alt=""
                      className="scale-[1.07]"
                    />
                  )}
                </div>
              </div>
              <InputField
                label="Label Text"
                onChange={(event) => setLabel(event.target.value)}
                width="100%"
                placeholder="Enter label text here"
                value={label}
              />
            </div>
            {capitalize(inBuiltDialogPlatform).includes("Whatsapp") ? (
              <div>
                <label className="label-field">{label} Number</label>
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
              </div>
            ) : (
              <div>
                <InputField
                  label={`${capitalize(inBuiltDialogPlatform)} Link`}
                  onChange={(e) => setUserName(e.target.value)}
                  width="100%"
                  placeholder={inputPlaceholder}
                />
              </div>
            )}
            <div className="w-full md:w-fit self-center pb-3 flex flex-col gap-y-4">
              <div className="flex items-center gap-4"  >
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
                  disabled={userName.trim().length < 3}
                />
              </div>
              <CenterModal
                onModal={highlightModal}
                onClick={() => {setHighlightModal(false); if(animation ==""){
                  setIsChecked(false)
                }}}
                borderTopWidth="0px"
                marginTop="0.8rem"
                marginBottom="-0.3rem"
                text="Animate this link"
              >
                <div className="grid grid-cols-3 sm2:ml-12 gap-4 p-4 bg-white shadow-lg rounded-xl w-full max-w-md">
                  {animations.map((anim) => (
                    <button
                      key={anim}
                      onClick={() => {
                        setAnimation(anim); // 1. Set the selected animation
                        // handleSave(); // 2. Call your save function
                        setHighlightModal(false); // 3. Close modal
                      }}
                      className={`h-12 rounded-md border font-semibold text-sm transition-all flex items-center justify-center
          ${anim !== "none" ? anim : ""}
          bg-gray-200 hover:bg-black hover:text-white
        `}
                    >
                      {anim.toUpperCase()}
                    </button>
                  ))}
                </div>
              </CenterModal>
              <PrimaryButton2
                width="100%"
                height="48px"
                onClick={handleSave}
                text="Save"
                isDisabled={
                  (capitalize(inBuiltDialogPlatform).includes("Whatsapp") && mobileNumber.length < 10 ? true : false )|| userName.trim().length < 3
                }
              ></PrimaryButton2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DialogInBuilt;
