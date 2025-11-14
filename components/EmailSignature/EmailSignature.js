"use client";
import react, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import SideBar from "../navbar/SideBar";
import NavBar from "../navbar/NavBar";
import {
  HiChevronDown,
  HiChevronUp,
  HiOutlineDocumentDuplicate,
} from "react-icons/hi";
import { serverUrl } from "../../config";
import NewToast from "../UiComponents/NewToast";
import { getCookie, SafeLocalStorage } from "../utils";
import { useRouter } from "next/navigation";
import Tapop from "../Images/logo2.png";
import { clientUrl } from "../../config";
import html2canvas from "html2canvas";

import "../qr.css";
import QRCodeStyling from "qr-code-styling";
import { UserContext } from "../Contexts/context";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../Login/firebaseconfig";
import LoadingAnimation from "../UiComponents/Loading/LoadingAnimation";
import CenterModal from "../UiComponents/NewModal/CenterModal";
import PrimaryButton from "../UiComponents/PrimaryButton";
import { toPng } from "html-to-image";
import { TfiEmail } from "react-icons/tfi";
import { CiGlobe } from "react-icons/ci";
import { BsTelephone } from "react-icons/bs";

const EmailSignature = ({ userName }) => {
  const QRref = useRef(null);
  const QRimage = useRef(null);
  const {
    dummyState,
    setDummyState,
    quickSelectContext,
    leadCaptureContext,
    userType,
    userPhoneNumber,
    userEmail,
  } = useContext(UserContext);
  const [QRlink, setQRlink] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  // console.log("number",phoneNumber)
  const [email, setEmail] = useState("");
  const [websiteLink, setWebsiteLink] = useState(`https://${userName}.qviqfrontendtest.vercel.app`);
  const [websiteLabel, setWebsiteLabel] = useState(`${userName}.qviqfrontendtest.vercel.app`);
  const [designation, setDesignation] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [image, setImage] = useState(
    require("../Images/tapopLogo.png").default.src
  );
  const [Frame, setFrame] = useState(require("./Frame.png").default.src);
  const [showMessage, setShowtMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [color, setbackendColor] = useState("#000000");
  const [profileImage, setProfileImage] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("gmail");
  const [plateformModal, setPlateformModal] = useState(false);
  const router = useRouter();
  const GmailRef = useRef(null);
  const displayRef = useRef(null);
  const contentRef = useRef(null);

  const downloadAsImage = () => {
    if (contentRef.current) {
      html2canvas(contentRef.current, { scale: 4 }).then((canvas) => {
        const image = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = image;
        link.download = "invoice.png";
        link.click();
      });
    }
  };

  const fetchProfileData = async () => {
    setIsLoading(true);
    const config = {
      headers: {
        Authorization: "Bearer " + getCookie("jwt_token"),
      },
    };
    try {
      const res = await axios.get(
        `${serverUrl}/profile/profiletype/${userName}`
      );
      if (res.data.length > 0) {
        const { data } = await axios.get(
          `${serverUrl}/connect/getDetail/${userName}/${res.data[0]._id}`,
          config
        );
        //console.log(data);
        if (data[0]) {
          setName(data[0].firstName + " " + data[0].lastName);
          setEmail(data[0].email);
          setPhoneNumber(
            "+" + data[0].selectedCode + " " + data[0].mobileNumber
          );
          setCompany(data[0].companyName);
          setDesignation(data[0].jobTitle);
          setImage(data[0].profileimage);
          setProfileImage(data[0].profileimage);
          setType(data[0]._id);
          // setQRlink(data[0].setQRlink ? data[0].setQRlink : "");
          setUrlData(`${clientUrl}/qrscan/${data[0]._id}/${userName}`);
          console.log(data[0].setQRlink);
        }
      }
      setIsLoading(false);
    } catch (error) {
      //console.log(error?.response);
      router.push("/login");
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const [QRcolor, setQRcolor] = useState("#000000");
  const [QRlogo, setQRlogo] = useState(Tapop?.src);
  const [urlData, setUrlData] = useState("");

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

  // To get the person data from backend
  const getQRcode = async () => {
    setIsLoading(true);
    //console.log("IN");
    try {
      const res = await axios.get(`${serverUrl}/person/get/${userName}`);
      //console.log(res);
      //console.log(res.data[0].colour);

      if (res.data[0].image != "" && res.data[0].colour != "") {
        qrCode.append(QRref.current);
        uploadQR();
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
      setIsLoading(false);
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
    qrCode.append(QRimage.current);
  }, []);

  useEffect(() => {
    qrCode.append(QRimage.current);
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
    uploadQR();
  }, [QRcolor, QRlogo, urlData]);

  const uploadQR = async () => {
    setIsLoading(true);
    try {
      // Use a valid FileExtension value (e.g., 'png', 'jpeg')
      const fileExtension = "png"; // Ensure this is valid
      const blob = await qrCode.getRawData(fileExtension);

      if (blob) {
        // Convert blob to File
        const file = new File([blob], `qrcode.${fileExtension}`, {
          type: `image/${fileExtension}`,
        });

        // Upload the file to Firebase Storage
        const downloadURL = await handleImageUpload(file);

        setQRlink(downloadURL);
        console.log("File uploaded successfully. Available at:", downloadURL);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error uploading QR code:", error);
    }
  };

  // // no need to implement backend
  // const handleSubmit = async (firebaseUrl) => {
  //   const token = getCookie("jwt_token");

  //   if (!token) {
  //     console.error("No JWT token found");
  //     return;
  //   }

  //   const response = await fetch(
  //     `${serverUrl}/connect/basicdetail/add/${userName}`,
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: "Bearer " + getCookie("jwt_token"),
  //       },
  //       body: JSON.stringify({
  //         QRlink: firebaseUrl,
  //       }),
  //     }
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.error) {
  //         //console.log(data.error);
  //         //console.log("QRlink", firebaseUrl);
  //       } else {
  //         //console.log("QRlink", firebaseUrl);
  //       }
  //     });
  // };

  // useEffect(() => {
  //   handleSubmit(QRlink);
  // }, [QRlink]);

  //  Redendering the component at once
  useEffect(() => {
    getQRcode();
  }, [dummyState]);

  const generateRandomString = (length) => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  };

  const handleImageUpload = async (image) => {
    const timestamp = Date.now(); // Current timestamp
    const randomString = generateRandomString(10); // Generate random alphanumeric string of length 10
    const imageName = `${timestamp}-${randomString}-${image.name}`; // Construct filename
    const imageRef = ref(storage, `QRimages/${imageName}`);

    try {
      const snapshot = await uploadBytes(imageRef, image);
      const downloadURL = await getDownloadURL(snapshot.ref);
      //console.log(downloadURL);
      return downloadURL;
    } catch (err) {
      console.error("Error uploading image to Firebase Storage", err);
      throw err;
    }
  };
  // const handleImageUploadFromURL = async (imageUrl) => {
  //   try {
  //     const response = await fetch(imageUrl);
  //     const blob = await response.blob();

  //     const file = new File([blob], "ShareIm.png", { type: blob.type });

  //     return await handleImageUpload(file);
  //   } catch (err) {
  //     console.error("Error fetching and uploading image:", err);
  //     throw err;
  //   }
  // };

  // handleImageUploadFromURL('/Frame.png')
  //   .then(url => //console.log("Image uploaded successfully. Download URL:", url))
  //   .catch(err => console.error("Error uploading image:", err));

  // async function handleCopyToClipboardGmail() {
  //   try {
  //     const data = new Blob([GmailRef.current.innerHTML], {
  //       type: "text/html",
  //     });
  //     const res = await navigator.clipboard.write([
  //       new ClipboardItem({ "text/html": data }),
  //     ]);
  //     setMessage("Email Signature Copied!");
  //     setShowtMessage(true);
  //     setTimeout(() => {
  //       setShowtMessage(false);
  //     }, 3000);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  const handleCopyToClipboardGmail = async () => {
    try {
      // Wrap the content in a div with explicit background color
      const wrappedContent = `
        <div style="background-color: #ffffff !important;">
          ${GmailRef.current.innerHTML}
        </div>
      `;

      const data = new Blob([wrappedContent], {
        type: "text/html",
      });

      await navigator.clipboard.write([
        new ClipboardItem({ "text/html": data }),
      ]);

      setMessage("Email Signature Copied!");
      setShowtMessage(true);
      setTimeout(() => {
        setShowtMessage(false);
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  // async function handleCopyToClipboardOutlook() {
  //   try {
  //     setIsLoading(true);
  //     if (displayRef.current) {
  //       // Get the current dimensions of the HTML element
  //       const { width, height } = displayRef.current.getBoundingClientRect();

  //       const dataUrl = await toPng(displayRef.current, {
  //         quality: 1,
  //         backgroundColor: "transparent",
  //         cacheBust: true,
  //         pixelRatio: 2,
  //         width: width,
  //         height: height,
  //       });

  //       // Create an image element
  //       const img = document.createElement("img");
  //       img.src = dataUrl;
  //       img.alt = "Email Signature";
  //       img.style.width = `${width}px`;
  //       img.style.height = `${height}px`;

  //       // Create a link element
  //       const link = document.createElement("a");
  //       link.href = websiteLink;
  //       link.appendChild(img);

  //       // Create a temporary container
  //       const container = document.createElement("div");
  //       container.appendChild(link);

  //       // Copy both as HTML and as image
  //       const clipboardItems = [
  //         new ClipboardItem({
  //           "text/html": new Blob([container.innerHTML], { type: "text/html" }),
  //           "image/png": await fetch(dataUrl).then((r) => r.blob()),
  //         }),
  //       ];

  //       await navigator.clipboard.write(clipboardItems);

  //       setMessage("Email Signature with URL Copied!");
  //       setShowtMessage(true);
  //       setTimeout(() => {
  //         setShowtMessage(false);
  //       }, 3000);
  //     }
  //   } catch (error) {
  //     console.error("Error copying to clipboard:", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }

  // async function handleCopyToClipboardOutlook() {
  //   try {
  //     setIsLoading(true);
  //     if (displayRef.current) {
  //       // Get the current dimensions of the HTML element
  //       const { width, height } = displayRef.current.getBoundingClientRect();

  //       // Calculate devicePixelRatio for better quality on high-DPI displays
  //       const dpr = window.devicePixelRatio || 1;

  //       // Modified toPng settings
  //       const dataUrl = await toPng(displayRef.current, {
  //         quality: 1,
  //         backgroundColor: "transparent",
  //         cacheBust: true,
  //         pixelRatio: dpr, // Use device pixel ratio for optimal quality
  //         width: width,
  //         height: height,
  //         style: {
  //           transform: "scale(1)",
  //           transformOrigin: "top left",
  //         },
  //         fontEmbedCSS: true, // Ensure fonts are properly embedded
  //         skipAutoScale: true, // Prevent automatic scaling
  //         canvasWidth: width * dpr, // Set canvas width according to DPR
  //         canvasHeight: height * dpr, // Set canvas height according to DPR
  //       });

  //       // Create a high-quality image while maintaining dimensions
  //       const img = document.createElement("img");
  //       img.src = dataUrl;
  //       img.alt = "Email Signature";

  //       // Set the display dimensions to match original size
  //       img.style.width = `${width}px`;
  //       img.style.height = `${height}px`;
  //       img.style.maxWidth = "100%";
  //       img.style.objectFit = "contain";
  //       // Add crisp rendering for text
  //       img.style.imageRendering = "crisp-edges";
  //       img.style.WebkitFontSmoothing = "antialiased";

  //       // Create a link element
  //       const link = document.createElement("a");
  //       link.href = websiteLink;
  //       link.style.display = "inline-block";
  //       link.style.width = `${width}px`;
  //       link.style.height = `${height}px`;
  //       link.appendChild(img);

  //       // Create a temporary container
  //       const container = document.createElement("div");
  //       container.appendChild(link);

  //       // Optional: Apply any necessary container styles
  //       container.style.width = `${width}px`;
  //       container.style.height = `${height}px`;

  //       // Copy both as HTML and as image with preserved quality
  //       const clipboardItems = [
  //         new ClipboardItem({
  //           "text/html": new Blob([container.innerHTML], { type: "text/html" }),
  //           "image/png": await fetch(dataUrl).then((r) => r.blob()),
  //         }),
  //       ];

  //       await navigator.clipboard.write(clipboardItems);

  //       setMessage("Email Signature with URL Copied!");
  //       setShowtMessage(true);
  //       setTimeout(() => {
  //         setShowtMessage(false);
  //       }, 3000);
  //     }
  //   } catch (error) {
  //     console.error("Error copying to clipboard:", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }


  async function handleCopyToClipboardOutlook() {
    try {
      setIsLoading(true);
      if (displayRef.current) {
        const { width, height } = displayRef.current.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
  
        // Generate PNG data
        const dataUrl = await toPng(displayRef.current, {
          quality: 1,
          backgroundColor: "transparent",
          cacheBust: true,
          pixelRatio: dpr,
          width: width,
          height: height,
          style: {
            transform: "scale(1)",
            transformOrigin: "top left",
          },
          fontEmbedCSS: true,
          skipAutoScale: true,
          canvasWidth: width * dpr,
          canvasHeight: height * dpr,
        });
  
        // Convert base64 to blob
        const base64Response = await fetch(dataUrl);
        const blob = await base64Response.blob();
  
        // Upload to Cloudinary
        const formData = new FormData();
        formData.append('file', blob);
        formData.append('upload_preset', 'ckvteuxd');
        formData.append("cloud_name", "duykfm6dn");
        formData.append("folder", "emailsignature");
    
  
        const uploadResponse = await fetch(
          `https://api.cloudinary.com/v1_1/duykfm6dn/image/upload`,
          {
            method: 'POST',
            body: formData,
          }
        );
  
        if (!uploadResponse.ok) {
          throw new Error('Failed to upload image to Cloudinary');
        }
  
        const uploadData = await uploadResponse.json();
        const imageUrl = uploadData.secure_url;
  
        // Create HTML with hosted image URL
        const img = document.createElement("img");
        img.src = imageUrl;
        img.alt = "Email Signature";
        img.style.width = `${width}px`;
        img.style.height = `${height}px`;
        img.style.maxWidth = "100%";
        img.style.objectFit = "contain";
        img.style.imageRendering = "crisp-edges";
        img.style.WebkitFontSmoothing = "antialiased";
        // img.style.borderRadius = "8px"
  
        // Create link wrapper
        const link = document.createElement("a");
        link.href = websiteLink;
        link.target = "_blank"; // Add this to open in new tab
        link.style.display = "inline-block";
        link.style.width = `${width}px`;
        link.style.height = `${height}px`;
        link.appendChild(img);
  
        const container = document.createElement("div");
        container.appendChild(link);
  
        // Copy only HTML to clipboard since Gmail doesn't support direct image data
        const clipboardItem = new ClipboardItem({
          "text/html": new Blob([container.innerHTML], { type: "text/html" })
        });
  
        await navigator.clipboard.write([clipboardItem]);
  
        setMessage("Email Signature with URL Copied!");
        setShowtMessage(true);
        setTimeout(() => {
          setShowtMessage(false);
        }, 3000);
      }
    } catch (error) {
      console.error("Error in handleCopyToClipboardOutlook:", error);
      setMessage("Failed to copy signature. Please try again.");
      setShowtMessage(true);
      setTimeout(() => {
        setShowtMessage(false);
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex h-screen w-full first-container">
      <div className="h-full">
        <SideBar />
      </div>
      <div className="w-full overflow-y-auto">
        <NavBar text="Email Signature" />
        <div className="w-full flex items-start justify-center px-2 sm:px-4">
          <div className=" w-full md3:w-fit xl:w-[90%] px-2 sm:px-8 py-7 mt-2 bg-gray-100 flex flex-col xl:flex-row sm:justify-around justify-start items-start gap-5 rounded-2xl">
            <div className="md3:w-fit w-full  flex flex-col justify-start items-start gap-5 rounded-2xl">
              <p className="pt-6 text-lg text-black font-medium">
                Create Your Email Signature.
              </p>

              <div className=" gap-[8px] xsm2:gap-0 flex flex-col xsm2:flex-row xsm2:items-center w-full rounded-2xl pl-4">
                <p className="mr-4 md:mr-8 text-black w-[134px] xsm2:font-bold ">
                  Name{" "}
                </p>
                <input
                  type="text"
                  name=""
                  className=" w-full xsm2:w-[17.875rem] p-3 rounded-[8px] outline-none border border-[#DFDBD8] "
                  placeholder="johndoe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              {/* <div className="flex items-center w-full bg-black rounded-2xl pl-4">
              <p className="mr-8 text-white">Email </p>
              <input
                type="text"
                name=""
                className=" rounded-2xl p-3 w-full"
                placeholder="johndoe@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div> */}
              {/* <div className="flex items-center w-full bg-black rounded-2xl pl-4">
              <p className="mr-8 text-nowrap text-white">Phone Number</p>
              <input
                type="text"
                name=""
                className=" rounded-2xl p-3 w-full"
                placeholder="+91 1234567890"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div> */}
              <div className=" gap-[8px] xsm2:gap-0 flex flex-col xsm2:flex-row xsm2:items-center w-full rounded-2xl pl-4">
                <p className=" mr-4 sm:mr-6 md:mr-8 w-[134px] text-black xsm2:font-bold ">
                  Company{" "}
                </p>
                <input
                  type="text"
                  name=""
                  className=" w-full xsm2:w-[17.875rem] p-3 rounded-[8px] outline-none border border-[#DFDBD8] "
                  placeholder="Company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>
              <div className=" gap-[8px] xsm2:gap-0 flex flex-col xsm2:flex-row xsm2:items-center w-full  rounded-2xl pl-4">
                <p className="mr-4 sm:mr-6 md:mr-8 w-[134px] text-black xsm2:font-bold">
                  Designation{" "}
                </p>
                <input
                  type="text"
                  name=""
                  className="w-full xsm2:w-[17.875rem] p-3 rounded-[8px] outline-none border border-[#DFDBD8] "
                  placeholder="Designation"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                />
              </div>
              <div className=" gap-[8px] xsm2:gap-0 flex flex-col xsm2:flex-row xsm2:items-center w-full rounded-2xl pl-4">
                <p className="mr-4 sm:mr-6 md:mr-8 w-[134px] text-nowrap text-black xsm2:font-bold">
                  Website Label
                </p>
                <input
                  type="text"
                  name=""
                  className="w-full xsm2:w-[17.875rem] p-3 rounded-[8px] outline-none border border-[#DFDBD8] "
                  placeholder="Label"
                  value={websiteLabel}
                  onChange={(e) => setWebsiteLabel(e.target.value)}
                />
              </div>
              {/* <div className="flex items-center w-full bg-black rounded-2xl pl-4">
              <p className="mr-8 text-nowrap text-white">Website Link</p>
              <input
                type="text"
                name=""
                className=" rounded-2xl p-3 w-full"
                placeholder="https://website/url"
                value={websiteLink}
                onChange={(e) => setWebsiteLink(e.target.value)}
              />
            </div> */}
              {/* <div className="flex items-center w-full bg-black rounded-2xl pl-4">
              <p className="mr-8 text-white">Location </p>
              <input
                type="text"
                name=""
                className=" rounded-2xl p-3 w-full"
                placeholder="State, Country"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="flex items-center w-full bg-black rounded-2xl pl-4">
              <p className="mr-8 text-white">Instagram </p>
              <input
                type="text"
                name=""
                className=" rounded-2xl p-3 w-full"
                placeholder="instagram"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
              />
            </div> */}
              {/* <div className="flex items-center w-full bg-black rounded-2xl pl-4">
              <p className="mr-8 text-white">Facebook </p>
              <input
                type="text"
                name=""
                className=" rounded-2xl p-3 w-full"
                placeholder="facebook"
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
              />
            </div> */}
              <div className=" gap-[8px] xsm2:gap-0 flex items-center w-fitrounded-2xl pl-4 overflow-hidden">
                <p className=" mr-4 sm:mr-6 md:mr-8 text-black font-bold">
                  QR Code
                </p>
                <img
                  className="qrDiv "
                  src={QRlink}
                  style={{
                    height: "100px",
                    width: "100px",
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex flex-wrap items-center pt-6">
                <span className="text-cGrey font-medium">
                  Copy Your Email Signature : &nbsp;
                </span>
                <span
                  // onClick={downloadAsImage}
                  // onClick={handleCopyToClipboard}
                  onClick={() => setPlateformModal(true)}
                  className="text-xl ml-2 hover:cursor-pointer active:scale-90 duration-100"
                  title="Copy Link"
                >
                  <HiOutlineDocumentDuplicate />
                </span>
              </div>

              <CenterModal
                onModal={plateformModal}
                onClick={setPlateformModal}
                text="Add a signature to your emails"
                borderTopWidth="0px"
              >
                <div className="flex space-x-4 mb-8 mt-4 justify-center ">
                  {/* , "hotmail", "others" */}
                  {["gmail", "outlookweb", "outlookdesktop", "maildesktop"].map(
                    (platform) => (
                      <button
                        key={platform}
                        className={`px-4 py-2 rounded ${
                          selectedPlatform === platform
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200"
                        }`}
                        onClick={() => setSelectedPlatform(platform)}
                      >
                        {platform.charAt(0).toUpperCase() + platform.slice(1)}
                      </button>
                    )
                  )}
                </div>
                <hr />
                {selectedPlatform == "gmail" && (
                  <div className="p-5">
                    <div className="flex flex-col gap-y-2 mb-4 ">
                      <span className="font-bold text-[18px]">Step 1</span>
                      <p className="text-[16px]">
                        Generate and copy your signature's HTML
                      </p>
                      <PrimaryButton
                        icon=""
                        onClick={handleCopyToClipboardOutlook}
                        text=" Copy Your Email Signature"
                        width="50%"
                      />
                    </div>
                    <hr />
                    <div className="flex flex-col gap-y-2 mb-4 ">
                      <span className="font-bold text-[18px] mt-2 ">
                        Step 2
                      </span>
                      <p className="text-[16px]">
                        In your Gmail account, locate and click on the gear icon
                        at the top right. Choose the "See all settings" option,
                        and then scroll down to find the "Signature" section.
                      </p>
                    </div>
                    <hr />
                    <div className="flex flex-col gap-y-2 mb-4 ">
                      <span className="font-bold text-[18px] mt-2 ">
                        Step 3
                      </span>
                      <p className="text-[16px]">
                        Choose the "Create new" option and paste your email
                        signature into the provided text box.
                      </p>
                    </div>
                    <hr />
                    <div className="flex flex-col gap-y-2 mb-4 ">
                      <span className="font-bold text-[18px] mt-2 ">
                        Step 4
                      </span>
                      <p className="text-[16px]">
                        Within the "Signature Defaults" subsection, designate
                        your recently created signature as the default.
                        Afterward, scroll to the bottom of the page and click
                        the "Save" button.
                      </p>
                    </div>
                  </div>
                )}
                {selectedPlatform == "outlookweb" && (
                  <div className="p-5">
                    <div className="flex flex-col gap-y-2 mb-4 ">
                      <span className="font-bold text-[18px]">Step 1</span>
                      <p className="text-[16px]">
                        Generate and copy your signature's HTML
                      </p>
                      <PrimaryButton
                        icon=""
                        onClick={handleCopyToClipboardOutlook}
                        text=" Copy Your Email Signature"
                        width="50%"
                      />
                    </div>
                    <hr />
                    <div className="flex flex-col gap-y-2 mb-4 ">
                      <span className="font-bold text-[18px] mt-2 ">
                        Step 2
                      </span>
                      <p className="text-[16px]">
                        Inside your Outlook account, click on the gear icon
                        located at the top right. Then, choose the "Compose and
                        reply" option situated just below the "Layout" tab at
                        the top.
                      </p>
                    </div>
                    <hr />
                    <div className="flex flex-col gap-y-2 mb-4 ">
                      <span className="font-bold text-[18px] mt-2 ">
                        Step 3
                      </span>
                      <p className="text-[16px]">
                        Select "New signature," give your signature a name, and
                        then paste your email signature into the larger text
                        box.
                      </p>
                    </div>
                    <hr />
                    <div className="flex flex-col gap-y-2 mb-4 ">
                      <span className="font-bold text-[18px] mt-2 ">
                        Step 4
                      </span>
                      <p className="text-[16px]">
                        Within the "Select default signatures" subsection below,
                        designate your recently created signature as the
                        default, and then click the blue save button located in
                        the bottom right.
                      </p>
                    </div>
                  </div>
                )}
                {selectedPlatform == "outlookdesktop" && (
                  <div className="p-5">
                    <div className="flex flex-col gap-y-2 mb-4 ">
                      <span className="font-bold text-[18px]">Step 1</span>
                      <p className="text-[16px]">
                        Generate and copy your signature's HTML
                      </p>
                      <PrimaryButton
                        icon=""
                        onClick={handleCopyToClipboardOutlook}
                        text=" Copy Your Email Signature"
                        width="50%"
                      />
                    </div>
                    <hr />
                    <div className="flex flex-col gap-y-2 mb-4 ">
                      <span className="font-bold text-[18px] mt-2 ">
                        Step 2
                      </span>
                      <p className="text-[16px]">
                        (Windows) In Outlook, click on "File" at the top left
                        corner, followed by "Options," and then select "Mail."
                        (Mac) Click on "Outlook" at the top left corner, and
                        then choose "Preferences."
                      </p>
                    </div>
                    <hr />
                    <div className="flex flex-col gap-y-2 mb-4 ">
                      <span className="font-bold text-[18px] mt-2 ">
                        Step 3
                      </span>
                      <p className="text-[16px]">
                        Select "Signatures" from the menu or popup.
                      </p>
                    </div>
                    <hr />
                    <div className="flex flex-col gap-y-2 mb-4 ">
                      <span className="font-bold text-[18px] mt-2 ">
                        Step 4
                      </span>
                      <p className="text-[16px]">
                        Set your newly created signature as default
                      </p>
                    </div>
                  </div>
                )}
                {selectedPlatform == "maildesktop" && (
                  <div className="p-5">
                    <div className="flex flex-col gap-y-2 mb-4 ">
                      <span className="font-bold text-[18px]">Step 1</span>
                      <p className="text-[16px]">
                        Generate and copy your signature's HTML
                      </p>
                      <PrimaryButton
                        icon=""
                        onClick={handleCopyToClipboardOutlook}
                        text=" Copy Your Email Signature"
                        width="50%"
                      />
                    </div>
                    <hr />
                    <div className="flex flex-col gap-y-2 mb-4 ">
                      <span className="font-bold text-[18px] mt-2 ">
                        Step 2
                      </span>
                      <p className="text-[16px]">
                        Inside the mail app, click on "Mail" at the top left
                        corner, followed by "Preferences," and then access the
                        "Signatures" tab.
                      </p>
                    </div>
                    <hr />
                    <div className="flex flex-col gap-y-2 mb-4 ">
                      <span className="font-bold text-[18px] mt-2 ">
                        Step 3
                      </span>
                      <p className="text-[16px] flex flex-col">
                        Paste your email signature into the text box located on
                        the right side and ensure that the "Always match my
                        default message font" setting is not selected. If you
                        don't have any existing signatures, you will need to
                        create one first by clicking on the "+" sign at the
                        bottom.
                        <span className="mb-4 rounded-xl mt-4 bg-yellow-50 p-3 text-sm text-gray-800">
                          Although your email signature may not appear fully
                          visible in the preview after pasting it, it will still
                          be transmitted correctly when sending emails.
                        </span>
                      </p>
                    </div>
                    <hr />
                    <div className="flex flex-col gap-y-2 mb-4 ">
                      <span className="font-bold text-[18px] mt-2 ">
                        Step 4
                      </span>
                      <p className="text-[16px]">
                        Access the "Choose Signature" popup, and choose your
                        recently created signature.
                      </p>
                    </div>
                  </div>
                )}
              </CenterModal>

              <a ref={displayRef} style={{ textDecoration: "none" }}>
                <table
                id="emailSignature"
        
                  style={{
                    height: "182px",
                    width: "340px",
                    background: "white",
                    color: "#2a2725",
                    border: "1px solid #8080805c",
                    borderRadius: "8px",
                    minWidth: "320px",
                    maxWidth: "360px",
                    minHeight: "182px",
                    fontFamily: "Arial, sans-serif",
                    borderCollapse:"separate"
                  }}
                >
                  <tr>
                    <td
                      colSpan="1"
                      style={{ verticalAlign: "middle", width: "80px" }}
                    >
                      <img
                        src={profileImage}
                        style={{
                          width: "70px",
                          height: "70px",
                          borderRadius: "50%",
                          border: "2px solid orangered",
                          // margin: "0px auto",
                          objectFit: "cover",
                          padding: "3px",
                          marginTop: "2px",
                          marginLeft: "8px",
                        }}
                      />
                    </td>
                    <td
                      colSpan="1"
                      style={{ verticalAlign: "middle", padding: "0" }}
                    >
                      <table
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        style={{ marginLeft: "7px", lineHeight: "17px" }}
                      >
                        <tr>
                          <td
                            style={{
                              fontSize: "16px",
                              fontWeight: "bold",
                              padding: "0",
                              marginTop: "8px",
                            }}
                          >
                            {name}
                          </td>
                        </tr>
                        <tr>
                          <td
                            style={{
                              fontSize: "14px",
                              color: "#666",
                              padding: "0",
                            }}
                          >
                            {designation}
                          </td>
                        </tr>
                        <tr>
                          <td
                            style={{
                              fontSize: "14px",
                              color: "#666",
                              padding: "0",
                              fontStyle: "italic",
                            }}
                          >
                            {company}
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2">
                      <table
                        border="0"
                        cellPadding="0"
                        cellSpacing="0"
                        style={{
                          marginLeft: "10px",
                          marginBottom: "-8px",
                          lineHeight: "20px",
                        }}
                      >
                        <tbody>
                          <tr>
                            <td
                              style={{
                                fontSize: "12px",
                                verticalAlign: "middle",
                                paddingRight: "5px",
                              }}
                            >
                              {/* <CiGlobe/> */}
                              <img
                                style={{ height: "18px" }}
                                src="https://res.cloudinary.com/da54sljjk/image/upload/v1729747808/qviq/email/arunvmpeljdyxwddovix.png"
                              />
                            </td>
                            <td
                              style={{
                                fontSize: "12px",
                                verticalAlign: "middle",
                                textDecoration: "none",
                                color: "#2a2725",
                              }}
                            >
                              <a
                                href={websiteLabel}
                                style={{
                                  textDecoration: "none",
                                  color: "#2a2725",
                                }}
                              >
                                {websiteLabel}
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                fontSize: "12px",
                                verticalAlign: "middle",
                                paddingRight: "5px",
                              }}
                            >
                              {/* <TfiEmail /> */}
                              <img
                                style={{
                                  height: "11px",
                                  width: "15px",
                                  marginLeft: "2px",
                                  marginTop: "4px",
                                }}
                                src="https://res.cloudinary.com/da54sljjk/image/upload/v1729747809/qviq/email/btddpvvutbtslzc28ng6.png"
                              />
                            </td>
                            <td
                              style={{
                                fontSize: "12px",
                                verticalAlign: "middle",
                                textDecoration: "none",
                                color: "#2a2725",
                              }}
                            >
                              <a
                                href={userEmail}
                                style={{
                                  textDecoration: "none",
                                  color: "#2a2725",
                                }}
                              >
                                {userEmail}
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                fontSize: "12px",
                                verticalAlign: "middle",
                                paddingRight: "5px",
                              }}
                            >
                              {/* <BsTelephone /> */}
                              <img
                                style={{
                                  height: "12px",
                                  marginLeft: "4px",
                                  marginTop: "4px",
                                }}
                                src="https://res.cloudinary.com/da54sljjk/image/upload/v1729747808/qviq/email/pwqk8l9ssvbqkca8k9qx.png"
                              />
                            </td>
                            <td
                              style={{
                                fontSize: "12px",
                                verticalAlign: "middle",
                              }}
                            >
                              <a
                                style={{
                                  textDecoration: "none",
                                  color: "#2a2725",
                                }}
                              >
                                {phoneNumber && phoneNumber}
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                    <td>
                      <table style={{ marginBottom: "5px" }}>
                        <tr>
                          <td>
                            <div
                              className="qrDiv"
                              ref={QRimage}
                              style={{
                                width: "60px",
                                height: "60px",
                                // margin: "0 auto 5px auto",
                                display: "block",
                                // marginLeft:"5px"
                              }}
                            ></div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <img
                              style={{
                                height: "38px",
                                width: "60px",
                                // marginBottom:"5px"
                              }}
                              src="https://res.cloudinary.com/duykfm6dn/image/upload/v1729836262/qsxx5hpucrj7apen6gk4.png"
                            />
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </a>

              {/* <a
                //  ref={displayRef}
                href={websiteLink}
                ref={displayRef}
              >
                <table
                  // cellPadding="0"
                  // cellSpacing="0"

                  style={{
                    width: "320px",
                    height: "182px",
                    minWidth: "320px",
                    maxWidth: "360px",
                    minHeight: "182px",
                    fontFamily: "Arial, sans-serif",
                    color: "#2a2725",
                    position: "relative",
                    // background: "black",
                    borderRadius: "15px",
                    borderCollapse: "separate",
                    borderSpacing: 0,
                    overflow: "hidden",
                  }}
                >
                  <tr>
                    <th
                      style={{
                        // border: "1px solid red",
                        minWidth: "106.5px",
                        height: "182pxpx",
                        maxWidth: "126.6px",
                        maxHeight: "182px",
                        fontWeight: "200",
                        fontSize: "12px",
                        lineHeight: "15px",
                        textAlign: "center",
                        textDecoration: "none",
                        borderCollapse: "collapse",
                      }}
                    >
                      <div
                        className="qrDiv"
                        ref={QRimage}
                        style={{
                          width: "50px",
                          height: "50px",
                          margin: "0 auto 5px auto",
                          display: "block",
                        }}
                      ></div>
                      {websiteLabel}
                    </th>

                    <th>
                      <table
                        style={{
                          // border: "1px solid red",
                          width: "100px",
                          height: "182px",
                          maxWidth: "100px",
                          maxHeight: "182x",
                          borderCollapse: "collapse",
                        }}
                      >
                        <tr>
                          <th
                            style={{
                              // border: "1px solid red",
                              height: "10px",
                              width: "106.5px",
                              minWidth: "106.5px",
                              borderCollapse: "collapse",
                            }}
                          ></th>
                        </tr>

                        <tr>
                          <th
                            style={{
                              // border: "1px solid red",
                              height: "45px",
                              width: "106.5px",
                              minWidth: "106.5px",
                              borderCollapse: "collapse",
                            }}
                          >
                            <img
                              src={profileImage}
                              alt="Profile"
                              style={{
                                width: "70px",
                                height: "70px",
                                borderRadius: "50%",
                                border: "2px solid white",
                                margin: "0px auto",
                                objectFit: "cover",
                              }}
                            />
                          </th>
                        </tr>

                        <tr>
                          <th>
                            <table
                              style={{
                                // border: "1px solid red",
                                // height: "101px",
                                maxWidth: "126.6px",
                                minWidth: "106.5px",
                                borderCollapse: "collapse",
                                marginBottom: "8px",
                              }}
                            >
                              <tr>
                                <th
                                  style={{
                                    // height: "60px",
                                    maxWidth: "126.6px",
                                    minWidth: "106.5px",
                                    fontWeight: "400",
                                    fontSize: "14px",
                                    lineHeight: "18px",
                                    textAlign: "center",
                                    // border: "1px solid red",
                                    borderCollapse: "collapse",
                                  }}
                                >
                                  {name}
                                </th>
                              </tr>
                              <tr>
                                <th
                                  style={{
                                    // height: "40px",
                                    minWidth: "106.5px",
                                    // minWidth: "100px",
                                    maxWidth: "126.6",
                                    fontWeight: "100",
                                    fontSize: "12px",
                                    lineHeight: "15px",
                                    textAlign: "center",
                                    // border: "1px solid red",
                                    borderCollapse: "collapse",
                                  }}
                                >
                                  {designation && company
                                    ? `${designation}, ${company}`
                                    : designation && !company
                                    ? `${designation}`
                                    : `${company}`}
                                </th>
                              </tr>
                            </table>
                          </th>
                        </tr>
                      </table>
                    </th>

                    <th
                      style={{
                        // border: "1px solid red",
                        maxWidth: "126.6px",
                        height: "182px",
                        minWidth: "106.5px",
                        maxHeight: "182px",
                        borderCollapse: "collapse",
                      }}
                    ></th>
                  </tr>
                </table>
              </a> */}

              {/* <a  ref={displayRef} >
             <div
                style={{
                  background:"white",
                  display: "flex",
                  padding: "10px",
                  width: "320px",
                  height: "182px",
                  color: "#2a2725",
                  
                }}
               
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <img
                      src={profileImage}
                      alt="Profile"
                      style={{
                        width: "70px",
                        height: "70px",
                        borderRadius: "15%",
                        padding: "5px",
                        border: "2px solid #e40849",
                      }}
                    />
                    <div
                      style={{
                        lineHeight: "15px",
                      }}
                    >
                      <p
                        style={{
                          fontWeight: "bold",
                          fontSize: "14px",
                          margin: "0",
                        }}
                      >
                        {name}
                      </p>
                      <p
                        style={{
                          fontSize: "12px",
                          margin: "4px 0",
                        }}
                      >
                        {designation}
                      </p>
                      <p
                        style={{
                          fontSize: "12px",
                          fontStyle: "italic",
                          margin: "0",
                        }}
                      >
                        {company}
                      </p>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginTop: "16px",
                    }}
                  >
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        fontSize: "12px",
                        marginBottom: "4px",
                      }}
                    >
                      <span style={{ color: "#e40849" }}>🌐</span>
                      {websiteLabel}
                    </span>
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        fontSize: "12px",
                        marginBottom: "4px",
                      }}
                    >
                      <span style={{ color: "#e40849" }}>✉️</span>
                      yadavramprasad563@gmail.com
                    </span>
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        fontSize: "12px",
                      }}
                    >
                      <span style={{ color: "#e40849" }}>📞</span>
                      +91 7052774096
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "80px",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={QRlink}
                    alt="QR Code"
                    style={{
                      height: "50px",
                      width: "50px",
                      marginBottom: "4px",
                    }}
                  />
                  <img
                    src={Powered}
                    alt="powered by qviq"
                    style={{
                      maxWidth: "100%",
                    }}
                  />
                </div>
              </div>
             </a> */}

              {/* <div className="bg-white flex  p-[10px] w-[320px] h-[182px] text-black relatives" ref={GmailRef} >
                <div className="flex flex-col">
                  <div className="flex items-center gap-x-[8px] ">
                    <img
                      src={profileImage}
                      className="w-[70px] h-[70px] rounded-[15%] p-[5px] border-2 border-orange-500 "
                    />
                    <div className="leading-[15px]">
                      <p className="font-bold text-[14px]">{name}</p>
                      <p className="text-[12px]">{designation}</p>
                      <p className="text-[12px] italic ">{company}</p>
                    </div>
                  </div>
                  <div className="flex flex-col mt-4 ">
                    <span className="flex items-center gap-[10px] text-[12px] ">
                      {" "}
                      <span className="text-[#e40849]" >  <CiGlobe /></span>
                    
                      {websiteLabel}
                    </span>
                    <span className="flex items-center gap-[10px] text-[12px] ">
                      {" "}
                      <span className="text-[#e40849]" > <TfiEmail /></span>
                      yadavramprasad563@gmail.com
                    </span>
                    <span className="flex items-center gap-[10px] text-[12px] ">
                      {" "}
                      <span className="text-[#e40849]" >
                      <BsTelephone />

                      </span>
                     +91 7052774096
                    </span>
                  </div>
                </div>
                <div className="flex flex-col mt-[5rem] items-center  " >
                  <img src={QRlink} className="h-[50px] w-[50px]" />
                  <img src={Powered} alt="powerd by qviq" />
                </div>
              </div> */}

              {/* <a ref={displayRef} >
            <table
                style={{
                  width: "320px",
                  height: "182px",
                  minWidth: "320px",
                  maxWidth: "360px",
                  minHeight: "182px",
                  fontFamily: "Arial, sans-serif",
                  color: "#2a2725",
                  background: "white",
                  position: "relative",
                  borderCollapse: "collapse",
                }}
              >
                <tr>
                  <th>
                    <table
                      style={{
                        border: "1px solid red",
                        width: "100px",
                        height: "182px",
                        maxWidth: "100px",
                        maxHeight: "182x",
                        borderCollapse: "collapse",
                      }}
                    >
                      <tr>
                        <th
                          style={{
                            border: "1px solid red",
                            height: "10px",
                            width: "106.5px",
                            minWidth: "106.5px",
                            borderCollapse: "collapse",
                          }}
                        ></th>
                      </tr>

                      <tr>
                        <th
                          style={{
                            border: "1px solid red",
                            height: "45px",
                            width: "106.5px",
                            minWidth: "106.5px",
                            borderCollapse: "collapse",
                          }}
                        >
                          <img
                            src={profileImage}
                            alt="Profile"
                            style={{
                              width: "70px",
                              height: "70px",
                              borderRadius: "20%",
                              border: "2px solid orange",
                              margin: "0px auto",
                              objectFit: "cover",
                              padding: "5px",
                            }}
                          />
                        </th>
                      </tr>

                      <tr>
                        <th>
                          <table
                            style={{
                              border: "1px solid red",
                              // height: "101px",
                              maxWidth: "126.6px",
                              minWidth: "106.5px",
                              borderCollapse: "collapse",
                              marginBottom: "8px",
                            }}
                          >
                            <tr>
                              <th
                                style={{
                                  // height: "60px",
                                  maxWidth: "126.6px",
                                  minWidth: "106.5px",
                                  fontWeight: "400",
                                  fontSize: "14px",
                                  lineHeight: "18px",
                                  textAlign: "center",
                                  border: "1px solid red",
                                  borderCollapse: "collapse",
                                }}
                              >
                                ram.qviq.io
                              </th>
                            </tr>
                            <tr>
                              <th
                                style={{
                                  // height: "60px",
                                  maxWidth: "126.6px",
                                  minWidth: "106.5px",
                                  fontWeight: "400",
                                  fontSize: "14px",
                                  lineHeight: "18px",
                                  textAlign: "center",
                                  border: "1px solid red",
                                  borderCollapse: "collapse",
                                }}
                              >
                                yadavramprasad563
                              </th>
                            </tr>
                            <tr>
                              <th
                                style={{
                                  // height: "60px",
                                  maxWidth: "126.6px",
                                  minWidth: "106.5px",
                                  fontWeight: "400",
                                  fontSize: "14px",
                                  lineHeight: "18px",
                                  textAlign: "center",
                                  border: "1px solid red",
                                  borderCollapse: "collapse",
                                }}
                              >
                                +91 7052774096
                              </th>
                            </tr>
                          </table>
                        </th>
                      </tr>
                    </table>
                  </th>
                  <td
                    style={{
                      border: "1px solid red",
                      padding: "10px",
                      verticalAlign: "top",
                    }}
                  >
                    <div style={{ marginLeft: "10px" }}>
                      <p style={{  fontWeight: "bold text-[14px]" }}>
                        Your Name
                      </p>
                      <p style={{  fontSize: "12px" }}>
                        Your Designation
                      </p>
                      <p
                        style={{
                          fontSize: "12px",
                          fontStyle: "italic",
                        }}
                      >
                        Your Company
                      </p>
                    </div>
                  </td>
                  <th
                    style={{
                      border: "1px solid red",
                      minWidth: "106.5px",
                      height: "182pxpx",
                      maxWidth: "126.6px",
                      maxHeight: "182px",
                      fontWeight: "200",
                      fontSize: "12px",
                      lineHeight: "15px",
                      textAlign: "center",
                      textDecoration: "none",
                      borderCollapse: "collapse",
                    }}
                  >
                    <img
                      src={QRlink}
                      alt="QR Code"
                      style={{
                        width: "50px",
                        height: "50px",
                        margin: "0 auto 5px auto",
                        display: "block",
                      }}
                    />
                    {websiteLabel}
                  </th>
                </tr>
              </table>
            </a> */}

              <div ref={GmailRef} className="w-full hidden">
                <CreateSignature
                  QRlink={QRlink}
                  name={name}
                  email={email}
                  phoneNumber={phoneNumber}
                  location={location}
                  websiteLink={websiteLink}
                  websiteLabel={websiteLabel}
                  company={company}
                  instagram={instagram}
                  facebook={facebook}
                  designation={designation}
                  image={image}
                  profileImage={profileImage}
                  userName={userName}
                  setIsLoading={setIsLoading}
                  plateform={selectedPlatform}
                  Frame={Frame}
                  userEmail={userEmail}
                  mobileNumber={phoneNumber}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <NewToast open={showMessage} message={message} />
      {isLoading && (
        <>
          <div className="absolute top-0 left-0 flex flex-col justify-center items-center w-full h-full bg-black/30 z-[9999]">
            <div className="flex flex-col justify-center relative items-center w-[3rem] h-[3rem]">
              <img
                src={require("../Image/Tapop logo black.png").default.src}
                alt=""
                className="object-contain"
              />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex justify-center items-center">
              <LoadingAnimation />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// const CreateSignature = (data) => {
//   return (
//     <table
//       border="0"
//       cellpadding="0"
//       cellspacing="0"
//       style={{
//         display: "block",
//         boxShadow: "5px 5px 15px gray",
//         borderRadius: "10px",
//         width: "fit-content",
//         padding: "14px 20px",
//         overflow: "hidden",
//         backgroundColor: "#3d3d3d",
//         color: "white",
//       }}
//     >
//       <tbody>
//         <tr>
//           <td
//             style={{
//               width: "60px",
//               height: "60px",
//             }}
//           >
//             <img
//               class="makeStyles-logo-20"
//               src={require("../Images/tapopLogo.png").default.src}
//               alt="logo"
//               style={{ width: "100%", borderRadius: "15px" }}
//             />
//           </td>
//           <td style={{ padding: "0px 5px" }}>
//             <span
//               style={{
//                 width: "2px",
//                 backgroundColor: "gold",
//                 height: "80px",
//                 borderRadius: "100px",
//                 display: "block",
//                 margin: "0px 5px",
//               }}
//             ></span>
//           </td>
//           <td style={{ width: "60px", height: "60px" }}>
//             <img
//               class="makeStyles-logo-20"
//               src={data.image}
//               alt="logo"
//               style={{ width: "100%", borderRadius: "999999px" }}
//             />
//           </td>
//           <td style={{ marginLeft: "20px", paddingLeft: "20px" }}>
//             <table border="0" cellpadding="0" cellspacing="0">
//               <tbody>
//                 <tr style={{ lineHeight: "25px" }}>
//                   <td>
//                     <span
//                       style={{
//                         fontWeight: "bold",
//                         fontSize: "15px",
//                         color: "gold",
//                       }}
//                     >
//                       {data.name}
//                     </span>
//                   </td>
//                 </tr>
//                 <tr
//                   style={{
//                     lineHeight: "12px",
//                     marginTop: "2px",
//                     display: "block",
//                   }}
//                 >
//                   <td>
//                     <span style={{ fontSize: "10px", color: "white" }}>
//                       {data.designation}
//                     </span>
//                   </td>
//                 </tr>
//                 <tr
//                   style={{
//                     lineHeight: "12px",
//                     marginBottom: "1px",
//                     display: "block",
//                   }}
//                 >
//                   <td>
//                     <span style={{ fontSize: "10px", color: "white" }}>
//                       {data.company}
//                     </span>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//             <table
//               style={{ marginTop: "8px" }}
//               border="0"
//               cellpadding="0"
//               cellspacing="0"
//             >
//               <tbody>
//                 <tr style={{ lineHeight: "12px" }}>
//                   <td
//                     style={{
//                       marginRight: "8px",
//                       display: "block",
//                       width: "12px",
//                       height: "12px",
//                     }}
//                   >
//                     <img
//                       src={require("./phone.svg").default.src}
//                       color="#000"
//                       alt="Website URL icon"
//                       style={{ width: "100%" }}
//                     />
//                   </td>
//                   <td>
//                     <span
//                       style={{
//                         fontSize: "10px",
//                         color: "white",
//                         textDecoration: "none",
//                       }}
//                     >
//                       {data.phoneNumber}
//                     </span>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//             <table
//               style={{ marginTop: "1px" }}
//               border="0"
//               cellpadding="0"
//               cellspacing="0"
//             >
//               <tbody>
//                 <tr style={{ lineHeight: "12px" }}>
//                   <td
//                     style={{
//                       marginRight: "8px",
//                       display: "block",
//                       width: "12px",
//                       height: "12px",
//                     }}
//                   >
//                     <img
//                       src={require("./email.svg").default.src}
//                       color="#000"
//                       alt="Website URL icon"
//                       style={{ width: "100%" }}
//                     />
//                   </td>
//                   <td>
//                     <span
//                       style={{
//                         fontSize: "10px",
//                         color: "white",
//                         textDecoration: "none",
//                       }}
//                     >
//                       {data.email}
//                     </span>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//             <table
//               style={{ marginTop: "1px" }}
//               border="0"
//               cellpadding="0"
//               cellspacing="0"
//             >
//               <tbody>
//                 <tr style={{ lineHeight: "12px" }}>
//                   <td
//                     style={{
//                       marginRight: "8px",
//                       display: "block",
//                       width: "12px",
//                       height: "12px",
//                     }}
//                   >
//                     <img
//                       src={require("./website.svg").default.src}
//                       color="#000"
//                       alt="Website URL icon"
//                       style={{ width: "100%" }}
//                     />
//                   </td>
//                   <td>
//                     <a
//                       href={data.websiteLink}
//                       style={{ textDecoration: "none", color: "white" }}
//                     >
//                       <span style={{ fontSize: "10px" }}>
//                         {data.websiteLabel}
//                       </span>
//                     </a>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//             {data.location && data.location != "" && (
//               <table
//                 style={{ marginTop: "1px" }}
//                 border="0"
//                 cellpadding="0"
//                 cellspacing="0"
//               >
//                 <tbody>
//                   <tr style={{ cursor: "pointer", lineHeight: "12px" }}>
//                     <td
//                       style={{
//                         marginRight: "8px",
//                         display: "block",
//                         width: "12px",
//                         height: "12px",
//                       }}
//                     >
//                       <img
//                         src={require("./location.svg").default.src}
//                         color="#000"
//                         alt="Location icon"
//                         style={{ width: "100%" }}
//                       />
//                     </td>
//                     <td>
//                       <span style={{ fontSize: "10px" }}>{data.location}</span>
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             )}
//             <table
//               style={{ marginTop: "5px", marginLeft: "15px", width: "100%" }}
//               border="0"
//               cellpadding="0"
//               cellspacing="0"
//             >
//               <tbody>
//                 <tr style={{ cursor: "pointer", lineHeight: "12px" }}>
//                   {data.instagram && data.instagram != "" && (
//                     <td
//                       style={{
//                         marginRight: "8px",
//                         display: "inline-block",
//                         width: "12px",
//                         height: "12px",
//                       }}
//                     >
//                       <a
//                         href={`https://instagram.com/${data.instagram}`}
//                         color="#000"
//                         style={{
//                           display: "inline-block",
//                           width: "100%",
//                           padding: "0px",
//                           margin: "0px 2px",
//                         }}
//                       >
//                         <img
//                           src={
//                             require("../Logos/SocialMediaLogos/instagram.png")
//                               .default.src
//                           }
//                           color="#000"
//                           alt="Instagram icon"
//                           style={{ width: "100%" }}
//                         />
//                       </a>
//                     </td>
//                   )}
//                   {data.facebook && data.facebook != "" && (
//                     <td
//                       style={{
//                         marginRight: "8px",
//                         display: "inline-block",
//                         width: "12px",
//                         height: "12px",
//                       }}
//                     >
//                       <a
//                         href={`https://facebook.com/${data.facebook}`}
//                         color="#000"
//                         style={{
//                           display: "inline-block",
//                           width: "100%",
//                           padding: "0px",
//                           margin: "0px 2px",
//                         }}
//                       >
//                         <img
//                           src={
//                             require("../Logos/SocialMediaLogos/facebook.png")
//                               .default.src
//                           }
//                           color="#000"
//                           alt="Instagram icon"
//                           style={{ width: "100%" }}
//                         />
//                       </a>
//                     </td>
//                   )}
//                 </tr>
//               </tbody>
//             </table>
//           </td>
//         </tr>
//       </tbody>
//     </table>
//   );
//   //     <div style="margin-top: 5px;">
//   //     <div style="margin: auto; width: 100%;">
//   //         <a href="https://www.facebook.com/bycodersTec" color="#000" style="display: inline-block; padding: 0px; background-color: rgb(0, 0, 0); margin: 0px 5px;">
//   //             <img src="https://cdn2.hubspot.net/hubfs/53/tools/email-signature-generator/icons/facebook-icon.png" alt="facebook" color="#000" style="background-color: rgb(0, 0, 0); max-width: 135px; display: block;" />
//   //         </a>
//   //         <a href="https://www.instagram.com/bycoders_/" color="#000" style="display: inline-block; padding: 0px; background-color: rgb(0, 0, 0); margin: 0px 5px;">
//   //             <img src="https://cdn2.hubspot.net/hubfs/53/tools/email-signature-generator/icons/instagram-icon.png" alt="facebook" color="#000" style="background-color: rgb(0, 0, 0); max-width: 135px; display: block;" />
//   //         </a>
//   //         <a href="https://www.linkedin.com/company/bycoders-tecnologia/" color="#000" style="display: inline-block; padding: 0px; background-color: rgb(0, 0, 0); margin: 0px 5px;">
//   //             <img src="https://cdn2.hubspot.net/hubfs/53/tools/email-signature-generator/icons/linkedin-icon.png" alt="facebook" color="#000" style="background-color: rgb(0, 0, 0); max-width: 135px; display: block;" />
//   //         </a>
//   //     </div>
//   // </div>
// };

const CreateSignature = ({
  QRlink,
  profileImage,
  userName,
  name,
  designation,
  company,
  websiteLabel,
  setIsLoading,
  websiteLink,
  userEmail,
  mobileNumber,
  plateform,
  letsgo1,
  letsgo2,
  brand,
  logo,
  Frame,
}) => {
  const [longer, setLonger] = useState(false);
  if (!QRlink) {
    setIsLoading(true);
  } else {
    setIsLoading(false);
  }
  function countLettersIncludingSpaces(word) {
    return word.length;
  }
  useEffect(() => {
    const number = countLettersIncludingSpaces(name);
    if (number > 11) {
      setLonger(true);
    } else {
      setLonger(false);
    }
  }, []);

  return (
    <a href={websiteLink} target="_blank" style={{ textDecoration: "none" }}>
      <table
        style={{
          height: "182px",
          width: "360px",
          // background: "red",
          // backgroundColor: "#ffffff",
          background:"#f2f1f0",
          color: "#2a2725",
          border: "1px solid #8080805c",
          borderRadius: "7px",
          minWidth: "320px",
          maxWidth: "360px",
          minHeight: "182px",
          fontFamily: "Arial, sans-serif",
        }}
        // bgcolor="#ffffff"
      >
        <tr>
          <td colSpan="1" style={{ verticalAlign: "middle", width: "80px",background:"#f2f1f0",color: "#2a2725" }}>
            <img
              src={profileImage}
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                border: "2px solid orangered",
                // margin: "0px auto",
                objectFit: "cover",
                padding: "3px",
                marginTop: "8px",
                marginLeft: "8px",
              }}
            />
          </td>
          <td colSpan="1" style={{ verticalAlign: "middle", padding: "0" }}>
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              style={{
                marginLeft: "7px",
                lineHeight: "17px",
                textDecoration: "none",
              }}
            >
              <tr>
                <td
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    padding: "0",
                    marginTop: "8px",
                  }}
                >
                  {name}
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    fontSize: "14px",
                    color: "#666",
                    padding: "0",
                  }}
                >
                  {designation}
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    fontSize: "14px",
                    color: "#666",
                    padding: "0",
                    fontStyle: "italic",
                  }}
                >
                  {company}
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <table
              border="0"
              cellPadding="0"
              cellSpacing="0"
              style={{
                marginLeft: "10px",
                marginBottom: "-8px",
                lineHeight: "20px",
                marginTop: "10px",
                textDecoration: "none",
              }}
            >
              <tbody>
                <tr>
                  <td
                    style={{
                      fontSize: "12px",
                      verticalAlign: "middle",
                      paddingRight: "5px",
                    }}
                  >
                    {/* <CiGlobe/> */}
                    <img
                      style={{ height: "18px", marginTop: "4px" }}
                      src="https://res.cloudinary.com/da54sljjk/image/upload/v1729747808/qviq/email/arunvmpeljdyxwddovix.png"
                    />
                  </td>
                  <td
                    style={{
                      fontSize: "12px",
                      verticalAlign: "middle",
                      textDecoration: "none",
                      color: "#2a2725",
                    }}
                  >
                    <a
                      href={websiteLabel}
                      style={{ textDecoration: "none", color: "#2a2725" }}
                    >
                      {websiteLabel}
                    </a>
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      fontSize: "12px",
                      verticalAlign: "middle",
                      paddingRight: "5px",
                    }}
                  >
                    {/* <TfiEmail /> */}
                    <img
                      style={{
                        height: "11px",
                        width: "15px",
                        marginLeft: "2px",
                        marginTop: "5px",
                      }}
                      src="https://res.cloudinary.com/da54sljjk/image/upload/v1729747809/qviq/email/btddpvvutbtslzc28ng6.png"
                    />
                  </td>
                  <td
                    style={{
                      fontSize: "12px",
                      verticalAlign: "middle",
                      textDecoration: "none",
                      color: "#2a2725",
                    }}
                  >
                    <a
                      href={userEmail}
                      style={{ textDecoration: "none", color: "#2a2725" }}
                    >
                      {userEmail}
                    </a>
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      fontSize: "12px",
                      verticalAlign: "middle",
                      paddingRight: "5px",
                    }}
                  >
                    {/* <BsTelephone /> */}
                    <img
                      style={{
                        height: "12px",
                        marginLeft: "6px",
                        marginTop: "7px",
                      }}
                      src="https://res.cloudinary.com/da54sljjk/image/upload/v1729747808/qviq/email/pwqk8l9ssvbqkca8k9qx.png"
                    />
                  </td>
                  <td
                    style={{
                      fontSize: "12px",
                      verticalAlign: "middle",
                    }}
                  >
                    <a style={{ textDecoration: "none", color: "#2a2725" }}>
                      {" "}
                      {mobileNumber && mobileNumber}
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
          <td>
            <table style={{ marginBottom: "-7px" }}>
              <tr>
                <td>
                  <img
                    src={QRlink}
                    style={{
                      width: "60px",
                      height: "60px",
                      // margin: "0 auto 5px auto",
                      display: "block",
                      // marginLeft: "5px",
                    }}
                  />
                  {/* <div
                        className="qrDiv"
                        ref={QRimage}
                        style={{
                          width: "60px",
                          height: "60px",
                          // margin: "0 auto 5px auto",
                          display: "block",
                          // marginLeft:"5px"
                        }}
                      ></div> */}
                </td>
              </tr>
              <tr>
                <td>
                  <img
                    style={{
                      height: "38px",
                      width: "60px",
                      // marginBottom:"12px"
                    }}
                    src="https://res.cloudinary.com/da54sljjk/image/upload/v1729846513/qviq/email/r8xfahedajkj0ayqpyzs.png"
                  />
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </a>
  );
};

export default EmailSignature;
