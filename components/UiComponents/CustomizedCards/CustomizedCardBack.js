import React from "react";
import "./customCardDiv.css";

const CustomizedCardBack = (props) => {

  const product = props.product;
  //console.log(product);

  return (
<div className="customCardDiv">
      <div
        className={`rounded-[13.2923px] relative overflow-hidden ${
          product.horizontal ? "w-[324px] h-[204px]" : "h-[324px] w-[204px]"
        }`}
      >
        <div className="absolute rounded-[12px] overflow-hidden">
          <img src={product?.[props.color][1]} alt="card back" />
        </div>
        <div className="absolute top-5 left-5 md:top-6 md:left-6"></div>
      </div>
    </div>
  );
};

export default CustomizedCardBack;
