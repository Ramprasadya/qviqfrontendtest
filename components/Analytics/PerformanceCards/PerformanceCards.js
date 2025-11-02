import React from "react";
import TrendingBtn from "./TrendingBtn";
import { HiOutlineTrendingUp } from "react-icons/hi";
import "./PerformanceCards";
function useDefaultProps(props){
  let newProps = {...props};
  Object.keys(newProps).forEach(key => newProps[key] === undefined ? delete newProps[key] : {});
  return {...defaultProps,...newProps};
}
function PerformanceCards(props) {
  props = useDefaultProps(props);
  return (
    <div className="performance-card p-6">
      <h1 className="performance-card-para">{props.performance} performance</h1>
      <div className="flex items-center pt-3 gap-x-5">
        <TrendingBtn
          color={props.color}
          icon={props.icon}
          iconColor={props.iconColor}
        />
        <div>
          <h2 className="text-sm sm:text-base">{props.text}</h2>
          <div className="flex flex-col [@media(min-width:500px)]:flex-row [@media(min-width:500px)]:items-center gap-x-2">
            <p className="performance-card-para2">{props.visits} visits</p>
          </div>
        </div>
      </div>
    </div>
  );
}
const defaultProps = {
  icon: <HiOutlineTrendingUp />,
  performance: "Highest",
  text: "Instagram",
  percent: "+20",
  visits: "100 ",
  color: "#E0FBF1",
  iconColor: "#12A26E",
};

export default PerformanceCards;
