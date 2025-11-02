import React, { useState, useRef, useEffect, useContext } from "react";
import LinkButtons from "../../LinkButtons";
import InputField from "../../InputField";
import { HiOutlineBolt, HiOutlineTrash } from "react-icons/hi2";
import { HiXCircle } from "react-icons/hi";
import SecondaryButton from "../../SecondaryButton";
import ProtagSmall from "../../ProtagSmall";
import "./content.css";
import PrimaryButton from "../../PrimaryButton";
import PrimaryButton2 from "../../PrimaryButton2";
import TertiaryButton from "../../TertiaryButton";
import { serverUrl } from "../../../../config";
import LoadingAnimation from "../../Loading/LoadingAnimation";

import Modal from "../../../ModalComponent/Modal";
import axios from "axios";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { storage } from "../../../Login/firebaseconfig";
import { UserContext } from "../../../Contexts/context";
import ProtagLarge from "../../ProtagLarge";
import { useRouter } from "next/navigation";
import { getCookie } from "@/components/utils";

// function starts here
function Content(props) {
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
  const [readOnly, setReadOnly] = useState([]);
  const [editLable, setEditLable] = useState([]);
  const [editUrl, setEditUrl] = useState([]);

  const handleLinkEdit = (index) => {
    setReadOnly((prev) => {
      const newItems = [...prev];
      newItems[index] = false;
      return newItems;
    });
  };

  const handleLinkSave = (id, index) => {
    setReadOnly((prev) => {
      const newItems = [...prev];
      newItems[index] = true;
      return newItems;
    });
    const content = {
      websiteUrl: editUrl[index],
      label: editLable[index],
      id: id,
    };
    handleEdit(content);
  };

  const handleLabelChange = (event, index) => {
    setEditLable((prev) => {
      const newItems = [...prev];
      newItems[index] = event.target.value;
      return newItems;
    });
  };

  const handleUrlChange = (event, index) => {
    setEditUrl((prev) => {
      const newItems = [...prev];
      newItems[index] = event.target.value;
      return newItems;
    });
  };

  const fetchcustom = async (data) => {
    if (data.length > 0) {
      setReadOnly([]);
      setEditLable([]);
      setEditUrl([]);
      for (let i = 0; i < data.length; i++) {
        setReadOnly((prev) => [...prev, true]);
        setEditLable((prev) => [...prev, data[i].label]);
        setEditUrl((prev) => [...prev, data[i].websiteUrl]);
      }
    }
  };

  useEffect(() => {
    fetchcustom(customData);
  }, []);

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

  const handleEdit = async (content) => {
    await fetch(`${serverUrl}/record/record/editcustomlink`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: props.profile,
        websiteUrl: content.websiteUrl,
        label: content.label,
        id: content.id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          // console.log(data.error);
        } else {
          props.setDummyState((prev) => prev + 1);
        }
      });
  };

  const handleDelete = async (id, index) => {
    if (customData.length > 0) {
      const name = props.profile;
      await fetch(
        `${serverUrl}/record/record/deletecustomlink/${props.profile}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getCookie("jwt_token"),
          },
          body: JSON.stringify({
            name,
            id,
          }),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            // console.log(data.error);
          } else {
            const newItems = [...customData];
            newItems.splice(index, 1);
            setCustomData(newItems);
            fetchcustom(newItems);
            props.setDummyState((prevState) => prevState + 1);
          }
        });
    }
  };

  function uploadimg(image) {
    const imageRef = ref(storage, `/images/${image.name}`);
    uploadBytes(imageRef, image)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref)
          .then((downloadURL) => {
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
            setLoading(false);
            props.setDummyState((prevState) => prevState + 1);
            props.toggleModal();
          })
          .catch((err) => {
            console.error("Error getting download URL from Firebase", err);
          });
      })
      .catch((err) => {
        console.error("Error uploading image to Firebase Storage", err);
      });
  }

  function uploadpdf(docs) {
    const docRef = ref(storage, `/images/${docs.name}`);
    uploadBytes(docRef, docs)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref)
          .then((downloadURL) => {
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
            props.toggleModal();
          })
          .catch((err) => {
            console.error("Error getting download URL from Firebase", err);
          });
      })
      .catch((err) => {
        console.error("Error uploading image to Firebase Storage", err);
      });
  }
  const [loading, setLoading] = useState(false);

  function handleContent() {
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
        Promise.all(uploadPromises)
          .then(() => {
            setDummyState((prevState) => prevState + 1);
          })
          .catch((error) => {
            console.error("Error uploading files:", error);
          });
      } else {
        // alert("not a pro user");
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
        Promise.all(uploadPromises)
          .then(() => {
            setDummyState((prevState) => prevState + 1);
          })
          .catch((error) => {
            console.error("Error uploading files:", error);
          });
      } else {
        alert("Not a pro user");
      }
    }

    if (files.length > 0 || docfiles.length > 0) {
      setLoading(true);
      // setTimeout(() => {
      //   setLoading(false);
      //   props.setDummyState((prevState) => prevState + 1);
      //   props.toggleModal();
      // }, 5000);
    } else {
      props.toggleModal();
    }
    return null;
  }

  const inputRef = useRef(null);
  const inputRefImage = useRef(null);
  const [count, setCount] = useState(0);
  const [sectionData, setSectionData] = useState([]);

  const handleAdd = () => {
    setCount(count + 1);
    setSectionData([...sectionData, { label: "", websiteUrl: "" }]);
    if (rendersectionRef !== undefined) {
      if (rendersectionRef.current !== null) {
        rendersectionRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  };
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
    if (sectionData.length + customData.length === 0) {
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

  return (
    <>
      <div
        className={
          props.current === "content"
            ? `flex flex-col md:pl-3 lg:pl-7 w-full h-full relative ${
                loading === true ? "overflow-hidden" : ""
              }`
            : "hidden relative"
        }
      >
        <div className="w-full flex flex-col gap-4">
          {/* downpart starts here */}
          <div className="">
            <div className="flex justify-between pt-6 pb-4 xsm:pt-9 xsm:pb-5">
              <h1 className="font-semibold ecom-heading">
                DOCUMENT FILES{" "}
                <span className="text-sm text-[#817c7c]">
                  {" "}
                  {!props.pro && `(upto ${allowedFiles} files)`}{" "}
                </span>
              </h1>

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
                  const filenames = docfiles.map((file) => file.name);

                  setFileName((prevFileNames) => [
                    ...prevFileNames,
                    ...filenames,
                  ]);
                  setSelectedFiles((prevSelectedFiles) => [
                    ...prevSelectedFiles,
                    ...docfiles,
                  ]);
                }}
                accept="*"
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
                    require("../../BottomComponents/ModuleTabs/ProductsAndServices/Button-Icon.png")
                      .default.src
                  }
                  alt=" "
                />
                <p className="image-text">
                  Upload or Drag & drop document files{" "}
                </p>
                <p className="image-text">
                  (pdf, doc, docx, ppt, xls, etc.) to showcase in your profile
                </p>
              </div>
            </div>

            {/* file storing div  */}
            {fileName.length > 0 && (
              <div className="flex items-center gap-4 mt-4 w-full flex-wrap">
                {fileName.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center rounded-full border p-3 bg-[#f3f3f3] h-9 max-w-full w-fit gap-1.5"
                  >
                    <p className="text-sm">{file}</p>
                    <span
                      onClick={() => removeFile(index)}
                      style={{ cursor: "pointer", padding: "0" }}
                      className="rounded-full text-xl"
                    >
                      <HiXCircle fill="#817C7C" />
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* image starts here  */}
          <div className="mt-6 md:mt-9 border-t-2">
            <div className="flex justify-between pt-6 pb-4 xsm:pt-9 xsm:pb-5">
              <h1 className="font-semibold ecom-heading">
                GALLERY{" "}
                <span className="text-sm text-[#817c7c]">
                  (upto {allowedPhotos} photos)
                </span>
              </h1>

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
                    require("../../BottomComponents/ModuleTabs/ProductsAndServices/Button-Icon.png")
                      .default.src
                  }
                  alt=" "
                />
                <p className="image-text mt-2">
                  Upload or Drag & drop images to create a carousel
                </p>
              </div>
            </div>

            {/* file storing div  */}
            {/* {imageName.length > 0 && (
              <div className="flex items-center gap-3 mt-4">
                <div className="flex items-center rounded-full border ps-3 bg-[#f3f3f3]">
                  <p className="text-sm">{imageName}</p>
                  <span onClick={removeImage} style={{ cursor: "pointer" }}>
                    <HiXCircle />
                  </span>
                </div> */}
            {/* <div className="relative w-[80px] h-[80px] rounded-lg">
                  <span onClick={removeImage} style={{ cursor: 'pointer', padding: '0' }} className="absolute right-1.5 top-1.5 rounded-full">
                    <HiXCircle />
                  </span>
                </div> */}
            {/* </div>
            )} */}
            {imageName.length > 0 && (
              <div className="flex items-center gap-3 mt-4 w-full flex-wrap">
                {imageName.map((imageUrl, index) => (
                  <div className="relative" key={index}>
                    <img
                      key={index}
                      src={imageUrl}
                      alt={`Selected ${index + 1}`}
                      className="w-20 h-20 rounded-lg block"
                    />
                    <span
                      onClick={() => removeImage(index)}
                      style={{ cursor: "pointer", padding: "0" }}
                      className="absolute right-1.5 top-1.5 rounded-full w-4 h-4 bg-white flex items-center justify-center"
                    >
                      <HiXCircle className="w-4 h-4 text-[#817C7C]" />
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="py-4 gap-3 flex justify-end">
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
          <div className="w-full h-[50px] flex sm:hidden"></div>
        </div>
        
        {loading && (
          <div className="absolute w-full h-full top-0 left-0 backdrop-blur-sm flex justify-center items-center">
            <LoadingAnimation />
          </div>
        )}
      </div>

      {newModal && (
        <Modal onClick={handleModal} label="">
          <h1>hello</h1>
        </Modal>
      )}
    </>
  );
}

export default Content;
