import React, { useState, useEffect, useContext } from "react";
import "./UiStyles.css";
import axios from "axios";
import { serverUrl } from "../../config";

import Profile4 from "../ProfileTemplates/template1Mobile/Template1Mobile";
import Template2Mobile from "../ProfileTemplates/Template2Mobile/Template2Mobile";
import Template3Mobile from "../ProfileTemplates/Template3Mobile/Template3Mobile";
import Template4Mobile from "../ProfileTemplates/Template4Mobile/Template4Mobile";
import Template5Mobile from "../ProfileTemplates/Template5Mobile/Template5Mobile";
import Template6Mobile from "../ProfileTemplates/Template6Mobile/Template6Mobile";
import Template7Mobile from "../ProfileTemplates/Template7Mobile/Template7Mobile";
import {
  Template10Bg,
  Template11Bg,
  Template12Bg,
  Template13Bg,
  Template8Bg,
  Template9Bg,
  Template14Bg,
  Template15Bg,
  Template16Bg,
  Template17Bg,
  Template18Bg,
  Template19Bg,
  Template20Bg,
  Template21Bg,
  Template22Bg,
  Template23Bg,
  Template24Bg,
  Template25Bg,
  Template26Bg,
  Template27Bg,
  Template28Bg,
  Template29Bg,
  Template30Bg,
} from "../ProfileTemplates/TempateBg/MobileTemplateBg";
import Template11Mobile from "../ProfileTemplates/Template11Mobile/Template11Mobile";
import { UserContext } from "../Contexts/context";
import Template29Mobile from "../ProfileTemplates/Template29Mobile/Template29Mobile";
import Template30Mobile from "../ProfileTemplates/Template30Mobile/Template30Mobile";
import Template8Mobile from "../ProfileTemplates/Template8Mobile/Template8Mobile";
import CustomTemplate1Mobile from "../ProfileTemplates/CustomTemplate1Mobile/CustomTemplate1Mobile";
import CustomTemplate2Mobile from "../ProfileTemplates/CustomTemplate2Mobile/CustomTemplate2Mobile";

import iPhonePreview from "./iPhonePreview.svg";
import iPhoneNotch from "./iPhoneNotch.svg";
import Image from "next/image";

