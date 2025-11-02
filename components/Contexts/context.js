"use client";
import React, { useEffect } from "react";
import { useState, createContext } from "react";
import axios from "axios";
import { HiOutlineCube, HiOutlineShieldCheck } from "react-icons/hi";
import { HiOutlineBolt } from "react-icons/hi2";
import { serverUrl } from "../../config";
import { SafeLocalStorage, getCookie } from "../utils";

const UserContext = createContext();

const ISSERVER = typeof window === "undefined";

function UserContextProvider(props) {
  //username
  const [username, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userFullName, setUserFullName] = useState("");
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState("")
  const [userPicture, setUserPicture] = useState("")

  // user type
  const [userType, setUserType] = useState("Free");
  const [userIcon, setUserIcon] = useState(<HiOutlineCube />);
  // loading 
  const  [loading, setLoading] = useState(true)

  // lead capture and quick select context
  const [quickSelectContext, setQuickSelectContext] = useState(false);
  const [leadCaptureContext, setLeadCaptureContext] = useState(false);

  // dummystate
  const [dummyState, setDummyState] = useState(true);

  // toast state for whole app for showing toast
  const [showToastContext, setShowToastContext] = useState(false);
  const [toastMessageContext, setToastMessageContext] = useState("");

  const [formData, setFormData] = useState({});

  //inbuilt dialog
  const [inBuiltDialog, setInBuiltDialog] = useState(false);
  const [inBuiltDialogPlatform, setInBuiltDialogPlatform] = useState("");
  const inBuiltDialogToggle = () => {
    setInBuiltDialog((prev) => !prev);
  };

  //analytics dropdown
  const [analyticsDropdown, setAnalyticsDropdown] = useState(false);
  const analyticsDropdownToggle = () => {
    setAnalyticsDropdown((prev) => !prev);
  };

  //analytics state (month,week,day)
  const [analyticsState, setAnalyticsState] = useState("month");
  const analyticsStateUpdate = (e) => {
    SafeLocalStorage.setItem("analyticsState", e);
    setAnalyticsState(e);
  };

  //check variable to whether update data or not
  const [checkVariable, setCheckVariable] = useState(false);
  const updateCheckVariable = () => {
    setCheckVariable(!checkVariable);
  };

  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState({
    fullName: userFullName,
    email: userEmail,
    phoneNumber: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    country: "",});
  const [billingAddress, setBillingAddress] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    country: "",});
  const [sameBillingAddress, setSameBillingAddress] = useState(false);
  const [appliedCoupon, setAppliedCoupon]  = useState("");

  useEffect(() => {
    setAnalyticsState(SafeLocalStorage.getItem("analyticsState") || "month");
    const savedCart = SafeLocalStorage.getItem("cart");
    const savedFormData = SafeLocalStorage.getItem("formData");
    const localaddress = SafeLocalStorage.getItem("address");
    const localbillingAddress = SafeLocalStorage.getItem("billingAddress");
    const localsameBillingAddress = SafeLocalStorage.getItem("sameBillingAddress");
    const localappliedCoupon = SafeLocalStorage.getItem("appliedCoupon");
    setFormData(
      savedFormData
        ? JSON.parse(savedFormData)
          ? JSON.parse(savedFormData)
          : {}
        : {}
    );
    setAddress(
      localaddress
        ? JSON.parse(localaddress)
          ? JSON.parse(localaddress)
          : {
            fullName: userFullName,
            email: userEmail,
            phoneNumber: "",
            addressLine1: "",
            addressLine2: "",
            city: "",
            state: "",
            pincode: "",
            country: "",}
        : {
          fullName: userFullName,
          email: userEmail,
          phoneNumber: "",
          addressLine1: "",
          addressLine2: "",
          city: "",
          state: "",
          pincode: "",
          country: "",}
    );
    setBillingAddress(
      localbillingAddress
        ? JSON.parse(localbillingAddress)
          ? JSON.parse(localbillingAddress)
          : {
            fullName: "",
            email: "",
            phoneNumber: "",
            addressLine1: "",
            addressLine2: "",
            city: "",
            state: "",
            pincode: "",
            country: "",}
        : {
          fullName: "",
          email: "",
          phoneNumber: "",
          addressLine1: "",
          addressLine2: "",
          city: "",
          state: "",
          pincode: "",
          country: "",}
    );
    setSameBillingAddress(localsameBillingAddress=='true'? true:false);
    setAppliedCoupon(localappliedCoupon?localappliedCoupon:"");
    setCart(
      savedCart ? (JSON.parse(savedCart) ? JSON.parse(savedCart) : []) : []
    );
  }, []);

  const updateAddress = (data)=>{
    SafeLocalStorage.setItem('address',JSON.stringify(data));
    setAddress(data);
  }
  const updateBillingAddress = (data)=>{
    SafeLocalStorage.setItem('billingAddress',JSON.stringify(data));
    setBillingAddress(data);
  }
  const updateSameBillingAddress = (data)=>{
    SafeLocalStorage.setItem('sameBillingAddress',data);
    setSameBillingAddress(data);
  }
  const updateAppliedCoupon = (data)=>{
    SafeLocalStorage.setItem('appliedCoupon',data);
    setAppliedCoupon(data);
  }
  

  const randomUniqueId = () => {
    let id = Math.floor(Math.random() * 1000000);
    let flag = true;
    while (flag) {
      flag = false;
      id = Math.floor(Math.random() * 1000000);
      cart.forEach((element) => {
        if (element.id == id) flag = true;
      });
    }
    return id;
  };

  const handleAdd = async (productWithCustomization) => {
    try {
      const updatedCart = [...cart];
      productWithCustomization = {
        ...productWithCustomization,
        productId: randomUniqueId(),
      };
      const existingItemIndex = updatedCart.findIndex((item) =>
        item.isCustomizable ? false : item._id === productWithCustomization._id
      );

      if (existingItemIndex !== -1) {
        updatedCart[existingItemIndex].quantity += 1;
      } else {
        updatedCart.push({ ...productWithCustomization, quantity: 1 });
      }

      if (username != "") {
        const response = await axios.post(
          `${serverUrl}/product/cart/updateCart`,
          {
            userName: username,
            cart: updatedCart,
          }
        );
        setCart(response.data ? response.data : []);
        SafeLocalStorage.setItem(
          "cart",
          JSON.stringify(response.data ? response.data : [])
        );
      } else {
        setCart(updatedCart);
        SafeLocalStorage.setItem("cart", JSON.stringify(updatedCart));
      }
    } catch (error) {
      //console.log(error);
    }
  };

  const handleDel = async (productWithCustomization) => {
    try {
      const updatedCart = [...cart];
      const existingItemIndex = updatedCart.findIndex(
        (item) => item.productId === productWithCustomization.productId
      );

      if (existingItemIndex !== -1) {
        // if (updatedCart[existingItemIndex].quantity > 1) {
        //   updatedCart[existingItemIndex].quantity -= 1;
        // } else {
          updatedCart.splice(existingItemIndex, 1);
        // }
      }

      if (username != "") {
        const response = await axios.post(
          `${serverUrl}/product/cart/updateCart`,
          {
            userName: username,
            cart: updatedCart,
          }
        );
        setCart(response.data ? response.data : []);
        SafeLocalStorage.setItem(
          "cart",
          JSON.stringify(response.data ? response.data : [])
        );
      } else {
        setCart(updatedCart);
        SafeLocalStorage.setItem("cart", JSON.stringify(updatedCart));
      }
    } catch (error) {
      //console.log(error);
    }
  };
  //for without customizable card
  const handleDelWithoutCust = async (productWithCustomization) => {
    try {
      const updatedCart = [...cart];
      const existingItemIndex = updatedCart.findIndex(
        (item) => item._id === productWithCustomization._id
      );

      if (existingItemIndex !== -1) {
        if (updatedCart[existingItemIndex].quantity > 1) {
          updatedCart[existingItemIndex].quantity -= 1;
        } else {
          updatedCart.splice(existingItemIndex, 1);
        }
      }

      if (username != "") {
        const response = await axios.post(
          `${serverUrl}/product/cart/updateCart`,
          {
            userName: username,
            cart: updatedCart,
          }
        );
        setCart(response.data ? response.data : []);
        SafeLocalStorage.setItem(
          "cart",
          JSON.stringify(response.data ? response.data : [])
        );
      } else {
        setCart(updatedCart);
        SafeLocalStorage.setItem("cart", JSON.stringify(updatedCart));
      }
    } catch (error) {
      //console.log(error);
    }
  };
  const handleEmptyCart = async () => {
    try {
      if (username != "") {
        await axios.post(`${serverUrl}/product/cart/removeCart`, {
          userName: username,
        });
      }

      setCart([]);
      SafeLocalStorage.removeItem("cart");
    } catch (error) {
      //console.log(error);
    }
  };

  const handleQuantityChange = async (
    productWithCustomization,
    newQuantity
  ) => {
    try {
      const updatedCart = cart.map((item) => {
        if (item.productId === productWithCustomization.productId) {
          return {
            ...item,
            quantity: newQuantity,
          };
        }
        return item;
      });
      console.log(updatedCart);
      

      if (username != "") {
        const response = await axios.post(
          `${serverUrl}/product/cart/updateCart`,
          {
            userName: username,
            cart: updatedCart,
          }
        );
        setCart(response.data ? response.data : []);
        SafeLocalStorage.setItem(
          "cart",
          JSON.stringify(response.data ? response.data : [])
        );
      } else {
        setCart(updatedCart);
        console.log("done");
        
        SafeLocalStorage.setItem("cart", JSON.stringify(updatedCart));
      }
    } catch (error) {
      //console.log(error);
    }
  };

  //for non customizable card
  const handleQuantityChangeNonCust = async (
    productWithoutCustomization,
    newQuantity
  ) => {
    try {
      const updatedCart = cart.map((item) => {
        if (item._id === productWithoutCustomization._id) {
          return {
            ...item,
            quantity: newQuantity,
          };
        }
        return item;
      });

      if (username != "") {
        const response = await axios.post(
          `${serverUrl}/product/cart/updateCart`,
          {
            userName: username,
            cart: updatedCart,
          }
        );
        setCart(response.data ? response.data : []);
        SafeLocalStorage.setItem(
          "cart",
          JSON.stringify(response.data ? response.data : [])
        );
      } else {
        setCart(updatedCart);
        SafeLocalStorage.setItem("cart", JSON.stringify(updatedCart));
      }
    } catch (error) {
      //console.log(error);
    }
  };

  useEffect(() => {
    if (SafeLocalStorage.getItem("user")) {
      let user = JSON.parse(SafeLocalStorage.getItem("user"));
      setUsername(user.userName);
      setUserFullName(user.name);
      setUserFirstName(user.firstName);
      setUserLastName(user.lastName);
      setUserEmail(user.email);
    }
    if(SafeLocalStorage.getItem("phoneNumber")){
      let number = SafeLocalStorage.getItem("phoneNumber")
      setUserPhoneNumber(number)
    }
    if(SafeLocalStorage.getItem("picture")){
      let picture = SafeLocalStorage.getItem("picture")
      setUserPicture(picture)
    }
  }, [checkVariable]);

  const fetchData = async () => {
    const config = {
      headers: {
        Authorization: "Bearer " + getCookie("jwt_token"),
      },
    };
    try {
      const res = await axios.get(
        `${serverUrl}/getUser/getUser/${username}`,
        config
      );
      if (res.data[0].basic) {
        setUserType("Basic");
        setUserIcon(<HiOutlineCube />);
      }
      if (res.data[0].starter) {
        setUserType("Starter");
        setUserIcon(<HiOutlineShieldCheck />);
      }
      if (res.data[0].pro) {
        setUserType("Pro");
        setUserIcon(<HiOutlineBolt />);
      }
      if (res.data[0].quickSelect) {
        setQuickSelectContext(true);
      }
      if (res.data[0].contactForm) {
        setLeadCaptureContext(true);
      }
    } catch (error) {
      //console.log(error);
    }finally{
      setLoading(false)
    }
  };

  const fetchCart = async () => {
    const localCartData = SafeLocalStorage.getItem("yourCartItems");
    const data = localCartData
      ? JSON.parse(localCartData)
        ? JSON.parse(localCartData)
        : []
      : [];
    try {
      const response = await axios.get(
        `${serverUrl}/product/cart/getCart/${username}`,
        {
          headers: {
            Authorization: "Bearer " + getCookie("jwt_token"),
          },
        }
      );
      if (response.data.length !== 0) {
        setCart(response.data);
        SafeLocalStorage.setItem("cart", JSON.stringify(response.data));
      } else {
        setCart(data);
        SafeLocalStorage.setItem("cart", JSON.stringify(data));
      }
    } catch (error) {
      //console.log(error);
    }
  };

  useEffect(() => {
    if (username !== "") {
      fetchData();
      fetchCart();
    }
  }, [username, checkVariable]);

  const updateFormData = (data) => {
    SafeLocalStorage.setItem("formData", JSON.stringify(data));
    setFormData(data);
  };

  // copy to clipboard function
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setToastMessageContext("Copied to clipboard");
    setShowToastContext(true);
    setTimeout(() => {
      setShowToastContext(false);
      setToastMessageContext("");
    }, 2000);
  };

  const clearStates = async () => {
    setInBuiltDialog(false);
    setInBuiltDialogPlatform("");
    setAnalyticsDropdown(false);
    setCart([]);
    setUsername("");
    setUserEmail("");
    setUserFullName("");
    setUserFirstName("");
    setUserLastName("");
    setUserType("Free");
    setUserIcon(<HiOutlineCube />);
    setQuickSelectContext(false);
    setLeadCaptureContext(false);
    setFormData({});
    setDummyState(true);
    setShowToastContext(false);
    setToastMessageContext("");
    analyticsStateUpdate("month");
    
    setAddress({});
    setBillingAddress({});
    setSameBillingAddress(false);
    setAppliedCoupon("");
  };

  const clearCookie = async (name) => {
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() - 1);

    const cookieValue =
      encodeURIComponent("") + `; expires=${expirationDate.toUTCString()}`;
    document.cookie = `${name}=${cookieValue}; path=/`;
  };
  const userSignOut = async () => {
    await clearStates();
    clearCookie("jwt_token");
    SafeLocalStorage.clear();
  };
  const adminSignOut = async () => {
    clearCookie("jwt_token_admin");
  };

  return (
    <UserContext.Provider
      value={{
        checkVariable,
        updateCheckVariable,
        username,
        userEmail,
        userFullName,
        userFirstName,
        userLastName,
        userIcon,
        userType,
        quickSelectContext,
        leadCaptureContext,
        setQuickSelectContext,
        setLeadCaptureContext,
        inBuiltDialog,
        inBuiltDialogToggle,
        inBuiltDialogPlatform,
        setInBuiltDialogPlatform,
        analyticsState,
        analyticsStateUpdate,
        analyticsDropdown,
        setAnalyticsDropdown,
        analyticsDropdownToggle,
        cart,
        setCart,
        handleAdd,
        handleDel,
        handleDelWithoutCust,
        handleQuantityChange,
        handleQuantityChangeNonCust,
        formData,
        updateFormData,
        dummyState,
        setDummyState,
        handleEmptyCart,
        showToastContext,
        setShowToastContext,
        toastMessageContext,
        setToastMessageContext,
        copyToClipboard,
        ISSERVER,
        userSignOut,
        adminSignOut,
        address, 
        updateAddress,
        billingAddress, 
        updateBillingAddress,
        sameBillingAddress,
        updateSameBillingAddress,
        appliedCoupon,
        updateAppliedCoupon,
        loading,
        userPhoneNumber,
        userPicture
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

export { UserContext, UserContextProvider };
