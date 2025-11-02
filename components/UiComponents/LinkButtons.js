import React from "react";
import { HiOutlinePlusCircle } from "react-icons/hi";
import "./iconTextStyle.css";
function useDefaultProps(props){
  let newProps = {...props};
  Object.keys(newProps).forEach(key => newProps[key] === undefined ? delete newProps[key] : {});
  return {...defaultProps,...newProps};
}
function LinkButtons(props) {props = useDefaultProps(props);
  const style = {
    color: props.color,
    cursor: "pointer",
    padding: "0",
  };
  return (
    <div
      className="flex items-center gap-2 hover:cursor-pointer active:scale-90 duration-300"
      onClick={props.onClick}
    >
      <span style={style}>{props.icon}</span>
      <p className="add-icon" style={style}>
        {props.text}
      </p>
    </div>
  );
}
const defaultProps = {
  text: "Link text",
  icon: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M8 6V10M10 8H6M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8Z"
        stroke="url(#paint0_linear_2836_3076)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_2836_3076"
          x1="14"
          y1="2"
          x2="0.596042"
          y2="3.85495"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FB6609" />
          <stop offset="1" stopColor="#E40849" />
        </linearGradient>
      </defs>
    </svg>
  ),
};

export default LinkButtons;
