import React, { useState } from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import AppItem3 from "./AppItem3";

const Apps5 = (props) => {
  const data = props.data;
  const position = props.position;

  let appCount = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i].header == "app") {
      appCount++;
    }
  }

  const customWebsiteAvailable = data.length - appCount > 0 ? true : false;

  const moreAppsAvailable =
    appCount > (position.width > 330 ? props.noOfApps : props.noOfApps - 2)
      ? true
      : false;
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
          moreAppsAvailable && "mb-10"
        } ${style.background}`}
      >
        <div
          className={`flex flex-wrap justify-center gap-4 max-w-[920px] ${style.div}`}
        >
          {(moreAppsAvailable
            ? data.slice(
                0,
                position.width > 330 ? props.noOfApps : props.noOfApps - 2
              )
            : data
          ).map((app, index) => {
            return (
              app.header == "app" && (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center"
                >
                  <div
                    className="absolute w-[96px] h-[96px] rounded-[20px] backdrop-blur-[5px]"
                    style={{
                      background:
                        "linear-gradient(67deg, #033CCE 7.14%, #2A5CDE 28.86%, #769BFC 90.57%)",
                    }}
                  ></div>
                  <AppItem3
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
            data
              .slice(position.width > 330 ? props.noOfApps : props.noOfApps - 2)
              .map((app, index) => {
                return (
                  app.header == "app" && (
                    <div
                      key={index}
                      className="flex flex-col items-center justify-center"
                    >
                      <div
                        className="absolute w-[96px] h-[96px] rounded-[20px] backdrop-blur-[5px]"
                        style={{
                          background:
                            "linear-gradient(67deg, #033CCE 7.14%, #2A5CDE 28.86%, #769BFC 90.57%)",
                        }}
                      ></div>
                      <AppItem3
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

export default Apps5;
