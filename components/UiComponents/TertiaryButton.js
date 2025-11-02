import React from "react";
function useDefaultProps(props){
  let newProps = {...props};
  Object.keys(newProps).forEach(key => newProps[key] === undefined ? delete newProps[key] : {});
  return {...defaultProps,...newProps};
}
function TertiaryButton(props) {props = useDefaultProps(props);
  const style = {
    width: props.width,
    height: props.height,
  };
  return (
    <button
      type="button"
      disabled={props.isDisabled}
      className="btn-tertiary font-medium rounded-full"
      onClick={props.onClick}
      style={style}
    >
      {props.text}
    </button>
  );
}
const defaultProps = {
  text: "Button",
  isDisabled: false,
};

export default TertiaryButton;
