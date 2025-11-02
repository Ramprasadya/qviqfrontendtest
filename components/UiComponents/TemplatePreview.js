import React, { useEffect, useState } from "react";
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
  Template27BgMobile,
  Template10BgMobile,
  Template20BgMobile,
  Template24BgMobile,
  Template8BgMobile,
  Template9BgMobile,
  Template14BgMobile,
  Template15BgMobile,
  Template26BgMobile,
  Template16BgMobile,
  Template28BgMobile,
  Template17BgMobile,
  Template25BgMobile,
  Template18BgMobile,
  Template19BgMobile,
  Template21BgMobile,
  Template22BgMobile,
  Template23BgMobile,
} from "../ProfileTemplates/TempateBg/TemplateBg";
import Template11 from "../ProfileTemplates/Template11/Template11";
import Template11Mobile from "../ProfileTemplates/Template11Mobile/Template11Mobile";
import Template29Mobile from "../ProfileTemplates/Template29Mobile/Template29Mobile";
import Template29 from "../ProfileTemplates/Template29/Template29";
import Template30Mobile from "../ProfileTemplates/Template30Mobile/Template30Mobile";
import Template30 from "../ProfileTemplates/Template30/Template30";
import Template8Mobile from "../ProfileTemplates/Template8Mobile/Template8Mobile";
import Template8 from "../ProfileTemplates/Template8/Template8";
import PrimaryButton2 from "./PrimaryButton2";
import NewToast from "./NewToast";
import Toast from "./Toast";

