import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Switch from "react-switch";
import {
  HiInformationCircle,
  HiXCircle,
  HiOutlineUpload,
  HiChevronUp,
  HiChevronDown,
} from "react-icons/hi";
import InputFIeldTextArea from "../../../InputFIeldTextArea";
import InputField from "../../../InputField";
import IconButton from "../../../IconButton";
import PrimaryButton2 from "../../../PrimaryButton2";
import TertiaryButton from "../../../TertiaryButton";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";
import { storage } from "../../../../Login/firebaseconfig";
import { serverUrl } from "../../../../../config";
import Axios from "axios";
import { UserContext } from "../../../../Contexts/context";
import { useContext } from "react";
import LoadingAnimation from "../../../Loading/LoadingAnimation";
import ConfModal from "../../../../SocialLinks/ConfModal";
import { useParams, useRouter } from "next/navigation";
import { IoCloseOutline } from "react-icons/io5";
import { getCookie } from "@/components/utils";
import LinkButtons2 from "@/components/UiComponents/LinkButtons2";
import InputFieldCC from "@/components/UiComponents/countryCodeField";

function ServicesModal(props) {
  // state for file imageField
  const [file, setFile] = useState([]);
  const [fileName, setFileName] = useState([]);
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [showLabel, setShowLabel] = useState(false);
  const [changeButton, setChangeButton] = useState("Shop Now");
  const [whatsappLink, setWhatsappLink] = useState("");
  const [customLink, setCustomLink] = useState("");
  const [buttonType, setButtonType] = useState("none");
  const navigate = useRouter();
  const [confModal, setConfModal] = useState(false);

  const handleRadioChange = (event) => {
    setButtonType(event.target.value);
  };

  // removing files from image fileArray
  const removeFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);

    const newImageUrls = [...imageUrls];
    newImageUrls.splice(index, 1);
    setImageUrls(newImageUrls);
  };

  // mapping array for files
  const mArray = fileName.map((item, index) => (
    <div key={index} className="upload-content rounded-full">
      <p>{item.name}</p>
      <span onClick={removeFile}>{item.icon}</span>
    </div>
  ));

  //handling service submit
  const [serviceName, setServiceName] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const profile = {
    profile: useParams().userName,
    type: useParams().templateId,
  };
  const inputRef = useRef(null);

  const handleButtonClick = () => {
    inputRef.current.click();
  };

  const [files, setFiles] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  const isValid =
    serviceName?.length !== 0 &&
    serviceDescription?.length !== 0 &&
    imageUrls?.length !== 0;

  //upload Image to firebase
  const handleFileInputChange = async (event) => {
    setLoading(true);
    const selectedFiles = event.target.files;
    const newFiles = [...files];
    const newImageUrls = [...imageUrls];

    if (selectedFiles.length > 4) {
      setLoading(false);
      return;
    }

    try {
      for (let i = 0; i < selectedFiles.length; i++) {
        const selectedFile = selectedFiles[i];
        const imageRef = ref(storage, `/images/${selectedFile.name}`);

        const snapshot = await uploadBytesResumable(imageRef, selectedFile);
        const downloadURL = await getDownloadURL(snapshot.ref);

        newImageUrls.push(downloadURL);

        newFiles.push(selectedFile);
      }
      setLoading(false);
    } catch (err) {
      console.error(
        "Error uploading image to Firebase Storage or getting download URL",
        err
      );
      setLoading(false);
    }

    setFiles(newFiles);
    setImageUrls(newImageUrls);
  };

  // const handlecropDone = async () => {
  //   setLoading(true);
  //   let canvas = document.getElementById("croppedImage");
  //   const dummy_image = canvas.toBlob(async (blob) => {
  //     const imageRef = ref(storage, `/images/${username + imageName}`);
  //     await uploadBytes(imageRef, blob)
  //       .then((snapshot) => {
  //         getDownloadURL(snapshot.ref)
  //           .then((downloadURL) => {
  //             setServiceImage(downloadURL);
  //             console.log(downloadURL);
  //             setLoading(false);
  //           })
  //           .catch((err) => {
  //             console.error("Error getting download URL from Firebase", err);
  //             setLoading(false);
  //           });
  //       })
  //       .catch((err) => {
  //         console.error("Error uploading image to Firebase Storage", err);
  //         setLoading(false);
  //       });
  //   });
  // };

  const { username } = useContext(UserContext);

  const fetchData = async () => {
    const config = {
      headers: {
        Authorization: "Bearer " + getCookie("jwt_token"),
      },
    };
    try {
      const { data } = await Axios.get(
        `${serverUrl}/record/appsData/${profile.profile}/${props.serviceId}`,
        config
      );
      setServiceName(data.serviceName);
      setServiceDescription(data.serviceDescription);
      setImageUrls(typeof data.image == "string" ? [data.image] : data.image);
      setChecked(data.serviceButton);
      setChangeButton(data.label);
      setWhatsappLink(data.link);
      setCustomLink(data.customLink);
    } catch (error) {
      //console.log(error?.response?.data?.error);
      navigate.push("/login");
    }
  };
  useEffect(() => {
    if (props.serviceId) {
      fetchData();
    }
  }, [props.serviceId]);
  const handleSubmit = async () => {
    var formData = new FormData();
    formData.append("serviceName", serviceName);
    formData.append("serviceDescription", serviceDescription);
    imageUrls.forEach((imageUrl, index) => {
      formData.append(`image[${index}]`, imageUrl);
    });
    formData.append("label", changeButton);
    formData.append("serviceButton", checked);
    formData.append("link", whatsappLink);
    formData.append("customLink", customLink);
    await fetch(
      `${serverUrl}/productsandservices/addservice/basic/${profile.type}/${profile.profile}`,
      {
        method: "POST",
        body: formData,
        profile: profile.profile,
      }
    )
      .then((response) => {
        response.json()
        // console.log("formData service",formData)
      })
      .then((data) => {
        props.setSerCount((prev) => prev + 1);
      })
      .catch((error) => console.error(error));
    props.setDummyState((prev) => !prev);
    setServiceName("");
    setServiceDescription("");
    setImageUrls([]);
    setFiles("")
    setChecked(false)
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `${serverUrl}/productsandservices/updateService/${profile.profile}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getCookie("jwt_token"),
          },
          body: JSON.stringify({
            id: props.serviceId,
            serviceName: serviceName,
            serviceDescription: serviceDescription,
            image: imageUrls,
            label: changeButton,
            link: whatsappLink,
            customLink: customLink,
            serviceButton: checked,
          }),
        }
      );
      if (response.ok) {
        props.setDummyState(!props.dummyState);
      } else {
        console.error("Failed to update service");
      }
    } catch (error) {
      console.error("Failed to update service:", error);
    }
  };

  const renderedImages =
    imageUrls &&
    imageUrls.map((imageUrl, index) => (
      <div
        className="relative flex flex-row items-center rounded-[12px] p-[10px]"
        style={{ boxShadow: "3px 3px 10px rgba(167, 167, 167, 0.14)" }}
      >
        <img
          key={index}
          className="w-16 h-16 rounded-[8px] object-cover"
          src={imageUrl}
          alt={`Image ${index + 1}`}
        />
        <div className="p-4 flex flex-col gap-1">
          <div className="text-[14px] font-[600]">service_image.png</div>
          <div className="text-[12px] font-[400]">100KB</div>
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
    <div className="h-[80vh] sm:h-fit max-h-[80vh] overflow-y-scroll pb-[20px] sm:pb-[10px]">
      <div className="pt-6">
        <InputField
          label="Service Name"
          placeholder="Name..."
          width="100%"
          value={serviceName}
          onChange={(e) => setServiceName(e.target.value)}
        />
      </div>
      <div className="pt-9 ">
        <InputFIeldTextArea
          label="Service description"
          placeholder="Type or paste service description here..."
          value={serviceDescription}
          onChange={(e) => setServiceDescription(e.target.value)}
        />
        <p className="pt-2 text-sm text-cGrey font-medium">
          Type or paste up to 100 words
        </p>
      </div>

      <div className="flex justify-between pt-8">
        <h1 className="label-field">Service Image or Icon</h1>
      </div>

      {/* image input-1 starts here  */}
      {loading ? (
        <div className="flex flex-col justify-center items-center gap-5 relative border-dotted border-2 p-6 rounded-8px w-full h-[106px]">
          <img
            src={
              require("../../../../../components/Image/Tapop logo black.png")
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
        <div className="add-image px-5" onClick={handleButtonClick}>
          <button type="button" onClick={handleButtonClick}>
            <input
              type="file"
              accept=".jpeg, .jpg, .png, .gif, .svg, .webp"
              ref={inputRef}
              style={{ display: "none" }}
              onChange={handleFileInputChange}
              hidden
              multiple
            ></input>
          </button>

          <div className="pt-3">
            <img
              className="ml-20"
              src={require("./Button-Icon.png").default.src}
              alt=" "
            />
            <p className="image-text">Please click anywhere to add image</p>
          </div>
        </div>
      )}

      <p className="pt-2 text-sm text-cGrey font-medium">
        Supports .PNG, .JPG, .JPEG & .svg file- up to 800KB
      </p>

      <div className="flex flex-col justify-center gap-4 mt-2 p-[10px]">
        {renderedImages}
      </div>

      
      <div className=" my-8 switch-bg">
        <div className="flex flex-col ">
          <div className="flex p-4 items-center gap-x-5">
            <p className=" font-medium text-sm">Add CTA Button</p>
            <Switch
              onChange={() => setChecked((prev) => !prev)}
              checked={checked}
              onColor="#12A26E"
              offColor="#A7A7A7"
              checkedIcon={false}
              uncheckedIcon={false}
              height={24}
              width={44}
              disabled={props.isBasic}
            />
          </div>
          {checked && (
            <div className="p-4 w-full">
              <div className="p-4 flex add-div gap-3 w-full ">
                <span className="text-2xl cursor-pointer">
                  <HiInformationCircle />
                </span>
                <div>
                  <p>
                    Please note that, only your{" "}
                    <span className="whatsapp">Whatsapp account</span> can be
                    linked to your Service card button.
                  </p>
                  <br />
                  <p>
                    Your profile theme's button style will be applied to service
                    card buttons.
                  </p>
                </div>
              </div>

              {/* label part  */}
              <div className="w-full">
                <p className="pt-6 text-sm text-cGrey font-medium">
                  Select a label for your button
                </p>

                <div className="pt-4 flex gap-3 text-[0.875rem] sm:text-[1rem] overflow-scroll">
                  <button
                    onClick={() => setChangeButton("Inquiry")}
                    className={
                      changeButton === "Inquiry"
                        ? "appnt-btn"
                        : "appnt-btn-unselected"
                    }
                  >
                    Inquiry
                  </button>
                  <button
                    onClick={() => setChangeButton("Quotation")}
                    className={
                      changeButton === "Quotation"
                        ? "appnt-btn"
                        : "appnt-btn-unselected"
                    }
                  >
                    Quotation
                  </button>
                  <button
                    onClick={() => setChangeButton("Get Details")}
                    className={
                      changeButton === "Get Details"
                        ? "appnt-btn"
                        : "appnt-btn-unselected"
                    }
                  >
                    Get Details
                  </button>
                  <button
                    onClick={() => setChangeButton("Read More")}
                    className={
                      changeButton === "Read More"
                        ? "appnt-btn"
                        : "appnt-btn-unselected"
                    }
                  >
                    Read More
                  </button>
                </div>

                <div
                  className="pt-6"
                  onClick={() => setShowLabel((prev) => !prev)}
                >
                  <LinkButtons2
                    icon={showLabel ? <HiChevronUp /> : <HiChevronDown />}
                    text="Add New Label"
                  />
                </div>

                {showLabel && (
                  <div className="pt-4 gap-3 flex flex-col">
                    <InputField
                      label="Button label"
                      width="100%"
                      onChange={(e) => setChangeButton(e.target.value)}
                    />
                  </div>
                )}

                <div className="flex flex-row gap-[10px] mt-[20px]">
                  <div
                    className={`flex flex-row items-center gap-[10px] py-[10px] pl-[15px] pr-[20px] rounded-full ${
                      buttonType === "whatsapp" && "bg-[#FAFAFA]"
                    }`}
                  >
                    <input
                      type="radio"
                      id="whatsapp"
                      name="linkType"
                      value="whatsapp"
                      checked={buttonType === "whatsapp"}
                      onChange={handleRadioChange}
                    />
                    <label htmlFor="whatsapp">WhatsApp Link</label>
                  </div>
                  <div
                    className={`flex flex-row items-center gap-[10px] py-[10px] pl-[15px] pr-[20px] rounded-full ${
                      buttonType === "custom" && "bg-[#FAFAFA]"
                    }`}
                  >
                    <input
                      type="radio"
                      id="custom"
                      name="linkType"
                      value="custom"
                      checked={buttonType === "custom"}
                      onChange={handleRadioChange}
                    />
                    <label htmlFor="custom">Custom Link</label>
                  </div>
                  <div
                    className={`flex flex-row items-center gap-[10px] py-[10px] pl-[15px] pr-[20px] rounded-full ${
                      buttonType === "none" && "bg-[#FAFAFA]"
                    }`}
                  >
                    <input
                      type="radio"
                      id="none"
                      name="linkType"
                      value="none"
                      checked={buttonType === "none"}
                      onChange={handleRadioChange}
                    />
                    <label htmlFor="none">No Link</label>
                  </div>
                </div>

                {buttonType === "whatsapp" ? (
                  <div className="pt-4">
                    <InputFieldCC
                      label="Whatsapp link"
                      type="mobile"
                      name="mobile"
                      placeholder="9876543210"
                      value={whatsappLink}
                      onChange={(e) => setWhatsappLink(e.target.value)}
                      width="100%"
                      height="40px"
                    />
                    {/* <InputField
                      label="Whatsapp link"
                      width="100%"
                      placeholder="Type your number with country code"
                      value={whatsappLink}
                      onChange={(e) => setWhatsappLink(e.target.value)}
                    /> */}
                  </div>
                ) : (
                  buttonType === "custom" && (
                    <div className="pt-4">
                      <InputField
                        label="Custom link"
                        width="100%"
                        placeholder="Link your custom url with the button"
                        value={customLink}
                        onChange={(e) => setCustomLink(e.target.value)}
                      />
                      <p className="text-[12px] sm:text-[13px] font[500] mt-[5px]">
                        ** Enter your link with proper http:// or https://
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* image storing div  */}
      <div className="flex items-center">{mArray}</div>

      <div className="flex justify-end gap-4 my-4">
        <TertiaryButton
          text="Cancel"
          onClick={() => {
            // setImageUrls("");
            // setServiceName("");
            // setServiceDescription("");
            // props.toggleModal2();
            setConfModal(true);
          }}
        />
        {props.serviceId ? (
          <PrimaryButton2
            text="Update"
            color="linear-gradient(225deg, #FB6609 0%, #E40849 100%)"
            onClick={() => {
              handleUpdate();
              props.setShowEditModal((prev) => ({
                ...prev,
                show: !prev.show,
              }));
              props.updateTemplateDataHandler();
              setImageUrls([]);
              setServiceName("");
              setServiceDescription("");
              setChecked(false)
            }}
          />
        ) : (
          <PrimaryButton2
            text="Save"
            isDisabled={!isValid}
            color={
              !isValid
                ? "#F7B2C7"
                : "linear-gradient(225deg, #FB6609 0%, #E40849 100%)"
            }
            onClick={() => {
              handleSubmit();
              props.toggleModal2();
              props.updateTemplateDataHandler();
            }}
          />
        )}
      </div>
      {props.onModal ? (
        <ConfModal
          open={confModal}
          setOpen={setConfModal}
          onClick={() => {
            // setImageUrls("");
            // setServiceName("");
            // setServiceDescription("");
            setConfModal(false);
            props.toggleModal2();
          }}
        />
      ) : props.editModal ? (
        <ConfModal
          open={confModal}
          setOpen={setConfModal}
          onClick={() => {
            // setImageUrls("");
            // setServiceName("");
            // setServiceDescription("");
            setConfModal(false);
            props.setShowEditModal((prev) => ({ ...prev, show: !prev.show }));
          }}
        />
      ) : null}
    </div>
  );
}

export default ServicesModal;
