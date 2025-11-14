import React, { useContext, useEffect, useRef, useState } from "react";
import Products from "../Products/Products";
import Services from "../Services/Services";
import Appointments2 from "../Appoinments/Appointments2";
import Videos from "../Videos/Videos";
import ContactBtn from "../ContactUs/ContactBtn";
import Bottom from "../../template1/Bottom";
import ButtonFunction5 from "../../template1/modals/ButtonFunction5";
import ExchangeContactModal from "../../template1/modals/ExchangeContactModal";
import ContactDetails from "../../template1/modals/ContactDetails";
import ShareModal from "../../template1/modals/ShareModal";
import ReviewModal5 from "../../template1/modals/ReviewModal5";
import AppointmentModal from "../../template1/modals/AppointmentModal";
import Toast from "../../../UiComponents/Toast";
import LeftRightScrollBtn from "../../../Utils/LeftRightScrollBtn";
import Resources2 from "../Resources/Resources2";
import Hero3 from "../Hero/Hero3";
import Apps5 from "../Apps/Apps5";
import Gallery4 from "../Gallery/Gallery4";
import BusinessHours5 from "../BusinessHours/BusinessHours5";
import Reviews5 from "../Reviews/Reviews5";
import { RiQuillPenLine } from "react-icons/ri";
import Button from "../Button/Button";
import Bottom4 from "../../template1/Bottom4";
import Products5 from "../Products/Products5";
import Services5 from "../Services/Services5";
import Hero4 from "../Hero/Hero4";
import NewModal from "../../../UiComponents/NewModal/NewModal";
import ProductModalContent from "../ModalContent/ProductModalContent";
import AppointConfirm from "../AppointmentModal/AppointConfirm";
import { useSearchParams } from "next/navigation";
import { RiShareBoxFill } from "react-icons/ri";
import { HiOutlineX } from "react-icons/hi";
import Appointments from "../Appoinments/Appointments";
import Appointments3 from "../Appoinments/Appointments3";
import { UserContext } from "@/components/Contexts/context";
import ShareModalDownload from "../../template1/modals/ShareModalDownload";
import ServiceModalContent from "../ModalContent/ServiceModalContent";
import axios from "axios";
import { serverUrl } from "@/config";
import GoogleReviewModal from "../../template1/modals/GoogleReviewModal";
import GoogleReviewFeedbackModal from "../../template1/modals/GoogleReviewFeedbackModal";

