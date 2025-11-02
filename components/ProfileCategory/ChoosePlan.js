"use client";
import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import TapopLogo from "../Login/assets/Tapop Final Logo Concept 1 2.svg";
import "./profile.css";
import Image1 from "./assets/Image1.svg";
import Image2 from "./assets/Image2.svg";
import Image3 from "./assets/Image3.svg";
import Right from "./assets/Right.svg";
import Circle from "./assets/circle.svg";
import Icon2 from "./assets/Icon2.svg";
import Icon3 from "./assets/Icon3.svg";
import { HiXMark } from "react-icons/hi2";

import {
  HiOutlineArrowSmRight,
  HiOutlineChevronDown,
  HiOutlineChevronUp,
} from "react-icons/hi";
import PrimaryButton from "../UiComponents/PrimaryButton";
import TertiaryButton from "../UiComponents/TertiaryButton";
import { useContext } from "react";
import { UserContext } from "../Contexts/context";
import { serverUrl, clientUrl } from "../../config";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import "../UiComponents/UiStyles.css";
import SecondaryButton from "../UiComponents/SecondaryButton";
import NewModal from "../UiComponents/NewModal/NewModal";
import PrimaryButton2 from "../UiComponents/PrimaryButton2";
import { SafeLocalStorage, createQueryString, getCookie } from "@/components/utils";

