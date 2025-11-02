import React, { useContext, useState } from "react";
import axios from "axios";
import { serverUrl } from "../../../../config";
import { UserContext } from "../../../Contexts/context";

const CustomAppItem1 = (props) => {
  const style = props.style;
  const app = props.app;
  const [isHover, setIsHover] = useState(false);
  const { copyToClipboard } = useContext(UserContext);

  // updating analytics app link count
  const updateAnalytics = async () => {
    if (props.templateId !== undefined && props.username !== undefined) {
      if (props.templateId !== "" && props.username !== "") {
        const ipResponse = await axios.get("https://ipapi.co/json/");
                const ipData = ipResponse.data;
                await axios.post(`${serverUrl}/analytics/${props.templateId}/${props.username}/${app.label}`,
                { 
                    profile: props.username,
                    country: ipData.country_name,
                    countryCode: ipData.country_code,
                });
      }
    }
  };

  // gives favicon url
  const getImgUrl = (item) => {
    if (item !== undefined) {
      if (!item.startsWith("http://") && !item.startsWith("https://")) {
        item = "https://" + item;
      }
      let url = `https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${item}&size=256`;
      return url;
    }
  };

  // handle link click
  const handleLinkClick = () => {
    if (!props.dummy) {
      if (props.fromRedirect !== undefined && props.fromRedirect === true) {
        updateAnalytics();
      }
      if (app.isCopy !== undefined && app.isCopy === true) {
        copyToClipboard(app.link + app.userName);
      } else {
        window.open(app.link + app.userName, "_blank");
      }
    }
  };

  return (
    <>
      {app.header === "app" && (
        <div
          className={`${style.app} ${app.anistatus && app.animation} ${
            props.dummy ? "!cursor-default" : "!cursor-pointer"
          }`}
          style={{background: `${style.background}`}}
          title={((!props.dummy && app.link + app.userName) || "")}
          onClick={handleLinkClick}
          onMouseEnter={() => {
            setIsHover(true);
          }}
          onMouseLeave={() => {
            setIsHover(false);
          }}
        >
          {app.platform !== "Website" ? (
            <img
              src={require(`../../../Logos/TemplateLogos/${
                style.hoverIconType === undefined
                  ? style.iconType
                  : isHover
                  ? style.hoverIconType
                  : style.iconType
              }/${app.platform.toLowerCase().split(" ").join("")}.svg`).default.src}
              className="w-[50px] h-[50px] object-contain"
            />
          ) : (
            <img
              src={getImgUrl(app.userName)}
              className="w-[50px] h-[50px] object-contain"
            />
          )}
        </div>
      ) 
      // : (
      //   <div
      //     className={`${style.app} ${
      //       props.dummy ? "!cursor-default" : "!cursor-pointer"
      //     }`}
      //     title={!props.dummy && app.websiteUrl}
      //     onClick={() => {
      //       !props.dummy && window.open(app.websiteUrl, "_blank");
      //     }}
      //     onMouseEnter={() => {
      //       setIsHover(true);
      //     }}
      //     onMouseLeave={() => {
      //       setIsHover(false);
      //     }}
      //   >
      //     <img
      //       src={getImgUrl(app.websiteUrl)}
      //       className="w-7 h-7 object-contain"
      //     />
      //   </div>
      // )
      }
    </>
  );
};

export default CustomAppItem1;
