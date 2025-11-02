import React from "react";
import { HiPlus } from "react-icons/hi";
function useDefaultProps(props){
  let newProps = {...props};
  Object.keys(newProps).forEach(key => newProps[key] === undefined ? delete newProps[key] : {});
  return {...defaultProps,...newProps};
}
function OutlinedPill(props) {props = useDefaultProps(props);
  return (
    <button
      type="button"
      disabled={props.isDisabled}
      className="outlined-pill text-pink1 font-medium rounded-full "
    >
      <HiPlus className="btn-logo" />
      {props.text}
    </button>
  );
}
const defaultProps = {
  text: "Input",
};

export default OutlinedPill;
