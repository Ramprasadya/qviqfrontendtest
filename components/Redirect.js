"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import LoadingAnimation from "./UiComponents/Loading/LoadingAnimation";
import { clientUrl, hostname, serverUrl } from "../config";
import ViewProfile from "./Profile/Profile";
import Bowser from "bowser";
import Image from "next/image";
import { redirect, useSearchParams } from "next/navigation";
import AutoDownloadVCF from "./Utils/AutoDownloadVCF";
import LoadingAnimation1 from "./UiComponents/Loading/LoadingAnimation1";

const RedirectPage = ({ data, searchParams }) => {
  const [sec, setSec] = useState(3);
  const [showContent, setShowContent] = useState(false);
  const [qrGoogle,setQrGoogle] = useState(false)
  useEffect(() => {
    const timer = setInterval(() => {
      setSec((prevSec) => prevSec - 1);
    }, 1000);

    if (sec === 0) {
      clearInterval(timer);
      setShowContent(true);
    }

    return () => {
      clearInterval(timer);
    };
  }, [sec]);
  // Get user come from qr code or not 
  const searchParam = useSearchParams();
  useEffect(
    (e) => {
      const source = searchParam.get("source");
      if (source === "qr") {
        setQrGoogle(true)
        console.log("User came from QR code");
      }
    },
    [searchParam]
  );

  useEffect(() => {
    if (
      window.location.hostname.split(".").length >
      (hostname === "localhost:3000" ? 2 : 3)
    )
      // redirect(`${clientUrl}/err`);

    (async () => {
      // updating analytics profile view count
      try {
        const ipResponse = await axios.get("https://ipapi.co/json/");
        const ipData = ipResponse.data;
        await axios.post(
          `${serverUrl}/analytics/profileview/${data.templateId}/${data.userName}`,
          {
            ip: ipData.ip,
            country: ipData.country_name,
            countryCode: ipData.country_code,
            state: ipData.region,
            city: ipData.city,
            browser: Bowser.getParser(
              window.navigator.userAgent
            ).getBrowserName(),
            platform: navigator.platform,
            profile: data.userName,
            device: Bowser.getParser(window.navigator.userAgent).getPlatform()
              .type,
          }
        );
      } catch (err) {
        //console.log(err);
      }
    })();

    setTimeout(() => {
      function scrollToTargetAdjusted() {
        var element = document.getElementById(searchParams.goto);
        if (!element) {
          return;
        }
        var headerOffset = 45;
        var elementPosition = element.getBoundingClientRect().top;
        var offsetPosition = elementPosition - headerOffset;
        //console.log(offsetPosition);

        const scroller = document.getElementById("scroller");
        (scroller ? scroller : document.getElementById("hidescroll")).scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
      scrollToTargetAdjusted();
    }, 5000);
  }, []);
  // console.log(data);

  return (
    <>
      {!showContent ? (
        <div className="flex flex-col justify-center items-center w-screen h-screen gap-5 relative">
          <div className="relative w-28 h-28 rounded-full">
            <Image
              src={data?.pimage || require("./Image/Tapop logo black.png")}
              alt="Tapop logo"
              className="object-cover rounded-full"
              fill
            />
            <div className="absolute top-[40%] left-[40%] translate-x-[-45%] translate-y-[-45%] flex justify-center items-center z-10">
              <LoadingAnimation1 />
            </div>
          </div>
          <p
            className="w-[80%] text-center text-sm xsm:text-base z-10"
            style={{ wordSpacing: ".25vw" }}
          >
            Redirecting to <b>{data.firstName + " " + data.lastName + "'s"}</b>{" "}
            profile in {sec} seconds...
          </p>
        </div>
      ) : data.autodownload ? (
        <AutoDownloadVCF data={data} />
      ) : (
        <ViewProfile
          data={data}
          qrGoogle={qrGoogle}
          backgroundColor={data.backgroundColor}
          buttonStyle={data.buttonStyle}
          buttonColor={data.buttonColor}
          color1={data.color1}
          color2={data.color2}
          bgImage={data.bgImage}
          appIconBg={data.appIconBg}
          customButtontextColor={data.customButtontextColor}
          customTextColor={data.customTextColor}
          firstName={data.firstName}
          lastName={data.lastName}
          name={data.name}
          email={data.email}
          mobileNumber={data.mobileNumber}
          newMobileNumber={data.newMobileNumber}
          mobileVisibility={data.mobileVisibility}
          jobDescription={data.description}
          companyName={data.companyName}
          pimage={data.pimage}
          images={data.images}
          videos={data.videos}
          apps={data.apps}
          productSwitch={data.productSwitch}
          serviceSwitch={data.serviceSwitch}
          reviewSwitch={data.reviewSwitch}
          reviewButtonSwitch={data.reviewButtonSwitch}
          googleReviewButtonSwitch={data.googleReviewButtonSwitch}
          businessHoursSwitch={data.businessHoursSwitch}
          logoSwitch={data.logoSwitch}
          productLabel={data.productLabel}
          serviceLabel={data.serviceLabel}
          reviewLabel={data.reviewLabel}
          businessHoursLabel={data.businessHoursLabel}
          products={data.products}
          services={data.services}
          reviews={data.reviews}
          businessHours={data.businessHours}
          jobTitle={data.jobTitle}
          pdfs={data.pdfs}
          customLinks={data.customLinks}
          dummyData={data.dummyData}
          activeTemplate={data.activeTemplate}
          templateId={data.templateId}
          leadCapture={data.leadCapture}
          quickSelect={data.quickSelect}
          fromRedirect={true}
          availabilitySwitch={data.availabilitySwitch}
          availabilityLabel={data.availabilityLabel}
          availability={data.availability}
          userName={data.userName}
        />
      )}
    </>
  );
};

export default RedirectPage;
