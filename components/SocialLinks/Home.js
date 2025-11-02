"use client";
import React, { useContext, useEffect, useState, useRef } from "react";
import ProgressLine from "../UiComponents/ProgressLine";
import MiniInfo from "../UiComponents/MiniInfo";
import ManageMedia from "../UiComponents/BottomComponents/ManageMedia";
import Modules from "../UiComponents/BottomComponents/Modules";
import ProfileInfo from "../UiComponents/BottomComponents/ProfileInfo";
import TemplatesAndDesigns from "../UiComponents/BottomComponents/TemplatesAndDesigns";
import Axios from "axios";
import NavBar from "../navbar/NavBar";
import SideBar from "../navbar/SideBar";
import PrimaryButton2 from "../UiComponents/PrimaryButton2";
import Preview from "../UiComponents/Preview";
import { UserContext } from "../Contexts/context";
import axios from "axios";
import { serverUrl } from "../../config";
import TemplatePreview from "../UiComponents/TemplatePreview";
import Iphone from "../UiComponents/Iphone";
import { useRouter } from "next/navigation";
import { LuCopy } from "react-icons/lu";
import { RiShareBoxFill } from "react-icons/ri";
import ShareModal from "../ProfileTemplates/template1/modals/ShareModal";
import { SafeLocalStorage, getCookie } from "../utils";
import { FiEye } from "react-icons/fi";
import ShareModalDownload from "../ProfileTemplates/template1/modals/ShareModalDownload";
import NewToast from "../UiComponents/NewToast";
import {
  isIOS,
  isAndroid,
  isDesktop,
  isChrome,
  isFirefox,
  isSafari,
} from "react-device-detect";
import PrimaryButton from "../UiComponents/PrimaryButton";

