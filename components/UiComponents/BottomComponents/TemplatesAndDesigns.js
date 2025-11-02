import React, { useContext, useEffect, useState } from "react";
import PrimaryButton from "../PrimaryButton";
import Switch from "react-switch";
import axios from "axios";
import { serverUrl } from "../../../config";
import { HiOutlineBolt } from "react-icons/hi2";
import "./TemplatesAndDesigns.css";
import { UserContext } from "../../Contexts/context";
import Template2Mobile from "../../ProfileTemplates/Template2Mobile/Template2Mobile";
import Template3Mobile from "../../ProfileTemplates/Template3Mobile/Template3Mobile";
import Template4Mobile from "../../ProfileTemplates/Template4Mobile/Template4Mobile";
import Template5Mobile from "../../ProfileTemplates/Template5Mobile/Template5Mobile";
import Template6Mobile from "../../ProfileTemplates/Template6Mobile/Template6Mobile";
import Template7Mobile from "../../ProfileTemplates/Template7Mobile/Template7Mobile";
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
} from "../../ProfileTemplates/TempateBg/MobileTemplateBg";

import Toast from "../Toast";
import Template11Mobile from "../../ProfileTemplates/Template11Mobile/Template11Mobile";
import CustomizeTemplate from "./CustomizeTemplate";
import Template29Mobile from "../../ProfileTemplates/Template29Mobile/Template29Mobile";
import Template30Mobile from "../../ProfileTemplates/Template30Mobile/Template30Mobile";
import Template8Mobile from "../../ProfileTemplates/Template8Mobile/Template8Mobile";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getCookie } from "@/components/utils";

