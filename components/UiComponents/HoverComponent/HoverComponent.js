import React from "react";
import "./hovercomponent.css";
function useDefaultProps(props){
  let newProps = {...props};
  Object.keys(newProps).forEach(key => newProps[key] === undefined ? delete newProps[key] : {});
  return {...defaultProps,...newProps};
}
function HoverComponent(props) {props = useDefaultProps(props);
  return (
    <div className="hover-container ">
      <h1 className="hover-heading ">{props.label}</h1>
      <div className="hover-underline py-0.5 my-3 rounded-full"></div>
      <p>{props.text}</p>
    </div>
  );
}

const defaultProps = {
  label: "Lead Capture",
  text: " By turning lead capture on, you can collect visitor information including name, email, and any relevant messages.",
};

export default HoverComponent;
