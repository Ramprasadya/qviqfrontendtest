"use client";
import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../Contexts/context";
import { serverUrl, clientUrl } from "../../../config";
import { RxCross2 } from "react-icons/rx";
import { CiDiscount1 } from "react-icons/ci";
import { RiDiscountPercentFill } from "@remixicon/react";

import {
  Box,
  Button,
  Typography,
  FormControl,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  TextField,
  Grid,
  MenuItem,
} from "@mui/material";
import Header from "../header/Navbar";
import axios from "axios";
import PrimaryButton3 from "../../UiComponents/PrimaryButton3";
import InputField from "../../UiComponents/InputField";
import { HiOutlineCreditCard } from "react-icons/hi";
import {
  HiCheck,
  HiOutlineBuildingLibrary,
  HiExclamationCircle,
  HiOutlineWallet,
} from "react-icons/hi2";
import Select from "react-select";
import { Country, State, City } from "country-state-city";
import SecondaryButton from "../../UiComponents/SecondaryButton";
import { useRouter } from "next/navigation";
import Image from "next/image";
import NewToast from "@/components/UiComponents/NewToast";
import { getCookie } from "@/components/utils";

const Payment = () => {
  const {
    cart,
    handleEmptyCart,
    setCart,
    username,
    sameBillingAddress,
    appliedCoupon,
    address,
    billingAddress,
    updateBillingAddress,
    updateSameBillingAddress,
    updateAppliedCoupon,
  } = useContext(UserContext);

  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [showAlert, setShowALert] = useState(false);
  const [isCouponApplied, setIsCouponApplied] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (!sameBillingAddress) {
      const updatedBillingAddress = {
        ...billingAddress,
        [name]: value,
      };
      updateBillingAddress(updatedBillingAddress);
    }
  };

  const handleToggleBillingAddress = () => {
    updateSameBillingAddress(!sameBillingAddress);
  };

  const handlePaymentMethodChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
  };

  const navigate = useRouter();
  const [couponCode, setCouponCode] = useState("");
  const [updatedTotal, setUpdatedTotal] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);

  const handleCouponCodeChange = (e) => {
    setCouponCode(e.target.value);
  };
  const handleCoupon = async (e) => {
    e?.preventDefault();
    const enteredCouponCode = couponCode;
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
          setIsCouponApplied(true);
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
        //   const updatedCart = cart.map((product) => ({
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
        setShowMessage(true);
        setMessage("Coupon Applied!");
        setTimeout(() => {
          setShowMessage(false);
        }, 2000);
      } else {
        updateAppliedCoupon("");
        setIsCouponApplied(false);
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

  const config = {
    headers: {
      Authorization: "Bearer " + getCookie("jwt_token_admin"),
    },
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        `${serverUrl}/product/getOrders`,
        config
      );
      // setOrder(response.data);
      // console.log("dTA",response.data)
    } catch (err) {
      console.error(err);
      if (err.response?.data?.error == "INVALID_ADMIN_TOKEN") {
        // adminSignOut();
        // navigate.push("/admin");
        console.log(err);
        
      }
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

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

  useEffect(() => {
    if (appliedCoupon != "") {
      setCouponCode(appliedCoupon);
      initCoupon(appliedCoupon);
      setIsCouponApplied(true);
    }
  }, [appliedCoupon]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      address.fullName === undefined ||
      address.fullName === "" ||
      address.email === undefined ||
      address.email === "" ||
      address.phoneNumber === undefined ||
      address.phoneNumber === "" ||
      address.addressLine1 === undefined ||
      address.addressLine1 === "" ||
      address.addressLine2 === undefined ||
      address.addressLine2 === "" ||
      address.country === undefined ||
      address.country === "" ||
      address.state === undefined ||
      address.state === "" ||
      address.city === undefined ||
      address.city === "" ||
      address.pincode === undefined ||
      address.pincode === "" ||
      address.phoneNumber.length != 10 ||
      address.pincode.length != 6
    ) {
      setMessage("Enter Valid Address!");
      setShowMessage(true);
      setTimeout(() => {
        setMessage("");
        setShowMessage(false);
        navigate.push("/cart");
      }, 3000);
      return;
    }
    const orderData = {
      username: username,
      address: address,
      paymentMethod: selectedPaymentMethod,
      totalAmount: updatedTotal,
      totalDiscount: totalDiscount,
      cart,
      sameBillingAddress: sameBillingAddress,
      billingAddress: !sameBillingAddress ? billingAddress : null,
    };
    // try {
    //   const response = await axios.post(
    //     `${serverUrl}/product/createOrder`,
    //     orderData
    //   );
    //   handleEmptyCart();
    //   const orderId = response.data.orderId;
    //   navigate.push("/success", { state: { orderId } });
    // } catch (error) {
    //   console.error(error);
    // }

    displayRazorpay(orderData);
    return;

    try {
      const response = await axios.post(
        `${serverUrl}/payment/v2/testingPayment`,
        orderData
      );
      const url = response.data.url;
      window.location.href = url;
    } catch (error) {
      console.error(error);
    }
  };

  // Razorpay Start

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function displayRazorpay(orderData) {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razropay failed to load!!");
      return;
    }

    const { data } = await axios.post(
      `${serverUrl}/payment/v2/testingpayment`,
      orderData
    );
    
    const options = {
      ...data.options,
      handler: async function (response) {
        const paymentStatusCheck = await axios.post(
          `${serverUrl}/payment/v2/paymentStatusCheck/${data.options.order_id}`,
          {
            orderData: data.orderData,
            razorpayData: response,
          }
        );
        if (paymentStatusCheck.data.success) {
          const affiliateId = window.sessionStorage.getItem("affiliateLink");
          if (affiliateId != null) {
            axios
              .post(`${serverUrl}/admin/affiliateLink/addTransaction`, {
                link: affiliateId,
                transactionData: {
                  name: orderData?.address?.fullName,
                  email: orderData?.address?.email,
                  amount: orderData.totalAmount,
                  date: new Date().toISOString(),
                  transactionId: data.options.order_id,
                  type: "product_payment",
                },
              })
              .catch((err) => console.log(err));
          }
          const passedData = {
            order_date: paymentStatusCheck.data.orderData.order_date,
            address: paymentStatusCheck.data.orderData.address,
            razorpay_order_id:
              paymentStatusCheck.data.orderData.razorpay_order_id,
          };
          window.location.href = `${clientUrl}/success?passedData=${encodeURIComponent(
            JSON.stringify(passedData)
          )}`;
        } else {
          window.location.href = `${clientUrl}/error?fromPage=cart`;
        }
      },
    };
    // console.log("payment order id",data)
    const paymentObject = new window.Razorpay(options);
    paymentObject.on("payment.failed", function (response) {
      window.location.href = `${clientUrl}/error?fromPage=cart`;
    });
    paymentObject.open();
  }

  // Razorpay End

  const calculateSubtotal = () => {
    let subtotal = 0;
    cart.forEach((product) => {
      if (product.discountPrice) {
        subtotal += product.quantity * product.discountPrice;
      } else {
        subtotal += product.quantity * product.price;
      }
    });
    return subtotal;
  };

  const calculateTax = () => {
    const taxRate = 0.0; // 10% tax rate
    const subtotal = calculateSubtotal();
    const tax = subtotal * taxRate;
    return tax.toFixed(2);
  };

  const calculateDeliveryCharge = () => {
    const deliveryCharge = 0;
    return deliveryCharge.toFixed(2);
  };
  useEffect(() => {
    calculateTotal();
  }, [cart]);
  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const tax = calculateTax();
    const deliveryCharge = calculateDeliveryCharge();
    const total = subtotal + parseFloat(tax) + parseFloat(deliveryCharge);
    setUpdatedTotal(total.toFixed(2));
    // return total.toFixed(2);
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
    return total;
  };

  const countries = Country.getAllCountries();
  const updatedCountries = countries.map((country) => ({
    label: country.name,
    value: country.isoCode,
    ...country,
  }));
  const updatedStates = (code) =>
    State.getStatesOfCountry(code).map((state) => ({
      label: state.name,
      value: state.isoCode,
      ...state,
    }));
  const updatedCities = (code) =>
    City.getCitiesOfState(address?.country?.isoCode, code).map((city) => ({
      label: city.name,
      value: city.id,
      ...city,
    }));

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

  return (
    <div className="Plus-Jakarta-Sans-font-div">
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
            <div className="flex flex-col items-center justify-center border border-[#12A26E] bg-[#12A26E] rounded-full w-[24px] h-[24px]">
              <HiCheck className="text-[#FFF]" />
            </div>
            <p className="text-[12px] md:text-[14px] font-[500] text-[#0A0003] leading-[15.12px] md:leading-[17.64px]">
              Cart
            </p>
          </div>
          <div className="border-dashed border-b-[1px] border-b-[#12A26E] w-[90px] sm:w-[145px] mb-[36px] md:mb-[38px] ml-[0px] md:ml-[-1px] mr-[-11px] md:mr-[-14px]"></div>
          <div className="flex flex-col gap-[9px] h-fit items-center">
            <div className="flex flex-col items-center justify-center border border-[#12A26E] bg-[#12A26E] rounded-full w-[24px] h-[24px]">
              <HiCheck className="text-[#FFF]" />
            </div>
            <p className="text-[12px] md:text-[14px] font-[500] text-[#0A0003]  leading-[15.12px] md:leading-[17.64px]">
              Address
            </p>
          </div>
          <div className="border-dashed border-b-[1px] border-b-[#12A26E] w-[90px] sm:w-[145px] mb-[36px] md:mb-[38px] mr-[-13px] md:mr-[-16px] ml-[-11px] md:ml-[-15px]"></div>
          <div className="flex flex-col gap-[9px] h-fit items-center">
            <div className="flex flex-col items-center justify-center border border-[#0A0003] rounded-full w-[24px] h-[24px]">
              <p className="text-[10px] font-[600] text-[#0A0003]">3</p>
            </div>
            <p className="text-[12px] md:text-[14px] font-[600] text-[#0A0003] leading-[15.12px] md:leading-[17.64px]">
              Payment
            </p>
          </div>
        </div>
      </div>

      <div className="pt-[40px] px-5 md:px-7 xl:px-20">
        <p className="font-[900] text-[24px] leading-[32px]  sm:text-[40px] sm:leading-[56px]">
          Payment method
        </p>
        <div className="flex flex-col md:flex-row gap-5 lg:gap-10 mt-[20px]">
          <div className=" w-full sm:bg-white sm:p-[24px] justify-between rounded-[12px]">
            <div className="bg-white p-[16px] rounded-[12px]">
              <p className="font-[600] text-[18px] sm:text-[24px] leading-[32px] mb-[28px]">
                Billing details
              </p>
              <div className="mb-[35px]">
                <p className="font-[600] text-[14px] sm:text-[18px] lg:text-[24px] leading-[22px]">
                  Is billing address same as delivery address?
                </p>
              </div>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={sameBillingAddress}
                      onChange={handleToggleBillingAddress}
                    />
                  }
                  label="Same as shipping address"
                />
              </Grid>
              <div className="flex flex-col gap-[24px]">
                <InputField
                  width={"100%"}
                  label="Full Name"
                  name="fullName"
                  type="text"
                  value={
                    sameBillingAddress
                      ? address.fullName
                      : billingAddress.fullName
                  }
                  disabled={sameBillingAddress}
                  onChange={handleInputChange}
                />
                <InputField
                  width={"100%"}
                  label="Email"
                  name="email"
                  type="text"
                  value={
                    sameBillingAddress ? address.email : billingAddress.email
                  }
                  disabled={sameBillingAddress}
                  onChange={handleInputChange}
                />
                <InputField
                  width={"100%"}
                  label="Phone Number"
                  name="phoneNumber"
                  type="number"
                  value={
                    sameBillingAddress
                      ? address.phoneNumber
                      : billingAddress.phoneNumber
                  }
                  disabled={sameBillingAddress}
                  onChange={handleInputChange}
                />
                <InputField
                  width={"100%"}
                  label="Address Line 1"
                  name="addressLine1"
                  type="text"
                  value={
                    sameBillingAddress
                      ? address.addressLine1
                      : billingAddress.addressLine1
                  }
                  disabled={sameBillingAddress}
                  onChange={handleInputChange}
                />
                <InputField
                  width={"100%"}
                  label="Address Line 2"
                  name="addressLine2"
                  type="text"
                  value={
                    sameBillingAddress
                      ? address.addressLine2
                      : billingAddress.addressLine2
                  }
                  disabled={sameBillingAddress}
                  onChange={handleInputChange}
                />
                <div className="">
                  <p>Country</p>
                  <Select
                    id="country"
                    name="country"
                    label="country"
                    disabled={sameBillingAddress}
                    options={updatedCountries}
                    value={
                      sameBillingAddress
                        ? address.country
                        : billingAddress.country
                    }
                    onChange={(value) => {
                      updateBillingAddress({
                        ...billingAddress,
                        ["country"]: value,
                      });
                    }}
                  />
                </div>
                <div className="flex flex-col md:flex-row gap-[24px]">
                  <div className="w-full">
                    <p>State</p>
                    <Select
                      id="state"
                      name="state"
                      options={updatedStates(
                        billingAddress.country
                          ? billingAddress.country.value
                          : null
                      )}
                      value={
                        sameBillingAddress
                          ? address.state
                          : billingAddress.state
                      }
                      disabled={sameBillingAddress}
                      onChange={(value) => {
                        updateBillingAddress({
                          ...billingAddress,
                          ["state"]: value,
                        });
                      }}
                    />
                  </div>
                  <div className="w-full">
                    <p>City</p>
                    <Select
                      id="city"
                      name="city"
                      options={updatedCities(
                        billingAddress.state
                          ? billingAddress.state.isoCode
                          : null
                      )}
                      value={
                        sameBillingAddress ? address.city : billingAddress.city
                      }
                      disabled={sameBillingAddress}
                      onChange={(value) => {
                        updateBillingAddress({
                          ...billingAddress,
                          ["city"]: value,
                        });
                      }}
                    />
                  </div>
                  <InputField
                    width={"100%"}
                    label="Pincode"
                    name="pincode"
                    type="number"
                    value={
                      sameBillingAddress
                        ? address.pincode
                        : billingAddress.pincode
                    }
                    disabled={sameBillingAddress}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white flex flex-col gap-[32px] md4:p-[32px] p-[24px] rounded-[12px] md:max-w-[420px] w-full h-fit shadow-md shadow-gray-200">
            <p className="font-[600] text-[18px] sm:text-[24px] leading-[32px]">
              Order summary
            </p>

            <div className="w-full flex flex-col gap-[24px]">
              <div className="w-full flex flex-col gap-[16px]">
                <div className="w-full flex flex-col gap-[10px]">
                  {cart.map((product, i) => (
                    <div
                      className="w-full flex flex-row justify-between"
                      key={i}
                    >
                      <p className="text-[16px] font-[600]">
                        {product.title} x {product.quantity}
                      </p>
                      <p className="text-[16px] font-[700]">
                        ₹&nbsp;{product.price}
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
                      width="100%"
                      height="45px"
                      label="Have a coupon?"
                      name="Coupon code"
                      type="text"
                      value={couponCode}
                      onChange={handleCouponCodeChange}
                    />
                    <SecondaryButton
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
                <p className="font-[700] text-[20px]">₹&nbsp;{updatedTotal}</p>
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

            <PrimaryButton3
              width={"100%"}
              onClick={handleSubmit}
              isDisabled={
                !sameBillingAddress &&
                (billingAddress.fullName === "" ||
                  billingAddress.email === "" ||
                  billingAddress.phoneNumber === "" ||
                  billingAddress.addressLine1 === "" ||
                  billingAddress.addressLine2 === "" ||
                  billingAddress.country === "" ||
                  billingAddress.state === "" ||
                  billingAddress.city === "" ||
                  billingAddress.pincode === "" ||
                  billingAddress.phoneNumber.length != 10 ||
                  billingAddress.pincode.length != 6)
                  ? true
                  : false
              }
              color={
                !sameBillingAddress &&
                (billingAddress.fullName === "" ||
                  billingAddress.email === "" ||
                  billingAddress.phoneNumber === "" ||
                  billingAddress.addressLine1 === "" ||
                  billingAddress.addressLine2 === "" ||
                  billingAddress.country === "" ||
                  billingAddress.state === "" ||
                  billingAddress.city === "" ||
                  billingAddress.pincode === "" ||
                  billingAddress.phoneNumber.length != 10 ||
                  billingAddress.pincode.length != 6)
                  ? "#F7B2C7"
                  : "linear-gradient(225deg, #FB6609 0%, #E40849 100%)"
              }
            />
          </div>
        </div>
      </div>
      {/* <Header />
      <Box py={5} bgcolor="#f5f5f5">
        <Box maxWidth="1200px" mx="auto" p={3} bgcolor="white" borderRadius={4}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" mb={3}>
                Payment Options
              </Typography>
              <FormControl component="fieldset">
                <RadioGroup
                  value={selectedPaymentMethod}
                  onChange={handlePaymentMethodChange}
                >
                  <FormControlLabel
                    value="savedCards"
                    control={<Radio />}
                    label="Saved Cards"
                  />
                  <FormControlLabel
                    value="creditDebitCard"
                    control={<Radio />}
                    label="Credit/Debit Card"
                  />
                  <FormControlLabel
                    value="googlePay"
                    control={<Radio />}
                    label="Google Pay"
                  />
                  <FormControlLabel
                    value="paytm"
                    control={<Radio />}
                    label="Paytm"
                  />
                  <FormControlLabel
                    value="netBanking"
                    control={<Radio />}
                    label="Net Banking"
                  />
                </RadioGroup>
              </FormControl>
              <Box mt={3}>
                <Typography variant="h6" mb={2}>
                  Billing Details
                </Typography>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Full Name"
                        variant="outlined"
                        fullWidth
                        required
                        value={sameBillingAddress ? fullName : ""}
                        disabled={sameBillingAddress}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        required
                        type="email"
                        value={sameBillingAddress ? email : ""}
                        disabled={sameBillingAddress}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Phone Number"
                        variant="outlined"
                        fullWidth
                        required
                        value={sameBillingAddress ? phoneNumber : ""}
                        disabled={sameBillingAddress}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Address Line 1"
                        variant="outlined"
                        fullWidth
                        required
                        value={sameBillingAddress ? addressLine1 : ""}
                        disabled={sameBillingAddress}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Address Line 2"
                        variant="outlined"
                        fullWidth
                        value={sameBillingAddress ? addressLine2 : ""}
                        disabled={sameBillingAddress}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="City"
                        variant="outlined"
                        fullWidth
                        required
                        value={sameBillingAddress ? city : ""}
                        disabled={sameBillingAddress}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="State"
                        variant="outlined"
                        fullWidth
                        required
                        value={sameBillingAddress ? state : ""}
                        disabled={sameBillingAddress}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Pincode"
                        variant="outlined"
                        fullWidth
                        required
                        value={sameBillingAddress ? pincode : ""}
                        disabled={sameBillingAddress}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Country"
                        variant="outlined"
                        fullWidth
                        required
                        value={sameBillingAddress ? country : ""}
                        disabled={sameBillingAddress}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={sameBillingAddress}
                            onChange={handleToggleBillingAddress}
                          />
                        }
                        label="Same as shipping address"
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    mt={3}
                  >
                    Place Order
                  </Button>
                </form>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                p={3}
                bgcolor="white"
                borderRadius={4}
                height="100%"
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
              >
                <Typography variant="h5" mb={3}>
                  Order Summary
                </Typography>
                {cart.map((product) => (
                  <Box key={product.id} mb={2}>
                    <Typography variant="subtitle1">{product.title}</Typography>
                    <Typography variant="body1">
                      Quantity: {product.quantity}
                    </Typography>
                    <Typography variant="body1">
                      Price: ₹{product.price}
                    </Typography>
                  </Box>
                ))}
                <Box my={2}>
                  <Typography variant="subtitle1">
                    Subtotal: ₹{calculateSubtotal()}
                  </Typography>
                  <Typography variant="subtitle1">
                    Tax: ₹{calculateTax()}
                  </Typography>
                  <Typography variant="subtitle1">
                    Delivery Charge: ₹{calculateDeliveryCharge()}
                  </Typography>
                </Box>
                <Typography variant="h6">Total: ₹{calculateTotal()}</Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box> */}

      <NewToast open={showMessage} message={message} />
    </div>
  );
};
export default Payment;
