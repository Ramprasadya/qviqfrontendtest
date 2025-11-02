"use client";
import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import { serverUrl } from "../../config";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import useOutsideClick from "../Utils/useOutsideClick";
import { HiChevronDown, HiChevronUp } from "react-icons/hi2";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";
import { storage } from "../Login/firebaseconfig";
import { async } from "@firebase/util";
import { useRouter, useParams } from "next/navigation";

import "./FloatingDiv.css";
import FloatingDiv from "./FloatingDiv";
import { getCookie } from "../utils";
import { UserContext } from "../Contexts/context";

const ProductForm = ({ params }) => {
  const {adminSignOut} = useContext(UserContext);
  const [floatingBg, setFloatingBg] = useState(null);

  const id = params?.id;
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    color: "",
    price: 0,
    category: "",
    productCoupons: [],
    similarProductIds: [],
    images:[],
    coverimages: [],
    isCustomizable: false,
    horizontal: true,
    vertical: false,
    nameFontStyle: "",
    nameFontSize: "",
    nameFontWeight: "",
    designationFontStyle: "",
    designationFontSize: "",
    designationFontWeight: "",
    contentAlignment: "center",
  });
  const [allCoupons, setAllCoupons] = useState([]);
  const navigate = useRouter();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const isAdmin = getCookie("jwt_token_admin")?true:false;
    if (!isAdmin) {
      navigate.push("/");
    }
    axios
      .get(`${serverUrl}/product/getProducts/all`)
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);
  useEffect(() => {
    const isAdmin = getCookie("jwt_token_admin")?true:false;
    if (!isAdmin) {
      navigate.push("/");
    }
    axios
      .get(`${serverUrl}/coupon/getCoupons`)
      .then((response) => setAllCoupons(response.data))
      .catch((error) => console.error("Error fetching coupons:", error));
  }, []);

  const isCouponSelected = (couponId) => {
    return formData.productCoupons.includes(couponId);
  };

  const handleCouponToggle = (couponId) => {
    setFormData((prevProduct) => {
      const updatedProduct = {
        ...prevProduct,
        productCoupons: isCouponSelected(couponId)
          ? prevProduct.productCoupons.filter((coupon) => coupon !== couponId)
          : [...prevProduct.productCoupons, couponId],
      };
      return updatedProduct;
    });
  };

  useEffect(() => {
    if (id) {
      axios
        .get(`${serverUrl}/product/getProduct/${id}`)
        .then((response) => {
          const productData = response.data;
          if (!productData.productCoupons) {
            productData.productCoupons = [];
          }
          setFormData(productData);
        })
        .catch((error) =>
          console.error("Error fetching product details:", error)
        );
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [isTotalSelected, setIsTotalSelected] = useState(false);
  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      price: 0,
      category: "",
      images: [],
      coverimages: [],
      productCoupons: [],
      similarProductIds: [],
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Clear the file input
    }
    if (fileInputRef1.current) {
      fileInputRef1.current.value = ""; // Clear the file input
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // formData.productCoupons = selectedProductCoupons;
    const config = {
      headers: {
        Authorization: "Bearer " + getCookie("jwt_token_admin"),
      },
    };
    if (id) {
      axios
        .put(`${serverUrl}/product/update/${id}`, formData, config)
        .then((response) => {
          resetForm();
        })
        .catch((error) => {
          console.error("Error updating product:", error);
          if(error?.response?.data?.error == "INVALID_ADMIN_TOKEN"){
            adminSignOut();
            navigate.push("/admin");
          }
        });
    } else {
      axios
        .post(`${serverUrl}/product/addProduct`, formData, config)
        .then((response) => {
          resetForm();
        })
        .catch((error) => {
          console.error("Error adding product:", error);
          if(error?.response?.data?.error == "INVALID_ADMIN_TOKEN"){
            adminSignOut();
            navigate.push("/admin");
          }
        });
    }
  };

  const fileInputRef = useRef(null);

  // Function to generate a random alphanumeric string of given length
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

  const handleFileInputChange = async (event, type) => {
    const images = event.target.files;
    let imageUrls = [];

    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      const timestamp = Date.now(); // Current timestamp
      const randomString = generateRandomString(10); // Generate random alphanumeric string of length 10
      const imageName = `${timestamp}-${randomString}-${image.name}`; // Construct filename
      const imageRef = ref(storage, `/images/${imageName}`);

      try {
        const snapshot = await uploadBytesResumable(imageRef, image);
        const downloadURL = await getDownloadURL(snapshot.ref);
        imageUrls.push(downloadURL);
      } catch (err) {
        console.error(
          "Error uploading image to Firebase Storage or getting download URL",
          err
        );
      }
    }
    if (type == "frontImage") {
      setFormData((prevData) => ({
        ...prevData,
        images: [imageUrls[0]? imageUrls[0]:"", 
        formData.images[1]? formData.images[1]:"",
        formData.images[2]? formData.images[2] : "",
        ...formData.images.slice(3),
      ],
      }));
    } else if (type == "frontPreviewImage") {
      setFormData((prevData) => ({
        ...prevData,
        images: [formData.images[0]? formData.images[0] : "",
        formData.images[1]? formData.images[1]:"",
        imageUrls[0]? imageUrls[0]:"",
        ...formData.images.slice(3),
      ],
      }));
    } else if (type == "backImage") {
      setFormData((prevData) => ({
        ...prevData,
        images: [formData.images[0]? formData.images[0] : "",
        imageUrls[0]? imageUrls[0]:"",
        formData.images[2]? formData.images[2] : "",
        ...formData.images.slice(3),
      ],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        images: [
          formData.images[0]? formData.images[0] : "",
          formData.images[1]? formData.images[1]:"",
          formData.images[2]? formData.images[2] : "",
          ...imageUrls,
        ],
      }));
    }
  };

  const handleRemoveImage = (index, type) => {
    if (type == "frontImage") {
      setFormData((prevData) => ({
        ...prevData,
        images: ["",
        formData.images[1]? formData.images[1]:"",
        formData.images[2]? formData.images[2] : "",
        ...formData.images.slice(3),
      ],
      }));
    } else if (type == "frontPreviewImage") {
      setFormData((prevData) => ({
        ...prevData,
        images: [formData.images[0]? formData.images[0] : "",
        formData.images[1]? formData.images[1]:"",
        "",
        ...formData.images.slice(3),
      ],
      }));
    } else if (type == "backImage") {
      setFormData((prevData) => ({
        ...prevData,
        images: [formData.images[0]? formData.images[0] : "",
        "",
        formData.images[2]? formData.images[2] : "",
        ...formData.images.slice(3),
      ],
      }));
    } else {
      let newAdditionalImages = [...formData.images.slice(3)];
      newAdditionalImages.splice(index,1);
      setFormData((prevData) => ({
        ...prevData,
        images: [
          formData.images[0]? formData.images[0] : "",
          formData.images[1]? formData.images[1]:"",
          formData.images[2]? formData.images[2] : "",
          ...newAdditionalImages,
        ],
      }));
    }
  };

  const fileInputRef1 = useRef(null);

  const handleFileCoverChange = (event) => {
    const images = event.target.files;
    const imageUrls = [];

    for (let i = 0; i < images.length; i++) {
      const image = images[i];

      const timestamp = Date.now(); 
      const randomString = generateRandomString(10);
      const imageName = `${timestamp}-${randomString}-${image.name}`;

      const imageRef = ref(storage, `/images/${imageName}`);

      uploadBytesResumable(imageRef, image)
        .then((snapshot) => {
          getDownloadURL(snapshot.ref)
            .then((downloadURL) => {
              // imageUrls.push(downloadURL);
              setFloatingBg(downloadURL);
              //console.log(floatingBg);

              imageUrls[i] = downloadURL;
              if (imageUrls.length === images.length) {
                setFormData((prevData) => ({
                  ...prevData,
                  coverimages: imageUrls,
                }));
              }
            })
            .catch((err) => {
              console.error("Error getting download URL from Firebase", err);
            });
        })
        .catch((err) => {
          console.error("Error uploading image to Firebase Storage", err);
        });
    }
  };
  const handleRemoveCoverImage = (index) => {
    const updatedProfileImages = [...formData.coverimages];
    updatedProfileImages.splice(index, 1);
    setFormData((prevData) => ({
      ...prevData,
      coverimages: updatedProfileImages,
    }));
  };
  //image input for colors
  function ImageUploadSection({
    color,
    fileInputRef,
    imageArray,
    handleFileChange,
  }) {
    return (
      <>
        <div className="relative add-profile-image-icon flex flex-col-reverse gap-3 my-4 h-[500px]">
          <button
            className="flex text-[#F54040] text-sm gap-1"
            type="button"
            onClick={() =>
              document.getElementById(`Product${color}Input`).click()
            }
          >
            <input
              id={`Product${color}Input`}
              type="file"
              accept=".jpeg, .jpg, .png"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange(color)}
              multiple
            ></input>
            <p>
              Add {`${color.charAt(0).toUpperCase() + color.slice(1)} Images`}
            </p>
          </button>
        </div>
        <div
          className="image-preview-container"
          style={{
            display: "flex",
            flexWrap: "nowrap",
            overflowX: "auto",
          }}
        >
          {imageArray &&
            imageArray.map((imageUrl, index) => (
              <div
                key={index}
                className="image-preview"
                style={{
                  flex: "0 0 auto",
                  width: "200px",
                  height: "150px",
                  marginRight: "8px",
                }}
              >
                <img
                  src={imageUrl}
                  alt={`Preview ${index + 1}`}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                  }}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="remove-image-button"
                >
                  Remove
                </button>
              </div>
            ))}
        </div>
      </>
    );
  }

  const fileInputRef2 = useRef(null);
  const fileInputRef3 = useRef(null);
  const fileInputRef4 = useRef(null);
  const fileInputRef5 = useRef(null);

  const handleFileColorChange = (color) => (event) => {
    const images = event.target.files;
    const imageUrls = [];

    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      const imageRef = ref(storage, `/images/${image.name}`);

      uploadBytesResumable(imageRef, image)
        .then((snapshot) => {
          getDownloadURL(snapshot.ref)
            .then((downloadURL) => {
              // imageUrls.push(downloadURL);
              imageUrls[i] = downloadURL;
              if (imageUrls.length === images.length) {
                const setImageState = `set${
                  color.charAt(0).toUpperCase() + color.slice(1)
                }Image`;
                const setFormDataState = `${color}Images`;

                setFormData((prevData) => ({
                  ...prevData,
                  [setFormDataState]: imageUrls,
                }));
              }
            })
            .catch((err) => {
              console.error("Error getting download URL from Firebase", err);
            });
        })
        .catch((err) => {
          console.error("Error uploading image to Firebase Storage", err);
        });
    }
  };
  const [selectedCheckbox, setSelectedCheckbox] = useState("Horizontal");
  const [showCustomizationOptions, setShowCustomizationOptions] =
    useState(false);
  const [showNameFont, setShowNameFont] = useState(false);
  const [showDesignationFont, setShowDesignationFont] = useState(false);
  const [showLogoPosition, setShowLogoPosition] = useState(false);
  const [showColorSelector, setShowColorSelector] = useState(false);

  const [dropdown, setDropDown] = useState(false);
  const dropdownRef = useRef(null);
  useOutsideClick(dropdownRef, () => {
    if (dropdown) {
      setDropDown(false);
    }
  });
  const [dropdown1, setDropDown1] = useState(false);
  const dropdownRef1 = useRef(null);
  useOutsideClick(dropdownRef1, () => {
    if (dropdown1) {
      setDropDown1(false);
    }
  });
  const availableFonts = [
    "Playfair Display",
    "Asap",
    "Epilogue700",
    "Epilogue400",
    "Nunito",
    "Lexend Deca",
    "Clash Display Variable",
    "Lexend Exa",
    "Lexend Deca700",
    "Lexend Deca400",
    "Great Vibes",
    "Ubuntu",
    "Homemade Apple",
    "Montserrat",
    "Futura",
    "Love Light",
    "TAN - NIMBUS",
    "Mitr",
    "DM Serif Display",
    "DM Mono",
    "League Spartan200",
    "League Spartan300",
    "League Spartan400",
    "League Spartan600",
    "Lao Sans Pro",
    "Snell Roundhand",
    "Inter",
    "Manrope",
    "Libre Bodoni",
    "Fraunces",
    "Raleway400",
    "Raleway700",
    "Plus Jakarta Sans",
    "Poiret One",
    "Clash Display",
    "DM Sans",
    "Urbanist800",
    "Urbanist400",
    "Calistoga",
    "Laila",
    "Abril Fatface",
    "Rakkas",
    "Space Grotesk700",
    "Space Grotesk400",
  ];
  const colors = [
    "Red",
    "Blue",
    "Green",
    "Yellow",
    // Add more color names as needed
  ];

  // floating window configuration
  const [showPreview, setShowPreview] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const [centerX, setCenterX] = useState(0);
  const [centerY, setCenterY] = useState(0);

  useEffect(() => {
    const screenWidth = window.screen.availWidth;
    const screenHeight = window.screen.availHeight;

    setCenterX(screenWidth / 10);
    setCenterY(screenHeight / 2);
  }, []);

  const recenterDiv = () => {
    setPosition({ x: centerX, y: -centerY });
  };

  // logo style
  const [logoX, setLogoX] = useState("0px");
  const [logoY, setLogoY] = useState("0px");
  const [logoStyle, setLogoStyle] = useState({});

  useEffect(() => {
    setLogoStyle({
      top: logoY,
      left: logoX,
    });
  }, [logoX, logoY]);

  // content style

  const [userNameStyle, setUserNameStyle] = useState({});

  const [designationStyle, setDesignationStyle] = useState({});

  const [contentX, setContentX] = useState("0px");
  const [contentY, setContentY] = useState("0px");
  const [contentStyle, setContentStyle] = useState({});

  useEffect(() => {
    //console.log(formData);

    setUserNameStyle({
      color: formData.color,
      fontFamily: formData.nameFontStyle,
      fontWeight: formData.nameFontWeight,
      fontSize: formData.nameFontSize,
      textAlign: formData.contentAlignment,
    });

    setDesignationStyle({
      color: formData.designationColor,
      fontFamily: formData.designationFontStyle,
      fontWeight: formData.designationFontWeight,
      fontSize: formData.designationFontSize,
      textAlign: formData.contentAlignment,
    });

    setContentStyle({
      top: contentY,
      left: contentX,
      alignItems: `${
        formData.contentAlignment == "center"
          ? "center"
          : formData.contentAlignment == "right"
          ? "flex-end"
          : "flex-start"
      }`,
      gap: formData.contentGap,
      width: formData.contentWidth,
    });
  }, [formData]);

  return (
    <>
      <Card sx={{ padding: "16px", maxWidth: "800px", margin: "0 auto" }}>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            {id ? "Edit" : "Add"} Product
          </Typography>
          <form onSubmit={handleSubmit}>
            <RadioGroup
              aria-label="Material"
              name="material"
              value={formData.material}
              onChange={handleChange}
              style={{ display: "flex", flexDirection: "row" }}
            >
              <FormControlLabel
                value="pvc"
                control={<Radio />}
                label="PVC"
                style={{ marginRight: "20px" }}
              />
              <FormControlLabel
                value="metal"
                control={<Radio />}
                label="Metal"
                style={{ marginRight: "20px" }}
              />
              <FormControlLabel
                value="hybrid"
                control={<Radio />}
                label="Hybrid"
              />
            </RadioGroup>
            {formData.material && formData.material === "pvc" && (
              <RadioGroup
                aria-label="PVC TYPE"
                name="pvcType"
                value={formData.pvcType}
                onChange={handleChange}
                style={{ display: "flex", flexDirection: "row" }}
              >
                <FormControlLabel
                  value=" nonCustomized"
                  control={<Radio />}
                  label="Non-Customized"
                  style={{ marginRight: "20px" }}
                />
                <FormControlLabel
                  value="customized"
                  control={<Radio />}
                  label="Customized"
                  style={{ marginRight: "20px" }}
                />
                <FormControlLabel
                  value="fullyCustomized"
                  control={<Radio />}
                  label="Fully-Customized"
                />
              </RadioGroup>
            )}
            <TextField
              label="Product Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Product Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Product Price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.horizontal}
                  name="Horizontal"
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      horizontal: e.target.checked,
                      vertical: !e.target.checked,
                    });
                    if (e.target.checked) {
                      setSelectedCheckbox("Horizontal");
                    } else {
                      setSelectedCheckbox("Vertical");
                    }
                  }}
                  color="primary"
                />
              }
              label="Horizontal"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.vertical}
                  name="Vertical"
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      vertical: e.target.checked,
                      horizontal: !e.target.checked,
                    });
                    if (e.target.checked) {
                      setSelectedCheckbox("Vertical");
                    } else {
                      setSelectedCheckbox("Horizontal");
                    }
                  }}
                  color="primary"
                />
              }
              label="Vertical"
            />
            {/* <TextField
            label={`Select ${
              selectedCheckbox === "Horizontal" ? "Horizontal" : "Vertical"
            } Products`}
            name={
              selectedCheckbox === "Horizontal"
                ? "horizontalProductIds"
                : "verticalProductIds"
            }
            select
            SelectProps={{
              value:
                formData[
                  selectedCheckbox === "Horizontal"
                    ? "horizontalProductIds"
                    : "verticalProductIds"
                ],
              onChange: handleChange,
            }}
            fullWidth
            margin="normal"
            variant="outlined"
          >
            {products.map((product) => (
              <MenuItem
                key={product._id}
                value={product._id}
                disabled={isTotalSelected}
                onClick={() => setIsTotalSelected(false)}
              >
                {product.title}
              </MenuItem>
            ))}
          </TextField> */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.isCustomizable}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      isCustomizable: e.target.checked,
                    });
                    setShowCustomizationOptions(e.target.checked);
                    if (!e.target.checked) {
                      setShowLogoPosition(false);
                      setShowNameFont(false);
                    } else {
                      setShowLogoPosition(formData.hasLogo);
                      setShowNameFont(formData.hasContent);
                    }
                  }}
                  name="isCustomizable"
                  color="primary"
                />
              }
              label="Is Customizable"
            />
            {showCustomizationOptions && (
              <div>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.hasContent}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          hasContent: e.target.checked,
                        });
                        setShowNameFont(e.target.checked);
                      }}
                      name="hasContent"
                      color="primary"
                    />
                  }
                  label="Content"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.hasLogo}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          hasLogo: e.target.checked,
                        });
                        setShowLogoPosition(e.target.checked);
                      }}
                      name="hasLogo"
                      color="primary"
                    />
                  }
                  label="Logo"
                />
              </div>
            )}
            {showNameFont && (
              <button
                type="button"
                onClick={() => setDropDown(!dropdown)}
                className="relative flex w-full justify-between pr-[20px] mt-[32px] items-center p-[8px] bg-white rounded-[12px] border border-[#DFDBD8] "
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
                      Select Font For User Name
                    </p>
                    <p
                      style={{ fontFamily: `${formData.nameFontStyle}` }}
                      className="font-bold text-[14px] text-start leading-[22px]"
                    >
                      {formData.nameFontStyle}
                    </p>
                  </div>
                </div>
                {dropdown ? <HiChevronUp /> : <HiChevronDown />}
                {dropdown && (
                  <div
                    className="w-full"
                    style={{
                      top: "5rem",
                      width: "100%",
                      textAlign: "left",
                      left: "0",
                    }}
                  >
                    {availableFonts.map((font, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          setFormData({
                            ...formData,
                            nameFontStyle: font,
                          });
                          setDropDown(false);
                        }}
                        style={{ fontFamily: font }}
                        className="dropDown_popup_item"
                      >
                        {font}
                      </div>
                    ))}
                  </div>
                )}
              </button>
            )}
            {showNameFont && (
              <>
                <button
                  type="button"
                  onClick={() => setDropDown1(!dropdown1)}
                  className="relative flex w-full justify-between pr-[20px] mt-[32px] items-center p-[8px] bg-white rounded-[12px] border border-[#DFDBD8] "
                  ref={dropdownRef1}
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
                        Select Designation Font
                      </p>
                      <p
                        style={{
                          fontFamily: `${formData.designationFontStyle}`,
                        }}
                        className="font-bold text-[14px] text-start leading-[22px]"
                      >
                        {formData.designationFontStyle}
                      </p>
                    </div>
                  </div>
                  {dropdown1 ? <HiChevronUp /> : <HiChevronDown />}
                  {dropdown1 && (
                    <div
                      className="w-full"
                      style={{
                        top: "5rem",
                        width: "100%",
                        textAlign: "left",
                        left: "0",
                      }}
                    >
                      {availableFonts.map((font, index) => (
                        <div
                          key={index}
                          onClick={() => {
                            setFormData({
                              ...formData,
                              designationFontStyle: font,
                            });
                            setDropDown1(false);
                          }}
                          style={{ fontFamily: font }}
                          className="dropDown_popup_item"
                        >
                          {font}
                        </div>
                      ))}
                    </div>
                  )}
                </button>
                <div className="flex w-full items-center gap-2 mt-2">
                  <h1>Content Alignment: </h1>
                  <RadioGroup
                    name="contentAlignment"
                    value={formData.contentAlignment}
                    onChange={handleChange}
                    style={{ display: "flex", flexDirection: "row" }}
                  >
                    <FormControlLabel
                      value="left"
                      control={<Radio />}
                      label="Left"
                      style={{ marginRight: "20px" }}
                    />
                    <FormControlLabel
                      value="center"
                      control={<Radio />}
                      label="Center"
                      style={{ marginRight: "20px" }}
                    />
                    <FormControlLabel
                      value="right"
                      control={<Radio />}
                      label="Right"
                    />
                  </RadioGroup>
                </div>
                <div className="flex w-full items-center gap-2">
                  <TextField
                    label="User Name Color"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />
                  <TextField
                    label="Designation Color"
                    name="designationColor"
                    value={formData.designationColor}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />
                </div>
                <div className="flex w-full items-center gap-2">
                  <TextField
                    label="Name Font Size"
                    name="nameFontSize"
                    type="text"
                    value={formData.nameFontSize}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />
                  <TextField
                    label="Name Font Weight"
                    name="nameFontWeight"
                    type="text"
                    value={formData.nameFontWeight}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />
                </div>
                <div className="flex w-full items-center gap-2">
                  <TextField
                    label="Designation Font Size"
                    name="designationFontSize"
                    type="text"
                    value={formData.designationFontSize}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />
                  <TextField
                    label="Designation Font Weight"
                    name="designationFontWeight"
                    type="text"
                    value={formData.designationFontWeight}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />
                </div>

                <div className="flex w-full items-center gap-2">
                  <TextField
                    label="Content Width"
                    name="contentWidth"
                    type="text"
                    value={formData.contentWidth}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />
                  <TextField
                    label="Content Gap"
                    name="contentGap"
                    type="text"
                    value={formData.contentGap}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />
                </div>
                <div className="flex w-full items-center gap-2">
                  <TextField
                    label="Content Position X"
                    name="contentPositionX"
                    type="text"
                    value={formData.contentPositionX}
                    onChange={(e) => {
                      handleChange(e);
                      setContentX(e.target.value);
                    }}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />
                  <TextField
                    label="Content Position Y"
                    name="contentPositionY"
                    type="text"
                    value={formData.contentPositionY}
                    onChange={(e) => {
                      handleChange(e);
                      setContentY(e.target.value);
                    }}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />
                </div>

                {/* <RadioGroup
                aria-label="Content Position"
                name="contentPosition"
                value={formData.contentPosition}
                onChange={handleChange}
                style={{ display: "flex", flexDirection: "row" }}
              >
                <FormControlLabel
                  value="content-top"
                  control={<Radio />}
                  style={{ marginRight: "20px" }}
                  label="Content-Top"
                />
                <FormControlLabel
                  value="content-left"
                  control={<Radio />}
                  style={{ marginRight: "20px" }}
                  label="Content-Left"
                />
                <FormControlLabel
                  value="content-right"
                  control={<Radio />}
                  label="Content-Right"
                  style={{ marginRight: "20px" }}
                />
                <FormControlLabel
                  value="content-bottom"
                  control={<Radio />}
                  label="Content-Bottom"
                  style={{ marginRight: "20px" }}
                />
                <FormControlLabel
                  value="content-top-left"
                  control={<Radio />}
                  style={{ marginRight: "20px" }}
                  label="Content-Top-Left"
                />
                <FormControlLabel
                  value="content-bottom-left"
                  control={<Radio />}
                  style={{ marginRight: "20px" }}
                  label="Content-Bottom-Left"
                />
                <FormControlLabel
                  value="content-top-right"
                  control={<Radio />}
                  label="Content-Top-Right"
                  style={{ marginRight: "20px" }}
                />
                <FormControlLabel
                  value="content-bottom-right"
                  control={<Radio />}
                  label="Content-Bottom-Right"
                  style={{ marginRight: "20px" }}
                />
              </RadioGroup> */}
              </>
            )}
            {showLogoPosition && (
              // <RadioGroup
              //   aria-label="Logo Position"
              //   name="logoPosition"
              //   value={formData.logoPosition}
              //   onChange={handleChange}
              //   style={{ display: "flex", flexDirection: "row" }}
              // >
              //   <FormControlLabel
              //     value="top"
              //     control={<Radio />}
              //     style={{ marginRight: "20px" }}
              //     label="Top"
              //   />
              //   <FormControlLabel
              //     value="left"
              //     control={<Radio />}
              //     style={{ marginRight: "20px" }}
              //     label="Left"
              //   />
              //   <FormControlLabel
              //     value="right"
              //     control={<Radio />}
              //     label="Right"
              //     style={{ marginRight: "20px" }}
              //   />
              //   <FormControlLabel
              //     value="bottom"
              //     control={<Radio />}
              //     label="Bottom"
              //     style={{ marginRight: "20px" }}
              //   />
              //   <FormControlLabel
              //     value="top-left"
              //     control={<Radio />}
              //     style={{ marginRight: "20px" }}
              //     label="Top-Left"
              //   />
              //   <FormControlLabel
              //     value="bottom-left"
              //     control={<Radio />}
              //     style={{ marginRight: "20px" }}
              //     label="Bottom-Left"
              //   />
              //   <FormControlLabel
              //     value="top-right"
              //     control={<Radio />}
              //     label="Top-Right"
              //     style={{ marginRight: "20px" }}
              //   />
              //   <FormControlLabel
              //     value="bottom-right"
              //     control={<Radio />}
              //     label="Bottom-Right"
              //     style={{ marginRight: "20px" }}
              //   />
              // </RadioGroup>
              <div className="flex w-full gap-2 items-center">
                <TextField
                  label="Logo Position X"
                  name="logoPositionX"
                  type="text"
                  value={formData.logoPositionX}
                  onChange={(e) => {
                    handleChange(e);
                    setLogoX(e.target.value);
                  }}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  label="Logo Position Y"
                  name="logoPositionY"
                  type="text"
                  value={formData.logoPositionY}
                  onChange={(e) => {
                    handleChange(e);
                    setLogoY(e.target.value);
                  }}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
              </div>
            )}

            <TextField
              label="Select Similar Products"
              name="similarProductIds"
              select
              SelectProps={{
                multiple: true,
                value: formData.similarProductIds,
                onChange: handleChange,
              }}
              fullWidth
              margin="normal"
              variant="outlined"
            >
              {products.map((product) => (
                <MenuItem
                  key={product._id}
                  value={product._id}
                  disabled={isTotalSelected}
                  onClick={() => setIsTotalSelected(false)}
                >
                  {product.title}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Product Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />

            <div className="relative add-profile-image-icon flex flex-col-reverse gap-3  my-4">
              <button
                className="flex  text-[#F54040] text-sm gap-1"
                type="button"
                onClick={() =>
                  document.getElementById("ProductFrontPreviewInput").click()
                }
              >
                <input
                  id="ProductFrontPreviewInput"
                  type="file"
                  accept=".jpeg, .jpg, .png"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={(e) => handleFileInputChange(e, "frontPreviewImage")}
                ></input>
                <p>Add Product Preview Front Image</p>
              </button>
            </div>
            <div className="image-preview-container">
              {formData.images?.slice(2,3)?.map((imageUrl, index) => (imageUrl!="" &&
                <div
                  key={index}
                  className="image-preview"
                  style={{
                    flex: "0 0 auto",
                    marginRight: "8px",
                  }}
                >
                  <img
                    src={imageUrl}
                    alt={`Preview ${index + 1}`}
                    style={{
                      maxWidth: "200px",
                      maxHeight: "150px",
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index, "frontPreviewImage")}
                    className="remove-image-button"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div className="relative add-profile-image-icon flex flex-col-reverse gap-3  my-4">
              <button
                className="flex  text-[#F54040] text-sm gap-1"
                type="button"
                onClick={() =>
                  document.getElementById("ProductFrontInput").click()
                }
              >
                <input
                  id="ProductFrontInput"
                  type="file"
                  accept=".jpeg, .jpg, .png"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={(e) => handleFileInputChange(e, "frontImage")}
                ></input>
                <p>Add Product Front Image</p>
              </button>
            </div>
            <div className="image-preview-container">
              {formData.images?.slice(0,1)?.map((imageUrl, index) => (imageUrl!="" &&
                <div
                  key={index}
                  className="image-preview"
                  style={{
                    flex: "0 0 auto",
                    marginRight: "8px",
                  }}
                >
                  <img
                    src={imageUrl}
                    alt={`Preview ${index + 1}`}
                    style={{
                      maxWidth: "200px",
                      maxHeight: "150px",
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index, "frontImage")}
                    className="remove-image-button"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="relative add-profile-image-icon flex flex-col-reverse gap-3  my-4">
              <button
                className="flex  text-[#F54040] text-sm gap-1"
                type="button"
                onClick={() =>
                  document.getElementById("ProductBackInput").click()
                }
              >
                <input
                  id="ProductBackInput"
                  type="file"
                  accept=".jpeg, .jpg, .png"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={(e) => handleFileInputChange(e, "backImage")}
                ></input>
                <p>Add Product Back Image</p>
              </button>
            </div>
            <div className="image-preview-container">
              {formData.images?.slice(1,2)?.map((imageUrl, index) => (imageUrl!="" &&
                <div
                  key={index}
                  className="image-preview"
                  style={{
                    flex: "0 0 auto",
                    marginRight: "8px",
                  }}
                >
                  <img
                    src={imageUrl}
                    alt={`Preview ${index + 1}`}
                    style={{
                      maxWidth: "200px",
                      maxHeight: "150px",
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index, "backImage")}
                    className="remove-image-button"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="relative add-profile-image-icon flex flex-col-reverse gap-3  my-4">
              <button
                className="flex  text-[#F54040] text-sm gap-1"
                type="button"
                onClick={() =>
                  document.getElementById("ProductAdditionalInput").click()
                }
              >
                <input
                  id="ProductAdditionalInput"
                  type="file"
                  accept=".jpeg, .jpg, .png"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={(e) => handleFileInputChange(e, "additionalImage")}
                  multiple
                ></input>
                <p>Add Product Additional Image</p>
              </button>
            </div>
            <div className="image-preview-container">
              {formData.images?.slice(3)?.map((imageUrl, index) => (imageUrl!="" &&
                <div
                  key={index}
                  className="image-preview"
                  style={{
                    flex: "0 0 auto",
                    marginRight: "8px",
                  }}
                >
                  <img
                    src={imageUrl}
                    alt={`Preview ${index + 1}`}
                    style={{
                      maxWidth: "200px",
                      maxHeight: "150px",
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index, "additionalImage")}
                    className="remove-image-button"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="relative add-profile-image-icon flex flex-col-reverse gap-3  my-4">
              <button
                className="flex  text-[#F54040] text-sm gap-1"
                type="button"
                onClick={() =>
                  document.getElementById("ProductCoverInput").click()
                }
              >
                <input
                  id="ProductCoverInput"
                  type="file"
                  accept=".jpeg, .jpg, .png"
                  ref={fileInputRef1}
                  style={{ display: "none" }}
                  onChange={handleFileCoverChange}
                ></input>
                <p>Add Cover Images</p>
              </button>
            </div>
            <div className="image-preview-container">
              {formData.coverimages?.map((imageUrl, index) => (
                <div key={index} className="image-preview">
                  <img
                    src={imageUrl}
                    alt={`Preview ${index + 1}`}
                    style={{
                      maxWidth: "200px",
                      maxHeight: "150px",
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveCoverImage(index)}
                    className="remove-image-button"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {formData.material && formData.material === "metal" && (
              <>
                <ImageUploadSection
                  color="gold"
                  fileInputRef={fileInputRef2}
                  imageArray={formData.goldImages}
                  handleFileChange={handleFileColorChange}
                />
                <ImageUploadSection
                  color="goldCover"
                  fileInputRef={fileInputRef2}
                  imageArray={formData.goldCoverImages}
                  handleFileChange={handleFileColorChange}
                />
                <ImageUploadSection
                  color="silver"
                  fileInputRef={fileInputRef3}
                  imageArray={formData.silverImages}
                  handleFileChange={handleFileColorChange}
                />
                <ImageUploadSection
                  color="silverCover"
                  fileInputRef={fileInputRef2}
                  imageArray={formData.silverCoverImages}
                  handleFileChange={handleFileColorChange}
                />
                <ImageUploadSection
                  color="rose"
                  fileInputRef={fileInputRef4}
                  imageArray={formData.roseImages}
                  handleFileChange={handleFileColorChange}
                />
                <ImageUploadSection
                  color="roseCover"
                  fileInputRef={fileInputRef2}
                  imageArray={formData.roseCoverImages}
                  handleFileChange={handleFileColorChange}
                />
                <ImageUploadSection
                  color="black"
                  fileInputRef={fileInputRef5}
                  imageArray={formData.blackImages}
                  handleFileChange={handleFileColorChange}
                />
                <ImageUploadSection
                  color="blackCover"
                  fileInputRef={fileInputRef2}
                  imageArray={formData.blackCoverImages}
                  handleFileChange={handleFileColorChange}
                />
              </>
            )}

            {/* <h3>Coupon Codes for This Product</h3>
            {allCoupons.map((coupon) => {
              const isProductEligible = coupon.productIds.includes(
                formData._id
              );
              if (isProductEligible) {
                return (
                  <div key={coupon._id}>
                    <span>{coupon.code}</span>
                    {isCouponSelected(coupon.code) ? (
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleCouponToggle(coupon.code)}
                      >
                        Remove
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleCouponToggle(coupon.code)}
                      >
                        Add
                      </Button>
                    )}
                  </div>
                );
              }
              return null;
            })*/}

            <Button type="submit" variant="contained" color="primary">
              {id ? "Update" : "Add"} Product
            </Button>
          </form>
        </CardContent>
      </Card>

      <button
        className="recenter z-[1]"
        onClick={() => setShowPreview((pre) => !pre)}
      >
        Preview
      </button>
      <button
        className="recenter rounded-bl-[20px] mt-[50px]"
        onClick={recenterDiv}
      >
        Recenter
      </button>

      {showPreview && (
        <FloatingDiv
          setPosition={setPosition}
          position={position}
          logoStyle={logoStyle}
          imageUrl={formData.images[0]}
          contentStyle={contentStyle}
          userNameStyle={userNameStyle}
          designationStyle={designationStyle}
          selectedCheckbox={selectedCheckbox}
        />
      )}
    </>
  );
};

export default ProductForm;
