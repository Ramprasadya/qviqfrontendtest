import React, { useEffect, useState } from "react";
import phone from "../../../Website/assets/phone.png";
import phone2 from "../../../Website/assets/phone.png";
import { HiOutlinePhone } from "react-icons/hi";

const ContactBtn = (props) => {
  const [hover, setHover] = useState(false)
  const style = props.style;
  const position = props.position;
  const type = props.type;
  const customBtn = props.customBtn;
  // console.log(type);
  const positionStyles = {
    positionStyle1: {
      color: "#FFF",
      // position: "absolute",
      zIndex: "900",
      margin: "10px",
      width: "229px",
      height: "72px",
      borderRadius: "40px",
      backgroundColor: `${hover ? "#606C38" : "#283618" }`,

      fontSize: "14px",
    },
    positionStyle12: {
      color: "#FEF9FF",
      zIndex: "900",
      // position: "absolute",
      margin: "10px",
      width: "229px",
      height: "72px",
      borderRadius: "0px",
      background: "#736CED",
      fontSize: "14px",
    },
    positionStyle13: {
      zIndex: "900",
      margin: "10px",
      width: "229px",
      height: "72px",
      borderRadius: "6px",
      color: "#FFFFFF",
      background: " #00C2C2",
      fontSize: "14px",
    },
    positionStyle14: {
      color: "#000",
      zIndex: "900",
      margin: "10px",
      width: "229px",
      height: "72px",
      borderRadius: "40px",
      backgroundColor: "#fff",
      fontSize: "14px",
    },
    positionStyle15: {
      color: "#000",
      zIndex: "900",
      margin: "10px",
      width: "229px",
      height: "72px",
      borderRadius: "12px",
      background: "#C6DE41",
      fontSize: "14px",
    },
    positionStyle2: {
      zIndex: "900",
      margin: "20px",
      display: "flex",
      width: "229px",
      height: "72px",
      padding: "13px 24px",
      justifycontent: "center",
      alignItems: "center",
      gap: "8px",
      color: "#000",
      backgroundColor: " #FFF",
      // borderRadius: "0",
      boxShadow: `${hover ? "" : "4px 4px 0px 0px #121212" }`,
      border: "1px solid #121212",
      
    },

    positionStyle22: {
      zIndex: "900",
      margin: "20px",
      display: "flex",
      width: "229px",
      height: "72px",
      padding: "13px 24px",
      justifycontent: "center",
      alignItems: "center",
      gap: "8px",
      color: "#000",
      backgroundColor: " #FFF",
      borderRadius: "64px",
      border: "1px solid #121212",
      boxShadow: `${hover ? "" : "4px 4px 0px 0px #121212" }`,
    },
    positionStyle3: {
      // position: "absolute",
      // bottom: '50px',
      // left: position.width < 1182 ? `${position.left + position.width - 180}px` : 'calc(50% + 440px)',
      zIndex: "900",
      left: "38%",
      top: "65%",
      marginTop: "50px",
      width: "229px",
      height: "72px",
      border: "0",
      borderRadius: "12px",
      borderRight: " 8px solid #121212",
      borderBottom: "8px solid #121212",
      backgroundColor: " #FFF",
    },
    positionStyle4: {
      position: "absolute",
      translate: "-50%",
      zIndex: "900",
      marginTop: "3%",
      width: "229px",
      maxWidth: "315px",
      height: "72px",
      borderRadius: "40px",
      borderRight: " 4px solid #636363",
      borderBottom: " 4px solid #636363",
      backgroundColor: " #FFF",
    },
    positionStyle5: {
      position: "absolute",
      translate: "-50%",
      zIndex: "900",
      margin: "10px",
      width: "229px",
      height: "72px",
      borderRadius: "40px",
      background: "linear-gradient(72deg, #033CCE 0%, #769BFC 96.38%)",
      boxShadow: "0px 8px 20px 0px rgba(3, 60, 206, 0.32)",
     
    },
  };
  // Default style in case type is not found
  let positionStyle = {};
  if (customBtn) {
    positionStyle = {
      ...customBtn,
      display: "flex",
      width: "229px",
      height: "72px",
      padding: "13px 24px",
      justifycontent: "center",
      alignItems: "center",
      gap: "8px",
      marginBottom: "20px",
    };
    // console.log(customBtn);
  }
  // Check if type exists in positionStyles
  else if (positionStyles[`positionStyle${type}`]) {
    
    positionStyle = { ...positionStyles[`positionStyle${type}`] };
  } else {
    
  }

  return (
    <button
      className={`active:scale-95 duration-200 ${style} `}
      onClick={props.onClick}
      style={positionStyle}
      onMouseEnter={()=> setHover(true) }
      onMouseLeave={()=> setHover(false) }
    >
      {["1", "5", "12", "13"].includes(props.type) ? (
        <HiOutlinePhone />
      ) : (
        <HiOutlinePhone />
      )}
      Get in touch
    </button>
  );
};

export default ContactBtn;

// import React from 'react'

// const ContactBtn = (props) => {
//     const style = props.style;
//     const position = props.position;
//     const positionStyle = {
//         position: 'fixed',
//         bottom: '50px',
//         // left: position.width < 1182 ? `${position.left + position.width - 180}px` : 'calc(50% + 440px)',
//         zIndex: '900'
//     }

//     return (
//         <button className={`active:scale-95 duration-200 ${style}`} onClick={props.onClick} style={positionStyle}>Contact</button>
//     )
// }

// export default ContactBtn

