import React, { useCallback, useEffect } from "react";
import { HiOutlineX } from "react-icons/hi";
import "./newmodal.css";
function useDefaultProps(props){
  let newProps = {...props};
  Object.keys(newProps).forEach(key => newProps[key] === undefined ? delete newProps[key] : {});
  return {...defaultProps,...newProps};
}
function NewModal(props) {props = useDefaultProps(props);
  const handleEscape = useCallback((event) => {
    if (event.key === "Escape") {
      props.onClick();
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleEscape, false);

    return () => {
      document.removeEventListener("keydown", handleEscape, false);
    };
  }, [handleEscape]);

  const style = {
    maxWidth: props.width,
    height: props.height,
  };

  return (
    <div
      id="myModal"
      className="modal"
      style={{display:`${props.onModal?'flex':'none'}`,zIndex:'1000'}}
    >
      <div className="modal-content" style={style}>
        {/* to close modal  */}

        <div className=" flex items-center justify-between mx-5 md:mx-6 sm:py-6 py-[16px] sm:border-b-2">
          <p className="text-lg md:text-xl text-[#1A1A1A] tracking-normal font-semibold">
            {props.text}
          </p>
          <span
            onClick={() => props.onClick((prev) => !prev)}
            className="text-2xl text-black hover:scale-110 logo-fill"
            style={{cursor:'pointer'}}
          >
            <HiOutlineX />
          </span>
        </div>

        <div className="modal-child-div">{props.children}</div>
      </div>
    </div>
  );
}
const defaultProps = {
  maxWidth: "640px",
  height: "fit-content",
};
export default NewModal;
