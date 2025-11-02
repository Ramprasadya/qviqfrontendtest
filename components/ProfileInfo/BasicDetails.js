import React, { useState, useRef, useEffect, useContext } from "react";
import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import "../UiComponents/UiStyles.css";
import "../UiComponents/iconTextStyle.css";
import TertiaryButton from "../UiComponents/TertiaryButton";
import PrimaryButton2 from "../UiComponents/PrimaryButton2";
import MobileNumberField from "../UiComponents/MobileNumberField";
import { getCountryCallingCode } from "libphonenumber-js";
import flags from "react-phone-number-input/flags";
import InputField from "../UiComponents/InputField";
import LoadingAnimation from "../UiComponents/Loading/LoadingAnimation";
import validator from "validator";
import * as hi from "react-icons/hi";
import Switch from "react-switch";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { storage } from "../Login/firebaseconfig";
import NewToast from "../UiComponents/NewToast";
import { UserContext } from "../Contexts/context";
import { serverUrl } from "../../config";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import NewCropModal from "../UiComponents/NewModal/NewCropModal";
import { useRouter } from "next/navigation";
import SelectImgModal from "./SelectImgModal";
import NewModal from "../UiComponents/NewModal/NewModal";
import { MdOutlineEdit } from "react-icons/md";
import { getCookie } from "../utils";
import ProModal from "../UiComponents/BottomComponents/ProModal";
import HoverComponent from "../UiComponents/HoverComponent/HoverComponent";

