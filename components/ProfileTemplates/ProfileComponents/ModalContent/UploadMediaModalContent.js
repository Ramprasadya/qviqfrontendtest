import React, { useEffect, useRef, useState, useContext } from "react";
import CustomButton from "../Button/CustomButton";
import Button from "../Button/Button";
import NewCarousel from "./NewCarousel";
import PrimaryButton2 from "@/components/UiComponents/PrimaryButton2";
import PrimaryButton from "@/components/UiComponents/PrimaryButton";
import PrimaryButton3 from "@/components/UiComponents/PrimaryButton3";
import TertiaryButton from "@/components/UiComponents/TertiaryButton";
import InputField from "@/components/UiComponents/InputField";
import deleteIcon from "./delete-bin-2-line.svg";
import { useRouter } from "next/navigation";
import LoadingAnimation from "@/components/UiComponents/Loading/LoadingAnimation";
import { IoCloseOutline } from "react-icons/io5";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { serverUrl } from "@/config";
import { UserContext } from "@/components/Contexts/context";
import axios from "axios";
import { HiXCircle } from "react-icons/hi";
import { storage } from "@/components/Login/firebaseconfig";
import Video from "@/components/UiComponents/ModalSidebarBasic/Video/Video";
import Image from "next/image";
import { getCookie } from "@/components/utils";

