import React from "react";

function useDefaultProps(props) {
  let newProps = { ...props };
  Object.keys(newProps).forEach(
    (key) => newProps[key] === undefined && delete newProps[key]
  );
  return { ...defaultProps, ...newProps };
}

function InputFieldCC(props) {
  props = useDefaultProps(props);
  const style = {
    border: props.border,
    // padding: " 0.563em 0.875em",
    outline: "none",
    width: props.width,
    height: props.height,
    // borderRadius: props.borderRadius,
    fontSize: props.fontSize,
    marginBottom: props.marginBottom,
    backgroundColor: props.isReadOnly ? "#F3F3F3" : props.backgroundColor,
    color: props.color ? props.color : "#1A1A1A",
    textAlign: props.align ? props.align : "left",
  };

  return (
    <div className="flex flex-col w-full relative">
      {props.lable && (
        <label htmlFor="myInput" className={`${props.customLable} label-field`}>
          {props.label}
        </label>
      )}
      {/* Dropdown for country code */}
      <div className={`flex flex-row w-full ${props.customStyle} relative`}>
        <div
          className={`rounded-l-[8px] px-[0.875em] py-[0.563em] flex flex-row justify-center items-center gap-2 ${props.customFlag}`}
          style={{ ...style, width: "100px" }}
        >
          {!props.noFlag && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 513 342"
              class="react-phone-number-input__icon h-[18px] w-[36px]"
            >
              <path fill="#181A93" d="M17.3 0h478.4v342H17.3V0z"></path>
              <path fill="#FFA44A" d="M0 0h513v114H0V0z"></path>
              <path fill="#1A9F0B" d="M0 228h513v114H0V228z"></path>
              <path fill="#FFF" d="M0 114h513v114H0V114z"></path>
              <circle fill="#FFF" cx="256.5" cy="171" r="34.2"></circle>
              <path
                fill="#181A93"
                d="M256.5 216.6c-25.1 0-45.6-20.5-45.6-45.6s20.5-45.6 45.6-45.6 45.6 20.5 45.6 45.6-20.5 45.6-45.6 45.6zm0-11.4c18.2 0 34.2-16 34.2-34.2s-15.9-34.2-34.2-34.2-34.2 16-34.2 34.2 16 34.2 34.2 34.2z"
              ></path>
              <circle fill="#181A93" cx="256.5" cy="171" r="22.8"></circle>
            </svg>
          )}

          {/* <option value="1">+1</option> */}
          <p className="m-0 p-0 leading-[22px]">+91</p>
        </div>
        <input
          className={`rounded-r-[8px] px-[0.875em] py-[0.563em] ${props.customNumberHolder}`}
          placeholder={props.placeholder}
          id="myInput"
          name={props.name}
          type={props.type}
          value={props.value}
          onChange={props.onChange}
          onClick={props.onClick}
          onMouseEnter={props.onMouseEnter}
          onMouseLeave={props.onMouseLeave}
          style={{ ...style }}
          defaultValue={props.defaultValue}
          disabled={props.isDisabled}
          readOnly={props.isReadOnly}
        />
      </div>
    </div>
  );
}

const defaultProps = {
  placeholder: "",
  width: "17.875rem",
  type: "text",
  borderRadius: "8px",
  isDisabled: false,
  border: "1px solid #DFDBD8",
};
export default InputFieldCC;