const BaseTemplate5 = (props) => {
  // all profile data
  const {
    dummyState,
    setDummyState,
    quickSelectContext,
    leadCaptureContext,
    userType,
  } = useContext(UserContext);
  const [QRdownload, setQRdownload] = useState(false);
  const data = props.data;
  const [userName, setUserName] = useState(props.username);
  //console.log("B5");

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

  // check template is square in design
  const square = props.square;
  const appointmentsRef = useRef(null);

  // Button Component Styling
  const buttonStyle = props.buttonStyle || "";
  const modalButtonStyle = buttonStyle.concat(" w-auto h-[50px]");
  const reviewStarDivbg = props.reviewStarDivbg;

  // Profile Data of User
  const username =
    data !== undefined && data.username !== undefined ? data.username : "";
  const firstName = dummyData ? "Ester" : data.firstName;
  const lastName = dummyData ? "Howard" : data.lastName;
  const fullName = firstName + " " + lastName;
  const profilePic =
    dummyData || data?.pimage === ""
      ? require("../../images/image13.jpg").default.src
      : data?.pimage;
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

  // Template Styling
  const templatebg = props.templatebg;

  // Hero Section
  const heroStyle = props.heroStyle;

  const heroData = {
    firstName: firstName,
    lastName: lastName,
    profilePic: profilePic,
    jobTitle: jobTitle,
    jobDescription: jobDescription,
    companyName: companyName,
    email: email,
    mobileNumber: mobileNumber,
    newMobileNumber: newMobileNumber,
  };

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
      border: `2px solid black`,
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

  //Appointments Section
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
        // {
        //   label: "Video 1",
        //   link: "",
        // },
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
          image: require("../../images/image2.jpg").default.src,
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
  const [appointmentOpen, setAppointmentOpen] = useState(false);
  const [googlereviewOpen, setgoogleReviewOpen] = useState(false);
  const [openGoogleFeedback, setOpenGoogleFeedback] = useState(false);
  const [value, setValue] = useState(0);

  // Toast States and Style
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const toastStyle = props.toastStyle;

  // Header Section (contains all headings which will be render in template)
  const headingRef = useRef(null);
  const headerStyle = props.headerStyle;
  const [headingsArr, setHeadingsArr] = useState([]);
  const goto =
    typeof window != "undefined" ? useSearchParams().get("goto") : "";
  const loadHeadings = () => {
    let tempHeadingsArr = [];
    if (productSwitch && productArr.length !== 0) {
      if (goto == "products") {
        setActiveComponent(productLabel);
      }
      tempHeadingsArr.push({ label: productLabel, id: "products" });
    }
    if (serviceSwitch && serviceArr.length !== 0) {
      if (goto == "services") {
        setActiveComponent(serviceLabel);
      }
      tempHeadingsArr.push({ label: serviceLabel, id: "services" });
    }
    if (
      businessHoursSwitch &&
      businessHoursArr.length !== 0 &&
      Object.values(businessHoursArr[0].businessHours).some(
        (day) => day.checked
      )
    ) {
      if (goto == "businesshours") {
        setActiveComponent(businessHoursLabel);
      }
      tempHeadingsArr.push({ label: businessHoursLabel, id: "businesshours" });
    }
    // if (availabilitySwitch && availabilityArr && availabilityArr.length !== 0) {
    //   if (goto == "appointments") {
    //     setActiveComponent(availabilityLabel);
    //   }
    //   tempHeadingsArr.push({ label: availabilityLabel, id: "appointments" });
    // }
    if (videosArr.length !== 0) {
      if (goto == "videos") {
        setActiveComponent("Videos");
      }
      tempHeadingsArr.push({ label: "Videos", id: "videos" });
    }
    if (resourcesArr.length !== 0) {
      if (goto == "resources") {
        setActiveComponent("Resources");
      }
      tempHeadingsArr.push({ label: "Resources", id: "resources" });
    }
    if (reviewsArr.length !== 0) {
      if (goto == "reviews") {
        setActiveComponent(reviewLabel);
      }
      tempHeadingsArr.push({ label: reviewLabel, id: "reviews" });
    }
    setHeadingsArr(tempHeadingsArr);
    if (
      goto == "" ||
      tempHeadingsArr.filter((item) => item.id == goto).length == 0
    ) {
      setActiveComponent(tempHeadingsArr[0]?.label);
    }
  };

  useEffect(() => {
    loadHeadings();
  }, [data]);

  // Active Component Rendering below heading
  const [activeComponent, setActiveComponent] = useState(headingsArr[0]?.label);
  const handleHeadingClick = (e) => {
    setActiveComponent(e.target.innerText);
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
    <div
      className={`w-full min-h-full flex flex-col items-center justify-center`}
      style={{
        background: templatebg,
      }}
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
        <div className="max-w-[1182px] w-full">
          <div
            className="flex flex-col gap-[72px] py-[60px] px-5 w-full"
            style={{ background: templatebg }}
          >
            <div>
              <div
                className="max-w-[1182px] py-[50px] px-5 flex flex-col justify-center items-center relative rounded-[40px] backdrop-blur-[5px] DM-Sans-font-div"
                style={{
                  background: "linear-gradient(180deg, #033CCE, transparent)",
                  boxShadow: "0px 12px 40px 1px rgba(3, 60, 206, 0.10)",
                }}
              >
                <div className="z-[5] w-[140px] h-[140px] mb-[30px]">
                  <img
                    src={heroData.profilePic}
                    alt="logo"
                    className={`w-[140px] h-[140px] object-cover ${heroStyle.profilePic}`}
                  />
                </div>

                <div className="z-[5] flex flex-col gap-1 text-center w-full max-w-[760px]">
                  <h1 className={`${heroStyle.fullName}`}>
                    {heroData.firstName + " " + (heroData.lastName || "")}
                  </h1>
                  <h4 className={`${heroStyle.jobTitle}`}>
                    {heroData.jobTitle}
                  </h4>
                  <h4 className={`${heroStyle.jobTitle}`}>
                    {heroData.companyName}
                  </h4>
                  <p className={`${heroStyle.jobDescription}`}>
                    {heroData.jobDescription}
                  </p>
                </div>
                <div>
                  <div
                    className="w-full min-h-[50px] "
                    style={{ background: templatebg }}
                  >
                    <ContactBtn
                      style={contactBtnStyle}
                      position={templatePosition}
                      type="5"
                      onClick={() => {
                        setContactOpen(true);
                      }}
                    />
                  </div>
                </div>
                <div
                  className={`${heroStyle.div} z-[0] absolute h-[97.5%] w-[98.8%] rounded-[37px] backdrop-blur-[5px]`}
                ></div>
              </div>
              <div className="relative my-[40px]">
                <Apps5
                  data={appsArr}
                  style={appsStyle}
                  position={templatePosition}
                  dummy={dummyData}
                  templateId={templateId}
                  username={username}
                  fromRedirect={fromRedirect}
                />
              </div>

              {customLinks.length != 0 && (
                <div className="mt-[72px] px-[121px] flex flex-col justify-start items-center gap-[16px]">
                  {customLinks.map((site, index) => {
                    return dummyData ? (
                      site.customLinkImage ? (
                        <div
                          className="min-h-[56px] w-[100%] min-w-[320px] p-[12px] rounded-[12px] bg-white flex flex-row justify-start items-center gap-[12px]"
                          style={{
                            cursor: "pointer",
                            objectFit: "cover",
                            borderRadius: "100px",
                            border: "1px solid rgba(18, 18, 18, 0.04)",
                            boxShadow: "0px 0px 8px 1px rgba(3, 60, 206, 0.08)",
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
                            style={{ border: "none", borderRadius: "50px" }}
                          />
                          <p className="text-[16px] font-[500]">{site.label}</p>
                        </div>
                      ) : (
                        <div
                          className="min-h-[56px] w-[100%] min-w-[320px] p-[12px] rounded-[12px] bg-white flex flex-row justify-center items-center gap-[12px]"
                          style={{
                            cursor: "pointer",
                            objectFit: "cover",
                            borderRadius: "100px",
                            border: "1px solid rgba(18, 18, 18, 0.04)",
                            boxShadow: "0px 0px 8px 1px rgba(3, 60, 206, 0.08)",
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
                        } w-[100%] min-w-[320px] p-[12px] rounded-[12px] bg-white flex flex-row justify-start items-center gap-[12px]`}
                        style={{
                          cursor: "pointer",
                          objectFit: "cover",
                          borderRadius: "100px",
                          border: "1px solid rgba(18, 18, 18, 0.04)",
                          boxShadow: "0px 0px 8px 1px rgba(3, 60, 206, 0.08)",
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
                          style={{ border: "none", borderRadius: "50px" }}
                        />
                        <p className="text-[16px] font-[500]">{site.label}</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Render active components according to selected heading */}
            {headingsArr.length != 0 && (
              <div>
                <div
                  className={`w-full flex justify-center relative px-8 ${headerStyle.div}`}
                  style={{
                    boxShadow: "0px 8px 24px 1px rgba(3, 60, 206, 0.14)",
                  }}
                >
                  <div className="overflow-scroll" ref={headingRef}>
                    <div className="flex items-center gap-8">
                      {headingsArr.map((item, index) => {
                        return (
                          <h3
                            id={item.id}
                            className={`min-w-fit hover:cursor-pointer 
                        ${index === 0 && "ms-auto"} 
                        ${index === headingsArr.length - 1 && "me-auto"} 
                        ${item.label === activeComponent && "font-bold"}
                        ${headerStyle.heading}`}
                            title={item.label}
                            onClick={handleHeadingClick}
                            key={index}
                          >
                            {item.label}
                          </h3>
                        );
                      })}
                      {/* <div className="text-right">
                        <button className="float-end" onClick={()=>handleShareSpecific(headingsArr.filter(item=>item.label==activeComponent)[0]?.id)}><RiShareBoxFill /></button>
                      </div> */}
                    </div>
                  </div>
                  <LeftRightScrollBtn
                    refrence={headingRef}
                    style={{
                      border: "1px solid black",
                      marginLeft: "-16px",
                      marginRight: "-16px",
                    }}
                  />
                </div>

                <div className="mt-12">
                  {activeComponent === productLabel && (
                    <Products5
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
                  {activeComponent === serviceLabel && (
                    <Services5
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
                  {/* {activeComponent === availabilityLabel && (
                    <div
                      style={{
                        borderRadius: "8px",
                        border: "1px solid rgba(18, 18, 18, 0.04)",
                        boxShadow: "rgba(3, 60, 206, 0.08) 0px 0px 8px 1px",
                      }}
                    >
                      <Appointments2
                        data={availabilityArr}
                        label={availabilityLabel}
                        type={data.templateId}
                        profile={username}
                        setShowToast={setShowToast}
                        setToastMessage={setToastMessage}
                        style={appointmentsStyle}
                        buttonStyle={buttonStyle.concat(
                          ` ${props.appointmentBtn}`
                        )}
                        starFill={businessHoursStyle.star.fill}
                        position={templatePosition}
                        onClick={() => {
                          !dummyData && !disable && setAppointmentOpen(true);
                        }}
                        email={email}
                        mobileNumber={mobileNumber}
                        setAppointToastMsg={setAppointToastMsg}
                        setAppointName={setAppointName}
                        setAppointDate={setAppointDate}
                        setAppointTime={setAppointTime}
                        setAppointPhone={setAppointPhone}
                        setAppointEmail={setAppointEmail}
                      />
                    </div>
                  )}  */}
                  {availabilitySwitch &&
                    availabilityArr &&
                    availabilityArr &&
                    availabilityArr.length !== 0 && (
                      <div
                        className={`w-full mb-[20px] flex flex-col  `}
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

                        <Appointments3
                          style={appointmentsStyle}
                          buttonStyle={buttonStyle.concat(
                            ` ${props.appointmentBtn}`
                          )}
                          starFill={appointmentsStyle.star.fill}
                          position={templatePosition}
                          onClick={() => {
                            !dummyData && !disable && setAppointmentOpen(true);
                            //console.log(data.availability);
                          }}
                        />
                      </div>
                    )}
                  {activeComponent === "Videos" && (
                    <div>
                      <Videos
                        data={videosArr}
                        style={videosStyle}
                        scrollBtn={scrollBtn}
                        dummy={dummyData}
                        templateId={templateId}
                        username={username}
                      />
                    </div>
                  )}
                  {activeComponent === "Resources" && (
                    <Resources2
                      data={resourcesArr}
                      style={resourceStyle}
                      scrollBtn={scrollBtn}
                      dummy={dummyData}
                      templateId={templateId}
                      username={username}
                    />
                  )}
                  {activeComponent === businessHoursLabel && (
                    <BusinessHours5
                      data={businessHoursArr}
                      style={businessHoursStyle}
                      templatebg={templatebg}
                      position={templatePosition}
                    />
                  )}
                  {activeComponent === reviewLabel && (
                    <Reviews5
                      data={reviewsArr}
                      style={reviewStyle}
                      templatebg={templatebg}
                      buttonStyle={buttonStyle.concat(
                        " min-w-[320px] mx-auto rounded-full"
                      )}
                      scrollBtn={scrollBtn}
                      reviewButtonSwitch={reviewButtonSwitch}
                      onClick={() => {
                        !dummyData && !disable && setReviewOpen(true);
                      }}
                    />
                  )}
                </div>
              </div>
            )}
            {reviewButtonSwitch && reviewsArr.length == 0 && (
              <div
                className="mt-10 w-full h-[60px] flex flex-row justify-center"
                id={`${reviewsArr.length == 0 ? "reviews" : ""}`}
              >
                <Button
                  type="baseTemp5"
                  text="Write a review"
                  icon={<RiQuillPenLine />}
                  style={buttonStyle.concat(
                    " min-w-[320px] mx-auto rounded-full h-[56px]"
                  )}
                  onClick={() => {
                    !dummyData && !disable && setReviewOpen(true);
                  }}
                />
                {/* <div className="w-full text-left">
                  <button className="float-end" onClick={()=>handleShareSpecific("reviews")}><RiShareBoxFill /></button>
                </div> */}
              </div>
            )}
            {data?.googleReviewButtonSwitch && reviewsArr.length == 0 && (
              <div
                className="mt-10 w-full h-[60px] flex flex-row justify-center"
                id={`${reviewsArr.length == 0 ? "reviews" : ""}`}
              >
                <Button
                  type="baseTemp5"
                  text="Write a google review"
                  icon={<RiQuillPenLine />}
                  style={buttonStyle.concat(
                    " min-w-[320px] mx-auto rounded-full h-[56px]"
                  )}
                  onClick={() => {
                    !dummyData && !disable && setgoogleReviewOpen(true);
                  }}
                />
                {/* <div className="w-full text-left">
                  <button className="float-end" onClick={()=>handleShareSpecific("reviews")}><RiShareBoxFill /></button>
                </div> */}
              </div>
            )}
            <div id="gallery">
              {galleryArr.length !== 0 && (
                <Gallery4
                  data={galleryArr}
                  style={galleryStyle}
                  dummy={dummyData}
                  scrollBtn={scrollBtn}
                  templateId={templateId}
                  username={username}
                />
              )}
            </div>

            <Bottom
              style={props.bottomStyle}
              buttonStyle={buttonStyle.concat(
                " min-w-fit rounded-full bg-black text-white"
              )}
              position={templatePosition}
              logoSwitch={logoSwitch}
              dummy={dummyData}
            />
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
            <ButtonFunction5
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
            <ReviewModal5
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
        </div>
      )}
    </div>
  );
};

export default BaseTemplate5;
