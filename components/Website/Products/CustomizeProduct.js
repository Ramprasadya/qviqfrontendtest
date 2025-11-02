import React, { useState, useRef, useContext, useEffect } from "react";
import {
  HiCheckCircle,
  HiOutlineUpload,
  HiOutlineX,
  HiShieldCheck,
  HiXCircle,
} from "react-icons/hi";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";
import { storage } from "../../Login/firebaseconfig";
import { UserContext } from "../../Contexts/context";
import { Button } from "@mui/material";
import {
  HiArrowLeft,
  HiArrowRight,
  HiCheck,
  HiChevronDown,
  HiChevronUp,
  HiOutlinePhoto,
  HiOutlineShoppingCart,
  HiPlus,
  HiXMark,
} from "react-icons/hi2";
import PrimaryButton3 from "../../UiComponents/PrimaryButton3";
import InputField from "../../UiComponents/InputField";
import CustomizedCardFront from "../../UiComponents/CustomizedCards/CustomizedCardFront";
import CustomizedCardBack from "../../UiComponents/CustomizedCards/CustomizedCardBack";
import { useRouter } from "next/navigation";
import useOutsideClick from "../../Utils/useOutsideClick";
import html2canvas from "html2canvas";
import Modal from "../../ModalComponent/Modal";
import PrimaryButton from "../../UiComponents/PrimaryButton";
import PrimaryButton2 from "../../UiComponents/PrimaryButton2";
import LoadingAnimation from "../../UiComponents/Loading/LoadingAnimation";
import Image from "next/image";
import NewModal from "@/components/UiComponents/NewModal/NewModal";
import { GoCircle } from "react-icons/go";
import { MdArrowForwardIos, MdOutlineRadioButtonChecked } from "react-icons/md";
import GiftImg from "./gift.svg";
import OfferCard from "./OfferCard";
import { serverUrl } from "@/config";
import axios from "axios";
import SecondaryButton from "@/components/UiComponents/SecondaryButton";
import Image2 from "../assets/Image2.svg";
import Image3 from "../assets/Image3.svg";
import Icon2 from "../assets/Icon2.svg";
import Icon3 from "../assets/Icon3.svg";

