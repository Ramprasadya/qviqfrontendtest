import React from "react";

const BusinessHours = (props) => {
  const style = props.style;
  const data = props.data;
  // const businessHours = data[0].businessHours;
  
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
      className="flex flex-col gap-5 relative overflow-hidden"
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
      <div className="absolute top-14 left-[55%] -translate-x-1/2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="91"
          height="89"
          viewBox="0 0 91 89"
          fill="none"
        >
          <path
            d="M45.5 0L51.4441 29.1687L74.7468 10.645L60.551 36.8103L90.3088 37.599L62.6154 48.5179L84.9042 68.25L56.6713 58.8134L61.0619 88.256L45.5 62.8795L29.9381 88.256L34.3287 58.8134L6.09584 68.25L28.3846 48.5179L0.691246 37.599L30.449 36.8103L16.2532 10.645L39.5559 29.1687L45.5 0Z"
            fill={style.star.fill}
          />
        </svg>
      </div>
      <div className="absolute top-0 right-[3%]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="179"
          height="147"
          viewBox="0 0 179 147"
          fill="none"
        >
          <path
            d="M89.5 -32L102.582 25.9163L152.786 -5.78606L121.084 44.4176L179 57.5L121.084 70.5824L152.786 120.786L102.582 89.0837L89.5 147L76.4176 89.0837L26.2139 120.786L57.9163 70.5824L0 57.5L57.9163 44.4176L26.2139 -5.78606L76.4176 25.9163L89.5 -32Z"
            fill={style.star.fill}
          />
        </svg>
      </div>
      <div className="absolute bottom-6 right-[10%]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="91"
          height="89"
          viewBox="0 0 91 89"
          fill="none"
        >
          <path
            d="M45.5 0L51.4441 29.1687L74.7468 10.645L60.551 36.8103L90.3088 37.599L62.6154 48.5179L84.9042 68.25L56.6713 58.8134L61.0619 88.256L45.5 62.8795L29.9381 88.256L34.3287 58.8134L6.09584 68.25L28.3846 48.5179L0.691246 37.599L30.449 36.8103L16.2532 10.645L39.5559 29.1687L45.5 0Z"
            fill={style.star.fill}
          />
        </svg>
      </div>
    </div>
  );
};

export default BusinessHours;
