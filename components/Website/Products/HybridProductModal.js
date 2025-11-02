"use client";
import React, { useState, useEffect, useContext, useRef } from "react";
import { UserContext } from "../../Contexts/context";
import {
  HiChevronRight,
  HiChevronUp,
  HiOutlinePencilSquare,
  HiChevronDown,
  HiShoppingCart,
  HiChevronLeft,
  HiArrowDownLeft,
  HiArchiveBoxXMark,
  HiXMark,
} from "react-icons/hi2";
import PrimaryButton3 from "../../UiComponents/PrimaryButton3";
import ProductCard from "../../UiComponents/ProductCard";
import Carousel from "../../UiComponents/Carousel";
import { serverUrl } from "../../../config";
import LeftRightScrollBtn from "../../Utils/LeftRightScrollBtn";
import { SafeLocalStorage } from "@/components/utils";
import { useRouter } from "next/navigation";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HybridProductModal = (props) => {
  const originalId = props.productId;
  const [modifiedId, setModifiedId] = useState(originalId);
  const [product, setProduct] = useState({});
  const { cart, handleAdd, handleDelWithoutCust, handleQuantityChangeNonCust } =
    useContext(UserContext);

  const router = useRouter();

  const getProductQuantity = (productId) => {
    const cartItem = cart.find((item) => item._id === productId);

    return cartItem ? cartItem.quantity : 0;
  };

  const addToCart = (product) => {
    handleAdd(product);
    router.push("/cart");
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
    // setOrientationChange(false);
  }, [modifiedId, originalId]);

  const [slideIndex, setSlideIndex] = useState(0);
  const [slideToIndex, setSlideToIndex] = useState(0);
  const [tempColor, setTempColor] = useState();
  useEffect(() => {
    setTempColor(SafeLocalStorage.getItem("selectedColor"));
  }, []);

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

  let previewImages = [];

  if (product && product[selectedColor]) {
    previewImages = product[selectedColor]
      .slice(1, 5)
      .map((imageUrl, index) => (
        <div
          className="flex justify-center items-center w-full h-full "
          key={index}
        >
          <div className="h-[200px] md:h-[200px] flex justify-center items-center">
            <img
              src={imageUrl}
              alt={`image${index}`}
              className="max-w-[65%] md:max-w-[80%] max-h-[200px] border-6 mx-1 rounded-[12px]"
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
        <div className="h-[200px] md:h-[200px] flex justify-center items-center">
          <img
            src={product.coverimages[0]}
            alt={`image0`}
            className="max-w-[65%] md:max-w-[80%] max-h-[200px] border-6 mx-1 rounded-[12px]"
          />
        </div>
      </div>
    );
  }

  const handleOrientationClick = (orientation) => {
    setOrientationChange(true);
    setSelectedOrientation(orientation);
    const newPropertyName = orientation + "ProductIds";
    setModifiedId(product[newPropertyName]);
  };

  const sliderRef = useRef(null);

  useEffect(() => {
    sliderRef.current?.slickGoTo(slideToIndex);
  }, [slideToIndex]);

  const nextSlide = () => {
    sliderRef.current.slickNext();
  };

  const previousSlide = () => {
    sliderRef.current.slickPrev();
  };

  return (
    <>
      <div className="flex flex-row justify-between items-center w-full pb-[20px]">
        <p className="text-[24px] font-[700]">{"Fully Customized NFC Card"}</p>
        <HiXMark
          style={{ fontSize: "30px" }}
          onClick={() => props.setShowHybridModal(false)}
        />
      </div>
      <div className="flex flex-col justify-between h-full w-full relative bg-[#ffffff] overflow-y-scroll pb-[100px]">
        <div className="flex flex-col justify-start items-center w-full gap-2 pt-[20px]">
          <div className="flex items-center relative justify-center bg-[#F2F2F2] rounded-[12px] w-full">
            <div className="relative w-full h-[210px]">
              {previewImages?.length > 0 && (
                <div className="rounded-[12px] flex flex-col justify-center items-center w-full h-[210px] bg-[#ffffff]">
                  <div className={`w-full h-full`}>
                    <Slider
                      {...{
                        dots: false,
                        infinite: true,
                        speed: 800,
                        slidesToShow: 1,
                        arrows: false,
                        slidesToScroll: 1,
                        autoplay: false,
                        autoplaySpeed: 2000,
                        pauseOnHover: true,
                        cssEase: "linear",
                      }}
                      ref={sliderRef}
                    >
                      {previewImages.map((item, index) => (
                        <div key={index} className="w-full h-[210px]">
                          {item}
                        </div>
                      ))}
                    </Slider>
                    <p className="w-full text-right font-[400] text-[12px]">
                      *These images are only for Reference
                    </p>
                  </div>

                  <div
                    className={`absolute left-2 w-8 sm:w-[2rem] h-8 sm:h-[2rem] rounded-full top-1/2 -translate-y-1/2 z-30 bg-white flex justify-center items-center hover:cursor-pointer active:scale-95 duration-75`}
                    style={{ boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.25)" }}
                    onClick={previousSlide}
                  >
                    <HiChevronLeft />
                  </div>

                  <div
                    className={`absolute right-2 w-8 sm:w-[2rem] h-8 sm:h-[2rem] rounded-full top-1/2 -translate-y-1/2 z-30 bg-white flex justify-center items-center hover:cursor-pointer active:scale-95 duration-75`}
                    style={{ boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.25)" }}
                    onClick={nextSlide}
                  >
                    <HiChevronRight />
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="pt-[30px] w-full bg-[#ffffff] rounded-[12px] text-[24px] leading-[32px] mb-[10px]">
            <p className="font-[800] text-[20px]">Your Design Your Way</p>
            <div className="flex flex-col justify-evenly items-start gap-[20px]">
              <p className="font-[700] text-[24px]">₹{product.price}</p>
              {/* <div className="font-[800]  text-[#817C7C] relative">
                  ₹{parseInt(product.price) + 500}
                  <div className="absolute top-1/2 min-w-full h-[2px] bg-[#817c7c] rotate-[20deg] -translate-y-1/2" />
                </div>
                <p className="font-[600] text-[14px] leading-[20px] text-[#12A26E]">
                  You save ₹ 500!
                </p> */}
              <ul className=" list-disc list-inside bg-gray-100 rounded-2xl px-[17px] py-[12px]">
                <li className="font-[600] text-[15px] sm:text-[16px]">
                  {" "}
                  Design Process Starts After Order Confirmation
                </li>
                <li className="font-[600] text-[15px] sm:text-[16px]">
                  Our designers will reach you once you have placed your order
                </li>
              </ul>
              <p className="font-[400] text-[15px]">
                {" "}
                Qviq Fully Customized Smart Card Is designed as per your design
                requirements. Our designers will reach you out after you have
                placed your order. We make sure to achieve your satisfaction.
              </p>
            </div>

            {(product?.blackImages ||
              product?.goldImages ||
              product?.blackImages) && (
              <div className="mt-[42px] mb-[40px]">
                <p className="font-[700] text-[#817C7C] text-[14px] leading-[24px]">
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
          </div>
          <PrimaryButton3
            width={"100%"}
            height={"56px"}
            icon={<HiShoppingCart />}
            text="Add to Cart"
            onClick={() => {
              addToCart(product);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default HybridProductModal;
