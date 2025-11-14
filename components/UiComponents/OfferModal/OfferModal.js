"use client";
import Image from "next/image";
import React, { useState, useEffect, useContext } from "react";
import { HiOutlineX } from "react-icons/hi";
import PrimaryButton from "../PrimaryButton";
import offerImage from "./special-offer.png";
import iconImg from "./icon.png";
import { useRouter, usePathname } from "next/navigation";
import { UserContext } from "@/components/Contexts/context";
import { serverUrl } from "@/config";
import axios from "axios";
import { SafeLocalStorage } from "@/components/utils";

export default function OfferModal() {
  const router = useRouter();
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [productId, setProductId] = useState("663524c52c6784ebcf4f8b5d");
  const [product, setProduct] = useState({});
  const [specialCouponList, setSpecialCouponList] = useState([]);
  const { cart, handleAdd, handleQuantityChange, updateAppliedCoupon } =
    useContext(UserContext);
  const currentPath = usePathname();
  const [isClient, setIsClient] = useState(false);

  const isSubdomain = () => {
    // Check if we're in a browser environment
    if (typeof window !== "undefined") {
      const hostname = window.location.hostname;
      // Check for localhost or known domain
      const isLocalhost = hostname === "localhost";
      const isMainDomain = hostname === "qviqfrontendtest.vercel.app";
      const isClientDomain = hostname === "theeliteenterprise.com";
      setIsClient(isClientDomain);
      return !(isLocalhost || isMainDomain);
    }
    return false;
  };

  const showModal = () => {
    // If it's a subdomain, don't show the modal
    if (isSubdomain()) {
      setShowOfferModal(false);
      return;
    }

    if (isClient) {
      setShowOfferModal(false);
      return;
    }

    // Original path checks
    if (
      currentPath === "/" ||
      currentPath === "/qviqtap" ||
      currentPath === "/contact" ||
      currentPath === "/about" ||
      currentPath === "/pricing" ||
      currentPath === "/templates" ||
      currentPath === "/products" ||
      currentPath.includes("/selectprofile")
    ) {
      setTimeout(() => {
        setShowOfferModal(true);
      }, 2000);
    } else {
      setShowOfferModal(false);
    }
  };

  useEffect(() => {
    console.log("isQviqtap", currentPath, isClient);
    const admin = currentPath.includes("/admin");

    const modalData = SafeLocalStorage.getItem("offerModalData");

    if (modalData) {
      const { hiddenUntil } = JSON.parse(modalData);
      const currentTime = new Date().getTime();

      if (currentTime > hiddenUntil) {
        showModal();
        SafeLocalStorage.removeItem("offerModalData");
      }
    } else {
      showModal();
    }

    if (currentPath === "/qviqtap") {
      setTimeout(() => {
        setShowOfferModal(true);
      }, 2000);
    }
  }, [currentPath]);

  useEffect(() => {
    // Check local storage for modal visibility
    const modalData = SafeLocalStorage.getItem("offerModalData");

    if (modalData) {
      const { hiddenUntil } = JSON.parse(modalData);
      const currentTime = new Date().getTime();

      // Show modal if 3 hours have passed
      if (currentTime > hiddenUntil) {
        showModal();
        SafeLocalStorage.removeItem("offerModalData");
      }
    } else {
      // Show modal if no storage data exists
      showModal();
    }
  }, []);

  const handleClose = () => {
    // Hide modal for 3 hours
    const currentTime = new Date().getTime();
    const hiddenUntil = currentTime + 3 * 60 * 60 * 1000; // 3 hours in milliseconds

    SafeLocalStorage.setItem(
      "offerModalData",
      JSON.stringify({
        hiddenUntil,
      })
    );
    setIsClient(false);
    setaddExProduct(false);
    setShowOfferModal(false);
    console.log("closed");
  };

  const getProduct = async () => {
    try {
      const response = await axios.get(
        `${serverUrl}/product/getProduct/${productId}`
      );

      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching coupons:", error);
    }
  };
  useEffect(() => {
    getProduct();
  }, []);

  function findProductById(products, targetId) {
    return products.find((product) => product._id === targetId);
  }

  const getProductQuantity = (productId) => {
    console.log("Current cart:", cart);
    console.log("Searching for productId:", productId);

    const cartItem = cart.find((item) => item.productId === productId);

    if (!cartItem) {
      console.error("No cart item found for productId:", productId);
      return 0;
    }

    console.log("Found cartItem:", cartItem);
    return cartItem.quantity;
  };

  const getCoupons = async () => {
    try {
      const specialResponse = await axios.get(
        `${serverUrl}/coupon/getAutoOffers`
      );
      setSpecialCouponList(specialResponse.data);
      console.log("special code", specialCouponList[0].code);
    } catch (error) {
      console.error("Error fetching coupons:", error);
    }
  };

  // useEffect(() => {
  //   getCoupons();
  // }, []);

  const [addExProduct, setaddExProduct] = useState(false);
  const incProduct = () => {
    const foundProduct = findProductById(cart, productId);

    if (foundProduct) {
      handleQuantityChange(
        foundProduct,
        getProductQuantity(foundProduct.productId) + 1
      );
      console.log("Product found in cart:", foundProduct);

      router.push("/cart");
    } else {
      console.log("Product not found in cart");
    }
  };

  useEffect(() => {
    addExProduct && incProduct();
    setaddExProduct(false);
  }, [addExProduct]);

  const [ModalState, setModalState] = useState(false);
  const getModal = async () => {
    try {
      const response = await axios.get(`${serverUrl}/admin/offer/offerModal`);
      console.log(response.data);

      setModalState(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getModal();
  }, []);

  useEffect(() => {
    console.log(showOfferModal && ModalState);
  }, [showOfferModal, ModalState]);

  return ModalState && showOfferModal ? (
    <>
      <div className="fixed overflow-hidden top-0 left-0 bg-black opacity-30 h-screen w-screen z-[1000]"></div>

      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[80vh] h-fit w-[85vw] max-w-[640px] rounded-[16px] flex flex-col items-center p-[20px] md:p-[24px] pb-[30px] md:pb-[64px] z-[1001] overflow-y-scroll bg-white">
        <div className="w-full flex justify-end mb-[10px] md:mb-[18px]">
          <HiOutlineX
            onClick={handleClose}
            className="text-2xl text-black hover:scale-110 logo-fill"
            style={{ cursor: "pointer" }}
          />
        </div>

        <div className=" flex flex-col items-center">
          <p className="text-[18px] xsm:text-[22px] sm:text-[26px] md:text-[36px] font-[600] flex flex-row items-center justify-center">
            NEW YEAR&nbsp;
            <span className="text-[#FB6609]">SALE!</span>
            &nbsp;
            <Image
              alt="iconImg"
              src={iconImg}
              height={120}
              width={120}
              className="h-[22px] sm:h-[26px] md:h-[30px] w-auto"
            />
          </p>
          <p className="text-[14px] xsm:text-[16px] sm:text-[18px] md:text-[28px] font-[500] text-center text-[#FD4D26]">
            Double the power of your connections!
          </p>

          <div
            className="max-h-[360px] max-w-[458px] rounded-[20px] overflow-hidden flex justify-center items-center mt-[16px] md:mt-[27px] mb-[16px] md:mb-[27px]"
            style={{
              boxShadow: "3px 3px 15px #00000040",
              border: "1px solid #cbcbcb",
            }}
          >
            <Image
              alt="offerImage"
              src={offerImage}
              height={720}
              width={720}
              className="w-full h-auto"
            />
          </div>

          <p className="text-[14px] xsm:text-[16px] sm:text-[18px] md:text-[24px] text-center font-[600] mb-[14px] md:mb-[18px]">
            FULLY CUSTOMIZED SMART CARDS
          </p>
          <p className="text-[14px] xsm:text-[16px] sm:text-[18px] md:text-[24px] font-[400] mb-[6px]">
          Limited Period Offer
          </p>

          <PrimaryButton
            icon={<></>}
            text="Order Yours Now!"
            onClick={() => {
              handleAdd(product);
              handleClose();
              SafeLocalStorage.setItem("checkLocalCoupon", true);
              SafeLocalStorage.setItem("localProductId", product._id);
              SafeLocalStorage.setItem(
                "localCouponCode",
                specialCouponList[0].code
              );
              console.log("clicked");
              setaddExProduct(true);
              console.log("end", addExProduct);
            }}
          />
        </div>
      </div>
    </>
  ) : (
    <></>
  );
}
