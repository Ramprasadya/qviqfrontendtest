import React from "react";
import triangle from "../../images/triangle.png";

const BusinessHours3 = (props) => {
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
      <div className={`${style.div}`}>
        <h3 className={`${style.title}`}>Business Hours</h3>
        {props.data[0].businessHours && (
          <div className="flex flex-col">
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
          className={`absolute top-[-2px] right-[-2px] rounded-bl-[16px]`}
          style={{
            background: props.templatebg,
          }}
        >
          <div className="w-0 h-0 border-l-[40px] border-l-[#121212] border-t-[40px] border-t-transparent rounded-bl-[16px]" />
        </div>
      </div>
    </div>
  );
};

export default BusinessHours3;
