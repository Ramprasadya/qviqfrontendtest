import React, { useState } from "react";
import Draggable from "react-draggable";
import "./FloatingDiv.css";
import logo from "./assets/logo.png";
import Image from "next/image";

const FloatingDiv = (props) => {
  return (
    <Draggable
      position={props.position}
      onStop={(e, data) => props.setPosition({ x: data.x, y: data.y })}
    >
      <div className="floating-div">
        <h1 className="heading">Card Preview</h1>

        <div className="cover"></div>

        <div
          className={
            props.selectedCheckbox === "Horizontal"
              ? "w-[324px] h-[204px] card"
              : "w-[204px] h-[324px] card"
          }
        >
          <Image
            className="logo"
            alt="logo"
            height={48}
            width={48}
            src={logo}
            style={props.logoStyle}
          />

          <div className="content" style={props.contentStyle}>
            <div className="name" style={props.userNameStyle}>
              Your Name
            </div>
            <div className="designation" style={props.designationStyle}>
              Your Designation
            </div>
          </div>

          {props.imageUrl && (
            <Image
              alt="cardFront"
              className="cardFront"
              height={props.selectedCheckbox === "Horizontal" ? 204 : 324}
              width={props.selectedCheckbox === "Horizontal" ? 324 : 204}
              src={props.imageUrl}
            />
          )}
        </div>
      </div>
    </Draggable>
  );
};

export default FloatingDiv;
