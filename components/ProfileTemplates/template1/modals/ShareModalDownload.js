import React, { useEffect, useRef, useState } from "react";
import { HiChevronDown, HiChevronUp, HiOutlineX } from "react-icons/hi";
import line from "../../../Images/Line.png";
import Tapop from "../../images/logo2.png";
import axios from "axios";
import QrCodeWithLogo from "qrcode-with-logos";
import { FaRegCopy } from "react-icons/fa";
import {
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  PinterestIcon,
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  PinterestShareButton,
  WhatsappShareButton,
  WhatsappIcon,
  XIcon,
} from "react-share";
import Button from "../../ProfileComponents/Button/Button";
import { serverUrl } from "../../../../config";
import { clientUrl } from "../../../../config";
import Toast from "../../../UiComponents/Toast";
import Image from "next/image";
import NewModal from "@/components/UiComponents/NewModal/NewModal";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import InputFieldCC from "@/components/UiComponents/countryCodeField";
import LeftRightScrollBtn from "@/components/Utils/LeftRightScrollBtn";
import { useRouter } from "next/navigation";
import Link from "next/link";
import BgImg from "./ShareImg.svg";

import "../../../qr.css";
import QRCodeStyling from "qr-code-styling";

function useDefaultProps(props) {
  let newProps = { ...props };
  Object.keys(newProps).forEach((key) =>
    newProps[key] === undefined ? delete newProps[key] : {}
  );
  return { ...defaultProps, ...newProps };
}

export default function ShareModalDownload({
  setShowModal1,
  setQRdownload,
  type,
  ...props
}) {
  props = useDefaultProps(props);

  const profile = props.username;
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const navigate = useRouter();

  // ---------------------------------

  const [dummyState, setDummyState] = useState(0);
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
        setQRcolor(res.data[0].colour);
        setQRlogo(res.data[0].image);
        qrCode.append(QRref.current);
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

  return (
    <div className="container" style={{ zIndex: "998" }}>
      <div
        className="modal-wrapper bg-[#1a1a1a4d] backdrop-blur-[10px]"
        style={{ zIndex: "998" }}
      ></div>

      <div
        className={`flex flex-col md:w-[400px] w-full h-fit max-h-[85vh] px-[15px] xsm:px-[20px] sm:px-[30px] pb-[20px] bg-white fixed bottom-0 md:bottom-1/2 md:translate-y-1/2 left-1/2 -translate-x-1/2 rounded-t-[20px] rounded-b-none md:rounded-[20px] overflow-scroll ${props.modalStyle}`}
        style={{ zIndex: "998" }}
      >
        <div className=" flex items-center justify-between py-6 border-b-2">
          <p className="md:text-xl text-[15px] text-[#1A1A1A] tracking-normal font-semibold">
            Scan The QR Code
          </p>
          <span
            onClick={() => setQRdownload(false)}
            className="text-2xl text-black hover:scale-110 logo-fill"
            style={{ cursor: "pointer" }}
          >
            <HiOutlineX />
          </span>
        </div>

        <div className="w-[100%] items-center max-h-[610px] h-[350px] py-[20px] rounded-lg flex flex-col sm:gap-[40px] gap-[10px] ">
          <div
            className="qrDiv rounded-[12px] min-w-[200px] min-h-[200px] mt-[25px] border-2 border-black overflow-hidden"
            ref={QRref}
          />

          <div className="w-full my-[10px]">
            <Button
              style={props.buttonStyle.concat("rounded-none border ")}
              onClick={() => {
                onDownloadClick();
              }}
              text={"Download"}
            />
          </div>
        </div>
      </div>

      {showToast && (
        <div
          className="w-[96%] max-w-[500px] flex justify-center items-center fixed bottom-10 left-1/2 -translate-x-1/2"
          style={{ zIndex: "999" }}
        >
          <Toast text={toastMessage} backgroundColor={"#121212"} />
        </div>
      )}
    </div>
  );
}

const defaultProps = {
  modalStyle: "DM-Sans-font-div",
  buttonStyle:
    "rounded-[8px] border-r-[8px] border-b-[8px] border-[#121212] bg-[#FFFFFF] text-[#121212] w-full hover:cursor-pointer",
};
