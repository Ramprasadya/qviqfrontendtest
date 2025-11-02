import React, { useRef } from "react";
import LeftRightScrollBtn from "../../../Utils/LeftRightScrollBtn";
import { RiQuillPenLine, RiStarSLine } from "react-icons/ri";
import Button from "../Button/Button";
import { Rating } from "@mui/material";
import CustomButton from "../Button/CustomButton";

const Reviews = (props) => {
  const scrollBtn = props.scrollBtn;
  const data = props.data;
  const reviewRef = useRef(null);
  const buttonStyle = props.buttonStyle.concat(" min-w-[320px] mx-auto");
  const style = props.style;

  return (
    <>
      {props.length !== 0 && (
        <div className="w-full">
          {props.heading}
          <div className="relative">
            <div className="overflow-scroll" ref={reviewRef}>
              <div className="flex flex-row gap-5">
                {data.map((item, index) => {
                  return (
                    <div className={`${style.card}`} key={index}>
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
        </div>
      )}
      {props.reviewButtonSwitch && (
        <div className="mt-10 w-full h-[60px]">
          {props.type == "custom" ? (
            <CustomButton
              text="Write a review"
              icon={<RiQuillPenLine />}
              style={buttonStyle}
              customBtn={props.customBtn}
              onClick={props.onClick}
            />
          ) : (
            <Button
              text="Write a review"
              icon={<RiQuillPenLine />}
              style={buttonStyle}
              onClick={props.onClick}
            />
          )}
        </div>
      )}
      {
        props.googleReviewButtonSwitch && (
            <div className="mt-10 w-full h-[60px]">
               <Button
              text="Write a google review"
              icon={<RiQuillPenLine />}
              style={buttonStyle}
              onClick={()=>{props?.setgoogleReviewOpen(true)}}
            />
            </div>
        )
      }
    </>
  );
};

export default Reviews;
