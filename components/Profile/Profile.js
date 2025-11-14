import React, { useState, useEffect } from "react";
import Template2 from "../ProfileTemplates/Template2/Template2";
import Template2Mobile from "../ProfileTemplates/Template2Mobile/Template2Mobile";
import Template3 from "../ProfileTemplates/Template3/Template3";
import Template3Mobile from "../ProfileTemplates/Template3Mobile/Template3Mobile";
import Template4 from "../ProfileTemplates/Template4/Template4";
import Template4Mobile from "../ProfileTemplates/Template4Mobile/Template4Mobile";
import Template5 from "../ProfileTemplates/Template5/Template5";
import Template5Mobile from "../ProfileTemplates/Template5Mobile/Template5Mobile";
import Template6 from "../ProfileTemplates/Template6/Template6";
import Template6Mobile from "../ProfileTemplates/Template6Mobile/Template6Mobile";
import Template7 from "../ProfileTemplates/Template7/Template7";
import Template7Mobile from "../ProfileTemplates/Template7Mobile/Template7Mobile";
import {
  Template8Bg,
  Template9Bg,
  Template10Bg,
  Template11Bg,
  Template12Bg,
  Template13Bg,
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

const ViewProfile = (props) => {
  // console.log(props.data);

  const userName = props.userName;
  const qrGoogle = props.qrGoogle;
  const data = {
    username: userName,
    firstName: props.firstName,
    lastName: props.lastName,
    name: props.name,
    email: props.email,
    mobileNumber: props.mobileNumber,
    newMobileNumber: props.newMobileNumber,
    jobDescription: props.jobDescription,
    companyName: props.companyName,
    pimage: props?.pimage,
    images: props.images,
    videos: props.videos,
    apps: props.apps,
    productSwitch: props.productSwitch,
    serviceSwitch: props.serviceSwitch,
    reviewSwitch: props.reviewSwitch,
    reviewButtonSwitch: props.reviewButtonSwitch,
    googleReviewButtonSwitch: props.googleReviewButtonSwitch,
    businessHoursSwitch: props.businessHoursSwitch,
    availabilitySwitch: props.availabilitySwitch,
    logoSwitch: props.logoSwitch,
    productLabel: props.productLabel,
    serviceLabel: props.serviceLabel,
    reviewLabel: props.reviewLabel,
    businessHoursLabel: props.businessHoursLabel,
    availabilityLabel: props.availabilityLabel,
    products: props.products,
    services: props.services,
    reviews: props.reviews,
    businessHours: props.businessHours,
    availability: props.availability,
    jobTitle: props.jobTitle,
    pdfs: props.pdfs,
    customLinks: props.customLinks,
    dummyData: props.dummyData,
    templateId: props.templateId,
    leadCapture: props.leadCapture,
    quickSelect: props.quickSelect,
    fromRedirect: props.fromRedirect,
    mobileVisibility: props.mobileVisibility,
  };

  // console.log(data);

  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const activeTemplate = props.activeTemplate;
  const templatesArray = [
    {
      type: "template1",
      mobileTemplate: <Template2Mobile data={data} qrGoogle={qrGoogle} />,
      webTemplate: <Template2 data={data} qrGoogle={qrGoogle} />,
    },
    {
      type: "template13",
      mobileTemplate: <Template3Mobile data={data} qrGoogle={qrGoogle} />,
      webTemplate: <Template3 data={data} qrGoogle={qrGoogle} />,
    },
    {
      type: "template6",
      mobileTemplate: <Template4Mobile data={data} qrGoogle={qrGoogle} />,
      webTemplate: <Template4 data={data} qrGoogle={qrGoogle} />,
    },
    {
      type: "template4",
      mobileTemplate: (
        <Template11Mobile
          data={data}
          qrGoogle={qrGoogle}
          mainbg={Template11Bg}
          mainfg={`bg-[#F5775BBc]`}
        />
      ),
      webTemplate: (
        <Template11
          data={data}
          qrGoogle={qrGoogle}
          mainbg={Template11Bg}
          mainfg={`bg-[#F5775BBc]`}
        />
      ),
    },
    {
      type: "template9",
      mobileTemplate: <Template5Mobile data={data} qrGoogle={qrGoogle} />,
      webTemplate: <Template5 data={data} />,
    },
    {
      type: "template19",
      mobileTemplate: <Template6Mobile data={data} qrGoogle={qrGoogle} />,
      webTemplate: <Template6 data={data} type="9" qrGoogle={qrGoogle} />,
    },
    {
      type: "template2",
      mobileTemplate: (
        <Template7Mobile data={data} blur={true} qrGoogle={qrGoogle} />
      ),
      webTemplate: <Template7 data={data} blur={true} qrGoogle={qrGoogle} />,
    },
    {
      type: "template11",
      mobileTemplate: (
        <Template7Mobile
          data={data}
          mainbg={Template8Bg}
          square={false}
          qrGoogle={qrGoogle}
        />
      ),
      webTemplate: (
        <Template7
          data={data}
          mainbg={Template8Bg}
          square={false}
          qrGoogle={qrGoogle}
        />
      ),
    },
    {
      type: "template14",
      mobileTemplate: (
        <Template7Mobile
          data={data}
          mainbg={Template9Bg}
          blur={true}
          qrGoogle={qrGoogle}
        />
      ),
      webTemplate: (
        <Template7
          data={data}
          mainbg={Template9Bg}
          blur={true}
          qrGoogle={qrGoogle}
        />
      ),
    },
    {
      type: "template5",
      mobileTemplate: (
        <Template7Mobile
          data={data}
          mainbg={Template10Bg}
          square={false}
          qrGoogle={qrGoogle}
        />
      ),
      webTemplate: (
        <Template7
          data={data}
          mainbg={Template10Bg}
          square={false}
          qrGoogle={qrGoogle}
        />
      ),
    },
    {
      type: "template12",
      mobileTemplate: (
        <Template11Mobile
          data={data}
          mainbg={Template12Bg}
          qrGoogle={qrGoogle}
          mainfg={"bg-[#C7E356Bc]"}
        />
      ),
      webTemplate: (
        <div className={`w-full !bg-[${Template12Bg.color}]`}>
          <Template11
            data={data}
            qrGoogle={qrGoogle}
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
          data={data}
          qrGoogle={qrGoogle}
          mainbg={Template13Bg}
          mainfg={`bg-[#B284EEBc]`}
        />
      ),
      webTemplate: (
        <div className={`w-full bg-[${Template13Bg.color}]`}>
          <Template11
            data={data}
            qrGoogle={qrGoogle}
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
          data={data}
          mainbg={Template14Bg}
          square={false}
          qrGoogle={qrGoogle}
        />
      ),
      webTemplate: (
        <Template7
          data={data}
          mainbg={Template14Bg}
          square={false}
          qrGoogle={qrGoogle}
        />
      ),
    },
    {
      type: "template17",
      mobileTemplate: (
        <Template7Mobile
          data={data}
          mainbg={Template15Bg}
          square={false}
          qrGoogle={qrGoogle}
        />
      ),
      webTemplate: (
        <Template7
          data={data}
          mainbg={Template15Bg}
          square={false}
          qrGoogle={qrGoogle}
        />
      ),
    },
    {
      type: "template20",
      mobileTemplate: (
        <Template7Mobile
          data={data}
          mainbg={Template16Bg}
          square={false}
          qrGoogle={qrGoogle}
        />
      ),
      webTemplate: (
        <Template7
          data={data}
          mainbg={Template16Bg}
          square={false}
          qrGoogle={qrGoogle}
        />
      ),
    },
    {
      type: "template23",
      mobileTemplate: (
        <Template7Mobile
          data={data}
          mainbg={Template17Bg}
          square={false}
          qrGoogle={qrGoogle}
        />
      ),
      webTemplate: (
        <Template7
          data={data}
          mainbg={Template17Bg}
          square={false}
          qrGoogle={qrGoogle}
        />
      ),
    },
    {
      type: "template25",
      mobileTemplate: (
        <Template7Mobile
          data={data}
          mainbg={Template18Bg}
          square={false}
          qrGoogle={qrGoogle}
        />
      ),
      webTemplate: (
        <Template7
          data={data}
          mainbg={Template18Bg}
          square={false}
          qrGoogle={qrGoogle}
        />
      ),
    },
    {
      type: "template26",
      mobileTemplate: (
        <Template7Mobile
          data={data}
          mainbg={Template19Bg}
          square={false}
          qrGoogle={qrGoogle}
        />
      ),
      webTemplate: (
        <Template7
          data={data}
          mainbg={Template19Bg}
          square={false}
          qrGoogle={qrGoogle}
        />
      ),
    },
    {
      type: "template8",
      mobileTemplate: (
        <Template7Mobile
          data={data}
          mainbg={Template20Bg}
          square={false}
          qrGoogle={qrGoogle}
        />
      ),
      webTemplate: (
        <Template7
          data={data}
          mainbg={Template20Bg}
          square={false}
          qrGoogle={qrGoogle}
        />
      ),
    },
    {
      type: "template27",
      mobileTemplate: (
        <Template7Mobile
          data={data}
          mainbg={Template21Bg}
          square={false}
          qrGoogle={qrGoogle}
        />
      ),
      webTemplate: (
        <Template7
          data={data}
          mainbg={Template21Bg}
          square={false}
          qrGoogle={qrGoogle}
        />
      ),
    },
    {
      type: "template28",
      mobileTemplate: (
        <Template7Mobile
          data={data}
          mainbg={Template22Bg}
          square={false}
          qrGoogle={qrGoogle}
        />
      ),
      webTemplate: (
        <Template7
          data={data}
          mainbg={Template22Bg}
          square={false}
          qrGoogle={qrGoogle}
        />
      ),
    },
    {
      type: "template29",
      mobileTemplate: (
        <Template7Mobile
          data={data}
          mainbg={Template23Bg}
          square={false}
          qrGoogle={qrGoogle}
        />
      ),
      webTemplate: (
        <Template7
          data={data}
          mainbg={Template23Bg}
          square={false}
          qrGoogle={qrGoogle}
        />
      ),
    },
    {
      type: "template10",
      mobileTemplate: (
        <Template8Mobile
          data={data}
          mainbg={Template24Bg}
          square={false}
          qrGoogle={qrGoogle}
        />
      ),
      webTemplate: (
        <Template8
          data={data}
          mainbg={Template24Bg}
          square={false}
          qrGoogle={qrGoogle}
        />
      ),
    },
    {
      type: "template24",
      mobileTemplate: (
        <Template8Mobile
          data={data}
          mainbg={Template25Bg}
          square={false}
          qrGoogle={qrGoogle}
        />
      ),
      webTemplate: (
        <Template8
          data={data}
          mainbg={Template25Bg}
          square={false}
          qrGoogle={qrGoogle}
        />
      ),
    },
    {
      type: "template18",
      mobileTemplate: (
        <Template8Mobile
          data={data}
          mainbg={Template26Bg}
          square={false}
          qrGoogle={qrGoogle}
        />
      ),
      webTemplate: (
        <Template8
          data={data}
          mainbg={Template26Bg}
          square={false}
          qrGoogle={qrGoogle}
        />
      ),
    },
    {
      type: "template3",
      mobileTemplate: (
        <Template8Mobile
          data={data}
          mainbg={Template27Bg}
          square={false}
          qrGoogle={qrGoogle}
        />
      ),
      webTemplate: (
        <Template8
          data={data}
          mainbg={Template27Bg}
          square={false}
          qrGoogle={qrGoogle}
        />
      ),
    },
    {
      type: "template21",
      mobileTemplate: (
        <Template8Mobile
          data={data}
          mainbg={Template28Bg}
          square={false}
          qrGoogle={qrGoogle}
        />
      ),
      webTemplate: (
        <Template8
          data={data}
          mainbg={Template28Bg}
          square={false}
          qrGoogle={qrGoogle}
        />
      ),
    },
    {
      type: "template15",
      mobileTemplate: (
        <Template29Mobile
          data={data}
          qrGoogle={qrGoogle}
          mainbg={Template29Bg}
          mainfg={"bg-[#141414E5]"}
        />
      ),
      webTemplate: (
        <div className={`w-full bg-[${Template29Bg.color}]`}>
          <Template29
            data={data}
            qrGoogle={qrGoogle}
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
          qrGoogle={qrGoogle}
          data={data}
          mainbg={Template30Bg}
          mainfg={"bg-[#ffffff]"}
        />
      ),
      webTemplate: (
        <div className={`w-full bg-[${Template30Bg.color}]`}>
          <Template30
            data={data}
            qrGoogle={qrGoogle}
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
          data={data}
          qrGoogle={qrGoogle}
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
          data={data}
          qrGoogle={qrGoogle}
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
          data={data}
          qrGoogle={qrGoogle}
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
          data={data}
          qrGoogle={qrGoogle}
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
          data={data}
          qrGoogle={qrGoogle}
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
          data={data}
          qrGoogle={qrGoogle}
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
    <div className="flex flex-col justify-center w-full">
      {activeTemplate !== "" &&
        (windowWidth > 768
          ? templatesArray.find((temp) => temp.type === activeTemplate)
              ?.webTemplate
          : templatesArray.find((temp) => temp.type === activeTemplate)
              ?.mobileTemplate)}
    </div>
  );
};

export default ViewProfile;
