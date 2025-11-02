import React, { useRef } from "react";
import LeftRightScrollBtn from "../../../Utils/LeftRightScrollBtn";
import Button from "../Button/Button";
import axios from "axios";
import { serverUrl } from "@/config";

const Products5 = (props) => {
  const productRef = useRef(null);
  const data = props.data;
  const scrollBtn = props.scrollBtn;
  const style = props.style;
  const handleOnClick = (link, name) => {
    if (link) {
      const message = `Hello! I'm intrested in your ${name} product displayed on qviq`;

      const encodedMessage = encodeURIComponent(message);
      const whatsappLink = `https://api.whatsapp.com/send?phone=${link}&text=${encodedMessage}`;
      window.open(whatsappLink, "_blank");
    }
  };

  const updateAnalytics = async (productName) => {
    if (props.templateId !== undefined && props.username !== undefined) {
      if (props.templateId !== "" && props.username !== "") {
        const ipResponse = await axios.get("https://ipapi.co/json/");
        const ipData = ipResponse.data;
        await axios.post(
          `${serverUrl}/analytics/${props.templateId}/${props.username}/${productName}`,
          {
            profile: props.username,
            country: ipData.country_name,
            countryCode: ipData.country_code,
            analyticsType : "product"
          }
        );
      }
    }
  };

  return (
    <div className="w-full">
      {props.heading}
      <div className="relative">
        <div className="overflow-scroll py-[15px]" ref={productRef}>
          <div className="flex flex-row gap-5">
            {data.map((item, index) => {
              return (
                <div
                  className={`${style.card}`}
                  style={{
                    boxShadow: "8px 8px 8px 1px rgba(3, 60, 206, 0.06)",
                  }}
                  key={index}
                >
                  <img
                    onClick={() => {
                      updateAnalytics(item.productName);
                      props.setOpenProductModal(true);
                      props.setOpenedProduct({
                        name: item.productName,
                        description: item.productDescription,
                        price: item.productPrice,
                        btn: item.productButton,
                        btnType: props.type,
                        btnLabel: item.label,
                        btnStyle: props.buttonStyle,
                        customBtn: props.customBtn,
                        link: item.link,
                      });
                      typeof item.image == "string"
                        ? props.setProductImgArr(item.image.split(" "))
                        : props.setProductImgArr(item.image);
                    }}
                    src={item.image}
                    alt="product image"
                    loading="lazy"
                    className={`${style.image} object-contain`}
                  />
                  <h1 className={`${style.title}`}>{item.productName}</h1>
                  <h1 className={`${style.description}`}>
                    {/* {item.productDescription} */}
                    <span className="cursor-default">
                      {item.productDescription
                        ? item.productDescription.substring(0, 65)
                        : "No description available"}
                    </span>{" "}
                    <a
                      onClick={() => {
                        updateAnalytics(item.productName);
                        props.setOpenProductModal(true);
                        props.setOpenedProduct({
                          name: item.productName,
                          description: item.productDescription,
                          price: item.productPrice,
                          btn: item.productButton,
                          btnType: props.type,
                          btnLabel: item.label,
                          btnStyle: props.buttonStyle,
                          customBtn: props.customBtn,
                          link: item.link,
                        });
                        typeof item.image == "string"
                          ? props.setProductImgArr(item.image.split(" "))
                          : props.setProductImgArr(item.image);
                      }}
                      className={`underline font-bold cursor-pointer ${
                       item.productDescription && item.productDescription.length > 65 ? "" : "hidden"
                      } `}
                    >
                      Read More..
                    </a>
                  </h1>
                  <h1 className={`${style.price}`}>₹ {item.productPrice}</h1>
                  <div
                    className={`${
                      item.productButton ? "visible" : "hidden"
                    } h-[60px]`}
                  >
                    <Button
                      type="baseTemp5"
                      text={item.label}
                      style={props.buttonStyle}
                      onClick={() => handleOnClick(item.link, item.productName)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <LeftRightScrollBtn
          refrence={productRef}
          scrollLength={600}
          style={scrollBtn.style}
          leftPosition={scrollBtn.leftPosition}
          rightPosition={scrollBtn.rightPosition}
        />
      </div>
    </div>
  );
};

export default Products5;
