import React, { useRef } from "react";
import LeftRightScrollBtn from "../../../Utils/LeftRightScrollBtn";
import { RiQuillPenLine, RiStarSLine } from "react-icons/ri";
import CustomButton from "../Button/CustomButton";
import { Rating } from "@mui/material";
import { useEffect } from "react";

const CustomReviews = (props) => {
  const scrollBtn = props.scrollBtn;
  const data = props.data;
  const reviewRef = useRef(null);
  const buttonStyle = props.buttonStyle;
  const style = props.style;

  useEffect(() => {
    
  }, [props.customBtn]);

  return (
    <div className="w-full">
      {props.heading}
      <div className="relative">
        <div className="overflow-scroll" ref={reviewRef}>
          <div className="flex flex-row gap-5">
            {data.map((item, index) => {
              return (
                <div className={`relative ${style.card}`} key={index}>
                  <div className="flex items-start gap-3">
                    <div className="conn_card_char">
                      {item.name.substring(0, 1)}
                      {item.name.substr(item.name.indexOf(" ") + 1, 1)}
                    </div>
                    <div className="flex flex-col h-9 relative top-[-2px]">
                      <p className={`${style.name}`}>{item.name}</p>
                      <div className="text-sm flex gap-[2px]">
                        <Rating
                          name="half-rating"
                          value={item.stars}
                          size="small"
                          precision={0.5}
                          readOnly={true}
                          style={{ color: style.starColor }}
                          emptyIcon={<RiStarSLine fill={style.starColor} />}
                        />
                      </div>
                    </div>
                  </div>
                  <p className={`${style.review}`}>{item.review}</p>
                  <div
                    className={`absolute top-[-2px] right-[-2px] rounded-bl-[16px]`}
                    style={{
                      background: props.templatebg,
                    }}
                  >
                    <div className="w-0 h-0 border-l-[40px] border-l-[#121212] border-t-[40px] border-t-transparent rounded-bl-[16px]" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <LeftRightScrollBtn
          refrence={reviewRef}
          scrollLength={600}
          style={scrollBtn.style}
          leftPosition={scrollBtn.leftPosition}
          rightPosition={scrollBtn.rightPosition}
        />
      </div>
      {props.reviewButtonSwitch && (
        <div className="mt-10 w-full h-[56px]">
          <CustomButton
            text="Write a review"
            icon={<RiQuillPenLine />}
            style={buttonStyle}
            customBtn={props.customBtn}
            onClick={props.onClick}
          />
        </div>
      )}
    </div>
  );
};

export default CustomReviews;
