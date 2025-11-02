import React from "react";
import { useState } from "react";
// import { format } from 'date-fns'
// import { useEffect } from 'react'
import axios from "axios";

import Calendar from "react-calendar";
import TextField from "@mui/material/TextField";
import "react-calendar/dist/Calendar.css";
import { serverUrl } from "../../../../config";

function Month() {
  const name = "ayush";
  const [date, setDate] = useState(new Date());
  const [times, settime] = useState("08:00");
  const [ltime, setltime] = useState("24:00");
  const [selecttime, setselecttime] = useState("");
  const [apponitment, setapponitment] = useState(false);
  const [Day, setDay] = useState();
  const [values, setvalues] = useState({
    headLines: "",
    title: "",
    day: "",

    time: "",

    email: "",
    phone: "",
  });
  const tims = [];
  const tims2 = [];
  // console.log(values);
  const half = 30;
  let hour = 0;

  let minute = 0;

  // console.log("fc"+times);
  if (times === "null") {
    //console.log("d");
  } else {
    const lasthoursplited = ltime.split(":");
    const lastHour = parseInt(lasthoursplited[0]);
    const splited = times.split(":");
    hour += parseInt(splited[0]);
    minute += parseInt(splited[1]);
    // var h =0;
    for (let i = 0; i < 45; i++) {
      const totalmintue = half + minute;
      if (totalmintue >= 60) {
        var m = (totalmintue / 60) << 0;
        minute = totalmintue % 60;
        hour += m;
      } else {
        minute = totalmintue;
      }
      if (hour > lastHour) {
        break;
      }

      tims.push(("0" + hour).slice(-2) + ":" + ("0" + minute).slice(-2));
    }
    tims.unshift(times + " ");
    // tims.pop()
  }
  const len = tims.length;
  var i;
  for (i = 0; i <= len - 1; i++) {
    tims2.push(<div key={i}>{tims[i] + " - " + tims[i + 1]}</div>);
  }
  tims2.pop();

  const onChange = (dates) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = {
      0: "January",
      1: "February",
      2: "March",
      3: "April",
      4: "May",
      5: "June",
      6: "July",
      7: "August",
      8: "September",
      9: "October",
      10: "November",
      11: "December",
    };
    const dayName = days[dates.getDay()];
    const year = dates.getFullYear();
    const date = dates.getDate();

    const Getmonth = months[dates.getMonth()];
    const formatted = `${dayName}, ${date} ${Getmonth} ${year}`.toString();
    //console.log(formatted);
    setDay(formatted);
  };
  function hanldeChange(item, index) {
    //console.log(item.props.children);
    setselecttime(item.props.children);
    setapponitment(true);
    setvalues({
      time: item.props.children,
    });
  }
  // function buttonComponent(tims2){
  //   console.log(tims);
  //   return <button onClick={(e)=>hanldeChange(tims2[2])}> {tims2[1]}</button>
  // }
  const addItem = async () => {
    try {
      await axios.post(`${serverUrl}/meeting/post`, {
        headLine: values.headLines,
        title: values.title,
        day: Day,
        time: selecttime,
        name: name,
        email: values.email,
        phone: values.phone,
      });
      //console.log(values.headLines);
    } catch (error) {
      console.error(error);
    }
    //console.log(values);
  };

  return (
    <div>
      <Calendar
        onChange={setDate}
        onClickDay={(date) => onChange(date)}
        value={date}
      />
      <br />
      <br />
      <br />
      <TextField
        id="time"
        label="Alarm clock"
        type="time"
        defaultValue="08:30"
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 1200, // 5 min
        }}
        sx={{ width: 150 }}
        onChange={(e) => settime(e.target.value)}
      />
      <TextField
        id="Endtime"
        label="end time"
        type="time"
        defaultValue="23:30"
        sx={{ width: 250 }}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 1200, // 5 min
        }}
        onChange={(e) => setltime(e.target.value)}
      />

      <br />
      <br />
      <br />
      <br />
      <br />

      <br />
      <br />

      {/* {tims2.map(buttonComponent)} */}
      {/* {console.log()} */}
      <button onClick={(e) => hanldeChange(tims2[1])}> {tims2[1]} </button>
      <br />
      <button onClick={(e) => hanldeChange(tims2[2])}> {tims2[2]}</button>
      <br />
      <button onClick={(e) => hanldeChange(tims2[3])}> {tims2[3]}</button>
      <br />
      <button onClick={(e) => hanldeChange(tims2[4])}> {tims2[4]}</button>
      <br />
      <button onClick={(e) => hanldeChange(tims2[5])}> {tims2[5]}</button>
      <br />
      <button onClick={(e) => hanldeChange(tims2[6])}> {tims2[6]}</button>
      <br />
      <button onClick={(e) => hanldeChange(tims2[7])}> {tims2[7]}</button>
      <br />
      <button onClick={(e) => hanldeChange(tims2[8])}> {tims2[8]}</button>
      <br />
      <button onClick={(e) => hanldeChange(tims2[9])}> {tims2[9]}</button>
      <br />
      <button onClick={(e) => hanldeChange(tims2[10])}> {tims2[10]}</button>
      <button onClick={(e) => hanldeChange(tims2[11])}> {tims2[11]}</button>
      <button onClick={(e) => hanldeChange(tims2[12])}> {tims2[12]}</button>
      <button onClick={(e) => hanldeChange(tims2[13])}> {tims2[13]}</button>
      <button onClick={(e) => hanldeChange(tims2[14])}> {tims2[14]}</button>
      <button onClick={(e) => hanldeChange(tims2[15])}> {tims2[15]}</button>
      <button onClick={(e) => hanldeChange(tims2[16])}> {tims2[16]}</button>
      <button onClick={(e) => hanldeChange(tims2[17])}> {tims2[17]}</button>
      <button onClick={(e) => hanldeChange(tims2[18])}> {tims2[18]}</button>
      <button onClick={(e) => hanldeChange(tims2[19])}> {tims2[19]}</button>
      <button onClick={(e) => hanldeChange(tims2[20])}> {tims2[20]}</button>
      <button onClick={(e) => hanldeChange(tims2[21])}> {tims2[21]}</button>
      <button onClick={(e) => hanldeChange(tims2[22])}> {tims2[22]}</button>
      <button onClick={(e) => hanldeChange(tims2[23])}> {tims2[23]}</button>
      <button onClick={(e) => hanldeChange(tims2[24])}> {tims2[24]}</button>
      <button onClick={(e) => hanldeChange(tims2[25])}> {tims2[25]}</button>
      <button onClick={(e) => hanldeChange(tims2[26])}> {tims2[26]}</button>
      <button onClick={(e) => hanldeChange(tims2[27])}> {tims2[27]}</button>
      <button onClick={(e) => hanldeChange(tims2[28])}> {tims2[28]}</button>
      <button onClick={(e) => hanldeChange(tims2[29])}> {tims2[29]}</button>
      <button onClick={(e) => hanldeChange(tims2[30])}> {tims2[30]}</button>

      <br />
      <br />
      <br />
      <br />
      {apponitment === true ? (
        <>
          <form>
            <input
              type="text"
              onChange={(e) =>
                setvalues((prev) => ({ ...prev, headLines: e.target.value }))
              }
              placeholder="meeting-headLine"
            />
            <input
              type="text"
              onChange={(e) =>
                setvalues((prev) => ({ ...prev, title: e.target.value }))
              }
              placeholder="meeting-title"
            />
            <input
              type="email"
              onChange={(e) =>
                setvalues((prev) => ({ ...prev, email: e.target.value }))
              }
              placeholder="email"
            />
            <input
              type="number"
              onChange={(e) =>
                setvalues((prev) => ({ ...prev, phone: e.target.value }))
              }
              placeholder="phone no"
            />
            <button
              type="submit"
              className="registerbtn"
              onClick={(e) => {
                addItem(e.preventDefault());
              }}
            >
              submit
            </button>
          </form>{" "}
        </>
      ) : null}
    </div>
  );
}

export default Month;
