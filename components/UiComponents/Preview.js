import React from "react";
import Dialog from "@mui/material/Dialog";
import { HiOutlineX } from "react-icons/hi";
import Profile4 from "../ProfileTemplates/template1/Template1";
import Template2 from "../ProfileTemplates/Template2/Template2";
import Template3 from "../ProfileTemplates/Template3/Template3";
import Template4 from "../ProfileTemplates/Template4/Template4";
import Template2Mobile from "../ProfileTemplates/Template2Mobile/Template2Mobile";
import Template3Mobile from "../ProfileTemplates/Template3Mobile/Template3Mobile";
import Template4Mobile from "../ProfileTemplates/Template4Mobile/Template4Mobile";
import Template5 from "../ProfileTemplates/Template5/Template5";
import Template5Mobile from "../ProfileTemplates/Template5Mobile/Template5Mobile";
import Template6 from "../ProfileTemplates/Template6/Template6";
import Template6Mobile from "../ProfileTemplates/Template6Mobile/Template6Mobile";
import Template7 from "../ProfileTemplates/Template7/Template7";
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
} from "../ProfileTemplates/TempateBg/TemplateBg";
import Template11 from "../ProfileTemplates/Template11/Template11";
import Template11Mobile from "../ProfileTemplates/Template11Mobile/Template11Mobile";
import Template29Mobile from "../ProfileTemplates/Template29Mobile/Template29Mobile";
import Template29 from "../ProfileTemplates/Template29/Template29";
import Template30Mobile from "../ProfileTemplates/Template30Mobile/Template30Mobile";
import Template30 from "../ProfileTemplates/Template30/Template30";
import Template8Mobile from "../ProfileTemplates/Template8Mobile/Template8Mobile";
import Template8 from "../ProfileTemplates/Template8/Template8";
import CustomTemplate1Mobile from "../ProfileTemplates/CustomTemplate1Mobile/CustomTemplate1Mobile";
import CustomTemplate1 from "../ProfileTemplates/CustomTemplate1/CustomTemplate1";
import CustomTemplate2Mobile from "../ProfileTemplates/CustomTemplate2Mobile/CustomTemplate2Mobile";
import CustomTemplate2 from "../ProfileTemplates/CustomTemplate2/CustomTemplate2";

