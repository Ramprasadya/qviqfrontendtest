import React from "react";
import { HiOutlinePlus } from "react-icons/hi";
import "./PerformanceCard.css";
function useDefaultProps(props){
  let newProps = {...props};
  Object.keys(newProps).forEach(key => newProps[key] === undefined ? delete newProps[key] : {});
  return {...defaultProps,...newProps};
}
function TrendingBtn(props) {props = useDefaultProps(props);
  const style = {
    background: props.color,
  };
  return (
    <button
      type="button"
      disabled={props.isDisabled}
      className="trending-btn text-white font-medium  rounded-full"
      style={style}
    >
      <span style={{ color: props.iconColor }} className=" text-xl">
        {props.icon}
      </span>
    </button>
  );
}
const defaultProps = {
  isDisabled: false,
  icon: <HiOutlinePlus />,
  color: "linear-gradient(to right, #fe7171, #f54040)",
  iconColor: "black",
};
export default TrendingBtn;
