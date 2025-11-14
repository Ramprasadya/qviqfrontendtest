"use client";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../Contexts/context";
import { useRouter } from "next/navigation";
import Image from "next/image";
import "./UiStyles.css";
import Navbar from "../Login/Navbar";
import { LuCopy } from "react-icons/lu";
import SecondaryButton from "./SecondaryButton";
import PrimaryButton from "./PrimaryButton";
import PrimaryButton2 from "./PrimaryButton2";
import { serverUrl } from "../../config";
import "./SignupThankyou.css";
import ShareModal from "../ProfileTemplates/template1/modals/ShareModal";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { MdOutlineEdit } from "react-icons/md";
import LoadingAnimation from "./Loading/LoadingAnimation";
import { IoCloseCircle } from "react-icons/io5";
import "./iconTextStyle.css";
import InputField from "./InputField";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";
import { storage } from "../Login/firebaseconfig";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import NewCropModal from "./NewModal/NewCropModal";
import SelectImgModal from "../ProfileInfo/SelectImgModal";
import NewModal from "./NewModal/NewModal";
import TertiaryButton from "./TertiaryButton";
import NewToast from "./NewToast";
import { PiImage } from "react-icons/pi";
import { getCookie, createQueryString, deleteCookie, SafeLocalStorage } from "../utils";
import Iphone from "./Iphone";
import PrimaryButton3 from "./PrimaryButton3";

