"use client";
import React, { useState, useContext, useRef, useEffect } from "react";
import Navbar from "./header/Navbar";
import Footer from "./Footer";
import PrimaryButton3 from "../UiComponents/PrimaryButton3";
import SecondaryButton from "../UiComponents/SecondaryButton";
import {
  HiCheck,
  HiChevronDown,
  HiChevronRight,
  HiChevronUp,
  HiXMark,
} from "react-icons/hi2";
import Image1 from "./assets/Image1.svg";
import Image2 from "./assets/Image2.svg";
import Image3 from "./assets/Image3.svg";
import Circle from "./assets/circle.svg";
import Icon2 from "./assets/Icon2.svg";
import Icon3 from "./assets/Icon3.svg";
import DownArrow from "./assets/DownArrow.svg";
import UpArrow from "./assets/UpArrow.svg";
import { serverUrl, clientUrl } from "../../config";
import "../UiComponents/iconTextStyle.css";
import { UserContext } from "../Contexts/context";
import axios from "axios";
import "../ProfileCategory/profile.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SafeLocalStorage, createQueryString, getCookie } from "@/components/utils";
import SubscriptionCart from "./Pricing/SubscriptionCart";
import PricingFooter from "./Pricing/PricingFooter";
import NewModal from "../UiComponents/NewModal/NewModal";
import PrimaryButton2 from "../UiComponents/PrimaryButton2";

