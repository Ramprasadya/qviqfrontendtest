import React, { useState, useEffect } from "react";
// npm i file-saver
import { saveAs } from "file-saver";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./profile.css";
import ContactBox from "../SocialLinks/ContactBox";
import ShareBox from "../UiComponents/ShareBox";
import { serverUrl } from "../../config";

const Profile1 = (props) => {
  const [openContact, setOpenContact] = useState(false);
  const [openShare, setOpenShare] = useState(false);

  function handleOpen() {
    setOpenContact(true);
  }
  function handleOpenShare() {
    setOpenShare(true);
  }
  //function to generate VCard
  function generateVCard(name, mobile, email) {
    const websiteURL = `https://${props.username}.qviq.io`;
    let vCard = `BEGIN:VCARD
      VERSION:3.0
      FN:${name}
      TEL;TYPE=cell:${mobile}
      EMAIL;TYPE=INTERNET:${email}
      URL;TYPE=WEBSITE:${websiteURL}
      END:VCARD`;

    return new Blob([vCard], { type: "text/vcard;charset=utf-8" });
  }
  //function to download VCard
  function handleButtonClick() {
    const name = props.name;
    const mobile = props.mobileNumber;
    const email = props.email;

    const vCardBlob = generateVCard(name, mobile, email);
    saveAs(vCardBlob, `${name}.vcf`);
  }
  function openApp(link, userName, label) {
    axios.get("https://ipapi.co/json/")
      .then((res)=>{
        const ipData = res.data;
        axios.post(
          `${serverUrl}/analytics/${props.type}/${props.username}/${label}`,
          { 
            profile: props.username,
            country: ipData.country_name,
            countryCode: ipData.country_code,
          }
        )
        .then((response) => {
          if (response.ok) {
            
          } else {
            console.error("Post request failed");
          }
        })
        .catch((error) => {
          console.error("An error occurred:", error);
        });
    })
    window.open(`${link}${userName}`, "_blank");
  }

  return (
    <div
      className="flex flex-col justify-center items-center p-[16px] bg-repeat-y w-full overflow-scroll m-0 "
      style={{
        backgroundImage: `url(${require("../Images/BG.png")})`,
        fontFamily: "'Montserrat', sans-serif",
      }}
    >
      <div className="rounded-full mt-[51px] border-[4px] border-[_rgba(_255,_255,_255,_0.3)]">
        <img
          className="rounded-full w-[150px] h-[150px]"
          src={
            props.pimage
              ? props.pimage
              : "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
          }
        />
      </div>
      <div className="mt-[16px] font-[700] leading-[39px] text-center text-[32px]">
        {props.name ? props.name : "Full Name"}
      </div>
      <div className="mt-[16px] font-[500] leading-[24px] text-[16px]">
        {props.jobTitle ? props.jobTitle : "Job Title"}
      </div>
      <div className="flex gap-[20px] my-[40px] items-center justify-center">
        <svg
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.13 8.70193C9.94145 8.70193 8.15543 10.488 8.15543 12.6765C8.15543 14.865 9.94145 16.6511 12.13 16.6511C14.3185 16.6511 16.1046 14.865 16.1046 12.6765C16.1046 10.488 14.3185 8.70193 12.13 8.70193ZM24.0507 12.6765C24.0507 11.0306 24.0656 9.39964 23.9732 7.75674C23.8808 5.84847 23.4454 4.15488 22.05 2.75946C20.6516 1.36106 18.961 0.928716 17.0527 0.836284C15.4069 0.743852 13.7759 0.75876 12.133 0.75876C10.4871 0.75876 8.85613 0.743852 7.21322 0.836284C5.30496 0.928716 3.61137 1.36404 2.21594 2.75946C0.81754 4.15787 0.385198 5.84847 0.292766 7.75674C0.200334 9.40263 0.215242 11.0336 0.215242 12.6765C0.215242 14.3194 0.200334 15.9534 0.292766 17.5963C0.385198 19.5045 0.820522 21.1981 2.21594 22.5935C3.61435 23.9919 5.30496 24.4243 7.21322 24.5167C8.85911 24.6091 10.4901 24.5942 12.133 24.5942C13.7789 24.5942 15.4098 24.6091 17.0527 24.5167C18.961 24.4243 20.6546 23.989 22.05 22.5935C23.4484 21.1951 23.8808 19.5045 23.9732 17.5963C24.0686 15.9534 24.0507 14.3224 24.0507 12.6765ZM12.13 18.7919C8.7458 18.7919 6.01459 16.0607 6.01459 12.6765C6.01459 9.2923 8.7458 6.56109 12.13 6.56109C15.5142 6.56109 18.2454 9.2923 18.2454 12.6765C18.2454 16.0607 15.5142 18.7919 12.13 18.7919ZM18.4959 7.73885C17.7057 7.73885 17.0676 7.10077 17.0676 6.31063C17.0676 5.52049 17.7057 4.88241 18.4959 4.88241C19.286 4.88241 19.9241 5.52049 19.9241 6.31063C19.9243 6.49825 19.8875 6.68408 19.8159 6.85747C19.7442 7.03085 19.639 7.18839 19.5063 7.32106C19.3736 7.45373 19.2161 7.55892 19.0427 7.63062C18.8693 7.70231 18.6835 7.73909 18.4959 7.73885Z"
            fill="black"
          />
        </svg>
        <svg
          width="14"
          height="26"
          viewBox="0 0 14 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.6064 25.353V13.8071H12.5015L13.0805 9.28651H8.6064V6.40708C8.6064 5.1026 8.96985 4.20947 10.842 4.20947H13.2143V0.179119C12.0606 0.0551516 10.8998 -0.00401491 9.73902 0.000211256C6.2961 0.000211256 3.93226 2.10202 3.93226 5.96052V9.27806H0.0625V13.7986H3.94071V25.353H8.6064Z"
            fill="#111111"
          />
        </svg>
        {/* <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M2.84333 6.01081C4.29661 6.01081 5.47474 4.83269 5.47474 3.3794C5.47474 1.92611 4.29661 0.747986 2.84333 0.747986C1.39004 0.747986 0.211914 1.92611 0.211914 3.3794C0.211914 4.83269 1.39004 6.01081 2.84333 6.01081Z" fill="#111111" />
               <path d="M7.95971 8.00484V22.6039H12.4925V15.3*843C12.4925 13.4793 12.8509 11.6345 15.2129 11.6345C17.5425 11.6345 17.5713 13.8125 17.5713 15.5046V22.6051H22.1066V14.599C22.1066 10.6663 21.2599 7.64404 16.6633 7.64404C14.4565 7.64404 12.9772 8.85512 12.3723 10.0012H12.3109V8.00484H7.95971ZM0.572998 8.00484H5.11302V22.6039H0.572998V8.00484Z" fill="#111111" />
            </svg> */}
        <img
          className="w-[25px] h-[25px]"
          src={require("../Images/linkedin.png")}
        />
        <svg
          width="27"
          height="22"
          viewBox="0 0 27 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M23.5244 5.34785C23.5417 5.5808 23.5417 5.81243 23.5417 6.04405C23.5417 13.1325 18.1465 21.3005 8.28656 21.3005C5.24885 21.3005 2.42679 20.4206 0.052002 18.8924C0.483298 18.9417 0.89862 18.959 1.34722 18.959C3.8538 18.959 6.1607 18.1124 8.00436 16.668C5.64687 16.6188 3.67143 15.0746 2.98987 12.9501C3.32133 12.9994 3.65412 13.0326 4.00289 13.0326C4.48344 13.0326 4.96665 12.9661 5.41525 12.8503C2.95659 12.3524 1.1156 10.1946 1.1156 7.58819V7.52164C1.83043 7.91965 2.65975 8.16858 3.53831 8.20186C2.094 7.24076 1.14755 5.59678 1.14755 3.73714C1.14755 2.74144 1.41245 1.82826 1.87702 1.03223C4.51672 4.28425 8.48491 6.41012 12.9336 6.64307C12.8511 6.24372 12.8005 5.82973 12.8005 5.41441C12.8005 2.45923 15.1913 0.0524902 18.1624 0.0524902C19.7066 0.0524902 21.1003 0.699434 22.0801 1.74573C23.2914 1.51277 24.4522 1.06417 25.4825 0.450507C25.0845 1.69514 24.2365 2.74144 23.125 3.40569C24.2046 3.28854 25.2509 2.99036 26.212 2.57504C25.4825 3.63731 24.5707 4.58376 23.5244 5.34785Z"
            fill="#111111"
          />
        </svg>
        <svg
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M23.6626 15.0177C24.5124 16.0819 24.9374 17.2879 24.9374 18.6359C24.9374 20.2676 24.3277 21.6688 23.1083 22.8394C21.8889 24.01 20.4294 24.5953 18.7296 24.5953C17.3255 24.5953 16.0692 24.1874 14.9607 23.3715C14.1477 23.5134 13.3348 23.5844 12.5219 23.5844C9.38109 23.5844 6.70216 22.5202 4.48511 20.3918C2.26807 18.2634 1.15954 15.6917 1.15954 12.6765C1.15954 11.9315 1.23344 11.1511 1.38125 10.3353C0.531379 9.27109 0.106445 8.06502 0.106445 6.71705C0.106445 5.08531 0.716133 3.68413 1.93551 2.51353C3.15489 1.34293 4.61444 0.757629 6.31418 0.757629C7.71831 0.757629 8.97464 1.16557 10.0832 1.98144C10.8961 1.83955 11.709 1.7686 12.5219 1.7686C15.6627 1.7686 18.3417 2.83279 20.5587 4.96115C22.7758 7.08952 23.8843 9.66129 23.8843 12.6765C23.8843 13.4214 23.8104 14.2018 23.6626 15.0177ZM12.8545 19.8597C14.5173 19.8597 15.9583 19.4695 17.1777 18.6891C18.434 17.8732 19.0622 16.7381 19.0622 15.2837C19.0622 13.2618 17.3809 11.8783 14.0184 11.1334C13.8337 11.0979 13.5381 11.0447 13.1316 10.9738C12.5034 10.8319 12.06 10.7255 11.8014 10.6545C11.5427 10.5836 11.2471 10.4949 10.9146 10.3885C10.6189 10.2466 10.4157 10.1047 10.3049 9.96281C10.231 9.82092 10.194 9.62582 10.194 9.37751C10.194 8.59711 10.97 8.20691 12.5219 8.20691C13.2609 8.20691 13.8521 8.3488 14.2956 8.63258C14.7759 8.91636 15.1824 9.21788 15.5149 9.53714C15.8844 9.82092 16.2724 9.96281 16.6789 9.96281C16.9375 9.96281 17.1777 9.92734 17.3994 9.85639C17.6211 9.74997 17.7874 9.62582 17.8983 9.48393C18.0461 9.30656 18.1569 9.1292 18.2308 8.95184C18.3417 8.739 18.3971 8.50843 18.3971 8.26012C18.3971 7.40877 17.7689 6.71705 16.5126 6.18496C15.2563 5.6174 13.8152 5.33362 12.1894 5.33362C10.6005 5.33362 9.19634 5.68834 7.97696 6.3978C6.79454 7.10725 6.20333 8.18917 6.20333 9.64356C6.20333 10.0338 6.2218 10.3885 6.25875 10.7077C6.33265 11.027 6.44351 11.3108 6.59131 11.5591C6.77606 11.8074 6.94234 12.0202 7.09015 12.1976C7.23795 12.375 7.47813 12.5523 7.81069 12.7297C8.14324 12.9071 8.38342 13.0489 8.53123 13.1554C8.71598 13.2618 9.03006 13.3859 9.47347 13.5278C9.95383 13.6342 10.2864 13.7229 10.4711 13.7939C10.6559 13.8293 11.0254 13.918 11.5797 14.0599C12.1709 14.1663 12.5589 14.2373 12.7436 14.2728C13.3718 14.4501 13.7967 14.5743 14.0184 14.6452C14.2401 14.6807 14.4618 14.8048 14.6835 15.0177C14.9422 15.195 15.0715 15.4434 15.0715 15.7626C15.0715 16.1883 14.8498 16.543 14.4064 16.8268C13.963 17.0751 13.3903 17.1993 12.6882 17.1993C12.0231 17.1993 11.4319 17.0751 10.9146 16.8268C10.3972 16.5785 10.0093 16.3124 9.7506 16.0287C9.5289 15.7094 9.23329 15.4256 8.86378 15.1773C8.53123 14.929 8.18019 14.8048 7.81069 14.8048C7.29338 14.8048 6.88692 14.9645 6.59131 15.2837C6.33265 15.5675 6.20333 15.94 6.20333 16.4011C6.20333 17.3589 6.84997 18.1748 8.14324 18.8487C9.47347 19.5227 11.0439 19.8597 12.8545 19.8597Z"
            fill="#111111"
          />
        </svg>
      </div>
      <button
        onClick={handleButtonClick}
        className="gap-[12px] flex justify-center items-center max-w-[380px] w-full h-[64px] rounded-[12px] text-[#ffffff] bg-[#F66A70] shadow-[_0px_4px_20px_rgba(_0,_0,_0,_0.1)] "
      >
        <svg
          width="23"
          height="22"
          viewBox="0 0 23 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_106_641)">
            <path
              d="M19.75 11H17C15.9889 11 15.1667 11.8223 15.1667 12.8333C15.1667 13.8444 14.3444 14.6667 13.3333 14.6667H9.66667C8.65558 14.6667 7.83333 13.8444 7.83333 12.8333C7.83333 11.8223 7.01108 11 6 11H3.25C1.73383 11 0.5 12.2338 0.5 13.75V17.4167C0.5 19.9439 2.55608 22 5.08333 22H17.9167C20.4439 22 22.5 19.9439 22.5 17.4167V13.75C22.5 12.2338 21.2662 11 19.75 11ZM20.6667 17.4167C20.6667 18.9328 19.4328 20.1667 17.9167 20.1667H5.08333C3.56717 20.1667 2.33333 18.9328 2.33333 17.4167V13.75C2.33333 13.244 2.744 12.8333 3.25 12.8333L6 12.8315V12.8333C6 14.8555 7.6445 16.5 9.66667 16.5H13.3333C15.3555 16.5 17 14.8555 17 12.8333H19.75C20.256 12.8333 20.6667 13.244 20.6667 13.75V17.4167ZM7.18525 6.52758C6.82683 6.16917 6.82683 5.58983 7.18525 5.23142C7.54367 4.873 8.123 4.873 8.48142 5.23142L10.5833 7.33333V0.916667C10.5833 0.40975 10.9931 0 11.5 0C12.0069 0 12.4167 0.40975 12.4167 0.916667V7.33333L14.5186 5.23142C14.877 4.873 15.4563 4.873 15.8148 5.23142C16.1732 5.58983 16.1732 6.16917 15.8148 6.52758L12.7962 9.54617C12.4414 9.90092 11.9748 10.0797 11.5083 10.0815L11.5 10.0833L11.4918 10.0815C11.0252 10.0797 10.5586 9.90092 10.2038 9.54617L7.18525 6.52758Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_106_641">
              <rect
                width="22"
                height="22"
                fill="white"
                transform="translate(0.5)"
              />
            </clipPath>
          </defs>
        </svg>

        <p>Save Contact</p>
      </button>
      <button
        onClick={handleOpen}
        className="gap-[12px] mt-[16px] flex justify-center items-center max-w-[380px] w-full h-[64px] border-[1px] border-[#f2f2f2] rounded-[12px] bg-[_rgba(_255,_255,_255,_0.5)] text-[#F66A70] shadow-[_0px_4px_20px_rgba(_0,_0,_0,_0.1)]"
      >
        <svg
          width="24"
          height="22"
          viewBox="0 0 24 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.1171 18.6288L5.22396 18.6288C3.45424 18.6229 1.75555 17.4187 1.19837 15.6999C1.10783 15.4205 1.04603 15.1317 1.01541 14.8395C0.999341 14.6921 0.992536 14.5439 0.991781 14.3957L0.991781 9.31403C1.01371 9.13542 1.00369 9.08287 1.08912 8.92032C1.21444 8.68159 1.46507 8.50619 1.73611 8.4733C1.87069 8.45723 2.00621 8.48937 2.13909 8.52244C2.2593 8.58595 2.38216 8.65116 2.47269 8.75285C2.56323 8.8553 2.62768 8.97815 2.66076 9.11103C2.67683 9.17699 2.67683 9.24655 2.68533 9.31422C2.68533 11.0129 2.68023 12.7115 2.68533 14.4104C2.69724 15.701 3.79466 16.8838 5.13079 16.9337C5.16292 16.9344 5.19505 16.9354 5.22737 16.9354L20.1172 16.9354L18.1754 14.9937L18.1423 14.9589C18.1153 14.9267 18.1076 14.919 18.083 14.8844C17.8102 14.4992 17.9365 13.8902 18.3641 13.6541C18.448 13.6076 18.5385 13.5762 18.6317 13.5602C18.6944 13.5492 18.758 13.5475 18.8215 13.5492C19.0281 13.567 19.2212 13.6533 19.3726 13.7964L22.7598 17.1836C22.8664 17.2953 22.886 17.3359 22.924 17.4147C23.0612 17.6992 23.0223 18.06 22.8233 18.3097C22.797 18.3428 22.7885 18.3503 22.7598 18.3808L19.3726 21.7679C19.3422 21.7966 19.3345 21.8044 19.3016 21.8314C18.9222 22.1336 18.2752 22.0178 18.0331 21.5781C17.8569 21.2598 17.9221 20.8379 18.1754 20.5705L20.1171 18.6288ZM3.88266 5.08032L5.8244 7.02206L5.85748 7.05589C5.88451 7.08803 5.89226 7.09577 5.91683 7.13037C6.19714 7.52673 6.04555 8.16595 5.59343 8.38351C5.28004 8.53415 4.88291 8.46062 4.62718 8.21925L1.24006 4.83213C1.13346 4.71948 1.1138 4.67884 1.07581 4.60097C0.938587 4.31556 0.977526 3.95567 1.17655 3.70503C1.20283 3.67195 1.21133 3.66515 1.24006 3.63472L4.62718 0.247594C4.80164 0.0823942 5.03016 -0.00644022 5.27325 0.000363065C5.79738 0.0451592 6.20548 0.610142 6.02514 1.12576C5.99377 1.21554 5.94727 1.29927 5.88792 1.37393C5.86165 1.40701 5.85315 1.41457 5.82442 1.445L3.88364 3.38578C8.95513 3.38332 13.6477 3.37047 18.8005 3.38653C20.5583 3.4026 22.2487 4.60851 22.8016 6.31475C22.8921 6.59411 22.9539 6.88388 22.9846 7.1759C23.0006 7.32333 23.0074 7.47057 23.0082 7.61876L23.0082 12.7014C22.9997 12.769 22.9997 12.8377 22.9836 12.9038C22.8693 13.3678 22.3256 13.6693 21.8609 13.4932C21.6051 13.3958 21.4053 13.1698 21.3392 12.9038C21.3231 12.8378 21.3231 12.7692 21.3146 12.7014C21.3146 11.0027 21.3197 9.30327 21.3146 7.60473C21.3027 6.32188 20.2028 5.1313 18.8692 5.08214C18.8371 5.08044 18.8049 5.08044 18.7726 5.08044L3.88281 5.08044L3.88266 5.08032Z"
            fill="#FB6161"
          />
        </svg>
        <p>Exchange Contact</p>
      </button>
      <button
        onClick={handleOpenShare}
        className="gap-[12px] mt-[16px] flex justify-center items-center max-w-[380px] w-full h-[64px] border-[1px] border-[#f2f2f2] rounded-[12px] bg-[_rgba(_255,_255,_255,_0.5)] text-[#F66A70] shadow-[_0px_4px_20px_rgba(_0,_0,_0,_0.1)]"
      >
        <svg
          width="24"
          height="22"
          viewBox="0 0 24 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.1171 18.6288L5.22396 18.6288C3.45424 18.6229 1.75555 17.4187 1.19837 15.6999C1.10783 15.4205 1.04603 15.1317 1.01541 14.8395C0.999341 14.6921 0.992536 14.5439 0.991781 14.3957L0.991781 9.31403C1.01371 9.13542 1.00369 9.08287 1.08912 8.92032C1.21444 8.68159 1.46507 8.50619 1.73611 8.4733C1.87069 8.45723 2.00621 8.48937 2.13909 8.52244C2.2593 8.58595 2.38216 8.65116 2.47269 8.75285C2.56323 8.8553 2.62768 8.97815 2.66076 9.11103C2.67683 9.17699 2.67683 9.24655 2.68533 9.31422C2.68533 11.0129 2.68023 12.7115 2.68533 14.4104C2.69724 15.701 3.79466 16.8838 5.13079 16.9337C5.16292 16.9344 5.19505 16.9354 5.22737 16.9354L20.1172 16.9354L18.1754 14.9937L18.1423 14.9589C18.1153 14.9267 18.1076 14.919 18.083 14.8844C17.8102 14.4992 17.9365 13.8902 18.3641 13.6541C18.448 13.6076 18.5385 13.5762 18.6317 13.5602C18.6944 13.5492 18.758 13.5475 18.8215 13.5492C19.0281 13.567 19.2212 13.6533 19.3726 13.7964L22.7598 17.1836C22.8664 17.2953 22.886 17.3359 22.924 17.4147C23.0612 17.6992 23.0223 18.06 22.8233 18.3097C22.797 18.3428 22.7885 18.3503 22.7598 18.3808L19.3726 21.7679C19.3422 21.7966 19.3345 21.8044 19.3016 21.8314C18.9222 22.1336 18.2752 22.0178 18.0331 21.5781C17.8569 21.2598 17.9221 20.8379 18.1754 20.5705L20.1171 18.6288ZM3.88266 5.08032L5.8244 7.02206L5.85748 7.05589C5.88451 7.08803 5.89226 7.09577 5.91683 7.13037C6.19714 7.52673 6.04555 8.16595 5.59343 8.38351C5.28004 8.53415 4.88291 8.46062 4.62718 8.21925L1.24006 4.83213C1.13346 4.71948 1.1138 4.67884 1.07581 4.60097C0.938587 4.31556 0.977526 3.95567 1.17655 3.70503C1.20283 3.67195 1.21133 3.66515 1.24006 3.63472L4.62718 0.247594C4.80164 0.0823942 5.03016 -0.00644022 5.27325 0.000363065C5.79738 0.0451592 6.20548 0.610142 6.02514 1.12576C5.99377 1.21554 5.94727 1.29927 5.88792 1.37393C5.86165 1.40701 5.85315 1.41457 5.82442 1.445L3.88364 3.38578C8.95513 3.38332 13.6477 3.37047 18.8005 3.38653C20.5583 3.4026 22.2487 4.60851 22.8016 6.31475C22.8921 6.59411 22.9539 6.88388 22.9846 7.1759C23.0006 7.32333 23.0074 7.47057 23.0082 7.61876L23.0082 12.7014C22.9997 12.769 22.9997 12.8377 22.9836 12.9038C22.8693 13.3678 22.3256 13.6693 21.8609 13.4932C21.6051 13.3958 21.4053 13.1698 21.3392 12.9038C21.3231 12.8378 21.3231 12.7692 21.3146 12.7014C21.3146 11.0027 21.3197 9.30327 21.3146 7.60473C21.3027 6.32188 20.2028 5.1313 18.8692 5.08214C18.8371 5.08044 18.8049 5.08044 18.7726 5.08044L3.88281 5.08044L3.88266 5.08032Z"
            fill="#FB6161"
          />
        </svg>
        <p>Share</p>
      </button>

      <ContactBox open={openContact} setOpenContact={setOpenContact} />
      <ShareBox
        open={openShare}
        setOpenShare={setOpenShare}
        type={props.type}
        profile={props.username}
      />
      {props.description && (
        <div className="mt-[48px] w-full">
          <p className="font-[700] text-[20px] leading-[24px] text-[#111111] text-left">
            About me
          </p>
          <p className="mt-[16px] font-[500] text-[14px] leading-[24px] text-[#000000]">
            {props.description}
          </p>
        </div>
      )}
      {!props.description && (
        <div className="mt-[48px] w-full">
          <p className="font-[700] text-[20px] leading-[24px] text-[#111111] text-left">
            About me
          </p>
          <p className="mt-[16px] font-[500] text-[14px] leading-[24px] text-[#000000]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
            mauris nisl tincidunt diam nisi, et eros, ut ut. Semper feugiat sed.
          </p>
        </div>
      )}

      {!props.apps && (
        <div className="mt-[48px] font-[700] text-[20px] leading-[24px] text-[#111111] max-w-[380px] w-full">
          <p className="text-left">Contact Details</p>

          <div className="mt-[16px] p-[18px] gap-x-[24px] gap-y-[16px] grid grid-cols-4 border-[1px] border-[#f2f2f2] rounded-[20px] bg-[_rgba(_255,_255,_255,_0.5)] ">
            <button onClick={() => {}}>
              <img
                width={48}
                height={48}
                src={require(`../Logos/SocialMediaLogos/instagram.png`)}
              />
            </button>
            <button onClick={() => {}}>
              <img
                width={48}
                height={48}
                src={require(`../Logos/SocialMediaLogos/facebook.png`)}
              />
            </button>
            <button onClick={() => {}}>
              <img
                width={48}
                height={48}
                src={require(`../Logos/SocialMediaLogos/snapchat.png`)}
              />
            </button>
            <button onClick={() => {}}>
              <img
                width={48}
                height={48}
                src={require(`../Logos/SocialMediaLogos/telegram.png`)}
              />
            </button>
          </div>
        </div>
      )}
      {props.apps &&
        props.apps.social &&
        props.apps.social.filter((app) => {
          return app.isOn;
        }).length > 0 && (
          <div className="mt-[48px] font-[700] text-[20px] leading-[24px] text-[#111111] max-w-[380px] w-full">
            <p className="text-left">Social Links</p>
            <div className="mt-[16px] p-[18px] gap-x-[24px] gap-y-[16px] grid grid-cols-4 border-[1px] border-[#f2f2f2] rounded-[20px] bg-[_rgba(_255,_255,_255,_0.5)] ">
              {props.apps.social.map((app,index) => (
                <button
                  style={app.isOn ? {} : { display: "none" }}
                  onClick={() => openApp(app.link, app.userName, app.label)}
                  key={index}
                >
                  <img
                    width={48}
                    height={48}
                    src={require(`../Logos/SocialMediaLogos/${app.platform
                      .toLowerCase()
                      .split(" ")
                      .join("")}.png`)}
                  />
                </button>
              ))}
            </div>
          </div>
        )}

      {props.apps &&
        props.apps.music &&
        props.apps.music.filter((app) => {
          return app.isOn;
        }).length > 0 && (
          <div className="mt-[48px] font-[700] text-[20px] leading-[24px] text-[#111111] max-w-[380px] w-full">
            <p className="text-left">Music Links</p>
            <div className="mt-[16px] p-[18px] gap-x-[24px] gap-y-[16px] grid grid-cols-4 border-[1px] border-[#f2f2f2] rounded-[20px] bg-[_rgba(_255,_255,_255,_0.5)] ">
              {props.apps.music.map((app,index) => (
                <button
                  style={app.isOn ? {} : { display: "none" }}
                  onClick={() => {
                    window.open(`${app.link}${app.userName}`, "_blank");
                  }}
                  key={index}
                >
                  <img
                    width={48}
                    height={48}
                    src={require(`../Logos/MusicLogos/${app.platform
                      .toLowerCase()
                      .split(" ")
                      .join("")}.png`)}
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      {props.apps &&
        props.apps.ecommerce &&
        props.apps.ecommerce.filter((app) => {
          return app.isOn;
        }).length > 0 && (
          <div className="mt-[48px] font-[700] text-[20px] leading-[24px] text-[#111111] max-w-[380px] w-full">
            <p className="text-left">Ecommerce Apps</p>
            <div className="mt-[16px] p-[18px] gap-x-[24px] gap-y-[16px] grid grid-cols-4 border-[1px] border-[#f2f2f2] rounded-[20px] bg-[_rgba(_255,_255,_255,_0.5)] ">
              {props.apps.ecommerce.map((app,index) => (
                <button
                  style={app.isOn ? {} : { display: "none" }}
                  onClick={() => {
                    window.open(`${app.link}${app.userName}`, "_blank");
                  }}
                  key={index}
                >
                  <img
                    width={48}
                    height={48}
                    src={require(`../Logos/ECommerceLogos/${app.platform
                      .toLowerCase()
                      .split(" ")
                      .join("")}.png`)}
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      {props.apps &&
        props.apps.crypto &&
        props.apps.crypto.filter((app) => {
          return app.isOn;
        }).length > 0 && (
          <div className="mt-[48px] font-[700] text-[20px] leading-[24px] text-[#111111] max-w-[380px] w-full">
            <p className="text-left">Crypto Apps</p>
            <div className="mt-[16px] p-[18px] gap-x-[24px] gap-y-[16px] grid grid-cols-4 border-[1px] border-[#f2f2f2] rounded-[20px] bg-[_rgba(_255,_255,_255,_0.5)] ">
              {props.apps.crypto.map((app,index) => (
                <button
                  style={app.isOn ? {} : { display: "none" }}
                  onClick={() => {
                    window.open(
                      `${app.link}${app.userName
                        .toLowerCase()
                        .split(" ")
                        .join("")}`,
                      "_blank"
                    );
                  }}
                  key={index}
                >
                  <img
                    width={48}
                    height={48}
                    src={require(`../Logos/CryptoLogos/${app.platform
                      .toLowerCase()
                      .split(" ")
                      .join("")}.png`)}
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      {props.apps &&
        props.apps.payment &&
        props.apps.payment.filter((app) => {
          return app.isOn;
        }).length > 0 && (
          <div className="mt-[48px] font-[700] text-[20px] leading-[24px] text-[#111111] max-w-[380px] w-full">
            <p className="text-left">Payment Apps</p>
            <div className="mt-[16px] p-[18px] gap-x-[24px] gap-y-[16px] grid grid-cols-4 border-[1px] border-[#f2f2f2] rounded-[20px] bg-[_rgba(_255,_255,_255,_0.5)] ">
              {props.apps.payment.map((app,index) => (
                <button
                  style={app.isOn ? {} : { display: "none" }}
                  onClick={() => {
                    window.open(
                      `${app.link}${app.userName
                        .toLowerCase()
                        .split(" ")
                        .join("")}`,
                      "_blank"
                    );
                  }}
                  key={index}
                >
                  <img
                    width={48}
                    height={48}
                    src={require(`../Logos/PaymentLogos/${app.platform
                      .toLowerCase()
                      .split(" ")
                      .join("")}.png`)}
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      {props.apps &&
        props.apps.blog &&
        props.apps.blog.filter((app) => {
          return app.isOn;
        }).length > 0 && (
          <div className="mt-[48px] font-[700] text-[20px] leading-[24px] text-[#111111] max-w-[380px] w-full">
            <p className="text-left">Blog Apps</p>
            <div className="mt-[16px] p-[18px] gap-x-[24px] gap-y-[16px] grid grid-cols-4 border-[1px] border-[#f2f2f2] rounded-[20px] bg-[_rgba(_255,_255,_255,_0.5)] ">
              {props.apps.blog.map((app,index) => (
                <button
                  style={app.isOn ? {} : { display: "none" }}
                  onClick={() => {
                    window.open(`${app.link}${app.userName}`, "_blank");
                  }}
                  key={index}
                >
                  <img
                    width={48}
                    height={48}
                    src={require(`../Logos/BlogLogos/${app.platform
                      .toLowerCase()
                      .split(" ")
                      .join("")}.png`)}
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      {props.apps &&
        props.apps.other &&
        props.apps.other.filter((app) => {
          return app.isOn;
        }).length > 0 && (
          <div className="mt-[48px] font-[700] text-[20px] leading-[24px] text-[#111111] max-w-[380px] w-full">
            <p className="text-left">Other Apps</p>
            <div className="mt-[16px] p-[18px] gap-x-[24px] gap-y-[16px] grid grid-cols-4 border-[1px] border-[#f2f2f2] rounded-[20px] bg-[_rgba(_255,_255,_255,_0.5)] ">
              {props.apps.other.map((app,index) => (
                <button
                  style={app.isOn ? {} : { display: "none" }}
                  onClick={() => {
                    window.open(`${app.link}${app.userName}`, "_blank");
                  }}
                  key={index}
                >
                  <img
                    width={48}
                    height={48}
                    src={require(`../Logos/OtherLogos/${app.platform
                      .toLowerCase()
                      .split(" ")
                      .join("")}.png`)}
                  />
                </button>
              ))}
            </div>
          </div>
        )}

      {/* <div className="mt-[48px] font-[700] text-[20px] leading-[24px] text-[#111111] w-full">
        <p className="text-left">Portfolio</p>
        <div className="flex flex-row w-full mt-[16px] gap-[18px] overflow-scroll">
          <button
            onClick={() => { }}
            className="min-w-[135px] h-[106px] rounded-[15px] border-[4px] border-[_rgba(_255,_255,_255,_0.3)]"
          >
            <img
              className="rounded-[15px] w-full h-full"
              src="https://picsum.photos/96"
            />
          </button>
          <button
            onClick={() => { }}
            className="min-w-[135px] h-[106px] rounded-[15px] border-[4px] border-[_rgba(_255,_255,_255,_0.3)]"
          >
            <img
              className="rounded-[15px] w-full h-full"
              src="https://picsum.photos/96"
            />
          </button>
          <button
            onClick={() => { }}
            className="min-w-[135px] h-[106px] rounded-[15px] border-[4px] border-[_rgba(_255,_255,_255,_0.3)]"
          >
            <img
              className="rounded-[15px] w-full h-full"
              src="https://picsum.photos/96"
            />
          </button>
          <button
            onClick={() => { }}
            className="min-w-[135px] h-[106px] rounded-[15px] border-[4px] border-[_rgba(_255,_255,_255,_0.3)]"
          >
            <img
              className="rounded-[15px] w-full h-full"
              src="https://picsum.photos/96"
            />
          </button>
        </div>
      </div> */}
      {props.customLinks &&
        props.customLinks.filter((customLinks) => {
          return customLinks.isOn;
        }).length > 0 && (
          <div className="mt-[48px] font-[700] text-[20px] leading-[24px] text-[#111111] w-full">
            <p className="text-left">Links</p>
            <div className="flex flex-row w-full mt-[16px] gap-[18px] overflow-scroll">
              {props.customLinks.map((link,index) => (
                <div style={link.isOn ? {} : { display: "none" }} key={index}>
                  <button
                    button
                    onClick={() => {
                      window.open(`${link.websiteUrl}`, "_blank");
                    }}
                    className="min-w-[96px] h-[96px] rounded-full border-[4px] border-[_rgba(_255,_255,_255,_0.3)]"
                  >
                    <img
                      className="rounded-full w-full h-full"
                      src="https://picsum.photos/96"
                    />
                  </button>
                  <p className="text-[12px] font-[500] leading-[20px] text-center mt-[6px]">
                    {link.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      {!props.customLinks && (
        <div className="mt-[48px] font-[700] text-[20px] leading-[24px] text-[#111111] w-full">
          <p className="text-left">Links</p>
          <div className="flex flex-row w-full mt-[16px] gap-[18px] overflow-scroll">
            <div>
              <button
                button
                onClick={() => {}}
                className="min-w-[96px] h-[96px] rounded-full border-[4px] border-[_rgba(_255,_255,_255,_0.3)]"
              >
                <img
                  className="rounded-full w-full h-full"
                  src="https://picsum.photos/96"
                />
              </button>
              <p className="text-[12px] font-[500] leading-[20px] text-center">
                My Article
              </p>
            </div>
            <div>
              <button
                button
                onClick={() => {}}
                className="min-w-[96px] h-[96px] rounded-full border-[4px] border-[_rgba(_255,_255,_255,_0.3)]"
              >
                <img
                  className="rounded-full w-full h-full"
                  src="https://picsum.photos/96"
                />
              </button>
            </div>
          </div>
        </div>
      )}
      {props.pdfs &&
        props.pdfs.filter((pdf) => {
          return pdf.isOn;
        }).length > 0 && (
          <div className="mt-[48px] font-[700] text-[20px] leading-[24px] text-[#111111] w-full">
            <p className="text-left">PDFs</p>
            <div className="flex flex-row w-full mt-[16px] gap-[18px] overflow-scroll">
              {props.pdfs.map((pdf,index) => (
                <div style={pdf.isOn ? {} : { display: "none" }} key={index}>
                  <button
                    onClick={() => {}}
                    className="min-w-[106px] h-[130px] p-[7px] rounded-[17px] border-[1px] border-[#f2f2f2] bg-[_rgba(_255,_255,_255,_0.5)]"
                  >
                    <img
                      className="rounded-[17px] w-full h-full"
                      src={require("../Images/pdf.png")}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      {!props.pdfs && (
        <div className="mt-[36px] font-[700] text-[20px] leading-[24px] text-[#111111] w-full">
          <p className="text-left">PDFs</p>
          <div className="flex flex-row w-full mt-[16px] gap-[18px] overflow-scroll">
            <div>
              <button
                onClick={() => {}}
                className="min-w-[106px] h-[130px] p-[7px] rounded-[17px] border-[1px] border-[#f2f2f2] bg-[_rgba(_255,_255,_255,_0.5)]"
              >
                <img
                  className="rounded-[17px] w-full h-full"
                  src={require("../Images/pdf.png")}
                />
              </button>
            </div>
            <div>
              <button
                onClick={() => {}}
                className="min-w-[106px] h-[130px] p-[7px] rounded-[17px] border-[1px] border-[#f2f2f2] bg-[_rgba(_255,_255,_255,_0.5)]"
              >
                <img
                  className="rounded-[17px] w-full h-full"
                  src={require("../Images/pdf.png")}
                />
              </button>
            </div>
          </div>
        </div>
      )}
      {props.images && props.images.length > 0 && (
        <div className="mt-[36px] font-[700] text-[20px] leading-[24px] text-[#111111] w-full">
          <p className="text-left">Images</p>
          <div className="flex flex-row w-full mt-[16px] gap-[18px] overflow-scroll">
            {props.images.map((img,index) => (
              <button
                onClick={() => {}}
                className="min-w-[198px] h-[146px] rounded-[16px] border-[1px] border-[#f2f2f2] "
                key={index}
              >
                <img className="rounded-[17px] w-full h-full" src={img.image} />
              </button>
            ))}
          </div>
        </div>
      )}

      {!props.images && (
        <div className="flex flex-row w-full mt-[16px] gap-[18px] overflow-scroll">
          <button
            onClick={() => {}}
            className="min-w-[106px] h-[130px] p-[7px] rounded-[17px] border-[1px] border-[#f2f2f2] bg-[_rgba(_255,_255,_255,_0.5)]"
          >
            <img
              className="rounded-[17px] w-full h-full"
              src="https://picsum.photos/96"
            />
          </button>
          <button
            onClick={() => {}}
            className="min-w-[106px] h-[130px] p-[7px] rounded-[17px] border-[1px] border-[#f2f2f2] bg-[_rgba(_255,_255,_255,_0.5)]"
          >
            <img
              className="rounded-[17px] w-full h-full"
              src="https://picsum.photos/96"
            />
          </button>
        </div>
      )}
      <img
        className="w-[85px] h-[25px] mt-[65px] mb-[40px]"
        src={require("../Images/TapopLogoBlack.png")}
      />
    </div>
  );
};

export default Profile1;