const Preview = (props) => {
  const templatesArray = [
    {
      type: "template1",
      mobileTemplate: <Template2Mobile data={props.data} />,
      webTemplate: <Template2 data={props.data} />,
    },
    {
      type: "template13",
      mobileTemplate: <Template3Mobile data={props.data} />,
      webTemplate: <Template3 data={props.data} />,
    },
    {
      type: "template6",
      mobileTemplate: <Template4Mobile data={props.data} />,
      webTemplate: <Template4 data={props.data} />,
    },
    {
      type: "template4",
      mobileTemplate: (
        <Template11Mobile
          data={props.data}
          mainbg={Template11Bg}
          mainfg={`bg-[#F5775BBc]`}
        />
      ),
      webTemplate: (
        <Template11
          data={props.data}
          mainbg={Template11Bg}
          mainfg={`bg-[#F5775BBc]`}
        />
      ),
    },
    {
      type: "template9",
      mobileTemplate: <Template5Mobile data={props.data} />,
      webTemplate: <Template5 data={props.data} />,
    },
    {
      type: "template19",
      mobileTemplate: <Template6Mobile data={props.data} />,
      webTemplate: <Template6 data={props.data} />,
    },
    {
      type: "template2",
      mobileTemplate: <Template7Mobile data={props.data} blur={true} />,
      webTemplate: <Template7 data={props.data} blur={true} />,
    },
    {
      type: "template11",
      mobileTemplate: (
        <Template7Mobile
          data={props.data}
          mainbg={Template8Bg}
          square={false}
        />
      ),
      webTemplate: (
        <Template7 data={props.data} mainbg={Template8Bg} square={false} />
      ),
    },
    {
      type: "template14",
      mobileTemplate: (
        <Template7Mobile data={props.data} mainbg={Template9Bg} blur={true} />
      ),
      webTemplate: (
        <Template7 data={props.data} mainbg={Template9Bg} blur={true} />
      ),
    },
    {
      type: "template5",
      mobileTemplate: (
        <Template7Mobile
          data={props.data}
          mainbg={Template10Bg}
          square={false}
        />
      ),
      webTemplate: (
        <Template7 data={props.data} mainbg={Template10Bg} square={false} />
      ),
    },
    {
      type: "template12",
      mobileTemplate: (
        <Template11Mobile
          data={props.data}
          mainbg={Template12Bg}
          mainfg={"bg-[#C7E356Bc]"}
          star={"#324C2B"}
        />
      ),
      webTemplate: (
        <div className={`w-full !bg-[${Template12Bg.color}]`}>
          <Template11
            data={props.data}
            mainbg={Template12Bg}
            mainfg={"bg-[#C7E356Bc]"}
            star={"#324C2B"}
          />
        </div>
      ),
    },
    {
      type: "template7",
      mobileTemplate: (
        <Template11Mobile
          data={props.data}
          mainbg={Template13Bg}
          mainfg={`bg-[#B284EEBc]`}
        />
      ),
      webTemplate: (
        <div className={`w-full bg-[${Template13Bg.color}]`}>
          <Template11
            data={props.data}
            mainbg={Template13Bg}
            mainfg={`bg-[#B284EEBc]`}
          />
        </div>
      ),
    },
    {
      type: "template16",
      mobileTemplate: (
        <Template7Mobile
          data={props.data}
          mainbg={Template14Bg}
          square={false}
        />
      ),
      webTemplate: (
        <Template7 data={props.data} mainbg={Template14Bg} square={false} />
      ),
    },
    {
      type: "template17",
      mobileTemplate: (
        <Template7Mobile
          data={props.data}
          mainbg={Template15Bg}
          square={false}
        />
      ),
      webTemplate: (
        <Template7 data={props.data} mainbg={Template15Bg} square={false} />
      ),
    },
    {
      type: "template20",
      mobileTemplate: (
        <Template7Mobile
          data={props.data}
          mainbg={Template16Bg}
          square={false}
        />
      ),
      webTemplate: (
        <Template7 data={props.data} mainbg={Template16Bg} square={false} />
      ),
    },
    {
      type: "template23",
      mobileTemplate: (
        <Template7Mobile
          data={props.data}
          mainbg={Template17Bg}
          square={false}
        />
      ),
      webTemplate: (
        <Template7 data={props.data} mainbg={Template17Bg} square={false} />
      ),
    },
    {
      type: "template25",
      mobileTemplate: (
        <Template7Mobile
          data={props.data}
          mainbg={Template18Bg}
          square={false}
        />
      ),
      webTemplate: (
        <Template7 data={props.data} mainbg={Template18Bg} square={false} />
      ),
    },
    {
      type: "template26",
      mobileTemplate: (
        <Template7Mobile
          data={props.data}
          mainbg={Template19Bg}
          square={false}
        />
      ),
      webTemplate: (
        <Template7 data={props.data} mainbg={Template19Bg} square={false} />
      ),
    },
    {
      type: "template8",
      mobileTemplate: (
        <Template7Mobile
          data={props.data}
          mainbg={Template20Bg}
          square={false}
        />
      ),
      webTemplate: (
        <Template7 data={props.data} mainbg={Template20Bg} square={false} />
      ),
    },
    {
      type: "template27",
      mobileTemplate: (
        <Template7Mobile
          data={props.data}
          mainbg={Template21Bg}
          square={false}
        />
      ),
      webTemplate: (
        <Template7 data={props.data} mainbg={Template21Bg} square={false} />
      ),
    },
    {
      type: "template28",
      mobileTemplate: (
        <Template7Mobile
          data={props.data}
          mainbg={Template22Bg}
          square={false}
        />
      ),
      webTemplate: (
        <Template7 data={props.data} mainbg={Template22Bg} square={false} />
      ),
    },
    {
      type: "template29",
      mobileTemplate: (
        <Template7Mobile
          data={props.data}
          mainbg={Template23Bg}
          square={false}
        />
      ),
      webTemplate: (
        <Template7 data={props.data} mainbg={Template23Bg} square={false} />
      ),
    },
    {
      type: "template10",
      mobileTemplate: (
        <Template8Mobile
          data={props.data}
          mainbg={Template24Bg}
          square={false}
        />
      ),
      webTemplate: (
        <Template8 data={props.data} mainbg={Template24Bg} square={false} />
      ),
    },
    {
      type: "template24",
      mobileTemplate: (
        <Template8Mobile
          data={props.data}
          mainbg={Template25Bg}
          square={false}
        />
      ),
      webTemplate: (
        <Template8 data={props.data} mainbg={Template25Bg} square={false} />
      ),
    },
    {
      type: "template18",
      mobileTemplate: (
        <Template8Mobile
          data={props.data}
          mainbg={Template26Bg}
          square={false}
        />
      ),
      webTemplate: (
        <Template8 data={props.data} mainbg={Template26Bg} square={false} />
      ),
    },
    {
      type: "template3",
      mobileTemplate: (
        <Template8Mobile
          data={props.data}
          mainbg={Template27Bg}
          square={false}
        />
      ),
      webTemplate: (
        <Template8 data={props.data} mainbg={Template27Bg} square={false} />
      ),
    },
    {
      type: "template21",
      mobileTemplate: (
        <Template8Mobile
          data={props.data}
          mainbg={Template28Bg}
          square={false}
        />
      ),
      webTemplate: (
        <Template8 data={props.data} mainbg={Template28Bg} square={false} />
      ),
    },
    {
      type: "template15",
      mobileTemplate: (
        <Template29Mobile
          data={props.data}
          mainbg={Template29Bg}
          mainfg={"bg-[#141414E5]"}
        />
      ),
      webTemplate: (
        <div className={`w-full bg-[${Template29Bg.color}]`}>
          <Template29
            data={props.data}
            mainbg={Template29Bg}
            mainfg={"bg-[#141414E5]"}
          />
        </div>
      ),
    },
    {
      type: "template22",
      mobileTemplate: (
        <Template30Mobile
          data={props.data}
          mainbg={Template30Bg}
          mainfg={"bg-[#ffffff]"}
        />
      ),
      webTemplate: (
        <div className={`w-full bg-[${Template30Bg.color}]`}>
          <Template30
            data={props.data}
            mainbg={Template30Bg}
            mainfg={"bg-[#ffffff]"}
          />
        </div>
      ),
    },

    // Custom template section
    {
      type: "customtemplate1",
      mobileTemplate: (
        <CustomTemplate1Mobile
          data={props.data}
          disable={true}
          mainbg={props.backgroundColor}
          btnstyle={props.buttonStyle}
          btncolor={props.buttonColor}
          appIconBg={props.appIconBg}
          customButtontextColor={props.customButtontextColor}
          customTextColor={props.customTextColor}
        />
      ),
      webTemplate: (
        <CustomTemplate1
          data={props.data}
          disable={true}
          mainbg={props.backgroundColor}
          btnstyle={props.buttonStyle}
          btncolor={props.buttonColor}
          appIconBg={props.appIconBg}
          customButtontextColor={props.customButtontextColor}
          customTextColor={props.customTextColor}
        />
      ),
    },
    {
      type: "customtemplate2",
      mobileTemplate: (
        <CustomTemplate1Mobile
          data={props.data}
          disable={true}
          color1={props.color1}
          color2={props.color2}
          btnstyle={props.buttonStyle}
          btncolor={props.buttonColor}
          fontColor={props.fontColor}
          appIconBg={props.appIconBg}
          customButtontextColor={props.customButtontextColor}
          customTextColor={props.customTextColor}
        />
      ),
      webTemplate: (
        <CustomTemplate1
          data={props.data}
          disable={true}
          color1={props.color1}
          color2={props.color2}
          btnstyle={props.buttonStyle}
          btncolor={props.buttonColor}
          fontColor={props.fontColor}
          appIconBg={props.appIconBg}
          customButtontextColor={props.customButtontextColor}
          customTextColor={props.customTextColor}
        />
      ),
    },
    {
      type: "customtemplate3",
      mobileTemplate: (
        <CustomTemplate2Mobile
          disable={true}
          data={props.data}
          btnstyle={props.buttonStyle}
          btncolor={props.buttonColor}
          appIconBg={props.appIconBg}
          customButtontextColor={props.customButtontextColor}
          customTextColor={props.customTextColor}
          mainbg={
            props.bgImage != undefined ? props.bgImage : Template22Bg.image
          }
          square={false}
        />
      ),
      webTemplate: (
        <CustomTemplate2
          disable={true}
          data={props.data}
          btnstyle={props.buttonStyle}
          btncolor={props.buttonColor}
          appIconBg={props.appIconBg}
          customButtontextColor={props.customButtontextColor}
          customTextColor={props.customTextColor}
          mainbg={
            props.bgImage != undefined ? props.bgImage : Template22Bg.image
          }
          square={false}
        />
      ),
    },
  ];

  return (
    <Dialog
      open={props.open}
      PaperProps={{
        style: {
          minHeight: "100vh",
          minWidth: "100vw",
          backgroundColor: "transparent",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
      }}
    >
      <div className="w-full max-w-[90vw] h-full max-h-[calc(100vh-100px)] md:h-[95vh] relative overflow-scroll">
        <button
          className="fixed top-14 md:!top-14 right-3 xsm2:right-4 sm:right-12 xl:right-24 -translate-x-1/2 w-8 h-8 xsm2:w-12 xsm2:h-12 rounded-full flex justify-center items-center bg-gray-200 hover:bg-gray-300 transition duration-300"
          onClick={() => props.setShowPreview(false)}
          style={{ zIndex: "999" }}
        >
          <HiOutlineX className=" w-4 h-4 xsm2:w-6 xsm2:h-6 text-[#F54040]" />
        </button>
        {typeof window !== "undefined" && window.screen.width <= 768 ? (
          <div className="flex justify-center min-h-[calc(100vh-20px)]">
            {props.templateType !== "" &&
              templatesArray.find(
                (template) => template.type === props.templateType
              )?.mobileTemplate}
          </div>
        ) : (
          <div className="flex justify-center min-h-[95vh]">
            {props.templateType !== "" &&
              templatesArray.find(
                (template) => template.type === props.templateType
              )?.webTemplate}
          </div>
        )}
      </div>
    </Dialog>
  );
};

export default Preview;
