import React from "react";
import { HiOutlinePlus, HiOutlineUpload } from "react-icons/hi";
function useDefaultProps(props){
  let newProps = {...props};
  Object.keys(newProps).forEach(key => newProps[key] === undefined ? delete newProps[key] : {});
  return {...defaultProps,...newProps};
}
function IconButton1(props) {props = useDefaultProps(props);
  const style = {
    background: props.color,
    height:props.height,
    width:props.width
  };
  return (
    <button
      
      type="button"
      disabled={props.isDisabled}
      className="icon-btn text-white font-medium  rounded-full flex"
      style={style}
    >
      {props.icon}
      {props.text}
    </button>
  );
}
const defaultProps = {
  isDisabled: false,
  icon: <HiOutlinePlus />,
  color: "linear-gradient(225deg, #FB6609 0%, #E40849 100%)",
};

export default IconButton1;
