import React, { useEffect, useRef, useState } from "react";
import { HiOutlineX } from "react-icons/hi";
import { SlCalender } from "react-icons/sl";
import Button from "../../ProfileComponents/Button/Button";
import InputField from "../../../UiComponents/InputField";
import TextFieldArea from "../../../UiComponents/InputFIeldTextArea";
import LeftRightScrollBtn from "../../../Utils/LeftRightScrollBtn";
import { serverUrl } from "../../../../config";
import axios from "axios";
import "../../../ModalComponent/modal.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCheckCircle, FaClock } from "react-icons/fa";
import NewModal from "@/components/UiComponents/NewModal/NewModal";
import PrimaryButton from "@/components/UiComponents/PrimaryButton";
import { rest } from "lodash";

function useDefaultProps(props) {
  let newProps = { ...props };
  Object.keys(newProps).forEach((key) =>
    newProps[key] === undefined ? delete newProps[key] : {}
  );
  return { ...defaultProps, ...newProps };
}

const AppointmentModal = (props) => {
  props = useDefaultProps(props);
  const activeBg = props.activeBg;
  const inactiveBg = props.inactiveBg;
  const appointmentDiv = props.appointmentDiv;
  const data = props.data;
  const label = props.label;
  const interval =
    data && data.length > 0 && data[0].slotInterval ? data[0].slotInterval : 20;
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const arrRef = useRef(null);
  const dateRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [subActiveIndex, setSubActiveIndex] = useState("");
  const [activeIndex2, setActiveIndex2] = useState(null);
  const [slots, setSlots] = useState({});
  const [isTimeSlotClicked, setIsTimeSlotClicked] = useState(false);
  const [subSlotBtnSelected, setSubSlotBtnSelected] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");
  const [day, setDay] = useState("");
  const [selectedData, setSelectedData] = useState([]);
  const [selectionParticular, setSelectedParticular] = useState([]);
  const [allSlots, setAllSlots] = useState([]);

  const leftPosition = {
    left: "2px",
    top: "50%",
    transform: "translateY(-50%)",
  };

  if (data) {
  }

  const rightPosition = {
    right: "2px",
    top: "50%",
    transform: "translateY(-50%)",
  };

  const normalizeString = (str) => {
    return str.replace(/\s+/g, " ").trim();
  };

  const handleSubmit = () => {
    const curSlot = subActiveIndex.split("-");
    const date = new Date(
      selectedMonth.getMonth() +
        1 +
        "/" +
        dateArr[activeIndex2].date +
        "/" +
        selectedMonth.getFullYear() +
        " " +
        curSlot[0]
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
        timeFrom: curSlot[0],
        // timeTo: new Date(date.getTime() + interval * 60000).toLocaleString(
        //   "en-US",
        //   { hour: "numeric", minute: "numeric", hour12: true }
        // ),
        timeTo:curSlot[1],
        time: curSlot[0],
        name: fullname,
        email: email,
        phone: "",
        pending: true,
        confirmation: false,
        cancel: false,
        userEmail: props.email,
        start: date,
        end: new Date(date.getTime() + interval * 60000),
      }),
    }).then((res) => {
      props.setAppointName(fullname);
      props.setAppointDate(date.toDateString().split(" ").slice(1).join(" "));
      props.setAppointTime(
        curSlot[0] +
          " " +
          curSlot[1]
      );
      props.setAppointPhone();
      props.setAppointEmail(email);
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
      // Add the end date if it wasn't added in the loop
      if (
        curdate.getTime() === enddate.getTime() ||
        curdate.getTime() - interval * 60000 < enddate.getTime()
      ) {
        monSet.push(
          enddate.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })
        );
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
      // Add the end date if it wasn't added in the loop
      if (
        curdate.getTime() === enddate.getTime() ||
        curdate.getTime() - interval * 60000 < enddate.getTime()
      ) {
        tueSet.push(
          enddate.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })
        );
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
      // Add the end date if it wasn't added in the loop
      if (
        curdate.getTime() === enddate.getTime() ||
        curdate.getTime() - interval * 60000 < enddate.getTime()
      ) {
        wedSet.push(
          enddate.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })
        );
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
      // Add the end date if it wasn't added in the loop
      if (
        curdate.getTime() === enddate.getTime() ||
        curdate.getTime() - interval * 60000 < enddate.getTime()
      ) {
        thursSet.push(
          enddate.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })
        );
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
      // Add the end date if it wasn't added in the loop
      if (
        curdate.getTime() === enddate.getTime() ||
        curdate.getTime() - interval * 60000 < enddate.getTime()
      ) {
        friSet.push(
          enddate.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })
        );
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
      // Add the end date if it wasn't added in the loop
      if (
        curdate.getTime() === enddate.getTime() ||
        curdate.getTime() - interval * 60000 < enddate.getTime()
      ) {
        saturSet.push(
          enddate.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })
        );
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
      // Add the end date if it wasn't added in the loop
      if (
        curdate.getTime() === enddate.getTime() ||
        curdate.getTime() - interval * 60000 < enddate.getTime()
      ) {
        sunSet.push(
          enddate.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })
        );
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
    // //console.log("1st : ", obj);
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
      setSelectedData(data);
      //console.log(data);
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

  useEffect(() => {
    filterApp();
  }, []);

  useEffect(() => {
    if (day) {
      const filteredData = selectedData.filter((item) => item.day === day);
      setSelectedParticular(filteredData);
      //console.log(filteredData);
      const times = filteredData.map((item) => {
        const normalizedTimeFrom = normalizeString(item.timeFrom);
        const normalizedTimeTo = normalizeString(item.timeTo);
        return `${normalizedTimeFrom} - ${normalizedTimeTo}`;
      });

      //console.log(times);
      setAllSlots(times);
    }
  }, [day]);

  useEffect(() => {
    const generateDatesArray = () => {
      const year = selectedMonth.getFullYear();
      const month = selectedMonth.getMonth();
      const numberOfDays = getDaysInMonth(year, month);

      const datesArray = Array.from({ length: numberOfDays }, (_, index) => {
        const day = index + 2;
        const date1 = new Date(year, month, day);
        const date2 = new Date(year, month, day - 1);

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
            // //console.log(data)
            // //console.log(selectedMonth)
          } catch (error) {
            //console.log(error);
            return [];
          }
        };

        filterApp();

        function isDateSmallerThanToday(date) {
          date = parseInt(date);
          var today = new Date();
          var todayDate = today.getDate();
          return date < todayDate;
        }
        // const baseSlots = getSlots(
        //   date2.toLocaleString("en-US", { weekday: "short" })
        // );

        // const durationSlots = [baseSlots];
        // //console.log(durationSlots)

        const givenDate = new Date(
          `${selectedMonth}`.slice(4, 8) +
            date1.toISOString().slice(8, 10) +
            `${selectedMonth}`.slice(10, 15)
        );
        const today = new Date();
        today.setHours(0, 0, 0, 0);

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
          // duration: [durationSlots],
          oldDate: givenDate >= today ? false : true,
        };
      });

      return datesArray;
    };

    setDateArr(generateDatesArray());

    // //console.log("HI" , dateArr[activeIndex2]);
  }, [selectedMonth, slots, activeIndex2]);

  const [timeArr, setTimeArr] = useState();
  function checkTime(params) {
    const data = appointArr
      ? appointArr.filter((item) => item.fullDate === params.fullDate)
      : [];
    setTimeArr(data);
    // //console.log("check",data);
    // //console.log(appointArr);
    // //console.log(params.slots);
  }

  // -----

  function addOneHour(timeString) {
    const [time, meridian] = timeString.split(" ");
    const [hours, minutes] = time.split(":");
    let updatedHours = parseInt(hours);
    let updatedMinutes = parseInt(minutes);

    if (meridian === "PM" && updatedHours !== 12) {
      updatedHours += 12;
    } else if (meridian === "AM" && updatedHours === 12) {
      updatedHours = 0;
    }

    updatedMinutes += 60;

    if (updatedMinutes >= 60) {
      updatedHours += 1;
      updatedMinutes %= 60;
    }

    updatedHours %= 24;

    // let newMeridian;
    // if (updatedHours >= 12) {
    //   newMeridian = 'PM';
    //   if (updatedHours > 12) {
    //     updatedHours %= 12;
    //   }
    // } else {
    //   newMeridian = 'AM';
    //   if (updatedHours === 0) {
    //     updatedHours = 12;
    //   }
    // }

    return `${updatedHours}:${updatedMinutes.toString().padStart(2, "0")}`;
  }

  function roundOffToHour(timeString) {
    const [time, meridian] = timeString.split(" ");
    const [hours, minutes] = time.split(":");
    let updatedHours = parseInt(hours);
    let updatedMinutes = parseInt(minutes);

    if (meridian === "PM" && updatedHours != 12) {
      updatedHours += 12;
    }
    if (meridian === "AM" && updatedHours == 12) {
      updatedHours += 12;
    }

    if (updatedMinutes >= 30) {
      updatedHours;
    }

    updatedHours %= 24;
    updatedMinutes = 0;

    let newMeridian;
    if (updatedHours >= 12) {
      newMeridian = "PM";
      if (updatedHours > 12) {
        updatedHours -= 12;
      }
    } else {
      newMeridian = "AM";
      if (updatedHours === 0) {
        updatedHours = 12;
      }
    }

    return `${updatedHours}:${updatedMinutes
      .toString()
      .padStart(2, "0")} ${newMeridian}`;
  }

  const removeDuplicatefromTime = (array) => {
    if (!array) {
      return [];
    }

    const arr = array.map(
      (elem) => elem.split(":")[0] + ":00 " + elem.split(" ")[1]
    );
    // //console.log(array,arr)
    return arr.reduce((acc, curr) => {
      if (!acc.includes(curr)) {
        acc.push(curr);
      }
      return acc;
    }, []);
  };

  const durationSlots = removeDuplicatefromTime(dateArr[activeIndex2]?.slots);

  // ----------------------------------------
  // Utility function to parse time strings
  const parseTime = (time) => {
    const [hourPart, minutePart] = time.split(":");
    const minute = parseInt(minutePart.slice(0, 2), 10);
    let hour = parseInt(hourPart, 10);
    const period = time.slice(-2);

    if (period === "PM" && hour !== 12) {
      hour += 12;
    } else if (period === "AM" && hour === 12) {
      hour = 0;
    }

    return { hour, minute, period };
  };

  // Utility function to format time strings
  const formatTime = (hour, minute) => {
    const period = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    const minuteStr = minute < 10 ? `0${minute}` : minute;
    return `${hour}:${minuteStr} ${period}`;
  };

  const [innerArr, setInnerArr] = useState([]);

  const convertToMinutes = (timeStr) => {
    const [time, meridian] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (meridian === "PM" && hours !== 12) {
      hours += 12;
    } else if (meridian === "AM" && hours === 12) {
      hours = 0;
    }

    return hours * 60 + minutes;
  };

  const subSlots = () => {
    let outputArr = [];

    function addMinutes(time, minutesToAdd) {
      // Create a Date object from the input time string
      const [timePart, modifier] = time.split(" ");
      let [hours, minutes] = timePart.split(":").map(Number);

      // Adjust hours based on AM/PM
      if (modifier === "PM" && hours !== 12) {
        hours += 12;
      } else if (modifier === "AM" && hours === 12) {
        hours = 0;
      }

      // Create a new Date object and add minutes
      const date = new Date();
      date.setHours(hours);
      date.setMinutes(minutes + minutesToAdd);

      // Extract the new hours and minutes
      let newHours = date.getHours();
      let newMinutes = date.getMinutes();

      // Determine the new AM/PM modifier
      const newModifier = newHours >= 12 ? "PM" : "AM";
      newHours = newHours % 12;
      newHours = newHours ? newHours : 12; // Adjust hour to 12 if it is 0
      newMinutes = newMinutes < 10 ? "0" + newMinutes : newMinutes;

      // Construct the new time string
      const newTime = `${newHours}:${newMinutes} ${newModifier}`;
      return newTime;
    }

    const startTime = convertToMinutes(selectedTime);
    const endTime = convertToMinutes(addMinutes(selectedTime, 60));
    const inputArr = dateArr[activeIndex2]?.slots
      ? dateArr[activeIndex2]?.slots
      : [
          "12:15 AM",
          "12:35 AM",
          "12:55 AM",
          "1:15 AM",
          "1:35 AM",
          "4:00 AM",
          "4:20 AM",
          "4:40 AM",
          "5:00 AM",
          "5:20 AM",
          "5:40 AM",
          "6:00 AM",
          "6:20 AM",
          "6:40 AM",
          "7:00 AM",
          "7:20 AM",
          "7:40 AM",
          "8:00 AM",
          "8:20 AM",
          "8:40 AM",
          "9:00 AM",
          "9:20 AM",
          "9:40 AM",
          "10:00 AM",
          "10:20 AM",
          "10:40 AM",
          "11:00 AM",
          "11:20 AM",
          "11:40 AM",
          "12:00 PM",
          "12:20 PM",
          "12:40 PM",
        ];

    // //console.log("slots" , dateArr[activeIndex2]?.slots);
    for (let i = 0; i < inputArr.length; i++) {
      const currentTime = convertToMinutes(inputArr[i]);

      if (currentTime >= startTime && currentTime <= endTime) {
        outputArr.push(inputArr[i]);
      }

      if (i < inputArr.length - 1) {
        const nextTime = convertToMinutes(inputArr[i + 1]);
        if (
          currentTime <= endTime &&
          nextTime > endTime &&
          nextTime - currentTime === 20
        ) {
          outputArr.push(inputArr[i + 1]);
        }
      }
    }

    const timeRanges = outputArr
      .map((time, index, arr) => {
        if (index < arr.length - 1) {
          return `${time} - ${arr[index + 1]}`;
        }
      })
      .filter(Boolean);

    setInnerArr(timeRanges);
  };

  useEffect(() => {
    subSlots();
  }, [selectedTime]);

  return (
    <div className="container" style={{ zIndex: "998" }}>
      <div
        className="modal-wrapper bg-[#00000054]  backdrop-blur-[20px]"
        style={{ zIndex: "998" }}
      >
        <div
          className={`flex flex-col fixed bottom-0 md:bottom-1/2 bg-white md:translate-y-1/2 left-1/2 -translate-x-1/2 h-fit rounded-t-2xl md:rounded-2xl md:w-[600px] w-full ${props.modalStyle}`}
          style={{ zIndex: "998", maxHeight: "90vh" }}
        >
          <div className="flex justify-between items-center px-3 xsm:px-5 md:px-6 md:pt-[26px] xsm:pt-[18px] pt-[14px] pb-[14px]">
            <p className="text-[15px] xsm:text-[18px] md:text-[20px] font-semibold">
              {label}
            </p>
            <span
              className="text-[15px] xsm:text-[18px] md:text-[20px] hover:cursor-pointer"
              onClick={() => {
                props.setShowModal(false);
              }}
            >
              <HiOutlineX />
            </span>
          </div>

          <div className="h-[1px] w-full px-3 xsm:px-5 md:px-6">
            <div className="bg-[#c8c8c8] h-full w-full"></div>
          </div>

          <div className="flex flex-col gap-5 overflow-y-scroll px-3 xsm:px-5 md:px-6  md:pb-[26px] pb-[50px]">
            {/* According to new design of appointment  */}
            <div className="flex flex-col  ">
              <div className="flex justify-between my-[20px]  w-full ">
                <p>Select Date</p>

                <div className="flex flex-row gap-2 justify-center items-center mr-[2px]">
                  <DatePicker
                    // showIcon
                    showTwoColumnMonthYearPicker
                    selected={selectedMonth}
                    showMonthYearPicker
                    dateFormat="MMMM yyyy"
                    minDate={minDate}
                    maxDate={maxDate}
                    defaultValue={date}
                    className="text-[14px] text-center font-[700] m-0 px-[10px] py-[5px] w-[130px] flex flex-row justify-center items-center rounded-[8px]"
                    // type="month"
                    // min={minDate}
                    // max={maxDate}
                    id="datePicker"
                    // value={selectedMonth.toISOString().slice(0, 7)}
                    onChange={(date) => {
                      handleMonthChange(date);
                    }}
                    required
                  />
                </div>
              </div>

              <div className="relative h-fit">
                <div className="w-full overflow-scroll h-fit" ref={dateRef}>
                  <div className="flex gap-2 min-w-fit h-fit">
                    {dateArr.map((item, index) => {
                      return (
                        <div
                          className={`h-[70px] w-[120px] flex-col justify-center items-center select-none
                          ${item.oldDate ? "hidden" : "flex"}
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
                            if (item.day == "Mon") {
                              setDay("Monday");
                              //console.log("1");
                            }
                            if (item.day == "Tue") {
                              setDay("Tuesday");
                              //console.log("2");
                            }
                            if (item.day == "Wed") {
                              setDay("Wednesday");
                              //console.log("3");
                            }
                            if (item.day == "Thu") {
                              setDay("Thursday");
                              //console.log("4");
                            }
                            if (item.day == "Fri") {
                              setDay("Friday");
                              //console.log("5");
                            }
                            if (item.day == "Sat") {
                              setDay("Saturday");
                              //console.log("6");
                            }
                            if (item.day == "Sun") {
                              setDay("Sunday");
                              //console.log("7");
                            }
                          }}
                          key={index}
                        >
                          {/* {//console.log(item)} */}
                          <div className="bg-black p-2 flex flex-row justify-center gap-[8px] items-center text-white w-full text-center">
                            {index === activeIndex2 && (
                              <FaCheckCircle className="" />
                            )}
                            <p className="leading-[18px] pt-[2px]">
                              {item.day}
                            </p>
                          </div>
                          <p className="p-[8px] w-full text-center">
                            {item.date} {item.fullDate.slice(0, 3)}{" "}
                            {item.fullDate.slice(9, 11)}
                          </p>
                          {/* {//console.log(item.fullDate.slice(0, 3))} */}
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

            <div className="flex flex-col gap-[12px] h-fit">
              <p className="">Select Time</p>
              <div className="relative h-fit">
                <div className="w-full overflow-scroll h-fit" ref={arrRef}>
                  <div className="flex gap-2 min-w-fit h-[44px]">
                    {durationSlots.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className={`w-[171px]  h-[42px] py-[12px] px-[16px] gap-1 select-none  flex justify-center items-center rounded-[8px] ${
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
                            setIsTimeSlotClicked(true);
                            !timeArr?.some((entry) => entry.time === item)
                              ? setActiveIndex(index)
                              : setActiveIndex(null);
                            setSelectedTime(item);
                          }}
                        >
                          {/* <p>{item}</p> */}
                          <p className="text-[14px]">
                            {roundOffToHour(item) +
                              " - " +
                              roundOffToHour(addOneHour(item))}
                          </p>
                        </div>
                      );
                    })}
                  </div>
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
          </div>
        </div>
      </div>

      {isTimeSlotClicked && (
        <div
          className="modal-wrapper bg-[#00000054] backdrop-blur-[3px]"
          style={{ zIndex: "998" }}
        >
          <div
            className={`flex flex-col fixed bottom-0 md:bottom-1/2 bg-white md:translate-y-1/2 left-1/2 -translate-x-1/2 h-fit rounded-t-2xl md:rounded-2xl md:w-[550px] w-full ${props.modalStyle}`}
            style={{ zIndex: "998", maxHeight: "90vh" }}
          >
            <div className="flex justify-between items-center px-3 xsm:px-5 md:px-6 md:pt-[26px] xsm:pt-[18px] pt-[14px] pb-[14px]">
              <p className="text-[15px] xsm:text-[18px] md:text-[20px] font-semibold">
                Available Time Slot
              </p>
              <span
                className="text-[15px] xsm:text-[18px] md:text-[20px] hover:cursor-pointer"
                onClick={() => {
                  setIsTimeSlotClicked(false);
                }}
              >
                <HiOutlineX />
              </span>
            </div>

            <div className="h-[1px] w-full px-3 xsm:px-5 md:px-6">
              <div className="bg-[#c8c8c8] h-full w-full"></div>
            </div>

            <div className="w-[100%] max-h-[610px] h-fit py-[20px] md:pb-[26px] pb-[50px] px-3 xsm:px-5 md:px-6 rounded-lg flex flex-col sm:gap-[40px] gap-[10px] relative">
              <div className="flex flex-wrap justify-center items-center gap-[10px] overflow-y-scroll">
                {innerArr.map((item, index) => {
                  const normalizedItem = normalizeString(item);
                  const isInFilteredTimes = allSlots.includes(normalizedItem);
                  //console.log(isInFilteredTimes);
                  return (
                    <button
                      key={index}
                      className={`border border-[#4fb447] ${isInFilteredTimes ? "cursor-not-allowed !border-[#778077]" : "cursor-pointer hover:bg-[#4fb447]"} hover:text-white rounded-lg py-[11px] px-[20px] w-[48%] flex flex-row justify-center items-center gap-[10px] ${
                        subActiveIndex === item
                          ? "bg-[#4fb447] text-white"
                          : isInFilteredTimes
                          ? "bg-[#455c436e] text-white" // Red background if the item is in the filtered times array
                          : "text-[#4fb447]"
                      }`}
                      onClick={() => {
                        if(!isInFilteredTimes){
                          setSubActiveIndex(item);
                          setSubSlotBtnSelected(true);
                        }
                      }}
                    >
                      <FaClock />
                      <p className="pt-[2px]">{item}</p>
                    </button>
                  );
                })}
              </div>

              <Button
                style={props.buttonStyle}
                disabled={subActiveIndex ? false : true}
                onClick={() => {
                  setIsTimeSlotClicked(!isTimeSlotClicked);
                }}
                text={"Confirm"}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentModal;

const defaultProps = {
  modalStyle: "DM-Sans-font-div",
};
