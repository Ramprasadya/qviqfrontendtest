import React, { useCallback, useEffect } from "react";
import { HiOutlineX } from "react-icons/hi";
import "./newmodal.css";
function useDefaultProps(props) {
  let newProps = { ...props };
  Object.keys(newProps).forEach((key) =>
    newProps[key] === undefined ? delete newProps[key] : {}
  );
  return { ...defaultProps, ...newProps };
}
function NewModal(props) {
  props = useDefaultProps(props);
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

  useEffect(() => {
    const body = document.getElementsByTagName("body")[0];
    // console.log(props.onModal);

    if (props.onModal) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "auto"; // restore scroll when modal is closed
    }
  }, [props.onModal]);

  const Border = {
    borderTopWidth: props.borderTopWidth,
    marginTop: props.marginTop,
    marginBottom: props.marginBottom,
  };

  return (
    <div
      id="myModal"
      className="modal"
      style={{ display: `${props.onModal ? "flex" : "none"}`, zIndex: "1000" }}
    >
      <div className="modal-content" style={style}>
        {/* to close modal  */}

        <div
          className=" flex items-center justify-between px-5 md:px-6 "
          style={{
            marginTop: Border.marginTop,
            marginBottom: Border.marginBottom,
          }}
        >
          <p className="md:text-xl text-[15px] text-[#1A1A1A] tracking-normal font-semibold">
            {props.text}
          </p>
          <span
            onClick={() => {
              props.onClick((prev) => !prev);
              props.extraOnClick && props.extraOnClick((prev) => !prev);
            }}
            className="text-2xl text-black hover:scale-110 logo-fill"
            style={{ cursor: "pointer" }}
          >
            <HiOutlineX />
          </span>
        </div>
        <div className="mx-5 md:mx-6  modal-child-div" style={Border}>
          {props.children}
        </div>
      </div>
    </div>
  );
}
const defaultProps = {
  maxWidth: "640px",
  height: "fit-content",
  borderTopWidth: "2px",
  marginTop: "1.5rem",
  marginBottom: "1.5rem",
};
export default NewModal;