function TemplatesAndDesigns(props) {
  const navigate = useRouter();

  const [ptab, setPTab] = useState("Themes");
  // const [template, setTemplate] = useState(props.templateName);

  const [logoToggle, setLogoToggle] = useState(false);
  const { userType, username } = useContext(UserContext);

  const handleToggle = async (value) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getCookie("jwt_token"),
      },
    };
    try {
      await axios.post(
        `${serverUrl}/profile/updateLogoSwitch/${props.type}/${props.profile}`,
        { logoSwitch: value },
        config
      );
      setLogoToggle(value);
      props.updateTemplateDataHandler();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (props.switchStates.length > 0)
      setLogoToggle(props.switchStates[0].logoSwitch);
  }, [props.switchStates]);
  // update changed template name onclick
  useEffect(() => {
    props.setChangedTemplateName(props.template);
  }, [props.template]);

  const templatesArray = [
    {
      type: "template1",
      template: <Template2Mobile disable={true} />,
      thumbnail: require("../../ProfileTemplates/images/thumbnail/temp (1).png")
        .default.src,
    },
    {
      type: "template2",
      template: <Template7Mobile disable={true} blur={true} />,
      thumbnail:
        require("../../ProfileTemplates/images/thumbnail/temp (17).png").default
          .src,
    },
    {
      type: "template3",
      template: (
        <Template8Mobile disable={true} mainbg={Template27Bg} square={false} />
      ),
      thumbnail:
        require("../../ProfileTemplates/images/thumbnail/temp (15).png").default
          .src,
    },
    {
      type: "template4",
      template: (
        <Template11Mobile
          disable={true}
          mainbg={Template11Bg}
          mainfg={`bg-[#F5775BBc]`}
        />
      ),
      thumbnail: require("../../ProfileTemplates/images/thumbnail/temp (6).png")
        .default.src,
    },
    {
      type: "template5",
      template: (
        <Template7Mobile disable={true} mainbg={Template10Bg} square={false} />
      ),
      thumbnail:
        require("../../ProfileTemplates/images/thumbnail/temp (16).png").default
          .src,
    },
    {
      type: "template6",
      template: <Template4Mobile disable={true} />,
      thumbnail: require("../../ProfileTemplates/images/thumbnail/temp (3).png")
        .default.src,
    },
    {
      type: "template7",
      template: (
        <Template11Mobile
          disable={true}
          mainbg={Template13Bg}
          mainfg={`bg-[#B284EEBc]`}
        />
      ),
      thumbnail: require("../../ProfileTemplates/images/thumbnail/temp (8).png")
        .default.src,
    },
    {
      type: "template8",
      template: (
        <Template7Mobile disable={true} mainbg={Template20Bg} square={false} />
      ),
      thumbnail:
        require("../../ProfileTemplates/images/thumbnail/temp (19).png").default
          .src,
    },
    {
      type: "template9",
      template: <Template5Mobile disable={true} />,
      thumbnail: require("../../ProfileTemplates/images/thumbnail/temp (4).png")
        .default.src,
    },

    {
      type: "template10",
      template: (
        <Template8Mobile disable={true} mainbg={Template24Bg} square={false} />
      ),
      thumbnail:
        require("../../ProfileTemplates/images/thumbnail/temp (11).png").default
          .src,
    },
    {
      type: "template11",
      template: (
        <Template7Mobile disable={true} mainbg={Template8Bg} square={false} />
      ),
      thumbnail:
        require("../../ProfileTemplates/images/thumbnail/temp (18).png").default
          .src,
    },
    {
      type: "template12",
      template: (
        <Template11Mobile
          disable={true}
          mainbg={Template12Bg}
          mainfg={"bg-[#C7E356Bc]"}
        />
      ),
      thumbnail: require("../../ProfileTemplates/images/thumbnail/temp (7).png")
        .default.src,
    },
    {
      type: "template13",
      template: <Template3Mobile disable={true} />,
      thumbnail: require("../../ProfileTemplates/images/thumbnail/temp (2).png")
        .default.src,
    },
    {
      type: "template14",
      template: (
        <Template7Mobile disable={true} mainbg={Template9Bg} blur={true} />
      ),
      thumbnail:
        require("../../ProfileTemplates/images/thumbnail/temp (29).png").default
          .src,
    },
    {
      type: "template15",
      template: (
        <Template29Mobile
          disable={true}
          mainbg={Template29Bg}
          mainfg={"bg-[#141414E5]"}
        />
      ),
      thumbnail: require("../../ProfileTemplates/images/thumbnail/temp (9).png")
        .default.src,
    },
    {
      type: "template16",
      template: (
        <Template7Mobile disable={true} mainbg={Template14Bg} square={false} />
      ),
      thumbnail:
        require("../../ProfileTemplates/images/thumbnail/temp (20).png").default
          .src,
    },
    {
      type: "template17",
      template: (
        <Template7Mobile disable={true} mainbg={Template15Bg} square={false} />
      ),
      thumbnail:
        require("../../ProfileTemplates/images/thumbnail/temp (22).png").default
          .src,
    },
    {
      type: "template18",
      template: (
        <Template8Mobile disable={true} mainbg={Template26Bg} square={false} />
      ),
      thumbnail:
        require("../../ProfileTemplates/images/thumbnail/temp (12).png").default
          .src,
    },
    {
      type: "template19",
      template: <Template6Mobile disable={true} />,
      thumbnail: require("../../ProfileTemplates/images/thumbnail/temp (5).png")
        .default.src,
    },
    {
      type: "template20",
      template: (
        <Template7Mobile disable={true} mainbg={Template16Bg} square={false} />
      ),
      thumbnail:
        require("../../ProfileTemplates/images/thumbnail/temp (24).png").default
          .src,
    },
    {
      type: "template21",
      template: (
        <Template8Mobile disable={true} mainbg={Template28Bg} square={false} />
      ),
      thumbnail:
        require("../../ProfileTemplates/images/thumbnail/temp (13).png").default
          .src,
    },
    {
      type: "template22",
      template: (
        <Template30Mobile
          disable={true}
          mainbg={Template30Bg}
          mainfg={"bg-[#ffffff]"}
        />
      ),
      thumbnail:
        require("../../ProfileTemplates/images/thumbnail/temp (10).png").default
          .src,
    },
    {
      type: "template23",
      template: (
        <Template7Mobile disable={true} mainbg={Template17Bg} square={false} />
      ),
      thumbnail:
        require("../../ProfileTemplates/images/thumbnail/temp (26).png").default
          .src,
    },
    {
      type: "template24",
      template: (
        <Template8Mobile disable={true} mainbg={Template25Bg} square={false} />
      ),
      thumbnail:
        require("../../ProfileTemplates/images/thumbnail/temp (14).png").default
          .src,
    },

    {
      type: "template25",
      template: (
        <Template7Mobile disable={true} mainbg={Template18Bg} square={false} />
      ),
      thumbnail:
        require("../../ProfileTemplates/images/thumbnail/temp (21).png").default
          .src,
    },
    {
      type: "template26",
      template: (
        <Template7Mobile disable={true} mainbg={Template19Bg} square={false} />
      ),
      thumbnail:
        require("../../ProfileTemplates/images/thumbnail/temp (23).png").default
          .src,
    },

    {
      type: "template27",
      template: (
        <Template7Mobile disable={true} mainbg={Template21Bg} square={false} />
      ),
      thumbnail:
        require("../../ProfileTemplates/images/thumbnail/temp (25).png").default
          .src,
    },
    {
      type: "template28",
      template: (
        <Template7Mobile disable={true} mainbg={Template22Bg} square={false} />
      ),
      thumbnail:
        require("../../ProfileTemplates/images/thumbnail/temp (27).png").default
          .src,
    },
    {
      type: "template29",
      template: (
        <Template7Mobile disable={true} mainbg={Template23Bg} square={false} />
      ),
      thumbnail:
        require("../../ProfileTemplates/images/thumbnail/temp (28).png").default
          .src,
    },
  ];

  return (
    <div
      className={
        props.current === "Templates and Designs" ||
        props.current === "Templates"
          ? "bottom-container"
          : "hidden"
      }
    >
      <div className="  left p-3 xsm:p-5 md:p-6 pb-[50px]">
        <div className="flex items-center gap-3">
          <p className="text-lg xsm:text-xl sm:text-[24px] leading-[32px] font-semibold min-w-fit">
            Templates & Designs
          </p>
        </div>
        <div className="flex max-[380px]:flex-col items-center mt-6 p-2 min-[380px]:p-1 rounded-xl min-[380px]:rounded-full productBackground text-center text-sm font-medium sm:text-base">
          <p
            onClick={() => {
              setPTab("Themes");
              props.setChangeTab("Themes");
            }}
            className={`
              ${
                ptab === "Themes" ? "bg-white" : ""
              } p-2 rounded-lg min-[380px]:rounded-full w-full min-[380px]:w-1/2 text-center`}
          >
            Themes
          </p>
          <p
            onClick={() => {
              setPTab("Custom Appearance");
              props.setChangeTab("Custom Appearance");
            }}
            className={`
              ${
                ptab === "Custom Appearance" ? "bg-white" : ""
              } p-2 rounded-lg min-[380px]:rounded-full w-full min-[380px]:w-1/2 text-center`}
          >
            Custom Appearance
          </p>
        </div>
        {ptab === "Themes" ? (
          <>
            <p className="text-base sm:text-[18px] leading-6 font-semibold min-w-fit mt-[32px] mb-[16px]">
              Themes
            </p>

            {/* template tags */}

            {/* <div>

            </div> */}

            <p className=" text-sm text-cGrey font-medium">
              Select a template for your Qviq-site and customize it.
            </p>

            <div className="h-fit w-[100%] max-w-[1440px] mt-[36px] md:mt-[40px] mb-32 z-0 flex flex-wrap justify-center items-center gap-x-[26px] gap-y-[40px] sm:gap-x-[40px] sm:gap-y-[50px]">
              {templatesArray.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col justify-center items-center relative group transition-opacity-[300ms]"
                  style={{ transition: "300ms" }}
                >
                  {/* Clickable template cards */}
                  <button
                    onClick={() => props.setTemplate(item.type)}
                    className="relative w-[132px] custom2:w-[152px] sm:w-[240px] custom:w-[270px] 
          h-[325px] custom2:h-[374px] sm:h-[590px] custom:h-[665px]
          overflow-hidden rounded-[18px] sm:rounded-[26px] flex flex-col justify-start items-center
          hover:scale-[101%] hover:shadow-lg"
                    style={{
                      outline:
                        props.template === item.type
                          ? "3px solid rgba(26,26,26,0.6)"
                          : "1px solid #E8E8E8",
                      background:
                        props.template === item.type
                          ? "rgba(26,26,26,0.6)"
                          : "#E8E8E8",
                      transition: "300ms",
                    }}
                  >
                    <Image
                      priority={true}
                      className="w-full m-0"
                      src={item.thumbnail}
                      width={270}
                      height={664}
                      quality={50}
                      alt="template image"
                    />

                    {/* Conditional rendering of "View Template" button */}
                    <div
                      className="absolute bottom-[5%] z-[2] px-[18px] sm:px-[20px] custom2:px-[18px] custom:px-[24px] 
                       py-[6px] sm:py-[8px] custom2:py-[6px] custom:py-[10px] border-[2px] border-black rounded-[64px] 
                       bg-white font-semibold text-[10px] sm:text-[12px] custom2:text-[12px] custom:text-[14px] 
                       opacity-0 group-hover:opacity-100 hover:shadow-lg transition-opacity-[300ms]"
                      onClick={() => {
                        props.setTemplatePreview(true);
                        props.setTemplateIndex(index);
                      }}
                      style={{
                        border: "2px solid #817C7C",
                        transition: "300ms",
                      }}
                    >
                      View Template {index + 1}
                    </div>

                    <div
                      className="absolute top-0 right-0 w-full h-full m-0 opacity-0 group-hover:opacity-100 transition-opacity-[300ms]"
                      style={{
                        background:
                          "linear-gradient(to top, #00000066 0%, transparent 50%)",
                        transition: "300ms",
                      }}
                    ></div>
                  </button>
                </div>
              ))}
            </div>
          </>
        ) : (
          <CustomizeTemplate
            dataButtonStyle={props.dataButtonStyle}
            dataButtonColor={props.dataButtonColor}
            dataFontColor={props.dataFontColor}
            dataColor1={props.dataColor1}
            dataColor2={props.dataColor2}
            dataBgImage={props.dataBgImage}
            dataBackgroundColor={props.dataBackgroundColor}
            buttonStyle={props.buttonStyle}
            setButtonStyle={props.setButtonStyle}
            template={props.template}
            setTemplate={props.setTemplate}
            backgroundColor={props.backgroundColor}
            setBackgroundColor={props.setBackgroundColor}
            buttonColor={props.buttonColor}
            setButtonColor={props.setButtonColor}
            fontColor={props.fontColor}
            setFontColor={props.setFontColor}
            color1={props.color1}
            setColor1={props.setColor1}
            color2={props.color2}
            setColor2={props.setColor2}
            bgImage={props.bgImage}
            setBgImage={props.setBgImage}
            appIconBg={props.appIconBg}
            setAppIconBg={props.setAppIconBg}
            appIconColor={props.appIconColor}
            setAppIconColor={props.setAppIconColor}
            customTextColor={props.customTextColor}
            setCustomTextColor={props.setCustomTextColor}
            customButtontextColor={props.customButtontextColor}
            setCustomButtonTextColor={props.setCustomButtonTextColor}
            showToast={props.showToast}
            setShowToast={props.setShowToast}
            toastMessage={props.toastMessage}
            setToastMessage={props.setToastMessage}
            updateTemplateName={props.updateTemplateName}
            type={props.type}
          />
        )}
        {userType !== "Pro" ? (
          <div className="flex flex-col sm:flex-row sm:justify-between p-[16px] mb-[50px] mt-[64px] items-center bg-[#FAFAFA] rounded-lg">
            <div>
              <p className="mb-[20px] text-sm text-center  text-black font-medium">
                Upgrade your profile to hide the Qviq logo
              </p>
              <img
                className="h-10 m-auto sm:m-0 wcenter sm:self-start"
                src={
                  require("../../Images/Tapop Final Logo Concept 1 1.png")
                    .default.src
                }
              />
            </div>
            <PrimaryButton
              icon={<HiOutlineBolt />}
              text="Upgrade"
              onClick={() => navigate.push(`/plan/${username}`)}
            />
          </div>
        ) : (
          <>
            <div className="flex  flex-row sm:justify-between p-[16px] mb-[50px] mt-[10px] items-center bg-[#FAFAFA] rounded-lg">
              <div>
                <p className="mb-[20px] text-black text-[14px] font-medium leading-[22px]">
                  Hide Qviq branding from my profile
                </p>
                <p className="text-[12px] leading-[18px] font-normal text-gray-500">
                  Activating this will remove Qviq branding component from your
                  profile.
                </p>
              </div>
              <Switch
                checked={logoToggle}
                onChange={(value) => {
                  handleToggle(value);
                }}
                onColor="#12A26E"
                offColor="#A7A7A7"
                checkedIcon={false}
                uncheckedIcon={false}
                height={24}
                width={44}
              />
            </div>
          </>
        )}
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

export default TemplatesAndDesigns;
