import React, { useState } from "react";
import InputField from "../../../UiComponents/InputField";
import TextFieldArea from "../../../UiComponents/InputFIeldTextArea";
import { HiChevronDown, HiOutlineX } from "react-icons/hi";
import QR from "../../images/qr.png";
import line from "../../../Images/Line.png";
import { saveAs } from "file-saver";
import axios from "axios";
// import "./profile.css";
// import ContactBox from "../SocialLinks/ContactBox";
// import ShareBox from "../UiComponents/ShareBox";
import {
  RiArrowLeftRightFill,
  RiCloseLine,
  RiDownload2Fill,
  RiPhoneLine,
} from "react-icons/ri";
import { RiShareBoxFill } from "react-icons/ri";
import { serverUrl } from "../../../../config";

export default function ButtonFunction(props) {
  const setShowModal4 = props.setShowModal4;
  const setShowModal2 = props.setShowModal2;
  const setShowModal1 = props.setShowModal1;
  const showModal1 = props.showModal1;
  const setToast = props.setToast;
  const showModal2 = props.showModal2;
  const showModal5 = props.showModal5;
  const setShowModal5 = props.setShowModal5;

  // const name=props.name;
  // const email=props.email;
  // const mobileNumber=props.mobileNumber;

  function generateVCard(name, mobile, email) {
    let vCard = `BEGIN:VCARD
    VERSION:3.0
    FN:"${name}"
    TEL;TYPE=cell:${mobile}
    EMAIL;TYPE=INTERNET:${email}
    END:VCARD`;

    return new Blob([vCard], { type: "text/vcard; charset=utf-8" });
  }

  //function to download VCard
  function handleButtonClick() {
    const name = props.name;
    const mobile = props.mobileNumber;
    const email = props.email;
    const websiteURL = `https://${props.profile}.qviq.io`;

    // if(navigator.platform == "Apple"){
    let vcard = [
      `BEGIN:VCARD`,
      `VERSION:3.0`,
      `FN;CHARSET=UTF-8:${name}`,
      `N;CHARSET=UTF-8:${
        name.split(" ").length > 1
          ? Array.from(name.split(" ")).slice(1).join(" ")
          : ""
      };${name.split(" ").length > 0 ? name.split(" ")[0] : ""};;;`,
      `EMAIL;CHARSET=UTF-8;type=WORK,INTERNET:${email}`,
      `TEL;TYPE=WORK,VOICE:${mobile}`,
      `TITLE;CHARSET=UTF-8:${props.jobTitle}`,
      `ORG;CHARSET=UTF-8:${props.companyName}`,
      `URL;type=WORK;CHARSET=UTF-8:${websiteURL}`,
      `REV:${new Date().toISOString()}`,
      `END:VCARD`,
    ].join("\n");
    // let vcard = "BEGIN:VCARD\nVERSION:4.0\nFN:" + name +
    // "\nN:" + name + ";" +
    //  "\nTEL;TYPE=work,voice:" + mobile + "\nEMAIL:" + email + "\nURL;TYPE=WEBSITE:" + websiteURL
    // + "\nTITLE:" + props.jobTitle
    // + "\nORG:" + props.companyName + ";"
    // + "\nEND:VCARD";
    let blob = new Blob([vcard], { type: "text/vcard" });
    let url = URL.createObjectURL(blob);

    const newLink = document.createElement("a");
    newLink.download = name + ".vcf";
    newLink.textContent = name;
    newLink.href = url;

    newLink.click();
    // }
    // else{
    //   const vCardBlob = generateVCard(name, mobile, email);

    //   const blobUrl = URL.createObjectURL(vCardBlob);

    //   const downloadLink = document.createElement("a");
    //   downloadLink.href = blobUrl;
    //   downloadLink.download = `${name}.vcf`;
    //   document.body.appendChild(downloadLink);
    //   downloadLink.click();
    // }

    setToast(true);
  }

  // function openApp(link, userName, platform) {
  //   const url = `${serverUrl}/analytics/${props.type}/${props.username}/${platform}`;

  //   fetch(url, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ link, userName }),
  //   })
  //     .then((response) => {
  //       if (response.ok) {
  //         console.log("Post request successful");
  //       } else {
  //         console.error("Post request failed");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("An error occurred:", error);
  //     });

  //   window.open(`${link}${userName}`, "_blank");
  // }

  return (
    <div className="container sans relative " style={{ zIndex: "998" }}>
      <div
        className="modal-wrapper bg-[#00000054] backdrop-blur-[20px]"
        style={{ zIndex: "998" }}
      ></div>

      <div
        className="flex flex-col bottom-[28px] right-[28px] bg-transparent fixed xl:right-[129px] xl:bottom-[80px]  h-fit rounded-t-2xl md:rounded-2xl  w-fit justify-stretch  "
        style={{ zIndex: "998", height: "fit-content" }}
      >
        <div className="flex flex-col">
          <div className="  rounded-[20px] mb-6 shadow-[0px 8px 20px 0px rgba(18, 18, 18, 0.32)] justify-center items-center bg-[#ffffff] flex h-[72px] px-6  border-[1px]">
            <RiArrowLeftRightFill size={"20px"} fill="#F5775B" />
            <p
              className="ml-2 text-[16px] text-[#121212] font-bold"
              onClick={() => {
                setShowModal2(!showModal2);
                setShowModal4(false);
              }}
              style={{ cursor: "pointer" }}
            >
              Exchange Contact{" "}
            </p>
          </div>
          <div className="  rounded-[20px] mb-6 shadow-[0px 8px 20px 0px rgba(18, 18, 18, 0.32)] justify-center items-center bg-[#ffffff] flex h-[72px] px-6 ml-auto w-fit border-[1px]">
            <RiArrowLeftRightFill size={"20px"} fill="#F5775B" />
            <p
              className="ml-2 text-[16px] text-[#121212] font-bold"
              onClick={() => {
                setShowModal5(!showModal5);
                setShowModal4(false);
              }}
              style={{ cursor: "pointer" }}
            >
              Contact Details{" "}
            </p>
          </div>

          {(props.mobileVisibility === null ||
            props.mobileVisibility === undefined ||
            props.mobileVisibility === false) && (
            <div
              className=" rounded-[20px] mb-6 shadow-[0px_8px_20px_0px rgba(18, 18, 18, 0.32)] justify-center items-center bg-[#ffffff] flex h-[72px] px-6 ml-auto w-fit  border-[1px]"
              onClick={() => handleButtonClick()}
            >
              <RiDownload2Fill size={"20px"} fill="#F5775B" />
              <p
                className="ml-2 text-[16px] text-[#121212] font-bold"
                onClick={() => {
                  // setToast(true);
                  setShowModal2(false);
                  setShowModal4(false);
                }}
                style={{ cursor: "pointer" }}
              >
                Save Contact
              </p>
            </div>
          )}

          <div className="  rounded-[20px] mb-6 shadow-[0px_8px_20px_0px rgba(18, 18, 18, 0.32)] justify-center items-center bg-[#ffffff] flex h-[72px] px-6 ml-auto w-fit  border-[1px]">
            <RiShareBoxFill size={"20px"} fill="#F5775B" />
            <p
              className="ml-2 text-[16px] text-[#121212] font-bold"
              onClick={() => {
                setShowModal1(!showModal1);
                setShowModal4(false);
              }}
              style={{ cursor: "pointer" }}
            >
              Share{" "}
            </p>
          </div>

          <button
            className="border-[1px] rounded-[20px] w-[64px] h-[64px] backdrop-blur-[14px] justify-center items-center flex bg-[#FFFFFF80] ml-auto "
            onClick={() => {
              setShowModal4(false);
            }}
            style={{ cursor: "pointer" }}
          >
            <RiCloseLine size={"24px"} />
          </button>
          {/* <button className="rounded-[8px] border-r-[8px] text-[14px] font-bold text-[#121212] border-[#121212] bg-[#ffffff] border-b-[8px] h-[72px] text-center w-full  ">
              Share via
            </button> */}
        </div>
      </div>
    </div>
  );
}
