import React, { useRef, useState } from "react";
import FilePreview from "../FilePreview/FilePreview";
import { RiArrowRightLine, RiFileLine } from "react-icons/ri";
import { serverUrl } from "@/config";
import axios from "axios";


const Resources2 = (props) => {
  const data = props.data;
  const [preview, setPreview] = useState(false);
  const [pdf, setPdf] = useState("");
  const style = props.style;

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
    <div className="w-full">
      <div className="relative">
        <div className={`${style.div}`}>
          {data.map((item, index) => {
            return (
              <div
                className={`${style.card}`}
                style={{
                  boxShadow:
                    "0px 8px 16px 1px rgba(3, 60, 206, 0.04), 0px 0px 8px 1px rgba(3, 60, 206, 0.08)",
                }}
                index={index}
                title={item.pdfname}
                onClick={() => {
                  !props.dummy && setPdf(item.docs);
                  !props.dummy && setPreview(true);
                  !props.dummy && updateAnalytics(item._id);
                }}
                key={index}
              >
                <div className="flex gap-3 justify-between w-full">
                  <div className="flex items-center gap-2">
                    <span className={`${style.icon}`}>
                      <img
                        className="w-8 h-8 rounded-sm "
                        src={require(`../../../Logos/FileFormatLogos/${item.pdfname
                          .split(".")
                          .pop()}.png`).default.src}
                        alt=""
                      />
                    </span>
                    <p className={`${style.title}`}>
                      {limitWord(item.pdfname, style.wordlimit)}
                    </p>
                  </div>
                  <span className={`${style.arrow}`}>
                    <RiArrowRightLine />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {preview && (
        <FilePreview
          pdf={pdf}
          onClick={() => {
            setPreview(false);
          }}
        />
      )}
    </div>
  );
};

export default Resources2;
