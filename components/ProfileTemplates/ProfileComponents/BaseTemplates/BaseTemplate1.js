import React, { useContext, useEffect, useRef, useState } from "react";
import Hero from "../Hero/Hero";
import Apps from "../Apps/Apps";
import Products from "../Products/Products";
import Services from "../Services/Services";
import Appointments from "../Appoinments/Appointments";
import Gallery from "../Gallery/Gallery";
import Videos from "../Videos/Videos";
import ContactBtn from "../ContactUs/ContactBtn";
import Reviews from "../Reviews/Reviews";
import BusinessHours from "../BusinessHours/BusinessHours";
import Bottom from "../../template1/Bottom";
import ButtonFunction from "../../template1/modals/ButtonFunction";
import ExchangeContactModal from "../../template1/modals/ExchangeContactModal";
import ContactDetails from "../../template1/modals/ContactDetails";
import ShareModal from "../../template1/modals/ShareModal";
import ReviewModal from "../../template1/modals/ReviewModal";
import AppointmentModal from "../../template1/modals/AppointmentModal";
import Toast from "../../../UiComponents/Toast";
import NewModal from "../../../UiComponents/NewModal/NewModal";
import ProductModalContent from "../ModalContent/ProductModalContent";
import AppointConfirm from "../AppointmentModal/AppointConfirm";
import { RiShareBoxFill } from "react-icons/ri";
import { HiOutlineX } from "react-icons/hi";
import Resources from "../Resources/Resources";
import ShareModalDownload from "../../template1/modals/ShareModalDownload";
import { UserContext } from "@/components/Contexts/context";
import ServiceModalContent from "../ModalContent/ServiceModalContent";
import axios from "axios";
import { serverUrl } from "@/config";
import GoogleReviewModal from "../../template1/modals/GoogleReviewModal";
import GoogleReviewFeedbackModal from "../../template1/modals/GoogleReviewFeedbackModal";
// import dynamic from "next/dynamic";
// const Resources = dynamic(() => import("../Resources/Resources"), {
//   ssr: false,
// });

