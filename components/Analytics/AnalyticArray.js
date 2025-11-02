import React from "react";
import "./analytics.css";
import { RiVipCrownFill } from "react-icons/ri";

const AnalyticArray = (props) => {
  // array for analytics data
  const analyticsData = [
    {
      name: "Profile Views",
      color: "#78D5F2",
      count: props.profileviews,
    },
    {
      name: "Connections",
      color: "#FEBEF0",
      count: props.connection,
    },
    {
      name: "Profile Downloads",
      color: "#F2D078",
      count: props.profiledownloads,
    },
    // {
    //   name: "Device Taps",
    //   color: "#78F2B8",
    //   count: props.devicetaps,
    // },
  ];
  const basic = props.basic;

  return (
    <>
      {analyticsData.map((item, index) => (
        <div
          className={`analytics-card border-l-2 relative text-${
            (index === 1 || index === 2) && basic ? "[#A7A7A7]" : "[#1A1A1A]"
          }`}
          style={{ borderLeftColor: item.color }}
          key={index}
        >
          <div className="flex items-center gap-x-1.5">
            <div
              className=" rounded-full h-2 w-2"
              style={{ background: item.color }}
            ></div>
            <p className="text-sm md:text-base">{item.name}</p>
          </div>
          {/* condition for connections and profile downloads in basic plan  */}
          <p className="analytics-card-para pt-1">
            {(index === 1 || index === 2) && basic ? "-" : item.count}
          </p>

          {/* only for basic plan */}
          {(index === 1 || index === 2) && basic && (
            <span className="text-yellow-400 absolute top-2 right-2 text-2xl">
              <RiVipCrownFill />
            </span>
          )}
        </div>
      ))}
    </>
  );
};

export default AnalyticArray;
