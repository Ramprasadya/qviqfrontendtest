import React from "react";
import triangle from "../../images/triangle.png";

const BusinessHours4 = (props) => {
  const data = props.data;
  const style = props.style;
  const dayAbbreviations = {
    monday: "Mon",
    tuesday: "Tue",
    wednesday: "Wed",
    thursday: "Thu",
    friday: "Fri",
    saturday: "Sat",
    sunday: "Sun",
  };
  return (
    <div className={`flex flex-col justify-center items-center`}>
      <div className={`${style.div}`} style={{background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.64), transparent)'}}>

      <div className="absolute w-[98.7%] h-[97.7%] bg-[#272727] rounded-[18px]"></div>

        <h3 className={`${style.title} z-[5] w-[100%]`}>Business Hours</h3>
        {props.data[0].businessHours && (
          <div className="flex flex-col gap-2 z-[5] w-[100%]">
            {Object.keys(props.data[0].businessHours).map((day, index) => (
              <div
                key={index}
                className={`flex gap-1 items-center ${style.time}`}
              >
                <span className={`${style.point}`} />
                <h1>{dayAbbreviations[day]}</h1>
                <span>|</span>
                {props.data[0].businessHours[day].checked ? (
                  <span>
                    {props.data[0].businessHours[day].timer1} -{" "}
                    {props.data[0].businessHours[day].timer2}
                  </span>
                ) : (
                  <span>Closed</span>
                )}
              </div>
            ))}
          </div>
        )}
        <div
          className={`absolute top-[-2px] right-[-2px] rounded-bl-[16px] z-[5]`}
          style={{
            background: props.templatebg,
          }}
        >
        </div>
      </div>
    </div>
  );
};

export default BusinessHours4;