function BasicDetails({ profile, type, switchStates, homePageRef }) {
  const {
    updateCheckVariable,
    dummyState,
    setDummyState,
    userType,
    userFirstName,
    userLastName,
    userEmail,
    loading,
    userPhoneNumber,
    userPicture,
  } = useContext(UserContext);
  const [autodownload, setAutoDownload] = useState(false);
  const [mobileVisibility, setMobileVisibility] = useState(true);
  // console.log('Mobile visibility',mobileVisibility);
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [newmobileNumber, setnewMobileNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [description, setDescription] = useState("");
  const [profileimage, setProfileImage] = useState("");
  const [coverimage, setCoverImage] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("IN");
  const [selectedCode, setSelectedCode] = useState(91);
  const [selectedCountry2, setSelectedCountry2] = useState("IN");
  const [selectedCode2, setSelectedCode2] = useState(91);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [isWhatsappNumber, setIsWhatsappNumber] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);
  const [isUpdating, setIsUpdating] = useState(false);

  //functions for crop
  const [selectedImage, setSelectedImage] = useState();
  const [showCrop, setShowCrop] = useState(false);
  const [canvasWidth, setCanvasWidth] = useState(800);
  const [canvasHeight, setCanvasHeight] = useState(800);
  const [crop, setCrop] = useState();
  const [image, setImage] = useState();
  const [showModal, setShowModal] = useState(false);
  const { username } = useContext(UserContext);
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
  //               `${serverUrl}/connect/basicdetail/add/${profile}`,
  //               {
  //                 method: "POST",
  //                 headers: {
  //                   "Content-Type": "application/json",
  //                   Authorization: "Bearer " + getCookie("jwt_token"),
  //                 },
  //                 body: JSON.stringify({
  //                   type,
  //                   profile,
  //                   firstName,
  //                   lastName,
  //                   email,
  //                   selectedCode,
  //                   selectedCode2,
  //                   selectedCountry,
  //                   selectedCountry2,
  //                   mobileNumber,
  //                   isWhatsappNumber,
  //                   newmobileNumber,
  //                   companyName,
  //                   jobTitle,
  //                   description,
  //                   profileimage: downloadURL,
  //                   coverimage,
  //                   autodownload,
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
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
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

  const [basicDetails, setBasicDetails] = useState(null);
  const navigate = useRouter();
  const fetchData = async () => {
    const config = {
      headers: {
        Authorization: "Bearer " + getCookie("jwt_token"),
      },
    };
    try {
      const res = await axios.get(
        `${serverUrl}/connect/getDetail/${profile}/${type}`,
        config
      );
      if (res.data.length > 0) {
        setBasicDetails(res.data);
        setProfileImage(res.data[0].profileimage);
        setCoverImage(res.data[0].coverimage);
        setFirstName(res.data[0].firstName);
        setEmail(res.data[0].email);
        setLastName(res.data[0].lastName);
        setMobileNumber(res.data[0].mobileNumber);
        setIsWhatsappNumber(res.data[0].isWhatsappNumber);
        setSelectedCode(res.data[0].selectedCode);
        setSelectedCountry(res.data[0].selectedCountry);
        setAutoDownload(res.data[0].autodownload || false);
        setMobileVisibility(res.data[0].mobileVisibility || false);
        // console.log(res.data[0].mobileVisibility);
        
        if (res.data[0].newmobileNumber) {
          setnewMobileNumber(res.data[0].newmobileNumber);
          setSelectedCode2(res.data[0].selectedCode2);
          setSelectedCountry2(res.data[0].selectedCountry2);
          setAddMobileNew(true);
        }
        setCompanyName(res.data[0].companyName);
        setJobTitle(res.data[0].jobTitle);
        setDescription(res.data[0].description);
      }
    } catch (error) {
      //console.log(error);
      navigate.push("/login");
    }
  };
  const [addMobileNew, setAddMobileNew] = useState(false);

  function handleAdd() {
    setAddMobileNew(true);
  }

  useEffect(() => {
    setFirstName(userFirstName);
    setLastName(userLastName);
    setEmail(userEmail);
    setMobileNumber(userPhoneNumber);
    // setProfileImage(userPicture)
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (emailErrorMessage) {
      // //console.log(emailErrorMessage)
      return;
    }

    if (homePageRef && homePageRef.current) {
      homePageRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

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
          profileimage,
          coverimage,
          autodownload,
          mobileVisibility
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          //console.log(data.error);
        } else {
          setMessage("Basic detail saved successfully");
          setShowMessage(true);
          setTimeout(() => {
            setShowMessage(false);
          }, 3000);
          setDummyState(!dummyState);
        }
      });
    updateCheckVariable();

    // const data = { mobileNumber: mobileNumber };
    // const updateProgressUrl = `${serverUrl}/tapopuser/tapopuser/update-mobile/${username}`;
    // axios
    //   .patch(updateProgressUrl, data)
    //   .then((response) => {

    //   })
    //   .catch((error) => {
    //     console.error("Error updating progress:", error);
    //   });
  };
  const [errorMessage2, setErrorMessage2] = useState("");
  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [lastNameErrorMessage, setLastNameErrorMessage] = useState("");
  const [newCode, setNewCode] = useState(" ");

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
  const handlePhoneNumberChange = (event) => {
    const newPhoneNumber = event.target.value;
    const numericRegex = /^[0-9]*$/;

    if (numericRegex.test(newPhoneNumber)) {
      setMobileNumber(event.target.value);
      setErrorMessage("");
    } else {
      setErrorMessage("Please enter a valid value");
    }
  };
  const handlePhoneNumberChange2 = (event) => {
    const newPhoneNumber = event.target.value;
    const numericRegex = /^[0-9]*$/;

    if (numericRegex.test(newPhoneNumber)) {
      setnewMobileNumber(event.target.value);
      setErrorMessage2("");
    } else {
      setErrorMessage2("Please enter a valid value");
    }
  };
  // const [description, setDescription] = useState('');
  const [descriptionErrorMessage, setDescriptionErrorMessage] = useState("");

  const handleDescriptionChange = (event) => {
    const inputValue = event.target.value;

    setDescription(inputValue);
    if (inputValue.length <= 250) {
      setDescriptionErrorMessage("");
    } else {
      setDescriptionErrorMessage(
        "Description should not exceed 250 characters"
      );
    }
  };

  const [emailErrorMessage, setEmailErrorMessage] = useState("");

  const handleEmailChange = (event) => {
    // setEmail(event.target.value);
    const inputValue = event.target.value;
    // const emailRegex =
    //   /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    // if (emailRegex.test(inputValue) || inputValue === "") {
    //   setEmail(event.target.value);
    //   setEmailErrorMessage("");
    // } else {
    //   setEmailErrorMessage("Please enter a valid email address");
    // }
    if (!validator.isEmail(inputValue)) {
      setEmailErrorMessage("Please, enter a valid email!");
    } else {
      setEmailErrorMessage("");
    }
    setEmail(inputValue);
  };

  const renderFlag = () => {
    const CountryFlag = flags[selectedCountry];
    return (
      <CountryFlag className="react-phone-number-input__icon h-[18px] w-[36px]" />
    );
  };
  const renderFlag2 = () => {
    const CountryFlag = flags[selectedCountry2];
    return (
      <CountryFlag className="react-phone-number-input__icon h-[18px] w-[36px]" />
    );
  };

  const handleCodeChange = (country) => {
    setSelectedCountry(country.isoCode);
    setSelectedCode(getCountryCallingCode(country.isoCode));
  };
  const handleCodeChange2 = (country) => {
    setSelectedCountry2(country.isoCode);
    setSelectedCode2(getCountryCallingCode(country.isoCode));
  };

  // save image without crop ------------

  const [showDiv, setShowDiv] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "x") {
        setShowDiv(true);

        setTimeout(() => {
          setShowDiv(false);
        }, 2000);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

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
                  profileimage: downloadURL,
                  coverimage,
                  autodownload,
                }),
              }
            )
              .then((res) => res.json())
              .then((data) => {
                if (data.error) {
                  //console.log(data.error);
                } else {
                  setMessage("Profile image saved successfully");
                  setShowMessage(true);
                  setIsLoading(false);
                  setTimeout(() => {
                    setShowMessage(false);
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

  const [showTypeModal, setShowTypeModal] = useState(false);
  const [showGif, setShowGif] = useState(false);

  const handleEscPress = (event) => {
    if (event.key === "Escape") {
      setShowTypeModal(false);
      setShowGif(false);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleEscPress);

    return () => {
      window.removeEventListener("keydown", handleEscPress);
    };
  }, []);

  const [isHovering, setIsHovering] = useState(false);
  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };
  const [isMobHovering, setIsMobHovering] = useState(false);
  const handleMouseOverOnMob = () => {
    setIsMobHovering(true);
  };

  const handleMouseOutOnMob = () => {
    setIsMobHovering(false);
  };

  const handleAutoDownloadToggle = async () => {
    setIsUpdating(true);
    const newAutoDownloadState = !autodownload;

    try {
      const response = await axios.post(
        `${serverUrl}/connect/basicdetail/add/${profile}`,
        {
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
          profileimage,
          coverimage,
          autodownload: newAutoDownloadState,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getCookie("jwt_token"),
          },
        }
      );

      if (response.data.error) {
        throw new Error(response.data.error);
      }

      setAutoDownload(newAutoDownloadState);
      setMessage("Auto Download setting updated successfully");
      setShowMessage(true);
    } catch (error) {
      console.error("Error updating Auto Download setting:", error);
      setMessage("Failed to update Auto Download setting. Please try again.");
      setShowMessage(true);
    } finally {
      setIsUpdating(false);
      setTimeout(() => setShowMessage(false), 3000);
    }
  };
  const handleMobileToggle = async () => {
    setIsUpdating(true);
    const newMobileVisibilityState = !mobileVisibility;
    // console.log(newMobileVisibilityState);
    
    try {
      const response = await axios.post(
        `${serverUrl}/connect/basicdetail/add/${profile}`,
        {
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
          profileimage,
          coverimage,
          autodownload,
          mobileVisibility : newMobileVisibilityState
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getCookie("jwt_token"),
          },
        }
      );
      
//  console.log(response);
 
      if (response.data.error) {
        throw new Error(response.data.error);
      }

      setMobileVisibility(newMobileVisibilityState);
      setMessage(
        newMobileVisibilityState
          ? "Phone Number will be hidden in profile"
          : "Phone Number will be visible in profile"
      );
      
      // setMessage("Auto Download setting updated successfully");
     
    
      setShowMessage(true);
    } catch (error) {
      console.error("Error updating Auto Download setting:", error);
      setMessage("Failed to update Auto Download setting. Please try again.");
      setShowMessage(true);
    } finally {
      setIsUpdating(false);
      setTimeout(() => setShowMessage(false), 3000);
    }
  };

  return (
    <div className="w-full px-[1.25rem] pt-[1.5rem] sm:p-[1.5rem] pb-[50px]">
      <form>
        <label className="text-[1rem] sm:text-[1.125rem]  sm:mt-[1.5rem] font-[600]">
          Basic Details
        </label>

        <div className="relative add-profile-image-icon flex flex-col-reverse gap-3 justify-center items-center my-4">
          <div className="flex flex-col w-full my-[1.5rem]">
            <label className="label-field">Auto Download Contact</label>
            <div
              className="w-full justify-between flex items-center gap-7 px-3 md:px-4 py-3 rounded-l-[8px]"
              style={{ background: "#FAFAFA" }}
            >
              <div className="flex items-center gap-2">
                <p className="font-light s-color text-sm md:text-base">
                  Enable Auto Download
                </p>
                <div
                  className="s-color"
                  onMouseOver={handleMouseOver}
                  onMouseLeave={handleMouseOut}
                  style={{ cursor: "pointer" }}
                >
                  <hi.HiOutlineInformationCircle />
                  {isHovering && (
                    <div className="absolute left-0 top-0">
                      <HoverComponent
                        label="Auto Download"
                        text="Allow auto download contact details using your subdomain"
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center">
                <Switch
                  checked={autodownload}
                  onChange={handleAutoDownloadToggle}
                  onColor="#12A26E"
                  offColor="#A7A7A7"
                  checkedIcon={false}
                  uncheckedIcon={false}
                  height={24}
                  width={44}
                  disabled={isUpdating}
                />
              </div>
            </div>

            <label className="label-field mt-[20px]">
              Mobile Number Visibility
            </label>
            <div
              className="relative w-full justify-between flex items-center gap-7 px-3 md:px-4 py-3 rounded-l-[8px]"
              style={{ background: "#FAFAFA" }}
            >
              <div className="flex items-center gap-2">
                <p className="font-light s-color text-sm md:text-base">
                  Hide Mobile Number
                </p>
                <div
                  className="s-color "
                  onMouseOver={handleMouseOverOnMob}
                  onMouseLeave={handleMouseOutOnMob}
                  style={{ cursor: "pointer" }}
                >
                  <hi.HiOutlineInformationCircle />
                </div>
                {isMobHovering && (
                  <div className="absolute left-0 top-0 flex flex-col">
                    <HoverComponent
                      label="Mobile Number Visibility"
                      text="Show or Hide Mobile Number on Your Qviq Profile"
                    />
                  </div>
                )}
              </div>

              <div className="flex items-center">
                <Switch
                  checked={mobileVisibility}
                  onChange={handleMobileToggle}
                  onColor="#12A26E"
                  offColor="#A7A7A7"
                  checkedIcon={false}
                  uncheckedIcon={false}
                  height={24}
                  width={44}
                  disabled={isUpdating}
                />
              </div>
            </div>
          </div>

          <button
            className="flex justify-center items-center  text-sm gap-1"
            type="button"
            onClick={() => setShowTypeModal(true)}
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

            <MdOutlineEdit className="text-[18px] text-[#E40849]" />
            <p className="add-icon">Edit profile picture</p>
          </button>

          {isLoading ? (
            <div className="flex flex-col justify-center  relative items-center w-[6rem] h-[6rem] xsm:w-[8rem] xsm:h-[8rem] rounded-full">
              <img
                src={require("../Image/Tapop logo black.png").default.src}
                alt=""
                className="w-[6rem]  h-[6rem]"
              />
              <div className="absolute top-0 backdrop-blur-sm flex justify-center items-center">
                <LoadingAnimation />
              </div>
            </div>
          ) : (
            <img
              className="w-[6rem] h-[6rem] xsm:w-[8rem] xsm:h-[8rem] object-cover rounded-full"
              src={
                profileimage
                  ? profileimage
                  : require("../ProfileTemplates/images/image1.jpg").default.src
              }
              alt="profileimage"
            ></img>
          )}
        </div>

        <div className="basic-details-form flex flex-col justify-center">
          <div className="flex justify-center flex-col">
            <div className="flex flex-col justify-center sm:grid sm:grid-cols-2 sm:gap-x-[32px] gap-y-[32px] sm:gap-y-[48px] w-full">
              <div className="w-full">
                <InputField
                  width={"100%"}
                  height={40}
                  label="First Name"
                  type="text"
                  value={firstName}
                  onChange={handleNameChange}
                />

                {nameErrorMessage && (
                  <p className="text-[#FE7171] mt-[8px] ml-[10px]">
                    {nameErrorMessage}
                  </p>
                )}
              </div>

              <div className="w-full">
                <div className="flex flex-col">
                  <InputField
                    width={"100%"}
                    height={40}
                    label="Last Name"
                    type="text"
                    value={lastName}
                    onChange={handleLastNameChange}
                  />
                  {lastNameErrorMessage && (
                    <p className="text-[#FE7171] mt-[8px] ml-[10px]">
                      {lastNameErrorMessage}
                    </p>
                  )}
                </div>
              </div>

              <div className={`flex flex-col w-full`}>
                <label className="pb-[0.25em]">Mobile Number ( Whatsapp Number )</label>
                <div className="mobile-number-div w-full flex flex-col">
                  <MobileNumberField
                    mobileNumber={mobileNumber}
                    setMobileNumber={setMobileNumber}
                    handlePhoneNumberChange={handlePhoneNumberChange}
                    codeChange={handleCodeChange}
                    flagChange={renderFlag}
                    code={selectedCode}
                    // setSelectedCode={setSelectedCode}
                    country={selectedCountry}
                    setSelectedCountry={setSelectedCountry}
                  />
                </div>
                {/* <div className="m-1 flex justify-evenly items-center w-fit gap-2 text-sm">
                  <input className="w-[10px]" type="checkbox" value={isWhatsappNumber} onChange={(e)=>setIsWhatsappNumber(e.target.checked)}/>
                  <p>This is my whatsapp number</p>
                </div> */}
                {errorMessage && (
                  <div className="error-message text-[#FE7171] mt-[8px] text-[14px] ml-[10px]">
                    {errorMessage}
                  </div>
                )}
                {!addMobileNew && (
                  <button
                    type="button"
                    onClick={() => {
                      handleAdd();
                    }}
                    disabled={userType !== "Pro"}
                    style={{ cursor: "pointer" }}
                    className="flex items-center self-end gap-[8px] m-[8px] w-fit"
                  >
                    {/* <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.33337 12.6663H14.6667V13.9997H1.33337V12.6663ZM1.33337 3.33301L4.66671 5.33301L8.00004 1.33301L11.3334 5.33301L14.6667 3.33301V11.333H1.33337V3.33301Z"
                        fill="#E7AA0C"
                      />
                    </svg> */}
                    {!loading && userType != "Pro" && (
                      <button
                        // onClick={setShowModal}
                        type="button"
                        className="pro-tag-large text-white font-medium rounded-full hover:cursor-default"
                      >
                        Pro
                      </button>
                    )}

                    <p className="text-[#FE7171] font-[500] text-[14px] leading-[22px]">
                      Add New Phone
                    </p>
                  </button>
                )}
              </div>
              {addMobileNew && (
                <div className="flex gap-[10px]">
                  <div className={`flex  flex-col w-full  `}>
                    <label className="pb-[0.25em]">Mobile Number</label>
                    <div className="mobile-number-div w-full">
                      <MobileNumberField
                        mobileNumber={newmobileNumber}
                        setMobileNumber={setnewMobileNumber}
                        handlePhoneNumberChange={handlePhoneNumberChange2}
                        codeChange={handleCodeChange2}
                        flagChange={renderFlag2}
                        // placeholder = {`${errorMessage2 && errorMessage2}`}
                        // placeHolderColor = "placeholder-red-400"
                        code={selectedCode2}
                        // selectedCode={selectedCode2}
                        country={selectedCountry2}
                        setSelectedCountry={setSelectedCountry2}
                      />
                    </div>
                    {errorMessage2 && (
                      <div
                        className={`error-message text-[#FE7171] mt-[8px] text-[14px] ml-[10px]`}
                      >
                        {errorMessage2}
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setAddMobileNew(false);
                      setnewMobileNumber("");
                    }}
                    className={` ${
                      errorMessage2 ? "mt-[-5px]" : "mt-[20px]"
                    } add-icon font-[500] text-[14px]`}
                  >
                    Delete
                  </button>
                </div>
              )}

              <div className="w-full">
                <div className={`flex flex-col`}>
                  <InputField
                    width={"100%"}
                    height={40}
                    label="Email"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                  />

                  {emailErrorMessage && (
                    <div className="text-[#FE7171] mt-[8px] text-[14px] ml-[10px]">
                      {emailErrorMessage}
                    </div>
                  )}
                </div>
              </div>

              <div className="w-full">
                <InputField
                  width={"100%"}
                  height={40}
                  label="Company Name"
                  type="text"
                  value={companyName}
                  onChange={(event) => setCompanyName(event.target.value)}
                />
              </div>
              <div className="w-full">
                <InputField
                  width={"100%"}
                  height={40}
                  label="Job Title"
                  type="text"
                  value={jobTitle}
                  onChange={(event) => setJobTitle(event.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col w-full mt-[2rem]">
              <label>Description</label>
              <textarea
                value={description}
                rows="5"
                cols=""
                name={description}
                className="sm:w-full rounded-lg ip-textarea"
                onChange={handleDescriptionChange}
              />
              {descriptionErrorMessage && (
                <p className="text-[#FE7171] mt-[8px] ml-[10px]">
                  {descriptionErrorMessage}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-center sm:justify-end mt-[2rem] mb-[4.5rem] gap-[1rem]">
            <TertiaryButton width={152} text="Cancel" />
            <PrimaryButton2
              width={152}
              isDisabled={description.length > 250}
              onClick={handleSubmit}
              text="Save"
              type="button"
            />
          </div>
        </div>

        {/* <Button
          style={{ float: "right" }}
          hidden
          type="submit"
          onClick={handleSubmit}
        >
          Save
        </Button>

         {/* <ToastContainer /> */}
        {/* <ToastContainer /> */}
      </form>
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
              {showDiv && (
                <div className="w-full flex flex-row justify-start">
                  <button
                    className="border-[1px] rounded-full py-[12px] px-[24px] hover:bg-gray-100"
                    onClick={saveOriginal}
                  >
                    Save
                  </button>
                </div>
              )}
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
      {showModal && (
        <ProModal
          profile={profile}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
}

export default BasicDetails;
