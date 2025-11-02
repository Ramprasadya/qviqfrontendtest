"use client";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Contexts/context";
import Header from "../header/Navbar";
import InputField from "../../UiComponents/InputField";
import { HiOutlineClock } from "react-icons/hi";
import Select from "react-select";
import { Country, State, City } from "country-state-city";
import { HiCheck } from "react-icons/hi2";
import PrimaryButton2 from "../../UiComponents/PrimaryButton2";
import PrimaryButton3 from "../../UiComponents/PrimaryButton3";
import { useRouter } from "next/navigation";
import Image from "next/image";
import SecondaryButton from "@/components/UiComponents/SecondaryButton";
import axios from "axios";
import { serverUrl } from "@/config";
import { RxCross2 } from "react-icons/rx";
import { RiDiscountPercentFill } from "@remixicon/react";
import { CiDiscount1 } from "react-icons/ci";
import NewToast from "@/components/UiComponents/NewToast";

const Address = () => {
  const {
    cart,
    handleAdd,
    handleDel,
    userFullName,
    userEmail,
    address,
    updateAddress,
    appliedCoupon,
    updateAppliedCoupon,
  } = useContext(UserContext);

  const [mobileNumberWarning, setMobileNumberWarning] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [updatedTotal, setUpdatedTotal] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [showAlert, setShowALert] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [isCouponApplied, setIsCouponApplied] = useState(false);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateAddress({
      ...address,
      [e.target.name]: e.target.value,
    });

    if (name === "phoneNumber") {
      if (value.startsWith("0") || value.startsWith("+91")) {
        setMobileNumberWarning(
          "Phone number should not start with zero and +91"
        );
      }
      if (value.length < 10 || value.length > 10) {
        setMobileNumberWarning("Phone number should be of 10 digits");
      } else {
        setMobileNumberWarning("");
      }
    }
  };
  const navigate = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate.push("/payment");
  };
  const calculateSubtotal = () => {
    let subtotal = 0;
    cart.forEach((product) => {
      subtotal += product.quantity * product.price;
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

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const tax = calculateTax();
    const deliveryCharge = calculateDeliveryCharge();
    const total = subtotal + parseFloat(tax) + parseFloat(deliveryCharge);
    setUpdatedTotal(total.toFixed(2));
  };

  useEffect(() => {
    calculateTotal();
  }, [cart]);

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

  // const countries = Country.getAllCountries();
  const countries = [
    {
      name: "India",
      isoCode: "IN",
      flag: "🇮🇳",
      phonecode: "91",
      currency: "INR",
      latitude: "20.00000000",
      longitude: "77.00000000",
      timezones: [
        {
          zoneName: "Asia/Kolkata",
          gmtOffset: 19800,
          gmtOffsetName: "UTC+05:30",
          abbreviation: "IST",
          tzName: "Indian Standard Time",
        },
      ],
    },
  ];

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
    City.getCitiesOfState(address.country.isoCode, code).map((city) => ({
      label: city.name,
      value: city.id,
      ...city,
    }));

  //Delivery date
  const [deliveryRange, setDeliveryRange] = useState("");

  useEffect(() => {
    const calculateDeliveryDate = () => {
      const today = new Date();

      const startDelivery = new Date(today);
      startDelivery.setDate(today.getDate() + 7);

      const endDelivery = new Date(today);
      endDelivery.setDate(today.getDate() + 10);

      // Format the date to 'dd MMM yyyy'
      const formatDate = (date) => {
        const options = { day: "numeric", month: "short" };
        return date.toLocaleDateString(undefined, options);
      };
      const formatDateWithYear = (date) => {
        const options = { day: "numeric", month: "short", year: "numeric" };
        return date.toLocaleDateString(undefined, options);
      };

      const formattedStart = formatDate(startDelivery);
      const formattedEnd = formatDateWithYear(endDelivery);

      setDeliveryRange(`${formattedStart} - ${formattedEnd}`);
    };

    calculateDeliveryDate();
  }, []);

  return (
    <div className="pb-14 Plus-Jakarta-Sans-font-div">
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
            <div className="flex flex-col items-center justify-center border border-[#0A0003] rounded-full w-[24px] h-[24px]">
              <p className="text-[10px] font-[600] text-[#0A0003]">2</p>
            </div>
            <p className="text-[12px] md:text-[14px] font-[600] text-[#0A0003]  leading-[15.12px] md:leading-[17.64px]">
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

      <div className="pt-[16px] px-[20px] md:px-[32px]">
        <p className="font-[900] text-[24px] leading-[32px]  sm:text-[40px] sm:leading-[56px]">
          Delivery address
        </p>
        <div className="flex flex-col md:flex-row gap-[40px] mt-[20px]">
          <div className=" w-full bg-white p-[16px] sm:p-[24px] justify-between rounded-[12px]">
            <div className="flex gap-[12px] bg-[#f3f3f3] rounded-[12px] p-[12px] sm:p-[16px]">
              <div className="flex flex-col justify-center items-center bg-white h-[28px] w-[28px] rounded-full">
                <HiOutlineClock />
              </div>
              <div>
                <p className="font-[700] text-[14px] sm:text-[18px] leading-[24px] mb-[16px]">
                  Delivery date
                </p>
                <p className="font-[500] text-[12px] sm:text-[14px] leading-[24px]">
                  Expected delivery:
                  <span className="font-[600]">&nbsp;{deliveryRange}</span>
                </p>
                <p className="font-[500] text-[12px] sm:text-[14px] leading-[24px]">
                  You will receive your order within 7 to 10 days.
                </p>
              </div>
            </div>
            <p className="font-[600] text-[18px] sm:text-[24px] leading-[32px] mt-[28px] sm:mt-[40px] mb-[16px]">
              Delivery address
            </p>
            <p className="flex mb-7">
              <span className="text-[#FE7171] mr-2 ">* </span> Required Fields
            </p>
            <div className="flex flex-col gap-[24px]">
              <div>
                <p className="flex">
                  Full Name<span className="text-[#FE7171] ">*</span>
                </p>
                <InputField
                  width={"100%"}
                  // label="Full Name"
                  name="fullName"
                  type="text"
                  value={address.fullName}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <p className="flex">
                  Email<span className="text-[#FE7171] ">*</span>
                </p>
                <InputField
                  width={"100%"}
                  // label="Email"
                  name="email"
                  type="text"
                  value={address.email}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <p className="flex">
                  Phone Number<span className="text-[#FE7171] ">*</span>
                </p>
                <InputField
                  width={"100%"}
                  // label="Phone Number"
                  name="phoneNumber"
                  type="number"
                  value={address.phoneNumber}
                  onChange={handleInputChange}
                />
                <p className="text-[12px] text-pink1">{mobileNumberWarning}</p>
              </div>
              <div>
                <p className="flex">
                  Address Line 1<span className="text-[#FE7171] ">*</span>
                </p>
                <InputField
                  width={"100%"}
                  // label="Address Line 1"
                  name="addressLine1"
                  type="text"
                  value={address.addressLine1}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <p className="flex">
                  Address Line 2<span className="text-[#FE7171] ">*</span>
                </p>
                <InputField
                  width={"100%"}
                  // label="Address Line 2"
                  name="addressLine2"
                  type="text"
                  value={address.addressLine2}
                  onChange={handleInputChange}
                />
              </div>
              <div className="">
                <p className="label-field flex">
                  Country <span className="text-[#FE7171] ">*</span>
                </p>
                <Select
                  id="country"
                  name="country"
                  label="country"
                  options={updatedCountries}
                  value={address.country}
                  onChange={(value) => {
                    updateAddress({
                      ...address,
                      ["country"]: value,
                    });
                  }}
                />
              </div>
              <div className="flex flex-col md:flex-row gap-[24px]">
                <div className="w-full">
                  <p className="label-field flex">
                    State <span className="text-[#FE7171] ">*</span>
                  </p>
                  <Select
                    id="state"
                    name="state"
                    options={updatedStates(
                      address.country ? address.country.value : null
                    )}
                    value={address.state}
                    onChange={(value) => {
                      updateAddress({
                        ...address,
                        ["state"]: value,
                      });
                    }}
                  />
                </div>
                <div className="w-full">
                  <p className="label-field flex">
                    City<span className="text-[#FE7171] ">*</span>
                  </p>
                  <Select
                    id="city"
                    name="city"
                    options={updatedCities(
                      address.state ? address.state.isoCode : null
                    )}
                    value={address.city}
                    onChange={(value) => {
                      updateAddress({
                        ...address,
                        ["city"]: value,
                      });
                    }}
                  />
                </div>
                <div>
                  <p className="flex">
                    Pincode<span className="text-[#FE7171] ">*</span>
                  </p>
                  <InputField
                    width={"100%"}
                    // label="Pincode"
                    name="pincode"
                    type="number"
                    value={address.pincode}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white flex flex-col gap-[32px] md4:p-[32px] p-[24px] rounded-[12px] md:max-w-[420px] w-full h-fit shadow-md shadow-gray-200">
            <div className="text-[24px] font-[700]">Order summary</div>

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
                address.fullName === "" ||
                address.email === "" ||
                address.phoneNumber === "" ||
                address.addressLine1 === "" ||
                address.addressLine2 === "" ||
                address.country === "" ||
                address.state === "" ||
                address.city === "" ||
                address.pincode === "" ||
                address.phoneNumber.length != 10 ||
                address.pincode.length != 6
                  ? true
                  : false
              }
              color={
                address.fullName === "" ||
                address.email === "" ||
                address.phoneNumber === "" ||
                address.addressLine1 === "" ||
                address.addressLine2 === "" ||
                address.country === "" ||
                address.state === "" ||
                address.city === "" ||
                address.pincode === "" ||
                address.phoneNumber.length != 10 ||
                address.pincode.length != 6
                  ? "#F7B2C7"
                  : "linear-gradient(225deg, #FB6609 0%, #E40849 100%)"
              }
            />
          </div>
        </div>
      </div>
      <NewToast open={showMessage} message={message} />
    </div>
  );
};

export default Address;
