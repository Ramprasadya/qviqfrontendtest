import React, { useState } from "react";
import phone from "../../../Website/assets/phone.png";
import { HiOutlinePhone } from "react-icons/hi";

const ContactBtn = (props) => {
  const [hover, setHover] = useState(false)
  const style = props.style;
  const position = props.position;
  const type = props.type;
  const customBtn = props.customBtn;
  const customBtn1 = props.customBtn1;
  const positionStyles = {
    positionStyle1: {
      color: "#FFF",
      // position: "absolute",
      zIndex: "900",
      margin: "10px",
      width: "100%",
      maxWidth: "280px",
      height: "36px",
      borderRadius: "40px",
      backgroundColor: `${hover ? "#606C38" : "#283618" }`,
      fontSize: "14px",
    },
    positionStyle12: {
      color: "#FEF9FF",
      zIndex: "900",
      // position: "absolute",
      width: "100%",
      margin: "10px",
      maxWidth: "280px",
      height: "48px",
      borderRadius: "0px",
      background: "#736CED",
      fontSize: "14px",
    },

    positionStyle13: {
      zIndex: "900",
      margin: "10px",
      width: "100%",
      maxWidth: "280px",
      height: "48px",
      borderRadius: "6px",
      color: "#FFFFFF",
      background: " #00C2C2",
      fontSize: "14px",
    },
    positionStyle14: {
      color: "#000",
      zIndex: "900",
      margin: "10px",
      width: "100%",
      maxWidth: "280px",
      height: "48px",
      borderRadius: "40px",
      backgroundColor: "#fff",
    },
    positionStyle15: {
      color: "#000",
      // position: "absolute",
      zIndex: "900",
      margin: "10px",
      width: "280px",
      maxWidth: "280px",
      width: "100%",
      borderRadius: "12px",
      backgroundColor: "#C6DE41",
      fontSize: "14px",
    },
    positionStyle2: {
      zIndex: "900",
      margin: "16px",
      // display: "flex",
      // width: "90%",
      // width: "280px",
      width: "100%",
      maxWidth: "280px",
      height: "48px",
      gap: "8px",
      color: "#000",
      backgroundColor: " #FFF",
      // borderRadius: "0",
      boxShadow: `${hover ? "" : "4px 4px 0px 0px #121212" }`,
      border: "1px solid #121212",
      fontSize: "14px",
    },
    positionStyle22: {
      zIndex: "900",
      margin: "16px",
      // width: "280px",
      width: "100%",
      maxWidth: "280px",
      height: "48px",
      padding: "13px 24px",
      gap: "8px",
      color: "#000",
      backgroundColor: " #FFF",
      borderRadius: "64px",
      boxShadow: `${hover ? "" : "4px 4px 0px 0px #121212" }`,
      border: "1px solid #121212",
      fontSize: "14px",
    },
    positionStyle3: {
      marginTop: "20px",
      width: "100%",
      maxWidth: "280px",
      height: "56px",
      border: "0",
      borderRadius: "12px",
      backgroundColor: " #FFF",
      borderRight: "4px solid #121212",
      borderBottom: "4px solid #121212",
      fontSize: "14px",
    },
    positionStyle4: {
      // position: "absolute",
      // translate: "-50%",
      zIndex: "900",
      marginTop: "10%",
      width: "100%",
      maxWidth: "280px",
      height: "48px",
      borderRadius: "40px",
      borderRight: " 4px solid #636363",
      borderBottom: " 4px solid #636363",
      backgroundColor: " #FFF",
      fontSize: "14px",
    },
    positionStyle5: {
      // position: "absolute",
      // translate: "-50%",
      zIndex: "900",
      marginTop: "10%",
      width: "100%",
      maxWidth: "280px",
      height: "56px",
      borderRadius: "40px",
      background: "linear-gradient(72deg, #033CCE 0%, #769BFC 96.38%)",
      boxShadow: "0px 8px 20px 0px rgba(3, 60, 206, 0.32)",
      fontSize: "14px",
    },
  };
  // Default style in case type is not found
  let positionStyle = {};

  if (customBtn) {
    positionStyle = {
      ...customBtn,
      margin: "16px",
      width: "100%",
      maxWidth: "280px",
      height: "48px",
      padding: "0px 5px",
      gap: "8px",
      fontSize: "14px",
    };

    // console.log("custom");
  } else if (customBtn1) {
    positionStyle = {
      ...customBtn1,
      marginTop: "16px",
      width: "100%",
      maxWidth: "280px",
      height: "48px",
      padding: "0px 5px",
      gap: "8px",
      fontSize: "14px",
    };

    // console.log("custom");
  }
  // Check if type exists in positionStyles
  else if (positionStyles[`positionStyle${type}`]) {
    // console.log("found");
    positionStyle = { ...positionStyles[`positionStyle${type}`] };
  } else {
    // console.log("not found");
  }

  return (
    <button
      className={`active:scale-95 duration-200 ${style}`}
      onClick={props.onClick}
      style={positionStyle}
      onMouseEnter={()=> setHover(true) }
      onMouseLeave={()=> setHover(false) }
    >
      {["1", "5", "12", "13"].includes(props.type) ? (
        // <img src={phone} alt="phone" style={{ filter: "invert(1)" }} />
        <HiOutlinePhone />
      ) : (
        <HiOutlinePhone />
      )}
      Get in touch
    </button>
  );
};

export default ContactBtn;
