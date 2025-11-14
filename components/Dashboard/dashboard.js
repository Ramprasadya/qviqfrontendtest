"use client";
import React, { useContext, useEffect, useState, useRef, useMemo } from "react";
import Axios from "axios";
import SideBar from "../navbar/SideBar";
import NavBar from "../navbar/NavBar";
import Iphone from "../UiComponents/Iphone";
import "../UiComponents/iconTextStyle.css";
import { auth } from "../Login/firebaseconfig";
import {
  FacebookIcon,
  WhatsappIcon,
  InstapaperIcon,
  LinkedinIcon,
  TwitterIcon,
  FacebookShareButton,
  WhatsappShareButton,
  InstapaperShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";
import ProgressLine from "../UiComponents/ProgressLine";
import axios from "axios";
import StarterButton from "../UiComponents/StarterButton";
import { UserContext } from "../Contexts/context";
import {
  HiArrowRight,
  HiOutlineDocumentDuplicate,
  HiOutlinePlusCircle,
} from "react-icons/hi";
import { HiArrowDownTray, HiOutlinePencilSquare } from "react-icons/hi2";
import Tapop from "../Image/tapop.png";

//barchart
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import PrimaryButton from "../UiComponents/PrimaryButton";
import TapopQrModal from "./TapopQrModal";
import LeftRightScrollBtn from "../Utils/LeftRightScrollBtn";
import NewToast from "../UiComponents/NewToast";
import ConfirmationPopUp from "../UiComponents/MobileView/ConfirmationPopUp";
import { serverUrl } from "../../config";
import { clientUrl } from "../../config";

import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import Preview from "../UiComponents/Preview";
import { SafeLocalStorage, getCookie } from "../utils";

import "../qr.css";
import QRCodeStyling from "qr-code-styling";

const Dashboard = ({
  data,
  userName,
  templateData,
  monthData,
  connections,
  toggleData,
  profileData,
}) => {
  const [toggleStates, setToggleStates] = useState(toggleData);
  const navigate = useRouter();
  const profile = userName;
  const [type, setType] = useState(templateData.Type);
  const [activeTemplateName, setActiveTemplateName] = useState(
    templateData.ActiveTemplateName
  );
  const [isComponentRendered, setComponentRendered] = useState(
    templateData.ComponentRendered
  );
  const LineChartRef = useRef(null);
  const [dummyState, setDummyState] = useState(0);
  const [viewsData, setViewsData] = useState(monthData);
  const [connectionData, setConnectionData] = useState(connections);

  // Preview Data states
  const [showPreview, setShowPreview] = useState(false);

  const [name, setName] = useState(data.Name);
  const [firstName, setFirstName] = useState(data.FirstName);
  const [lastName, setLastName] = useState(data.LastName);
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
  const [email1, setEmail1] = useState(data.Email1);

  // const [showToast, setShowToast] = useState(false);
  const [leadCapture, setLeadCapture] = useState(data.LeadCapture);
  const [quickSelect, setQuickSelect] = useState(data.QuickSelect);
  const [availabilitySwitch, setAvailabilitySwitch] = useState(
    data.AvailabilitySwitch
  );
  const [availabilityLabel, setAvailabilityLabel] = useState(
    data.AvailabilityLabel
  );
  const [availability, setAvailability] = useState(data.Availability);
  const [hasGotPro, sethasGotPro] = useState(profileData.hasGotPro);

  const {
    username,
    userType,
    copyToClipboard,
    setToastMessageContext,
    setShowToastContext,
    ISSERVER,
  } = useContext(UserContext);

  // date formatter for graph to '12 July'
  const dateformatter = (date) => {
    if (date === "Today") {
      return "Today";
    }
    if (date == undefined) return;
    const splitdate = date.split("-");
    const day = splitdate[1];
    const month = splitdate[0];
    const year = splitdate[2];
    const newDate = `${day}-${month}-${year}`;
    const reqDate = new Date(newDate);
    const monthName = reqDate.toLocaleString("default", { month: "short" });
    return `${reqDate.getDate()} ${monthName}`;
  };

  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        `${serverUrl}/profile/profiletype/${profile}`
      );
      if (res.data.length > 0) {
        setType(res.data[0]._id);
        setActiveTemplateName(res.data[0].type);
        setComponentRendered(true);
      }
    } catch (error) {
      //console.log(error?.response);
    }
  };
  const sharelink = `Check out my profile on Qviq http://${profile}.qviqfrontendtest.vercel.app`;
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
      // Handle error here, e.g. redirect to an error page
      //console.log(error?.response?.data?.error);
      navigate.push("/login");
    }
  };

  // Email verification popup
  const [popUpEmailVerifyOpen, setPopUpEmailVerifyOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");
  const [id, setId] = useState(profileData.id);
  const [emailVerified, setEmailVerified] = useState(profileData.emailVerified);

  const [backgroundColor, setBackgroundColor] = useState(data.BackgroundColor);
  const [buttonStyle, setButtonStyle] = useState(data.ButtonStyle);
  const [buttonColor, setButtonColor] = useState(data.ButtonColor);
  const [fontColor, setFontColor] = useState(data.FontColor);
  const [color1, setColor1] = useState(data.Color1);
  const [color2, setColor2] = useState(data.Color2);
  const [bgImage, setBgImage] = useState(data.BgImage);
  const [screenWidth, setScreenWidth] = useState(0);

  const scroller = useRef(null);

  useEffect(() => {
    setScreenWidth(window.innerWidth);
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const fetchId = async () => {
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
      if (res.data.length > 0) {
        setId(res.data[0]._id);
        setEmailVerified(res.data[0].emailVerified);
        sethasGotPro(res.data[0].hasGotPro);
      }
    } catch (error) {
      //console.log(error);
    }
  };

  // custom template data

  const getData = async () => {
    const { data } = await axios.get(`${serverUrl}/device/infoall/${profile}`);

    if (data.user.length !== 0) {
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
            setReviewButtonSwitch(data.profileUnshared[i].reviewButtonSwitch);
            setBusinessHoursSwitch(data.profileUnshared[i].businessHoursSwitch);
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

    let activeId = "";
    activeId = data.profileShared[0]?._id;

    const result = await axios.get(
      `${serverUrl}/getData/data/${activeId}/${profile}`
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
    const appsArr = appsObj !== undefined ? Object.values(appsObj).flat() : [];

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
      setEmail1(result.data.user[0].email);
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
  };

  const handleResend = () => {
    try {
      auth.sendSignInLinkToEmail(email1, {
        url: `${clientUrl}/verifyemail/${id}`,
        handleCodeInApp: true,
        displayName: "Jane Q. User",
      });

      SafeLocalStorage.setItem("emailForSignIn", email1);
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
    setPopUpEmailVerifyOpen(false);
  };

  // qrcode
  const [color, setbackendColor] = useState("#000000");
  const [img, setImage] = useState(Tapop?.src);

  // ---------------------------------

  const [QRcolor, setQRcolor] = useState("#000000");
  const [QRlogo, setQRlogo] = useState(Tapop?.src);
  const [urlData, setUrlData] = useState(
    `${clientUrl}/qrscan/${type}/${profile}`
  );

  
  const qrCodeOptions = {
    width: 720,
    height: 720,
    margin: 40,
    dotsOptions: {
      color: QRcolor,
      type: "rounded",
    },
    imageOptions: {
      hideBackgroundDots: true,
      crossOrigin: "anonymous",
      margin: 20,
      imageSize: 0.5,
    },
    backgroundOptions: {
      round: 0.04,
      color: "#fff",
    },
    data: urlData,
    image: QRlogo,
  };

  const qrCode = new QRCodeStyling(qrCodeOptions);

  const QRref = useRef(null);

  // To get the person data from backend
  const getQRcode = async () => {
    try {
      const res = await axios.get(`${serverUrl}/person/get/${profile}`);

      //console.log(res.data[0].colour);

      if (res.data[0].image != "" && res.data[0].colour != "") {
        qrCode.append(QRref.current);
      }

      if (res.data == null) {
        // navigate.push('/nodata')
      } else if (res.data === "error") {
        //console.log("there was an error");
      } else {
        setbackendColor(res.data[0].colour);
        setQRcolor(res.data[0].colour);
        if (res.data[0].image != "") {
          setQRlogo(res.data[0].image);
        }
      }
    } catch (error) {
      //console.log(error);
    }
  };

  useEffect(() => {
    qrCode.append(QRref.current);
  }, []);

  useEffect(() => {
    qrCode.append(QRref.current);
    //console.log(urlData, QRlogo, QRcolor);
  }, [dummyState, QRcolor, QRlogo, urlData]);

  useEffect(() => {
    qrCode.update({
      data: urlData,
      image: QRlogo,
      dotsOptions: {
        color: QRcolor,
      },
    });
  }, [QRcolor, QRlogo, urlData]);

  const onDownloadClick = () => {
    qrCode.download({
      extension: "png",
    });
  };

  //  Redendering the component at once
  useEffect(() => {
    getQRcode();
  }, [dummyState]);

  // -------------------------

  // get month view data for line chart (previous 30 days)
  const monthView = async () => {
    const config = {
      headers: {
        Authorization: "Bearer " + getCookie("jwt_token"),
      },
    };
    try {
      let { data } = await axios.get(
        `${serverUrl}/analytics/totalview/${profile}`,
        config
      );
      data = data.filter((item) => item.type == type);
      setViewsData(data);
    } catch (error) {
      //console.log(error);
    }
  };

  // connection data for line chart
  const fetchConnectionData = async () => {
    const config = {
      headers: {
        Authorization: "Bearer " + getCookie("jwt_token"),
      },
    };
    try {
      let { data } = await axios.get(
        `${serverUrl}/analytics/totalview/${profile}`,
        config
      );
      data = data.filter((item) => item.type == type);

      setConnectionData(data);
    } catch (error) {
      //console.log(error);
    }
  };

  // transform data for line chart eg. fill missing dates with 0
  const transformDataForLineChart = (viewsData, connectionData) => {
    let tempViewData = [];
    let currDate = new Date();
    let dateBefore30Days = new Date();
    dateBefore30Days.setDate(dateBefore30Days.getDate() - 29);

    for (
      let date = dateBefore30Days;
      date <= currDate;
      date.setDate(date.getDate() + 1)
    ) {
      // convert date from new Date() format to 11-9-2023
      const formattedDate = `${
        (date.getDate() < 10 ? "0" : "") + date.getDate()
      }-${
        (date.getMonth() + 1 < 10 ? "0" : "") + (date.getMonth() + 1)
      }-${date.getFullYear()}`;

      const matchingValueViews = viewsData.find(
        (item) => item.date === formattedDate
      );

      const matchingValueConnection = connectionData.find(
        (item) => item.date === formattedDate
      );

      if (matchingValueViews || matchingValueConnection) {
        tempViewData.push({
          date: formattedDate,
          viewCount:
            (matchingValueViews ? matchingValueViews.viewCount : 0) || 0,
          connections:
            (matchingValueConnection
              ? matchingValueConnection.connectCount
              : 0) || 0,
        });
      } else {
        tempViewData.push({
          date: formattedDate,
          viewCount: 0,
          connections: 0,
        });
      }
    }
    return tempViewData;
  };
  const lineChartData = useMemo(
    () => transformDataForLineChart(viewsData, connectionData),
    [viewsData, connectionData]
  );
  useEffect(() => {
    if (type !== "") {
      monthView();
      fetchConnectionData();
      getData();
      fetchreview();
    }
  }, [type]);

  useEffect(() => {
    fetchId();
    fetchProfile();
  }, []);

  // show qr code as image function
  const qrCodeRef = useRef(null);

  const showQrCodeFunction = (qrCodeRef, width, img, color) => {
    const QrCodeWithLogo = require("qrcode-with-logos").default;
    const qrcode = new QrCodeWithLogo({
      content: `${clientUrl}/qrscan/${type}/${profile}`,
      width: width,
      image: qrCodeRef.current,
      logo: {
        src: img,
        logoSize: 0.25,
        bgColor: "#FFFFFF",
        borderColor: "#FFFFFF",
        borderSize: 0.06,
        borderRadius: 0,
      },
      nodeQrCodeOptions: {
        color: { dark: color },
        errorCorrectionLevel: "Q",
        margin: 3,
      },
    });

    // qrcode.toImage().then(() => {});
  };

  useEffect(() => {
    if (qrCodeRef && qrCodeRef.current && type !== "") {
      showQrCodeFunction(qrCodeRef, 130, img, color);
    }
  }, [qrCodeRef, dummyState, color, img, type]);

  // download qr code function
  const downloadQR = () => {
    const QrCodeWithLogo = require("qrcode-with-logos").default;
    const qrcode = new QrCodeWithLogo({
      content: `${clientUrl}/qrscan/${type}/${profile}`,
      width: 400,
      logo: {
        src: img,
        logoSize: 0.22,
        bgColor: "#FFFFFF",
        borderColor: "#FFFFFF",
        borderSize: 0.06,
        borderRadius: 0,
      },
      nodeQrCodeOptions: {
        color: { dark: color },
        errorCorrectionLevel: "Q",
        margin: 3,
      },
    });

    // qrcode.toImage().then(() => {
    //   qrcode.downloadImage(`${profile} Qviq QR`);
    // });
  };

  // no. of reviews
  // const [reviewLength, setReviewLength] = useState(0);
  // const showReviews = async () => {
  //   try {
  //     const response = await fetch(
  //       `${serverUrl}/review/getReview/${type}/${profile}`,
  //       config
  //     );
  //     if (response.status === 401 || response.status === 403) {
  //       throw new Error("Unauthorized");
  //     }
  //     const result = await response.json();
  //     setReviewLength(result.length);
  //   } catch (error) {
  //     //console.log(error);
  //     navigate.push("/login");
  //   }
  // };
  // useEffect(() => {
  //   if (type != "") showReviews();
  // }, [type]);

  // custom tooltip for chart
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="p-2 rounded-lg bg-[#ffffff] w-[202px]"
          style={{ boxShadow: "0px 2px 8px rgba(171, 181, 217, 0.14)" }}
        >
          <p className="text-xs text-[#A7A7A7] font-medium mb-0.5">
            {dateformatter(label)}
          </p>
          <p className="flex justify-between mt-0.5 text-xs text-[#1A1A1A]">
            <span>Profile visits</span>
            <span>{payload[0] !== undefined ? payload[0].value : "00"}</span>
          </p>
          <p className="flex justify-between mt-0.5 text-xs text-[#1A1A1A]">
            <span>Connection generated</span>
            <span>{payload[1] !== undefined ? payload[1].value : "00"}</span>
          </p>
        </div>
      );
    }

    return null;
  };

  // custom legend for chart
  const customLegend = (props) => {
    const { payload } = props;
    return (
      <div className="flex flex-col md:flex-row gap-2 md:gap-8">
        {payload.map((entry, index) => (
          <div className="flex gap-2 items-center" key={index}>
            <span className="w-2 h-2 mt-[-1px]">
              <svg width="10px" height="10px" style={{}}>
                <circle
                  cx={4.5}
                  cy={4.5}
                  r={4}
                  stroke={entry.color}
                  fill={entry.color}
                />
              </svg>
            </span>
            <span className="text-xs text-[#1A1A1A]">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  //Tapop qr modal states
  const [showQRModal, setShowQRModal] = useState(false);

  // left right scroll button style
  const scrollButtonStyle = {
    padding: "8px",
  };
  const scrollBtnLeftPosition = {
    left: "8px",
    bottom: "35px",
    top: "auto",
  };
  const scrollBtnRightPosition = {
    right: "8px",
    bottom: "35px",
    top: "auto",
  };

  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex h-screen w-full first-container">
      <div className="h-full">
        <SideBar />
      </div>
      <div className=" flex flex-col w-full">
        <NavBar button={<StarterButton />} text={"Dashboard - Website"} />
        <div
          className="  flex bg-[#FAFAFA] overflow-y-scroll"
          // style={{ height: "calc(100vh - 80px)" }}
        >
          <div
            ref={scroller}
            className="w-full md:ms-6 md:mt-6 overflow-scroll p-2 xsm:p-5 md:p-6 !pb-[90px] flex-1 bg-[#fafafa] md:bg-[#ffffff] flex flex-col gap-5 md:gap-6"
          >
            {/* My Profile  */}
            {userType === "Basic" && !hasGotPro ? (
              <div
                className="p-4 md:p-5"
                style={{
                  boxShadow: "0px 2px 16px 1px rgba(171, 181, 217, 0.16)",
                }}
              >
                <h2 className="text-base md:text-lg font-semibold pb-[15px]">
                  My Profile
                </h2>
                {/* <p className="pb-[17px] text-sm text-[#817C7C]">
                  Your <span className="add-icon">PRO</span> account is just a
                  few steps away. Click here to{" "}
                  <Link
                    className="add-icon"
                    style={{ cursor: "pointer" }}
                    href={`/plan/${username}`}
                  >
                    Upgrade Now
                  </Link>
                </p> */}
                {/* Progress line & CircularProgressBar */}
                <div>
                  {isComponentRendered && (
                    <ProgressLine
                      toggleStates={toggleStates}
                      profile={profile}
                      dummyState={dummyState}
                      type={type}
                      height={"8px"}
                      resend={handleResend}
                      emailVerified={emailVerified}
                      setEmailVerified={setEmailVerified}
                      setPopUpEmailVerifyOpen={setPopUpEmailVerifyOpen}
                      scroller={scroller}
                    />
                  )}
                </div>
              </div>
            ) : (
              <div className="flex justify-end ">
                <PrimaryButton
                  text={"Edit Profile"}
                  icon={<HiOutlinePencilSquare />}
                  onClick={
                    emailVerified === false
                      ? () => {
                          setPopUpEmailVerifyOpen(true);
                        }
                      : () => {
                          navigate.push(`/${type}/dashboard/${profile}`);
                        }
                  }
                  width={"159px"}
                  isDisabled={type == ""}
                />
              </div>
            )}

            {/* Email Verification Pop Up */}
            <ConfirmationPopUp
              open={popUpEmailVerifyOpen}
              setOpen={setPopUpEmailVerifyOpen}
              title={`Email Verification`}
              description={[
                `To publish your Qviq profile, please verify your account by clicking the link sent to your mail`,
                <b key={0}> {email1} </b>,
                ".",
              ]}
              cancelBtn={false}
              buttonText={"Resend Verification Link"}
              onClick={handleResend}
            />
            <NewToast open={showToast} message={message} />

            {/* Graph  */}
            <div
              className="py-4 md:py-5 rounded-lg relative  "
              style={{
                boxShadow: "0px 2px 16px 1px rgba(171, 181, 217, 0.16)",
              }}
            >
              <h2 className="px-4 md:px-5  text-base md:text-lg mb-3 md:mb-4 font-semibold">
                Profile Analytics{" "}
                <span className="font-light text-gray-400">
                  (For Active Template)
                </span>
              </h2>
              <div
                className="max-w-full py-6 overflow-scroll"
                ref={LineChartRef}
                style={{ paddingInline: "0" }}
              >
                <ResponsiveContainer height={300}>
                  <LineChart data={lineChartData}>
                    <CartesianGrid strokeDasharray="3" vertical={false} />
                    <XAxis
                      dataKey="date"
                      padding={{ left: 30, right: 30 }}
                      stroke="0"
                      tickFormatter={dateformatter}
                      fontSize={12}
                    />
                    <YAxis stroke="0" fontSize={12} />
                    <Tooltip content={CustomTooltip} />
                    <Legend
                      iconType="circle"
                      iconSize={10}
                      wrapperStyle={{
                        padding: "0 0 0 4rem",
                        marginBottom: "-1rem",
                      }}
                      align="left"
                      content={customLegend}
                    />
                    <Line
                      type="monotone"
                      name="Profile visits"
                      dataKey="viewCount"
                      stroke="#78F2B8"
                      activeDot={{ r: 8 }}
                      dot={0}
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      name="Connection generated"
                      dataKey="connections"
                      stroke="#B56EEC"
                      dot={0}
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <LeftRightScrollBtn
                refrence={LineChartRef}
                style={scrollButtonStyle}
                leftPosition={scrollBtnLeftPosition}
                rightPosition={scrollBtnRightPosition}
              />
            </div>

            <div className="grid grid-cols-1 xsm:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5 md:gap-6">
              {/* QrCode */}
              <div
                className="p-4 md:p-5 rounded-lg relative"
                style={{
                  boxShadow: "0px 2px 16px 1px rgba(171, 181, 217, 0.16)",
                }}
              >
                <h2 className="text-base md:text-lg mb-3 font-semibold">
                  Scan the QR Code
                </h2>
                <div
                  className="absolute p-2 rounded-full right-5 top-4"
                  style={{
                    boxShadow: "0px 2px 8px rgba(171, 181, 217, 0.24)",
                    cursor: "pointer",
                  }}
                  onClick={onDownloadClick}
                >
                  <span className="text-[#F54040]">
                    <HiArrowDownTray />
                  </span>
                </div>

                {/* <img src="" alt="" ref={qrCodeRef} /> */}
                <div className="w-full pt-[10px] flex flex-col justify-center items-center">
                  <div
                    className="qrDiv rounded-[12px] w-[180px] h-[180px] overflow-hidden"
                    style={{
                      boxShadow:
                        "4px 2px 10px #abb5d93d, -1px -2px 6px #dce0ec3d",
                    }}
                    ref={QRref}
                  />
                </div>

                <p
                  className="flex text-sm add-icon font-medium items-center gap-1.5 mx-auto w-fit mt-5"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setShowQRModal(true);
                  }}
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M8 6V10M10 8H6M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8Z"
                        stroke="url(#paint0_linear_2144_1464)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_2144_1464"
                          x1="14"
                          y1="2"
                          x2="0.596042"
                          y2="3.85495"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#FB6609" />
                          <stop offset="1" stopColor="#E40849" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </span>{" "}
                  Customize Qviq QR
                </p>
              </div>

              {/* QR Modal */}
              {showQRModal && (
                <TapopQrModal
                  onClick={() => {
                    setShowQRModal(false);
                  }}
                  dummyState1={dummyState}
                  setDummyState1={setDummyState}
                  templateId={type}
                  showQrCodeFunction={showQrCodeFunction}
                />
              )}

              {/* Share your tapop  */}
              <div
                className="p-4 md:p-5 rounded-lg"
                style={{
                  boxShadow: "0px 2px 16px 1px rgba(171, 181, 217, 0.16)",
                }}
              >
                <h2 className="text-base md:text-lg mb-3 font-semibold">
                  Share your Qviq
                </h2>
                <h2 className="text-[#817C7C] text-xs mb-4 md:mb-5">
                  Copy your page URL and share with anyone
                </h2>
                <div className="flex justify-between items-center h-fit break-all border border-[#1A1A1A] border-dotted rounded-lg px-1 [@media(min-width:300px)]:px-3 py-2.5 mb-6 md:mb-8">
                  <p className="text-xs font-medium">
                    https://{profile}.qviqfrontendtest.vercel.app
                  </p>
                  <button
                    className="add-icon text-2xl active:scale-90 duration-150"
                    title="Copy URL"
                    onClick={() => {
                      copyToClipboard(`https://${profile}.qviqfrontendtest.vercel.app`);
                    }}
                  >
                    <HiOutlineDocumentDuplicate />
                  </button>
                </div>

                <h2 className="mb-3">Share to your socials</h2>
                <div className="flex gap-5 mb-6 md:mb-0 flex-wrap">
                  <FacebookShareButton
                    url={sharelink}
                    quote={"qviq"}
                    hashtag={"#rightforu"}
                  >
                    <FacebookIcon size={40} borderRadius={12} />
                  </FacebookShareButton>
                  <WhatsappShareButton
                    url={sharelink}
                    quote={"qviq"}
                    hashtag={"#rightforu"}
                  >
                    <WhatsappIcon size={40} borderRadius={12} />
                  </WhatsappShareButton>
                  <LinkedinShareButton
                    url={sharelink}
                    quote={"qviq"}
                    hashtag={"#rightforu"}
                  >
                    <LinkedinIcon size={40} borderRadius={12} />
                  </LinkedinShareButton>
                  <TwitterShareButton
                    url={sharelink}
                    quote={"qviq"}
                    hashtag={"#rightforu"}
                  >
                    {/* <TwitterIcon size={40} borderRadius={12} /> */}
                    <img
                      src={
                        require("../Logos/SocialMediaLogos/twitter.png").default
                          .src
                      }
                      style={{
                        borderRadius: "12px",
                        width: "40px",
                        height: "40px",
                      }}
                    />
                  </TwitterShareButton>
                </div>
              </div>

              {/* review  */}
              {/* {reviewLength !== 0 && (
                <div
                  className="p-4 md:p-5 rounded-lg min-h-[186px] md:min-h-[284px]"
                  style={{
                    boxShadow: "0px 2px 16px 1px rgba(171, 181, 217, 0.16)",
                  }}
                >
                  <div className="flex flex-col justify-between h-full">
                    <div>
                      <h2 className="text-base md:text-lg mb-3 md:mb-4 font-semibold">
                        Reviews
                      </h2>
                      <p className="text-[#817C7C] text-xs mb-2 md:mb-7">
                        Total reviews received
                      </p>
                      <h1 className="text-[44px] font-semibold">
                        {reviewLength}
                      </h1>
                    </div>
                    <Link
                      href={`/showreview/${profile}`}
                      className="text-[#F54040] flex items-center gap-1.5 w-fit text-xs xsm:text-base"
                    >
                      View Reviews <HiArrowRight />
                    </Link>
                  </div>
                </div>
              )} */}

              {/* Appointment  */}
              {/* <div
                className="p-4 md:p-5 rounded-lg min-h-[204px] md:min-h-[284px]"
                style={{
                  boxShadow: "0px 2px 16px 1px rgba(171, 181, 217, 0.16)",
                }}
              >
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <h2 className="text-base md:text-lg mb-3 md:mb-4 font-semibold">
                      Appointments
                    </h2>
                    <p className="text-[#817C7C] text-xs mb-2 md:mb-7">
                      Number of appointments scheduled in this week
                    </p>
                    <h1 className="text-[44px] font-semibold">05</h1>
                  </div>
                  <Link
                    href={`/appointement/${profile}`}
                    className="text-[#F54040] flex items-center gap-1.5 w-fit text-xs xsm:text-base"
                  >
                    Go to Appointments <HiArrowRight />
                  </Link>
                </div>
              </div> */}

              {/* Get Device  */}
              {/* <div
                className="p-4 md:p-5 rounded-lg flex flex-col items-center"
                style={{
                  boxShadow: "0px 2px 16px 1px rgba(171, 181, 217, 0.16)",
                }}
              >
                <img
                  width={200}
                  height={120}
                  src={tapopcard}
                  className="lg:pb-4"
                  alt=""
                />
                <h2 className="text-base font-semibold mb-1">Get Devices</h2>
                <p className="text-sm text-[#817C7C] mb-5 md:mb-[18px]">
                  Don’t have any devices?
                </p>
                <PrimaryButton2
                  text={"Get Device"}
                  onClick={() => {
                    navigate.push(`/products`);
                  }}
                />
              </div> */}
            </div>
          </div>

          {/* Iphone div  */}
          {windowHeight > 590 && isComponentRendered && (
            <div className="overflow-scroll">
              <Iphone
                usedIn="dashboard"
                toggleStates={toggleStates}
                profile={profile}
                template={type}
                dummyState={dummyState}
                templateName={activeTemplateName}
                backgroundColor={backgroundColor}
                buttonStyle={buttonStyle}
                buttonColor={buttonColor}
                fontColor={fontColor}
                color1={color1}
                color2={color2}
                bgImage={bgImage}
                data={{
                  username: profile,
                  templateId: type,
                  dummyData: dummyData,
                  name: name,
                  firstName: firstName,
                  lastName: lastName,
                  email: email1,
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
            </div>
          )}
          {screenWidth < 1280 && (
            <div
              className="fixed w-fit left-[50%] md:left-[62%] flex justify-center xl:hidden"
              style={{
                zIndex: "50",
                bottom: "2%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <button
                onClick={() => setShowPreview(true)}
                type="button"
                style={{ border: "2px solid #0000001a" }}
                className="bg-white  font-medium flex justify-center items-center  text-base py-[12px] px-[24px] h-[38px] sm:h-[45px]
                  shadow-[_0px_4px_20px_1px_rgba(_171,_181,_217,_0.16)] rounded-[64px]"
              >
                <span className="mr-[8px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M1.69654 10.2687C1.63897 10.0959 1.63891 9.90895 1.69638 9.73619C2.85335 6.2581 6.13423 3.75 10.0009 3.75C13.8658 3.75 17.1454 6.25577 18.3038 9.73134C18.3614 9.90406 18.3615 10.0911 18.304 10.2638C17.147 13.7419 13.8661 16.25 9.99946 16.25C6.13457 16.25 2.85494 13.7442 1.69654 10.2687Z"
                      stroke="url(#paint0_linear_2219_60606)"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M12.5002 10C12.5002 11.3807 11.381 12.5 10.0002 12.5C8.61953 12.5 7.50024 11.3807 7.50024 10C7.50024 8.61929 8.61953 7.5 10.0002 7.5C11.381 7.5 12.5002 8.61929 12.5002 10Z"
                      stroke="url(#paint1_linear_2219_60606)"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_2219_60606"
                        x1="18.3471"
                        y1="16.25"
                        x2="-0.410326"
                        y2="9.40511"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#FB6609" />
                        <stop offset="1" stop-color="#E40849" />
                      </linearGradient>
                      <linearGradient
                        id="paint1_linear_2219_60606"
                        x1="18.3471"
                        y1="16.25"
                        x2="-0.410326"
                        y2="9.40511"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#FB6609" />
                        <stop offset="1" stop-color="#E40849" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
                <p className="add-icon">Preview</p>
              </button>
            </div>
          )}
          {/* Preview section  */}
          <Preview
            open={showPreview}
            setShowPreview={setShowPreview}
            template={type}
            templateType={activeTemplateName}
            backgroundColor={backgroundColor}
            buttonStyle={buttonStyle}
            buttonColor={buttonColor}
            color1={color1}
            color2={color2}
            bgImage={bgImage}
            data={{
              username: profile,
              templateId: type,
              dummyData: dummyData,
              name: name,
              firstName: firstName,
              lastName: lastName,
              email: email1,
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
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
