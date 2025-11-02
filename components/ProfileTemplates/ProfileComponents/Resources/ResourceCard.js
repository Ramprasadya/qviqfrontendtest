import { serverUrl } from "@/config";
import axios from "axios";
import React, { useState } from "react";
import { RiFileDownloadLine } from "react-icons/ri";


const ResourceCard = (props) => {
  const [isHover, setIsHover] = useState(false);
  const style = props.style;
  const item = props.item;

  // limit the word size
  const limitWord = (word, limit) => {
    if (word != null && word != undefined && word != "") {
      if (word.length > limit) {
        return word.slice(0, limit) + "...";
      } else {
        return word;
      }
    }
  };

    // updating analytics app link count
    const updateAnalytics = async (pdfname) => {
      if (props.templateId !== undefined && props.username !== undefined) {
        if (props.templateId !== "" && props.username !== "") {
          const ipResponse = await axios.get("https://ipapi.co/json/");
          const ipData = ipResponse.data;
          await axios.post(
            `${serverUrl}/analytics/${props.templateId}/${props.username}/${pdfname}`,
            {
              profile: props.username,
              country: ipData.country_name,
              countryCode: ipData.country_code,
              analyticsType:"pdf"
            }
          );
        }
      }
    };

  return (
    <div
      className={`${style.card} ${style.fontFamily}-font-div`}
      title={item.pdfname}
      style={isHover ? style.hover.card : null}
      onMouseEnter={() => {
        setIsHover(true);
      }}
      onMouseLeave={() => {
        setIsHover(false);
      }}
      onClick={()=>{
        !props.dummy && props.setPdf(item.docs);
        !props.dummy && props.setPreview(true);
        updateAnalytics(item._id);
      }}
    >
      <div className="flex flex-col gap-3 tex items-center">
        <span
          className={`${style.icon}`}
          style={isHover ? style.hover.icon : null}
        >
          <img
            className="w-8 h-8 rounded-sm "
            src={require(`../../../Logos/FileFormatLogos/${item.pdfname
              .split(".")
              .pop()}.png`).default.src}
            alt=""
          />
        </span>
        <p
          className={`${style.title}`}
          style={isHover ? style.hover.title : null}
        >
          {limitWord(item.pdfname, 25)}
        </p>
      </div>
    </div>
  );
};

export default ResourceCard;