function Iphone({
  toggleStates,
  profile,
  template,
  templateName,
  backgroundColor,
  buttonStyle,
  buttonColor,
  fontColor,
  color1,
  color2,
  bgImage,
  appIconBg,
  appIconColor,
  customTextColor,
  customButtontextColor,
  ...props
}) {
  const data = {
    ...props.data,
    fromIphone: true,
  };

  const templatesArray = [
    {
      type: "template1",
      template: <Template2Mobile disable={true} data={data} />,
    },
    {
      type: "template2",
      template: <Template7Mobile disable={true} data={data} blur={true} />,
    },
    {
      type: "template3",
      template: (
        <Template8Mobile
          disable={true}
          data={data}
          mainbg={Template27Bg}
          square={false}
        />
      ),
    },
    {
      type: "template4",
      template: (
        <Template11Mobile
          disable={true}
          data={data}
          mainbg={Template11Bg}
          mainfg={`bg-[#F5775BBc]`}
        />
      ),
    },
    {
      type: "template5",
      template: (
        <Template7Mobile
          disable={true}
          data={data}
          mainbg={Template10Bg}
          square={false}
        />
      ),
    },
    {
      type: "template6",
      template: <Template4Mobile disable={true} data={data} />,
    },
    {
      type: "template7",
      template: (
        <Template11Mobile
          disable={true}
          data={data}
          mainbg={Template13Bg}
          mainfg={`bg-[#B284EEBc]`}
        />
      ),
    },
    {
      type: "template8",
      template: (
        <Template7Mobile
          disable={true}
          data={data}
          mainbg={Template20Bg}
          square={false}
        />
      ),
    },
    {
      type: "template9",
      template: <Template5Mobile disable={true} data={data} />,
    },
    {
      type: "template10",
      template: (
        <Template8Mobile
          disable={true}
          data={data}
          mainbg={Template24Bg}
          square={false}
        />
      ),
    },
    {
      type: "template11",
      template: (
        <Template7Mobile
          disable={true}
          data={data}
          mainbg={Template8Bg}
          square={false}
        />
      ),
    },
    {
      type: "template12",
      template: (
        <Template11Mobile
          disable={true}
          data={data}
          mainbg={Template12Bg}
          mainfg={"bg-[#C7E356Bc]"}
        />
      ),
    },
    {
      type: "template13",
      template: <Template3Mobile disable={true} data={data} />,
    },
    {
      type: "template14",
      template: (
        <Template7Mobile
          disable={true}
          data={data}
          mainbg={Template9Bg}
          blur={true}
        />
      ),
    },
    {
      type: "template15",
      template: (
        <Template29Mobile
          disable={true}
          data={data}
          mainbg={Template29Bg}
          mainfg={"bg-[#141414E5]"}
        />
      ),
    },
    {
      type: "template16",
      template: (
        <Template7Mobile
          disable={true}
          data={data}
          mainbg={Template14Bg}
          square={false}
        />
      ),
    },
    {
      type: "template17",
      template: (
        <Template7Mobile
          disable={true}
          data={data}
          mainbg={Template15Bg}
          square={false}
        />
      ),
    },
    {
      type: "template18",
      template: (
        <Template8Mobile
          disable={true}
          data={data}
          mainbg={Template26Bg}
          square={false}
        />
      ),
    },
    {
      type: "template19",
      template: <Template6Mobile disable={true} data={data} />,
    },
    {
      type: "template20",
      template: (
        <Template7Mobile
          disable={true}
          data={data}
          mainbg={Template16Bg}
          square={false}
        />
      ),
    },
    {
      type: "template21",
      template: (
        <Template8Mobile
          disable={true}
          data={data}
          mainbg={Template28Bg}
          square={false}
        />
      ),
    },
    {
      type: "template22",
      template: (
        <Template30Mobile
          disable={true}
          data={data}
          mainbg={Template30Bg}
          mainfg={"bg-[#ffffff]"}
        />
      ),
    },
    {
      type: "template23",
      template: (
        <Template7Mobile
          disable={true}
          data={data}
          mainbg={Template17Bg}
          square={false}
        />
      ),
    },
    {
      type: "template24",
      template: (
        <Template8Mobile
          disable={true}
          data={data}
          mainbg={Template25Bg}
          square={false}
        />
      ),
    },
    {
      type: "template25",
      template: (
        <Template7Mobile
          disable={true}
          data={data}
          mainbg={Template18Bg}
          square={false}
        />
      ),
    },
    {
      type: "template26",
      template: (
        <Template7Mobile
          disable={true}
          data={data}
          mainbg={Template19Bg}
          square={false}
        />
      ),
    },
    {
      type: "template27",
      template: (
        <Template7Mobile
          disable={true}
          data={data}
          mainbg={Template21Bg}
          square={false}
        />
      ),
    },
    {
      type: "template28",
      template: (
        <Template7Mobile
          disable={true}
          data={data}
          mainbg={Template22Bg}
          square={false}
        />
      ),
    },
    {
      type: "template29",
      template: (
        <Template7Mobile
          disable={true}
          data={data}
          mainbg={Template23Bg}
          square={false}
        />
      ),
    },

    // Custom template section
    {
      type: "customtemplate1",
      template: (
        <div className="flex flex-col justify-center w-full">
          <CustomTemplate1Mobile
            hideBrand={props.hideBrand}
            data={data}
            disable={true}
            mainbg={backgroundColor}
            btnstyle={buttonStyle}
            btncolor={buttonColor}
            fontColor={fontColor}
            appIconBg={appIconBg}
            appIconColor={appIconColor}
            customTextColor={customTextColor}
            customButtontextColor={customButtontextColor}
          />
        </div>
      ),
    },
    {
      type: "customtemplate2",
      template: (
        <div className="flex flex-col justify-center w-full">
          <CustomTemplate1Mobile
            data={data}
            disable={true}
            color1={color1}
            color2={color2}
            btnstyle={buttonStyle}
            btncolor={buttonColor}
            fontColor={fontColor}
            appIconBg={appIconBg}
            appIconColor={appIconColor}
            customTextColor={customTextColor}
            customButtontextColor={customButtontextColor}
          />
        </div>
      ),
    },
    {
      type: "customtemplate3",
      template: (
        <CustomTemplate2Mobile
          disable={true}
          data={data}
          btnstyle={buttonStyle}
          btncolor={buttonColor}
          mainbg={bgImage}
          square={false}
          appIconBg={appIconBg}
          appIconColor={appIconColor}
          customTextColor={customTextColor}
          customButtontextColor={customButtontextColor}
        />
      ),
    },
  ];

  return (
    <>
      {props.usedIn === "myAccount" ? (
        <div className="align-center flex-col overflow-hidden pb-[24px] hidden lg:block select-none">
          {/* <p className="text-center pb-[10px] s-color tracking-widest uppercase font-normal cursor-pointer">
        Preview
      </p> */}

          <div className="iphone-frame2 relative">
            {/* <div className="w-[720px] h-[1080px] overflow-scroll rounded-3xl flex flex-col justify-start items-center z-[1]"> */}

            <div className="iphone-content2 absolute overflow-scroll transform scale-[63%] z-[1] rounded-t-[55px] rounded-b-[56px]">
              <div className="flex flex-col justify-center w-full">
                {templateName !== "" &&
                  templatesArray?.find((temp) => temp.type === templateName)
                    ?.template}
              </div>
            </div>
            {/* </div> */}

            <div className="iphone-notch2">
              <Image alt="" src={iPhoneNotch} className="iPhoneNotch-svg" />
            </div>
            <Image
              src={iPhonePreview}
              alt="iPhone Preview"
              className="iphone-svg2"
            />
          </div>
        </div>
      ) : props.usedIn === "signup" ? (
        <div className="align-center flex-col overflow-hidden pb-[24px] block select-none">
          {/* <p className="text-center pb-[10px] s-color tracking-widest uppercase font-normal cursor-pointer">
        Preview
      </p> */}

          <div className="iphone-frame2 relative">
            {/* <div className="w-[720px] h-[1080px] overflow-scroll rounded-3xl flex flex-col justify-start items-center z-[1]"> */}

            <div className="iphone-content2 absolute overflow-scroll transform scale-[63%] z-[1] rounded-t-[55px] rounded-b-[56px]">
              <div className="flex flex-col justify-center w-full">
                {templateName !== "" &&
                  templatesArray?.find((temp) => temp.type === templateName)
                    ?.template}
              </div>
            </div>
            {/* </div> */}

            <div className="iphone-notch2">
              <Image alt="" src={iPhoneNotch} className="iPhoneNotch-svg" />
            </div>
            <Image
              src={iPhonePreview}
              alt="iPhone Preview"
              className="iphone-svg2"
            />
          </div>
        </div>
      ) : (
        <div
          className={`align-center flex-col overflow-hidden hidden xl:block select-none`}
          style={{ padding: "0 24px 24px 24px" }}
        >
          {/* <p className="text-center pb-[10px] s-color tracking-widest uppercase font-normal cursor-pointer">
        Preview
      </p> */}

          <div className="iphone-frame relative">
            {/* <div className="w-[720px] h-[1080px] overflow-scroll rounded-3xl flex flex-col justify-start items-center z-[1]"> */}

            <div className="iphone-content absolute overflow-scroll transform scale-[75%] z-[1] rounded-t-[55px] rounded-b-[56px]">
              <div className="flex flex-col justify-center w-full">
                {templateName !== "" &&
                  templatesArray?.find((temp) => temp.type === templateName)
                    ?.template}
              </div>
            </div>
            {/* </div> */}

            <div className="iphone-notch">
              <Image alt="" src={iPhoneNotch} className="iPhoneNotch-svg" />
            </div>
            <Image
              src={iPhonePreview}
              alt="iPhone Preview"
              className="iphone-svg"
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Iphone;
