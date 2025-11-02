"use client";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Contexts/context";
import { Box, Button, Typography } from "@mui/material";
import Header from "../header/Navbar";
import { HiOutlineXMark } from "react-icons/hi2";
import PrimaryButton3 from "../../UiComponents/PrimaryButton3";
import EmptyCart from "../../UiComponents/EmptyCart";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import InputField from "@/components/UiComponents/InputField";
import SecondaryButton from "@/components/UiComponents/SecondaryButton";
import OfferCard from "../Products/OfferCard";
import axios from "axios";
import { serverUrl } from "@/config";
import { SafeLocalStorage } from "@/components/utils";

import starterImg from "./starter.png";
import proImg from "./pro.png";
import { RxCross2 } from "react-icons/rx";
import { CiDiscount1 } from "react-icons/ci";
import NewToast from "@/components/UiComponents/NewToast";
import { RiDiscountPercentFill } from "@remixicon/react";

const Cart = () => {
  const navigate = useRouter();
  const {
    cart,
    handleAdd,
    handleDel,
    handleQuantityChange,
    appliedCoupon,
    updateAppliedCoupon,
  } = useContext(UserContext);

  const [sortedCart, setSortedCart] = useState(cart);
  const [noComboCart, setNoComboCart] = useState(cart);
  const [isCouponApplied, setIsCouponApplied] = useState(false);

  useEffect(() => {
    // Find the combo offer product
    const comboOfferProduct = cart.find((product) => product.offer === "combo");
    // Remove the combo offer product from the original array
    const otherProducts = cart.filter((product) => product.offer !== "combo");
    setNoComboCart(otherProducts);
    // Create a new products array with the combo offer product at the beginning
    setSortedCart(
      comboOfferProduct ? [comboOfferProduct, ...otherProducts] : cart
    );
  }, [sortedCart, cart]);

  const [couponCode, setCouponCode] = useState("");
  const [updatedTotal, setUpdatedTotal] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [showAlert, setShowALert] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [autoProductId, setAutoProductId] = useState("");
  const [clearLocalCoupon, setClearLocalCoupon] = useState(false);

  const handleCouponCodeChange = (e) => {
    setCouponCode(e.target.value);
  };

  useEffect(() => {
    const isLocalCoupon = SafeLocalStorage.getItem("checkLocalCoupon");
    if (isLocalCoupon) {
      setClearLocalCoupon(true);
      const localCoupon = SafeLocalStorage.getItem("localCouponCode");
      const localProductId = SafeLocalStorage.getItem("localProductId");
      setAutoProductId(localProductId);
      setCouponCode(localCoupon);
      handleCoupon();
    }
  }, []);

  const handleCoupon = async () => {
    const enteredCouponCode = couponCode;
    //console.log(enteredCouponCode);
    try {
      const response = await axios.get(`${serverUrl}/coupon/getCoupons`);
      const allCoupons = response.data;
      //console.log(allCoupons);

      const appliedCoupon = allCoupons.find(
        (coupon) => coupon.code === enteredCouponCode
      );

      if (appliedCoupon) {
        const distype = appliedCoupon.discountType;
        const discount = parseInt(appliedCoupon.discount, 10);

        if (appliedCoupon.productIds.includes("Total")) {
          setTotalDiscount(discount);
          const subtotal = calculateSubtotal();
          const tax = calculateTax();
          const deliveryCharge = calculateDeliveryCharge();
          const totalBeforeDiscount =
            subtotal + parseFloat(tax) + parseFloat(deliveryCharge);
          const discountAmount =
            distype == "Percent"
              ? (totalBeforeDiscount * (discount / 100)).toFixed(2)
              : Math.min(totalBeforeDiscount, discount);
          const updatedTotalAmount = (
            totalBeforeDiscount - discountAmount
          ).toFixed(2);
          setShowALert(false);
          setIsCouponApplied(true);
          setUpdatedTotal(updatedTotalAmount);
        } else {
          setTotalDiscount(discount);
          const subtotal = calculateSubtotal();
          const tax = calculateTax();
          const deliveryCharge = calculateDeliveryCharge();
          const totalBeforeDiscount =
            subtotal + parseFloat(tax) + parseFloat(deliveryCharge);
          const discountAmount =
            distype == "Percent"
              ? (totalBeforeDiscount * (discount / 100)).toFixed(2)
              : Math.min(totalBeforeDiscount, discount);
          const updatedTotalAmount = (
            totalBeforeDiscount - discountAmount
          ).toFixed(2);
          setShowALert(false);
          setIsCouponApplied(true);
          setUpdatedTotal(updatedTotalAmount);
        }
        // else {
        //   setTotalDiscount(discount);
        //   const subtotal = calculateSubtotal();
        //   const tax = calculateTax();
        //   const deliveryCharge = calculateDeliveryCharge();
        //   const totalBeforeDiscount =
        //     subtotal + parseFloat(tax) + parseFloat(deliveryCharge);
        //   const discountAmount =
        //     distype == "Percent"
        //       ? (totalBeforeDiscount * (discount / 100)).toFixed(2)
        //       : Math.min(totalBeforeDiscount, discount);
        //   const updatedTotalAmount = (
        //     totalBeforeDiscount - discountAmount
        //   ).toFixed(2);
        //   setShowALert(false);
        //   setIsCouponApplied(true);
        //   setUpdatedTotal(updatedTotalAmount);
        // }
        // else {
        //   const updatedCart = noComboCart.map((product) => ({
        //     ...product,
        //     discountPrice: null,
        //   }));
        //   const updatedCartWithDiscount = updatedCart.map((product) => {
        //     if (appliedCoupon.productIds.includes(product._id)) {
        //       const discountPrice =
        //         product.price -
        //         (distype == "Percent"
        //           ? (product.price * discount) / 100
        //           : Math.min(product.price, discount));
        //       return { ...product, discountPrice: discountPrice };
        //     }
        //     return product;
        //   });
        //   setCart(updatedCartWithDiscount);
        //   setShowALert(false);
        //   const newTotal = updatedCart.reduce((total, product) => {
        //     return total + product.discountPrice * product.quantity;
        //   }, 0);
        // }

        updateAppliedCoupon(enteredCouponCode);
        !isCouponApplied && setShowMessage(true);
        setMessage("Coupon Applied!");
        setTimeout(() => {
          setShowMessage(false);
        }, 2000);
      } else {
        setIsCouponApplied(false);
        updateAppliedCoupon("");
        setShowALert(true);
        setShowMessage(true);
        setMessage("Invalid Coupon Code");
        setTimeout(() => {
          setShowMessage(false);
        }, 2000);
        //console.log("Invalid coupon code");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const initCoupon = async (enteredCouponCode) => {
    try {
      const response = await axios.get(`${serverUrl}/coupon/getCoupons`);
      const allCoupons = response.data;

      const appliedCoupon = allCoupons.find(
        (coupon) => coupon.code === enteredCouponCode
      );

      if (appliedCoupon) {
        const distype = appliedCoupon.discountType;
        const discount = parseInt(appliedCoupon.discount, 10);
        if (appliedCoupon.productIds.includes("Total")) {
          setTotalDiscount(discount);
          const subtotal = calculateSubtotal();
          const tax = calculateTax();
          const deliveryCharge = calculateDeliveryCharge();
          const totalBeforeDiscount =
            subtotal + parseFloat(tax) + parseFloat(deliveryCharge);
          const discountAmount =
            distype == "Percent"
              ? (totalBeforeDiscount * (discount / 100)).toFixed(2)
              : Math.min(totalBeforeDiscount, discount);
          const updatedTotalAmount = (
            totalBeforeDiscount - discountAmount
          ).toFixed(2);
          setShowALert(false);

          setUpdatedTotal(updatedTotalAmount);
        } else {
          const updatedCart = cart.map((product) => ({
            ...product,
            discountPrice: null,
          }));
          const updatedCartWithDiscount = updatedCart.map((product) => {
            if (appliedCoupon.productIds.includes(product._id)) {
              const discountPrice =
                product.price -
                (distype == "Percent"
                  ? (product.price * discount) / 100
                  : Math.min(product.price, discount));
              return { ...product, discountPrice: discountPrice };
            }
            return product;
          });
          setCart(updatedCartWithDiscount);
          setShowALert(false);
          const newTotal = updatedCart.reduce((total, product) => {
            return total + product.discountPrice * product.quantity;
          }, 0);
        }
      } else {
        updateAppliedCoupon("");
        //console.log("Invalid coupon code");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [appliedOffer, setAppliedOffer] = useState({});

  const getOffer = async () => {
    try {
      const { data } = await axios.get(`${serverUrl}/admin/offer/getOffers`);
      // Filter the products to get those with a combo offer
      const comboOfferProducts = cart.filter(
        (product) => product.offer === "combo"
      );
      // Extract the _id of these products
      const comboOfferProductIds = comboOfferProducts.map(
        (product) => product._id
      );
      // Filter eligible offers
      const eligibleOffers = data.filter(
        (offer) =>
          comboOfferProductIds.some((id) => offer.productIds.includes(id)) ||
          offer.productIds.includes("Total")
      );
      setAppliedOffer(eligibleOffers[0] ? eligibleOffers[0] : {});
    } catch (error) {
      //console.log(error);
    }
  };

  useEffect(() => {
    //console.log(cart);
    getOffer();
  }, []);

  useEffect(() => {
    if (appliedCoupon != "") {
      setCouponCode(appliedCoupon);
      initCoupon(appliedCoupon);
      setIsCouponApplied(true);
    }
  }, [appliedCoupon]);

  const getProductQuantity = (productId) => {
    const cartItem = cart.find((item) => item.productId === productId);
    return cartItem ? cartItem.quantity : 0;
  };

  const addToCart = (product) => {
    handleAdd(product);
  };

  const decreaseQuantity = (product) => {
    const quantity = getProductQuantity(product.productId);
    if (quantity > 1) {
      handleQuantityChange(product, quantity - 1);
    } else {
      handleDel(product);
    }
  };

  const increaseQuantity = (product) => {
    handleQuantityChange(product, getProductQuantity(product.productId) + 1);
  };

  const emptyCart = () => {
    return <EmptyCart />;
  };

  const CartItems = (props) => {
    let fontColor = "#000000";
    if (props.product.color == "silverImages") {
      fontColor = "#000000";
    } else if (props.product.color == "goldImages") {
      fontColor = "#000000";
    } else if (props.product.color == "blackImages") {
      fontColor = "#FFFFFF";
    } else if (props.product.color == "roseImages") {
      fontColor = "#FFFFFF";
    }

    const [customizeImage, setCustomizeImage] = useState();
    useEffect(() => {
      setCustomizeImage(SafeLocalStorage.getItem("htmlToPngImage"));
    }, []);

    return (
      <>
        {/* {console.log(appliedOffer)} */}
        {Object.keys(appliedOffer).length !== 0 &&
          props.product.offer === "combo" && (
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
              usedIn="cart"
            />
          )}
        {Object.keys(appliedOffer).length !== 0 &&
          props.product.offer === "combo" && (
            <div className="h-[1px] w-full bg-[#F3F3F3]"></div>
          )}

        <div className="flex w-full sm:bg-white justify-between rounded-[12px] cursor-pointer gap-8">
          {/* <div className="flex gap-[12px] sm:gap-[24px]"> */}
          <div className="flex flex-col justify-center items-center md:bg-[#f3f3f3] w-[204px] px-[6px] py-[29px] sm:px-[25px] sm:py-[40px] rounded-[6px]">
            {/* <div className="flex flex-col justify-center items-center bg-[#f3f3f3] rounded-[6px] w-[250px]"> */}
            <Link
              href={`/products/${props.product._id}`}
              className="w-[103px] h-[76px] sm:w-[204px] sm:h-[145px] flex justify-center items-center relative"
              style={{ width: props.product.isVerticel ? "103px" : "103px" }}
            >
              {/* <img
                className="absolute rounded-[4px] max-h-full z-10"
                src={customizeImage}
                alt="product"
              /> */}
              <img
                className="absolute rounded-[4px] max-h-full z-20"
                // width={0}
                // height={0}
                src={
                  props?.product?.[props.product.color]?.at(0)
                    ? props?.product?.[props.product.color]?.at(0)
                    : props?.product?.["images"]?.at(0)
                }
                alt="product"
              />
            </Link>
          </div>
          <div className="w-full">
            <Link
              href={`/products/${props.product._id}`}
              className="font-[500] text-[14px] leading-[18px] sm:text-[20px] sm:leading-[32px] w-full"
            >
              {props.product.title}
            </Link>
            <p className="md:text-[16px] text-[12px] leading-[18px] sm:text-[20px] sm:leading-[32px]">
              Oriantation :{" "}
              <span className="font-[500] ">
                {" "}
                {props.product.horizontal ? "Horizontal" : "Vertical"}
              </span>
            </p>
            <p className="font-[700] my-[8px] text-[14px] leading-[18px] sm:text-[20px] sm:leading-[32px]">
              {" "}
              ₹ {props.product.price}
            </p>
            <div>
              <p className="font-[400] text-[#1a1a1a] text-[12px] sm:text-[16px] leading-[32px]">
                Quantity
              </p>
              <div className="flex w-[100px] sm:w-[124px] border-[1px] border-[#817C7C] rounded-[64px] items-center justify-around font-[500] text-[14px] leading-[32px]">
                {props.product.offer !== "combo" && (
                  <button
                    className="flex flex-col justify-center items-center w-[28px] h-[28px] sm:w-[36px] sm:h-[36px] hover:bg-white rounded-full"
                    onClick={() => decreaseQuantity(props.product)}
                  >
                    -
                  </button>
                )}

                <p>{getProductQuantity(props.product.productId)}</p>

                {props.product.offer !== "combo" && (
                  <button
                    className="flex flex-col justify-center items-center w-[28px] h-[28px] sm:w-[36px] sm:h-[36px] hover:bg-white rounded-full"
                    onClick={() => increaseQuantity(props.product)}
                  >
                    +
                  </button>
                )}
              </div>
            </div>
          </div>
          {/* </div> */}
          <div className="w-[40px] h-[40px]">
            <button
              onClick={() => {
                handleDel(props.product);
                if (clearLocalCoupon) {
                  SafeLocalStorage.removeItem("checkLocalCoupon");
                  SafeLocalStorage.removeItem("localCouponCode");
                  SafeLocalStorage.removeItem("localProductId");
                }
              }}
              className="flex flex-col justify-center items-center bg-[#fafafa] rounded-full w-[40px] h-[40px] "
            >
              <HiOutlineXMark />
            </button>
          </div>
        </div>

        {Object.keys(appliedOffer).length !== 0 &&
          props.product.offer === "combo" && (
            <>
              <div className="flex w-full sm:bg-white justify-between rounded-[12px] cursor-pointer gap-8">
                <div className="flex flex-col justify-center items-center md:bg-[#f3f3f3] w-[153px] h-[153px] px-[6px] py-[29px] sm:px-[25px] sm:py-[40px] rounded-[6px]">
                  <div
                    href={`/products/${props.product._id}`}
                    className="w-[103px] h-[103px] sm:w-[103px] sm:h-[103px] flex justify-center items-center relative"
                  >
                    <Image
                      className=""
                      width={132}
                      height={132}
                      src={
                        appliedOffer.plans?.[0]?.includes("starter")
                          ? starterImg
                          : proImg
                      }
                      alt="product"
                    />
                  </div>
                </div>

                <div className="w-full">
                  <div
                    href={`/products/${props.product._id}`}
                    className="font-[500] text-[14px] leading-[18px] sm:text-[20px] sm:leading-[32px] w-full"
                  >
                    {appliedOffer.plans?.[0]?.includes("starter")
                      ? `Starter plan`
                      : `Pro plan`}
                  </div>
                  <p className="md:text-[16px] text-[12px] leading-[18px] sm:text-[20px] sm:leading-[32px]">
                    Duration :{" "}
                    <span className="font-[500] ">
                      {appliedOffer.plans?.[0]?.includes("monthly")
                        ? "Monthly (1 month)"
                        : appliedOffer.plans?.[0]?.includes("quarterly")
                        ? "Quarterly (3 months)"
                        : "Annually (1 year)"}
                    </span>
                  </p>
                  <p className="font-[700] my-[8px] text-[14px] leading-[18px] sm:text-[20px] sm:leading-[32px]">
                    {" "}
                    ₹ {appliedOffer.price}
                  </p>
                </div>
                <div className="w-[40px] h-[40px]">
                  <button
                    onClick={() => {
                      setAppliedOffer(false);
                    }}
                    className="flex flex-col justify-center items-center bg-[#fafafa] rounded-full w-[40px] h-[40px] "
                  >
                    <HiOutlineXMark />
                  </button>
                </div>
              </div>
              {cart.length > 1 && (
                <div className="h-[1px] w-full bg-[#F3F3F3]"></div>
              )}
            </>
          )}
      </>
    );
  };

  const [subTotal, setSubTotal] = useState(0);

  const calculateSubtotal = () => {
    let subtotal = 0;
    cart.forEach((product) => {
      subtotal += parseFloat(product.quantity) * parseFloat(product.price);
    });

    return subtotal;
  };

  const calculateTax = () => {
    const taxRate = 0.0;
    const subtotal = calculateSubtotal();
    const tax = subtotal * taxRate;
    return tax.toFixed(2);
  };

  const calculateDeliveryCharge = () => {
    const deliveryCharge = 0;
    return deliveryCharge.toFixed(2);
  };

  const newtotal = () => {
    let subtotal = 0;
    cart.forEach((product) => {
      subtotal += parseFloat(product.quantity) * parseFloat(product.price);
    });
    const taxRate = 0.0;
    const tax = subtotal * taxRate;
    const deliveryCharge = 0;
    const total = subtotal + parseFloat(tax) + parseFloat(deliveryCharge);
    return total.toFixed(2);
  };

  const calculateTotal = () => {
    // Calculate total amount including subtotal, tax, and delivery charge
    const subtotal = calculateSubtotal();
    setSubTotal(subtotal);
    const tax = calculateTax();
    const deliveryCharge = calculateDeliveryCharge();
    const total = subtotal + parseFloat(tax) + parseFloat(deliveryCharge);
    setUpdatedTotal(total.toFixed(2));

    return total.toFixed(2);
  };

  useEffect(() => {
    handleCoupon();
  }, [subTotal]);

  useEffect(() => {
    calculateTotal();
  }, [subTotal, cart]);

  const calculateProductTax = (price) => {
    return (price * 0.18).toFixed(2); // 18% tax
  };

  const calculateTotalTax = () => {
    let totalTax = 0;
    cart.forEach((product) => {
      totalTax +=
        product.quantity * parseFloat(calculateProductTax(product.price));
    });
    return totalTax.toFixed(2);
  };

  const calculateSubtotalWithoutTax = () => {
    const subtotal = calculateSubtotal();
    const totalTax = parseFloat(calculateTotalTax());
    return (subtotal - totalTax).toFixed(2);
  };

  // check user login or not
  const { username } = useContext(UserContext);
  const checkUser = () => {
    // if (username === "") {
    //   navigate.push("/signup?"+createQueryString(['fromPage'],["cart"]));
    // } else {
    navigate.push("/address");
    // }
  };
  // console.log(cart);

  return (
    <div className="Plus-Jakarta-Sans-font-div">
      {cart.length !== 0 && (
        <div className="w-full flex flex-col md:flex-row items-center justify-center pt-[16px] md:pt-[23.5px] pb-[16px] md:pb-[21.5px] border-b-[1px] border-[#DFDBD8] relative gap-[20px] md:gap-[0px]">
          <Image
            onClick={() => {
              navigate.push("/");
            }}
            className="h-[40px] w-auto hidden md:block hover:cursor-pointer absolute top-[28px] left-[80px]"
            src={require("../../Images/TapopLogoBlack.png")}
            alt="logo"
          />
          <Image
            className="h-[30px] w-auto md:hidden hover:cursor-pointer mr-[14px]"
            onClick={() => {
              navigate.push("/");
            }}
            src={require("../../Image/tapopmobile.png")}
            alt="logo"
          />

          <div className="flex flex-row">
            <div className="flex flex-col gap-[9px] h-fit items-center">
              <div className="flex flex-col items-center justify-center border border-[#1a1a1a] rounded-full w-[24px] h-[24px]">
                <p className="text-[10px] font-[600] text-[#0A0003]">1</p>
              </div>
              <p className="text-[12px] md:text-[14px] font-[600] text-[#0A0003] leading-[15.12px] md:leading-[17.64px]">
                Cart
              </p>
            </div>
            <div className="border-dashed border-b-[1px] border-b-[#A7A7A7] w-[90px] sm:w-[145px] mb-[36px] md:mb-[38px] ml-[0px] md:ml-[-1px] mr-[-11px] md:mr-[-14px]"></div>
            <div className="flex flex-col gap-[9px] h-fit items-center">
              <div className="flex flex-col items-center justify-center border border-[#A7A7A7] rounded-full w-[24px] h-[24px]">
                <p className="text-[10px] font-[600] text-[#A7A7A7]">2</p>
              </div>
              <p className="text-[12px] md:text-[14px] font-[400] text-[#817C7C]  leading-[15.12px] md:leading-[17.64px]">
                Address
              </p>
            </div>
            <div className="border-dashed border-b-[1px] border-b-[#A7A7A7] w-[90px] sm:w-[145px] mb-[36px] md:mb-[38px] mr-[-13px] md:mr-[-16px] ml-[-11px] md:ml-[-15px]"></div>
            <div className="flex flex-col gap-[9px] h-fit items-center">
              <div className="flex flex-col items-center justify-center border border-[#A7A7A7] rounded-full w-[24px] h-[24px]">
                <p className="text-[10px] font-[600] text-[#A7A7A7]">3</p>
              </div>
              <p className="text-[12px] md:text-[14px] font-[400] text-[#817C7C] leading-[15.12px] md:leading-[17.64px]">
                Payment
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="pt-[32px] md:p-[32px] flex flex-col gap-[28px]">
        {cart.length !== 0 && (
          <p className="font-[700] text-[24px] sm:text-[40px] w-full md:pl-0 pl-[24px]">
            Your shopping cart
          </p>
        )}

        {cart.length === 0 && emptyCart()}

        {cart.length !== 0 && (
          <div className="w-full flex flex-col md:flex-row justify-between md4:gap-[40px] md:gap-[24px]">
            <div className="w-full flex flex-col md4:gap-[32px] gap-[24px] md4:p-[32px] p-[24px] rounded-[12px] bg-white shadow-md shadow-gray-200">
              {sortedCart.map((product, i) => (
                <CartItems
                  product={product}
                  key={i}
                  appliedOffer={appliedOffer}
                />
              ))}
            </div>

            <div className="md:hidden block w-full h-[1px] bg-[#F3F3F3]"></div>

            <div className="bg-white flex flex-col gap-[32px] md4:p-[32px] p-[24px] rounded-[12px] md:max-w-[420px] w-full h-fit shadow-md shadow-gray-200">
              <div className="text-[24px] font-[700]">Order summary</div>

              <div className="w-full flex flex-col gap-[24px]">
                <div className="w-full flex flex-col gap-[16px]">
                  <div className="w-full flex flex-col gap-[10px]">
                    {cart.map((product) => (
                      <div className="w-full flex flex-row justify-between">
                        <p className="text-[16px] font-[600] flex flex-row items-center">
                          {product.title} &nbsp;
                          <HiOutlineXMark />
                          &nbsp; {product.quantity}
                        </p>
                        <p className="text-[16px] font-[700]">
                          ₹&nbsp;{product.price * product.quantity}
                        </p>
                      </div>
                    ))}
                  </div>

                  {isCouponApplied && (
                    <div className="flex flex-row justify-between items-center cursor-pointer border border-dotted border-[#e40849] px-[10px] rounded-[12px] bg-[#FAFAFA] py-[16px] shadow-md">
                      <div className="flex flex-row gap-[5px] w-[90%] items-center">
                        <RiDiscountPercentFill
                          className="text-green-500"
                          size={20}
                        />
                        <p className="text-[16px] font-[400]">
                          <span className="text-[16px] font-[500] text-linear-gradient pr-[5px]">
                            {couponCode}
                          </span>
                          Coupon is Applied
                        </p>
                      </div>
                      <RxCross2
                        className="text-[20px]"
                        onClick={() => {
                          SafeLocalStorage.removeItem("localCouponCode");
                          SafeLocalStorage.removeItem("checkLocalCoupon");
                          setIsCouponApplied(false);
                          updateAppliedCoupon("");
                          setCouponCode("");
                          calculateTotal();
                        }}
                      />
                    </div>
                  )}

                  {!isCouponApplied && (
                    <div className="w-full flex flex-row justify-between items-end gap-[12px]">
                      <InputField
                        isDisabled={isCouponApplied ? true : false}
                        width="100%"
                        height="45px"
                        label={isCouponApplied ? "" : "Have a coupon?"}
                        name="Coupon code"
                        type="text"
                        value={isCouponApplied ? "" : couponCode}
                        onChange={handleCouponCodeChange}
                      />
                      <SecondaryButton
                        isDisabled={isCouponApplied ? true : false}
                        height="45px"
                        text="Apply"
                        onClick={handleCoupon}
                      />
                    </div>
                  )}
                </div>

                <div className="w-full h-[1px] bg-[#DFDBD8]"></div>

                <div className="w-full flex flex-row justify-between">
                  <p className="text-[16px] font-[600]">Subtotal</p>
                  <p className="text-[16px] font-[700]">
                    ₹&nbsp;{calculateSubtotalWithoutTax()}
                  </p>
                </div>

                <div className="w-full flex flex-col gap-[16px]">
                  <div className="w-full flex flex-row justify-between">
                    <p className="text-[16px] font-[400]">GST</p>
                    <p className="text-[16px] font-[700]">
                      ₹&nbsp;{calculateTotalTax()}
                    </p>
                  </div>
                  <div className="w-full flex flex-row justify-between">
                    <p className="text-[16px] font-[400]">Delivery charges</p>
                    <p className="text-[16px] font-[700] text-green-500 ">
                      {/* ₹{DeliveryCharge} */}
                      FREE
                    </p>
                  </div>
                </div>

                <div className="w-full h-[1px] bg-[#DFDBD8]"></div>

                <div className="w-full flex flex-row justify-between">
                  <p className="font-[700] text-[20px]">Total</p>
                  <p className="font-[700] text-[20px]">
                    ₹&nbsp;{updatedTotal}
                  </p>
                </div>

                {calculateSubtotal() - updatedTotal > 0 && (
                  <div className="w-full flex flex-row justify-between">
                    <p className="text-[16px] font-[400]">You are saving</p>
                    <p className="text-[16px] font-[700] text-green-500 ">
                      ₹&nbsp;{calculateSubtotal() - updatedTotal}
                    </p>
                  </div>
                )}
              </div>

              <PrimaryButton3 width={"100%"} onClick={checkUser} />
            </div>
          </div>
        )}
      </div>
      {couponCode !== "" && <NewToast open={showMessage} message={message} />}
    </div>
  );
};

export default Cart;
