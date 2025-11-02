import React, { useContext, useEffect, useRef, useState } from "react";
import "./TemplatesAndDesigns.css";
import { UserContext } from "../../Contexts/context";
import PrimaryButton2 from "../PrimaryButton2";
import TertiaryButton from "../TertiaryButton";
import axios from "axios";
import PrimaryButton from "../PrimaryButton";
import { serverUrl } from "../../../config";
import loadingImage from "../../Image/Tapop logo black.png";
import CustomTemplate1 from "../../ProfileTemplates/CustomTemplate1/CustomTemplate1";
import CustomTemplate1Mobile from "../../ProfileTemplates/CustomTemplate1Mobile/CustomTemplate1Mobile";
import Toast from "../Toast";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";
import { storage } from "../../Login/firebaseconfig";
import { useRouter } from "next/navigation";
import LoadingAnimation from "../Loading/LoadingAnimation";
import Image from "next/image";

export default function CustomizeTemplate({
  buttonStyle,
  setButtonStyle,
  template,
  setTemplate,
  backgroundColor,
  setBackgroundColor,
  buttonColor,
  setButtonColor,
  fontColor,
  setFontColor,
  color1,
  setColor1,
  color2,
  setColor2,
  bgImage,
  setBgImage,
  showToast,
  setShowToast,
  type,
  dataButtonStyle,
  dataButtonColor,
  dataFontColor,
  dataColor1,
  dataColor2,
  dataBgImage,
  dataBackgroundColor,
  appIconBg,
  setAppIconBg,
  appIconColor,
  setAppIconColor,
  customTextColor,
  setCustomTextColor,
   customButtontextColor,
   setCustomButtonTextColor
}) {
  const navigate = useRouter();

  const [backgroundStyle, setBackgroundStyle] = useState("Solid");
  const [fontStyle, setFontStyle] = useState("Raleway");

  const [dropdown, setDropDown] = useState(false);
  const { userType, username } = useContext(UserContext);
  const [isLoading, setLoading] = useState(false);
  function handleCustomization() {
    const customizationData = {
      buttonStyle,
      backgroundStyle,
      fontStyle,
      buttonColor,
      fontColor,
      backgroundColor,
      color1,
      color2,
      bgImage,
      appIconBg,
      customTextColor,
      customButtontextColor
    };

    axios
      .post(
        `${serverUrl}/tapopuser/updateUserCustomization/${type}/${username}`,
        customizationData
      )
      .then((response) => {
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 3000);
      })
      .catch((error) => {
        console.error("Error saving customization data:", error);
      });
  }

  // Image input section
  const inputRef = useRef(null);

  const handleButtonClick = () => {
    inputRef.current.click();
  };

  // const handleFileInputChange = (e) => {
  //   setBgImage(URL.createObjectURL(e.target.files[0]));
  // };
  const handleFileInputChange = async (event) => {
    const image = event.target.files[0];
    setLoading(true);
    if (!image) {
      return;
    }

    // image containing () in file name should renamed
    // const imageRef = ref(storage, `/images/${image.name.includes('(') ? 'customImage' : image.name}`);
    const imageRef = ref(storage, `/images/${username}_customImage`);

    try {
      const snapshot = await uploadBytesResumable(imageRef, image);
      const downloadURL = await getDownloadURL(snapshot.ref);

      setBgImage(downloadURL);
      setLoading(false);
    } catch (err) {
      console.error(
        "Error uploading image to Firebase Storage or getting download URL",
        err
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setTemplate("customtemplate1");
  }, []);

  const clearChange = () => {
    setButtonStyle(dataButtonStyle);
    setBackgroundColor(dataBackgroundColor);
    setButtonColor(dataButtonColor);
    setColor1(dataColor1);
    setColor2(dataColor2);
    setBgImage(dataBgImage);
    setFontColor(dataFontColor);
    //console.log("clicked");
  };

  // --------------------------------------------------

 
  
  // Function to calculate the luminance of a color
  const calculateLuminance = (color) => {
    const hex = color.replace(/#/g, "");
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  };

  const handleColorChange = (e) => {
    const newColor = e.target.value;
    setButtonColor(newColor);

    // Calculate the luminance of the new color
    const luminance = calculateLuminance(newColor);

    // Set the text color based on the background color's luminance
    if (luminance > 0.5) {
     setCustomButtonTextColor("#000000"); // Dark text for light background
    } else {
      setCustomButtonTextColor("#ffffff"); // Light text for dark background
    }
  };


  const handleAppBackgroundColorChange = (e) => {
    const newColor = e.target.value;
    setAppIconBg(newColor);
  };


  return (
    <>
      <p className="text-base sm:text-[18px] leading-6 font-semibold min-w-fit mt-[32px] mb-[16px]">
        Custom appearance
      </p>
      <p className=" text-xs sm:text-sm text-cGrey font-medium">
        Customize every element of your Qviq profile. Use images, gradients, and
        colours to change your backdrop. Modify the typography, select the
        button design, and more.
      </p>
      <div className="flex justify-end mt-[1rem]  gap-[1rem]">
        {/* <TertiaryButton width={152} text="Cancel" onClick={clearChange} /> */}
        <PrimaryButton2
          width={152}
          text="Save"
          // isDisabled={template == "customtemplate3" ? true : false}
          onClick={handleCustomization}
        />
      </div>
      <p className="text-base sm:text-[18px] leading-6 font-semibold min-w-fit mt-[32px] sm:mt-0 mb-[16px]">
        Backgrounds
      </p>
      <div className="flex flex-row justify-center cursor-pointer">
        <div
          onClick={() => {
            setBackgroundStyle("Solid");
            setTemplate("customtemplate1");
          }}
          // style={{ backgroundColor: `${backgroundColor}` }}
          className={`border-b-[2px] sm:border-b-[3px] flex flex-col justify-center items-center text-[14px] sm:text-[16px] w-[100%] h-[28px] sm:w-[100%] sm:h-[48px] cursor-pointer  ${
            backgroundStyle === "Solid"
              ? "border-[#1A1A1A] font-800"
              : "border-[#e4e4e4] font-400 text-[#817C7C]"
          }`}
        >
          Solid Color
        </div>
        <div
          onClick={() => {
            setBackgroundStyle("Gradient");
            setTemplate("customtemplate2");
          }}
          // style={{background: `linear-gradient(180deg, ${color1} 0%, ${color2} 100%)`}}
          className={`border-b-[2px] sm:border-b-[3px] flex flex-col justify-center items-center text-[14px] sm:text-[16px] w-[100%] h-[28px] sm:w-[100%] sm:h-[48px] cursor-pointer  ${
            backgroundStyle === "Gradient"
              ? "border-[#1A1A1A] font-800"
              : "border-[#e4e4e4] font-400 text-[#817C7C]"
          }`}
        >
          Gradient
        </div>
        <div
          onClick={() => {
            setBackgroundStyle("Image");
            setTemplate("customtemplate3");
          }}
          className={`border-b-[2px] sm:border-b-[3px] flex flex-col justify-center items-center text-[14px] sm:text-[16px] w-[100%] h-[28px] sm:w-[100%] sm:h-[48px] cursor-pointer  ${
            backgroundStyle === "Image"
              ? "border-[#1A1A1A] font-800"
              : "border-[#e4e4e4] font-400 text-[#817C7C]"
          }`}
        >
          Image
        </div>
      </div>

      <p className="text-[14px] leading-[22px] font-[500] min-w-fit mt-[32px] mb-[16px]">
        Choose Background
      </p>

      {backgroundStyle === "Solid" && (
        <div className="flex w-[218px] gap-[16px] items-center p-[8px] bg-white rounded-[12px] shadow-[_0px_2px_16px_rgba(_167,_167,_167,_0.14);] ">
          <input
            onChange={(e) => setBackgroundColor(e.target.value)}
            value={backgroundColor}
            type="color"
            className="w-[64px] h-[64px] rounded-[12px] "
          ></input>
          <div className="items-center">
            <p className="font-[500] text-[14px] leading-[22px]">Color</p>
            <p className="text-cGrey font-[500] text-[14px] leading-[22px]">
              {backgroundColor}
            </p>
          </div>
        </div>
      )}
      {backgroundStyle === "Gradient" && (
        <div className="flex justify-start gap-[20px] sm:gap-[50px]">
          <div className="flex w-[218px] gap-[16px] items-center p-[8px] bg-white rounded-[12px] shadow-[_0px_2px_16px_rgba(_167,_167,_167,_0.14);] ">
            <input
              onChange={(e) => setColor1(e.target.value)}
              value={color1}
              type="color"
              className="w-[64px] h-[64px] rounded-[12px] "
            ></input>
            <div className="items-center">
              <p className="font-[500] text-[14px] leading-[22px]">Color</p>
              <p className="text-cGrey font-[500] text-[14px] leading-[22px]">
                {color1}
              </p>
            </div>
          </div>
          <div className="flex w-[218px] gap-[16px] items-center p-[8px] bg-white rounded-[12px] shadow-[_0px_2px_16px_rgba(_167,_167,_167,_0.14);] ">
            <input
              onChange={(e) => setColor2(e.target.value)}
              value={color2}
              type="color"
              className="w-[64px] h-[64px] rounded-[12px] "
            ></input>
            <div className="items-center">
              <p className="font-[500] text-[14px] leading-[22px]">Color</p>
              <p className="text-cGrey font-[500] text-[14px] leading-[22px]">
                {color2}
              </p>
            </div>
          </div>
        </div>
      )}
      {backgroundStyle === "Image" && (
        <>
          <div
            className="add-image px-5 flex relative gap-3"
            style={{ cursor: "pointer" }}
            onClick={handleButtonClick}
          >
            <button type="button" onClick={handleButtonClick}>
              <input
                id="bgImage"
                type="file"
                accept=".jpeg, .jpg, .png, .gif"
                ref={inputRef}
                style={{ display: "none" }}
                onChange={handleFileInputChange}
                hidden
              ></input>
            </button>
            <img
              src={
                require("./ModuleTabs/ProductsAndServices/Button-Icon.png")
                  .default.src
              }
              alt=" "
            />
            <p className="text-xs md:text-sm text-center">
              Upload or Drag & drop a Service image/Icon
            </p>
            <div>
              {bgImage ? (
                <div className="absolute w-full h-full bg-white top-0 left-0 flex flex-col justify-center items-center">
                  <img
                    style={{ width: "auto", height: "100%" }}
                    src={bgImage}
                  />
                  {/* <p>{imageName}</p> */}
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </>
      )}

      {isLoading && (
        <>
          <div className="absolute top-0 left-0 flex flex-col justify-center items-center w-full h-full bg-black/30 z-[9999]">
            <div className="flex flex-col justify-center relative items-center w-[3rem] h-[3rem]">
              <Image
                src={loadingImage}
                alt="loading"
                className="object-contain"
                height=""
                width=""
              />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex justify-center items-center">
              <LoadingAnimation />
            </div>
          </div>
        </>
      )}

      <hr className="border-[#DFDBD8] my-[40px]" />

      <p className="text-base sm:text-[18px] leading-6 font-semibold min-w-fit mt-[32px] mb-[16px]">
        Buttons
      </p>
      <p
        className={`text-[14px] leading-[22px] font-[500] min-w-fit mt-[32px] mb-[16px]`}
      >
        Filled Buttons
      </p>

      <div className="appearance-grid sm:mx-[16px] sm:gap-[52px]">
        <button
          onClick={() => setButtonStyle("filled_btn_0")}
          className={`w-fit p-[16px] ${
            buttonStyle === "filled_btn_0"
              ? "border-[3px] rounded-[12px] border-[_rgba(_26,_26,_26,_0.6)]"
              : ""
          }`}
        >
          <div
            className="filled_btn_0"
            style={{ background: `${buttonColor}` }}
          ></div>
        </button>
        <button
          onClick={() => setButtonStyle("filled_btn_12")}
          className={`w-fit p-[16px] ${
            buttonStyle === "filled_btn_12"
              ? "border-[3px] rounded-[12px] border-[_rgba(_26,_26,_26,_0.6)]"
              : ""
          }`}
        >
          <div
            className="filled_btn_12"
            style={{ background: `${buttonColor}` }}
          ></div>
        </button>
        <button
          onClick={() => setButtonStyle("filled_btn_64")}
          className={`w-fit p-[16px] ${
            buttonStyle === "filled_btn_64"
              ? "border-[3px] rounded-[12px] border-[_rgba(_26,_26,_26,_0.6)]"
              : ""
          }`}
        >
          <div
            className="filled_btn_64"
            style={{ background: `${buttonColor}` }}
          ></div>
        </button>
      </div>

      <p className="text-[14px] leading-[22px] font-[500] min-w-fit mt-[32px] mb-[16px]">
        Outlined Buttons
      </p>
      <div className="appearance-grid sm:mx-[16px] sm:gap-[52px]">
        <button
          onClick={() => setButtonStyle("outline_btn_0")}
          className={`w-fit p-[16px] ${
            buttonStyle === "outline_btn_0"
              ? "border-[3px] rounded-[12px] border-[_rgba(_26,_26,_26,_0.6)]"
              : ""
          }`}
        >
          <div
            className="outline_btn_0"
            style={{ background: `${buttonColor}` }}
          ></div>
        </button>
        <button
          onClick={() => setButtonStyle("outline_btn_12")}
          className={`w-fit p-[16px] ${
            buttonStyle === "outline_btn_12"
              ? "border-[3px] rounded-[12px] border-[_rgba(_26,_26,_26,_0.6)]"
              : ""
          }`}
        >
          <div
            className="outline_btn_12"
            style={{ background: `${buttonColor}` }}
          ></div>
        </button>
        <button
          onClick={() => setButtonStyle("outline_btn_64")}
          className={`w-fit p-[16px] ${
            buttonStyle === "outline_btn_64"
              ? "border-[3px] rounded-[12px] border-[_rgba(_26,_26,_26,_0.6)]"
              : ""
          }`}
        >
          <div
            className="outline_btn_64"
            style={{ background: `${buttonColor}` }}
          ></div>
        </button>
      </div>

      <p className="text-[14px] leading-[22px] font-[500] min-w-fit mt-[32px] mb-[16px]">
        Soft Shadows
      </p>

      <div className="appearance-grid sm:mx-[16px] sm:gap-[52px]">
        <button
          onClick={() => setButtonStyle("soft_btn_0")}
          className={`w-fit p-[16px] ${
            buttonStyle === "soft_btn_0"
              ? "border-[3px] rounded-[12px] border-[_rgba(_26,_26,_26,_0.6)]"
              : ""
          }`}
        >
          <div
            className="soft_btn_0"
            style={{ background: `${buttonColor}` }}
          ></div>
        </button>
        <button
          onClick={() => setButtonStyle("soft_btn_12")}
          className={`w-fit p-[16px] ${
            buttonStyle === "soft_btn_12"
              ? "border-[3px] rounded-[12px] border-[_rgba(_26,_26,_26,_0.6)]"
              : ""
          }`}
        >
          <div
            className="soft_btn_12"
            style={{ background: `${buttonColor}` }}
          ></div>
        </button>
        <button
          onClick={() => setButtonStyle("soft_btn_64")}
          className={`w-fit p-[16px] ${
            buttonStyle === "soft_btn_64"
              ? "border-[3px] rounded-[12px] border-[_rgba(_26,_26,_26,_0.6)]"
              : ""
          }`}
        >
          <div
            className="soft_btn_64"
            style={{ background: `${buttonColor}` }}
          ></div>
        </button>
      </div>

      <p className="text-[14px] leading-[22px] font-[500] min-w-fit mt-[32px] mb-[16px]">
        Hard Shadows
      </p>

      <div className="appearance-grid sm:mx-[16px] sm:gap-[52px]">
        <button
          onClick={() => setButtonStyle("hard_btn_0")}
          className={`w-fit p-[16px] ${
            buttonStyle === "hard_btn_0"
              ? "border-[3px] rounded-[12px] border-[_rgba(_26,_26,_26,_0.6)]"
              : ""
          }`}
        >
          <div
            className="hard_btn_0"
            style={{ background: `${buttonColor}` }}
          ></div>
        </button>
        <button
          onClick={() => setButtonStyle("hard_btn_12")}
          className={`w-fit p-[16px] ${
            buttonStyle === "hard_btn_12"
              ? "border-[3px] rounded-[12px] border-[_rgba(_26,_26,_26,_0.6)]"
              : ""
          }`}
        >
          <div
            className="hard_btn_12"
            style={{ background: `${buttonColor}` }}
          ></div>
        </button>
        <button
          onClick={() => setButtonStyle("hard_btn_64")}
          className={`w-fit p-[16px] ${
            buttonStyle === "hard_btn_64"
              ? "border-[3px] rounded-[12px] border-[_rgba(_26,_26,_26,_0.6)]"
              : ""
          }`}
        >
          <div
            className="hard_btn_64"
            style={{ background: `${buttonColor}` }}
          ></div>
        </button>
      </div>
      <div className="flex flex-col sm:flex-row p-1 ">
        <div>
          <p className="text-[14px] leading-[22px] font-[500] min-w-fit mt-[32px] mb-[16px]">
            Choose Button Color
          </p>
          <div className="flex w-[218px] gap-[16px] items-center p-[8px] bg-white rounded-[12px] shadow-[_0px_2px_16px_rgba(_167,_167,_167,_0.14);] ">
            <input
              onChange={(e) => {
                handleColorChange(e);
              }}
              value={buttonColor}
              type="color"
              className="w-[64px] h-[64px] rounded-[12px] "
            ></input>
            <div className="items-center">
              <p className="font-[500] text-[14px] leading-[22px]">Color</p>
              <p className="text-cGrey font-[500] text-[14px] leading-[22px]">
                {buttonColor}
              </p>
            </div>
          </div>
        </div>
        {/* icon */}
        <div className={`${backgroundStyle === "Image" ? 'hidden' : 'block' }`} >
          <p className="text-[14px] leading-[22px] font-[500] min-w-fit mt-[32px] mb-[16px]">
            App Background Color
          </p>
          <div className="flex w-[218px] gap-[16px] items-center p-[8px] bg-white rounded-[12px] shadow-[_0px_2px_16px_rgba(_167,_167,_167,_0.14);] ">
            <input
              onChange={(e) => {
                handleAppBackgroundColorChange(e);
              }}
              value={appIconBg}
              type="color"
              className="w-[64px] h-[64px] rounded-[12px] "
            ></input>
            <div className="items-center">
              <p className="font-[500] text-[14px] leading-[22px]">
                Background
              </p>
              <p className="text-cGrey font-[500] text-[14px] leading-[22px]">
                {appIconBg}
              </p>
              <p
                onClick={() => setAppIconBg("")}
                className={`px-1 ${appIconBg ==="" ? 'hidden' : ''} cursor-pointer text-center rounded-lg shadow-sm border border-1 py-1 text-xs bg-white text-red-500 font-serif`}
              >
                Reset
              </p>
            </div>
          </div>
        </div>
        {/* Text Color */}
        <div  >
          <p className="text-[14px] leading-[22px] font-[500] min-w-fit mt-[32px] mb-[16px]">
            Hero Text Color
          </p>
          <div className="flex w-[218px] gap-[16px] items-center p-[8px] bg-white rounded-[12px] shadow-[_0px_2px_16px_rgba(_167,_167,_167,_0.14);] ">
            <input
              onChange={(e) => {
                setCustomTextColor(e.target.value);
              }}
              value={customTextColor}
              type="color"
              className="w-[64px] h-[64px] rounded-[12px] "
            ></input>
            <div className="items-center">
              <p className="font-[500] text-[14px] leading-[22px]">
                Text
              </p>
              <p className="text-cGrey font-[500] text-[14px] leading-[22px]">
                {customTextColor}
              </p>
              <p
                onClick={() => setCustomTextColor("")}
                className={`px-1 ${customTextColor ==="" ? 'hidden' : ''} cursor-pointer text-center rounded-lg shadow-sm border border-1 py-1 text-xs bg-white text-red-500 font-serif`}
              >
                Reset
              </p>
            </div>
          </div>
        </div>
      </div>
 <div className="flex justify-end mt-[1rem]  gap-[1rem]">
        {/* <TertiaryButton width={152} text="Cancel" onClick={clearChange} /> */}
        <PrimaryButton2
          width={152}
          text="Save"
          // isDisabled={template == "customtemplate3" ? true : false}
          onClick={handleCustomization}
        />
      </div>
      {/* <hr className="border-[#DFDBD8] my-[40px]" />

      <button className={`w-fit p-[16px] rounded-[12px]`}>
        <div
          className="hard_btn_64 flex flex-col justify-center items-center"
          style={{ background: `${buttonColor}` }}
        >
          <p className={`text-[18px] font-[600]`} style={{color: textColor}}>Text</p>
        </div>
      </button>

      <hr className="border-[#DFDBD8] my-[40px]" /> */}

      {/* Font Section */}
      {/* <p className="text-base sm:text-[18px] leading-6 font-semibold min-w-fit mt-[32px] mb-[16px]">
        Fonts
      </p>

      <button
        onClick={() => setDropDown(!dropdown)}
        className="relative flex w-full justify-between pr-[20px] items-center p-[8px] bg-white rounded-[12px] shadow-[_0px_2px_16px_rgba(_167,_167,_167,_0.14);] "
      >
        <div className="flex gap-[16px] ">
          <div
            className="flex w-[64px] h-[64px] bg-[#f3f3f3] rounded-[12px] font-[600] text-[24px] leading-[22px] justify-center items-center"
            style={{ fontFamily: "Playfair Display" }}
          >
            T
          </div>
          <div className="items-center ">
            <p className="text-cGrey font-[500] text-start text-[14px] leading-[22px]">
              Select Font
            </p>
            <p
              style={{ fontFamily: `${fontStyle}` }}
              className="font-[500] text-[14px] text-start leading-[22px]"
            >
              {fontStyle}
            </p>
          </div>
        </div>
        {dropdown ? <HiChevronUp /> : <HiChevronDown />}
        {dropdown && (
          <div className="dropDown_popup">
            <div
              onClick={() => {
                setFontStyle("Avenir");
                setDropDown(false);
              }}
              className="dropDown_popup_item"
            >
              Avenir
            </div>
            <div
              onClick={() => {
                setFontStyle("Bebas Neue");
                setDropDown(false);
              }}
              className="dropDown_popup_item"
            >
              Bebas Neue
            </div>
            <div
              onClick={() => {
                setFontStyle("Raleway");
                setDropDown(false);
              }}
              className="dropDown_popup_item"
            >
              Raleway
            </div>
            <div
              onClick={() => {
                setFontStyle("Open Sans");
                setDropDown(false);
              }}
              className="dropDown_popup_item"
            >
              Open Sans
            </div>
            <div
              onClick={() => {
                setFontStyle("Montserrat");
                setDropDown(false);
              }}
              className="dropDown_popup_item"
            >
              Montserrat
            </div>
            <div
              onClick={() => {
                setFontStyle("Playfair Display");
                setDropDown(false);
              }}
              className="dropDown_popup_item"
            >
              Playfair Display
            </div>
          </div>
        )}
      </button>

      <p className="text-[14px] leading-[22px] font-[500] min-w-fit mt-[32px] mb-[16px]">
        Choose Font Color
      </p>
      <div className="flex w-[218px] gap-[16px] items-center p-[8px] bg-white rounded-[12px] shadow-[_0px_2px_16px_rgba(_167,_167,_167,_0.14);] ">
        <input
          onChange={(e) => setFontColor(e.target.value)}
          value={fontColor}
          type="color"
          className="w-[64px] h-[64px] rounded-[12px] "
        ></input>
        <div className="items-center">
          <p className="font-[500] text-[14px] leading-[22px]">Color</p>
          <p className="text-cGrey font-[500] text-[14px] leading-[22px]">
            {fontColor}
          </p>
        </div>
      </div> */}
      {/* End of font section */}

      {/* <div className="flex justify-between p-[16px] mb-[50px] mt-[64px] items-center">
        <div>
          <img
            className="h-[28px]"
            src={require("../../Images/Tapop Final Logo Concept 1 1.png")}
          />
        </div>
        {userType !== "Pro"? (
          <PrimaryButton
            icon={<HiOutlineBolt />}
            text="Upgrade"
            onClick={() => navigate.push(`/plan/${username}`)}
          />
          ):(
          <PrimaryButton
            icon={<HiOutlineBolt />}
            text="Toggle"
            onClick={() => handleToggle()}
          />
        )}
      </div> */}
      {/* <div className="flex justify-center sm:justify-end mt-[2rem] mb-[2.5rem] gap-[1rem]">
        <TertiaryButton width={152} text="Cancel" onClick={clearChange} />
        <PrimaryButton2
          width={152}
          text="Save"
          // isDisabled={template == "customtemplate3" ? true : false}
          onClick={handleCustomization}
        />
      </div> */}

      {showToast && (
        <div
          className="w-full flex justify-center items-center fixed bottom-10 left-0"
          style={{ zIndex: "999" }}
        >
          <Toast
            text="Template customized successfully !"
            backgroundColor={"#121212"}
          />
        </div>
      )}
    </>
  );
}
