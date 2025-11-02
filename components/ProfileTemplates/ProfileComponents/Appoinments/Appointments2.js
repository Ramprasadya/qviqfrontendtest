import React, { useState, useEffect, useRef } from "react";
import { HiCheck } from "react-icons/hi";
import InputField from "../../../UiComponents/InputField";
import TextFieldArea from "../../../UiComponents/InputFIeldTextArea";
import Button from "../Button/Button";
import { serverUrl } from "../../../../config";
import axios from "axios";
import LeftRightScrollBtn from "../../../Utils/LeftRightScrollBtn";
import CustomButton from "../Button/CustomButton";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Appointments2 = (props) => {
  const style = props.style;
  const data = props.data;
  const label = props.label;
  const interval =
    data && data.length > 0 && data[0].slotInterval ? data[0].slotInterval : 30;
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeIndex2, setActiveIndex2] = useState(null);
  const [slots, setSlots] = useState({});
  const arrRef = useRef(null);
  const dateRef = useRef(null);

  const leftPosition = {
    left: "-12px",
    top: "50%",
    transform: "translateY(-50%)",
  };

  const rightPosition = {
    right: "-3px",
    top: "50%",
    transform: "translateY(-50%)",
  };

  const handleSubmit = () => {
    const curSlot = dateArr[activeIndex2].slots;
    const date = new Date(
      selectedMonth.getMonth() +
        1 +
        "/" +
        dateArr[activeIndex2].date +
        "/" +
        selectedMonth.getFullYear() +
        " " +
        curSlot[activeIndex]
    );

    const day = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    fetch(`${serverUrl}/meeting/addMeeting/${props.type}/${props.profile}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mettingHeadline: "Meeting",
        title: label,
        message: message,
        day: day[date.getDay()],
        date: date.toDateString().split(" ").slice(1).join(" "),
        timeFrom: curSlot[activeIndex],
        timeTo: new Date(date.getTime() + interval * 60000).toLocaleString(
          "en-US",
          { hour: "numeric", minute: "numeric", hour12: true }
        ),
        time: curSlot[activeIndex],
        name: fullname,
        email: email,
        phone: "",
        pending: true,
        confirmation: false,
        cancel: false,
        userEmail: props.email,
        start:date,
        end:new Date(date.getTime() + interval * 60000),
      }),
    }).then((res) => {
      props.setAppointName(fullname);
      props.setAppointDate(date.toDateString().split(" ").slice(1).join(" "));
      props.setAppointTime(
        curSlot[activeIndex] +
          " " +
          new Date(date.getTime() + interval * 60000).toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })
      );
      props.setAppointPhone();
      props.setAppointEmail(props.email);
      props.setAppointToastMsg(true);

      setActiveIndex2(null);
      setActiveIndex(null);
      setFullname("");
      setEmail("");
      setMessage("");

      let msg = "Appointment scheduled!";

      if (res.status === 400) {
        props.setToastMessage("Slot Not Available");
        props.setShowToast(true);
      }

      setTimeout(() => {
        props.setShowToast(false);
        props.setToastMessage("");
      }, 3000);
    });
  };

  const months = [
    "JAN",
    "FAB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  const currentDate = new Date();
  const currentMonth = months[currentDate.getMonth()];

  const divideSlots = (data) => {
    let monday =
      data.monday && data.monday.checked ? [] : data.monday.component;
    let tuesday =
      data.tuesday && data.tuesday.checked ? [] : data.tuesday.component;
    let wednesday =
      data.wednesday && data.wednesday.checked ? [] : data.wednesday.component;
    let thursday =
      data.thursday && data.thursday.checked ? [] : data.thursday.component;
    let friday =
      data.friday && data.friday.checked ? [] : data.friday.component;
    let saturday =
      data.saturday && data.saturday.checked ? [] : data.saturday.component;
    let sunday =
      data.sunday && data.sunday.checked ? [] : data.sunday.component;

    let monSet = [];
    let tueSet = [];
    let wedSet = [];
    let thursSet = [];
    let friSet = [];
    let saturSet = [];
    let sunSet = [];

    monday.forEach((element) => {
      let curdate = new Date("1/1/2000 " + element.from);
      let enddate = new Date("1/1/2000 " + element.to);
      while (curdate.getTime() < enddate.getTime()) {
        monSet.push(
          curdate.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })
        );
        curdate = new Date(curdate.getTime() + interval * 60000);
      }
    });
    tuesday.forEach((element) => {
      let curdate = new Date("1/1/2000 " + element.from);
      let enddate = new Date("1/1/2000 " + element.to);
      while (curdate.getTime() < enddate.getTime()) {
        tueSet.push(
          curdate.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })
        );
        curdate = new Date(curdate.getTime() + interval * 60000);
      }
    });
    wednesday.forEach((element) => {
      let curdate = new Date("1/1/2000 " + element.from);
      let enddate = new Date("1/1/2000 " + element.to);
      while (curdate.getTime() < enddate.getTime()) {
        wedSet.push(
          curdate.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })
        );
        curdate = new Date(curdate.getTime() + interval * 60000);
      }
    });
    thursday.forEach((element) => {
      let curdate = new Date("1/1/2000 " + element.from);
      let enddate = new Date("1/1/2000 " + element.to);
      while (curdate.getTime() < enddate.getTime()) {
        thursSet.push(
          curdate.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })
        );
        curdate = new Date(curdate.getTime() + interval * 60000);
      }
    });
    friday.forEach((element) => {
      let curdate = new Date("1/1/2000 " + element.from);
      let enddate = new Date("1/1/2000 " + element.to);
      while (curdate.getTime() < enddate.getTime()) {
        friSet.push(
          curdate.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })
        );
        curdate = new Date(curdate.getTime() + interval * 60000);
      }
    });
    saturday.forEach((element) => {
      let curdate = new Date("1/1/2000 " + element.from);
      let enddate = new Date("1/1/2000 " + element.to);
      while (curdate.getTime() < enddate.getTime()) {
        saturSet.push(
          curdate.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })
        );
        curdate = new Date(curdate.getTime() + interval * 60000);
      }
    });
    sunday.forEach((element) => {
      let curdate = new Date("1/1/2000 " + element.from);
      let enddate = new Date("1/1/2000 " + element.to);
      while (curdate.getTime() < enddate.getTime()) {
        sunSet.push(
          curdate.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })
        );
        curdate = new Date(curdate.getTime() + interval * 60000);
      }
    });

    monSet = [...new Set(monSet)];
    tueSet = [...new Set(tueSet)];
    wedSet = [...new Set(wedSet)];
    thursSet = [...new Set(thursSet)];
    friSet = [...new Set(friSet)];
    saturSet = [...new Set(saturSet)];
    sunSet = [...new Set(sunSet)];

    let obj = {
      monday: monSet,
      tuesday: tueSet,
      wednesday: wedSet,
      thursday: thursSet,
      friday: friSet,
      saturday: saturSet,
      sunday: sunSet,
    };
    setSlots(obj);
    return obj;
  };

  const [appointArr, setAppointArr] = useState([]);

  useEffect(() => {
    if (data && data[0]) {
      // addDates(divideSlots(data[0]));
      divideSlots(data[0]);
    }
  }, [data]);

  const getSlots = (day) => {
    if (day === "Mon") return slots.monday;
    if (day == "Tue") return slots.tuesday;
    if (day == "Wed") return slots.wednesday;
    if (day == "Thu") return slots.thursday;
    if (day == "Fri") return slots.friday;
    if (day == "Sat") return slots.saturday;
    if (day == "Sun") return slots.sunday;
  };

  // ---------------
  const leftPos = {
    left: "2px",
    top: "50%",
    transform: "translateY(-50%)",
  };
  const rightPos = {
    right: "2px",
    top: "50%",
    transform: "translateY(-50%)",
  };

  // -----

  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [dateArr, setDateArr] = useState([]);

  const [date, setDate] = useState(new Date().toISOString().slice(0, 7));
  // Calculate initial minDate and maxDate
  const initialMinDate = new Date().toISOString().slice(0, 7);
  const initialMaxDate = calculateMaxDate(initialMinDate);

  const [minDate, setMinDate] = useState(initialMinDate);
  const [maxDate, setMaxDate] = useState(initialMaxDate);

  // Function to calculate maxDate based on minDate
  function calculateMaxDate(minDate) {
    const minDateObj = new Date(minDate);
    const maxDateObj = new Date(minDateObj);
    maxDateObj.setMonth(minDateObj.getMonth() + 2);
    return maxDateObj.toISOString().slice(0, 7);
  }

  // Update maxDate when minDate changes
  useEffect(() => {
    const newMaxDate = calculateMaxDate(minDate);
    setMaxDate(newMaxDate);
  }, [minDate]);

  const handleMonthChange = (date) => {
    // const selectedDate = new Date(event.target.value);
    setSelectedMonth(date);
    setActiveIndex2(null);
  };

  const getDaysInMonth = (year, month) => {
    // month is zero-based
    return new Date(year, month + 1, 0).getDate();
  };

  const filterApp = async () => {
    try {
      const res = await axios.get(
        `${serverUrl}/meeting/getmeet/${props.type}/${props.profile}`
      );
      const data = res.data
        ? res.data.filter(
            (item) => item.pending === true || item.confirmation === true
          )
        : [];
      setAppointArr(
        data.map((obj) => {
          return {
            fullDate: obj.date,
            day: obj.day,
            time: obj.time,
            pending: obj.pending,
            confirmation: obj.confirmation,
            cancel: obj.cancel,
          };
        })
      );
    } catch (error) {
      //console.log(error);
      return [];
    }
  };

  useEffect(()=>{
    filterApp();
  },[]);

  useEffect(() => {
    const generateDatesArray = () => {
      const year = selectedMonth.getFullYear();
      const month = selectedMonth.getMonth();
      const numberOfDays = getDaysInMonth(year, month);

      const datesArray = Array.from({ length: numberOfDays }, (_, index) => {
        const day = index + 2;
        const date1 = new Date(year, month, day);
        const date2 = new Date(year, month, day - 1);

        function isDateSmallerThanToday(date) {
          date = parseInt(date);
          var today = new Date();
          var todayDate = today.getDate();
          return date < todayDate;
        }

        return {
          fullDate:
            `${selectedMonth}`.slice(4, 8) +
            date1.toISOString().slice(8, 10) +
            `${selectedMonth}`.slice(10, 15),
          disabled:
            selectedMonth.toISOString().slice(0, 7) ==
              new Date().toISOString().slice(0, 7) &&
            isDateSmallerThanToday(date1.toISOString().slice(8, 10))
              ? true
              : false,
          date: date1.toISOString().slice(8, 10),
          day: date2.toLocaleString("en-US", { weekday: "short" }),
          slots: getSlots(date2.toLocaleString("en-US", { weekday: "short" })),
        };
      });
      return datesArray;
    };

    setDateArr(generateDatesArray());

    // //console.log(dateArr[activeIndex2]);
  }, [selectedMonth, slots, activeIndex2]);

  const [timeArr, setTimeArr] = useState();
  function checkTime(params) {
    const data = appointArr
      ? appointArr.filter((item) => item.fullDate === params.fullDate)
      : [];

    setTimeArr(data);
    // //console.log(data);
    // //console.log(appointArr);
    // //console.log(params);
  }

  // -----

  return (
    <div className={`flex flex-col items-center  ${style.div}`}>
      <h4 className={`mb-3 ${style.heading}`}>Book a one-on-one call</h4>

      {/* According to new design of appointment  */}
      <div className="flex flex-col w-[624px]">
        <div className="flex justify-between my-[20px]  w-full ">
          <div className="flex flex-row justify-between items-center my-[20px]  w-full ">
            <p>Select Date</p>

            <div className="flex flex-row gap-2 justify-center items-center mr-[2px]">
              <DatePicker
                // showIcon
                selected={selectedMonth}
                showMonthYearPicker
                dateFormat="MMMM yyyy"
                minDate={minDate}
                maxDate={maxDate}
                defaultValue={date}
                className="text-[14px] [word-spacing:5px] text-center font-[700] m-0 px-[10px] py-[5px] w-[130px] flex flex-row justify-center items-center rounded-[8px]"
                // type="month"
                // min={minDate}
                // max={maxDate}
                id="datePicker"
                // value={selectedMonth.toISOString().slice(0, 7)}
                onChange={(date) => {
                  handleMonthChange(date);
                }}
                // required
              />
            </div>
          </div>
        </div>
        <div className="relative">
          <div className=" overflow-scroll h-fit" ref={dateRef}>
            <div className="flex gap-2 min-w-fit h-[64px]">
              {dateArr.map((item, index) => {
                return (
                  <div
                    className={`py-[8px] px-[19px] h-[64px] w-[64px]  flex flex-col justify-center items-center rounded-[8px] select-none
                    ${
                      item.disabled ||
                      (typeof item.slots === "object" &&
                        item.slots.length === 0)
                        ? "opacity-20 cursor-default"
                        : "cursor-pointer"
                    }
                    
                     ${
                       index === activeIndex2
                         ? "border-2 border-black "
                         : "border-[1px] border-gray-500 "
                     } `}
                    onClick={() => {
                      typeof item.slots === "object" &&
                      item.slots.length !== 0 &&
                      !item.disabled
                        ? setActiveIndex2(index)
                        : setActiveIndex2(null);
                      setActiveIndex(null);
                      checkTime(item);
                    }}
                    key={index}
                  >
                    <p>{item.date}</p>
                    <p>{item.day}</p>
                  </div>
                );
              })}
            </div>
            <LeftRightScrollBtn
              refrence={dateRef}
              style={{
                border: "1px solid black",
                fontSize: "16px",
                color: "black",
              }}
              scrollLength={380}
              leftPosition={leftPos}
              rightPosition={rightPos}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-[12px] w-[624px]">
        <p className="mt-[20px]">Select Time</p>
        <div className="relative">
          <div
            className=" w-[407px] md:w-[607px] overflow-x-scroll "
            ref={arrRef}
          >
            <div className="flex gap-2 min-w-fit h-[44px]">
              {dateArr[activeIndex2]?.slots?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={`w-[120px]  h-[42px] py-[12px] px-[16px] gap-1 flex justify-center items-center rounded-[8px] select-none
                    ${
                      timeArr?.some((entry) => entry.time === item)
                        ? "opacity-20 cursor-default"
                        : "cursor-pointer"
                    }
                    ${
                      index === activeIndex &&
                      !timeArr?.some((entry) => entry.time === item)
                        ? "border-2 border-black "
                        : "border-[1px] border-gray-500 "
                    }`}
                    onClick={() => {
                      !timeArr?.some((entry) => entry.time === item)
                        ? setActiveIndex(index)
                        : setActiveIndex(null);
                    }}
                  >
                    <p>{item}</p>
                  </div>
                );
              })}

              <LeftRightScrollBtn
                refrence={arrRef}
                style={{
                  border: "1px solid black",
                  fontSize: "16px",
                  color: "black",
                }}
                leftPosition={leftPosition}
                rightPosition={rightPosition}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-[14px] w-[624px] mt-[20px]">
        <div>
          <label className=" text-[14px] font-medium">Full name</label>
          <InputField
            type="text"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            width="100%"
            height="40px"
            fontSize="14px"
            borderRadius={props.square ? "0px" : "8px"}
          />
        </div>
        <div>
          <label className=" text-[14px] font-medium">Email</label>
          <InputField
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            width="100%"
            height="40px"
            fontSize="14px"
            borderRadius={props.square ? "0px" : "8px"}
          />
        </div>
        <div>
          <TextFieldArea
            type="text"
            placeholder="Enter Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            label="Message (optional)"
            width="100%"
            height="40px"
            fontSize="14px"
            borderRadius={props.square ? "0px" : "8px"}
          />
        </div>
        <div className="w-full flex justify-center h-[55px]">
          {props.btnType == "custom" ? (
            <CustomButton
              disabled={
                fullname === "" ||
                email === "" ||
                dateArr.length == 0 ||
                activeIndex2 == null
              }
              customBtn={props.customBtn}
              style={props.buttonStyle}
              onClick={handleSubmit}
              text={"Submit"}
            />
          ) : (
            <Button
              disabled={
                fullname === "" ||
                email === "" ||
                dateArr.length == 0 ||
                activeIndex2 == null ||
                activeIndex == null
              }
              style={props.buttonStyle}
              onClick={handleSubmit}
              text={"Submit"}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Appointments2;
