import React, { useEffect, useRef, useState } from "react";
import { HiChevronDown } from "react-icons/hi";
function useDefaultProps(props) {
  let newProps = { ...props };
  Object.keys(newProps).forEach((key) =>
    newProps[key] === undefined ? delete newProps[key] : {}
  );
  return { ...defaultProps, ...newProps };
}

function InputField(props) {
  props = useDefaultProps(props);
  const style = {
    border: props.border,
    padding: "0.563em 0.875em",
    outline: "none",
    width: props.width,
    height: props.height,
    borderRadius: props.borderRadius,
    fontSize: props.fontSize,
    marginBottom: props.marginBottom,
    backgroundColor: props.isReadOnly ? "#F3F3F3" : props.backgroundColor,
    color: props.color ? props.color : "#1A1A1A",
    textAlign: props.align ? props.align : "left",
  };

  const currencyStyle = {
    border: " 1px solid rgb(223, 219, 216)",
    padding: "0.563em 0.875em",
    outline: "none",
    color: "rgb(26, 26, 26)",
    textAlign: "left",
  };

  const currencyArray = [
    ["INR", "₹"],
    ["USD", "$"],
    ["JPY", "¥"],
    ["EUR", "€"],
    ["GBP", "£"],
    ["BTC", "₿"],
    ["ETH", "Ξ"],
  ];

  const dropdownRef = useRef(null);
  const [dropdown, setDropdown] = useState(false);

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
        className="flex items-center gap-[5px] hover:cursor-pointer pr-[10px] rounded-l-[8px]"
        style={currencyStyle}
        onClick={() => setDropdown(!dropdown)}
      >
        <p className="text-[14px] font-[500] border-[2px] border-black border-[solid] h-[24px] w-[24px] rounded-full text-center">
          {props.currency?.[1]}
        </p>
        <p className=" w-fit text-[16px] ml-[6px]  h-full">
          {props.currency?.[0]}
        </p>
        <HiChevronDown />
      </div>

      <input
        type="number"
        className={`w-full`}
        value={props.value}
        onChange={props.onPriceChange}
        placeholder={props.placeholder}
        id="myInput"
        name={props.name}
        onClick={props.onClick}
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}
        style={style}
        defaultValue={props.defaultValue}
        disabled={props.isDisabled}
        readOnly={props.isReadOnly}
      />

      {dropdown && (
        <div
          className="left-[4px] w-fit max-h-[128px] overflow-scroll absolute top-[3.5rem] text-[14px] md3:text-[14px] bg-[#ffffff]  md:text-[12px] p-[0.5rem] rounded-[0.5rem] z-[2] "
          style={{ boxShadow: "5px 5px 20px #00176a17" }}
        >
          {currencyArray.map((currency, index) => (
            <div
              key={index}
              className=" p-[0.8125rem] md3:p-[0.6rem] md:p-[0.55rem] rounded-[0.5rem] text-left flex flex-row gap-[10px] hover:cursor-pointer hover:bg-[#f3f3f3] hover:font-medium "
              onClick={() => {
                props.onCurrencyChange(currency);
                setDropdown(!dropdown);
              }}
            >
              <p className="text-[14px] font-[500] border-[2px] border-black border-[solid] h-[24px] w-[24px] rounded-full text-center">
                {currency[1]}
              </p>{" "}
              <div className=" w-[40px]  ml-[4px]  h-full">{currency[0]}</div>{" "}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const defaultProps = {
  currency: ["INR", "₹"],
  placeholder: "",
  width: "17.875rem",
  type: "text",
  borderRadius: "0 8px 8px 0",
  isDisabled: false,
  border: "1px solid #DFDBD8",
};
export default InputField;
