import React, { useContext, useEffect, useRef, useState } from "react";
import Apps from "../Apps/Apps";
import Products from "../Products/Products";
import Services from "../Services/Services";
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
import Toast from "../../../UiComponents/Toast";
import Hero2 from "../Hero/Hero2";
import Appointments2 from "../Appoinments/Appointments2";
import Gallery from "../Gallery/Gallery";
import Resources2 from "../Resources/Resources2";
import NewModal from "../../../UiComponents/NewModal/NewModal";
import ProductModalContent from "../ModalContent/ProductModalContent";
import AppointConfirm from "../AppointmentModal/AppointConfirm";
import { useSearchParams } from "next/navigation";
import { RiShareBoxFill } from "react-icons/ri";
import { HiOutlineX } from "react-icons/hi";
import Appointments from "../Appoinments/Appointments";
import AppointmentModal from "../../template1/modals/AppointmentModal";
import ShareModalDownload from "../../template1/modals/ShareModalDownload";
import { UserContext } from "@/components/Contexts/context";
import ServiceModalContent from "../ModalContent/ServiceModalContent";
import axios from "axios";
import { serverUrl } from "@/config";
import GoogleReviewFeedbackModal from "../../template1/modals/GoogleReviewFeedbackModal";
import GoogleReviewModal from "../../template1/modals/GoogleReviewModal";

