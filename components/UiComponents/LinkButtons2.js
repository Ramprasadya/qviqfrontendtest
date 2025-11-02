import React from "react";
import { HiChevronRight } from "react-icons/hi";
import "./iconTextStyle.css";
function useDefaultProps(props){
  let newProps = {...props};
  Object.keys(newProps).forEach(key => newProps[key] === undefined ? delete newProps[key] : {});
  return {...defaultProps,...newProps};
}
function LinkButtons2(props) {props = useDefaultProps(props);
  const style = {
    color: props.color,
    cursor: "pointer",
    fontSize: "0.875rem",
    padding: "0",
    fontWeight: props.weight
  };
  return (
    <div className="flex items-center gap-2 hover:cursor-pointer" onClick={props.onClick}>
      <p style={style} className="add-icon" >{props.text}</p>
      <span style={style}>
        {props.icon}
      </span>
    </div>
  );
}
const defaultProps = {
  text: "Link text",
  icon: <HiChevronRight />,
  color:"#fb3909",
  fontWeight: '500'
};

export default LinkButtons2;