// home starts here
const Home = ({ data, profile, type, switchData, toggleData }) => {
  // //console.log(switchData);
  // console.log(data);

  const homePageRef = useRef(null);
  const {
    dummyState,
    setDummyState,
    quickSelectContext,
    leadCaptureContext,
    userType,
  } = useContext(UserContext);
  const [showPreview, setShowPreview] = useState(false);
  const [messagePro, setMessagePro] = useState("");
  const [showMessagePro, setShowMessagePro] = useState(false);
  const [templatePreview, setTemplatePreview] = useState(false);
  const [toggleStates, setToggleStates] = useState(toggleData);
  const navigate = useRouter();
  const [hasGotPro, setHasGotPro] = useState(data.HasGotPro);
  const [name, setName] = useState(data.Name);
  const [firstName, setFirstName] = useState(data.FirstName);
  const [lastName, setLastName] = useState(data.LastName);
  const [email, setEmail] = useState(data.Email);
  const [mobileNumber, setMobileNumber] = useState(data.MobileNumber);
  const [newMobileNumber, setNewMobileNumber] = useState(data.NewMobileNumber);
  const [description, setDescription] = useState(data.Description);
  const [companyName, setCompanyName] = useState(data.CompanyName);
  const [pimage, setPImage] = useState(data.PImage);
  const [images, setImages] = useState(data.Images);
  const [videos, setVideos] = useState(data.Videos);
  const [apps, setApps] = useState(data.Apps);
  const [customLinks, setCustomLinks] = useState(data.CustomLinks);
  const [productSwitch, setProductSwitch] = useState(data.ProductSwitch);
  const [serviceSwitch, setServiceSwitch] = useState(data.ServiceSwitch);
  const [logoSwitch, setlogoSwitch] = useState(data.LogoSwitch);
  const [reviewSwitch, setReviewSwitch] = useState(data.ReviewSwitch);
  const [reviewButtonSwitch, setReviewButtonSwitch] = useState(
    data.ReviewButtonSwitch
  );
  const [googleReviewButtonSwitch, setGoogleReviewButtonSwitch] = useState(
    data.GoogleReviewButtonSwitch
  );
  console.log(data);
  // console.log(switchData);

  const [businessHoursSwitch, setBusinessHoursSwitch] = useState(
    data.BusinessHoursSwitch
  );
  const [productLabel, setProductLabel] = useState(data.ProductLabel);
  const [serviceLabel, setServiceLabel] = useState(data.ServiceLabel);
  const [reviewLabel, setReviewLabel] = useState(data.ReviewLabel);
  const [businessHoursLabel, setBusinessHoursLabel] = useState(
    data.BusinessHoursLabel
  );
  const [products, setProducts] = useState(data.Products);
  const [services, setServices] = useState(data.Services);
  const [reviews, setReviews] = useState(data.Reviews);
  const [businessHours, setBusinessHours] = useState(data.BusinessHours);
  const [jobTitle, setJobTitle] = useState(data.JobTitle);
  const [pdfs, setPdfs] = useState(data.Pdfs);
  const [dummyData, setDummyData] = useState(data.DummyData);
  const [switchStates, setSwitchStates] = useState(switchData.switchStates);

  const [templateName, setTemplateName] = useState(switchData.templateName);
  const [changedTemplateName, setChangedTemplateName] = useState("");

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [updateTemplateData, setUpdateTemplateData] = useState(false);
  const [leadCapture, setLeadCapture] = useState(data.LeadCapture);
  const [quickSelect, setQuickSelect] = useState(data.QuickSelect);
  const [availabilitySwitch, setAvailabilitySwitch] = useState(
    data.AvailabilitySwitch
  );
  const [availabilityLabel, setAvailabilityLabel] = useState(
    data.AvailabilityLabel
  );
  const [availability, setAvailability] = useState(data.Availability);
  const [templateIndex, setTemplateIndex] = useState();

  const [template, setTemplate] = useState(templateName);

  const [changeTab, setChangeTab] = useState("themes");

  // States for customized template for Iphone component
  const [backgroundColor, setBackgroundColor] = useState(data.BackgroundColor);
  const [buttonStyle, setButtonStyle] = useState(data.ButtonStyle);
  const [buttonColor, setButtonColor] = useState(data.ButtonColor);
  const [fontColor, setFontColor] = useState(data.FontColor);
  const [color1, setColor1] = useState(data.Color1);
  const [color2, setColor2] = useState(data.Color2);
  const [bgImage, setBgImage] = useState(data.BgImage);
  // Some more Additional For customized template component |
  const [appIconBg, setAppIconBg] = useState(data?.appIconBg);
  const [appIconColor, setAppIconColor] = useState("");
  const [customTextColor, setCustomTextColor] = useState(data?.customTextColor);
  const [customButtontextColor, setCustomButtonTextColor] = useState(
    data?.customButtontextColor
  ); // Initial text color

  const [id, setId] = useState(switchData.id);
  const [status, setStatus] = useState(switchData.status);

  useEffect(() => {
    SafeLocalStorage.setItem("type", type);
  }, [type]);

  const updateTemplateDataHandler = () => {
    setUpdateTemplateData((prev) => !prev);
  };

  const getData = async () => {
    try {
      const { data } = await axios.get(
        `${serverUrl}/device/infoall/${profile}`
      );
      if (data.user.length !== 0) {
        setHasGotPro(data.user[0].hasGotPro);
        if (
          data.profileShared.length !== 0 &&
          data.profileShared[0]._id == type
        ) {
          setLeadCapture(data.profileShared[0].contactForm);
          setQuickSelect(data.profileShared[0].quickSelect);
          setProductSwitch(data.profileShared[0].productSwitch);
          setServiceSwitch(data.profileShared[0].serviceSwitch);
          setlogoSwitch(data.profileShared[0].logoSwitch);
          setReviewSwitch(data.profileShared[0].reviewSwitch);
          setReviewButtonSwitch(data.profileShared[0].reviewButtonSwitch);
          setGoogleReviewButtonSwitch(
            data.profileShared[0].googleReviewButtonSwitch
          );
          // console.log(data);

          setBusinessHoursSwitch(data.profileShared[0].businessHoursSwitch);
          setProductLabel(data.profileShared[0].productLabel);
          setServiceLabel(data.profileShared[0].serviceLabel);
          setReviewLabel(data.profileShared[0].reviewLabel);
          setBusinessHoursLabel(data.profileShared[0].businessHoursLabel);
          setAvailabilitySwitch(data.profileShared[0].availabilitySwitch);
          setAvailabilityLabel(data.profileShared[0].availabilityLabel);
        } else if (data.profileUnshared.length !== 0) {
          for (let i = 0; i < data.profileUnshared.length; i++) {
            if (data.profileUnshared[i]._id == type) {
              setLeadCapture(data.profileUnshared[i].contactForm);
              setQuickSelect(data.profileUnshared[i].quickSelect);
              setProductSwitch(data.profileUnshared[i].productSwitch);
              setServiceSwitch(data.profileUnshared[i].serviceSwitch);
              setlogoSwitch(data.profileUnshared[i].logoSwitch);
              setReviewSwitch(data.profileUnshared[i].reviewSwitch);
              setGoogleReviewButtonSwitch(
                data.profileUnshared[i].googleReviewButtonSwitch
              );
              // console.log(data);

              setBusinessHoursSwitch(
                data.profileUnshared[i].businessHoursSwitch
              );
              setProductLabel(data.profileUnshared[i].productLabel);
              setServiceLabel(data.profileUnshared[i].serviceLabel);
              setReviewLabel(data.profileUnshared[i].reviewLabel);
              setBusinessHoursLabel(data.profileUnshared[i].businessHoursLabel);
              setAvailabilitySwitch(data.profileUnshared[i].availabilitySwitch);
              setAvailabilityLabel(data.profileUnshared[i].availabilityLabel);
            }
          }
        }
      }

      const result = await axios.get(
        `${serverUrl}/getData/data/${type}/${profile}`
      );

      if (
        result.data.customTemplates[0] &&
        Object.keys(result.data.customTemplates[0]).length !== 0
      ) {
        setBackgroundColor(
          result.data.customTemplates[0].customizedTemplate.backgroundColor
        );
        setButtonStyle(
          result.data.customTemplates[0].customizedTemplate.buttonStyle
        );
        setButtonColor(
          result.data.customTemplates[0].customizedTemplate.buttonColor
        );
        setColor1(result.data.customTemplates[0].customizedTemplate.color1);
        setColor2(result.data.customTemplates[0].customizedTemplate.color2);
        setBgImage(result.data.customTemplates[0].customizedTemplate.bgImage);
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
        setDummyData(true);
      } else {
        setDummyData(false);
      }

      if (result.data.user.length > 0) {
        setName(
          result.data.user[0].firstName + " " + result.data.user[0].lastName
        );
        setFirstName(result.data.user[0].firstName);
        setLastName(result.data.user[0].lastName);
        setEmail(result.data.user[0].email);
        if (result.data.user[0].mobileNumber) {
          setMobileNumber(
            "+" +
              result.data.user[0].selectedCode +
              result.data.user[0].mobileNumber
          );
        }
        if (result.data.user[0].newmobileNumber) {
          setNewMobileNumber(
            "+" +
              result.data.user[0].selectedCode2 +
              result.data.user[0].newmobileNumber
          );
        }
        setDescription(result.data.user[0].description);
        setCompanyName(result.data.user[0].companyName);
        setPImage(result.data.user[0].profileimage);
        setJobTitle(result.data.user[0].jobTitle);
      } else {
        setName(data.user[0].name);
        setFirstName(data.user[0].firstName);
        setLastName(data.user[0].lastName);
      }
      setImages(result.data.img);
      setVideos(result.data.videos);
      setApps(result.data.apps);
      setProducts(result.data.products);
      setServices(result.data.services);
      setReviews(result.data.reviews);
      setBusinessHours(result.data.businessHours);
      setPdfs(result.data.pfds);
      setCustomLinks(result.data.customLinks);
      setAvailability(result.data.availability);
    } catch (error) {
      //console.log(error);
      navigate.push("/login");
    }
  };

  // const getDetail = async () => {
  //   const config = {
  //     headers: {
  //       Authorization: "Bearer " + getCookie("jwt_token"),
  //     },
  //   };
  //   const { data } = await axios.get(
  //     `${serverUrl}/connect/getDetail/${profile}/${type}`,
  //     config
  //   );

  //   if (data.length == 0) {
  //     setChangeBottomComponent("Profile Information");
  //   }
  // };

  const fetchreview = async () => {
    const config = {
      headers: {
        Authorization: "Bearer " + getCookie("jwt_token"),
      },
    };
    try {
      const { data } = await Axios.get(
        `${serverUrl}/record/record/${profile}/${type}`,
        config
      );
      setToggleStates(data);
    } catch (error) {
      //console.log(error?.response?.data?.error);
      navigate.push("/login");
    }
  };

  const fetchswitch = async () => {
    const config = {
      headers: {
        Authorization: "Bearer " + getCookie("jwt_token"),
      },
    };
    try {
      const { data } = await Axios.get(
        `${serverUrl}/profile/profile/${profile}`,
        config
      );
      const filterdata = data.filter((item) => item._id === type);

      setSwitchStates(filterdata);
      setId(filterdata[0]._id);
      setStatus(filterdata[0].shared);
      setTemplateName(filterdata[0].type);
    } catch (error) {
      //console.log(error);
      navigate.push("/login");
    }
  };

  const [changeBottomComponent, setChangeBottomComponent] =
    useState("Basic Details");

  const handleToggleChange = (newToggleStates) => {
    setToggleStates(newToggleStates);
  };

  useEffect(() => {
    const tab = SafeLocalStorage.getItem("currentComponent");
    setChangeBottomComponent(tab ? tab : "Basic Details");
  }, [dummyState]);

  useEffect(() => {
    getData();
    fetchreview();
    fetchswitch();
  }, [dummyState, updateTemplateData, changeBottomComponent, changeTab]);

  // change template on click btn in template and design
  const handleChangeTemplate = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getCookie("jwt_token"),
      },
    };
    try {
      await axios.post(
        `${serverUrl}/profile/updateTemplate/${type}/${profile}`,
        { template: changedTemplateName },
        config
      );
      setTemplateName(changedTemplateName);
      setToastMessage("Template Changed Successfully");
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        setToastMessage("");
      }, 3000);
    } catch (error) {
      console.error(error);
    }
  };

  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [shareProfile, setShareProfile] = useState(false);
  const [QRdownload, setQRdownload] = useState(false);

  const handleShareProfile = () => {
    setShareProfile(true);
  };

  return (
    <div className="flex h-screen w-full first-container">
      <div className="md:h-full">
        <SideBar profile={profile} />
      </div>

      <div
        className="w-full overflow-auto bg-white md:bg-[#fafafa] "
        ref={homePageRef}
      >
        <NavBar showBack={true} />

        {userType !== "Pro" &&
          userType !== "Starter" &&
          userType != "Free" &&
          !hasGotPro && (
            <div className="p-4 md:p-5 bg-white">
              <ProgressLine
                toggleStates={toggleStates}
                profile={profile}
                firstName={firstName}
                dummyState={dummyState}
                setShowMessagePro={setShowMessagePro}
                setMessagePro={setMessagePro}
                type={type}
                height={"8px"}
                templateName={templateName}
                onDashboard={false}
                setShareProfile={setShareProfile}
              />
            </div>
          )}
        <div className="mt-3 md:mt-6">
          <MiniInfo
            current={setChangeBottomComponent}
            present={changeBottomComponent}
          />
        </div>

        {/* rendering these components depending on setChangeBottomComponent  */}

        {windowWidth > 500 ? (
          <div className="flex flex-row justify-between items-start xsm:my-6 sm:mx-6 ">
            <ManageMedia
              buttonStyle={buttonStyle}
              backgroundColor={backgroundColor}
              buttonColor={buttonColor}
              fontColor={fontColor}
              color1={color1}
              color2={color2}
              bgImage={bgImage}
              current={changeBottomComponent}
              profile={profile}
              toggleStates={toggleStates}
              setToggleStates={setToggleStates}
              type={type}
              templateName={templateName}
              switchStates={switchStates}
              setSwitchStates={setSwitchStates}
              onToggleChange={handleToggleChange}
              updateTemplateData={updateTemplateData}
              updateTemplateDataHandler={updateTemplateDataHandler}
            />
            <ProfileInfo
              buttonStyle={buttonStyle}
              backgroundColor={backgroundColor}
              buttonColor={buttonColor}
              fontColor={fontColor}
              color1={color1}
              color2={color2}
              bgImage={bgImage}
              current={changeBottomComponent}
              profile={profile}
              type={type}
              templateName={templateName}
              toggleStates={toggleStates}
              switchStates={switchStates}
              setSwitchStates={setSwitchStates}
              setDummyState={setDummyState}
              homePageRef={homePageRef}
            />
            <Modules
              buttonStyle={buttonStyle}
              backgroundColor={backgroundColor}
              buttonColor={buttonColor}
              fontColor={fontColor}
              color1={color1}
              color2={color2}
              bgImage={bgImage}
              current={changeBottomComponent}
              profile={profile}
              type={type}
              templateName={templateName}
              toggleStates={toggleStates}
              switchStates={switchStates}
              setSwitchStates={setSwitchStates}
              updateTemplateData={updateTemplateData}
              updateTemplateDataHandler={updateTemplateDataHandler}
            />
            <TemplatesAndDesigns
              dataButtonStyle={data.ButtonStyle}
              dataButtonColor={data.ButtonColor}
              dataFontColor={data.FontColor}
              dataColor1={data.Color1}
              dataColor2={data.Color2}
              dataBgImage={data.BgImage}
              dataBackgroundColor={data.BackgroundColor}
              setChangeTab={setChangeTab}
              setTemplateIndex={setTemplateIndex}
              setTemplatePreview={setTemplatePreview}
              setTemplate={setTemplate}
              template={template}
              buttonStyle={buttonStyle}
              setButtonStyle={setButtonStyle}
              backgroundColor={backgroundColor}
              setBackgroundColor={setBackgroundColor}
              buttonColor={buttonColor}
              setButtonColor={setButtonColor}
              fontColor={fontColor}
              setFontColor={setFontColor}
              color1={color1}
              setColor1={setColor1}
              color2={color2}
              setColor2={setColor2}
              bgImage={bgImage}
              setBgImage={setBgImage}
              appIconBg={appIconBg}
              setAppIconBg={setAppIconBg}
              appIconColor={appIconColor}
              setAppIconColor={setAppIconColor}
              customTextColor={customTextColor}
              setCustomTextColor={setCustomTextColor}
              customButtontextColor={customButtontextColor}
              setCustomButtonTextColor={setCustomButtonTextColor}
              current={changeBottomComponent}
              profile={profile}
              type={type}
              templateName={templateName}
              toggleStates={toggleStates}
              switchStates={switchStates}
              setChangedTemplateName={setChangedTemplateName}
              setShowToast={setShowToast}
              toastMessage={toastMessage}
              showToast={showToast}
              updateTemplateData={updateTemplateData}
              updateTemplateDataHandler={updateTemplateDataHandler}
            />

            {windowHeight > 600 && (
              <div className="w-[22rem] hidden xl:block">
                {status && (
                  <div className="w-full h-[56px] py-[8px] mb-4 px-[20px] flex flex-row justify-center">
                    <div
                      className="bg-white border border-[#E8E8E8] h-full w-full rounded-l-[12px] shadow-sm border-r-[#DFDBD8] border-r-[1px] flex flex-row justify-center items-center gap-[8px] cursor-pointer scale-[100%] active:scale-[95%]"
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `https://${profile}.qviq.io`
                        );
                      }}
                    >
                      <LuCopy />
                      <p className="text-[14px] font-[600]">Copy</p>
                    </div>

                    <div
                      className="bg-white h-full w-full border border-[#E8E8E8] rounded-r-[12px] shadow-sm border-l-[#DFDBD8] border-l-[1px] flex flex-row justify-center items-center gap-[8px] cursor-pointer scale-[100%] active:scale-[95%]"
                      onClick={handleShareProfile}
                    >
                      <RiShareBoxFill />
                      <p className="text-[14px] font-[600]">Share</p>
                    </div>
                  </div>
                )}

                {changeBottomComponent === "Templates and Designs" ? (
                  <Iphone
                    usedIn="home"
                    toggleStates={toggleStates}
                    profile={profile}
                    template={type}
                    updateTemplateData={updateTemplateData}
                    templateName={template === "" ? templateName : template}
                    backgroundColor={backgroundColor}
                    buttonStyle={buttonStyle}
                    buttonColor={buttonColor}
                    fontColor={fontColor}
                    color1={color1}
                    color2={color2}
                    bgImage={bgImage}
                    setBgImage={setBgImage}
                    appIconBg={appIconBg}
                    appIconColor={appIconColor}
                    customTextColor={customTextColor}
                    customButtontextColor={customButtontextColor}
                    data={{
                      username: profile,
                      templateId: type,
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
                      pimage: pimage,
                      images: images,
                      videos: videos,
                      apps: apps,
                      productSwitch: productSwitch,
                      serviceSwitch: serviceSwitch,
                      logoSwitch: logoSwitch,
                      reviewSwitch: reviewSwitch,
                      businessHoursSwitch: businessHoursSwitch,
                      reviewButtonSwitch: reviewButtonSwitch,
                      googleReviewButtonSwitch: googleReviewButtonSwitch,
                      productLabel: productLabel,
                      serviceLabel: serviceLabel,
                      reviewLabel: reviewLabel,
                      businessHoursLabel: businessHoursLabel,
                      products: products,
                      services: services,
                      reviews: reviews,
                      businessHours: businessHours,
                      products: products,
                      services: services,
                      pdfs: pdfs,
                      customLinks: customLinks,
                      quickSelect: quickSelect,
                      leadCapture: leadCapture,
                      availabilitySwitch: availabilitySwitch,
                      availabilityLabel: availabilityLabel,
                      availability: availability,
                    }}
                  />
                ) : (
                  <Iphone
                    usedIn="home"
                    toggleStates={toggleStates}
                    profile={profile}
                    template={type}
                    updateTemplateData={updateTemplateData}
                    templateName={templateName}
                    backgroundColor={backgroundColor}
                    buttonStyle={buttonStyle}
                    buttonColor={buttonColor}
                    fontColor={fontColor}
                    color1={color1}
                    color2={color2}
                    bgImage={bgImage}
                    setBgImage={setBgImage}
                    appIconBg={appIconBg}
                    appIconColor={appIconColor}
                    customTextColor={customTextColor}
                    customButtontextColor={customButtontextColor}
                    data={{
                      username: profile,
                      templateId: type,
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
                      pimage: pimage,
                      images: images,
                      videos: videos,
                      apps: apps,
                      productSwitch: productSwitch,
                      serviceSwitch: serviceSwitch,
                      logoSwitch: logoSwitch,
                      reviewSwitch: reviewSwitch,
                      businessHoursSwitch: businessHoursSwitch,
                      reviewButtonSwitch: reviewButtonSwitch,
                      googleReviewButtonSwitch: googleReviewButtonSwitch,
                      productLabel: productLabel,
                      serviceLabel: serviceLabel,
                      reviewLabel: reviewLabel,
                      businessHoursLabel: businessHoursLabel,
                      products: products,
                      services: services,
                      reviews: reviews,
                      businessHours: businessHours,
                      products: products,
                      services: services,
                      pdfs: pdfs,
                      customLinks: customLinks,
                      quickSelect: quickSelect,
                      leadCapture: leadCapture,
                      availabilitySwitch: availabilitySwitch,
                      availabilityLabel: availabilityLabel,
                      availability: availability,
                    }}
                  />
                )}
                {/* {//console.log("profile", type)} */}
              </div>
            )}
          </div>
        ) : (
          <>
            <ManageMedia
              buttonStyle={buttonStyle}
              backgroundColor={backgroundColor}
              buttonColor={buttonColor}
              fontColor={fontColor}
              color1={color1}
              color2={color2}
              bgImage={bgImage}
              current={changeBottomComponent}
              profile={profile}
              toggleStates={toggleStates}
              setToggleStates={setToggleStates}
              type={type}
              templateName={templateName}
              switchStates={switchStates}
              setSwitchStates={setSwitchStates}
              onToggleChange={handleToggleChange}
              updateTemplateData={updateTemplateData}
              updateTemplateDataHandler={updateTemplateDataHandler}
            />
            <ProfileInfo
              buttonStyle={buttonStyle}
              backgroundColor={backgroundColor}
              buttonColor={buttonColor}
              fontColor={fontColor}
              color1={color1}
              color2={color2}
              bgImage={bgImage}
              current={changeBottomComponent}
              profile={profile}
              type={type}
              templateName={templateName}
              toggleStates={toggleStates}
              switchStates={switchStates}
              setSwitchStates={setSwitchStates}
              setDummyState={setDummyState}
              homePageRef={homePageRef}
            />
            <Modules
              buttonStyle={buttonStyle}
              backgroundColor={backgroundColor}
              buttonColor={buttonColor}
              fontColor={fontColor}
              color1={color1}
              color2={color2}
              bgImage={bgImage}
              current={changeBottomComponent}
              profile={profile}
              type={type}
              templateName={templateName}
              toggleStates={toggleStates}
              switchStates={switchStates}
              setSwitchStates={setSwitchStates}
              updateTemplateData={updateTemplateData}
              updateTemplateDataHandler={updateTemplateDataHandler}
            />

            <TemplatesAndDesigns
              dataButtonStyle={data.ButtonStyle}
              dataButtonColor={data.ButtonColor}
              dataFontColor={data.FontColor}
              dataColor1={data.Color1}
              dataColor2={data.Color2}
              dataBgImage={data.BgImage}
              dataBackgroundColor={data.BackgroundColor}
              setChangeTab={setChangeTab}
              setTemplateIndex={setTemplateIndex}
              setTemplatePreview={setTemplatePreview}
              setTemplate={setTemplate}
              template={template}
              buttonStyle={buttonStyle}
              setButtonStyle={setButtonStyle}
              backgroundColor={backgroundColor}
              setBackgroundColor={setBackgroundColor}
              buttonColor={buttonColor}
              setButtonColor={setButtonColor}
              fontColor={fontColor}
              setFontColor={setFontColor}
              color1={color1}
              setColor1={setColor1}
              color2={color2}
              setColor2={setColor2}
              bgImage={bgImage}
              setBgImage={setBgImage}
              appIconBg={appIconBg}
              setAppIconBg={setAppIconBg}
              appIconColor={appIconColor}
              setAppIconColor={setAppIconColor}
              customTextColor={customTextColor}
              setCustomTextColor={setCustomTextColor}
              customButtontextColor={customButtontextColor}
              setCustomButonTextColor={setCustomButtonTextColor}
              current={changeBottomComponent}
              profile={profile}
              type={type}
              templateName={templateName}
              toggleStates={toggleStates}
              switchStates={switchStates}
              setChangedTemplateName={setChangedTemplateName}
              setShowToast={setShowToast}
              toastMessage={toastMessage}
              showToast={showToast}
              updateTemplateData={updateTemplateData}
              updateTemplateDataHandler={updateTemplateDataHandler}
            />
          </>
        )}
        {/* {console.log(windowWidth)} */}
        {windowWidth <= 420 && (
          <div className="flex fixed bottom-4 w-full z-50 justify-center items-center gap-2 xsm:gap-4 sm:right-0 md:-right-32 lg:right-0 xl:right-16">
            <div>
              <button
                onClick={() => setShowPreview(true)}
                className="bg-white border-2 border-[#0000001a] pl-[11px] pr-[3px] font-medium flex justify-center items-center text-base py-[12px] xsm:px-[24px] h-[38px] sm:h-[45px]
          shadow-[_0px_4px_20px_1px_rgba(_171,_181,_217,_0.16)] rounded-full xsm:rounded-[64px]"
              >
                <FiEye className="text-[#e40849] mr-[8px]" />
                <p className="add-icon hidden xsm:flex">Preview</p>
              </button>
            </div>
            {(changeBottomComponent === "Templates" ||
              changeBottomComponent === "Templates and Designs") &&
              !changedTemplateName.includes("customtemplate") && (
                <div>
                  <PrimaryButton2
                    isDisabled={changedTemplateName === templateName}
                    onClick={handleChangeTemplate}
                    text="Change Template"
                  />
                </div>
              )}
          </div>
        )}

        {windowWidth > 420 &&
        changeBottomComponent === "Templates and Designs" &&
        changedTemplateName !== "" &&
        changedTemplateName !== templateName &&
        !changedTemplateName.includes("customtemplate") ? (
          <div
            className="fixed bottom-[50px] left-0 w-full flex justify-center"
            style={{ zIndex: "50" }}
          >
            <div className="relative md:-right-[135px] xl:right-16">
              <PrimaryButton2
                text="Change Template"
                onClick={handleChangeTemplate}
              />
            </div>
          </div>
        ) : (
          <div
            className="fixed w-fit xsm2:flex justify-center hidden xl:hidden"
            style={{
              zIndex: "50",
              bottom: isIOS ? "6%" : "2%",
              left: windowWidth > 768 ? "60%" : "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <button
              onClick={() => setShowPreview(true)}
              type="button"
              style={{ border: "2px solid #0000001a" }}
              className="bg-white  font-medium flex justify-center items-center text-base py-[12px] px-[24px] h-[38px] sm:h-[45px]
                  shadow-[_0px_4px_20px_1px_rgba(_171,_181,_217,_0.16)] rounded-[64px]"
            >
              <FiEye className="text-[#e40849] mr-[8px]" />

              <p className="add-icon">Preview</p>
            </button>
          </div>
        )}
      </div>

      {shareProfile && (
        <ShareModal
          username={profile}
          usedIn="outsideTemplate"
          firstName={firstName}
          profileImage={pimage}
          setShowModal1={setShareProfile}
          type={id}
          square={false}
          setQRdownload={setQRdownload}
          dummyState={dummyState}
        />
      )}

      {QRdownload && (
        <ShareModalDownload
          QRdownload={QRdownload}
          username={profile}
          usedIn="outsideTemplate"
          firstName={firstName}
          profileImage={pimage}
          setShowModal1={setShareProfile}
          type={id}
          square={false}
          setQRdownload={setQRdownload}
          dummyState={dummyState}
        />
      )}

      {/* all preview components are here */}

      {templatePreview && (
        <TemplatePreview
          setTemplatePreview={setTemplatePreview}
          templateIndex={templateIndex}
          handleChangeTemplate={handleChangeTemplate}
          setShowToast={setShowToast}
          toastMessage={toastMessage}
          showToast={showToast}
          changedTemplateName={changedTemplateName}
          templateName={templateName}
          data={{
            username: profile,
            templateId: type,
            dummyData: dummyData,
            name: name,
            firstName: firstName,
            lastName: lastName,
          }}
        />
      )}

      <Preview
        open={showPreview}
        setShowPreview={setShowPreview}
        template={type}
        templateType={templateName}
        backgroundColor={backgroundColor}
        buttonStyle={buttonStyle}
        buttonColor={buttonColor}
        color1={color1}
        color2={color2}
        bgImage={bgImage}
        setBgImage={setBgImage}
        appIconBg={appIconBg}
        setAppIconBg={setAppIconBg}
        appIconColor={appIconColor}
        setAppIconColor={setAppIconColor}
        customTextColor={customTextColor}
        setCustomTextColor={setCustomTextColor}
        customButtontextColor={customButtontextColor}
        data={{
          username: profile,
          templateId: type,
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
          pimage: pimage,
          images: images,
          videos: videos,
          apps: apps,
          productSwitch: productSwitch,
          serviceSwitch: serviceSwitch,
          logoSwitch: logoSwitch,
          reviewSwitch: reviewSwitch,
          businessHoursSwitch: businessHoursSwitch,
          reviewButtonSwitch: reviewButtonSwitch,
          googleReviewButtonSwitch: googleReviewButtonSwitch,
          productLabel: productLabel,
          serviceLabel: serviceLabel,
          reviewLabel: reviewLabel,
          businessHoursLabel: businessHoursLabel,
          products: products,
          services: services,
          reviews: reviews,
          businessHours: businessHours,
          products: products,
          services: services,
          pdfs: pdfs,
          customLinks: customLinks,
          quickSelect: quickSelect,
          leadCapture: leadCapture,
          availabilitySwitch: availabilitySwitch,
          availabilityLabel: availabilityLabel,
          availability: availability,
        }}
      />
      <NewToast open={showMessagePro} message={messagePro} />
    </div>
  );
};

export default Home;
