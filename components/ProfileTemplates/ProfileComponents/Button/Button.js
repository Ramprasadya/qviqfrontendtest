import React from "react";

function useDefaultProps(props){
  let newProps = {...props};
  Object.keys(newProps).forEach(key => newProps[key] === undefined ? delete newProps[key] : {});
  return {...defaultProps,...newProps};
}
const Button = (props) => {props = useDefaultProps(props);
  const baseTemp5BtnStyle = {
    background: "linear-gradient(72deg, #033CCE 0%, #769BFC 96.38%)",
    boxShadow: "black 3px 3px 0px 1px",
    border: "none",
    height: "56px",
    color: "#fff",
    leadingTrim: "both",
    textEdge: "cap",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: "800",
    lineHeight: "normal",
  };

  return props.type === "baseTemp5" ? (
    <button
      disabled={props.disabled}
      className={`font-bold text-sm py-[13px] px-[24px] w-fit flex justify-center items-center gap-2 duration-100  ${
        props.style
      } ${props.disabled ? "" : "active:scale-95"}`}
      style={{
        cursor: `${props.disabled ? "not-allowed" : "pointer"}`,
        ...baseTemp5BtnStyle,
      }}
      onClick={props.onClick}
    >
      {props.text}
      {props.icon && <span className="text-base">{props.icon}</span>}
    </button>
  ) : (
    <button
      disabled={props.disabled}
      className={`font-bold text-sm py-[13px] px-[24px] w-fit flex justify-center items-center gap-2 duration-100  ${
        props.style
      } ${props.disabled ? "" : "active:scale-95"}`}
      style={{ cursor: `${props.disabled ? "not-allowed" : "pointer"}` }}
      onClick={props.onClick}
    >
      {props.text}
      {props.icon && <span className="text-base">{props.icon}</span>}
    </button>
  );
};

export default Button;

const defaultProps = {
  icon: null,
};
