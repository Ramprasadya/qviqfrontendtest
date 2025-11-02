import React, { useState, useRef, useEffect } from "react";
import Switch from "react-switch";
import axios from "axios";
import {
  HiInformationCircle,
  HiXCircle,
  HiOutlineUpload,
  HiChevronDown,
  HiChevronUp,
} from "react-icons/hi";
import InputFIeldTextArea from "../../../InputFIeldTextArea";
import InputField from "../../../InputField";
import InputPrice from "../../../InputPrice";
import IconButton from "../../../IconButton";
import PrimaryButton2 from "../../../PrimaryButton2";
import TertiaryButton from "../../../TertiaryButton";
import LinkButtons2 from "../../../LinkButtons2";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../../../Login/firebaseconfig";
import { serverUrl } from "../../../../../config";
import Axios from "axios";
import ConfModal from "../../../../SocialLinks/ConfModal";
import LoadingAnimation from "../../../Loading/LoadingAnimation";
import { useRouter, useParams } from "next/navigation";
import { IoCloseOutline } from "react-icons/io5";
import InputFieldCC from "@/components/UiComponents/countryCodeField";
import { getCookie } from "@/components/utils";

function ModalContent(props) {
  const [files, setFiles] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [checked, setChecked] = useState(false);
  const [showLabel, setShowLabel] = useState(false);
  const [changeButton, setChangeButton] = useState("Shop Now");
  const [whatsappLink, setWhatsappLink] = useState("");
  const [customLink, setCustomLink] = useState("");

  const [buttonType, setButtonType] = useState("none");

  const handleRadioChange = (event) => {
    setButtonType(event.target.value);
  };

  const profile = {
    profile: useParams().userName,
    type: useParams().templateId,
  };
  const [confModal1, setConfModal1] = useState(false);
  const [loading, setLoading] = useState(false);

  const [currencyChange, setCurrencyChange] = useState(["INR", "₹"]);

  const removeFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);

    const newImageUrls = [...imageUrls];
    newImageUrls.splice(index, 1);
    setImageUrls(newImageUrls);
  };

  const inputRef = useRef(null);

  const handleButtonClick = () => {
    inputRef.current.click();
  };

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
          <div className="text-[14px] font-[600]">product_image.png</div>
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

  const fetchData = async () => {
    const config = {
      headers: {
        Authorization: "Bearer " + getCookie("jwt_token"),
      },
    };
    try {
      const { data } = await Axios.get(
        `${serverUrl}/record/appsData/${profile.profile}/${props.productId}`,
        config
      );
      setProductName(data.productName);
      setProductPrice(data.productPrice);
      setProductDescription(data.productDescription);
      setImageUrls(typeof data.image == "string" ? [data.image] : data.image);
      setChecked(data.productButton);
      setChangeButton(data.label);
      setWhatsappLink(data.link);
      setCustomLink(data.customLink);
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    if (props.productId) {
      fetchData();
    }
  }, [props.productId]);

  const handleSubmit = async () => {
    var formData = new FormData();
    formData.append("productName", productName);
    formData.append("productDescription", productDescription);
    formData.append("productPrice", productPrice);
    imageUrls.forEach((imageUrl, index) => {
      formData.append(`image[${index}]`, imageUrl);
    });
    formData.append("label", changeButton);
    formData.append("productButton", checked);
    formData.append("link", whatsappLink);
    formData.append("customLink", customLink);
    await fetch(
      `${serverUrl}/productsandservices/addproduct/basic/${profile.type}/${profile.profile}`,
      {
        method: "POST",
        body: formData,
        profile: profile.profile,
      }
    )
      .then((response) => {
        response.json();
        // console.log(formData);
      })
      .then((data) => {
        props.setProCount((prev) => prev + 1);
      })
      .catch((error) => console.error(error));
    props.setDummyState((prev) => !prev);
    setProductName("");
    setProductDescription("");
    setProductPrice("");
    setFiles("");
    setImageUrls([]);
  };

  // const handleSubmit = async () => {
  //   var formData = new FormData();
  //   formData.append("serviceName", serviceName);
  //   formData.append("serviceDescription", serviceDescription);
  //   imageUrls.forEach((imageUrl, index) => {
  //     formData.append(`image[${index}]`, imageUrl);
  //   });
  //   await fetch(
  //     `${serverUrl}/productsandservices/addservice/basic/${profile.type}/${profile.profile}`,
  //     {
  //       method: "POST",
  //       body: formData\
  //       profile: profile.profile,
  //     }
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       props.setSerCount((prev) => prev + 1);
  //     })
  //     .catch((error) => console.error(error));
  //   props.setDummyState((prev) => !prev);
  //   setServiceName("");
  //   setServiceDescription("");
  //   setImageUrls("");
  // };

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `${serverUrl}/productsandservices/updateProduct/${profile.profile}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getCookie("jwt_token"),
          },
          body: JSON.stringify({
            id: props.productId,
            productName: productName,
            productPrice: productPrice,
            productDescription: productDescription,
            image: imageUrls,
            label: changeButton,
            link: whatsappLink,
            customLink: customLink,
            productButton: checked,
          }),
        }
      );
      if (response.ok) {
        props.setDummyState(!props.dummyState);
      } else {
        console.error("Failed to update product");
      }
    } catch (error) {
      console.error("Failed to update product:", error);
    }
  };

  const isValid =
    productName.length !== 0 &&
    productDescription.length !== 0 &&
    productPrice.length !== 0 &&
    imageUrls.length !== 0;

  return (
    <div className="h-[80vh] sm:h-fit max-h-[80vh] overflow-y-scroll pb-[20px] sm:pb-[10px]">
      <div className="pt-6">
        <InputField
          label="Product Name"
          placeholder="Name..."
          width="100%"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
      </div>
      <div className="pt-9 ">
        <InputPrice
          label="Price"
          placeholder="Price..."
          width="100%"
          value={productPrice}
          currency={currencyChange}
          onCurrencyChange={setCurrencyChange}
          onPriceChange={(e) => setProductPrice(e.target.value)}
        />
      </div>
      <div className="pt-9 ">
        <InputFIeldTextArea
          label="Product description"
          placeholder="Type or paste product description here..."
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
        />
        <p className="pt-2 text-sm text-cGrey font-medium">
          Type or paste up to 100 words
        </p>
      </div>

      <div className="flex justify-between pt-8">
        <h1 className="label-field">Product image</h1>
      </div>

      {/* <div
        className="add-image px-5 flex relative gap-3"
        style={{ cursor: "pointer" }}
        onClick={handleButtonClick}
      >
        <button type="button" onClick={handleButtonClick}>
          <input
            type="file"
            ref={inputRef}
            style={{ display: "none" }}
            onChange={handleFileInputChange}
            hidden
            multiple
            accept="image/png, image/gif, image/jpeg"
          ></input>
        </button>
        <img src={require("../ProductsAndServices/Button-Icon.png")} alt=" " />
        <p className="text-xs md:text-sm text-center">
          Upload or Drag & drop a Service image/Icon
        </p>
      </div> */}
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
      <p className="pt-2 text-xs md:text-sm text-[#817C7C] font-medium">
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
                    linked to your product card button.
                  </p>
                  <br />
                  <p>
                    Your profile theme's button style will be applied to product
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
                    onClick={() => setChangeButton("Shop Now")}
                    className={
                      changeButton === "Shop Now"
                        ? "appnt-btn"
                        : "appnt-btn-unselected"
                    }
                  >
                    Shop Now
                  </button>
                  <button
                    onClick={() => setChangeButton("Buy Now")}
                    className={
                      changeButton === "Buy Now"
                        ? "appnt-btn"
                        : "appnt-btn-unselected"
                    }
                  >
                    Buy Now
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

      <div className="flex justify-end gap-4 pb-14 sm:pb-4">
        <TertiaryButton
          text="Cancel"
          onClick={() => {
            // props.toggleModal();
            // setProductName("");
            // setProductDescription("");
            // setProductPrice("");
            // setFiles("");
            // setImageUrls("");
            setConfModal1(true);
          }}
        />
        {props.productId ? (
          <PrimaryButton2
            text="Update"
            onClick={() => {
              handleUpdate();
              props.setShowEditModal((prev) => ({ ...prev, show: !prev.show }));
              props.updateTemplateDataHandler();
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
            textColor="white"
            onClick={() => {
              handleSubmit();
              props.toggleModal();
              props.updateTemplateDataHandler();
            }}
          />
        )}
      </div>
      {props.onModal ? (
        <ConfModal
          open={confModal1}
          setOpen={setConfModal1}
          onClick={() => {
            // setImageUrls("");
            // setProductDescription("");
            // setProductName("");
            // setProductPrice("");
            setConfModal1(false);
            props.toggleModal();
            props.updateTemplateDataHandler();
          }}
        />
      ) : props.editModal ? (
        <ConfModal
          open={confModal1}
          setOpen={setConfModal1}
          onClick={() => {
            // setImageUrls("");
            // setProductDescription("");
            // setProductName("");
            // setProductPrice("");
            setConfModal1(false);
            props.setShowEditModal((prev) => ({ ...prev, show: !prev.show }));
            props.updateTemplateDataHandler();
          }}
        />
      ) : null}
    </div>
  );
}

export default ModalContent;
