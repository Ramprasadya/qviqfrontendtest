import React from "react";
import "../review/review.css";
import {
  isIOS,
  isAndroid,
  isDesktop,
  isChrome,
  isFirefox,
  isSafari,
} from "react-device-detect";

const NewToast = (props) => {
  return (
    <div
      style={props.open ? { display: "flex" } : { display: "none" }}
      className={`absolute w-full flex justify-center items-center align-middle bottom-[2rem] left-0 z-[9999] ${isIOS ? "mb-[60px]" : "mb-[0px]"}`}
    >
      <div
        className="message"
        style={{
          boxShadow: "0px 4px 16px 0px rgba(171, 181, 217, 0.36)",
          background: "#1a1a1a",
        }}
      >
        {props.message}
      </div>
    </div>
  );
};

export default NewToast;
