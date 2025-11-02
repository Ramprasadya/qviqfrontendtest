import React from "react";
import { HiOutlinePlusCircle } from "react-icons/hi";
function useDefaultProps(props) {
  let newProps = { ...props };
  Object.keys(newProps).forEach((key) =>
    newProps[key] === undefined ? delete newProps[key] : {}
  );
  return { ...defaultProps, ...newProps };
}
const PrimaryButton = (props) => {
  props = useDefaultProps(props);
  const style = {
    width: props.width,
    background: props.color,
    color: props.textcolor,
    width: props.width,
    height: props.height,
    display: "flex",
    justifyContent: "center",
    padding: props.padding,
  };
  return (
    <button
      type={props.type ? props.type : "button"}
      disabled={props.isDisabled}
      className={`${props.className} btn-primary text-white font-medium rounded-full flex justify-center`}
      onClick={props.onClick}
      style={style}
    >
      {!props.side && <span style={{ padding: "0" }}>{props.icon}</span>}
      {props.text}
      {props.side === "right" && (
        <span style={{ padding: "0" }}>{props.icon}</span>
      )}
    </button>
  );
};
const defaultProps = {
  text: "Add Links",
  isDisabled: false,
  icon: <HiOutlinePlusCircle />,
};

export default PrimaryButton;
