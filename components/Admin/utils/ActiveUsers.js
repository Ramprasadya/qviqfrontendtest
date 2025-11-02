"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { serverUrl } from "../../../config";
import PrimaryButton from "../../UiComponents/PrimaryButton";
// import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
  } from "recharts";
  import LeftRightScrollBtn from "../../Utils/LeftRightScrollBtn";
import { getCookie } from "@/components/utils";

export default function ActiveUsers() {
    const [startDate,setStartDate] = useState(new Date().toISOString().split("T")[0]);
    const [endDate,setEndDate] = useState(new Date().toISOString().split("T")[0]);
    const [lineChartData,setLineChartData] = useState([]);
    const [interval,setInterval] = useState("daily");
    const LineChartRef = useRef(null);


    async function handleSubmit(){
        const config = {
            headers: {
              Authorization: "Bearer " + getCookie("jwt_token_admin"),
            },
          };
        let stDate = new Date(startDate.split('-')[0],startDate.split('-')[1]-1,startDate.split('-')[2],"00","00","00");
        let edDate = new Date(endDate.split('-')[0],endDate.split('-')[1]-1,endDate.split('-')[2],"23","59","00");
        const { data } = await axios.post(
        `${serverUrl}/analytics/getActiveUsers`,
        {
            startDate: stDate,
            endDate: edDate,
            interval: interval,
        },
        config,
        );
        transformDataForLineChart(data);
    }

    useEffect(()=>{
        handleSubmit();
    },[startDate,endDate,interval]);

    const dateformatter = (date) => {
        if (date === "Today") {
            return "Today";
        }
        if (date == undefined) return;
        return `${date}`;
    };

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
          return (
            <div
              className="p-2 rounded-lg bg-[#ffffff] w-[400px]"
              style={{ boxShadow: "0px 2px 8px rgba(171, 181, 217, 0.14)" }}
            >
              <p className="text-xs text-[#A7A7A7] font-medium mb-0.5">
                {dateformatter(label)}
              </p>
              <p className="flex justify-between mt-0.5 text-xs text-[#1A1A1A]">
                <span>Active Users</span>
                <span>{payload[0] !== undefined ? payload[0].value : "00"}</span>
              </p>
            </div>
          );
        }
    
        return null;
    };

    const customLegend = (props) => {
        const { payload } = props;
        return (
          <div className="flex flex-col md:flex-row gap-2 md:gap-8">
            {payload.map((entry, index) => (
              <div className="flex gap-2 items-center" key={index}>
                <span className="w-2 h-2 mt-[-1px]">
                  <svg width="10px" height="10px" style={{}}>
                    <circle
                      cx={4.5}
                      cy={4.5}
                      r={4}
                      stroke={entry.color}
                      fill={entry.color}
                    />
                  </svg>
                </span>
                <span className="text-xs text-[#1A1A1A]">{entry.value}</span>
              </div>
            ))}
          </div>
        );
    };

    const scrollButtonStyle = {
    padding: "8px",
    };
    const scrollBtnLeftPosition = {
    left: "8px",
    bottom: "35px",
    top: "auto",
    };
    const scrollBtnRightPosition = {
    right: "8px",
    bottom: "35px",
    top: "auto",
    };

    

    const transformDataForLineChart = async (viewsData) => {
        let tempViewData = [];
        let stDate = new Date(startDate.split('-')[0],startDate.split('-')[1]-1,startDate.split('-')[2],"00","00","00");
        let edDate = new Date(endDate.split('-')[0],endDate.split('-')[1]-1,endDate.split('-')[2],"23","59","00");
        let newIpList = [];
        viewsData.forEach((element)=> newIpList.push(element.ip));
        for (
            let date = stDate;
            date <= edDate;
            date.setDate(date.getDate() + 1)
        ){
            let formattedDate = `${
                (date.getDate() < 10 ? "0" : "") + date.getDate()
                }-${
                (date.getMonth() + 1 < 10 ? "0" : "") + (date.getMonth() + 1)
                }-${date.getFullYear()}`;
            if(interval == "daily"){
                formattedDate = `${date.getDate()} ${date.toLocaleString("default", { month: "short" })} ${date.getFullYear()}`;
            }
            else if(interval == "monthly"){
                formattedDate = `${date.toLocaleString("default", { month: "short" })} ${date.getFullYear()}`;
            }
            else{
                formattedDate =  `${date.getFullYear()}`;
            }
            let result = {
                date:formattedDate,
                userCount:0,
            };
            
            if(interval == "daily") result.userCount = viewsData.filter(element => (element._id.year == date.getFullYear() && element._id.month == date.getMonth()+1 && element._id.dayofmonth == date.getDate())).length;
            else if(interval == "monthly") result.userCount = viewsData.filter(element => (element._id.year == date.getFullYear() && element._id.month == date.getMonth()+1)).length;
            else result.userCount = viewsData.filter(element => (element._id.year == date.getFullYear())).length;

            if(tempViewData.length==0 || tempViewData[tempViewData.length-1].date != result.date){
                tempViewData.push({
                    ...result
                });
            }
        }
        setLineChartData(tempViewData);
    };

    const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    setScreenWidth(window.innerWidth);
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div
          className="py-4 md:py-5 rounded-lg relative  "
          style={{
            boxShadow: "0px 2px 16px 1px rgba(171, 181, 217, 0.16)",
          }}
        >
          <div className="flex flex-col w-full m-auto items-center gap-4 ">
        <div className="flex w-full items-center p-3">
          <h2 className="flex-grow text-base md:text-lg font-semibold">
            Active Users {" "}
          </h2>
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-center">
              <input
              name="startDate"
              className="m-auto p-[1px] hover:p-0 hover:border hover:border-black text-center"
              placeholder="Pick Start Date"
              value={startDate}
              type="date"
              onChange={(e) => {setStartDate(e.target.value)}}
              />
              <p className="text-base font-semibold px-3">to</p>
              <input
              name="endDate"
              className="m-auto p-[1px] hover:p-0 hover:border hover:border-black text-center"
              placeholder="Pick End Date"
              value={endDate}
              max={new Date().toISOString().split('T')[0]}
              type="date"
              onChange={(e) => {setEndDate(e.target.value)}}
              />
            </div>
            <div className="flex m-auto items-center justify-center ">
              <label for="interval" className="m-3">Select Interval:</label>
              <select
              name="interval"
              className="m-auto py-1 text-center rounded-lg border border-black"
              value={interval}
              onChange={(e) => setInterval(e.target.value)}>
              
              <option value={"daily"}>Daily</option>
              <option value={"monthly"}>Monthly</option>
              <option value={"yearly"}>Yearly</option>
              </select>
            </div>
          </div>
        </div>
      </div>
        <div
          className="max-w-full py-6 overflow-scroll"
          style={{ paddingInline: "0" }}
          ref = {LineChartRef}
        >
          <LineChart
            width={
              screenWidth >= 1280
                ? screenWidth - 100
                : screenWidth >= 768
                ? screenWidth
                : 600
            }
            height={300}
            data={lineChartData}
          >
            <CartesianGrid strokeDasharray="3" vertical={false} />
            <XAxis
              dataKey="date"
              padding={{ left: 30, right: 30 }}
              stroke="0"
              tickFormatter={dateformatter}
              fontSize={12}
            />
            <YAxis stroke="0" fontSize={12} />
            <Tooltip content={CustomTooltip} />
            <Legend
              iconType="circle"
              iconSize={10}
              wrapperStyle={{
                padding: "0 0 0 4rem",
                marginBottom: "-1rem",
              }}
              align="left"
              content={customLegend}
            />
            <Line
              type="monotone"
              name="Active User Count"
              dataKey="userCount"
              stroke="#78F2B8"
              activeDot={{ r: 8 }}
              dot={0}
              strokeWidth={2}
              />
            {/* <Line
              type="monotone"
              name="Refresh Count"
              dataKey="refreshCount"
              stroke="#B56EEC"
              dot={0}
              strokeWidth={2}
              /> */}
          </LineChart>
          </div>
          <LeftRightScrollBtn
          refrence={LineChartRef}
          style={scrollButtonStyle}
          leftPosition={scrollBtnLeftPosition}
          rightPosition={scrollBtnRightPosition}
          />
      </div>
    </>
  );
}