export default function UploadMediaModalContent(props) {
  const [customData, setCustomData] = useState(props.customData);
  const allowedFiles = props.starter ? 2 : 1;
  const allowedPhotos = props.pro ? 50 : props.starter ? 15 : 4;

  // state for opening new modal

  const [newModal, setNewModal] = useState(false);
  const handleModal = () => {
    setNewModal((prev) => !prev);
  };
  // state for file field
  const [fileName, setFileName] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedImageFiles, setSelectedImageFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  // removing files from fileArray
  const removeFile = (index) => {
    const updatedFileNames = [...fileName];
    updatedFileNames.splice(index, 1);
    setFileName(updatedFileNames);
    const updatedFileNames1 = [...selectedFiles];
    updatedFileNames1.splice(index, 1);
    setSelectedFiles(updatedFileNames1);
  };
  // mapping array for files
  // const mArray = fileName.map((item) => (
  //   <div className="upload-content rounded-full">
  //     <p>{item.name}</p>
  //     <span onClick={removeFile}>{item.icon}</span>
  //   </div>
  // ));

  /////////////////////////////////////////////////////////////////////////////
  // state for image input field
  const [imageName, setImageName] = useState([]);

  // variable to store whether save button should be disabled or not
  let isDisabled =
    (props.pro && imageName.length > 50) ||
    (props.starter && (imageName.length > 15 || fileName.length > 2)) ||
    (props.basic && (imageName.length > 4 || fileName.length > 1)) ||
    (imageName.length === 0 && fileName.length === 0);

  // removing files from fileArray
  const removeImage = (index) => {
    const updatedImageNames1 = [...imageName];
    updatedImageNames1.splice(index, 1);
    setImageName(updatedImageNames1);
    const updatedImageNames = [...selectedImageFiles];
    updatedImageNames.splice(index, 1);
    setSelectedImageFiles(updatedImageNames);
  };

  // mapping array for files
  // const iArray = imageName.map((item) => (
  //   <div className="upload-content rounded-full">
  //     <p>{item.name}</p>
  //     <span onClick={removeImage}>
  //       <HiXCircle />
  //     </span>
  //   </div>
  // ));

  const [dummyState, setDummyState] = useState(0);

  // const fetchcustom = async (data) => {
  //   if (data.length > 0) {
  //     setReadOnly([]);
  //     setEditLable([]);
  //     setEditUrl([]);
  //     for (let i = 0; i < data.length; i++) {
  //       setReadOnly((prev) => [...prev, true]);
  //       setEditLable((prev) => [...prev, data[i].label]);
  //       setEditUrl((prev) => [...prev, data[i].websiteUrl]);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   fetchcustom(customData);
  // }, []);

  const [pdfData, setpdfData] = useState([]);
  const config = {
    headers: {
      Authorization: "Bearer " + getCookie("jwt_token"),
    },
  };
  const fetchpdf = async () => {
    const { data } = await axios.get(
      `${serverUrl}/record/pdf/${props.profile}/${props.type}`,
      config
    );
    setpdfData(data);
  };
  const [imgData, setimgData] = useState([]);
  const fetchimg = async () => {
    const { data } = await axios.get(
      `${serverUrl}/record/img/${props.profile}/${props.type}`,
      config
    );
    setimgData(data);
    // console.log(data)
  };
  useEffect(() => {
    fetchpdf();
    fetchimg();
  }, [dummyState]);

  // gives favicon url
  const getImgUrl = (item) => {
    if (item !== undefined) {
      if (!item.startsWith("http://") && !item.startsWith("https://")) {
        item = "https://" + item;
      }
      let url = `https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${item}&size=256`;
      return url;
    }
  };

  async function uploadimg(image) {
    const imageRef = ref(storage, `/images/${image.name}`);
    try {
      const snapshot = await uploadBytes(imageRef, image);
      const downloadURL = await getDownloadURL(snapshot.ref);

      // Once image is uploaded, get the download URL

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + getCookie("jwt_token"),
        },
      };

      var formData = new FormData();
      formData.append("header", "img");
      formData.append("name", props.profile);
      formData.append("type", props.type);
      formData.append("image", downloadURL); // Use the download URL obtained from Firebase
      const res = axios.put(
        `${serverUrl}/record/record/addimg/${props.profile}`,
        formData,
        config
      );

      props.setDummyState((prevState) => prevState + 1);
      // props.toggleModal();
    } catch (err) {
      console.error("Error getting download URL from Firebase", err);
    }

    setLoading(false);
  }

  async function uploadpdf(docs) {
    const docRef = ref(storage, `/images/${docs.name}`);

    try {
      const snapshot = await uploadBytes(docRef, docs);

      const downloadURL = await getDownloadURL(snapshot.ref);

      // Once image is uploaded, get the download URL

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + getCookie("jwt_token"),
        },
      };
      var formData1 = new FormData();
      formData1.append("header", "pdf");
      formData1.append("pdfname", docs.name);
      formData1.append("name", props.profile);
      formData1.append("docs", downloadURL); // Use the download URL obtained from Firebase
      formData1.append("type", props.type);
      const res1 = axios.put(
        `${serverUrl}/record/record/addpdf/${props.profile}`,
        formData1,
        config
      );
      setLoading(false);
      props.setDummyState((prevState) => prevState + 1);
      // props.toggleModal();
    } catch (error) {
      console.error(error);
    }
  }

  async function handleContent() {
    const files = selectedImageFiles;
    const docfiles = selectedFiles;

    // Image

    if (files.length > 0) {
      let uploadPromises = [];

      if (
        props.pro ||
        (props.starter && imgData.length + files.length <= 15) ||
        imgData.length + files.length <= 4
      ) {
        uploadPromises = files.map((file) => uploadimg(file));
        try {
          setLoading(true);
          await Promise.all(uploadPromises);
          setLoading(false);
          props.setDummyState((prevState) => prevState + 1);
          // console.log("uploaded");
        } catch (error) {
          console.error(error);
        }
      } else {
        alert("not a pro user");
        return;
      }
      setDummyState((prevState) => prevState + 1);
    }

    // Doc

    if (docfiles.length > 0) {
      let uploadPromises = [];
      if (
        props.pro ||
        (props.starter && pdfData.length + docfiles.length <= 2) ||
        pdfData.length + docfiles.length <= 1
      ) {
        uploadPromises = docfiles.map((file) => uploadpdf(file));
        try {
          setLoading(true);
          await Promise.all(uploadPromises);
          setLoading(false);
          setDummyState((prevState) => prevState + 1);
        } catch (error) {
          console.error("Error uploading files:", error);
        }
      } else {
        alert("Not a pro user");
      }
    }

    // if (files.length > 0 || docfiles.length > 0) {
    //   // setLoading(true);
    //   // setTimeout(() => {
    //   //   setLoading(false);
    //   //   props.setDummyState((prevState) => prevState + 1);
    //   //   props.toggleModal();
    //   // }, 5000);
    // } else {
    // }
    setTimeout(() => {
      props.toggleModal();
    }, 100);
    return null;
  }

  const inputRef = useRef(null);
  const inputRefImage = useRef(null);
  const [count, setCount] = useState(0);
  const [sectionData, setSectionData] = useState([]);

  const handleNewLabelChange = (event, index) => {
    const updatedSectionData = [...sectionData];
    updatedSectionData[index].label = event.target.value;
    setSectionData(updatedSectionData);
  };
  const handleNewWebsiteUrlChange = (event, index) => {
    const updatedSectionData = [...sectionData];
    updatedSectionData[index].websiteUrl = event.target.value;
    setSectionData(updatedSectionData);
  };

  const handleSectionDelete = (index) => {
    const updatedSectionData = [...sectionData];
    updatedSectionData.splice(index, 1);
    setSectionData(updatedSectionData);
    setCount(count - 1);
  };

  const handleSaveNewSection = async (index) => {
    const section = sectionData[index];
    const formData1 = new FormData();
    formData1.append("header", "custom");

    // Check if the websiteUrl starts with "http://" or "https://"
    if (
      !section.websiteUrl.startsWith("http://") &&
      !section.websiteUrl.startsWith("https://")
    ) {
      section.websiteUrl = "https://" + section.websiteUrl;
    }
    formData1.append("websiteUrl", section.websiteUrl);
    formData1.append("name", props.profile);
    formData1.append("label", section.label);
    formData1.append("type", props.type);

    const res1 = await axios.put(
      `${serverUrl}/record/record/addcustomlink`,
      formData1
    );

    const sectionwithid = { ...section, _id: res1.data.insertedId };
    const newData = [...customData, sectionwithid];
    setCustomData(newData);
    fetchcustom(newData);

    props.setDummyState((prevState) => prevState + 1);
    setDummyState((prevState) => prevState + 1);
    handleSectionDelete(index);
  };

  const rendersectionRef = useRef(null);

  const renderSections = () => {
    return sectionData.map((section, index) => (
      <div
        className="flex flex-col md:flex-row md:items-center md:gap-4 px-2 xsm:px-4 py-4 rounded-xl"
        style={{ boxShadow: "0px 2px 8px 1px rgba(171, 181, 217, 0.14)" }}
        key={index}
      >
        <div className="w-full md:w-12 md:min-w-[40px] md:max-w-[40px] md:h-10 flex justify-center mb-4 md:mb-0">
          <img
            src={getImgUrl(section.websiteUrl)}
            alt="social-logo"
            className="w-10 h-10 rounded-full"
          />
        </div>
        <div className="mb-8 md:mb-0 md:w-full">
          <InputField
            label="Link Label *"
            width="100%"
            height="40px"
            border={
              section.label === "" ? "1px solid red" : "1px solid #DFDBD8"
            }
            value={section.label}
            onChange={(event) => {
              handleNewLabelChange(event, index);
            }}
          />
        </div>
        <div className="mb-8 md:mb-0 md:w-full">
          <InputField
            label="Link/ URL *"
            type={props.type}
            id="websiteUrl"
            name="websiteUrl"
            border={
              section.websiteUrl === "" ? "1px solid red" : "1px solid #DFDBD8"
            }
            value={section.websiteUrl}
            onChange={(event) => {
              handleNewWebsiteUrlChange(event, index);
            }}
            width="100%"
            height="40px"
          />
        </div>
        <div className="flex justify-between items-center gap-4 md:ms-auto">
          <span
            className="text-xl min-w-[40px] min-h-[40px] flex justify-center items-center rounded-full bg-[#FAFAFA] text-[#817C7C] hover:text-[#5a5656] hover:cursor-pointer"
            style={{ padding: "0" }}
            onClick={() => {
              handleSectionDelete(index);
            }}
          >
            <HiOutlineTrash />
          </span>
          <div className="w-full max-w-[250px] md:w-[90px]">
            <SecondaryButton
              onClick={() => {
                section.label !== "" &&
                  section.websiteUrl !== "" &&
                  handleSaveNewSection(index);
              }}
              text="Save"
              width={"100%"}
            />
          </div>
        </div>
      </div>
    ));
  };

  const [showPro, setShowPro] = useState(true);
  const setShowProFunc = () => {
    if (sectionData.length) {
      setShowPro(false);
    } else {
      if (props.basic && sectionData.length + customData.length >= 1) {
        setShowPro(true);
      } else if (props.starter && sectionData.length + customData.length >= 2) {
        setShowPro(true);
      } else {
        setShowPro(false);
      }
    }
  };

  useEffect(() => {
    setShowProFunc();
  }, [sectionData, customData]);

  const { username } = useContext(UserContext);
  const navigate = useRouter();

  // checking if user is pro && length of user input

  const [imgArray, setImgArray] = useState([]);
  const [pdfArray, setPdfArray] = useState([]);

  const fetchRecords = async () => {
    const { data } = await axios.get(
      `${serverUrl}/record/contentData/${props.profile}/${props.type}`,
      config
    );

    setImgArray(data.img);
    setPdfArray(data.pdf);
  };

  useEffect(() => {
    fetchRecords();
  }, [dummyState]);

  const [buttonType, setButtonType] = useState("Images");

  const handleRadioChange = (event) => {
    setButtonType(event.target.value);
  };

  const renderedImages =
    imageName &&
    imageName.map((imageUrl, index) => (
      <div
        className="relative w-full flex flex-row items-center rounded-[12px] p-[10px]"
        style={{ boxShadow: "3px 3px 10px rgba(167, 167, 167, 0.14)" }}
      >
        <img
          key={index}
          className="w-[62px] h-[48px] rounded-[8px] object-cover"
          src={imageUrl}
          alt={`Image ${index + 1}`}
        />
        {/* {console.log(imageUrl)} */}
        <div className="p-4 flex flex-col gap-1">
          <div className="text-[14px] font-normal text-[#1A1A1A]">
            Media_image.png
          </div>
          <div className="text-[12px] font-normal">100KB</div>
        </div>
        <span
          className="cursor-pointer absolute right-0 w-[32px] h-[32px] mr-[10px] bg-[#FAFAFA] flex flex-col justify-center items-center rounded-full"
          onClick={() => removeImage(index)}
        >
          <IoCloseOutline />
        </span>
      </div>
    ));

  // display the doc size in KB/MB
  function checkSize(size) {
    const kbThreshold = 1024;
    const mbThreshold = 1024 * 1024;

    if (size < kbThreshold) {
      return `${Math.round(size, 0)} bytes`;
    } else if (size < mbThreshold) {
      const sizeInKB = Math.round(size / 1024, 0);
      return `${sizeInKB} KB`;
    } else {
      const sizeInMB = Math.round(size / (1024 * 1024), 0);
      return `${sizeInMB} MB`;
    }
  }

  // limit the word size
  const limitWord = (word, limit) => {
    if (word !== null && word !== undefined && word !== "") {
      if (word.length > limit) {
        return word.slice(0, limit) + "...";
      } else {
        return word;
      }
    }
  };

  const renderPdf =
    fileName &&
    fileName.map((off, index) => (
      <div
        className="relative w-full flex flex-row items-center rounded-[12px] p-[10px]"
        style={{ boxShadow: "3px 3px 10px rgba(167, 167, 167, 0.14)" }}
      >
        <Image
          key={index}
          className="w-[48px] h-[48px] rounded-[8px] object-cover"
          src={require(`../../../Logos/FileFormatLogos/${off.name
            .split(".")
            .pop()}.png`)}
          alt="Logos"
        />
        {/* {console.log(off.split(".").pop())} */}
        {/* {console.log(off)} */}
        <div className="p-4 flex flex-col gap-1">
          <div className="text-[14px] text-[#1A1A1A] font-normal">
            {limitWord(off.name, 15)}
          </div>
          <div className="text-[12px] font-normal">{checkSize(off.size)}</div>
        </div>
        <span
          className="cursor-pointer absolute right-0 w-[32px] h-[32px] mr-[10px] bg-[#FAFAFA] flex flex-col justify-center items-center rounded-full"
          onClick={() => removeFile(index)}
        >
          <IoCloseOutline />
        </span>
      </div>
    ));

  return (
    <div className=" mt-[24px] h-[90%] max-h-[70vh] overflow-y-scroll">
      <p className="text-[14px] font-medium">
        Upload image gallery or documents
      </p>
      <div>
        <div className="flex flex-row gap-[43px] mt-[4px]">
          <div
            className={`flex flex-row items-center gap-[10px] py-[10px] pl-[15px] pr-[20px] rounded-full ${
              buttonType === "Images" && "bg-[#FAFAFA]"
            }`}
          >
            <input
              className="accent-black"
              type="radio"
              id="Images"
              name="linkType"
              value="Images"
              checked={buttonType === "Images"}
              onChange={handleRadioChange}
            />
            <label
              htmlFor="Images"
              className={
                buttonType === "Images" ? "font-semibold" : "font-medium"
              }
            >
              Images
            </label>
          </div>
          <div
            className={`flex flex-row items-center gap-[10px] py-[10px] pl-[15px] pr-[20px] rounded-full ${
              buttonType === "Documents" && "bg-[#FAFAFA]"
            }`}
          >
            <input
              className="accent-black"
              type="radio"
              id="Documents"
              name="linkType"
              value="Documents"
              checked={buttonType === "Documents"}
              onChange={handleRadioChange}
            />
            <label
              htmlFor="Documents"
              className={
                buttonType === "Documents" ? "font-semibold" : "font-medium"
              }
            >
              Documents
            </label>
          </div>
          <div
            className={`flex flex-row items-center gap-[10px] py-[10px] pl-[15px] pr-[20px] rounded-full ${
              buttonType === "Video" && "bg-[#FAFAFA]"
            }`}
          >
            {/* <input
              type="radio"
              id="Video"
              name="Video"
              value="Video"
              checked={buttonType === "Video"}
              onChange={handleRadioChange}
            />
            <label htmlFor="Video">Video</label> */}
          </div>
        </div>
        {buttonType === "Images" && (
          <>
            {loading ? (
              <div className="flex flex-col justify-center items-center gap-5 relative border-dotted border-2 p-6 rounded-8px w-full h-[106px]">
                <img
                  src={
                    require("../../../../components/Image/Tapop logo black.png")
                      .default.src
                  }
                  alt=""
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
              <>
                <div className="flex justify-between mt-[32px] mb-[10px]">
                  <h1 className="font-medium text-[14px]">Images</h1>
                  {(!props.pro && !props.starter && imgArray.length >= 4) ||
                    (!props.pro && props.starter && imgArray.length >= 15 && (
                      <ProtagLarge />
                    ))}
                </div>

                {/* image input-1 starts here  */}
                <div
                  className="add-image"
                  // onClick={() => document.querySelector(".file-input").click()}
                  onClick={() => inputRefImage.current.click()}
                  style={
                    (!props.pro && !props.starter && imgArray.length >= 4) ||
                    (!props.pro && props.starter && imgArray.length >= 15)
                      ? { cursor: "not-allowed" }
                      : { cursor: "pointer" }
                  }
                >
                  <input
                    type="file"
                    disabled={
                      (!props.pro && !props.starter && imgArray.length >= 4) ||
                      (!props.pro && props.starter && imgArray.length >= 15)
                        ? true
                        : false
                    }
                    onChange={(e) => {
                      setLoading(true);
                      const files = Array.from(e.target.files);
                      const imageUrls = files.map((file) =>
                        URL.createObjectURL(file)
                      );
                      setImageName((prevSelectedFiles) => [
                        ...prevSelectedFiles,
                        ...imageUrls,
                      ]);
                      setSelectedImageFiles((prevSelectedFiles) => [
                        ...prevSelectedFiles,
                        ...files,
                      ]);
                      setLoading(false);
                    }}
                    accept="image/png, image/gif, image/jpeg"
                    ref={inputRefImage}
                    className="file-input"
                    multiple
                    id="imageInput"
                    onFocus={(e) => (e.target.value = null)}
                    hidden
                  />

                  <div
                    className="flex flex-col items-center"
                    style={
                      (!props.pro && !props.starter && imgArray.length >= 4) ||
                      (!props.pro && props.starter && imgArray.length >= 15)
                        ? { opacity: "50%" }
                        : { opacity: "100%" }
                    }
                  >
                    <img
                      className=""
                      src={
                        require("../../../UiComponents/BottomComponents/ModuleTabs/ProductsAndServices/Button-Icon.png")
                          .default.src
                      }
                      alt=" "
                    />
                    <p className="image-text font-normal text-[14px] text mt-2">
                      Upload or Drag & drop images to <br /> create a carousel
                    </p>
                  </div>
                </div>
                <p className="pt-2 text-xs md:text-sm text-[#817C7C] font-medium">
                  Supports .PNG, .JPG, & .JPEG file- up to 800KB 
                  <span className="text-sm text-[#817c7c]">
                    {!props.pro && `| ${allowedPhotos} images allowed`}
                  </span>
                </p>
                <div className="flex items-center gap-[16px] mt-[24px] flex-wrap">
                  {renderedImages}
                </div>
              </>
            )}
          </>
        )}

        {buttonType === "Documents" && (
          <>
            {loading ? (
              <div className="flex flex-col justify-center items-center gap-5 relative border-dotted border-2 p-6 rounded-8px w-full h-[106px]">
                <img
                  src={
                    require("../../../../components/Image/Tapop logo black.png")
                      .default.src
                  }
                  alt=""
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
              <>
                <div className="flex justify-between mt-[32px] mb-[10px]">
                  <h1 className="font-medium text-[14px]">Documents</h1>

                  {(!props.pro && !props.starter && pdfArray.length >= 1) ||
                    (!props.pro && props.starter && pdfArray.length >= 2 && (
                      <ProtagLarge />
                    ))}
                </div>

                {/* file input-1 starts here  */}
                <div
                  className="add-image min-h-fit"
                  // onClick={() => document.querySelector(".file-input").click()}
                  onClick={() => inputRef.current.click()}
                  style={
                    (!props.pro && !props.starter && pdfArray.length >= 1) ||
                    (!props.pro && props.starter && pdfArray.length >= 2)
                      ? { cursor: "not-allowed" }
                      : { cursor: "pointer" }
                  }
                >
                  <input
                    type="file"
                    disabled={
                      (!props.pro && !props.starter && pdfArray.length >= 1) ||
                      (!props.pro && props.starter && pdfArray.length >= 2)
                        ? true
                        : false
                    }
                    onChange={(e) => {
                      const docfiles = Array.from(e.target.files);
                      const filenames = docfiles.map((file) => file);
                      if(filenames.filter(file=>(["pdf","ppt","pptx","doc","docx","txt"].includes(file.name
                        .split(".")
                        .pop()) == false)).length > 0){
                          return;
                      }
                      setFileName((prevFileNames) => [
                        ...prevFileNames,
                        ...filenames,
                      ]);
                      setSelectedFiles((prevSelectedFiles) => [
                        ...prevSelectedFiles,
                        ...docfiles,
                      ]);
                    }}
                    accept=".doc, .docx,.ppt, .pptx,.txt,.pdf"
                    ref={inputRef}
                    className="file-input"
                    multiple
                    id="pdfInput"
                    onFocus={(e) => (e.target.value = null)}
                    hidden
                  />
                  <div
                    className="flex flex-col items-center justify-center "
                    style={
                      (!props.pro && !props.starter && pdfArray.length >= 1) ||
                      (!props.pro && props.starter && pdfArray.length >= 2)
                        ? { opacity: "50%" }
                        : { opacity: "100%" }
                    }
                  >
                    <img
                      className="mb-2"
                      src={
                        require("../../../UiComponents/BottomComponents/ModuleTabs/ProductsAndServices/Button-Icon.png")
                          .default.src
                      }
                      alt=" "
                    />
                    <p className="image-text">
                      Upload or Drag & drop document files{" "}
                    </p>
                  </div>
                </div>
                <p className="pt-2 text-xs md:text-sm text-[#817C7C] font-medium">
                  Supports .pdf, .xls, .doc, .ppt file- up to 800KB 
                  <span className="text-sm text-[#817c7c]">
                    {!props.pro && `| ${allowedFiles} file allowed`}
                  </span>
                </p>

                {/* file storing div  */}
                <div className="flex items-center gap-[16px] mt-[24px] flex-wrap">
                  {renderPdf}
                </div>
              </>
            )}
          </>
        )}
        {/* {buttonType === "Video" && (
          <div className="w-full">
            <Video
              profile={props.profile}
              type={props.type}
              pro={props.pro}
              starter={props.starter}
              basic={props.basic}
              toggleModal={props.toggleModal}
              toggleStates={props.toggleStates}
              videoData={props.videoData}
              setDummyState={props.setDummyState}
            />
          </div>
        )} */}
      </div>
      {buttonType !== "Video" && (
        <div className="py-[24px] gap-3 flex justify-end">
          <div className="flex w-full md:w-[219px] md:gap-4">
            <TertiaryButton
              text="Cancel"
              width={"100%"}
              onClick={props.toggleModal}
            />
            <PrimaryButton2
              onClick={handleContent}
              text="Save"
              width={"100%"}
              isDisabled={isDisabled}
              color={
                isDisabled
                  ? "#F7B2C7"
                  : "linear-gradient(225deg, #FB6609 0%, #E40849 100%)"
              }
              textColor={isDisabled && "white"}
            />
          </div>
        </div>
      )}
    </div>
  );
}
