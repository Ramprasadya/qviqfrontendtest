"use client";
import React, { useState, useEffect, useContext } from "react";
import Navbar from "../header/Navbar";
import { UserContext } from "../../Contexts/context";
import {
  HiChevronRight,
  HiChevronUp,
  HiOutlinePencilSquare,
  HiChevronDown,
  HiShoppingCart,
  HiChevronLeft,
  HiArrowDownLeft,
} from "react-icons/hi2";
import PrimaryButton3 from "../../UiComponents/PrimaryButton3";
import Footer from "../Footer";
import CustomizeProduct from "./CustomizeProduct";
import ProductCard from "../../UiComponents/ProductCard";
import Carousel from "../../UiComponents/Carousel";
import { serverUrl } from "../../../config";
import { useRef } from "react";
import LeftRightScrollBtn from "../../Utils/LeftRightScrollBtn";
import ModalCart from "../Cart/ModalCart";
import { useRouter, useParams } from "next/navigation";
import { SafeLocalStorage } from "@/components/utils";

const ProductDetail = () => {
  const [data, setData] = useState([]);
  // const [filter, setFilter] = useState(data);
  let componentMounted = true;

  const [faq1, setfaq1] = useState(false);
  const [faq2, setfaq2] = useState(false);
  const [faq3, setfaq3] = useState(false);
  const [faq4, setfaq4] = useState(false);

  const originalId = useParams().productId;
  const [modifiedId, setModifiedId] = useState(originalId);
  const navigate = useRouter();
  const [product, setProduct] = useState({});
  const {
    cart,
    handleAdd,
    handleDel,
    handleQuantityChange,
    handleDelWithoutCust,
    handleQuantityChangeNonCust,
  } = useContext(UserContext);

  const [isCustomizing, setIsCustomizing] = useState(false);
  const [customization, setCustomization] = useState({
    name: "Your Name",
    fontStyle: product?.nameFontStyle,
    fontColor: product?.color,
    designation: "Your Designation",
    designationStyle: product?.designationFontStyle,
    designationColor: product?.designationColor,
    logo: "",
    cardColor: "#000000",
  });

  const handlefaq1 = () => {
    setfaq1(!faq1);
    setfaq2(false);
    setfaq3(false);
    setfaq4(false);
  };
  const handlefaq2 = () => {
    setfaq1(false);
    setfaq2(!faq2);
    setfaq3(false);
    setfaq4(false);
  };
  const handlefaq3 = () => {
    setfaq1(false);
    setfaq2(false);
    setfaq3(!faq3);
    setfaq4(false);
  };
  const handlefaq4 = () => {
    setfaq1(false);
    setfaq2(false);
    setfaq3(false);
    setfaq4(!faq4);
  };
  // const getProduct = (productId) => {
  //   const cartItem = cart.find((item) => item._id === productId);
  //   return cartItem;
  // };
  const getProductQuantity = (productId) => {
    const cartItem = cart.find((item) => item._id === productId);

    return cartItem ? cartItem.quantity : 0;
  };

  const addToCart = (product) => {
    handleAdd(product);
  };

  const decreaseQuantity = (product) => {
    const quantity = getProductQuantity(product?._id);
    if (quantity > 1) {
      handleQuantityChangeNonCust(product, quantity - 1);
    } else {
      handleDelWithoutCust(product);
    }
  };

  const increaseQuantity = (product) => {
    const quantity = getProductQuantity(product._id);
    if (quantity > 0) {
      handleQuantityChangeNonCust(product, quantity + 1);
    } else {
      handleAdd(product);
    }
  };

  const [selectedOrientation, setSelectedOrientation] = useState("horizontal");
  const [orientationChange, setOrientationChange] = useState(false);

  useEffect(() => {
    if (!orientationChange) {
      setModifiedId(originalId);
    }
    const getProduct = async () => {
      const response = await fetch(
        `${serverUrl}/product/getProduct/${modifiedId}`
      );
      const productData = await response.json();
      setProduct(productData);
      setSelectedOrientation(
        productData.horizontal === true ? "horizontal" : "vertical"
      );
    };
    getProduct();
    const getProducts = async () => {
      const response = await fetch(`${serverUrl}/product/getProducts/default`);
      if (componentMounted) {
        setData(await response.clone().json());
      }
      return () => {
        componentMounted = false;
      };
    };

    getProducts();
    // setOrientationChange(false);
  }, [modifiedId, originalId]);

  const [slideIndex, setSlideIndex] = useState(0);
  const [slideToIndex, setSlideToIndex] = useState(0);
  const tempImages = [
    require("../assets/Sample Product card.png"),
    require("../assets/Tapop sample cardFront.png"),
    require("../assets/Tapop sample cardBack.png"),
  ];
  // const filteredData = data.filter((product) => product._id !== id);

  //logic for modal cart
  const [openModalCart, setOpenModalCart] = useState(false);
  const changeOpenModalCart = () => {
    setOpenModalCart(false);
  };

  //similar products fetching
  const [similarProducts, setSimilarProducts] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      const response = await fetch(`${serverUrl}/product/getProducts/default`);
      const allProducts = await response.json();
      setSimilarProducts(allProducts);
    };

    getProducts();
  }, []);

  const [tempColor, setTempColor] = useState();
  useEffect(() => {
    setTempColor(SafeLocalStorage.getItem("selectedColor"));
  }, []);

  const [productImgArr, setProductImgArr] = useState([]);
  const [selectedColor, setSelectedColor] = useState("images");

  useEffect(() => {
    setSelectedColor(
      product?.silverImages &&
        product?.blackImages &&
        product?.goldImages &&
        product?.roseImages
        ? tempColor
          ? tempColor
          : "images"
        : "images"
    );
  }, [product, tempColor]);

  // console.log(product?.[selectedColor]?.slice(1, 3).unshift(product.coverimages[0]));
  // [...product?.["coverimages"], ...product?.["images"]]
  let previewImages = [];

  if (product && product[selectedColor]) {
    previewImages = product[selectedColor]
      .slice(1, 5)
      .map((imageUrl, index) => (
        <div
          className="flex justify-center items-center w-full h-full "
          key={index}
        >
          <div className="h-[300px] md:h-[423px] flex justify-center items-center">
            <img
              src={imageUrl}
              alt={`image${index}`}
              className="max-w-[65%] md:max-w-[80%] max-h-[450px] border-6 mx-1 rounded-[12px]"
            />
          </div>
        </div>
      ));
  }

  // Add product.coverimages[0] at the beginning of the array
  if (product && product.coverimages && product.coverimages[0]) {
    previewImages.unshift(
      <div
        className="flex justify-center items-center w-full h-full"
        key={-1} // You can choose any key that won't conflict with other keys
      >
        <div className="h-[300px] md:h-[423px] flex justify-center items-center">
          <img
            src={product.coverimages[0]}
            alt={`image0`}
            className="max-w-[65%] md:max-w-[80%] max-h-[450px] border-6 mx-1 rounded-[12px]"
          />
        </div>
      </div>
    );
  }

  let leftSideImg = [];

  if (product && product[selectedColor]) {
    leftSideImg = product[selectedColor].slice(1, 5).map((imageUrl, index) => (
      <div
        className="flex justify-center items-center w-full h-full p-[5px] max-w-[116px] max-h-[116px]"
        key={index}
      >
        <img
          src={imageUrl}
          alt={`image${index}`}
          className="w-full h-full  border-6 mx-1 rounded-[4px] object-contain"
        />
      </div>
    ));
  }

  // Add product.coverimages[0] at the beginning of the array
  if (product && product.coverimages && product.coverimages[0]) {
    leftSideImg.unshift(
      <div
        className="flex justify-center items-center w-full h-full p-[5px] max-w-[116px] max-h-[116px]"
        key={-1} // You can choose any key that won't conflict with other keys
      >
        <img
          src={product.coverimages[0]}
          alt={`image0`}
          className="w-full h-full border-6 mx-1 rounded-[4px] object-contain"
        />
      </div>
    );
  }

  const handleOrientationClick = (orientation) => {
    setOrientationChange(true);
    setSelectedOrientation(orientation);
    const newPropertyName = orientation + "ProductIds";
    setModifiedId(product[newPropertyName]);
  };

  const pvcType = product.pvcType;
  const material = product.material;

  return (
    <div className="Plus-Jakarta-Sans-font-div bg-[#ffffff]">
      {isCustomizing ? (
        <CustomizeProduct
          customization={customization}
          setCustomization={setCustomization}
          product={product}
          setIsCustomizing={setIsCustomizing}
          color={selectedColor}
        />
      ) : (
        <>
          <Navbar showCart />

          <div className="flex mt-[33px] mb-[45px] px-3 xsm:px-[20px] md:px-8 xl:px-14 2xl:px-[80px] items-center gap-1 xsm:gap-[16px] md:pt-[68px] bg-[#ffffff]">
            <span
              className="hover:cursor-pointer"
              onClick={() => navigate.push("/")}
            >
              Home
            </span>{" "}
            <HiChevronRight />{" "}
            <span
              className="hover:cursor-pointer"
              onClick={() => navigate.push("/products")}
            >
              Products
            </span>{" "}
            <HiChevronRight />{" "}
            <span className="text-[#817C7C]">{product.title}</span>
          </div>

          <div className="flex flex-col relative lg:flex-row px-3 xsm:px-[20px] xl:px-14 2xl:px-[80px] bg-[#ffffff]">
            {/* Don't remove this comment as it is for products images when it will fetch from backend */}
            {/* {product && product.images && ( */}
            <div className="hidden xl:flex flex-col gap-[12px] w-[160px] h-[560px] overflow-y-scroll">
              {/* {console.log(product)} */}
              {leftSideImg.map((image, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => {
                      setSlideToIndex(index);
                      //console.log(index);
                    }}
                    className={`${
                      slideIndex === index ? "bg-[#F3F3F3]" : "bg-[#F3F3F3]"
                    } flex flex-col justify-center  items-center rounded-[8px] w-[128px] h-[128px] hover:cursor-pointer`}
                  >
                    {image}
                  </div>
                );
              })}
            </div>
            {/* )} */}
            <div className="flex items-center relative justify-center w-full lg:max-w-[536px] h-[400px] lg:h-[560px] lg:ml-[20px]  py-8 xsm:py-[51px] lg:py-[119px] sm:px-[12px] bg-[#F2F2F2] rounded-[12px] ">
              <div className="max-w-full max-h-full md:max-w-[438px] md:h-[322px] relative md:-top-14">
                {/* {console.log(previewImages)} */}
                {previewImages?.length > 0 && (
                  <div className="rounded-[12px] flex flex-col justify-center items-center">
                    <Carousel
                      data={previewImages}
                      leftPosition={"left-2"}
                      rightPosition={"right-2"}
                      infinite={true}
                      dots={false}
                      sendDataToParent={(e) => {
                        setSlideIndex(e);
                      }}
                      slideToIndex={slideToIndex}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="py-[30px] md:w-[556px] md:h-[836px] max-h-full max-w-full md:px-[40px] bg-[#ffffff] rounded-[12px] text-[24px] leading-[32px] sm:text-[32px] sm:leading-[52px]">
              <p className="font-[700]">{product.title}</p>
              <div className="flex gap-[20px] items-center">
                <p className="font-[800] ">₹{product.price}</p>
                <div className="font-[800]  text-[#817C7C] relative">
                  ₹{parseInt(product.price) + 500}
                  <div className="absolute top-1/2 min-w-full h-[2px] bg-[#817c7c] rotate-[20deg] -translate-y-1/2" />
                </div>
                <p className="font-[600] text-[14px] leading-[20px] sm:text-[20px] sm:leading-[24px] text-[#12A26E]">
                  You save ₹ 500!
                </p>
              </div>

              {(product?.blackImages ||
                product?.goldImages ||
                product?.blackImages) && (
                <div className="mt-[42px] sm:mt-[56px] mb-[40px]">
                  <p className="font-[700] text-[#817C7C] text-[14px] leading-[24px] md:text-[14px]">
                    COLORS
                  </p>
                  <div className="flex gap-[16px] mt-[16px]">
                    {product?.blackImages && (
                      <button
                        onClick={() => setSelectedColor("blackImages")}
                        className="md:h-[52px] md:w-[52px] h-[36px] w-[36px] rounded-full bg-[#000] border-2 border-[#F3F3F3] shadow-[_0px_4px_8px_rgba(_151,_151,_151,_0.4)] "
                      ></button>
                    )}
                    {product?.goldImages && (
                      <button
                        onClick={() => setSelectedColor("goldImages")}
                        className="md:h-[52px] md:w-[52px] h-[36px] w-[36px] rounded-full bg-[#d7be57] border-2 border-[#DFDBD8]"
                      ></button>
                    )}
                    {product?.silverImages && (
                      <button
                        onClick={() => setSelectedColor("silverImages")}
                        className="md:h-[52px] md:w-[52px] h-[36px] w-[36px] rounded-full bg-[#adaeb2] border-2 border-[#F3F3F3]"
                      ></button>
                    )}
                    {product?.roseImages && (
                      <button
                        onClick={() => setSelectedColor("roseImages")}
                        className="md:h-[52px] md:w-[52px] h-[36px] w-[36px] rounded-full bg-[#da968d] border-2 border-[#F3F3F3]"
                      ></button>
                    )}
                  </div>
                </div>
              )}

              {/* mustali's code */}
              {product.verticalProductIds || product.horizontalProductIds ? (
                <div>
                  <p className="font-[700] text-[#817C7C] text-[14] leading-[24px] sm:text-[14px]">
                    CARD ORIENTATION
                  </p>
                  <div className="flex gap-[16px] mt-[16px]">
                    <div
                      className={`mb-[16px] ${
                        selectedOrientation === "horizontal"
                          ? "border border-[#000] rounded-[64px] "
                          : ""
                      }`}
                    >
                      <button
                        className="font-[600] text-[16px] leading-[20px] rounded-full flex justify-center items-center w-[155px] h-full gap-x-2 text-[#000000] py-[14px]"
                        onClick={() => handleOrientationClick("horizontal")}
                      >
                        Horizontal
                      </button>
                    </div>
                    <div
                      className={`mb-[16px] ${
                        selectedOrientation === "vertical"
                          ? "border border-[#000] rounded-[64px] "
                          : ""
                      }`}
                    >
                      <button
                        className="font-[600] text-[16px] leading-[20px] rounded-full flex justify-center items-center w-[155px] h-full gap-x-2 text-[#000000] py-[14px]"
                        onClick={() => handleOrientationClick("vertical")}
                      >
                        Vertical
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}
              {!product.isCustomizable && (
                <div>
                  <p className="font-[700] text-[#817C7C] text-[14px] leading-[24px] md:text-[14px]">
                    QUANTITY
                  </p>
                  <div className="mb-8 flex mt-[16px] w-[124px] border-[1px] border-[#817C7C] rounded-[64px] px-[16px] py-[10px] items-center justify-between font-[500] text-[14px] leading-[32px]">
                    <button
                      className=""
                      onClick={() => decreaseQuantity(product)}
                    >
                      -
                    </button>
                    <p>{getProductQuantity(product._id)}</p>

                    <button onClick={() => increaseQuantity(product)}>+</button>
                  </div>
                </div>
              )}
              {product?.isCustomizable && (
                <div className="mt-8">
                  <PrimaryButton3
                    width={"100%"}
                    height={"56px"}
                    icon={<HiOutlinePencilSquare />}
                    text="Customise Card"
                    onClick={() => setIsCustomizing(true)}
                  />
                </div>
              )}
              {!product.isCustomizable && (
                <PrimaryButton3
                  width={"100%"}
                  height={"56px"}
                  icon={<HiShoppingCart />}
                  text="Add to Cart"
                  onClick={() => {
                    //login for modal cart
                    setOpenModalCart(true);
                    addToCart(product);
                  }}
                />
              )}
              <div className="w-full mt-[40px] text-[18px] leading-[28px] sm:text-[24px] sm:leading-[24px]">
                <div className="pb-[36px] border-b-[1px] border-[#1a1a1a] mt-[42px]">
                  <div
                    className="flex items-center justify-between "
                    onClick={handlefaq1}
                  >
                    <p className="font-[700] ">Product details</p>
                    {faq1 ? <HiChevronUp /> : <HiChevronDown />}
                  </div>
                  {faq1 && pvcType === " nonCustomized" && (
                    <div className="mt-[42px] font-[400] text-[16px] leading-[24px]">
                      <p>
                        Elevate your networking with our NFC-enabled PVC cards,
                        designed for effortless connections.
                      </p>
                      <ul className="ml-[20px]">
                        <li>
                          <span className="font-bold">Ready-to-Use:</span>
                          Pre-designed with Qviq branding, these cards are
                          instantly usable for quick sharing.
                        </li>
                        <li>
                          <span className="font-bold"> Tap and Connect: </span>
                          Simply tap the card to compatible devices to share
                          your Qviqsite and essential details.
                        </li>
                        <li>
                          <span className="font-bold">
                            {" "}
                            Instant Impressions:{" "}
                          </span>{" "}
                          Make lasting impressions without the hassle of
                          traditional Paper business cards.
                        </li>
                        <li>
                          <span className="font-bold">QR Code Included:</span>
                          Embedded QR code for additional sharing options and
                          user- friendly interactions.
                        </li>
                        <li>
                          <span className="font-bold">
                            {" "}
                            Effortless Sharing:
                          </span>{" "}
                          Enhance your networking experience with seamless
                          digital introductions
                        </li>
                      </ul>
                    </div>
                  )}
                  {faq1 && pvcType === "customized" && (
                    <div className="mt-[42px] font-[400] text-[16px] leading-[24px]">
                      <p>
                        Customize your networking experience with our
                        NFC-enabled PVC cards tailored to your style.
                      </p>
                      <ul className="ml-[20px]">
                        <li>
                          <span className="font-bold">
                            Personalized Designs:
                          </span>
                          Choose from our range of templates and personalize
                          with your name, designation, and company logo.
                        </li>
                        <li>
                          <span className="font-bold">Tailored to You:</span>{" "}
                          Reflect your brand identity with a customized PVC
                          card, enhancing your professional presence.
                        </li>
                        <li>
                          <span className="font-bold">
                            Contactless Sharing:{" "}
                          </span>{" "}
                          Effortlessly share your Qviqsite, social media, and
                          contact details with a simple tap.
                        </li>
                        <li>
                          <span className="font-bold">Inclusive QR Code:</span>{" "}
                          Each card comes with a QR code for versatile sharing
                          options and expanded connections.
                        </li>
                        <li>
                          <span className="font-bold">
                            {" "}
                            Unique Networking:{" "}
                          </span>
                          Stand out in a crowd with a personalized card that
                          speaks volumes about your uniqueness.
                        </li>
                      </ul>
                    </div>
                  )}
                  {faq1 && pvcType === "fullyCustomized" && (
                    <div className="mt-[42px] font-[400] text-[16px] leading-[24px]">
                      <p>
                        Experience networking redefined with our fully
                        customizable NFC- enabled PVC cards.
                      </p>
                      <ul className="ml-[20px]">
                        <li>
                          <span className="font-bold">Complete Freedom:</span>
                          Upload your unique design, incorporating logos,
                          graphics, and personalized information.
                        </li>
                        <li>
                          <span className="font-bold">
                            Advanced NFC Technology:
                          </span>{" "}
                          Equipped with cutting-edge NFC technology for swift
                          and hassle-free interactions.
                        </li>
                        <li>
                          <span className="font-bold">
                            Seamless Connectivity:
                          </span>{" "}
                          Share your Qviqsite, digital portfolio, and multimedia
                          files with a single tap.
                        </li>
                        <li>
                          <span className="font-bold">Embedded QR Code:</span>{" "}
                          Enhances sharing possibilities, allowing recipients to
                          connect via QR code as well.
                        </li>
                        <li>
                          <span className="font-bold">
                            Professional Excellence:
                          </span>{" "}
                          Elevate your professional profile with a card that
                          echoes your individuality and expertise.
                        </li>
                      </ul>
                    </div>
                  )}
                  {faq1 && material === "metal" && (
                    <div className="mt-[42px] font-[400] text-[16px] leading-[24px]">
                      <p>
                        Elevate your networking with our NFC Metal Cards – where
                        sophistication meets seamless digital interactions.
                      </p>
                      <ul className="ml-[20px]">
                        <li>
                          {" "}
                          <span className="font-bold">
                            {" "}
                            Premium Metal Craftsmanship:
                          </span>{" "}
                          Expertly designed from premium metal for a sleek and
                          professional appearance.
                        </li>
                        <li>
                          <span className="font-bold">
                            Advanced NFC Technology:
                          </span>{" "}
                          Equipped with cutting-edge NFC technology for swift
                          and hassle-free interactions.
                        </li>
                        <li>
                          <span className="font-bold">
                            Laser-Engraved QR Code:
                          </span>{" "}
                          Ensures quick access to your Qviqsite and shared
                          content with precision.
                        </li>
                        <li>
                          <span className="font-bold">
                            {" "}
                            Effortless Multimedia Sharing:
                          </span>{" "}
                          Share your Qviqsite, contact details, social media,
                          websites, and multimedia content with ease.
                        </li>
                        <li>
                          <span className="font-bold">
                            {" "}
                            Lasting Impressions:
                          </span>{" "}
                          Make a memorable impact with these elegant, efficient,
                          and technologically advanced networking solutions.
                        </li>
                      </ul>
                    </div>
                  )}
                  {faq1 && material === "hybrid" && (
                    <div className="mt-[42px] font-[400] text-[16px] leading-[24px]">
                      <p>
                        <span className="font-bold">
                          Explore NFC Hybrid Cards –
                        </span>{" "}
                        Where innovation meets seamless connections for
                        unparalleled networking.
                      </p>
                      <ul className="ml-[20px]">
                        <li>
                          {" "}
                          <span className="font-bold">
                            {" "}
                            Metal-Plastic Fusion:
                          </span>{" "}
                          Combines metal and PVC, offering a harmonious blend of
                          durability and flexibility.
                        </li>
                        <li>
                          <span className="font-bold">
                            Advanced NFC Technology:
                          </span>{" "}
                          Equipped with cutting-edge NFC technology for swift
                          and hassle-free interactions.
                        </li>
                        <li>
                          <span className="font-bold">Embedded QR Code:</span>{" "}
                          Each card includes a QR code for additional sharing
                          options and ease of access.
                        </li>
                        <li>
                          <span className="font-bold">
                            {" "}
                            Versatile Information Exchange:
                          </span>{" "}
                          Effortlessly share your Qviqsite, contact details,
                          social media, websites, and files.
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
                <div className="pb-[36px] border-b-[1px] border-[#1a1a1a] mt-[42px]">
                  <div
                    className="flex items-center justify-between "
                    onClick={handlefaq2}
                  >
                    <p className="font-[700] ">Compatibility</p>
                    {faq2 ? <HiChevronUp /> : <HiChevronDown />}
                  </div>
                  {faq2 && (
                    <div className="mt-[42px] font-[400] text-[16px] leading-[24px]">
                      <p>
                        Qviq devices are designed for hassle-free sharing on
                        almost any smartphone, whether iPhone or Android, as
                        long as it can scan QR codes. Enjoy tap-to-share
                        functionality with iPhone XR & above models, along with
                        most Android phones (NFC enabled). Share your profile
                        via the qviq QR code for universal compatibility.
                      </p>
                      <ul className="ml-[20px]">
                        <li className="font-bold italic">
                          Hybrid cards & Metal cards comes with One side tap
                          functionality only. Tap from the QR code side of it to
                          share your Qviqsite.
                        </li>
                        <li className="italic">
                          Ensure NFC settings are enabled on Android devices for
                          tap-to-share functionality.
                        </li>
                        <li>
                          For a complete list of compatible devices, Check
                          compatibility list here( give link of compatibility
                          page)
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
                <div
                  // onClick={() => setfaq3(!faq3)}
                  className="pb-[36px] border-b-[1px] border-[#1a1a1a] mt-[42px]"
                >
                  <div
                    className="flex items-center justify-between "
                    onClick={handlefaq3}
                  >
                    <p className="font-[700] ">Delivery & Returns</p>
                    {faq3 ? <HiChevronUp /> : <HiChevronDown />}
                  </div>
                  {faq3 && (
                    <div className="mt-[42px] font-[400] text-[16px] leading-[24px]">
                      <p>
                        <span className="font-bold">Delivery:</span> Your order
                        will be carefully processed within 1-3 business days.
                        Anticipate delivery within 1-2 weeks for a swift Qviq
                        experience. Standard shipping takes 3-7 business days,
                        and expedited and international options are available
                        for your convenience
                      </p>
                      <p className="mt-4">
                        <span className="font-bold">Returns:</span> We
                        prioritize your satisfaction. While customized cards are
                        non- returnable, we're here to help with any inquiries
                        or issues. Reach out to our dedicated support team at
                        support@qviq.io for efficient solutions to any concerns
                        you may have. Your Qviq experience is our main piority.
                      </p>
                    </div>
                  )}
                </div>
                <div
                  // onClick={() => setfaq3(!faq3)}
                  className="pb-[36px] border-b-[1px] border-[#1a1a1a] mt-[42px]"
                >
                  <div
                    className="flex items-center justify-between "
                    onClick={handlefaq4}
                  >
                    <p className="font-[700] ">Refund Policy</p>
                    {faq4 ? <HiChevronUp /> : <HiChevronDown />}
                  </div>
                  {faq4 && (
                    <div className="mt-[42px] font-[400] text-[16px] leading-[24px]">
                      <p>
                        Thank you for choosing Qviq. We understand that
                        sometimes circumstances change, and you may need to
                        request a refund. Here's our refund policy to guide you
                        through the process:
                      </p>
                      <ul className="ml-[20px]">
                        <li className="font-[400] ">
                          <span className="font-bold  ">
                            30-Day Money-Back Guarantee:
                          </span>
                          - Qviq offers a 30-day money-back guarantee on all our
                          products. If you're not satisfied with your purchase
                          for any reason, contact our support team within 30
                          days from the date of purchase for a full refund.
                        </li>
                        <li className="font-[400] ">
                          <span className="font-bold  ">
                            Eligibility Criteria:
                          </span>
                          - To be eligible for a refund, you must have purchased
                          the Qviq product directly from our official website.
                          Products purchased through third-party platforms are
                          subject to their respective refund policies.
                        </li>
                        <li className="font-[400] ">
                          <span className="font-bold  ">Refund Process:</span>-
                          To initiate a refund, please contact our customer
                          support team at [support@qviq.io] with your purchase
                          details and the reason for the refund request. We may
                          require additional information to process your
                          request.
                        </li>
                        <li className="font-[400] ">
                          <span className="font-bold  ">Refund Timeline:</span>-
                          Once your refund request is approved, the refund will
                          be processed within 7-10 business days. Please note
                          that it may take additional time for the refund to
                          reflect in your bank or credit card statement.
                        </li>
                        <li className="font-[400] ">
                          <span className="font-bold  ">
                            Non-Refundable Items:
                          </span>
                          - Certain Qviq products, such as customized or
                          personalized items, are non-refundable unless they
                          arrive damaged or defective. In such cases, please
                          contact our support team immediately to arrange for a
                          replacement.
                        </li>
                        <li className="font-[400] ">
                          <span className="font-bold  ">
                            Contact Information:
                          </span>
                          - If you have any questions about our refund policy,
                          please contact us at [support@qviq.io]
                        </li>
                      </ul>
                      <p className="mt-6">
                        Qviq reserves the right to amend this refund policy at
                        any time without prior notice. Any changes to the policy
                        will be effective immediately upon posting on our
                        website.
                      </p>
                      <p className="mt-6">
                        Thank you for your understanding and cooperation.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div
            className={`px-3 xsm:px-5 mt-[-50px] md:px-10 xl:px-20 mb-[124px] ${
              faq1 || faq2 || faq3 ? "md:mt-[16rem]" : "mt-[-120px]"
            } relative w-full ${faq4 ? "md:mt-[55rem]" : "mt-[-120px]"} `}
          >
            <p className="font-[700] mt-20 text-xl xsm:text-[24px] leading-[32px] sm:text-[32px] sm:leading-[52px] mb-[39px] w-full">
              Similar products you may like
            </p>
            <div className="relative w-full">
              <div className="w-full overflow-scroll">
                <div className="flex gap-5 w-fit">
                  {product?.similarProductIds?.length !== 0
                    ? similarProducts
                        .filter((similarProduct) =>
                          product?.similarProductIds?.includes(
                            similarProduct._id
                          )
                        )
                        .slice(0, 2)
                        .map((product) => (
                          <div
                            className="h-fit w-[156px] md:w-[413px] md:h-[509px] py-2"
                            key={product._id}
                          >
                            <ProductCard
                              coverimages={product.coverimages[0]}
                              key={product._id}
                              product={product}
                            />
                          </div>
                        ))
                    : similarProducts.slice(0, 2).map((product) => (
                        <div
                          className="h-fit w-[156px] md:w-[413px] md:h-[509px] py-2"
                          key={product._id}
                        >
                          <ProductCard
                            coverimages={product.coverimages[0]}
                            key={product._id}
                            product={product}
                          />
                        </div>
                      ))}
                </div>

                <LeftRightScrollBtn
                  // refrence={similarProductRef}
                  style={{ display: "none" }}
                />
              </div>
              <LeftRightScrollBtn style={{ display: "none" }} />
            </div>
          </div>

          {/* cart model */}
          {openModalCart && (
            <ModalCart
              changeOpenModalCart={changeOpenModalCart}
              product={product}
            />
          )}
          <Footer />
        </>
      )}
    </div>
  );
};

export default ProductDetail;
