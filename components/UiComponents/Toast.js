import React from "react";
import "@/components/UiComponents/UiStyles.css";
function useDefaultProps(props){
  let newProps = {...props};
  Object.keys(newProps).forEach(key => newProps[key] === undefined ? delete newProps[key] : {});
  return {...defaultProps,...newProps};
}
function Toast(props) {props = useDefaultProps(props);
  const style = {
    backgroundColor: props.backgroundColor,
    borderColor: props.borderColor,
    border: props.border,
    color: props.color,
    fontFamily: props.fontFamily,
    fontSize: props.fontSize,
    borderRadius: props.borderRadius,
  };

  return (
    <div
      className="flex justify-between font-base toast-t rounded-lg font-medium"
      style={style}
    >
      <p>{props.text}</p>
    </div>
  );
}
const defaultProps = {
  backgroundColor: "#12A26E",
  color: "#fff",
};
export default Toast;
