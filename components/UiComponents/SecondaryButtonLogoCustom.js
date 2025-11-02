import Image from "next/image";
import React from "react";
import { HiOutlinePlusCircle } from "react-icons/hi";
function useDefaultProps(props) {
  let newProps = { ...props };
  Object.keys(newProps).forEach((key) =>
    newProps[key] === undefined ? delete newProps[key] : {}
  );
  return { ...defaultProps, ...newProps };
}
function SecondaryButtonLogo(props) {
  props = useDefaultProps(props);

  const style = {
    shadow: props.shadow,
    height: props.height,
    width: props.width,
    border: props.border,
  };

  return (
    <button
      text={props.text}
      type={props.type}
      disabled={props.isDisabled}
      onClick={props.onClick}
      className={`flex justify-center items-center gap-x-1 btn-PrimaryButton font-medium rounded-full border-[1px] active:scale-95 transition-all duration-200 ease-in-out ${props.classStyle}`}
      style={style}
    >
      {<Image src={props.img} alt="image" />}
      {props.icon}
      {props.text}
    </button>
  );
}
const defaultProps = {
  text: "Button",
  type: "button",
  isDisabled: false,
  icon: <HiOutlinePlusCircle />,
  color: "red",
};

export default SecondaryButtonLogo;
