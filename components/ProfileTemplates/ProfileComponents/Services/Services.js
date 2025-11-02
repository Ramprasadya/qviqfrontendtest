import React, { useRef } from "react";
import LeftRightScrollBtn from "../../../Utils/LeftRightScrollBtn";
import CustomButton from "../Button/CustomButton";
import Button from "../Button/Button";
import axios from "axios";
import { serverUrl } from "@/config";

const Services = (props) => {
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

    // updating analytics app link count
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
          <div className="flex flex-row gap-5">
            {data.map((item, index) => {
              return (
                <div className={`${style.card}`} key={index}>
                  <img
                   onClick={() => {
                    updateAnalytics(item.serviceName)
                   props.setOpenServiceModal(true)
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
                    className={`${style.image} cursor-pointer `}
                  />
                  <h1 className={`${style.title}`}>{item.serviceName}</h1>
                  <h1 className={`${style.description}`}>
                    {/* {item.serviceDescription} */}
                    <span className="cursor-default">
                    {item.serviceDescription
                        ? item.serviceDescription.substring(0, 65)
                        : "No description available"}
                    </span>{" "}
                    <a
                      className={`underline font-bold cursor-pointer ${ item.serviceDescription && item.serviceDescription.length > 65 ? "" : "hidden" } `}
                      onClick={() => {
                        updateAnalytics(item.serviceName)
                        props.setOpenServiceModal(true)
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
          scrollLength={600}
          style={scrollBtn.style}
          leftPosition={scrollBtn.leftPosition}
          rightPosition={scrollBtn.rightPosition}
        />
      </div>
    </div>
  );
};

export default Services;
