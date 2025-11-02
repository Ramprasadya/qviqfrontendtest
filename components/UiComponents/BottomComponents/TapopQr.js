import React, { useContext, useEffect } from "react";
import Iphone from "../Iphone";
import "./tapopQr.css";
import { useState } from "react";
import uploadIcon from "./images/UploadIcon.svg";
import ProTag from "./images/ProTag.svg";
// import { Link } from "react-router-dom";
// import { BsFillShareFill } from "react-icons/bs";
import {
  HiCheckCircle,
  HiOutlineDocumentDuplicate,
  HiOutlineDownload,
} from "react-icons/hi";
// import {  HiXCircle } from "react-icons/hi";
// import IconButton from "../IconButton";
import banner from "./images/banner.png";

import axios from "axios";
import Tapop from "../../Image/tapop.png";

import { useRef } from "react";
import PrimaryButton2 from "../PrimaryButton2";
import { UserContext } from "../../Contexts/context";
import { serverUrl } from "../../../config";
import { clientUrl } from "../../../config";
import { useParams } from "next/navigation";
import Image from "next/image";

import "../../qr.css";
import QRCodeStyling from "qr-code-styling";

function TapopQr(props) {
  // cloudinary credentials
  const uploadPreset = "wotgdhd2";
  const cloudName = "dzznjxrhi";

  // const [toggleStates, setToggleStates] = useState([]);
  const [pcolour, setpcolour] = useState([
    "#000000",
    "#883B95",
    "#31228D",
    "#4B870F",
    "#0B8567",
    "#007AA0",
    "#C56722",
    "#EE8F00",
    "#891212",
    "#031D61",
    "#430361",
    "#610346",
  ]);
  //  seeding the value the the value state
  const [value, setvalues] = useState(null);
  const [id, setid] = useState("");
  // settint the  value of the image
  const [img, setImage] = useState(Tapop?.src);
  // setting the value of the qr
  const [Qrvalue, setQrvalue] = useState("as");
  const [isLoading, setloading] = useState(false);
  const [quickSelect, setQuickSelect] = useState(false);

  //  Setting the value of the file from the input filed
  const [file, setFile] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const inputRef = useRef(null);
  // Seeting tthe volour of the Qr
  const [color, setbackendColor] = useState("#000000");
  const [colorIndex, setColorIndex] = useState();

  const [qrdownload, setqrdowload] = useState(false);
  const [dummyState, setDummyState] = useState(0);
  const profile = useParams().userName;
  const type = props.type;
  const { userType } = useContext(UserContext);
  const oldQrCodeRef = useRef(null);
  const newQrCodeRef = useRef(null);
  const [newQrCodeLogoUrl, setNewQrCodeLogoUrl] = useState(null);

  useEffect(() => {
    if (oldQrCodeRef && oldQrCodeRef.current) {
      props.showQrCodeFunction(oldQrCodeRef, 150, img, color);
    }
  }, [oldQrCodeRef, color]);

  useEffect(() => {
    if (newQrCodeRef && newQrCodeRef.current) {
      props.showQrCodeFunction(newQrCodeRef, 150, newQrCodeLogoUrl, color);
    }
  }, [newQrCodeRef, newQrCodeLogoUrl, color]);

  // To get the person data from backend
  // const getQRcode = async () => {
  //   try {
  //     const res = await axios.get(`${serverUrl}/person/get/${profile}`);
  //     if (res.data == null) {
  //       // navigate('/nodata')
  //     } else if (res.data === "error") {
  //     } else {
  //       setvalues(res.data[0]);
  //       setid(res.data[0]._id);
  //       setbackendColor(res.data[0].colour);
  //       setColorIndex(pcolour.indexOf(res.data[0].colour));
  //       setQrvalue(res.data[0].Qr);
  //       if (res.data[0].image != "") {
  //         setImage(res.data[0].image);
  //         setNewQrCodeLogoUrl(res.data[0].image);
  //       }
  //     }
  //   } catch (error) {
  //     //console.log(error);
  //   }
  // };
  // //  Redendering the component at once
  // useEffect(() => {
  //   getQRcode();
  // }, [dummyState]);

  useEffect(() => {
    if (quickSelect) {
      // If quickSelect is true, update the dummyState to force a re-render of the component
      setDummyState((prevState) => prevState + 1);
      props.setDummyState1((prevState) => prevState + 1);
    }
  }, [quickSelect]);

  // to sumbit the form of update and color
  const onSubmit = async () => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", uploadPreset);
    data.append("cloud_name", cloudName);
    data.append("folder", "image");

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );

      const res = await response.json();
      //console.log(res);

      var formData = new FormData();
      formData.append("link", res.secure_url);

      fetch(`${serverUrl}/person/updatedimage/${profile}/${id}`, {
        method: "PUT",
        body: formData,
        profile: profile,
      });
      //console.log(formData);
      setQuickSelect(true);
      setDummyState((prevState) => prevState + 1);
      props.setDummyState1((prevState) => prevState + 1);
    } catch (error) {
      //console.log(error);
    }
  };

  // to Change the color of the qr
  const changeColour = (e) => {
    axios.put(`${serverUrl}/person/updatedColour/${profile}/${id}`, {
      colour: e,
      Qr: `${type}/viewprofile/${profile}`,
    });
    setQuickSelect(true);
    props.setDummyState1((prevState) => prevState + 1);
  };

  // ---------------------------------

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

  const qrCodeOptions2 = {
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
    image: imageUrl,
  };

  const qrCode2 = new QRCodeStyling(qrCodeOptions2);

  const QRref = useRef(null);
  const QRref2 = useRef(null);

  // To get the person data from backend
  const getQRcode = async () => {
    try {
      const res = await axios.get(`${serverUrl}/person/get/${profile}`);

      //console.log(res.data[0].colour);

      if (res.data[0].image != "" && res.data[0].colour != "") {
        qrCode.append(QRref.current);
        qrCode2.append(QRref2.current);
      }

      if (res.data == null) {
        // navigate('/nodata')
      } else if (res.data === "error") {
      } else {
        setvalues(res.data[0]);
        setid(res.data[0]._id);
        setbackendColor(res.data[0].colour);
        setColorIndex(pcolour.indexOf(res.data[0].colour));
        setQrvalue(res.data[0].Qr);
        if (res.data[0].image != "") {
          setImage(res.data[0].image);
          setNewQrCodeLogoUrl(res.data[0].image);
        }
      }

      if (res.data == null) {
        // navigate.push('/nodata')
      } else if (res.data === "error") {
        //console.log("there was an error");
      } else {
        setbackendColor(res.data[0].colour);
        setQRcolor(res.data[0].colour);
        if (res.data[0].image != "") {
          setQRlogo(res.data[0].image);
        }
      }
    } catch (error) {
      //console.log(error);
    }
  };

  useEffect(() => {
    qrCode2.append(QRref2.current);
  }, [dummyState, QRcolor, QRlogo, imageUrl]);

  useEffect(() => {
    qrCode.append(QRref.current);
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

  useEffect(() => {
    qrCode2.update({
      data: urlData,
      image: imageUrl ? imageUrl : QRlogo,
      dotsOptions: {
        color: QRcolor,
      },
    });
  }, [QRcolor, imageUrl, urlData, QRlogo]);

  const onDownloadClick = () => {
    qrCode.download({
      extension: "png",
    });
  };

  //  Redendering the component at once
  useEffect(() => {
    getQRcode();
  }, [dummyState]);

  return (
    <div>
      <p className="pb-4 font-semibold text-base xsm:text-lg">Select a Color</p>

      <div className="flex flex-col min-[660px]:flex-row gap-5 items-center justify-between">
        <div className="color-pack w-full justify-center min-[660px]:w-fit min-[400px]:h-[156px] rounded-lg">
          {pcolour.map((item, index) => {
            return (
              <div
                key={index}
                className="w-10 h-10 rounded-lg relative"
                style={{ backgroundColor: item, cursor: "pointer" }}
                onClick={(e) => {
                  changeColour(item);
                  setbackendColor(item);
                  setQRcolor(item);
                  setColorIndex(index);
                }}
              >
                {index === colorIndex && (
                  <span className="absolute w-full h-full text-xl flex justify-center items-center text-white p-0 m-0">
                    <HiCheckCircle />
                  </span>
                )}
              </div>
            );
          })}
        </div>
        <div className="flex justify-center items-center w-[164px] h-[156px] px-[22px] rounded-[12px] bg-[#FFFFFF] border border-[#DFDBD8]">
          {/* <div className="ml-[36px] mt-[px] "> */}
          {/* <p className="ml-[-36px] poppins font-normal text-[14px] leading-[22px] text-[#817C7C] ">
                Preview
              </p> */}
          <div className="qrDiv bg-white rounded drop-shadow-md" ref={QRref} />
        </div>
      </div>

      <h1 className="font-semibold mt-[48px] text-sm sm:text-lg">
        Custom QR with Logo
      </h1>

      <div className="pt-4">
        <Image src={banner} alt="banner" className="w-full" />
      </div>
      {/* image input-1 starts here  */}
      {/* <form className="card-body" > */}
      <div className="mt-[28px] flex flex-col md:flex-row justify-between gap-5">
        <div
          className="flex justify-center border-dashed border-2 border-[#A7A7A7] w-full rounded-[12px] relative"
          onClick={() => {
            if (userType === "Pro") {
              inputRef.current.click();
            }
          }}
          style={{ cursor: "pointer" }}
        >
          <input
            onChange={(e) => {
              if (userType === "Pro") {
                setFile(e.target.files[0]);
                setImageUrl(URL.createObjectURL(e.target.files[0]));
                setNewQrCodeLogoUrl(URL.createObjectURL(e.target.files[0]));
                e.target.value = "";
              }
            }}
            type="file"
            accept="image/png, image/gif, image/jpeg"
            className="file-input"
            ref={inputRef}
            hidden
            onFocus={(e) => (e.target.value = null)}
            style={{ width: "100%" }}
          />

          <div id="a"></div>

          <div className="flex flex-col gap-3 justify-center items-center w-full py-3">
            {userType !== "Pro" && (
              <Image className="absolute top-3 right-3" src={ProTag} alt="logo" />
            )}
            <Image src={uploadIcon} alt="logo" />
            <p className="sm:w-[336px] w-3/4 text-[#817c7c] text-sm text-center">
              Add custom image to be displayed in the middle of the Qviq QR.
            </p>
          </div>

          {imageUrl !== "" && (
            <div className="border absolute w-full h-full rounded-[12px] bg-white flex justify-center items-center p-[20px]">
              <img src={imageUrl} alt={"image"} className="w-auto max-h-full" />
            </div>
          )}

          {/* </form> */}
        </div>
        <div className="flex justify-center">
          <div className="border border-[#DFDBD8] flex justify-center items-center w-[164px] h-[156px] px-[22px] rounded-[12px] bg-[#FFFFFF] ">
            {/* <p className="ml-[17px] poppins font-normal text-[14px] leading-[22px] text-[#817C7C] ">
                Preview
              </p> */}
            <div
              className="qrDiv bg-white rounded drop-shadow-md"
              ref={QRref2}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center pt-5 md:pt-6 pb-5 md:pb-6">
        {imageUrl && (
          <PrimaryButton2
            text="Save"
            onClick={() => {
              if (imageUrl !== "") {
                onSubmit(imageUrl);
                getQRcode();
                props.handleClose();
              }
            }}
            width="100%"
          />
        )}
      </div>
    </div>
  );
}

export default TapopQr;
