import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { QRCode } from "react-qrcode-logo";
import Tapop from "../Image/tapop.png";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import QrCodeWithLogo from "qrcode-with-logos";
import { HiArrowDownTray } from "react-icons/hi2";
import { serverUrl } from "../../config";
import { clientUrl } from "../../config";

import {
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  PinterestIcon,
  TelegramIcon,
  FacebookShareButton,
  InstapaperShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  PinterestShareButton,
  TelegramShareButton,
} from "react-share";

export default function ShareBox({ open, setOpenShare, type, profile }) {
  // const [open1, setOpen1] = React.useState(open);

  function handleClose() {
    setOpenShare(false);
  }
  const [color, setbackendColor] = useState("black");
  const [img, setImage] = useState(Tapop?.src);
  const getQRcode = async () => {
    try {
      const res = await axios.get(`${serverUrl}/person/get/${profile}`);
      if (res.data == null) {
        
      } else if (res.data === "error") {
        
      } else {
        setbackendColor(res.data[0].colour);
        if (res.data[0].image != "") {
          setImage(res.data[0].image);
        }
      }
    } catch (error) {
      //console.log(error);
    }
  };
  useEffect(() => {
    getQRcode();
  }, []);
  const downloadQR = () => {
    const qrcode = new QrCodeWithLogo({
      content: `${clientUrl}/qrscan/${type}/${profile}`,
      width: 380,
      // download: true,
      logo: {
        src: img,
        logoRadius: "50",
        logoSize: "0.18",
        bgColor: "#FFFFFF",
      },
      nodeQrCodeOptions: { color: { dark: color } },
    });

    // qrcode.toImage().then(() => {
    //   qrcode.downloadImage("Qviq QR");
    // });
  };
  const [phoneNumber, setPhoneNumber] = useState("");
  const sharelink = `http://${profile}.qviq.io`;

  const handleSendClick = () => {
    if (phoneNumber) {
      const whatsappLink = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
        sharelink
      )}`;
      window.open(whatsappLink, "_blank");
    }
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };
  const [email, setEmail] = useState("");

  const handleSendClickEmail = () => {
    if (email) {
      const subject = "My Qviq";
      const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(sharelink)}`;
      window.location.href = mailtoLink;
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Share</DialogTitle>
        <DialogContent>
          {" "}
          <>
            <h2 className="text-[#817C7C] text-xs mb-4 md:mb-5">
              Copy your URL and share with anyone
            </h2>
            <div className="flex justify-between items-center h-fit break-all border border-[#1A1A1A] border-dotted rounded-lg px-1 [@media(min-width:300px)]:px-3 py-2.5 mb-6 md:mb-8">
              <p className="text-xs font-medium">https://{profile}.qviq.io</p>
              <button
                className="text-[#F54040] text-2xl"
                onClick={() => {
                  navigator.clipboard.writeText(`https://${profile}.qviq.io`);
                }}
              >
                Copy
              </button>
            </div>
            <div
              className="p-4 md:p-5 rounded-lg relative"
              style={{
                boxShadow: "0px 2px 16px 1px rgba(171, 181, 217, 0.16)",
              }}
            >
              <h2 className="text-base md:text-lg mb-3 font-semibold">
                Scan the QR Code{" "}
              </h2>
              <div
                className="absolute p-2 rounded-full right-5 top-4"
                style={{
                  boxShadow: "0px 2px 8px rgba(171, 181, 217, 0.24)",
                  cursor: "pointer",
                }}
              >
                <span className="text-[#F54040]" onClick={downloadQR}>
                  <HiArrowDownTray />
                </span>
              </div>
              <div className="bg-white rounded drop-shadow-md w-fit mx-auto mt-2 md:mt-4">
                <QRCode
                  value={`${clientUrl}/qrscan/${type}/${profile}`}
                  // ref={qrCodeRef}
                  logoImage={img}
                  fgColor={color}
                  ecLevel="Q"
                  removeQrCodeBehindLogo="2"
                  size="110"
                  logoWidth="29"
                  logoHeight="29"
                  logoOpacity="3"
                  logoPaddingStyle="circle"
                  logoPadding="3"
                />
              </div>
            </div>
            <div>
              <input
                type="text"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                placeholder="Enter WhatsApp Number (with country code)"
              />
              <button onClick={handleSendClick}>Send</button>
              <br />
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter Email Address"
              />
              <button onClick={handleSendClickEmail}>Send</button>
            </div>
            <div className="flex gap-5 mb-6 md:mb-0 flex-wrap">
              <FacebookShareButton
                url={sharelink}
                quote={"ayush"}
                hashtag={"#rightforu"}
              >
                <FacebookIcon size={40} borderRadius={12} />
              </FacebookShareButton>

              <LinkedinShareButton
                url={sharelink}
                quote={"ayush"}
                hashtag={"#rightforu"}
              >
                <LinkedinIcon size={40} borderRadius={12} />
              </LinkedinShareButton>

              <TwitterShareButton
                url={sharelink}
                quote={"ayush"}
                hashtag={"#rightforu"}
              >
                <TwitterIcon size={40} borderRadius={12} />
              </TwitterShareButton>
              <PinterestShareButton
                url={sharelink}
                media={sharelink}
                quote={"ayush"}
                hashtag={"#rightforu"}
              >
                <PinterestIcon size={40} borderRadius={12} />
              </PinterestShareButton>
              <TelegramShareButton
                url={sharelink}
                quote={"ayush"}
                hashtag={"#rightforu"}
              >
                <TelegramIcon size={40} borderRadius={12} />
              </TelegramShareButton>
            </div>
          </>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
