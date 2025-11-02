import React from "react";
function useDefaultProps(props){
  let newProps = {...props};
  Object.keys(newProps).forEach(key => newProps[key] === undefined ? delete newProps[key] : {});
  return {...defaultProps,...newProps};
}
function PrimaryButton4(props) {props = useDefaultProps(props);
  const style = {
    background: props.color,
    width: props.width,
    height: props.height,
    color: props.textColor,
    padding: props.padding,
    transform: props.isDisabled && "scale(1)",
    cursor: props.isDisabled && "not-allowed",
  };
  return (
    <button
      text={props.text}
      type={props.type}
      disabled={props.isDisabled}
      onClick={props.onClick}
      className="btn-PrimaryButton4 font-medium rounded-full"
      style={style}
    >
      {props.text}
    </button>
  );
}
const defaultProps = {
  text: "Button",
  isDisabled: false,
  color: "linear-gradient(225deg, #FB6609 0%, #E40849 100%)",
  type: "button"
};

export default PrimaryButton4;