const Pricing = () => {
  const navigate = useRouter();

  const { username, userEmail, userFullName } = useContext(UserContext);
  const [showContentStarter, setShowContentStarter] = useState(false);
  const [showContentBasic, setShowContentBasic] = useState(false);
  const [showContentPro, setShowContentPro] = useState(false);

  // const { state } = useLocation();
  // const { profile } = useParams();

  const [proMonthly, setProMonthly] = useState("");
  const [proQuarterly, setProQuarterly] = useState("");
  const [proAnnual, setProAnnual] = useState("");
  const [isProOffer, setIsProOffer] = useState(false);
  const [proAnnualOffer, setProAnnualOffer] = useState("");
  const [starterMonthly, setStarterMonthly] = useState("");
  const [starterQuarterly, setStarterQuarterly] = useState("");
  const [starterAnnual, setStarterAnnual] = useState("");
  const [isStarterOffer, setIsStarterOffer] = useState(false);
  const [starterAnnualOffer, setStarterAnnualOffer] = useState("");
  const [paymentModal, setPaymentModal] = useState(false);
  const [isRecurringPayment, setIsRecurringPayment] = useState(false);

  // ========
  const [pro, setPro] = useState("");
  const [starter, setStarter] = useState("");
  const [basic, setBasic] = useState("");
  const [planDate, setPlanDate] = useState("");
  const [formattedExpDate, setFormattedExpDate] = useState("");
  const [futureExpDate, setFutureExpDate] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  const [activeContact, setActiveContact] = useState("basic");
  const [activePlan, setActivePlan] = useState("monthly");
  const [activePack, setActivePack] = useState("");

  const fetchData = async () => {
    const config = {
      headers: {
        Authorization: "Bearer " + getCookie("jwt_token"),
      },
    };
    // fetching user data
    try {
      const res = await axios.get(
        `${serverUrl}/getUser/getUser/${username}`,
        config
      );
      //console.log(res.data[0]);

      // setting plan status
      setPro(res.data[0].pro);
      setStarter(res.data[0].starter);
      setBasic(res.data[0].basic);
      setPlanDate(res.data[0].proExpDate);

      // getting current date
      var thisDate = new Date();

      var thisDay = thisDate.getDate();
      var thisMonth = thisDate.getMonth() + 1;
      var thisYear = thisDate.getFullYear();

      var formattedDay = thisDay < 10 ? "0" + thisDay : thisDay;
      var formattedMonth = thisMonth < 10 ? "0" + thisMonth : thisMonth;
      setCurrentDate(formattedDay + "/" + formattedMonth + "/" + thisYear);

      // -----

      let dateToCheck = new Date(planDate);

      let year = dateToCheck.getFullYear();
      let month = ("0" + (dateToCheck.getMonth() + 1)).slice(-2);
      let day = ("0" + dateToCheck.getDate()).slice(-2);
      setFormattedExpDate(day + "/" + month + "/" + year);

      // -----
      var date = new Date(planDate);

      // Add 1 month
      var oneMonthLater = new Date(date);
      oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);

      // Add 3 months
      var threeMonthsLater = new Date(date);
      threeMonthsLater.setMonth(threeMonthsLater.getMonth() + 3);

      // Add 12 months
      var twelveMonthsLater = new Date(date);
      twelveMonthsLater.setMonth(twelveMonthsLater.getMonth() + 12);

      var formatDate = function (date) {
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        return `${day}/${month < 10 ? "0" + month : month}/${year}`;
      };

      activePlan == "monthly"
        ? setFutureExpDate(formatDate(oneMonthLater))
        : activePlan == "quarterly"
        ? setFutureExpDate(formatDate(threeMonthsLater))
        : activePlan == "annual" &&
          setFutureExpDate(formatDate(twelveMonthsLater));
    } catch (error) {
      //console.log(error);
    }
  };

  useEffect(() => {
    if (username) {
      fetchData();
    }
  }, [username, basic, starter, pro, activePlan]);
  // ========

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${serverUrl}/admin/pricing`);
        setProMonthly(response.data.pro.monthly);
        setProQuarterly(response.data.pro.quarterly);
        setProAnnual(response.data.pro.annual);
        setIsProOffer(response.data.pro.includeOffer);
        setProAnnualOffer(response.data.pro.offer);
        setStarterMonthly(response.data.starter.monthly);
        setStarterQuarterly(response.data.starter.quarterly);
        setStarterAnnual(response.data.starter.annual);
        setIsStarterOffer(response.data.starter.includeOffer);
        setStarterAnnualOffer(response.data.starter.offer);
      } catch (error) {
        console.error("Error fetching pricing data", error);
      }
    };

    fetchData();
  }, []);

  // plan price
  // const handleContactClick = (contactName) => {
  //   console.log(contactName);
  //   setActiveContact(contactName);
  // };
  // const navigate = useNavigate();

  const handlePlanSelect = async (paymentOption) => {
    let amount;
    let plan = 1;

    if (activePlan === "quarterly") {
      plan = 3;
    } else if (activePlan === "annual") {
      plan = 12;
    }

    if (activePack === "starter") {
      if (plan === 1) {
        amount = starterMonthly;
      } else if (plan === 3) {
        amount = starterQuarterly;
      } else if (plan === 12) {
        amount = isStarterOffer ? starterAnnualOffer : starterAnnual;
      }
    } else if (activePack === "pro") {
      if (plan === 1) {
        amount = proMonthly;
      } else if (plan === 3) {
        amount = proQuarterly;
      } else if (plan === 12) {
        amount = isProOffer ? proAnnualOffer : proAnnual;
      }
    }

    const planData = {
      username: username,
      planType: activePack,
      duration: plan,
      amount: amount,
      paymentOption: paymentOption,
    };

    displayRazorpay(planData);
    return;

    const response = await axios.post(
      `${serverUrl}/tapopuser/planPayment`,
      planData
    );

    const url = response.data.url;

    // This line responsible for redirecting to UPI page
    window.location.href = url;
  };

  // Razorpay Start

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function displayRazorpay(planData) {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razropay failed to load!!");
      return;
    }

    const { data } = await axios.post(
      `${serverUrl}/tapopuser/v2/planPayment`,
      planData
    );

    let options = {
      ...data.options,
      handler: async function (response) {
        const paymentStatusCheck = await axios.post(
          `${serverUrl}/tapopuser/v2/paymentStatusCheck/${
            data.options.order_id
              ? data.options.order_id
              : data.options.subscription_id
          }`,
          {
            planData: data.planData,
            razorpayData: response,
          }
        );
        if (paymentStatusCheck.data.success) {
          const affiliateId = window.sessionStorage.getItem("affiliateLink");
          if (affiliateId != null) {
            axios
              .post(`${serverUrl}/admin/affiliateLink/addTransaction`, {
                link: affiliateId,
                transactionData: {
                  name: userFullName,
                  email: userEmail,
                  amount: planData.amount,
                  date: new Date().toISOString(),
                  transactionId: data.options.order_id
                    ? data.options.order_id
                    : data.options.subscription_id,
                  type: "plan_payment",
                },
              })
              .catch((err) => console.log(err));
          }
          window.location.href = `${clientUrl}/chooseprofile/${username}`;
        } else {
          // window.location.href = `${clientUrl}/error`;
        }
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.on("payment.failed", function (response) {
      // window.location.href = `${clientUrl}/error`;
    });
    paymentObject.open();
  }

  // Razorpay End

  const handleSubmitPack = async (activePack) => {
    if (username === "") {
      SafeLocalStorage.setItem("pack", activePack);
      SafeLocalStorage.setItem("duration", activePlan);
      navigate.push("/signup?" + createQueryString(["fromPage"], ["pricing"]));
      return;
    }

    setActiveContact(activePack);
    setActivePack(activePack);

    if (activePack === "starter" || activePack === "pro") {
      setPaymentModal(true);
    } else {
      navigate.push(`/selectprofile/${username}`);
    }
  };

  const myRef = useRef(null);
  const scrollToRef = () => {
    const element = myRef.current;

    if (element) {
      element.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };
  useEffect(() => {
    scrollToRef();
  }, []);

  return (
    <div className=" custom-scrollbar Plus-Jakarta-Sans-font-div">
      <Navbar background="#FFFF" thisPage="pricing" />
      <div className="custom-scrollbar" >

      <div ref={myRef} className="custom-scrollbar" style={{ height: "100vh", overflowY: "scroll" }}>
        <div className="md:pt-[68px] px-2 xsm:px-[20px] flex flex-col items-center justify-center w-full  md:m-0">
          {/* **************** Heading Container  ******************************** */}
          <div className="flex flex-col m-[1rem]  sm:items-center md:items-start lg:items-center mt-[40px] lg:mt-[64px] ">
            <h1 className="font-bold text-center  leading-[32px] sm:leading-[64px] text-[24px] xsm:text-[36px] md:text-[46px] lg:text-[56px] w-full max-w-[861px]">
              Choose the right plan for you
            </h1>
          </div>

          {/* ******************** Chose Monthly plans ******************************** */}
          <div className="px-1 py-4 xsm2:p-[1rem] flex justify-center w-full">
            <div className="month_container w-[95vw] xsm:w-[90vw] sm:w-fit min-h-[48px] mt-[0px] md:mt-[40px] md:ml-[-22px] flex gap-1 flex-row justify-between items-center relative ">
              <button
                className={`Choose_plan ${
                  activePlan === "monthly" ? "active" : ""
                }`}
                onClick={() => setActivePlan("monthly")}
              >
                Monthly
              </button>
              <button
                className={`Choose_plan ${
                  activePlan === "quarterly" ? "active" : ""
                } `}
                onClick={() => setActivePlan("quarterly")}
              >
                Quarterly
                <p className="add-icon text-[9px] active:!text-[7px] absolute xsm2:relative mb-[51px]  xsm2:mt-[50px]  sm:text-[11px] sm:active:!text-[11px]  sm:mt-[53px]  xsm2:w-[62px] w-11 text-center">
                  25% OFF
                </p>
              </button>
              <button
                className={`Choose_plan ${
                  activePlan === "annual" ? "active" : ""
                }`}
                onClick={() => setActivePlan("annual")}
              >
                Annual
                <p className="add-icon text-[9px] active:!text-[7px] absolute xsm2:relative mb-[52px]  xsm2:mt-[53px]  sm:text-[11px] sm:active:!text-[11px]  sm:mt-[53px]  xsm2:w-[62px] w-11 text-center">
                  50% OFF
                </p>
              </button>
            </div>
          </div>

          {/* ********************** Plans Selection ****************************************** */}
          <div className="flex flex-col [@media(min-width:1200px)]:flex-row gap-7 mt-2 lg:mt-6 mx-1">
            {/******************* BASIC PLAN ************************** */}
            <div
              className={`contact-box ${
                activeContact === "card" ? " text-white bg-[#490905]" : ""
              }`}
              // onClick={() => handleContactClick("basic")}
            >
              <div
                className={`card_container w-full  md:w-[500px] lg:w-[368px] h-full md:full lg:h-full`}
                style={{ borderTop: "4px solid black" }}
              >
                {/* image */}
                <div className="card_image relative">
                  <Image className="" src={Image1} alt="image" />
                  <div className="absolute flex flex-col justify-center items-center">
                    <Image src={Circle} alt="image" />
                    <p className="Image_text">Basic</p>
                  </div>
                </div>
                {/* heading */}
                <div className="heading_div mt-[24px] lg:mt-[32px] ">
                  <h2 className="font-bold text-[24px] ">Free</h2>
                  <p className="heading_text">Free, Forever</p>
                  <p className="heading_para">
                    Create your Qviq profile & share online
                  </p>
                </div>
                {/* content */}
                <div className="w-full mt-[24px] lg:mt-[32px] flex flex-col">
                  <div
                    className="w-full h-[22px] flex items-center justify-between"
                    onClick={() => {
                      setShowContentBasic(!showContentBasic);
                    }}
                  >
                    <p className="content_heading block">
                      What's included in free:
                    </p>
                    <Image
                      className="w-[10px] h-[6px] md:hidden"
                      src={!showContentBasic ? DownArrow : UpArrow}
                      alt="image"
                    />
                  </div>
                  <div
                    className={`${
                      !showContentBasic ? "hidden" : "flex"
                    } md:flex flex-col gap-[1rem] mt-[20px] `}
                  >
                    <div className="content_text ">
                      <span>
                        <HiCheck />
                      </span>
                      <p>One free profile forever </p>
                    </div>

                    <div className="content_text">
                      <span>
                        <HiCheck />
                      </span>
                      <p> Limited template choices available </p>
                    </div>

                    <div className="content_text">
                      <span>
                        <HiCheck />
                      </span>
                      <p>Basic Qviq Link Store options </p>
                    </div>

                    <div className="content_text">
                      <span>
                        <HiCheck />
                      </span>
                      <p>Basic media apps functionality</p>
                    </div>

                    <div className="content_text">
                      <span>
                        <HiCheck />
                      </span>
                      <p>Basic content sharing features.</p>
                    </div>

                    <div className="content_text">
                      <span>
                        <HiCheck />
                      </span>
                      <p>Basic analytics insights </p>
                    </div>

                    <div className="content_text">
                      <span>
                        <HiCheck />
                      </span>
                      <p>
                        List up to 4 products or services without CTA buttons
                      </p>
                    </div>

                    <div className="content_text">
                      <span className="text-red-600">
                        <HiXMark />
                      </span>
                      <p>No appointment scheduling available</p>
                    </div>
                    <div className="content_text">
                      <span className="text-red-600">
                        <HiXMark />
                      </span>
                      <p>Cannot accept or display reviews.</p>
                    </div>
                    <div className="content_text">
                      <span>
                        <HiCheck />
                      </span>
                      <p>Basic black and white QR code</p>
                    </div>
                    <div className="content_text">
                      <span className="text-red-600">
                        <HiXMark />
                      </span>
                      <p>Custom domain & SEO not allowed</p>
                    </div>
                  </div>
                </div>
                <div className="mt-auto mb-4">
                  <div className="mt-8">
                    <SecondaryButton
                      onClick={() => {
                        handleSubmitPack("basic");
                      }}
                      text="Start Your Free Trial"
                      icon=<svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="21"
                        className="h-5 w-5"
                        viewBox="0 0 20 21"
                        fill="none"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M2 10.5C2 10.0858 2.33579 9.75 2.75 9.75L15.3401 9.75L13.2397 7.7996C12.9361 7.51775 12.9186 7.0432 13.2004 6.73966C13.4823 6.43613 13.9568 6.41856 14.2603 6.70041L17.7603 9.95041C17.9132 10.0923 18 10.2915 18 10.5C18 10.7086 17.9132 10.9077 17.7603 11.0496L14.2603 14.2996C13.9568 14.5815 13.4823 14.5639 13.2004 14.2603C12.9186 13.9568 12.9361 13.4823 13.2397 13.2004L15.3401 11.25L2.75 11.25C2.33579 11.25 2 10.9142 2 10.5Z"
                          fill="url(#paint0_linear_2880_4731)"
                        />
                        <defs>
                          <linearGradient
                            id="paint0_linear_2880_4731"
                            x1="18"
                            y1="6.5"
                            x2="1.08181"
                            y2="11.1826"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="#FB6609" />
                            <stop offset="1" stopColor="#E40849" />
                          </linearGradient>
                        </defs>
                      </svg>
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* ********************************** STARTER PLAN ***************************************** */}
            <div
              className={`contact-box  -mt-[1.5rem] `}
              // onClick={() => handleContactClick("starter")}
            >
              <div className="top-[4rem] z-10 relative ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="149"
                  className="w-36 h-7"
                  height="29"
                  viewBox="0 0 149 29"
                  fill="none"
                >
                  <path d="M0 0H149L134.5 14.5L149 29H0V0Z" fill="#E40849" />
                </svg>
                <span className="absolute bottom-1 text-[#FFFF] text-[14px] font-[600] left-[15px]">
                  Recommended
                </span>
              </div>
              <div
                className={`text-white bg-[#0A0003] relative card_container w-full overflow-hidden  md:w-[500px] lg:w-[368px] h-full md:full lg:h-full`}
                style={{ borderTop: "4px solid #E40849" }}
              >
                <div
                  className="h-[394.485px] absolute left-[-3rem] bottom-[47rem] xl:bottom-[46rem] lg:bottom-[45rem] md:bottom-[35rem] sm:bottom-[30rem] w-[321.644px] rounded-[394.485px] bg-[linear-gradient(210deg,rgba(228,8,73,0.80)39.19%,rgba(251,102,9,0.80)78.88%)] "
                  style={{ transform: "rotate(105deg)", filter: "blur(120px)" }}
                ></div>
                {/* image */}
                <div className="card_image relative ">
                  <Image className="" src={Image2} alt="image" />

                  <div className="absolute flex flex-col justify-center items-center mb-[15px]">
                    <Image src={Icon2} alt="image" />
                    <p className="Image_text">STARTER</p>
                  </div>
                  {/* <div className="RecommendedPrice ">
                    <span className="add-icon">25% OFF</span>
                  </div> */}
                </div>
                {/* heading */}
                <div className="heading_div mt-[24px] lg:mt-[13px] ">
                  <h2 className="font-bold mt-[-20px] lg:mt-[0px] text-[24px] z-50">
                    ₹{" "}
                    {activePlan === "monthly" ? (
                      starterMonthly
                    ) : activePlan === "quarterly" ? (
                      starterQuarterly
                    ) : (
                      <>
                        {isStarterOffer ? (
                          <del>{starterAnnual}</del>
                        ) : (
                          starterAnnual
                        )}
                        {isStarterOffer && starterAnnualOffer}
                      </>
                    )}
                  </h2>
                  <p className="heading_text z-50" style={{ color: "#C7B3B2" }}>
                    {activePlan === "monthly"
                      ? "Per month, billed monthly."
                      : activePlan === "quarterly"
                      ? "Per quarter, billed quarterly."
                      : "Per year, billed yearly."}
                  </p>
                  <p
                    className="heading_para_starter z-50"
                    style={{ color: "#C7B3B2" }}
                  >
                    Customise & analyse your profile
                  </p>
                </div>
                {/* content */}
                <div className="w-full mt-[24px] lg:mt-[32px] flex flex-col ">
                  <div
                    className="w-full h-[22px] flex items-center justify-between"
                    onClick={() => setShowContentStarter(!showContentStarter)}
                  >
                    <p
                      className="content_heading block"
                      style={{ color: "white" }}
                    >
                      Everything in Free, plus:
                    </p>
                    <span className="w-2.5 h-1.5 font-medium md:hidden">
                      {!showContentStarter ? (
                        <HiChevronDown />
                      ) : (
                        <HiChevronUp />
                      )}
                    </span>
                  </div>
                  <div
                    className={`${
                      !showContentStarter ? "hidden" : "flex"
                    } md:flex flex-col gap-[1rem] mt-[20px]`}
                  >
                    <div className="content_text">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M15.4204 5.12789C15.695 5.33708 15.748 5.72924 15.5388 6.00381L8.87213 14.7538C8.76283 14.8972 8.59688 14.9865 8.41693 14.9986C8.23698 15.0107 8.06058 14.9445 7.93304 14.8169L4.18306 11.067C3.93898 10.8229 3.93898 10.4272 4.18306 10.1831C4.42713 9.939 4.82286 9.939 5.06694 10.1831L8.31125 13.4274L14.5445 5.24626C14.7537 4.97169 15.1458 4.9187 15.4204 5.12789Z"
                            fill="url(#paint0_linear_2665_41271)"
                          />
                          <defs>
                            <linearGradient
                              id="paint0_linear_2665_41271"
                              x1="15.6667"
                              y1="5"
                              x2="2.72288"
                              y2="7.08982"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="#FB6609" />
                              <stop offset="1" stopColor="#E40849" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </span>
                      <p>One profile with access to some premium features</p>
                    </div>

                    <div className="content_text">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M15.4204 5.12789C15.695 5.33708 15.748 5.72924 15.5388 6.00381L8.87213 14.7538C8.76283 14.8972 8.59688 14.9865 8.41693 14.9986C8.23698 15.0107 8.06058 14.9445 7.93304 14.8169L4.18306 11.067C3.93898 10.8229 3.93898 10.4272 4.18306 10.1831C4.42713 9.939 4.82286 9.939 5.06694 10.1831L8.31125 13.4274L14.5445 5.24626C14.7537 4.97169 15.1458 4.9187 15.4204 5.12789Z"
                            fill="url(#paint0_linear_2665_41271)"
                          />
                          <defs>
                            <linearGradient
                              id="paint0_linear_2665_41271"
                              x1="15.6667"
                              y1="5"
                              x2="2.72288"
                              y2="7.08982"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="#FB6609" />
                              <stop offset="1" stopColor="#E40849" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </span>
                      <p> More template choices with customization options </p>
                    </div>

                    <div className="content_text">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M15.4204 5.12789C15.695 5.33708 15.748 5.72924 15.5388 6.00381L8.87213 14.7538C8.76283 14.8972 8.59688 14.9865 8.41693 14.9986C8.23698 15.0107 8.06058 14.9445 7.93304 14.8169L4.18306 11.067C3.93898 10.8229 3.93898 10.4272 4.18306 10.1831C4.42713 9.939 4.82286 9.939 5.06694 10.1831L8.31125 13.4274L14.5445 5.24626C14.7537 4.97169 15.1458 4.9187 15.4204 5.12789Z"
                            fill="url(#paint0_linear_2665_41271)"
                          />
                          <defs>
                            <linearGradient
                              id="paint0_linear_2665_41271"
                              x1="15.6667"
                              y1="5"
                              x2="2.72288"
                              y2="7.08982"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="#FB6609" />
                              <stop offset="1" stopColor="#E40849" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </span>
                      <p>Expanded Qviq Link Store options with customization</p>
                    </div>

                    <div className="content_text">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M15.4204 5.12789C15.695 5.33708 15.748 5.72924 15.5388 6.00381L8.87213 14.7538C8.76283 14.8972 8.59688 14.9865 8.41693 14.9986C8.23698 15.0107 8.06058 14.9445 7.93304 14.8169L4.18306 11.067C3.93898 10.8229 3.93898 10.4272 4.18306 10.1831C4.42713 9.939 4.82286 9.939 5.06694 10.1831L8.31125 13.4274L14.5445 5.24626C14.7537 4.97169 15.1458 4.9187 15.4204 5.12789Z"
                            fill="url(#paint0_linear_2665_41271)"
                          />
                          <defs>
                            <linearGradient
                              id="paint0_linear_2665_41271"
                              x1="15.6667"
                              y1="5"
                              x2="2.72288"
                              y2="7.08982"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="#FB6609" />
                              <stop offset="1" stopColor="#E40849" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </span>
                      <p>Full access to media apps</p>
                    </div>

                    <div className="content_text">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M15.4204 5.12789C15.695 5.33708 15.748 5.72924 15.5388 6.00381L8.87213 14.7538C8.76283 14.8972 8.59688 14.9865 8.41693 14.9986C8.23698 15.0107 8.06058 14.9445 7.93304 14.8169L4.18306 11.067C3.93898 10.8229 3.93898 10.4272 4.18306 10.1831C4.42713 9.939 4.82286 9.939 5.06694 10.1831L8.31125 13.4274L14.5445 5.24626C14.7537 4.97169 15.1458 4.9187 15.4204 5.12789Z"
                            fill="url(#paint0_linear_2665_41271)"
                          />
                          <defs>
                            <linearGradient
                              id="paint0_linear_2665_41271"
                              x1="15.6667"
                              y1="5"
                              x2="2.72288"
                              y2="7.08982"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="#FB6609" />
                              <stop offset="1" stopColor="#E40849" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </span>
                      <p>Advanced content customization options</p>
                    </div>

                    <div className="content_text">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M15.4204 5.12789C15.695 5.33708 15.748 5.72924 15.5388 6.00381L8.87213 14.7538C8.76283 14.8972 8.59688 14.9865 8.41693 14.9986C8.23698 15.0107 8.06058 14.9445 7.93304 14.8169L4.18306 11.067C3.93898 10.8229 3.93898 10.4272 4.18306 10.1831C4.42713 9.939 4.82286 9.939 5.06694 10.1831L8.31125 13.4274L14.5445 5.24626C14.7537 4.97169 15.1458 4.9187 15.4204 5.12789Z"
                            fill="url(#paint0_linear_2665_41271)"
                          />
                          <defs>
                            <linearGradient
                              id="paint0_linear_2665_41271"
                              x1="15.6667"
                              y1="5"
                              x2="2.72288"
                              y2="7.08982"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="#FB6609" />
                              <stop offset="1" stopColor="#E40849" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </span>
                      <p>
                        Advanced analytics insights, including performance
                        tracking{" "}
                      </p>
                    </div>

                    <div className="content_text">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M15.4204 5.12789C15.695 5.33708 15.748 5.72924 15.5388 6.00381L8.87213 14.7538C8.76283 14.8972 8.59688 14.9865 8.41693 14.9986C8.23698 15.0107 8.06058 14.9445 7.93304 14.8169L4.18306 11.067C3.93898 10.8229 3.93898 10.4272 4.18306 10.1831C4.42713 9.939 4.82286 9.939 5.06694 10.1831L8.31125 13.4274L14.5445 5.24626C14.7537 4.97169 15.1458 4.9187 15.4204 5.12789Z"
                            fill="url(#paint0_linear_2665_41271)"
                          />
                          <defs>
                            <linearGradient
                              id="paint0_linear_2665_41271"
                              x1="15.6667"
                              y1="5"
                              x2="2.72288"
                              y2="7.08982"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="#FB6609" />
                              <stop offset="1" stopColor="#E40849" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </span>
                      <p>List up to 10 products or services with CTA buttons</p>
                    </div>

                    <div className="content_text">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M15.4204 5.12789C15.695 5.33708 15.748 5.72924 15.5388 6.00381L8.87213 14.7538C8.76283 14.8972 8.59688 14.9865 8.41693 14.9986C8.23698 15.0107 8.06058 14.9445 7.93304 14.8169L4.18306 11.067C3.93898 10.8229 3.93898 10.4272 4.18306 10.1831C4.42713 9.939 4.82286 9.939 5.06694 10.1831L8.31125 13.4274L14.5445 5.24626C14.7537 4.97169 15.1458 4.9187 15.4204 5.12789Z"
                            fill="url(#paint0_linear_2665_41271)"
                          />
                          <defs>
                            <linearGradient
                              id="paint0_linear_2665_41271"
                              x1="15.6667"
                              y1="5"
                              x2="2.72288"
                              y2="7.08982"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="#FB6609" />
                              <stop offset="1" stopColor="#E40849" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </span>
                      <p>Appointment scheduling available </p>
                    </div>
                    <div className="content_text">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M15.4204 5.12789C15.695 5.33708 15.748 5.72924 15.5388 6.00381L8.87213 14.7538C8.76283 14.8972 8.59688 14.9865 8.41693 14.9986C8.23698 15.0107 8.06058 14.9445 7.93304 14.8169L4.18306 11.067C3.93898 10.8229 3.93898 10.4272 4.18306 10.1831C4.42713 9.939 4.82286 9.939 5.06694 10.1831L8.31125 13.4274L14.5445 5.24626C14.7537 4.97169 15.1458 4.9187 15.4204 5.12789Z"
                            fill="url(#paint0_linear_2665_41271)"
                          />
                          <defs>
                            <linearGradient
                              id="paint0_linear_2665_41271"
                              x1="15.6667"
                              y1="5"
                              x2="2.72288"
                              y2="7.08982"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="#FB6609" />
                              <stop offset="1" stopColor="#E40849" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </span>
                      <p>Can accept and display up to 3 verified reviews</p>
                    </div>
                    <div className="content_text">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M15.4204 5.12789C15.695 5.33708 15.748 5.72924 15.5388 6.00381L8.87213 14.7538C8.76283 14.8972 8.59688 14.9865 8.41693 14.9986C8.23698 15.0107 8.06058 14.9445 7.93304 14.8169L4.18306 11.067C3.93898 10.8229 3.93898 10.4272 4.18306 10.1831C4.42713 9.939 4.82286 9.939 5.06694 10.1831L8.31125 13.4274L14.5445 5.24626C14.7537 4.97169 15.1458 4.9187 15.4204 5.12789Z"
                            fill="url(#paint0_linear_2665_41271)"
                          />
                          <defs>
                            <linearGradient
                              id="paint0_linear_2665_41271"
                              x1="15.6667"
                              y1="5"
                              x2="2.72288"
                              y2="7.08982"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="#FB6609" />
                              <stop offset="1" stopColor="#E40849" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </span>
                      <p>Change QR code color</p>
                    </div>
                    <div className="content_text">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M15.4204 5.12789C15.695 5.33708 15.748 5.72924 15.5388 6.00381L8.87213 14.7538C8.76283 14.8972 8.59688 14.9865 8.41693 14.9986C8.23698 15.0107 8.06058 14.9445 7.93304 14.8169L4.18306 11.067C3.93898 10.8229 3.93898 10.4272 4.18306 10.1831C4.42713 9.939 4.82286 9.939 5.06694 10.1831L8.31125 13.4274L14.5445 5.24626C14.7537 4.97169 15.1458 4.9187 15.4204 5.12789Z"
                            fill="url(#paint0_linear_2665_41271)"
                          />
                          <defs>
                            <linearGradient
                              id="paint0_linear_2665_41271"
                              x1="15.6667"
                              y1="5"
                              x2="2.72288"
                              y2="7.08982"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="#FB6609" />
                              <stop offset="1" stopColor="#E40849" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </span>
                      <p>Custom domain & SEO not allowed </p>
                    </div>
                    <div className="content_text">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M15.4204 5.12789C15.695 5.33708 15.748 5.72924 15.5388 6.00381L8.87213 14.7538C8.76283 14.8972 8.59688 14.9865 8.41693 14.9986C8.23698 15.0107 8.06058 14.9445 7.93304 14.8169L4.18306 11.067C3.93898 10.8229 3.93898 10.4272 4.18306 10.1831C4.42713 9.939 4.82286 9.939 5.06694 10.1831L8.31125 13.4274L14.5445 5.24626C14.7537 4.97169 15.1458 4.9187 15.4204 5.12789Z"
                            fill="url(#paint0_linear_2665_41271)"
                          />
                          <defs>
                            <linearGradient
                              id="paint0_linear_2665_41271"
                              x1="15.6667"
                              y1="5"
                              x2="2.72288"
                              y2="7.08982"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="#FB6609" />
                              <stop offset="1" stopColor="#E40849" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </span>
                      <p>Remove Qviq Branding from your Qviqsite</p>
                    </div>
                  </div>
                </div>
                <div className="mt-auto mb-4">
                  <div className="mt-4">
                    <PrimaryButton3
                      text="Get Starter Plan"
                      onClick={() => {
                        handleSubmitPack("starter");
                      }}
                      color={
                        "linear-gradient(225deg, #FB6609 0%, #E40849 100%)"
                      }
                      textcolor={"#FFFF"}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* ********************************** PRO PLAN ************************************** */}
            <div
              className={`contact-box ${
                activeContact === "contact1" ? "active" : ""
              }`}
              // onClick={() => handleContactClick("pro")}
            >
              <div
                className={`card_container w-full  md:w-[500px] lg:w-[368px] h-full md:full lg:h-full`}
                style={{ borderTop: "4px solid black" }}
              >
                {/* image */}
                <div className="card_image relative">
                  <Image className="" src={Image3} alt="image" />
                  <div className="absolute flex flex-col justify-center items-center">
                    <Image className="w-[48px] h-[48px]" src={Icon3} alt="image" />
                    <p className="Image_text">PRO</p>
                  </div>
                </div>
                {/* heading */}
                <div className="heading_div mt-[24px] lg:mt-[32px] ">
                  <h1 className="font-bold text-[24px]">
                    ₹{" "}
                    {activePlan === "monthly" ? (
                      proMonthly
                    ) : activePlan === "quarterly" ? (
                      proQuarterly
                    ) : (
                      <>
                        {isProOffer ? <del>{proAnnual}</del> : proAnnual}
                        {isProOffer && proAnnualOffer}
                      </>
                    )}
                  </h1>
                  <p className="heading_text">
                    {activePlan === "monthly"
                      ? "Per month, billed monthly."
                      : activePlan === "quarterly"
                      ? "Per quarter, billed quarterly."
                      : "Per year, billed yearly."}
                  </p>
                  <p className="heading_para_pro">
                    Create multiple Qviq profiles
                  </p>
                </div>
                {/* content */}
                <div className="w-full mt-[24px] lg:mt-[32px] flex flex-col">
                  <div
                    className="w-full h-[22px] flex items-center justify-between "
                    onClick={() => setShowContentPro(!showContentPro)}
                  >
                    <p className="content_heading block">
                      Everything in Starter, plus:
                    </p>
                    <Image
                      className="w-[10px] h-[6px] md:hidden"
                      src={!showContentPro ? DownArrow : UpArrow}
                      alt="image"
                    />
                  </div>
                  <div
                    className={`${
                      !showContentPro ? "hidden" : "flex"
                    }  md:flex flex-col gap-[1rem] mt-[20px] `}
                  >
                    <div className="content_text">
                      <span>
                        <HiCheck />
                      </span>
                      <p>Create Up to 3 Qviqsites</p>
                    </div>

                    <div className="content_text">
                      <span>
                        <HiCheck />
                      </span>
                      <p>
                        Full access to all templates and customization features{" "}
                      </p>
                    </div>

                    <div className="content_text">
                      <span>
                        <HiCheck />
                      </span>
                      <p>
                        Complete Qviq Link Store access with extensive
                        customization{" "}
                      </p>
                    </div>

                    <div className="content_text">
                      <span>
                        <HiCheck />
                      </span>
                      <p>Full functionality of all media apps</p>
                    </div>

                    <div className="content_text">
                      <span>
                        <HiCheck />
                      </span>
                      <p>Unlimited content customization options </p>
                    </div>

                    <div className="content_text">
                      <span>
                        <HiCheck />
                      </span>
                      <p>
                        Advanced analytics insights, detailed performance
                        tracking{" "}
                      </p>
                    </div>

                    <div className="content_text">
                      <span>
                        <HiCheck />
                      </span>
                      <p>Unlimited products or services with CTA buttons </p>
                    </div>

                    <div className="content_text">
                      <span>
                        <HiCheck />
                      </span>
                      <p>Full access to appointment scheduling feature</p>
                    </div>
                    <div className="content_text">
                      <span>
                        <HiCheck />
                      </span>
                      <p>Can accept and display up to 10 verified reviews</p>
                    </div>
                    <div className="content_text">
                      <span>
                        <HiCheck />
                      </span>
                      <p>Change QR code color and add a logo</p>
                    </div>
                    <div className="content_text">
                      <span>
                        <HiCheck />
                      </span>
                      <p>Custom domain & SEO allowed</p>
                    </div>
                    <div className="content_text">
                      <span>
                        <HiCheck />
                      </span>
                      <p> Remove Qviq branding from your Qviqsite</p>
                    </div>
                  </div>
                </div>
                <div className="mt-auto mb-4">
                  <div className="mt-4">
                    <SecondaryButton
                      onClick={() => {
                        handleSubmitPack("pro");
                      }}
                      text="Get Pro Plan"
                      icon=<svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="21"
                        className="h-5 w-5"
                        viewBox="0 0 20 21"
                        fill="none"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M2 10.5C2 10.0858 2.33579 9.75 2.75 9.75L15.3401 9.75L13.2397 7.7996C12.9361 7.51775 12.9186 7.0432 13.2004 6.73966C13.4823 6.43613 13.9568 6.41856 14.2603 6.70041L17.7603 9.95041C17.9132 10.0923 18 10.2915 18 10.5C18 10.7086 17.9132 10.9077 17.7603 11.0496L14.2603 14.2996C13.9568 14.5815 13.4823 14.5639 13.2004 14.2603C12.9186 13.9568 12.9361 13.4823 13.2397 13.2004L15.3401 11.25L2.75 11.25C2.33579 11.25 2 10.9142 2 10.5Z"
                          fill="url(#paint0_linear_2880_4731)"
                        />
                        <defs>
                          <linearGradient
                            id="paint0_linear_2880_4731"
                            x1="18"
                            y1="6.5"
                            x2="1.08181"
                            y2="11.1826"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="#FB6609" />
                            <stop offset="1" stopColor="#E40849" />
                          </linearGradient>
                        </defs>
                      </svg>
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <PricingFooter /> */}

        <div className="flex py-[28px] px-[20px] md:pl-[80px] bg-[#0A0003] relative overflow-hidden mt-[64px] md:mt-[124px]">
          <div>
            <div className="font-[900] w-[16rem] flex flex-col text-base sm:w-full xsm2:text-[20px] leading-[28px] md:text-[30px] md:leading-[36px]  lg:text-[40px] lg:leading-[64px] text-white  pb-8">
              <p> Still need help? </p>
              <p className=" max-w-[61rem] lg:w-[61rem] md:w-[26rem]">
                Our team is happy to assist you
              </p>
            </div>
            <PrimaryButton3
              text="Contact Us"
              icon={<HiChevronRight />}
              onClick={() => {
                navigate.push("/contact");
              }}
            />
          </div>
          <div>
            <div className=" h-[140px] w-[143px] top-12 right-4 blur-[50px] md:w-[283px] xsm2:top-12 relative 2xl:left-0 xl:left-0 lg:right-[21rem] md:right-[-3rem] sm:right-[-1rem] sm:top-[5rem] sm:h-[276px] rounded-[283px] bg-[linear-gradient(210deg,rgba(228,8,73,0.80)39.19%,rgba(251,102,9,0.80)78.88%)] md:blur-[120px]"></div>
            <Image
              className="h-[266px] w-[267px] bottom-[-120px] right-[-4rem] lg:h-[787px] lg:w-[787px] xl:left-[53vw] absolute lg:left-[30rem]  md:left-[25rem]   sm:h-[34rem] sm:w-[34rem] sm:top-[2rem]  lg:top-[-3rem]  xsm2:h-[26rem] xsm2:w-[23rem] xsm2:left-[10rem] xsm2:top-0  xsm:h-[20rem] xsm:left-[7rem] xsm:top-[3.5rem] "
              src={require("./assets/Saly-7.png")}
              alt="phone"
            />
          </div>
        </div>
        <Footer />
      </div>

      {/* {paymentModal && (
        <SubscriptionCart
          setPaymentModal={setPaymentModal}
          handlePlanSelect={handlePlanSelect}
          isRecurringPayment={isRecurringPayment}
        />
      )} */}

      {paymentModal && (
        <NewModal
          text="Select Payment Options"
          onModal={paymentModal}
          onClick={setPaymentModal}
        >
          <div className="pt-[20px] sm:pt-[30px] pb-[60px] sm:pb-[30px] px-[15px] sm:px-[20px] flex flex-col gap-[30px]">
            <div className="w-full h-full px-[15px] py-[20px] rounded-[10px] border-dashed border-slate-400 border-[2px] bg-slate-100 leading-[22px] sm:leading-[34px] text-[12px] sm:text-[16px]">
              {!basic ? (
                <p>
                  Your previously activated
                  <b className="px-[6px] sm:px-[10px] pb-[2px] sm:pb-[5px] pt-[1px] sm:pt-[5px] mx-[2px] sm:mx-[5px] leading-[22px] sm:leading-[34px] text-[12px] sm:text-[16px] text-black bg-slate-300 rounded-md">
                    {basic ? "Basic Free" : starter ? "Starter" : pro && "Pro"}
                  </b>{" "}
                  plan will expire on{" "}
                  <b className="px-[6px] sm:px-[10px] pb-[2px] sm:pb-[5px] pt-[1px] sm:pt-[5px] mx-[2px] sm:mx-[5px] leading-[22px] sm:leading-[34px] text-[12px] sm:text-[16px] text-black bg-slate-300 rounded-md">
                    {formattedExpDate}
                  </b>
                  .
                </p>
              ) : (
                <p>
                  Your previously activated plan was{" "}
                  <b className="px-[6px] sm:px-[10px] pb-[2px] sm:pb-[5px] pt-[1px] sm:pt-[5px] mx-[2px] sm:mx-[5px] leading-[22px] sm:leading-[34px] text-[12px] sm:text-[16px] text-black bg-slate-300 rounded-md">
                    {basic ? "Basic Free" : starter ? "Starter" : pro && "Pro"}
                  </b>{" "}
                  plan.
                </p>
              )}
              <br />
              <p>
                Your currently selected{" "}
                <b className="px-[6px] sm:px-[10px] pb-[2px] sm:pb-[5px] pt-[1px] sm:pt-[5px] mx-[2px] sm:mx-[5px] leading-[22px] sm:leading-[34px] text-[12px] sm:text-[16px] text-black bg-slate-300 rounded-md">
                  {activePlan + " " + activeContact}
                </b>{" "}
                plan will active from{" "}
                <b className="px-[6px] sm:px-[10px] pb-[2px] sm:pb-[5px] pt-[1px] sm:pt-[5px] mx-[2px] sm:mx-[5px] leading-[22px] sm:leading-[34px] text-[12px] sm:text-[16px] text-black bg-slate-300 rounded-md">
                  {formattedExpDate}
                </b>{" "}
                and will expire on{" "}
                <b className="px-[6px] sm:px-[10px] pb-[2px] sm:pb-[5px] pt-[1px] sm:pt-[5px] mx-[2px] sm:mx-[5px] leading-[22px] sm:leading-[34px] text-[12px] sm:text-[16px] text-black bg-slate-300 rounded-md">
                  {futureExpDate}
                </b>
              </p>
            </div>

            <div className="px-[10px] gap-[5px] flex flex-col">
              <div className="flex flex-row justify-start items-center gap-[10px]">
                <input
                  type="checkbox"
                  checked={isRecurringPayment}
                  onChange={(e) => setIsRecurringPayment(e.target.checked)}
                  className=""
                />
                <p className="">Enable auto renewal</p>
              </div>
              <p className="text-[12px] sm:text-[13px] font[500] ">
                ** When this checkbox is not selected, the payment will be one
                time
              </p>
            </div>

            <PrimaryButton2
              text={
                isRecurringPayment
                  ? "Proceed with auto renewal"
                  : "Proceed with one time payment"
              }
              onClick={() => {
                setPaymentModal(false);
                handlePlanSelect(isRecurringPayment ? "recurring" : "one-time");
              }}
              width="100%"
            />
          </div>
        </NewModal>
      )}
      </div>
    </div>
  );
};

export default Pricing;
