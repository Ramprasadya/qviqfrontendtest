import React from "react";

const BusinessHours = (props) => {
  const style = props.style;
  const data = props.data;
  const position = props.position;
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
    <div
      className="flex flex-col gap-3 relative overflow-hidden"
      style={style.div}
    >
      <h1 style={style.title}>{props.heading}</h1>
      {props.data[0]?.businessHours && (
        <div className="flex flex-col">
          {Object.keys(props.data[0].businessHours).map((day, index) => (
            <div
              key={index}
              className="flex gap-1 items-center"
              style={style.time}
            >
              <span style={style.point} />
              <h1 style={{ fontFamily: style.time.fontFamily }}>
                {dayAbbreviations[day]}:
              </h1>
              <span>|</span>
              {props.data[0].businessHours[day].checked ? (
                <span style={{ fontFamily: style.time.fontFamily }}>
                  {props.data[0].businessHours[day].timer1} -{" "}
                  {props.data[0].businessHours[day].timer2}
                </span>
              ) : (
                <span style={{ fontFamily: style.time.fontFamily }}>
                  Closed
                </span>
              )}
            </div>
          ))}
        </div>
      )}
      {
        <>
          <span className="absolute top-0 right-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="70"
              height="84"
              viewBox="0 0 70 84"
              fill="none"
            >
              <path
                d="M52.5 -21L60.174 12.9732L89.6231 -5.62311L71.0268 23.826L105 31.5L71.0268 39.174L89.6231 68.6231L60.174 50.0268L52.5 84L44.826 50.0268L15.3769 68.6231L33.9732 39.174L0 31.5L33.9732 23.826L15.3769 -5.62311L44.826 12.9732L52.5 -21Z"
                fill={style.star.fill}
              />
            </svg>
          </span>
          <span className="absolute top-1/2 -translate-y-1/2 right-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="53"
              height="52"
              viewBox="0 0 53 52"
              fill="none"
            >
              <path
                d="M26.5 0L29.962 16.9883L43.5339 6.19982L35.266 21.4389L52.5974 21.8983L36.4683 28.2577L49.4497 39.75L33.0064 34.254L35.5635 51.4019L26.5 36.6221L17.4365 51.4019L19.9936 34.254L3.55033 39.75L16.5317 28.2577L0.402594 21.8983L17.734 21.4389L9.46613 6.19982L23.038 16.9883L26.5 0Z"
                fill={style.star.fill}
              />
            </svg>
          </span>
        </>
      }
    </div>
  );
};

export default BusinessHours;
