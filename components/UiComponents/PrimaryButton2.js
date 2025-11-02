import React from "react";
import './UiStyles.css'
function useDefaultProps(props){
  let newProps = {...props};
  Object.keys(newProps).forEach(key => newProps[key] === undefined ? delete newProps[key] : {});
  return {...defaultProps,...newProps};
}

function PrimaryButton2(props) {props = useDefaultProps(props);
  const style = {
    zIndex: 2,
    background: props.isDisabled ? '#ffd0d0' : props.color,
    width: props.width,
    height: props.height,
    color: props.textColor,
    padding: props.padding,
    transform: props.isDisabled && "scale(1)",
    cursor: props.isDisabled && "not-allowed",
    border: props.border
  };
  return (
    <button
      text={props.text}
      type={props.type}
      disabled={props.isDisabled}
      onClick={props.onClick}
      className={`btn-PrimaryButton2 font-medium rounded-full ${props.className}`}
      style={style}
    >
      {props.text}
    </button>
  );
}
const defaultProps = {
  text: "Button",
  isDisabled: false,
  color: "linear-gradient(285deg, #FB6609 0%, #E40849 100%)",
  type: "button",
  border: "none"
};

export default PrimaryButton2;
