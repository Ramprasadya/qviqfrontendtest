import React, { useState } from "react";
import { saveAs } from "file-saver";
import Toast from "../../../UiComponents/Toast";
// import "./profile.css";
// import ContactBox from "../SocialLinks/ContactBox";
// import ShareBox from "../UiComponents/ShareBox";
import {
  RiArrowLeftRightFill,
  RiCloseLine,
  RiDownload2Line,
  RiPhoneLine,
} from "react-icons/ri";
import { RiShareBoxFill } from "react-icons/ri";
import { serverUrl } from "../../../../config";
function useDefaultProps(props) {
  let newProps = { ...props };
  Object.keys(newProps).forEach((key) =>
    newProps[key] === undefined ? delete newProps[key] : {}
  );
  return { ...defaultProps, ...newProps };
}
export default function ButtonFunction5(props) {
  props = useDefaultProps(props);
  const showModal1 = props.showModal1;
  const showModal2 = props.showModal2;
  const showModal5 = props.showModal5;
  const setShowModal1 = props.setShowModal1;
  const setShowModal2 = props.setShowModal2;
  const setShowModal4 = props.setShowModal4;
  const setShowModal5 = props.setShowModal5;

  function generateVCard(name, mobile, email) {
    let vCard = `BEGIN:VCARD
      VERSION:3.0
      FN:${name}
      TEL;TYPE=cell:${mobile}
      EMAIL;TYPE=INTERNET:${email}
      END:VCARD`;

    return new Blob([vCard], { type: "text/vcard;charset=utf-8" });
  }
  //function to download VCard
  // function handleButtonClick() {
  //   const name = props.name;
  //   const mobile = props.mobileNumber;
  //   const email = props.email;
  //   console.log("this is vc card");
  //   const vCardBlob = generateVCard(name, mobile, email);
  //   saveAs(vCardBlob, `${name}.vcf`);
  //   props.setToastMessage("Contact Saved Successfully");
  //   props.setShowToast(true);
  //   setTimeout(() => {
  //     props.setShowToast(false);
  //     props.setToastMessage("");
  //   }, 3000);
  // }
  async function handleButtonClick() {
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

    await fetch(
      `${serverUrl}/analytics/downloads/${props.type}/${props.profile}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          // console.log(data.error);
        } else {
          props.setToastMessage("Contact Saved Successfully");
          props.setShowToast(true);
        }
      });

    setTimeout(() => {
      props.setShowToast(false);
      props.setToastMessage("");
    }, 3000);
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

  const buttonArr = [
    {
      name: "Exchange Contact",
      icon: <RiArrowLeftRightFill />,
      onClick: () => {
        setShowModal2(!showModal2);
      },
    },
    {
      name: "Contact Details",
      icon: <RiPhoneLine />,
      onClick: () => {
        setShowModal5(!showModal5);
        props.setShowEmail(true);
        props.setShowMobile(true);
      },
    },
    {
      name: "Save Contact",
      icon: <RiDownload2Line />,
      onClick: () => {
        handleButtonClick();
      },
    },
    {
      name: "Share",
      icon: <RiShareBoxFill />,
      onClick: () => {
        setShowModal1(!showModal1);
      },
    },
  ];

  const buttonStyle = props.buttonStyle;
  const innerBtn = props.innerBtn || "";
  const closeBtn = props.closeBtn || "";

  return (
    <div
      className={`container ${props.mainFontFamily}-font-div relative`}
      style={{ zIndex: "998" }}
    >
      <div
        className="modal-wrapper backdrop-blur-lg"
        style={{ zIndex: "998", background: "#ffffff53" }}
      ></div>
      <div
        className="flex bottom-7 right-5 md:bottom-16 left-auto md:right-10 2xl:left-[calc(50%+360px)] bg-transparent fixed h-fit rounded-t-2xl md:rounded-2xl w-fit justify-stretch"
        style={{ zIndex: "998", height: "fit-content" }}
      >
        <div className="flex flex-col gap-6 items-end w-[245px]">
          {buttonArr.map((item, index) => {
            return (props.mobileVisibility === null ||
              props.mobileVisibility === undefined ||
              props.mobileVisibility === false) &&
              item.name === "Save Contact" ? (
              <div
                className={`${buttonStyle.concat(" ", innerBtn.btn)}}`}
                onClick={item.onClick}
                key={index}
                style={{ position: "static" }}
              >
                <span className={`${innerBtn.icon}`}>{item.icon}</span>
                <p className={`${innerBtn.text}`}>{item.name}</p>
              </div>
            ) : (
              item.name !== "Save Contact" && (
                <div
                  className={`${buttonStyle.concat(" ", innerBtn.btn)}}`}
                  onClick={item.onClick}
                  key={index}
                  style={{ position: "static" }}
                >
                  <span className={`${innerBtn.icon}`}>{item.icon}</span>
                  <p className={`${innerBtn.text}`}>{item.name}</p>
                </div>
              )
            );
          })}
          <button
            className={`${buttonStyle.concat(" ", closeBtn)}`}
            onClick={() => {
              setShowModal4(false);
            }}
            style={{ position: "static" }}
          >
            <RiCloseLine />
          </button>
        </div>
      </div>
    </div>
  );
}

const defaultProps = {
  buttonStyle: {
    icon: {
      color: "#F5775B",
      fontSize: "20px",
    },
  },
  mainFontFamily: "DM-Sans",
};
