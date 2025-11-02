import React, { useRef } from "react";
import LeftRightScrollBtn from "../../../Utils/LeftRightScrollBtn";
import { RiQuillPenLine, RiStarSLine } from "react-icons/ri";
import Button from "../Button/Button";
import { Rating } from "@mui/material";

const Reviews4 = (props) => {
  const scrollBtn = props.scrollBtn;
  const data = props.data;
  const reviewRef = useRef(null);
  const buttonStyle = props.buttonStyle;
  const style = props.style;

  return (
    <div className="w-full">
      {props.heading}
      <div className="relative">
        <div className="overflow-scroll" ref={reviewRef}>
          <div className="flex flex-row gap-5">
            {data.map((item, index) => {
              return (
                <div className={`relative ${style.card}`} style={{background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.64), transparent)'}} key={index}>
                  <div className="absolute z-[0] w-[98.4%] h-[98%] bg-[#272727] rounded-[16px]"></div>
                  <div className="flex items-start gap-3 z-[5] w-[100%]">
                    <div className="conn_card_char_4">
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
                  <p className={`${style.review} z-[5]`}>{item.review}</p>
                  <div
                    className={`absolute top-[-2px] right-[-2px] rounded-bl-[16px] z-[5]`}
                    style={{
                      background: props.templatebg,
                    }}
                  ></div>
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
        <div className="mt-10 w-full h-[60px]">
          <Button
            text="Write a review"
            icon={<RiQuillPenLine />}
            style={buttonStyle}
            onClick={props.onClick}
          />
        </div>
      )}
    </div>
  );
};

export default Reviews4;