const BaseTemplate1 = (props) => {
  const {
    dummyState,
    setDummyState,
    quickSelectContext,
    leadCaptureContext,
    userType,
  } = useContext(UserContext);
  // console.log(props);
  // console.log("B1");
  const [windowWidth, setWindowWidth] = useState(0);
  useEffect(() => {
    // Update the windowWidth state when the window is resized
    setWindowWidth(window.innerWidth);
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  // all profile data
  const data = props.data;
  const type = props.btntype;
  // console.log(type);

  // check data inside profile template is dummy or not
  const dummyData =
    data !== undefined
      ? data.dummyData !== undefined
        ? data.dummyData
        : true
      : true;
  const disable = props.disable;

  // Template is from redirect or not (for analytics)
  const fromRedirect =
    data !== undefined && data.fromRedirect !== undefined
      ? data.fromRedirect
      : false;

  const logoSwitch = data !== undefined ? data.logoSwitch : false;

  // Template Ref & It's Position
  const templateRef = useRef(null);
  const [templatePosition, setTemplatePosition] = useState(0);
  useEffect(() => {
    if (templateRef.current) {
      setTemplatePosition(templateRef.current.getBoundingClientRect());
    }
  }, []);

  const [QRdownload, setQRdownload] = useState(false);

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

  // check template is square in design
  const square = props.square;

  // Refrences of all the components
  const productsRef = useRef(null);
  const servicesRef = useRef(null);
  const appointmentsRef = useRef(null);
  const galleryRef = useRef(null);
  const videosRef = useRef(null);
  const resourcesRef = useRef(null);
  const businessHoursRef = useRef(null);
  const reviewsRef = useRef(null);

  const refrences = {
    productsRef: productsRef,
    servicesRef: servicesRef,
    appointmentsRef: appointmentsRef,
    galleryRef: galleryRef,
    videosRef: videosRef,
    resourcesRef: resourcesRef,
    businessHoursRef: businessHoursRef,
    reviewsRef: reviewsRef,
  };

  // Button Component Styling
  const buttonStyle = props.buttonStyle;
  const modalButtonStyle = buttonStyle.concat(" w-full h-[50px]");
  const reviewStarDivbg = props.reviewStarDivbg;

  // Heading Component
  const Heading = props.Heading;

  // Profile Data of User
  const username =
    data !== undefined && data.username !== undefined ? data.username : "";
  const firstName = dummyData ? "Ester" : data.firstName;
  const lastName = dummyData ? "Howard" : data.lastName;
  const fullName = firstName + " " + lastName;
  const profilePic =
    dummyData || data.pimage === ""
      ? require("../../images/image12.jpg").default.src
      : data.pimage;
  const jobTitle = dummyData ? "Digital Product Designer" : data.jobTitle;
  const jobDescription = dummyData
    ? "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, to"
    : data.jobDescription;
  const companyName = dummyData ? "Qviq" : data.companyName;
  const email = dummyData ? "" : data.email;
  const mobileNumber = dummyData ? "" : data.mobileNumber;
  const newMobileNumber = dummyData ? "" : data.newMobileNumber;
  const mobileVisibility= dummyData? false : data.mobileVisibility
  const templateId =
    data !== undefined && data.templateId !== undefined ? data.templateId : "";
  const [leadCapture, setLeadCapture] = useState(
    data !== undefined && data.leadCapture !== undefined
      ? data.leadCapture
      : false
  );
  const [quickSelect, setQuickSelect] = useState(
    data !== undefined && data.quickSelect !== undefined
      ? data.quickSelect
      : false
  );

  useEffect(() => {
    setLeadCapture(
      data !== undefined && data.leadCapture !== undefined
        ? data.leadCapture
        : false
    );
    setQuickSelect(
      data !== undefined && data.quickSelect !== undefined
        ? data.quickSelect
        : false
    );
  }, [data]);

  // Hero Section
  const heroStyle = props.heroStyle;
  const heroProfile = React.cloneElement(props.HeroProfile, {
    firstName: firstName,
    lastName: lastName,
    profilePic: profilePic,
  });
  const heroData = {
    jobTitle: jobTitle,
    jobDescription: jobDescription,
    companyName: companyName,
    email: email,
    mobileNumber: mobileNumber,
    newMobileNumber: newMobileNumber,
  };

  const [userName , setUserName] = useState(props.username)

  // Apps Section
  const appsObj = dummyData
    ? {
        social: [
          {
            platform: "Facebook",
            header: "app",
            link: "",
          },
          {
            platform: "Whatsapp",
            header: "app",
            link: "",
          },
          {
            platform: "Telegram",
            header: "app",
            link: "",
          },
          {
            platform: "Amazon",
            header: "app",
            link: "",
          },
          {
            platform: "Gaana",
            header: "app",
            link: "",
          },
          {
            platform: "Spotify",
            header: "app",
            link: "",
          },
          {
            platform: "Amazon Music",
            header: "app",
            link: "",
          },
          {
            platform: "Amazon Pay",
            header: "app",
            link: "",
          },
          {
            platform: "Paytm",
            header: "app",
            link: "",
          },
        ],
      }
    : data.apps;

  const appsArrTemp =
    appsObj !== undefined ? Object.values(appsObj).flat() : [];

  const customLinks = dummyData
    ? [
        {
          customLinkImage: "https://loremflickr.com/720/720/face",
          label: "Link title goes here",
          websiteUrl: "",
        },
        {
          customLinkImage: "https://loremflickr.com/720/720/product",
          label: "Link title goes here. This is a multi-line title",
          websiteUrl: "",
        },
        {
          customLinkImage: "https://loremflickr.com/720/720/flower",
          label: "Link title goes here",
          websiteUrl: "",
        },
        {
          label: "Link title goes here",
        },
      ]
    : data !== undefined
    ? data.customLinks !== undefined
      ? data.customLinks
      : []
    : [];

  const appsArr = [...appsArrTemp];

  const appsStyle = props.appsStyle;

  // scroll button style for overflow scroll
  const scrollBtn = {
    style: {
      width: "64px",
      height: "64px",
      border: `2px solid ${reviewStarDivbg}`,
      fontSize: "28px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    leftPosition: {
      left: templatePosition.width > 1182 ? "-28px" : "0",
      top: "50%",
      transform: "translateY(-50%)",
    },
    rightPosition: {
      right: templatePosition.width > 1182 ? "-28px" : "0",
      top: "50%",
      transform: "translateY(-50%)",
    },
  };

  // Products Section
  const [openProductModal, setOpenProductModal] = useState(false);
  const [openedProduct, setOpenedProduct] = useState({});
  const [productImgArr, setProductImgArr] = useState([]);

  const templatebg = props.templatebg;

  const productSwitch = dummyData
    ? true
    : data !== undefined
    ? data.productSwitch !== undefined
      ? data.productSwitch
      : false
    : false;
  const productLabel = dummyData
    ? "Products"
    : data !== undefined
    ? data.productLabel !== undefined
      ? data.productLabel
      : "Products"
    : "Products";
  const productArr = dummyData
    ? [
        {
          productName: "Product name goes here. It can be a two line text",
          image: require("../../images/image1.jpg").default.src,
          productPrice: 299,
          productButton: true,
          label: "Buy Now",
        },
        {
          productName: "Product name goes here. It can be a two line text",
          image: require("../../images/image1.jpg").default.src,
          productPrice: 299,
          productButton: true,
          label: "Buy Now",
        },
        {
          productName: "Product name goes here. It can be a two line text",
          image: require("../../images/image1.jpg").default.src,
          productPrice: 299,
          productButton: true,
          label: "Buy Now",
        },
        {
          productName: "Product name goes here. It can be a two line text",
          image: require("../../images/image1.jpg").default.src,
          productPrice: 299,
          productButton: true,
          label: "Buy Now",
        },
        {
          productName: "Product name goes here. It can be a two line text",
          image: require("../../images/image1.jpg").default.src,
          productPrice: 299,
          productButton: true,
          label: "Buy Now",
        },
      ]
    : data.products || [];

  const productStyle = props.productStyle;

  // Services Section
  const [openServiceModal, setOpenServiceModal] = useState(false);
  const [openedService, setOpenedService] = useState({});
  const [serviceImgArr, setServiceImgArr] = useState([]);
  const serviceSwitch = dummyData
    ? true
    : data !== undefined
    ? data.serviceSwitch !== undefined
      ? data.serviceSwitch
      : false
    : false;
  const serviceLabel = dummyData
    ? "Services"
    : data !== undefined
    ? data.serviceLabel !== undefined
      ? data.serviceLabel
      : "Services"
    : "Services";
  const serviceArr = dummyData
    ? [
        {
          serviceName: "Service 1",
          image: require("../../images/image1.jpg").default.src,
          serviceDescription:
            "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, to",
        },
        {
          serviceName: "Service 2",
          image: require("../../images/image2.jpg").default.src,
          serviceDescription:
            "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, to",
        },
        {
          serviceName: "Service 3",
          image: require("../../images/image1.jpg").default.src,
          serviceDescription:
            "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, to",
        },
        {
          serviceName: "Service 4",
          image: require("../../images/image2.jpg").default.src,
          serviceDescription:
            "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, to",
        },
        {
          serviceName: "Service 5",
          image: require("../../images/image1.jpg").default.src,
          serviceDescription:
            "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, to",
        },
      ]
    : data.services || [];

  const serviceStyle = props.serviceStyle;

  // console.log(data);
  // console.log(props.type);
  //Appointments Section
  // const showAppointments = false;
  const availabilitySwitch = dummyData
    ? true
    : data !== undefined
    ? data.availabilitySwitch !== undefined
      ? data.availabilitySwitch
      : false
    : false;

  const availabilityLabel = dummyData
    ? "Appointments"
    : data !== undefined
    ? data.availabilityLabel !== undefined
      ? data.availabilityLabel
      : "Appointments"
    : "Appointments";

  const availabilityArr = dummyData ? [] : data.availability || [];
  const appointmentsStyle = props.appointmentsStyle;

  // Gallery Section
  const galleryArr = dummyData
    ? [
        {
          image:
            "https://firebasestorage.googleapis.com/v0/b/tapop-84999.appspot.com/o/images%2F8045742%20-%20Copy%20-%20Copy.jpg?alt=media&token=f9acb84b-6dcd-49ff-b65d-7a2dfdbd0968",
        },
        {
          image:
            "https://firebasestorage.googleapis.com/v0/b/tapop-84999.appspot.com/o/images%2F8045742%20-%20Copy%20-%20Copy.jpg?alt=media&token=f9acb84b-6dcd-49ff-b65d-7a2dfdbd0968",
        },
      ]
    : data.images || [];

  const galleryStyle = props.galleryStyle;

  // Videos Section
  const videosArr = dummyData
    ? [
        {
          label: "Video 1",
          link: "",
        },
        {
          label: "Video 2",
          link: "",
        },
      ]
    : data.videos || [];

  const videosStyle = props.videosStyle;

  // Resources Section
  const resourcesArr = dummyData
    ? [
        {
          docs: "",
          pdfname: "Dummy File.pdf",
        },
        {
          docs: "",
          pdfname: "Dummy File 2.pdf",
        },
      ]
    : data.pdfs || [];

  const resourceStyle = props.resourceStyle;

  // Business Hours Section
  const businessHoursSwitch = dummyData
    ? true
    : data !== undefined
    ? data.businessHoursSwitch !== undefined
      ? data.businessHoursSwitch
      : false
    : false;
  const businessHoursLabel = dummyData
    ? "Business Hours"
    : data !== undefined
    ? data.businessHoursLabel !== undefined
      ? data.businessHoursLabel
      : "Business Hours"
    : "Business Hours";
  const businessHoursArr = dummyData
    ? // ? [
      //     { Mon: "9:00 AM - 5:00 PM" },
      //     { Tue: "9:00 AM - 5:00 PM" },
      //     { Wed: "9:00 AM - 5:00 PM" },
      //     { Thu: "9:00 AM - 5:00 PM" },
      //     { Fri: "9:00 AM - 5:00 PM" },
      //     { Sat: "Closed" },
      //     { Sun: "Closed" },
      //   ]
      [
        {
          businessHours: {
            monday: { checked: true, timer1: "12:00 AM", timer2: "5:00 AM" },
            tuesday: { checked: true, timer1: "12:00 AM", timer2: "5:00 AM" },
            wednesday: { checked: true, timer1: "12:00 AM", timer2: "5:00 AM" },
            thursday: { checked: true, timer1: "12:00 AM", timer2: "5:00 AM" },
            friday: { checked: true, timer1: "12:00 AM", timer2: "5:00 AM" },
            saturday: { checked: true, timer1: "12:00 AM", timer2: "5:00 AM" },
            sunday: { checked: true, timer1: "12:00 AM", timer2: "5:00 AM" },
          },
        },
      ]
    : data.businessHours || [];
  const businessHoursStyle = props.businessHoursStyle;

  // console.log(businessHoursArr);
  // Reviews Section
  const reviewSwitch = dummyData
    ? true
    : data !== undefined
    ? data.reviewSwitch !== undefined
      ? data.reviewSwitch
      : false
    : false;
  const reviewButtonSwitch = dummyData
    ? true
    : data !== undefined
    ? data.reviewButtonSwitch !== undefined
      ? data.reviewButtonSwitch
      : false
    : false;
  const reviewLabel = dummyData
    ? "Reviews"
    : data !== undefined
    ? data.reviewLabel !== undefined
      ? data.reviewLabel
      : "Reviews"
    : "Reviews";
  const reviewsArr = dummyData
    ? [
        {
          name: "Jasper Sloan",
          review:
            "Al-Balad is essentially Jeddah old town. It was once surrounded by a wall, but now only the gates re. Al-Balad is essentially Jeddah old town. It was once surrounded by a wall, but now only the gates re",
          image: require("../../images/image1.jpg").default.src,
          rating: 5,
        },
        {
          name: "Jasper Sloan",
          review:
            "Al-Balad is essentially Jeddah old town. It was once surrounded by a wall, but now only the gates re. Al-Balad is essentially Jeddah old town. It was once surrounded by a wall, but now only the gates re",
          image: require("../../images/image2.jpg").default.src,
          rating: 4.5,
        },
        {
          name: "Jasper Sloan",
          review:
            "Al-Balad is essentially Jeddah old town. It was once surrounded by a wall, but now only the gates re. Al-Balad is essentially Jeddah old town. It was once surrounded by a wall, but now only the gates re",
          image: require("../../images/image2.jpg").default.src,
          rating: 4,
        },
        {
          name: "Jasper Sloan",
          review:
            "Al-Balad is essentially Jeddah old town. It was once surrounded by a wall, but now only the gates re. Al-Balad is essentially Jeddah old town. It was once surrounded by a wall, but now only the gates re",
          image: require("../../images/image2.jpg").default.src,
          rating: 3.5,
        },
      ]
    : data.reviews || [];

  const reviewStyle = props.reviewStyle;

  // Contact Us Button
  const contactBtnStyle = props.contactBtnStyle;
  const innerBtnStyle = props.innerBtnStyle;
  const closeBtnStyle = props.closeBtnStyle;

  // Modals Style
  const modalStyle = props.modalStyle;
  const appointmentActiveBg = props.appointmentActiveBg;
  const appointmentInactiveBg = props.appointmentInactiveBg;
  const appointmentDiv = props.appointmentDiv;

  // Different Modals States
  const [contactOpen, setContactOpen] = useState(false);
  const [exchangeContactOpen, setExchangeContactOpen] = useState(leadCapture);
  const [contactDetailsOpen, setContactDetailsOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [shareSpecificOpen, setShareSpecificOpen] = useState(false);
  const [shareSpecific, setShareSpecific] = useState("");
  const [reviewOpen, setReviewOpen] = useState(false);
  const [googlereviewOpen, setgoogleReviewOpen] = useState(false);
   const [openGoogleFeedback, setOpenGoogleFeedback] = useState(false)
   const [value, setValue] = useState(0);
  const [appointmentOpen, setAppointmentOpen] = useState(false);

  // Appointment modal
  const [appointToastMsg, setAppointToastMsg] = useState(false);
  const [appointName, setAppointName] = useState("XXXX-XXXX");
  const [appointDate, setAppointDate] = useState("XXXX-XXXX");
  const [appointTime, setAppointTime] = useState("XXXX-XXXX");
  const [appointPhone, setAppointPhone] = useState("XXXX-XXXX");
  const [appointEmail, setAppointEmail] = useState("XXXX-XXXX");

  // Toast States and Style
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const toastStyle = props.toastStyle;

  // data for heading of different sections
  const headingData = {
    productLabel: productLabel,
    serviceLabel: serviceLabel,
    products: productSwitch && productArr.length !== 0,
    services: serviceSwitch && serviceArr.length !== 0,
    // appointments: showAppointments,
    // appointments:
    //   availabilitySwitch &&
    //   availabilityArr &&
    //   availabilityArr &&
    //   availabilityArr.length !== 0,
    // availabilityLabel: availabilityLabel,
    gallery: galleryArr.length !== 0,
    videos: videosArr.length !== 0,
    resources: resourcesArr.length !== 0,
    businessHoursLabel: businessHoursLabel,
    reviewLabel: reviewLabel,
    businessHours: businessHoursSwitch && businessHoursArr.length !== 0,
    reviews: reviewsArr.length !== 0,
  };

  // Contact Detail popup
  const [showEmail, setShowEmail] = useState(false);
  const [showMobile, setShowMobile] = useState(false);

  const handleEscPress = (event) => {
    if (event.key === "Escape") {
      setContactOpen(false);
      setExchangeContactOpen(false);
      setContactDetailsOpen(false);
      setShareOpen(false);
      setReviewOpen(false);
      setgoogleReviewOpen(false)
      setAppointmentOpen(false);
      setOpenProductModal(false);
    }
  };

  const handleShareSpecific = (label) => {
    setShareSpecificOpen(true);
    setShareSpecific(label);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleEscPress);

    return () => {
      window.removeEventListener("keydown", handleEscPress);
    };
  }, []);

   // updating analytics
   const updateAnalytics = async (label) => {
    if (templateId !== undefined && username !== undefined) {
        if (templateId !== '' && username !== '') {
            const ipResponse = await axios.get("https://ipapi.co/json/");
            const ipData = ipResponse.data;
            await axios.post(`${serverUrl}/analytics/${templateId}/${username}/${label}`,
            { 
                profile: username,
                country: ipData.country_name,
                countryCode: ipData.country_code,
            });
        }
    }
}

    // Google review qr open modal 
  useEffect(() => {
  if (props.qrGoogle  && !dummyData && !disable) {
    setgoogleReviewOpen(true);
  }
}, [props.qrGoogle, dummyData, disable]);

  return (
    <div
      className="w-full min-h-full flex flex-col items-center justify-center "
      ref={templateRef}
    >
      {!dummyData && quickSelect && appsArr.length !== 0 ? (
        <div className="w-full min-h-full flex justify-center items-center bg-white">
          {appsArr[0].header === "app" ? (
            <img
              src={
                require(`../../../Logos/TemplateLogos/ColoredIcons/${appsArr[0].platform
                  .toLowerCase()
                  .split(" ")
                  .join("")}.svg`).default.src
              }
              title={appsArr[0].link + appsArr[0].userName}
              onClick={() => {
                window.open(appsArr[0].link + appsArr[0].userName, "_blank");
              }}
              className="w-40 h-40 object-contain hover:cursor-pointer active:scale-95 duration-150"
            />
          ) : (
            <img
              src={getImgUrl(appsArr[0].websiteUrl)}
              title={appsArr[0].websiteUrl}
              onClick={() => {
                window.open(appsArr[0].websiteUrl, "_blank");
              }}
              className="w-40 h-40 object-contain hover:cursor-pointer active:scale-95 duration-150"
            />
          )}
        </div>
      ) : (
        <>
          <Hero
            style={heroStyle}
            refrences={refrences}
            headingData={headingData}
            heroProfile={heroProfile}
            heroData={heroData}
            dummy={dummyData}
            setShowEmail={setShowEmail}
            setShowMobile={setShowMobile}
            setShowContact={setContactDetailsOpen}
          />
          <div
            className="w-full flex flex-row justify-center pb-[20px]"
            style={{
              backgroundColor: heroStyle.background,
            }}
          >
            <ContactBtn
              style={contactBtnStyle}
              position={templatePosition}
              type={type}
              onClick={() => {
                setContactOpen(true);
              }}
            />
          </div>
          {appsArr.length !== 0 && (
            <Apps
              data={appsArr}
              style={appsStyle}
              position={templatePosition}
              dummy={dummyData}
              templateId={templateId}
              username={username}
              fromRedirect={fromRedirect}
            />
          )}
          <div
            className="flex flex-col gap-[72px] pt-[72px] w-full"
            style={{ background: templatebg }}
          >
            {customLinks.length != 0 && (
              <div className="px-[121px] flex flex-col justify-start items-center gap-[16px]">
                {customLinks.map((site, index) => {
                  return dummyData ? (
                    site.customLinkImage ? (
                      <div
                        className= {`min-h-[56px] w-[100%] min-w-[320px] ${site.isChecked && site.animation} p-[12px] bg-white flex flex-row justify-start items-center gap-[12px]`}
                        style={{
                          ...props.customLinkStyle.linkBg,
                          objectFit: "cover",
                          cursor: "pointer",
                        }}
                        key={index}
                      >
                        <img
                          src={
                            site.customLinkImage &&
                            site.customLinkImage !== "null"
                              ? site.customLinkImage
                              : getImgUrl(site.websiteUrl)
                          }
                          className="w-[32px] h-[32px] object-contain"
                          style={props.customLinkStyle.linkImg}
                        />
                        <p className="text-[16px] font-[500]">{site.label}</p>
                      </div>
                    ) : (
                      <div
                        className=" min-h-[56px] w-[100%] min-w-[320px] p-[12px] bg-white flex flex-row justify-center items-center gap-[12px]"
                        style={{
                          ...props.customLinkStyle.linkBg,
                          objectFit: "cover",
                          cursor: "pointer",
                        }}
                        key={index}
                      >
                        <p className="text-[16px] font-[500]">{site.label}</p>
                      </div>
                    )
                  ) : (
                    <div
                      className={`min-h-[56px] ${site.isChecked && site.animation} w-[100%] min-w-[320px] p-[12px] bg-white flex flex-row justify-start items-center gap-[12px]`}
                      style={{
                        ...props.customLinkStyle.linkBg,
                        objectFit: "cover",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        updateAnalytics(site.label)
                        window.open(site.websiteUrl, "_blank");
                      }}
                      key={index}
                    >
                      <img
                        src={
                          site.customLinkImage &&
                          site.customLinkImage !== "null"
                            ? site.customLinkImage
                            : getImgUrl(site.websiteUrl)
                        }
                        className="w-[32px] h-[32px] object-contain"
                        style={props.customLinkStyle.linkImg}
                      />
                      <p
                        className={`text-[16px] font-[500] ${props.customLinkStyle.linkFont}`}
                      >
                        {site.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}

            {((productSwitch && productArr.length !== 0) ||
              (serviceSwitch && serviceArr.length !== 0)) && (
              <div
                className="w-full px-4 xl:px-0 flex justify-center"
                style={{ background: templatebg }}
              >
                <div className="max-w-[1182px] w-full flex flex-col gap-[72px]">
                  {productSwitch && productArr.length !== 0 && (
                    <div ref={productsRef} id="products">
                      {/* <div className="w-full text-left">
                        <button className="float-end" onClick={()=>handleShareSpecific("products")}><RiShareBoxFill /></button>
                      </div> */}
                      <Products
                        setOpenedProduct={setOpenedProduct}
                        setOpenProductModal={setOpenProductModal}
                        setProductImgArr={setProductImgArr}
                        data={productArr}
                        heading={<Heading title={productLabel} />}
                        scrollBtn={scrollBtn}
                        buttonStyle={buttonStyle}
                        style={productStyle}
                        templateId={templateId}
                        username={username}
                      />
                    </div>
                  )}
                  {serviceSwitch && serviceArr.length !== 0 && (
                    <div ref={servicesRef} id="services">
                      {/* <div className="w-full text-left">
                        <button className="float-end" onClick={()=>handleShareSpecific("services")}><RiShareBoxFill /></button>
                      </div> */}
                      <Services
                       setOpenServiceModal={setOpenServiceModal}
                       setOpenedService = {setOpenedService}
                       setServiceImgArr = {setServiceImgArr}
                       buttonStyle={buttonStyle}
                        data={serviceArr}
                        heading={<Heading title={serviceLabel} />}
                        scrollBtn={scrollBtn}
                        style={serviceStyle}
                        templateId={templateId}
                        username={username}
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* {availabilitySwitch &&
              availabilityArr &&
              availabilityArr &&
              availabilityArr.length !== 0 && (
                <div className="w-full" ref={appointmentsRef} id="appointments">
                  <div className="w-full text-left">
                    <button
                      className="float-end"
                      onClick={() => handleShareSpecific("appointments")}
                    >
                      <RiShareBoxFill />
                    </button>
                  </div>

                  <Appointments
                    style={appointmentsStyle}
                    buttonStyle={buttonStyle.concat(` ${props.appointmentBtn}`)}
                    starFill={businessHoursStyle.star.fill}
                    position={templatePosition}
                    onClick={() => {
                      !dummyData && !disable && setAppointmentOpen(true);
                      console.log(data.availability);
                    }}
                  />
                </div>
              )} */}

            {availabilitySwitch &&
              availabilityArr &&
              availabilityArr &&
              availabilityArr.length !== 0 && (
                <div className="w-full" ref={appointmentsRef} id="appointments">
                  <Appointments
                    style={appointmentsStyle}
                    buttonStyle={buttonStyle.concat(` ${props.appointmentBtn}`)}
                    starFill={businessHoursStyle.star.fill}
                    position={templatePosition}
                    onClick={() => {
                      !dummyData && !disable && setAppointmentOpen(true);
                    }}
                  />
                </div>
              )}

            <div
              className="w-full pb-6 px-4 xl:px-0 flex justify-center"
              style={{ background: templatebg }}
            >
              <div className="max-w-[1182px] w-full flex flex-col gap-[72px]">
                {galleryArr.length !== 0 && (
                  <div ref={galleryRef} id="gallery">
                    {/* <div className="w-full text-left">
                      <button className="float-end" onClick={()=>handleShareSpecific("gallery")}><RiShareBoxFill /></button>
                    </div> */}
                    <Gallery
                      data={galleryArr}
                      heading={<Heading title={"Gallery"} />}
                      style={galleryStyle}
                      dummy={dummyData}
                      scrollBtn={scrollBtn}
                      templateId={templateId}
                      username={username}
                    />
                  </div>
                )}
                {videosArr.length !== 0 && (
                  <div ref={videosRef} id="videos">
                    {/* <div className="w-full text-left">
                      <button className="float-end" onClick={()=>handleShareSpecific("videos")}><RiShareBoxFill /></button>
                    </div> */}
                    <Videos
                      data={videosArr}
                      heading={<Heading title={"Videos"} />}
                      style={videosStyle}
                      scrollBtn={scrollBtn}
                      dummy={dummyData}
                      templateId={templateId}
                      username={username}
                    />
                  </div>
                )}
                {resourcesArr.length !== 0 && (
                  <div ref={resourcesRef} id="resources">
                    {/* <div className="w-full text-left">
                      <button className="float-end" onClick={()=>handleShareSpecific("resources")}><RiShareBoxFill /></button>
                    </div> */}
                    <Resources
                      data={resourcesArr}
                      heading={<Heading title={"Resources"} />}
                      style={resourceStyle}
                      scrollBtn={scrollBtn}
                      dummy={dummyData}
                      templateId={templateId}
                      username={username}
                    />
                  </div>
                )}
                {businessHoursSwitch && businessHoursArr.length !== 0 && Object.values(businessHoursArr[0].businessHours).some(day => day.checked) && (
                  <div ref={businessHoursRef} id="businesshours">
                    {/* <div className="w-full text-left">
                      <button className="float-end" onClick={()=>handleShareSpecific("businesshours")}><RiShareBoxFill /></button>
                    </div> */}
                    <BusinessHours
                      data={businessHoursArr}
                      heading={businessHoursLabel}
                      style={businessHoursStyle}
                      position={templatePosition}
                    />
                  </div>
                )}

                <div ref={reviewsRef} id="reviews">
                  {/* <div className="w-full text-left">
                    <button className="float-end" onClick={()=>handleShareSpecific("reviews")}><RiShareBoxFill /></button>
                  </div> */}
                  {/* {console.log(data) } */}
                  <Reviews
                    data={reviewsArr}
                    heading={<Heading title={reviewLabel} />}
                    style={reviewStyle}
                    buttonStyle={buttonStyle}
                    scrollBtn={scrollBtn}
                    reviewButtonSwitch={reviewButtonSwitch}
                    // reviewSwitch={reviewSwitch}
                    googleReviewButtonSwitch={data?.googleReviewButtonSwitch}
                    setgoogleReviewOpen={setgoogleReviewOpen}
                    length={reviewsArr.length}
                    onClick={() => {
                      !dummyData && !disable && setReviewOpen(true);
                    }}
                  />
                </div>

                <Bottom
                  style={props.bottomStyle}
                  logoSwitch={logoSwitch}
                  buttonStyle={buttonStyle.concat(" min-w-fit")}
                  position={templatePosition}
                  dummy={dummyData}
                />
              </div>
            </div>
          </div>

          {/* Modals */}
          {openProductModal && (
            <NewModal
              onModal={openProductModal}
              onClick={setOpenProductModal}
              text={"Product Details"}
              children={
                <ProductModalContent
                  openedProduct={openedProduct}
                  productImgArr={productImgArr}
                />
              }
            />
          )}
           {/* service modal */}
           {openServiceModal && (
              <NewModal
                onModal={openServiceModal}
                onClick={setOpenServiceModal}
                text={"Service Details"}
                children={
                  <ServiceModalContent
                    openedService={openedService}
                    serviceImgArr={serviceImgArr}
                  />
                }
              />
            )}
          {!disable && contactOpen && (
            <ButtonFunction
              setShowModal4={setContactOpen}
              setShowModal2={setExchangeContactOpen}
              setShowModal5={setContactDetailsOpen}
              setShowModal1={setShareOpen}
              showModal2={exchangeContactOpen}
              showModal5={contactDetailsOpen}
              showModal1={shareOpen}
              name={fullName}
              mobileNumber={mobileNumber}
              email={email}
              buttonStyle={contactBtnStyle}
              innerBtn={innerBtnStyle}
              closeBtn={closeBtnStyle}
              setShowToast={setShowToast}
              setToastMessage={setToastMessage}
              setShowEmail={setShowEmail}
              setShowMobile={setShowMobile}
              profile={username}
              type={templateId}
              jobTitle={jobTitle}
              companyName={companyName}
              mobileVisibility={mobileVisibility}
            />
          )}
          {exchangeContactOpen && (
            <ExchangeContactModal
              username={username}
              setShowModal2={setExchangeContactOpen}
              buttonStyle={modalButtonStyle}
              modalStyle={modalStyle}
              setShowToast={setShowToast}
              setToastMessage={setToastMessage}
              square={square}
              leadCapture={leadCapture}
              setLeadCapture={setLeadCapture}
              profile={username}
              firstName={firstName}
              profileImage={profilePic}
              type={templateId}
              mobileNumber={mobileNumber}
            />
          )}
          {contactDetailsOpen && (
            <ContactDetails
              mobileNumber={mobileNumber}
              email={email}
              newMobileNumber={newMobileNumber}
              modalStyle={modalStyle}
              setShowModal5={setContactDetailsOpen}
              setShowToast={setShowToast}
              setToastMessage={setToastMessage}
              square={square}
              showEmail={showEmail}
              showMobile={showMobile}
              mobileVisibility={mobileVisibility}
            />
          )}
          {shareOpen && (
            <ShareModal
              usedIn="profile"
              username={username}
              profileImage={profilePic}
              firstName={firstName}
              setShowModal1={setShareOpen}
              type={templateId}
              buttonStyle={modalButtonStyle}
              modalStyle={modalStyle}
              setShowToast={setShowToast}
              setToastMessage={setToastMessage}
              setQRdownload={setQRdownload}
              square={square}
            />
          )}

          {QRdownload && (
            <ShareModalDownload
              QRdownload={QRdownload}
              username={username}
              usedIn="outsideTemplate"
              firstName={firstName}
              profileImage={profilePic}
              setShowModal1={setShareOpen}
              type={props.data.templateId}
              square={false}
              setQRdownload={setQRdownload}
              dummyState={dummyState}
            />
          )}
          {shareSpecificOpen && (
            <div className="container" style={{ zIndex: "998" }}>
              <div
                className="modal-wrapper bg-[#00000054] backdrop-blur-[20px]"
                style={{ zIndex: "998" }}
              ></div>
              <div
                className={`flex flex-col  bg-white fixed bottom-0 md:bottom-1/2 md:translate-y-1/2 left-1/2 -translate-x-1/2 h-fit max-h-[95vh] rounded-t-2xl md:rounded-2xl md:w-[600px] w-full p-2 ${props.modalStyle}`}
                style={{ zIndex: "998" }}
              >
                <div className="flex flex-col">
                  <div className="flex justify-between items-center px-3 py-4 xsm:px-5 md:pt-4 md:px-6 md:pb-0">
                    <p className=" md:text-xl text-[24px] font-bold">Share</p>
                    <span
                      className="text-2xl logo-fill"
                      style={{ cursor: "pointer", padding: "0" }}
                      onClick={() => setShareSpecificOpen(false)}
                    >
                      <HiOutlineX />
                    </span>
                  </div>
                  <div className="mx-3 xsm:mx-5 md:mx-6 h-full overflow-auto ">
                    <h2 className="text-[14px]  mb-3 font-medium xl:mt-8 mt-[15px]">
                      Copy your URL and share with anyone
                    </h2>
                    <div
                      className={`flex justify-between items-center h-fit break-all  bg-[#12121214] ${
                        props.square ? "rounded-[0px]" : "rounded-[8px]"
                      } px-1 [@media(min-width:300px)]:px-3 py-2.5 mb-6 md:mb-8`}
                    >
                      <p className="text-[12px] font-medium">
                        https://{username}.qviq.io?goto={shareSpecific}
                      </p>
                      <button
                        className="font-bold text-[14px] underline active:scale-90 duration-200"
                        onClick={() => {
                          navigator.clipboard.writeText(
                            `https://${username}.qviq.io?goto=${shareSpecific}`
                          );
                        }}
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {reviewOpen && (
            <ReviewModal
              username={username}
              setShowModal3={setReviewOpen}
              buttonStyle={modalButtonStyle}
              modalStyle={modalStyle}
              reviewStarDivbg={reviewStarDivbg}
              setShowToast={setShowToast}
              setToastMessage={setToastMessage}
              square={square}
            />
          )}
          {googlereviewOpen && (
            <GoogleReviewModal
              username={username}
              setShowModal3={setgoogleReviewOpen}
              buttonStyle={modalButtonStyle}
              modalStyle={modalStyle}
              reviewStarDivbg={reviewStarDivbg}
              setShowToast={setShowToast}
              setToastMessage={setToastMessage}
              square={square}
              setOpenGoogleFeedback={setOpenGoogleFeedback}
              setValue={setValue}
              value={value}
            />
          )}
          {openGoogleFeedback && (
            <GoogleReviewFeedbackModal
              username={username}
              setShowModal3={setOpenGoogleFeedback}
              buttonStyle={modalButtonStyle}
              modalStyle={modalStyle}
              reviewStarDivbg={reviewStarDivbg}
              setShowToast={setShowToast}
              setToastMessage={setToastMessage}
              square={square}
              value={value}
            />
          )}
  
          {appointToastMsg && (
            <AppointConfirm
              setAppointmentOpen={setAppointmentOpen}
              onModal={appointToastMsg}
              onClick={setAppointToastMsg}
              name={appointName}
              date={appointDate}
              time={appointTime}
              phone={appointPhone}
              email={appointEmail}
              userName={userName}
            />
          )}
          {appointmentOpen && (
            <AppointmentModal
              data={availabilityArr}
              label={availabilityLabel}
              type={data.templateId}
              profile={username}
              setShowModal={setAppointmentOpen}
              buttonStyle={modalButtonStyle}
              modalStyle={modalStyle}
              inactiveBg={appointmentInactiveBg}
              activeBg={appointmentActiveBg}
              appointmentDiv={appointmentDiv}
              setShowToast={setShowToast}
              setToastMessage={setToastMessage}
              square={square}
              email={email}
              mobileNumber={mobileNumber}
              setAppointToastMsg={setAppointToastMsg}
              setAppointName={setAppointName}
              setAppointDate={setAppointDate}
              setAppointTime={setAppointTime}
              setAppointPhone={setAppointPhone}
              setAppointEmail={setAppointEmail}
            />
          )}
          {showToast && (
            <div
              className="w-full flex justify-center items-center fixed bottom-10 left-0"
              style={{ zIndex: "999" }}
            >
              <Toast
                text={toastMessage}
                backgroundColor={toastStyle.bg}
                border={toastStyle.border}
                color={toastStyle.color}
                fontFamily={toastStyle.fontFamily}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BaseTemplate1;
