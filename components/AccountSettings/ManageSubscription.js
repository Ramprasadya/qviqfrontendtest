"use client";
import React, { useEffect, useState, useContext, useRef } from "react";
import SideBar from "../navbar/SideBar";
import NavBar from "../navbar/NavBar";
import { HiChevronDown } from "react-icons/hi";
import { UserContext } from "../Contexts/context";
import { useRouter, useParams } from "next/navigation";
import PrimaryButton from "../UiComponents/PrimaryButton2";
import InvoiceTable from "./InvoiceTable";
import ProductInvoiceTable from "./ProductInvoiceTable";
import { Country, State, City } from "country-state-city";
import { getCountries } from "libphonenumber-js";
import { serverUrl } from "../../config";
import Modal from "../ModalComponent/Modal";
import { getCookie } from "../utils";

const ManageSubscription = () => {
  const [activePaymentMethod, setActivePaymentMethod] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState("India");
  const [selectedState, setSelectedState] = useState("delhi");
  const [selectedCity, setSelectedCity] = useState("Rohini");
  const [countryCode, setCountryCode] = useState("IN");
  const [stateCode, setStateCode] = useState("DL");
  const [dropdown, setDropdown] = useState(false);
  const [dropdown2, setDropdown2] = useState(false);
  const [dropdown3, setDropdown3] = useState(false);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [filteredStates, setFilteredStates] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [newBill, setNewBill] = useState("");
  const [newPlan, setNewPlan] = useState("");
  const [refundPolicy, setRefundPolicy] = useState(false);

  const handleRefundPolicy = () => {
    setRefundPolicy((prev) => !prev);
  };

  const dropdownRef = useRef(null);
  const dropdownRef2 = useRef(null);
  const dropdownRef3 = useRef(null);

  const handleCountryChange = (country) => {
    setSelectedCountry(country.name);
    setSelectedState("");
    setSelectedCity("");
    setCountryCode(country.isoCode);
    setFormData((prevData) => ({
      ...prevData,
      country: `${country.name}`,
    }));
  };

  const handleFilterChange = (e) => {
    const inputValue = e.target.value.toLowerCase();
    const filtered = Country.getAllCountries().filter((country) =>
      country.name.toLowerCase().includes(inputValue)
    );
    setFilteredCountries(filtered);
  };
  const handleStateChange = (state) => {
    setSelectedState(state.name);
    setSelectedCity("");
    setStateCode(state.isoCode);
    setFormData((prevData) => ({
      ...prevData,
      state: `${state.name}`,
    }));
  };
  const handleFilterChangeState = (e) => {
    const inputValue = e.target.value.toLowerCase();
    const filteredState = State.getStatesOfCountry(countryCode).filter(
      (country) => country.name.toLowerCase().includes(inputValue)
    );

    setFilteredStates(filteredState);
  };
  const cityNames = City.getCitiesOfState(`${countryCode}`, `${stateCode}`);
  const handleCityChange = (city) => {
    setSelectedCity(city.name);
    setFormData((prevData) => ({
      ...prevData,
      city: `${city.name}`,
    }));
  };
  const handleFilterChangeCity = (e) => {
    const inputValue = e.target.value.toLowerCase();
    const filteredCity = cityNames.filter((country) =>
      country.name.toLowerCase().includes(inputValue)
    );

    setFilteredCities(filteredCity);
  };
  const { userType, setShowToastContext, setToastMessageContext, userFullName, userEmail } =
    useContext(UserContext);
  const profile = useParams().userName;
  const countriest = Country.getAllCountries();
  const countrylist = getCountries();
  const [formData, setFormData] = useState({
    fullName: userFullName,
    email: userEmail,
    phoneNumber: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
  });
  const updatedCountries = countriest.filter((country) => {
    return countrylist.includes(country.isoCode);
  });
  const { updateFormData } = useContext(UserContext);
  useEffect(() => {
    const fetchAddressData = async () => {
      try {
        const response = await fetch(
          `${serverUrl}/account/getAddress/${profile}`,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + getCookie("jwt_token"),
            },
          }
        );
        const data = await response.json();

        if (data && data.length > 0) {
          const addressData = data[0];
          setFormData((prevData) => ({
            ...prevData,
            fullName: addressData.fullName || prevData.fullName,
            email: addressData.email || prevData.email,
            phoneNumber: addressData.phoneNumber || prevData.phoneNumber,
            addressLine1: addressData.addressLine1 || prevData.addressLine1,
            addressLine2: addressData.addressLine2 || prevData.addressLine2,
            city: addressData.city || prevData.city,
            state: addressData.state || prevData.state,
            pincode: addressData.pincode || prevData.pincode,
            country: addressData.country || prevData.country,
          }));
          setSelectedCountry(addressData.country);
          setSelectedState(addressData.state);
          setSelectedCity(addressData.city);
        }
      } catch (error) {
        //console.log(error);
      }
    };

    fetchAddressData();
  }, [profile]);

  const handleInputChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const router = useRouter();
  const navigate = (page) => {
    router.push(page);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(
      `${serverUrl}/account/address/add/${profile}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getCookie("jwt_token"),
        },
        body: JSON.stringify({
          profile,
          fullName: formData.fullName,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          addressLine1: formData.addressLine1,
          addressLine2: formData.addressLine2,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          country: formData.country,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          //console.log(data.error);
        } else {
          setToastMessageContext("Address Updated Successfully");
          setShowToastContext(true);
          setTimeout(() => {
            setShowToastContext(false);
            setToastMessageContext("");
          }, 2000);
        }
      });
  };
  const payment = [
    "UPI",
    "Visa",
    "Card",
    // Add more payment names here...
  ];
  const [selectedOption, setSelectedOption] = useState("");
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdown(false);
    }
    if (dropdownRef2.current && !dropdownRef2.current.contains(event.target)) {
      setDropdown2(false);
    }
    if (dropdownRef3.current && !dropdownRef3.current.contains(event.target)) {
      setDropdown3(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="flex h-screen w-full first-container">
      <div className="h-full">
        <SideBar />
      </div>
      <div className="w-full overflow-auto">
        <NavBar text="My Account" />
        <div className="flex flex-col justify-center items-center  px-[20px] md:px-[194px] mb-5 md:mb-7">
          <h2 className="my-6 xsm:my-7 xl:my-[52px] text-[20px] xsm:text-[24px] font-semibold ">
            Billing
          </h2>
          <div className=" w-[250px] py-[12px] px-[12px] rounded-[8px] lg:w-[690px] md:w-[460px] flex flex-col xl:py-[28px] xl:px-[32px] bg-white xl:w-[788px]  xsm:w-[320px] sm:w-[530px]  xsm:py-[20px] xsm:px-[20px]">
            <h2 className="text-[18px] font-semibold text-[#1A1A1A] xsm:mb-[32px] mb-[20px]">
              My Subscription
            </h2>
            <div className="flex lg:flex-row flex-col justify-between">
              <div>
                <h1 className="block w-[12px] md:text-[14px] mb-[4px] xsm:mb-[8px]">
                  Plan
                </h1>
                <div className="text-xs xsm:text-[14px] md:text-[16px] divide-x-[2px] flex font-semibold xsm:mb-[26px] mb-[20px] lg:mb-[0px]">
                  <div className="mr-[12px]">{userType}</div>
                  <div className="pl-[12px]">
                    Rs. {newBill} Billed {newPlan}
                  </div>
                </div>
              </div>
              <div>
                <button
                  className="lg:w-[250px] xl:h-[48px] xl:w-[158px] xsm:w-[280px] h-[40px] py-[8px] xsm:text-[16px] w-[220px] text-[12px] font-semibold md:w-[300px] bg-white  rounded-[64px] border border-[#1A1A1A] hover:bg-[#1A1A1A] hover:border-none hover:text-white"
                  onClick={() => {
                    navigate(`/plan/${profile}`);
                  }}
                >
                  Change Plan
                </button>
              </div>
            </div>
            <hr className="xsm:mt-[40px] xsm:mb-[40px] mt-[30px] mb-[30px]" />
            <h1 className="xsm:mb-[32px] mb-[20px] text-[18px] font-semibold">
              Billing details
            </h1>
            <form onSubmit={handleSubmit} className="flex flex-col">
              <label className="xsm:text-[14px] text-[12px] xl:text-[14px] font-medium  text-[#1A1A1A] ">
                Full Name
                <br />
                <input
                  type="text"
                  required
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className=" w-[230px] h-[30px] p-[5px] xl:w-[724px] xsm:w-[280px] sm:w-[450px] xsm:h-[40px] md:w-[400px] border border-[#DFDBD8] rounded-[8px] py-[9px] lg:w-[600px] xsm:pl-[12px] xl:pl-[8px] mt-[4px] mb-[24px] font-normal"
                />
              </label>
              <label className="xsm:text-[14px] text-[12px] xl:text-[14px] font-medium  text-[#1A1A1A] ">
                Email
                <br />
                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className=" w-[230px] h-[30px] p-[5px] xl:w-[724px] xsm:w-[280px] sm:w-[450px] xsm:h-[40px] md:w-[400px] border border-[#DFDBD8] rounded-[8px] py-[9px] lg:w-[600px] xsm:pl-[12px] xl:pl-[8px] mt-[4px] mb-[24px] font-normal"
                />
              </label>
              <label className="xsm:text-[14px] text-[12px] xl:text-[14px] font-medium  text-[#1A1A1A] ">
                Address Line 1
                <br />
                <input
                  type="text"
                  required
                  name="addressLine1"
                  value={formData.addressLine1}
                  onChange={handleInputChange}
                  className=" w-[230px] h-[30px] p-[5px] xl:w-[724px] xsm:w-[280px] sm:w-[450px] xsm:h-[40px] md:w-[400px] border border-[#DFDBD8] rounded-[8px] py-[9px] lg:w-[600px] xsm:pl-[12px] xl:pl-[8px] mt-[4px] mb-[24px] font-normal"
                />
              </label>
              <label className="xsm:text-[14px] text-[12px] xl:text-[14px] font-medium  text-[#1A1A1A] ">
                Address Line 2
                <br />
                <input
                  type="text"
                  name="addressLine2"
                  value={formData.addressLine2}
                  onChange={handleInputChange}
                  className=" w-[230px] h-[30px] p-[5px] xl:w-[724px] xsm:w-[280px] sm:w-[450px] xsm:h-[40px] md:w-[400px] border border-[#DFDBD8] rounded-[8px] py-[9px] lg:w-[600px] xsm:pl-[12px] xl:pl-[8px] mt-[4px] mb-[24px] font-normal"
                />
              </label>
              <div className="flex flex-col">
                <div className="xsm:text-[14px] text-[12px] xl:text-[14px] font-medium  text-[#1A1A1A] ">
                  Country
                </div>
                <div className=" relative flex items-center " ref={dropdownRef}>
                  <div
                    className="w-[235px] xsm:w-full flex items-center hover:cursor-pointer pr-[10px]"
                    onClick={(e) => {
                      setDropdown(!dropdown);
                    }}
                  >
                    <input
                      type="text"
                      className="w-[250px] rounded-[8px] text-[13px] mb-[32px]  h-[30px] p-[6px] xl:w-[724px] xsm:w-[280px] sm:w-[450px] xsm:h-[40px] md:w-[400px] lg:w-[600px] border border-[#DFDBD8]  xsm:py-[9px]  xsm:pl-[12px] xl:pl-[8px] mt-[4px] font-normal "
                      required
                      name="country"
                      value={selectedCountry}
                      onChange={(e) => {
                        setSelectedCountry(e.target.value);
                        handleFilterChange(e);
                      }}
                    />
                    <span className="ml-[-20px] mt-[-25px]">
                      <HiChevronDown />
                    </span>
                  </div>

                  {dropdown && (
                    <div
                      className="left-[0.1rem] w-[220px] max-h-[300px] overflow-scroll absolute xsm:left-[0.3rem] xsm:top-[3rem] top-[2.3rem] text-[14px] md3:text-[14px] bg-[#ffffff]  xsm:w-[16.875rem] md:w-[18.875rem] p-[0.5rem] rounded-[0.5rem] z-[2] "
                      style={{
                        boxShadow:
                          "0.5rem 0.5rem 2.5rem 0.0625rem rgba(171, 181, 217, 0.32)",
                      }}
                    >
                      {filteredCountries.length > 0
                        ? filteredCountries.map((country) => (
                            <div
                              className=" p-[0.6125rem] rounded-[0.5rem] text-left flex hover:cursor-pointer hover:bg-[#f3f3f3] hover:font-medium "
                              key={country.isoCode}
                              value={country.isoCode}
                              name="country"
                              onClick={(e) => {
                                handleCountryChange(country);
                                setDropdown(!dropdown);
                              }}
                            >
                              {country.name}
                            </div>
                          ))
                        : Country.getAllCountries().map((country) => (
                            <div
                              className=" p-[0.6125rem] rounded-[0.5rem] text-left flex hover:cursor-pointer hover:bg-[#f3f3f3] hover:font-medium "
                              key={country.isoCode}
                              value={country.isoCode}
                              name="country"
                              onClick={(e) => {
                                handleCountryChange(country);
                                setDropdown(!dropdown);
                              }}
                            >
                              {country.name}
                            </div>
                          ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="lg:flex-row flex flex-col  ">
                <div className="flex flex-col lg:mr-[16px]">
                  <div className="xsm:text-[14px] text-[12px] xl:text-[14px] font-medium  text-[#1A1A1A] ">
                    State
                  </div>

                  <div
                    className=" relative flex items-center "
                    ref={dropdownRef2}
                  >
                    <div
                      className="w-[235px] xsm:w-full flex items-center hover:cursor-pointer pr-[10px]"
                      name="state"
                      onClick={(e) => {
                        setDropdown2(!dropdown2);
                      }}
                    >
                      <input
                        type="text"
                        className="text-[13px] lg:w-[180px] md:mr-[24px] w-[230px] h-[30px] p-[6px] xl:w-[225.33px] xsm:w-[280px] sm:w-[450px] xsm:h-[40px] md:w-[400px] border border-[#DFDBD8] rounded-[8px] xsm:py-[9px] xsm:pl-[12px] xl:pl-[8px] mt-[4px] mb-[24px] font-normal"
                        required
                        name="state"
                        value={selectedState}
                        onChange={(e) => {
                          setSelectedState(e.target.value);
                          handleFilterChangeState(e);
                        }}
                      />
                      <span className=" ml-[-20px] md:ml-[-45px] mt-[-20px]">
                        <HiChevronDown />
                      </span>
                    </div>

                    {dropdown2 && (
                      <div
                        className="left-[0.1rem] w-[220px] max-h-[300px] overflow-scroll absolute xsm:left-[0.3rem] xsm:top-[3rem] top-[2.3rem] text-[14px] md3:text-[14px] bg-[#ffffff]  xsm:w-[16.875rem] md:w-[18.875rem] p-[0.5rem] rounded-[0.5rem] z-[2] "
                        style={{
                          boxShadow:
                            "0.5rem 0.5rem 2.5rem 0.0625rem rgba(171, 181, 217, 0.32)",
                        }}
                      >
                        {filteredStates.length > 0
                          ? filteredStates.map((state) => (
                              <div
                                className=" p-[0.6125rem] rounded-[0.5rem] text-left flex hover:cursor-pointer hover:bg-[#f3f3f3] hover:font-medium "
                                key={state.isoCode}
                                value={state.isoCode}
                                name="state"
                                onClick={() => {
                                  handleStateChange(state);
                                  setDropdown2(!dropdown2);
                                }}
                              >
                                {state.name}
                              </div>
                            ))
                          : State.getStatesOfCountry(countryCode).map(
                              (state) => (
                                <div
                                  className=" p-[0.6125rem] rounded-[0.5rem] text-left flex hover:cursor-pointer hover:bg-[#f3f3f3] hover:font-medium "
                                  key={state.isoCode}
                                  value={state.isoCode}
                                  name="state"
                                  onClick={() => {
                                    handleStateChange(state);
                                    setDropdown2(!dropdown2);
                                  }}
                                >
                                  {state.name}
                                </div>
                              )
                            )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col lg:ml-[4px] xl:ml-[0px] lg:mr-[20px] xl:mr-[16px]">
                  <div className="xsm:text-[14px] text-[12px] xl:text-[14px] font-medium  text-[#1A1A1A] ">
                    City
                  </div>
                  <div
                    className=" relative flex items-center "
                    ref={dropdownRef3}
                  >
                    <div
                      className="w-[235px] xsm:w-full flex items-center hover:cursor-pointer pr-[10px]"
                      onClick={(e) => {
                        setDropdown3(!dropdown3);
                      }}
                    >
                      <input
                        type="text"
                        className="text-[13px] lg:w-[180px] md:mr-[24px] w-[230px] h-[30px] p-[6px] xl:w-[225.33px] xsm:w-[280px] sm:w-[450px] xsm:h-[40px] md:w-[400px] border border-[#DFDBD8] rounded-[8px] xsm:py-[9px] xsm:pl-[12px] xl:pl-[8px] mt-[4px] mb-[24px] font-normal"
                        required
                        name="city"
                        value={selectedCity}
                        onChange={(e) => {
                          setSelectedCity(e.target.value);
                          handleFilterChangeCity(e);
                        }}
                      />
                      <span className="ml-[-20px] md:ml-[-45px] mt-[-20px] ">
                        <HiChevronDown />
                      </span>
                    </div>

                    {dropdown3 && (
                      <div
                        className="left-[0.1rem] w-[220px] max-h-[300px] overflow-scroll absolute xsm:left-[0.3rem] xsm:top-[3rem] top-[2.3rem] text-[14px] md3:text-[14px] bg-[#ffffff]  xsm:w-[16.875rem] md:w-[18.875rem] p-[0.5rem] rounded-[0.5rem] z-[2] "
                        style={{
                          boxShadow:
                            "0.5rem 0.5rem 2.5rem 0.0625rem rgba(171, 181, 217, 0.32)",
                        }}
                      >
                        {filteredCities.length > 0
                          ? filteredCities.map((city) => (
                              <div
                                className=" p-[0.6125rem] rounded-[0.5rem] text-left flex hover:cursor-pointer hover:bg-[#f3f3f3] hover:font-medium "
                                key={city.isoCode}
                                value={city.isoCode}
                                name="city"
                                onClick={() => {
                                  handleCityChange(city);
                                  setDropdown3(!dropdown3);
                                }}
                              >
                                {city.name}
                              </div>
                            ))
                          : cityNames.map((city) => (
                              <div
                                className=" p-[0.6125rem] rounded-[0.5rem] text-left flex hover:cursor-pointer hover:bg-[#f3f3f3] hover:font-medium "
                                key={city.isoCode}
                                value={city.isoCode}
                                name="city"
                                onClick={() => {
                                  handleCityChange(city);
                                  setDropdown3(!dropdown3);
                                }}
                              >
                                {city.name}
                              </div>
                            ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="xsm:text-[14px] text-[12px] xl:text-[14px] font-medium  text-[#1A1A1A] ">
                    Pincode
                    <br />
                    <input
                      required
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className=" lg:w-[190px] w-[230px] h-[30px] p-[5px] xl:w-[225.33px] xsm:w-[280px] sm:w-[450px] xsm:h-[40px] md:w-[400px] border border-[#DFDBD8] rounded-[8px] py-[9px] xsm:pl-[12px] xl:pl-[8px] mt-[4px] mb-[24px] font-normal"
                    />
                  </label>
                </div>
              </div>

              <div className="xl:w-[163px] lg:w-[250px]  sm:w-[300px] ">
                <PrimaryButton
                  text="Save Changes"
                  width="100%"
                  type="submit"
                  padding="12px 0px"
                />
              </div>
            </form>
          </div>
          <div className="w-[250px] rounded-[8px] lg:w-[690px] md:w-[460px] sm:w-[530px] p-[15px]   mt-[52px] bg-white xl:w-[788px] xsm:px-[20px] xsm:py-[28px] xsm:w-[320px] md:px-[20px] ">
            <h1 className="text-[18px] text-[#1A1A1A] font-semibold mb-[32px]">
              Invoices
            </h1>
            <InvoiceTable
              profile={profile}
              setNewBill={setNewBill}
              setNewPlan={setNewPlan}
            />
          </div>

          <div className="relative w-full mt-4">
            <button
              className="text-[14px] float-right "
              onClick={() => {
                navigate('/refund-policy')
              }}
            >
              Refund policy
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default ManageSubscription;
