import React, { useCallback, useEffect } from "react";
import "./AppointConfirm.css";
import PrimaryButton2 from "@/components/UiComponents/PrimaryButton2";

import { RiUserLine } from "react-icons/ri";
import { FiCalendar } from "react-icons/fi";
import { LuClock3 } from "react-icons/lu";
import { RiContactsBook2Line } from "react-icons/ri";
import { FiMail } from "react-icons/fi";

function useDefaultProps(props) {
  let newProps = { ...props };
  Object.keys(newProps).forEach((key) =>
    newProps[key] === undefined ? delete newProps[key] : {}
  );
  return { ...defaultProps, ...newProps };
}
function AppointConfirm(props) {
  props = useDefaultProps(props);
  //console.log(props);
  const handleEscape = useCallback((event) => {
    if (event.key === "Escape") {
      props.onClick();
    }
  }, []);

  const timeRange = props.time;
  const [startTime, startPeriod, endTime, endPeriod] = timeRange.split(" ");
  const formattedTimeRange = `${startTime} ${startPeriod} - ${endTime} ${endPeriod}`;

  useEffect(() => {
    document.addEventListener("keydown", handleEscape, false);

    return () => {
      document.removeEventListener("keydown", handleEscape, false);
    };
  }, [handleEscape]);

  function formatTimeRange(timeRange) {
    const times = timeRange.trim().split(/\s{2,}/);
    return times.join(' - ');
  }

  const style = {
    maxWidth: props.width,
    height: props.height,
  };

  useEffect(() => {
    props.setAppointmentOpen(false);
  }, []);

  return (
    <div
      id="myModal"
      className="modal bg-[#00000054] backdrop-blur-[20px]"
      style={{ display: `${props.onModal ? "flex" : "none"}`, zIndex: "1000" }}
    >
      <div className="modal-content Plus-Jakarta-Sans-font-div " style={style}>
        {/* to close modal  */}

        <div className=" flex items-center justify-between px-5 md:px-6 pt-6 pb-2">
          <div className="absolute md:w-[146px] md:h-[146px] w-[100px] h-[100px] border-[2px] border-white rounded-full bg-[#12A26E] top-[50%] left-[50%] translate-x-[-50%] md:translate-y-[-230%] translate-y-[-285%]">
            <div className="leftTik"></div>
            <div className="rightTik"></div>
          </div>

          <p className="md:text-[28px] text-[15px] text-[#1A1A1A] tracking-normal font-[500] text-center w-full mt-[30px] md:mt-[70px]">
            {props.text}
          </p>
        </div>

        <div className="flex flex-col justify-center items-center gap-[22px] md:gap-[28px] pb-[50px] md:pb-[30px] modal-child-div">
          {/* {props.children} */}
          <p className="w-full text-center text-[12px] md:text-[16px] text-[#6C6C6C] leading-[16px] md:leading-[24.8px] px-[55px] md:px-[75px] pb-[20px] border-dashed border-[#adadad] border-b-[2px]">
            You will receive a confirmation on your email address once{" "}
            {props.userName} confirms it.
          </p>

          <div className="flex flex-col justify-center items-center gap-[20px] h-[248px] w-full rounded-[10px] md:px-[50px] px-[25px]">
            <div className="flex flex-col justify-center items-center gap-[15px] md:gap-[20px] bg-[#F3F3F3] h-fit md:h-[248px] w-full rounded-[10px] p-[16px] text-[14px] md:text-[18px]">
              <div className="flex flex-row justify-start items-center gap-[15px] w-full h-[25px]">
                <RiUserLine className="text-[20px] md:text-[25px]" />
                <p className="">{props.name}</p>
              </div>
              <div className="flex flex-row justify-start items-center gap-[15px] w-full h-[25px]">
                <FiCalendar className="text-[20px] md:text-[25px]" />
                <p className="">{props.date}</p>
              </div>
              <div className="flex flex-row justify-start items-center gap-[15px] w-full h-[25px]">
                <LuClock3 className="text-[20px] md:text-[25px]" />
                <p className="">{formatTimeRange(props.time)}</p>
                {/* {console.log(formattedTimeRange)} */}
              </div>
              {/* <div className="flex flex-row justify-start items-center gap-[15px] w-full h-[25px]">
              <RiContactsBook2Line className="text-[20px] md:text-[25px]" />
              <p className="">{props.phone}</p>
              </div> */}
              <div className="flex flex-row justify-start items-center gap-[15px] w-full h-[25px]">
                <FiMail className="text-[20px] md:text-[25px]" />
                <p className="">{props.email}</p>
              </div>
            </div>

            <PrimaryButton2
              text="Done"
              onClick={() => props.onClick((prev) => !prev)}
              width="100%"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
const defaultProps = {
  maxWidth: "640px",
  height: "fit-content",
  text: "Your Appointment Is Scheduled",
};
export default AppointConfirm;