export default function ChoosePlan({ searchParams }) {
  const [isEmailVerified, setIsEmailVerified] = useState(true);

  const [showContentStarter, setShowContentStarter] = useState(false);
  const [showContentBasic, setShowContentBasic] = useState(false);
  const [showContentPro, setShowContentPro] = useState(false);
  const [paymentModal, setPaymentModal] = useState(false);

  const profile = useParams().userName;

  const fromsignup =
    searchParams.fromsignup !== undefined ? searchParams.fromsignup : false;
  const fromPage =
    searchParams.fromPage !== undefined ? searchParams.fromPage : "admin";

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
        `${serverUrl}/getUser/getUser/${profile}`,
        config
      );

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
      console.log(error);
    }
  };

  useEffect(() => {
    if (profile) {
      fetchData();
    }
  }, [profile, basic, starter, pro, activePlan]);
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


  useEffect(() => {
    if (fromPage === "pricing") {
      const pack = SafeLocalStorage.getItem("pack");
      const duration = SafeLocalStorage.getItem("duration");
      setActivePlan(duration);
      setActiveContact(pack);
    }
  }, [fromPage]);

  // plan price
  const handleContactClick = (contactName) => {
    setActiveContact(contactName);
  };
  const navigate = useRouter();
  const { updateCheckVariable, userEmail, userFullName } = useContext(UserContext);

  const handleSubmitPack = () => {
    if (activeContact === "basic") {
      navigate.push(
        `/chooseprofile/${profile}?` +
          createQueryString(["fromPage","fromsignup"], [fromPage,fromsignup])
      );
    }

    if (activeContact === "starter" || activeContact === "pro") {
      setPaymentModal(true);
    }
    // else if (activeContact === "starter") {
    //   if (activePlan === "monthly") {
    //     handlePlanSelect(1);
    //   } else if (activePlan === "quarterly") {
    //     handlePlanSelect(3);
    //   } else {
    //     handlePlanSelect(12);
    //   }
    // } else if (activeContact === "pro") {
    //   if (activePlan === "monthly") {
    //     handlePlanSelect(1);
    //   } else if (activePlan === "quarterly") {
    //     handlePlanSelect(3);
    //   } else {
    //     handlePlanSelect(12);
    //   }
    // }
    updateCheckVariable();
  };

  const handlePlanSelect = async (paymentOption) => {
    let amount;
    let plan = 1;

    if (activePlan === "quarterly") {
      plan = 3;
    } else if (activePlan === "annual") {
      plan = 12;
    }

    if (activeContact === "starter") {
      if (plan === 1) {
        amount = starterMonthly;
      } else if (plan === 3) {
        amount = starterQuarterly;
      } else if (plan === 12) {
        amount = isStarterOffer ? starterAnnualOffer : starterAnnual;
      }
    } else if (activeContact === "pro") {
      if (plan === 1) {
        amount = proMonthly;
      } else if (plan === 3) {
        amount = proQuarterly;
      } else if (plan === 12) {
        amount = isProOffer ? proAnnualOffer : proAnnual;
      }
    }

    const planData = {
      username: profile,
      planType: activeContact,
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
    // fetch(`${serverUrl}/tapopuser/planPayment`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: "Bearer " + getCookie("jwt_token"),
    //   },
    //   body: JSON.stringify({ plan }),
    // })
    //   .then((res) => {
    // if (res.ok) {

    const url = response.data.url;
    window.location.href = url;
    // console.log("Plan selected successfully");
    // navigate.push(`/chooseprofile/${profile}`, {
    //   state: { fromPage: fromPage, fromsignup: fromsignup },
    // });
    // } else {
    //   console.error(`Error selecting plan: ${res.statusText}`);
    // }
    // })
    // .catch((err) => {
    //   console.error(`Error selecting plan: ${err}`);
    // });
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

    const {data} = await axios.post(
      `${serverUrl}/tapopuser/v2/planPayment`,
      planData
    );

    let options = {
      ...data.options,
      handler:async function(response){
        const paymentStatusCheck = await axios
        .post(`${serverUrl}/tapopuser/v2/paymentStatusCheck/${data.options.order_id? 
          data.options.order_id:data.options.subscription_id}`,
          {
            planData:data.planData,
            razorpayData:response
        });
        if(paymentStatusCheck.data.success){
          const affiliateId = window.sessionStorage.getItem("affiliateLink");
          if(affiliateId != null){
            axios
            .post(`${serverUrl}/admin/affiliateLink/addTransaction`,
              {
                link:affiliateId,
                transactionData:{
                  name:userFullName,
                  email:userEmail,
                  amount:planData.amount,
                  date:new Date().toISOString(),
                  transactionId:(data.options.order_id? 
                    data.options.order_id:data.options.subscription_id),
                  type:"plan_payment",
                },
            }).catch(err=>console.log(err));
          }
          window.location.href = `${clientUrl}/chooseprofile/${profile}`;
        }
        else{
          window.location.href = `${clientUrl}/error`;
        }
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.on('payment.failed', function (response){
      window.location.href = `${clientUrl}/error`;
    });
    paymentObject.open();
  }

  // Razorpay End

  useEffect(() => {
    const cartItems = SafeLocalStorage.getItem("cart");
    SafeLocalStorage.setItem("yourCartItems", cartItems);
  }, [SafeLocalStorage.getItem("cart")]);

  return (
    <div className="w-screen h-csreen overflow-auto bg-[#FFFFFF]">
      <div>
        {/* ******************** Tapop logo ************* */}
        <div
          className="mt-[32px] lg:mt-[48px] ml-[20px] md:ml-[50px] lg:ml-[78px] w-[123.34] 
                    md:w-[140px] lg:w-[154.56px] h-[32px] md:h-[37px] lg:h-[40px]"
        >
          {!fromsignup ? (
            <Link
              className="hover:cursor-pointer"
              href={`/selectprofile/${profile}`}
            >
              <Image
                src={TapopLogo}
                alt="logo"
                className="max-w-full max-h-full"
              />
            </Link>
          ) : (
            <Image
              src={TapopLogo}
              alt="logo"
              className="max-w-full max-h-full"
            />
          )}
        </div>
        <div className="flex flex-col items-center justify-center w-full md:m-0 pb-10">
          {/* **************** Heading Container  ******************************** */}
          <div className="flex flex-col m-[1rem]  sm:items-center md:items-start lg:items-center mt-[40px] lg:mt-[64px] ">
            <h1 className="font-bold text-[22px] xsm:text-[28px] md:text-[38px] lg:text-[48px] w-full md:w-[600px] lg:w-[712px]">
              Choose the right plan for you
            </h1>
            <p className=" font-medium  text-[#817C7C] text-[14px] xsm:text-[16px] sm:text-[20px] poppins w-full md:w-[547px] lg:w-[547px] h-[44px] md:h-[100%] lg:h-[28px] mt-[8px] md:mt-[8px] lg:mt-[12px]">
              You can upgrade your plan anytime, as per your need
            </p>
          </div>

          {/* ******************** Choose Monthly plans ******************************** */}
          <div className="px-1 py-4 xsm:p-[1rem] flex justify-center w-full">
            <div className="month_container w-[95vw] xsm:w-[90vw] sm:w-fit min-h-[48px] mt-[0px] md:mt-[40px] md:ml-[-22px] flex gap-1 flex-row justify-between items-center relative ">
              <div
                className={`Choose_plan ${
                  activePlan === "monthly" ? "active" : ""
                }`}
                onClick={() => setActivePlan("monthly")}
              >
                Monthly
              </div>
              <div
                className={`Choose_plan ${
                  activePlan === "quarterly" ? "active" : ""
                }`}
                onClick={() => setActivePlan("quarterly")}
              >
                Quarterly
                <p className="add-icon text-[9px] active:!text-[7px] absolute xsm2:relative mb-[51px]  xsm2:mt-[50px]  sm:text-[13px] sm:active:!text-[11px]  sm:mt-[53px]  xsm2:w-16 w-11 ">
                  25% OFF
                </p>
              </div>
              <div
                className={`Choose_plan ${
                  activePlan === "annual" ? "active" : ""
                }`}
                onClick={() => setActivePlan("annual")}
              >
                Annual
                <p className="add-icon text-[9px] active:!text-[7px] absolute xsm2:relative mb-[52px]  xsm2:mt-[53px]  sm:text-[13px] sm:active:!text-[11px]  sm:mt-[53px]  xsm2:w-16 w-11 ">
                  50% OFF
                </p>
              </div>
            </div>
          </div>

          {/* ********************** Plans Selection ****************************************** */}
          <div className="flex flex-col [@media(min-width:1200px)]:flex-row gap-7 mt-2 lg:mt-6 mx-1 pb-[7rem]">
            {/******************* BASIC PLAN ************************** */}
            <div
              className={`contact-box ${
                activeContact === "card" ? "active" : ""
              }`}
              onClick={() => handleContactClick("basic")}
            >
              <div
                className={`${
                  activeContact === "basic" ? "active_container" : ""
                } card_container w-full  md:w-[500px] lg:w-[368px] h-full md:full lg:h-full`}
                style={{borderTop: "4px solid black"}}
              >
                {/* image */}
                <div className="card_image relative">
                  <Image className="" src={Image1} alt="Image1" />
                  <div className="absolute flex flex-col justify-center items-center">
                    <Image src={Circle} alt="Circle" />
                    <p className="Image_text">Basic</p>
                  </div>
                  <div className="absolute top-3 right-3 sm:top-5 sm:right-5 w-[20px] h-[20px] border-[1px] border-solid border-[#FFFFFF] rounded-md bg-transparent">
                    {activeContact === "basic" ? (
                      <input
                        className=" !mb-4 w-[20px] h-[15px] "
                        checked="true"
                        type="checkbox"
                      />
                    ) : (
                      ""
                    )}
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
                    <span className=" xl:hidden">
                      {!showContentBasic ? (
                        <HiOutlineChevronDown />
                      ) : (
                        <HiOutlineChevronUp />
                      )}
                    </span>
                  </div>
                  <div
                    className={`${
                      !showContentBasic ? "hidden" : "flex"
                    } xl:flex flex-col gap-[1rem] mt-[20px] `}
                  >
                    <div className="content_text hidden">
                      <Image src={Right} alt="Right" />
                      <p>One free profile forever</p>
                    </div>

                    <div className="content_text">
                      <Image src={Right} alt="Right" />
                      <p>Limited template choices available </p>
                    </div>

                    <div className="content_text">
                      <Image src={Right} alt="Right" />
                      <p>Basic Qviq Link Store options</p>
                    </div>

                    <div className="content_text">
                      <Image src={Right} alt="Right" />
                      <p>Basic media apps functionality</p>
                    </div>

                    <div className="content_text">
                      <Image src={Right} alt="Right" />
                      <p> Basic content sharing features</p>
                    </div>

                    <div className="content_text">
                      <Image src={Right} alt="Right" />
                      <p>Basic analytics insights </p>
                    </div>

                    <div className="content_text">
                      <Image src={Right} alt="Right" />
                      <p>
                        List up to 4 products or services without CTA buttons
                      </p>
                    </div>

                    <div className="content_text">
                      <span className="text-red-600">
                        <HiXMark />
                      </span>
                      <p> No appointment scheduling available</p>
                    </div>
                    <div className="content_text">
                      <span className="text-red-600">
                        <HiXMark />
                      </span>
                      <p> Cannot accept or display reviews</p>
                    </div>
                    <div className="content_text">
                      <Image src={Right} alt="Right" />
                      <p>Basic black and white QR code</p>
                    </div>
                    <div className="content_text">
                      <span className="text-red-600">
                        <HiXMark />
                      </span>
                      <p> Custom domain & SEO not allowed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ********************************** STARTER PLAN ***************************************** */}
            <div
              className={`contact-box relative top-[-1.5rem]`}
              onClick={() => handleContactClick("starter")}
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
                className={`${
                  activeContact === "starter" ? "active_container" : ""
                } card_container w-full  md:w-[500px] lg:w-[368px] h-full md:full lg:h-full relative overflow-hidden bg-[#0A0003] text-white`}
                style={{borderTop: "4px solid #E40849"}}
              >
                <div
                  className="h-[394.485px] absolute left-[-3rem] bottom-[38rem] xl:bottom-[45rem] lg:bottom-[45rem] md:bottom-[32rem] sm:bottom-[30rem] w-[321.644px] rounded-[394.485px] bg-[linear-gradient(210deg,rgba(228,8,73,0.80)39.19%,rgba(251,102,9,0.80)78.88%)] "
                  style={{ transform: "rotate(105deg)", filter: "blur(120px)" }}
                ></div>
                {/* image */}
                <div className="card_image relative ">
                  <Image className="" src={Image2} alt="Right" />
                  <div className="absolute flex flex-col justify-center items-center mb-[15px]">
                    <Image src={Icon2} alt="Right" />
                    <p className="Image_text">STARTER</p>
                  </div>
                  <div className="absolute top-3 right-3 sm:top-5 sm:right-5 w-[20px] h-[20px] border-[1px] border-solid border-[#FFFFFF] rounded-md bg-transparent">
                    {activeContact === "starter" ? (
                      <input
                        className=" mb-4 w-[20px] h-[15px] "
                        checked="true"
                        type="checkbox"
                      />
                    ) : (
                      ""
                    )}
                  </div>
                  {/* <div className="RecommendedPrice ">
                    <span className="add-icon">35% OFF</span>
                  </div> */}
                </div>
                {/* heading */}
                <div className="heading_div mt-[24px] lg:mt-[13px] ">
                  <h2 className="font-bold mt-[-20px] lg:mt-[0px] text-[24px] z-50 ">
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
                  <p className="heading_text z-50 text-[#C7B3B2] ">
                    {activePlan === "monthly"
                      ? "Per month, billed monthly."
                      : activePlan === "quarterly"
                      ? "Per quarter, billed quarterly."
                      : "Per year, billed yearly."}
                  </p>
                  <p className="heading_para_starter z-50 text-[#C7B3B2]">
                    Customise & analyse your profile
                  </p>
                </div>
                {/* content */}
                <div className="w-full mt-[24px] lg:mt-[32px] flex flex-col ">
                  <div
                    className="w-full h-[22px] flex items-center justify-between "
                    onClick={() => setShowContentStarter(!showContentStarter)}
                  >
                    <p
                      className="content_heading block"
                      style={{ color: "white" }}
                    >
                      Everything in Free, plus:
                    </p>
                    <span className=" xl:hidden">
                      {!showContentStarter ? (
                        <HiOutlineChevronDown />
                      ) : (
                        <HiOutlineChevronUp />
                      )}
                    </span>
                  </div>
                  <div
                    className={`${
                      !showContentStarter ? "hidden" : "flex"
                    } xl:flex flex-col gap-[1rem] mt-[20px]`}
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
                      <p>One profile with access to some premium features </p>
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
                      <p>More template choices with customization options </p>
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
                        Expanded Qviq Link Store options with customization{" "}
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
                      <p> Full access to media apps </p>
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
                      <p>Advanced content customization options </p>
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
                        tracking
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
                      <p>
                        List up to 10 products or services with CTA buttons{" "}
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
                      <p>Can accept and display up to 3 verified reviews </p>
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
                      <p>Change QR code color </p>
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
                      <p> Remove Qviq Branding from your Qviqsite </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ********************************** PRO PLAN ************************************** */}
            <div
              className={`contact-box ${
                activeContact === "contact1" ? "active" : ""
              }`}
              onClick={() => handleContactClick("pro")}
            >
              <div
                className={`${
                  activeContact === "pro" ? "active_container" : ""
                } card_container w-full  md:w-[500px] lg:w-[368px] h-full md:full lg:h-full`}
                style={{borderTop: "4px solid black"}}
              >
                {/* image */}
                <div className="card_image relative">
                  <Image className="" src={Image3} alt="Right" />
                  <div className="absolute flex flex-col justify-center items-center">
                    <Image className="w-[48px] h-[48px]" src={Icon3} alt="Right" />
                    <p className="Image_text">PRO</p>
                  </div>
                  <div className="absolute top-3 right-3 sm:top-5 sm:right-5 w-[20px] h-[20px] border-[1px] border-solid border-[#FFFFFF] rounded-md bg-transparent">
                    {activeContact === "pro" ? (
                      <input
                        className=" mb-4 w-[20px] h-[15px] "
                        checked="true"
                        type="checkbox"
                      />
                    ) : (
                      ""
                    )}
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
                    <span className=" xl:hidden">
                      {!showContentPro ? (
                        <HiOutlineChevronDown />
                      ) : (
                        <HiOutlineChevronUp />
                      )}
                    </span>
                  </div>
                  <div
                    className={`${
                      !showContentPro ? "hidden" : "flex"
                    } xl:flex flex-col gap-[1rem] mt-[20px] `}
                  >
                    <div className="content_text">
                      <Image src={Right} alt="Right" />
                      <p>Create Up to 3 Qviqsites </p>
                    </div>

                    <div className="content_text">
                      <Image src={Right} alt="Right" />
                      <p>
                        Full access to all templates and customization features
                      </p>
                    </div>

                    <div className="content_text">
                      <Image src={Right} alt="Right" />
                      <p>
                        Complete Qviq Link Store access with extensive
                        customization
                      </p>
                    </div>

                    <div className="content_text">
                      <Image src={Right} alt="Right" />
                      <p>Full functionality of all media apps</p>
                    </div>

                    <div className="content_text">
                      <Image src={Right} alt="Right" />
                      <p>Unlimited content customization options</p>
                    </div>

                    <div className="content_text">
                      <Image src={Right} alt="Right" />
                      <p>
                        Advanced analytics insights, detailed performance
                        tracking
                      </p>
                    </div>

                    <div className="content_text">
                      <Image src={Right} alt="Right" />
                      <p>Unlimited products or services with CTA buttons</p>
                    </div>

                    <div className="content_text">
                      <Image src={Right} alt="Right" />
                      <p>Full access to appointment scheduling feature</p>
                    </div>
                    <div className="content_text">
                      <Image src={Right} alt="Right" />
                      <p>Can accept and display up to 10 verified reviews</p>
                    </div>
                    <div className="content_text">
                      <Image src={Right} alt="Right" />
                      <p>Change QR code color and add a logo</p>
                    </div>
                    <div className="content_text">
                      <Image src={Right} alt="Right" />
                      <p>Custom domain & SEO allowed</p>
                    </div>
                    <div className="content_text">
                      <Image src={Right} alt="Right" />
                      <p>Remove Qviq branding from your Qviqsite</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* *********************************** Submit button **********************************  */}
          <div className="w-[calc(100%-10px)] xsm:w-[calc(100%-40px)] xsm2:w-[376px] md:w-[500px] lg:w-[592px] fixed left-1/2 -translate-x-1/2 bottom-12 z-[99]">
            <button
              type="button"
              className="btn-primary text-white font-medium rounded-full flex"
              onClick={handleSubmitPack}
              style={{
                width: "100%",
                height: "48px",
                display: "flex",
                justifyContent: "center",
                gap: "6px",
                alignItems: "center",
                cursor: "pointer",
              }}
              text="Get Starter Plan"
            >
              <p>{`Get ${
                activeContact.charAt(0).toUpperCase() + activeContact.slice(1)
              } Plan`}</p>
              <span className="text-xl">
                <HiOutlineArrowSmRight />
              </span>
            </button>
          </div>
        </div>

        {/* <div>
        {isEmailVerified ? (
          <p>Email verified, proceed with onboarding process</p>
        ) : (
          <p>
            Please check your email and verify your email address to proceed
            with the onboarding process
          </p>
        )}
      </div> */}
      </div>
      
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
  );
}
