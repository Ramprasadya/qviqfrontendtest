import React, { useState } from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import CustomAppItem1 from "./CustomAppItem1";

const CustomApps1 = (props) => {
  const data = props.data;
  let appCount = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i].header == "app") {
      appCount++;
    }
  }

  const moreAppsAvailable = appCount > 12 ? true : false;
  const [showMoreApps, setShowMoreApps] = useState(false);
  const style = props.style;

  const getImgUrl = (item) => {
    if (item !== undefined) {
      if (!item.startsWith("http://") && !item.startsWith("https://")) {
        item = "https://" + item;
      }
      let url = `https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${item}&size=256`;
      return url;
    }
  };

  return (
    <>
      <div
        className={`w-full flex justify-center relative ${
          moreAppsAvailable && "mb-14"
        }`}
      >
        <div
          className={`flex flex-wrap justify-center gap-[2rem] max-w-[920px] ${style.div}`}
        >
          {(moreAppsAvailable ? data.slice(0, 12) : data).map((app, index) => {
            return (
              app.header == "app" && (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center"
                >
                  <div
                    className="absolute w-[140px] h-[140px] rounded-[32px] backdrop-blur-[5px]"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(255, 255, 255, 0.64), transparent)",
                    }}
                  ></div>
                  <CustomAppItem1
                    app={app}
                    style={style}
                    dummy={props.dummy}
                    templateId={props.templateId}
                    username={props.username}
                    fromRedirect={props.fromRedirect}
                  />
                </div>
              )
            );
          })}
          {showMoreApps &&
            data.slice(12).map((app, index) => {
              return (
                app.header == "app" && (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center"
                  >
                    <div
                      className="absolute w-[140px] h-[140px] rounded-[32px] backdrop-blur-[5px]"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(255, 255, 255, 0.64), transparent)",
                      }}
                    ></div>
                    <CustomAppItem1
                      app={app}
                      style={style}
                      dummy={props.dummy}
                      templateId={props.templateId}
                      username={props.username}
                      fromRedirect={props.fromRedirect}
                    />
                  </div>
                )
              );
            })}
        </div>
        {moreAppsAvailable && (
          <>
            {showMoreApps ? (
              <div
                className={`bg-white flex justify-center items-center rounded-full hover:cursor-pointer active:scale-95 duration-150 ${style.arrow}`}
                onClick={() => {
                  setShowMoreApps(false);
                }}
              >
                <HiChevronUp />
              </div>
            ) : (
              <div
                className={`bg-white flex justify-center items-center rounded-full hover:cursor-pointer active:scale-95 duration-150 ${style.arrow}`}
                onClick={() => setShowMoreApps(true)}
              >
                <HiChevronDown />
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default CustomApps1;
