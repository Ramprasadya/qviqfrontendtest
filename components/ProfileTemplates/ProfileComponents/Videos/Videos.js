
import React, { useRef, useState } from "react";
import LeftRightScrollBtn from "../../../Utils/LeftRightScrollBtn";
import { HiPlay } from "react-icons/hi";
import { serverUrl } from "@/config";
import axios from "axios";

const Videos = (props) => {
  const videoRef = useRef(null);
  const { style, data, scrollBtn, heading, dummy } = props;
  const [playingIndex, setPlayingIndex] = useState(null);

  const handleVideoClick = async(index,label) => {
        if (props.templateId !== undefined && props.username !== undefined) {
            if (props.templateId !== '' && props.username !== '') {
                const ipResponse = await axios.get("https://ipapi.co/json/");
                const ipData = ipResponse.data;
                await axios.post(`${serverUrl}/analytics/${props.templateId}/${props.username}/${label}`,
                { 
                    profile: props.username,
                    country: ipData.country_name,
                    countryCode: ipData.country_code,
                    analyticsType:"video"
                });
            }
        }
    setPlayingIndex(index);
    console.log(label)
  };

  return (
    <div className="w-full">
      {heading}
      <div className="relative">
        <div className="overflow-scroll" ref={videoRef}>
          <div className="flex flex-row gap-5">
            {data.map((item, index) => {
              const youtubeLink = `https://www.youtube.com/embed/${item.userName}${playingIndex === index ? '?autoplay=1' : ''}`;
              return (
                <div className="w-[560px] flex flex-col gap-4" key={index}>
                  {dummy ? (
                    <div
                      className="w-[560px] h-[320px] bg-[#ffffffa4] flex justify-center items-center cursor-pointer"
                      style={{
                        ...style.card,
                        background: `url(${require("../../images/image1.jpg").default.src}) no-repeat`,
                        backgroundSize: "100% 100%",
                      }}
                    >
                      <div className="text-[72px] rounded-full bg-[rgba(255,255,255,0.30)]">
                        <HiPlay />
                      </div>
                    </div>
                  ) : (
                    <div
                      className="w-[560px] z-[0] h-[320px] bg-[#ffffffa4] relative"
                      style={style.card}
                    >
                      {playingIndex !== index && (
                        <div 
                          className="absolute top-0 left-0 w-full h-full z-[1] cursor-pointer"
                          onClick={() => handleVideoClick(index,item.label)}
                        >
                          {/* <div className="w-full h-full flex justify-center items-center">
                            <div className="text-[72px] rounded-full bg-[rgba(255,255,255,0.30)]">
                              <HiPlay />
                            </div>
                          </div> */}
                        </div>
                      )}
                      <iframe
                        src={youtubeLink}
                        title={item.title}
                        className="w-full h-full"
                        style={style.card}
                        allow="autoplay"
                      />
                    </div>
                  )}
                  <p style={style.title}>{item.label}</p>
                </div>
              );
            })}
          </div>
        </div>
        <LeftRightScrollBtn
          refrence={videoRef}
          scrollLength={600}
          style={scrollBtn.style}
          leftPosition={scrollBtn.leftPosition}
          rightPosition={scrollBtn.rightPosition}
        />
      </div>
    </div>
  );
};

export default Videos;