function useDefaultProps(props) {
  let newProps = { ...props };
  Object.keys(newProps).forEach((key) =>
    newProps[key] === undefined ? delete newProps[key] : {}
  );
  return { ...defaultProps, ...newProps };
}
const BaseTemplate2 = (props) => {
  const {
    dummyState,
    setDummyState,
    quickSelectContext,
    leadCaptureContext,
    userType,
  } = useContext(UserContext);
  //console.log("B2");
  const [QRdownload, setQRdownload] = useState(false);
  props = useDefaultProps(props);
  // all profile data
  const data = props.data;
  const type = props.btntype;
  const [userName, setUserName] = useState(props.username);

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

  // main background color / image
  const mainbg = {
    background: `${props.mainbg.color} url(${props.mainbg.image}) no-repeat`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
  };

  // body section style (eg. product,services,appointment,etc)
  const bodyStyle = props.bodyStyle;
  const square = props.square;

  // Button Component Styling
  const buttonStyle = props.buttonStyle;
  const modalButtonStyle = buttonStyle.concat(" w-full h-[50px]");
  const reviewStarDivbg = props.reviewStarDivbg;

  // Heading Style
  const headingStyle = props.headingStyle;
  const activeHeadingElement = props.activeHeadingElement;

  // Profile Data of User
  const username =
    data !== undefined && data.username !== undefined ? data.username : "";
  const firstName = dummyData ? "Ester" : data.firstName;
  const lastName = dummyData ? "Howard" : data.lastName;
  const fullName = firstName + " " + (lastName !== undefined ? lastName : "");
  const profilePic =
    dummyData || data.pimage === ""
      ? require("../../images/image11.jpg").default.src
      : data.pimage;
  const jobTitle = dummyData ? "Digital Product Designer" : data.jobTitle;
  const jobDescription = dummyData
    ? "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, to"
    : data.jobDescription;
  const companyName = dummyData ? "Qviq" : data.companyName;
  const email = dummyData ? "" : data.email;
  const mobileNumber = dummyData ? "" : data.mobileNumber;
  const newMobileNumber = dummyData ? "" : data.newMobileNumber;
  const mobileVisibility = dummyData ? false : data.mobileVisibility;
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
  const herodata = {
    fullName: fullName,
    profilePic: profilePic,
    jobTitle: jobTitle,
    jobDescription: jobDescription,
    companyName: companyName,
    email: email,
    mobileNumber: mobileNumber,
    newMobileNumber: newMobileNumber,
  };

  const heroStyle = props.heroStyle;

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
      ...props.scrollBtnStyle,
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
  const [appointmentOpen, setAppointmentOpen] = useState(false);
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

  // Products and Services Switch
  const [proSerState, setProSerState] = useState(
    productSwitch ? "products" : "services"
  );
  useEffect(() => {
    setProSerState(productSwitch ? "products" : "services");
  }, [productSwitch, serviceSwitch]);

  //Appointments Section
  const [appBusState, setAppBusState] = useState("appointments");

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

  const availabilityArr = dummyData ? [] : data.availability;
  const appointmentsStyle = props.appointmentsStyle;
  //console.log(appointmentsStyle);

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
    ? [
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

  // Gallery and Videos Switch
  const [galVidState, setGalVidState] = useState(
    galleryArr.length !== 0 ? "gallery" : "videos"
  );
  useEffect(() => {
    setGalVidState(galleryArr.length !== 0 ? "gallery" : "videos");
  }, [galleryArr, videosArr]);

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
        {
          name: "Jasper Sloan",
          review:
            "Al-Balad is essentially Jeddah old town. It was once surrounded by a wall, but now only the gates re. Al-Balad is essentially Jeddah old town. It was once surrounded by a wall, but now only the gates re",
          image: require("../../images/image2.jpg").default.src,
          rating: 4,
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

  // Appointment modal
  const [appointToastMsg, setAppointToastMsg] = useState(false);
  const [appointName, setAppointName] = useState("XXXX-XXXX");
  const [appointDate, setAppointDate] = useState("XXXX-XXXX");
  const [appointTime, setAppointTime] = useState("XXXX-XXXX");
  const [appointPhone, setAppointPhone] = useState("XXXX-XXXX");
  const [appointEmail, setAppointEmail] = useState("XXXX-XXXX");

  // Different Modals States
  const [contactOpen, setContactOpen] = useState(false);
  const [exchangeContactOpen, setExchangeContactOpen] = useState(leadCapture);
  const [contactDetailsOpen, setContactDetailsOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [shareSpecificOpen, setShareSpecificOpen] = useState(false);
  const [shareSpecific, setShareSpecific] = useState("");
  const [reviewOpen, setReviewOpen] = useState(false);
  const [googlereviewOpen, setgoogleReviewOpen] = useState(false);
  const [openGoogleFeedback, setOpenGoogleFeedback] = useState(false);
  const [value, setValue] = useState(0);

  // Toast States and Style
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const toastStyle = props.toastStyle;

  // Contact Detail popup
  const [showEmail, setShowEmail] = useState(false);
  const [showMobile, setShowMobile] = useState(false);

  const handleShowEmail = () => {
    setShowEmail(true);
    setShowMobile(false);
    setContactDetailsOpen(true);
  };

  const handleShowMobile = () => {
    setShowEmail(false);
    setShowMobile(true);
    setContactDetailsOpen(true);
  };

  useEffect(() => {
    productArr.length == 0 &&
      serviceArr.length !== 0 &&
      setProSerState("services");

    availabilitySwitch
      ? setAppBusState("appointments")
      : setAppBusState("businesshours");

    // businessHoursArr.length !== 0 &&
    //    availabilityArr && availabilityArr.length == 0 &&
    //   setAppBusState("businesshours");
  }, [data]);

  const handleEscPress = (event) => {
    if (event.key === "Escape") {
      setContactOpen(false);
      setExchangeContactOpen(false);
      setContactDetailsOpen(false);
      setShareOpen(false);
      setReviewOpen(false);
      setOpenProductModal(false);
    }
  };

  const handleShareSpecific = (label) => {
    setShareSpecificOpen(true);
    setShareSpecific(label);
  };

  const goto =
    typeof window != "undefined" ? useSearchParams().get("goto") : "";
  useEffect(() => {
    switch (goto) {
      case "products":
        if (productSwitch && productArr.length !== 0) {
          setProSerState("products");
        }
        break;
      case "services":
        if (serviceSwitch && serviceArr.length !== 0) {
          setProSerState("services");
        }
        break;
      case "businesshours":
        if (businessHoursSwitch && businessHoursArr.length !== 0) {
          setAppBusState("businesshours");
        }
        break;
      case "appointments":
        if (
          availabilitySwitch &&
          availabilityArr &&
          availabilityArr.length !== 0
        ) {
          setAppBusState("appointments");
        }
        break;
      case "gallery":
        if (galleryArr.length !== 0) {
          setGalVidState("gallery");
        }
        break;
      case "videos":
        if (videosArr.length !== 0) {
          setGalVidState("videos");
        }
        break;
      default:
        break;
    }

    window.addEventListener("keydown", handleEscPress);

    return () => {
      window.removeEventListener("keydown", handleEscPress);
    };
  }, []);

  // updating analytics
  const updateAnalytics = async (label) => {
    if (templateId !== undefined && username !== undefined) {
      if (templateId !== "" && username !== "") {
        const ipResponse = await axios.get("https://ipapi.co/json/");
        const ipData = ipResponse.data;
        await axios.post(
          `${serverUrl}/analytics/${templateId}/${username}/${label}`,
          {
            profile: username,
            country: ipData.country_name,
            countryCode: ipData.country_code,
          }
        );
      }
    }
  };
      // Google review qr open modal 
    useEffect(() => {
    if (props.qrGoogle  && !dummyData && !disable) {
      setgoogleReviewOpen(true);
    }
  }, [props.qrGoogle, dummyData, disable]);

  return (
    <>
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
        <div
          id="scroller"
          className="w-full h-[100vh] overflow-y-scroll"
          ref={templateRef}
          style={mainbg}
        >
          <div className="w-full  flex flex-col items-center justify-center mt-[130px]">
            <div className="flex flex-col gap-[24px] max-w-[720px] mb-[24px]">
              {/* <Hero2
                data={herodata}
                style={heroStyle}
                dummy={dummyData}
                setShowEmail={setShowEmail}
                setShowMobile={setShowMobile}
                setShowContact={setContactDetailsOpen}
              /> */}
              <div
                className={`max-w-[720px]  w-[720px] min-h-[387px] flex flex-col items-center relative ${heroStyle.div}`}
              >
                <div className="absolute left-1/2 -translate-x-1/2 top-[-70px]">
                  <img
                    src={`${herodata.profilePic}`}
                    className={`w-[140px] h-[140px] object-cover ${heroStyle.profilePic}`}
                    alt="profilepic"
                  />
                </div>
                <div
                  className="w-full pt-[110px] px-[60px] text-center items-center justify-center"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <p className={`mb-[5px] ${heroStyle.fullName}`}>
                    {herodata.fullName}
                  </p>
                  <p className={`mb-[5px] ${heroStyle.jobTitle}`}>
                    {herodata.jobTitle}
                  </p>
                  <p className={`mb-[5px] ${heroStyle.jobTitle}`}>
                    {herodata.companyName}
                  </p>
                  <p className={`mb-[30px] ${heroStyle.jobDescription}`}>
                    {herodata.jobDescription}
                  </p>
                  {/* <div className="flex justify-center gap-4">
                    {!dummyData
                      ? data.mobileNumber !== "" && (
                          <p
                            className={`inline-flex ${heroStyle.border}  justify-center gap-1 hover:cursor-pointer md:w-[152px] w-[90px]  xsm:w-[105px] h-[47px] rounded-[8px] bg-[rgba(255,255,255,0.16)] ${heroStyle.jobTitle}`}
                            onClick={handleShowMobile}
                          >
                            <span className=" flex items-center font-[600] w-[73px] h-5 mt-[14px] mb-[13px] ml-[39px] mr-[40px] leading-normal ">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                className="mt-[3px] h-5 w-5 "
                              >
                                <path
                                  d="M7.805 8.90167C8.58695 10.2754 9.7246 11.4131 11.0983 12.195L11.835 11.1633C11.9535 10.9974 12.1286 10.8807 12.3273 10.8353C12.526 10.7898 12.7345 10.8188 12.9133 10.9167C14.0919 11.5608 15.3935 11.9481 16.7325 12.0533C16.9415 12.0699 17.1365 12.1646 17.2788 12.3186C17.421 12.4726 17.5 12.6745 17.5 12.8842V16.6025C17.5 16.8088 17.4235 17.0078 17.2853 17.161C17.1471 17.3142 16.9569 17.4106 16.7517 17.4317C16.31 17.4775 15.865 17.5 15.4167 17.5C8.28333 17.5 2.5 11.7167 2.5 4.58333C2.5 4.135 2.5225 3.69 2.56833 3.24833C2.58938 3.04308 2.68582 2.85293 2.83899 2.71469C2.99216 2.57646 3.19117 2.49996 3.3975 2.5H7.11583C7.32547 2.49997 7.52741 2.57896 7.6814 2.72121C7.83539 2.86346 7.93011 3.05852 7.94667 3.2675C8.05185 4.60649 8.43923 5.90807 9.08333 7.08667C9.18122 7.26547 9.21018 7.47395 9.16472 7.67266C9.11927 7.87137 9.00255 8.04654 8.83667 8.165L7.805 8.90167ZM5.70333 8.35417L7.28667 7.22333C6.83732 6.25341 6.52946 5.22403 6.3725 4.16667H4.175C4.17 4.305 4.1675 4.44417 4.1675 4.58333C4.16667 10.7967 9.20333 15.8333 15.4167 15.8333C15.5558 15.8333 15.695 15.8308 15.8333 15.825V13.6275C14.776 13.4705 13.7466 13.1627 12.7767 12.7133L11.6458 14.2967C11.1906 14.1198 10.7483 13.9109 10.3225 13.6717L10.2742 13.6442C8.63965 12.7139 7.28607 11.3604 6.35583 9.72583L6.32833 9.6775C6.08909 9.25166 5.88024 8.80945 5.70333 8.35417Z"
                                  fill={
                                    heroStyle.color ? heroStyle.color : "white"
                                  }
                                />
                              </svg>
                              <p className="ml-2 w-[45px] h-[19px]  text-[14px] font-[600]">
                                Phone
                              </p>
                            </span>
                          </p>
                        )
                      : ""}
                    {!dummyData
                      ? herodata.email !== "" && (
                          <p
                            className={`inline-flex ${heroStyle.border} justify-center gap-1 hover:cursor-pointer md:w-[152px]  xsm:w-[105px] w-[90px] h-[47px] rounded-[8px] bg-[rgba(255,255,255,0.16)] ${heroStyle.jobTitle}`}
                            onClick={handleShowEmail}
                          >
                            <span className="flex items-center font-[600] leading-normal">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                className={`mt-[3px] h-5 w-5  ${heroStyle.color} `}
                              >
                                <path
                                  d="M2.49996 2.5H17.5C17.721 2.5 17.9329 2.5878 18.0892 2.74408C18.2455 2.90036 18.3333 3.11232 18.3333 3.33333V16.6667C18.3333 16.8877 18.2455 17.0996 18.0892 17.2559C17.9329 17.4122 17.721 17.5 17.5 17.5H2.49996C2.27895 17.5 2.06698 17.4122 1.9107 17.2559C1.75442 17.0996 1.66663 16.8877 1.66663 16.6667V3.33333C1.66663 3.11232 1.75442 2.90036 1.9107 2.74408C2.06698 2.5878 2.27895 2.5 2.49996 2.5ZM16.6666 6.03167L10.06 11.9483L3.33329 6.01333V15.8333H16.6666V6.03167ZM3.75913 4.16667L10.0508 9.71833L16.2516 4.16667H3.75913Z"
                                  fill={
                                    heroStyle.color ? heroStyle.color : "white"
                                  }
                                />
                              </svg>
                              <p className="ml-2 text-[14px] font-[600]">
                                Email
                              </p>
                            </span>
                          </p>
                        )
                      : ""}
                  </div> */}
                  <div>
                    <div className="mt-[40px] ">
                      <ContactBtn
                        style={contactBtnStyle}
                        position={templatePosition}
                        type={type}
                        onClick={() => {
                          setContactOpen(true);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {appsArr.length !== 0 && (
                <Apps
                  data={appsArr}
                  style={appsStyle}
                  noOfApps={appsStyle.noOfApps}
                  position={templatePosition}
                  dummy={dummyData}
                  templateId={templateId}
                  username={username}
                  fromRedirect={fromRedirect}
                />
              )}

              {customLinks.length != 0 && (
                <div
                  className={`flex flex-col justify-start items-center gap-[16px] px-[20px] py-[25px] ${props.customLinkStyle.linkMainBg}`}
                >
                  {customLinks.map((site, index) => {
                    return dummyData ? (
                      site.customLinkImage ? (
                        <div
                          className="min-h-[56px] w-[100%] min-w-[320px] p-[12px] bg-white flex flex-row justify-start items-center gap-[12px]"
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
                          className="min-h-[56px] w-[100%] min-w-[320px] p-[12px] bg-white flex flex-row justify-center items-center gap-[12px]"
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
                        className={`min-h-[56px] ${
                          site.isChecked && site.animation
                        } w-[100%] min-w-[320px] p-[12px] bg-white flex flex-row justify-start items-center gap-[12px]`}
                        style={{
                          ...props.customLinkStyle.linkBg,
                          objectFit: "cover",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          updateAnalytics(site.label);
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
                        <p className="text-[16px] font-[500]">{site.label}</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {((productSwitch && productArr.length !== 0) ||
              (serviceSwitch && serviceArr.length !== 0)) && (
              <div
                className={`max-w-[1118px] w-[calc(100%-40px)] mb-[20px] px-8 flex flex-col ${bodyStyle}`}
              >
                <div className="flex flex-col gap-7 my-[30px]">
                  <div className="flex gap-7 items-center h-[55px] overflow-x-scroll overflow-y-hidden">
                    {productSwitch && productArr.length !== 0 && (
                      <h3
                        id="products"
                        className={`${
                          proSerState === "products"
                            ? headingStyle.active
                            : headingStyle.inactive
                        } hover:cursor-pointer`}
                        onClick={() => {
                          setProSerState("products");
                        }}
                      >
                        {productLabel}
                        {proSerState === "products" && activeHeadingElement}
                      </h3>
                    )}
                    {serviceSwitch && serviceArr.length !== 0 && (
                      <h3
                        id="services"
                        className={`${
                          proSerState === "services"
                            ? headingStyle.active
                            : headingStyle.inactive
                        } hover:cursor-pointer`}
                        onClick={() => {
                          setProSerState("services");
                        }}
                      >
                        {serviceLabel}
                        {proSerState === "services" && activeHeadingElement}
                      </h3>
                    )}
                    {/* <div className="w-full text-left">
                      <button className="float-end" onClick={()=>handleShareSpecific(proSerState)}><RiShareBoxFill /></button>
                    </div> */}
                  </div>
                  {productSwitch &&
                    productArr.length !== 0 &&
                    proSerState === "products" && (
                      <Products
                        setOpenedProduct={setOpenedProduct}
                        setOpenProductModal={setOpenProductModal}
                        setProductImgArr={setProductImgArr}
                        data={productArr}
                        scrollBtn={scrollBtn}
                        buttonStyle={buttonStyle}
                        style={productStyle}
                        templateId={templateId}
                        username={username}
                      />
                    )}
                  {serviceSwitch &&
                    serviceArr.length !== 0 &&
                    proSerState === "services" && (
                      <Services
                        setOpenServiceModal={setOpenServiceModal}
                        setOpenedService={setOpenedService}
                        setServiceImgArr={setServiceImgArr}
                        buttonStyle={buttonStyle}
                        data={serviceArr}
                        scrollBtn={scrollBtn}
                        style={serviceStyle}
                        templateId={templateId}
                        username={username}
                      />
                    )}
                </div>
              </div>
            )}

            {/* appointment */}
            {/* <div
              className={`max-w-[1118px] w-[calc(100%-40px)] mb-[20px] flex flex-col backdrop-blur-[18px] bg-[rgba(0,0,0,0.20)] `}
            >
              <Appointments
                style={appointmentsStyle}
                buttonStyle={buttonStyle.concat(` ${props.appointmentBtn}`)}
                starFill={appointmentsStyle.star.fill}
                position={templatePosition}
                onClick={() => {
                  !dummyData && !disable && setAppointmentOpen(true);
                }}
              />
            </div> */}

            {availabilitySwitch &&
              availabilityArr &&
              availabilityArr &&
              availabilityArr.length !== 0 && (
                <div
                  className={`max-w-[1118px] w-[calc(100%-40px)] mb-[20px] flex flex-col backdrop-blur-[18px] bg-[rgba(0,0,0,0.20)] `}
                  ref={appointmentsRef}
                  id="appointments"
                >
                  {/* <div className="w-full text-left">
                    <button
                      className="float-end"
                      onClick={() => handleShareSpecific("appointments")}
                    >
                      <RiShareBoxFill />
                    </button>
                  </div> */}

                  <Appointments
                    style={appointmentsStyle}
                    buttonStyle={buttonStyle.concat(` ${props.appointmentBtn}`)}
                    starFill={appointmentsStyle.star.fill}
                    position={templatePosition}
                    onClick={() => {
                      !dummyData && !disable && setAppointmentOpen(true);
                      //console.log(data.availability);
                    }}
                  />
                </div>
              )}
            {businessHoursSwitch &&
              businessHoursArr.length !== 0 &&
              Object.values(businessHoursArr[0].businessHours).some(
                (day) => day.checked
              ) && (
                <div
                  className={`max-w-[1118px] w-[calc(100%-40px)] mb-[20px] px-8 flex flex-col ${bodyStyle}`}
                >
                  <div className="flex flex-col gap-7  mt-[10px] mb-[30px] ">
                    <div className="flex gap-7 items-center h-[55px] overflow-x-scroll overflow-y-hidden">
                      {/* {businessHoursSwitch && businessHoursArr.length !== 0 && ( */}

                      <h3
                        id="businesshours"
                        className={`${headingStyle.active} hover:cursor-pointer`}
                        onClick={() => {
                          setAppBusState("businesshours");
                        }}
                      >
                        {businessHoursLabel}
                        {/* {(appBusState === "businesshours" || dummyData) &&
                          activeHeadingElement} */}
                        {activeHeadingElement}
                      </h3>
                      {/* )} */}
                      {/* {availabilitySwitch &&
                      availabilityArr &&
                      availabilityArr.length !== 0 && (
                        <h3
                          id="appointments"
                          className={`${
                            appBusState === "appointments"
                              ? headingStyle.active
                              : headingStyle.inactive
                          } hover:cursor-pointer`}
                          onClick={() => {
                            setAppBusState("appointments");
                          }}
                        >
                          {availabilityLabel}
                          {appBusState === "appointments" &&
                            activeHeadingElement}
                        </h3>
                      )} */}
                      {/* <div className="w-full text-left">
                        <button className="float-end" onClick={()=>handleShareSpecific(appBusState)}><RiShareBoxFill /></button>
                      </div> */}
                    </div>
                    {/* {appBusState === "appointments" &&
                    availabilitySwitch &&
                    availabilityArr &&
                    availabilityArr.length !== 0 && (
                      <Appointments2
                        data={availabilityArr}
                        label={availabilityLabel}
                        type={data.templateId}
                        profile={username}
                        style={appointmentsStyle}
                        buttonStyle={modalButtonStyle.concat(" w-[133px]")}
                        modalStyle={modalStyle}
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
                    )} */}
                    {/* {appBusState === "businesshours" && ( */}
                    <BusinessHours
                      data={businessHoursArr}
                      style={businessHoursStyle}
                    />
                    {/* )} */}
                  </div>
                </div>
              )}

            {(galleryArr.length !== 0 || videosArr.length !== 0) && (
              <div
                className={`max-w-[1118px] w-[calc(100%-40px)] mb-[20px] px-8 flex flex-col ${bodyStyle}`}
              >
                <div className="flex flex-col gap-7 my-[30px]">
                  <div className="flex gap-7 items-center h-[55px] overflow-x-scroll overflow-y-hidden">
                    {galleryArr.length !== 0 && (
                      <h3
                        id="gallery"
                        className={`${
                          galVidState === "gallery"
                            ? headingStyle.active
                            : headingStyle.inactive
                        } hover:cursor-pointer`}
                        onClick={() => {
                          setGalVidState("gallery");
                        }}
                      >
                        Gallery
                        {galVidState === "gallery" && activeHeadingElement}
                      </h3>
                    )}
                    {videosArr.length !== 0 && (
                      <h3
                        id="videos"
                        className={`${
                          galVidState === "videos"
                            ? headingStyle.active
                            : headingStyle.inactive
                        } hover:cursor-pointer`}
                        onClick={() => {
                          setGalVidState("videos");
                        }}
                      >
                        Videos
                        {galVidState === "videos" && activeHeadingElement}
                      </h3>
                    )}
                    {/* <div className="w-full text-left">
                      <button className="float-end" onClick={()=>handleShareSpecific(galVidState)}><RiShareBoxFill /></button>
                    </div> */}
                  </div>
                  {galleryArr.length !== 0 && galVidState === "gallery" && (
                    <Gallery
                      data={galleryArr}
                      style={galleryStyle}
                      dummy={dummyData}
                      scrollBtn={scrollBtn}
                      templateId={templateId}
                      username={username}
                    />
                  )}
                  {videosArr.length !== 0 && galVidState === "videos" && (
                    <Videos
                      data={videosArr}
                      style={videosStyle}
                      scrollBtn={scrollBtn}
                      dummy={dummyData}
                      templateId={templateId}
                      username={username}
                    />
                  )}
                </div>
              </div>
            )}

            {resourcesArr.length !== 0 && (
              <div
                className={`max-w-[1118px] w-[calc(100%-40px)] mb-[20px] px-8 flex flex-col ${bodyStyle}`}
              >
                <div className="flex flex-col gap-7 items-start my-[30px]">
                  <h3 className={`${headingStyle.active}`} id="resources">
                    Resources {activeHeadingElement}
                  </h3>
                  {/* <div className="w-full text-left">
                    <button className="float-end" onClick={()=>handleShareSpecific("resources")}><RiShareBoxFill /></button>
                  </div> */}
                  <Resources2
                    data={resourcesArr}
                    style={resourceStyle}
                    scrollBtn={scrollBtn}
                    dummy={dummyData}
                    templateId={templateId}
                    username={username}
                  />
                </div>
              </div>
            )}

            {reviewButtonSwitch ||
              (data.googleReviewButtonSwitch && (
                <div
                  className={`max-w-[1118px] w-[calc(100%-40px)] mb-[20px] px-8 flex flex-col ${bodyStyle}`}
                >
                  <div className="flex flex-col gap-7 items-start my-[30px]">
                    {reviewsArr.length !== 0 && (
                      <h3 className={`${headingStyle.active}`} id="reviews">
                        {reviewLabel} {activeHeadingElement}
                      </h3>
                    )}
                    {/* <div className="w-full text-left">
                    <button className="float-end" onClick={()=>handleShareSpecific("reviews")}><RiShareBoxFill /></button>
                  </div> */}
                    <Reviews
                      data={reviewsArr}
                      style={reviewStyle}
                      buttonStyle={buttonStyle}
                      scrollBtn={scrollBtn}
                      length={reviewsArr.length}
                      // reviewSwitch={reviewSwitch}
                      googleReviewButtonSwitch={data?.googleReviewButtonSwitch}
                      setgoogleReviewOpen={setgoogleReviewOpen}
                      reviewButtonSwitch={reviewButtonSwitch}
                      onClick={() => {
                        !dummyData && !data.disable && setReviewOpen(true);
                      }}
                    />
                  </div>
                </div>
              ))}

            {!logoSwitch && (
              <div
                className={`max-w-[1118px] w-[calc(100%-40px)] py-[30px] mb-[20px] px-8 flex flex-col ${bodyStyle}`}
              >
                <Bottom
                  style={props.bottomStyle}
                  logoSwitch={logoSwitch}
                  buttonStyle={buttonStyle.concat(
                    " min-w-fit border border-[#FFFFFF] text-[#FFFFFF] !bg-[#121212] shadow-[4px_4px_0px_0px_#FFF]"
                  )}
                  position={templatePosition}
                  dummy={dummyData}
                />
              </div>
            )}

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
                  borderRadius={toastStyle.borderRadius}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

const defaultProps = {
  mainbg: {
    image: require("../../images/DesktopTemplates/template7.png").default.src,
    color: "#D4D4D4",
  },
};

export default BaseTemplate2;
