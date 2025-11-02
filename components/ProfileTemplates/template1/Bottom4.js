import React from "react";
import logo from "../images/logo2.png";
import Button from "../ProfileComponents/Button/Button";
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

  const handleSignupClick = () => {
    if (!props.dummy) {
      window.location.href = `${clientUrl}/signup`;
    }
  };

  return (
    (!props.logoSwitch) &&
    <div className={`w-full ${props.mainFontFamily}-font-div`} style={style}>
      <div
        className={`p-5 w-full rounded-[16px] flex bg-[#141414] sm:p-6 sm:justify-between sm:items-center flex-col sm:flex-row relative overflow-hidden text-[#ffffffEa] ${props.style}`}
      >
        <Image alt="logo" 
          className=" absolute sm:w-[97px] sm:h-[111px] w-[82px] h-[94px] left-[244px] opacity-[0.14000000059604645] sm:left-[391px] sm:top-6 top-[67px]"
          src={logo}
        />
        <Image alt="logo" 
          className=" absolute w-[97px] h-[111px] opacity-[0.14000000059604645] bottom-10 left-[400px] sm:left-[714px] sm:bottom-1"
          src={logo}
        />
        <Image alt="logo" 
          className=" absolute w-[97px] h-[111px] opacity-[0.14000000059604645] left-[1020px] top-6"
          src={logo}
        />
        <div className="flex w-full mb-4 sm:mb-0">
          <Image alt="logo"  className="mr-3 w-10 h-8 mt-[5px]" src={logo} />
          <div>
            <h1 className="xsm:text-[14px] text-[12px] font-bold">
              Designed with Qviq 🤍
            </h1>
            <p className="xsm:text-[14px] text-[12px] mr-3 ">
              Sign Up for free to create your profile
            </p>
          </div>
        </div>
        <div className="h-[60px] w-[200px] flex flex-row justify-end">
        <Button
          text="Sign up"
          onClick={handleSignupClick}
          style={buttonStyle}
        />
        </div>
      </div>
    </div>
  );
}

const defaultProps = {
  mainFontFamily: "DM-Sans",
};
