import React from "react";
function useDefaultProps(props) {
  let newProps = { ...props };
  Object.keys(newProps).forEach((key) =>
    newProps[key] === undefined ? delete newProps[key] : {}
  );
  return { ...defaultProps, ...newProps };
}
function SecondaryButton(props) {
  props = useDefaultProps(props);
  const style = {
    width: props.width,
    height: props.height,
    cursor: props.isDisabled ? "default" : "pointer",
    padding: props.padding,
  };

  return (
    <button
      text={props.type}
      type={props.type}
      disabled={props.isDisabled}
      className={`btn-secondary font-medium rounded-full flex justify-center items-center ${props.className} `}
      onClick={props.onClick}
      style={style}
    >
      {props.modify ? (
        <>
          <span className="mr-[8px] text-[#e40849]" style={{ padding: "0" }}>
            {props.icon}
          </span>
          {props.text}
        </>
      ) : (
        <>
          {props.text}
          <span className={`ml-[8px] ${!props.icon && "hidden" } `} style={{ padding: "0" }}>
            {props.icon}
          </span>
        </>
      )}
    </button>
  );
}
const defaultProps = {
  text: "Button",
  isDisabled: false,
  type: "button",
};

export default SecondaryButton;