export default function TemplatePreview(props) {
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

  const [deviceType, setDeviceType] = useState("mobile");

  const templatesArray = [
    {
      type: "template1",
      mobileTemplate: <Template2Mobile disable={true} />,
      webTemplate: <Template2 disable={true} />,
    },
    {
      type: "template7",
      mobileTemplate: <Template7Mobile disable={true} blur={true} />,
      webTemplate: <Template7 disable={true} blur={true} />,
    },
    {
      type: "template26",
      mobileTemplate: (
        <Template8Mobile disable={true} mainbg={Template27BgMobile} square={false} />
      ),
      webTemplate: (
        <Template8 disable={true} mainbg={Template27Bg} square={false} />
      ),
    },
    {
      type: "template4",
      mobileTemplate: (
        <Template11Mobile
          disable={true}
          mainbg={Template11Bg}
          mainfg={`bg-[#F5775BBc]`}
        />
      ),
      webTemplate: (
        <Template11
          disable={true}
          mainbg={Template11Bg}
          mainfg={`bg-[#F5775BBc]`}
        />
      ),
    },
    {
      type: "template10",
      mobileTemplate: (
        <Template7Mobile disable={true} mainbg={Template10BgMobile} square={false} />
      ),
      webTemplate: (
        <Template7 disable={true} mainbg={Template10Bg} square={false} />
      ),
    },
    {
      type: "template3",
      mobileTemplate: <Template4Mobile disable={true} />,
      webTemplate: <Template4 disable={true} />,
    },
    {
      type: "template12",
      mobileTemplate: (
        <Template11Mobile
          disable={true}
          mainbg={Template13Bg}
          mainfg={`bg-[#B284EEBc]`}
        />
      ),
      webTemplate: (
        <Template11
          disable={true}
          mainbg={Template13Bg}
          mainfg={`bg-[#B284EEBc]`}
        />
      ),
    },
    {
      type: "template19",
      mobileTemplate: (
        <Template7Mobile disable={true} mainbg={Template20BgMobile} square={false} />
      ),
      webTemplate: (
        <Template7 disable={true} mainbg={Template20Bg} square={false} />
      ),
    },
    {
      type: "template5",
      mobileTemplate: <Template5Mobile disable={true} />,
      webTemplate: <Template5 disable={true} />,
    },

    {
      type: "template23",
      mobileTemplate: (
        <Template8Mobile disable={true} mainbg={Template24BgMobile} square={false} />
      ),
      webTemplate: (
        <Template8 disable={true} mainbg={Template24Bg} square={false} />
      ),
    },
    {
      type: "template8",
      mobileTemplate: (
        <Template7Mobile disable={true} mainbg={Template8BgMobile} square={false} />
      ),
      webTemplate: (
        <Template7 disable={true} mainbg={Template8Bg} square={false} />
      ),
    },
    {
      type: "template11",
      mobileTemplate: (
        <Template11Mobile
          disable={true}
          mainbg={Template12Bg}
          mainfg={"bg-[#C7E356Bc]"}
          star={"#324C2B"}
        />
      ),
      webTemplate: (
        <Template11
          disable={true}
          mainbg={Template12Bg}
          mainfg={"bg-[#C7E356Bc]"}
          star={"#324C2B"}
        />
      ),
    },
    {
      type: "template2",
      mobileTemplate: <Template3Mobile disable={true} />,
      webTemplate: <Template3 disable={true} />,
    },
    {
      type: "template9",
      mobileTemplate: (
        <Template7Mobile disable={true} mainbg={Template9BgMobile} blur={true} />
      ),
      webTemplate: (
        <Template7 disable={true} mainbg={Template9Bg} blur={true} />
      ),
    },
    {
      type: "template29",
      mobileTemplate: (
        <Template29Mobile
          disable={true}
          mainbg={Template29Bg}
          mainfg={"bg-[#141414E5]"}
        />
      ),
      webTemplate: (
        <Template29
          disable={true}
          mainbg={Template29Bg}
          mainfg={"bg-[#141414E5]"}
        />
      ),
    },
    {
      type: "template13",
      mobileTemplate: (
        <Template7Mobile disable={true} mainbg={Template14BgMobile} square={false} />
      ),
      webTemplate: (
        <Template7 disable={true} mainbg={Template14Bg} square={false} />
      ),
    },
    {
      type: "template14",
      mobileTemplate: (
        <Template7Mobile disable={true} mainbg={Template15BgMobile} square={false} />
      ),
      webTemplate: (
        <Template7 disable={true} mainbg={Template15Bg} square={false} />
      ),
    },
    {
      type: "template25",
      mobileTemplate: (
        <Template8Mobile disable={true} mainbg={Template26BgMobile} square={false} />
      ),
      webTemplate: (
        <Template8 disable={true} mainbg={Template26Bg} square={false} />
      ),
    },
    {
      type: "template6",
      mobileTemplate: <Template6Mobile disable={true} />,
      webTemplate: <Template6 disable={true} />,
    },
    {
      type: "template15",
      mobileTemplate: (
        <Template7Mobile disable={true} mainbg={Template16BgMobile} square={false} />
      ),
      webTemplate: (
        <Template7 disable={true} mainbg={Template16Bg} square={false} />
      ),
    },
    {
      type: "template27",
      mobileTemplate: (
        <Template8Mobile disable={true} mainbg={Template28BgMobile} square={false} />
      ),
      webTemplate: (
        <Template8 disable={true} mainbg={Template28Bg} square={false} />
      ),
    },
    {
      type: "template30",
      mobileTemplate: (
        <Template30Mobile
          disable={true}
          mainbg={Template30Bg}
          mainfg={"bg-[#ffffff]"}
        />
      ),
      webTemplate: (
        <Template30
          disable={true}
          mainbg={Template30Bg}
          mainfg={"bg-[#ffffff]"}
        />
      ),
    },
    {
      type: "template16",
      mobileTemplate: (
        <Template7Mobile disable={true} mainbg={Template17BgMobile} square={false} />
      ),
      webTemplate: (
        <Template7 disable={true} mainbg={Template17Bg} square={false} />
      ),
    },
    {
      type: "template24",
      mobileTemplate: (
        <Template8Mobile disable={true} mainbg={Template25BgMobile} square={false} />
      ),
      webTemplate: (
        <Template8 disable={true} mainbg={Template25Bg} square={false} />
      ),
    },

    {
      type: "template17",
      mobileTemplate: (
        <Template7Mobile disable={true} mainbg={Template18BgMobile} square={false} />
      ),
      webTemplate: (
        <Template7 disable={true} mainbg={Template18Bg} square={false} />
      ),
    },
    {
      type: "template18",
      mobileTemplate: (
        <Template7Mobile disable={true} mainbg={Template19BgMobile} square={false} />
      ),
      webTemplate: (
        <Template7 disable={true} mainbg={Template19Bg} square={false} />
      ),
    },

    {
      type: "template20",
      mobileTemplate: (
        <Template7Mobile disable={true} mainbg={Template21BgMobile} square={false} />
      ),
      webTemplate: (
        <Template7 disable={true} mainbg={Template21Bg} square={false} />
      ),
    },
    {
      type: "template21",
      mobileTemplate: (
        <Template7Mobile disable={true} mainbg={Template22BgMobile} square={false} />
      ),
      webTemplate: (
        <Template7 disable={true} mainbg={Template22Bg} square={false} />
      ),
    },
    {
      type: "template22",
      mobileTemplate: (
        <Template7Mobile disable={true} mainbg={Template23BgMobile} square={false} />
      ),
      webTemplate: (
        <Template7 disable={true} mainbg={Template23Bg} square={false} />
      ),
    },
  ];

  return (
    <div
      className="fixed z-[1000] h-[200px] w-[200px] overflow-hidden"
      style={{
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        minHeight: "100vh",
        minWidth: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#00000077",
        backdropFilter: "blur(5px)",
        overflow: "hidden",
      }}
    >
      <div className="w-full max-w-[90vw] h-[calc(100vh-100px)]  fixed flex flex-col justify-start items-center rounded-[7px] bg-[#fff] overflow-hidden">
        <div
          className="z-[1000] w-[90vw] h-[60px] flex flex-row justify-between items-center px-[24px] rounded-t-[6px] overflow-hidden"
          style={{ background: "white", borderBottom: "1px solid #DFDBD8" }}
        >
          <h1 className="font-semibold">Preview</h1>
          <div className="flex flex-row justify-center items-center gap-[4px]">
            <div
              className={`h-[40px] w-[40px] rounded-[10px] flex flex-row justify-center items-center hover:bg-[#F3F3F3] ${
                (deviceType === "mobile" || windowWidth < 840) && "bg-[#F3F3F3]"
              }`}
              onClick={() => setDeviceType("mobile")}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 4V20H17V4H7ZM6 2H18C18.2652 2 18.5196 2.10536 18.7071 2.29289C18.8946 2.48043 19 2.73478 19 3V21C19 21.2652 18.8946 21.5196 18.7071 21.7071C18.5196 21.8946 18.2652 22 18 22H6C5.73478 22 5.48043 21.8946 5.29289 21.7071C5.10536 21.5196 5 21.2652 5 21V3C5 2.73478 5.10536 2.48043 5.29289 2.29289C5.48043 2.10536 5.73478 2 6 2ZM12 17C12.2652 17 12.5196 17.1054 12.7071 17.2929C12.8946 17.4804 13 17.7348 13 18C13 18.2652 12.8946 18.5196 12.7071 18.7071C12.5196 18.8946 12.2652 19 12 19C11.7348 19 11.4804 18.8946 11.2929 18.7071C11.1054 18.5196 11 18.2652 11 18C11 17.7348 11.1054 17.4804 11.2929 17.2929C11.4804 17.1054 11.7348 17 12 17Z"
                  fill="#1A1A1A"
                />
              </svg>
            </div>

            {windowWidth >= 840 && (
              <div
                className={`h-[40px] w-[40px] rounded-[10px] flex flex-row justify-center items-center hover:bg-[#F3F3F3] ${
                  deviceType === "pc" && "bg-[#F3F3F3]"
                }`}
                onClick={() => setDeviceType("pc")}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.00004 16H20V5H4.00004V16ZM13 18V20H17V22H7.00004V20H11V18H2.99204C2.86073 17.9992 2.73086 17.9725 2.60988 17.9215C2.4889 17.8704 2.37919 17.7959 2.28703 17.7024C2.19488 17.6088 2.12209 17.498 2.07284 17.3763C2.02359 17.2546 1.99885 17.1243 2.00004 16.993V4.007C2.00004 3.451 2.45504 3 2.99204 3H21.008C21.556 3 22 3.449 22 4.007V16.993C22 17.549 21.545 18 21.008 18H13Z"
                    fill="#1A1A1A"
                  />
                </svg>
              </div>
            )}
          </div>

          <button
            className="w-[40px] h-[40px] rounded-full flex justify-center items-center bg-gray-100 hover:bg-gray-200 transition duration-300"
            onClick={() => props.setTemplatePreview(false)}
            style={{ zIndex: "999" }}
          >
            <HiOutlineX className="w-6 h-6 text-[#000000]" />
          </button>
          {props.changedTemplateName !== props.templateName && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 sm:hidden">
              <PrimaryButton2
                onClick={props.handleChangeTemplate}
                text="Change Template"
              />
            </div>
          )}
        </div>

        <div className="h-full w-full flex flex-col justify-start items-center  overflow-scroll rounded-b-[6px]">
          {deviceType === "pc" && windowWidth >= 840 && (
            <div className="relative max-w-[1080px] w-full h-full drop-shadow-[0_0_10px_#e4e9ec]">
              {templatesArray[props.templateIndex].webTemplate}
            </div>
          )}

          {(deviceType === "mobile" || windowWidth < 840) && (
            <div className="relative max-w-[400px] w-full drop-shadow-[0_0_10px_#e4e9ec]">
              {templatesArray[props.templateIndex]?.mobileTemplate}
            </div>
          )}
        </div>
      </div>
      {props.showToast && props.toastMessage != "" && (
        <div
          className="w-full flex justify-center items-center fixed bottom-10 left-0"
          style={{ zIndex: "999" }}
        >
          <Toast text={props.toastMessage} backgroundColor={"#121212"} />
        </div>
      )}
    </div>
  );
}
