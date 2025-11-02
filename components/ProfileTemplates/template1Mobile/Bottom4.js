import React from "react";
import logo from "../images/logo2.png";

import Button from "../ProfileComponentsMobile/Button/Button";
import { clientUrl } from "../../../config";
import Image from "next/image";

function useDefaultProps(props){
  let newProps = {...props};
  Object.keys(newProps).forEach(key => newProps[key] === undefined ? delete newProps[key] : {});
  return {...defaultProps,...newProps};
}
export default function Bottom4(props) {props = useDefaultProps(props);
  const style = {
    width: props.width,
    background: props.color,
    color: props.textcolor,
    height: props.height,
    padding: props.padding,
  };
  const buttonStyle = props.buttonStyle;

  return (
    !props.logoSwitch && (
      <div className={`w-full ${props.mainFontFamily}-font-div`} style={style}>
        <div
          className={`p-5 w-full rounded-[16px] flex  bg-[#141414] sm:p-6 mb-6 sm:justify-between sm:items-center flex-col sm:flex-row relative overflow-hidden text-[#ffffffEa] ${props.style}`}
          style={{ padding: props.position.width < 360 ? "16px" : "" }}
        >
          <Image alt="logo" 
            className=" absolute w-[82px] h-[94px] left-[244px] opacity-[0.14000000059604645] top-[67px]"
            src={logo}
          />
          <div
            className={`flex ${
              props.position.width < 330 && "flex-col gap-2"
            } w-full`}
          >
            <Image alt="logo"  className="mr-3 w-7 h-8 mt-[5px]" src={logo} />
            <div className="flex flex-col gap-1">
              <h1 className="xsm:text-[14px] text-[12px] font-bold">
                Designed with Qviq 🤍
              </h1>
              <p className="xsm:text-[14px] text-[12px] mr-3 ">
                Sign Up for free to create your profile
              </p>
              <div className="pt-1 h-[60px]">
                <Button
                  text="Sign up"
                  onClick={() => {
                    if (props.dummy === false) {
                      window.location.href = `${clientUrl}/signup`;
                    }
                  }}
                  style={buttonStyle}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

const defaultProps = {
  mainFontFamily: "DM-Sans",
};
