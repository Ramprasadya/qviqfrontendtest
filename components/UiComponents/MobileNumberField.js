import React, { useState, useEffect, useRef } from "react";
import "react-phone-number-input/style.css";
import { getCountryCallingCode, getCountries } from "libphonenumber-js";
import flags from "react-phone-number-input/flags";
import "./UiStyles.css";
import { HiChevronDown } from "react-icons/hi";
import { Country } from "country-state-city";

function MobileNumberField(props) {
  const [dropdown, setDropdown] = useState(false);
  const countriest = Country.getAllCountries();
  const countrylist = getCountries();
  const updatedCountries = countriest.filter((country) => {
    return countrylist.includes(country.isoCode);
  });
  const renderSingleFlag = (country) => {
    const CountryFlag = flags[country.isoCode];
    return (
      <CountryFlag className="react-phone-number-input__icon h-[18px] w-[36px]" />
    );
  };
  const dropdownRef = useRef(null);
  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  return (
    <div className="relative flex items-center " ref={dropdownRef}>
      <div
        className="flex items-center hover:cursor-pointer pr-[10px]"
        onClick={() => setDropdown(!dropdown)}
      >
        {props.flagChange()}
        <p className="text-[14px] leading-[22px]"> +{props.code}</p>
        <HiChevronDown />
      </div>
      <input
        type="phonenumber"
        className={`w-full`}
        value={props.mobileNumber}
        onChange={props.handlePhoneNumberChange}
      />

      {dropdown && (
        <div
          className="left-[-1rem] w-[250px] max-h-[128px] overflow-scroll absolute xsm:left-[-0.5rem] top-[3.5rem] text-[14px] md3:text-[14px] bg-[#ffffff]  xsm:w-[18.875rem] sm2:w-[17.5rem] lg:w-[18.875rem] sm:w-[14.875rem] md2:w-[14rem] md3:w-[15.875rem] md:text-[12px]  md:w-[12.875rem] p-[0.5rem] rounded-[0.5rem] z-[2] "
          style={{ boxShadow: "5px 5px 20px #00176a17" }}
        >
          {updatedCountries.map((country, index) => (
            <div
              key={index}
              className=" p-[0.8125rem] md3:p-[0.6rem] md:p-[0.55rem] rounded-[0.5rem] text-left flex hover:cursor-pointer hover:bg-[#f3f3f3] hover:font-medium "
              onClick={() => {
                props.codeChange(country);
                setDropdown(!dropdown);
              }}
            >
              <div>{renderSingleFlag(country)}</div>{" "}
              <div className=" w-[55px]  ml-[4px]  h-full">
                +{getCountryCallingCode(country.isoCode)}
              </div>{" "}
              <div className="overflow-scroll ml-[6px] md:ml-[2px]  xsm:ml-[0.5rem] md2:ml-[2px] md3:ml-[4px] md:w-[130px] sm:w-[175px] xl:ml-[0px]  md2:w-[150px] w-[200px] md3:w-[200px] ">
                {country.name}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MobileNumberField;
