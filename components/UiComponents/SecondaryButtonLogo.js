import React from "react";
import { HiOutlinePlusCircle } from "react-icons/hi";

function useDefaultProps(props){
  let newProps = {...props};
  Object.keys(newProps).forEach(key => newProps[key] === undefined ? delete newProps[key] : {});
  return {...defaultProps,...newProps};
}
function SecondaryButtonLogo(props) {props = useDefaultProps(props);
  const style = {
    width: props.width,
    height:props.height
  }
  return (
    <button
    text={props.text}
      type={props.type}
      disabled={props.isDisabled}
      onClick={props.onClick}
      style={style}
      className="btn-secondary font-medium rounded-full flex justify-center items-center gap-x-2"
      
    >
      {<img src={props.img} alt="" />}
      {props.icon}
      {props.text}
    </button>
  );
}
const defaultProps = {
  text: "Button",
  type:"text",
  isDisabled: false,
  icon: <HiOutlinePlusCircle />,
  color:"red"
};

export default SecondaryButtonLogo;
