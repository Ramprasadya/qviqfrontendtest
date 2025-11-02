import React, { useState } from "react";
import { HiOutlineArrowSmRight, HiOutlinePlusCircle } from "react-icons/hi";
function useDefaultProps(props){
  let newProps = {...props};
  Object.keys(newProps).forEach(key => newProps[key] === undefined ? delete newProps[key] : {});
  return {...defaultProps,...newProps};
}
const PrimaryButton3 = (props) => {props = useDefaultProps(props);
  const [isHover, setIsHover] = useState(false);

  const style = {
    zIndex: 2,
    background: props.color,
    color: props.textcolor,
    width: props.width,
    height: props.height,
    display: "flex",
    justifyContent: "center",
    boxShadow: isHover ? "0px 10px 20px 0px rgba(228,8,73,0.40)" : "none",
    // transition: "3s"
  };

  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };

  return (
    <button
      type="button"
      disabled={props.isDisabled}
      className="btn-primary text-white font-medium rounded-full flex justify-center items-center"
      onClick={props.onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={style}
    >
      {props.text}

      {isHover && (
        <span style={{ padding: "0", transition: "3s" }}>{props.icon}</span>
      )}
    </button>
  );
};
const defaultProps = {
  text: "Continue",
  isDisabled: false,
  icon: <HiOutlineArrowSmRight />,
};

export default PrimaryButton3;