const CustomizeProduct = ({
  customization ,
  setCustomization,
  product,
  setIsCustomizing,
  color,
  setRenderVal,
  render,
}) => {
  const [loading, setLoading] = useState(false);
  const [cardLoading, setCardLoading] = useState(false);

  const [dropdown, setDropDown] = useState(false);
  const [dropdown2, setDropDown2] = useState(false);
  const [side, setSide] = useState("front");

const [name, setName] = useState("");
const [customDesignation, setCustomDesignation] = useState("");

 const [customName, setCustomName] = useState("");

//  const [customDesignation, setCustomDesignation] = useState("");
  //  const [nameFocused, setNameFocused] = useState(false);

  const { cart, handleAdd, handleDel, handleQuantityChange } =
    useContext(UserContext);
  const [activeTab, setActiveTab] = useState("Name");
  const navigate = useRouter();
  const addToCart = (product, color, offer) => {
    const productWithCustomization = {
      ...product,
      customization: customization,
      color,
      offer: offer ? offer : "not combo",
    };
    handleAdd(productWithCustomization);
    // console.log("productWithCustomization", productWithCustomization);

    // console.log(cardLoading);
    navigate.push("/cart");
  };

  const [appliedOffer, setAppliedOffer] = useState({});

  const getOffer = async () => {
    try {
      const { data } = await axios.get(`${serverUrl}/admin/offer/getOffers`);
      const eligibleOffers = data.filter(
        (offer) =>
          offer.productIds.includes(product._id) ||
          offer.productIds.includes("Total")
      );

      setAppliedOffer(eligibleOffers[0] ? eligibleOffers[0] : {});

      //console.log("ggwp");
      //console.log(product);

    } catch (error) {
      //console.log(error);
    }
  };

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  const handleNameChange = (event) => {
    setCustomization({ ...customization, name: event.target.value });
  };

  const handleFontStyleChange = (event) => {
    setCustomization({ ...customization, fontStyle: event.target.value });
  };

  const handleFontColorChange = (event) => {
    setCustomization({ ...customization, fontColor: event.target.value });
  };

  const handleDesignationChange = (event) => {
    setCustomization({ ...customization, designation: event.target.value });
  };

  const handleDesignationStyleChange = (event) => {
    setCustomization({
      ...customization,
      designationStyle: event.target.value,
    });
  };

  const handleDesignationColorChange = (event) => {
    setCustomization({
      ...customization,
      designationColor: event.target.value,
    });
  };

  const handleLogoChange = (event) => {
    setCustomization({ ...customization, logo: event.target.value });
  };

  const handleCardColorChange = (event) => {
    setCustomization({ ...customization, cardColor: event.target.value });
  };

  // close dropdown when clicked outside
  const dropdownRef = useRef(null);
  const dropdownRef2 = useRef(null);
  useOutsideClick(dropdownRef, () => {
    if (dropdown) {
      setDropDown(false);
    }
  });
  useOutsideClick(dropdownRef2, () => {
    if (dropdown2) {
      setDropDown2(false);
    }
  });

  const [colorIndex, setColorIndex] = useState(0);
  const [pcolour, setpcolour] = useState([
    "#000000",
    "#3F3F3F",
    "#7A7A7A",
    "#AEAEAE",
    "#DDDDDD",
    "#F54040",
    "#FE7171",
    "#FF4789",
    "#3D58DB",
    "#5B3FE9",
    "#FB6535",
    "#FF8A00",
    "#FFC700",
    "#9CDD32",
  ]);
  const [ncolour, setncolour] = useState([
    "#000000",
    "#4D4D4D",
    "#7A7A7A",
    "#AEAEAE",
    "#DDDDDD",
    "#EEEEEE",
    "#F9F9F9",
    "#FFFFFF",
  ]);
  const fileInputRef = useRef(null);
  const [logo, setLogo] = useState("");
  const [imageUrl, setImageUrl] = useState(null);

  const uploadLogoToFirebase = async (event) => {
    setLoading(true);
    const image = event.target.files[0];
    // console.log(image);

    const imageRef = ref(storage, `/customised-qviq-cards/logo/${image.name}`);
    uploadBytesResumable(imageRef, image)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref)
          .then((downloadURL) => {
            // Once image is uploaded, get the download URL

            setImageUrl(downloadURL);
            setLogo(downloadURL);
            setCustomization({ ...customization, logo: downloadURL });
          })
          .catch((err) => {
            console.error("Error getting download URL from Firebase", err);
            setLoading(false);
          });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error uploading image to Firebase Storage", err);
        setLoading(false);
      });
  };

  const [imageData, setImageData] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImageData(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setLogo("");
    setCustomization({ ...customization, logo: "" });
  };

  //store html2canvas image into firebase
  function generateRandomString(length) {
    const charset =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return result;
  }

  const [cardUrl, setCardUrl] = useState("");

  const elementToCaptureRef = useRef(null);

  const convertToPng = () => {
    // console.log("convertToPng");
    setCardLoading(true);
    const htmlContent = elementToCaptureRef.current;
    // htmlContent.style.imageRendering = "pixelated";
    //console.log(elementToCaptureRef);
    if (htmlContent) {
      // console.log("htmlcontent");
      html2canvas(htmlContent, {
        dpi: 600,
        scale: 10,
        backgroundColor: null,
      }).then((canvas) => {
        canvas.toBlob((blob) => {
          // Convert the canvas to a Blob
          if (blob) {
            const uploadCardToFirebase = async (blob) => {
              setCardLoading(true);
              const randomString = generateRandomString(10); // Generate a random string
              const imageName = `${randomString}-customized-image.png`; // Set a name for image
              const imageRef = ref(
                storage,
                `/customised-qviq-cards/cards/${imageName}`
              );

              uploadBytes(imageRef, blob)
                .then((snapshot) => {
                  getDownloadURL(snapshot.ref)
                    .then((downloadURL) => {
                      // Once image is uploaded, get the download URL
                      setCardUrl(downloadURL);
                      // console.log(downloadURL);
                      setCustomization({
                        ...customization,
                        customCard: downloadURL,
                      });
                      setCardLoading(false);
                    })
                    .catch((err) => {
                      console.error(
                        "Error getting download URL from Firebase",
                        err
                      );
                      setCardLoading(false);
                    });
                })
                .catch((err) => {
                  console.error(
                    "Error uploading image to Firebase Storage",
                    err
                  );
                  setCardLoading(false);
                });
            };
            uploadCardToFirebase(blob);
          }
        });
      });
    }
  };

  const [modal, setModal] = useState(false);
  const [offerModal, setOfferModal] = useState(false);
  const [planModal, setPlanModal] = useState(false);
  



  const renderTabContent = () => {
    switch (activeTab) {
      case "Name":
        return (
           <div className="relative mb-6">
      
            <input
              className="w-full h-[56px] pl-[24px] bg-[#fafafa] rounded-[10px] text-sm"
              placeholder="Your Name"
              type="text"
              id="name"
             value={name}
              onChange={(e) => setName(e.target.value)}
              
        
      />
      
            <button
              onClick={() => setDropDown(!dropdown)}
              className=" flex w-full justify-between pr-[20px] mt-[32px] items-center p-[8px] bg-white rounded-[12px] border border-[#DFDBD8] "
              ref={dropdownRef}
            >
              <div className="flex gap-[16px] ">
                <div
                  className="flex w-[64px] h-[64px] bg-[#f3f3f3] rounded-[12px] font-[600] text-[24px] leading-[22px] justify-center items-center"
                  style={{ fontFamily: "Playfair Display" }}
                >
                  T
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-cGrey font-semibold text-start text-[14px] leading-[22px]">
                    Select Font
                  </p>
                  <p
                    style={{ fontFamily: `${customization.fontStyle}` }}
                    className="font-bold text-[14px] text-start leading-[22px]"
                  >
                    {customization.fontStyle}
                  </p>
                </div>
              </div>
              {dropdown ? <HiChevronUp /> : <HiChevronDown />}
              {dropdown && (
                <div
                  className="w-full dropDown_popup"
                  style={{
                    top: "5rem",
                    width: "100%",
                    textAlign: "left",
                    left: "0",
                  }}
                >
                  <div
                    onClick={() => {
                      setCustomization({
                        ...customization,
                        fontStyle: "Avenir",
                      });
                      setDropDown(false);
                    }}
                    className="dropDown_popup_item"
                  >
                    Avenir
                  </div>
                  <div
                    onClick={() => {
                      setCustomization({
                        ...customization,
                        fontStyle: "Bebas Neue",
                      });
                      setDropDown(false);
                    }}
                    className="dropDown_popup_item"
                  >
                    Bebas Neue
                  </div>
                  <div
                    onClick={() => {
                      setCustomization({
                        ...customization,
                        fontStyle: "Raleway",
                      });
                      setDropDown(false);
                    }}
                    className="dropDown_popup_item"
                  >
                    Raleway
                  </div>
                  <div
                    onClick={() => {
                      setCustomization({
                        ...customization,
                        fontStyle: "Open Sans",
                      });
                      setDropDown(false);
                    }}
                    className="dropDown_popup_item"
                  >
                    Open Sans
                  </div>
                  <div
                    onClick={() => {
                      setCustomization({
                        ...customization,
                        fontStyle: "Montserrat",
                      });
                      setDropDown(false);
                    }}
                    className="dropDown_popup_item"
                  >
                    Montserrat
                  </div>
                  <div
                    onClick={() => {
                      setCustomization({
                        ...customization,
                        fontStyle: "Playfair Display",
                      });
                      setDropDown(false);
                    }}
                    className="dropDown_popup_item"
                  >
                    Playfair Display
                  </div>
                </div>
              )}
            </button>

            <p className="text-[#817C7C] mt-[32px] font-[600] text-[14px] leading-[24px]">
              Font Color
            </p>
            <div className=" grid grid-cols-3 xsm2:grid-cols-4 sm:grid-cols-5 md:grid-cols-[repeat(auto-fit,minmax(0,1fr))] lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-6 w-full p-3 xsm:p-5 sm:p-6 rounded-lg bg-[#F3F3F3]">
              {ncolour.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={` rounded-[16px] border-[4px] border-white ${
                      index === colorIndex
                        ? "w-[64px] h-[64px] shadow-[_0px_2px_8px_rgba(_171,_181,_217,_0.14)] "
                        : "w-[60px] h-[60px]"
                    }`}
                    style={{ backgroundColor: item, cursor: "pointer" }}
                    onClick={(e) => {
                      setCustomization({ ...customization, fontColor: item });
                      setColorIndex(index);
                    }}
                  >
                    {index === colorIndex && (
                      <span className="w-full h-full text-xl flex justify-center items-center text-white p-0 m-0">
                        <HiCheck />
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      case "Designation":
        return (
          <div>
            {/* <div className="flex justify-between items-center mt-[36px] mb-[28px]">
              <button
                onClick={() => setActiveTab("Name")}
                className="flex flex-col justify-center items-center w-[36px] h-[36px] sm:w-[48px] sm:h-[48px] rounded-full bg-[#fafafa] "
              >
                <HiArrowLeft />
              </button>

              <p className="font-[600] text-[14px] sm:text-[20px] sm:leading-[28px]">
                Add your designation <span className="text-[#817C7C]">2/4</span>
              </p>

              <button
                onClick={() => setActiveTab("Logo")}
                className="flex flex-col justify-center items-center w-[36px] h-[36px] sm:w-[48px] sm:h-[48px] rounded-full bg-[#fafafa] "
              >
                <HiArrowRight />
              </button>
            </div> */}

            <input
              className="w-full h-[56px] pl-[24px] bg-[#fafafa] rounded-[10px] text-sm"
              placeholder="Enter your designation here..."
              type="text"
              id="designation"
              value={customization.designation}
              onChange={handleDesignationChange}
            />

            <button
              onClick={() => setDropDown2(!dropdown2)}
              className="relative flex w-full justify-between pr-[20px] mt-[32px] items-center p-[8px] bg-white rounded-[12px] border border-[#DFDBD8] "
              ref={dropdownRef2}
            >
              <div className="flex gap-[16px] ">
                <div
                  className="flex w-[64px] h-[64px] bg-[#f3f3f3] rounded-[12px] font-[600] text-[24px] leading-[22px] justify-center items-center"
                  style={{ fontFamily: "Playfair Display" }}
                >
                  T
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-cGrey font-semibold text-start text-[14px] leading-[22px]">
                    Select Font
                  </p>
                  <p
                    style={{ fontFamily: `${customization.designationStyle}` }}
                    className="font-bold text-[14px] text-start leading-[22px]"
                  >
                    {customization.designationStyle}
                  </p>
                </div>
              </div>
              {dropdown2 ? <HiChevronUp /> : <HiChevronDown />}
              {dropdown2 && (
                <div
                  className="w-full dropDown_popup"
                  style={{
                    top: "5rem",
                    width: "100%",
                    textAlign: "left",
                    left: "0",
                  }}
                >
                  <div
                    onClick={() => {
                      setCustomization({
                        ...customization,
                        designationStyle: "Avenir",
                      });
                      setDropDown2(false);
                    }}
                    className="dropDown_popup_item"
                  >
                    Avenir
                  </div>
                  <div
                    onClick={() => {
                      setCustomization({
                        ...customization,
                        designationStyle: "Bebas Neue",
                      });
                      setDropDown2(false);
                    }}
                    className="dropDown_popup_item"
                  >
                    Bebas Neue
                  </div>
                  <div
                    onClick={() => {
                      setCustomization({
                        ...customization,
                        designationStyle: "Raleway",
                      });
                      setDropDown2(false);
                    }}
                    className="dropDown_popup_item"
                  >
                    Raleway
                  </div>
                  <div
                    onClick={() => {
                      setCustomization({
                        ...customization,
                        designationStyle: "Open Sans",
                      });
                      setDropDown2(false);
                    }}
                    className="dropDown_popup_item"
                  >
                    Open Sans
                  </div>
                  <div
                    onClick={() => {
                      setCustomization({
                        ...customization,
                        designationStyle: "Montserrat",
                      });
                      setDropDown2(false);
                    }}
                    className="dropDown_popup_item"
                  >
                    Montserrat
                  </div>
                  <div
                    onClick={() => {
                      setCustomization({
                        ...customization,
                        designationStyle: "Playfair Display",
                      });
                      setDropDown2(false);
                    }}
                    className="dropDown_popup_item"
                  >
                    Playfair Display
                  </div>
                </div>
              )}
            </button>

            <p className="text-[#817C7C] mt-[32px] font-[600] text-[14px] leading-[24px]">
              Font Color
            </p>
            <div className=" grid grid-cols-3 xsm2:grid-cols-4 sm:grid-cols-5 md:grid-cols-[repeat(auto-fit,minmax(0,1fr))] lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-6 w-full p-3 xsm:p-5 sm:p-6 rounded-lg bg-[#F3F3F3]">
              {ncolour.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={` rounded-[16px] border-[4px] border-white ${
                      index === colorIndex
                        ? "w-[64px] h-[64px] shadow-[_0px_2px_8px_rgba(_171,_181,_217,_0.14)] "
                        : "w-[60px] h-[60px]"
                    }`}
                    style={{ backgroundColor: item, cursor: "pointer" }}
                    onClick={(e) => {
                      setCustomization({
                        ...customization,
                        designationColor: item,
                      });
                      setColorIndex(index);
                    }}
                  >
                    {index === colorIndex && (
                      <span className="w-full h-full text-xl flex justify-center items-center text-white p-0 m-0">
                        <HiCheck />
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          // <div>
          //   <label htmlFor="designation">Designation:</label>
          //   <input
          //     type="text"
          //     id="designation"
          //     value={customization.designation}
          //     onChange={handleDesignationChange}
          //   />
          //   <label htmlFor="designationStyle">Designation Style:</label>
          //   <input
          //     type="text"
          //     id="designationStyle"
          //     value={customization.designationStyle}
          //     onChange={handleDesignationStyleChange}
          //   />
          //   Selected Color: {customization.designationColor}
          //   <div
          //     className="w-10 h-10 rounded-lg relative"
          //     style={{
          //       backgroundColor: customization.designationColor,
          //       cursor: "pointer",
          //     }}
          //   ></div>
          //   <div className="color-pack w-full min-[400px]:h-[156px] rounded-lg">
          //     {ncolour.map((item, index) => {
          //       return (
          //         <div
          //           key={index}
          //           className="w-10 h-10 rounded-lg relative"
          //           style={{ backgroundColor: item, cursor: "pointer" }}
          //           onClick={(e) => {
          //             setCustomization({
          //               ...customization,
          //               designationColor: item,
          //             });
          //             setColorIndex(index);
          //           }}
          //         >
          //           {index === colorIndex && (
          //             <span className="absolute w-full h-full text-xl flex justify-center items-center text-white p-0 m-0">
          //               <HiCheckCircle />
          //             </span>
          //           )}
          //         </div>
          //       );
          //     })}
          //   </div>
          // </div>
        );
      case "Logo":
        return (
          <div className="flex flex-col justify-center">
            <PrimaryButton3
              onClick={() => {
                document.getElementById("LogoInput").click();
              }}
              text="Upload Logo/Image"
              icon={<HiOutlineUpload />}
              color="#1a1a1a"
            />

            <input
              id="LogoInput"
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={() => {
                uploadLogoToFirebase();
                handleImageUpload();
              }}
            ></input>
            <p className="font-[500] text-[#817C7C] mt-[20px] text-xs sm:text-sm text-center">
              Supports .PNG, .JPG, .JPEG & .svg file- up to 800KB
            </p>
            {logo && (
              <div className="w-[140px] h-[140px] bg-[#f3f3f3] mt-[28px] rounded-[8px]">
                <div className="relative flex flex-col justify-center items-center p-[10px]">
                  <div className="relative h-full w-full rounded-lg block">
                    <Image
                      src={logo}
                      alt={`Selected Image`}
                      className=" h-full w-full rounded-lg block object-contain"
                      fill
                    />
                  </div>
                  <div
                    onClick={removeImage}
                    style={{ cursor: "pointer" }}
                    className="absolute right-1.5 top-1.5 rounded-full bg-[#DFDBD8] text-[#817C7C] p-[4px]"
                  >
                    <HiOutlineX />
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      case "Color":
        return (
          <div>
            {/* <div className="flex justify-between items-center mt-[36px] mb-[28px]">
              <button
                onClick={() => setActiveTab("Logo")}
                className="flex flex-col justify-center items-center w-[36px] h-[36px] sm:w-[48px] sm:h-[48px] rounded-full bg-[#fafafa] "
              >
                <HiArrowLeft />
              </button>
              <p className="font-[600] text-[14px] sm:text-[20px] sm:leading-[28px]">
                Choose card color <span className="text-[#817C7C]">4/4</span>
              </p>
              <div className="flex flex-col justify-center items-center w-[36px] h-[36px] sm:w-[48px] sm:h-[48px] rounded-full bg-[#fafafa] text-[#a7a7a7]">
                <HiArrowRight />
              </div>
            </div> */}
            <p className="text-[#817C7C] mt-[32px] font-[600] text-[14px] leading-[24px]">
              Card Color
            </p>
            <div className=" flex flex-col justify-center w-full p-3 xsm:p-5 sm:p-6 rounded-lg bg-[#F3F3F3]">
              <div className="flex w-full gap-[16px] mb-[24px] items-center p-[8px] bg-white rounded-[12px] shadow-[_0px_2px_16px_rgba(_167,_167,_167,_0.14);] ">
                <div
                  className="w-[60px] h-[60px] rounded-lg "
                  style={{
                    backgroundColor: customization.cardColor,
                    cursor: "pointer",
                  }}
                ></div>
                <div className="items-center">
                  <p className="font-[500] text-[14px] leading-[22px]">
                    Selected Color
                  </p>
                  <p className="text-cGrey font-[500] text-[14px] leading-[22px]">
                    {customization.cardColor}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 xsm2:grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-5 xl:grid-cols-6 gap-[12px] sm:gap-[24px]">
                {pcolour.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className={` rounded-[16px] border-[4px] border-white ${
                        index === colorIndex
                          ? "w-[64px] h-[64px] shadow-[_0px_2px_8px_rgba(_171,_181,_217,_0.14)] "
                          : "w-[60px] h-[60px]"
                      }`}
                      style={{ backgroundColor: item, cursor: "pointer" }}
                      onClick={(e) => {
                        setCustomization({ ...customization, cardColor: item });
                        setColorIndex(index);
                      }}
                    >
                      {index === colorIndex && (
                        <span className="w-full h-full text-xl flex justify-center items-center text-white p-0 m-0">
                          <HiCheck />
                        </span>
                      )}
                    </div>
                  );
                })}
                <div
                  className={`w-[60px] h-[60px]  rounded-[16px] border-[4px] border-white `}
                  style={{ backgroundColor: "white", cursor: "pointer" }}
                  onClick={(e) => {
                    document.getElementById("cardColor").click();
                  }}
                >
                  <span className="w-full h-full text-xl flex justify-center items-center text-[#1a1a1a] p-0 m-0">
                    <HiPlus />
                  </span>
                </div>
              </div>

              <input
                type="color"
                className="w-10 h-10 rounded-lg relative"
                id="cardColor"
                value={customization.cardColor}
                onChange={handleCardColorChange}
                hidden
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const [fontSize, setFontSize] = useState("");

  useEffect(() => {
    if (customName.length > 15) {
      setFontSize("15px");
    } else if (customName.length > 10) {
      setFontSize("20px");
    } else {
      setFontSize("");
    }
  }, [customName]);

  const [logoStyle, setLogoStyle] = useState({});
  const [contentStyle, setContentStyle] = useState({});
  const [userNameStyle, setUserNameStyle] = useState({});
  const [designationStyle, setDesignationStyle] = useState({});

  useEffect(() => {
    // console.log(product);

    setLogoStyle({
      top: product?.logoPositionY,
      left: product?.logoPositionX,
    });

    setUserNameStyle({
      color: product?.color,
      fontFamily: product?.nameFontStyle,
      fontWeight: product?.nameFontWeight,
      fontSize: product?.nameFontSize,
      textAlign: product?.contentAlignment,
    });

    setDesignationStyle({
      color: product?.designationColor,
      fontFamily: product?.designationFontStyle,
      fontWeight: product?.designationFontWeight,
      fontSize: product?.designationFontSize,
      textAlign: product?.contentAlignment,
    });

    setContentStyle({
      top: product?.contentPositionY,
      left: product?.contentPositionX,
      alignItems: `${
        product?.contentAlignment == "center"
          ? "center"
          : product?.contentAlignment == "right"
          ? "flex-end"
          : "flex-start"
      }`,
      gap: product?.contentGap,
      width: product?.contentWidth,
    });
    getOffer();
  }, []);

  const [selectedOffer, setSelectedOffer] = useState("combo");

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

  return (
    <div className="absolute top-0 left-0 bg-white w-full z-[998] h-full">
      <div className="flex justify-between items-center px-[20px] md:px-[80px] py-[32px] text-[16px] leading-[24px] sm:text-[24px] sm:leading-[36px]">
        <div>
          <p className="font-[500] ">{product.title}</p>
          <p className="font-[700] ">₹ {product.price}</p>
        </div>
        <button
          className="flex flex-col justify-center items-center w-[48px] h-[48px] rounded-full bg-[#fafafa] "
          onClick={() => setIsCustomizing(false)}
        >
          <HiXMark />
        </button>
      </div>
      <div className="flex flex-col lg:flex-row px-3 xsm:px-5 md:px-8 2xl:px-20 gap-5 pb-[140px] bg-white">
        <div className="flex-1 flex flex-col justify-center items-center bg-[#f3f3f3] rounded-xl sm:rounded-[20px] px-8 pt-9 pb-5">
          {side === "front" ? (
            <CustomizedCardFront
              newFrontImage={product?.images[0]}
              horizontal={product?.horizontal}
              fontSize={fontSize}
              data={customization}
              product={product}
              color={color}
              logoData={imageData}
              ref={elementToCaptureRef}
              logoStyle={logoStyle}
              // imageUrl={frontImage[0]}
              contentStyle={contentStyle}
              userNameStyle={userNameStyle}
              designationStyle={designationStyle}
              // selectedCheckbox={selectedCheckbox}
            />
          ) : (
            <CustomizedCardBack
              data={customization}
              product={product}
              color={color}
            />
          )}

          <div
            className={`flex flex-col justify-center items-center gap-[4px] ${
              product.horizontal
                ? "w-[236px] lg:mt-[114px]"
                : "w-[140px] lg:mt-[70px]"
            } h-[110px] p-[8px] bg-white mt-[52px] rounded-[8px] text-[10px] leading-[22px]`}
          >
            <div
              className={`flex flex-row justify-around items-center ${
                product.horizontal ? "gap-[4px]" : "gap-[18px]"
              }`}
            >
              <div
                onClick={() => setSide("front")}
                style={{
                  boxShadow: `${
                    side === "front"
                      ? "0px 5px 10px #00000021"
                      : "0px 5px 6px #00000021"
                  }`,
                }}
                className={`relative h-[68px] ${
                  product.horizontal ? "w-[106px]" : "w-[44px]"
                } font-[600] rounded-[6px] hover:cursor-pointer overflow-hidden border-[#c3c3c3] ${
                  side === "front"
                    ? "scale-[95%] border-[2px]"
                    : "scale-[80%] border-[1px]"
                }`}
              >
                {/* {console.log(product)} */}
                <Image
                  className="object-contain"
                  src={product?.images[2]}
                  alt="front"
                  fill
                />
              </div>

              <div
                onClick={() => setSide("back")}
                style={{
                  boxShadow: `${
                    side === "back"
                      ? "0px 5px 10px #00000021"
                      : "0px 5px 6px #00000021"
                  }`,
                }}
                className={`relative h-[68px] ${
                  product.horizontal ? "w-[106px]" : "w-[44px]"
                } font-[600] rounded-[6px] hover:cursor-pointer overflow-hidden border-[#c3c3c3] ${
                  side === "back"
                    ? "scale-[95%] border-[2px]"
                    : "scale-[80%] border-[1px]"
                }`}
              >
                <Image
                  className="object-contain"
                  src={product?.[color][1]}
                  alt="back"
                  fill
                />
              </div>
            </div>

            <div
              className={`flex flex-row justify-around items-center ${
                product.horizontal ? "gap-[4px]" : "gap-[18px]"
              }`}
            >
              <h1
                className={`text-center hover:cursor-pointer ${
                  product.horizontal ? "w-[106px]" : "w-[44px]"
                } text-[12px] ${
                  side === "front" ? "font-[800]" : "text-[#817C7C]"
                }`}
                onClick={() => setSide("front")}
              >
                Front
              </h1>

              <h1
                className={`text-center hover:cursor-pointer ${
                  product.horizontal ? "w-[106px]" : "w-[44px]"
                } text-[12px] ${
                  side === "back" ? "font-[800]" : "text-[#817C7C]"
                }`}
                onClick={() => setSide("back")}
              >
                Back
              </h1>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-white border border-[#f3f3f3] rounded-xl sm:rounded-[20px] px-2 xsm:p-4 sm:py-5 sm:px-8 flex flex-col gap-8 overflow-scroll">
          <div className="font-[600] text-[20px]">
            Add your details for Qviq Smart Card
          </div>

          {product?.hasContent && (
            <div>
              
              <div>Your Full Name</div>
              <input
                className="w-full h-[56px] pl-[24px] border-[1px] border-[#DFDBD8] rounded-[8px] text-[14px] font-[400] italic"
                placeholder="Enter your name here..."
                maxLength={25}
                type="text"
                id="name"
                value={customization.name}
                 onFocus={() => {
                      if (customization.name === "Your Name") {
                      setCustomization((prev) => ({ ...prev, name: "" }));
                       }
                       }}
                onChange={(event) => {
                   const typedValue = event.target.value;
                   setCustomization((prev) => ({ ...prev, name: typedValue }));
                    setCustomName(typedValue);
                }}
              />
            </div>
          )}
          {product?.hasContent && (
            <div>
              <div>Your Designation</div>
              <input
                className="w-full h-[56px] pl-[24px] border-[1px] border-[#DFDBD8] rounded-[8px] text-[14px] font-[400] italic"
                placeholder="Enter your designation here..."
                maxLength={25}
                type="text"
                id="designation"
                value={customization.designation}
                onFocus={() => {
                if (customization.designation === "Your Designation") {
                 setCustomization((prev) => ({ ...prev, designation: "" }));
                 }
                }}
                onChange={(event) => {
                 const typedValue = event.target.value;
                  setCustomization((prev) => ({ ...prev, designation: typedValue }));
                  setCustomDesignation(typedValue);
                }}
              />
            </div>
          )}

          {product?.hasLogo && (
            <div className="">
              <div className="">Upload Logo</div>
              {loading ? (
                <div className="flex flex-col justify-center items-center gap-5 relative border-dotted border-2 p-6 rounded-8px w-full h-[106px]">
                  <Image
                    src={require("../../../components/Image/Tapop logo black.png")}
                    alt="Image"
                    className="w-[40px] xsm:w-[20px] sm:w-[30px] h-auto"
                  />
                  <p
                    className="w-[80%] text-center text-sm xsm:text-base"
                    style={{ wordSpacing: ".25vw" }}
                  ></p>
                  <div className="absolute w-full h-full top-0 backdrop-blur-[1px] flex justify-center items-center">
                    <LoadingAnimation />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col justify-center">
                  {/* <PrimaryButton3
                  onClick={() => document.getElementById("LogoInput").click()}
                  text="Upload Logo/Image"
                  icon={<HiOutlineUpload />}
                  color="#1a1a1a"
                /> */}
                  {/* onClick={() => document.getElementById("LogoInput").click() */}
                  {/* onclick funciton for open the danallog box */}

                  <div className="border-dotted border-2 p-6 rounded-8px w-full h-[106px] flex flex-col justify-center items-center">
                    <HiOutlinePhoto />
                    <div className="flex ">
                      <div className="pr-[5px]">Drag & Drop or </div>
                      <button
                        onClick={() => {
                          document.getElementById("LogoInput").click();
                        }}
                        className="text-red-600 font-semibold"
                      >
                        Browser
                      </button>
                    </div>
                  </div>
                  <input
                    id="LogoInput"
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={(e) => {
                      uploadLogoToFirebase(e);
                      handleImageUpload(e);
                    }}
                  ></input>
                  <p className="font-[500] text-[#817C7C] mt-[20px] text-xs sm:text-sm text-start">
                    Supports .PNG, .JPG, .JPEG & .svg file- up to 800KB
                  </p>
                  {logo && (
                    <div className="relative w-full h-[104px] bg-[#f3f3f3]  mt-[28px] rounded-[8px] flex shadow-md">
                      <div className=" flex  justify-center items-start p-[10px] ">
                        <Image
                          src={logo}
                          alt={`Selected Image`}
                          className=" w-[96px] h-[72px] rounded-lg block"
                          width={96}
                          height={72}
                        />
                        <div className="p-4 flex flex-col gap-1">
                          <div className="text-[16px] font-[600]">
                            mylogo.png
                          </div>
                          <div className="text-[16px] font-[400]">50KB</div>
                        </div>
                        <div
                          onClick={removeImage}
                          style={{ cursor: "pointer" }}
                          className="absolute right-1.5 top-1.5 rounded-full bg-[#DFDBD8] text-[#817C7C] p-[4px]"
                        >
                          <HiOutlineX />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
          <div className="pb-20 md:w-[550px] h-[94px] md:py-8 px-2">
            <li className="text-[14px] font[500] ">
              To achieve the best print quality,ensure that your logo image has
              a high resolution.
            </li>
            <li className="text-[14px] font[500]">
              For improved contrast and readability, please upload an image in
              either white or black, depending on the card's color.
            </li>
          </div>
        </div>
      </div>

      <div
        className="fixed bottom-0 left-0 py-[20px] px-[20px] md:px-[80px] flex flex-col sm:flex-row sm:items-center justify-between w-full"
        style={{
          background: "rgba(255, 255, 255, 0.74)",
          boxShadow: "0px -8px 40px rgba(151, 151, 151, 0.1)",
          backdropFilter: "blur(20px)",
        }}
      >
        <div className="flex sm:items-center gap-[22px] font-[700] text-[14px] leading-[20px] sm:text-[24px] sm:leading-[32px]">
          {product?.horizontal && (
            <div
              className={`hidden relative md:flex bg-[#f3f3f3]  flex-col justify-center items-center rounded-[8px] w-[80px] h-[80px] px-2`}
            >
              <div className="relative w-full h-full">
                <Image
                  src={product?.[color][0]}
                  className="object-contain"
                  fill
                />
              </div>
            </div>
          )}
          {!product?.horizontal && (
            <div
              className={`hidden relative md:flex bg-[#f3f3f3]  flex-col justify-center items-center rounded-[8px] w-[80px] h-[80px] px-2`}
            >
              <div className="relative w-full h-[72px]">
                <Image
                  className="object-contain"
                  src={product?.[color][0]}
                  fill
                />
              </div>
            </div>
          )}

          <div></div>
          <p>{product?.title}</p>
          <div className="font-light">|</div>
          <p>₹ {product?.price}</p>
        </div>
        <div className="w-full sm:w-fit mt-[14px]">
          <PrimaryButton3
            width={"100%"}
            icon={<HiOutlineShoppingCart />}
            text="Add to cart"
            onClick={async () => {
              await convertToPng();
              setModal(true);
            }}
          />
        </div>
      </div>
      {/* <Modal /> */}
      {modal && (
        <NewModal text="Confirmation" onModal={modal} onClick={setModal}>
          {cardUrl ? (
            <div className="flex flex-row justify-start items-center py-4 gap-4">
              <LoadingAnimation />
              <h1 className="text-[14px] sm:text-[18px] font-semibold">
                Please wait while we optimizing your design ✨
              </h1>
            </div>
          ) : (
            <>
              <div className="mx-2 mt-4 mb-2 overflow-auto flex flex-col gap-[20px] sm:gap-[30px]">
                <h1 className="text-[14px] sm:text-[18px] font-semibold">
                  Are you sure want to continue with this data
                </h1>

                <div
                  className={`flex flex-col sm:flex-row ${
                    imageUrl && "justify-around"
                  } gap-[20px]`}
                >
                  <div className="flex flex-col gap-[20px]">
                    <div>
                      <li className="text-[14px] font-semibold">
                        Your Full Name
                      </li>
                      <p className="text-[14px] pl-[20px]">
                        {customName ? customName : "Your Name"}
                      </p>
                    </div>

                    <div>
                      <li className="text-[14px] font-semibold">
                        Your Designation
                      </li>
                      <p className="text-[14px] pl-[20px]">
                        {customDesignation
                          ? customDesignation
                          : "Your Designation"}
                      </p>
                    </div>
                  </div>

                  {imageUrl && (
                    <div>
                      <li className="text-[14px] font-semibold">Your Logo</li>
                      <Image
                        className="pl-[20px]"
                        width={148}
                        height={148}
                        src={imageUrl}
                        alt="Uploaded"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex py-6 gap-4">
                <button
                  className="rounded-full border-2 border-black hover:border-gray-500"
                  onClick={() => setModal(false)}
                  style={{
                    background: "#fafafa",
                    width: "60%",
                    color: "black",
                    transform: "scale(1)",
                  }}
                >
                  <div className="flex justify-center items-center gap-2 ">
                    <div>Cancel</div>
                    <HiOutlineX />
                  </div>
                </button>

                <button
                  className="rounded-full border-2 border-black py-2  hover:border-gray-500"
                  onClick={() => {
                    // await convertToPng();
                    // addToCart(product, color);
                    setModal(false);
                    appliedOffer.code
                      ? setOfferModal(true)
                      : addToCart(product, color);
                  }}
                  style={{
                    background: "#fafafa",
                    width: "60%",
                    color: "black",
                    transform: "scale(1)",
                  }}
                >
                  <div className="flex justify-center items-center gap-2 ">
                    <div>Continue</div>
                    <HiArrowRight />
                  </div>
                </button>
              </div>
            </>
          )}
        </NewModal>
      )}

      {offerModal && (
        <NewModal
          text="Special Offer"
          onModal={offerModal}
          onClick={setOfferModal}
        >
          <div className="w-full max-h-[610px] h-[80vh] py-[30px] flex flex-col sm:gap-[40px] gap-[20px] overflow-y-scroll">
            <OfferCard
              plan={
                appliedOffer.plans?.[0]?.includes("starter")
                  ? `Starter plan (${
                      appliedOffer.plans?.[0]?.includes("monthly")
                        ? "Monthly"
                        : appliedOffer.plans?.[0]?.includes("quarterly")
                        ? "Quarterly"
                        : "Annually"
                    })`
                  : `Pro plan (${
                      appliedOffer.plans?.[0]?.includes("monthly")
                        ? "Monthly"
                        : appliedOffer.plans?.[0]?.includes("quarterly")
                        ? "Quarterly"
                        : "Annually"
                    })`
              }
            />

            <div className="flex sm:flex-row flex-col justify-center items-center gap-[24px] w-full sm:h-[222px] h-fit">
              <div
                className="w-full h-full p-[20px] rounded-[16px] bg-[#FAFAFA] flex flex-col gap-[16px]"
                style={{
                  border: `${
                    selectedOffer === "not combo" ? "2px solid black" : "none"
                  }`,
                }}
                onClick={() => setSelectedOffer("not combo")}
              >
                <div className="w-full flex flex-row items-center gap-[12px]">
                  {selectedOffer === "not combo" ? (
                    <MdOutlineRadioButtonChecked />
                  ) : (
                    <GoCircle />
                  )}
                  <p className="text-[16px] font-[600] text-[#0A0003]">
                    Qviq-smart card
                  </p>
                </div>
                <div className="w-full flex flex-row items-center gap-[12px]">
                  <GoCircle className="text-[transparent]" />
                  <p className="text-[20px] font-[700]">₹ {product.price}</p>
                </div>
              </div>

              <div
                className="relative w-full h-full p-[20px] rounded-[16px] bg-[#FAFAFA] flex flex-col gap-[2px]"
                style={{
                  border: `${
                    selectedOffer === "combo" ? "2px solid black" : "none"
                  }`,
                }}
                onClick={() => setSelectedOffer("combo")}
              >
                <div className="relative h-[29px] w-[119px] ml-[-20px] mb-[14px]">
                  <p className="z-[0] pl-[16px] bg-[#E40849] w-full h-full text-white text-[14px] font-[600] leading-[28px]">
                    Best value
                  </p>
                  <div
                    className="absolute z-[2] h-[29px] w-[29px] top-[50%] right-0 bg-white"
                    style={{ transform: "translate(50%, -50%) rotate(45deg)" }}
                  ></div>
                </div>

                <div className="w-full flex flex-row items-center gap-[12px]">
                  {selectedOffer === "combo" ? (
                    <MdOutlineRadioButtonChecked />
                  ) : (
                    <GoCircle />
                  )}
                  <p className="text-[16px] font-[600] text-[#0A0003]">
                    {appliedOffer.plans?.[0]?.includes("starter")
                      ? `Starter plan (${
                          appliedOffer.plans?.[0]?.includes("monthly")
                            ? "Monthly"
                            : appliedOffer.plans?.[0]?.includes("quarterly")
                            ? "Quarterly"
                            : "Annually"
                        })`
                      : `Pro plan (${
                          appliedOffer.plans?.[0]?.includes("monthly")
                            ? "Monthly"
                            : appliedOffer.plans?.[0]?.includes("quarterly")
                            ? "Quarterly"
                            : "Annually"
                        })`}
                  </p>
                </div>
                <div className="w-full flex flex-row items-center gap-[12px]">
                  <GoCircle className="text-[transparent]" />
                  <p className="text-[16px] font-[600] text-[#0A0003]">+</p>
                </div>
                <div className="w-full flex flex-row items-center gap-[12px]">
                  <GoCircle className="text-[transparent]" />
                  <p className="text-[16px] font-[600] text-[#0A0003]">
                    Free Qviq-smart card
                  </p>
                </div>
                <div className="w-full flex flex-row items-center gap-[12px]">
                  <GoCircle className="text-[transparent]" />
                  <p className="text-[20px] font-[700]">
                    ₹ {appliedOffer.price}
                  </p>
                </div>
                <div className="w-full flex flex-row items-center gap-[12px]">
                  <GoCircle className="text-[transparent]" />
                  <button
                    className="text-linear-gradient text-[14px] font-[500] flex flex-row items-center gap-[6px]"
                    onClick={() => {
                      setPlanModal(true);
                      setOfferModal(false);
                    }}
                  >
                    View{" "}
                    {appliedOffer.plans?.[0]?.includes("starter")
                      ? `starter`
                      : `pro`}{" "}
                    plan <MdArrowForwardIos className="text-[#E40849]" />
                  </button>
                </div>
              </div>
            </div>

            <div>
              <PrimaryButton2
                text="Continue"
                width="100%"
                onClick={() => addToCart(product, color, selectedOffer)}
              />
            </div>
          </div>
        </NewModal>
      )}
      {appliedOffer.plans?.[0]?.includes("starter") && planModal && (
        <NewModal
          text="Starter plan details"
          onModal={planModal}
          onClick={setPlanModal}
          extraOnClick={setOfferModal}
        >
          <div className="w-full pt-[20px] max-h-[610px] h-[80vh] pb-[32px] flex flex-col overflow-y-scroll">
            <div className="flex flex-col relative justify-center items-center">
              {/* <Image className="rounded-[16px] h-[132px] w-[576px]" src={Image2} alt="Image" /> */}

              <p className="text-white text-[20px] absolute top-[75px]">
                {appliedOffer.plans?.[0]?.includes("starter") &&
                  `Starter plan (${
                    appliedOffer.plans?.[0]?.includes("monthly")
                      ? `Monthly) ₹${starterMonthly}`
                      : appliedOffer.plans?.[0]?.includes("quarterly")
                      ? `Quarterly) ₹${starterQuarterly}`
                      : `Annually) ₹${starterAnnual}`
                  }`}
              </p>
              <Image
                className="rounded-[16px] h-[132px] w-full object-cover"
                src={Image2}
                alt="Image"
              />
              <div className="absolute flex flex-col justify-center items-center mb-[35px]">
                <Image src={Icon2} alt="Image" />
              </div>
              {appliedOffer.plans?.[0]?.includes("yearly") && (
                <div className="absolute top-[115px]">
                  <PrimaryButton2
                    text="50% OFF"
                    className="!text-[12px]  !p-0"
                    width="88px"
                    height="32px"
                  />
                </div>
              )}
              {/* {console.log(appliedOffer.plans?.[0])} */}

              {appliedOffer.plans?.[0]?.includes("quarterly") && (
                <div className="absolute top-[115px]">
                  <PrimaryButton2
                    text="25% OFF"
                    className="!text-[12px]  !p-0"
                    width="88px"
                    height="32px"
                  />
                </div>
              )}
            </div>

            <div className="flex flex-col pl-[15px] mt-[32px] justify-start items-start w-full sm:h-[222px] h-fit">
              <p>Get our starter plan and unlock the following benefits:</p>
              <p className="font-semibold">Customise & analyse your profile</p>
            </div>

            <div>
              <div
                className={`
                    flex flex-col xsm1:gap-[16px] gap-[10px] pl-[15px] mt-[16px]`}
              >
                <div className="content_text flex gap-[12px]">
                  <span className="flex items-center">
                    <HiCheck />
                  </span>
                  <p>One profile with access to some premium features</p>
                </div>

                <div className="content_text flex gap-[12px]">
                  <span className="flex items-center">
                    <HiCheck />
                  </span>
                  <p>More template choices with customization options</p>
                </div>

                <div className="content_text flex gap-[12px]">
                  <span className="flex items-center">
                    <HiCheck />
                  </span>
                  <p>Expanded Qviq Link Store options with customization</p>
                </div>

                <div className="content_text flex gap-[12px]">
                  <span className="flex items-center">
                    <HiCheck />
                  </span>
                  <p>Full access to media apps</p>
                </div>

                <div className="content_text flex gap-[12px]">
                  <span className="flex items-center">
                    <HiCheck />
                  </span>
                  <p>Advanced content customization options</p>
                </div>

                <div className="content_text flex gap-[12px]">
                  <span className="flex items-center">
                    <HiCheck />
                  </span>
                  <p>List up to 10 products or services with CTA buttons</p>
                </div>

                <div className="content_text flex gap-[12px]">
                  <span className="flex items-center">
                    <HiCheck />
                  </span>
                  <p>Appointment scheduling available</p>
                </div>
                <div className="content_text flex gap-[12px]">
                  <span className="flex items-center">
                    <HiCheck />
                  </span>
                  <p>Can accept and display up to 3 verified reviews</p>
                </div>
                <div className="content_text flex gap-[12px]">
                  <span className="flex items-center">
                    <HiCheck />
                  </span>
                  <p>Change QR code color</p>
                </div>
                <div className="content_text flex gap-[12px]">
                  <span className="flex items-center">
                    <HiCheck />
                  </span>
                  <p>Custom domain & SEO not allowed</p>
                </div>
                <div className="content_text flex gap-[12px]">
                  <span className="flex items-center">
                    <HiCheck />
                  </span>
                  <p>Remove Qviq Branding from your Qviqsite</p>
                </div>
              </div>
              <div className="flex gap-[12px] mt-[40px]">
                <SecondaryButton
                  text="Go Back"
                  width="100%"
                  onClick={() => {
                    setOfferModal(true);
                    setPlanModal(false);
                  }}
                />
                <PrimaryButton2
                  text="Continue with Starter plan"
                  width="100%"
                  onClick={() => addToCart(product, color)}
                />
              </div>
            </div>
          </div>
        </NewModal>
      )}
      {appliedOffer.plans?.[0]?.includes("pro") && planModal && (
        <NewModal
          text="Starter plan details"
          onModal={planModal}
          onClick={setPlanModal}
          extraOnClick={setOfferModal}
        >
          <div className="w-full pt-[20px] max-h-[610px] h-[80vh] pb-[32px] flex flex-col overflow-y-scroll">
            <div className="flex flex-col relative justify-center items-center">
              {/* <Image className="rounded-[16px] h-[132px] w-[576px]" src={Image2} alt="Image" /> */}

              <p className="text-white text-[20px] absolute top-[75px]">
                {" "}
                {appliedOffer.plans?.[0]?.includes &&
                  `Pro plan (${
                    appliedOffer.plans?.[0]?.includes("monthly")
                      ? `Monthly) ₹${proMonthly}`
                      : appliedOffer.plans?.[0]?.includes("quarterly")
                      ? `Quarterly) ₹${proQuarterly}`
                      : `Annually) ₹${proAnnual}`
                  }`}{" "}
              </p>
              <Image
                className="rounded-[16px] h-[132px] w-full object-cover"
                src={Image3}
                alt="Image"
              />
              <div className="absolute flex flex-col justify-center items-center mb-[35px]">
                <Image src={Icon3} alt="Image" />
              </div>
              {appliedOffer.plans?.[0]?.includes("yearly") && (
                <div className="absolute top-[115px]">
                  <PrimaryButton2
                    text="50% OFF"
                    className="!text-[12px]  !p-0"
                    width="88px"
                    height="32px"
                  />
                </div>
              )}
              {appliedOffer.plans?.[0]?.includes("quarterly") && (
                <div className="absolute top-[115px]">
                  <PrimaryButton2
                    text="25% OFF"
                    className="!text-[12px]  !p-0"
                    width="88px"
                    height="32px"
                  />
                </div>
              )}
            </div>

            <div className="flex flex-col pl-[15px] mt-[32px] justify-start items-start w-full sm:h-[222px] h-fit">
              <p>Get our starter plan and unlock the following benefits:</p>
              <p className="font-semibold">Customise & analyse your profile</p>
            </div>

            <div>
              <div
                className={`
                     flex flex-col xsm1:gap-[16px] gap-[10px] pl-[15px] mt-[16px]`}
              >
                <div className="content_text flex gap-[12px]">
                  <span className="flex items-center">
                    <HiCheck />
                  </span>
                  <p>Create Up to 3 Qviqsites </p>
                </div>

                <div className="content_text flex gap-[12px]">
                  <span className="flex items-center">
                    <HiCheck />
                  </span>
                  <p>Full access to all templates and customization features</p>
                </div>

                <div className="content_text flex gap-[12px]">
                  <span className="flex items-center">
                    <HiCheck />
                  </span>
                  <p>
                    Complete Qviq Link Store access with extensive customization
                  </p>
                </div>

                <div className="content_text flex gap-[12px]">
                  <span className="flex items-center">
                    <HiCheck />
                  </span>
                  <p>Full functionality of all media apps</p>
                </div>

                <div className="content_text flex gap-[12px]">
                  <span className="flex items-center">
                    <HiCheck />
                  </span>
                  <p>Unlimited content customization options</p>
                </div>

                <div className="content_text flex gap-[12px]">
                  <span className="flex items-center">
                    <HiCheck />
                  </span>
                  <p>
                    Advanced analytics insights, detailed performance tracking
                  </p>
                </div>

                <div className="content_text flex gap-[12px]">
                  <span className="flex items-center">
                    <HiCheck />
                  </span>
                  <p>Unlimited products or services with CTA buttons</p>
                </div>
                <div className="content_text flex gap-[12px]">
                  <span className="flex items-center">
                    <HiCheck />
                  </span>
                  <p>Full access to appointment scheduling feature</p>
                </div>
                <div className="content_text flex gap-[12px]">
                  <span className="flex items-center">
                    <HiCheck />
                  </span>
                  <p>Can accept and display up to 10 verified reviews</p>
                </div>
                <div className="content_text flex gap-[12px]">
                  <span className="flex items-center">
                    <HiCheck />
                  </span>
                  <p>Change QR code color and add a logo</p>
                </div>
                <div className="content_text flex gap-[12px]">
                  <span className="flex items-center">
                    <HiCheck />
                  </span>
                  <p>Custom domain & SEO allowed</p>
                </div>
                <div className="content_text flex gap-[12px]">
                  <span className="flex items-center">
                    <HiCheck />
                  </span>
                  <p>Remove Qviq branding from your Qviqsite</p>
                </div>
              </div>
              <div className="flex gap-[12px] mt-[40px]">
                <SecondaryButton
                  text="Go Back"
                  width="100%"
                  onClick={() => {
                    setOfferModal(true);
                    setPlanModal(false);
                  }}
                />
                <PrimaryButton2
                  text="Continue Pro Plan"
                  width="100%"
                  onClick={() => addToCart(product, color)}
                />
              </div>
            </div>
          </div>
        </NewModal>
      )}
    </div>
  );
};

export default CustomizeProduct;
