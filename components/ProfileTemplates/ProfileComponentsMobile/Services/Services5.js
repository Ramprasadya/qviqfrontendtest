import React, { useRef } from "react";
import LeftRightScrollBtn from "../../../Utils/LeftRightScrollBtn";
import Button from "../Button/Button";
import CustomButton from "../Button/CustomButton";
import axios from "axios";
import { serverUrl } from "@/config";

const Services5 = (props) => {
  const serviceRef = useRef(null);
  const data = props.data;
  const scrollBtn = props.scrollBtn;
  const style = props.style;

  const handleOnClick = (link, name, customLink) => {
    if (customLink) {
      window.open(customLink, "_blank");
    } else if (link) {
      const message = `Hello! I'm intrested in your ${name} product displayed on qviq`;

      const encodedMessage = encodeURIComponent(message);
      const whatsappLink = `https://api.whatsapp.com/send?phone=${link}&text=${encodedMessage}`;
      window.open(whatsappLink, "_blank");
    }
  };

  const updateAnalytics = async (ServiceName) => {
    if (props.templateId !== undefined && props.username !== undefined) {
      if (props.templateId !== "" && props.username !== "") {
        const ipResponse = await axios.get("https://ipapi.co/json/");
        const ipData = ipResponse.data;
        await axios.post(
          `${serverUrl}/analytics/${props.templateId}/${props.username}/${ServiceName}`,
          {
            profile: props.username,
            country: ipData.country_name,
            countryCode: ipData.country_code,
            analyticsType:"service"
          }
        );
      }
    }
  };

  return (
    <div className="w-full">
      {props.heading}
      <div className="relative">
        <div className="overflow-scroll" ref={serviceRef}>
          <div
            style={{
              display: "grid",
              gridTemplateRows: "auto auto",
              gridAutoFlow: "column",
              gap: "1rem",
              paddingTop: "10px",
              paddingBottom: "10px",
            }}
          >
            {data.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`${style.card}`}
                  style={{
                    borderTop: " 4px solid rgba(3, 60, 206, 0.50)",
                    background: "#FFF",
                    boxShadow:
                      "0px 8px 16px 1px rgba(3, 60, 206, 0.04), 0px 0px 8px 1px rgba(3, 60, 206, 0.08)",
                  }}
                >
                  {/* <div className="absolute bg-[#272727] z-[0] min-w-[216px] max-w-[216px] min-h-[216px] max-h-full p-4 rounded-[16px]"></div> */}

                  <div className="z-[5] w-[100%]">
                    <img
                      onClick={() => {
                        updateAnalytics(item.serviceName)
                        props.setOpenServiceModal(true);
                        props.setOpenedService({
                          name: item.serviceName,
                          description: item.serviceDescription,
                          price: item.productPrice,
                          btn: item.serviceButton,
                          btnType: "custom",
                          btnLabel: item.label,
                          btnStyle: "card-btn rounded-full",
                          customLink: item.customLink,
                          link: item.link,
                          id: item._id,
                        });
                        typeof item.image == "string"
                          ? props.setServiceImgArr(item.image.split(" "))
                          : props.setServiceImgArr(item.image);
                      }}
                      src={item.image}
                      alt="service image"
                      loading="lazy"
                      className={`${style.image}`}
                    />
                  </div>
                  <h1 className={`${style.title} z-[5] w-[100%]`}>
                    {item.serviceName}
                  </h1>
                  <h1 className={`${style.description} z-[5] w-[100%]`}>
                    <span className="cursor-default">
                      {item.serviceDescription
                        ? item.serviceDescription.substring(0, 65)
                        : "No description available"}
                    </span>{" "}
                    <a
                      className={`underline font-bold cursor-pointer ${
                        item.serviceDescription &&
                        item.serviceDescription.length > 65
                          ? ""
                          : "hidden"
                      } `}
                      onClick={() => {
                        updateAnalytics(item.serviceName)
                        props.setOpenServiceModal(true);
                        props.setOpenedService({
                          name: item.serviceName,
                          description: item.serviceDescription,
                          price: item.productPrice,
                          btn: item.serviceButton,
                          btnType: "custom",
                          btnLabel: item.label,
                          btnStyle: "card-btn rounded-full",
                          customLink: item.customLink,
                          link: item.link,
                          id: item._id,
                        });
                        typeof item.image == "string"
                          ? props.setServiceImgArr(item.image.split(" "))
                          : props.setServiceImgArr(item.image);
                      }}
                    >
                      Read More..
                    </a>
                  </h1>
                  <div
                    className={`${item.serviceButton ? "visible" : "hidden"}`}
                  >
                    {props.type == "custom" ? (
                      <CustomButton
                        text={item.label}
                        style={props.buttonStyle}
                        customBtn={props.customBtn}
                        onClick={() => {
                          handleOnClick(
                            item.link,
                            item.serviceName,
                            item.customLink
                          );
                        }}
                      />
                    ) : (
                      <Button
                        text={item.label}
                        style={props.buttonStyle}
                        onClick={() => {
                          handleOnClick(
                            item.link,
                            item.serviceName,
                            item.customLink
                          );
                        }}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <LeftRightScrollBtn
          refrence={serviceRef}
          scrollLength={300}
          style={scrollBtn.style}
          leftPosition={scrollBtn.leftPosition}
          rightPosition={scrollBtn.rightPosition}
        />
      </div>
    </div>
  );
};

export default Services5;