export default function SignupThankyou({
  searchParams,
  // data,
  userName,
  templateData,
  monthData,
  connections,
  templateId,
  // toggleData,
  // profileData,
}) {
  console.log(userName);
  console.log(templateData);
  console.log(templateId);
  
  
  
  
  
  const templatesArray = [
    {
      type: "template1",
      thumbnail: require("../ProfileTemplates/images/thumbnail/temp (1).png")
        .default.src,
    },
    {
      type: "template2",
      thumbnail: require("../ProfileTemplates/images/thumbnail/temp (17).png")
        .default.src,
    },
    {
      type: "template3",
      thumbnail: require("../ProfileTemplates/images/thumbnail/temp (15).png")
        .default.src,
    },
    {
      type: "template4",
      thumbnail: require("../ProfileTemplates/images/thumbnail/temp (6).png")
        .default.src,
    },
    {
      type: "template5",
      thumbnail: require("../ProfileTemplates/images/thumbnail/temp (16).png")
        .default.src,
    },
    {
      type: "template6",
      thumbnail: require("../ProfileTemplates/images/thumbnail/temp (3).png")
        .default.src,
    },
    {
      type: "template7",
      thumbnail: require("../ProfileTemplates/images/thumbnail/temp (8).png")
        .default.src,
    },
    {
      type: "template8",
      thumbnail: require("../ProfileTemplates/images/thumbnail/temp (19).png")
        .default.src,
    },
    {
      type: "template9",
      thumbnail: require("../ProfileTemplates/images/thumbnail/temp (4).png")
        .default.src,
    },

    {
      type: "template10",
      thumbnail: require("../ProfileTemplates/images/thumbnail/temp (11).png")
        .default.src,
    },
    {
      type: "template11",
      thumbnail: require("../ProfileTemplates/images/thumbnail/temp (18).png")
        .default.src,
    },
    {
      type: "template12",
      thumbnail: require("../ProfileTemplates/images/thumbnail/temp (7).png")
        .default.src,
    },
    {
      type: "template13",
      thumbnail: require("../ProfileTemplates/images/thumbnail/temp (2).png")
        .default.src,
    },
    {
      type: "template14",
      thumbnail: require("../ProfileTemplates/images/thumbnail/temp (29).png")
        .default.src,
    },
    {
      type: "template15",
      thumbnail: require("../ProfileTemplates/images/thumbnail/temp (9).png")
        .default.src,
    },
    {
      type: "template16",
      thumbnail: require("../ProfileTemplates/images/thumbnail/temp (20).png")
        .default.src,
    },
    {
      type: "template17",
      thumbnail: require("../ProfileTemplates/images/thumbnail/temp (22).png")
        .default.src,
    },
    {
      type: "template18",
      thumbnail: require("../ProfileTemplates/images/thumbnail/temp (12).png")
        .default.src,
    },
    {
      type: "template19",
      thumbnail: require("../ProfileTemplates/images/thumbnail/temp (5).png")
        .default.src,
    },
    {
      type: "template20",
      thumbnail: require("../ProfileTemplates/images/thumbnail/temp (24).png")
        .default.src,
    },
    {
      type: "template21",
      thumbnail: require("../ProfileTemplates/images/thumbnail/temp (13).png")
        .default.src,
    },
    {
      type: "template22",
      thumbnail: require("../ProfileTemplates/images/thumbnail/temp (10).png")
        .default.src,
    },
    {
      type: "template23",
      thumbnail: require("../ProfileTemplates/images/thumbnail/temp (26).png")
        .default.src,
    },
    {
      type: "template24",
      thumbnail: require("../ProfileTemplates/images/thumbnail/temp (14).png")
        .default.src,
    },

    {
      type: "template25",
      thumbnail: require("../ProfileTemplates/images/thumbnail/temp (21).png")
        .default.src,
    },
    {
      type: "template26",
      thumbnail: require("../ProfileTemplates/images/thumbnail/temp (23).png")
        .default.src,
    },

    {
      type: "template27",
      thumbnail: require("../ProfileTemplates/images/thumbnail/temp (25).png")
        .default.src,
    },
    {
      type: "template28",
      thumbnail: require("../ProfileTemplates/images/thumbnail/temp (27).png")
        .default.src,
    },
    {
      type: "template29",
      thumbnail: require("../ProfileTemplates/images/thumbnail/temp (28).png")
        .default.src,
    },
  ];

  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const fromPage =
    searchParams.fromPage !== undefined ? searchParams.fromPage : "admin";

  const navigate = useRouter();
  const {
    // username,
    updateCheckVariable,
    // dummyState,
    // setDummyState,
    userType,
    userFirstName,
    userLastName,
    userEmail,
  } = useContext(UserContext);

  const [username, setUsername] = useState("");

  useEffect(() => {
    getCookie("username") && setUsername(getCookie("username"));
  }, [updateCheckVariable]);

  function handleOnClick() {
    if (fromPage === "cart") {
      navigate.push("/address");
    } else {
      navigate.push(`/selectprofile/${username}`);
    }
  }

  // Value from localstorage 
  const [User, setUser] = useState({});
  const [UserPic, setUserPic] = useState("");

  useEffect(() => {
    const storedUser = SafeLocalStorage.getItem("user");
    const profileUrl =  SafeLocalStorage.getItem("profileUrl")
    setUser(storedUser);
    setUserPic(profileUrl)
  }, [updateCheckVariable]);
  
  console.log(User); 
  
  
    

  // -------------------------------------------------
  const [isSkipped, setIsSkipped] = useState(false);
  const [data, setData] = useState({});
  // const [toggleStates, setToggleStates] = useState(toggleData);
  const profile =   userName;
  const [type, setType] = useState(templateData.Type);
  console.log(type);
  const [activeTemplateName, setActiveTemplateName] = useState(
    templateData.ActiveTemplateName
  );
  const [isComponentRendered, setComponentRendered] = useState(
    templateData.ComponentRendered
  );
  const LineChartRef = useRef(null);
  const [dummyState, setDummyState] = useState(0);
  const [viewsData, setViewsData] = useState(monthData);
  const [connectionData, setConnectionData] = useState(connections);

  // Preview Data states
  const [showPreview, setShowPreview] = useState(false);

  const [name, setName] = useState(data.Name);
  const [firstName, setFirstName] = useState(data.FirstName);
  const [lastName, setLastName] = useState(data.LastName);
  const [mobileNumber, setMobileNumber] = useState(data.MobileNumber);
  const [newMobileNumber, setNewMobileNumber] = useState(data.NewMobileNumber);
  const [description, setDescription] = useState(data.Description);
  const [companyName, setCompanyName] = useState(data.CompanyName);
  const [pimage, setPImage] = useState(data.PImage);
  const [images, setImages] = useState(data.Images);
  const [videos, setVideos] = useState(data.Videos);
  const [apps, setApps] = useState(data.Apps);
  const [customLinks, setCustomLinks] = useState(data.CustomLinks);
  const [productSwitch, setProductSwitch] = useState(data.ProductSwitch);
  const [serviceSwitch, setServiceSwitch] = useState(data.ServiceSwitch);
  const [logoSwitch, setlogoSwitch] = useState(data.LogoSwitch);
  const [reviewSwitch, setReviewSwitch] = useState(data.ReviewSwitch);
  const [reviewButtonSwitch, setReviewButtonSwitch] = useState(
    data.ReviewButtonSwitch
  );
  const [businessHoursSwitch, setBusinessHoursSwitch] = useState(
    data.BusinessHoursSwitch
  );
  const [productLabel, setProductLabel] = useState(data.ProductLabel);
  const [serviceLabel, setServiceLabel] = useState(data.ServiceLabel);
  const [reviewLabel, setReviewLabel] = useState(data.ReviewLabel);
  const [businessHoursLabel, setBusinessHoursLabel] = useState(
    data.BusinessHoursLabel
  );
  const [products, setProducts] = useState(data.Products);
  const [services, setServices] = useState(data.Services);
  const [reviews, setReviews] = useState(data.Reviews);
  const [businessHours, setBusinessHours] = useState(data.BusinessHours);
  const [jobTitle, setJobTitle] = useState(data.JobTitle);
  const [pdfs, setPdfs] = useState(data.Pdfs);
  const [dummyData, setDummyData] = useState(data.DummyData);
  const [email1, setEmail1] = useState(data.Email1);

  const [backgroundColor, setBackgroundColor] = useState(data.BackgroundColor);
  const [buttonStyle, setButtonStyle] = useState(data.ButtonStyle);
  const [buttonColor, setButtonColor] = useState(data.ButtonColor);
  const [fontColor, setFontColor] = useState(data.FontColor);
  const [color1, setColor1] = useState(data.Color1);
  const [color2, setColor2] = useState(data.Color2);
  const [bgImage, setBgImage] = useState(data.BgImage);

  const [leadCapture, setLeadCapture] = useState(data.LeadCapture);
  const [quickSelect, setQuickSelect] = useState(data.QuickSelect);
  const [availabilitySwitch, setAvailabilitySwitch] = useState(
    data.AvailabilitySwitch
  );
  const [availabilityLabel, setAvailabilityLabel] = useState(
    data.AvailabilityLabel
  );
  const [availability, setAvailability] = useState(data.Availability);

  const getData = async () => {
    const profile = userName;
    const type = templateId;
    // console.log("profile, type", profile, type);

    const obj = {};
    try {
      const { data } = await axios.get(
        `${serverUrl}/device/infoall/${profile}`
      );

      if (data.user.length !== 0) {
        // console.log("Data", data);

        if (
          data.profileShared.length !== 0 &&
          data.profileShared[0]._id == type
        ) {
          obj.LeadCapture = data.profileShared[0].contactForm;
          obj.QuickSelect = data.profileShared[0].quickSelect;
          obj.ProductSwitch = data.profileShared[0].productSwitch;
          obj.ServiceSwitch = data.profileShared[0].serviceSwitch;
          obj.logoSwitch = data.profileShared[0].logoSwitch;
          obj.ReviewSwitch = data.profileShared[0].reviewSwitch;
          obj.ReviewButtonSwitch = data.profileShared[0].reviewButtonSwitch;
          obj.BusinessHoursSwitch = data.profileShared[0].businessHoursSwitch;
          obj.ProductLabel = data.profileShared[0].productLabel;
          obj.ServiceLabel = data.profileShared[0].serviceLabel;
          obj.ReviewLabel = data.profileShared[0].reviewLabel;
          obj.BusinessHoursLabel = data.profileShared[0].businessHoursLabel;
          obj.AvailabilitySwitch = data.profileShared[0].availabilitySwitch;
          obj.AvailabilityLabel = data.profileShared[0].availabilityLabel;
        } else if (data.profileUnshared.length !== 0) {
          for (let i = 0; i < data.profileUnshared.length; i++) {
            if (data.profileUnshared[i]._id == type) {
              obj.LeadCapture = data.profileUnshared[i].contactForm;
              obj.QuickSelect = data.profileUnshared[i].quickSelect;
              obj.ProductSwitch = data.profileUnshared[i].productSwitch;
              obj.ServiceSwitch = data.profileUnshared[i].serviceSwitch;
              obj.logoSwitch = data.profileUnshared[i].logoSwitch;
              obj.ReviewSwitch = data.profileUnshared[i].reviewSwitch;
              obj.ReviewButtonSwitch =
                data.profileUnshared[i].reviewButtonSwitch;
              obj.BusinessHoursSwitch =
                data.profileUnshared[i].businessHoursSwitch;
              obj.ProductLabel = data.profileUnshared[i].productLabel;
              obj.ServiceLabel = data.profileUnshared[i].serviceLabel;
              obj.ReviewLabel = data.profileUnshared[i].reviewLabel;
              obj.BusinessHoursLabel =
                data.profileUnshared[i].businessHoursLabel;
              obj.AvailabilitySwitch =
                data.profileUnshared[i].availabilitySwitch;
              obj.AvailabilityLabel = data.profileUnshared[i].availabilityLabel;
            }
          }
        }
      }

      let activeId = "";
      activeId = data.profileShared[0]?._id;
      // console.log("obj", obj);

      const result = await axios.get(
        `${serverUrl}/getData/data/${activeId}/${profile}`
      );

      // console.log("result", result);

      if (
        result.data.customTemplates[0] &&
        Object.keys(result.data.customTemplates[0]).length !== 0
      ) {
        // console.log(
        //   "result.data.customTemplates[0]",
        //   result.data.customTemplates[0]
        // );

        obj.BackgroundColor =
          result.data.customTemplates[0].customizedTemplate.backgroundColor;
        obj.ButtonStyle =
          result.data.customTemplates[0].customizedTemplate.buttonStyle;
        obj.ButtonColor =
          result.data.customTemplates[0].customizedTemplate.buttonColor;
        obj.Color1 = result.data.customTemplates[0].customizedTemplate.color1;
        obj.Color2 = result.data.customTemplates[0].customizedTemplate.color2;
        obj.BgImage = result.data.customTemplates[0].customizedTemplate.bgImage;
      }
      const appsObj = result.data.apps;
      const appsArr =
        appsObj !== undefined ? Object.values(appsObj).flat() : [];

      if (
        result.data.user.length === 0 &&
        result.data.img.length === 0 &&
        result.data.videos.length === 0 &&
        result.data.products.length === 0 &&
        result.data.services.length === 0 &&
        result.data.reviews.length === 0 &&
        result.data.businessHours.length === 0 &&
        result.data.pfds.length === 0 &&
        result.data.customLinks.length === 0 &&
        appsArr.length === 0
      ) {
        obj.DummyData = true;
        setDummyData(true);
      } else {
        obj.DummyData = false;
        setDummyData(false);
        // console.log("appsArr", appsArr);
      }
      if (result.data.user.length > 0) {
        obj.Name =
          result.data.user[0].firstName + " " + result.data.user[0].lastName;
        obj.FirstName = result.data.user[0].firstName;
        obj.LastName = result.data.user[0].lastName;
        obj.Email1 = result.data.user[0].email;
        if (result.data.user[0].mobileNumber) {
          obj.MobileNumber =
            "+" +
            result.data.user[0].selectedCode +
            result.data.user[0].mobileNumber;
        }
        if (result.data.user[0].newmobileNumber) {
          obj.NewMobileNumber =
            "+" +
            result.data.user[0].selectedCode2 +
            result.data.user[0].newmobileNumber;
        }
        obj.Description = result.data.user[0].description;
        obj.CompanyName = result.data.user[0].companyName;
        obj.PImage = result.data.user[0].profileimage;
        setPImage(result.data.user[0].profileimage);
        obj.JobTitle = result.data.user[0].jobTitle;
      } else {
        obj.Name = data.user[0].name;
        obj.FirstName = data.user[0].firstName;
        obj.LastName = data.user[0].lastName;
      }
      obj.Images = result.data.img;
      obj.Videos = result.data.videos;
      obj.Apps = result.data.apps;
      setApps(result.data.apps);
      // console.log("apps", result.data.apps);

      obj.Products = result.data.products;
      obj.Services = result.data.services;
      obj.Reviews = result.data.reviews;
      obj.BusinessHours = result.data.businessHours;
      obj.Pdfs = result.data.pfds;
      obj.CustomLinks = result.data.customLinks;
      setCustomLinks(result.data.customLinks);
      obj.Availability = result.data.availability;
    } catch (error) {
      // console.slog(error);
      // redirect("/login");
    }
    setData(obj);
  };

  useEffect(() => {
    getData();
  }, []);

  // ---------------------------------------------------

  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [profileData, setProfileData] = useState([]);
  const [templateType, setTemplateType] = useState("");
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  // const [name, setName] = useState("");
  // const [mobileNumber, setMobileNumber] = useState("");
  const [matchingTemplate, setMatchingTemplate] = useState(templatesArray[0]);
  const [profileimage, setProfileImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const [pageType, setPageType] = useState(1);
  const [showTypeModal, setShowTypeModal] = useState(false);
  const [showCrop, setShowCrop] = useState(false);
  const [shareProfile, setShareProfile] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [lastNameErrorMessage, setLastNameErrorMessage] = useState("");
  const [showGif, setShowGif] = useState(false);
  const [message, setMessage] = useState("");
  // const [type, setType] = useState("");
  const [showMessage, setShowtMessage] = useState(false);
  //functions for crop
  const [selectedImage, setSelectedImage] = useState();
  const [canvasWidth, setCanvasWidth] = useState(800);
  const [canvasHeight, setCanvasHeight] = useState(800);
  const [crop, setCrop] = useState();
  const [image, setImage] = useState();

  // 2nd section // social media

  const [selectedMedia, setSelectedMedia] = useState([
    { app: "Instagram", link: "" },
    { app: "Linkedin", link: "" },
    { app: "Facebook", link: "" },
  ]);
  const [mediaUrl, setMediaUrl] = useState("");
  const [label, setLabel] = useState("");

  // 3rd section
  const [customLink, setCustomLink] = useState("");
  const [title, setTitle] = useState("");
  const handleChange = (event) => {
    // Check if the input contains dots
    if (!event.target.value.includes(".")) {
      setTitle(event.target.value);
    }
  };

  const fetchProfile = async () => {
    const config = {
      headers: {
        Authorization: "Bearer " + getCookie("jwt_token"),
      },
    };
    try {
      const { data } = await axios.get(
        `${serverUrl}/profile/profile/${username}`,
        config
      );
      // setProfileData(data);
      if (data.length > 0) {
        setTemplateType(data[0].type);
        setType(data[0]._id);
      }
      // console.log(data);
    } catch (error) {
      // console.log(error?.response);
      // navigate.push("/login");
    }
  };
  // console.log("object data may be dummy",data)
  const fetchData = async () => {
    const config = {
      headers: {
        Authorization: "Bearer " + getCookie("jwt_token"),
      },
    };
    try {
      const res = await axios.get(
        `${serverUrl}/getUser/getUser/${username}`,
        config
      );
      // console.log("Data of getUser",res.data);
      if (res.data && res.data.length > 0) {
        setFirstName(res.data[0].firstName);
        setLastName(res.data[0].lastName);
        setEmail(res.data[0].email);
        setMobileNumber(res.data[0].mobileNumber);
        setName(res.data[0].name);
        setId(res.data[0]._id);
      }
    } catch (error) {
      //console.log(error);
      navigate.push("/login");
    }
  };

  useEffect(() => {
    if (username != "") {
      fetchProfile();
      fetchData();
    }
  }, [username, data]);

  useEffect(() => {
    if (
      templatesArray.filter((template) => template.type === templateType)
        .length !== 0
    ) {
      setMatchingTemplate(
        templatesArray.filter((template) => template.type === templateType)[0]
      );
    }
  }, [templateType]);

  const handleShareProfile = () => {
    setShareProfile(true);
  };

  // 1st section // profile image and name

  const handleNameChange = (event) => {
    const inputValue = event.target.value;
    const onlyAlphabets = /^[A-Za-z\s]*$/;

    if (onlyAlphabets.test(inputValue) || inputValue === "") {
      setFirstName(event.target.value);
      setNameErrorMessage("");
    } else {
      setNameErrorMessage("Please enter valid value");
    }
  };
  const handleLastNameChange = (event) => {
    const inputValue = event.target.value;
    const onlyAlphabets = /^[A-Za-z\s]*$/;

    if (onlyAlphabets.test(inputValue) || inputValue === "") {
      setLastName(event.target.value);
      setLastNameErrorMessage("");
    } else {
      setLastNameErrorMessage("Please enter valid value");
    }
  };

  const updateCanvas = () => {
    let canvas = document.getElementById("croppedImage");
    if (!canvas || !crop) return;
    let croppedImage = canvas.getContext("2d");
    let img = document.querySelector("#cropImage");

    let swidth = img.naturalWidth * crop.width * 0.01;
    let sheight = img.naturalHeight * crop.height * 0.01;
    let dwidth = canvasWidth;
    let dheight = canvasHeight;
    let x = img.naturalWidth * crop.x * 0.01;
    let y = img.naturalHeight * crop.y * 0.01;
    croppedImage.clearRect(0, 0, dwidth, dheight);
    croppedImage.save();
    croppedImage.drawImage(img, x, y, swidth, sheight, 0, 0, dwidth, dheight);
    croppedImage.restore();
  };
  useEffect(() => {
    updateCanvas();
  }, [crop]);

  function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
    return centerCrop(
      makeAspectCrop(
        {
          unit: "%",
          width: 90,
        },
        aspect,
        mediaWidth,
        mediaHeight
      ),
      mediaWidth,
      mediaHeight
    );
  }
  const [imgH, setImgH] = useState();
  const [imgW, setImgW] = useState();

  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;
    setImgH(height);
    setImgW(width);
    setCrop(centerAspectCrop(width, height, canvasWidth / canvasHeight));
  };

  const resetCrop = () => {
    setCrop(centerAspectCrop(imgW, imgH, canvasWidth / canvasHeight));
  };
  // const handleImageSave = async () => {
  //   let canvas = document.getElementById("croppedImage");

  //   const image = canvas.toBlob(async (blob) => {
  //     const imageRef = ref(storage, `/images/${selectedImage.name}`);
  //     await uploadBytes(imageRef, blob)
  //       .then((snapshot) => {
  //         getDownloadURL(snapshot.ref)
  //           .then(async (downloadURL) => {
  //             // Once image is uploaded, get the download URL

  //             setProfileImage(downloadURL);
  //             const response = await fetch(
  //               `${serverUrl}/connect/basicdetail/add/${username}`,
  //               {
  //                 method: "POST",
  //                 headers: {
  //                   "Content-Type": "application/json",
  //                   Authorization: "Bearer " + getCookie("jwt_token"),
  //                 },
  //                 body: JSON.stringify({
  //                   type,
  //                   profile: username,
  //                   firstName,
  //                   lastName,
  //                   email,
  //                   selectedCode: "91",
  //                   selectedCode2: "91",
  //                   selectedCountry: "IN",
  //                   selectedCountry2: "IN",
  //                   mobileNumber: "",
  //                   newmobileNumber: "",
  //                   companyName: "",
  //                   jobTitle: "",
  //                   description: "",
  //                   profileimage: downloadURL,
  //                   coverimage: "",
  //                 }),
  //               }
  //             )
  //               .then((res) => res.json())
  //               .then((data) => {
  //                 if (data.error) {
  //                   //console.log(data.error);
  //                 } else {
  //                   setMessage("Profile image saved successfully");
  //                   setShowtMessage(true);
  //                   setIsLoading(false);
  //                   setTimeout(() => {
  //                     setShowtMessage(false);
  //                   }, 3000);
  //                   setDummyState(!dummyState);
  //                 }
  //               });
  //             updateCheckVariable();
  //           })
  //           .catch((err) => {
  //             console.error("Error getting download URL from Firebase", err);
  //           });
  //       })
  //       .catch((err) => {
  //         console.error("Error uploading image to Firebase Storage", err);
  //       });
  //   });
  // };

  const uploadPreset = "wotgdhd2";
  const cloudName = "dzznjxrhi";

  const handleCloudinaryUpload = async (file, isCropped = false) => {
    setIsLoading(true);
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
      setProfileImage(res.secure_url);
      SafeLocalStorage.setItem("profileUrl", res.secure_url)
      await updateProfileImage(res.secure_url);
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
    } finally {
      setIsLoading(false);
      if (!isCropped) {
        setShowGif(false);
      }
    }
  };

  const updateProfileImage = async (imageUrl) => {
    try {
      const response = await fetch(
        `${serverUrl}/connect/basicdetail/add/${profile}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getCookie("jwt_token"),
          },
          body: JSON.stringify({
            type,
            profile,
            firstName,
            lastName,
            email,
            selectedCode,
            selectedCode2,
            selectedCountry,
            selectedCountry2,
            mobileNumber,
            isWhatsappNumber,
            newmobileNumber,
            companyName,
            jobTitle,
            description,
            profileimage: imageUrl,
            coverimage,
            autodownload,
          }),
        }
      );
      const data = await response.json();
      if (data.error) {
        console.log(data.error);
      } else {
        setMessage("Profile image saved successfully");
        setShowtMessage(true);
        setTimeout(() => {
          setShowtMessage(false);
        }, 3000);
        setDummyState(!dummyState);
      }
    } catch (error) {
      console.error("Error saving profile image:", error);
    }
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      try {
        const objectUrl = URL.createObjectURL(file);
        setImage(objectUrl);
        setShowCrop(true);
        setShowTypeModal(false);
      } catch (error) {
        console.error("Error creating object URL:", error);
        // Handle the error (e.g., show an error message to the user)
      }
    } else {
      console.error("No file selected");
      // Handle the case where no file is selected
    }
  };

  const handleGifInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      try {
        const objectUrl = URL.createObjectURL(file);
        setImage(objectUrl);
        setShowGif(true);
      } catch (error) {
        console.error("Error creating object URL:", error);
        // Handle the error (e.g., show an error message to the user)
      }
    } else {
      console.error("No file selected");
      // Handle the case where no file is selected
    }
  };

  const handleImageSave = async () => {
    let canvas = document.getElementById("croppedImage");
    canvas.toBlob(async (blob) => {
      await handleCloudinaryUpload(blob, true);
      setShowCrop(false);
    });
  };

  const handleGifSave = () => {
    if (selectedImage) {
      handleCloudinaryUpload(selectedImage);
    }
  };

  // const handleFileInputChange = (event) => {
  //   const image = event.target.files[0];
  //   setSelectedImage(image);
  //   setImage(URL.createObjectURL(image));
  //   setShowCrop(true);
  // };
  // const handleGifInputChange = (event) => {
  //   const image = event.target.files[0];
  //   setSelectedImage(image);
  //   setImage(URL.createObjectURL(image));
  //   // setShowCrop(true);
  // };

  const handleSaveOriginal = async (event) => {
    const image = event.target.files[0];
    setSelectedImage(image);
    setImage(URL.createObjectURL(image));
  };

  const saveOriginal = async () => {
    const imageRef = ref(storage, `/images/${selectedImage.name}`);

    uploadBytes(imageRef, selectedImage)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref)
          .then(async (downloadURL) => {
            // Once image is uploaded, get the download URL
            setProfileImage(downloadURL);
            const response = await fetch(
              `${serverUrl}/connect/basicdetail/add/${username}`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + getCookie("jwt_token"),
                },
                body: JSON.stringify({
                  type,
                  profile: username,
                  firstName: firstName,
                  lastName: lastName,
                  email: email,
                  selectedCode: "91",
                  selectedCode2: "91",
                  selectedCountry: "IN",
                  selectedCountry2: "IN",
                  mobileNumber: mobileNumber,
                  newmobileNumber: "",
                  companyName: "",
                  jobTitle: "",
                  description: "",
                  profileimage: downloadURL,
                  coverimage: "",
                }),
              }
            )
              .then((res) => res.json())
              .then((data) => {
                if (data.error) {
                  //console.log(data.error);
                } else {
                  setMessage("Profile image saved successfully");
                  setShowtMessage(true);
                  setIsLoading(false);
                  setTimeout(() => {
                    setShowtMessage(false);
                  }, 3000);
                  setDummyState(!dummyState);
                }
              });
            updateCheckVariable();
          })
          .catch((err) => {
            console.error("Error getting download URL from Firebase", err);
          });
      })
      .catch((err) => {
        console.error("Error uploading image to Firebase Storage", err);
      });
  };

  const handleSubmit = async () => {
    // event.preventDefault();
    const response = await fetch(
      `${serverUrl}/connect/basicdetail/add/${username}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getCookie("jwt_token"),
        },
        body: JSON.stringify({
          type,
          profile: username,
          firstName: firstName,
          lastName: lastName,
          email: email,
          selectedCode: "91",
          selectedCode2: "91",
          selectedCountry: "IN",
          selectedCountry2: "IN",
          mobileNumber: mobileNumber,
          newmobileNumber: "",
          companyName: "",
          jobTitle: "",
          description: "",
          profileimage: profileimage,
          coverimage: "",
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          //console.log(data.error);
        } else {
          setMessage("Basic detail saved successfully");
          setShowtMessage(true);
          setTimeout(() => {
            setShowtMessage(false);
          }, 3000);
          setDummyState(!dummyState);
        }
      });
    updateCheckVariable();
  };

  // 2nd section // social media

  const social = [
    {
      text: "Facebook",
      type: "basic",
    },
    {
      text: "Instagram",
      type: "basic",
    },
    {
      text: "Linkedin",
      type: "basic",
    },
    {
      text: "Snapchat",
      type: "basic",
    },
    {
      text: "Twitter",
      type: "basic",
    },
    {
      text: "Telegram",
      type: "basic",
    },
  ];

  const handleSave = async () => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + getCookie("jwt_token"),
      },
    };
    for (let i = 0; i < selectedMedia.length; i++) {
      // console.log("Saving media:", selectedMedia[i]);
      let formData = new FormData();
      formData.append("name", username);
      formData.append("platform", selectedMedia[i].app);
      formData.append("userName", selectedMedia[i].link);
      formData.append("label", selectedMedia[i].app);
      formData.append("type", type);
      selectedMedia[i].link !== "" &&
        axios
          .put(
            `${serverUrl}/record/record/addbasic/${username}`,
            formData,
            config
          )
          // .then((response) => console.log("Save successful:", response.data))
          .then((response) => {})
          .catch((error) => {
            //console.log(error);
          });
    }
  };

  // useEffect(() => {
  //   console.log(selectedMedia);
  // }, [selectedMedia]);

  // 3rd section // custom urls

  const handleSaveNewSectionWithoutIndex = async () => {
    try {
      let urlLink;
      if (
        !customLink.startsWith("http://") &&
        !customLink.startsWith("https://")
      ) {
        urlLink = "https://" + customLink;
      } else {
        urlLink = customLink;
      }

      const formData1 = new FormData();
      formData1.append("header", "custom");
      formData1.append("websiteUrl", urlLink);
      formData1.append("name", username);
      formData1.append("label", title);
      formData1.append("type", type);
      formData1.append("customLinkImage", null);

      const res = await axios.put(
        `${serverUrl}/record/record/addcustomlink`,
        formData1
      );

      updateCheckVariable();

      //console.log("Response:", res.data);
    } catch (error) {
      console.error("Error saving custom link:", error);
    }
  };

  return (
    <div className="flex flex-col w-screen h-screen bg-white smd:bg-transparent">
      <Navbar usedIn="hideLogin" background="#FAFAFA" />

      {isSkipped ? (
        <div
          className={`relative w-full h-screen smd:mt-[96px] mt-[62px] ${
            windowHeight > 800 && "pb-[96px]"
          } flex smd:flex-row flex-col  smd:justify-center justify-start smd:items-start items-center bg-[transparent] font-poppins overflow-y-scroll`}
        >
          <div className="imgDiv smd:w-[50%] w-full smd:h-full h-fit hidden smd:flex flex-col justify-center items-center relative z-[0] ml-[50px] py-[20px]">
            {/* <Image
              src={matchingTemplate.thumbnail}
              className={`${
                windowHeight > 912 ? "h-[664px]" : "h-full !rounded-[16px]"
              } tempImg w-fit  overflow-hidden rounded-[16px] sm:rounded-[34px] flex flex-col justify-center items-center z-[1] object-contain`}
              style={{ boxShadow: "0 0 20px #A8ABC3" }}
              width={270}
              height={664}
              alt="template image"
            /> */}

            <div className="overflow-scroll z-[1]">
              <Iphone
                usedIn="signup"
                // toggleStates={toggleStates}
                profile={username}
                template={type}
                dummyState={dummyState}
                templateName={activeTemplateName}
                // backgroundColor={backgroundColor}
                // buttonStyle={buttonStyle}
                // buttonColor={buttonColor}
                // fontColor={fontColor}
                // color1={color1}
                // color2={color2}
                // bgImage={bgImage}
                data={{
                  username: profile,
                  templateId: type,
                  dummyData: dummyData,
                  name: User.name || name,
                  firstName: User.firstName || firstName,
                  lastName: User.lastName || lastName,
                  // email: email1,
                  // mobileNumber: mobileNumber,
                  // newMobileNumber: newMobileNumber,
                  // jobDescription: description,
                  // companyName: companyName,
                  // jobTitle: jobTitle,
                  pimage: UserPic || pimage,
                  // images: images,
                  // videos: videos,
                  apps: apps,
                  // productSwitch: productSwitch,
                  // serviceSwitch: serviceSwitch,
                  // logoSwitch: logoSwitch,
                  // reviewSwitch: reviewSwitch,
                  // businessHoursSwitch: businessHoursSwitch,
                  // reviewButtonSwitch: reviewButtonSwitch,
                  // productLabel: productLabel,
                  // serviceLabel: serviceLabel,
                  // reviewLabel: reviewLabel,
                  // businessHoursLabel: businessHoursLabel,
                  // products: products,
                  // services: services,
                  // reviews: reviews,
                  // businessHours: businessHours,
                  // products: products,
                  // services: services,
                  // pdfs: pdfs,
                  customLinks: customLinks,
                  // quickSelect: quickSelect,
                  // leadCapture: leadCapture,
                  // availabilitySwitch: availabilitySwitch,
                  // availabilityLabel: availabilityLabel,
                  // availability: availability,
                }}
              />
            </div>

            <div
              className={`bgShadow z-[0] absolute bg-[#736CED] ${
                windowHeight > 800
                  ? "h-[300px] w-[300px] blur-[100px]"
                  : "h-[200px] w-[200px] blur-[50px]"
              } top-[50%] left-[50%] z-[0] rounded-full`}
              style={{
                transform: "translate(-50%, -50%)",
              }}
            ></div>
          </div>

          <div className="dataDiv smd:w-[50%] w-full smd:h-full h-fit flex flex-col justify-center items-center smd:gap-[32px] gap-[16px] z-[1] mr-[50px]">
            <p className={`text-[20px] font-[700] text-center w-full`}>
              Your{" "}
              <span
                className={`text-linear-gradient text-[20px] font-[700] text-center`}
              >
                &nbsp;Qviq-site
              </span>{" "}
              is ready to go live!!! 🎉
            </p>

            <div
              className={`dataBox smd:w-[492px] w-full smd:h-[324px] h-fit p-[32px] rounded-[20px] flex flex-col smd:justify-between justify-start items-center ${
                windowHeight > 800
                  ? "smd:gap-[48px] gap-[28px] smd:mb-[120px] mb-[0px]"
                  : "gap-[28px] mb-[0px]"
              } bg-white`}
            >
              <p className="smd:text-[16px] text-[14px] font-[500] text-center text-[#817C7C]">
                Get more visitors by sharing your Qviq-site on your social media
                handles
              </p>

              <div
                className="w-full h-[56px] py-[8px] pr-[12px] pl-[12px] rounded-[12px] flex flex-row justify-between items-center bg-[#FAFAFA]"
                onClick={() => {
                  navigator.clipboard.writeText(`https://${username}.qviqfrontendtest.vercel.app`);
                }}
              >
                <p className="text-[14px] font-[700]">{username}.qviqfrontendtest.vercel.app</p>

                <button
                  className="h-full w-fit rounded-[12px] py-[12px] pr-[24px] pl-[20px] flex flex-row items-center justify-center gap-[6px] text-white bg-black"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `https://${username}.qviqfrontendtest.vercel.app`
                    );
                  }}
                >
                  <LuCopy />
                  <p className="text-[14px] font-[500]">Copy</p>
                </button>
              </div>

              <div className="flex smd:flex-row flex-col gap-[20px] smd:h-[56px] h-[108px] w-full">
                <SecondaryButton
                  modify={true}
                  width="100%"
                  height="100%"
                  text="Share"
                  onClick={handleShareProfile}
                  // icon={<FiEye />}
                />

                <PrimaryButton2
                  modify={true}
                  width="100%"
                  height="100%"
                  text="Continue editing"
                  // icon={<LuPencil />}
                  onClick={() => {
                    deleteCookie("username");
                    deleteCookie("templateId");
                    deleteCookie("profile_added");
                    updateCheckVariable();
                    navigate.push(`/${type}/dashboard/${username}`);
                  }}
                />
              </div>
            </div>
          </div>

          <div className="imgDiv mb-[20px] smd:w-[50%] w-full smd:h-full h-fit smd:hidden flex flex-col justify-center items-center relative z-[0]">
            {/* <Image
              src={matchingTemplate.thumbnail}
              className={`h-[475px] rounded-[16px]
        tempImg w-fit  overflow-hidden flex flex-col justify-center items-center z-[1] object-contain`}
              style={{ boxShadow: "0 0 20px #A8ABC3" }}
              width={270}
              height={664}
              alt="template image"
            /> */}

            <div className="overflow-scroll z-[1]">
              <Iphone
                usedIn="signup"
                // toggleStates={toggleStates}
                profile={username}
                template={type}
                dummyState={dummyState}
                templateName={activeTemplateName}
                // backgroundColor={backgroundColor}
                // buttonStyle={buttonStyle}
                // buttonColor={buttonColor}
                // fontColor={fontColor}
                // color1={color1}
                // color2={color2}
                // bgImage={bgImage}
                data={{
                  username: profile,
                  templateId: type,
                  dummyData: dummyData,
                  name: User.name || name,
                  firstName: User.firstName || firstName,
                  lastName: User.lastName || lastName,
                  // email: email1,
                  // mobileNumber: mobileNumber,
                  // newMobileNumber: newMobileNumber,
                  // jobDescription: description,
                  // companyName: companyName,
                  // jobTitle: jobTitle,
                  pimage: UserPic || pimage,
                  // images: images,
                  // videos: videos,
                  apps: apps,
                  // productSwitch: productSwitch,
                  // serviceSwitch: serviceSwitch,
                  // logoSwitch: logoSwitch,
                  // reviewSwitch: reviewSwitch,
                  // businessHoursSwitch: businessHoursSwitch,
                  // reviewButtonSwitch: reviewButtonSwitch,
                  // productLabel: productLabel,
                  // serviceLabel: serviceLabel,
                  // reviewLabel: reviewLabel,
                  // businessHoursLabel: businessHoursLabel,
                  // products: products,
                  // services: services,
                  // reviews: reviews,
                  // businessHours: businessHours,
                  // products: products,
                  // services: services,
                  // pdfs: pdfs,
                  // customLinks: customLinks,
                  // quickSelect: quickSelect,
                  // leadCapture: leadCapture,
                  // availabilitySwitch: availabilitySwitch,
                  // availabilityLabel: availabilityLabel,
                  // availability: availability,
                }}
              />
            </div>

            <div
              className={`bgShadow z-[0] absolute bg-[#736CED] ${
                windowHeight > 800
                  ? "h-[300px] w-[300px] blur-[100px]"
                  : "h-[200px] w-[200px] blur-[50px]"
              } top-[50%] left-[50%] z-[0] rounded-full`}
              style={{
                transform: "translate(-50%, -50%)",
              }}
            ></div>
          </div>
        </div>
      ) : (
        <div
          className={`relative w-full h-screen flex flex-col justify-start items-center font-poppins overflow-y-scroll pb-[50px] ${
            windowHeight > 700 ? "smd:pt-[136px] pt-[96px]" : "pt-[84px]"
          }`}
        >
          <div
            className={`hidden md:flex flex-row items-center gap-[8px] cursor-pointer active:scale-[90%] absolute top-0 left-0 pl-[50px] lg:pl-[80px] transition-[300ms]  ${
              windowHeight > 700 ? "smd:mt-[136px] mt-[96px]" : "mt-[96px]"
            }`}
          >
            <IoIosArrowBack
              onClick={() => {
                if (pageType === 1) {
                  navigate.push(
                    `/chooseprofile/${username}?` +
                      createQueryString(
                        ["fromPage", "fromsignup"],
                        ["admin", "true"]
                      )
                  );
                }
                if (pageType === 2) {
                  setPageType(1);
                }
                if (pageType === 3) {
                  setPageType(2);
                }
              }}
              className="text-[#E40849]"
            />
            <button
              className="add-icon font-[500] text-[16px]"
              onClick={() => {
                if (pageType === 1) {
                  navigate.push(
                    `/chooseprofile/${username}?` +
                      createQueryString(
                        ["fromPage", "fromsignup"],
                        ["admin", "true"]
                      )
                  );
                }
                if (pageType === 2) {
                  setPageType(1);
                }
                if (pageType === 3) {
                  setPageType(2);
                }
              }}
            >
              Back
            </button>
          </div>

          <div className="max-w-[304px] w-full h-[4px] flex flex-row justify-center items-center gap-[8px] px-[20px]">
            <div
              className={`h-[4px] w-full rounded-full ${
                pageType === 1 ? "bg-[#0A0003]" : "bg-[#0A000314]"
              }`}
            ></div>
            <div
              className={`h-[4px] w-full rounded-full ${
                pageType === 2 ? "bg-[#0A0003]" : "bg-[#0A000314]"
              }`}
            ></div>
            <div
              className={`h-[4px] w-full rounded-full ${
                pageType === 3 ? "bg-[#0A0003]" : "bg-[#0A000314]"
              }`}
            ></div>
          </div>

          <div className="smd:text-[20px] text-[18px] font-[600] text-[#0A0003] text-center max-w-[437px] w-full xsm:px-[20px] px-[10px] smd:mt-[32px] mt-[20px] smd:mb-[54px] mb-[32px]">
            {pageType === 1 &&
              "Great, add your image to personalise your qviq-site"}
            {pageType === 2 &&
              "👌Awesome!!! Add your social media links to your Qviq-site"}
            {pageType === 3 &&
              "Add your custom links to showcase your work, products & more"}
          </div>

          {pageType === 1 && (
            <div className="smd:w-[492px] w-full h-fit bg-[white] rounded-[20px] flex flex-col justify-between items-center smd:gap-[32px] gap-[28px] smd:px-[32px] px-[20px] smd:py-[32px] py-[0px]">
              <div className="relative flex flex-col-reverse gap-3 justify-center items-center">
                <button
                  className="flex justify-center items-center  text-sm gap-1"
                  type="button"
                  // onClick={() => setShowTypeModal(true)}
                  // onClick={() => document.getElementById("ProfileInput").click()}
                >
                  <input
                    id="ProfileInput1"
                    type="file"
                    accept=".jpeg, .jpg, .png"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={(e) => {
                      setShowTypeModal(false);
                      setShowCrop(true);
                      handleFileInputChange(e);
                      handleSaveOriginal(e);
                    }}
                    onClick={(e) => {
                      e.target.value = null;
                    }}
                  />
                  <input
                    id="ProfileInput2"
                    type="file"
                    accept=".gif"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={(e) => {
                      setShowTypeModal(false);
                      setShowGif(true);
                      handleGifInputChange(e);
                      handleSaveOriginal(e);
                    }}
                    onClick={(e) => {
                      e.target.value = null;
                    }}
                  />

                  {/* <MdOutlineEdit className="text-[18px] text-[#E40849]" />*/}
                  <p className="text-[16px] font-semibold">Your Profile</p>
                </button>

                {isLoading ? (
                  <div className="flex flex-col justify-center  relative items-center w-[150px] h-[150px] rounded-full">
                    <img
                      src={require("../Image/Tapop logo black.png").default.src}
                      alt=""
                      className="w-[150px]  h-[150px]"
                    />
                    <div className="absolute top-0 backdrop-blur-sm flex justify-center items-center">
                      <LoadingAnimation />
                    </div>
                  </div>
                ) : (
                  <div className="w-[150px] h-[150px]">
                    {profileimage ? (
                      <img
                        className="cursor-pointer w-[150px] h-[150px] object-cover rounded-full"
                        src={profileimage}
                        alt="profileimage"
                        onClick={() => setShowTypeModal(true)}
                      />
                    ) : (
                      <div
                        className="cursor-pointer w-[150px] h-[150px] object-cover rounded-full flex flex-col justify-center items-center"
                        style={{ border: "1px dashed #A7A7A7" }}
                        onClick={() => setShowTypeModal(true)}
                      >
                        <PiImage className="text-[26px]" />
                        <p className="text-center text-[14px] font-[500]">
                          click to upload
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* <div className="flex justify-center smd:flex-row flex-col gap-[20px] w-full smd:h-[86px] h-fit">
                <div className="flex flex-col w-full h-[56px]">
                  <InputField
                    width={"100%"}
                    height={"100%"}
                    label="First Name"
                    type="text"
                    value={firstName}
                    onChange={handleNameChange}
                  />

                  {nameErrorMessage && (
                    <p className="text-[#FE7171] ml-[10px]">
                      {nameErrorMessage}
                    </p>
                  )}
                </div>

                <div className="flex flex-col w-full h-[56px]">
                  <InputField
                    width={"100%"}
                    height={"100%"}
                    label="Last Name"
                    type="text"
                    value={lastName}
                    onChange={handleLastNameChange}
                  />
                  {lastNameErrorMessage && (
                    <p className="text-[#FE7171] ml-[10px]">
                      {lastNameErrorMessage}
                    </p>
                  )}
                </div>
              </div> */}

              <div className=" flex flex-row gap-2 w-full smd:mt-[0px] mt-[10px]">
                <TertiaryButton
                  text="Skip"
                  width="100%"
                  onClick={() => {
                    setPageType(2);
                  }}
                />
                <PrimaryButton2
                  width="100%"
                  className={`${
                    profileimage === "" && "btn-primaryButton2Disabled"
                  }`}
                  text="Next"
                  isDisabled={profileimage == "" ? true : false}
                  onClick={() => {
                    profileimage && handleSubmit();
                    setPageType(2);
                  }}
                  // icon={<IoIosArrowForward className="text-[26px]" />}
                />
              </div>
            </div>
          )}

          {pageType === 2 && (
            <div className="smd:w-[492px] w-full h-fit bg-[white] rounded-[20px] flex flex-col justify-between items-center smd:gap-[32px] gap-[28px] smd:px-[32px] px-[20px] smd:py-[32px] py-[0px]">
              <div className="w-full flex flex-col justify-start items-center gap-[20px]">
                {selectedMedia.map((item, idx) => (
                  <div
                    key={idx}
                    className={`w-full h-[56px] rounded-[12px] pl-[18px] pr-[10px] flex-row items-center gap-[8px] bg-[#FAFAFA] flex`}
                  >
                    <img
                      src={
                        require(`../Logos/SocialMediaLogos/${item.app
                          .toLowerCase()
                          .split(" ")
                          .join("")}.png`).default.src
                      }
                      alt="social-logo"
                      className="w-6 h-6"
                    />

                    <InputField
                      // label={`${capitalize(inBuiltDialogPlatform)} Link`}
                      width="100%"
                      border="none"
                      className="bg-[#FAFAFA]"
                      placeholder={`@ Add ${item.app} handle link`}
                      onChange={(e) => {
                        let newSelectedMedia = JSON.parse(
                          JSON.stringify(selectedMedia)
                        );
                        newSelectedMedia[idx].link = e.target.value;
                        setSelectedMedia(newSelectedMedia);
                      }}
                    />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-6 gap-y-4 gap-x-6 pb-3">
                {social.map((app, idx) => (
                  <div
                    className={`relative rounded-full flex items-center justify-center p-3 flex-1 so-m w-[64px] h-[64px] hover:bg-[#FAFAFA] active:scale-[90%] transition-[200ms]`}
                    key={idx}
                  >
                    <div
                      className="flex items-center gap-x-2 z-[0]"
                      onClick={() => {
                        // setInBuiltDialogPlatform(app.text);
                        // inBuiltDialogToggle();
                        let newSelectedMedia = JSON.parse(
                          JSON.stringify(selectedMedia)
                        );
                        newSelectedMedia.push({ app: app.text, link: "" });
                        setSelectedMedia(newSelectedMedia);
                      }}
                    >
                      <img
                        src={
                          require(`../Logos/SocialMediaLogos/${app.text
                            .toLowerCase()
                            .split(" ")
                            .join("")}.png`).default.src
                        }
                        alt="social-logo"
                        className="w-8 h-8"
                      />
                      {/* <p className="text-sm font-medium">{app.text}</p> */}
                    </div>

                    {selectedMedia
                      .map((item) => item.app)
                      .includes(app.text) && (
                      <IoCloseCircle
                        onClick={() =>
                          setSelectedMedia(
                            selectedMedia.filter(
                              (item) => item.app !== app.text
                            )
                          )
                        }
                        className="text-[20px] rounded-full text-[red] bg-white absolute z-[1] top-0 right-0"
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="w-full gap-2 flex flex-row smd:mt-[0px] mt-[10px]">
                <TertiaryButton
                  text="Skip"
                  width="100%"
                  onClick={() => {
                    setPageType(3);
                  }}
                />
                <PrimaryButton2
                  height="100%"
                  width="100%"
                  className={
                    selectedMedia.some((link) => link.link !== "")
                      ? ""
                      : "btn-primaryButton2Disabled"
                  }
                  text="Next"
                  isDisabled={!selectedMedia.some((link) => link.link !== "")}
                  onClick={() => {
                    handleSave();
                    setPageType(3);
                  }}
                  // icon={<IoIosArrowForward className="text-[26px]" />}
                />
              </div>
            </div>
          )}

          {pageType === 3 && (
            <div className="smd:w-[492px] w-full h-fit bg-[white] rounded-[20px] flex flex-col justify-between items-center smd:gap-[32px] gap-[28px] smd:px-[32px] px-[20px] smd:py-[32px] py-[0px]">
              <div className="w-full">
                <InputField
                  value={title}
                  onChange={(e) => handleChange(e)}
                  placeholder="Link name"
                  width="100%"
                  height="56px"
                  border="none"
                  className="bg-[#FAFAFA] !rounded-bl-none !rounded-br-none"
                />
                <InputField
                  value={customLink}
                  onChange={(e) => setCustomLink(e.target.value)}
                  placeholder="Link url"
                  width="100%"
                  height="56px"
                  border="none"
                  className="bg-[#FAFAFA] !rounded-tl-none !rounded-tr-none border-none"
                />
              </div>
              {/* <div className="w-full">
                <InputField
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Link name"
                  width="100%"
                  height="56px"
                  border="none"
                  className="bg-[#FAFAFA] !rounded-bl-none !rounded-br-none"
                />
                <InputField
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="Link url"
                  width="100%"
                  height="56px"
                  border="none"
                  className="bg-[#FAFAFA] !rounded-tl-none !rounded-tr-none border-none"
                />
              </div>
              <div className="w-full">
                <InputField
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Link name"
                  width="100%"
                  height="56px"
                  border="none"
                  className="bg-[#FAFAFA] !rounded-bl-none !rounded-br-none"
                />
                <InputField
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="Link url"
                  width="100%"
                  height="56px"
                  border="none"
                  className="bg-[#FAFAFA] !rounded-tl-none !rounded-tr-none border-none"
                />
              </div> */}

              <div className="w-full gap-2 flex flex-row smd:mt-[0px] mt-[10px]">
                <TertiaryButton
                  text="Skip"
                  width="100%"
                  onClick={() => {
                    setIsSkipped(true);
                  }}
                />
                <PrimaryButton2
                  height="100%"
                  width="100%"
                  className={`${
                    title == "" &&
                    customLink == "" &&
                    "btn-primaryButton2Disabled"
                  }`}
                  text="Next"
                  isDisabled={title == "" && customLink == "" ? true : false}
                  onClick={() => {
                    title !== "" &&
                      customLink !== "" &&
                      handleSaveNewSectionWithoutIndex();
                    getData(getCookie("username"), getCookie("templateName"));
                    // console.log(templateData.Type);

                    setIsSkipped(true);
                  }}
                  // icon={<IoIosArrowForward className="text-[26px]" />}
                />
              </div>
            </div>
          )}
        </div>
      )}

      <NewToast open={showMessage} message={message} />

      {showTypeModal && (
        <SelectImgModal
          showTypeModal={showTypeModal}
          setShowTypeModal={setShowTypeModal}
          onImageSelect={(type) => {
            if (type === "jpg/png") {
              document.getElementById("ProfileInput1").click();
            } else {
              document.getElementById("ProfileInput2").click();
            }
          }}
        />
      )}

      {showGif && (
        <NewModal
          text="Save Gif As Profile"
          onModal={showGif}
          onClick={setShowGif}
        >
          <div className="w-full flex flex-col items-center gap-[20px] p-[20px]">
            <img
              className="w-[400px] h-[400px] object-cover"
              src={image ? image : ""}
              alt="Selected GIF"
            />
            <div className="flex flex-row w-full max-w-[400px] justify-end gap-2 items-center py-4 mb-16 md:mb-0">
              <TertiaryButton
                onClick={() => {
                  setShowGif(false);
                  setImage("");
                }}
                text="Cancel"
                type="Delete"
              />
              <PrimaryButton2
                onClick={handleGifSave}
                text="Save"
                type="button"
              />
            </div>
          </div>
        </NewModal>
      )}

      {showCrop && (
        <NewCropModal
          onModal={showCrop}
          onClick={setShowCrop}
          text={"Crop Image"}
          width={"640px"}
        >
          {" "}
          <div className="sm:mt-8 px-6 h-fit max-h-[85vh]  md:h-fit overflow-y-scroll">
            <div className="flex flex-col max-w-[592px] max-h-[592px] justify-center items-center border-2 rounded-md">
              <div className="flex justify-end gap-2 items-center p-1 w-full sm:h-[80px] h-[60px] border-b-2">
                <button
                  onClick={() => {
                    resetCrop();
                  }}
                  className="border-[1px] rounded-full py-[8px] sm:py-[12px] px-[18px] sm:px-[24px] hover:bg-gray-100"
                >
                  Reset
                </button>
              </div>

              <div className="max-w-[592px] w-[80%] max-h-[512px] overflow-scroll">
                <div className="flex justify-center items-center h-full w-full">
                  <ReactCrop
                    aspect={canvasWidth / canvasHeight}
                    crop={crop}
                    onChange={(_, c) => {
                      setCrop(c);
                    }}
                  >
                    <img
                      id="cropImage"
                      onLoad={onImageLoad}
                      style={{
                        maxWidth: "100%",
                        maxHeight: canvasHeight,
                      }}
                      src={image ? image : ""}
                    />
                  </ReactCrop>
                </div>
                <canvas
                  className="hidden"
                  id="croppedImage"
                  width={canvasWidth}
                  height={canvasHeight}
                ></canvas>
              </div>
            </div>
            <div className="flex flex-row w-full justify-end gap-2 items-center py-4 mb-16 md:mb-0">
              <TertiaryButton
                onClick={(e) => {
                  setCrop(undefined);
                  setShowCrop(false);
                  setImage("");
                }}
                text="Cancel"
                type="Delete"
              />
              <PrimaryButton2
                onClick={(e) => {
                  setCrop(undefined);
                  setShowCrop(false);
                  handleImageSave();
                }}
                text="Crop"
                type="button"
              />
            </div>
          </div>
        </NewCropModal>
      )}

      {shareProfile && (
        <ShareModal
          username={username}
          firstName={firstName}
          usedIn="outsideTemplate"
          setShowModal1={setShareProfile}
          profileImage={
            profileimage
              ? profileimage
              : require("../ProfileTemplates/images/image1.jpg").default.src
          }
          type={type}
          square={false}
        />
      )}
    </div>
  );
}
