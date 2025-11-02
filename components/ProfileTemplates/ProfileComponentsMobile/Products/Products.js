import React, { useRef } from "react";
import LeftRightScrollBtn from "../../../Utils/LeftRightScrollBtn";
import Button from "../Button/Button";
import CustomButton from "../Button/CustomButton";

const Products = (props) => {
  const productRef = useRef(null);
  const data = props.data;
  const scrollBtn = props.scrollBtn;
  const style = props.style;
  const handleOnClick = (link, name) => {
    if (link) {
      const whatsappLink = `https://api.whatsapp.com/send?phone=${link}&text=${encodeURIComponent(
        name
      )}`;
      window.open(whatsappLink, "_blank");
    }
  };
  return (
    <div className="w-full">
      {props.heading}
      <div className="relative">
        <div className="overflow-scroll" ref={productRef}>
          <div className="flex flex-row gap-4">
            {data.map((item, index) => {
              return (
                <div className={`${style.card}`} key={index}>
                  <img
                    src={item.image}
                    alt="product image"
                    loading="lazy"
                    className={`${style.image} object-contain`}
                  />
                  <h1 className={`${style.title}`}>{item.productName}</h1>
                  <h1 className={`${style.description}`}>
                    {item.productDescription}
                  </h1>
                  <h1 className={`${style.price}`}>₹ {item.productPrice}</h1>
                  <div
                    className={`${
                      item.productButton ? "visible" : "hidden"
                    } h-[60px]`}
                  >
                    {props.type == 'custom' ? (
                      <CustomButton
                        text={item.label}
                        style={props.buttonStyle}
                        customBtn={props.customBtn}
                        onClick={() =>
                          handleOnClick(item.link, item.productName)
                        }
                      />
                    ) : (
                      <Button
                        text={item.label}
                        style={props.buttonStyle}
                        onClick={() =>
                          handleOnClick(item.link, item.productName)
                        }
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <LeftRightScrollBtn
          refrence={productRef}
          scrollLength={300}
          style={scrollBtn.style}
          leftPosition={scrollBtn.leftPosition}
          rightPosition={scrollBtn.rightPosition}
        />
      </div>
    </div>
  );
};

export default Products;
